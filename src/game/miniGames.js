// ─────────────────────────────────────────────────────────────────────────────
// Mini-game definitions — pure data. The director walks these timelines and
// the modes registry (./modes) supplies the play loops.
//
// To add a new mini-game: append an object below. Slot it at any cadence by
// editing startAtPress. To run a sequence back-to-back, list them in
// CANONICAL_SCHEDULE in the order you want them to fire (the director runs
// queue items in order — once one completes, the next starts immediately,
// regardless of its declared startAtPress).
// ─────────────────────────────────────────────────────────────────────────────

const FIRST_START = 50;

// ── 1. Golden Egg ─ tap flying golden eggs for bonus points ────────────────
export const GOLDEN_EGG = {
  id: 'golden-egg',
  label: 'Golden Egg',
  startAtPress: FIRST_START,
  rules: { canLose: false, onWin: { bonus: 0 }, onLose: { bonus: 0 } },
  ambient: { challengeText: 'frozen' },
  presentation: { accentColor: '#FFD700' },
  phases: [
    { kind: 'status',    text: 'GOLDEN EGG\nINCOMING',                  presses: 5 },
    { kind: 'status',    text: 'KEEP MASHING.',                         presses: 5 },
    { kind: 'status',    text: 'TAP THE GOLDEN EGG\nFOR EXTRA POINTS',  presses: 5 },
    { kind: 'countdown', from: 5,                                       presses: 5 },
    { kind: 'play',
      mode: 'goldenEgg',
      timeout: { kind: 'ms', value: 20000, outcome: 'win' },
      overrides: { mashing: 'normal', button: 'visible', gameClock: 'run' },
      ambient: { flyingEmojis: 'off', bubbleText: 'off', challengeText: 'frozen' },
      // Triple-size egg, 3× slower flight (was 54px / 1700–2300ms).
      config: { reward: 25, sizePx: 162, flightDurMs: [5100, 6900] },
    },
    { kind: 'status',
      text: ({ score }) => score > 0 ? `+${score} BONUS\nNICE TAPS.` : 'WHIFF.',
      presses: 5,
    },
  ],
};

// ── 2. Mash Gauntlet ─ threshold-or-die ────────────────────────────────────
// On fail, the mash session ends — the user is dropped into the existing
// save → burn → reset flow. The FAILED outcome status phase shows briefly
// (ms-timed so it always renders), then sessionEndPulse fires when the
// mini-game naturally completes.
export const MASH_GAUNTLET = {
  id: 'mash-gauntlet',
  label: 'Mash Gauntlet',
  startAtPress: FIRST_START,
  rules: {
    canLose: true,
    onWin: { bonus: +100 },
    onLose: { bonus: -30, endsMashSession: true },
  },
  ambient: { challengeText: 'frozen' },
  presentation: { accentColor: '#FF6B6B' },
  phases: [
    { kind: 'status', text: 'MASH GAUNTLET',                presses: 5 },
    { kind: 'status', text: 'MASH 25 IN 5 SECONDS\nOR DIE', presses: 8 },
    { kind: 'countdown', from: 3,                           presses: 3 },
    { kind: 'play',
      mode: 'thresholdMash',
      // Timeout = lose (failed to hit threshold in time). thresholdMash
      // calls endPhase('win', count) directly when target is reached, so
      // this only fires if the user didn't make it.
      timeout: { kind: 'ms', value: 5000, outcome: 'lose' },
      overrides: { mashing: 'normal', button: 'visible', gameClock: 'run' },
      ambient: { flyingEmojis: 'on', bubbleText: 'on', challengeText: 'frozen' },
      config: { target: 25 },
    },
    // Branched outcome status. WIN runs press-counted (5p). FAILED is
    // ms-timed (2s) so it shows even though the user might be panicking.
    { kind: 'status',
      text: ({ outcome, score }) => outcome === 'win'
        ? `${score} / 25\nSURVIVED. +100`
        : `${score || 0} / 25\nFAILED.`,
      // Both win and fail get a flash of feedback. Use ms so save-flow on
      // fail-out doesn't preempt the message before the user can read it.
      ms: 2000,
    },
  ],
};

// ── 3. Freeze ─ pause the world, penalize taps ─────────────────────────────
// rules.pauseMashGame: true pauses save-timer + canvas/heartbeat across the
// alert/instruction/countdown/play phases. The tail phases (UNFREEZE, START
// MASHING) explicitly OPT OUT via overrides.gameClock: 'run' so the world
// resumes — save timer re-arms and the user is auto-saved if idle.
//
// Heartbeat is suppressed at the mini-game level (ambient.heartbeat: 'off')
// so the about-to-burn animation doesn't run during freeze and confuse the
// user about whether they should be clicking.
export const FREEZE = {
  id: 'freeze',
  label: 'Freeze',
  startAtPress: FIRST_START,
  rules: {
    canLose: false,
    onWin: { bonus: 0 },
    onLose: { bonus: 0 },
    pauseMashGame: true,
  },
  ambient: {
    challengeText: 'frozen',
    heartbeat: 'off',         // kill the burn ring during intros + play
  },
  presentation: { accentColor: '#5FB3FF' },
  phases: [
    // Alert (auto-advances; no pressing required)
    { kind: 'status', text: 'FREEZE GAME\nCOMING UP', ms: 1500 },
    // Countdown — press-counted so the user paces it (5,4,3,2,1).
    { kind: 'countdown', from: 5, presses: 5 },
    // Play — "DON'T TOUCH" shows here, when the game actually starts.
    // doNotPress mode reads playStatus from config and pushes it to the
    // GameStatus zone via ctx.setStatus.
    { kind: 'play',
      mode: 'doNotPress',
      timeout: { kind: 'ms', value: 4000, outcome: 'win' },
      overrides: { mashing: 'inverted', button: 'visible', gameClock: 'paused' },
      ambient: {
        flyingEmojis: 'off', bubbleText: 'off',
        challengeText: 'frozen', heartbeat: 'off', flash: 'off',
      },
      config: { penaltyPerPress: 10, playStatus: "DON'T TOUCH" },
    },
    // Release the pause AND turn the heartbeat ring back on. Without the
    // explicit ambient.heartbeat: 'on' override, the mg-level 'off' would
    // leak through and the button would stay dead post-freeze.
    { kind: 'status', text: 'UNFREEZE',
      ms: 1200,
      overrides: { gameClock: 'run' },
      ambient: { heartbeat: 'on', flash: 'on' } },
    { kind: 'status', text: 'START MASHING',
      presses: 3,
      overrides: { gameClock: 'run' },
      ambient: { heartbeat: 'on', flash: 'on' } },
  ],
};

