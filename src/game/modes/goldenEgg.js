// ─────────────────────────────────────────────────────────────────────────────
// goldenEgg — one shimmering golden egg flies across the screen at a time.
// Tap it for +reward bonus. Hit or miss, the next one fires after a short
// gap. Mode ends when ctx.timeoutMs elapses; final score = total bonus.
//
// Trajectory (Fruit Ninja-ish, mobile-portrait safe):
//   Spawn off-screen left/right at lower-third height, parabolic arc with
//   apex inside a "playable rectangle" (10–90% width, 18–55% height).
// ─────────────────────────────────────────────────────────────────────────────

const SPAWN_GAP_MS = 220;        // brief beat before the next egg spawns

const goldenEgg = {
  id: 'goldenEgg',
  start(ctx) {
    let cancelled = false;
    let inFlight = null;
    let totalScore = 0;
    let nextSpawnTimer = null;

    const reward = (ctx.config && ctx.config.reward) || 25;
    const sizePx = (ctx.config && ctx.config.sizePx) || 54;
    const flightDurMs = (ctx.config && ctx.config.flightDurMs) || [1700, 2300];
    const flightMin = flightDurMs[0];
    const flightMax = flightDurMs[1];
    let spawnedCount = 0;
    let hitCount = 0;
    console.log(`[mg] mode goldenEgg start | reward=${reward} size=${sizePx}px flight=${flightMin}-${flightMax}ms timeout=${ctx.timeoutMs}ms`);

    function spawn() {
      if (cancelled) return;
      spawnedCount++;
      console.log(`[mg] goldenEgg spawn #${spawnedCount}`);
      const vp = { w: window.innerWidth, h: window.innerHeight };
      const fromLeft = Math.random() < 0.5;
      const startX = fromLeft ? -60 : vp.w + 60;
      const startY = vp.h * (0.55 + Math.random() * 0.20);
      // Apex constrained to playable rect
      const apexX = vp.w * (0.15 + Math.random() * 0.70);
      const apexY = vp.h * (0.18 + Math.random() * 0.30);
      const endX = fromLeft ? vp.w + 60 : -60;
      const endY = vp.h * (0.62 + Math.random() * 0.20);
      const dur = flightMin + Math.random() * (flightMax - flightMin);

      const egg = document.createElement('div');
      egg.className = 'flying-golden-egg';
      egg.textContent = '🥚';
      egg.style.cssText = [
        'position:fixed', 'pointer-events:auto', 'cursor:pointer',
        'z-index:9100',
        `font-size:${sizePx}px`,
        'will-change:transform,opacity,filter',
        `left:${startX}px`, `top:${startY}px`,
        'transform:translate(-50%,-50%)',
        'user-select:none', '-webkit-user-select:none', 'touch-action:manipulation',
        'filter:drop-shadow(0 0 18px rgba(255,215,0,0.95)) drop-shadow(0 0 32px rgba(255,140,0,0.7))',
      ].join(';') + ';';
      document.body.appendChild(egg);

      // Shimmer: continuous filter pulse, separate from positional anim.
      const shimmer = egg.animate(
        [
          { filter: 'drop-shadow(0 0 18px rgba(255,215,0,0.95)) drop-shadow(0 0 32px rgba(255,140,0,0.7)) brightness(1.0)' },
          { filter: 'drop-shadow(0 0 28px rgba(255,255,180,1))   drop-shadow(0 0 48px rgba(255,200,0,1))   brightness(1.35)' },
          { filter: 'drop-shadow(0 0 18px rgba(255,215,0,0.95)) drop-shadow(0 0 32px rgba(255,140,0,0.7)) brightness(1.0)' },
        ],
        { duration: 600, iterations: Infinity, easing: 'ease-in-out' }
      );

      // Path: 3-keyframe parabola (start → apex → end)
      const flight = egg.animate(
        [
          { transform: `translate(-50%,-50%) rotate(0deg)`,
            offset: 0, left: `${startX}px`, top: `${startY}px` },
          { transform: `translate(-50%,-50%) rotate(180deg)`,
            offset: 0.5, left: `${apexX}px`, top: `${apexY}px` },
          { transform: `translate(-50%,-50%) rotate(360deg)`,
            offset: 1.0, left: `${endX}px`, top: `${endY}px` },
        ],
        { duration: dur, easing: 'cubic-bezier(.42,.0,.58,1)', fill: 'forwards' }
      );

      let claimed = false;
      const finishMiss = () => {
        if (claimed) return;
        cleanupEgg();
        scheduleNext();
      };
      flight.onfinish = finishMiss;

      const onTap = (e) => {
        if (claimed) return;
        e.stopPropagation();
        e.preventDefault();
        claimed = true;
        const rect = egg.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        totalScore += reward;
        hitCount++;
        console.log(`[mg] goldenEgg HIT #${hitCount} +${reward} | total=${totalScore}`);
        ctx.awardBonus(reward, { x: cx, y: cy });
        spawnRipple(cx, cy);
        cleanupEgg();
        scheduleNext();
      };
      egg.addEventListener('click', onTap, { once: true });

      function cleanupEgg() {
        try { shimmer.cancel(); } catch (_) {}
        try { flight.cancel(); } catch (_) {}
        egg.remove();
        if (inFlight === handle) inFlight = null;
      }

      const handle = { cleanupEgg };
      inFlight = handle;
    }

    function scheduleNext() {
      if (cancelled) return;
      nextSpawnTimer = setTimeout(spawn, SPAWN_GAP_MS);
    }

    function spawnRipple(x, y) {
      const r = document.createElement('div');
      r.style.cssText = [
        'position:fixed', 'pointer-events:none', 'z-index:9099',
        `left:${x}px`, `top:${y}px`,
        'width:12px', 'height:12px', 'border-radius:50%',
        'transform:translate(-50%,-50%)',
        'background:radial-gradient(circle, rgba(255,230,109,0.9), rgba(255,180,0,0.4) 60%, transparent 80%)',
      ].join(';') + ';';
      document.body.appendChild(r);
      r.animate(
        [
          { transform: 'translate(-50%,-50%) scale(0.4)', opacity: 1, offset: 0 },
          { transform: 'translate(-50%,-50%) scale(8)',   opacity: 0, offset: 1 },
        ],
        { duration: 700, easing: 'ease-out', fill: 'forwards' }
      ).onfinish = () => r.remove();
    }

    // Kick off
    ctx.setSubStatus('TAP THE GOLDEN EGG');
    spawn();

    // Cleanup on phase exit
    return () => {
      cancelled = true;
      if (nextSpawnTimer) clearTimeout(nextSpawnTimer);
      if (inFlight) inFlight.cleanupEgg();
      ctx.setSubStatus(null);
      console.log(`[mg] goldenEgg cleanup | hits=${hitCount}/${spawnedCount} totalScore=${totalScore}`);
      // No endPhase here — director's hard timeout (outcome='win') already
      // fired. Score is communicated through ctx.awardBonus calls during
      // the play (each tap awards its reward in real time), so a final
      // score isn't needed in the outcome status.
    };
  },
};

export default goldenEgg;
