# Sound Effects Design System — Scrambled Legs Mini-Games

## Executive Summary

This document outlines a holistic approach to adding sound effects (SFX) to mini-games without cluttering the experience. The design emphasizes **game feel over quantity**: each SFX serves a clear mechanical or emotional purpose. The system integrates with the existing AudioManager for volume mixing and background music management, introduces a lightweight SFX registry alongside mini-game configs, and provides graceful degradation if audio fails.

---

## 1. Sound Catalog by Mini-Game

### 1.1 Golden Egg

**Game Goal**: Tap flying golden eggs for bonus points (no fail state)

**Sounds Needed**:

| Event | Sound Design | Why | Suggested Duration |
|-------|-------------|-----|-------------------|
| **Egg Spawns** | Soft whoosh/shimmer (low priority) | Gentle cue that egg is incoming; optional | 200-400ms |
| **Egg Tapped** | Bright, metallic "chime" or "coin-collect" sound with pitch variation | Instant, rewarding feedback; makes hitting feel satisfying | 300-600ms |
| **Egg Missed** | No sound OR subtle "whiff" (air-swoosh) | Don't punish misses; keeping quiet avoids frustration | 100-200ms |
| **Timeout/Win** | Uplifting ascending flourish (shared with Twilight) | Celebration without being obnoxious | 800ms-1.2s |

**Design Philosophy**: Golden Egg is chill and skill-reward focused. Sounds should feel crisp and satisfying (like tapping crystal) without being harsh. Pitch variation on successive taps (25 semitones up from base) creates melodic progression and discourages button-mashing on a single tap.

---

### 1.2 Twilight (Beer Tapping)

**Game Goal**: Tap floating beer mugs while mashing continues (no fail)

**Sounds Needed**:

| Event | Sound Design | Why | Suggested Duration |
|-------|-------------|-----|-------------------|
| **Beer Spawns** | Subtle foam/pour ambient loop (background) | Sets thematic context; loops at minimal volume | Varies (ambient) |
| **Beer Tapped** | Wet "clunk" or "clink" of glass + foam burst; lower pitch than Golden Egg | Distinct from Golden Egg despite similar mechanic; emphasizes liquid impact | 300-500ms |
| **All Beers Cleared** (brief moment) | Quick "cha-ching" or glass-raise sound | Momentary delight when screen empties | 200-300ms |
| **Timeout/Win** | Cheers/crowd murmur + clinking glasses ascending (shared with Golden Egg flourish but more celebratory) | Thematic celebration matching the "cheers/toast" flavor | 800ms-1.5s |

**Design Philosophy**: Twilight is social and thematic. Sounds should evoke a bar setting: clinking, pouring, toasting. Lower frequencies (glass, foam) contrast with Golden Egg's bright chimes. Background ambient loop keeps the bar feeling present without competing with gameplay sound.

---

### 1.3 Mash Gauntlet (Threshold Race)

**Game Goal**: Hit 25 presses within 5 seconds or lose; lose = end session

**Sounds Needed**:

| Event | Sound Design | Why | Suggested Duration |
|-------|-------------|-----|-------------------|
| **Intro/Countdown** | Rapid heartbeat or drum roll building | Tension ramp-up; preps player for intensity | 1-2s |
| **Press (first 5)** | Crisp "tap" or "tick" at normal tempo | Feedback that presses register; not overwhelming | 80-150ms |
| **Press (middle 5)** | Slightly higher-pitched ticks, slightly faster tempo | Escalating intensity as threshold approaches | 80-150ms |
| **Press (final 5)** | Rapid-fire high-pitch "pops" or "beeps" | Urgency; frantic pace matches player stress | 50-100ms |
| **Threshold Hit (WIN)** | Triumphant ascending arpeggio + impact bass | Relief + celebration; strong positive reinforcement | 800ms |
| **Timeout (LOSE)** | Descending "sad trombone" or warning buzzer | Clear failure signal; reinforces stakes | 600ms |

**Design Philosophy**: Mash Gauntlet has the highest emotional intensity. SFX should escalate with progression. Press sounds should be SHORT and NON-DISTRACTING (player is mashing rapidly). The tension curve is critical: early presses feel easy, final stretch feels frantic. Win/lose outcomes have strong auditory contrast.

---

### 1.4 Dodge (Draggable Biker Avoidance)

**Game Goal**: Drag avatar to avoid obstacles for 10 seconds; touch = lose, win = earn bonus

**Sounds Needed**:

| Event | Sound Design | Why | Suggested Duration |
|-------|-------------|-----|-------------------|
| **Obstacle Spawn** | Subtle whoosh or engine rev (contextual: car/truck sound) | Optional; hints incoming danger without being loud | 200-400ms |
| **Obstacle Near Avatar** | Proximity alert siren or beep (volume increases as distance closes) | Doppler-like threat indicator; spatial audio cue | 100-300ms (looped) |
| **Collision (LOSE)** | Hard impact thud + pain grunt or electronic "bzzt" crash | High-contrast failure; emphasizes stakes and urgency | 300-600ms |
| **Successful Dodge** | Slight "swoosh" or relief sigh | Positive micro-feedback; optional for frequent events | 150-250ms |
| **Timeout/Win** | Triumphant synth sting + bass drop | Celebration; reward for 10s of sustained attention | 800ms-1.2s |

