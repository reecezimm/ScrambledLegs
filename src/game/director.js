// ─────────────────────────────────────────────────────────────────────────────
// Mash-game director — pure reducer + selectors.
//
// State machine: a queue of mini-games, one active at a time. Each mini-game
// has phases (status / countdown / play). Press-counted phases advance on
// press deltas; play phases end via mode (mode calls endPhase) or wall-clock
// timeout enforced by the host.
//
// Resolution order: phase.ambient/overrides/presentation > miniGame.ambient/
// presentation > defaults. The resolver runs on every state change and the
// host (store) writes the result to body data attributes / CSS vars so the
// existing ambient systems gate on it.
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULTS = {
  mashingMode: 'normal',          // 'normal' | 'paused' | 'inverted'
  buttonState: 'visible',         // 'visible' | 'hidden' | 'roaming'
  gameClockPaused: false,
  ambient: {
    flyingEmojis: 'on',
    bubbleText: 'on',
    challengeText: 'on',
    heartbeat: 'on',
    flash: 'on',
    vignette: 'on',
    shockwave: 'on',
    canvasGradient: 'default',
  },
  presentation: {
    bodyBackground: null,
    accentColor: null,
    statusColor: '#fff',
    statusFont: 'Fredoka',
  },
};

export const initialState = {
  schedule: [],          // [miniGame] — runs in order, back-to-back
  scheduleIndex: 0,
  active: null,          // { miniGameIdx, phaseIndex, phaseStartedAtPress, phaseStartedAtMs, lastOutcome, lastScore }
  pressCount: 0,
  bonusCount: 0,
  modeStatusOverride: null,
  modeSubStatus: null,
  // Monotonic counter incremented when a mini-game's onLose.endsMashSession
  // triggers a fail-out. The store watches for changes and notifies listeners
  // (KudosCta) which in turn fires the save→burn→reset flow immediately.
  sessionEndPulse: 0,
  // Wall-clock timestamp of the first press in the current session.
  // null until pressCount transitions 0 → 1. Used by mini-games that
  // declare `startAtMs` so they can't fire too soon regardless of how
  // fast the user is mashing.
  sessionStartMs: null,
  // Counter that increments each time a success outcome triggers MASH NOW! warning.
  // Component uses this to detect new warnings and re-trigger its 2.5s timer.
  flashWarningCounter: 0,
  resolved: resolveDefaults(),
};

