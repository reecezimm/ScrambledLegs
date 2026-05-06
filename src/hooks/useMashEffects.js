import { MASH_TEXT_GENERAL, MASH_TEXT_POOL, pickMashText } from '../game/mashText';

// Module-level counter shared across all KudosCta instances
// (so different cards don't get independent counters that fight each other)
export let activeHotDogs = 0;

const IS_MOBILE = typeof window !== 'undefined' &&
  window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

// Simple mobile-vs-desktop scaling. Mobile gets a 15% cap reduction
// (80→68) and a 25% shorter lifetime to keep paint cost tolerable.
export const MAX_ACTIVE_HOTDOGS = IS_MOBILE ? 25 : 25;
const LIFETIME_SCALE = IS_MOBILE ? 0.75 : 1.0;

export function incActiveHotDogs() { activeHotDogs++; }
export function decActiveHotDogs() { activeHotDogs = Math.max(0, activeHotDogs - 1); }

export function setMashEnergy(pressCount, btnEl) {
  const energy = Math.min(Math.max(pressCount / 25, 0), 1);
  const overdrive = Math.min(Math.max((pressCount - 50) / 50, 0), 1);
  document.body.style.setProperty('--mash-energy', energy.toFixed(3));
  document.body.style.setProperty('--mash-overdrive', overdrive.toFixed(3));
  if (pressCount > 0) document.body.dataset.mashing = '1';
  else delete document.body.dataset.mashing;
  if (pressCount >= 50) document.body.dataset.eggsRainbow = '1';
  else delete document.body.dataset.eggsRainbow;

  // While the mini-game director has frozen the game clock (e.g. Freeze
  // mini-game), skip updating the visual transformation vars so the canvas /
  // migration / sub state stays put. Energy/overdrive still update because
  // they're cheap and don't drive transforms.
  if (document.body.dataset.gameClock === 'paused') return;

  // ── Mash Game state ──
  // Canvas grows on an ease-in curve across presses 1→25: slow at first,
  // accelerating to full takeover by press 25.
  const tCanvas = Math.min(pressCount / 25, 1);
  const canvasRadius = Math.pow(tCanvas, 2.4);
  document.body.style.setProperty('--canvas-radius', canvasRadius.toFixed(3));
  // Button migration toward the bottom-third anchor across presses 1→25.
  const migration = Math.min(pressCount / 25, 1);
  document.body.style.setProperty('--migration-progress', migration.toFixed(3));
  // Ease-out curve (sqrt) for VISUAL growth that's perceived earlier — e.g.
  // at press 5 (linear=0.20) this is 0.45, so the button is already noticeably
  // taller. Used by the padding rule so vertical growth feels quicker.
  const migrationFast = Math.sqrt(migration);
  document.body.style.setProperty('--migration-fast', migrationFast.toFixed(3));
  // Sub-text lift — challenge text stays put inside the button during 1–25,
  // then JUMPS instantly above the button on press 26 (no smooth ramp — user
  // wants no incremental "willy nilly" movement during the intro).
  const subOut = pressCount >= 26 ? 1 : 0;
  document.body.style.setProperty('--sub-out', String(subOut));
  // Mirror as a body data attribute so CSS attribute selectors can switch
  // sub between "in flex flow alongside num" (sub-out=0) and "absolute,
  // jumped above button" (sub-out=1). CSS vars can't drive position-mode
  // changes, but data attrs can.
  document.body.dataset.subOut = String(subOut);
  // Track the button's actual height so the sub can be translated by exactly
  // -btnH-gap to land just above the button, regardless of padding/scale.
  try {
    const el = btnEl || document.querySelector('.hd-cta');
    if (el) {
      document.body.style.setProperty('--btn-h', el.clientHeight + 'px');
    }
  } catch (_) {}

  try {
    if (document.body.dataset.mashLocked === '1') {
      const row = (btnEl && btnEl.parentElement) || document.querySelector('.kudos-row');
      if (row) {
        const cs = getComputedStyle(row);
        const tMatch = cs.transform && cs.transform.match(/matrix\(([^)]+)\)/);
        const tY = tMatch ? parseFloat(tMatch[1].split(',')[5]) || 0 : 0;
        const r = row.getBoundingClientRect();
        const naturalCy = (r.top - tY) + r.height / 2;
        const vh = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
        const targetCy = vh * 0.85;
        const dy = Math.round(targetCy - naturalCy);
        document.body.style.setProperty('--btn-dy', dy + 'px');
      }
    }
  } catch (_) {}
  // Level — Math.floor(pressCount / 100), capped at 10. Surfaces level paint
  // hooks for body[data-mash-level="N"] CSS rules later.
  const level = Math.min(Math.floor(pressCount / 100), 10);
  const prevLevel = parseInt(document.body.dataset.mashLevel || '0', 10);
  if (level > 0) document.body.dataset.mashLevel = String(level);
  else delete document.body.dataset.mashLevel;
}

