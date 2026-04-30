# Bug Analysis: Dodge Mini-Game Collision Not Stopping Game

## Summary
The pigDodge mini-game has a collision detection bug where calling `ctx.endPhase('lose', 0)` when the biker collides with an obstacle does **not** properly stop the game loop. The game continues running after the collision is detected, allowing pigs to continue moving and new pigs to spawn even after the game should be in a "lost" state.

## Bug Location
**File**: `/c/Users/Reece/Development/Source/sl/src/game/modes/pigDodge.js`  
**Function**: `tick()` function (lines 137-249)  
**Specific collision code**: Lines 210-220  
**Cleanup function**: Lines 261-334  

## Root Cause Analysis

### Primary Issue: Tick Function Returns Early But Does Not Halt Game Loop

**Problem 1: Early return doesn't stop rAF loop**

When a collision is detected (lines 210-220), the code does this:

```javascript
// Collision (pig center inside slightly-shrunk avatar rect).
if (
  pig.x + halfPig > hbLeft && pig.x - halfPig < hbRight &&
  pig.y + halfPig > hbTop  && pig.y - halfPig < hbBottom
) {
  if (!ended) {
    ended = true;
    console.log('[mg] pigDodge HIT — pig collided with the girl');
    ctx.endPhase('lose', 0);
  }
  return;
}
```

The function sets `ended = true` and calls `ctx.endPhase('lose', 0)`, then returns from the tick function. **However**, this return statement only exits the current tick invocation—it does NOT cancel the `requestAnimationFrame` that was scheduled at line 248:

```javascript
rafId = requestAnimationFrame(tick);
```

### Critical Race Condition: Stale rAF Callbacks Continue Executing

At line 137-138, the tick function has a guard:

```javascript
function tick(now) {
  if (cancelled || ended) return;
```

This guard is **sufficient to stop work** but only on the NEXT frame. Here's the issue:

1. **Frame N**: Collision detected → `ended = true` → `ctx.endPhase('lose', 0)` called → `tick()` returns early
2. **Frame N+1**: The rAF callback fires, `ended === true` guard triggers, function returns immediately (line 138)
3. **Frame N+2+**: Same—guards prevent work but rAF keeps firing

**The rAF loop continues to schedule itself indefinitely** even after the game ends, wasting CPU cycles. More importantly, if there's a race condition where the `tick()` function definition or closure captures state differently, the game loop could theoretically continue processing collisions or physics.

### Secondary Issue: No Guarantee endPhase() Halts Game Before Cleanup Runs

Looking at the store's implementation (store.js lines 179-206), when `ctx.endPhase()` is called:

1. Store calls `gameStore.endPhase(outcome, score)` (line 244 in store.js)
2. This dispatches a reducer action (store.js line 332-334)
3. The reducer processes the action asynchronously via `setState()`
4. `setState()` then calls `syncModeLifecycle()` to clean up the mode (store.js lines 155-170)
5. The cleanup function (the function returned by `pigDodge.start()`) is invoked

**The timing is:**
- Tick frame executes → collision detected → `ctx.endPhase()` called
- `ctx.endPhase()` sets `ended = true` in the makeCtx closure (store.js line 241-242)
- Store reducer action queued
- **BUT**: The current tick function already returned at line 219; `setState()` and cleanup haven't run yet
- **Frame N+1**: Next rAF fires → guard on line 138 finally prevents tick work

This creates a window where the game loop has already been asked to stop but hasn't yet been cleaned up.

### Tertiary Issue: Missing rAF Cancellation Before Returning

The `tick()` function schedules the next animation frame BEFORE checking for collisions (line 248), but the collision early return at line 219 doesn't cancel this scheduled frame. A safer pattern would be:

```javascript
// At collision:
if (collision detected) {
  if (!rafId) { // already cancelled
    return;
  }
  rafId = 0;
  cancelAnimationFrame(rafId); // Cancel any pending frame
  ended = true;
  ctx.endPhase('lose', 0);
  return;
}
```

But this is already on line 262-264 in the cleanup function—just not in the tick function itself.

---

## Evidence

### Collision Check Code (pigDodge.js lines 210-220)
```javascript
if (
  pig.x + halfPig > hbLeft && pig.x - halfPig < hbRight &&
  pig.y + halfPig > hbTop  && pig.y - halfPig < hbBottom
) {
  if (!ended) {
    ended = true;
    console.log('[mg] pigDodge HIT — pig collided with the girl');
    ctx.endPhase('lose', 0);
  }
  return;
}
```

**Issue**: Sets `ended = true` locally and calls `ctx.endPhase()`, but returns from the current tick without cancelling the rAF scheduled at line 248.

### rAF Loop Scheduling (pigDodge.js line 248)
```javascript
rafId = requestAnimationFrame(tick);
```

This is at the END of the `tick()` function. The collision check at lines 210-220 returns early, but the rAF was already scheduled in the PREVIOUS frame. This scheduled frame will still execute.

### Guards That Theoretically Should Prevent Work (pigDodge.js lines 137-138)
```javascript
function tick(now) {
  if (cancelled || ended) return;
```

This guard is there, but it only prevents work on the NEXT frame and beyond. It doesn't prevent the rAF callback from being registered.

### Context endPhase Implementation (store.js lines 240-245)
```javascript
endPhase(outcome, score) {
  if (ended) return;
  ended = true;
  console.log(`[mg] mode endPhase outcome=${outcome} score=${score == null ? '-' : score}`);
  gameStore.endPhase(outcome, score);
},
```

