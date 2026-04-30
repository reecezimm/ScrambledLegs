# Game Difficulty Scaling Research

**Date:** 2026-04-30  
**Scope:** Analyzing current mini-game difficulty progression system and infrastructure for duration-based scaling.

---

## Executive Summary

The mini-game system already has a sophisticated **session-scoped difficulty progression** system in place (implemented in `miniGames.js` lines 290–350). The `scaleDifficulty()` function and `createInfiniteSchedule()` strategy track how many times each game has been played in the current session and apply multiplicative/additive difficulty adjustments.

However, the **current system does NOT scale duration/timeout values**. This research documents:
1. How the existing play-count tracking works
2. Which games need duration scaling
3. Which games should be excluded
4. Proposed formulas for each game
5. What code changes are required

---

## 1. Current System Architecture

### 1.1 Play-Count Tracking (Already Implemented)

**Location:** `src/game/miniGames.js`, lines 290–411

The `createInfiniteSchedule()` function maintains a **`playCounts` Map** that tracks how many times each mini-game has been played in the current session:

```javascript
const playCounts = new Map();  // e.g., { 'golden-egg': 0, 'pong': 1, ... }
```

**How it works:**

1. Each time `strategy.next()` is called (whenever a mini-game queue slot needs filling):
   - Look up the picked game's ID in `playCounts`
   - If found, get the count; if not found, default to 0
   - Increment the count: `playCounts.set(pick.id, playCount + 1)`
   - Pass `playCount` to `scaleDifficulty(pick, playCount)`

2. The count represents:
   - **0** = first time playing this game in the session
   - **1** = second time (first repeat)
   - **2** = third time (second repeat)
   - etc.

3. Reset happens via `strategy.reset()` when the session ends (user saves/burns):
   ```javascript
   reset() {
     yieldedCount = 0;
     recentIds.length = 0;
     playCounts.clear();  // ← clears play counts
   }
   ```

### 1.2 Difficulty Scaling (Already Implemented)

**Location:** `src/game/miniGames.js`, lines 305–350

The `scaleDifficulty(mg, playCount)` function takes a mini-game object and a play count, returns a NEW mini-game object with scaled config values. **Original mini-games are never mutated.**

**Current scaling rules:**

| Game | Type | Formula | Effect |
|---|---|---|---|
| **golden-egg** | Multiplicative | `flightDurMs × 0.95^playCount` | Eggs fly 5% faster each repeat |
| **twilight** | Multiplicative | `speedMult = 1.05^playCount` | Beers move 5% faster each repeat |
| **mash-gauntlet** | Additive | `target += 5 × playCount` | Press threshold increases (25 → 30 → 35) |
| **dodge** (pig-attack) | Additive | `maxConcurrent += 2 × playCount` | More obstacles spawn (3 → 5 → 7) |
| **pong** | Multiplicative | `baseSpeedMult = 1.10^playCount` | Ball starts 10% faster each repeat |

---

## 2. Current Duration Settings

### 2.1 Games That Use Duration (Timeout)

All five playable mini-games declare a `timeout` in their play phase. The format is:

```javascript
timeout: { kind: 'ms', value: MILLISECONDS, outcome: 'win' || 'lose' }
```

**Current durations:**

| Game | Phase | Timeout (ms) | Outcome | Purpose |
|---|---|---|---|---|
| **Golden Egg** | Play | 10,000 | 'win' | Natural time-based ending; no fail |
| **Mash Gauntlet** | Play | 5,000 | 'lose' | Fail if target not reached in time |
| **Twilight** | Play | 18,000 | 'win' | Natural time-based ending; no fail |
| **Dodge** | Play | 10,000 | 'win' | Survive timer = win |
| **Pong** | Play | 10,000 | 'win' | Survive timer = win |

### 2.2 Games That Should NOT Be Modified

**Golden Egg** and **Twilight** are **bonus-only games** with `canLose: false`:
- They have no fail condition (no paddle miss, no collision)
- Timeout outcome is `'win'` (automatic win on completion)
- Difficulty should stay flavor-based (speed, not duration)
- **Reason:** These games reward extended play + user engagement, not tight timing