/**
 * Dump z-index stack for the mash game so we can debug visibility issues.
 * Logs the canvas + kudos-row + their ancestors that create stacking contexts.
 */
export function dumpMashLayers(tag = '') {
  if (typeof document === 'undefined') return;
  const canvas = document.getElementById('mash-canvas');
  const row = document.querySelector('.kudos-row');
  const dump = (el, label) => {
    if (!el) return { label, missing: true };
    const cs = getComputedStyle(el);
    return {
      label,
      tag: el.tagName + (el.className ? '.' + String(el.className).split(' ').join('.') : ''),
      z: cs.zIndex,
      pos: cs.position,
      opacity: cs.opacity,
      transform: cs.transform === 'none' ? '-' : cs.transform,
      backdropFilter: cs.backdropFilter || '-',
      filter: cs.filter || '-',
    };
  };
  // Walk up from row, collecting any ancestor that creates a stacking context.
  const ancestors = [];
  let cur = row && row.parentElement;
  while (cur && cur !== document.body) {
    const cs = getComputedStyle(cur);
    const createsContext =
      (cs.position !== 'static' && cs.zIndex !== 'auto') ||
      cs.transform !== 'none' ||
      cs.filter !== 'none' ||
      cs.backdropFilter !== 'none' ||
      cs.isolation === 'isolate' ||
      cs.contain.includes('layout') || cs.contain.includes('paint');
    if (createsContext) {
      ancestors.push({
        tag: cur.tagName + (cur.className ? '.' + String(cur.className).split(' ').join('.') : ''),
        z: cs.zIndex,
        pos: cs.position,
        backdropFilter: cs.backdropFilter || '-',
        transform: cs.transform === 'none' ? '-' : cs.transform,
      });
    }
    cur = cur.parentElement;
  }
}

/**
 * Diagnostic layout dumper — logs the rect, transforms, and CSS vars for the
 * button + overlay + mash-num + mash-sub so we can see exactly where things
 * are landing on the device. Use to debug positioning issues during the first
 * 25 presses (and the burn message at session end).
 *
 * Call from KudosCta on tagged presses: `dumpMashLayout('press 5')`.
 */