**Design Philosophy**: Dodge is action-oriented and high-stress. Sounds support spatial awareness. The collision sound must be DISTINCT (not confused with taps) and IMPACTFUL (consequences matter). Proximity alerts create tension without requiring visual tracking. Win sound balances the difficulty with genuine celebration.

---

### 1.5 Pong (Ball/Paddle Mechanic)

**Game Goal**: Intercept ball with paddle for hits; miss = lose; survive 10s = win

**Sounds Needed**:

| Event | Sound Design | Why | Suggested Duration |
|-------|-------------|-----|-------------------|
| **Ball Spawns** | Subtle pluck or coin-flip sound | Minimal; doesn't distract during setup | 100-150ms |
| **Ball Bounces Wall** | Crisp "pong" or glass-tap sound (metallic, mid-frequency) | Feedback on ball motion; telegraphs trajectory | 150-250ms |
| **Paddle Hit (Intercept)** | Satisfying "pop" or "whack" with pitch variation (lower for edge hits, higher for center) | Primary success feedback; strong positive reinforcement | 300-500ms |
| **Paddle Miss (Lose)** | Sad "boop" descending or low-frequency thud | Immediate failure signal; gut-punch consequence | 400-600ms |
| **Speed Increase** | Ascending "ding" or rising tone glissando | Satisfying notification that ball sped up; encourages skill progression | 250-400ms |
| **Timeout/Win (10s) | Ascending triumphant chord progression + finale sting | Major reward for sustained gameplay; rare achievement | 1-1.5s |

**Design Philosophy**: Pong is arcade-like and score-driven. Sounds provide constant feedback as the ball bounces. Paddle hits and misses must be VERY DISTINCT auditorily (opposite frequency ranges, opposite emotional tone). Wall bounces keep the rhythm present. Speed-up sounds reward improvement and signal escalating challenge.

---

## 2. Volume Mixing Strategy

### 2.1 Baseline Philosophy

- **Background Music**: 0.7 volume (primary audio layer)
- **SFX**: 0.4–0.6 volume (secondary, supportive layer)
- **Relationship**: SFX should be audible without overpowering music or creating cacophony

### 2.2 Dynamic Ducking (Optional Enhancement)

**When to Duck (Lower) Background Music**:
- During high-impact events: collision hits (Dodge), paddle misses (Pong), loss outcomes
- During intensive moments: final-stretch presses in Mash Gauntlet, rapid beer taps in Twilight
- **Duck Amount**: 0.2–0.3 reduction (main track: 0.7 → 0.4–0.5)
- **Duration**: 200–500ms (short dip, not a full fade)

**Pseudocode**:
```javascript
// In AudioManager extension (SFX support layer)
async playWithDuck(sfxPath, sfxVolume, shouldDuck) {
  if (shouldDuck && this.miniGameTrack.isPlaying) {
    // Fade main track down by 0.25
    await this._fadeTrack(this.miniGameTrack, 0.7, 0.45, 150);
  }
  
  // Play SFX (new method, see Section 4)
  const sfxPromise = this.playSfx(sfxPath, sfxVolume);
  
  // Restore music after SFX ends + 50ms buffer
  await sfxPromise;
  setTimeout(() => {
    if (shouldDuck && this.miniGameTrack.isPlaying) {
      this._fadeTrack(this.miniGameTrack, 0.45, 0.7, 200);
    }
  }, 50);
}
```

### 2.3 Multi-SFX Scenarios (Handling Overlaps)

**Problem**: Rapid taps (Mash Gauntlet) or simultaneous events (multiple beers in Twilight) trigger multiple SFX at once.

**Solution — Polyphonic Playback with Concurrency Cap**:
- **Max concurrent SFX instances**: 4 (configurable per game)
- **Queue strategy**: If limit exceeded, drop oldest instance (FIFO)
- **Volume scaling**: If 3+ concurrent, apply 0.85 volume scale to prevent harshness
- **Example**: 25 rapid taps in Mash Gauntlet = 4 simultaneous "tick" sounds, oldest fades as new ones fire

**Pseudocode**:
```javascript
class SfxManager {
  constructor(maxConcurrent = 4) {
    this.activeSfx = new Map(); // soundId -> { audioElement, startTime }
    this.maxConcurrent = maxConcurrent;
    this.soundCounter = 0;
  }

  playSfx(sfxPath, volume = 0.5, options = {}) {
    const { throttle = 0, duck = false } = options;
    
    // Throttle check: if same sound played <throttle ms ago, skip
    if (throttle > 0) {
      const lastPlay = this._lastPlayTimes.get(sfxPath) || 0;
      if (Date.now() - lastPlay < throttle) return;
    }

    // Concurrency cap: remove oldest if over limit
    if (this.activeSfx.size >= this.maxConcurrent) {
      const oldest = Array.from(this.activeSfx.entries())
        .sort((a, b) => a[1].startTime - b[1].startTime)[0];
      if (oldest) {
        oldest[1].audioElement.pause();
        this.activeSfx.delete(oldest[0]);
      }
    }

    // Volume attenuation if many concurrent
    let finalVolume = volume;
    if (this.activeSfx.size >= 3) finalVolume *= 0.85;

    const soundId = `${sfxPath}-${this.soundCounter++}`;
    const audio = new Audio(sfxPath);
    audio.volume = finalVolume * this.masterVolume;
    audio.play().catch(err => console.warn('SFX play failed:', err));

    const instance = { audioElement: audio, startTime: Date.now() };
    this.activeSfx.set(soundId, instance);

    // Auto-cleanup when done
    audio.addEventListener('ended', () => {
      this.activeSfx.delete(soundId);
    }, { once: true });

    if (duck) {
      this._duckMainTrack(150, 200);
    }

    return soundId;
  }
}
```

