# Game Difficulty Scaling Implementation Plan

**Date:** 2026-04-30  
**Priority:** MEDIUM  
**Estimated effort:** 4–6 hours (mostly testing)  
**Estimated testing:** 2–4 hours

---

## Executive Summary

This plan documents the step-by-step implementation of duration scaling for three mini-games (Mash Gauntlet, Dodge, Pong) to increase challenge as they repeat in the infinite game timeline. The existing infrastructure already tracks play counts and applies difficulty scaling to config values; we extend it to also scale timeout durations.

**Core change:** Modify `scaleDifficulty()` in `src/game/miniGames.js` to also scale the `timeout.value` field for three games, using formulas proven in GAME_DIFFICULTY_RESEARCH.md.

---

## 1. Architecture Overview

### 1.1 Existing Infrastructure

```
┌─────────────────────────────────────────────────────────────┐
│ createInfiniteSchedule()                                    │
│  ├─ Maintains playCounts Map: { gameId → playCount }        │
│  └─ For each picked game:                                   │
│      ├─ Look up playCount                                   │
│      ├─ Call scaleDifficulty(miniGame, playCount)           │
│      └─ Enqueue scaled copy (original never mutated)        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ scaleDifficulty(miniGame, playCount)                        │
│  ├─ Clone phases array                                      │
│  ├─ For play phases:                                        │
│  │   ├─ Clone phase.config (speed, target, etc.)            │
│  │   ├─ Apply game-specific scaling (CURRENT)               │
│  │   └─ (NEW) Apply game-specific timeout scaling           │
│  └─ Return scaled copy                                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Store: phase.start() → mode.start(ctx)                      │
│  ├─ ctx.config = phase.config (with scaling applied)        │
│  ├─ ctx.timeoutMs = phase.timeout.value                     │
│  └─ schedule: setTimeout(gameStore.endPhase, timeoutMs)     │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Modes consume ctx.timeoutMs                                 │
│  ├─ thresholdMash: ignores (plays to target only)           │
│  ├─ pong: reads as hard deadline                            │
│  ├─ pigDodge: reads as hard deadline                        │
│  ├─ goldenEgg: unaffected (no timeout scaling)              │
│  └─ twilight: unaffected (no timeout scaling)               │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Change Scope

**Single file modified:** `src/game/miniGames.js` (scaleDifficulty function only)

**No changes needed:**
- Director reducer (handles all timeout values correctly already)
- Store (already reads and applies timeout values)
- Modes (already respect ctx.timeoutMs)
- Config structures or API contracts

---

## 2. Implementation Steps

### Step 1: Backup and Understand Current Code

**Duration:** 15 minutes

1. Read current `scaleDifficulty()` function (lines 305–350 in miniGames.js)
2. Verify timeout structure in each mini-game definition:
   - `phase.timeout: { kind: 'ms', value: N, outcome: 'win'|'lose' }`
3. Confirm all three target games have a timeout in their play phase
4. Check that `Math.round()` is already used for config scaling

**Verification:**
```bash
grep -n "timeout:" src/game/miniGames.js | head -20
# Should show timeout definitions for all games
```

### Step 2: Add Timeout Scaling to MASH_GAUNTLET

**Duration:** 30 minutes (15 min code + 15 min testing)

**File:** `src/game/miniGames.js`

**Location:** Inside `scaleDifficulty()`, in the `case 'mash-gauntlet':` block (around line 327)

**Changes:**

Before:
```javascript
case 'mash-gauntlet': {
  const baseTarget = typeof cfg.target === 'number' ? cfg.target : 25;
  cfg.target = baseTarget + 5 * playCount;
  break;
}
```

After:
```javascript
case 'mash-gauntlet': {
  const baseTarget = typeof cfg.target === 'number' ? cfg.target : 25;
  cfg.target = baseTarget + 5 * playCount;
  
  // Scale timeout proportionally: +20% per repeat
  // Justification: user needs more time to hit harder target
  if (timeout && typeof timeout.value === 'number') {
    const baseDuration = timeout.value;
    const scaleFactor = 1 + (0.2 * playCount);
    timeout.value = Math.round(baseDuration * scaleFactor);
  }
  break;
}
```

**Verification (play testing):**
- Start dev server: `npm start`
- Open dev panel (right side toggle)
- Select "Mash Gauntlet" from radio
- Mash to press 50 (first play); should see `timeout: 5000ms` in console
- Reset game via dev panel
- Mash to press 50 again (second play); console should show `timeout: 6000ms`
- Check that target also increased (25 → 30)

**Expected console output:**
```
[mg] mode thresholdMash start | target=25 timeout=5000ms  (1st play)
[mg] mode thresholdMash start | target=30 timeout=6000ms  (2nd play)
[mg] mode thresholdMash start | target=35 timeout=7000ms  (3rd play)
```

### Step 3: Add Timeout Scaling to DODGE

**Duration:** 30 minutes (15 min code + 15 min testing)

**File:** `src/game/miniGames.js`

**Location:** Inside `scaleDifficulty()`, in the `case 'dodge':` block (around line 332)

**Changes:**

Before:
```javascript
case 'dodge': {
  const baseConc = typeof cfg.maxConcurrent === 'number' ? cfg.maxConcurrent : 3;
  cfg.maxConcurrent = baseConc + 2 * playCount;
  const baseInit = typeof cfg.initialSpawnCount === 'number' ? cfg.initialSpawnCount : 2;
  cfg.initialSpawnCount = baseInit + 2 * playCount;
  break;
}
```

After:
```javascript
case 'dodge': {
  const baseConc = typeof cfg.maxConcurrent === 'number' ? cfg.maxConcurrent : 3;
  cfg.maxConcurrent = baseConc + 2 * playCount;
  const baseInit = typeof cfg.initialSpawnCount === 'number' ? cfg.initialSpawnCount : 2;
  cfg.initialSpawnCount = baseInit + 2 * playCount;
  
  // Scale timeout inversely: -8% per repeat
  // Justification: more obstacles = less time (higher density)
  // Safety floor: 5000ms (50% of base)
  if (timeout && typeof timeout.value === 'number') {
    const baseDuration = timeout.value;
    const scaleFactor = Math.max(0.5, 1 - (0.08 * playCount));
    timeout.value = Math.round(baseDuration * scaleFactor);
  }
  break;
}
```

**Verification (play testing):**
- Select "Dodge" from dev panel radio
- Mash to press 50 (first play); should see `timeout: 10000ms` and `maxConcurrent: 3`
- Reset game
- Mash to press 50 (second play); should see `timeout: 9200ms` and `maxConcurrent: 5`
- Reset game
- Mash to press 50 (third play); should see `timeout: 8400ms` and `maxConcurrent: 7`

**Expected console output:**
```
[mg] mode pigDodge start | ... maxConcurrent=3 ... timeout=10000ms  (1st play)
[mg] mode pigDodge start | ... maxConcurrent=5 ... timeout=9200ms   (2nd play)
[mg] mode pigDodge start | ... maxConcurrent=7 ... timeout=8400ms   (3rd play)
```

### Step 4: Add Timeout Scaling to PONG

**Duration:** 30 minutes (15 min code + 15 min testing)

**File:** `src/game/miniGames.js`

**Location:** Inside `scaleDifficulty()`, in the `case 'pong':` block (around line 340)

**Changes:**

Before:
```javascript
case 'pong': {
  cfg.baseSpeedMult = Math.pow(1.10, playCount);
  break;
}
```

After:
```javascript
case 'pong': {
  cfg.baseSpeedMult = Math.pow(1.10, playCount);
  
  // Scale timeout inversely: -6% per repeat
  // Justification: faster ball = less time to react
  // Safety floor: 5000ms (50% of base)
  if (timeout && typeof timeout.value === 'number') {
    const baseDuration = timeout.value;
    const scaleFactor = Math.max(0.5, 1 - (0.06 * playCount));
    timeout.value = Math.round(baseDuration * scaleFactor);
  }
  break;
}
```

**Verification (play testing):**
- Select "Pong" from dev panel radio
- Mash to press 50 (first play); should see `timeout: 10000ms` and `baseSpeedMult: 1.00`
- Reset game
- Mash to press 50 (second play); should see `timeout: 9400ms` and `baseSpeedMult: 1.10`
- Reset game
- Mash to press 50 (third play); should see `timeout: 8800ms` and `baseSpeedMult: 1.21` (1.10²)

**Expected console output:**
```
[mg] mode pong start | base=380px/s baseSpeedMult=1.00 ... timeout=10000ms  (1st play)
[mg] mode pong start | base=418px/s baseSpeedMult=1.10 ... timeout=9400ms   (2nd play)
[mg] mode pong start | base=460px/s baseSpeedMult=1.21 ... timeout=8800ms   (3rd play)
```

### Step 5: Verify Golden Egg and Twilight Are Untouched

**Duration:** 15 minutes

1. Confirm `case 'golden-egg':` in `scaleDifficulty()` does NOT add timeout scaling
2. Confirm `case 'twilight':` does NOT add timeout scaling
3. Run play testing:
   - Select "Golden Egg"; play 1st, 2nd, 3rd time
   - Verify timeout stays **10,000 ms** all three times
   - Only `flightDurMs` should decrease
   - Select "Twilight"; play 1st, 2nd, 3rd time
   - Verify timeout stays **18,000 ms** all three times
   - Only `speedMult` should increase

**Expected (no changes):**
```
[mg] mode goldenEgg start | ... timeout=10000ms  (1st, 2nd, 3rd play)
[mg] mode twilight start | ... timeout=18000ms   (1st, 2nd, 3rd play)
```

---

## 3. Detailed Testing Plan

### 3.1 Unit Test: Console Log Verification

**Objective:** Confirm play counts and formulas are correct

**Test environment:** `npm start` with dev panel visible

**Protocol:**

1. **Mash Gauntlet sequence:**
   ```
   Press 50 (1st) → console shows: target=25 timeout=5000
   Reset → Press 50 (2nd) → target=30 timeout=6000
   Reset → Press 50 (3rd) → target=35 timeout=7000
   ```

2. **Dodge sequence:**
   ```
   Press 50 (1st) → console: maxConcurrent=3 timeout=10000
   Reset → Press 50 (2nd) → maxConcurrent=5 timeout=9200
   Reset → Press 50 (3rd) → maxConcurrent=7 timeout=8400
   Reset → Press 50 (4th) → maxConcurrent=9 timeout=7600
   ```

3. **Pong sequence:**
   ```
   Press 50 (1st) → console: baseSpeedMult=1.00 timeout=10000
   Reset → Press 50 (2nd) → baseSpeedMult=1.10 timeout=9400
   Reset → Press 50 (3rd) → baseSpeedMult=1.21 timeout=8800
   Reset → Press 50 (4th) → baseSpeedMult=1.33 timeout=8200
   ```

**Pass criteria:** All console logs match expected formulas

### 3.2 Integration Test: Gameplay Difficulty Feel

**Objective:** Verify difficulty progression feels right, not unfair

**Protocol:**

1. **Mash Gauntlet:**
   - Play 1st time: Should comfortably hit 25 presses in 5 seconds (achievable ≈ 5 presses/sec)
   - Play 2nd time: 30 presses in 6 seconds (same 5 presses/sec ratio) ← should feel equally achievable
   - Play 3rd time: 35 presses in 7 seconds (same ratio) ← balanced difficulty

2. **Dodge:**
   - Play 1st time: 3 obstacles, 10 seconds ← relaxed, learning phase
   - Play 2nd time: 5 obstacles, 9.2 seconds ← challenging but fair
   - Play 3rd time: 7 obstacles, 8.4 seconds ← tight but expert-achievable

3. **Pong:**
   - Play 1st time: 380 px/s ball speed, 10 seconds ← moderate
   - Play 2nd time: 418 px/s ball speed, 9.4 seconds ← faster + shorter
   - Play 3rd time: 460 px/s ball speed, 8.8 seconds ← intense

**Pass criteria:**
- Each repeat feels noticeably harder but not impossible
- No timeout feeling "unfair" (e.g., timer running out despite skilled play)
- Duration reduction never dominates the difficulty perception (ball speed/obstacle count should feel primary)

### 3.3 Edge Case Test: Safety Floors

**Objective:** Verify formulas never breach safety minimums

**Protocol:**

1. **Mash Gauntlet:**
   - Has NO floor (additive scaling only increases, never decreases)
   - By playCount=10: timeout = 5000 × (1 + 0.2×10) = 15000ms
   - Expected behavior: grows unbounded (acceptable; game eventually becomes too hard and user quits)

2. **Dodge:**
   - Has 50% floor: `Math.max(0.5, 1 - 0.08×playCount)`
   - By playCount=6: scaleFactor = max(0.5, 1 - 0.48) = 0.52 → 5200ms
   - By playCount=10: scaleFactor = max(0.5, 1 - 0.8) = 0.5 → 5000ms
   - By playCount=100: scaleFactor = max(0.5, 1 - 8) = 0.5 → 5000ms (stays at floor)
   - Expected behavior: timeout never drops below 5000ms

3. **Pong:**
   - Has 50% floor: `Math.max(0.5, 1 - 0.06×playCount)`
   - By playCount=8: scaleFactor = max(0.5, 1 - 0.48) = 0.52 → 5200ms
   - By playCount=10: scaleFactor = max(0.5, 1 - 0.6) = 0.5 → 5000ms
   - By playCount=100: scaleFactor = max(0.5, 1 - 6) = 0.5 → 5000ms (stays at floor)
   - Expected behavior: timeout never drops below 5000ms

**Verification method:**
```javascript
// Add temporary debug log in scaleDifficulty for testing:
console.log(`[difficulty-test] ${mg.id} playCount=${playCount} ` +
            `timeout: ${phase.timeout.value} → ${timeout.value}`);
