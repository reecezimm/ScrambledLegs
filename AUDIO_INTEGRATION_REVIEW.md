# Audio System Integration Review: Holistic Game Architecture Analysis

**Date:** April 30, 2026  
**Review Scope:** AUDIO_SYSTEM_PLAN.md integration into Scrambled Legs game architecture  
**Assessment Level:** Detailed architectural & UX evaluation

---

## Executive Summary

The AUDIO_SYSTEM_PLAN is **well-structured and thoughtfully designed**, but the implementation carries significant **architectural coupling risks** that could create brittleness in production. The plan treats AudioManager as both a player and an orchestrator, which works for the happy path but falters under edge cases. The biggest concerns are:

1. **Race condition vulnerability** between rapid mini-game transitions (double-calls)
2. **React lifecycle mismatch** with imperative audio state (cleanup on unmount)
3. **Tight coupling** to game director timing assumptions
4. **Lack of soft-fail graceful degradation** for audio load delays

**Confidence in smooth production UX: 2.5/5** without architectural adjustments.

---

## 1. Game Director Integration

### 1.1 Current Coupling Analysis

**The Plan:**
- Director calls `audioManager.transitionToMiniGame()` and `transitionBackToMain()`
- AudioManager exposes event emitters for coordination
- Implied assumption: director waits for transition completion before advancing phase

**Reality in Current Codebase:**
The game director (in `/src/game/director.js`) uses a pure reducer pattern with:
- `advance()` function that auto-advances phases based on press counts or timeouts
- `syncModeLifecycle()` that manages mode entry/exit
- Event-based communication via `gameStore` (listeners, bonusListeners, sessionEndListeners)

**Integration Gap:**
```javascript
// What the plan expects:
await audioManager.transitionToMiniGame(miniGamePath, 2.5);
// Play phase starts → mini-game runs → endPhase() called

// What actually happens:
// 1. Director enters play phase (synchronously)
// 2. Mode starts immediately (requestAnimationFrame loop)
// 3. Director doesn't wait for audio transition to complete
// 4. If audio load fails, mode is already running
```

### 1.2 Double-Transition Race Condition

**Scenario:** User rapidly taps during mini-game transition, triggering multiple `endPhase()` calls:
```javascript
// t=0ms: transitionToMiniGame() called (crossfade starts)
// t=100ms: endPhase() called (early end)
// t=150ms: transitionBackToMain() called (now mid-crossfade)
// t=200ms: endPhase() called (again!)
// t=300ms: transitionToMiniGame() called again (what state are we in?)
```

**Plan's Defense:**
- `activeTransition` flag blocks concurrent transitions (section 7.2)
- "Cancel pending new transition" is mentioned but not detailed

**Issue:**
- The plan says "queue it (if design calls for queueing)" but **doesn't define queueing behavior**
- No explicit state for "transition in progress" before fade completes
- What happens if director calls while fade is running?

**Risk Level:** HIGH - Could cause audio glitches, stuttering, or muted transitions

### 1.3 "Ready" Signal Before Mini-Game Start

**The Problem:**
Per the plan, mini-game starts immediately after its status phases complete. But:
1. Audio transition (2.5s) is overlapping with status phases
2. Mini-game mode starts before audio is ready
3. If audio load fails (network) or is slow, mode runs silent

**Proposed Fix:**
```javascript
// Before entering play phase, wait for audio readiness:
case 'advance': {
  if (nextPhase.kind === 'play') {
    // Check if mini-game has audio
    if (nextMiniGame.backgroundMusic) {
      // Wait for audio to signal 'ready'
      await audioManager.ensureLoadedAndReady(nextMiniGame.backgroundMusic.filePath);
    }
  }
  // Then proceed with mode entry
}
```

**Current Plan:** No explicit readiness gate. Plan assumes `transitionToMiniGame()` is awaited before proceeding.

---

## 2. UX Flow Smoothness

### 2.1 Fade Duration Analysis

**Plan Timings:**
- Main track fade-in on session start: **2.5s**
- Transition to mini-game: **2.5s** (crossfade)
- Return to main: **1.5s** (faster recovery)
- Session end: **1.0s** (quick exit)