---

## 3. Schema Design — How Mini-Games Define Sounds

### 3.1 SFX Property in Mini-Game Config

Add a top-level `soundEffects` object to each mini-game definition (alongside `backgroundMusic`, `rules`, etc.):

```javascript
// Example: GOLDEN_EGG with SFX
export const GOLDEN_EGG = {
  id: 'golden-egg',
  label: 'Golden Egg',
  // ... existing rules, phases, etc. ...
  
  soundEffects: {
    // Global config for this game's SFX
    masterVolume: 0.5,      // Relative to AudioManager's masterVolume
    maxConcurrent: 3,       // Max overlapping SFX
    duckMusic: false,       // Don't duck music on taps
    
    // Event-based triggers
    events: {
      'egg:spawn': {
        path: '/audio/sfx/games/golden-egg/spawn-whoosh.mp3',
        volume: 0.3,
        throttle: 200,      // Minimum ms between repeats (avoid spam)
        enabled: false,     // Optional SFX, disabled by default
      },
      'egg:hit': {
        path: '/audio/sfx/games/golden-egg/chime-collect.mp3',
        volume: 0.55,
        pitchVariation: { min: 0.95, max: 1.05, step: 25 }, // Semitone steps
        throttle: 0,
        enabled: true,
      },
      'egg:miss': {
        path: '/audio/sfx/games/golden-egg/whiff.mp3',
        volume: 0.25,
        throttle: 300,
        enabled: false,
      },
      'outcome:win': {
        path: '/audio/sfx/games/shared/victory-flourish.mp3',
        volume: 0.6,
        enabled: true,
      },
    },
  },
};
```

### 3.2 Grouped Registry Structure

Create a centralized SFX registry in `/src/game/soundRegistry.js`:

```javascript
// File: /src/game/soundRegistry.js
// Centralized catalog of all SFX paths and metadata

export const SFX_CATALOG = {
  // Shared (cross-game)
  shared: {
    victory: {
      flourish: '/audio/sfx/shared/victory-flourish.mp3',
      cheers: '/audio/sfx/shared/victory-cheers.mp3',
    },
    impact: {
      collision: '/audio/sfx/shared/collision-impact.mp3',
      penalty: '/audio/sfx/shared/failure-buzz.mp3',
    },
  },

  // Per-game catalogs
  goldenEgg: {
    events: {
      eggSpawn: '/audio/sfx/games/golden-egg/spawn-whoosh.mp3',
      eggHit: '/audio/sfx/games/golden-egg/chime-collect.mp3',
      eggMiss: '/audio/sfx/games/golden-egg/whiff.mp3',
    },
  },

  twilight: {
    ambient: '/audio/sfx/games/twilight/bar-ambience-loop.mp3',
    events: {
      beerSpawn: '/audio/sfx/games/twilight/pour-splash.mp3',
      beerHit: '/audio/sfx/games/twilight/glass-clink.mp3',
      beerClear: '/audio/sfx/games/twilight/cheers-cheer.mp3',
    },
  },

  mashGauntlet: {
    events: {
      countdown: '/audio/sfx/games/mash-gauntlet/heartbeat-drum.mp3',
      pressEarly: '/audio/sfx/games/mash-gauntlet/tick-normal.mp3',
      pressMid: '/audio/sfx/games/mash-gauntlet/tick-fast.mp3',
      pressLate: '/audio/sfx/games/mash-gauntlet/tick-frantic.mp3',
      winThreshold: '/audio/sfx/games/mash-gauntlet/victory-arpeggio.mp3',
      loseTimeout: '/audio/sfx/games/mash-gauntlet/sad-trombone.mp3',
    },
  },

  dodge: {
    events: {
      obstacleSpawn: '/audio/sfx/games/dodge/whoosh-engine.mp3',
      proximityAlert: '/audio/sfx/games/dodge/siren-beep.mp3',
      collision: '/audio/sfx/games/dodge/impact-thud.mp3',
      dodgeSuccess: '/audio/sfx/games/dodge/whoosh-relief.mp3',
      win: '/audio/sfx/games/dodge/synth-victory.mp3',
    },
  },

  pong: {
    events: {
      ballSpawn: '/audio/sfx/games/pong/pluck.mp3',
      wallBounce: '/audio/sfx/games/pong/pong-glass-tap.mp3',
      paddleHit: '/audio/sfx/games/pong/paddle-whack.mp3',
      paddleMiss: '/audio/sfx/games/pong/sad-boop.mp3',
      speedUp: '/audio/sfx/games/pong/ding-rise.mp3',
      win: '/audio/sfx/games/pong/arcade-victory.mp3',
    },
  },
};

// Helper: resolve a SFX key (e.g. "goldenEgg.events.eggHit") to path
export function getSfxPath(game, category, event) {
  const catalog = SFX_CATALOG[game];
  if (!catalog) return null;
  const cat = catalog[category];
  if (!cat) return null;
  return cat[event] || null;
}
```

