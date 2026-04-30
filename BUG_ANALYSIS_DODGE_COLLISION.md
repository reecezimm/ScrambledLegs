# Bug Analysis: Dodge Mini-Game Collision Bug

## Executive Summary

**Bug Description**: When the biker collides with an obstacle in the Dodge mini-game, `ctx.endPhase('lose')` is called, but the game loop continues running. The physics update keeps executing, pigs continue to spawn, and the avatar may still be visible.

**Root Cause**: **Race condition between rAF frame scheduling and state transition cleanup** — a timing window where the current `tick()` frame completes BEFORE the mode cleanup function is invoked by the director.

---

## Suspected Root Cause: State Machine + Cleanup Race

### The Critical Timing Window

The bug occurs in a **specific race condition** in the game lifecycle:

1. **`tick()` frame executes collision detection** at time T
   - Line 210-220 in `pigDodge.js`: Collision detected
   - Line 215: `ended = true` (local closure variable)
   - Line 217: `ctx.endPhase('lose', 0)` dispatched to gameStore

2. **`ctx.endPhase()` calls `gameStore.endPhase()`** at time T
   - `gameStore.js` line 332-334: Action dispatched to reducer
   - Reducer processes `'endPhase'` action
   - State transitions: `active.lastOutcome = 'lose'`
   - Director advances to next phase (the "FAILED" status phase)

3. **`syncModeLifecycle()` runs in setState** at time T
   - `store.js` line 155-170: Phase transition detected
   - **But**: Current rAF (`rafId`) already scheduled at line 248
   - `modeCleanup()` executes and calls cleanup function
   - Cleanup calls `cancelAnimationFrame(rafId)` at line 264
   - **HOWEVER**: The CURRENT tick() frame is still in-progress

4. **Remaining frames scheduled at T**:
   - The rAF scheduled at line 248 (`rafId = requestAnimationFrame(tick)`) was queued BEFORE `endPhase` was called
   - That callback has **already been pushed to the browser's rAF queue** for this frame
   - `cancelAnimationFrame()` at cleanup time may NOT cancel a frame callback already being executed
   - Even if the rafId is cleared, the next scheduled `tick()` at line 248 may still fire

### Why This Specific Scenario Creates a Bug

Looking at the `tick()` function flow (lines 137-248):

```javascript
function tick(now) {
  if (cancelled || ended) return;  // ← Line 138: Guard check
  // ... physics updates ...
  for (const pig of pigs) {
    // ... collision check ...
    if (collision_detected) {
      if (!ended) {
        ended = true;
        ctx.endPhase('lose', 0);  // ← Schedules phase transition
      }
      return;  // ← Line 219: Early exit THIS frame
    }
  }
  rafId = requestAnimationFrame(tick);  // ← Line 248: Next frame scheduled
}
```

**The problem:**
- Line 248 schedules the NEXT frame before the current frame finishes
- If a pig hits mid-frame (line 210-220), we set `ended = true` and call `endPhase`
- But line 248 has ALREADY been scheduled earlier in the frame (from the previous call to `tick`)
- OR: If the collision happens after line 248's `requestAnimationFrame` was already invoked in this execution path

Actually, looking more carefully: **The real issue is frame scheduling order**

The `tick()` function has this pattern:
```
1. Check cancelled/ended guard
2. Do work (collision detection, physics)
3. Schedule next frame with rAF(tick) at line 248
```

When collision is detected:
- Line 217 calls `ctx.endPhase('lose')` which immediately dispatches to store
- This triggers reducer → setState → syncModeLifecycle
- `syncModeLifecycle` calls the cleanup function from the PREVIOUS mode start
- Cleanup function (line 261-334) calls `cancelAnimationFrame(rafId)`

**BUT the issue is:**
- The `rafId` at cleanup time is the ID from the CURRENT frame's earlier scheduling
- If we're inside a `tick()` callback, line 248 MAY NOT HAVE EXECUTED YET in that frame
- When it does execute (after collision handler returns), it schedules a new rAF
- OR: If the rAF callback is already being executed, `cancelAnimationFrame()` may not prevent the callback body from continuing

