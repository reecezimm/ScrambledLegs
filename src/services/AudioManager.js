// ─────────────────────────────────────────────────────────────────────────────
// AudioManager — singleton service for game music playback, crossfading, and
// mini-game transitions. Handles main track fade-in/out, position preservation,
// and smooth transitions between main and mini-game audio.
//
// Event-based API for coordination with game director:
//   - musicStarted: Main track fade-in complete
//   - miniGameMusicStarted: Mini-game track fade-in complete
//   - mainMusicResumed: Returned from mini-game to main track
//   - musicEnded: Session ending fade-out complete
//   - transitionComplete: Any crossfade operation complete
//
// All fades use requestAnimationFrame for smooth 60fps animation.
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSAL_VOLUME = 0.7;  // Standard volume level for all audio tracks

class AudioManager {
  constructor() {
    this.mainTrack = {
      audioElement: null,
      filePath: null,
      isLoaded: false,
      volume: UNIVERSAL_VOLUME,
      playbackPosition: 0,
      isPlaying: false,
    };

    this.miniGameTrack = {
      audioElement: null,
      filePath: null,
      isLoaded: false,
      volume: UNIVERSAL_VOLUME,
      isPlaying: false,
    };

    this.activeTransition = null;  // { type, fromTrack, toTrack, duration, startTime, animationFrameId }
    this.masterVolume = 1.0;
    this.isSessionActive = false;
    this.currentMode = 'main';  // 'main' | 'miniGame'
    this.isPaused = false;

    // Event listeners (simple pub/sub)
    this._listeners = {};

  }

  // ── Public API: Session Lifecycle ──────────────────────────────────────────

  /**
   * Start main track with fade-in over duration.
   * Plays in loop, preserves position when interrupted.
   */
  async startMainTrack(filePath, targetVolume = UNIVERSAL_VOLUME, fadeDuration = 4000) {

    if (!filePath) {
      console.error('[audio] ✗ startMainTrack ERROR: no filePath provided');
      return;
    }

    try {
      // Create or reuse audio element
      if (!this.mainTrack.audioElement) {
        this.mainTrack.audioElement = new Audio();
        this.mainTrack.audioElement.loop = true;
      } else {
      }

      // Load audio file
      this.mainTrack.audioElement.src = filePath;
      this.mainTrack.filePath = filePath;
      this.mainTrack.volume = 0;  // Start at 0 for fade-in
      this.mainTrack.isPlaying = false;


      // Wait for audio to be loadable (oncanplay)
      await new Promise((resolve, reject) => {
        const onCanPlay = () => {
          this.mainTrack.audioElement.removeEventListener('canplay', onCanPlay);
          this.mainTrack.audioElement.removeEventListener('error', onError);
          resolve();
        };
        const onError = (err) => {
          this.mainTrack.audioElement.removeEventListener('canplay', onCanPlay);
          this.mainTrack.audioElement.removeEventListener('error', onError);
          console.error(`[audio]   ✗ Load error:`, err);
          reject(err);
        };
        this.mainTrack.audioElement.addEventListener('canplay', onCanPlay);
        this.mainTrack.audioElement.addEventListener('error', onError);
        this.mainTrack.audioElement.load();
      });

      this.mainTrack.isLoaded = true;

      // Play and initiate fade-in
      const playPromise = this.mainTrack.audioElement.play();
      if (playPromise) {
        playPromise
          .then(() => {
            this.mainTrack.isPlaying = true;
          })
          .catch((err) => {
            console.warn('[audio] ⚠ Main track play rejected (autoplay policy?):', err.message);
            // Graceful degrade: continue anyway
          });
      }

      this.isSessionActive = true;
      this.currentMode = 'main';

      // Fade in over specified duration
      await this._fadeTrack(this.mainTrack.audioElement, 0, targetVolume, fadeDuration);
      // Sync the property to match the actual audio element volume after fade completes
      this.mainTrack.volume = targetVolume;
      this._updateTrackVolumes();
      this._emit('musicStarted');
    } catch (err) {
      console.error('[audio] ✗ startMainTrack FAILED:', {
        filePath: filePath,
        message: err.message || err,
        code: err.code,
        name: err.name,
      });
      this._emit('error', { phase: 'startMainTrack', error: err });
      throw err;
    }
  }

