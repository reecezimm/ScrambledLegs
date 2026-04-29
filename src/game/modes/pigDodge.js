// ─────────────────────────────────────────────────────────────────────────────
// pigDodge — small pig emojis spawn from the top third with downward initial
// velocity, then experience two forces every frame:
//   1. Gravity pulling toward the mash button's current center (configurable).
//   2. A constant tangential thrust perpendicular to gravity (so they orbit
//      rather than spiral straight in).
// Pigs cap at maxSpeed; off-viewport pigs despawn. Collision with the button's
// bounding box → ctx.endPhase('lose'). Surviving the timeout → ctx.endPhase
// fires via the director's hard timeout (outcome from phase.timeout.outcome).
//
// The button is in `draggable` mode for this mini-game; the user holds and
// drags it to dodge. Release parks it. Pigs continuously re-aim at wherever
// the button is right now.
// ─────────────────────────────────────────────────────────────────────────────

const pigDodge = {
  id: 'pigDodge',
  start(ctx) {
    let cancelled = false;
    let rafId = 0;
    let spawnTimer = null;
    let lastTime = performance.now();
    let ended = false;
    const pigs = new Set();

    const config = {
      pigSize:        (ctx.config && ctx.config.pigSize)        || 40,
      gravity:        (ctx.config && ctx.config.gravity)        || 800,
      thrust:         (ctx.config && ctx.config.thrust)         || 480,    // higher = pigs blow past faster
      maxSpeed:       (ctx.config && ctx.config.maxSpeed)       || 850,    // raised so the higher thrust isn't speed-capped immediately
      spawnEveryMs:   (ctx.config && ctx.config.spawnEveryMs)   || 1200,
      maxConcurrent:  (ctx.config && ctx.config.maxConcurrent)  || 2,      // cap on screen at any time
      initialDownVy:  (ctx.config && ctx.config.initialDownVy)  || [120, 240],
      initialSideVx:  (ctx.config && ctx.config.initialSideVx)  || 320,
      hitboxShrink:   (ctx.config && ctx.config.hitboxShrink)   || 8,
      statusText:     (ctx.config && ctx.config.statusText)     || 'DODGE THE PIGS',
      avatar:         (ctx.config && ctx.config.avatar)         || null,   // {emoji, sizePx, pulse}
    };

    console.log(
      `[mg] mode pigDodge start | size=${config.pigSize}px gravity=${config.gravity} ` +
      `thrust=${config.thrust} maxSpeed=${config.maxSpeed} spawnEvery=${config.spawnEveryMs}ms ` +
      `timeout=${ctx.timeoutMs}ms`
    );

    ctx.setStatus(config.statusText);
    ctx.setSubStatus('HOLD AND DRAG');

    // ── Avatar overlay (optional) ────────────────────────────────────────
    // When config.avatar is present, render an emoji visual that follows the
    // mash button's center each frame. The button remains the actual hit
    // target (drag captures pointerdown on .hd-cta), but visually the
    // avatar takes over. body[data-pig-avatar="1"] hides the button's
    // normal mash-num/mash-sub visuals so they don't peek through.
    let avatarEl = null;
    if (config.avatar && config.avatar.emoji) {
      avatarEl = document.createElement('div');
      avatarEl.className = 'pig-target-avatar';
      avatarEl.textContent = config.avatar.emoji;
      avatarEl.style.cssText = [
        'position:fixed', 'pointer-events:none', 'z-index:9101',
        `font-size:${config.avatar.sizePx || 160}px`,
        'left:0', 'top:0',
        'will-change:transform',
        'filter:drop-shadow(0 4px 12px rgba(0,0,0,0.55))',
      ].join(';') + ';';
      if (config.avatar.pulse) avatarEl.classList.add('is-pulsing');
      document.body.appendChild(avatarEl);
      document.body.dataset.pigAvatar = '1';
    }

    function spawnPig() {
      if (cancelled || ended) return;
      // Concurrent cap — only spawn if we're under it.
      if (pigs.size >= config.maxConcurrent) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Spawn primarily from top third, with random x across the viewport.
      // Some chance of edge-spawn (left/right) for variety.
      const fromEdge = Math.random() < 0.20;
      let x, y, initialVx, initialVy;
      if (fromEdge) {
        const fromLeft = Math.random() < 0.5;
        x = fromLeft ? -30 : vw + 30;
        y = vh * (0.10 + Math.random() * 0.30);
        initialVx = (fromLeft ? 1 : -1) * (180 + Math.random() * 200);
        initialVy = (Math.random() - 0.3) * 200;
      } else {
        x = Math.random() * vw;
        y = -30 - Math.random() * 60;
        initialVx = (Math.random() - 0.5) * 2 * config.initialSideVx;
        initialVy = config.initialDownVy[0] +
          Math.random() * (config.initialDownVy[1] - config.initialDownVy[0]);
      }

      const el = document.createElement('div');
      el.className = 'pig-attacker';
      el.textContent = '🐷';
      el.style.cssText = [
        'position:fixed', 'pointer-events:none', 'z-index:9100',
        `font-size:${config.pigSize}px`,
        'left:0', 'top:0',
        'will-change:transform',
        'filter:drop-shadow(0 2px 6px rgba(0,0,0,0.6))',
      ].join(';') + ';';
      document.body.appendChild(el);

      const pig = {
        el, x, y,
        vx: initialVx, vy: initialVy,
        thrustClockwise: Math.random() > 0.5,
        rotation: 0,
      };
      // Initial paint so it appears at spawn position immediately
      el.style.transform = `translate(${x - config.pigSize / 2}px, ${y - config.pigSize / 2}px)`;
      pigs.add(pig);
    }

    function tick(now) {
      if (cancelled || ended) return;
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const btn = document.querySelector('.hd-cta');
      if (!btn) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const btnRect = btn.getBoundingClientRect();
      const btnCx = btnRect.left + btnRect.width / 2;
      const btnCy = btnRect.top + btnRect.height / 2;

      // Reposition the avatar to track the button center each frame.
      if (avatarEl && config.avatar) {
        const av = config.avatar.sizePx || 160;
        avatarEl.style.transform = `translate(${btnCx - av / 2}px, ${btnCy - av / 2}px)`;
      }

      // Slightly shrunk hitbox so visual edges can graze without triggering.
      const shrink = config.hitboxShrink;
      const hbLeft = btnRect.left + shrink;
      const hbRight = btnRect.right - shrink;
      const hbTop = btnRect.top + shrink;
      const hbBottom = btnRect.bottom - shrink;

      const halfPig = config.pigSize / 2;
      const dead = [];

      for (const pig of pigs) {
        // Vector from pig → button (gravity direction)
        const gx = btnCx - pig.x;
        const gy = btnCy - pig.y;
        const dist = Math.hypot(gx, gy);
        if (dist < 0.5) continue;
        const gxN = gx / dist;
        const gyN = gy / dist;

        // Gravity acceleration toward button
        let ax = gxN * config.gravity;
        let ay = gyN * config.gravity;

        // Perpendicular thrust (tangential — creates an orbital feel rather
        // than a straight pull-in). Sign per pig stays consistent so each
        // pig swirls one way for its lifetime.
        const thrustSign = pig.thrustClockwise ? 1 : -1;
        ax += -gyN * config.thrust * thrustSign;
        ay += gxN * config.thrust * thrustSign;

        pig.vx += ax * dt;
        pig.vy += ay * dt;

        // Cap speed
        const speed = Math.hypot(pig.vx, pig.vy);
        if (speed > config.maxSpeed) {
          pig.vx *= config.maxSpeed / speed;
          pig.vy *= config.maxSpeed / speed;
        }

        pig.x += pig.vx * dt;
        pig.y += pig.vy * dt;
        pig.rotation += dt * 4 * thrustSign;

        // Collision check (pig center inside slightly shrunk button rect)
        if (
          pig.x + halfPig > hbLeft && pig.x - halfPig < hbRight &&
          pig.y + halfPig > hbTop  && pig.y - halfPig < hbBottom
        ) {
          if (!ended) {
            ended = true;
            console.log('[mg] pigDodge HIT — pig collided with button');
            ctx.endPhase('lose', 0);
          }
          return;
        }

        // Despawn way-off-screen pigs (avoid runaway DOM)
        if (
          pig.x < -300 || pig.x > window.innerWidth + 300 ||
          pig.y < -300 || pig.y > window.innerHeight + 300
        ) {
          dead.push(pig);
          continue;
        }

        pig.el.style.transform =
          `translate(${pig.x - halfPig}px, ${pig.y - halfPig}px) rotate(${pig.rotation.toFixed(2)}rad)`;
      }
      // Reap despawned
      for (const p of dead) { p.el.remove(); pigs.delete(p); }

      rafId = requestAnimationFrame(tick);
    }

    spawnPig();
    spawnTimer = setInterval(spawnPig, config.spawnEveryMs);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      ended = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (spawnTimer) clearInterval(spawnTimer);
      const finalCount = pigs.size;
      pigs.forEach((pig) => pig.el.remove());
      pigs.clear();
      if (avatarEl) avatarEl.remove();
      delete document.body.dataset.pigAvatar;
      ctx.setStatus(null);
      ctx.setSubStatus(null);
      console.log(`[mg] pigDodge cleanup | despawned ${finalCount} pigs in flight`);
    };
  },
};

export default pigDodge;