export function dumpMashLayout(tag = '') {
  if (typeof document === 'undefined') return;
  const btn = document.querySelector('.hd-cta');
  const overlay = document.querySelector('.hd-cta-mash');
  const num = document.querySelector('.mash-num');
  const sub = document.querySelector('.mash-sub');
  const row = document.querySelector('.kudos-row');

  const snap = (el, name) => {
    if (!el) return { name, missing: true };
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      name,
      rect: {
        x: Math.round(r.left),
        y: Math.round(r.top),
        w: Math.round(r.width),
        h: Math.round(r.height),
        cx: Math.round(r.left + r.width / 2),
        cy: Math.round(r.top + r.height / 2),
      },
      pos: cs.position,
      transform: cs.transform === 'none' ? '-' : cs.transform,
      zIndex: cs.zIndex,
      display: cs.display,
      flex: cs.justifyContent === 'normal' && cs.alignItems === 'normal'
        ? '-'
        : `${cs.justifyContent} / ${cs.alignItems}`,
      classes: el.className,
      text: el.textContent ? el.textContent.slice(0, 40) : '',
    };
  };

  const bodyStyle = document.body.style;
  const vars = {
    '--btn-h': bodyStyle.getPropertyValue('--btn-h') || '-',
    '--btn-dx': bodyStyle.getPropertyValue('--btn-dx') || '-',
    '--btn-dy': bodyStyle.getPropertyValue('--btn-dy') || '-',
    '--migration-progress': bodyStyle.getPropertyValue('--migration-progress') || '-',
    '--canvas-radius': bodyStyle.getPropertyValue('--canvas-radius') || '-',
    '--sub-out': bodyStyle.getPropertyValue('--sub-out') || '-',
    '--mash-scale': btn ? getComputedStyle(btn).getPropertyValue('--mash-scale') || '-' : '-',
    '--hd-rest': btn ? btn.style.getPropertyValue('--hd-rest') || '-' : '-',
    '--hd-rest-y': btn ? btn.style.getPropertyValue('--hd-rest-y') || '-' : '-',
    '--hd-pad-y': btn ? btn.style.getPropertyValue('--hd-pad-y') || '-' : '-',
  };
  const flags = {
    mashLocked: document.body.dataset.mashLocked || '-',
    mashing: document.body.dataset.mashing || '-',
    gameClock: document.body.dataset.gameClock || '-',
    mashMode: document.body.dataset.mashMode || '-',
    ambChallenge: document.body.dataset.ambChallenge || '-',
    btnIntensity: btn ? btn.dataset.intensity || '-' : '-',
  };
  const vp = {
    inner: { w: window.innerWidth, h: window.innerHeight },
    visual: window.visualViewport
      ? { w: Math.round(window.visualViewport.width), h: Math.round(window.visualViewport.height) }
      : null,
  };

  // Print flat strings so the values are visible inline (no need to click
  // through collapsed object groups in the console).
  const fmt = (s) => !s
    ? `MISSING`
    : `rect=(x=${s.rect.x}, y=${s.rect.y}, w=${s.rect.w}, h=${s.rect.h}, cx=${s.rect.cx}, cy=${s.rect.cy}) pos=${s.pos} z=${s.zIndex} display=${s.display} flex=${s.flex} transform=${s.transform} text="${s.text}"`;

  const lines = [];
  lines.push(`────── [mash-layout] ${tag} ──────`);
  lines.push(`viewport: inner=${vp.inner.w}x${vp.inner.h}` + (vp.visual ? ` visual=${vp.visual.w}x${vp.visual.h}` : ''));
  lines.push(`flags:    ` + Object.entries(flags).map(([k, v]) => `${k}=${v}`).join('  '));
  lines.push(`vars:     ` + Object.entries(vars).map(([k, v]) => `${k}=${String(v).trim() || '-'}`).join('  '));
  lines.push(`row:      ${fmt(snap(row, 'row'))}`);
  lines.push(`btn:      ${fmt(snap(btn, 'btn'))}`);
  lines.push(`overlay:  ${fmt(snap(overlay, 'overlay'))}`);
  lines.push(`num:      ${fmt(snap(num, 'num'))}`);
  lines.push(`sub:      ${fmt(snap(sub, 'sub'))}`);

  if (btn) {
    const br = btn.getBoundingClientRect();
    const rel = (el) => {
      if (!el) return 'MISSING';
      const r = el.getBoundingClientRect();
      const dx = Math.round((r.left + r.width / 2) - (br.left + br.width / 2));
      const dy = Math.round((r.top + r.height / 2) - (br.top + br.height / 2));
      return `cx-offset=${dx} cy-offset=${dy} (top-edge=${Math.round(r.top - br.top)} bottom-edge=${Math.round(br.bottom - r.bottom)} left-edge=${Math.round(r.left - br.left)} right-edge=${Math.round(br.right - r.right)})`;
    };
    lines.push(`num→btn:  ${rel(num)}   ← cx/cy=0 means perfectly centered in button`);
    lines.push(`sub→btn:  ${rel(sub)}`);
  }

  // ── Visibility / fold-of-viewport check ─────────────────────────────────
  // Does the button fit inside the actually-visible viewport (visualViewport
  // for Android Chrome with bottom system UI, or innerHeight as fallback)?
  if (btn) {
    const br = btn.getBoundingClientRect();
    const vh = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
    const vw = (window.visualViewport && window.visualViewport.width) || window.innerWidth;
    const aboveFold = Math.max(0, Math.round(0 - br.top));
    const belowFold = Math.max(0, Math.round(br.bottom - vh));
    const offLeft = Math.max(0, Math.round(0 - br.left));
    const offRight = Math.max(0, Math.round(br.right - vw));
    const fullyVisible = !aboveFold && !belowFold && !offLeft && !offRight;
    lines.push(`btn-fit:  ${fullyVisible ? 'OK — fully in viewport' : 'CLIPPED'}` +
      (aboveFold ? ` | ${aboveFold}px ABOVE top` : '') +
      (belowFold ? ` | ${belowFold}px BELOW fold` : '') +
      (offLeft  ? ` | ${offLeft}px OFF LEFT`     : '') +
      (offRight ? ` | ${offRight}px OFF RIGHT`   : '') +
      ` (btn ${Math.round(br.top)}..${Math.round(br.bottom)} vs viewport 0..${vh})`);
  }

  // ── Overlap detection between text elements ────────────────────────────
  // Visually two elements overlap when their bounding boxes intersect AND
  // they're on the same z-layer (we just print rect overlap; user can judge).
  const rectOverlap = (a, b) => {
    if (!a || !b) return null;
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    const xOverlap = Math.max(0, Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left));
    const yOverlap = Math.max(0, Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top));
    if (xOverlap === 0 || yOverlap === 0) return 'NO overlap';
    return `OVERLAP ${Math.round(xOverlap)}px × ${Math.round(yOverlap)}px ` +
      `(a: y=${Math.round(ra.top)}..${Math.round(ra.bottom)}, b: y=${Math.round(rb.top)}..${Math.round(rb.bottom)})`;
  };
  lines.push(`num↔sub:  ${rectOverlap(num, sub) || '-'}    ← should always be NO overlap`);
  if (btn) {
    // num and sub each vs button — confirms whether they're inside or hanging out
    const inside = (el, label) => {
      if (!el) return `${label}: MISSING`;
      const r = el.getBoundingClientRect();
      const br = btn.getBoundingClientRect();
      const fullyInside = r.top >= br.top && r.bottom <= br.bottom && r.left >= br.left && r.right <= br.right;
      const above = r.bottom <= br.top;
      const below = r.top >= br.bottom;
      let where;
      if (fullyInside) where = 'INSIDE button';
      else if (above) where = `ABOVE button (gap=${Math.round(br.top - r.bottom)}px)`;
      else if (below) where = `BELOW button (gap=${Math.round(r.top - br.bottom)}px)`;
      else where = `STRADDLES button edge (top out by ${Math.max(0, Math.round(br.top - r.top))}px, bottom out by ${Math.max(0, Math.round(r.bottom - br.bottom))}px)`;
      return `${label}: ${where}`;
    };
    lines.push(`num where: ${inside(num, 'num')}`);
    lines.push(`sub where: ${inside(sub, 'sub')}`);
  }

  // ── Layout-shift drift ──────────────────────────────────────────────────
  // The migration delta was captured at press 1. If the surrounding layout
  // has changed since (e.g. EggMansTake text loaded after press 1 and grew
  // the card), the row's natural position has drifted. Print the natural
  // row Y vs original to expose this.
  if (row) {
    const rowR = row.getBoundingClientRect();
    const cs = getComputedStyle(row);
    const tMatch = cs.transform.match(/matrix\(([^)]+)\)/);
    const tY = tMatch ? parseFloat(tMatch[1].split(',')[5]) : 0;
    const naturalY = Math.round(rowR.top - tY);
    lines.push(`row drift: row.top=${Math.round(rowR.top)} - transformY=${Math.round(tY)} = naturalY=${naturalY}` +
      ` (if naturalY changes between presses, surrounding content has shifted the row)`);
  }
  lines.push(`──────────────────────────────────`);
}