  /**
   * Stop session with fade-out and cleanup.
   */
  async stopSession() {
    if (!this.isSessionActive) {
      return;
    }


    try {
      // Cancel any active transition
      if (this.activeTransition) {
        this._cancelTransition();
      }

      // Fade out main track over 1 second
      if (this.mainTrack.audioElement && this.mainTrack.isPlaying) {
        await this._fadeTrack(this.mainTrack.audioElement, this.mainTrack.audioElement.volume, 0, 1000);
      }

      // Clean up
      this._cleanup();
      this.isSessionActive = false;
      this._emit('musicEnded');
    } catch (err) {
      console.error('[audio] ✗ stopSession failed:', err);
      this._cleanup();
      throw err;
    }
  }

  /**
   * Pause session (main track only).
   */
  pauseSession() {

    if (this.activeTransition) {
      this._cancelTransition();
    }

    if (this.mainTrack.audioElement && this.mainTrack.isPlaying) {
      this.mainTrack.playbackPosition = this.mainTrack.audioElement.currentTime;
      this.mainTrack.audioElement.pause();
      this.mainTrack.isPlaying = false;
    }

    this.isPaused = true;
  }

  /**
   * Resume session (main track from saved position).
   */
  resumeSession() {

    if (!this.mainTrack.audioElement) {
      console.error('[audio] ✗ resumeSession: no main track loaded');
      return;
    }

    try {
      // Restore position
      this.mainTrack.audioElement.currentTime = this.mainTrack.playbackPosition;
      const playPromise = this.mainTrack.audioElement.play();
      if (playPromise) {
        playPromise
          .then(() => {
            this.mainTrack.isPlaying = true;
          })
          .catch((err) => {
            console.warn('[audio] ⚠ Resume play rejected:', err.message);
          });
      }

      this.isPaused = false;
    } catch (err) {
      console.error('[audio] ✗ resumeSession failed:', err);
    }
  }

  // ── Mini-Game Transitions ──────────────────────────────────────────────────

  /**
   * Transition to mini-game audio with crossfade.
   * Duration: 1 second (both main fade-out and mini-game fade-in).
   * Main track pauses and preserves position for return.
   */
  async transitionToMiniGame(filePath, volume = UNIVERSAL_VOLUME, duration = 1000) {

    // Log current state before transition
    if (this.mainTrack.audioElement) {
    }

    if (this.activeTransition) {
      this._cancelTransition();
    }

    if (!filePath) {
      console.error('[audio] ✗ transitionToMiniGame ERROR: no filePath provided');
      return;
    }

    try {
      // Create mini-game audio element
      if (!this.miniGameTrack.audioElement) {
        this.miniGameTrack.audioElement = new Audio();
        this.miniGameTrack.audioElement.loop = true;
      } else {
      }

      // Load mini-game audio
      this.miniGameTrack.audioElement.src = filePath;
      this.miniGameTrack.filePath = filePath;
      this.miniGameTrack.volume = 0;  // Start at 0 for fade-in
      this.miniGameTrack.isPlaying = false;


      // Wait for audio to be loadable
      await new Promise((resolve, reject) => {
        const onCanPlay = () => {
          this.miniGameTrack.audioElement.removeEventListener('canplay', onCanPlay);
          this.miniGameTrack.audioElement.removeEventListener('error', onError);
          resolve();
        };
        const onError = (err) => {
          this.miniGameTrack.audioElement.removeEventListener('canplay', onCanPlay);
          this.miniGameTrack.audioElement.removeEventListener('error', onError);
          console.error(`[audio]   ✗ Mini-game load error:`, err);
          reject(err);
        };
        this.miniGameTrack.audioElement.addEventListener('canplay', onCanPlay);
        this.miniGameTrack.audioElement.addEventListener('error', onError);
        this.miniGameTrack.audioElement.load();
      });

      this.miniGameTrack.isLoaded = true;

      // Save main track position BEFORE any crossfade
      if (this.mainTrack.audioElement && this.mainTrack.isPlaying) {
        this.mainTrack.playbackPosition = this.mainTrack.audioElement.currentTime;
      }

      // CRITICAL FIX: Pause main track IMMEDIATELY to prevent silent position advancement during crossfade
      if (this.mainTrack.audioElement && this.mainTrack.isPlaying) {
        this.mainTrack.audioElement.pause();
        const paused = this.mainTrack.audioElement.paused;
        this.mainTrack.isPlaying = false;
      } else {
      }

      // Start mini-game playback
      const playPromise = this.miniGameTrack.audioElement.play();
      if (playPromise) {
        playPromise
          .then(() => {
            this.miniGameTrack.isPlaying = true;
          })
          .catch((err) => {
            console.warn(`[audio]   ⚠ Mini-game play() rejected:`, err.message || err);
            this.miniGameTrack.isPlaying = false;
          });
      }

      // Parallel crossfade: main fade out, mini-game fade in
      const mainStartVol = this.mainTrack.audioElement ? this.mainTrack.audioElement.volume : 0;

      this.activeTransition = {
        type: 'crossfade',
        fromTrack: 'main',
        toTrack: 'miniGame',
        duration,
        startTime: Date.now(),
      };

      await Promise.all([
        this._fadeTrack(this.mainTrack.audioElement, mainStartVol, 0, duration, 'main-out'),
        this._fadeTrack(this.miniGameTrack.audioElement, 0, volume, duration, 'mini-in'),
      ]);

      // Sync volume properties after crossfade to maintain consistent state
      this.mainTrack.volume = 0;
      this.miniGameTrack.volume = volume;
      this._updateTrackVolumes();

      // Verify final state after crossfade
      if (this.mainTrack.audioElement) {
      }
      if (this.miniGameTrack.audioElement) {
      }

      this.currentMode = 'miniGame';
      this.activeTransition = null;
      this._emit('miniGameMusicStarted');
      this._emit('transitionComplete');
    } catch (err) {
      console.error('[audio] ✗ transitionToMiniGame FAILED:', {
        filePath: filePath,
        message: err.message || err,
        code: err.code,
        name: err.name,
      });
      this.activeTransition = null;
      this._emit('error', { phase: 'transitionToMiniGame', error: err });
      throw err;
    }
  }

