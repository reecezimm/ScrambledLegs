# Audio Architecture

Comprehensive technical documentation of the audio system: how it works, its design decisions, and how to modify it.

**Read this if you're working on audio features or debugging audio issues.**

---

## Overview

The audio system manages playback of a main track (looping during mash session) and 5 mini-game tracks (that switch in and out smoothly). It uses crossfades to transition between tracks while preserving position.

**Key Players**:
- **AudioManager.js** — Core engine, handles all playback and transitions
- **store.js** — Orchestrates audio transitions with game lifecycle
- **miniGames.js** — Defines audio files and volumes for each mini-game
- **KudosCta.js** — Triggers audio start on first mash press

---

## Architecture Diagram

```
User Presses Button (First Press)
           ↓
    KudosCta.js (line 1251)
           ↓
AudioManager.startMainTrack()
    - Fade-in: 0% → 70% (4.5s)
    - Main track plays continuously
           ↓
    Game running...
           ↓
   User enters mini-game
           ↓
    store.js (line 180)
    transitionToMiniGame()
    - Main track: 70% → 0% (1s)
    - Mini-game: 0% → 70% (1s)
    - Main track paused, position saved
           ↓
    Mini-game plays...
           ↓
   User leaves mini-game
           ↓
    store.js (line 165)
    transitionBackToMain()
    - Mini-game: 70% → 0% (1s)
    - Main track: 0% → 70% (1s)
    - Main track resumes from saved position
           ↓
    Main track plays, repeat cycle
           ↓
   User loses or saves session
           ↓
AudioManager.stopSession()
    - Fade-out: 70% → 0% (1s)
    - All audio stopped and released
```

---

## The Constant: UNIVERSAL_VOLUME

```javascript
const UNIVERSAL_VOLUME = 0.7;  // All audio tracks
```

**Defined in**: AudioManager.js, line 16

**Used in**:
- Constructor: mainTrack.volume, miniGameTrack.volume initialization
- startMainTrack() default parameter
- transitionToMiniGame() default parameter
- Mini-game configs (all use 0.7)

**Why it exists**: Single source of truth for volume level. If you want to change volume globally, update this one constant.

---

## Core Classes & Functions

### AudioManager (src/services/AudioManager.js)

Singleton that manages all audio state and playback.

#### Properties

```javascript
this.mainTrack = {
  audioElement: Audio,      // HTML5 Audio element
  filePath: string,         // Path to audio file
  isLoaded: boolean,        // Has file loaded?
  volume: 0.7,              // Target volume (0-1)
  playbackPosition: 0,      // Saved position (seconds)
  isPlaying: false,         // Currently playing?
}

this.miniGameTrack = {
  audioElement: Audio,
  filePath: string,
  isLoaded: boolean,
  volume: 0.7,
  isPlaying: false,
  // No playbackPosition (mini-games always start at 0)
}

this.masterVolume = 1.0;    // Global volume multiplier
this.currentMode = 'main';  // 'main' or 'miniGame'
```

#### Key Methods

##### startMainTrack(filePath, targetVolume = 0.7, fadeDuration = 4000)

Initializes main track and fades it in.

**Flow**:
1. Create or reuse audio element
2. Load file from filePath
3. Wait for 'canplay' event
4. Play audio
5. Fade volume: 0% → targetVolume (over fadeDuration)
6. Sync volume property: `mainTrack.volume = targetVolume`
7. Call `_updateTrackVolumes()` to apply master volume
8. Emit 'musicStarted' event

**Called from**: KudosCta.js:1251 on first mash press (press 1)

**Important**: This sets mainTrack.volume to the target, which is critical for later transitions.

##### transitionToMiniGame(filePath, volume = 0.7, duration = 1000)

Smooth crossfade from main track to mini-game track.