**UX Assessment:**

| Transition | Duration | Feeling | Risk |
|-----------|----------|---------|------|
| Mash Start → Main | 2.5s | Feels cinematic, builds energy | ✓ Good |
| Main → Mini-Game | 2.5s | Matches status phase pacing (5p×500ms ≈ 2.5s) | ✓ Good |
| Mini-Game → Main | 1.5s | Faster return feels snappy | ✓ Good |
| Mash End | 1.0s | Clean exit, no lingering | ✓ Good |

**Potential Issue:** If status phases are press-counted, timing isn't deterministic:
- If user mashes fast (100 presses/min = 30ms per press):
  - 5 presses = 150ms (audio fades for 2.5s, mismatch!)
- If user mashes slow (10 presses/min = 6s per press):
  - 5 presses = 30s (audio fades complete, then wait forever for phase end)

**Recommendation:** Use **time-based gates** for critical audio transitions:
```javascript
// Don't let play phase start until audio crossfade completes (or 3s timeout)
const minAudioReadyMs = 2500;
const phaseStartTime = Date.now();
while (Date.now() - phaseStartTime < minAudioReadyMs) {
  if (audioManager.isTransitionComplete()) break;
  await new Promise(r => setTimeout(r, 50));
}
```

### 2.2 Mash Pause/Resume: Music Should Continue?

**The Plan:** "Pause main track (preserve position)" on session pause.

**UX Question:** Should music pause or keep playing?

**Arguments for pause:**
- Matches player expectation (everything pauses)
- Simple to implement
- Preserves the feel of "game is paused"

**Arguments for continue:**
- Could feel more immersive (world keeps going)
- Reduces silence, feels less broken
- Real games (Spotify, console pause menus) often keep music

**Plan's Position:** Implicit pause (preserves position, pauses playback).

**My Assessment:** ✓ Correct choice given the current flow.

**But missing:** What if player pauses mid-crossfade?
```javascript
// t=0s: transitionToMiniGame() starts (crossfade begins)
// t=1s: User pauses (what happens to fade-in/out?)
// t=2s: User resumes (restart crossfade? Continue from 1s mark?)
```

**Recommendation:** Add state:
```javascript
{
  pausedDuringTransition: {
    type: 'crossfade' | 'fadeIn' | 'fadeOut' | null,
    elapsedMs: number,  // How far into the fade we were
  }
}
```

### 2.3 Audio Feedback on Mini-Game Enter/Exit

**The Plan:** No mention of click/pop/audio feedback.

**Current Game:** Uses visual feedback extensively (floaters, flashes, shockwaves).

**Gap:** Audio system is silent about its own state transitions. Players hear:
- Music fade (smooth, subtle)
- Nothing else

**Recommendation:** Add optional click/pop SFX:
```javascript
backgroundMusic: {
  filePath: string,
  volume: number,
  transitionSfx: {
    onEnter: '/audio/sfx/mini-game-start-pop.mp3',  // Optional click
    onExit: '/audio/sfx/mini-game-end-pop.mp3',     // Optional click
  }
}
```

This makes audio transitions feel **snappier** and **more intentional** (especially on mobile where visual feedback can lag).

---

## 3. Architectural Fit & Design Patterns

### 3.1 Natural Extension vs. Shoehorned?

**Existing Architecture (from codebase review):**
- Pure reducer pattern for game state (`director.js`)
- Event emitter for side effects (`gameStore` with listeners, bonusListeners, sessionEndListeners)
- Mode-based composition (modes render and handle their own logic)
- Ambient effects applied via DOM side effects (CSS vars, data attributes)

**AudioManager's Approach:**
- Singleton service (like `auth`, `analytics`, `pwaInstall`)
- Event emitter pattern (matches existing patterns)
- Imperative API (start, stop, transition)
- No React integration (pure JS service)

**Assessment:** ✓ **Fits naturally.** AudioManager slots into the existing service layer alongside `notifications.js`, `events.js`, etc. The event emitter pattern mirrors `gameStore`'s listener system.

**However:** There's a **style mismatch**:
- Director is **declarative + reducer-based** (describe phases, let reducer advance)
- AudioManager is **imperative** (call methods at specific moments)