---

## 3. Games Targeted for Duration Scaling

### 3.1 Mash Gauntlet

**Current state:**
- Timeout: 5,000 ms (5 seconds)
- Outcome on timeout: `'lose'`
- Already scales: target press threshold (`25 → 30 → 35`)

**Why add duration scaling?**
- As target increases (harder), the user needs more time to hit the presses
- Currently: 5s to do 25 presses (1st play) vs 5s to do 35 presses (3rd play) ← unfair
- **Fix:** Increase timeout proportionally with target

**Proposed formula:**
```
baseDuration = 5000 ms
scale factor = 1 + (0.2 × playCount)
newTimeout = Math.round(baseDuration × scale factor)

Examples:
  playCount=0 (1st play):  5000 × 1.00 = 5,000 ms
  playCount=1 (2nd play):  5000 × 1.20 = 6,000 ms
  playCount=2 (3rd play):  5000 × 1.40 = 7,000 ms
  playCount=3 (4th play):  5000 × 1.60 = 8,000 ms
```

**Justification:**
- 20% increase per repeat matches the press-threshold scaling (5 extra presses per repeat)
- Prevents unfair time pressure on subsequent plays
- Keeps the game challenging (more presses, more time, but ratio stays competitive)

### 3.2 Dodge (Pig Dodge)

**Current state:**
- Timeout: 10,000 ms (10 seconds)
- Outcome on timeout: `'win'`
- Already scales: maxConcurrent obstacles (`3 → 5 → 7`)

**Why add duration scaling?**
- As obstacles increase, the playfield gets busier
- Surviving 10s with 3 obstacles ≠ surviving 10s with 7 obstacles
- **Fix:** Decrease timeout (shorter timer) as difficulty increases (more obstacles)

**Proposed formula:**
```
baseDuration = 10000 ms
scale factor = 1 - (0.08 × playCount)
newTimeout = Math.round(baseDuration × scale factor)

Examples:
  playCount=0 (1st play):  10000 × 1.00 = 10,000 ms
  playCount=1 (2nd play):  10000 × 0.92 = 9,200 ms
  playCount=2 (3rd play):  10000 × 0.84 = 8,400 ms
  playCount=3 (4th play):  10000 × 0.76 = 7,600 ms (floors at 5000 ms safety minimum)
```

**Justification:**
- Opposite direction: more obstacles = less time (higher density/urgency)
- 8% reduction per repeat is subtle but compounds nicely
- Prevents runaway "endless survival" feeling
- Safety floor: never go below 5,000 ms (2× the mash-gauntlet min)

### 3.3 Pong

**Current state:**
- Timeout: 10,000 ms (10 seconds)
- Outcome on timeout: `'win'`
- Already scales: initial ball speed (`baseSpeedMult = 1.10^playCount`)

**Why add duration scaling?**
- As ball gets faster, hitting it becomes harder
- At playCount=3: ball is 33% faster; 10s of play is relatively "easier" than 1st play
- **Fix:** Decrease timeout as ball speed increases

**Proposed formula:**
```
baseDuration = 10000 ms
scale factor = 1 - (0.06 × playCount)
newTimeout = Math.round(baseDuration × scale factor)

Examples:
  playCount=0 (1st play):  10000 × 1.00 = 10,000 ms
  playCount=1 (2nd play):  10000 × 0.94 = 9,400 ms
  playCount=2 (3rd play):  10000 × 0.88 = 8,800 ms
  playCount=3 (4th play):  10000 × 0.82 = 8,200 ms
```

