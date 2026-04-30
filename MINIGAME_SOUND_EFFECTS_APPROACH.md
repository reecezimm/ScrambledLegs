# Mini-Game Sound Effects Architecture

**Status:** Design Phase (No Implementation)  
**Created:** April 30, 2026  
**Scope:** Complete sound effects system for all 5 mini-games, integrated with current AudioManager

---

## 1. Overview

This document defines a comprehensive sound effects system for mini-games that:
- ✅ Integrates cleanly with the existing AudioManager audio system
- ✅ Maintains backward compatibility (optional, non-breaking)
- ✅ Supports per-game sound catalogs (Golden Egg, Twilight, Dodge, Pong, Mash Gauntlet)
- ✅ Handles concurrent playback with smart pooling
- ✅ Gracefully degrades if audio fails
- ✅ Balances SFX volume with background music
- ✅ Provides simple API for mini-game modes: `ctx.playSound(eventName)`

The system is **additive** — the game plays perfectly without SFX, but with them, game feel is significantly enhanced.

---

## 2. Directory Structure

All sound effects live in `/public/audio/sfx/`:

```
/public/audio/sfx/
├── shared/
│   ├── generic-tap.mp3          (fallback for any tap/click)
│   ├── generic-impact.mp3       (fallback for collision/hit)
│   ├── generic-fail.mp3         (fallback for failure)
│   ├── generic-success.mp3      (fallback for success)
│   └── silence-1s.mp3           (fallback if audio disabled)
│
├── golden-egg/
│   ├── egg-tap-1.mp3            (variant 1: bright chime)
│   ├── egg-tap-2.mp3            (variant 2: higher pitch)
│   ├── egg-tap-3.mp3            (variant 3: lower pitch)
│   ├── egg-catch.mp3            (collecting/catching egg)
│   ├── score-increase.mp3       (points awarded)
│   ├── game-win.mp3             (level complete)
│   └── game-fail.mp3            (time expired)
│
├── twilight/
│   ├── beer-tap-1.mp3           (variant 1: glass clink)
│   ├── beer-tap-2.mp3           (variant 2: deeper tone)
│   ├── beer-tap-3.mp3           (variant 3: light tap)
│   ├── beer-catch.mp3           (collecting beer)
│   ├── cheers.mp3               (toasting sound)
│   ├── game-win.mp3             (level complete)
│   └── game-fail.mp3            (no beers caught)
│
├── dodge/
│   ├── obstacle-proximity.mp3    (warning siren as obstacle approaches)
│   ├── collision-impact.mp3      (getting hit by obstacle)
│   ├── dodge-success.mp3         (narrowly avoided)
│   ├── game-win.mp3             (survived all obstacles)
│   └── game-fail.mp3            (got hit, game over)
│
├── pong/
│   ├── paddle-hit.mp3           (ball hits paddle)
│   ├── wall-bounce.mp3          (ball bounces off wall)
│   ├── paddle-miss.mp3          (ball misses paddle)
│   ├── game-win.mp3             (10 seconds survived)
│   └── game-fail.mp3            (ball reaches bottom)
│
└── mash-gauntlet/
    ├── tension-tick-1.mp3       (escalating heartbeat tick - early)
    ├── tension-tick-2.mp3       (escalating heartbeat tick - mid)
    ├── tension-tick-3.mp3       (escalating heartbeat tick - late)
    ├── threshold-met.mp3        (reached target threshold)
    ├── game-win.mp3             (completed gauntlet)
    └── game-fail.mp3            (failed to reach threshold)
```

