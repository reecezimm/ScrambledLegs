# Mini-Game Messaging & Timeline Visualization

This document provides a complete picture of what players experience as they progress through the infinite mini-game flow, including messaging patterns, scheduling rules, and detailed click-by-click timelines.

---

## Part 1: Master Mini-Game Schedule Table

| Game | Phase 1 | Clicks | Text | Phase 2 | Clicks | Text | Play Duration | Outcome | Duration | Text (varies by performance) |
|------|---------|--------|------|---------|--------|------|-----------------|---------|--------|-----|
| **PREAMBLE** | Intro | 5 | MINI GAMES APPROACHING\nDON'T STOP MASHING THE BUTTON | — | — | — | — | — | — | — |
| **GOLDEN_EGG** | Intro 1 | 5 | GOLDEN EGG\nINCOMING | Intro 2 | 5 | TAP THE GOLDEN EGG\nFOR EXTRA POINTS | 10s (10000ms) | Outro | 2.5s (ms-timed) | +{score} BONUS\nNICE TAPS. (or GOOD JOB) |
| **MASH_GAUNTLET** | Intro 1 | 5 | MASH GAUNTLET | Intro 2 | 5 | MASH FAST OR DIE\n5 SECONDS | 5s (5000ms) | Outcome | 2.5s (ms-timed) | WIN: YOU SURVIVED.\n+100 OR FAILED: FAILED. (ends session on fail) |
| **TWILIGHT** | Intro 1 | 5 | SOMETHING'S BREWING… | Intro 2 | 5 | TAP THE BEERS\nKEEP MASHING | 10s (10000ms) | Outro | 2.5s (ms-timed) | PERFECT POUR. CHEERS. (or variations by score) |
| **DODGE** | Intro 1 | 5 | DODGE\nINCOMING | Intro 2 | 5 | PROTECT THE BIKER\nDRAG TO SAFETY | 10s (10000ms) | Outcome | 2.4s (ms-timed) | WIN: +75 SURVIVED.\nSTART MASHING. OR HIT BY OBSTACLE.\nTRY AGAIN. |
| **PONG** | Intro 1 | 5 | PONG | Intro 2 | 5 | KEEP THE BALL ALIVE\nWITH THE BUTTON | 10s (10000ms) | Outcome | 2.4s (ms-timed) | WIN: {hits} HITS. NICE. OR MISSED IT.\n{hits} HITS. (ends session on miss) |

### Key Observations:
- **All outcome messages** now use ms-timed display (2.5s) to ensure feedback displays even if player stops mashing
- **GOLDEN_EGG** outcome changed from press-counted (5 presses) to ms-timed (2.5s) for consistency
- **MASH_GAUNTLET** outcome extended from 2s to 2.5s for consistency
- **TWILIGHT** play duration reduced from 18s to 10s to match other core games
- Play phase timeouts now consistent: MASH_GAUNTLET (5s), GOLDEN_EGG/DODGE/PONG/TWILIGHT (10s each)
- **MASH_GAUNTLET**, **PONG**, and **DODGE** can end the session on failure
- **MASH NOW! Warning** (2026-04-30): Pulsing gold text appears bottom-right for 2.5s after each mini-game completes
  - Font: Fredoka bold, 36-64px (doubled size for prominence)
  - Animation: Pulse effect (opacity 1→0.6, scale 1→1.05)
  - Currently fires after PREAMBLE (bug - should only fire after playable games)

---

## Part 1.5: Failure Condition Audit

### Games That Cannot Fail (No Loss Path)

#### 🟢 PREAMBLE
- **Can Fail**: No (`canLose: false`)
- **Rules**: onWin bonus = 0
- **Outcome**: Always exits after 5 presses

#### 🟢 GOLDEN_EGG
- **Can Fail**: No (`canLose: false`)
- **Rules**: onWin bonus = 0
- **Outcome**: Always exits after 10s timeout
- **Score Path**: Bonus = number of eggs tapped × 25
- **Message**: "GOOD JOB" if 0 eggs, "+{score} BONUS\nNICE TAPS." if score > 0

#### 🟢 TWILIGHT
- **Can Fail**: No (`canLose: false`)
- **Rules**: onWin bonus = 0
- **Outcome**: Always exits after 10s timeout
- **Score Path**: Bonus = number of beers tapped × 25
- **Message**: Score-tiered feedback ("PERFECT POUR" if >100, "DECENT FOAM" if >50, etc.)