```

### 3.4 Regression Test: Golden Egg and Twilight

**Objective:** Confirm non-target games are unaffected

**Protocol:**

1. Play Golden Egg multiple times (1st, 2nd, 3rd)
   - Console should show timeout **always 10000ms**
   - flightDurMs should DECREASE each time (5% speed increase)

2. Play Twilight multiple times (1st, 2nd, 3rd)
   - Console should show timeout **always 18000ms**
   - speedMult should INCREASE each time (5% speed increase)

**Pass criteria:** No unintended timeout scaling on these games

### 3.5 Cross-Game Session Test

**Objective:** Verify play counts are tracked per-game across a mixed session

**Protocol:**

1. Set dev panel to **"Auto"** (random schedule)
2. Play a full session (press to ~100+), letting games repeat naturally
3. Check console logs for patterns:
   ```
   [mg] ▶ START "golden-egg" ... (schedule 1/3)
   [mg] ▶ START "mash-gauntlet" (target=25, timeout=5000) ← 1st time
   [mg] ▶ START "dodge" (concurrent=3, timeout=10000) ← 1st time
   [mg] ▶ START "pong" (speedMult=1.00, timeout=10000) ← 1st time
   [mg] ▶ START "twilight" (timeout=18000) ← unscaled
   [mg] ▶ START "mash-gauntlet" (target=30, timeout=6000) ← 2nd time!
   [mg] ▶ START "dodge" (concurrent=5, timeout=9200) ← 2nd time!
   ```

**Pass criteria:**
- Each game's play count increments independently
- Timeout scales correctly for each game's nth repeat

---

## 4. Risks and Edge Cases

### 4.1 High-Risk Issues

| Issue | Severity | Mitigation |
|---|---|---|
| Timeout becomes unreachable (too short) | HIGH | Test at high playCount; adjust formula if floor too aggressive |
| Game becomes unwinnable due to combined speed + duration | HIGH | Test dodge/pong at playCount=5+; verify expert players still win 70%+ |
| Mash Gauntlet target + timeout mismatch | MEDIUM | Target increases linearly, timeout multiplicatively; verify feel through play testing |

### 4.2 Low-Risk Issues

| Issue | Severity | Mitigation |
|---|---|---|
| Timeout rounding artifacts (1ms off) | LOW | Math.round() is standard; no player perceives 1ms difference |
| Player confusion ("why is timer shorter?") | LOW | Not exposed in UI; only visible in dev console; acceptable for difficulty progression |

### 4.3 Edge Cases

**Case 1: Golden Egg with high playCount**
- Expected: speed gets very fast (5% reduction each time)
- At playCount=5: flightDurMs → 0.95^5 ≈ 77% of base (still visible)
- At playCount=10: flightDurMs → 0.95^10 ≈ 60% of base (challenging but not impossible)
- **Action:** No changes needed; existing formula handles it

**Case 2: Dodge with playCount>10**
- Expected: timeout floors at 5000ms; difficulty increases via obstacles only
- At playCount=15: timeout = 5000ms, concurrent = 3 + 30 = 33 obstacles
- **Risk:** Game becomes physically impossible (screen fills with pigs)
- **Mitigation:** Not a blocker for this feature; user would eventually quit the session

**Case 3: Session with only one game type**
- Example: DevTogglePanel set to "Pong only"
- Expected: playCount increments on each reset
- **Risk:** None; mechanism works per-game
- **Verification:** Included in cross-game session test

---

## 5. Code Review Checklist

Before committing, verify:

- [ ] Timeout value is cloned (`const timeout = { ...phase.timeout }`)
- [ ] Formulas use correct operators (`1 +` for additive, `1 -` for subtractive)
- [ ] `Math.max()` floors are applied for Dodge/Pong
- [ ] `Math.round()` is used to produce whole milliseconds
- [ ] Golden Egg case has NO timeout scaling (comment confirms)
- [ ] Twilight case has NO timeout scaling (comment confirms)
- [ ] No changes to director.js, store.js, or mode files
- [ ] Function still returns a new mini-game object (original never mutated)
- [ ] Indentation and spacing match existing code

---

## 6. Deployment Steps

### 6.1 Pre-deployment Checklist

- [ ] Run full play-test suite (section 3)
- [ ] Console logs show correct formulas
- [ ] No regressions on Golden Egg / Twilight
- [ ] Code review passed (section 5)

### 6.2 Commit Message

```
feat: scale mini-game durations by repeat count

