# Game Music System Implementation Plan

## 1. Module/Service Structure

### 1.1 AudioManager Service
A singleton service that acts as the central controller for all audio playback.

**Location:** `/src/services/AudioManager.js`

**Core Responsibilities:**
- Manage multiple audio instances (main track + mini-game track)
- Handle fade in/out operations
- Coordinate transitions between tracks
- Expose public API for game controller/director to interact with audio
- Maintain playback state across transitions

**Architecture Pattern:**
- Single instance shared across the entire application
- No state pollution between mash sessions
- Graceful cleanup when mash ends (stop all audio, reset state)

### 1.2 Integration Points
- **Director/GameController:** Calls AudioManager methods to start main music, transition to mini-game, resume main music
- **React Components:** May subscribe to audio state changes for UI (volume slider, now-playing display)
- **Game Lifecycle:** Audio responds to mash start/pause/resume/end events

---

## 2. State Management

### 2.1 AudioManager Internal State
The AudioManager tracks:

```
{
  // Main track management
  mainTrack: {
    audioElement: HTMLAudioElement,
    filePath: string,
    isLoaded: boolean,
    volume: number (0-1),
    playbackPosition: number (milliseconds),
    isPlaying: boolean
  },
  
  // Mini-game track management
  miniGameTrack: {
    audioElement: HTMLAudioElement,
    filePath: string,
    isLoaded: boolean,
    volume: number (0-1),
    isPlaying: boolean
  },
  
  // Fade operations
  activeTransition: {
    type: 'fadeIn' | 'fadeOut' | 'crossfade' | null,
    fromTrack: 'main' | 'miniGame',
    toTrack: 'main' | 'miniGame',
    duration: number (milliseconds),
    startTime: number (timestamp),
    animationFrameId: number
  },
  
  // Global state
  masterVolume: number (0-1),
  isSessionActive: boolean,
  currentMode: 'main' | 'miniGame',
  isPaused: boolean (affects main track only during mash pause)
}
```

### 2.2 Why This Structure
- **Dual audio elements:** Allows seamless crossfading without stopping playback
- **Playback position tracking:** Preserves main track position when paused for mini-game
- **Transition state:** Enables safe management of concurrent fade operations
- **Mode tracking:** Prevents conflicting fade operations during transitions

---

## 3. Event Flow

### 3.1 Mash Session Lifecycle

```
MASH START
  ↓
Director calls: audioManager.startMainTrack(filePath, volume)
  ↓
AudioManager:
  - Load main audio file (if not cached)
  - Create HTMLAudioElement for main track
  - Set volume to 0
  - Start playback
  - Initiate FADE IN over 2.5s
  - Emit 'musicStarted' event
  ↓
MASH RUNNING
  (main track plays and loops continuously)
  ↓

MINI-GAME START
  ↓
Director calls: audioManager.transitionToMiniGame(miniGameFilePath, duration=2.5s)
  ↓
AudioManager:
  - Load mini-game audio file
  - Create HTMLAudioElement for mini-game track
  - Save main track playback position
  - Pause main track playback (preserve position)
  - Start mini-game playback at volume 0
  - Initiate CROSSFADE (main fade out, mini-game fade in over 2.5s)
  - Emit 'miniGameMusicStarted' event
  ↓
MINI-GAME RUNNING
  (mini-game track plays and loops continuously)
  ↓

MINI-GAME END (success or failure)
  ↓
Director calls: audioManager.transitionBackToMain(duration=1.5s)
  ↓
AudioManager:
  - Stop mini-game playback
  - Resume main track from saved position
  - Initiate CROSSFADE (mini-game fade out, main fade in over 1.5s)
  - Emit 'mainMusicResumed' event
  ↓
MASH RUNNING
  (main track continues from exact position)
  ↓

MASH PAUSE
  ↓
Director calls: audioManager.pauseSession()
  ↓
AudioManager:
  - Pause main track (preserve position)
  - Save playback position
  - isPaused = true
  ↓

MASH RESUME
  ↓
Director calls: audioManager.resumeSession()
  ↓
AudioManager:
  - Resume main track from saved position
  - isPaused = false
  ↓

MASH END
  ↓
Director calls: audioManager.stopSession()
  ↓
AudioManager:
  - Initiate FADE OUT over 1.0s
  - After fade completes:
    - Stop all audio playback
    - Clean up audio elements
    - Reset all state
  - Emit 'musicEnded' event
  ↓
SESSION COMPLETE
```

### 3.2 Mini-Game Integration Contract
Mini-games communicate with AudioManager via callback or event emitter:

```javascript
// Director/Mini-Game Controller
const onMiniGameStart = async () => {
  await audioManager.transitionToMiniGame(miniGameData.backgroundMusicPath, 2.5);
  // Mini-game logic proceeds
};

const onMiniGameEnd = (result) => {
  await audioManager.transitionBackToMain(1.5);
  // Continue mash session
};
```

---

## 4. Crossfade Mechanism

### 4.1 Technical Approach
Two parallel HTML5 `<audio>` elements enable gapless transitions.