---

### Games That Can Fail (Conditional Loss Path)

#### 🔴 MASH_GAUNTLET
- **Can Fail**: Yes (`canLose: true`)
- **Win Condition**: Player must press ≥25 times within 5 seconds
- **Failure Condition**: Timer expires (5s) before reaching 25 presses
- **Bonus on Win**: +100
- **Bonus on Lose**: -30
- **Session Impact**: `endsMashSession: true` → **Ends entire mash session immediately**
- **Failure Message**: `{score} / 25\nFAILED.` (2.5s ms-timed display)
- **Failure Flow**:
  1. Timer expires → `ctx.endPhase('lose', pressCount)`
  2. Outcome phase displays failure message (2.5s)
  3. Director detects `onLose.endsMashSession = true`
  4. sessionEndPulse increments → KudosCta receives signal
  5. runSaveFlow() called → save/burn/reset sequence

#### 🔴 PONG
- **Can Fail**: Yes (`canLose: true`)
- **Win Condition**: Ball bounces off paddle successfully for 10 seconds
- **Failure Condition**: Ball reaches viewport bottom without paddle overlap (user misses)
- **Bonus on Win**: +0 (score is hit count, bonus stays 0)
- **Bonus on Lose**: +0 (no bonus penalty, but session ends)
- **Session Impact**: `endsMashSession: true` → **Ends entire mash session immediately**
- **Failure Message**: `MISSED IT.\n{hits} HITS.` (2.4s ms-timed display)
- **Failure Flow**:
  1. Ball.y + radius >= viewport.height AND vy > 0 AND no paddle overlap
  2. `ctx.endPhase('lose', hits)` called immediately
  3. rAF cancelled to stop game loop
  4. Outcome phase displays failure message (2.4s)
  5. Director detects `onLose.endsMashSession = true`
  6. sessionEndPulse increments → KudosCta receives signal
  7. runSaveFlow() called → save/burn/reset sequence
- **Detection Timing**: Failure is detected in real-time (< 1 frame latency)

#### 🔴 DODGE
- **Can Fail**: Yes (`canLose: true`)
- **Win Condition**: Player dodges all obstacles for 10 seconds without collision
- **Failure Condition**: Obstacle (car/vehicle emoji) collides with player avatar hitbox
- **Bonus on Win**: +75
- **Bonus on Lose**: +0 (no penalty)
- **Session Impact**: `endsMashSession: true` → **Ends entire mash session immediately**
- **Failure Message**: `HIT BY OBSTACLE.\nTRY AGAIN.` (2.4s ms-timed display)
- **Failure Flow**:
  1. Obstacle center enters player hitbox (shrunk avatar rect)
  2. `ctx.endPhase('lose', 0)` called immediately
  3. rAF cancelled to stop obstacle spawning/animation
  4. Outcome phase displays failure message (2.4s)
  5. Director detects `onLose.endsMashSession = true`
  6. sessionEndPulse increments → KudosCta receives signal
  7. runSaveFlow() called → save/burn/reset sequence
- **Detection Timing**: Collision detected frame-by-frame in game loop

---

### Failure Condition Summary Table

| Game | Can Fail | Failure Trigger | Bonus Penalty | Sessions End | Outcome Time | Restart Allowed |
|------|----------|-----------------|---------------|--------------|--------------|-----------------|
| PREAMBLE | ❌ No | N/A | N/A | No | N/A | N/A |
| GOLDEN_EGG | ❌ No | N/A | N/A | No | N/A | N/A |
| TWILIGHT | ❌ No | N/A | N/A | No | N/A | N/A |
| DODGE | ✅ Yes | Obstacle collision | 0 (no penalty) | ✅ **YES** | 2.4s | ❌ No |
| MASH_GAUNTLET | ✅ Yes | Timeout without target | -30 | ✅ **YES** | 2.5s | ❌ No |
| PONG | ✅ Yes | Ball missed (bottom) | 0 (no penalty) | ✅ **YES** | 2.4s | ❌ No |

---

### Critical Differences Between Failures