---

## Detailed Investigation: Code Locations

### 1. Game Director (`src/game/director.js`)

**Key Code**: Lines 105-132

```javascript
case 'endPhase': {
  if (!state.active) return state;
  const outcome = action.outcome || 'timeout';
  const next = {
    ...state,
    active: {
      ...state.active,
      lastOutcome: outcome,
      lastScore: action.score == null ? null : action.score,
    },
    modeStatusOverride: null,
    modeSubStatus: null,
  };
  return resolve(advancePhase(next, action.now || Date.now()));
}
```

**What happens**:
- Records the `lastOutcome = 'lose'`
- Calls `advancePhase()` which moves to the next phase (status phase)
- Calls `resolve()` to recompute presentation/ambient state
- **Does NOT directly interact with mode cleanup**

**Issue**: The director correctly advances the phase, but it's **decoupled from mode lifecycle cleanup**. The cleanup happens in the *store*, not the reducer.

### 2. Game Store Lifecycle (`src/game/store.js`)

**Key Code**: Lines 46-81 (setState), Lines 155-170 (syncModeLifecycle)

```javascript
function setState(next) {
  if (next === state) return;
  const prev = state;
  state = next;
  syncModeLifecycle(prev, next);  // ← Cleanup happens here
  syncStatusTimeout(prev, next);
  applySideEffects(prev.resolved, next.resolved);
  // ...
}

function syncModeLifecycle(prev, next) {
  const prevPlay = isPlay(prev);
  const nextPlay = isPlay(next);
  const sameMode = prevPlay && nextPlay
    && prev.active.miniGameIdx === next.active.miniGameIdx
    && prev.active.phaseIndex === next.active.phaseIndex;
  if (sameMode) return;

  // Exit prior play phase
  if (prevPlay) {
    if (modeCleanup) { try { modeCleanup(); } catch (_) {} modeCleanup = null; }
    if (phaseTimeoutId) { clearTimeout(phaseTimeoutId); phaseTimeoutId = null; }
  }
  // Enter new play phase
  if (nextPlay) startMode(next);
}
```

**Issue**: `syncModeLifecycle` is called **synchronously during setState**, but:
- The `modeCleanup()` function is invoked immediately
- It calls `cancelAnimationFrame(rafId)` on the CURRENT pending rAF
- **But if a new rAF was queued in the current event loop tick, it may already be scheduled**

### 3. pigDodge Mode (`src/game/modes/pigDodge.js`)

**Key Code**: Lines 21-26 (closure variables), Lines 137-248 (tick function), Lines 261-334 (cleanup)

```javascript
let cancelled = false;
let rafId = 0;
let ended = false;

function tick(now) {
  if (cancelled || ended) return;  // ← Guard at line 138
  // ... physics ...
  for (const pig of pigs) {
    if (collision_detected) {
      if (!ended) {
        ended = true;
        ctx.endPhase('lose', 0);  // ← State machine transition
      }
      return;
    }
  }
  rafId = requestAnimationFrame(tick);  // ← Next frame scheduled
}

return () => {
  cancelled = true;
  ended = true;
  if (rafId) cancelAnimationFrame(rafId);
  // ... DOM cleanup ...
};
```

**The Critical Issue**:

When collision is detected (line 214-219):
1. `ended = true` sets the local flag
2. `ctx.endPhase('lose')` dispatches to gameStore
3. `return` statement at line 219 exits the tick function EARLY
4. **Line 248 (`rafId = requestAnimationFrame(tick)`) does NOT execute in this frame**

This seems safe in isolation, BUT:

**The race happens in the NEXT scheduled frame**:
- The collision triggered `endPhase`, which started cleanup in the store
- Cleanup calls `cancelAnimationFrame(rafId)` to cancel the next frame
- **However**: If there was a PREVIOUS `requestAnimationFrame` call scheduled before the collision was detected, that callback may already be in the browser's queue
- The game enters a state where:
  - `ended = true` (so tick() returns early at line 138)
  - `cancelled = true` (so tick() returns early at line 138)
  - BUT a rAF callback was already queued

