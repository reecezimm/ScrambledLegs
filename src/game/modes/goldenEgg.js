// ─────────────────────────────────────────────────────────────────────────────
// goldenEgg — one shimmering golden egg flies across the screen at a time.
// Tap it for +reward bonus. Hit or miss, the next one fires after a short
// gap. Mode ends when ctx.timeoutMs elapses; final score = total bonus.
//
// Trajectory (Fruit Ninja-ish, mobile-portrait safe):
//   Spawn off-screen left/right at lower-third height, parabolic arc with
//   apex inside a "playable rectangle" (10–90% width, 18–55% height).
// ─────────────────────────────────────────────────────────────────────────────

const SPAWN_GAP_MS = 60;         // shortened so the next egg flies in fast
const SPAWN_OFFSCREEN_PX = 24;   // small offset so the egg pops into view almost instantly

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

    function spawn() {
      if (cancelled) return;
      spawnedCount++;
      const vp = { w: window.innerWidth, h: window.innerHeight };

      // Pick a spawn edge: LEFT, RIGHT, or TOP (anywhere along that edge).
      // Bottom is excluded because eggs lobbing UP from below feels weird.
      const edges = ['left', 'right', 'top'];
      const edge = edges[Math.floor(Math.random() * edges.length)];
      const off = SPAWN_OFFSCREEN_PX;
      let startX, startY, endX, endY;
      // Apex constrained to a playable interior rect so the user always
      // has a window to tap the egg as it crosses the screen.
      const apexX = vp.w * (0.15 + Math.random() * 0.70);
      const apexY = vp.h * (0.18 + Math.random() * 0.40);

      if (edge === 'left') {
        startX = -off;
        // Anywhere down the left edge — bottom 90% so it's visible.
        startY = vp.h * (0.05 + Math.random() * 0.85);
        endX = vp.w + off;
        endY = vp.h * (0.10 + Math.random() * 0.80);
      } else if (edge === 'right') {
        startX = vp.w + off;
        startY = vp.h * (0.05 + Math.random() * 0.85);
        endX = -off;
        endY = vp.h * (0.10 + Math.random() * 0.80);
      } else {
        // top — drops into view from above, exits along the bottom edge
        startX = vp.w * (0.10 + Math.random() * 0.80);
        startY = -off;
        endX = vp.w * (0.10 + Math.random() * 0.80);
        endY = vp.h + off;
      }
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
        ctx.awardBonus(reward, { x: cx, y: cy });
        spawnRipple(cx, cy);

        // Stop motion immediately, but keep the egg in place to play the crack.
        try { shimmer.cancel(); } catch (_) {}
        try { flight.cancel(); } catch (_) {}
        // Pin the egg at its tap-time position (cancel() reverts left/top
        // to start values, so re-anchor here).
        egg.style.left = `${cx}px`;
        egg.style.top = `${cy}px`;
        // Swap to cracked-egg emoji.
        egg.textContent = '🐣';

        const crack = egg.animate(
          [
            { transform: 'translate(-50%,-50%) scale(1) translateY(0)',     opacity: 1, offset: 0 },
            { transform: 'translate(-50%,-50%) scale(1.4) translateY(0)',   opacity: 1, offset: 0.375 },
            { transform: 'translate(-50%,-50%) scale(1.1) translateY(-30px)', opacity: 0, offset: 1 },
          ],
          { duration: 320, easing: 'ease-out', fill: 'forwards' }
        );
        const finishCrack = () => {
          if (cancelled) return;
          egg.remove();
          if (inFlight === handle) inFlight = null;
          scheduleNext();
        };
        crack.onfinish = finishCrack;
        crack.oncancel = () => { try { egg.remove(); } catch (_) {} };
      };
      egg.addEventListener('click', onTap, { once: true });

      function cleanupEgg() {
        try { shimmer.cancel(); } catch (_) {}
        try { flight.cancel(); } catch (_) {}
        try { egg.getAnimations().forEach((a) => a.cancel()); } catch (_) {}
        try { egg.remove(); } catch (_) {}
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
    ctx.setSubStatus('TAP THE EGGS\nKEEP MASHING');
    spawn();

    // Cleanup on phase exit
    return () => {
      cancelled = true;
      if (nextSpawnTimer) clearTimeout(nextSpawnTimer);
      if (inFlight) inFlight.cleanupEgg();
      ctx.setSubStatus(null);
      // No endPhase here — director's hard timeout (outcome='win') already
      // fired. Score is communicated through ctx.awardBonus calls during
      // the play (each tap awards its reward in real time), so a final
      // score isn't needed in the outcome status.
    };
  },
};

export default goldenEgg;
