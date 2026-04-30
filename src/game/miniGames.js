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
  ambient: { challengeText: 'frozen', bubbleText: 'off' },
  presentation: { accentColor: '#FFD700' },
  backgroundMusic: {
    filePath: '/audio/minigames/golden-egg.mp3',
    volume: 0.7,
  },
  phases: [
    { kind: 'status',    text: 'GOLDEN EGG',                            presses: 5 },
    { kind: 'status',    text: 'TAP THE GOLDEN EGG\nBUT KEEP MASHING',  presses: 5 },
    { kind: 'play',
      mode: 'goldenEgg',
      timeout: { kind: 'ms', value: 10000, outcome: 'win' },
      overrides: { mashing: 'normal', button: 'visible', gameClock: 'run' },
      ambient: { flyingEmojis: 'off', bubbleText: 'off', challengeText: 'frozen' },
      // Triple-size egg, flight 5% slower than prior tuning so it reads
      // across the screen. showTimer renders the top-left countdown.
      config: { reward: 25, sizePx: 162, flightDurMs: [4284, 5796], showTimer: true },
    },
    { kind: 'status',
      text: 'GOOD JOB',
      ms: 2500,
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
  ambient: { challengeText: 'frozen', bubbleText: 'off' },
  presentation: { accentColor: '#FF6B6B' },
  backgroundMusic: {
    filePath: '/audio/minigames/mash-gauntlet.mp3',
    volume: 0.7,
  },
  phases: [
    { kind: 'status', text: 'MASH GAUNTLET',                presses: 5 },
    { kind: 'status', text: 'MASH FAST OR DIE\n5 SECONDS',  presses: 5 },
    { kind: 'play',
      mode: 'thresholdMash',
      // Timeout = lose (failed to hit threshold in time). thresholdMash
      // calls endPhase('win', count) directly when target is reached, so
      // this only fires if the user didn't make it.
      timeout: { kind: 'ms', value: 5000, outcome: 'lose' },
      overrides: { mashing: 'normal', button: 'visible', gameClock: 'run' },
      ambient: { flyingEmojis: 'on', bubbleText: 'on', challengeText: 'frozen' },
      config: { target: 25, showTimer: true },
    },
    // Branched outcome status. WIN runs press-counted (5p). FAILED is
    // ms-timed (2s) so it shows even though the user might be panicking.
    { kind: 'status',
      text: ({ outcome }) => outcome === 'win'
        ? `YOU SURVIVED.\n+100`
        : `FAILED.`,
      // Both win and fail get a flash of feedback. Use ms so save-flow on
      // fail-out doesn't preempt the message before the user can read it.
      ms: 2500,
    },
  ],
};

// ── (removed: Freeze mini-game — feature deleted) ──────────────────────────
// The Freeze mini-game and its `doNotPress` mode have been removed. If you
// need the "pause the world / penalize taps" pattern back, the building
// blocks are still in the schema:
//   - rules.pauseMashGame: true
//   - phase.overrides.mashing: 'inverted'
//   - phase.overrides.gameClock: 'paused' / 'run'
//   - phase.ambient.heartbeat / flash overrides

// ── 4. Twilight ─ tap floating beers in a darkened night sky ───────────────
// The whole canvas turns into a near-uniform night-sky gradient during play
// while the mash button stays its normal color and fully interactable. Beer
// mugs with warm amber foam trails float across; tap them for +25.
// Bonus-only — canLose: false. The mode itself paints the sky takeover by
// overriding the #mash-canvas background and body background during play,
// then restores them on cleanup.
export const TWILIGHT = {
  id: 'twilight',
  label: 'Twilight',
  startAtPress: FIRST_START,
  rules: { canLose: false, onWin: { bonus: 0 }, onLose: { bonus: 0 } },
  ambient: { challengeText: 'frozen', bubbleText: 'off' },
  // No accentColor override — preserve the mash button's normal color.
  presentation: {},
  backgroundMusic: {
    filePath: '/audio/minigames/twilight.mp3',
    volume: 0.7,
  },
  phases: [
    { kind: 'status',    text: 'COLD BEERS',                         presses: 5 },
    { kind: 'status',    text: 'TAP THE BEERS\nKEEP MASHING',        presses: 5 },
    { kind: 'play',
      mode: 'twilight',
      timeout: { kind: 'ms', value: 10000, outcome: 'win' },
      overrides: { mashing: 'normal', button: 'visible', gameClock: 'run' },
      ambient: { flyingEmojis: 'off', bubbleText: 'off', challengeText: 'frozen' },
      presentation: { bodyBackground: '#040515' },
      config: { showTimer: true },
    },
    // Outro — ms-timed (2.5s) so it always shows even if the user freezes
    // after the play window.
    { kind: 'status',
      text: 'WELL DONE.',
      ms: 2500,
    },
  ],
};

// ── 5. Dodge the Obstacles ─ randomly-selected vehicles threaten a draggable biker ──────────
// The biker (avatar) is draggable — user holds and drags to dodge obstacles
// (randomly selected from car/truck emojis) that spawn from the top, gravitate
// toward the biker's position, and orbit with tangential thrust. Survive 10s
// for +75. Touching the biker = lose. Mashing is paused (drag is the only input).
// Heartbeat off so the burn ring doesn't compete with dodge urgency.
export const DODGE = {
  id: 'dodge',
  label: 'Dodge',
  startAtPress: FIRST_START,
  rules: { canLose: true, onWin: { bonus: +75 }, onLose: { bonus: 0, endsMashSession: true } },
  ambient: { challengeText: 'frozen', bubbleText: 'off' },
  presentation: { accentColor: '#FFB3D9' },
  input: { dragHold: 'on' },
  backgroundMusic: {
    filePath: '/audio/minigames/dodge.mp3',
    volume: 0.7,
  },
  phases: [
    { kind: 'status',    text: 'DODGE\nINCOMING',                          presses: 5 },
    { kind: 'status',    text: 'PROTECT THE BIKER\nDRAG TO SAFETY',        presses: 5 },
    { kind: 'play',
      mode: 'pigDodge',
      timeout: { kind: 'ms', value: 10000, outcome: 'win' },
      overrides: { mashing: 'paused', button: 'draggable', gameClock: 'run' },
      ambient: { flyingEmojis: 'off', bubbleText: 'off', heartbeat: 'off', flash: 'off' },
      config: {
        obstacleSize: 40,
        gravity: 280,
        thrust: 220,
        maxSpeed: 320,
        spawnEveryMs: 1600,
        maxConcurrent: 3,
        initialSpawnCount: 2,
        showTimer: true,
        statusText: 'DODGE THE CARS',
        obstacleEmojis: ['🚗', '🚕', '🚙', '🚚', '🏎️'],
        avatar: { emoji: '🚴🏿‍♀️', sizePx: 44, pulse: true },
      },
    },
    { kind: 'status',
      text: ({ outcome }) => outcome === 'win'
        ? '+75 SURVIVED.\nSTART MASHING.'
        : 'FAILURE.',
      ms: 2400,
      ambient: { heartbeat: 'on', flash: 'on' },
    },
  ],
};

// ── 6. Pong ─ single-player wall-bounce; paddle = the draggable button ────
// Ball bounces off top/left/right walls. The bottom is the player's goal:
// intercept with the paddle (the mash button) for +1 hit and a 10% speed
// boost; miss and the game ends. Score = number of paddle hits, mirrored
// to bonusCount via awardBonus(25) per hit. Survive 10s for a win outcome.
// Mashing is paused (drag is the only input) and ambient noise is muted so
// the ball reads cleanly.
export const PONG = {
  id: 'pong',
  label: 'Pong',
  startAtPress: FIRST_START,
  rules: { canLose: true, onWin: { bonus: 0 }, onLose: { bonus: 0, endsMashSession: true } },
  // Heartbeat killed only at the play phase. During intros / countdown /
  // outro the heartbeat fires so the user knows to keep mashing.
  ambient: { challengeText: 'frozen', bubbleText: 'off' },
  presentation: { accentColor: '#E8FF6B' },
  input: { dragHold: 'on' },
  backgroundMusic: {
    filePath: '/audio/minigames/pong.mp3',
    volume: 0.7,
  },
  phases: [
    { kind: 'status',    text: 'PONG',                                 presses: 5 },
    { kind: 'status',    text: 'KEEP THE BALL ALIVE\nWITH THE BUTTON', presses: 5 },
    { kind: 'play',
      mode: 'pong',
      timeout: { kind: 'ms', value: 10000, outcome: 'win' },
      // dragAxis: 'horizontal' = the paddle (button) is locked to its
      // anchored Y, can only slide left/right, and gets viewport-clamped
      // so it never goes off-screen.
      overrides: {
        mashing: 'paused',
        button: 'draggable',
        gameClock: 'run',
        dragAxis: 'horizontal',
      },
      ambient: { flyingEmojis: 'off', bubbleText: 'off', heartbeat: 'off', flash: 'off' },
      config: { showTimer: true },
    },
    // Branched outcome status. Score is the running paddle-hit count.
    // Explicitly re-enable heartbeat + flash (were off during play phase).
    { kind: 'status',
      text: ({ outcome, score }) => outcome === 'win'
        ? `${score || 0} HITS. NICE.`
        : 'FAILURE.',
      ms: 2400,
      ambient: { heartbeat: 'on', flash: 'on' },
    },
  ],
};

// ── Preamble ─ shows BEFORE the first real mini-game ──────────────────────
// Press-counted: appears at click 25, runs for 5 presses, exits at click 30
// when the first real (random) mini-game activates. Not in the random pool.
export const PREAMBLE = {
  id: 'preamble',
  label: 'Preamble',
  startAtPress: 25,
  rules: { canLose: false, onWin: { bonus: 0 }, onLose: { bonus: 0 } },
  ambient: { challengeText: 'frozen', bubbleText: 'off' },
  phases: [
    { kind: 'status',
      text: 'MINI GAMES APPROACHING\nDON\'T STOP MASHING THE BUTTON',
      presses: 5,
    },
  ],
};

// ── Registry + canonical schedule ──────────────────────────────────────────
// PREAMBLE is intentionally NOT in this list — it's strategy-only.
export const ALL_MINI_GAMES = [GOLDEN_EGG, MASH_GAUNTLET, TWILIGHT, DODGE, PONG];

export function findById(id) {
  return ALL_MINI_GAMES.find((g) => g.id === id) || null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Schedule strategies
// ─────────────────────────────────────────────────────────────────────────────
// A strategy is a stateful object with .next() → miniGameDef and .reset() →
// void. The store calls strategy.next() whenever its queue empties and pushes
// the result onto the queue. The director activates each item once BOTH its
// `startAtPress` and (if set) its `startAtMs` gates clear.
//
// Press-count gates:
//   - WARNING_AT_PRESS = 25 → preamble appears (5-press warning)
//   - FIRST_GAME_AT    = 30 → first real mini-game starts at click 30
//   - GAP_PRESSES      = 10 → click gap between games (between prior end
//                              and next start)
//
// Yield order:
//   1. PREAMBLE — startAtPress: 25, runs 5 presses (warning visible 25–29).
//   2. First real mini-game — random from pool, startAtPress: 30.
//   3+ Subsequent — random, no repeats, startAtPress: prevEnd + GAP_PRESSES.
const WARNING_AT_PRESS = 25;
const FIRST_GAME_AT    = 30;
const GAP_PRESSES      = 10;

// ── Session-scoped difficulty progression ──────────────────────────────────
// Each time a mini-game runs in the current session, the NEXT time the same
// mini-game appears it gets harder. playCount is 0 for the first play of a
// session, 1 for the second, etc. Scaling formula: factor = base × mult^playCount.
// Counters are in-memory only and reset() is called when the session ends.
//
// Per-id rules (all multiplicative on top of the canonical config so existing
// tuning is preserved at playCount=0):
//   golden-egg     → flightDurMs × 0.95^playCount    (5% faster each play)
//   twilight       → speedMult   = 1.05^playCount    (5% faster each play)
//   mash-gauntlet  → target += 5 * playCount         (25 → 30 → 35 → …)
//   pig-boy-attack → maxConcurrent += 2 * playCount  (initialSpawnCount mirrors)
//   pong           → baseSpeedMult = 1.10^playCount  (10% faster each play)
//
// Returns a NEW mini-game object — the canonical exports are not mutated.
function scaleDifficulty(mg, playCount) {
  if (!playCount || playCount <= 0) return mg;
  // Find the play phase (only one per mini-game in the current schema).
  const phases = mg.phases.map((phase) => {
    if (phase.kind !== 'play') return phase;
    const cfg = { ...(phase.config || {}) };
    switch (mg.id) {
      case 'golden-egg': {
        // flightDurMs is [min, max] in ms — multiply both by 0.95^playCount.
        const factor = Math.pow(0.95, playCount);
        if (Array.isArray(cfg.flightDurMs)) {
          cfg.flightDurMs = [
            Math.max(50, Math.round(cfg.flightDurMs[0] * factor)),
            Math.max(50, Math.round(cfg.flightDurMs[1] * factor)),
          ];
        }
        break;
      }
      case 'twilight': {
        cfg.speedMult = Math.pow(1.05, playCount);
        break;
      }
      case 'mash-gauntlet': {
        const baseTarget = typeof cfg.target === 'number' ? cfg.target : 25;
        cfg.target = baseTarget + 5 * playCount;
        break;
      }
      case 'dodge': {
        const baseConc = typeof cfg.maxConcurrent === 'number' ? cfg.maxConcurrent : 3;
        cfg.maxConcurrent = baseConc + 2 * playCount;
        // initialSpawnCount tracks the rule "concurrent obstacles" 2 → 4 → 6 → …
        const baseInit = typeof cfg.initialSpawnCount === 'number' ? cfg.initialSpawnCount : 2;
        cfg.initialSpawnCount = baseInit + 2 * playCount;
        break;
      }
      case 'pong': {
        cfg.baseSpeedMult = Math.pow(1.10, playCount);
        break;
      }
      default:
        break;
    }
    // Dodge and Pong grow 5 seconds longer each lap — more obstacles / faster
    // ball need more screen time to stay fair.
    const BASE_TIMEOUT_MS = phase.timeout && phase.timeout.value ? phase.timeout.value : 10000;
    const scaledTimeout = (mg.id === 'dodge' || mg.id === 'pong')
      ? { ...phase.timeout, value: BASE_TIMEOUT_MS + 5000 * playCount }
      : phase.timeout;
    return { ...phase, config: cfg, timeout: scaledTimeout };
  });
  return { ...mg, phases };
}

// Fisher-Yates shuffle — returns a new shuffled array, does not mutate input.
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createInfiniteSchedule({
  preamble = PREAMBLE,
  pool = ALL_MINI_GAMES,
  gapPresses = GAP_PRESSES,
  warningAtPress = WARNING_AT_PRESS,
  firstGameAtPress = FIRST_GAME_AT,
} = {}) {
  let yieldedCount = 0;
  const playCounts = new Map();

  // Shuffle-bag: every game in the pool is dealt once before any repeats.
  // When the bag empties it is reshuffled — each lap is a different random
  // order, but every game appears exactly once per lap.
  let bag = [];
  const pickFromPool = () => {
    if (bag.length === 0) bag = shuffleArray(pool);
    return bag.pop();
  };

  return {
    next(currentPressCount /* , currentSessionMs */) {
      let pick;
      let startAt;
      if (yieldedCount === 0) {
        pick = preamble;
        startAt = warningAtPress;
      } else if (yieldedCount === 1) {
        pick = pickFromPool();
        startAt = firstGameAtPress;
      } else {
        pick = pickFromPool();
        startAt = currentPressCount + gapPresses;
      }
      yieldedCount++;
      if (yieldedCount === 1) {
        // Preamble has no play phase / no difficulty — skip scaling + log.
        return { ...pick, startAtPress: startAt };
      }
      const playCount = playCounts.get(pick.id) || 0;
      playCounts.set(pick.id, playCount + 1);
      const scaled = scaleDifficulty(pick, playCount);
      return { ...scaled, startAtPress: startAt };
    },
    reset() {
      yieldedCount = 0;
      bag = [];
      playCounts.clear();
    },
  };
}

// Canonical default: 25-press warning, 30-press first game, 12-press gaps.
export function createDefaultInfiniteStrategy() {
  return createInfiniteSchedule({
    preamble: PREAMBLE,
    pool: ALL_MINI_GAMES,
    gapPresses: GAP_PRESSES,
    warningAtPress: WARNING_AT_PRESS,
    firstGameAtPress: FIRST_GAME_AT,
  });
}