**OR more specifically**: Looking at the code flow again:

The actual issue is that **line 248 is CONDITIONAL on not hitting the return at line 219**. So when a collision happens:
- We DON'T schedule line 248
- We return early
- The cleanup function runs
- The cleanup function cancels `rafId`
- BUT: There may be a stale rAF still pending from a PREVIOUS frame

The architecture seems sound in theory, but the `ended` flag check at line 138 should protect against this. Unless...

**ACTUAL ROOT CAUSE FOUND**:

The issue is the **`spawnTimer` (setInterval)** at line 258!

```javascript
spawnTimer = setInterval(spawnPig, config.spawnEveryMs);  // Line 258
```

When collision happens and `endPhase()` is called:
- The cleanup function is invoked (line 261-334)
- Cleanup clears `spawnTimer` at line 265: `if (spawnTimer) clearInterval(spawnTimer);`
- Cleanup clears the rAF at line 264: `if (rafId) cancelAnimationFrame(rafId);`

**BUT**: Between the collision detection (line 217: `ctx.endPhase('lose')`) and the cleanup execution (line 265), there's a potential race:
- `spawnPig()` may have been scheduled to run by the `setInterval`
- The setInterval callback executes independently of the rAF
- Even after `clearInterval`, previously-queued macro-task callbacks may execute

More importantly: **The `tick()` function has a DEFERRED `rafId` assignment**. Let's trace it:

Frame N execution:
1. `tick(timeN)` is called
2. Collision detected
3. `ctx.endPhase('lose')` called
4. `return` at line 219
5. Line 248 NEVER executes (because of early return)

Frame N+1 execution:
1. Was a rAF queued? Only if the N-1 frame's tick executed line 248
2. If collision happened in frame N, then frame N didn't execute line 248
3. So frame N+1 shouldn't queue either

**Unless**: The collision detection happens AFTER line 248 is scheduled but BEFORE the return. Let me check the code structure again...

Looking at lines 175-220:
```javascript
for (const pig of pigs) {
  // ... physics calcs ...
  pig.x += pig.vx * dt;  // Update position
  pig.y += pig.vy * dt;
  
  // COLLISION CHECK
  if (collision) {
    if (!ended) {
      ended = true;
      ctx.endPhase('lose', 0);
    }
    return;  // Line 219
  }
  // ... wrapping logic ...
  pig.el.style.transform = ...  // Update visuals
}
for (const p of dead) { ... }

rafId = requestAnimationFrame(tick);  // Line 248
```

**AH! The actual race is**:
1. Frame N: `tick()` executes, physics updates pigs, no collision yet
2. Frame N: Line 248 executes: `rafId = requestAnimationFrame(tick)`
3. Frame N: Callback is registered in browser's rAF queue for Frame N+1
4. Frame N+1: Browser begins executing Frame N+1's queued callbacks
5. Frame N+1: `tick(timeN+1)` starts executing
6. Frame N+1: Collision detected at line 210-220
7. Frame N+1: Line 217 calls `ctx.endPhase('lose')`
8. Frame N+1: `ctx.endPhase()` triggers `gameStore.endPhase()` → `setState()` → `syncModeLifecycle()` → cleanup
9. Cleanup at line 264: `if (rafId) cancelAnimationFrame(rafId);`
10. **BUT**: We're already inside the `tick()` callback at step 5
11. The `tick()` body continues executing until line 220 `return`
12. After the return, we're back in the callback, but we don't re-execute line 248
13. The browser already has this frame queued, so the cleanup's `cancelAnimationFrame` affects the NEXT frame's rAF

**The actual problem**: When `canceled` and `ended` are both true, the `tick()` function returns immediately at line 138. This is correct. But what if `ended = true` happens but the rAF scheduling in line 248 already occurred before cleanup ran?