### 3.3 Mini-Game Config Using Registry

Simplified config referencing the registry:

```javascript
export const GOLDEN_EGG = {
  id: 'golden-egg',
  // ... existing properties ...
  
  soundEffects: {
    masterVolume: 0.5,
    maxConcurrent: 3,
    duckMusic: false,
    catalog: 'goldenEgg',  // Reference to SFX_CATALOG.goldenEgg
    
    events: {
      'egg:hit': {
        key: 'eggHit',       // Resolves to SFX_CATALOG.goldenEgg.events.eggHit
        volume: 0.55,
        pitchVariation: { min: 0.95, max: 1.05, step: 25 },
      },
      'egg:spawn': {
        key: 'eggSpawn',
        volume: 0.3,
        enabled: false,
      },
      'outcome:win': {
        key: 'shared.victory.flourish',
        volume: 0.6,
      },
    },
  },
};
```

---

## 4. Integration Architecture — Extending AudioManager for SFX

### 4.1 New SfxManager Class

Create `/src/services/SfxManager.js` (separate from AudioManager, but sibling):

```javascript
// Pseudocode: SfxManager — lightweight SFX orchestration

class SfxManager {
  constructor(audioManager) {
    this.audioManager = audioManager;
    this.activeSfx = new Map();    // soundId -> { audioElement, startTime }
    this.soundCounter = 0;
    this.maxConcurrentGlobal = 6;  // Across all games
    this.soundInstanceLimit = new Map(); // Per-sound concurrency caps
    this._lastPlayTimes = new Map(); // soundPath -> Date.now()
    this.masterVolume = 1.0;
  }

  /**
   * Play a single SFX with optional ducking, throttling, pitch variation
   * Returns a promise that resolves when the sound ends
   */
  async playSfx(sfxPath, options = {}) {
    const {
      volume = 0.5,
      throttle = 0,           // ms between repeats of same sound
      duck = false,           // Temporarily lower background music
      duckAmount = 0.25,      // How much to reduce volume (0.25 = -25%)
      duckDuration = 200,     // ms for music to fade back
      pitchShift = 1.0,       // Playback rate (1.05 = 5% faster)
      enabled = true,
    } = options;

    if (!enabled || !sfxPath) return null;

    // Throttle: skip if same sound played recently
    if (throttle > 0) {
      const lastPlay = this._lastPlayTimes.get(sfxPath) || 0;
      if (Date.now() - lastPlay < throttle) return null;
    }

    // Concurrency cap: if too many concurrent sounds, drop oldest
    if (this.activeSfx.size >= this.maxConcurrentGlobal) {
      const oldest = Array.from(this.activeSfx.entries())
        .sort((a, b) => a[1].startTime - b[1].startTime)[0];
      if (oldest) {
        this._cleanupSound(oldest[0]);
      }
    }

    try {
      // Ducking: lower background music if requested
      let musicFadeId = null;
      if (duck && this.audioManager.currentMode === 'miniGame') {
        musicFadeId = this._duckBackgroundMusic(duckAmount, duckDuration);
      }

      // Create audio element and play
      const audio = new Audio(sfxPath);
      audio.volume = volume * this.masterVolume;
      audio.playbackRate = pitchShift;

      const soundId = `sfx-${this.soundCounter++}`;
      this.activeSfx.set(soundId, {
        audioElement: audio,
        startTime: Date.now(),
        musicFadeId,
      });

      this._lastPlayTimes.set(sfxPath, Date.now());

      // Auto-cleanup on end
      return new Promise((resolve) => {
        audio.addEventListener('ended', () => {
          this._cleanupSound(soundId);
          resolve();
        }, { once: true });
        
        audio.addEventListener('error', () => {
          console.warn(`[sfx] load error: ${sfxPath}`);
          this._cleanupSound(soundId);
          resolve();
        }, { once: true });

        audio.play().catch(err => {
          console.warn(`[sfx] play rejected:`, err.message);
          this._cleanupSound(soundId);
          resolve();
        });
      });
    } catch (err) {
      console.error(`[sfx] playSfx error:`, err);
      return null;
    }
  }

  /**
   * Play multiple SFX in sequence (e.g., hit + reward flourish)
   */
  async playSequence(sfxPaths, options = {}) {
    for (const path of sfxPaths) {
      await this.playSfx(path, options);
    }
  }

  /**
   * Fade and cleanup a specific sound
   */
  _cleanupSound(soundId) {
    const instance = this.activeSfx.get(soundId);
    if (!instance) return;

    const { audioElement, musicFadeId } = instance;
    audioElement.pause();
    audioElement.src = '';
    this.activeSfx.delete(soundId);

    if (musicFadeId) {
      clearTimeout(musicFadeId);
    }
  }

  /**
   * Temporarily lower background music volume
   */
  _duckBackgroundMusic(amount, duration) {
    const mgTrack = this.audioManager.miniGameTrack;
    if (!mgTrack || !mgTrack.audioElement || mgTrack.audioElement.volume === 0) {
      return null;
    }

    const originalVol = mgTrack.audioElement.volume;
    const targetVol = Math.max(0, originalVol - amount);

    // Fade down (fast)
    this.audioManager._fadeTrack(mgTrack.audioElement, originalVol, targetVol, 50);

    // Fade back up after SFX ends
    return setTimeout(() => {
      this.audioManager._fadeTrack(mgTrack.audioElement, targetVol, originalVol, duration);
    }, 100);
  }

  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  getMasterVolume() {
    return this.masterVolume;
  }
}

export function getSfxManager() {
  // Singleton, initialized after AudioManager
  if (!window._sfxManagerInstance) {
    const audioManager = getAudioManager();
    window._sfxManagerInstance = new SfxManager(audioManager);
  }
  return window._sfxManagerInstance;
}
```