export function clearMashEnergy() {
  document.body.style.removeProperty('--mash-energy');
  document.body.style.removeProperty('--mash-overdrive');
  document.body.style.removeProperty('--canvas-radius');
  document.body.style.removeProperty('--migration-progress');
  document.body.style.removeProperty('--migration-fast');
  document.body.style.removeProperty('--btn-start-x');
  document.body.style.removeProperty('--btn-start-y');
  document.body.style.removeProperty('--btn-w');
  document.body.style.removeProperty('--btn-dx');
  document.body.style.removeProperty('--btn-dy');
  document.body.style.removeProperty('--btn-drag-x');
  document.body.style.removeProperty('--btn-drag-y');
  document.body.style.removeProperty('--sub-out');
  document.body.style.removeProperty('--btn-h');
  document.body.style.removeProperty('--game-accent');
  delete document.body.dataset.mashing;
  delete document.body.dataset.eggsRainbow;
  delete document.body.dataset.mashLevel;
  delete document.body.dataset.mashLocked;
  delete document.body.dataset.snapBack;
  delete document.body.dataset.subOut;
  delete document.body.dataset.pigAvatar;
}

// ─────────────────────────────────────────────────────────────────────────────
// purgeMashWorld — comprehensive end-of-session cleanup. Removes every
// spawned DOM node from any mode, restores body + canvas backgrounds, and
// resets every CSS var / data attribute the mash system writes. Called from
// KudosCta.enterIdleState() after the save/burn cycle finishes.
//
// This is the safety net for: animations that didn't finish naturally,
// modes that crashed mid-cleanup, leftover floaters, drag offsets, sky-
// takeover backgrounds, etc. After this runs, the page should be visually
// indistinguishable from a fresh load — no orphaned stars, eggs, beers,
// pigs, balls, avatars, ripples, or text floaters.
// ─────────────────────────────────────────────────────────────────────────────
export function purgeMashWorld() {
  if (typeof document === 'undefined') return;
  // 1. Remove every spawned DOM node — every class the mash system uses
  //    for a transient floating element.
  const PURGE_SELECTORS = [
    '.flying-hot-dog',
    '.flying-egg',
    '.flying-golden-egg',
    '.flying-twilight-star',
    '.phrase-char',
    '.pig-attacker',
    '.pig-target-avatar',
    '.pong-ball',
    '.flying-rare',
    '.level-up-overlay',
  ];
  let purged = 0;
  PURGE_SELECTORS.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      try { el.getAnimations && el.getAnimations().forEach((a) => a.cancel()); } catch (_) {}
      try { el.remove(); purged += 1; } catch (_) {}
    });
  });
  // Active hot-dog / egg counter — reset so the spawn cap is honoured cleanly.
  activeHotDogs = 0;

  // 2. Restore body + canvas backgrounds (Twilight overrides them; if its
  //    cleanup didn't run for any reason, restore here).
  document.body.style.background = '';
  const canvas = document.getElementById('mash-canvas');
  if (canvas) canvas.style.background = '';

  // 3. Force-clear any leftover director-side body data attrs that
  //    applyAmbient might not have cleared (defensive — applyAmbient
  //    already handles the idle path, but in case state is inconsistent).
  delete document.body.dataset.mashMode;
  delete document.body.dataset.buttonState;
  delete document.body.dataset.gameClock;
  delete document.body.dataset.ambFlying;
  delete document.body.dataset.ambBubble;
  delete document.body.dataset.ambChallenge;
  delete document.body.dataset.ambHeartbeat;
  delete document.body.dataset.ambFlash;
  delete document.body.dataset.ambShockwave;
  delete document.body.dataset.miniGameId;
  delete document.body.dataset.phaseKind;
  delete document.body.dataset.mashPhase;

}

