# TODO List

Organized by **Priority** (Critical → Low) and **Type** (Development, Research, Testing, Planning).

Each task has an **Official ID** (e.g., CRITICAL-001) used for tracking in LOGS.md and cross-references.

When working on a task, update its status:
- 📝 = Pending (not started)
- 🚀 = In Progress (actively working)
- ✅ = Completed
- 🔄 = Blocked (waiting for something)

For details on how to update this file and use task IDs, see [PROCESS.md](./PROCESS.md).

---

## 🔴 CRITICAL

### CRITICAL-001: Audio System Quality Assurance
- **Status**: 📝 Pending
- **Type**: Testing
- **Description**: Test audio system in production for:
  - No snaps/clicks during transitions
  - Volume consistency across all tracks
  - Master volume control works as expected
- **Why Critical**: Audio is core user experience; regression would be immediately noticed
- **Acceptance**: Test 5+ complete game sessions with no audio issues
- **Files Affected**: AudioManager.js (all transitions)

### CRITICAL-002: Golden Egg "GOOD JOB" Message
- **Status**: ✅ Completed (2026-04-30)
- **Type**: Development
- **Description**: Changed "WHIFF." to "GOOD JOB" when no eggs are tapped
- **Why Critical**: User specifically requested this change
- **Files Changed**: miniGames.js:39

### HIGH-005: Fix MASH NOW! Warning Timer Duration
- **Status**: ✅ Completed (2026-04-30)
- **Type**: Bug Fix
- **Description**: MASH NOW! warning was staying on screen longer than 2.5 seconds
- **Root Cause**: useEffect dependency array included entire `r` object, which changes on every resolve() call (~multiple times/sec)
  - This caused effect to re-run constantly
  - Each re-run started a new 2500ms timer
  - Old timer was cleared, new timer started immediately
  - Result: warning never actually disappeared after 2.5s
- **Solution**: Changed dependency from `[r, state.pressCount]` to `[r?.flashWarning]`
  - Now effect only runs when flashWarning value actually changes
  - Timer runs uninterrupted for full 2.5 seconds
- **Files Changed**: src/components/calendar/MashNowWarning.js (line 64)
- **Acceptance**: Warning displays for exactly 2.5 seconds then clears ✅

---

## 🟠 HIGH

### HIGH-001: High Score Display on Mobile
- **Status**: 📝 Pending
- **Type**: Development
- **Description**: Fix high score not appearing/updating on mobile app
- **Details**: User reported high score count display issues on mobile:
  - Numbers sometimes show 12345 stacked vertically
  - High score hides properly after leaving mash game ✅
  - High score display in events detail view needs verification
- **Files to Check**: 
  - src/components/calendar/HighScoreHud.js
  - src/components/calendar/EventFeatured.js (event details)
  - useMashHighScore hook
- **Acceptance**: High score displays and updates correctly on mobile

### HIGH-002: Mini-Game Session-End Behavior Consistency
- **Status**: ✅ Completed (2026-04-30)
- **Type**: Development
- **Description**: Ensure MASH_GAUNTLET, PONG, and DODGE all consistently end the session when the player loses/fails
- **Details**: 
  - ✅ PONG already had endsMashSession: true in onLose (line 205)
  - ✅ MASH_GAUNTLET confirmed endsMashSession: true in onLose (line 57)
  - ✅ DODGE updated to include endsMashSession: true in onLose (line 154)
- **Files Changed**: src/game/miniGames.js
- **Acceptance**: All three games consistently trigger save→burn→reset flow on failure

### HIGH-003: Mini-Game Messaging Normalization
- **Status**: ✅ Completed (2026-04-30)
- **Type**: Development
- **Description**: Normalize all mini-game outcome messages and timing for consistency
- **Changes Made**:
  - ✅ TWILIGHT: Duration reduced from 18s → 10s (line 124), intro "COLD BEERS", outcome "WELL DONE."
  - ✅ GOLDEN_EGG: Intro simplified to "GOLDEN EGG", second intro "TAP THE GOLDEN EGG\nBUT KEEP MASHING", outcome "GOOD JOB"
  - ✅ MASH_GAUNTLET: Win message → "YOU SURVIVED.\n+100", lose → "FAILED."
  - ✅ DODGE: Failure message → "FAILURE.", endsMashSession: true
  - ✅ PONG: Failure message → "FAILURE.", endsMashSession: true