**Result:** Director must explicitly call AudioManager at the right time. If director refactors (e.g., to async phase resolution), AudioManager calls could be forgotten.

### 3.2 Concerns: Premature Complexity

**The Plan Includes:**
- Position tracking (playback position preservation)
- Caching (mini-game audio files)
- Error handling (missing files, autoplay blocking)
- Volume control (master + track-specific)
- CSS variable integration for volume UI

**Phase 1-2 Reality Check:**
- Phase 1: Basic play/stop/pause, single audio element, simple fade
- Phase 2: Dual tracks, crossfade, position preservation
- Phase 3: Mini-game integration
- Phase 4-5: Caching, error handling, UI

**Issue:** Phases 4-5 add significant complexity **after** the core functionality is live. By then:
1. Error handling might be patching production issues
2. Caching might be fighting race conditions
3. Volume UI might conflict with game pause state

**Recommendation:**
- **Phase 1-3:** Focus on happy path only. Skip caching, skip complex error handling.
- **Phase 4+:** Only add complexity once users encounter real failures in production.

**Current plan is too ambitious for Phase 1.** Suggest:

```javascript
// Phase 1-3 scope (simplified):
audioManager.startMainTrack(filePath, volume)
audioManager.stopSession()
audioManager.transitionToMiniGame(filePath, duration)
audioManager.transitionBackToMain(duration)

// Skip for now:
// - Position tracking (not needed if mini-games are short)
// - Caching (load on-demand)
// - Volume control UI (start at fixed 0.7)
// - Error handling (fail silently, continue game)
```

### 3.3 AudioManager: Player vs. Orchestrator?

**The Plan:** AudioManager handles:
- Playing audio
- Fading
- Position preservation
- State synchronization with director
- Event emission

**Question:** Should AudioManager be responsible for all of this, or should some concerns live elsewhere?

**Proposal: Split concerns**

```
AudioManager (player)
├─ play(audioElement, filePath)
├─ stop(audioElement)
├─ fade(audioElement, fromVolume, toVolume, duration)
└─ Events: 'fadeComplete', 'playbackError'

GameAudioCoordinator (orchestrator)
├─ startMainTrack() — calls AudioManager.play + fade
├─ transitionToMiniGame() — calls AudioManager.fade on both tracks
├─ transitionBackToMain() — calls AudioManager.fade + resume
└─ Handles timing, queuing, position preservation
```

**Benefit:**
- AudioManager is testable in isolation (mock fade, play, stop)
- GameAudioCoordinator handles director coordination
- If director refactors, only GameAudioCoordinator changes

**Current Plan:** Everything is in AudioManager (monolithic).

**My Take:** Keep it monolithic for Phase 1-3. Split if Phase 4+ gets complex.

---

## 4. React Component Interaction

### 4.1 Audio State in React vs. Isolated Service

**The Question:** Should AudioManager state be accessible to React components?

**Scenarios:**
1. **Volume slider UI:** Component needs `masterVolume` state
2. **Now-playing display:** Component needs `currentTrack`, `isPlaying`
3. **Audio status for debugging:** Dev tools show audio state

**Plan's Answer:**
```javascript
audioManager.getMasterVolume(): number
audioManager.getCurrentTrack(): 'main' | 'miniGame'
audioManager.getPlaybackPosition(): number
audioManager.isPlaying(): boolean
```

Getter methods expose state but don't tie it to React's rendering.

**Problem:** These getters are **not reactive**. If a component needs to display current volume:
```javascript
function VolumeDisplay() {
  const [volume, setVolume] = useState(null);
  
  useEffect(() => {
    // First read: sync current value
    setVolume(audioManager.getMasterVolume());
    
    // But how do we listen for changes? Plan doesn't mention a listener!
  }, []);
}
```

**Better Approach:**
```javascript
// AudioManager emits events for state changes
audioManager.on('volumeChanged', (newVolume) => {
  setVolume(newVolume);
});
```

**Plan Gap:** Doesn't define listeners for state queries.

**Recommendation:**
```javascript
// Public API additions
audioManager.on('volumeChanged', callback)
audioManager.on('trackChanged', callback)  // 'main' | 'miniGame'
audioManager.on('playbackStateChanged', callback)  // { isPlaying, position }
```