**Flow**:
1. Load mini-game audio file
2. Save main track position: `mainTrack.playbackPosition = audioElement.currentTime`
3. **CRITICAL**: Pause main track immediately (prevents silent position advancement)
4. Start mini-game playback
5. Parallel fade:
   - Main: CURRENT_VOL → 0% (over duration)
   - Mini-game: 0% → volume (over duration)
6. Sync volume properties: `mainTrack.volume = 0`, `miniGameTrack.volume = volume`
7. Call `_updateTrackVolumes()`
8. Set `currentMode = 'miniGame'`

**Called from**: store.js:180 when mini-game play phase begins

**Duration**: 1000ms (both entry and exit are synchronized)

**Why pause immediately?** Without pausing, the main track would continue playing silently (at 0% volume) during the crossfade, advancing its position. This caused bugs where the main track would resume at the wrong time.

##### transitionBackToMain(duration = 1000)

Smooth crossfade from mini-game track back to main track.

**Flow**:
1. Get target volume: `targetVolume = mainTrack.volume` (should be 0.7)
2. Resume main track from saved position
3. Parallel fade:
   - Mini-game: CURRENT_VOL → 0% (over duration)
   - Main: 0% → targetVolume (over duration)
4. Verify main track is playing via play() promise
5. Sync volume properties: `mainTrack.volume = targetVolume`
6. Call `_updateTrackVolumes()`
7. Set `currentMode = 'main'`

**Called from**: store.js:165 when mini-game play phase ends

**Duration**: 1000ms (matches entry duration)

**Critical**: Uses stored `mainTrack.volume` (should be 0.7) to fade back to correct level. If this property isn't synced correctly, main track fades to wrong volume.

##### stopSession()

Fades out and stops all audio.

**Flow**:
1. Fade main track: CURRENT_VOL → 0% (1s)
2. Call `_cleanup()` to release audio resources
3. Emit 'musicEnded' event

**Called from**: store.js when session ends (save/burn flow)

##### _updateTrackVolumes()

**IMPORTANT**: Applies master volume multiplier to both tracks.

**Formula**: `element.volume = track.volume × masterVolume`

**Example**:
```javascript
mainTrack.volume = 0.7
masterVolume = 1.0
appliedVolume = 0.7 × 1.0 = 0.7
audioElement.volume = 0.7
```

**Called after every fade completes**:
1. After startMainTrack() fade-in
2. After transitionToMiniGame() crossfade
3. After transitionBackToMain() crossfade

**Why this matters**: Allows runtime control of all volumes via `setMasterVolume(0.5)` (would halve all audio).

##### _fadeTrack(audioElement, fromVolume, toVolume, durationMs)

RequestAnimationFrame-based fade animation.

**How it works**:
1. Calculate elapsed time in rAF loop
2. Interpolate volume: `current = from + (to - from) × progress`
3. Set `audioElement.volume = current`
4. When progress = 100%, set final volume and resolve
5. Logs fade completion with actual vs target volume

**Why rAF?** Smooth 60fps animation without stuttering. Much better than `setInterval`.

---

## Game State Integration (store.js)

### syncModeLifecycle() Function

Called on every game state change. Detects transitions and manages audio.

**Key Points**:

```javascript
// Session start (first mini-game entering play phase)
if (!prev.active && next.active && !audioStartedForSession) {
  audioManager.startMainTrack(mainTrackPath, 0.7).catch(...)
  audioStartedForSession = true
}

// Entering mini-game (play phase)
if (nextPlay) {
  const { filePath, volume } = mg.backgroundMusic  // From miniGames.js
  audioManager.transitionToMiniGame(filePath, volume, 1000).catch(...)
}

// Exiting mini-game (back to status phase)
if (prevPlay && !nextPlay) {
  audioManager.transitionBackToMain(1000).catch(...)
}
```

**Timing**:
- Audio transitions happen concurrently with game state updates
- Both are non-blocking (use .catch() for error handling)

---

## Mini-Game Audio Definitions (miniGames.js)