const SHOCKWAVE_SELECTOR = [
  '.cal-section-label',
  '.event-name', '.event-meta span',
  '.event-desc', '.tags .tag',
  '.coming-card', '.coming-card .name', '.coming-card .meta',
  '.coming-card .date-stamp .day',
  '.coming-card .date-stamp .month',
  '.coming-card .date-stamp .weekday',
  '.archive-toggle',
  '.archive-card .arch-name',
  '.archive-card .arch-date',
  '.archive-card .arch-kudos',
  '.weather-desc', '.weather-extra', '.countdown-display', '.countdown-label',
  // Newer event-card elements that should also shake during mashing.
  '.event-status-chip',
  '.weather-pill',
  '.eggman-take',
  '.eggman-take-label',
  '.crew-name',
  '.crew-rank',
].join(',');

let _cachedShockwaveEls = null;

export function applyShockwave() {
  if (!_cachedShockwaveEls) _cachedShockwaveEls = document.querySelectorAll(SHOCKWAVE_SELECTOR);
  _cachedShockwaveEls.forEach(el => {
    el.style.setProperty('--jx', ((Math.random() - 0.5) * 2).toFixed(2));
    el.style.setProperty('--jy', ((Math.random() - 0.5) * 2).toFixed(2));
    el.style.setProperty('--jr', ((Math.random() - 0.5) * 2).toFixed(2));
  });
}

export function clearShockwave() {
  _cachedShockwaveEls = null;
  const els = document.querySelectorAll(SHOCKWAVE_SELECTOR);
  els.forEach(el => {
    el.style.removeProperty('--jx');
    el.style.removeProperty('--jy');
    el.style.removeProperty('--jr');
  });
}

export function rainbowChance(pressCount) {
  if (pressCount < 25) return 0;
  if (pressCount >= 100) return 1;
  return (pressCount - 25) / 75;
}