### 4.2 Lifecycle Hooks: Unmount Cleanup

**Scenario:** Component mounts, subscribes to audio events, then unmounts:
```javascript
function GameUI() {
  useEffect(() => {
    const onTransitionComplete = () => { /* ... */ };
    audioManager.on('transitionComplete', onTransitionComplete);
    
    return () => {
      // Must unsubscribe!
      audioManager.off('transitionComplete', onTransitionComplete);
    };
  }, []);
}
```

**Plan Coverage:** The plan shows `on()` method but **doesn't show `off()`**.

**Risk:** Memory leak if components subscribe but never unsubscribe.

**Recommendation:** Explicitly document in API:
```javascript
// Public API
const unsubscribe = audioManager.on('eventName', callback);
// Later:
unsubscribe();  // Cleanup

// OR:
audioManager.off('eventName', callback);
```

### 4.3 Session Reset: When Components Unmount Mid-Mash

**Scenario:**
1. User starts mash, mash session creates audio
2. User navigates away (component unmounts)
3. Audio is still playing in background

**Current Game:** `KudosCta` component calls `gameStore.reset()` on save/burn flow. But audio cleanup?

**Plan's Answer:**
- `stopSession()` cleans up audio
- But when is it called?

**Gap:** Linking `gameStore.reset()` to `audioManager.stopSession()` is the responsibility of... who?

**Answer:** Likely `KudosCta` or the parent component that manages both.

**Recommendation:**
```javascript
// In KudosCta or parent:
const handleSessionEnd = async () => {
  await gameStore.reset();
  await audioManager.stopSession();  // <-- explicit cleanup
};
```

---

## 5. Testing & Debugging

### 5.1 Testability of AudioManager

**Can we unit test it?**

**Happy path:**
```javascript
test('fade from 1.0 to 0.0 over 1000ms', async () => {
  const audio = new MockAudioElement();
  const manager = new AudioManager([audio]);
  
  const startTime = Date.now();
  manager.fade(audio, 1.0, 0.0, 1000);
  
  // Advance time by 500ms
  jest.useFakeTimers();
  jest.advanceTimersByTime(500);
  
  // Volume should be 0.5
  expect(audio.volume).toBe(0.5);
});
```

**Challenges:**
1. **requestAnimationFrame mocking:** Fades use RAF, which is hard to mock deterministically
2. **Audio element mocking:** HTMLAudioElement has many side effects (autoplay policies, CORS, actual playback)
3. **Event timing:** Fade completion event timing is hard to test

**Recommendation:** Use Vitest + `@testing-library` with fake timers:
```javascript
// Better test setup
vi.useFakeTimers();
const manager = new AudioManager();
manager.fade(element, 1, 0, 1000);
vi.advanceTimersByTime(500);
vi.advanceTimersByTime(500);  // Now fade should be done
expect(manager.activeTransition).toBeNull();
```

### 5.2 Debug Logging: Sufficient?

**The Plan:** Doesn't mention logging.

**Critical Points for Debugging:**
- When audio file starts loading
- When audio file fails to load
- When fade starts / completes
- When position is saved / restored
- When crossfade transitions occur
- Autoplay policy blocks

**Recommendation:** Add logging service integration:
```javascript
audioManager.startMainTrack(filePath, volume) {
  console.log('[audio] startMainTrack', filePath);
  console.log('[audio] loading...');
  // load file
  console.log('[audio] loaded, initiating fade in');
  // fade
  console.log('[audio] fade complete');
}
```

**In production:** Log to error tracking service if audio fails:
```javascript
catch (err) {
  logErrorEvent('audio_load_failed', { filePath, reason: err.message });
  // graceful degradation: continue game without music
}
```

### 5.3 Simulating Network Failures During Testing

**Current Plan:** Covers missing files (section 8.1) but not slow loading.

**Real-world scenario:**
- Slow network → audio takes 5 seconds to load
- Mini-game play phase starts after 2.5 seconds
- Audio arrives 2.5 seconds into play phase
- Sudden music drop? Jarring transition?