- **Files Changed**: src/game/miniGames.js
- **Acceptance**: All mini-games have consistent messaging and 2.4-2.5s outcome display timing

### HIGH-004: MASH NOW! Warning Feature
- **Status**: ✅ Completed (2026-04-30)
- **Type**: Development
- **Description**: Flash "MASH NOW!" warning in bottom-right corner after every mini-game with success
- **Details**:
  - Appears when mini-game ends with `outcome === 'win'` (active: null)
  - Duration: 2.5 seconds (then auto-clears)
  - Style: Gold text with pulse animation, positioned bottom-right
  - Font: Fredoka bold, 36-64px (doubled from initial 18-32px)
  - Position: Fixed bottom-right, 60px from bottom, 20px from right
  - Uses incrementing counter to detect new warnings (same string value across games)
  - Comprehensive logging at trigger, render, and clear points
- **Files Changed**: 
  - src/game/director.js (added flashWarning + flashWarningCounter to state; increments on win)
  - src/components/calendar/MashNowWarning.js (new component, depends on [flashWarning, flashWarningCounter])
  - src/components/calendar/KudosCta.js (imported and rendered warning)
- **Acceptance**: 
  - ✅ Warning appears after mini-game wins only
  - ✅ Does NOT appear on losses or PREAMBLE (outcome check handles both)
  - ✅ Displays for exactly 2.5 seconds per instance
  - ✅ Appears correctly on second+ mini-games (counter mechanism works)
  - ✅ Font size 2x larger (36-64px responsive)

---

## 🟡 MEDIUM

### MEDIUM-001: Audio Volume Normalization (Optional)
- **Status**: 📝 Pending
- **Type**: Research + Development
- **Description**: If audio files have different perceived loudness, implement per-track normalization
- **Details**: 
  - All tracks currently at 0.7 volume
  - Some files may be intrinsically louder/quieter than others
  - Could add `normalizationFactor` field to mini-game audio configs
- **Research**: Listen to all 5 mini-game tracks + main track, assess if they sound "balanced"
- **If Needed**: Add normalizationFactor property to audioManager.js
- **Acceptance**: All tracks perceived at same loudness level

### MEDIUM-002: Audio File Compression Verification
- **Status**: 📝 Pending
- **Type**: Testing
- **Description**: Verify audio files are optimized for web delivery
- **Details**:
  - Main track: 450 KB, 45.77s (good)
  - Mini-games: 200-500 KB each (acceptable)
  - Could evaluate if further compression is worthwhile
- **Research**: Check current file sizes, assess quality vs. file size tradeoff
- **Acceptance**: All files < 500 KB, quality acceptable for playback

### MEDIUM-003: Audio Snap/Click Elimination (If Needed)
- **Status**: 🔄 Blocked (pending QA testing)
- **Type**: Development
- **Description**: If audio snaps/clicks appear during transitions, investigate and fix
- **Potential Causes**:
  - Race condition between play() promise and fade animation
  - Autoplay policy rejections with no graceful fallback
  - Audio element state not verified before transitions
- **Investigation**: Check console logs during gameplay for warnings
- **Files to Review**: AudioManager.js (play promise handling, state verification)
- **Acceptance**: Zero audio artifacts during smooth gameplay

---

## 🟢 LOW

### LOW-001: Crew Profile Data (Reece Zim)
- **Status**: 📝 Pending
- **Type**: Development
- **Description**: Update crew profile for Reece Zimm with additional info
- **Details**:
  - GM: Rhys M
  - Blurb: "He used to be fast. Now he's just average."
- **Files to Update**: src/services/crewData.js or Firebase crew collection
- **Acceptance**: Profile displays updated info when viewing crew