export function spawnHotDog(originBtn, opts = {}) {
  if (document.body.dataset.ambFlying === 'off') return;
  if (activeHotDogs >= MAX_ACTIVE_HOTDOGS) return;
  incActiveHotDogs();
  const emoji = opts.emoji || '🌭';
  const rect = originBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const angle = Math.random() * Math.PI * 2;
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const halfW = Math.max(rect.width / 2, 1);
  const halfH = Math.max(rect.height / 2, 1);
  const t = Math.min(halfW / Math.abs(dx || 1e-6), halfH / Math.abs(dy || 1e-6));
  const startX = cx + dx * t;
  const startY = cy + dy * t;
  const dist = 280 + Math.random() * 320;
  const endDx = dx * dist;
  const endDy = dy * dist;
  const rot = (Math.random() - 0.5) * 720;
  const dur = (1700 + Math.random() * 1200) * LIFETIME_SCALE;

  const hd = document.createElement('div');
  hd.className = 'flying-hot-dog' + (opts.rainbow ? ' is-rainbow' : '');
  hd.textContent = emoji;
  hd.style.cssText = `position:fixed;pointer-events:none;z-index:1000;font-size:36px;will-change:transform,opacity;left:${startX}px;top:${startY}px;`;
  document.body.appendChild(hd);

  let removed = false;
  const safeRemove = () => {
    if (removed) return;
    removed = true;
    hd.remove();
    decActiveHotDogs();
  };

  hd.animate(
    [
      { transform: 'translate(-50%,-50%) scale(0.2) rotate(0deg)', opacity: 0, offset: 0 },
      { transform: `translate(calc(-50% + ${dx * 8}px), calc(-50% + ${dy * 8}px)) scale(1) rotate(${rot * 0.1}deg)`, opacity: 1, offset: 0.12 },
      { transform: `translate(calc(-50% + ${endDx * 0.6}px), calc(-50% + ${endDy * 0.6}px)) scale(1) rotate(${rot * 0.6}deg)`, opacity: 0.85, offset: 0.6 },
      { transform: `translate(calc(-50% + ${endDx}px), calc(-50% + ${endDy}px)) scale(1) rotate(${rot}deg)`, opacity: 0, offset: 1 },
    ],
    { duration: dur, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
  ).onfinish = safeRemove;

  if (IS_MOBILE) {
    const checkAt = dur * 0.5;
    setTimeout(() => {
      if (removed || !hd.isConnected) return;
      const r = hd.getBoundingClientRect();
      const offscreen =
        r.right < 0 || r.bottom < 0 ||
        r.left > window.innerWidth || r.top > window.innerHeight;
      if (offscreen) safeRemove();
    }, checkAt);
  }
}

export function spawnRainbowEgg(originBtn) {
  if (document.body.dataset.ambFlying === 'off') return;
  if (activeHotDogs >= MAX_ACTIVE_HOTDOGS) return;
  incActiveHotDogs();
  const rect = originBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const angle = Math.random() * Math.PI * 2;
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const halfW = Math.max(rect.width / 2, 1);
  const halfH = Math.max(rect.height / 2, 1);
  const t = Math.min(halfW / Math.abs(dx || 1e-6), halfH / Math.abs(dy || 1e-6));
  const startX = cx + dx * t;
  const startY = cy + dy * t;
  const dist = 220 + Math.random() * 280;
  const endDx = dx * dist;
  const endDy = dy * dist;
  const rot = (Math.random() - 0.5) * 720;
  const dur = (1900 + Math.random() * 1300) * LIFETIME_SCALE;

  const eg = document.createElement('div');
  eg.className = 'flying-egg is-rainbow';
  eg.textContent = '🥚';
  eg.style.cssText = `position:fixed;pointer-events:none;z-index:1000;font-size:28px;will-change:transform,opacity;left:${startX}px;top:${startY}px;`;
  document.body.appendChild(eg);

  let removed = false;
  const safeRemove = () => {
    if (removed) return;
    removed = true;
    eg.remove();
    decActiveHotDogs();
  };

  eg.animate(
    [
      { transform: 'translate(-50%,-50%) scale(0.2) rotate(0deg)', opacity: 0, offset: 0 },
      { transform: `translate(calc(-50% + ${dx * 8}px), calc(-50% + ${dy * 8}px)) scale(1) rotate(${rot * 0.1}deg)`, opacity: 1, offset: 0.12 },
      { transform: `translate(calc(-50% + ${endDx * 0.6}px), calc(-50% + ${endDy * 0.6}px)) scale(1) rotate(${rot * 0.6}deg)`, opacity: 0.85, offset: 0.6 },
      { transform: `translate(calc(-50% + ${endDx}px), calc(-50% + ${endDy}px)) scale(1) rotate(${rot}deg)`, opacity: 0, offset: 1 },
    ],
    { duration: dur, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
  ).onfinish = safeRemove;

  if (IS_MOBILE) {
    const checkAt = dur * 0.5;
    setTimeout(() => {
      if (removed || !eg.isConnected) return;
      const r = eg.getBoundingClientRect();
      const offscreen =
        r.right < 0 || r.bottom < 0 ||
        r.left > window.innerWidth || r.top > window.innerHeight;
      if (offscreen) safeRemove();
    }, checkAt);
  }
}

export function flashBackground(pressCount) {
  if (document.body.dataset.ambFlash === 'off') return;
  if (pressCount < 10) return;
  const flash = document.getElementById('mash-flash');
  if (!flash) return;
  const hue = (pressCount * 47) % 360;
  const intensity = Math.min((pressCount - 10) / 40, 1);
  flash.animate(
    [
      { backgroundColor: `hsl(${hue}, 95%, 55%)`, opacity: 0.05 + intensity * 0.50 },
      { opacity: 0 }
    ],
    { duration: 220, easing: 'ease-out' }
  );
}

export function spawnPhrase(btn, phraseCooldownRef, phraseFifoRef, pressCount) {
  if (document.body.dataset.ambBubble === 'off') return;
  const now = Date.now();
  if (now < phraseCooldownRef.current) return;
  phraseCooldownRef.current = now + 5000;

  // Crew-specific taunts only unlock at press 30+. Before that use the
  // general pool so new users don't get insider references on press 1.
  const pool = (pressCount != null && pressCount >= 30) ? MASH_TEXT_POOL : MASH_TEXT_GENERAL;
  const phrase = pickMashText(pool, phraseFifoRef);

  const rect = btn.getBoundingClientRect();
  const baseY = rect.top - 8;

  // Render whole phrase as one wrapping element, centered horizontally,
  // so long phrases never push past the viewport edge.
  const span = document.createElement('span');
  span.className = 'phrase-char';
  span.textContent = phrase;
  span.style.cssText = [
    'position:fixed',
    'pointer-events:none',
    'z-index:1001',
    "font-family:'Fredoka',sans-serif",
    'font-weight:700',
    'font-size:26px',
    'background:linear-gradient(45deg,#FFE66D,#FF8800)',
    '-webkit-background-clip:text',
    '-webkit-text-fill-color:transparent',
    'background-clip:text',
    'will-change:transform,opacity',
    'left:50%',
    `top:${baseY}px`,
    'transform:translateX(-50%)',
    'max-width:calc(100vw - 24px)',
    'width:max-content',
    'text-align:center',
    'white-space:normal',
    'word-wrap:break-word',
    'overflow-wrap:break-word',
    'line-height:1.1',
    'opacity:0',
  ].join(';') + ';';
  document.body.appendChild(span);

  const drift = (Math.random() - 0.5) * 70;
  const wiggleA = 18 + Math.random() * 22;
  const rotA = (Math.random() - 0.5) * 36;
  // +30% pause time — bump the floating duration by 1.3x.
  const dur = (8500 + Math.random() * 900) * 1.3;

  // Trajectory phases (desktop dur ≈ 11.5s):
  //   0    →  1.0s  : initial burst, 0 → -82px (DOUBLED distance, 1s duration)
  //   1.0s →  5.0s  : 4-second pause, drifts -82 → -101 (~19px gentle hover)
  //   5.0s →  6.4s  : second burst kicks off, -101 → -180
  //   6.4s →  8.3s  : -180 → -320
  //   8.3s → 10.1s  : -320 → -460, opacity 1 → 0.85
  //  10.1s → 11.5s  : -460 → -600, fades to 0
  span.animate(
    [
      { transform: 'translate(-50%,0) rotate(0deg)', opacity: 0, offset: 0 },
      { transform: 'translate(-50%,-82px) rotate(0deg)', opacity: 1, offset: 0.087 },
      { transform: `translate(calc(-50% + ${(Math.random() - 0.5) * 3}px),-101px) rotate(${(Math.random() - 0.5) * 3}deg)`, opacity: 1, offset: 0.435 },
      { transform: `translate(calc(-50% + ${drift * 0.25 - wiggleA * 0.3}px),-180px) rotate(${rotA * 0.4}deg)`, opacity: 1, offset: 0.56 },
      { transform: `translate(calc(-50% + ${drift * 0.55 + wiggleA * 0.6}px),-320px) rotate(${rotA * 0.7}deg)`, opacity: 1, offset: 0.72 },
      { transform: `translate(calc(-50% + ${drift * 0.82 - wiggleA * 0.4}px),-460px) rotate(${rotA * 0.9}deg)`, opacity: 0.85, offset: 0.88 },
      { transform: `translate(calc(-50% + ${drift}px),-600px) rotate(${rotA}deg)`, opacity: 0, offset: 1 },
    ],
    { duration: dur, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
  ).onfinish = () => span.remove();
}

// ─── Gamification: deferred (user is brainstorming, not shipping) ──────────
// Helpers below (spawnRareBonus, spawnLevelUp) are kept as dead code in the
// module, never called from KudosCta. They're not exported anywhere they'd
// load. Tree-shaker drops them from the bundle since nothing imports them.

const RARE_ICONS = ['🌟', '💎', '🏆', '🍩', '🦄'];

// eslint-disable-next-line no-unused-vars
function spawnRareBonus(onClaim) {
  if (typeof document === 'undefined') return;
  // Don't pile rare bonuses up on low-tier — at most 1 in flight.
  if (document.querySelectorAll('.flying-rare').length >= 2) return;

  const dir = Math.random() < 0.5 ? 1 : -1;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const startX = dir === 1 ? -80 : w + 80;
  const endX = dir === 1 ? w + 80 : -80;
  // Mid-band of the viewport so the user can actually reach it.
  const y = h * (0.30 + Math.random() * 0.35);
  const dur = 4200 + Math.random() * 1200;
  const icon = RARE_ICONS[Math.floor(Math.random() * RARE_ICONS.length)];
  const bonus = 50 + Math.floor(Math.random() * 151); // +50…+200

  const el = document.createElement('div');
  el.className = 'flying-rare';
  el.textContent = icon;
  el.style.cssText = [
    'position:fixed',
    'pointer-events:auto',
    'cursor:pointer',
    'z-index:1500',
    'font-size:48px',
    'will-change:transform,opacity',
    'filter:drop-shadow(0 0 14px rgba(255,215,0,0.9)) drop-shadow(0 0 28px rgba(255,140,0,0.6))',
    `left:${startX}px`,
    `top:${y}px`,
    'user-select:none',
    '-webkit-user-select:none',
    'touch-action:manipulation',
  ].join(';') + ';';
  document.body.appendChild(el);

  let claimed = false;
  let removed = false;
  const safeRemove = () => {
    if (removed) return;
    removed = true;
    el.remove();
  };

  const anim = el.animate(
    [
      { transform: 'translate(-50%,-50%) scale(0.4) rotate(0deg)', opacity: 0, offset: 0 },
      { transform: 'translate(-50%,-50%) scale(1) rotate(0deg)', opacity: 1, offset: 0.08 },
      { transform: `translate(${endX - startX}px, ${(Math.random() - 0.5) * 80}px) scale(1) rotate(${dir * 360}deg)`, opacity: 1, offset: 0.92 },
      { transform: `translate(${endX - startX}px, 0) scale(0.6) rotate(${dir * 380}deg)`, opacity: 0, offset: 1 },
    ],
    { duration: dur, easing: 'linear', fill: 'forwards' }
  );
  anim.onfinish = safeRemove;

  el.addEventListener('click', (e) => {
    e.stopPropagation();
    if (claimed) return;
    claimed = true;
    try { anim.cancel(); } catch (_) {}
    // Pop feedback
    const rect = el.getBoundingClientRect();
    const burst = document.createElement('div');
    burst.textContent = `+${bonus}!`;
    burst.style.cssText = [
      'position:fixed',
      'pointer-events:none',
      'z-index:1600',
      `left:${rect.left + rect.width / 2}px`,
      `top:${rect.top + rect.height / 2}px`,
      "font-family:'Fredoka',sans-serif",
      'font-weight:700',
      'font-size:42px',
      'color:#FFD700',
      'text-shadow:0 0 16px rgba(255,215,0,0.95),0 0 32px rgba(255,140,0,0.8),0 3px 10px rgba(0,0,0,0.7)',
      'transform:translate(-50%,-50%)',
      'will-change:transform,opacity',
    ].join(';') + ';';
    document.body.appendChild(burst);
    burst.animate(
      [
        { transform: 'translate(-50%,-50%) scale(0.4)', opacity: 0, offset: 0 },
        { transform: 'translate(-50%,-50%) scale(1.3)', opacity: 1, offset: 0.2 },
        { transform: 'translate(-50%,-110px) scale(1)', opacity: 1, offset: 0.7 },
        { transform: 'translate(-50%,-180px) scale(0.9)', opacity: 0, offset: 1 },
      ],
      { duration: 1200, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
    ).onfinish = () => burst.remove();
    safeRemove();
    try { onClaim && onClaim(bonus); } catch (_) {}
  }, { once: true });
}

// ─── Gamification: level-up popup ──────────────────────────────────────────
// Briefly flashes "LEVEL N" overlay at 100/200/.../1000. Level 10 gets a
// gold treatment and longer hold. Single DOM node; ~1.4s lifetime.
// eslint-disable-next-line no-unused-vars
function spawnLevelUp(level) {
  if (typeof document === 'undefined') return;
  const isMax = level >= 10;
  const dur = isMax ? 2600 : 1400;
  const el = document.createElement('div');
  el.className = 'level-up-overlay';
  el.style.cssText = [
    'position:fixed',
    'left:50%',
    'top:38%',
    'transform:translate(-50%,-50%)',
    'pointer-events:none',
    'z-index:1700',
    "font-family:'Fredoka',sans-serif",
    'font-weight:700',
    'font-size:clamp(40px, 12vw, 96px)',
    'letter-spacing:0.06em',
    'text-align:center',
    'will-change:transform,opacity',
    'white-space:nowrap',
    isMax
      ? 'color:#FFD700;text-shadow:0 0 24px rgba(255,215,0,1),0 0 48px rgba(255,180,0,0.95),0 0 96px rgba(255,140,0,0.8),0 6px 20px rgba(0,0,0,0.85)'
      : 'color:#fff;text-shadow:0 0 16px rgba(255,255,255,0.95),0 0 36px rgba(255,199,44,0.8),0 4px 14px rgba(0,0,0,0.85)',
  ].join(';') + ';';
  el.innerHTML = isMax
    ? `<div style="font-size:0.5em;letter-spacing:0.2em;opacity:0.95">MAX LEVEL</div><div>LEVEL ${level}</div>`
    : `<div style="font-size:0.45em;letter-spacing:0.2em;opacity:0.85">LEVEL UP</div><div>LEVEL ${level}</div>`;
  document.body.appendChild(el);

  el.animate(
    isMax
      ? [
          { transform: 'translate(-50%,-50%) scale(0.4)', opacity: 0, offset: 0 },
          { transform: 'translate(-50%,-50%) scale(1.25)', opacity: 1, offset: 0.10 },
          { transform: 'translate(-50%,-50%) scale(1.0)', opacity: 1, offset: 0.20 },
          { transform: 'translate(-50%,-50%) scale(1.05)', opacity: 1, offset: 0.85 },
          { transform: 'translate(-50%,-50%) scale(0.95)', opacity: 0, offset: 1 },
        ]
      : [
          { transform: 'translate(-50%,-50%) scale(0.5)', opacity: 0, offset: 0 },
          { transform: 'translate(-50%,-50%) scale(1.2)', opacity: 1, offset: 0.18 },
          { transform: 'translate(-50%,-50%) scale(1.0)', opacity: 1, offset: 0.30 },
          { transform: 'translate(-50%,-50%) scale(1.0)', opacity: 1, offset: 0.75 },
          { transform: 'translate(-50%,-50%) scale(0.9)', opacity: 0, offset: 1 },
        ],
    { duration: dur, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
  ).onfinish = () => el.remove();
}
