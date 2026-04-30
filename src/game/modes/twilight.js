// ─────────────────────────────────────────────────────────────────────────────
// twilight — the sky takes over. Floating beer mugs with warm amber foam tails
// streak across a darkened night-sky canvas. Tap beers for +reward bonus.
// At least 5 beers on screen at any time; respawn immediately on hit/exit.
// Mash button stays interactable (mashing: 'normal'). Bonus-only — no fail.
//
// Movement is a manual rAF physics loop (not WAAPI keyframes) so each star
// can:
//   - spawn from any of the four viewport edges, aiming generally toward
//     the playable interior, with random spread.
//   - steer mid-flight: every 0.6–2.0s, perturb the current heading by
//     up to ±90° so flights aren't predictable straight lines.
//   - burst: every ~2–3.5s, hit 1.5× base speed for 500ms (also brightens
//     the shimmer briefly so the burst is visible).
// ─────────────────────────────────────────────────────────────────────────────

const MIN_CONCURRENT = 5;
const STAGGER_MS = 150;
const REWARD = 25;
const SIZE_PX = 69;          // 15% smaller (was 81)

// Base speed in viewport-px / second. With a 600–1000px viewport this
// gives a star ~3–6s of total time on screen; matches the old WAAPI feel.
const BASE_SPEED_MIN = 180;
const BASE_SPEED_MAX = 240;
const BURST_MULT = 1.5;
const BURST_DURATION_MS = 500;
const BURST_COOLDOWN_MS = [2000, 3500];   // next-burst delay after a burst ends
const TURN_INTERVAL_MS = [600, 2000];     // how often a steering kick fires
const TURN_MAX_RAD = Math.PI / 2;         // up to ±90° per kick
const SPAWN_MARGIN = 80;                  // how far off-edge to spawn
const DESPAWN_MARGIN = 220;               // off-screen tolerance before reaping

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
    // Session-scoped difficulty: 1.0 default; 1.05^playCount per session.
    const speedMult = (ctx.config && typeof ctx.config.speedMult === 'number')
      ? ctx.config.speedMult
      : 1.0;
    const inFlight = new Set();
    const staggerTimers = [];
    let endTimer = null;
    let rafId = 0;
    let lastTime = performance.now();

    console.log(
      `[mg] mode twilight start | reward=${REWARD} size=${SIZE_PX}px ` +
      `baseSpeed=${BASE_SPEED_MIN}-${BASE_SPEED_MAX}px/s burst=${BURST_MULT}× for ${BURST_DURATION_MS}ms ` +
      `minConcurrent=${MIN_CONCURRENT} timeout=${ctx.timeoutMs}ms`
    );

    const prevBodyBg = document.body.style.background;
    const canvas = document.getElementById('mash-canvas');
    const prevCanvasBg = canvas ? canvas.style.background : '';
    document.body.style.background = SKY_BODY_BG;
    if (canvas) canvas.style.background = SKY_GRADIENT;

    function rand(min, max) { return min + Math.random() * (max - min); }

    // Pick a spawn edge + initial heading aimed roughly at the playable
    // interior of the viewport. Returns position, initial unit-vector
    // direction, and the edge tag (used only for logging).
    function makeSpawn() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const edges = ['top', 'bottom', 'left', 'right'];
      const edge = edges[Math.floor(Math.random() * edges.length)];
      let x, y, aimX, aimY;
      // Aim point inside a "playable rect" so initial trajectory crosses
      // the visible area rather than skimming the edge.
      aimX = vw * (0.20 + Math.random() * 0.60);
      aimY = vh * (0.20 + Math.random() * 0.55);
      switch (edge) {
        case 'top':
          x = Math.random() * vw;
          y = -SPAWN_MARGIN;
          break;
        case 'bottom':
          x = Math.random() * vw;
          y = vh + SPAWN_MARGIN;
          break;
        case 'left':
          x = -SPAWN_MARGIN;
          y = vh * (0.20 + Math.random() * 0.60);
          break;
        case 'right':
        default:
          x = vw + SPAWN_MARGIN;
          y = vh * (0.20 + Math.random() * 0.60);
          break;
      }
      const dx = aimX - x;
      const dy = aimY - y;
      // Add ±25° spread so stars aren't bee-lining the same target.
      const baseAngle = Math.atan2(dy, dx);
      const spread = (Math.random() - 0.5) * (Math.PI / 3.5);
      const angle = baseAngle + spread;
      return { x, y, dirX: Math.cos(angle), dirY: Math.sin(angle), edge };
    }

    function spawn() {
      if (cancelled) return;
      spawnedCount++;
      const idx = spawnedCount;

      const { x, y, dirX, dirY, edge } = makeSpawn();
      const baseSpeed = rand(BASE_SPEED_MIN, BASE_SPEED_MAX) * speedMult;
      console.log(`[mg] twilight spawn #${idx} edge=${edge} baseSpeed=${baseSpeed.toFixed(0)}px/s mult=${speedMult.toFixed(2)}`);

      const star = document.createElement('div');
      star.className = 'flying-twilight-star';
      star.textContent = '🍺';
      // Compute initial transform BEFORE append so the element never paints
      // a frame at (0,0). Previously the manual-loop version baked
      // `left:0; top:0` into cssText and relied on the next rAF tick to
      // write the real transform, which on mobile produced a brief
      // flashing artifact in the upper-left corner. Setting transform
      // pre-append eliminates that 1-frame paint.
      const initialTransform =
        `translate(${(x - SIZE_PX / 2).toFixed(1)}px, ${(y - SIZE_PX / 2).toFixed(1)}px) ` +
        `rotate(0rad)`;
      star.style.cssText = [
        'position:fixed', 'pointer-events:auto', 'cursor:pointer',
        'z-index:9100',
        `font-size:${SIZE_PX}px`,
        'will-change:transform,filter',
        'left:0', 'top:0',
        `transform:${initialTransform}`,
        'user-select:none', '-webkit-user-select:none', 'touch-action:manipulation',
      ].join(';') + ';';
      document.body.appendChild(star);

      const now = performance.now();
      const handle = {
        el: star,
        x, y,
        vx: dirX * baseSpeed,
        vy: dirY * baseSpeed,
        baseSpeed,
        turnAt:    now + rand(TURN_INTERVAL_MS[0], TURN_INTERVAL_MS[1]),
        burstUntil: 0,
        nextBurstAt: now + rand(BURST_COOLDOWN_MS[0], BURST_COOLDOWN_MS[1]),
        rotation: 0,
        claimed: false,
        shimmerEl: null,
        cleanup: null,
        spawnedAt: now,
      };

      // Glitter shimmer — independent of flight, just a brightness flicker.
      // Tail offsets are written each rAF tick from current velocity (so the
      // tail trails the direction of motion even after sharp turns).
      // Toned down from 1.4 → 1.12 so the beer doesn't look like a strobe.
      const shimmer = star.animate(
        [
          { '--shimmer-mult': '1.0' },
          { '--shimmer-mult': '1.12' },
          { '--shimmer-mult': '1.0' },
        ],
        { duration: 720, iterations: Infinity, easing: 'ease-in-out' }
      );
      handle.shimmer = shimmer;

      handle.cleanup = function cleanupStar() {
        try { shimmer.cancel(); } catch (_) {}
        if (star.parentNode) star.remove();
        inFlight.delete(handle);
      };

      const onTap = (e) => {
        if (handle.claimed || cancelled) return;
        e.stopPropagation();
        e.preventDefault();
        handle.claimed = true;
        const rect = star.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        totalScore += REWARD;
        hitCount++;
        console.log(`[mg] twilight HIT #${hitCount} +${REWARD} | total=${totalScore}`);
        ctx.awardBonus(REWARD, { x: cx, y: cy });
        spawnRipple(cx, cy);
        handle.cleanup();
        scheduleNext();
      };
      star.addEventListener('click', onTap, { once: true });

      inFlight.add(handle);
    }

    function scheduleNext() {
      if (cancelled) return;
      const deficit = Math.max(0, MIN_CONCURRENT - inFlight.size);
      for (let i = 0; i < deficit; i++) spawn();
    }

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

    // ── Physics loop ────────────────────────────────────────────────────────
    function tick(now) {
      if (cancelled) return;
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const dead = [];

      for (const h of inFlight) {
        // Steering: every turnAt, perturb heading by up to ±TURN_MAX_RAD.
        if (now >= h.turnAt) {
          const currAngle = Math.atan2(h.vy, h.vx);
          const turn = (Math.random() - 0.5) * 2 * TURN_MAX_RAD;
          const a = currAngle + turn;
          h.vx = Math.cos(a) * h.baseSpeed;
          h.vy = Math.sin(a) * h.baseSpeed;
          h.turnAt = now + rand(TURN_INTERVAL_MS[0], TURN_INTERVAL_MS[1]);
        }

        // Burst: every nextBurstAt, kick into BURST_MULT× for BURST_DURATION_MS.
        if (now >= h.nextBurstAt && now >= h.burstUntil) {
          h.burstUntil = now + BURST_DURATION_MS;
          h.nextBurstAt = h.burstUntil + rand(BURST_COOLDOWN_MS[0], BURST_COOLDOWN_MS[1]);
        }
        const isBursting = now < h.burstUntil;
        const speedMult = isBursting ? BURST_MULT : 1.0;

        // Apply velocity (already direction × baseSpeed); scale by burst mult.
        h.x += h.vx * speedMult * dt;
        h.y += h.vy * speedMult * dt;
        h.rotation += dt * 1.6;  // gentle continuous rotation for sparkle

        // Despawn if way off-screen.
        if (
          h.x < -DESPAWN_MARGIN || h.x > vw + DESPAWN_MARGIN ||
          h.y < -DESPAWN_MARGIN || h.y > vh + DESPAWN_MARGIN
        ) {
          dead.push(h);
          continue;
        }

        // Compute trailing tail offsets based on CURRENT direction, so a
        // sharp turn re-orients the tail. Magnitude scales mildly during a
        // burst for extra streak feel.
        const speedNow = Math.hypot(h.vx, h.vy) || 1;
        const ux = -h.vx / speedNow;
        const uy = -h.vy / speedNow;
        const burstBoost = isBursting ? 1.3 : 1.0;
        const t1 = 12 * burstBoost, t2 = 24 * burstBoost,
              t3 = 40 * burstBoost, t4 = 60 * burstBoost;
        const brightness = isBursting ? 1.6 : 1.0;
        // Warm amber/gold foam trail — suggests beer foam streaming behind.
        h.el.style.filter =
          `drop-shadow(${(ux * t1).toFixed(1)}px ${(uy * t1).toFixed(1)}px 8px rgba(255,200,100,${0.85 * brightness})) ` +
          `drop-shadow(${(ux * t2).toFixed(1)}px ${(uy * t2).toFixed(1)}px 14px rgba(255,180,80,${0.55 * brightness})) ` +
          `drop-shadow(${(ux * t3).toFixed(1)}px ${(uy * t3).toFixed(1)}px 22px rgba(200,140,60,${0.3 * brightness})) ` +
          `drop-shadow(${(ux * t4).toFixed(1)}px ${(uy * t4).toFixed(1)}px 30px rgba(220,170,90,${0.18 * brightness}))`;

        h.el.style.transform =
          `translate(${(h.x - SIZE_PX / 2).toFixed(1)}px, ${(h.y - SIZE_PX / 2).toFixed(1)}px) ` +
          `rotate(${h.rotation.toFixed(2)}rad)`;
      }

      for (const h of dead) { h.cleanup(); }
      if (dead.length > 0) scheduleNext();

      rafId = requestAnimationFrame(tick);
    }

    // ── Self-driven endPhase ────────────────────────────────────────────────
    if (Number.isFinite(ctx.timeoutMs)) {
      endTimer = setTimeout(() => {
        endTimer = null;
        if (cancelled) return;
        ctx.endPhase('win', totalScore);
      }, Math.max(0, ctx.timeoutMs - 80));
    }

    // ── Initial burst spawn + start the rAF loop ────────────────────────────
    ctx.setSubStatus('TAP THE BEERS');
    const burst = () => { if (!cancelled) spawn(); };
    for (let i = 0; i < MIN_CONCURRENT; i++) {
      staggerTimers.push(setTimeout(burst, i * STAGGER_MS));
    }
    lastTime = performance.now();
    rafId = requestAnimationFrame(tick);

    // ── Cleanup on phase exit ───────────────────────────────────────────────
    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (endTimer) { clearTimeout(endTimer); endTimer = null; }
      staggerTimers.forEach((t) => clearTimeout(t));
      Array.from(inFlight).forEach((h) => h.cleanup());
      inFlight.clear();
      document.body.style.background = prevBodyBg || '';
      const c = document.getElementById('mash-canvas');
      if (c) c.style.background = prevCanvasBg || '';
      ctx.setSubStatus(null);
      console.log(
        `[mg] twilight cleanup | hits=${hitCount}/${spawnedCount} totalScore=${totalScore}`
      );
    };
  },
};

export default twilight;
