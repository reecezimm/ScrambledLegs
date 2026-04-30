// ─────────────────────────────────────────────────────────────────────────────
// Mash-game store — singleton holding director state + mode lifecycle.
//
// Pure reducer logic lives in director.js. This file glues it to React (via
// useSyncExternalStore) and to imperative side effects: starting/stopping
// modes when entering/leaving play phases, dispatching press events to mode
// listeners, applying ambient/presentation overrides to the DOM.
// ─────────────────────────────────────────────────────────────────────────────
import { useSyncExternalStore } from 'react';
import { initialState, reduce } from './director';
import { MODES } from './modes';
import { applySideEffects } from './applyAmbient';

let state = initialState;
const listeners = new Set();
const pressListeners = new Set();
const sessionEndListeners = new Set();
const bonusListeners = new Set();
const dragStartListeners = new Set();
const dragMoveListeners = new Set();
const dragEndListeners = new Set();
let modeCleanup = null;
let phaseTimeoutId = null;        // play-phase mode timeout (ms)
let statusTimeoutId = null;       // status/countdown ms-based auto-advance
// scheduleStrategy is a stateful object with .next(currentPressCount) and
// .reset(). When the queue is empty (initial bootstrap or mini-game just
// completed), the store calls strategy.next() to enqueue the next mini-game.
// Survives across gameStore.reset() (cleared explicitly in setSchedule).
let scheduleStrategy = null;

function emit() { listeners.forEach((fn) => fn(state)); }

// One-shot opts attached by gameStore.awardBonus before its action dispatch.
// setState reads + clears it so listeners receive the tap coordinates from
// mode-driven awards (golden egg taps, freeze penalty taps). Director-driven
// bonuses (onWin/onLose rule application) leave it null.
let pendingBonusOpts = null;
// One-shot flag set by gameStore.reset() so setState's bonus-delta detector
// can skip firing listeners on the bonusCount → 0 transition that happens
// at session reset. Otherwise users see a phantom red "-N" floater equal
// to whatever bonus they accumulated this session (winning Twilight with
// +175 then saving used to spawn a "-175" reset floater — that's NOT a
// punishment, it's just state cleanup).
let suppressBonusDelta = false;

function setState(next) {
  if (next === state) return;
  const prev = state;
  state = next;
  syncModeLifecycle(prev, next);
  syncStatusTimeout(prev, next);
  applySideEffects(prev.resolved, next.resolved);
  if (next.bonusCount !== prev.bonusCount) {
    const delta = next.bonusCount - prev.bonusCount;
    const opts = pendingBonusOpts;
    pendingBonusOpts = null;
    if (suppressBonusDelta) {
      // Reset path — log it but don't notify listeners. Eats the phantom
      // negative delta that would otherwise spawn a punishing red floater.
      console.log('[mg] bonus delta', (delta > 0 ? '+' : '') + delta, '→ total bonusCount', next.bonusCount, '(SUPPRESSED — session reset)');
    } else {
      console.log('[mg] bonus', (delta > 0 ? '+' : '') + delta, '→ total bonusCount', next.bonusCount, opts ? `(at ${opts.x|0},${opts.y|0})` : '(director-applied)');
      bonusListeners.forEach((fn) => { try { fn(delta, opts); } catch (_) {} });
    }
  }
  // Always clear the suppress flag at the end of setState. If reset() set
  // the flag but bonusCount didn't actually change (e.g. reset called when
  // bonusCount was already 0), the flag would otherwise persist and eat the
  // NEXT legitimate bonus award — bug surfaced as "Pig Boy +250 didn't
  // appear in score." One-shot semantics enforced here.
  suppressBonusDelta = false;
  if (next.sessionEndPulse > prev.sessionEndPulse) {
    console.log('[mg] SESSION END pulse — onLose.endsMashSession triggered');
    sessionEndListeners.forEach((fn) => { try { fn(); } catch (_) {} });
  }
  logPhaseTransition(prev, next);
  emit();
  // After every state transition, see if the queue needs a refill from the
  // strategy. Done after emit so listeners see the natural state first.
  maybeRefillSchedule();
}

