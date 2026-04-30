# Mini-Game Builder Guide

A contributor's guide to the Scrambled Legs **mash-button mini-game system** — the UI takeover that activates after 25 presses of the "Mash me" button on an event card and starts firing mini-games at press 50.

This document is meant to be read top-to-bottom in about 10 minutes. After that, you should be able to ship a new mini-game without further questions.

---

## Table of Contents

1. [Mental model](#1-mental-model)
2. [Mini-game schema reference](#2-mini-game-schema-reference)
3. [Mode contract reference](#3-mode-contract-reference)
4. [Reusable features](#4-reusable-features)
5. [Pipeline / lifecycle](#5-pipeline--lifecycle)
6. [Step-by-step boilerplate: adding a new mini-game](#6-step-by-step-boilerplate-adding-a-new-mini-game)
7. [Existing examples table](#7-existing-examples-table)
8. [Backlog (brainstormed, not yet implemented)](#8-backlog-brainstormed-not-yet-implemented)
9. [Debugging via Console Logs](#9-debugging-via-console-logs)
10. [Common pitfalls](#10-common-pitfalls)

---

## 1. Mental model

A **mini-game is data**: a timeline of phases (status text, countdowns, play windows) plus a few flags describing what the screen should look like and what counts as winning. All of the mini-games live as plain objects in `src/game/miniGames.js`. Look at `GOLDEN_EGG` in that file — it is the canonical example, and every other mini-game is shaped the same way.

A **mode is code**: a play loop registered in `src/game/modes/`. Modes own DOM elements they spawn (golden eggs, projectiles, meters), subscribe to user presses, and call back into the director when they win, lose, or run out of time. The **director** in `src/game/director.js` is a dumb pure reducer — it walks timelines and resolves which ambient effects are on, which are off, and what text the centered status zone should show. It never spawns anything itself.

> **Rule of thumb:** if it lives across multiple mini-games (status text, ambient toggles, the save-timer freeze) it belongs in the director / schema. If it is one mini-game's bespoke mechanic (egg arcs, threshold counters), it belongs in a mode.

---

## 2. Mini-game schema reference

A mini-game is one object exported from `src/game/miniGames.js`. Every field is optional except `id`, `startAtPress`, and `phases`.

### 2.1 Top-level fields

| field | type | description |
|---|---|---|
| `id` | string, kebab-case, unique | Stable identifier (e.g. `'golden-egg'`). Used by `findById` and DOM hooks. |
| `label` | string | Human-readable name shown in `DevTogglePanel`. |
| `startAtPress` | number | Press count that activates this mini-game. The **first** entry in the schedule honors this; subsequent entries fire back-to-back as soon as the previous one ends, regardless of their declared `startAtPress`. |
| `rules` | object | Win/lose behavior. See [§2.2](#22-rules-block). |
| `ambient` | object | Mini-game-wide ambient overrides. See [§2.3](#23-ambient-block). |
| `presentation` | object | Mini-game-wide visual overrides. See [§2.4](#24-presentation-block). |
| `input` | object (planned) | Future input gating. See [§2.5](#25-input-block-planned). |
| `phases` | array | The timeline. See [§2.6](#26-phases-array). |

```js
export const GOLDEN_EGG = {
  id: 'golden-egg',
  label: 'Golden Egg',
  startAtPress: 50,
  rules: { canLose: false, onWin: { bonus: 0 }, onLose: { bonus: 0 } },
  ambient: { challengeText: 'frozen' },
  presentation: { accentColor: '#FFD700' },
  phases: [ /* ... */ ],
};
```

### 2.2 `rules` block

| field | type | description |
|---|---|---|
| `canLose` | boolean | Whether this mini-game can produce a `'lose'` outcome at all. Bonus modes set this `false`. |
| `onWin` | `{ bonus: +N, ... }` | Delta applied to `bonusCount` when the final phase exits with `outcome === 'win'`. |
| `onLose` | `{ bonus: -N, endsMashSession: bool, ... }` | Delta on `'lose'`. **`endsMashSession: true`** is a reusable flag that immediately triggers the save→burn→reset sequence in `KudosCta` — any mini-game can opt in. |
| `pauseMashGame` | boolean | If `true`, freezes the global canvas/heartbeat advancement for the entire mini-game (independent of the per-phase `gameClock` override). |

```js
rules: {
  canLose: true,
  onWin:  { bonus: +100 },
  onLose: { bonus: -30, endsMashSession: true },
}
```

### 2.3 `ambient` block

Each ambient channel accepts one of: `'on'` | `'off'` | `'frozen'` | an override object. Phase-level ambient overrides take precedence over mini-game-level ones. The director writes the resolved value to `data-amb-*` body attributes (see `applyAmbient.js`); existing ambient systems gate on those attributes (e.g. `data-amb-flying === 'off'` causes `useMashEffects.spawnHotDog` to early-return).

| key | controls |
|---|---|
| `flyingEmojis` | hot dogs / eggs that fire from the button on press |
| `bubbleText` | phrase floaters ("Send it!", etc.) |
| `challengeText` | the rotating MashSub prompts above the button |
| `heartbeat` | the save-timer ring animation around the button |
| `flash` | per-press flash overlay |
| `vignette` | edge darken |
| `shockwave` | text jitter on UI elements |
| `canvasGradient` | radial gradient: `'default'` \| `'off'` \| `{ stops, animation }` |

```js
ambient: {
  flyingEmojis: 'off',
  bubbleText:   'off',
  challengeText:'frozen',
  heartbeat:    'off',
}
```

### 2.4 `presentation` block

| field | type | notes |
|---|---|---|
| `bodyBackground` | string \| null | Override page bg during the mini-game. |
| `accentColor` | CSS color \| null | Sets `--game-accent` CSS var; status text reads it. |
| `statusColor` | CSS color | Default `'#fff'`. |
| `statusFont` | string | Default `'Fredoka'`. |

### 2.5 `input` block (planned)

Reserved for future fine-grained input gating: `tap`, `longPress`, `swipe`, `multiTouch`. Not currently consumed by any mode — document and pass through, but do not rely on behavior yet.

### 2.6 `phases` array

Each phase is an object with `kind` plus kind-specific fields. The director advances:

- **status / countdown** phases via press deltas (`pressCount - phaseStartedAtPress >= phase.presses`)
- **play** phases via the mode itself calling `ctx.endPhase(...)`, OR a wall-clock timeout enforced by the store

#### `kind: 'status'`

```js
{
  kind: 'status',
  text: 'KEEP MASHING.',         // string OR ({outcome, score}) => string
  presses: 5,                    // advances after this many presses
}
```

The `text` callback is useful for outcome screens:

```js
{ kind: 'status',
  text: ({ outcome, score }) =>
    outcome === 'win' ? `${score} / 50\nSURVIVED. +100`
                      : `${score || 0} / 50\nDEAD. -30`,
  presses: 5,
}
```

#### `kind: 'countdown'`

```js
{ kind: 'countdown', from: 5, presses: 5 }
```

Shows one number per press, counting down from `from`. The status zone renders in a much larger countdown style (see `GameStatus.js`'s `[data-kind="countdown"]` rule).

#### `kind: 'play'`

```js
{ kind: 'play',
  mode: 'goldenEgg',                          // mode id from MODES registry
  timeout: { kind: 'ms', value: 15000 },      // hard wall-clock deadline
  overrides: { mashing: 'normal',
               button:  'visible',
               gameClock: 'run' },
  ambient:      { flyingEmojis: 'off' },      // phase-level ambient overrides
  presentation: { accentColor: '#FFD700' },   // phase-level presentation overrides
  config: { reward: 25 },                     // free-form, passed as ctx.config
}
```

#### Phase-level overrides (only on `play` phases)

| key | values | effect |
|---|---|---|
| `overrides.mashing` | `'normal'` \| `'paused'` \| `'inverted'` | Sets `data-mash-mode`. `'paused'` ignores presses for pressCount; `'inverted'` lets the mode treat any press as failure. |
| `overrides.button` | `'visible'` \| `'hidden'` \| `'roaming'` | Sets `data-button-state`. Lets a mode hide or move the mash button. |
| `overrides.gameClock` | `'run'` \| `'paused'` | **Reusable primitive.** `'paused'` freezes the canvas, the heartbeat, AND the save-timer in `KudosCta`. The whole world stops. |

---

## 3. Mode contract reference

A mode is a module exporting:

```js
export default {
  id: 'myMode',                 // must match the key in MODES registry
  start(ctx) {
    // … set things up, subscribe to presses, spawn elements …
    return function cleanup() {
      // … clear timers, despawn, ctx.setSubStatus(null), ctx.endPhase(...) …
    };
  },
};
```

`start(ctx)` is called once when the play phase enters. Its return value is the cleanup fn called on phase exit (whether by win, lose, or wall-clock timeout).

### 3.1 `ctx` capabilities

| field / fn | purpose |
|---|---|
| `ctx.config` | The current phase's `config` object. Always defined (defaults to `{}`). |
| `ctx.timeoutMs` | Derived from `phase.timeout` — `Infinity` if no ms timeout. |
| `ctx.viewport` | `{ w, h }` snapshot at phase start. |
| `ctx.onPress(fn) → unsub` | Subscribe to user presses. **Fires regardless of `mashingMode`** — even when `'paused'` or `'inverted'`, the mode hears the tap. |
| `ctx.awardBonus(n, opts?)` | Increments `bonusCount` by `n`. If `opts = { x, y }` is passed, spawns a floating "+N" burst at that point (negative `n` spawns red "-N"). |
| `ctx.setStatus(text)` | Override the centered status text from inside a play phase. Passing `null` clears the override. |
| `ctx.setSubStatus(text)` | Show / clear a small caption under the status (used for live counters, hints). Pass `null` to clear. |
| `ctx.endPhase(outcome, score)` | Terminate the play phase. `outcome` is `'win'` \| `'lose'` \| `'timeout'`. The director applies `rules` and advances. **Idempotent** — guarded against double-call. |

### 3.2 Cleanup contract

The function returned from `start(ctx)` MUST:

- Cancel any timers / `requestAnimationFrame` loops it scheduled.
- Despawn any DOM elements it created.
- Clear sub-status: `ctx.setSubStatus(null)`.
- Clear status override if set: `ctx.setStatus(null)`.
- Optionally call `ctx.endPhase(...)` — this is how `goldenEgg` reports a final score on natural exit. Safe because `endPhase` is idempotent.

### 3.3 The hard timeout

If the phase has `timeout: { kind: 'ms', value: N }`, the **store** schedules a `setTimeout` that calls `gameStore.endPhase('timeout', null)` after `N` ms. This is a backstop — the mode can always end earlier. Cleanup will be called either way.

---

## 4. Reusable features

Two top-level reusable primitives have been explicitly built so that any new mini-game can opt in. Cite them by flag, do not reinvent them.

| feature | flag | what it gives you |
|---|---|---|
| **Pause the world** | `phase.overrides.gameClock: 'paused'` | The canvas, the heartbeat, AND the save-timer in `KudosCta` all freeze. The mash button visually halts. |
| **Fail ends the run** | `rules.onLose: { endsMashSession: true }` | A `'lose'` outcome immediately triggers the existing save→burn→reset flow in `KudosCta`. The user loses their session. Used by **Mash Gauntlet**. |

### Example: a new mini-game that uses both

```js
export const SUDDEN_DEATH = {
  id: 'sudden-death',
  label: 'Sudden Death',
  startAtPress: 50,
  rules: {
    canLose: true,
    onWin:  { bonus: +200 },
    onLose: { bonus: -50, endsMashSession: true },   // ← fail ends the run
  },
  ambient: { challengeText: 'frozen' },
  presentation: { accentColor: '#FF3030' },
  phases: [
    { kind: 'status',    text: 'SUDDEN DEATH',                presses: 5 },
    { kind: 'status',    text: 'HOLD STILL\nFOR 6 SECONDS',   presses: 6 },
    { kind: 'countdown', from: 3,                             presses: 3 },
    { kind: 'play',
      // `holdStill` is a hypothetical mode you'd implement (~30 lines):
      // listen on ctx.onPress; first press → ctx.endPhase('lose'); on
      // timeout → ctx.endPhase('win'). See "Path B" above for the mode
      // skeleton.
      mode: 'holdStill',
      timeout: { kind: 'ms', value: 6000, outcome: 'win' },
      overrides: {
        mashing:   'inverted',
        button:    'visible',
        gameClock: 'paused',                          // ← pause the world
      },
      ambient: { flyingEmojis: 'off', bubbleText: 'off', heartbeat: 'off' },
    },
    { kind: 'status',
      text: ({ outcome }) => outcome === 'win' ? 'IRON NERVE\n+200' : 'YOU MOVED.\nGAME OVER.',
      presses: 5,
    },
  ],
};
```

---

## 5. Pipeline / lifecycle

What happens, in order, from press 1 onward.

1. **`KudosCta`** owns the local `pressCount`. On every user press, it calls `gameStore.handlePress(now)` — which fans out to mode press listeners — AND, when `resolved.mashingMode === 'normal'`, it increments its own counter and calls `gameStore.setPressCount(n)`.
2. The **director reducer** receives `pressCount` and checks the queue head's `startAtPress`. When the press count meets the threshold, it activates the first mini-game (sets `state.active`, phase 0).
3. **Phase index advances**:
   - `status` / `countdown` phases advance when `pressCount - phaseStartedAtPress >= phase.presses`.
   - `play` phases advance when the mode calls `ctx.endPhase(...)` OR the store's hard `setTimeout` fires.
4. **On play-phase entry**, the store calls `mode.start(ctx)` and stores the returned cleanup fn. It also schedules a hard `setTimeout` matching `phase.timeout.value`.
5. **On play-phase exit**, the store invokes the cleanup fn and clears `modeStatusOverride` / `modeSubStatus`.
6. **When the mini-game's last phase exits**, `scheduleIndex` advances. If there is another mini-game in the queue, it activates immediately back-to-back regardless of its declared `startAtPress`.
7. **Reset.** When the user finishes / abandons the session, `KudosCta`'s `enterIdleState` calls `gameStore.reset()`, which clears `state` for the next session.

---

## 6. Step-by-step boilerplate: adding a new mini-game

Two paths. If the **mechanic** already exists (just new tuning, new visuals), use Path A. If you need a **new mechanic**, do Path B first, then Path A.

### Path A: Pure-data mini-game using an existing mode

Append a new object to `src/game/miniGames.js`:

```js
// ── Reed's Canoe Drift ─ tap drifting paddles for combo bonus ──────────────
export const CANOE_DRIFT = {
  id: 'canoe-drift',
  label: "Reed's Canoe Drift",
  startAtPress: 50,
  // Bonus-only mode: no fail state.
  rules: { canLose: false, onWin: { bonus: 0 } },
  // Mute ambient noise so the tappables read clearly.
  ambient: { challengeText: 'frozen' },
  // Cool blue accent for the status zone.
  presentation: { accentColor: '#4DD0E1' },
  phases: [
    { kind: 'status',    text: 'CANOE DRIFT',                  presses: 5 },
    { kind: 'status',    text: 'TAP THE PADDLES\nAS THEY DRIFT', presses: 5 },
    { kind: 'countdown', from: 3,                              presses: 3 },
    { kind: 'play',
      mode: 'goldenEgg',                                       // reuse arc-and-tap mechanic
      timeout: { kind: 'ms', value: 12000 },
      overrides: { mashing: 'normal', button: 'visible', gameClock: 'run' },
      ambient: { flyingEmojis: 'off', bubbleText: 'off', challengeText: 'frozen' },
      // goldenEgg accepts `reward`; lower it because we'll spawn paddles faster
      config: { reward: 15 },
    },
    { kind: 'status',
      text: ({ score }) => score > 0 ? `+${score} BONUS\nNICE PADDLE.` : 'CURRENT TOOK YOU.',
      presses: 5,
    },
  ],
};
```

Then wire it into the registry and (optionally) the canonical schedule (see step 3 below).

### Path B: Adding a new mode (new mechanic)

Create `src/game/modes/myMode.js`:

```js
// ─────────────────────────────────────────────────────────────────────────────
// myMode — one-line summary of the mechanic.
// Win/lose conditions, what it spawns, what it listens to.
// ─────────────────────────────────────────────────────────────────────────────
export default {
  id: 'myMode',                                 // must match key in MODES registry

  start(ctx) {
    // ── 1. Read config / viewport ─────────────────────────────────────────
    const target = (ctx.config && ctx.config.target) || 10;
    const { w, h } = ctx.viewport;

    // ── 2. Local state ────────────────────────────────────────────────────
    let ended = false;
    let count = 0;

    // ── 3. Initial sub-status / spawn ─────────────────────────────────────
    ctx.setSubStatus(`0 / ${target}`);

    // ── 4. Subscribe to presses ───────────────────────────────────────────
    const unsubPress = ctx.onPress((now) => {
      if (ended) return;
      count += 1;
      ctx.setSubStatus(`${count} / ${target}`);
      if (count >= target) {
        ended = true;
        // Optional positional bonus burst: ctx.awardBonus(50, { x, y })
        ctx.awardBonus(50);
        ctx.endPhase('win', count);
      }
    });

    // ── 5. (Optional) DOM spawns / animation loops ────────────────────────
    // const el = document.createElement('div');
    // el.style.cssText = 'position:fixed; z-index:9100; pointer-events:auto; ...';
    // document.body.appendChild(el);

    // ── 6. Cleanup contract ───────────────────────────────────────────────
    return () => {
      ended = true;
      unsubPress();
      // if (el) el.remove();
      ctx.setSubStatus(null);
      // Natural-exit (timeout) reports 'lose' with partial score — endPhase
      // is idempotent, so this is a no-op if the win path already fired.
      ctx.endPhase('lose', count);
    };
  },
};
```

Register it in `src/game/modes/index.js`:

```js
import goldenEgg from './goldenEgg';
import thresholdMash from './thresholdMash';
import myMode from './myMode';        // ← add

export const MODES = {
  goldenEgg,
  thresholdMash,
  myMode,                              // ← add
};
```

### Step 3: Wire into the schedule

For the new mini-game to actually run, it needs to be in `gameStore.setSchedule(...)`. Two ways:

**a. Add to `CANONICAL_SCHEDULE`** in `miniGames.js` (it'll run in "Auto" mode):

```js
export const CANONICAL_SCHEDULE = [
  GOLDEN_EGG,
  { ...MASH_GAUNTLET, startAtPress: 0 },
  { ...CANOE_DRIFT,   startAtPress: 0 },   // ← add (back-to-back ⇒ startAtPress: 0)
];
```

**b. Add a radio entry** in `src/components/calendar/DevTogglePanel.js` for testing in isolation:

```js
const CHOICES = [
  { id: 'auto',           label: 'Auto' },
  { id: 'golden-egg',     label: 'Golden Egg' },
  { id: 'mash-gauntlet',  label: 'Mash Gauntlet' },
  { id: 'canoe-drift',    label: "Reed's Canoe Drift" },   // ← add
];

function buildSchedule(choiceId) {
  if (choiceId === 'auto')         return CANONICAL_SCHEDULE;
  if (choiceId === 'golden-egg')   return [GOLDEN_EGG];
  if (choiceId === 'mash-gauntlet')return [MASH_GAUNTLET];
  if (choiceId === 'canoe-drift')  return [CANOE_DRIFT];   // ← add
  return CANONICAL_SCHEDULE;
}
```

Don't forget the import:

```js
import { GOLDEN_EGG, MASH_GAUNTLET, CANOE_DRIFT, CANONICAL_SCHEDULE } from '../../game/miniGames';
```

### Step 4: Test via the dev panel

1. Start the dev server: `npm start`.
2. Open the page, click the small `◀` tab on the right (only visible in `NODE_ENV === 'development'`).
3. Select your new mini-game from the radio list.
4. Mash to 50 to trigger it.
5. Use the **Reset Game State** button to start over without refreshing.

Choice persists in localStorage under `sl_dev_minigame_choice`; panel open state under `sl_dev_panel_open`.

### Step 5: Tune timing / visuals

For diagnostic output, point at `dumpMashLayout` in `src/hooks/useMashEffects.js`. It logs at presses **1, 2, 5, 10, 15, 20, 24, 25, 26, 30** plus a BURN message. Use it to verify:

- ambient toggles are hitting at the expected presses
- the canvas takeover / button transitions look right
- spawn heights and z-stacking are correct

For per-phase timing tweaks, just edit `presses:` and `timeout: { value: N }` and reload. No build step.

### Step 6: Ship

If the new mini-game is approved for the canonical sequence, leave it in `CANONICAL_SCHEDULE`. If it's an A/B / event-only thing, leave it out of the canonical schedule and reach for it via a future feature flag.

---

## 7. Existing examples table

The three working mini-games each demonstrate a different reusable pattern. Read them in this order.

| mini-game | mode | demonstrates |
|---|---|---|
| **`golden-egg`** | `goldenEgg` | Flying tappable spawns; positional `awardBonus` with `+N` burst at the tap point; 15-second time-based play phase; ambient `flyingEmojis: 'off'` during play. Bonus-only — `canLose: false`. |
| **`mash-gauntlet`** | `thresholdMash` | Press counting during a fixed window; live `setSubStatus` counter; threshold win condition; **`endsMashSession: true`** on fail (kills the session). |

---

## 8. Backlog (brainstormed, not yet implemented)

Each entry below is a one-line mechanic plus the new mode that would need to be added to ship it.

| concept | mechanic | new mode required |
|---|---|---|
| **whack-reed** | Reaction tap: heads pop up briefly, tap before they retreat. Mash button is hidden during play. | `whack` — randomised pop-up timing, per-target hit windows |
| **simon-crew** | Sequence memory: watch a 4-color flash sequence, repeat it on tap targets. | `simon` — sequence playback + input recognizer |
| **dodge-mash** | The mash button roams the screen while projectiles fly toward it; keep mashing while dodging. | `dodge` — button mover + projectile spawner + collision check |
| **glarbtron-approval** | Single huge target appears; hyper-mash it before timeout. | `singleTarget` — one big hit zone, press-rate scoring |
| **pig-boys-wrist** | Rhythm tap: hit windows scroll across the screen, tap on-beat. | `rhythm` — beat-track scheduler + hit/early/miss judgement |
| **find-dave** | Odd-one-out grid: tap the cell that doesn't match. | `findOdd` — grid generator + correctness check |
| **vandal-endurance** | Long-press the button, fill a meter, don't release early. | `holdMeter` — pointerdown/up timing + meter UI |
| **birnos-snowmobile** | Swipe gesture: swipe a path matching an on-screen guide. | `swipe` — touch path tracker + path-similarity scoring |

### 8.1 Design dive: tap-and-hold + drag mini-games

A new input modality the existing schema doesn't yet support: the user **presses and holds the mash button**, and while held, **drags the button around the viewport** to dodge incoming obstacles, follow a path, balance against forces, etc. Releasing (or being hit) ends the round.

This is meaningfully different from the existing `tap` and the planned `longPress`/`swipe` because:
- The button itself becomes the **player avatar** — its position is no longer fixed.
- The user's tap is **continuous** (one long pointerdown event), not discrete (many tapclicks).
- A second axis of input emerges: where the cursor/finger is *moving* during the hold.

#### Schema additions needed

```js
input: {
  tap: 'on' | 'off',
  longPress: 'on' | 'off',
  swipe: 'on' | 'off',
  dragHold: 'on' | 'off',     // NEW — button becomes draggable while pressed
}

overrides: {
  button: 'visible' | 'hidden' | 'roaming' | 'draggable',  // NEW value
  // 'draggable' = button is anchored normally until pointerdown; while held,
  // its translate offset tracks the pointer; on pointerup, returns to anchor
  // (or stays at last drag position if mode wants — config decision).
}
```

The play phase declares it like any other override:

```js
{ kind: 'play',
  mode: 'dragDodge',
  overrides: { mashing: 'paused', button: 'draggable', gameClock: 'run' },
  config: { ... },
}
```

#### Mode contract additions

The `ctx` object grows three optional drag callbacks. They're delivered in viewport coordinates so the mode can spawn obstacles relative to the button's current position:

```js
ctx.onDragStart(fn)   // fn({ x, y })          — pointerdown on button
ctx.onDragMove(fn)    // fn({ x, y, dx, dy })  — pointermove while held
ctx.onDragEnd(fn)     // fn({ x, y, durationMs }) — pointerup OR pointercancel
```

Each returns an unsubscribe function (same pattern as `onPress`). Modes that don't subscribe simply don't get the events; backwards-compatible.

A new helper for collision detection (since this becomes the dominant mechanic):

```js
ctx.onCollision(target, fn)
// target: { selector } | { rectFn: () => DOMRect }
// fn({ target, point }) — fires once per overlap entry; rate-limited internally
```

#### KudosCta wiring (host-side changes required)

When `body.dataset.buttonState === 'draggable'`, KudosCta must:

1. Listen for `pointerdown` on `.hd-cta` → call `gameStore.handleDragStart({x, y})`.
2. Listen for `pointermove` on `window` while held → throttle to rAF, call `gameStore.handleDragMove({x, y, dx, dy})`.
3. Listen for `pointerup` / `pointercancel` on `window` → call `gameStore.handleDragEnd(...)`, release.
4. Apply the drag delta to the button via `--btn-drag-x` / `--btn-drag-y` CSS vars in addition to (or replacing) the migration translate. The locked-state CSS rule on `.kudos-row` adds these to its transform when `body.dataset.buttonState === 'draggable'`.
5. Do NOT increment `pressCount` from a drag. `pointerdown` ≠ a "press" in the mash sense — it's the start of a held gesture. `mashingMode` should be `'paused'` during drag-only mini-games (set via the play phase's `overrides.mashing`).

The store gains:
- `gameStore.handleDragStart / Move / End` — fan out to drag listeners (mode-side).
- An internal `dragListeners` Set parallel to `pressListeners`.

#### Example mini-game

```js
export const DODGE_METEORS = {
  id: 'dodge-meteors',
  label: 'Dodge Meteors',
  startAtPress: FIRST_START,
  rules: { canLose: true, onWin: { bonus: +150 }, onLose: { bonus: -40 } },
  ambient: { challengeText: 'frozen', heartbeat: 'off' },
  presentation: { bodyBackground: '#1a0606', accentColor: '#FF6B6B' },
  input: { dragHold: 'on' },
  phases: [
    { kind: 'status', text: 'METEOR SHOWER\nINCOMING',                 presses: 5 },
    { kind: 'status', text: 'HOLD AND DRAG THE BUTTON\nTO DODGE',      presses: 5 },
    { kind: 'countdown', from: 3, presses: 3 },
    { kind: 'play',
      mode: 'dragDodge',
      timeout: { kind: 'ms', value: 12000, outcome: 'win' },
      overrides: { mashing: 'paused', button: 'draggable', gameClock: 'run' },
      ambient: { flyingEmojis: 'off', bubbleText: 'off' },
      config: {
        spawnEveryMs: 600,
        obstacleEmoji: '☄️',
        obstacleSize: 64,
        obstacleSpeedMs: [1800, 2400],
        maxHits: 3,
        rewardOnSurvive: 150,
      },
    },
    { kind: 'status',
      text: ({ outcome }) => outcome === 'win' ? 'UNTOUCHABLE.' : 'PULVERIZED.',
      ms: 2200,
    },
  ],
};
```

Mode skeleton (`src/game/modes/dragDodge.js`):

```js
const dragDodge = {
  id: 'dragDodge',
  start(ctx) {
    let hits = 0;
    const obstacles = new Set();
    let pos = null;        // last known button center
    let isHeld = false;

    const unsubStart = ctx.onDragStart(({ x, y }) => { isHeld = true; pos = { x, y }; });
    const unsubMove  = ctx.onDragMove(({ x, y }) => { pos = { x, y }; });
    const unsubEnd   = ctx.onDragEnd(() => { isHeld = false; });

    const spawnTimer = setInterval(spawnObstacle, ctx.config.spawnEveryMs);

    function spawnObstacle() { /* spawn DOM, animate flight, on each frame
                                  check distance(pos, obstacleCenter) < threshold;
                                  if hit, hits++, ctx.awardBonus(-10),
                                  if hits >= ctx.config.maxHits → ctx.endPhase('lose') */ }

    return () => {
      clearInterval(spawnTimer);
      obstacles.forEach((el) => el.remove());
      unsubStart(); unsubMove(); unsubEnd();
    };
  },
};
```

#### Pitfalls specific to drag mini-games

- **Pointer Events vs touch/mouse.** Use Pointer Events API (`pointerdown`/`pointermove`/`pointerup`) and `setPointerCapture` for clean iOS/Android/desktop coverage. Don't mix touch and mouse listeners.
- **Touch action.** The button needs `touch-action: none` while draggable so the browser doesn't try to scroll the page when the user drags. Already set on `body[data-mash-locked]` via the input-isolation rules; extend per `data-button-state="draggable"`.
- **rAF-throttle pointermove.** Native pointermove can fire 60–240Hz; throttle to one rAF tick per frame before notifying mode listeners. Otherwise a 60-line collision check runs 4× per frame.
- **Returning to anchor on phase end.** After the play phase exits, the button must drift back to its anchored position smoothly. Apply a CSS transition on `--btn-drag-x` / `--btn-drag-y` only when `body.dataset.buttonState !== 'draggable'`; during drag, transitions off so the button tracks the finger 1:1.
- **Don't consume pointerdown as a press.** A long-hold + drag should NOT advance `pressCount`. The mode owns the entire gesture; `mashingMode: 'paused'` keeps the press machinery dormant.
- **Don't break burn ring / heartbeat.** While dragging, the user's "last press" is functionally now (they're still touching). Pause heartbeat at the mini-game level (`ambient: { heartbeat: 'off' }`) and pause the save timer (`overrides.gameClock` could be `'paused'` if you want the world to stop too — design choice).
- **Cleanup on `pointercancel`.** iOS fires `pointercancel` if the OS interrupts (e.g., notification banner pulls focus). Treat it as `pointerup` with no win/loss penalty so you don't unfairly fail the user.

#### Reusable downstream

Once `dragHold` and `button: 'draggable'` exist, several backlog mini-games become trivial — `dodge-mash` (already in the table), a tightrope-balance variant, a "guide the egg through the maze" variant, etc. The drag primitive is the unlock; subsequent mini-games are pure data + a shared collision helper.

---

## 9. Debugging via Console Logs

The mini-game system is heavily instrumented. Open the devtools console while mashing — every state change writes a single line. This is the fastest way to figure out why a phase didn't advance, why a bonus didn't apply, or why the session ended unexpectedly.

### Format conventions

- **`[mg]`** — the central mini-game system (store, modes). Director state changes, phase transitions, mode lifecycle, bonus deltas, session-end pulses.
- **`[mg-host]`** — host-side reactions in `KudosCta` to events emitted by the store (bonus listener applying delta to `pressCount`, session-end listener triggering save flow).
- **`[mash-game]`** / **`[mash-layers]`** — legacy diagnostics from the press-count UI takeover. Mostly removed; what remains is the LOCK/UNLOCK pair around scroll-freeze plus a per-press `press N` line. The `dumpMashLayers` layout dumper has been removed entirely.

### What logs you'll see in a typical session

Walk through a normal session top-to-bottom:

1. **Press 1** — `[mash-game] press 1`, `[mash-game] GAME START — rect: {...}`, `[mash-game] LOCKED — page frozen at scrollY=N`.
2. **Press 50, first mini-game starts:**
   ```
   [mg] ▶ START "golden-egg" (Golden Egg) | schedule 1/3 | rules: {...}
   [mg]   phase 1/M kind=status dur=5 presses "GOLDEN EGG"
   ```
   The `phase X/M` line repeats on every phase advance.
3. **On entering a play phase:**
   ```
   [mg] mode goldenEgg start | reward=25 size=64px flight=900-1500ms timeout=15000ms
   ```
   Each mode logs its own `start` line with a config snapshot.
4. **During play (mode-specific):**
   ```
   [mg] goldenEgg spawn #3
   [mg] goldenEgg HIT #2 +25 | total=50
   [mg] thresholdMash press 12/50
   [mg] thresholdMash → WIN (50/50)
   ```
5. **Bonus applied (from store, then from host):**
   ```
   [mg] bonus +25 → total bonusCount 50 (at 412,389)
   [mg-host] bonus +25 | pressCount 73 → 98
   ```
   `(director-applied)` appears in place of `(at X,Y)` when the bonus came from `rules.onWin/onLose` rather than `ctx.awardBonus`.
6. **Phase ends:** `[mg] mode endPhase outcome=win score=50`, then the mode's cleanup line, e.g. `[mg] goldenEgg cleanup | hits=2/3 totalScore=50`.
7. **Mini-game completes:** `[mg] ■ END "golden-egg" | outcome=win score=50`.
8. **Schedule advances** — next mini-game's `▶ START` fires immediately, or the queue is empty.
9. **Session-end (only on a fail with `endsMashSession`, or natural save):**
   ```
   [mg] SESSION END pulse — onLose.endsMashSession triggered
   [mg-host] session-end received → triggering save flow
   ```
10. **Reset on session save complete:** `[mg] reset` and `[mash-game] GAME END — unlocked, scroll restored to N`.

### How to debug specific scenarios

| Bug | What to look for |
|---|---|
| Mini-game didn't start at press 50 | `[mg] ▶ START` should fire when `pressCount >= startAtPress`. If absent, the schedule is empty — check that `DevTogglePanel` pushed one (it calls `gameStore.setSchedule`) and that `pressCount` is actually advancing (`[mash-game] press N` lines). |
| Phase didn't advance | `[mg]   phase X/Y` should print on every transition. If absent after the expected interval, check `phase.presses` vs `phase.ms` — status phases need one or the other to auto-advance. Play phases only advance when the mode calls `ctx.endPhase` or the hard `timeout` fires. |
| Bonus not visible to user | `[mg] bonus +N` prints from the store; `[mg-host] bonus +N | pressCount before → after` confirms host applied it to `pressCount`. If the first prints but the second doesn't, the `onBonusAwarded` listener didn't subscribe — is `KudosCta` mounted? |
| Save fired during freeze | Confirm `[mg]   phase X/Y kind=status` shows `dur=<N>ms` (not `presses`) so it auto-advances on the wall clock; verify the mini-game has `rules.pauseMashGame: true` or the play phase has `overrides.gameClock: 'paused'` so `gameClockPaused` freezes the save-timer. |

### Adding logs to a new mode

Match the existing voice. Three log lines per mode is the right ceiling:

- **`start`** with a config snapshot:
  ```js
  console.log(`[mg] mode ${id} start | target=${target} timeout=${ctx.timeoutMs}ms`);
  ```
- **Significant in-play events** with mode prefix (HIT, WIN, penalty, spawn — NOT every press):
  ```js
  console.log(`[mg] ${id} HIT #${n} +${reward} | total=${total}`);
  ```
- **`cleanup`** with totals:
  ```js
  console.log(`[mg] ${id} cleanup | hits=${hits}/${spawns} totalScore=${total}`);
  ```

Don't log on every `onPress` — at high mash rates that floods the console and obscures the events you actually care about. `thresholdMash` logs `press X/Y` because the count IS the gameplay; `goldenEgg` does not log on tap, only on HIT.

### What was removed

An earlier `dumpMashLayout` / `dumpMashLayers` system snapshotted the button position, z-order, and scroll lock at presses 1, 2, 5, 10, 15, 20, 24, 25, 26, 30. It was used to diagnose the canvas takeover and button locking and has since been removed. The `[mg]` / `[mg-host]` logs above replace it for game-flow diagnostics. Two `[mash-game] LOCKED` / `GAME END` lines remain because they straddle the entire session and are still useful when triaging scroll-restore bugs.

---

## 10. Common pitfalls

- **Don't increment `pressCount` from inside your mode.** `pressCount` is the director's clock, not the score. If you want to score, use `ctx.awardBonus(n)`. If you want to count presses for a threshold, keep a local counter in your mode (see `thresholdMash`).
- **Don't call `ctx.endPhase` more than once.** It's idempotent, but a double-call signals confusion about your win/lose flow. Pick one path: either the win callback ends the phase OR cleanup ends it.
- **Modes own DOM elements they spawn.** Always despawn in cleanup. Cancel `WAAPI` animations (`anim.cancel()`) before `el.remove()` to avoid orphaned handles.
- **Don't reach into other components.** Modes should only touch:
  - what `ctx` exposes (presses, status, sub-status, bonus, endPhase)
  - their own spawned DOM elements
  - they should NOT mutate body classes/data-attrs (that's `applyAmbient`'s remit) or call into `KudosCta`/`useMashEffects` directly.
- **Z-index discipline.** Spawned game elements need `z-index: 9100+` and `pointer-events: auto` to land **above** the input-blocker layer (z 8999) and the canvas (z 9000), but **below** the bonus-burst layer (z 9200). The status zone sits at 9050; tappables should be 9100, particles 9099 or 9200.
- **Cleanup must clear sub-status.** If your mode set `ctx.setSubStatus('0 / 50')`, the cleanup fn must call `ctx.setSubStatus(null)` or the next phase's status block will inherit your stale text.
- **Press listeners fire even when mashing is paused/inverted.** That's by design — a "don't tap" mini-game still needs to hear the forbidden tap to penalize / fail it. Don't assume `ctx.onPress` is gated by mashingMode.
- **Wall-clock timeouts run independently of the mode.** Even after your mode "wins" via `ctx.endPhase('win', score)`, the store cancels the pending timeout. But if you `setTimeout` your own deadlines inside the mode, you must clear them in cleanup yourself.