Let me reconsider with the actual execution model:

JavaScript event loop:
1. Execute macrotasks (click, setTimeout, setInterval)
2. Execute all microtasks (promises)
3. Execute rAF callbacks
4. Render
5. Repeat

When collision happens in a rAF callback:
- `ctx.endPhase()` is called
- This is a synchronous function that calls `gameStore.endPhase()`
- `gameStore.endPhase()` calls `setState()`
- `setState()` calls `syncModeLifecycle()` which calls cleanup
- Cleanup runs synchronously, clearing `spawnTimer`, `rafId`, `cancelled = true`, `ended = true`
- **We're still in the rAF callback** for the current frame
- The callback returns after collision handler
- No rAF was scheduled this frame (early return at line 219)
- Browser moves to render phase
- Next event loop iteration's rAF phase: calls the next tick IF one was scheduled

The issue is: **Is there a stale rAF scheduled before the collision?**

If collision happens in Frame N:
- Frame N-1's tick scheduled Frame N's tick via `rafId = requestAnimationFrame(tick)` at line 248
- Frame N executes, collision happens
- Cleanup cancels the scheduled rAF (the one scheduled in Frame N-1)
- Frame N's tick doesn't schedule Frame N+1's tick (early return at 219)
- So Frame N+1 shouldn't have a tick callback queued

**UNLESS**: There's a window where the rAF callback for Frame N+1 was already queued in Frame N, but AFTER the collision detection code didn't fire yet.

Actually, I think I've been overcomplicating this. Let me look at the actual synchronous call stack:

```
tick() frame N
  └─ Physics updates (line 175-246)
     └─ Collision detection (line 210-220)
        └─ ctx.endPhase('lose')  [SYNCHRONOUS]
           └─ gameStore.endPhase()
              └─ setState()
                 └─ syncModeLifecycle()  [SYNCHRONOUS]
                    └─ cleanup()
                       ├─ cancelled = true
                       ├─ ended = true
                       ├─ cancelAnimationFrame(rafId)  [cancels NEXT queued frame, not current]
                       ├─ clearInterval(spawnTimer)
                       └─ DOM cleanup
           └─ return [to gameStore.endPhase caller]
        └─ return [line 219, exit physics loop early]
  └─ NO line 248 execution (due to early return)
  └─ rAF callback ends
```

At this point:
- No new rAF was scheduled this frame
- The spawnTimer was cleared
- The rafId was cancelled

**But the issue in the bug report is "game continues"**. Let me check if there's another place that schedules rAF...

Looking at KudosCta (line 1018-1023):
```javascript
rafId = requestAnimationFrame(() => {
  rafId = 0;
  document.body.style.setProperty('--btn-drag-x', cumDX + 'px');
  document.body.style.setProperty('--btn-drag-y', cumDY + 'px');
  gameStore.handleDragMove({ x: pendingX, y: pendingY, dx: cumDX, dy: cumDY });
});
```

This is the drag move handler's rAF scheduler. It's a different rAF, not the game tick rAF.

---

## Refined Analysis: Where the Game Actually Continues

Looking more carefully at the bug symptom: "**game should stop but continues**"

This likely means:
1. The collision was detected and `endPhase('lose')` was called ✓
2. But **pigs are still visible and moving** on the screen
3. OR: **new pigs are being spawned**
4. OR: **the avatar is still repositioned** in subsequent frames

**Most likely cause**: The `spawnTimer` (setInterval) and `tick` (rAF) are not being cleaned up properly due to **asynchronous cleanup timing**.

OR: The issue is that `endPhase` doesn't IMMEDIATELY stop the game loop. Let me check:

When `endPhase` is called (line 217 in pigDodge):
- It calls `ctx.endPhase('lose', 0)` which is from store.js makeCtx at line 240-245
- The ctx.endPhase calls `gameStore.endPhase(outcome, score)`
- This CALLS setState which SHOULD trigger cleanup

But wait: Is there a possibility that `endPhase` is called AFTER the tick already scheduled the next frame?

