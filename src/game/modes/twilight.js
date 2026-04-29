// ─────────────────────────────────────────────────────────────────────────────
// twilight — the sky takes over. White stars with glittery shooting-star tails
// streak across a darkened night-sky canvas. Tap stars for +reward bonus.
// At least 5 stars on screen at any time; respawn immediately on hit/exit.
// Mash button stays interactable (mashing: 'normal'). Bonus-only — no fail.
//
// Trajectory mirrors goldenEgg: parabolic arc spawn off-screen → apex inside
// playable rectangle → exit other side. Faster (2×) and smaller (½) than the
// golden egg. Concurrent spawns; initial burst of 5 staggered ~150ms apart.
// ─────────────────────────────────────────────────────────────────────────────

const MIN_CONCURRENT = 5;
const STAGGER_MS = 150;
const REWARD = 25;
const SIZE_PX = 81;          // half of golden egg's 162px
// Halved (was 2550–3450). Stars now match golden-egg flight duration so
// they feel readable on desktop without losing their streak quality.
const FLIGHT_MIN = 5100;
const FLIGHT_MAX = 6900;

// Dark night-sky gradient that overrides the canvas during play.
const SKY_GRADIENT =
  'radial-gradient(circle at 50% 50%, #1a1a3a 0%, #050518 70%, #000 100%)';
const SKY_BODY_BG = '#040515';