Each mini-game has an audio configuration:

```javascript
const GOLDEN_EGG = {
  id: 'golden-egg',
  label: 'Golden Egg',
  // ... other properties ...
  backgroundMusic: {
    filePath: '/audio/minigames/golden-egg.mp3',
    volume: 0.7,
  },
  // ...
}
```

**All mini-games use `volume: 0.7`** (matches UNIVERSAL_VOLUME).

**Future normalization**: If different files sound different volumes, could add:
```javascript
backgroundMusic: {
  filePath: '...',
  volume: 0.7,
  normalizationFactor: 0.9,  // If this file is too loud
}
```

---

## Session Lifecycle

### 1. Idle State (Before First Press)

- No audio
- AudioManager.isSessionActive = false

### 2. First Press (press = 1)

- KudosCta.js calls: `audioManager.startMainTrack(..., 0.7, 4500)`
- Main track fades in over 4.5 seconds
- AudioManager.isSessionActive = true

### 3. Mashing (presses 1-24)

- Main track loops continuously
- No mini-games yet
- User hears main track fade-in then steady playback

### 4. First Mini-Game Enters (press 25 onwards)

- store.js detects play phase starting
- Calls: `audioManager.transitionToMiniGame(dodge.mp3, 0.7, 1000)`
- Main track crossfades out (1s)
- Mini-game track crossfades in (1s)
- User hears smooth transition

### 5. Mini-Game Playing

- Mini-game track plays
- Main track is paused, position saved
- User hears only mini-game audio

### 6. Mini-Game Ends

- store.js detects play phase ending
- Calls: `audioManager.transitionBackToMain(1000)`
- Mini-game crossfades out (1s)
- Main track crossfades in (1s), resumes from saved position
- User hears smooth transition back

### 7. Next Mini-Game (or More Mashing)

- Cycle repeats (or user just keeps mashing main track)

### 8. Session Ends (Save/Burn)

- KudosCta.js calls: `gameStore.reset()`
- store.js calls: `audioManager.stopSession()`
- Main track fades out (1s)
- Audio released, session ends
- AudioManager.isSessionActive = false

---

## Volume Flow

### Volume Property vs Audio Element Volume

**Volume Property** (`mainTrack.volume`, `miniGameTrack.volume`):
- Represents intended/target volume
- Set once at initialization or after fade completes
- Used to determine fade targets in transitions

**Audio Element Volume** (`audioElement.volume`):
- Actual volume being played
- Changes during fade animations
- Value between 0 and 1 (0 = silent, 1 = full)

**Example Flow**:

```
// Initialization
mainTrack.volume = 0.7          // Target volume property

// Fade-in animation
Frame 1: audioElement.volume = 0.0
Frame 2: audioElement.volume = 0.1
Frame 3: audioElement.volume = 0.2
...
Frame 60: audioElement.volume = 0.7   // Reached target

// After fade completes
mainTrack.volume = 0.7          // Sync property to actual state
_updateTrackVolumes()           // Apply master volume
audioElement.volume = 0.7 × 1.0 = 0.7

// Later, during transition to mini-game
// Start: mainTrack.volume = 0.7 (property)
// Fade: audioElement.volume goes 0.7 → 0.0
// End: mainTrack.volume = 0 (sync after fade)
```

### Master Volume Multiplication

After every fade, volumes are updated:

```javascript
_updateTrackVolumes() {
  // Main track
  const mainApplied = mainTrack.volume × masterVolume
  mainTrack.audioElement.volume = mainApplied
  // Logs: "Main track: 70% × masterVolume(100%) = 70%"
  
  // Mini-game track (if active)
  const miniApplied = miniGameTrack.volume × masterVolume
  miniGameTrack.audioElement.volume = miniApplied
}
```

**Use case**: If you want to mute all audio globally:
```javascript
audioManager.setMasterVolume(0)  // All tracks become silent
audioManager.setMasterVolume(0.5)  // All tracks halved
audioManager.setMasterVolume(1.0)  // All tracks normal
```