**File specs:**
- Format: MP3 (broad browser support)
- Bitrate: 128 kbps (SFX don't need high quality)
- Duration: 200ms–1s (quick, punchy)
- Total per-game: 500KB–1.5MB
- Shared fallbacks: 300KB
- **Total SFX payload: ~5-7 MB** (modest addition)

---

## 3. Mini-Game Schema Updates

### 3.1 Add `soundEffects` Field to Mini-Game Definition

Each mini-game adds an optional `soundEffects` object:

```javascript
{
  id: 'golden-egg',
  label: 'Golden Egg',
  backgroundMusic: { ... },
  
  // NEW: Sound effects configuration
  soundEffects: {
    enabled: true,  // Can be toggled off globally
    events: {
      tap: {
        filePath: '/audio/sfx/golden-egg/egg-tap-{variant}.mp3',
        variants: [1, 2, 3],  // Random variant on each play
        volume: 0.6,
        concurrency: 'single',  // Only one tap sound at a time
        maxInstances: 1,
        throttleMs: 50,  // Prevent too-rapid retriggering
      },
      catch: {
        filePath: '/audio/sfx/golden-egg/egg-catch.mp3',
        volume: 0.7,
        concurrency: 'single',
      },
      scoreIncrease: {
        filePath: '/audio/sfx/golden-egg/score-increase.mp3',
        volume: 0.5,
        concurrency: 'stack',
        maxInstances: 3,
      },
      win: {
        filePath: '/audio/sfx/golden-egg/game-win.mp3',
        volume: 0.8,
        concurrency: 'single',
        duckMainTrack: true,  // Lower background music while this plays
      },
      fail: {
        filePath: '/audio/sfx/golden-egg/game-fail.mp3',
        volume: 0.7,
        concurrency: 'single',
        duckMainTrack: true,
      },
    },
    preloadEvents: ['tap', 'catch', 'win', 'fail'],  // Load these immediately on phase start
    fallbackEvent: 'tap',  // Default if specific event not found
  },
}
```

### 3.2 Schema Field Reference

| Field | Type | Default | Purpose |
|-------|------|---------|---------|
| `enabled` | bool | true | Global toggle for SFX in this game |
| `events` | object | {} | Maps event names to sound configs |
| `events[name].filePath` | string | required | Path to audio file (supports `{variant}` placeholder) |
| `events[name].variants` | array | [1] | Random variant selector (e.g., [1, 2, 3] picks one at random) |
| `events[name].volume` | 0-1 | 0.6 | Relative volume for this sound |
| `events[name].concurrency` | enum | 'single' | 'single' \| 'stack' \| 'overlap' |
| `events[name].maxInstances` | int | 1 | Max concurrent plays of this sound |
| `events[name].throttleMs` | int | 0 | Minimum ms between retriggering |
| `events[name].duckMainTrack` | bool | false | Lower background music while playing |
| `preloadEvents` | array | [] | Which events to preload on phase start |
| `fallbackEvent` | string | 'tap' | Default if event not found |

---

## 4. Architecture

### 4.1 Component Overview

```
┌──────────────────────────────────────┐
│  Mini-Game Mode (pigDodge, pong)     │
│  Calls: ctx.playSound('tap')         │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  SfxManager (new service)            │
│  - Play/stop sounds                  │
│  - Handle concurrency                │
│  - Volume mixing                     │
│  - Preloading & caching              │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  AudioManager (existing)             │
│  - Audio element pooling             │
│  - Background music control          │
│  - Main/SFX volume hierarchy         │
└──────────────────────────────────────┘
```

### 4.2 Context API for Modes

Mini-game modes interact with SFX through the existing `ctx` object:

```javascript
// In pigDodge.js or any mini-game mode:

// Play a sound event (fire-and-forget)
ctx.playSound('tap', { variant: 2, position: { x: 100, y: 50 } });

// Check if sound is currently playing
const isPlaying = ctx.isSoundPlaying('explosion');

// Stop a specific sound
ctx.stopSound('background-loop');

// Properties
ctx.sfxEnabled  // bool: are SFX globally enabled?
```

These methods are exposed via the `makeCtx()` function in `store.js`.

### 4.3 SfxManager Service

New service at `/src/services/SfxManager.js`:

```javascript
class SfxManager {
  // Lifecycle
  async preloadGameSFX(miniGameId) { }
  async unloadGameSFX(miniGameId) { }
  
  // Playback
  async playSound(eventName, options = {}) { }
  stopSound(eventName) { }
  stopAllSounds() { }
  
  // Configuration
  setSFXVolume(volume) { }
  getSFXVolume() { }
  setSFXEnabled(enabled) { }
  isSoundPlaying(eventName) { }
  
  // Events
  on(eventName, callback) { }
  off(eventName, callback) { }
}
```

### 4.4 Volume Hierarchy

SFX volume is calculated as:

```
actualVolume = masterVolume × sfxVolume × eventVolume × miniGameConfig.volume
```

Where:
- `masterVolume` = global master (0-1)
- `sfxVolume` = SFX-specific volume (0-1, default 0.6)
- `eventVolume` = dynamic scaling when many concurrent sounds play
- `miniGameConfig.volume` = per-event config (0-1)

**Default levels:**
- Background music: 0.7
- SFX (typical): 0.6
- When ducking: background lowers to 0.4, SFX stays 0.6

---

## 5. Sound Catalog & UX Guidelines

### 5.1 Golden Egg

**Purpose:** Bright, rewarding taps with magical energy  
**Aesthetic:** Shiny, crystalline, whimsical

| Event | Sound | Specs | Notes |
|-------|-------|-------|-------|
| **tap** | Metallic chime | 200ms, 0.6 vol, variants 1-3 | Different pitch on each tap (5 in 5s) |
| **catch** | Glass ping + sparkle | 300ms, 0.7 vol | Satisfying catch moment |
| **scoreIncrease** | Ascending chime | 150ms, 0.5 vol | Stacks if multiple points |
| **win** | Triumphant fanfare | 2s, 0.8 vol, duck=true | Celebratory, ends game phase |
| **fail** | Sad descending tone | 800ms, 0.7 vol, duck=true | Time expired, bittersweet |

**UX notes:**
- Tap variants prevent "monotonous clicking" feel
- High pitch energizes player
- Win sound is prominent (ducks main track)

### 5.2 Twilight

**Purpose:** Bar/social ambiance with glass clinks and toasts  
**Aesthetic:** Warm, communal, celebratory

| Event | Sound | Specs | Notes |
|-------|-------|-------|-------|
| **tap** | Glass clink | 250ms, 0.6 vol, variants 1-3 | Different glass types (wine, beer, champagne) |
| **catch** | Cheers + clink | 500ms, 0.7 vol | Social moment |
| **toastSuccess** | Raising glasses + "Cheers!" | 1s, 0.7 vol | Mid-game milestone |
| **win** | Bar bell + celebration | 2s, 0.8 vol, duck=true | Game complete |
| **fail** | Sad trombone (ironic) | 800ms, 0.6 vol | Humorous failure |

**UX notes:**
- Glass variants create environment richness
- Cheers sound is social and bonding
- Failure sound is humorous (not frustrating)

### 5.3 Dodge

**Purpose:** Intense, threatening, impact-driven  
**Aesthetic:** Urgent, dangerous, arcade-like

| Event | Sound | Specs | Notes |
|-------|-------|-------|-------|
| **proximity** | Siren/warning beep | 300ms loop, 0.4 vol | Plays as obstacle approaches |
| **dodgeSuccess** | "Whoosh" + relief | 200ms, 0.6 vol | Narrowly avoided |
| **collision** | Heavy impact + pain | 500ms, 0.8 vol | Getting hit (high volume!) |
| **win** | Victory fanfare + crowd | 2s, 0.9 vol, duck=true | Survived! |
| **fail** | Crash + explosion | 1s, 0.9 vol, duck=true | Got hit, game over |

**UX notes:**
- Collision sound is loud & scary (reinforces consequence)
- Proximity siren creates tension
- Victory sound is triumphant (you survived danger!)

### 5.4 Pong

**Purpose:** Arcade retro with crisp, snappy feedback  
**Aesthetic:** Classic arcade, satisfying mechanics

| Event | Sound | Specs | Notes |
|-------|-------|-------|-------|
| **paddleHit** | Arcade paddle whack | 150ms, 0.5 vol, throttle=50ms | Crisp, immediate feedback |
| **wallBounce** | Bleep/bloop | 100ms, 0.4 vol | Light, doesn't dominate |
| **miss** | Sad "awww" sound | 400ms, 0.6 vol | Failed moment |
| **win** | Arcade victory fanfare | 2s, 0.9 vol, duck=true | 10 seconds survived! |
| **fail** | Game Over buzzer | 600ms, 0.8 vol, duck=true | You lost |

**UX notes:**
- Paddle hit is snappy (sub-200ms latency feel)
- Miss sound is humorous, not punishing
- Wall bounces are minimal (don't clutter)

### 5.5 Mash Gauntlet

**Purpose:** Escalating tension, building pressure  
**Aesthetic:** Urgent, heartbeat-driven, dramatic

| Event | Sound | Specs | Notes |
|-------|-------|-------|-------|
| **tensorTick** | Heartbeat tick | 100ms, 0.4 vol, escalates | Varies by difficulty/time left |
| **thresholdMet** | Dramatic sting | 400ms, 0.8 vol | You hit the target! |
| **targetReached** | Rising tension release | 300ms, 0.6 vol | Moment of triumph mid-game |
| **win** | Epic win stinger | 2s, 0.9 vol, duck=true | You survived the gauntlet! |
| **fail** | Dramatic fail sting | 800ms, 0.8 vol, duck=true | Didn't make it in time |

**UX notes:**
- Heartbeat tick escalates as timer runs out (tension!)
- Threshold met is celebratory (you made it!)
- Fail sound is dramatic (high stakes game)

---

## 6. Concurrency Model

### 6.1 Concurrency Modes

Each sound event can operate in one of three modes:

#### **'single'** — Only one instance plays at a time
```
User clicks eggs rapidly:
  tap #1 → plays immediately
  tap #2 (100ms later) → blocked, ignored or queued
  tap #1 finishes → tap #2 plays if queued
```
**Use for:** Primary interaction feedback (taps, clicks, core actions)

#### **'stack'** — Queue up to N instances, play sequentially
```
User collects multiple points rapidly:
  scoreIncrease #1 → plays immediately
  scoreIncrease #2 → queued
  scoreIncrease #3 → queued
  scoreIncrease #1 finishes → #2 plays
  scoreIncrease #2 finishes → #3 plays
```
**Use for:** Secondary events that can overlap (scores, bonuses)

#### **'overlap'** — Unlimited concurrent plays with volume scaling
```
User taps very rapidly in Pong (wall bounces):
  bounce #1 → plays at full volume
  bounce #2 (same moment) → plays at 0.8 volume
  bounce #3 → plays at 0.6 volume
  bounce #4+ → oldest drop off or skip
```
**Use for:** Ambient/background sounds that can layer (wall bounces, proximity warnings)

### 6.2 Global Concurrency Cap

Maximum **6 concurrent sounds** across all games:
- If 6 sounds playing and 7th triggered, oldest sound stops
- Prevents audio cacophony
- Scaling: if >3 concurrent, volumes reduce by 20% each

---

## 7. Preloading Strategy

### 7.1 Hybrid Preload Approach

**On session start (mash button pressed):**
- ✓ HTTP request `preloadEvents` in background (don't wait)
- ✓ Main track fade-in continues immediately
- ✓ Continue to preamble phase

**On first mini-game play phase:**
- ✓ If preload completed, use cached audio
- ✓ If preload not done, load on-demand (1-2s delay typically)
- ✓ Fallback to generic SFX if specific file fails

**Total preload payload:** ~500KB (modest, finishes in <2s on LTE)

### 7.2 Caching Strategy

- Cache SFX using same IndexedDB as main audio (share the cache infrastructure)
- TTL: 7 days (same as main tracks)
- LRU eviction if quota exceeded
- Reuse existing AudioCache class

---

## 8. Integration Points

### 8.1 Store.js Integration

When entering a play phase:

```javascript
// In syncModeLifecycle(), when nextPlay = true:
if (nextMiniGame.soundEffects) {
  sfxManager.preloadGameSFX(nextMiniGame.id)
    .catch(err => console.warn('[sfx] preload failed:', err));
}
```

When exiting a play phase:

```javascript
// In syncModeLifecycle(), when prevPlay = true && !nextPlay:
sfxManager.stopAllSounds();
sfxManager.unloadGameSFX(prevMiniGame.id);
```

### 8.2 Context Integration

In `makeCtx()` function:

```javascript
const sfxConfig = phase.miniGame.soundEffects || {};

const ctx = {
  // ... existing fields ...
  
  // NEW: Sound effect methods
  playSound(eventName, options) {
    if (!sfxConfig.enabled) return;
    const eventConfig = sfxConfig.events?.[eventName];
    if (!eventConfig) {
      // Fallback to fallbackEvent
      eventName = sfxConfig.fallbackEvent || 'tap';
    }
    sfxManager.playSound(eventName, {
      ...options,
      miniGameId: phase.miniGame.id,
    });
  },
  
  isSoundPlaying(eventName) {
    return sfxManager.isSoundPlaying(eventName);
  },
  
  stopSound(eventName) {
    sfxManager.stopSound(eventName);
  },
  
  sfxEnabled: sfxConfig.enabled !== false,
};
```

### 8.3 Mini-Game Mode Integration

In any mini-game mode (e.g., `pigDodge.js`):

```javascript
// On collision:
if (!ended) {
  ended = true;
  ctx.playSound('collision', { position: { x: pig.x, y: pig.y } });
  ctx.endPhase('lose', 0);
}

// On successful tap in Golden Egg:
ctx.playSound('tap', { variant: Math.floor(Math.random() * 3) + 1 });
ctx.playSound('scoreIncrease');
```

---

## 9. Error Handling & Graceful Degradation

### 9.1 Missing Sound Files

```javascript
// SfxManager.playSound():
try {
  const sound = await loadAudio(eventConfig.filePath);
  play(sound);
} catch (err) {
  // Try fallback generic sound
  const fallback = await loadAudio(`/audio/sfx/shared/generic-tap.mp3`);
  play(fallback);
  console.warn('[sfx] failed to load, using fallback:', err);
}
```

### 9.2 Autoplay Policy Rejection

```javascript
playPromise
  .then(() => { /* audio playing */ })
  .catch((err) => {
    if (err.name === 'NotAllowedError') {
      console.log('[sfx] autoplay blocked by browser');
      // Continue game silently, don't throw
    }
  });
```

### 9.3 Audio Context Suspended

```javascript
// Check before playing:
if (audioContext.state === 'suspended') {
  console.log('[sfx] audio context suspended, skipping');
  return;
}
```

### 9.4 No Sound Effects Field

```javascript
// soundEffects is optional
const sfxConfig = miniGame.soundEffects || {};
if (!Object.keys(sfxConfig).length) {
  // No SFX for this game, continue silently
}
```

---

## 10. Volume Management

### 10.1 Volume Controls

User-facing volume controls in settings:

```javascript
// Master volume (affects music + SFX)
audioManager.setMasterVolume(0.8);

// SFX-only volume (separate from background music)
sfxManager.setSFXVolume(0.6);

// Both are applied: actualSFX = master × sfx × config
```

### 10.2 Music Ducking

When high-impact SFX plays (e.g., win/fail sounds):

```javascript
// If event config has duckMainTrack: true:
audioManager.setMainTrackVolume(0.4);  // Fade to 0.4 over 100ms
playSound(sfxEvent);
// When SFX ends:
audioManager.setMainTrackVolume(0.7);  // Fade back to 0.7 over 200ms
```

---

## 11. Variant System

For sounds that repeat (like taps), variants prevent monotony:

```javascript
// In Golden Egg soundEffects config:
tap: {
  filePath: '/audio/sfx/golden-egg/egg-tap-{variant}.mp3',
  variants: [1, 2, 3],
  volume: 0.6,
}

// When playing:
const variant = variants[Math.floor(Math.random() * variants.length)];
const actualPath = filePath.replace('{variant}', variant);
// Loads: /audio/sfx/golden-egg/egg-tap-2.mp3 (random choice)
```

---

## 12. Implementation Roadmap

### Phase 1: SfxManager Service (3 hours)
- Create `/src/services/SfxManager.js`
- Implement play/stop/preload methods
- Audio element pooling + caching
- Event emitter system

### Phase 2: Store.js Integration (2 hours)
- Add ctx.playSound() to makeCtx()
- Add preload/cleanup calls in syncModeLifecycle()
- Hook into reset() for cleanup

### Phase 3: Test Mini-Game (Golden Egg) (3 hours)
- Update GOLDEN_EGG schema with soundEffects
- Implement ctx.playSound('tap') calls in mode
- Test preload, playback, cleanup
- Verify no regression on game logic

### Phase 4: Rollout to All Games (4 hours)
- Update all 5 mini-games with soundEffects configs
- Add ctx.playSound() calls to modes
- Test all games individually

### Phase 5: Polish & Testing (3 hours)
- Concurrency tuning (adjust maxInstances)
- Volume mixing fine-tuning
- Cross-browser testing (Safari autoplay, etc.)
- Performance profiling (CPU, memory)

**Total effort:** ~15 hours  
**Can be split into independent phases** (Phase 3 can ship without 4 & 5)

---

## 13. Testing Strategy

### 13.1 Unit Tests

```javascript
describe('SfxManager', () => {
  it('plays sound with correct volume', () => { })
  it('preloads SFX in parallel', () => { })
  it('handles missing files gracefully', () => { })
  it('enforces concurrency limits', () => { })
  it('ducks main track when configured', () => { })
  it('handles rapid successive plays (throttle)', () => { })
  it('emits events on play/stop', () => { })
  it('cleans up on unload', () => { })
});
```

### 13.2 Integration Tests

```javascript
describe('SfxManager + Audio System', () => {
  it('SFX and background music mix correctly', () => { })
  it('preload happens in background without blocking', () => { })
  it('autoplay rejection caught gracefully', () => { })
  it('mini-game transition stops all SFX', () => { })
});
```

### 13.3 Manual Testing Checklist

- [ ] Golden Egg: tap sound plays on each egg tap
- [ ] Twilight: beer tap sounds vary (3 variants)
- [ ] Dodge: collision sound plays on hit
- [ ] Pong: paddle hit + miss sounds work
- [ ] Mash Gauntlet: tension ticks escalate
- [ ] All games: win/fail sounds duck music correctly
- [ ] iOS Safari: autoplay rejection doesn't crash
- [ ] Missing file: fallback to generic sound
- [ ] Device muted: SFX respect system mute
- [ ] Rapid clicks: throttling prevents cacophony
- [ ] Session reset: all sounds stop, cleaned up
- [ ] Long session (10+ mini-games): no memory leaks

---

## 14. Future Enhancements

### 14.1 Spatial Audio
- Pan tap sounds based on screen position
- Distance-based volume (closer = louder collision)

### 14.2 Adaptive Audio
- Pitch variation based on difficulty/score
- Faster heartbeat in Mash Gauntlet as timer runs out

### 14.3 Layered SFX
- Composite samples (multiple layers mixed dynamically)
- E.g., collision = impact + feedback + reverb tail

### 14.4 Designer Tools
- In-game volume slider for SFX testing
- SFX preview button in dev panel
- Real-time variant audition

### 14.5 Analytics
- Track which SFX increase retention/enjoyment
- A/B test different sound catalogs

---

## 15. Architecture Diagram

```
USER INTERACTION (click egg, tap beer, collision)
    ↓
Mini-Game Mode (pigDodge, goldenEgg, etc.)
    ↓
ctx.playSound('tap', { variant: 2 })
    ↓
SfxManager.playSound()
    ├─ Load audio (from cache or fetch)
    ├─ Check concurrency (single/stack/overlap)
    ├─ Apply volume hierarchy
    ├─ Resolve variant filePath
    ├─ Create HTMLAudioElement (from pool)
    └─ Emit event ('sfxPlay')
    ↓
HTMLAudioElement.play()
    ↓
System Audio Output (speaker/headphones)
    ↓
USER HEARS FEEDBACK (satisfying tap, impact, etc.)
```

---

## 16. No Breaking Changes

- ✅ `soundEffects` field is optional (all existing mini-games work unchanged)
- ✅ AudioManager unchanged (SfxManager is separate service)
- ✅ `ctx` gains new methods but existing ones untouched
- ✅ If SfxManager fails to load, game continues (SFX just silent)
- ✅ Gradual adoption: can ship with only 1 game having SFX initially

---

## 17. Summary

This architecture provides:
1. **Clean separation of concerns** — SfxManager handles sound, modes focus on game logic
2. **Graceful degradation** — Missing files, autoplay blocks, device mute all handled
3. **Scalable** — From 1 game with SFX to all 5 games
4. **DRY** — Shared fallback sounds, unified volume mixing, one cache
5. **User control** — Volume sliders, global enable/disable
6. **Great UX** — Variants prevent repetition, ducking highlights important moments
7. **Performance** — Hybrid preload, pooling, throttling, concurrency caps

The system is ready for implementation following the 5-phase roadmap.

---

**Next Steps:** Implementation Phase 1 (SfxManager service creation)