**Test scenarios needed:**
1. Audio file 404 (not found)
2. Audio file takes 10 seconds to load (network slow)
3. Audio play() promise rejected (autoplay policy)
4. Audio element.currentTime raises (CORS issue)

**Recommendation:** Mock fetch delays:
```javascript
// In test setup
beforeEach(() => {
  vi.useFakeTimers();
  // Mock slow audio load
  global.fetch = vi.fn().mockImplementation(() => 
    new Promise(r => setTimeout(() => r(mockAudioBlob), 5000))
  );
});

test('handles slow audio load gracefully', async () => {
  const manager = new AudioManager();
  manager.startMainTrack('/audio/slow.mp3', 0.7);
  
  // Play phase starts immediately (no wait)
  
  // Audio still loading... 3s into play phase
  vi.advanceTimersByTime(3000);
  expect(manager.mainTrack.isLoaded).toBe(false);
  
  // When audio finally loads, fade starts
  vi.advanceTimersByTime(2000);  // Now 5s total
  expect(manager.mainTrack.isLoaded).toBe(true);
  expect(manager.activeTransition).not.toBeNull();  // Fade in progress
});
```

---

## 6. Confidence Assessment: Production Readiness

### 6.1 Scoring Criteria

**Smooth Production UX** requires:
1. ✓ No audible glitches (skips, pops, stuttering)
2. ✓ Seamless transitions (no silence gaps)
3. ✓ Responsive to player actions (clicks feel reactive)
4. ✓ Graceful degradation (if audio fails, game continues)
5. ✓ No memory leaks (cleanup on unmount)
6. ✓ Works across browsers (Chrome, Safari, Firefox, Edge)

### 6.2 Current Plan Scoring

| Criterion | Score | Notes |
|-----------|-------|-------|
| No audible glitches | 3/5 | Crossfade logic is sound, but RAF timing can slip on slow devices |
| Seamless transitions | 4/5 | Dual-element approach is solid; gaps only if audio load fails |
| Responsive feel | 2/5 | No explicit "ready" signal; mini-game might start before audio |
| Graceful degradation | 2/5 | Plan mentions it (8.1) but doesn't detail implementation |
| No memory leaks | 2/5 | No `off()` method, cleanup on unmount unclear |
| Cross-browser support | 3/5 | Plan mentions testing but no details on quirks (Safari autoplay, etc.) |

### 6.3 Overall Confidence: 2.5/5

**Why so low?**
1. **Race conditions** between director calls and audio transitions
2. **Timing assumptions** not validated against actual director behavior
3. **React lifecycle mismatches** (cleanup, lifecycle hooks)
4. **Missing error recovery** (what happens if audio.play() is rejected?)
5. **No production testing** plan (real network, real browsers)

**Path to 4/5:**
- Add explicit "readiness" gates
- Implement `off()` for event listeners
- Define error handling for autoplay + missing files
- Test on real devices (iPhone, Android, slow networks)
- Measure audio sync with game ticks

---

## 7. Specific Risks & Recommendations

### Risk #1: Double-Transition Race Condition

**Severity:** HIGH

**Scenario:**
```
t=0:   User starts mini-game
       transitionToMiniGame() called
       
t=100: User mashes rapidly, accidentally triggers endPhase() early
       transitionBackToMain() called (crossfade still in progress!)
       
t=150: Another rapid click
       transitionToMiniGame() called again
       
Result: Which track is playing? Where is position saved?
```

**Mitigation:**
```javascript
transitionToMiniGame(filePath, duration) {
  if (this.activeTransition) {
    console.warn('[audio] ignoring transition — already in progress');
    return;  // Cancel, don't queue
  }
  // Proceed...
}
```

**Or with queuing:**
```javascript
transitionQueue = [];
activeTransition = null;

transitionToMiniGame(filePath, duration) {
  this.transitionQueue.push({ type: 'toMiniGame', filePath, duration });
  this._processQueue();
}

_processQueue() {
  if (this.activeTransition || !this.transitionQueue.length) return;
  const next = this.transitionQueue.shift();
  this._performTransition(next);
}

_performTransition(transition) {
  this.activeTransition = transition;
  // ... perform fade ...
  // When done:
  this.activeTransition = null;
  this._processQueue();  // Try next
}
```

