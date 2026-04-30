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
      timeout: { kind: 'ms', value: 10000, outcome: 'win' },
      overrides: { mashing: 'normal', button: 'visible', gameClock: 'run' },
      ambient: { flyingEmojis: 'off', bubbleText: 'off', challengeText: 'frozen' },
      // Triple-size egg, flight 5% slower than prior tuning so it reads
      // across the screen. showTimer renders the top-left countdown.
      config: { reward: 25, sizePx: 162, flightDurMs: [4284, 5796], showTimer: true },
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
      config: { target: 25, showTimer: true },
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
  ambient: { challengeText: 'frozen' },
  // No accentColor override — preserve the mash button's normal color.
  presentation: {},
  phases: [
    { kind: 'status',    text: "SOMETHING'S BREWING…",               presses: 5 },
    { kind: 'status',    text: 'TAP THE BEERS\nKEEP MASHING',        presses: 5 },
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
        if (s > 100) return 'PERFECT POUR. CHEERS.';
        if (s > 50)  return 'DECENT FOAM. STILL THIRSTY?';
        if (s > 0)   return 'FOAMY. NOT GREAT.';
        return 'EMPTY GLASS. EMBARRASSING.';
      },
      ms: 2500,
    },
  ],
};

// ── 5. Pig Boy Attack ─ orbital pigs lock onto a draggable button ──────────
// First mini-game using the drag-and-hold input mechanic. The mash button
// becomes a draggable target — user holds and drags it to dodge pigs that
// fly in from the top, gravitate toward the button's current position, and
// orbit around it on a constant tangential thrust. Survive 20s for +250.
// Touching the button = lose. Mashing is paused throughout play (drag is the
// only input). Heartbeat off so the burn ring doesn't compete with the
// urgency of the dodge.
export const PIG_BOY_ATTACK = {
  id: 'pig-boy-attack',
  label: 'Pig Boy Attack',
  startAtPress: FIRST_START,
  rules: { canLose: true, onWin: { bonus: +75 }, onLose: { bonus: 0 } },
  // Heartbeat is killed only at the play phase (where mashing is paused
  // and the burn ring would be misleading). During intros + countdown +
  // outro the heartbeat fires normally so the user gets the usual press-
  // and-mash feedback.
  ambient: { challengeText: 'frozen' },
  presentation: { accentColor: '#FFB3D9' },
  input: { dragHold: 'on' },
  phases: [
    { kind: 'status',    text: 'PIG BOY ATTACK\nINCOMING',                 presses: 5 },
    { kind: 'status',    text: 'PROTECT THE GIRL\nDRAG HER TO SAFETY',     presses: 5 },
    { kind: 'countdown', from: 5,                                          presses: 5 },
    { kind: 'play',
      mode: 'pigDodge',
      timeout: { kind: 'ms', value: 10000, outcome: 'win' },
      overrides: { mashing: 'paused', button: 'draggable', gameClock: 'run' },
      ambient: { flyingEmojis: 'off', bubbleText: 'off', heartbeat: 'off', flash: 'off' },
      config: {
        pigSize: 40,
        // Slowed to ~1/3 of the prior values so motion reads on mobile and
        // orbital arcs are visible rather than blipping across the screen.
        // Tangential thrust is now strong relative to gravity so pigs orbit
        // longer before being pulled in.
        gravity: 280,
        thrust: 220,         // tangential weight — orbital feel
        maxSpeed: 320,
        spawnEveryMs: 1600,
        maxConcurrent: 3,
        initialSpawnCount: 2, // exactly 2 pigs at start, both from top
        showTimer: true,
        statusText: 'DODGE THE PIGS',
        // Avatar is the actual touch target (the mode attaches pointer
        // listeners directly to it). 40px visual; CSS padding extends the
        // hit area to ~72px square for finger-friendly dragging.
        avatar: { emoji: '👱‍♀️', sizePx: 40, pulse: true },
      },
    },
    // Branched outcome: win → "+75 SURVIVED. START MASHING.";
    // lose → "PIG BOY GOT YOU." Both ms-timed so the message is always
    // seen. Heartbeat + flash explicitly turned BACK ON here so the burn
    // ring resumes the moment the game ends — without this override, the
    // mg-level ambient could leak into the outcome phase.
    { kind: 'status',
      text: ({ outcome }) => outcome === 'win'
        ? '+75 SURVIVED.\nSTART MASHING.'
        : 'PIG BOY GOT YOU.',
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
  rules: { canLose: true, onWin: { bonus: 0 }, onLose: { bonus: 0 } },
  // Heartbeat killed only at the play phase. During intros / countdown /
  // outro the heartbeat fires so the user knows to keep mashing.
  ambient: { challengeText: 'frozen' },
  presentation: { accentColor: '#E8FF6B' },
  input: { dragHold: 'on' },
  phases: [
    { kind: 'status',    text: 'PONG',                                 presses: 5 },
    { kind: 'status',    text: 'KEEP THE BALL ALIVE\nWITH THE BUTTON', presses: 5 },
    { kind: 'countdown', from: 5,                                      presses: 5 },
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
    { kind: 'status',
      text: ({ outcome, score }) => outcome === 'win'
        ? `${score || 0} HITS. NICE.`
        : `MISSED IT.\n${score || 0} HITS.`,
      ms: 2400,
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
  ambient: { challengeText: 'frozen' },
  phases: [
    { kind: 'status',
      text: 'MINI GAMES APPROACHING\nDON\'T STOP MASHING THE BUTTON',
      presses: 5,
    },
  ],
};

// ── Registry + canonical schedule ──────────────────────────────────────────
// PREAMBLE is intentionally NOT in this list — it's strategy-only.
export const ALL_MINI_GAMES = [GOLDEN_EGG, MASH_GAUNTLET, TWILIGHT, PIG_BOY_ATTACK, PONG];

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
//   mash-gauntlet  → target += 2 * playCount         (25 → 27 → 29 → …)
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
        cfg.target = baseTarget + 2 * playCount;
        break;
      }
      case 'pig-boy-attack': {
        const baseConc = typeof cfg.maxConcurrent === 'number' ? cfg.maxConcurrent : 3;
        cfg.maxConcurrent = baseConc + 2 * playCount;
        // initialSpawnCount tracks the rule "concurrent pigs" 2 → 4 → 6 → …
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
    return { ...phase, config: cfg };
  });
  return { ...mg, phases };
}

export function createInfiniteSchedule({
  preamble = PREAMBLE,
  pool = ALL_MINI_GAMES,
  gapPresses = GAP_PRESSES,
  warningAtPress = WARNING_AT_PRESS,
  firstGameAtPress = FIRST_GAME_AT,
} = {}) {
  let yieldedCount = 0;
  let lastId = null;
  const playCounts = new Map();
  return {
    next(currentPressCount /* , currentSessionMs */) {
      let pick;
      let startAt;
      if (yieldedCount === 0) {
        pick = preamble;
        startAt = warningAtPress;
      } else if (yieldedCount === 1) {
        // First real mini-game at the firstGameAtPress click.
        const candidates = pool.filter((mg) => mg.id !== lastId);
        pick = candidates.length > 0
          ? candidates[Math.floor(Math.random() * candidates.length)]
          : pool[0];
        startAt = firstGameAtPress;
      } else {
        // Subsequent: random, no repeats, gap from current press count.
        const candidates = pool.filter((mg) => mg.id !== lastId);
        pick = candidates.length > 0
          ? candidates[Math.floor(Math.random() * candidates.length)]
          : pool[0];
        startAt = currentPressCount + gapPresses;
      }
      lastId = pick.id;
      const isPreamble = yieldedCount === 0;
      yieldedCount++;
      if (isPreamble) {
        // Preamble has no play phase / no difficulty — skip scaling + log.
        return { ...pick, startAtPress: startAt };
      }
      const playCount = playCounts.get(pick.id) || 0;
      playCounts.set(pick.id, playCount + 1);
      const scaled = scaleDifficulty(pick, playCount);
      console.log(`[mg] strategy yields "${pick.id}" startAtPress=${startAt} playCount=${playCount} (scaled)`);
      return { ...scaled, startAtPress: startAt };
    },
    reset() {
      yieldedCount = 0;
      lastId = null;
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