### 4.2 Integration Point in Game Modes

Example: Golden Egg mode triggering SFX:

```javascript
// In src/game/modes/goldenEgg.js

import { getSfxManager } from '../../services/SfxManager.js';
import { getSfxPath } from '../soundRegistry.js';

const goldenEgg = {
  id: 'goldenEgg',
  start(ctx) {
    const sfxMgr = getSfxManager();
    const sfxConfig = ctx.gameDefinition.soundEffects; // Passed from mini-game config

    // On egg tap
    function onEggHit() {
      totalScore += reward;
      hitCount++;

      // Resolve SFX path from catalog
      const hitSfxPath = getSfxPath('goldenEgg', 'events', 'eggHit');
      
      // Play with pitch variation
      const pitchVariation = sfxConfig.events['egg:hit'].pitchVariation;
      const pitchShift = 1.0 + (hitCount % 25) / 1200 * pitchVariation.step;

      sfxMgr.playSfx(hitSfxPath, {
        volume: sfxConfig.events['egg:hit'].volume * sfxConfig.masterVolume,
        pitchShift,
        throttle: 50,
        enabled: true,
      }).catch(err => {
        console.warn(`[mg] SFX play failed (graceful degrade):`, err);
        // Game continues even if SFX fails
      });

      // Visual + haptic feedback still fires regardless of audio
      showFloatingText(`+${reward}`, eggPosition);
      triggerHapticIfAvailable();
    }

    // On game end
    async function onGameEnd(outcome) {
      const winSfxPath = getSfxPath('goldenEgg', 'events', 'outcome:win')
        || getSfxPath('shared', 'victory', 'flourish');
      
      if (outcome === 'win' && sfxConfig.events['outcome:win'].enabled) {
        await sfxMgr.playSfx(winSfxPath, {
          volume: sfxConfig.events['outcome:win'].volume * sfxConfig.masterVolume,
        });
      }

      ctx.endPhase('win', totalScore);
    }

    // ... rest of mode logic ...
  },
};
```

---

## 5. Directory Structure

Proposed audio asset organization:

```
/public/audio/
├── minigames/               # Background music (existing)
│   ├── golden-egg.mp3
│   ├── twilight.mp3
│   ├── mash-gauntlet.mp3
│   ├── dodge.mp3
│   └── pong.mp3
│
└── sfx/                     # NEW: Sound Effects
    ├── shared/
    │   ├── victory-flourish.mp3
    │   ├── victory-cheers.mp3
    │   ├── collision-impact.mp3
    │   └── failure-buzz.mp3
    │
    └── games/
        ├── golden-egg/
        │   ├── chime-collect.mp3      (bright metallic ping)
        │   ├── spawn-whoosh.mp3       (gentle air movement)
        │   └── whiff.mp3              (air pass, no contact)
        │
        ├── twilight/
        │   ├── glass-clink.mp3        (beer tap, mid-frequency)
        │   ├── pour-splash.mp3        (beer spawn, foam sound)
        │   ├── cheers-cheer.mp3       (quick celebration)
        │   └── bar-ambience-loop.mp3  (background loop)
        │
        ├── mash-gauntlet/
        │   ├── tick-normal.mp3        (baseline press sound)
        │   ├── tick-fast.mp3          (mid-game intensity)
        │   ├── tick-frantic.mp3       (final stretch urgency)
        │   ├── heartbeat-drum.mp3     (intro tension)
        │   ├── victory-arpeggio.mp3   (win celebration)
        │   └── sad-trombone.mp3       (lose outcome)
        │
        ├── dodge/
        │   ├── whoosh-engine.mp3      (obstacle spawn)
        │   ├── siren-beep.mp3         (proximity warning)
        │   ├── impact-thud.mp3        (collision fail)
        │   ├── whoosh-relief.mp3      (dodge success)
        │   └── synth-victory.mp3      (win celebration)
        │
        └── pong/
            ├── pluck.mp3              (ball spawn)
            ├── pong-glass-tap.mp3     (wall bounce)
            ├── paddle-whack.mp3       (successful hit)
            ├── sad-boop.mp3           (miss/lose)
            ├── ding-rise.mp3          (speed increase)
            └── arcade-victory.mp3     (win celebration)
```