**Recommendation:** Implement cancel-on-new (simpler, less surprising).

---

### Risk #2: Mash Pause During Crossfade

**Severity:** MEDIUM

**Scenario:**
```
t=0:   transitionToMiniGame() starts
       Crossfade: main 1.0 → 0.0, mini-game 0.0 → 1.0
       
t=1.2: User pauses mash
       pauseSession() called
       Main track pauses (but it's mid-fade!)
       
t=2.5: User resumes
       resumeSession() called
       Main track resumes, but fade was interrupted
       Audio might spike in volume or sound weird
```

**Mitigation:**
```javascript
pauseSession() {
  // If we're in the middle of a crossfade, cancel it
  if (this.activeTransition) {
    this._cancelFade();  // Set volumes to stable state
  }
  // Then pause
  this.mainTrack.audioElement.pause();
  this.mainTrack.savedPosition = this.mainTrack.audioElement.currentTime;
}
```

**Recommendation:** Cancel active fades on pause to avoid mid-transition interruptions.

---

### Risk #3: Audio Load Fails, Mini-Game Starts Silent

**Severity:** MEDIUM

**Scenario:**
```
transitionToMiniGame('/audio/missing.mp3', 2.5);
// File 404 or network error
// But play phase starts anyway (no wait)
// User plays through silence
```

**Mitigation:**
```javascript
transitionToMiniGame(filePath, duration) {
  try {
    await this._loadAudioFile(filePath);  // Wait for load
  } catch (err) {
    console.error('[audio] failed to load', filePath);
    // Graceful: continue with silent track
    filePath = '/audio/silence.mp3';  // Fallback
  }
  // Now proceed with fade
}
```

**Recommendation:** Implement timeout-based load with fallback to silence.

---

### Risk #4: React Component Memory Leak

**Severity:** LOW

**Scenario:**
```javascript
useEffect(() => {
  audioManager.on('transitionComplete', handler);
  // Missing off() on cleanup
  // If component unmounts while transition is pending,
  // handler stays registered and fires later
}, []);
```

**Mitigation:**
```javascript
useEffect(() => {
  const unsubscribe = audioManager.on('transitionComplete', handler);
  return () => unsubscribe();  // Cleanup
}, []);
```

**Recommendation:** Provide `off()` method or return unsubscribe from `on()`.

---

### Risk #5: iOS Safari Autoplay Policy

**Severity:** MEDIUM

**Reality:** iOS Safari blocks `audio.play()` unless triggered by user interaction.

**Scenario:**
```
User taps mash button → director starts → audio.play() promise rejected
Game is playing but silent
```

**Mitigation:**
```javascript
startMainTrack(filePath, volume) {
  const playPromise = this.mainTrack.audioElement.play();
  
  playPromise
    .then(() => {
      // Autoplay allowed, proceed
      this._fadeIn(volume);
    })
    .catch((err) => {
      if (err.name === 'NotAllowedError') {
        console.warn('[audio] autoplay blocked (iOS?), waiting for user tap');
        // Set flag to wait for next user interaction
        this.audioRequiresUserTap = true;
        // Could show UI hint: "Tap to enable sound"
      }
    });
}
```

**Recommendation:** Detect and handle autoplay rejection gracefully.

---

## 8. Proposed Architectural Adjustments

### 8.1 Three-Layer Audio Architecture

Instead of monolithic AudioManager:

```
┌─────────────────────────────────────┐
│  Game Director (Pure Reducer)       │
│  - Phase transitions                │
│  - Dispatches 'audio' actions       │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  GameAudioOrchestrator (Mediator)   │
│  - Listens for director actions     │
│  - Calls AudioManager methods       │
│  - Handles timing & readiness       │
│  - Position preservation            │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  AudioManager (Player)              │
│  - play() / stop() / pause()         │
│  - fade() / crossfade()             │
│  - Events: 'fadeComplete', 'error'  │
└─────────────────────────────────────┘
```

**Benefits:**
- Director stays pure (no audio coupling)
- Orchestrator handles director-specific logic (position saving, queue management)
- AudioManager is testable in isolation
- If game logic changes, only Orchestrator needs updates