function maybeRefillSchedule() {
  if (!scheduleStrategy) return;
  if (state.active) return;
  if (state.scheduleIndex < state.schedule.length) return;
  // Pass current session-elapsed ms so wall-clock-gated strategies can
  // compute relative-to-session times for "next mini-game in N seconds."
  const sessionMs = state.sessionStartMs != null
    ? Date.now() - state.sessionStartMs
    : 0;
  const next = scheduleStrategy.next(state.pressCount, sessionMs);
  if (!next) return;
  console.log(`[mg] strategy yields "${next.id}" startAtPress=${next.startAtPress} startAtMs=${next.startAtMs || '-'}`);
  setState(reduce(state, { type: 'appendSchedule', item: next }));
}

function logPhaseTransition(prev, next) {
  const prevId = prev.active && prev.schedule[prev.active.miniGameIdx] && prev.schedule[prev.active.miniGameIdx].id;
  const nextId = next.active && next.schedule[next.active.miniGameIdx] && next.schedule[next.active.miniGameIdx].id;
  const prevIdx = prev.active && prev.active.phaseIndex;
  const nextIdx = next.active && next.active.phaseIndex;

  // Mini-game start
  if (!prev.active && next.active) {
    const mg = next.schedule[next.active.miniGameIdx];
    console.log(`[mg] ▶ START "${mg.id}" (${mg.label || mg.id}) | schedule ${next.active.miniGameIdx + 1}/${next.schedule.length} | rules:`, mg.rules || {});
    logPhase(next);
    return;
  }
  // Mini-game end (active → null)
  if (prev.active && !next.active) {
    const mg = prev.schedule[prev.active.miniGameIdx];
    console.log(`[mg] ■ END   "${mg.id}" | outcome=${prev.active.lastOutcome || '-'} score=${prev.active.lastScore == null ? '-' : prev.active.lastScore}`);
    return;
  }
  // Phase advanced within the same mini-game
  if (prev.active && next.active && (prevId !== nextId || prevIdx !== nextIdx)) {
    logPhase(next);
  }
}

function logPhase(s) {
  if (!s.active) return;
  const mg = s.schedule[s.active.miniGameIdx];
  const phase = mg.phases[s.active.phaseIndex];
  if (!phase) return;
  const total = mg.phases.length;
  const idx = s.active.phaseIndex + 1;
  const dur = phase.ms ? `${phase.ms}ms` : phase.presses ? `${phase.presses} presses` : phase.timeout ? `${phase.timeout.value}${phase.timeout.kind === 'ms' ? 'ms' : 'p'}` : '-';
  const text = typeof phase.text === 'string' ? `"${phase.text.replace(/\n/g, '⏎')}"` : phase.text ? '<fn>' : '';
  const mode = phase.mode ? ` mode=${phase.mode}` : '';
  console.log(`[mg]   phase ${idx}/${total} kind=${phase.kind} dur=${dur}${mode} ${text}`);
}