  /**
   * Transition back to main track with crossfade.
   * Duration: 1 second (smooth fade back to main).
   * Main track resumes from saved position.
   */
  async transitionBackToMain(duration = 1000) {

    // Log current state before transition
    if (this.miniGameTrack.audioElement) {
    }
    if (this.mainTrack.audioElement) {
    }

    if (this.activeTransition) {
      this._cancelTransition();
    }

    try {
      // Resume main track from saved position (use most recent time to avoid rewind)
      // CRITICAL: Use UNIVERSAL_VOLUME, not mainTrack.volume (which was set to 0 during mini-game transition)
      const targetVolume = UNIVERSAL_VOLUME;

      this.activeTransition = {
        type: 'crossfade',
        fromTrack: 'miniGame',
        toTrack: 'main',
        duration,
        startTime: Date.now(),
      };

      if (this.mainTrack.audioElement) {
        const currentTime = this.mainTrack.audioElement.currentTime;
        // Use the more recent of saved position or current time (in case transition was deferred)
        const targetTime = Math.max(currentTime, this.mainTrack.playbackPosition);
        this.mainTrack.audioElement.currentTime = targetTime;
        const playPromise = this.mainTrack.audioElement.play();
        if (playPromise) {
          playPromise
            .then(() => {
              this.mainTrack.isPlaying = true;
            })
            .catch((err) => {
              console.warn(`[audio]   ⚠ Main track play() rejected:`, {
                message: err.message || err,
                name: err.name,
              });
              this.mainTrack.isPlaying = false;
            });
        }
      } else {
      }

      // Parallel crossfade: mini-game fade out, main fade in
      const miniGameStartVol = this.miniGameTrack.audioElement ? this.miniGameTrack.audioElement.volume : 0;
      const mainStartVol = this.mainTrack.audioElement ? this.mainTrack.audioElement.volume : 0;

      await Promise.all([
        this._fadeTrack(this.miniGameTrack.audioElement, miniGameStartVol, 0, duration, 'mini-out'),
        this._fadeTrack(this.mainTrack.audioElement, mainStartVol, targetVolume, duration, 'main-in'),
      ]);

      // Pause mini-game track (will reuse for next mini-game)
      if (this.miniGameTrack.audioElement && this.miniGameTrack.isPlaying) {
        this.miniGameTrack.audioElement.pause();
        const miniGamePaused = this.miniGameTrack.audioElement.paused;
        this.miniGameTrack.isPlaying = false;
      }

      // Sync main track volume property to actual state after return crossfade completes
      this.mainTrack.volume = targetVolume;
      this._updateTrackVolumes();

      // Verify final state after crossfade
      if (this.mainTrack.audioElement) {
        const mainPaused = this.mainTrack.audioElement.paused;
        const mainVol = this.mainTrack.audioElement.volume;
        const mainTime = this.mainTrack.audioElement.currentTime;
      }
      if (this.miniGameTrack.audioElement) {
      }

      this.currentMode = 'main';
      this.activeTransition = null;
      this._emit('mainMusicResumed');
      this._emit('transitionComplete');
    } catch (err) {
      console.error('[audio] ✗ transitionBackToMain FAILED:', {
        message: err.message || err,
        code: err.code,
        name: err.name,
      });
      this.activeTransition = null;
      this._emit('error', { phase: 'transitionBackToMain', error: err });
      throw err;
    }
  }