---

### 8.2 Explicit Readiness Handshake

```javascript
// Before mini-game play phase starts:
async function ensureAudioReady(miniGame, timeoutMs = 3000) {
  if (!miniGame.backgroundMusic) {
    return;  // No audio, no wait
  }
  
  const deadline = Date.now() + timeoutMs;
  
  while (Date.now() < deadline) {
    // Check if audio loaded and ready
    if (audioManager.isTransitionComplete()) {
      return;  // Ready!
    }
    
    // Avoid busy-waiting
    await new Promise(r => setTimeout(r, 50));
  }
  
  // Timeout: audio took too long, start anyway (graceful degrade)
  console.warn('[audio] readiness timeout, starting play phase without audio');
}

// In director:
case 'advance': {
  if (nextPhase.kind === 'play' && nextPhase.requiresAudioReady) {
    await ensureAudioReady(nextMiniGame);
  }
  syncModeLifecycle(prev, next);
  break;
}
```

---

### 8.3 Simplified Phase 1 Scope

**Just get audio playing. Skip for now:**
- Caching
- Complex error handling
- Volume control UI
- Position tracking precision

**Phase 1 Implementation:**
```javascript
class SimpleAudioManager {
  mainTrack = null;
  miniGameTrack = null;
  activeTransition = null;
  
  async startMainTrack(filePath, volume) {
    this.mainTrack = new Audio(filePath);
    this.mainTrack.loop = true;
    this.mainTrack.volume = 0;
    await this.mainTrack.play();
    await this.fadeIn(this.mainTrack, volume, 2500);
  }
  
  async transitionToMiniGame(filePath, volume, duration) {
    if (this.activeTransition) return;  // Block double-transitions
    
    this.miniGameTrack = new Audio(filePath);
    this.miniGameTrack.loop = true;
    this.miniGameTrack.volume = 0;
    await this.miniGameTrack.play();
    
    // Parallel fades
    this.activeTransition = 'crossfade';
    await Promise.all([
      this.fadeOut(this.mainTrack, duration),
      this.fadeIn(this.miniGameTrack, volume, duration),
    ]);
    
    // Pause main track but preserve position
    this.mainTrack.pause();
    this.activeTransition = null;
  }
  
  async transitionBackToMain(duration) {
    if (this.activeTransition) return;
    
    this.activeTransition = 'crossfade';
    this.mainTrack.play();
    
    await Promise.all([
      this.fadeOut(this.miniGameTrack, duration),
      this.fadeIn(this.mainTrack, 0.7, duration),  // Resume at last volume
    ]);
    
    this.miniGameTrack.pause();
    this.activeTransition = null;
  }
  
  // Helpers
  private fadeIn(element, targetVolume, durationMs) {
    return this.fade(element, element.volume, targetVolume, durationMs);
  }
  
  private fadeOut(element, durationMs) {
    return this.fade(element, element.volume, 0, durationMs);
  }
  
  private fade(element, fromVol, toVol, durationMs) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        element.volume = fromVol + (toVol - fromVol) * progress;
        
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          resolve();
        }
      };
      
      requestAnimationFrame(tick);
    });
  }
}
```

**Total: ~120 lines. No caching, no complex error handling, no volume UI. Just works.**

---

## 9. Testing Strategy

### 9.1 Unit Tests (AudioManager in isolation)

```javascript
describe('AudioManager', () => {
  let manager;
  
  beforeEach(() => {
    vi.useFakeTimers();
    manager = new AudioManager();
  });
  
  it('fades volume from 1.0 to 0.0', async () => {
    const element = createMockAudioElement();
    
    manager.fade(element, 1.0, 0.0, 1000);
    
    vi.advanceTimersByTime(500);
    expect(element.volume).toBeCloseTo(0.5, 1);
    
    vi.advanceTimersByTime(500);
    expect(element.volume).toBeCloseTo(0.0, 1);
  });
  
  it('blocks concurrent transitions', async () => {
    const element1 = createMockAudioElement();
    const element2 = createMockAudioElement();
    
    manager.activeTransition = { type: 'fadeIn' };
    
    const result = manager.transitionToMiniGame('/audio/test.mp3', 2500);
    
    expect(result).toBeUndefined();  // Blocked
    expect(manager.miniGameTrack).toBeNull();
  });
});
```