**Sizing Recommendations**:
- **Shared SFX**: 100–200 KB (compressed MP3, bitrate 128 kbps)
- **Per-Game SFX**: 150–400 KB total (5–7 sounds per game)
- **Total SFX Payload**: ~2 MB (all 5 games + shared)
- **Comparison**: Single background music track is ~4–6 MB, so SFX footprint is modest

---

## 6. Performance & Loading Strategy

### 6.1 Preload vs. On-Demand

**Recommendation**: **Hybrid approach**

- **Preload on Session Start** (when mashing begins):
  - All SFX for enabled mini-games (only those in the active schedule)
  - Shared SFX (victories, collisions)
  - Rationale: Session is already 10–30 seconds long; preloading adds <200ms and eliminates latency during gameplay

- **On-Demand** (fallback):
  - If preload fails, SFX plays asynchronously when triggered
  - Graceful degradation: game continues, SFX may be slightly delayed

**Pseudocode**:
```javascript
// In store/director, before first mini-game:
async function initializeSession(miniGames) {
  const sfxMgr = getSfxManager();
  const sfxPaths = new Set();

  // Collect all SFX paths from enabled mini-games
  miniGames.forEach(mg => {
    const sfxConfig = mg.soundEffects;
    if (!sfxConfig) return;
    
    Object.values(sfxConfig.events).forEach(event => {
      if (event.enabled !== false) {
        const path = resolveSfxPath(event);
        if (path) sfxPaths.add(path);
      }
    });
  });

  // Preload: fire HTTP requests in background
  console.log(`[sfx] preloading ${sfxPaths.size} sounds...`);
  const preloadPromises = Array.from(sfxPaths).map(path => 
    fetch(path, { method: 'HEAD' }).catch(err => {
      console.warn(`[sfx] preload failed for ${path}:`, err.message);
      // Not critical; game continues
    })
  );

  // Don't await; fire and forget so game starts immediately
  Promise.all(preloadPromises).then(() => {
    console.log('[sfx] preload complete');
  });
}
```

### 6.2 Caching Strategy

Browser's standard caching applies (HTTP Cache-Control headers). No custom caching needed beyond:

1. **Cache-Busting on Deploy**: Append version hash to SFX URLs in production
   - `/audio/sfx/games/golden-egg/chime-collect.mp3?v=1a2b3c` (dev build)
   - Ensures new SFX versions load immediately

2. **IndexedDB for PWA** (future enhancement):
   - Store preloaded SFX in IndexedDB if frequent replay expected
   - Current need: probably overkill for single-session gameplay

---

## 7. UX Guidelines — When SFX Enhance vs. Clutter

### 7.1 Must-Have Sounds

These create **essential game feel**:
- ✓ **Successful hits** (Golden Egg tap, Twilight beer, Pong paddle)
- ✓ **High-stakes failures** (Pong miss, Dodge collision, Mash Gauntlet loss)
- ✓ **Outcome celebrations** (Win flourishes)
- ✓ **Intensity escalation** (Mash Gauntlet tension curve)

### 7.2 Nice-to-Have Sounds

These add flavor but are optional (`enabled: false` by default):
- ◇ Spawning events (egg whoosh, obstacle rev, ball pluck)
- ◇ Ambient loops (bar ambience in Twilight)
- ◇ Minor successes (dodge swoosh, non-hitting taps)

### 7.3 Avoid Over-Sonification

