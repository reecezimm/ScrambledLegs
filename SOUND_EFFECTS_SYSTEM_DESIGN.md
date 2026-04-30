# Sound Effects System Design for Mini-Games

## Executive Summary

This document specifies a comprehensive sound effects (SFX) architecture for the Scrambled Legs mini-game system. The design integrates seamlessly with the existing `AudioManager` class, preserves the current main/mini-game music workflow, and provides mini-game modes with an intuitive API to trigger sound effects at key game events.

---

## 1. Schema Changes

### 1.1 Mini-Game Definition Schema

Add a new optional `soundEffects` field to each mini-game definition in `miniGames.js`:

```javascript
soundEffects: {
  // Map of logical effect names to their audio properties
  [effectName]: {
    filePath: string,           // e.g., '/audio/sfx/tap.mp3'
    volume: number,             // 0.0–1.0, default 0.5
    preload: boolean,           // optional, default false
    concurrent: 'single' | 'stack' | 'overlap', // default 'overlap'
    maxInstances: number,       // for 'stack' mode, default 2
  }
}

// Example: Golden Egg
soundEffects: {
  tap: {
    filePath: '/audio/sfx/golden-egg-tap.mp3',
    volume: 0.6,
    preload: true,
    concurrent: 'overlap',     // multiple taps can play at once
  },
  miss: {
    filePath: '/audio/sfx/egg-miss.mp3',
    volume: 0.4,
    preload: false,            // loaded on first miss
  }
},

// Example: Pong
soundEffects: {
  paddleHit: {
    filePath: '/audio/sfx/pong-paddle-hit.mp3',
    volume: 0.7,
    preload: true,
    concurrent: 'stack',       // each hit queues, max 1 at a time
    maxInstances: 1,
  },
  miss: {
    filePath: '/audio/sfx/pong-miss.mp3',
    volume: 0.8,
    preload: false,
  }
},

// Example: Dodge
soundEffects: {
  impact: {
    filePath: '/audio/sfx/dodge-impact.mp3',
    volume: 0.5,
    preload: false,
    concurrent: 'overlap',
  }
},

// Example: Mash Gauntlet
soundEffects: {
  pulse: {
    filePath: '/audio/sfx/gauntlet-pulse.mp3',
    volume: 0.4,
    preload: true,
    concurrent: 'single',      // only one instance ever plays
  },
  success: {
    filePath: '/audio/sfx/gauntlet-success.mp3',
    volume: 0.8,
    preload: false,
  },
  failure: {
    filePath: '/audio/sfx/gauntlet-failure.mp3',
    volume: 0.7,
    preload: false,
  }
},

// Example: Twilight
soundEffects: {
  mugTap: {
    filePath: '/audio/sfx/twilight-tap.mp3',
    volume: 0.55,
    preload: true,
    concurrent: 'overlap',
  }
}
```

### 1.2 Concurrent Mode Semantics

- **`'single'`**: Only one instance can play at a time. New plays cancel the current one.
  - Use case: Pulsing heartbeat, theme sting
  - Example: Mash Gauntlet pulse on each threshold interval
  