**Concurrent Fade Algorithm:**
```
For each fade operation:
1. Start timestamp = current time
2. Use requestAnimationFrame for smooth 60fps fade animation
3. Calculate elapsed time: (current time - start timestamp)
4. Fade progress: min(elapsed time / target duration, 1.0)
5. Update volumes: volume = startVolume + (targetVolume - startVolume) * progress
6. When progress >= 1.0:
   - Stop the fade operation
   - Set final volumes
   - Cancel animation frame
   - Emit transition complete event
```

### 4.2 Crossfade Specifics

**Fade In (start of mash or mini-game):**
- Duration: 2.5s (main mash) or 0s (mini-game during crossfade)
- From: 0 to target volume
- Animation: Linear ramp up

**Fade Out (mini-game end to main resume):**
- Duration: 1.5s (mini-game to main) or 1.0s (mash end)
- From: current volume to 0
- Animation: Linear ramp down

**Crossfade (main ↔ mini-game):**
- Duration: 2.5s (both tracks)
- Main track: fade from target volume to 0 (over 2.5s)
- Mini-game track: fade from 0 to target volume (over 2.5s)
- Timing: Parallel fades start simultaneously
- Main track pauses at end of fade
- Mini-game track continues unpaused

### 4.3 Loop Integrity
- Audio elements have `loop="true"` attribute set
- Crossfade occurs while both tracks are playing (no restart needed)
- Main track position is preserved during mini-game (no re-seeking required)
- Smooth transitions because both loops continue uninterrupted

---

## 5. Playback Position Tracking

### 5.1 Position Preservation Strategy

**Main Track Position Management:**
```
SCENARIO 1: Mini-Game Transition
1. Before mini-game: position = mainAudio.currentTime (e.g., 15.3s)
2. Pause main track (does not reset position)
3. Store: mainTrackSavedPosition = 15.3s
4. During mini-game: main audio element paused (position frozen at 15.3s)
5. After mini-game: mainAudio.currentTime = 15.3s (restore from variable)
6. Resume playback from exact position
```

**Session Pause/Resume:**
```
SCENARIO 2: Session Pause
1. Pause main track
2. Store: mainTrackSavedPosition = mainAudio.currentTime
3. isPaused flag set to true

SCENARIO 3: Session Resume
1. Restore: mainAudio.currentTime = mainTrackSavedPosition
2. Resume playback
3. isPaused flag set to false
```

### 5.2 Implementation Details
- Use HTML5 audio API: `audio.currentTime` property
- Always pause before seeking to avoid discontinuities
- Store position in milliseconds (convert from seconds if needed)
- Verify position is within valid range before restoring

---

## 6. Mini-Game Schema Updates

### 6.1 Mini-Game Configuration Object
Each mini-game needs these additions:

```javascript
{
  // Existing fields
  id: string,
  name: string,
  description: string,
  difficulty: string,
  // ... other game-specific fields
  
  // NEW: Audio configuration
  backgroundMusic: {
    filePath: string,           // e.g., '/audio/minigames/flappy-bird.mp3'
    volume: number,             // 0-1, recommended 0.6-0.8
    allowMainTrackPause: boolean // true = pause main, false = keep playing (advanced)
  }
}
```

### 6.2 Audio File Organization
```
/public/audio/
  ├── main-tracks/
  │   ├── mash-theme.mp3        (main background music)
  │   └── mash-theme.ogg        (fallback format)
  ├── minigames/
  │   ├── flappy-bird.mp3
  │   ├── memory-match.mp3
  │   ├── quicktap.mp3
  │   └── ... (one per mini-game)
  └── sfx/                        (future: sound effects)
      ├── win.mp3
      └── lose.mp3
```

### 6.3 Default Values
If `backgroundMusic` field is missing:
- Use silent track (1-2 second silence audio file) as fallback
- Or skip music for that mini-game
- Log warning to console for debugging

---

## 7. Timeline/Coordination

### 7.1 Timing Diagram

```
MASH START + 0ms
  ├─ audioManager.startMainTrack() called
  ├─ Main audio element created and starts playback
  └─ Volume: 0 → 2500ms: linear fade to target volume

MASH START + 2500ms
  └─ Main track at target volume, mash gameplay begins

MINI-GAME START + Xms (at any point during mash)
  ├─ audioManager.transitionToMiniGame() called
  ├─ Mini-game audio created, starts at volume 0
  ├─ Main track paused (position frozen)
  └─ Parallel fades:
  │   ├─ Main: volume (target) → 0 over 2500ms
  │   └─ Mini-game: volume 0 → target over 2500ms
  └─ At 2500ms: main paused, mini-game at full volume

MINI-GAME RUNNING
  └─ Mini-game track loops continuously for 5-30 seconds

MINI-GAME END + Ys (success/failure)
  ├─ audioManager.transitionBackToMain() called
  ├─ Main track resumed from saved position
  └─ Parallel fades:
  │   ├─ Mini-game: volume (target) → 0 over 1500ms
  │   └─ Main: volume 0 → target over 1500ms
  └─ At 1500ms: mini-game paused, main at full volume

MASH CONTINUES
  └─ Main track continues seamlessly from where it left off

MASH END + Zms
  ├─ audioManager.stopSession() called
  ├─ Main track fades out:
  │   └─ Volume (target) → 0 over 1000ms
  └─ At 1000ms: stop all audio, cleanup
```