**Anti-patterns** (don't do these):
- ❌ SFX on **every button press** (creates cacophony; only on game-relevant presses)
- ❌ **Overlapping SFX** without volume control (muddy, disorienting)
- ❌ **Long SFX during rapid input** (Mash Gauntlet: keep tick sounds <150ms)
- ❌ **High-frequency SFX at high volume** (ear fatigue, accessibility issue)

### 7.4 Accessibility Considerations

- **Hearing Loss**: Provide visual + haptic alternatives
  - Color flash on collision (Dodge)
  - Hit counter on-screen (Pong)
  - Haptic pulse on successful tap (if device supports)

- **Audio Context Suspension** (browser autoplay restrictions):
  - All SFX play via `.play()` with `.catch()` fallback
  - Game logic never depends on SFX success; purely additive

---

## 8. Concurrency Model — Handling Overlapping SFX

### 8.1 Per-Sound Concurrency Limits

Allow the same SFX to play multiple times (e.g., multiple beer taps), but cap it:

```javascript
const CONCURRENCY_LIMITS = {
  'goldenEgg/eggHit': 2,       // 2 egg sounds max (rapid taps still audible)
  'twilight/beerHit': 3,       // 3 beer clinks (bar ambience vibe)
  'mash-gauntlet/tickNormal': 4, // 4 rapid tick sounds (cacophonic but intentional)
  'pong/wallBounce': 2,        // Ball bounces clearly
  'dodge/proximityAlert': 1,   // Only one siren at a time
};

// Check before playing:
const limitKey = `${catalog}/${event}`;
const concurrent = countInstancesOfSound(limitKey);
if (concurrent >= CONCURRENCY_LIMITS[limitKey]) {
  // Drop oldest, or skip entirely
  return; // Graceful skip
}
```

### 8.2 Global Falloff (Graceful Degradation)

If device CPU/audio thread is saturated:
1. Cap total concurrent sounds at 6 (configurable)
2. If exceeded, drop **lowest-priority** sound (lowest volume or longest-duration)
3. Emit telemetry event for debugging: `[sfx] concurrency_overflow: 8/6 sounds`

---

## 9. Failure Handling — Graceful Degradation

### 9.1 What If SFX File is Missing?

```javascript
// In SfxManager.playSfx:
audio.addEventListener('error', (e) => {
  console.warn(`[sfx] load error (${sfxPath}): ${e.message}`);
  // Don't re-throw; just cleanup and resolve
  this._cleanupSound(soundId);
  resolve(); // Promise resolves, game continues
});
```

**No retry logic**: If `chime-collect.mp3` doesn't load, tapping still gives points; just silently. User doesn't notice (SFX are additive).

### 9.2 What If Audio Context is Suspended?

Modern browsers suspend audio until user interaction. The `.play()` promise handles this:

```javascript
audio.play()
  .then(() => {
    // Success; sound is playing
  })
  .catch(err => {
    // autoplay policy, no speaker, or error
    console.warn(`[sfx] play rejected: ${err.message}`);
    // Graceful: game continues, SFX silent
    resolve();
  });
```

### 9.3 What If Browser Doesn't Support Web Audio?

Current implementation uses `<audio>` elements (native browser support, no Web Audio API needed). Fallback is automatic: if Audio constructor fails, try `<audio>` tag, or skip gracefully.

### 9.4 What If Device Audio is Disabled?

Device muting is respected by browser; audio simply won't play. `play()` returns rejected promise, caught and logged. Game continues unaffected.

---

## 10. Asset Examples & File Recommendations

### 10.1 Sound Design Principles per Type

| Type | Characteristics | Example Description | Duration |
|------|-------------------|-------------------|----------|
| **Chime/Collect** | Bright (4–8 kHz peak), short decay, no bass | Crystalline bell or glass harmonic | 300–500ms |
| **Impact/Thud** | Low-mid (100–300 Hz), quick attack, natural decay | Drum kick or bass-heavy punch | 300–600ms |
| **Whoosh/Transition** | Swept freq (low→high or reverse), smooth | Air movement or car pass | 200–400ms |
| **Siren/Alert** | Mid-high (1–3 kHz), pulsing or steady, attention-grabbing | Alarm bell or synth buzz | 100–300ms (looped) |
| **Arpeggio/Victory** | Ascending melody (root→3rd→5th→octave), bright | Orchestral harp or synth chord | 800ms–1.2s |
| **Sad Trombone** | Descending glissando, low freq (100–400 Hz), minor tonality | Classic "wah-wah" fail sound | 600–800ms |

### 10.2 Production Recommendations

**For each SFX**, source or generate:
1. **Audio format**: MP3 (lossy, 128 kbps stereo) for web delivery
   - File size: ~15–30 KB per sound
   - Alternative: WAV (lossless) for development; convert to MP3 for production

2. **Sample rate**: 44.1 kHz or 48 kHz (web standard)

3. **Loudness normalization**: -3 dB to -6 dB (LUFS) relative to background music
   - Prevents unexpected clipping if multiple SFX play together

4. **No clipping or distortion**: Peak at 0 dB, no overs

### 10.3 Sources for SFX

- **Freesound.org**: Creative Commons SFX library
  - Search terms: "chime," "collision," "glass clink," "victory"
  - License: Verify CC-BY or CC0 before use

- **Zapsplat.com**: Royalty-free SFX
  - High quality, no attribution required

- **Bfxr** or **SFXR** (retro arcade generator):
  - Free, open-source; good for stylized "bleeps and bloops"

- **Professional DAW synthesis**:
  - Ableton Live, Logic Pro, or FL Studio
  - Fine-tune pitch, ADSR (attack/decay/sustain/release) envelopes

### 10.4 Concrete Path Examples

```
/public/audio/sfx/games/golden-egg/chime-collect.mp3
  Source: Freesound #123456 (CC-BY)
  Generated in Ableton with harmonic bell patch
  Peak: -3 dB, duration 380ms, MP3 128 kbps
  File size: 6 KB

/public/audio/sfx/games/mash-gauntlet/tick-frantic.mp3
  Generated in SFXR (retro arcade "pop" preset)
  Pitch-shifted up 200 cents from baseline
  Peak: -4 dB, duration 80ms, MP3 128 kbps
  File size: 2 KB

/public/audio/sfx/shared/victory-flourish.mp3
  Custom synth arpeggio (C major: C–E–G–C)
  Uplifting, bright, celebratory
  Peak: -3 dB, duration 1000ms, MP3 128 kbps
  File size: 20 KB
```

---

## 11. Configuration Examples

### 11.1 Conservative Config (SFX-Light)

For players who prefer minimal audio:

```javascript
export const AUDIO_PROFILE_MINIMAL = {
  audioManager: {
    masterVolume: 0.7,
    backgroundMusicVolume: 0.7,
  },
  sfxManager: {
    masterVolume: 0.2,       // Very quiet
    maxConcurrent: 2,        // Few overlaps
  },
  // Mini-games inherit; most optional sounds disabled
  minigameDefaults: {
    soundEffects: {
      masterVolume: 0.3,
      events: {
        // Only enable critical sounds
        '*:hit': { enabled: true },  // Hits
        '*:lose': { enabled: true }, // Losses
        '*:win': { enabled: true },  // Wins
        '*:spawn': { enabled: false }, // Disable spawns
      },
    },
  },
};
```

### 11.2 Immersive Config (SFX-Full)

For players who want maximum feedback:

```javascript
export const AUDIO_PROFILE_IMMERSIVE = {
  audioManager: {
    masterVolume: 1.0,
    backgroundMusicVolume: 0.7,
  },
  sfxManager: {
    masterVolume: 0.7,       // Prominent
    maxConcurrent: 6,        // Rich polyphony
    duckMusic: true,         // Music yields to big moments
  },
  minigameDefaults: {
    soundEffects: {
      masterVolume: 0.65,
      events: {
        '*': { enabled: true }, // Everything on
      },
    },
  },
};
```

---

## 12. Implementation Checklist

- [ ] **Audio Assets**
  - [ ] Collect/generate all SFX (5 games × 5–7 sounds = 30+ audio files)
  - [ ] Normalize loudness and format (MP3, 128 kbps)
  - [ ] Place in `/public/audio/sfx/` directory structure

- [ ] **Code**
  - [ ] Create `SfxManager.js` class with playback, ducking, concurrency logic
  - [ ] Create `soundRegistry.js` with catalog and resolver functions
  - [ ] Add `soundEffects` property to all 5 mini-game definitions
  - [ ] Integrate SFX triggers in each game mode (golden-egg, twilight, etc.)
  - [ ] Add SFX settings UI (volume slider, enable/disable toggle)

- [ ] **Testing**
  - [ ] Verify preload logic (no delays during gameplay)
  - [ ] Test graceful degradation (SFX missing, audio disabled, autoplay blocked)
  - [ ] A/B test SFX on/off to confirm improved game feel
  - [ ] Test on low-end devices (CPU/memory impact)

- [ ] **Deployment**
  - [ ] Add cache-busting version hash to SFX URLs
  - [ ] Monitor audio file sizes in production
  - [ ] Gather telemetry: which SFX are most played, which are skipped, crash reports

---

## 13. Future Enhancements

### 13.1 Adaptive Audio (Difficulty-Responsive)

Sounds could change based on difficulty level:

```javascript
// Mash Gauntlet: as difficulty scales up, ticks get higher-pitched
const pitchByDifficulty = {
  easy: 0.85,
  normal: 1.0,
  hard: 1.15,
  insane: 1.3,
};

const pitchShift = pitchByDifficulty[difficultyLevel];
sfxMgr.playSfx(tickPath, { pitchShift });
```

### 13.2 Procedural SFX Generation

Instead of pre-recorded files, generate SFX on-the-fly using tone synthesis:

```javascript
// Use tone.js library for real-time sound generation
import * as Tone from 'tone';

function playProcedurialChime(pitch = 440) {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(pitch, '0.3');
}
```

Benefits: Smaller footprint, infinitely customizable pitch/speed.

### 13.3 Spatial Audio (3D Positioning)

Use Web Audio API's Panner node for 3D spatial effects:

```javascript
// Obstacle spawns from left side of screen
const panner = new StereoPannerNode();
panner.pan.value = -0.8; // Far left
audio.connect(panner).connect(audioContext.destination);
```

### 13.4 Analytics Integration

Track which SFX are most impactful:

```javascript
// On each SFX play:
analytics.logEvent('sfx_played', {
  game: 'golden-egg',
  event: 'egg:hit',
  playerScore: currentScore,
  sessionDuration: elapsedMs,
});
```

Use data to iteratively improve sound catalog (A/B test variants).

---

## Summary

This design provides a **scalable, graceful, player-centric** approach to mini-game audio:

1. **Sound Catalog**: Carefully curated SFX for each game, emphasizing game feel and consequence
2. **Volume Mixing**: Balanced blend of background music + SFX; optional ducking for impact moments
3. **Schema Design**: Mini-games define SFX via `soundEffects` property; centralized registry for paths and metadata
4. **SFX Manager**: Lightweight, separate from AudioManager; handles playback, concurrency, ducking, graceful failures
5. **Performance**: Hybrid preload strategy; on-demand fallback; negligible impact on load time
6. **Accessibility**: Visual/haptic alternatives; no hard dependency on audio; respects device muting
7. **Scalability**: Easy to add new games or iterate on existing SFX without touching core logic

**Philosophy**: SFX are **optional, additive flavor**. Core gameplay works perfectly without them; with them, the experience is measurably more satisfying.