**Session-Ending Failures** (MASH_GAUNTLET, PONG, DODGE):
- Trigger immediate save→burn→reset flow
- No chance to continue mashing
- Player sees failure message (2.4-2.5s) then enters save phase
- Used for high-stakes challenges where player skill/reflexes are tested
- Failure is the end condition for the entire mash session

**No-Fail Games** (PREAMBLE, GOLDEN_EGG, TWILIGHT):
- Always complete on timeout
- Score varies based on performance
- No lose path means no failure logic in modes
- Focus is on engagement and bonus accumulation, not survival
- Player can never trigger session end via failure

---

## Part 2: Scheduling Rules & Constants

### Core Scheduling Constants
```javascript
WARNING_AT_PRESS    = 25    // Preamble appears at click 25
FIRST_GAME_AT       = 30    // First real mini-game starts at click 30
GAP_PRESSES         = 10    // Click gap between end of one game and start of next
FIRST_START         = 50    // (Legacy constant, actual games start at FIRST_GAME_AT = 30)
```

### Game Selection Strategy (Infinite Mode)

The `createInfiniteSchedule()` function manages game selection with the following rules:

#### Yield Order
1. **Slot 0 (Preamble)**: PREAMBLE always yields first
   - startAtPress: 25
   - Duration: 5 presses (exits at click 30)
   - Not in the random pool; appears exactly once per session

2. **Slot 1 (First Real Game)**: Random game from pool
   - startAtPress: 30 (FIRST_GAME_AT)
   - Immediately follows preamble

3. **Slots 2+**: Random games, no consecutive repeats
   - startAtPress: previousGameEnd + GAP_PRESSES (10 clicks)
   - **No-repeat rule**: Neither of the last 2 games can be selected next
   - Fallback: If pool becomes exhausted, relax to "not the last game"
   - If still no candidates exist (tiny pool), select from entire pool

#### Difficulty Progression

Each time a mini-game runs in the current session, the NEXT occurrence gets harder:

| Game | Difficulty Multiplier | Formula |
|------|----------------------|---------|
| golden-egg | Flight speed | 5% faster per play (0.95^playCount) |
| twilight | Movement speed | 5% faster per play (1.05^playCount) |
| mash-gauntlet | Target threshold | +5 presses per play (25 → 30 → 35 → ...) |
| dodge | Obstacle density | +2 max concurrent per play (3 → 5 → 7 → ...) |
| pong | Ball speed | 10% faster per play (1.10^playCount) |

Difficulty resets when the session ends.

---

## Part 3: Five Complete Timeline Scenarios

### Timeline Notation
- **Clicks X-Y**: Press count range
- **Duration**: Approximation based on measured click rates (~5-8 presses per second during active play)
- **Outcome**: Assumed win for scenarios (except noted failures)
- **GAP**: The 10-click spacing between games

### FLOW 1: Preamble → GOLDEN_EGG → MASH_GAUNTLET (with gap) → TWILIGHT

```
=== FLOW 1: Preamble → Golden Egg → Mash Gauntlet → Twilight (80 clicks) ===

Clicks 0-24:          [IDLE MASHING - no mini-games triggered]

Clicks 25-29:         PREAMBLE (5 clicks)
                      "MINI GAMES APPROACHING\nDON'T STOP MASHING THE BUTTON"

Clicks 30-34:         GOLDEN_EGG - Phase 1 (5 clicks)
                      "GOLDEN EGG\nINCOMING"

Clicks 35-39:         GOLDEN_EGG - Phase 2 (5 clicks)
                      "TAP THE GOLDEN EGG\nFOR EXTRA POINTS"

Clicks 40-49:         GOLDEN_EGG - Play Phase (10 seconds)
                      Active egg-tapping gameplay
                      [Assume 8 taps → score +200]

Clicks 50-54:         GOLDEN_EGG - Outro (5 clicks, press-counted)
                      "+200 BONUS\nNICE TAPS."

Clicks 55-64:         [GAP_PRESSES = 10 clicks idle mashing]

Clicks 65-69:         MASH_GAUNTLET - Phase 1 (5 clicks)
                      "MASH GAUNTLET"

Clicks 70-74:         MASH_GAUNTLET - Phase 2 (5 clicks)
                      "MASH FAST OR DIE\n5 SECONDS"

Clicks 75-79:         MASH_GAUNTLET - Play Phase (5 seconds timeout)
                      Player must reach 25 presses to win
                      [Assume win: 25/25 reached in 3.2 seconds]

Clicks 80+:           MASH_GAUNTLET - Outcome (2000ms, ms-timed)
                      "25 / 25\nSURVIVED. +100"
                      [Next game would start at click 90 (80 + GAP_PRESSES)]
```