### LOW-002: Code Documentation (Nice-to-Have)
- **Status**: 📝 Pending
- **Type**: Planning + Development
- **Description**: Add docstrings to key functions (AudioManager, director, modes)
- **Priority**: Low (code is readable, but docs would help future maintainers)
- **Files**: 
  - AudioManager.js (already has good comments)
  - director.js (reducer logic could use docstrings)
  - Game modes (mode.start() contract)
- **Acceptance**: All public functions have clear purpose statements

### LOW-003: Performance Monitoring
- **Status**: 📝 Pending
- **Type**: Research
- **Description**: Investigate any performance issues with audio or rendering
- **Details**: Monitor during extended gameplay for:
  - Memory leaks (does page get slower over time?)
  - Audio latency or desync
  - Canvas rendering performance
- **Tools**: Browser DevTools, console logging
- **Acceptance**: No noticeable performance degradation over 10+ min gameplay

---

### RESEARCH-001: Mini-Game Lifecycle & 10-Press Gap Analysis (Initial Audit)
- **Status**: ✅ Completed (2026-04-30)
- **Type**: Research
- **Description**: First pass deep dive on mini-games, director, and auto-scheduler
- **Findings Summary**:
  - 10-press gap is mechanically consistent: `currentPressCount + 10` computed at outcome-phase-end
  - All outcome phases are ms-timed (2400–2500ms) and auto-advance via `syncStatusTimeout()`
  - Session-ending failure is consistent: MASH_GAUNTLET, DODGE, PONG all have `endsMashSession: true`
  - GOLDEN_EGG and TWILIGHT cannot lose — no failure state
  - PREAMBLE is a special case: first real game at hard-coded press 30 (zero gap after PREAMBLE)
- **See Also**: [TEN_PRESS_GAP_INVESTIGATION.md](./TEN_PRESS_GAP_INVESTIGATION.md) — deeper open investigation

### INVEST-001: 10-Press Gap — Continued Investigation
- **Status**: 🔄 Open (not fully resolved)
- **Type**: Research + Possible Development
- **Description**: User reports perceivable inconsistency in gap between mini-games. Mechanics confirmed correct but open questions remain.
- **Open Questions**:
  1. Does `maybeRefillSchedule()` always capture the correct `pressCount` snapshot? (race conditions?)
  2. Is the "short gap" perception specific to certain game pairings (e.g., MASH_GAUNTLET ending early)?
  3. Does `appendSchedule` create a frame where UI briefly shows idle state before advance() activates the next game?
  4. Is `GAP_PRESSES = 10` the right number? At 4+ presses/sec, 10 presses = ~2.5 seconds — may feel too short
  5. Should PREAMBLE → GAME 1 have a gap? Currently zero gap (both at press 30)
- **Next Step**: Add gap logging to `store.js → maybeRefillSchedule()` and play 3–5 sessions
- **Full Details**: [TEN_PRESS_GAP_INVESTIGATION.md](./TEN_PRESS_GAP_INVESTIGATION.md)
- **Files to Watch**: src/game/store.js (maybeRefillSchedule), src/game/miniGames.js (GAP_PRESSES, next())

### INVEST-002: Mash Challenge & Bubble Text Overhaul
- **Status**: 🚀 In Progress — Phase 1 (consolidation) complete, Phase 2 (content expansion) pending
- **Type**: Research + Content + Development
- **What's done**:
  - ✅ `src/game/mashText.js` created — single source of truth (~250 strings)
  - ✅ FIFO-3 repeat guard implemented (`pickMashText`)
  - ✅ Crew gate added to Zone 2 (crew taunts only after press 30)
  - ✅ Both zones draw from same pool
- **Still pending**:
  - TEXT-001 to TEXT-005: Full copy audit (read every string, verify crew names)
  - TEXT-010 to TEXT-012: Content expansion (target 80+ bubble phrases)
  - TEXT-016 to TEXT-018: User decisions on case, dwell times, repetition