const twilight = {
  id: 'twilight',
  start(ctx) {
    let cancelled = false;
    let totalScore = 0;
    let spawnedCount = 0;
    let hitCount = 0;
    const inFlight = new Set();
    const staggerTimers = [];
    let endTimer = null;

    console.log(
      `[mg] mode twilight start | reward=${REWARD} size=${SIZE_PX}px ` +
      `flight=${FLIGHT_MIN}-${FLIGHT_MAX}ms minConcurrent=${MIN_CONCURRENT} ` +
      `timeout=${ctx.timeoutMs}ms`
    );

    // ── Sky takeover ────────────────────────────────────────────────────────
    // Save existing inline styles so we can restore on cleanup.
    const prevBodyBg = document.body.style.background;
    const canvas = document.getElementById('mash-canvas');
    const prevCanvasBg = canvas ? canvas.style.background : '';
    document.body.style.background = SKY_BODY_BG;
    if (canvas) {
      canvas.style.background = SKY_GRADIENT;
    }

    function rand(min, max) {
      return min + Math.random() * (max - min);
    }

    function spawn() {
      if (cancelled) return;
      spawnedCount++;
      const idx = spawnedCount;
      console.log(`[mg] twilight spawn #${idx}`);

      const vp = { w: window.innerWidth, h: window.innerHeight };
      const fromLeft = Math.random() < 0.5;
      const startX = fromLeft ? -80 : vp.w + 80;
      const startY = vp.h * (0.50 + Math.random() * 0.25);
      // Apex constrained to playable rect (15–85% w, 18–55% h).
      const apexX = vp.w * (0.15 + Math.random() * 0.70);
      const apexY = vp.h * (0.18 + Math.random() * 0.37);
      const endX = fromLeft ? vp.w + 80 : -80;
      const endY = vp.h * (0.55 + Math.random() * 0.25);
      const dur = rand(FLIGHT_MIN, FLIGHT_MAX);

      // Tail offset direction: tail trails BEHIND the direction of motion.
      // fromLeft → moving right → tail extends to the LEFT (negative x).
      // fromRight → moving left → tail extends to the RIGHT (positive x).
      const sgn = fromLeft ? -1 : 1;
      const tailA = `drop-shadow(${sgn * 12}px 0 8px rgba(255,255,255,0.9))`;
      const tailB = `drop-shadow(${sgn * 24}px 0 14px rgba(180,210,255,0.6))`;
      const tailC = `drop-shadow(${sgn * 40}px 0 22px rgba(120,150,255,0.3))`;
      const tailD = `drop-shadow(${sgn * 60}px 0 30px rgba(180,200,255,0.15))`;
      const baseFilter = `${tailA} ${tailB} ${tailC} ${tailD}`;
      // Brighter shimmer keyframe for the glitter flicker.
      const shimmerA = `drop-shadow(${sgn * 14}px 0 10px rgba(255,255,255,1)) ` +
                       `drop-shadow(${sgn * 28}px 0 18px rgba(220,235,255,0.85)) ` +
                       `drop-shadow(${sgn * 46}px 0 28px rgba(160,190,255,0.55)) ` +
                       `drop-shadow(${sgn * 70}px 0 36px rgba(200,220,255,0.3))`;

      const star = document.createElement('div');
      star.className = 'flying-twilight-star';
      star.textContent = '⭐';
      star.style.cssText = [
        'position:fixed', 'pointer-events:auto', 'cursor:pointer',
        'z-index:9100',
        `font-size:${SIZE_PX}px`,
        'will-change:transform,opacity,filter',
        `left:${startX}px`, `top:${startY}px`,
        'transform:translate(-50%,-50%)',
        'user-select:none', '-webkit-user-select:none', 'touch-action:manipulation',
        `filter:${baseFilter}`,
      ].join(';') + ';';
      document.body.appendChild(star);

      // Glittery shimmer — flicker the drop-shadow chain continuously.
      const shimmer = star.animate(
        [
          { filter: `${baseFilter} brightness(1.0)` },
          { filter: `${shimmerA} brightness(1.4)` },
          { filter: `${baseFilter} brightness(1.0)` },
        ],
        { duration: 380, iterations: Infinity, easing: 'ease-in-out' }
      );

      // Parabolic flight: start → apex → end with mild rotation for sparkle.
      const flight = star.animate(
        [
          { transform: 'translate(-50%,-50%) rotate(0deg)',
            offset: 0,   left: `${startX}px`, top: `${startY}px` },
          { transform: 'translate(-50%,-50%) rotate(120deg)',
            offset: 0.5, left: `${apexX}px`,  top: `${apexY}px` },
          { transform: 'translate(-50%,-50%) rotate(240deg)',
            offset: 1.0, left: `${endX}px`,   top: `${endY}px` },
        ],
        { duration: dur, easing: 'cubic-bezier(.42,.0,.58,1)', fill: 'forwards' }
      );

      let claimed = false;

      function cleanupStar() {
        try { shimmer.cancel(); } catch (_) {}
        try { flight.cancel(); } catch (_) {}
        if (star.parentNode) star.remove();
        inFlight.delete(handle);
      }

      const handle = { cleanupStar };
      inFlight.add(handle);

      flight.onfinish = () => {
        if (claimed || cancelled) return;
        cleanupStar();
        // Top up so we always have >= MIN_CONCURRENT live stars.
        scheduleNext();
      };

      const onTap = (e) => {
        if (claimed || cancelled) return;
        e.stopPropagation();
        e.preventDefault();
        claimed = true;
        const rect = star.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        totalScore += REWARD;
        hitCount++;
        console.log(`[mg] twilight HIT #${hitCount} +${REWARD} | total=${totalScore}`);
        ctx.awardBonus(REWARD, { x: cx, y: cy });
        spawnRipple(cx, cy);
        cleanupStar();
        scheduleNext();
      };
      star.addEventListener('click', onTap, { once: true });
    }

    // Top up to MIN_CONCURRENT immediately. Used after a tap/exit.
    function scheduleNext() {
      if (cancelled) return;
      // Spawn enough to refill to MIN_CONCURRENT. Usually just 1.
      const deficit = Math.max(0, MIN_CONCURRENT - inFlight.size);
      for (let i = 0; i < deficit; i++) spawn();
    }

    // White / silver ripple — radial gradient, white core, bluish-silver fade.
    function spawnRipple(x, y) {
      const r = document.createElement('div');
      r.style.cssText = [
        'position:fixed', 'pointer-events:none', 'z-index:9099',
        `left:${x}px`, `top:${y}px`,
        'width:14px', 'height:14px', 'border-radius:50%',
        'transform:translate(-50%,-50%)',
        'background:radial-gradient(circle, rgba(255,255,255,0.95) 0%, ' +
          'rgba(220,235,255,0.7) 35%, rgba(160,190,255,0.35) 65%, transparent 85%)',
      ].join(';') + ';';
      document.body.appendChild(r);
      r.animate(
        [
          { transform: 'translate(-50%,-50%) scale(0.4)', opacity: 1, offset: 0 },
          { transform: 'translate(-50%,-50%) scale(9)',   opacity: 0, offset: 1 },
        ],
        { duration: 650, easing: 'ease-out', fill: 'forwards' }
      ).onfinish = () => { if (r.parentNode) r.remove(); };
    }

    // ── Self-driven endPhase ────────────────────────────────────────────────
    // Beat the director's hard timeout by a hair so we can communicate the
    // final score to the outro phase. The director's timeout would otherwise
    // call endPhase('win', null) and the outro's score branching would fall
    // through to the zero-stars line. ctx.endPhase is idempotent — if the
    // hard timeout still wins the race, no harm done.
    if (Number.isFinite(ctx.timeoutMs)) {
      endTimer = setTimeout(() => {
        endTimer = null;
        if (cancelled) return;
        ctx.endPhase('win', totalScore);
      }, Math.max(0, ctx.timeoutMs - 80));
    }

    // ── Initial burst: spawn 5 staggered ~150ms apart ───────────────────────
    ctx.setSubStatus('TAP THE STARS');
    const burst = () => { if (!cancelled) spawn(); };
    for (let i = 0; i < MIN_CONCURRENT; i++) {
      staggerTimers.push(setTimeout(burst, i * STAGGER_MS));
    }

    // ── Cleanup on phase exit ───────────────────────────────────────────────
    return () => {
      cancelled = true;
      if (endTimer) { clearTimeout(endTimer); endTimer = null; }
      staggerTimers.forEach((t) => clearTimeout(t));
      // Despawn all in-flight stars.
      Array.from(inFlight).forEach((h) => h.cleanupStar());
      inFlight.clear();
      // Restore canvas + body bg.
      document.body.style.background = prevBodyBg || '';
      const c = document.getElementById('mash-canvas');
      if (c) c.style.background = prevCanvasBg || '';
      ctx.setSubStatus(null);
      console.log(
        `[mg] twilight cleanup | hits=${hitCount}/${spawnedCount} totalScore=${totalScore}`
      );
      // No endPhase here — the director's hard timeout (outcome='win') already
      // fires per the configured timeout.outcome. Calling endPhase from cleanup
      // would cause double-dispatch (see goldenEgg's note on this).
    };
  },
};

export default twilight;