**Analysis:**
- Total active messaging phases: ~20 clicks (preamble + 2 intros + 1 outro)
- Total play phases: ~25 seconds of active gameplay
- Pacing: 5-click intro → 5-click teaser → gameplay → 5-click resolution is consistent for GOLDEN_EGG
- MASH_GAUNTLET feels more urgent: tight countdown in phase 2, microsecond-precision play window
- Gap provides clear "catch your breath" moment before next challenge

---

### FLOW 2: Preamble → DODGE → PONG (drag-based sequence, 85 clicks)

```
=== FLOW 2: Preamble → Dodge → Pong (drag-based mini-games, 85 clicks) ===

Clicks 0-24:          [IDLE MASHING]

Clicks 25-29:         PREAMBLE (5 clicks)
                      "MINI GAMES APPROACHING\nDON'T STOP MASHING THE BUTTON"

Clicks 30-34:         DODGE - Phase 1 (5 clicks)
                      "DODGE\nINCOMING"

Clicks 35-39:         DODGE - Phase 2 (5 clicks)
                      "PROTECT THE BIKER\nDRAG TO SAFETY"
                      [Input switches from mashing to drag-hold]

Clicks 40-49:         DODGE - Play Phase (10 seconds)
                      Dragging the bike avatar to avoid obstacles
                      [Vehicles spawn every 1.6s, max 3 concurrent]
                      [Assume 0 hits → win]

Clicks 50-52.4:       DODGE - Outcome (2400ms, ms-timed)
                      "+75 SURVIVED.\nSTART MASHING."
                      [Timer runs regardless of mash input]

Clicks 53-62:         [GAP_PRESSES = 10 clicks idle mashing]
                      [Input switches back from drag to normal]

Clicks 63-67:         PONG - Phase 1 (5 clicks)
                      "PONG"

Clicks 68-72:         PONG - Phase 2 (5 clicks)
                      "KEEP THE BALL ALIVE\nWITH THE BUTTON"
                      [Input switches to horizontal drag-hold]

Clicks 73-82:         PONG - Play Phase (10 seconds)
                      Ball bounces; paddle (button) is horizontal-only
                      Speed increases 10% each replay session
                      [Assume 6 paddle hits → win]

Clicks 83-85.4:       PONG - Outcome (2400ms, ms-timed)
                      "6 HITS. NICE."
```

**Analysis:**
- Drag-based games (DODGE, PONG) cluster interesting input switch patterns
- Gap between games is critical here: gives player time to readjust input strategy
- Both games force the player to release drag input during gaps
- Outcome messages are ms-timed in both: ensures visibility even if player releases immediately post-win
- PONG outcome depends on hit count (variable per session)

---

### FLOW 3: Preamble → TWILIGHT → DODGE → GOLDEN_EGG (mixed styles, 100 clicks)