// ── 4. Twilight ─ tap shooting stars in a darkened night sky ───────────────
// The whole canvas turns into a near-uniform night-sky gradient during play
// while the mash button stays its normal color and fully interactable. White
// stars with glittery shooting-star tails streak across; tap them for +25.
// Bonus-only — canLose: false. The mode itself paints the sky takeover by
// overriding the #mash-canvas background and body background during play,
// then restores them on cleanup.
export const TWILIGHT = {
  id: 'twilight',
  label: 'Twilight',
  startAtPress: FIRST_START,
  rules: { canLose: false, onWin: { bonus: 0 }, onLose: { bonus: 0 } },
  ambient: { challengeText: 'frozen' },
  // No accentColor override — preserve the mash button's normal color.
  presentation: {},
  phases: [
    { kind: 'status',    text: 'TWILIGHT\nINCOMING',                 presses: 5 },
    { kind: 'status',    text: 'TAP THE STARS\nFOR BONUS POINTS',    presses: 5 },
    { kind: 'countdown', from: 5,                                    presses: 5 },
    { kind: 'play',
      mode: 'twilight',
      timeout: { kind: 'ms', value: 18000, outcome: 'win' },
      overrides: { mashing: 'normal', button: 'visible', gameClock: 'run' },
      ambient: { flyingEmojis: 'off', bubbleText: 'off', challengeText: 'frozen' },
      presentation: { bodyBackground: '#040515' },
    },
    // Outro — cheesy + on-brand + slightly rude one-liner. ms-timed (2.5s)
    // so it always shows even if the user freezes after the play window.
    { kind: 'status',
      text: ({ score }) => {
        const s = score || 0;
        if (s > 100) return "YOU'RE MY SHOOTING STAR. ALSO BLOCK ME ON STRAVA.";
        if (s > 50)  return 'DECENT TWINKLE. STILL SLOWER THAN YOUR LAST KOM.';
        if (s > 0)   return 'CAUGHT A FEW. NOT ENOUGH TO MATTER.';
        return 'ZERO STARS. EVEN THE NIGHT SKY GAVE UP ON YOU.';
      },
      ms: 2500,
    },
  ],
};

// ── Registry + canonical schedule ──────────────────────────────────────────
export const ALL_MINI_GAMES = [GOLDEN_EGG, MASH_GAUNTLET, FREEZE, TWILIGHT];

export function findById(id) {
  return ALL_MINI_GAMES.find((g) => g.id === id) || null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Schedule strategies
// ─────────────────────────────────────────────────────────────────────────────
// A strategy is a stateful object with .next(currentPressCount) → miniGameDef
// and .reset() → void. The store calls strategy.next() whenever its queue
// empties and pushes the result onto the queue. The director picks it up at
// its declared startAtPress and runs it. When the mini-game completes, the
// queue empties, the store calls .next() again, and the cycle continues.
//
// For "infinite scheduler" behavior: pool includes all mini-games; first
// yield is forced to `initial`; subsequent yields are random from the pool
// excluding the just-played mini-game (no repeats in a row).
export function createInfiniteSchedule({
  initial = GOLDEN_EGG,
  pool = ALL_MINI_GAMES,
  gapPresses = 15,
  startAtPress = 40,
} = {}) {
  let yieldedCount = 0;
  let lastId = null;
  return {
    next(currentPressCount) {
      let pick;
      if (yieldedCount === 0) {
        pick = initial;
      } else {
        const candidates = pool.filter((mg) => mg.id !== lastId);
        pick = candidates.length > 0
          ? candidates[Math.floor(Math.random() * candidates.length)]
          : pool[0];
      }
      lastId = pick.id;
      const startAt = yieldedCount === 0
        ? startAtPress
        : currentPressCount + gapPresses;
      yieldedCount++;
      return { ...pick, startAtPress: startAt };
    },
    reset() {
      yieldedCount = 0;
      lastId = null;
    },
  };
}

// Canonical default schedule: Golden Egg first at press 40, then random
// rotation through all 3 with 15-press gaps. No two in a row.
export function createDefaultInfiniteStrategy() {
  return createInfiniteSchedule({
    initial: GOLDEN_EGG,
    pool: ALL_MINI_GAMES,
    gapPresses: 15,
    startAtPress: 40,
  });
}