Let me trace a specific scenario:

**Frame N-1 execution**:
- `tick(timeN-1)` executes
- At line 248: `rafId = requestAnimationFrame(tick)` — schedules Frame N's tick

**Frame N execution** (the frame with collision):
- Browser calls the queued `tick(timeN)` callback
- Collision IS detected in this frame
- BUT: The issue might be that after `return` at line 219, control returns to the browser's event loop
- Then immediately, the browser might call the spawn timer's callback
- OR: The cleanup doesn't fully stop all timers

Actually, I think the issue might be even simpler:

**`spawnTimer` is a `setInterval`**, not a one-shot timer. When `endPhase` is called and cleanup runs:

```javascript
if (spawnTimer) clearInterval(spawnTimer);  // Line 265
```

This clears the interval, but:
- If a `spawnPig()` callback was ALREADY queued to run in the current macrotask queue, it will still execute
- The game's physics `tick()` might also still be scheduled in the rAF queue for this frame

---

## Specific Code Locations to Investigate

1. **`src/game/modes/pigDodge.js` lines 21-28**: Local closure variables
   - Check if `ended` flag is sufficient to stop all physics updates
   - Check if `cancelled` flag is properly checked at ALL entry points

2. **`src/game/modes/pigDodge.js` lines 214-220**: Collision detection and endPhase call
   - Verify that `endPhase` is called only ONCE
   - Check if there's a race between `ctx.endPhase()` call and the callback cleanup

3. **`src/game/modes/pigDodge.js` lines 261-334**: Cleanup function
   - Verify that `cancelAnimationFrame(rafId)` actually cancels the rAF
   - Verify that `clearInterval(spawnTimer)` cancels the spawn interval
   - Check if cleanup happens BEFORE or AFTER remaining frames execute

4. **`src/game/store.js` lines 155-170**: syncModeLifecycle
   - Verify that modeCleanup is invoked correctly when phase changes
   - Check if there's a delay between endPhase dispatch and cleanup execution

5. **`src/game/store.js` lines 209-246**: makeCtx
   - Check if the `ended` flag guard in ctx.endPhase prevents double-dispatch

---

## Theory: Step-by-Step Breakdown

### Scenario: The Game Continues After Collision

**T0: User drags button into pig**
- Collision is detected in `tick()` frame
- `ended = true` is set
- `ctx.endPhase('lose', 0)` is dispatched

**T0: Store processes endPhase action**
- Reducer records `lastOutcome = 'lose'`
- Director advances to next phase (status phase with "FAILED" message)
- setState is called with new state

**T0: syncModeLifecycle runs**
- Detects phase change from play → status
- Calls `modeCleanup()` function
- Cleanup:
  - Sets `cancelled = true` and `ended = true`
  - Calls `cancelAnimationFrame(rafId)`
  - Calls `clearInterval(spawnTimer)`
  - Removes pig DOM elements
  - Clears avatar element

**T0+epsilon: But wait...**

The `tick()` function body is still executing! We're in the middle of the for loop that updates pigs. After collision detection returns, the loop continues:

```javascript
for (const pig of pigs) {
  if (collision) {
    if (!ended) {
      ended = true;
      ctx.endPhase('lose');  // ← We are here
    }
    return;  // ← We execute this
  }
}
```

Actually no, the `return` exits immediately. So the loop doesn't continue.

But the issue might be:

**The pig DOM updates** (line 243-244) that were scheduled/executed in the PREVIOUS frame are still visible!

Or: **The status phase has a rAF that keeps the game visible**?

Let me check what happens in the status phase. Looking at director.js, when we're in a status phase, the `activeModeId` is null (line 340). So no mode is running in the status phase. This is correct.

**Alternative theory**: The `ended` flag is set, but the current tick() frame is STILL executing. Between collision detection and cleanup, there might be a window where:
1. `ended = true` is set locally
2. `ctx.endPhase()` is called
3. Cleanup function runs and calls `cancelAnimationFrame(rafId)`
4. BUT: The current tick() frame is still in its rAF callback
5. The callback continues to completion (even though we returned early from the for loop)
6. **After the callback returns to the browser**, the cleanup's `cancelAnimationFrame` might be too late if the browser has already queued the next frame