  // ── Volume Control ─────────────────────────────────────────────────────────

  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this._updateTrackVolumes();
  }

  getMasterVolume() {
    return this.masterVolume;
  }

  setTrackVolume(track, volume) {
    const trackObj = track === 'main' ? this.mainTrack : this.miniGameTrack;
    if (trackObj) {
      trackObj.volume = Math.max(0, Math.min(1, volume));
      this._updateTrackVolumes();
    }
  }

  _updateTrackVolumes() {
    if (this.mainTrack.audioElement) {
      const appliedVolume = this.mainTrack.volume * this.masterVolume;
      this.mainTrack.audioElement.volume = appliedVolume;
    }
    if (this.miniGameTrack.audioElement) {
      const appliedVolume = this.miniGameTrack.volume * this.masterVolume;
      this.miniGameTrack.audioElement.volume = appliedVolume;
    }
  }

  // ── State Queries ──────────────────────────────────────────────────────────

  isPlaying() {
    return this.mainTrack.isPlaying || this.miniGameTrack.isPlaying;
  }

  getCurrentTrack() {
    return this.currentMode;
  }

  getPlaybackPosition() {
    return this.mainTrack.audioElement ? this.mainTrack.audioElement.currentTime : 0;
  }

  isTransitionComplete() {
    return !this.activeTransition;
  }

  // ── Event Listeners ────────────────────────────────────────────────────────

  on(eventName, callback) {
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }
    this._listeners[eventName].push(callback);

    // Return unsubscribe function
    return () => {
      this._listeners[eventName] = this._listeners[eventName].filter(cb => cb !== callback);
    };
  }

  off(eventName, callback) {
    if (this._listeners[eventName]) {
      this._listeners[eventName] = this._listeners[eventName].filter(cb => cb !== callback);
    }
  }

  _emit(eventName, data) {
    if (this._listeners[eventName]) {
      this._listeners[eventName].forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`[audio] error in listener for "${eventName}":`, err);
        }
      });
    }
  }

  // ── Private: Fade Animation ────────────────────────────────────────────────

  _fadeTrack(audioElement, fromVolume, toVolume, durationMs, trackLabel = 'unknown') {
    return new Promise((resolve) => {
      if (!audioElement) {
        resolve();
        return;
      }

      const startTime = Date.now();
      const startVol = fromVolume;
      const targetVol = toVolume;
      let lastProgressLog = 0;

      const tick = () => {
        if (!audioElement) {
          resolve();
          return;
        }

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const newVolume = startVol + (targetVol - startVol) * progress;

        audioElement.volume = Math.max(0, Math.min(1, newVolume));

        // Log progress at 25%, 50%, 75%, 100%
        const progressPercent = Math.round(progress * 100 / 25) * 25;
        if (progressPercent > lastProgressLog && progressPercent <= 100) {
          lastProgressLog = progressPercent;
        }

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          audioElement.volume = targetVol;
          // Verify actual volume was set correctly
          const actualVol = audioElement.volume;
          const volumeMatch = Math.abs(actualVol - targetVol) < 0.01;
          resolve();
        }
      };

      requestAnimationFrame(tick);
    });
  }

  // ── Private: Transition & Cleanup ──────────────────────────────────────────

  _cancelTransition() {
    if (!this.activeTransition) return;


    if (this.activeTransition.animationFrameId) {
      cancelAnimationFrame(this.activeTransition.animationFrameId);
    }

    this.activeTransition = null;
  }

  _cleanup() {

    // Stop and release main track
    if (this.mainTrack.audioElement) {
      this.mainTrack.audioElement.pause();
      this.mainTrack.audioElement.src = '';
      this.mainTrack.isPlaying = false;
      this.mainTrack.isLoaded = false;
    }

    // Stop and release mini-game track
    if (this.miniGameTrack.audioElement) {
      this.miniGameTrack.audioElement.pause();
      this.miniGameTrack.audioElement.src = '';
      this.miniGameTrack.isPlaying = false;
      this.miniGameTrack.isLoaded = false;
    }

    this.currentMode = 'main';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Singleton instance
// ─────────────────────────────────────────────────────────────────────────────

let audioManagerInstance = null;

export function getAudioManager() {
  if (!audioManagerInstance) {
    audioManagerInstance = new AudioManager();
  }
  return audioManagerInstance;
}

export default getAudioManager;