### 9.2 Integration Tests (Director + AudioManager)

```javascript
describe('Director + Audio Integration', () => {
  let gameStore, audioManager;
  
  beforeEach(() => {
    gameStore = new GameStore();
    audioManager = new AudioManager();
  });
  
  it('transitions audio when mini-game starts', async () => {
    gameStore.setSchedule([GOLDEN_EGG]);
    gameStore.dispatch({ type: 'pressCount', value: 50 });  // Start first mini-game
    
    // When play phase is reached
    await vi.waitFor(() => {
      expect(audioManager.miniGameTrack).not.toBeNull();
    }, { timeout: 5000 });
    
    // Audio should be fading in
    expect(audioManager.activeTransition).not.toBeNull();
  });
  
  it('resumes main audio when mini-game ends', async () => {
    // ... setup mini-game in play phase ...
    
    gameStore.dispatch({ type: 'endPhase' });  // Mini-game ends
    
    await vi.waitFor(() => {
      expect(audioManager.mainTrack.isPlaying).toBe(true);
    });
  });
});
```

### 9.3 Manual Testing Checklist

- [ ] Start mash: music fades in smoothly
- [ ] Reach mini-game: audio transitions without gaps
- [ ] Mini-game ends: return to main music at exact same position
- [ ] Pause mash: music pauses
- [ ] Resume mash: music resumes from exact position
- [ ] End mash: music fades out smoothly
- [ ] Rapid clicks during transition: audio doesn't glitch
- [ ] Pause during crossfade: audio stabilizes gracefully
- [ ] Slow network (5s load): mini-game plays, audio appears when ready
- [ ] Missing audio file: game continues silently (no crash)
- [ ] iOS Safari: autoplay rejection handled (show unmute UI?)
- [ ] Multiple mini-games in sequence: smooth transitions each time

---

## 10. Recommendations Summary

### Quick Wins (Low Risk, High Impact)

1. **Add explicit `off()` method** for event listeners (prevents memory leaks)
2. **Implement cancel-on-new for transitions** (prevents race conditions)
3. **Log audio state changes** (helps production debugging)
4. **Add autoplay rejection handling** (iOS Safari support)

### Medium-Term Improvements

1. **Simplify Phase 1 scope** (skip caching, complex error handling)
2. **Add readiness handshake** before mini-game play phase
3. **Pause active fades on session pause** (avoid mid-transition glitches)
4. **Provide audio load timeout with fallback** (graceful degradation)

### Long-Term Refactoring

1. **Consider three-layer architecture** (Director → Orchestrator → AudioManager)
2. **Integrate error reporting** (send audio failures to analytics)
3. **Add production monitoring** (track audio sync, latency, failures)
4. **Test cross-browser thoroughly** (Safari, Firefox, old Android)

---

## 11. Final Assessment

### What's Good About the Plan

✓ Well-structured and thoughtful  
✓ Covers the happy path thoroughly  
✓ Position preservation logic is sound  
✓ Crossfade algorithm is correct  
✓ Graceful degradation mentioned  
✓ Event-based API fits existing patterns  

### What Needs Work

✗ Race condition handling unclear  
✗ Timing assumptions not validated  
✗ React lifecycle mismatches  
✗ Error recovery underspecified  
✗ Testing strategy missing  
✗ Scope too ambitious for Phase 1  

### Production Readiness: 2.5/5

**Will this feel smooth in production? Not yet.**

The plan is a solid foundation, but it needs **architectural guardrails** and **error recovery** before shipping. The biggest risk isn't technical complexity (it's manageable) — it's **timing assumptions** that don't account for real-world delays (network, device CPU, director state machine quirks).

**Path forward:**
1. Implement Phases 1-3 with simplified scope
2. Add the four "Quick Wins" immediately
3. Test thoroughly on real devices with throttled networks
4. Monitor production for audio sync issues
5. Iterate based on real user failures

**Estimated effort for confident 4/5 production UX:** 2-3 weeks of focused development + testing.