```
=== FLOW 3: Preamble → Twilight → Dodge → Golden Egg (100 clicks) ===

Clicks 0-24:          [IDLE MASHING]

Clicks 25-29:         PREAMBLE (5 clicks)
                      "MINI GAMES APPROACHING\nDON'T STOP MASHING THE BUTTON"

Clicks 30-34:         TWILIGHT - Phase 1 (5 clicks)
                      "SOMETHING'S BREWING…"

Clicks 35-39:         TWILIGHT - Phase 2 (5 clicks)
                      "TAP THE BEERS\nKEEP MASHING"

Clicks 40-49:         TWILIGHT - Play Phase (10 seconds)
                      Canvas turns dark blue gradient night sky
                      Beer mugs float across screen with foam trails
                      +25 per tap
                      [Assume 3 beers tapped → score +75]

Clicks 50-52.5:       TWILIGHT - Outro (2500ms, ms-timed)
                      "FOAMY. NOT GREAT."
                      [Feedback tied to score: >100='PERFECT', >50='DECENT', >0='FOAMY', 0='EMPTY']

Clicks 53-62:         [GAP_PRESSES = 10 clicks idle mashing]

Clicks 63-67:         DODGE - Phase 1 (5 clicks)
                      "DODGE\nINCOMING"

Clicks 68-72:         DODGE - Phase 2 (5 clicks)
                      "PROTECT THE BIKER\nDRAG TO SAFETY"

Clicks 73-82:         DODGE - Play Phase (10 seconds)
                      [Second play of session: maxConcurrent = 3+2 = 5 obstacles]
                      [Assume successful dodge]

Clicks 83-85.4:       DODGE - Outcome (2400ms, ms-timed)
                      "+75 SURVIVED.\nSTART MASHING."

Clicks 86-95:         [GAP_PRESSES = 10 clicks]

Clicks 96-100:        GOLDEN_EGG - Phase 1 (5 clicks)
                      "GOLDEN EGG\nINCOMING"

Clicks 101-105:       GOLDEN_EGG - Phase 2 (5 clicks)
                      "TAP THE GOLDEN EGG\nFOR EXTRA POINTS"

Clicks 106-115:       GOLDEN_EGG - Play Phase (10 seconds)
                      [Second play: eggs move 5% faster (0.95^1)]
                      [Assume 5 taps → score +125]

Clicks 116-118.5:     GOLDEN_EGG - Outro (2500ms, ms-timed)
                      "+125 BONUS\nNICE TAPS."
```

**Analysis:**
- TWILIGHT's 10-second play phase now matches DODGE/PONG duration for pacing consistency
- Outcome messages now uniform: all ms-timed at 2.5s (TWILIGHT, GOLDEN_EGG, MASH_GAUNTLET)
- Outcome variance still visible in TWILIGHT (score-dependent feedback text)
- Dodge appearing twice shows difficulty escalation in action (obstacles increase)
- All outcome messages now guaranteed to display (ms-timed, not press-counted)
- Total gameplay window: 30 seconds of focused attention (down from 38s)
- Messaging is consistent: 10 clicks intro → play → 2.5s outcome across all core games

---

### FLOW 4: Preamble → MASH_GAUNTLET (FAILED) → GOLDEN_EGG (scenario: failed end-of-session)

```
=== FLOW 4: Preamble → Mash Gauntlet FAILED (ends session, 65 clicks) ===

Clicks 0-24:          [IDLE MASHING]

Clicks 25-29:         PREAMBLE (5 clicks)
                      "MINI GAMES APPROACHING\nDON'T STOP MASHING THE BUTTON"

Clicks 30-34:         MASH_GAUNTLET - Phase 1 (5 clicks)
                      "MASH GAUNTLET"

Clicks 35-39:         MASH_GAUNTLET - Phase 2 (5 clicks)
                      "MASH FAST OR DIE\n5 SECONDS"

Clicks 40-44:         MASH_GAUNTLET - Play Phase (5 seconds timeout)
                      Player must reach 25 presses
                      [Assume player only reaches 16 presses before timeout]

Clicks 45-46.8:       MASH_GAUNTLET - Outcome FAILED (2000ms, ms-timed)
                      "16 / 25\nFAILED."
                      
CONSEQUENCES:
                      - Bonus penalty: -30 points
                      - endsMashSession: true → FORCES SESSION END
                      - Player is dropped into save → burn → reset flow
                      - No subsequent games appear
                      
[IF session had NOT ended, next game would start at click 55 (45 + 10)]
```

**Analysis:**
- MASH_GAUNTLET and PONG are the only games that can terminate a session
- Failure feedback (2000ms) is deliberately non-press-counted to ensure player reads it despite panic
- This creates a potential emotional peak: the shortest play window (5s) with the highest failure risk
- The -30 penalty + session end makes this the "trap" mini-game that forces consequence
- If experienced at playCount=0, target is 25; at playCount=1 it becomes 30 (harder)

---

### FLOW 5: Extended Sequence → Twilight (second play, harder) → Pong (varies on outcome)

