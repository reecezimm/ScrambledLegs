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
  resolved: resolveDefaults(),
};

function resolveDefaults() {
  return {
    statusText: null,
    subStatus: null,
    mashingMode: DEFAULTS.mashingMode,
    buttonState: DEFAULTS.buttonState,
    gameClockPaused: false,
    ambient: { ...DEFAULTS.ambient },
    presentation: { ...DEFAULTS.presentation },
    activeModeId: null,
    miniGameId: null,
    phaseKind: 'idle',
    outcome: null,
    score: null,
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
      const next = { ...state, pressCount: action.value };
      return advance(next, action.now || Date.now());
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
      return advancePhase(next, action.now || Date.now());
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
      // Clear schedule, scheduleIndex, active, counters. Preserve
      // sessionEndPulse so the listener doesn't see a phantom decrement.
      // The store will refill the schedule from scheduleStrategy on the
      // next press.
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
  if (!s.active && s.scheduleIndex < s.schedule.length) {
    const head = s.schedule[s.scheduleIndex];
    if (s.pressCount >= head.startAtPress) {
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
    const rules = mg.rules || {};
    let bonus = state.bonusCount;
    if (outcome === 'win' && rules.onWin && typeof rules.onWin.bonus === 'number')
      bonus += rules.onWin.bonus;
    if (outcome === 'lose' && rules.onLose && typeof rules.onLose.bonus === 'number')
      bonus += rules.onLose.bonus;
    // Fire sessionEndPulse if rules.onLose.endsMashSession was triggered
    // (the lose outcome propagated all the way through any outcome status
    // phase). Host (KudosCta) listens and runs the save→burn→reset flow.
    const fireSessionEnd = outcome === 'lose'
      && rules.onLose && rules.onLose.endsMashSession;
    return {
      ...state,
      active: null,
      scheduleIndex: state.active.miniGameIdx + 1,
      bonusCount: Math.max(0, bonus),
      modeStatusOverride: null,
      modeSubStatus: null,
      sessionEndPulse: fireSessionEnd
        ? state.sessionEndPulse + 1
        : state.sessionEndPulse,
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

  return { ...state, resolved: r };
}