Add dynamic timeout scaling to increase difficulty as games repeat:
- Mash Gauntlet: +20% timeout per repeat (pairs with target increase)
- Dodge: -8% timeout per repeat, floored at 5s (counters obstacle scaling)
- Pong: -6% timeout per repeat, floored at 5s (pairs with speed increase)

Golden Egg and Twilight durations unchanged (bonus-only, no fail state).

Play count tracking and config scaling already existed; this extends
the mechanism to also scale phase.timeout.value in scaleDifficulty().

Fixes: #[ISSUE_NUMBER] (if applicable)
```

### 6.3 Testing in Staging (Optional)

If a staging environment exists:
1. Deploy to staging
2. Run cross-game session test for 30+ minutes
3. Monitor console for anomalies
4. Confirm no crashes on deep repeat (playCount > 20)

---

## 7. Post-Implementation Monitoring

### 7.1 Telemetry to Track (if available)

- Average session length per game (does scaling affect engagement?)
- Win/loss ratio per game (does scaling affect difficulty perception?)
- Play count distribution (how often do players get to 2nd+ plays?)

### 7.2 Player Feedback Signals

- Do players report feeling "blocked" or "unfair" on repeats?
- Do players enjoy the progressive difficulty?
- Are there playCount thresholds where complaints spike?

### 7.3 Future Tuning

If formulas need adjustment post-launch:
- Dodge inverse scaling might be too aggressive → try 0.05 instead of 0.08
- Pong inverse scaling might be too gentle → try 0.08 instead of 0.06
- Mash Gauntlet might need a timeout cap (e.g., floor at 2× base)

---

## 8. FAQ

**Q: Why not scale all games?**  
A: Golden Egg and Twilight are bonus-only (no fail state). Scaling their durations shorter would reduce engagement without adding tension.

**Q: Why different formulas (additive vs. inverse)?**  
A: Mash Gauntlet's challenge is the press threshold; longer timeout matches longer count. Dodge/Pong's challenge is speed/density; shorter timeout increases urgency.

**Q: What if a player hits playCount=50?**  
A: Mash Gauntlet's timeout grows linearly (target keeps going up). Dodge/Pong floor at 5s. User eventually quits session due to exhaustion, not unfairness.

**Q: Does this change the meta-game?**  
A: Slightly. Repeats now have an additional difficulty dimension (time), not just config (speed/target). Should feel natural but not announced.

**Q: Can I tune the formulas later?**  
A: Yes. All scaling constants (0.2, 0.08, 0.06, 0.5) are literal numbers in the code. Change any one and re-deploy.

---

## 9. Success Criteria

This feature is **complete and successful** when:

1. ✅ `scaleDifficulty()` correctly modifies `timeout.value` for Mash Gauntlet, Dodge, Pong
2. ✅ Console logs show scaled timeout values on 2nd+ plays
3. ✅ Golden Egg and Twilight timeouts remain constant
4. ✅ Play testing shows difficulty progression feels fair and natural
5. ✅ No regressions in other mini-game behavior
6. ✅ Code review passes
7. ✅ Commit pushed to main (or merged via PR if team process requires)

---

## 10. File Summary

### Single file modified:
- **`src/game/miniGames.js`** (scaleDifficulty function, ~30 lines added/modified)

### No files changed:
- `src/game/director.js` (already handles dynamic timeouts)
- `src/game/store.js` (already reads timeout.value correctly)
- `src/game/modes/*.js` (already respect ctx.timeoutMs)
- Any configuration files or constants

### Reference files (read-only):
- `GAME_DIFFICULTY_RESEARCH.md` (this research document)
- `MINI_GAME_BUILDER.md` (game architecture reference)