The store's context object has its own `ended` flag and guards against double-invocation. However, this flag is separate from the mode's `ended` flag (pigDodge.js line 26).

### Comparison with Pong (pong.js lines 196-201)
```javascript
// ── Miss line: ball reaches viewport bottom unobstructed ─────────
if (y + BALL_RADIUS >= h && vy > 0) {
  if (!ended) {
    ended = true;
    console.log(`[mg] pong MISS — game over | hits=${hits}`);
    ctx.endPhase('lose', hits);
  }
  return;
}
```

**Pong has the same pattern** and likely exhibits the same rAF scheduling issue! However, Pong's game is simpler (single ball, fewer per-frame operations), so the issue may be less noticeable.

---

## What SHOULD Happen After endPhase('lose') is Called

1. **Immediately**: Mode's `ended` flag is set, and tick() returns early
2. **Next Frame**: tick() guard (line 138) prevents work, but rAF continues to schedule
3. **Next Frame+**: store.js `syncModeLifecycle()` runs the cleanup function:
   - Sets `cancelled = true` and `ended = true` (line 262-263)
   - Calls `cancelAnimationFrame(rafId)` (line 264)
   - Clears `spawnTimer` (line 265)
   - Removes all pig DOM elements (line 267)
   - Removes avatar element (line 287)
   - Removes body data attributes (line 289)
   - Clears CSS custom properties (lines 295-296)

## Why the Bug Still Happens

The `ended` flag in the pigDodge.js closure is set at line 215, which prevents the tick() function from doing work at line 138 on the NEXT frame. However:

1. The rAF scheduled at line 248 is already in the queue by the time collision is detected
2. That scheduled rAF WILL fire on the next frame
3. The guard at line 138 prevents work but doesn't stop the rAF loop—it just immediately returns
4. The rAF loop continues to schedule itself indefinitely until `cancelled = true` is set by the cleanup function

**In the worst case**: If there's a UI lag or timing issue where cleanup doesn't run immediately after endPhase is called, the game loop could theoretically keep running for multiple frames.

---

## Recommended Fix

### Option 1: Cancel rAF Immediately on Collision (Recommended)

Modify the collision detection block (lines 210-220) to cancel the scheduled rAF before returning:

```javascript
if (
  pig.x + halfPig > hbLeft && pig.x - halfPig < hbRight &&
  pig.y + halfPig > hbTop  && pig.y - halfPig < hbBottom
) {
  if (!ended) {
    ended = true;
    // IMMEDIATELY cancel any pending animation frame
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    console.log('[mg] pigDodge HIT — pig collided with the girl');
    ctx.endPhase('lose', 0);
  }
  return;
}
```

**Rationale**: This ensures the rAF loop is stopped synchronously as soon as a collision is detected, preventing any possibility of stale frames executing after endPhase is called.

### Option 2: Don't Schedule rAF If Game Is Already Ending

Modify the rAF scheduling (line 248) to check the `ended` flag before scheduling:

```javascript
// Only schedule next frame if game hasn't ended
if (!ended && !cancelled) {
  rafId = requestAnimationFrame(tick);
}
```

**Rationale**: Prevents scheduling new frames if the game is already in a terminal state. This is a defensive guard that assumes endPhase and cleanup may not run immediately.

### Option 3: Move rAF Scheduling to Start, Schedule Only If Continuing

Restructure the tick function to schedule the next frame at the BEGINNING rather than the end:

```javascript
function tick(now) {
  if (cancelled || ended) {
    rafId = 0;  // Clear rAF ID if we exit
    return;
  }
  
  // ... all existing game logic ...
  
  // Schedule next frame at the end, but only if we haven't ended
  if (!ended && !cancelled) {
    rafId = requestAnimationFrame(tick);
  }
}
```

**Rationale**: Gives more control over frame scheduling and makes it explicit that we don't schedule if the game is ending.

---

## Impact Assessment

**Severity**: MEDIUM
- **Symptom**: Game visually continues running after collision (pigs still move, new pigs spawn)
- **Root Cause**: rAF loop continues scheduling despite `ended` flag being true
- **User Impact**: Game appears broken when they collide—they expect immediate failure state but see continued gameplay
- **Data Loss**: No data loss, but game state becomes inconsistent with UI

---

## Testing Recommendations

1. **Collision Detection**: Trigger a collision and immediately check that:
   - No new pigs spawn in the 1-2 frames after collision
   - Existing pigs stop moving
   - Avatar emoji stops tracking button position
   - rAF callbacks stop scheduling

2. **Browser DevTools**: 
   - Open Performance tab
   - Trigger a collision
   - Check that rAF callback frequency drops to zero after collision

3. **Console Logging**:
   - Add a log inside tick() at the start: `console.log('[tick]', {ended, cancelled, rafId})`
   - Trigger a collision and verify that tick() is called with `ended: true` on subsequent frames

4. **Pong Comparison**:
   - Test Pong's miss condition to see if it has the same issue
   - Both modes use identical patterns for ending the game loop

---

## Related Files and Functions

- **pigDodge.js**: `start()` function, `tick()` function, cleanup function
- **store.js**: `makeCtx()` function (lines 209-247), `syncModeLifecycle()` (lines 155-170)
- **pong.js**: `start()` function—uses same pattern, likely has same issue
- **director.js**: `reduce()` action handler for 'endPhase' (lines 105-132)