function syncStatusTimeout(prev, next) {
  const prevId = prev.active ? `${prev.active.miniGameIdx}.${prev.active.phaseIndex}` : null;
  const nextId = next.active ? `${next.active.miniGameIdx}.${next.active.phaseIndex}` : null;
  if (prevId === nextId) return;
  // Phase changed — clear any existing status timeout
  if (statusTimeoutId) { clearTimeout(statusTimeoutId); statusTimeoutId = null; }
  if (!next.active) return;
  const mg = next.schedule[next.active.miniGameIdx];
  const phase = mg && mg.phases[next.active.phaseIndex];
  if (!phase || (phase.kind !== 'status' && phase.kind !== 'countdown')) return;
  if (!phase.ms) return;
  // Schedule auto-advance
  statusTimeoutId = setTimeout(() => {
    statusTimeoutId = null;
    // Force a tick so the reducer sees ms elapsed and advances.
    gameStore.tick(Date.now());
  }, phase.ms + 16);  // small fudge so the tick fires after the deadline
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

function isPlay(s) {
  if (!s.active) return false;
  const mg = s.schedule[s.active.miniGameIdx];
  const phase = mg && mg.phases[s.active.phaseIndex];
  return phase && phase.kind === 'play';
}

function startMode(s) {
  const mg = s.schedule[s.active.miniGameIdx];
  const phase = mg.phases[s.active.phaseIndex];
  const mode = MODES[phase.mode];
  if (!mode) {
    console.warn('[game] unknown mode:', phase.mode);
    return;
  }
  const ctx = makeCtx(phase);
  try {
    modeCleanup = mode.start(ctx) || null;
  } catch (e) {
    console.error('[game] mode.start threw:', e);
  }
  // Hard timeout enforcement. Fires through ctx.endPhase so the mode's
  // `ended` guard catches it (preventing the cleanup-time fallback from
  // double-dispatching). The phase config can declare `timeout.outcome`
  // ('win'|'lose'|'timeout') to control how the director treats expiry —
  // gauntlet timeouts mean lose, freeze/golden-egg timeouts mean win.
  if (phase.timeout && phase.timeout.kind === 'ms') {
    const deadline = phase.timeout.value;
    const outcome = phase.timeout.outcome || 'timeout';
    phaseTimeoutId = setTimeout(() => {
      phaseTimeoutId = null;
      console.log(`[mg] HARD TIMEOUT fired | mode=${phase.mode} outcome=${outcome} deadline=${deadline}ms`);
      ctx.endPhase(outcome, null);
    }, deadline);
  }
}

function makeCtx(phase) {
  let ended = false;
  return {
    config: phase.config || {},
    timeoutMs: phase.timeout && phase.timeout.kind === 'ms' ? phase.timeout.value : Infinity,
    viewport: { w: window.innerWidth, h: window.innerHeight },
    onPress(fn) {
      pressListeners.add(fn);
      return () => pressListeners.delete(fn);
    },
    // Drag-and-hold subscriptions for mini-games using `button: 'draggable'`.
    // Each fires with viewport-relative coordinates; modes use these to
    // track button position in real time (e.g. pigDodge applies gravity
    // toward the button's current position).
    onDragStart(fn) {
      dragStartListeners.add(fn);
      return () => dragStartListeners.delete(fn);
    },
    onDragMove(fn) {
      dragMoveListeners.add(fn);
      return () => dragMoveListeners.delete(fn);
    },
    onDragEnd(fn) {
      dragEndListeners.add(fn);
      return () => dragEndListeners.delete(fn);
    },
    // Mode-driven bonus award. Pass opts={x,y} to attach a tap location;
    // bonus listeners (KudosCta) will spawn the burst at those coords.
    awardBonus(n, opts) { gameStore.awardBonus(n, opts); },
    setStatus(text) { gameStore.setModeStatus(text); },
    setSubStatus(text) { gameStore.setModeSubStatus(text); },
    endPhase(outcome, score) {
      if (ended) return;
      ended = true;
      console.log(`[mg] mode endPhase outcome=${outcome} score=${score == null ? '-' : score}`);
      gameStore.endPhase(outcome, score);
    },
  };
}

// (Burst spawning lives in KudosCta now — single source of truth so the
// visual stays in sync with the host's pressCount update.)

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────
export const gameStore = {
  getState: () => state,
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },

  // setSchedule accepts either:
  //   - An array of mini-game definitions (manual schedule, no auto-refill).
  //   - An object { strategy } where strategy has { next, reset } — auto
  //     refills the queue whenever it empties (infinite loop until session
  //     end / reset).
  setSchedule(spec) {
    if (Array.isArray(spec)) {
      scheduleStrategy = null;
      console.log(`[mg] schedule set (manual, ${spec.length} item${spec.length === 1 ? '' : 's'})`);
      setState(reduce(state, { type: 'setSchedule', schedule: spec }));
      return;
    }
    if (spec && spec.strategy && typeof spec.strategy.next === 'function') {
      scheduleStrategy = spec.strategy;
      console.log('[mg] schedule set (strategy/auto-refill)');
      setState(reduce(state, { type: 'setSchedule', schedule: [] }));
      // Pull initial item from strategy now so first activation lines up.
      maybeRefillSchedule();
      return;
    }
    scheduleStrategy = null;
    setState(reduce(state, { type: 'setSchedule', schedule: [] }));
  },

  reset() {
    if (modeCleanup) { try { modeCleanup(); } catch (_) {} modeCleanup = null; }
    if (phaseTimeoutId) { clearTimeout(phaseTimeoutId); phaseTimeoutId = null; }
    if (statusTimeoutId) { clearTimeout(statusTimeoutId); statusTimeoutId = null; }
    if (scheduleStrategy && typeof scheduleStrategy.reset === 'function') {
      scheduleStrategy.reset();
    }
    // Suppress the bonus listener ONLY if the reset will actually produce
    // a delta (i.e. bonusCount is currently nonzero). If bonusCount is
    // already 0, setting the flag would just leak — there's no transition
    // for the bonus detector to consume — and the flag would eat the next
    // legitimate bonus award. The setState end-of-loop also clears the
    // flag as a belt-and-suspenders guard.
    if (state.bonusCount !== 0) suppressBonusDelta = true;
    console.log('[mg] reset');
    setState(reduce(state, { type: 'reset' }));
    // After reset, refill from strategy so the next session starts with
    // the strategy's initial pick (e.g. Golden Egg).
    maybeRefillSchedule();
  },

  // Called by KudosCta on every user press, regardless of mashing mode.
  // Modes subscribe via ctx.onPress to hear taps.
  handlePress(now) {
    pressListeners.forEach((fn) => { try { fn(now); } catch (_) {} });
  },

  // Drag-and-hold input plumbing — KudosCta dispatches these from pointer
  // events when `body.dataset.buttonState === 'draggable'`.
  handleDragStart(payload) {
    dragStartListeners.forEach((fn) => { try { fn(payload); } catch (_) {} });
  },
  handleDragMove(payload) {
    dragMoveListeners.forEach((fn) => { try { fn(payload); } catch (_) {} });
  },
  handleDragEnd(payload) {
    dragEndListeners.forEach((fn) => { try { fn(payload); } catch (_) {} });
  },

  // Called by KudosCta after it increments its local pressCount (only when
  // mashing mode is 'normal'). Drives phase advancement.
  setPressCount(n) {
    setState(reduce(state, { type: 'pressCount', value: n, now: Date.now() }));
  },

  tick(now) {
    setState(reduce(state, { type: 'tick', now: now || Date.now() }));
  },

  endPhase(outcome, score) {
    setState(reduce(state, { type: 'endPhase', outcome, score, now: Date.now() }));
  },

  awardBonus(n, opts) {
    pendingBonusOpts = opts || null;
    setState(reduce(state, { type: 'awardBonus', n }));
  },

  setModeStatus(text) {
    setState(reduce(state, { type: 'setModeStatus', text }));
  },

  setModeSubStatus(text) {
    setState(reduce(state, { type: 'setModeSubStatus', text }));
  },

  // Subscribe to "session end" events triggered by mini-games with
  // rules.onLose.endsMashSession=true. KudosCta uses this to immediately
  // run its save→burn→reset flow when a mini-game fails.
  onSessionEnd(fn) {
    sessionEndListeners.add(fn);
    return () => sessionEndListeners.delete(fn);
  },

  // Subscribe to bonus deltas (fired whenever bonusCount changes — from
  // mode awardBonus calls AND from director-applied onWin/onLose rules).
  // KudosCta uses this to add the delta to its local pressCount so the
  // user sees their score update in real time.
  onBonusAwarded(fn) {
    bonusListeners.add(fn);
    return () => bonusListeners.delete(fn);
  },
};

// React hook
export function useGameState() {
  return useSyncExternalStore(gameStore.subscribe, gameStore.getState, gameStore.getState);
}