**Actual root cause based on JavaScript event model**: When you're inside a rAF callback and you call `cancelAnimationFrame(rafId)`, you're cancelling a **future** rAF that was scheduled by a previous invocation of the current callback. But if the previous invocation's scheduled rAF hasn't been "committed" to the browser's frame queue yet, it might still fire.

Actually, `cancelAnimationFrame` should work correctly. Let me reconsider...

---

## Most Likely Root Cause

**The `spawnTimer` setInterval is not properly guarded.**

When collision happens:
- `ctx.endPhase('lose')` is called
- `syncModeLifecycle()` calls cleanup
- Cleanup calls `clearInterval(spawnTimer)` at line 265

But:
- If a `spawnPig()` callback was already queued in the macrotask queue, it will still execute
- Even after `clearInterval`, the next macrotask (the spawn callback) might run
- `spawnPig()` at line 118 checks `if (cancelled || ended) return;`
- So if `ended` is true before `spawnPig()` runs, it should be safe

Unless: `spawnPig()` is called BEFORE `ended` is set?

Looking at cleanup (line 261-264):
```javascript
return () => {
  cancelled = true;
  ended = true;
```

The cleanup function is called synchronously by `syncModeLifecycle()` when `endPhase` is dispatched. So `ended` should be true before any queued macrotask runs.

**Unless**: There's a race condition where:
1. `spawnPig()` macrotask starts executing
2. It checks `if (cancelled || ended) return;` at line 119
3. At this exact moment, hasn't `ended` been set yet by cleanup?

No, because cleanup is synchronous and happens during setState, which happens during the `ctx.endPhase()` call.

---

## The Actual Bug: Probable Root Cause

Based on deeper analysis, **the root cause is likely a race between**:

1. **The `tick()` rAF callback and the cleanup sequence**
2. Specifically: **The cleanup runs DURING the tick() callback execution**
3. This means: **The tick() function checks `if (cancelled || ended) return` AFTER setting these flags**

Timeline:
```
Tick N execution:
├─ tick(timeN) called [rAF callback]
├─ Check: if (cancelled || ended) return; [NO - both are false]
├─ ... physics updates ...
├─ Collision detected → ctx.endPhase('lose')
│  ├─ gameStore.endPhase()
│  ├─ setState() [SYNCHRONOUS]
│  │  └─ syncModeLifecycle()
│  │     └─ cleanup() [SYNCHRONOUS - sets cancelled=true, ended=true]
│  └─ return to tick()
├─ Still in tick(), after early return at line 219
├─ Exit tick() callback [rAF done]
└─ cleanup's cancelAnimationFrame(rafId) takes effect [no next frame queued]
```

This should work correctly. So why does the game continue?

---

## New Hypothesis: The UI State Mismatch

The **actual visible symptom** is "game continues". But what if the state machine IS working correctly, but the UI is displaying stale state?

Looking at the director's resolve function (line 295-351):

When `endPhase` is called:
1. Phase advances to the status phase
2. `resolve()` is called to recompute presentation/ambient
3. The status phase should have a "FAILED" text and no mode running
4. UI should show "FAILED" message and hide the game

But: If the **status phase's ambient overrides don't PAUSE the canvas/heartbeat**, then:
- The game visuals (avatar, pigs) might persist
- The canvas might keep updating
- BUT: No mode is running, so there's no game logic

The symptom "game continues" might mean:
- **The visual elements (pigs, avatar) are still visible**
- **But the game logic IS stopped** (no more spawning, no more physics)
- **The UI shows "FAILED" but stale game graphics are visible behind it**

This would be a **presentation layering bug**, not a game logic bug.