function resolveDefaults() {
  return {
    statusText: null,
    subStatus: null,
    mashingMode: DEFAULTS.mashingMode,
    buttonState: DEFAULTS.buttonState,
    dragAxis: 'free',
    gameClockPaused: false,
    ambient: { ...DEFAULTS.ambient },
    presentation: { ...DEFAULTS.presentation },
    activeModeId: null,
    miniGameId: null,
    phaseKind: 'idle',
    outcome: null,
    score: null,
    flashWarning: null,
    flashWarningCounter: 0,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Reducer
// ─────────────────────────────────────────────────────────────────────────────
export function reduce(state, action) {
  switch (action.type) {
    case 'setSchedule':
      return resolve({
        ...state,
        schedule: action.schedule,
        scheduleIndex: 0,
        active: null,
        modeStatusOverride: null,
        modeSubStatus: null,
      });

    case 'pressCount': {
      // Stamp sessionStartMs on the 0→1+ transition so wall-clock gates
      // (mg.startAtMs) start counting from the first real press, not from
      // page load.
      const now = action.now || Date.now();
      const sessionStartMs = (state.pressCount === 0 && action.value > 0 && state.sessionStartMs == null)
        ? now
        : state.sessionStartMs;
      const next = { ...state, pressCount: action.value, sessionStartMs };
      return advance(next, now);
    }

    case 'tick':
      return advance(state, action.now);

    case 'endPhase': {
      if (!state.active) return state;
      const outcome = action.outcome || 'timeout';
      // Record outcome and advance — the outcome status phase (if any) runs
      // normally so users see WIN/FAILED feedback. If the mini-game declares
      // rules.onLose.endsMashSession, the sessionEndPulse fires when the
      // mini-game NATURALLY completes (last phase exits), giving the user
      // ~2 seconds of "FAILED" feedback before the save flow takes over.

      // Fire MASH NOW! the instant the play phase ends with a win — while the
      // outcome message is still showing — so the user has maximum mashing time.
      // Exclude preamble (no play phase, not a real game).
      const endingPhase = currentPhase(state);
      const endingMg = currentMiniGame(state);
      const shouldShowWarning = outcome === 'win'
        && endingPhase && endingPhase.kind === 'play'
        && endingMg && endingMg.id !== 'preamble';

      const next = {
        ...state,
        active: {
          ...state.active,
          lastOutcome: outcome,
          lastScore: action.score == null ? null : action.score,
        },
        modeStatusOverride: null,
        modeSubStatus: null,
        flashWarning: shouldShowWarning ? 'MASH NOW!' : state.flashWarning,
        flashWarningCounter: shouldShowWarning ? state.flashWarningCounter + 1 : state.flashWarningCounter,
      };
      // Critical: re-resolve after advancePhase. Without this, state.resolved
      // stays computed against the OLD phase (the one just ending), so any
      // host that subscribes to state.resolved (KudosCta's pause-detector,
      // ambient appliers, GameStatus) sees stale mashingMode / gameClockPaused
      // / button-state values and misses the unpause flip after a mini-game
      // play phase ends. Bug surfaced as "after Pig Boy/Freeze finishes the
      // button just sits — no heartbeat, no save flow." Other reducer cases
      // call resolve() at the end of advance(); this case bypassed that path.
      return resolve(advancePhase(next, action.now || Date.now()));
    }

    case 'appendSchedule':
      return resolve({
        ...state,
        schedule: [...state.schedule, action.item],
      });

    case 'awardBonus':
      return resolve({ ...state, bonusCount: state.bonusCount + action.n });

    case 'setModeStatus':
      return resolve({ ...state, modeStatusOverride: action.text });

    case 'setModeSubStatus':
      return resolve({ ...state, modeSubStatus: action.text });

    case 'reset':
      // Clear schedule, scheduleIndex, active, counters, sessionStartMs.
      // Preserve sessionEndPulse so the listener doesn't see a phantom
      // decrement. The store will refill the schedule from scheduleStrategy
      // on the next press.
      return {
        ...initialState,
        sessionEndPulse: state.sessionEndPulse,
        resolved: resolveDefaults(),
      };

    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase advancement
// ─────────────────────────────────────────────────────────────────────────────
function advance(state, now) {
  let s = state;
  // 1) Activate next mini-game if none active and queue head is ready.
  //    Both gates must clear:
  //      - pressCount >= mg.startAtPress (skill-paced gate)
  //      - now - sessionStartMs >= mg.startAtMs (wall-clock floor; if
  //        startAtMs is unset, this gate auto-passes)
  if (!s.active && s.scheduleIndex < s.schedule.length) {
    const head = s.schedule[s.scheduleIndex];
    const pressOk = s.pressCount >= (head.startAtPress || 0);
    const msOk = !head.startAtMs
      || (s.sessionStartMs != null && (now - s.sessionStartMs) >= head.startAtMs);
    if (pressOk && msOk) {
      s = startActive(s, s.scheduleIndex, now);
    }
  }

  // 2) Advance press-counted or ms-counted status/countdown phase.
  if (s.active) {
    const phase = currentPhase(s);
    if (phase && (phase.kind === 'status' || phase.kind === 'countdown')) {
      const pressDelta = s.pressCount - s.active.phaseStartedAtPress;
      const msDelta = now - s.active.phaseStartedAtMs;
      const presses = phase.presses || 0;
      const ms = phase.ms || 0;
      const pressDone = presses > 0 && pressDelta >= presses;
      const msDone = ms > 0 && msDelta >= ms;
      if (pressDone || msDone) {
        s = advancePhase(s, now);
      }
    }
  }
  return resolve(s);
}

function advancePhase(state, now) {
  if (!state.active) return state;
  const nextIdx = state.active.phaseIndex + 1;
  const mg = state.schedule[state.active.miniGameIdx];
  if (nextIdx >= mg.phases.length) {
    // Mini-game complete — apply rules.onWin/onLose deltas, advance schedule.
    const outcome = state.active.lastOutcome;
    const score = state.active.lastScore;
    const rules = mg.rules || {};
    let bonus = state.bonusCount;
    let appliedDelta = 0;
    let appliedSource = 'no-rule';
    if (outcome === 'win' && rules.onWin && typeof rules.onWin.bonus === 'number') {
      appliedDelta = rules.onWin.bonus;
      appliedSource = 'onWin';
      bonus += appliedDelta;
    } else if (outcome === 'lose' && rules.onLose && typeof rules.onLose.bonus === 'number') {
      appliedDelta = rules.onLose.bonus;
      appliedSource = 'onLose';
      bonus += appliedDelta;
    }
    // Fire sessionEndPulse if rules.onLose.endsMashSession was triggered
    // (the lose outcome propagated all the way through any outcome status
    // phase). Host (KudosCta) listens and runs the save→burn→reset flow.
    const fireSessionEnd = outcome === 'lose'
      && rules.onLose && rules.onLose.endsMashSession;

    const newSessionEndPulse = fireSessionEnd ? state.sessionEndPulse + 1 : state.sessionEndPulse;

    return {
      ...state,
      active: null,
      scheduleIndex: state.active.miniGameIdx + 1,
      bonusCount: Math.max(0, bonus),
      modeStatusOverride: null,
      modeSubStatus: null,
      sessionEndPulse: newSessionEndPulse,
      // Clear the warning now that the mini-game is fully done. The warning
      // was set during the play-phase-end (endPhase case) and displayed
      // throughout the outcome status phase. Clearing here resets the
      // flashWarning → null so the component's else-branch can run on the
      // next game and the dependency comparison works cleanly.
      flashWarning: null,
    };
  }
  return {
    ...state,
    active: {
      ...state.active,
      phaseIndex: nextIdx,
      phaseStartedAtPress: state.pressCount,
      phaseStartedAtMs: now,
    },
    modeStatusOverride: null,
    modeSubStatus: null,
  };
}

function startActive(state, miniGameIdx, now) {
  return {
    ...state,
    active: {
      miniGameIdx,
      phaseIndex: 0,
      phaseStartedAtPress: state.pressCount,
      phaseStartedAtMs: now,
      lastOutcome: null,
      lastScore: null,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Selectors
// ─────────────────────────────────────────────────────────────────────────────
function currentPhase(state) {
  if (!state.active) return null;
  const mg = state.schedule[state.active.miniGameIdx];
  return mg && mg.phases[state.active.phaseIndex];
}

function currentMiniGame(state) {
  if (!state.active) return null;
  return state.schedule[state.active.miniGameIdx];
}

// Compute resolved view from current state (defaults < mini-game < phase < mode override).
function resolve(state) {
  const r = resolveDefaults();
  const mg = currentMiniGame(state);
  const phase = currentPhase(state);

  if (mg) {
    r.miniGameId = mg.id;
    if (mg.ambient) Object.assign(r.ambient, mg.ambient);
    if (mg.presentation) Object.assign(r.presentation, mg.presentation);
    // rules.pauseMashGame applies for the WHOLE mini-game duration (not
    // just play phase). Pauses save timer + canvas/heartbeat throughout
    // intros, play, and outros. Used by Freeze.
    if (mg.rules && mg.rules.pauseMashGame) r.gameClockPaused = true;
  }

  if (phase) {
    r.phaseKind = phase.kind;
    if (phase.ambient) Object.assign(r.ambient, phase.ambient);
    if (phase.presentation) Object.assign(r.presentation, phase.presentation);

    // Phase overrides apply regardless of kind. `gameClock: 'run'` is an
    // EXPLICIT unpause that beats rules.pauseMashGame — used to release the
    // pause for tail status phases (UNFREEZE / START MASHING) so the save
    // timer can re-arm and the user can be auto-saved out if idle.
    if (phase.overrides) {
      if (phase.overrides.mashing) r.mashingMode = phase.overrides.mashing;
      if (phase.overrides.button) r.buttonState = phase.overrides.button;
      if (phase.overrides.gameClock === 'paused') r.gameClockPaused = true;
      if (phase.overrides.gameClock === 'run') r.gameClockPaused = false;
      // dragAxis: 'horizontal' locks the button to left/right movement and
      // clamps to viewport bounds (paddle behavior — used by Pong).
      // 'free' (default) is full 2D drag (Pig Boy).
      if (phase.overrides.dragAxis) r.dragAxis = phase.overrides.dragAxis;
    }

    if (phase.kind === 'status') {
      const text = typeof phase.text === 'function'
        ? phase.text({ outcome: state.active.lastOutcome, score: state.active.lastScore })
        : phase.text;
      r.statusText = text;
    } else if (phase.kind === 'countdown') {
      const delta = state.pressCount - state.active.phaseStartedAtPress;
      const remaining = Math.max(1, (phase.from || phase.presses || 5) - delta);
      r.statusText = String(remaining);
    } else if (phase.kind === 'play') {
      r.activeModeId = phase.mode;
      // mode can override the centered status text via modeStatusOverride
      r.statusText = state.modeStatusOverride;
      r.subStatus = state.modeSubStatus;
    }
  }

  r.outcome = state.active && state.active.lastOutcome;
  r.score = state.active && state.active.lastScore;
  r.flashWarning = state.flashWarning;
  r.flashWarningCounter = state.flashWarningCounter;

  return { ...state, resolved: r };
}
