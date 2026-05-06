// ─────────────────────────────────────────────────────────────────────────────
// pigDodge — small pig emojis spawn from the top, gravitate toward the mash
// button's center with a tangential thrust (orbital feel), and wrap off-edge.
// Collision with the button's bounding box → endPhase('lose'). Survive the
// timeout → endPhase('win').
//
// Architecture mirrors Pong: the button itself is the drag target. KudosCta's
// existing drag wiring (the same path every `button: 'draggable'` mini-game
// uses) writes --btn-drag-x/y on pointermove. The avatar emoji is a PURE
// VISUAL overlay (pointer-events: none) painted on top of the button center
// each frame; taps pass through to the button. Cleanup just removes the
// avatar element + the body attr — no pointer listeners to detach, no rAF
// race conditions, no chance of leaving the button shrunk or disabled.
// ─────────────────────────────────────────────────────────────────────────────

const SPAWN_MARGIN = 30;
const STUCK_OFFSCREEN_MS = 3500;

const pigDodge = {
  id: 'pigDodge',
  start(ctx) {
    let cancelled = false;
    let rafId = 0;
    let spawnTimer = null;
    let lastTime = performance.now();
    let ended = false;
    let initialBurstDone = false; // StrictMode-guard: don't double-spawn the burst
    const pigs = new Set();

    const config = {
      obstacleSize:   (ctx.config && ctx.config.obstacleSize)   || (ctx.config && ctx.config.pigSize) || 40,
      gravity:        (ctx.config && ctx.config.gravity)        || 280,
      thrust:         (ctx.config && ctx.config.thrust)         || 220,
      maxSpeed:       (ctx.config && ctx.config.maxSpeed)       || 320,
      spawnEveryMs:   (ctx.config && ctx.config.spawnEveryMs)   || 1600,
      maxConcurrent:  (ctx.config && ctx.config.maxConcurrent)  || 3,
      initialSpawnCount: (ctx.config && ctx.config.initialSpawnCount) || 2,
      initialDownVy:  (ctx.config && ctx.config.initialDownVy)  || [80, 160],
      initialSideVx:  (ctx.config && ctx.config.initialSideVx)  || 120,
      hitboxShrink:   (ctx.config && ctx.config.hitboxShrink)   || 8,
      statusText:     (ctx.config && ctx.config.statusText)     || 'DODGE THE CARS',
      obstacleEmojis: (ctx.config && ctx.config.obstacleEmojis) || ['🐷'],
      avatar:         (ctx.config && ctx.config.avatar)         || null,
    };

    ctx.setSubStatus(config.statusText);

    // ── Avatar overlay — PURE VISUAL, pointer-events: none ──────────────
    // Mirrors Pong's architecture: the button itself is the drag target
    // (KudosCta's existing drag wiring handles pointerdown on .hd-cta + the
    // --btn-drag-x/y CSS vars). The avatar is a fixed-position emoji that
    // tracks the button center each frame via the rAF tick below. Taps
    // pass through the avatar (pointer-events: none) and land on the
    // button. End-of-game just removes this element + the data-pig-avatar
    // body attr — no pointer listeners to clean up, no race conditions
    // with stale rAFs, no risk of leaving the button shrunk or disabled.
    let avatarEl = null;
    if (config.avatar && config.avatar.emoji) {
      avatarEl = document.createElement('div');
      avatarEl.className = 'pig-target-avatar';
      avatarEl.textContent = config.avatar.emoji;
      avatarEl.style.cssText = [
        'position:fixed', 'pointer-events:none', 'z-index:9101',
        `font-size:${config.avatar.sizePx || 40}px`,
        'left:0', 'top:0',
        'will-change:transform',
        'filter:drop-shadow(0 4px 12px rgba(0,0,0,0.55))',
      ].join(';') + ';';
      if (config.avatar.pulse) avatarEl.classList.add('is-pulsing');
      document.body.appendChild(avatarEl);
      document.body.dataset.pigAvatar = '1';
    }

    function makePig(opts) {
      const el = document.createElement('div');
      el.className = 'pig-attacker';
      const obstacleEmoji = config.obstacleEmojis[Math.floor(Math.random() * config.obstacleEmojis.length)];
      el.textContent = obstacleEmoji;
      el.style.cssText = [
        'position:fixed', 'pointer-events:none', 'z-index:9100',
        `font-size:${config.obstacleSize}px`,
        'left:0', 'top:0',
        'will-change:transform',
        'filter:drop-shadow(0 2px 6px rgba(0,0,0,0.6))',
      ].join(';') + ';';
      document.body.appendChild(el);
      const pig = {
        el,
        x: opts.x, y: opts.y,
        vx: opts.vx, vy: opts.vy,
        thrustClockwise: Math.random() > 0.5,
        rotation: 0,
        offscreenSince: 0,
      };
      el.style.transform = `translate(${pig.x - config.obstacleSize / 2}px, ${pig.y - config.obstacleSize / 2}px)`;
      pigs.add(pig);
      return pig;
    }

    function spawnFromTop() {
      if (cancelled || ended) return null;
      const vw = window.innerWidth;
      const x = Math.random() * vw;
      const y = -SPAWN_MARGIN;
      const vx = (Math.random() - 0.5) * 2 * config.initialSideVx;
      const vy = config.initialDownVy[0] +
        Math.random() * (config.initialDownVy[1] - config.initialDownVy[0]);
      return makePig({ x, y, vx, vy });
    }

    function spawnPig() {
      if (cancelled || ended) return;
      if (pigs.size >= config.maxConcurrent) return;
      // Continuous spawn: mostly from top, occasional side variety.
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const fromEdge = Math.random() < 0.20;
      if (fromEdge) {
        const fromLeft = Math.random() < 0.5;
        const x = fromLeft ? -SPAWN_MARGIN : vw + SPAWN_MARGIN;
        const y = vh * (0.10 + Math.random() * 0.30);
        const vx = (fromLeft ? 1 : -1) * (60 + Math.random() * 80);
        const vy = (Math.random() - 0.3) * 80;
        makePig({ x, y, vx, vy });
      } else {
        spawnFromTop();
      }
    }

    // Cache button ref once — it doesn't change between frames.
    const cachedBtn = document.querySelector('.hd-cta');

    function tick(now) {
      if (cancelled || ended) return;
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const btn = cachedBtn;
      if (!btn) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const btnRect = btn.getBoundingClientRect();
      const btnCx = btnRect.left + btnRect.width / 2;
      const btnCy = btnRect.top + btnRect.height / 2;

      // Reposition the avatar to track the button center each frame.
      // Pure visual now (pointer-events: none, no padding hit area), so
      // offset is just half the emoji's font-size.
      if (avatarEl && config.avatar) {
        const av = config.avatar.sizePx || 40;
        avatarEl.style.transform = `translate(${btnCx - av / 2}px, ${btnCy - av / 2}px)`;
      }

      // Collision uses the AVATAR's bounding rect, not the (invisible)
      // button's. So pigs only "touch" the visible girl emoji — never an
      // invisible button edge that the player can't see.
      const av = (config.avatar && config.avatar.sizePx) || 40;
      const halfAvatar = av / 2;
      const shrink = config.hitboxShrink;
      const hbLeft   = btnCx - halfAvatar + shrink;
      const hbRight  = btnCx + halfAvatar - shrink;
      const hbTop    = btnCy - halfAvatar + shrink;
      const hbBottom = btnCy + halfAvatar - shrink;

      const halfPig = config.obstacleSize / 2;
      const dead = [];
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      for (const pig of pigs) {
        // Gravity targets the AVATAR center (= button center, since avatar
        // is positioned there). Pigs orbit the visible girl, not the
        // invisible button outline.
        const gx = btnCx - pig.x;
        const gy = btnCy - pig.y;
        const dist = Math.hypot(gx, gy);
        if (dist < 0.5) continue;
        const gxN = gx / dist;
        const gyN = gy / dist;

        // Gravity (radial, toward button).
        let ax = gxN * config.gravity;
        let ay = gyN * config.gravity;

        // Tangential thrust (perpendicular to gravity). Strong relative to
        // gravity so pigs orbit at moderate distances.
        const thrustSign = pig.thrustClockwise ? 1 : -1;
        ax += -gyN * config.thrust * thrustSign;
        ay += gxN * config.thrust * thrustSign;

        pig.vx += ax * dt;
        pig.vy += ay * dt;

        const speed = Math.hypot(pig.vx, pig.vy);
        if (speed > config.maxSpeed) {
          pig.vx *= config.maxSpeed / speed;
          pig.vy *= config.maxSpeed / speed;
        }

        pig.x += pig.vx * dt;
        pig.y += pig.vy * dt;
        pig.rotation += dt * 2 * thrustSign;

        // Collision (pig center inside slightly-shrunk avatar rect).
        if (
          pig.x + halfPig > hbLeft && pig.x - halfPig < hbRight &&
          pig.y + halfPig > hbTop  && pig.y - halfPig < hbBottom
        ) {
          if (!ended) {
            ended = true;
            // CRITICAL: Cancel pending rAF immediately to stop game loop
            if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = 0;
            }
            ctx.endPhase('lose', 0);
          }
          return;
        }

        // Viewport wrapping — pig flies off one edge, reappears on the
        // opposite edge with the same velocity. Track time spent fully
        // off-screen as a stuck-pig fallback.
        const off =
          pig.x < -halfPig || pig.x > vw + halfPig ||
          pig.y < -halfPig || pig.y > vh + halfPig;
        if (off) {
          // Wrap.
          if (pig.x < -halfPig) pig.x += vw + halfPig * 2;
          else if (pig.x > vw + halfPig) pig.x -= vw + halfPig * 2;
          if (pig.y < -halfPig) pig.y += vh + halfPig * 2;
          else if (pig.y > vh + halfPig) pig.y -= vh + halfPig * 2;
          if (!pig.offscreenSince) pig.offscreenSince = now;
          if (now - pig.offscreenSince > STUCK_OFFSCREEN_MS) {
            dead.push(pig);
            continue;
          }
        } else {
          pig.offscreenSince = 0;
        }

        pig.el.style.transform =
          `translate(${pig.x - halfPig}px, ${pig.y - halfPig}px) rotate(${pig.rotation.toFixed(2)}rad)`;
      }
      for (const p of dead) { p.el.remove(); pigs.delete(p); }

      rafId = requestAnimationFrame(tick);
    }

    // Initial-burst guard: in StrictMode dev, start() may be invoked twice;
    // the flag prevents a doubled initial burst.
    if (!initialBurstDone) {
      initialBurstDone = true;
      const n = Math.max(1, config.initialSpawnCount | 0);
      for (let i = 0; i < n; i += 1) spawnFromTop();
    }
    spawnTimer = setInterval(spawnPig, config.spawnEveryMs);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      ended = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (spawnTimer) clearInterval(spawnTimer);
      pigs.forEach((pig) => pig.el.remove());
      pigs.clear();

      // ── Diagnostic snapshot BEFORE cleanup ─────────────────────────────
      // Diagnostic snapshot BEFORE cleanup removed — no logging

      // Pure-visual avatar — just remove the element + clear the body attr.
      // No pointer listeners to detach (KudosCta's drag wiring handles drag
      // on the button itself, same as Pong). No race conditions possible.
      if (avatarEl) avatarEl.remove();
      avatarEl = null;
      delete document.body.dataset.pigAvatar;

      // ── Snap-back: explicitly force the button to its anchor position
      // with NO animation. data-snap-back disables the row transition for
      // one frame so the var clear teleports the button rather than gliding.
      document.body.dataset.snapBack = '1';
      document.body.style.removeProperty('--btn-drag-x');
      document.body.style.removeProperty('--btn-drag-y');
      // Force layout flush so the snap takes effect with transition: none.
      // eslint-disable-next-line no-unused-expressions
      document.body.offsetWidth;

      // ── Diagnostic snapshot AFTER cleanup removed — no logging

      requestAnimationFrame(() => {
        delete document.body.dataset.snapBack;
        // ── Diagnostic snapshot ONE FRAME LATER removed — no logging
      });
      ctx.setStatus(null);
      ctx.setSubStatus(null);
    };
  },
};

export default pigDodge;