**Justification:**
- More conservative reduction (6% vs dodge's 8%) because ball speed alone is the factor
- Pong's challenge is precision, not density; less aggressive timer pressure needed
- Safety floor: never go below 5,000 ms

---

## 4. Games to Exclude

### 4.1 Golden Egg

**Exclusion reason:**
- Bonus-only (`canLose: false`); no fail state to scale
- Timeout outcome is `'win'` (time completion = automatic victory)
- Game is about **exploration and optimization**, not survival
- Already scales: flight speed via `flightDurMs` multiplicative reduction
- Adding duration decrease would make eggs impossible to tap (they're already getting faster)
- **Decision:** Keep 10s duration constant; speed scaling is sufficient

### 4.2 Twilight

**Exclusion reason:**
- Bonus-only (`canLose: false`); no fail state to scale
- Timeout outcome is `'win'` (time completion = automatic victory)
- Game is about **sustained engagement**, not tight survival mechanics
- Already scales: beer speed via `speedMult` multiplicative increase
- Duration reduction would hurt the "cozy night sky" vibe (shorter = more rushed)
- **Decision:** Keep 18s duration constant; speed scaling is sufficient

---

## 5. Data Flow: How Play Count Reaches Config

### 5.1 Full Journey

```
1. strategy.next(currentPressCount)
   ├─ Look up or default: playCount = playCounts.get(gameId) || 0
   ├─ Increment: playCounts.set(gameId, playCount + 1)
   └─ Call: scaleDifficulty(miniGame, playCount) → scaled copy

2. scaleDifficulty(miniGame, playCount)
   ├─ Find play phase: phase.kind === 'play'
   ├─ Clone: config = { ...(phase.config || {}) }
   ├─ Apply game-specific rules (switch on miniGame.id)
   └─ Return new miniGame with updated phase.config

3. Scaled miniGame enters the schedule with:
   ├─ phases[X].config.target (for mash-gauntlet)
   ├─ phases[X].config.baseSpeedMult (for pong)
   ├─ phases[X].config.maxConcurrent (for dodge)
   ├─ phases[X].config.speedMult (for twilight)
   ├─ phases[X].config.flightDurMs (for golden-egg)
   └─ (NEW) phases[X].timeout.value (for any game, once implemented)

4. store.js dispatches mode.start(ctx)
   └─ mode reads ctx.config and ctx.timeoutMs
       ├─ ctx.config = phase.config (includes all duration/speed/target fields)
       └─ ctx.timeoutMs = phase.timeout.value (derived by store at phase entry)

5. Mode uses both:
   ├─ thresholdMash: reads config.target → sets press threshold
   ├─ pong: reads config.baseSpeedMult → scales BASE_SPEED
   ├─ pigDodge: reads config.maxConcurrent → controls spawn cap
   ├─ twilight: reads config.speedMult → scales BASE_SPEED_MIN/MAX
   └─ goldenEgg: reads config.flightDurMs → controls egg flight time

```

### 5.2 How Timeout Currently Works

**Location:** `src/game/director.js`, lines 105–132 (endPhase) and store.js

When a play phase starts:
```javascript
1. mode.start(ctx) is called
2. ctx.timeoutMs = phase.timeout.value (if timeout exists)
3. store schedules: setTimeout(() => gameStore.endPhase('outcome', null), timeoutMs)
4. If mode calls ctx.endPhase() first, cleanup happens and timeout is cancelled
5. If timeout fires first, cleanup is called with outcome='timeout'|'win'|'lose'
```

**Key insight:** `timeout.value` is read ONCE when the phase enters. It's currently baked into the mini-game definition. To make it dynamic, it must be:
- Computed by `scaleDifficulty()` when the game is picked
- Stored in `phase.timeout.value` (already the right place)
- Read by the store when the play phase starts (already happening)

---

## 6. Code Changes Required

### 6.1 `scaleDifficulty()` Function

**File:** `src/game/miniGames.js`, lines 305–350

**Current:** Only mutates `phase.config` (speed, target, etc.)  
**Required change:** Also mutate `phase.timeout.value` for duration scaling

**Pseudocode addition:**

```javascript
function scaleDifficulty(mg, playCount) {
  if (!playCount || playCount <= 0) return mg;
  const phases = mg.phases.map((phase) => {
    if (phase.kind !== 'play') return phase;
    const cfg = { ...(phase.config || {}) };
    const timeout = phase.timeout ? { ...phase.timeout } : null;
    
    switch (mg.id) {
      case 'mash-gauntlet': {
        // ... existing config scaling ...
        // NEW: scale timeout
        if (timeout && typeof timeout.value === 'number') {
          const factor = 1 + (0.2 * playCount);
          timeout.value = Math.round(timeout.value * factor);
        }
        break;
      }
      case 'dodge': {
        // ... existing config scaling ...
        // NEW: scale timeout (inverse)
        if (timeout && typeof timeout.value === 'number') {
          const factor = Math.max(0.5, 1 - (0.08 * playCount));  // floor at 50% duration
          timeout.value = Math.round(timeout.value * factor);
        }
        break;
      }
      case 'pong': {
        // ... existing config scaling ...
        // NEW: scale timeout (inverse)
        if (timeout && typeof timeout.value === 'number') {
          const factor = Math.max(0.5, 1 - (0.06 * playCount));  // floor at 50% duration
          timeout.value = Math.round(timeout.value * factor);
        }
        break;
      }
      // golden-egg, twilight: no timeout scaling
      default:
        break;
    }
    return { ...phase, config: cfg, timeout };
  });
  return { ...mg, phases };
}
```

### 6.2 No Changes Needed to Store/Director

**Why:** The store and director already handle dynamic timeout values correctly. The `timeout.value` is read when the play phase starts, not baked in at definition time.

---

## 7. Summary: What's Already There

| Component | Status | Evidence |
|---|---|---|
| Play-count tracking | ✅ Implemented | `playCounts` Map in `createInfiniteSchedule()` |
| Config scaling infrastructure | ✅ Implemented | `scaleDifficulty()` function |
| Mode consumption of scaled config | ✅ Implemented | All modes read `ctx.config` |
| Timeout value reading by store | ✅ Implemented | store derives `ctx.timeoutMs` |
| Timeout application in modes | ✅ Implemented | modes respect hard timeout |
| Session reset of play counts | ✅ Implemented | `playCounts.clear()` in strategy.reset() |

---

## 8. Risk Analysis

### 8.1 Safe Changes

✅ Modifying `timeout.value` in `scaleDifficulty()` is safe because:
- Timeout values are read at play-phase start, not stored globally
- Store already has logic to handle varying timeouts
- Modes don't cache timeout values; they use `ctx.timeoutMs`
- No existing code depends on immutable timeout values

### 8.2 Potential Issues

⚠️ **Duration floor too aggressive:**
- If Dodge timeout drops below 5s, game becomes nearly impossible with 5+ obstacles
- **Mitigation:** Test with 5s minimum; adjust formula if needed

⚠️ **Mash Gauntlet timeout increase paired with target:**
- Both increase together; formula synergy must be verified during play testing
- **Mitigation:** Run test sessions; compare 1st vs 3rd play feel

⚠️ **Golden Egg / Twilight speed scaling + unchanged duration:**
- Faster eggs/beers in same window = fewer tap opportunities
- **Mitigation:** Monitor telemetry; consider adding duration reduction only if speed alone feels wrong

---

## 9. Testing Checklist

Before implementation, verify:

- [ ] `scaleDifficulty()` correctly clones `timeout` objects
- [ ] Formulas produce whole-number milliseconds (use `Math.round`)
- [ ] Safety minimums are enforced (e.g., 5s floor for dodge/pong)
- [ ] Play counts increment correctly across multiple plays
- [ ] Session reset properly clears `playCounts`
- [ ] Modes receive scaled `ctx.timeoutMs` on 2nd+ plays
- [ ] Console logs show scaled timeout values
- [ ] Duration changes don't break outcome branching (e.g., Pong's score display)

---

## 10. References

- **Mini-game definitions:** `/src/game/miniGames.js`
- **Current scaling logic:** `/src/game/miniGames.js` lines 290–350
- **Director/reducer:** `/src/game/director.js`
- **Store/lifecycle:** `/src/game/store.js`
- **Mode contracts:** `/MINI_GAME_BUILDER.md` sections 3–4
- **Difficulty progression spec:** `/src/game/miniGames.js` lines 290–303 (comments)