- **Full Audit & TODO**: [MASH_CHALLENGE_BUBBLE_TEXT_OVERHAUL.md](./MASH_CHALLENGE_BUBBLE_TEXT_OVERHAUL.md)
- **Files**: src/game/mashText.js, src/components/calendar/KudosCta.js, src/hooks/useMashEffects.js

### INVEST-003: Mini-Game Difficulty Progression
- **Status**: ✅ Completed (2026-04-30)
- **Type**: Development
- **Description**: Full difficulty scaling system implemented for all 5 mini-games across session laps.
- **What was built**:
  - `scaleDifficulty()` in `miniGames.js` — per-game scaling on every repeat
  - Shuffle-bag scheduler — all 5 games dealt once before any repeats (Fisher-Yates)
  - Dodge + Pong duration scaling: +5s per lap (10s → 15s → 20s → 25s…)
- **Scaling summary**:
  - Golden Egg: flight speed × 0.95 per lap
  - Mash Gauntlet: target +5 presses per lap (25→30→35…)
  - Twilight: movement speed × 1.05 per lap
  - Dodge: +2 concurrent obstacles per lap + +5s duration per lap
  - Pong: base speed × 1.10 per lap + +5s duration per lap
- **Files**: src/game/miniGames.js

### BUG-001: Pong/Gauntlet/Dodge Double Session-End Fire
- **Status**: ✅ Completed (2026-04-30)
- **Type**: Bug Fix
- **Description**: Session-ending mini-games (Pong, Gauntlet, Dodge) were triggering `runSaveFlow()` twice — user saw saving→burning→saving→burning.
- **Root cause**: Two independent paths called `runSaveFlow()`: the `sessionEndPulse` listener (immediate) and the post-mini-game grace timer (4000ms). The grace timer fired 1300ms before the burn phase ended, starting a second save cycle.
- **Fix**: `saveFlowInProgressRef` idempotency guard at top of `runSaveFlow()`. Clears before `enterIdleState()`.
- **Files**: src/components/calendar/KudosCta.js

---

## 📊 Status Summary

| Priority | Total | Completed | In Progress | Pending | Blocked |
|----------|-------|-----------|-------------|---------|---------|
| Critical | 2 | 1 | 0 | 1 | 0 |
| High | 5 | 5 | 0 | 0 | 0 |
| Medium | 3 | 0 | 0 | 2 | 1 |
| Low | 3 | 0 | 0 | 3 | 0 |
| Research | 1 | 1 | 0 | 0 | 0 |
| Investigation | 4 | 2 | 1 | 0 | 1 |
| **TOTAL** | **18** | **9** | **1** | **6** | **2** |

**Notes:**
- All HIGH priority tasks complete
- INVEST-003 (difficulty scaling): ✅ complete — shuffle-bag + per-game scaling + duration scaling
- BUG-001 (double session-end fire): ✅ fixed
- INVEST-002 (text overhaul): Phase 1 (consolidation) done, Phase 2 (content) pending
- INVEST-001 (10-press gap): mechanics confirmed, open questions remain

---

## 🎯 Recommended Next Work

**Immediate** (Do these first):
1. 🔴 Double session-end fire still occurring on Mash Gauntlet — `saveFlowInProgressRef` fix may not be reaching it (BUG-001 re-open, investigate)
2. Audio system QA testing (CRITICAL-001)
3. High score mobile display fix (HIGH-001)

**Then**:
4. Text overhaul Phase 2 — copy audit + content expansion (INVEST-002)
5. 10-press gap live testing with logging (INVEST-001)

**Optional** (when you have time):
- Crew profile update (LOW-001)
- Audio normalization research (MEDIUM-001)
- Performance monitoring (LOW-003)

---

## How to Update This File

See [PROCESS.md](./PROCESS.md) for detailed instructions.

**TL;DR**: When a task status changes:

```markdown
### Task Name
- **Status**: 📝 → 🚀 → ✅ (update this)
- Update date if status changed
- Add a comment if you discovered something new
```

Then update the status summary table.

---

**Last Updated**: 2026-04-30  
**Accuracy**: Current as of mini-game lifecycle deep dive  
**Next Review**: After audio QA testing and high score mobile fix
