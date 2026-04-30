# 10-Press Gap Investigation

**Status**: 🔄 Open — Not fully resolved  
**Priority**: MEDIUM-HIGH  
**Last Updated**: 2026-04-30

This document tracks the investigation into the 10-press gap between mini-games. The gap
exists mechanically but the perceived experience is inconsistent. This is an ongoing investigation.

---

## What the Gap Is

After each mini-game completes, the next game is scheduled with a `startAtPress` offset
so the player gets 10 presses of "free mashing" before the next game's intro begins.

**Where it's defined:**
```
src/game/miniGames.js
  GAP_PRESSES = 10  (line ~282)
```

**Where it's computed:**
```
src/game/miniGames.js → createInfiniteSchedule() → next()
  startAt = currentPressCount + gapPresses   (yieldedCount >= 2)
```

`currentPressCount` is passed from `store.js → maybeRefillSchedule()` (line ~109), which
reads `state.pressCount` at the exact moment the outcome phase times out and `active → null`.

---

## The Mechanical Flow (Known)

```
Play phase ends
  └─ endPhase() called → outcome stored → outcome status phase starts
     └─ Outcome phase runs for 2400–2500ms (ms-timed, auto-advance via syncStatusTimeout)
        └─ Outcome phase times out → tick dispatched → advance() → advancePhase()
           └─ active → null, scheduleIndex advances
              └─ maybeRefillSchedule() fires:
                 pressCount snapshot taken HERE → startAtPress = pressCount + 10
                 └─ appendSchedule dispatched
                    └─ On next user press: if pressCount >= startAtPress → game activates
                       └─ Game's intro phases run (2× 5-press = 10 presses)
                          └─ Play phase starts
```

**Total presses from outcome-complete to play start: 10 (gap) + 10 (intros) = 20 presses**

---

## What Was Found in the First Audit (2026-04-30)

### Finding 1 — The gap IS mechanically consistent
For every game from game 3 onward (yieldedCount >= 2), `startAtPress = currentPressCount + 10`.
No game has its own offset override. No per-game exceptions. The formula is identical.

### Finding 2 — Game 1 after PREAMBLE has ZERO gap
The first real mini-game is hard-coded to `startAtPress: FIRST_GAME_AT = 30`.  
PREAMBLE is a 5-press status phase starting at press 25 — it naturally ends at press 30.  
So game 1 activates AT press 30, the same press PREAMBLE finishes. Zero gap.

This is intentional but breaks the expected pattern and could contribute to the user's
perception that gaps are inconsistent — the first one has no gap at all.

### Finding 3 — pressCount at outcome-end depends on mashing speed
The `pressCount` snapshot for `startAtPress` computation is taken when the outcome phase
timer fires (~2400–2500ms after play ended). During that window, a fast masher presses
7–12 times; a slow masher presses 2–4 times.

This does NOT change the GAP SIZE (always 10 presses from that snapshot), but it means:
- Fast mashers hit the next game sooner in wall-clock time
- The gap feels shorter to fast mashers even though press-count-wise it's identical

### Finding 4 — No timeout on intro phases
The 2× 5-press intro phases (challenge messages before play) have NO wall-clock timeout.
They only advance on user presses. If the user slows down during an intro, it stalls.
This is by design (forces engagement) but can make the gap feel variable.

---

## Open Questions

These are the things NOT fully confirmed and still need investigation:

### Q1 — Does maybeRefillSchedule always capture the right pressCount?
`maybeRefillSchedule()` is called inside `setState()` which is called synchronously from
the `tick` that ends the outcome phase. Is there any scenario where `state.pressCount` is
stale at that moment (e.g., a press event racing with the tick)?

**Investigation needed:** Add console logging to capture `pressCount` at the exact moment
`maybeRefillSchedule` computes `startAtPress`. Log: `[gap] startAtPress=${startAt} from pressCount=${currentPressCount}`. Verify it matches expectations during gameplay.