```
=== FLOW 5: Extended Session with Twilight Scaling & Pong Outcome Variance (110 clicks) ===

[Earlier games have played: GOLDEN_EGG (playCount=0), TWILIGHT (playCount=0), DODGE (playCount=0)]

Clicks 0-24:          [IDLE from session start]

Clicks 25-29:         PREAMBLE (5 clicks)

Clicks 30-75:         [First game: GOLDEN_EGG playCount=0, clicks 30-54]
                      [Gap 55-64]
                      [Second game: TWILIGHT playCount=0, clicks 65-84]
                      [Gap 85-94]

Clicks 95-99:         DODGE - Phase 1 (5 clicks) [First DODGE playCount=0]
                      "DODGE\nINCOMING"

Clicks 100-104:       DODGE - Phase 2 (5 clicks)
                      "PROTECT THE BIKER\nDRAG TO SAFETY"

Clicks 105-114:       DODGE - Play Phase (10 seconds) [playCount=0]

Clicks 115-117.4:     DODGE - Outcome (2400ms)
                      "+75 SURVIVED.\nSTART MASHING."

Clicks 118-127:       [GAP_PRESSES = 10 clicks]

Clicks 128-132:       TWILIGHT - Phase 1 (5 clicks) [Second TWILIGHT playCount=1]
                      "SOMETHING'S BREWING…"

Clicks 133-137:       TWILIGHT - Phase 2 (5 clicks)
                      "TAP THE BEERS\nKEEP MASHING"

Clicks 138-155:       TWILIGHT - Play Phase (18 seconds)
                      [playCount=1: speed = 1.05^1 = 5% faster beers]
                      [Beers appear more frequently, more challenging]
                      [Assume 4 beers tapped → score +100]

Clicks 156-158.5:     TWILIGHT - Outro (2500ms, ms-timed)
                      "DECENT FOAM. STILL THIRSTY?"
                      [Score tier: 50 < 100 < 150]

Clicks 159-168:       [GAP_PRESSES = 10 clicks]

Clicks 169-173:       PONG - Phase 1 (5 clicks) [First PONG playCount=0]
                      "PONG"

Clicks 174-178:       PONG - Phase 2 (5 clicks)
                      "KEEP THE BALL ALIVE\nWITH THE BUTTON"

Clicks 179-188:       PONG - Play Phase (10 seconds)
                      [playCount=0: baseSpeedMult = 1.0]
                      [Paddle is button, horizontal-only drag]

SCENARIO A (WIN):
Clicks 189-191.4:     PONG - Outcome WIN (2400ms)
                      "8 HITS. NICE."
                      [Next game would start at 201]

SCENARIO B (MISS/LOSS):
Clicks 189-191.4:     PONG - Outcome LOSS (2400ms)
                      "MISSED IT.\n4 HITS."
                      [endsMashSession: true → SESSION ENDS]
                      [No more games appear]
                      [Player dropped to save → burn → reset]
```

**Analysis:**
- Twilight scales visibly: faster enemies = more tactical spacing needed
- Pong is the "wild card" at session end: outcome determines continuation vs. forced stop
- Outcome variance in PONG (hit count is deterministic per play but varies session-to-session) creates replay incentive
- Total session: 189 clicks of mashing + decision points
- Difficulty progression is exponential by time-played: players feel noticeable harder challenge on second occurrence
- TWILIGHT's 18-second play window dominates the session timing

---

## Part 4: Messaging & Pacing Observations

### Message Structure Patterns

#### Type A: Symmetrical Intros (GOLDEN_EGG, DODGE, PONG, MASH_GAUNTLET)
- Phase 1: 5 clicks, title/theme ("GOLDEN EGG INCOMING", "DODGE INCOMING")
- Phase 2: 5 clicks, action instruction ("TAP THE GOLDEN EGG…", "DRAG TO SAFETY")
- Consistent 10-click "ramp" before play

#### Type B: Asymmetrical Intro (TWILIGHT)
- Phase 1: 5 clicks, atmospheric ("SOMETHING'S BREWING…")
- Phase 2: 5 clicks, instruction + encouragement ("TAP THE BEERS\nKEEP MASHING")
- Same 10-click ramp but tonally different (mysterious vs. mechanical)

#### Type C: Single Intro (PREAMBLE)
- Exactly 5 clicks
- Warning tone, emphasis on continuity ("DON'T STOP MASHING")
- Acts as session "handoff" notification

### Outcome Messaging Patterns

