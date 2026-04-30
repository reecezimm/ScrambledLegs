// ─────────────────────────────────────────────────────────────────────────────
// pong — single-player wall-bounce. The mash button (in 'draggable' mode) is
// the paddle. A ball spawns center-screen with a random downward angle and
// bounces off the top, left, and right edges. The bottom edge is the goal:
//   - If the ball crosses the bottom AND the paddle's x-range covers it, the
//     ball reflects upward, +1 hit, speed *= 1.10 (capped at maxSpeed), and
//     the bounce angle is perturbed based on where on the paddle it hit
//     (left edge → leftward bounce, center → straight up, right → rightward).
//   - If the ball crosses the bottom WITHOUT paddle overlap → endPhase('lose').
//
// Paddle position is read from `.hd-cta`'s getBoundingClientRect each frame —
// the mode does not spawn its own paddle DOM. The drag mechanic that moves
// the button is provided by the host (overrides.button: 'draggable').
//
// Score is the running paddle-hit count, mirrored to bonusCount via
// awardBonus(25) per hit (with a positional +25 floater at the bounce point).
// On win (timeout survival) the mode self-drives endPhase 80ms before the
// store's hard timeout so the outro phase can branch on the actual score.
// ─────────────────────────────────────────────────────────────────────────────

const pong = {
  id: 'pong',
  start(ctx) {
    let cancelled = false;
    let ended = false;
    let rafId = 0;
    let endTimer = null;
    let lastTime = performance.now();

    // Session-scoped difficulty: scales the BASE_SPEED only. The MAX_SPEED
    // cap still holds — at high playCount the initial speed is bounded by it.
    const baseSpeedMult = (ctx.config && typeof ctx.config.baseSpeedMult === 'number')
      ? ctx.config.baseSpeedMult
      : 1.0;
    const BASE_SPEED   = 380 * baseSpeedMult;   // px/s at spawn
    const SPEED_MULT   = 1.10;  // per paddle hit
    const MAX_SPEED    = 1100;  // cap
    const BALL_SIZE    = 36;    // px (font-size of emoji)
    const BALL_RADIUS  = BALL_SIZE / 2;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Initial direction: random downward angle within ±60° of straight down.
    // Straight-down is angle = π/2 (atan2 y/x with x=0,y=+1). We pick an angle
    // off vertical in [-60°, +60°].
    const offsetDeg = (Math.random() * 120) - 60;
    const offsetRad = (offsetDeg * Math.PI) / 180;
    let speed = Math.min(MAX_SPEED, BASE_SPEED);
    let vx = Math.sin(offsetRad) * speed;
    let vy = Math.cos(offsetRad) * speed; // positive = downward (screen coords)

    let x = vw / 2;
    let y = vh * 0.35;

    let hits = 0;

    console.log(
      `[mg] mode pong start | base=${BASE_SPEED.toFixed(0)}px/s baseSpeedMult=${baseSpeedMult.toFixed(2)} ` +
      `mult=${SPEED_MULT} max=${MAX_SPEED}px/s ball=${BALL_SIZE}px timeout=${ctx.timeoutMs}ms`
    );

    ctx.setStatus('PONG');
    ctx.setSubStatus('0 HITS');

    // ── Ball DOM — styled white sphere, not an emoji ──────────────────────
    // Using a clean radial-gradient circle reads as a ball at any size.
    // Emoji 🎾 looked like a smudge on dark backgrounds during play.
    const ball = document.createElement('div');
    ball.className = 'pong-ball';
    ball.style.cssText = [
      'position:fixed', 'pointer-events:none', 'z-index:9100',
      'left:0', 'top:0',
      `width:${BALL_SIZE}px`, `height:${BALL_SIZE}px`,
      'border-radius:50%',
      'background:radial-gradient(circle at 32% 30%, #ffffff 0%, #e8e8e8 45%, #888 95%)',
      'box-shadow:0 4px 14px rgba(0,0,0,0.55), inset -3px -4px 8px rgba(0,0,0,0.18)',
      'will-change:transform',
    ].join(';') + ';';
    ball.style.transform =
      `translate(${x - BALL_RADIUS}px, ${y - BALL_RADIUS}px)`;
    document.body.appendChild(ball);

    function reflectFromPaddle(paddleLeft, paddleRight) {
      // Where on the paddle did we hit? -1 = far left, 0 = center, +1 = right.
      const paddleCx = (paddleLeft + paddleRight) / 2;
      const half = (paddleRight - paddleLeft) / 2 || 1;
      let rel = (x - paddleCx) / half;
      if (rel < -1) rel = -1;
      if (rel >  1) rel =  1;

      // Speed up (capped).
      speed = Math.min(MAX_SPEED, speed * SPEED_MULT);

      // New angle: rel = 0 → straight up. rel = ±1 → ±60° off vertical.
      const newAngle = rel * (Math.PI / 3); // ±60°
      vx = Math.sin(newAngle) * speed;
      vy = -Math.cos(newAngle) * speed; // negative = upward

      hits += 1;
      ctx.awardBonus(25, { x, y });
      ctx.setSubStatus(`${hits} HIT${hits === 1 ? '' : 'S'}`);
      console.log(`[mg] pong HIT #${hits} speed=${speed.toFixed(0)}`);
    }

    function tick(now) {
      if (cancelled || ended) return;
      const dt = Math.min(0.033, (now - lastTime) / 1000);
      lastTime = now;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Read paddle (mash button) bounds ONCE per frame. The button is the
      // actual collider — ball reflects off its TOP, LEFT, and RIGHT edges.
      // The bottom-of-VIEWPORT (not bottom-of-button) is the miss line.
      const btn = document.querySelector('.hd-cta');
      let bL = Infinity, bR = -Infinity, bT = Infinity, bB = -Infinity;
      if (btn) {
        const r = btn.getBoundingClientRect();
        bL = r.left;
        bR = r.right;
        bT = r.top;
        bB = r.bottom;
      }

      // Substep so high speeds don't tunnel through walls/paddle.
      const stepDist = Math.hypot(vx, vy) * dt;
      const subSteps = Math.max(1, Math.ceil(stepDist / 16));
      const subDt = dt / subSteps;

      for (let s = 0; s < subSteps && !ended; s += 1) {
        const prevX = x;
        const prevY = y;
        x += vx * subDt;
        y += vy * subDt;

        // ── Viewport walls ──────────────────────────────────────────────
        if (y - BALL_RADIUS < 0 && vy < 0) {
          y = BALL_RADIUS;
          vy = -vy;
        }
        if (x - BALL_RADIUS < 0 && vx < 0) {
          x = BALL_RADIUS;
          vx = -vx;
        }
        if (x + BALL_RADIUS > w && vx > 0) {
          x = w - BALL_RADIUS;
          vx = -vx;
        }

        // ── Paddle (button) collision — circle vs rect, edge-resolved ────
        // Inflate the rect by the ball radius and test the ball center
        // against it. If inside, figure out which edge based on the prev
        // position to bounce in the right direction.
        if (btn) {
          const inflL = bL - BALL_RADIUS;
          const inflR = bR + BALL_RADIUS;
          const inflT = bT - BALL_RADIUS;
          const inflB = bB + BALL_RADIUS;
          const inside = (x > inflL && x < inflR && y > inflT && y < inflB);
          if (inside) {
            const wasOutsideY = (prevY <= inflT) || (prevY >= inflB);
            const wasOutsideX = (prevX <= inflL) || (prevX >= inflR);
            // TOP: came from above moving down — paddle hit, score + speed up.
            if (wasOutsideY && prevY <= inflT && vy > 0) {
              y = inflT;
              reflectFromPaddle(bL, bR);
            // BOTTOM: came from below moving up — bounce down (rare, but a
            // proper collider).
            } else if (wasOutsideY && prevY >= inflB && vy < 0) {
              y = inflB;
              vy = Math.abs(vy);
            // LEFT side: came from the left moving right.
            } else if (wasOutsideX && prevX <= inflL && vx > 0) {
              x = inflL;
              vx = -Math.abs(vx);
            // RIGHT side: came from the right moving left.
            } else if (wasOutsideX && prevX >= inflR && vx < 0) {
              x = inflR;
              vx = Math.abs(vx);
            // Corner / weird case (e.g. paddle dragged INTO ball). Push the
            // ball out the closest face based on velocity.
            } else if (vy > 0) {
              y = inflT;
              reflectFromPaddle(bL, bR);
            } else {
              y = inflB;
              vy = Math.abs(vy);
            }
          }
        }

        // ── Miss line: ball reaches viewport bottom unobstructed ─────────
        if (y + BALL_RADIUS >= h && vy > 0) {
          if (!ended) {
            ended = true;
            console.log(`[mg] pong MISS — game over | hits=${hits}`);
            ctx.endPhase('lose', hits);
          }
          return;
        }
      }

      ball.style.transform =
        `translate(${x - BALL_RADIUS}px, ${y - BALL_RADIUS}px)`;
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame((t) => { lastTime = t; tick(t); });

    // ── Self-driven endPhase ────────────────────────────────────────────────
    // Beat the store's hard timeout by 80ms so the outro can branch on the
    // actual score (win = survived).
    if (Number.isFinite(ctx.timeoutMs)) {
      endTimer = setTimeout(() => {
        if (ended) return;
        ended = true;
        ctx.endPhase('win', hits);
      }, Math.max(0, ctx.timeoutMs - 80));
    }

    return () => {
      cancelled = true;
      ended = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (endTimer) clearTimeout(endTimer);
      if (ball && ball.parentNode) ball.parentNode.removeChild(ball);
      ctx.setStatus(null);
      ctx.setSubStatus(null);
      console.log(`[mg] pong cleanup | hits=${hits} finalSpeed=${speed.toFixed(0)}`);
    };
  },
};

export default pong;