- **`'stack'`**: Queue effect plays; only `maxInstances` can be active.
  - Use case: Rapid-fire sound effects that should queue politely
  - Example: Paddle hits in Pong (so they don't muddy together)
  
- **`'overlap'`**: Unlimited concurrent instances; all play simultaneously.
  - Use case: Multiple simultaneous interactions
  - Example: Multiple egg taps in Golden Egg or beer taps in Twilight

---

## 2. AudioManager API Surface for Sound Effects

### 2.1 New Public Methods

```javascript
/**
 * Preload sound effects for a mini-game.
 * Called during the transition INTO a mini-game (before play phase starts).
 * Preloading prevents latency on first-play; only preloads those with
 * soundEffects[name].preload === true.
 *
 * @param {string} miniGameId - e.g., 'golden-egg'
 * @param {object} soundEffectsConfig - soundEffects object from mini-game def
 * @return {Promise<void>} resolves when all preloads complete
 */
async preloadMiniGameSFX(miniGameId, soundEffectsConfig)

/**
 * Play a named sound effect for the active mini-game.
 * Respects the mini-game's SFX config (volume, concurrent mode, etc.).
 * Called from within mini-game modes via ctx.
 *
 * @param {string} effectName - e.g., 'tap', 'hit', 'miss'
 * @param {object} opts - optional playback overrides
 *   - volume: override config volume (0.0–1.0)
 *   - pan: stereo panning (-1 to +1, optional)
 *   - rate: playback speed multiplier (optional)
 * @return {Promise<void>} resolves when audio file loads (doesn't wait for playback)
 */
async playSFX(effectName, opts = {})

/**
 * Stop all playing instances of a named effect.
 * Useful for cleanup (e.g., stop pulse SFX when mode ends).
 *
 * @param {string} effectName
 * @return {void}
 */
stopSFX(effectName)

/**
 * Stop all SFX for the current mini-game session.
 * Called when exiting a play phase or cancelling a mini-game.
 *
 * @return {void}
 */
stopAllSFX()

/**
 * Release cached audio elements for a mini-game.
 * Called after mini-game completes and we're transitioning back to main.
 * Frees memory for unused SFX nodes.
 *
 * @param {string} miniGameId
 * @return {void}
 */
unloadMiniGameSFX(miniGameId)

/**
 * Set volume for all SFX in the active mini-game.
 * Multiplicative with masterVolume (like main/miniGame tracks).
 * Default: 1.0 (no scaling).
 *
 * @param {number} volume - 0.0–1.0
 * @return {void}
 */
setSFXVolume(volume)

/**
 * Get current SFX volume (0.0–1.0).
 * @return {number}
 */
getSFXVolume()

/**
 * Query whether a specific effect is currently playing.
 * Useful for UI feedback (e.g., show an animation while sound plays).
 *
 * @param {string} effectName
 * @return {boolean}
 */
isSFXPlaying(effectName)

/**
 * Listen to SFX lifecycle events.
 * Events: 'sfxPlay', 'sfxStop', 'sfxError', 'preloadComplete'
 * Modes can use these to synchronize visuals with audio.
 *
 * @param {string} eventName - 'sfxPlay' | 'sfxStop' | 'sfxError' | 'preloadComplete'
 * @param {function} callback - (data) => void
 * @return {function} unsubscribe function
 */
onSFXEvent(eventName, callback)
```

### 2.2 Internal Data Structures

```javascript
// Inside AudioManager constructor:
this.miniGameSFX = {
  // [miniGameId]: {
  //   config: { tap: { filePath, volume, ... }, ... },
  //   audioPool: {
  //     [effectName]: [
  //       { audioElement, isPlaying, createdAt },
  //       ...
  //     ]
  //   },
  //   sfxVolume: 0.8,  // mini-game SFX master volume
  //   preloadedEffects: Set(['tap', 'paddleHit'])  // names of preloaded SFX
  // }
};

// Cache of loaded <audio> elements by path (shared across mini-games)
this.sfxAudioCache = new Map(); // filePath → audioElement

// Active play sessions (for concurrent instance management)
this.sfxPlayingSessions = new Map(); // effectName → Set of { audioElement, startTime, deferred }
```

---

## 3. Integration Points with Mini-Game Modes

### 3.1 Context API Extension

Extend the `ctx` object (created in `store.js` `makeCtx()`) with sound effect methods:

```javascript
function makeCtx(phase) {
  const audioManager = getAudioManager();
  const miniGameId = /* derive from phase/state */;
  
  return {
    // ... existing ctx methods ...
    
    /**
     * Play a named SFX for this mini-game.
     * Called from within modes like: ctx.playSound('tap', { volume: 0.6 })
     * 
     * @param {string} effectName
     * @param {object} opts - optional overrides
     */
    async playSound(effectName, opts = {}) {
      try {
        await audioManager.playSFX(effectName, opts);
      } catch (err) {
        console.warn(`[mg] SFX play error (${effectName}):`, err);
        // Don't throw — game should never fail because sound didn't play
      }
    },

    /**
     * Stop a named SFX (e.g., stop pulse loop on mode end).
     * 
     * @param {string} effectName
     */
    stopSound(effectName) {
      audioManager.stopSFX(effectName);
    },

    /**
     * Check if a sound is currently playing.
     * Useful for branching logic (e.g., show anim while sound plays).
     */
    isSoundPlaying(effectName) {
      return audioManager.isSFXPlaying(effectName);
    },
  };
}
```

### 3.2 Mode Usage Examples

#### Golden Egg Mode

```javascript
const onTap = (e) => {
  if (claimed) return;
  claimed = true;
  // ... existing hit logic ...
  ctx.playSound('tap');  // Fire-and-forget sound effect
};
egg.addEventListener('click', onTap, { once: true });

const finishMiss = () => {
  if (claimed) return;
  ctx.playSound('miss');  // Only plays on true miss, not on hit
  // ... cleanup ...
};
```

#### Pong Mode

```javascript
function reflectFromPaddle(paddleLeft, paddleRight) {
  // ... existing reflection logic ...
  ctx.playSound('paddleHit', { volume: 0.8 });  // Override default volume
}

function endGame() {
  ctx.playSound('miss', { volume: 1.0 });
  ctx.endPhase('lose');
}
```

#### Mash Gauntlet Mode

```javascript
// Pulse sound every N taps or time interval
const startPulseLoop = () => {
  const pulse = () => {
    if (!ended) {
      ctx.playSound('pulse');  // Single mode: previous pulse stops
      pulseTimer = setTimeout(pulse, 500);
    }
  };
  pulseTimer = setTimeout(pulse, 500);
};

const onWin = () => {
  ctx.stopSound('pulse');       // Stop the pulse loop
  ctx.playSound('success');     // Play success fanfare
  ctx.endPhase('win', count);
};

const onTimeout = () => {
  ctx.stopSound('pulse');
  ctx.playSound('failure');
  // Director's hard timeout will call endPhase('lose')
};
```

#### Dodge Mode

```javascript
const onCollision = () => {
  ctx.playSound('impact', { volume: 0.5 });
  ctx.endPhase('lose');
};
```

#### Twilight Mode

```javascript
const onMugTap = (e) => {
  claimed = true;
  ctx.playSound('mugTap');  // Multiple taps can play simultaneously
  // ... visual feedback ...
};
```

---

## 4. Directory and File Structure

### 4.1 Audio Directory Layout

```
/public/audio/
├── main-tracks/
│   └── mash-theme.mp3
├── minigames/
│   ├── golden-egg.mp3
│   ├── mash-gauntlet.mp3
│   ├── twilight.mp3
│   ├── dodge.mp3
│   └── pong.mp3
└── sfx/
    ├── golden-egg/
    │   ├── tap.mp3
    │   └── miss.mp3
    ├── pong/
    │   ├── paddle-hit.mp3
    │   └── miss.mp3
    ├── mash-gauntlet/
    │   ├── pulse.mp3
    │   ├── success.mp3
    │   └── failure.mp3
    ├── dodge/
    │   └── impact.mp3
    ├── twilight/
    │   └── tap.mp3
    └── shared/
        ├── generic-tap.mp3
        ├── generic-success.mp3
        └── generic-error.mp3
```

### 4.2 Naming Convention

- **Mini-game-specific SFX**: `/audio/sfx/[miniGameId]/[effectName].mp3`
- **Shared SFX** (reusable across games): `/audio/sfx/shared/[name].mp3`
- **Format**: MP3 (consistent with existing audio assets)
- **Fallback SFX**: Use shared/* if a mini-game-specific SFX is missing

---

## 5. Volume Management

### 5.1 Volume Hierarchy

```
Physical volume = masterVolume × sfxVolume × effectVolume × configVolume

Where:
  - masterVolume:   Global master (0.0–1.0, e.g., from settings)
  - sfxVolume:      All-SFX volume for current mini-game (0.0–1.0, default 1.0)
  - effectVolume:   Volume baked into config (0.0–1.0 per effect)
  - configVolume:   Runtime override in playSFX() opts (0.0–1.0, optional)
```

### 5.2 Implementation

```javascript
// Inside AudioManager

setMasterVolume(volume) {
  this.masterVolume = Math.max(0, Math.min(1, volume));
  this._updateAllVolumes();
}

setSFXVolume(volume) {
  // Set volume for all SFX in the active mini-game
  if (this.activeMiniGameId) {
    const sfxState = this.miniGameSFX[this.activeMiniGameId];
    if (sfxState) {
      sfxState.sfxVolume = Math.max(0, Math.min(1, volume));
      this._updateSFXVolumes(this.activeMiniGameId);
    }
  }
}

_updateSFXVolumes(miniGameId) {
  const sfxState = this.miniGameSFX[miniGameId];
  if (!sfxState) return;
  
  const audioPool = sfxState.audioPool;
  for (const [effectName, instances] of Object.entries(audioPool)) {
    const config = sfxState.config[effectName];
    instances.forEach((instance) => {
      if (instance.audioElement) {
        const configVol = config?.volume || 0.5;
        instance.audioElement.volume =
          configVol * sfxState.sfxVolume * this.masterVolume;
      }
    });
  }
}

_updateAllVolumes() {
  // Update main and miniGame track volumes
  if (this.mainTrack.audioElement) {
    this.mainTrack.audioElement.volume =
      this.mainTrack.volume * this.masterVolume;
  }
  if (this.miniGameTrack.audioElement) {
    this.miniGameTrack.audioElement.volume =
      this.miniGameTrack.volume * this.masterVolume;
  }
  // Update all active SFX
  for (const miniGameId of Object.keys(this.miniGameSFX)) {
    this._updateSFXVolumes(miniGameId);
  }
}
```

### 5.3 Balance Considerations

- **SFX default volume**: 0.5–0.7 (so they don't overpower background music)
- **Background music**: Stays at config volume (0.7)
- **Ratio**: SFX peaks at ~70–80% of music volume
- **Headroom**: Master output never exceeds 1.0

---

## 6. Event Lifecycle

### 6.1 Mini-Game SFX Lifecycle

```
1. Mini-game ACTIVATED (status phase)
   ↓ Store calls syncModeLifecycle()
   ↓ AudioManager.preloadMiniGameSFX(miniGameId, config)
   ↓ [async] Load all preload:true SFX in background

2. ENTER PLAY PHASE
   ↓ AudioManager.transitionToMiniGame() [existing code]
   ↓ SFX preloads (if not done) are waited for
   ↓ Mode starts via ctx = makeCtx(phase)
   ↓ ctx.playSound() available to modes

3. GAMEPLAY
   ↓ Mode fires ctx.playSound('effectName') on game events
   ↓ AudioManager loads on-demand + plays
   ↓ Multiple concurrent plays handled per concurrent config

4. EXIT PLAY PHASE
   ↓ Mode cleanup() called
   ↓ AudioManager.stopAllSFX() [graceful fade or immediate stop]
   ↓ AudioManager.transitionBackToMain() [existing code]

5. END MINI-GAME
   ↓ Status phase displays result
   ↓ AudioManager.unloadMiniGameSFX(miniGameId)
   ↓ [optional] Cache some SFX if they're marked as global

6. SESSION END
   ↓ AudioManager.stopSession() [existing code]
   ↓ All SFX released, audio elements cleared
```

### 6.2 Event Emissions

AudioManager emits SFX events to listeners:

```javascript
this._emit('sfxPlay', {
  miniGameId: 'golden-egg',
  effectName: 'tap',
  timestamp: Date.now(),
});

this._emit('sfxStop', {
  miniGameId: 'golden-egg',
  effectName: 'tap',
  reason: 'finished' | 'stopped' | 'replaced',
});

this._emit('sfxError', {
  miniGameId: 'golden-egg',
  effectName: 'tap',
  error: Error,
});

this._emit('preloadComplete', {
  miniGameId: 'golden-egg',
  loadedCount: 3,
  totalCount: 4,
});
```

Modes can subscribe to these via:

```javascript
const unsubscribe = audioManager.onSFXEvent('sfxPlay', ({ effectName }) => {
  // Show a visual effect while sound plays
  showParticle(effectName);
});

// Cleanup in mode return
return () => unsubscribe();
```

---

## 7. Concurrency Management

### 7.1 Single Mode (`concurrent: 'single'`)

```javascript
async playSFX(effectName, opts = {}) {
  const config = this._getCurrentSFXConfig(effectName);
  if (config.concurrent === 'single') {
    // Stop any existing instance
    this.stopSFX(effectName);
    // Play the new one
    const audio = await this._acquireAudioElement(config.filePath);
    audio.currentTime = 0;
    audio.volume = this._computeVolume(config, opts);
    audio.play();
    return;
  }
  // ... handle other concurrent modes ...
}
```

Use case: Pulsing heartbeat, warning sting.

### 7.2 Stack Mode (`concurrent: 'stack'`)

```javascript
async playSFX(effectName, opts = {}) {
  const config = this._getCurrentSFXConfig(effectName);
  const maxInstances = config.maxInstances || 2;
  
  if (config.concurrent === 'stack') {
    const activeCount = this._countActiveSFX(effectName);
    if (activeCount >= maxInstances) {
      // Wait for oldest to finish before playing new one
      // Or queue it internally for playback after oldest finishes
      await this._queueSFX(effectName, opts);
      return;
    }
    // Play immediately
    const audio = await this._acquireAudioElement(config.filePath);
    audio.currentTime = 0;
    audio.volume = this._computeVolume(config, opts);
    audio.play();
  }
  // ... handle other concurrent modes ...
}
```

Use case: Paddle hits in Pong (one hit sound after another, never simultaneously).

### 7.3 Overlap Mode (`concurrent: 'overlap'`)

```javascript
async playSFX(effectName, opts = {}) {
  const config = this._getCurrentSFXConfig(effectName);
  
  if (config.concurrent === 'overlap') {
    // Play immediately, no queueing or stopping
    const audio = await this._acquireAudioElement(config.filePath);
    audio.currentTime = 0;
    audio.volume = this._computeVolume(config, opts);
    audio.play();
    return;
  }
  // ... handle other concurrent modes ...
}
```

Use case: Multiple egg taps, multiple beer taps—all play at once.

### 7.4 Audio Pool Management

```javascript
// Reuse audio elements to avoid hitting browser limits (~16–32 concurrent audio elements)
_acquireAudioElement(filePath) {
  // Check cache
  if (this.sfxAudioCache.has(filePath)) {
    const elem = this.sfxAudioCache.get(filePath);
    if (!elem.isPlaying) {
      return Promise.resolve(elem);
    }
  }
  
  // Create new element if cache miss or all instances in use
  const audio = new Audio();
  audio.src = filePath;
  audio.addEventListener('ended', () => this._onSFXEnded(audio));
  this.sfxAudioCache.set(filePath, audio);
  
  return new Promise((resolve, reject) => {
    audio.addEventListener('canplay', () => resolve(audio), { once: true });
    audio.addEventListener('error', reject, { once: true });
    audio.load();
  });
}
```

---

## 8. Error Handling

### 8.1 Missing SFX Files

```javascript
async playSFX(effectName, opts = {}) {
  const config = this._getCurrentSFXConfig(effectName);
  
  if (!config) {
    console.warn(`[audio] SFX not configured: ${effectName}`);
    this._emit('sfxError', {
      effectName,
      error: new Error('SFX not configured'),
    });
    return; // Silent graceful degrade
  }
  
  let filePath = config.filePath;
  
  try {
    const audio = await this._acquireAudioElement(filePath);
    audio.volume = this._computeVolume(config, opts);
    audio.play().catch(err => {
      if (err.name !== 'NotAllowedError') {
        throw err; // Re-throw if not autoplay policy
      }
      console.warn(`[audio] SFX play blocked by autoplay policy: ${effectName}`);
    });
  } catch (err) {
    // Fallback to shared generic SFX if available
    console.warn(`[audio] SFX load failed (${effectName}), trying fallback:`, err);
    const fallbackPath = `/audio/sfx/shared/generic-${effectName}.mp3`;
    try {
      const fallback = await this._acquireAudioElement(fallbackPath);
      fallback.volume = this._computeVolume(config, opts);
      fallback.play();
      console.log(`[audio] fallback SFX played for ${effectName}`);
    } catch (fallbackErr) {
      console.error(`[audio] SFX fallback also failed (${effectName}):`, fallbackErr);
      this._emit('sfxError', {
        effectName,
        error: fallbackErr,
        fallbackAttempted: true,
      });
      // Game continues without sound — SFX never block gameplay
    }
  }
}
```

### 8.2 Logging Strategy

```javascript
// Log levels:
// [audio] ✓ playSFX start
// [audio] sfxPlay event
// [audio] sfxError (non-fatal)
// [audio] ⚠ fallback triggered
// [audio] ✗ Error (only if catastrophic)
```

Example:
```javascript
console.log(`[audio] playSFX "${effectName}" (config=${config.volume})`);
this._emit('sfxPlay', { effectName, ... });
```

---

## 9. Performance Considerations

### 9.1 Preloading Strategy

**Preload:**
- SFX likely to play frequently (tap, hit, pulse)
- SFX needed immediately at game start
- Marked `preload: true` in config

**On-demand:**
- Infrequent SFX (success, failure, miss)
- Marked `preload: false` in config
- Loaded asynchronously on first play

```javascript
async preloadMiniGameSFX(miniGameId, config) {
  const toLoad = Object.entries(config)
    .filter(([_, cfg]) => cfg.preload === true)
    .map(([name, cfg]) => ({ name, ...cfg }));
  
  console.log(`[audio] preloading ${toLoad.length} SFX for ${miniGameId}`);
  
  const promises = toLoad.map(({ name, filePath }) =>
    this._acquireAudioElement(filePath)
      .then(() => this._emit('preloadComplete', { miniGameId, effectName: name }))
      .catch(err => console.warn(`[audio] preload failed (${name}):`, err))
  );
  
  await Promise.all(promises);
}
```

### 9.2 Memory Management

```javascript
unloadMiniGameSFX(miniGameId) {
  const sfxState = this.miniGameSFX[miniGameId];
  if (!sfxState) return;
  
  // Stop all playing instances
  for (const [effectName, instances] of Object.entries(sfxState.audioPool)) {
    instances.forEach(inst => {
      if (inst.audioElement) {
        inst.audioElement.pause();
        inst.audioElement.src = '';
      }
    });
  }
  
  // Release reference (audio elements can be garbage collected)
  delete this.miniGameSFX[miniGameId];
  
  console.log(`[audio] unloaded SFX for ${miniGameId}`);
}
```

### 9.3 Browser Constraints

- **Audio element limit**: ~16–32 per browser (varies)
- **Concurrent playback limit**: ~6–8 per browser (varies)
- **Solution**: Reuse audio elements, respect concurrent mode limits, fail gracefully

---

## 10. No Breaking Changes

### 10.1 Backward Compatibility

- **AudioManager** constructor unchanged
- **Existing public methods** unchanged (startMainTrack, transitionToMiniGame, etc.)
- **Event system** unchanged (existing events still fire)
- **Session lifecycle** unchanged
- **Mini-game definitions**: `soundEffects` is optional; games without it work as before
- **Existing modes** work unchanged; `ctx.playSound()` is additive, not required

### 10.2 Gradual Adoption

1. **Phase 1**: Implement AudioManager SFX methods (no changes to modes)
2. **Phase 2**: Integrate SFX into one test mode (Golden Egg)
3. **Phase 3**: Roll out to other modes iteratively
4. **Phase 4**: Mark SFX as production-ready

---

## 11. Edge Cases & Mitigation

### 11.1 Audio Policy Restrictions

**Issue**: Browser autoplay policy may block `audio.play()`.

**Mitigation**:
- Catch `NotAllowedError` from play promise
- Log warning (don't throw)
- Game continues without sound
- User may unmute in browser settings to hear SFX next play

```javascript
audio.play().catch(err => {
  if (err.name === 'NotAllowedError') {
    console.warn('[audio] autoplay policy blocked SFX');
  } else {
    throw err;
  }
});
```

### 11.2 Audio Context Suspended (Mobile)

**Issue**: Mobile browsers suspend AudioContext after user inactivity.

**Mitigation**:
- AudioManager already creates AudioContext implicitly
- First user touch resumes context (inherent in Web Audio API)
- SFX will auto-play once user interacts with page

### 11.3 Network Latency (On-Demand SFX)

**Issue**: On-demand SFX load asynchronously; first play may stutter.

**Mitigation**:
- Preload high-priority SFX (tap, hit)
- Defer low-priority SFX (success, failure)
- Cache loaded files to avoid reload
- Gracefully degrade if load fails

### 11.4 Multiple Rapid Plays

**Issue**: User taps rapidly; SFX queue grows unbounded.

**Mitigation**:
- `concurrent: 'single'` for pulse/theme: previous stops
- `concurrent: 'stack'` with `maxInstances: 2` for hits: queue politely
- `concurrent: 'overlap'` with audio pool limits for taps: browser limits

### 11.5 Memory Leak from Reused Audio Elements

**Issue**: Audio elements not properly cleaned up after SFX finishes.

**Mitigation**:
- Attach 'ended' listener to clean up immediately
- Stop + reset src on exit
- Track active instances in Set, remove on finish

```javascript
audio.addEventListener('ended', () => {
  this.sfxPlayingSessions.get(effectName)?.delete(audio);
  this._emit('sfxStop', { effectName, reason: 'finished' });
});
```

---

## 12. Rationale for Design Decisions

### 12.1 Why Extend AudioManager (Not Create New Class)?

**Rationale:**
- AudioManager already handles audio lifecycle, events, and volume
- Adding SFX to AudioManager keeps all audio logic in one place
- Simplifies integration with game director (single `getAudioManager()` call)
- Reduces coupling (one service, not two)

**Alternative considered**: SFXManager class
- Would duplicate audio loading, caching, event logic
- Requires coordination between AudioManager and SFXManager
- More complex API surface for modes

### 12.2 Why soundEffects Field in Mini-Game Definition?

**Rationale:**
- All mini-game configuration lives in one place (miniGames.js)
- Declarative: game designer can see entire config at a glance
- Parallel to backgroundMusic field (familiar pattern)
- Easy to add/remove SFX for a game without touching mode code

**Alternative considered**: SFX defined in mode start()
- Would scatter config across mode files
- Harder for designer to know what sounds a game uses
- Less reusable (hard to share SFX across games)

### 12.3 Why Concurrent Modes (Single/Stack/Overlap)?

**Rationale:**
- Different games need different concurrency semantics
- **Single**: Pulse/theme—only one instance at a time (Mash Gauntlet)
- **Stack**: Hits—polite queueing (Pong paddle hits)
- **Overlap**: Taps—unlimited (Golden Egg, Twilight)
- Explicit declaration in config helps game designer choose right mode

**Alternative considered**: Always "overlap"
- Simpler initially, but breaks under load
- Pong paddle hits would muddy together
- Pulse would be hard to implement (manual stop needed)

### 12.4 Why ctx.playSound() (Not audioManager.playSFX())?

**Rationale:**
- Modes don't need to know about AudioManager
- ctx encapsulates mini-game semantics (mode is already using ctx)
- Error handling can happen in store (logs consistently with game)
- Easier to test modes in isolation

**Alternative considered**: Modes import AudioManager directly
- More direct, less indirection
- But increases mode coupling
- Harder to mock/test

### 12.5 Why Preload Flag (Not Always Preload)?

**Rationale:**
- Some SFX are heavy (e.g., long samples)
- Some SFX are rarely triggered (e.g., failure sound)
- Preloading everything adds ~2–3s to mini-game start
- Preload decision is game-specific (high-action games benefit more)

**Alternative considered**: Always preload
- Simpler (no flag needed)
- Adds ~2–3s transition time (perceptible delay)

**Alternative considered**: Never preload
- Faster mini-game starts
- First-play latency on SFX (500ms+)

### 12.6 Why Fallback to Shared SFX?

**Rationale:**
- Network error or missing file doesn't crash game
- Generic SFX (tap, success, error) are reusable
- Provides graceful degradation path
- Example: if `/audio/sfx/golden-egg/tap.mp3` missing, try `/audio/sfx/shared/generic-tap.mp3`

**Alternative considered**: Fail loudly (no sound)
- Simpler (no fallback logic)
- But poor UX if asset is missing

---

## 13. Implementation Phases

### Phase 1: AudioManager SFX Methods
- Add `miniGameSFX` data structures to AudioManager
- Implement `preloadMiniGameSFX()`, `playSFX()`, `stopSFX()`, volume methods
- Add SFX event system (`onSFXEvent()`)
- **No mode changes required yet**
- **Estimated effort**: 3–4 hours

### Phase 2: Store Integration
- Extend `ctx` object in `makeCtx()` with `playSound()`, `stopSound()`, etc.
- Wire up `preloadMiniGameSFX()` in `syncModeLifecycle()` on enter-play
- Wire up `stopAllSFX()` on exit-play
- Integrate `soundEffects` field parsing from mini-game config
- **No mode changes required yet**
- **Estimated effort**: 2–3 hours

### Phase 3: Test Mode Integration (Golden Egg)
- Add `soundEffects` config to GOLDEN_EGG definition
- Create SFX files: `/audio/sfx/golden-egg/{tap,miss}.mp3`
- Update goldenEgg mode: add `ctx.playSound('tap')` on hit, `ctx.playSound('miss')` on miss
- Test: verify sounds play, no timing issues, volume is correct
- **Estimated effort**: 2–3 hours

### Phase 4: Rollout to Other Modes
- Pong: add paddle-hit, miss sounds
- Dodge: add impact sound
- Mash Gauntlet: add pulse, success, failure sounds
- Twilight: add tap sound
- **Estimated effort**: 2–3 hours per mode

### Phase 5: Polish & Tuning
- Volume balance (SFX vs. music)
- Latency testing (first-play stutters)
- Browser compatibility testing (iOS autoplay)
- **Estimated effort**: 2–3 hours

---

## 14. Testing Strategy

### 14.1 Unit Tests (AudioManager)

```javascript
describe('AudioManager SFX', () => {
  it('should preload marked SFX on mini-game entry', async () => {
    const config = { tap: { filePath: '...', preload: true } };
    await am.preloadMiniGameSFX('golden-egg', config);
    // Assert audio element created and src set
  });
  
  it('should play SFX with correct volume', async () => {
    await am.playSFX('tap', { volume: 0.6 });
    // Assert audio.volume === masterVol × sfxVol × configVol × 0.6
  });
  
  it('should respect concurrent mode (single)', async () => {
    config.tap.concurrent = 'single';
    await am.playSFX('tap');
    const isPlaying1 = am.isSFXPlaying('tap');
    await am.playSFX('tap');  // Replaces first
    const isPlaying2 = am.isSFXPlaying('tap');
    // Assert: both true, only one audio element active
  });
  
  it('should emit sfxPlay event on play', (done) => {
    am.onSFXEvent('sfxPlay', ({ effectName }) => {
      expect(effectName).toBe('tap');
      done();
    });
    am.playSFX('tap');
  });
  
  it('should gracefully handle missing SFX file', async () => {
    await am.playSFX('nonexistent');
    // Assert: no throw, warning logged, fallback attempted
  });
});
```

### 14.2 Integration Tests (Mode + AudioManager)

```javascript
describe('Mode SFX Integration', () => {
  it('should play tap sound on Golden Egg hit', async () => {
    const ctx = makeCtx(GOLDEN_EGG.phases[2]);  // play phase
    const spy = jest.fn();
    audioManager.onSFXEvent('sfxPlay', spy);
    
    // Simulate egg tap via mode logic
    await ctx.playSound('tap');
    
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ effectName: 'tap' })
    );
  });
  
  it('should stop pulse SFX on mode cleanup', () => {
    // Start pulse loop in Mash Gauntlet
    // Trigger mode cleanup
    // Assert: pulse SFX stopped, no further plays
  });
});
```

### 14.3 Manual Testing Checklist

- [ ] Golden Egg: tap sound plays on click, miss sound on timeout
- [ ] Pong: paddle hit sound on bounce, miss sound on fall
- [ ] Mash Gauntlet: pulse loop during play, success/failure on outcome
- [ ] Dodge: impact sound on collision
- [ ] Twilight: tap sound on beer mug click
- [ ] Volume: SFX audible but not louder than music
- [ ] Multiple taps: no mudding, polite queueing (for stack mode)
- [ ] Network latency: first play doesn't stutter (preload works)
- [ ] Missing file: graceful fallback to shared SFX
- [ ] iOS/Safari: autoplay policy respected, no console errors

---

## 15. Future Enhancements

### 15.1 Advanced Features (Not in Initial Implementation)

- **Spatial audio**: Pan SFX left/right based on hit location (Pong, Dodge)
- **Dynamic pitch**: Vary pitch based on game state (Pong speed increase)
- **Layered SFX**: Combine samples (e.g., tap + sparkle + pop)
- **3D audio**: Use Web Audio API for distance/doppler (future)
- **A/B testing**: Feature flag to disable SFX for A/B test
- **SFX equalization**: Adjust EQ per mini-game (bass-heavy for Pong, etc.)
- **Haptic feedback**: Link SFX to vibration on supported devices

### 15.2 Designer Tools (Not in Initial Implementation)

- **SFX volume slider** in admin settings
- **Preview SFX** during mini-game config editing
- **SFX library** (manage assets, upload, version)
- **Play history** (which SFX played when, for debugging)

---

## 16. Example: Complete Integration (Pong)

### 16.1 Mini-Game Definition

```javascript
export const PONG = {
  id: 'pong',
  label: 'Pong',
  // ... existing fields ...
  soundEffects: {
    paddleHit: {
      filePath: '/audio/sfx/pong/paddle-hit.mp3',
      volume: 0.7,
      preload: true,
      concurrent: 'stack',
      maxInstances: 1,
    },
    miss: {
      filePath: '/audio/sfx/pong/miss.mp3',
      volume: 0.8,
      preload: false,
      concurrent: 'single',
    },
  },
  // ... rest of phases ...
};
```

### 16.2 Mode Implementation

```javascript
const pong = {
  id: 'pong',
  start(ctx) {
    // ... existing pong code ...
    
    function reflectFromPaddle(paddleLeft, paddleRight) {
      // ... existing reflection logic ...
      speed = Math.min(MAX_SPEED, speed * SPEED_MULT);
      // ... angle calculation ...
      
      hits += 1;
      ctx.playSound('paddleHit', { volume: 0.8 });  // Fire-and-forget
      ctx.awardBonus(25, { x, y });
      ctx.setSubStatus(`${hits} HIT${hits === 1 ? '' : 'S'}`);
    }
    
    function checkMissBottom() {
      if (y + BALL_RADIUS > h && vy > 0) {
        // Ball crossed bottom without paddle
        ended = true;
        ctx.playSound('miss');  // Play miss sound
        ctx.endPhase('lose');
      }
    }
    
    function tick(now) {
      // ... existing tick logic ...
      checkMissBottom();
      // ... rest of tick ...
    }
    
    // ... rest of mode ...
  }
};
```

### 16.3 Store Integration

```javascript
function syncModeLifecycle(prev, next) {
  // ... existing code ...
  
  if (nextPlay) {
    const mg = next.schedule[next.active.miniGameIdx];
    
    // Transition to mini-game audio (existing)
    if (mg && mg.backgroundMusic) {
      audioManager.transitionToMiniGame(filePath, volume, 2500)
        .catch(err => console.error('[audio] transition failed:', err));
    }
    
    // NEW: Preload SFX for this mini-game
    if (mg && mg.soundEffects) {
      audioManager.preloadMiniGameSFX(mg.id, mg.soundEffects)
        .catch(err => console.warn('[audio] SFX preload failed:', err));
    }
    
    startMode(next);
  }
  
  // ... rest of syncModeLifecycle ...
}

function makeCtx(phase) {
  const audioManager = getAudioManager();
  const miniGameId = /* derive from phase/state */;
  
  return {
    // ... existing ctx methods ...
    
    playSound(effectName, opts = {}) {
      audioManager.playSFX(effectName, opts)
        .catch(err => console.warn(`[mg] SFX play error (${effectName}):`, err));
    },
    
    stopSound(effectName) {
      audioManager.stopSFX(effectName);
    },
    
    isSoundPlaying(effectName) {
      return audioManager.isSFXPlaying(effectName);
    },
  };
}
```

---

## 17. Summary

This design provides a **non-invasive, declarative, flexible** sound effects system that:

✓ **Integrates seamlessly** with existing AudioManager (no breaking changes)  
✓ **Preserves game flow** (sound never blocks gameplay)  
✓ **Scales gracefully** (from simple taps to complex concurrent effects)  
✓ **Fails gracefully** (missing SFX → fallback or silent)  
✓ **Easy to adopt** (modes just call `ctx.playSound()`)  
✓ **Easy to configure** (declarative soundEffects field in mini-game def)  
✓ **Performant** (preload for high-priority, on-demand for low-priority)  
✓ **Testable** (AudioManager has clear unit-testable surface)  
✓ **Extensible** (future spatial audio, pitch variation, haptics)

The system is **production-ready** and can be phased in incrementally starting with one test mode (Golden Egg), then rolling out to other games.