| Game | Timing | Dependency | Style |
|------|--------|------------|-------|
| GOLDEN_EGG | 5 clicks (press-counted) | score > 0 | Congratulatory |
| MASH_GAUNTLET | 2s (ms-timed) | Branched: win vs. fail | Stark |
| TWILIGHT | 2.5s (ms-timed) | 4-tier: score thresholds | Sarcastic/descriptive |
| DODGE | 2.4s (ms-timed) | Branched: win vs. hit | Imperative |
| PONG | 2.4s (ms-timed) | Branched: win vs. miss | Terse |

### Temporal Observations

1. **Intro Consistency**: All games use 10-click intro (5 + 5), except PREAMBLE (5 alone)
   - Pro: predictable cognitive load
   - Con: repetitive; no variation in pacing feel

2. **Play Duration Spread**: 5s (MASH_GAUNTLET) to 18s (TWILIGHT)
   - Most games: 10s (GOLDEN_EGG, DODGE, PONG)
   - TWILIGHT is 80% longer → creates pacing variety
   - MASH_GAUNTLET is 50% shorter → tense/high-stakes feel

3. **Gap Sizing**: Consistent 10 clicks between games
   - ~1-2 seconds at typical click rate
   - Provides minimal recovery; feels intentional (no "rest")
   - May feel jarring if player is catching breath

4. **Total Session Duration** (typical win sequence):
   - 25 clicks: preamble
   - ~30 clicks: first game (10 intro + play variable + 5-2.5 outcome)
   - ~25 clicks: gap + second game
   - Total: ~80 clicks per 2 games ≈ 10-16 seconds of active play + 80-160 seconds of presentation

### Pacing Quality Assessment

#### Strengths
- **Message hierarchy** is clear: intro → instruction → outcome progression
- **Outcome tiers** (TWILIGHT, MASH_GAUNTLET) reward exploration/experimentation
- **Play duration variety** (MASH_GAUNTLET sprint vs. TWILIGHT endurance) maintains engagement
- **No skips**: All phases forced (press-counted or ms-timed), ensuring reading

#### Potential Issues
1. **10-click gap feels uniform**: Every inter-game pause is identical. Scaling gap by prior game difficulty could add breathing room dynamically.
2. **Intro fatigue**: 10 clicks of text before every game might feel repetitive after 3-4 consecutive plays.
3. **Outcome timing mismatch**: Press-counted outcomes (GOLDEN_EGG) force continued mashing; ms-timed (TWILIGHT) can be read while paused. Mixed UX.
4. **PREAMBLE appears once**: Breaks format after first occurrence. Consider a "checkpoint" reminder at playCount=2+.

### Game-by-Game Pacing Verdict

| Game | Intro | Play | Outcome | Overall Feel | Risk |
|------|-------|------|---------|--------------|------|
| GOLDEN_EGG | Standard | Relaxed (10s) | Flow-breaking (5 clicks forced) | Chill; tapping | Low |
| MASH_GAUNTLET | Standard | Intense (5s sprint) | Breathless (ms-timed) | Adrenaline spike | HIGH (failure) |
| TWILIGHT | Atmospheric | Extended (18s) | Chill (ms-timed) | Zen/endurance | Low |
| DODGE | Standard | Intense (10s drag) | Breathless (ms-timed) | Focused/tactical | Medium (input switch) |
| PONG | Standard | Intense (10s drag) | Breathless (ms-timed) | Arcade-like | HIGH (failure) |

---

## Summary

The infinite game scheduler creates a **predictable but varied experience** through:

1. **Scheduling rules**: Preamble always first, no consecutive game repeats, fixed 10-click gaps
2. **Difficulty curve**: Each replayed game gets harder (5-10% scaling per occurrence)
3. **Outcome variance**: Score-dependent feedback in TWILIGHT and GOLDEN_EGG creates replay incentive
4. **Session-ending risks**: MASH_GAUNTLET and PONG force player stakes (failure = session reset)

The messaging cadence (10-click intros → variable play → 2.4-5 second outcomes) is **consistent but potentially fatiguing**. The 18-second TWILIGHT game breaks monotony, but 4 games cycling through 10-second plays could feel formulaic.

**Recommended enhancements**:
- Add 1-2 "checkpoint" reminder messages every 3-4 games
- Vary gap size based on prior game difficulty (longer after PONG, shorter after GOLDEN_EGG)
- Consider occasional "surprise" early game activations (game at click 40 instead of 50) to disrupt player pattern-matching