---

## Common Bugs & Fixes

### Bug: Main Track Silent After Mini-Game

**Symptom**: User leaves mini-game, main track resumes but at 0% volume

**Root Cause**: `mainTrack.volume` property not synced after fade-in

**Fix**: After fade-in completes, sync: `mainTrack.volume = targetVolume`

**Where Fixed**: AudioManager.js:124

### Bug: Position Advances During Transition

**Symptom**: Main track resumes at wrong time (advanced 2-3 seconds)

**Root Cause**: Main track continues playing silently (at 0% volume) during mini-game crossfade

**Fix**: Pause main track immediately before crossfade starts

**Where Fixed**: AudioManager.js:297-300

### Bug: Crossfades Mismatched

**Symptom**: Entry takes 2.5s, exit takes 0.25s (jarring transitions)

**Root Cause**: Different duration parameters in transitionToMiniGame() vs transitionBackToMain()

**Fix**: Sync both to 1000ms

**Where Fixed**: store.js:165, store.js:180

---

## Adding a New Mini-Game

1. **Add mini-game definition** (miniGames.js):
```javascript
export const NEW_GAME = {
  id: 'new-game',
  label: 'New Game Name',
  backgroundMusic: {
    filePath: '/audio/minigames/new-game.mp3',
    volume: 0.7,
  },
  // ... rest of config ...
}
```

2. **Create audio file**:
   - Place at `/public/audio/minigames/new-game.mp3`
   - Format: MP3, stereo, 44.1kHz or 48kHz
   - Size: ideally < 500 KB
   - Test: play in browser, verify no clicks/pops

3. **Test audio transition**:
   - Start game
   - Verify main track fades when mini-game enters
   - Verify mini-game audio fades when exiting
   - Verify no audio snaps or clicks

4. **Monitor volume**: If the new audio sounds too loud/quiet compared to others, check if normalization is needed

---

## Testing Audio

### Manual Testing Checklist

- [ ] Main track fades in smoothly on first press
- [ ] Main track fades to 0% (inaudible) when mini-game starts
- [ ] Mini-game audio fades to 70% when mini-game starts
- [ ] No clicks or pops during transitions
- [ ] Main track resumes at correct volume (70%) when mini-game ends
- [ ] Volume consistency across all 5 mini-games (don't sound noticeably different)
- [ ] Multiple transitions in one session (no degradation)
- [ ] Long session (5+ min) with no audio cuts

### Console Log Monitoring

Look for these log patterns:

```
[audio] ✓ Main track fade-in complete | now playing at full volume
[audio] ⥢ Starting crossfade | duration=1000ms | from main→to minigame
[audio] ✓ Crossfade complete | mini-game audio active
[audio] ⥢ Starting return crossfade | duration=1000ms | from minigame→to main
[audio] ✓ Return crossfade complete | main audio active
```

**Red flags**:
- Any ✗ (error) messages
- Volume mismatches in [diagnostic] logs
- Missing expected transitions

---

## Performance Notes

- **Audio elements**: 2 total (main + mini-game), reused across games
- **Fade animation**: requestAnimationFrame (60fps), non-blocking
- **Position preservation**: Minimal memory (one float per track)
- **Memory leak prevention**: `_cleanup()` called on session end

**Impact on gameplay**: Negligible (audio is handled independently from game loop)

---

## Future Improvements

- **Volume normalization**: Per-game normalizationFactor if files have different loudness
- **Fade curve options**: Currently linear, could use easing functions (exponential, etc.)
- **Audio context suspension handling**: Better fallback for autoplay policy blocks
- **3D audio**: Pan effects when mini-game elements move across screen (future)

---

**Last Updated**: 2026-04-30  
**Status**: Stable and production-ready  
**See Also**: LOGS.md (recent changes), TODO.md (pending audio work)