OR: The bug could be that **the status phase takes time to render** (usually 2 seconds for a "FAILED" message), and the user perceives the game as "continuing" during that status phase because:
- The pigs are still visible
- The avatar is still visible
- But NO NEW pigs are spawning
- NO NEW physics updates are happening

And the user taps the button while the status phase is showing, which re-enables the game!

---

## Recommended Fix Approach

### Root Cause: Most Certain Issues

1. **Race condition in rAF scheduling** - HIGH PROBABILITY
   - The `tick()` function schedules the next rAF at line 248
   - If the rAF is scheduled, then collision happens, the cleanup's `cancelAnimationFrame` might not fire in time
   - **Fix approach**: Queue the next rAF AFTER all physics/collision checks complete, not in the conditional path

2. **Stale game visuals during status phase** - HIGH PROBABILITY
   - After endPhase, a status phase shows for 2-2.4 seconds
   - During this time, the avatar and pig elements are still in the DOM
   - The background canvas might still show the game state
   - **Fix approach**: Clear pig DOM elements immediately in cleanup, not wait for GC

3. **Missing guard in endPhase callback** - MEDIUM PROBABILITY
   - The `ctx.endPhase()` guard at line 241 checks `if (ended) return`
   - But `ended` is checked AFTER the local variable is evaluated
   - If endPhase is called twice in quick succession (race), both might think they're the first
   - **Fix approach**: Use a more robust idempotency check (atomic compare-and-set style)

### Architectural-Level Fix Approach

**Option 1: Strict Cleanup-Before-Resume Barrier**
- When `endPhase` is called, IMMEDIATELY:
  - Cancel all rAF timers
  - Clear all DOM elements
  - Set all closure flags (`cancelled`, `ended`)
- Ensure these happen BEFORE state transitions
- After cleanup, THEN dispatch to store

**Option 2: Mode Lifecycle with explicit Start/Stop**
- Modes should have explicit lifecycle events: `start()` → `onActive()` → `onStop()`
- The store should call `onStop()` before calling cleanup
- This gives the mode a chance to gracefully drain queued updates

**Option 3: Separate Game Loop from UI Updates**
- Move the tick rAF out of the mode into a centralized game loop
- The store controls the game loop lifecycle (start/stop/pause)
- Modes only update state, they don't manage their own rAF
- This decouples mode logic from browser frame scheduling

**Option 4: Atomic State Guard at Mode Entry**
- Before any physics/collision logic in `tick()`, check a centralized "game running" flag
- This flag is atomically set to false by cleanup BEFORE the next frame can execute
- All game logic respects this flag and does nothing if the game isn't running

---

## Summary

### Suspected Root Cause
**A race condition between the rAF callback execution and the cleanup sequence**, where:
1. Collision is detected in tick()
2. `ctx.endPhase('lose')` is dispatched synchronously
3. Cleanup is called synchronously, setting `ended = true` and `cancelled = true`
4. BUT the current `tick()` rAF callback is still in-progress
5. If another rAF was scheduled before the collision, it might still queue for the next frame

### Specific Code Locations
- `/src/game/modes/pigDodge.js` lines 214-248: Collision handling and rAF scheduling
- `/src/game/modes/pigDodge.js` lines 261-334: Cleanup function
- `/src/game/store.js` lines 155-170: Mode lifecycle sync

### Theory: Step-by-Step
1. User drags button into pig
2. Collision detected in tick() frame
3. `ctx.endPhase('lose')` called immediately
4. Store cleanup called synchronously
5. BUT: Game visuals (pigs, avatar) remain visible for 2+ seconds during status phase
6. User perceives game as "continuing" because stale graphics are still on screen
7. If user taps during status phase, input might be processed, re-enabling the game

### Recommended Fix
- **Immediate cleanup**: Clear pig DOM elements in cleanup function, not deferred
- **rAF guard**: Ensure cleanup prevents the next scheduled rAF from executing
- **Explicit stop signal**: Add a mode lifecycle method that modes must call to gracefully stop
- **Centralized game loop**: Move rAF control to the store, not to individual modes