### 7.2 Coordination Between Fade Operations

**Rule: Only one transition state allowed at a time**
```
If audioManager.activeTransition exists and is not null:
  ├─ Cancel pending new transition
  └─ OR queue it (if design calls for queueing)
Else:
  └─ Proceed with new transition
```

**Preventing race conditions:**
- Lock mechanism: `isTransitioning` boolean flag
- Before starting new transition: wait for `activeTransition` to complete
- Mini-game start must wait for crossfade to complete before emitting 'ready'
- Mini-game end must wait for crossfade to complete before resuming mash

### 7.3 Volume Management
- **Master Volume:** Applied to all audio elements at all times
- **Track Volume:** Individual volume for main and mini-game tracks
- **Fade Target:** Fade always targets the track's last-set volume level
- **Formula:** `audioElement.volume = trackVolume * masterVolume`

---

## 8. Error Handling & Robustness

### 8.1 Failure Scenarios

**Audio File Not Found:**
- Try to load fallback (silent audio)
- Log error
- Continue gameplay without music (graceful degradation)

**Audio Play Promise Rejected:**
- Browser autoplay policy may block audio
- Catch promise rejection
- Provide user-initiated play option (e.g., "Unmute to hear music")

**Fade Animation Frame Drops:**
- Recalculate progress on every frame (don't assume 60fps)
- Cap duration to prevent infinite loops
- Cancel animation frame after max iterations

**Multiple Fade Operations Overlap:**
- Block new transitions until current one completes
- Emit warning if developer tries concurrent transitions

### 8.2 Testing Considerations
- Unit test: fade calculations at specific timestamps
- Integration test: mini-game start → fade → mini-game end → fade back
- Manual test: verify loop seamlessness with long audio tracks
- Browser compatibility: test on Chrome, Firefox, Safari, Edge

---

## 9. Public API Reference

### AudioManager Methods

```javascript
// Session lifecycle
audioManager.startMainTrack(filePath: string, targetVolume: number): Promise<void>
audioManager.stopSession(): Promise<void>
audioManager.pauseSession(): void
audioManager.resumeSession(): void

// Mini-game integration
audioManager.transitionToMiniGame(filePath: string, duration: number): Promise<void>
audioManager.transitionBackToMain(duration: number): Promise<void>

// Volume control
audioManager.setMasterVolume(volume: number): void
audioManager.getMasterVolume(): number
audioManager.setTrackVolume(track: 'main' | 'miniGame', volume: number): void

// State queries
audioManager.isPlaying(): boolean
audioManager.getCurrentTrack(): 'main' | 'miniGame'
audioManager.getPlaybackPosition(): number

// Events
audioManager.on('musicStarted', callback)
audioManager.on('miniGameMusicStarted', callback)
audioManager.on('mainMusicResumed', callback)
audioManager.on('musicEnded', callback)
audioManager.on('transitionComplete', callback)
```

---

## 10. Implementation Phases

### Phase 1: Core Audio Management
1. Create AudioManager service with single audio element
2. Implement basic play/stop/pause functionality
3. Add fade in/out logic with requestAnimationFrame
4. Test with main mash track

### Phase 2: Dual-Track Crossfading
1. Add second audio element for mini-game
2. Implement position preservation logic
3. Implement crossfade algorithm (parallel fades)
4. Test transition from main to mini-game and back

### Phase 3: Mini-Game Integration
1. Update mini-game schema to include `backgroundMusic` field
2. Create mini-game data fixtures with audio paths
3. Update director/controller to call AudioManager methods
4. Test end-to-end: mash start → mini-game → mash resume

### Phase 4: Polish & Edge Cases
1. Add volume control UI
2. Implement error handling (missing audio files, autoplay blocking)
3. Test pause/resume functionality
4. Test with multiple mini-games in sequence

### Phase 5: Optimization & Testing
1. Audio file preloading/caching
2. Browser compatibility testing
3. Performance profiling (CPU usage during fades)
4. User testing for musical UX

---

## 11. Design Decisions & Rationale

| Decision | Rationale |
|----------|-----------|
| Dual audio elements | Enables gapless crossfades without silence gaps |
| RequestAnimationFrame for fades | Smooth 60fps animation, synced with browser repaint cycle |
| Pause instead of stop for main track | Preserves playback position without re-seeking |
| Parallel fades for crossfade | Both tracks fade simultaneously for musical coherence |
| Singleton service pattern | One source of truth for audio state, easier debugging |
| Event emitter for coordination | Director doesn't need to know audio implementation details |
| Mini-game music optional | Graceful degradation if audio files missing |
| Position tracking in milliseconds | Consistent with browser Audio API return values |

---

## 12. Future Enhancements (Out of Scope)
- Adaptive music based on mash difficulty
- Sound effects system (separate from background music)
- User-configurable audio preferences
- Audio visualization/reactive UI elements
- Spatial audio / 3D sound positioning
- Local audio file upload for custom music