### Q2 — Is there a perceived gap inconsistency between specific game pairs?
User reports some games feel like "the next game is right there." Is this specific to
certain game pairings, or random? MASH_GAUNTLET can end early (if target hit before
5s timeout), which means its outcome phase starts earlier, meaning its pressCount
at outcome-end is lower, meaning `startAtPress` is a lower absolute number.

**Investigation needed:** Play multiple sessions and note which transitions feel short.
Specific attention to MASH_GAUNTLET (can end early) vs TWILIGHT (always full 10s).

### Q3 — Does the appendSchedule dispatch race with advance()?
When `appendSchedule` fires, it runs `resolve()` but NOT `advance()`. The newly appended
game sits in the queue but won't activate until the NEXT `pressCount` or `tick` action.
In theory this is fine — the very next press will check. But is there a frame where
`active === null`, `scheduleIndex < schedule.length`, but advance hasn't been called yet,
and the UI briefly shows an "idle" state?

**Investigation needed:** Watch for any flicker or gap in status text between outcome-complete
and next game activation. Add logging to `advance()` when it activates a new game.

### Q4 — 10 presses — is that the right number?
Even if mechanically correct, maybe 10 presses is too few at high mash speeds. At 4 presses/sec,
10 presses = 2.5 seconds between outcome-complete and next game activation. Then another
2.5 seconds of intros. Total = 5 seconds.

At 2 presses/sec: 5 seconds gap + 5 seconds intros = 10 seconds.

**Question for user**: Does the gap feel too short at high mash speeds? Should `GAP_PRESSES`
be increased to 15 or 20?

### Q5 — Should Game 1 also have a gap?
Currently PREAMBLE ends exactly when GAME 1 is scheduled (`startAtPress: 30`). This means
the first game's intro starts with zero breathing room after the warning.

**Question for user**: Should there be a gap between PREAMBLE and GAME 1? E.g., PREAMBLE
ends at 29, GAME 1 starts at 35 (giving 5 free presses as a buffer)?

---

## What to Do Next

### Step 1 — Add gap logging (Low effort, high info)
Add one console.log in `maybeRefillSchedule()` that outputs:
```
[gap] scheduling next game: id=X startAtPress=Y (pressCount=Z + 10)
```
Then play a session and verify Y - Z = 10 for every transition.

### Step 2 — Watch for the "right there" transitions
With logging in place, play 3–5 games and note:
- Which specific game-to-game transitions feel like no gap
- What `pressCount` was at outcome-end for those transitions
- Compare to transitions that felt normal

### Step 3 — Evaluate gap size
After confirming the mechanics, decide if `GAP_PRESSES = 10` is the right value.
If the issue is perceptual (fast mashers experience a shorter wall-clock gap), the fix
might be increasing GAP_PRESSES or adding a minimum ms-based gap in addition to the
press-count gate.

### Step 4 — Evaluate PREAMBLE gap
Decide whether a small press gap between PREAMBLE and GAME 1 would improve the feel.

---

## Proposed Logging Addition (When Ready to Debug)

In `store.js → maybeRefillSchedule()`, after computing `next`:
```javascript
const next = scheduleStrategy.next(state.pressCount, sessionMs);
if (next && process.env.NODE_ENV === 'development') {
  console.log(`[gap] next game: id=${next.id} startAtPress=${next.startAtPress} (base=${state.pressCount} + gap=${next.startAtPress - state.pressCount})`);
}
```

---

## Status Log

| Date | What Was Done |
|------|--------------|
| 2026-04-30 | First deep-dive audit. Mechanics confirmed consistent. Zero-gap on game 1 identified. Open questions documented above. |

---

## Related Files

| File | Relevance |
|------|-----------|
| `src/game/miniGames.js` | `GAP_PRESSES` constant, `createInfiniteSchedule()`, `next()` function |
| `src/game/store.js` | `maybeRefillSchedule()`, `setState()`, `syncStatusTimeout()` |
| `src/game/director.js` | `advance()`, `advancePhase()`, `startActive()` |
