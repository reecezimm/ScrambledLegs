// Module-level counter shared across all KudosCta instances
// (so different cards don't get independent counters that fight each other)
export let activeHotDogs = 0;

const IS_MOBILE = typeof window !== 'undefined' &&
  window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

// Simple mobile-vs-desktop scaling. Mobile gets a 15% cap reduction
// (80→68) and a 25% shorter lifetime to keep paint cost tolerable.
export const MAX_ACTIVE_HOTDOGS = IS_MOBILE ? 68 : 80;
const LIFETIME_SCALE = IS_MOBILE ? 0.75 : 1.0;

export function incActiveHotDogs() { activeHotDogs++; }
export function decActiveHotDogs() { activeHotDogs = Math.max(0, activeHotDogs - 1); }

export function setMashEnergy(pressCount) {
  const energy = Math.min(Math.max(pressCount / 25, 0), 1);
  const overdrive = Math.min(Math.max((pressCount - 50) / 50, 0), 1);
  document.body.style.setProperty('--mash-energy', energy.toFixed(3));
  document.body.style.setProperty('--mash-overdrive', overdrive.toFixed(3));
  if (pressCount > 0) document.body.dataset.mashing = '1';
  else delete document.body.dataset.mashing;
  if (pressCount >= 50) document.body.dataset.eggsRainbow = '1';
  else delete document.body.dataset.eggsRainbow;

  // ── Mash Game state ──
  // Canvas grows on an ease-in curve across presses 1→50: slow at first,
  // accelerating as press count climbs. pow(t, 2.4) ≈ ~10% radius at press 25,
  // ~50% at press 38, full at press 50.
  const tCanvas = Math.min(pressCount / 50, 1);
  const canvasRadius = Math.pow(tCanvas, 2.4);
  document.body.style.setProperty('--canvas-radius', canvasRadius.toFixed(3));
  // Button migration toward the bottom-third anchor across presses 1→25.
  const migration = Math.min(pressCount / 25, 1);
  document.body.style.setProperty('--migration-progress', migration.toFixed(3));
  // Sub-text lift — challenge text floats above button starting press 40,
  // fully out of button by press 50 (canvas takeover complete).
  const subOut = Math.max(0, Math.min(1, (pressCount - 40) / 10));
  document.body.style.setProperty('--sub-out', subOut.toFixed(3));
  // Level — Math.floor(pressCount / 100), capped at 10. Surfaces level paint
  // hooks for body[data-mash-level="N"] CSS rules later.
  const level = Math.min(Math.floor(pressCount / 100), 10);
  const prevLevel = parseInt(document.body.dataset.mashLevel || '0', 10);
  if (level > 0) document.body.dataset.mashLevel = String(level);
  else delete document.body.dataset.mashLevel;
  if (level !== prevLevel && level > 0) {
    console.log('[mash-game] LEVEL', level, '— pressCount', pressCount);
  }
  // Stage transition logs at key thresholds
  if (pressCount === 1 || pressCount === 25 || pressCount === 50) {
    if (pressCount === 25) console.log('[mash-game] migration complete (button anchored)');
    if (pressCount === 50) console.log('[mash-game] canvas full — UI takeover');
    dumpMashLayers(`press ${pressCount}`);
  }
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
  console.log('[mash-layers]', tag);
  console.log('  canvas:', dump(canvas, 'canvas'));
  console.log('  row:   ', dump(row, 'row'));
  if (ancestors.length === 0) {
    console.log('  row ancestors creating stacking contexts: NONE');
  } else {
    console.log(`  row ancestors creating stacking contexts (${ancestors.length}, child→root):`);
    ancestors.forEach((a, i) => {
      console.log(`    [${i}]`, a.tag, '| z=' + a.z, '| pos=' + a.pos, '| backdrop=' + a.backdropFilter, '| transform=' + a.transform);
    });
  }
}

export function clearMashEnergy() {
  document.body.style.removeProperty('--mash-energy');
  document.body.style.removeProperty('--mash-overdrive');
  document.body.style.removeProperty('--canvas-radius');
  document.body.style.removeProperty('--migration-progress');
  document.body.style.removeProperty('--btn-start-x');
  document.body.style.removeProperty('--btn-start-y');
  document.body.style.removeProperty('--btn-w');
  document.body.style.removeProperty('--btn-dx');
  document.body.style.removeProperty('--btn-dy');
  document.body.style.removeProperty('--sub-out');
  delete document.body.dataset.mashing;
  delete document.body.dataset.eggsRainbow;
  delete document.body.dataset.mashLevel;
  delete document.body.dataset.mashLocked;
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

export function applyShockwave() {
  const els = document.querySelectorAll(SHOCKWAVE_SELECTOR);
  els.forEach(el => {
    el.style.setProperty('--jx', ((Math.random() - 0.5) * 2).toFixed(2));
    el.style.setProperty('--jy', ((Math.random() - 0.5) * 2).toFixed(2));
    el.style.setProperty('--jr', ((Math.random() - 0.5) * 2).toFixed(2));
  });
}

export function clearShockwave() {
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

export function spawnPhrase(btn, phraseCooldownRef, lastPhraseIndexRef) {
  const now = Date.now();
  if (now < phraseCooldownRef.current) return;
  phraseCooldownRef.current = now + 5000;

  const PHRASES = [
    // Core
    "Get crackin'!", "Egg-cellent!", "Sunny side up!", "You rock!",
    "Send it!", "Grease lightning!", "Mustard moves!", "Wheels up!",
    "Yolks on you!", "Hot dog hero!", "Crank it!", "Sender alert!",
    "Scrambled glory!", "Pedal punisher!", "Bun voyage!",
    "You're in! 🥚", "Roll call answered!", "See you Wednesday!",
    "Yolked + stoked!", "Eggs-traordinary!", "Cracked it!",
    "On the roster!", "Whisk on!", "Wednesday loading…",
    "Locked and loaded!",
    // Mash team hype (replaces DOG MODE ACTIVATED + diversifies pool)
    "LET'S GET SCRAMBLED", "CRACK 'EM ALL", "YOLK ON FIRE",
    "FULL SEND", "EGG MODE: ON",
    // Jordan / Bad Egg
    "Bad Egg approved!", "Jordan would run. You ride.",
    // SWIDZ
    "SWIDZ would send it!", "Dave's at the bar — keep going!",
    // Pig Boy
    "Pig Boy's watching!", "Pig Boy's wrist approves!",
    // Reed
    "Reed's on a lake!", "Boundary waters can wait!",
    // Casey Newton
    "Dad speed activated!", "Dr. Newton is proud!",
    // Tyler VANDAL
    "VANDAL will finish. Always.", "Vandal heard this story twice!",
    // Matt Wiley
    "Wiley showed up late and crushed it!", "IPA energy!",
    // Derek VanSlyke
    "Derek's in Spandex. You're not.", "Trail life, no Spandex!",
    // Will Markes
    "Markes believes in you!", "Will puts in the work!",
    // Paul Manoppo
    "Manoppo had 6 surgeries. Still faster.", "Comeback energy!",
    // Glarbtron
    "GLARBTRON approves!", "Supreme entity satisfied.",
    // Brent St. Martin
    "Brent hates this. You love it.", "Not Brent's fun — yours!",
    // Alex Birno
    "Birno is on the back nine!", "Snowmobile in July energy!",
  ];
  let i;
  do { i = Math.floor(Math.random() * PHRASES.length); }
  while (i === lastPhraseIndexRef.current && PHRASES.length > 1);
  lastPhraseIndexRef.current = i;
  const phrase = PHRASES[i];

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

  span.animate(
    [
      { transform: 'translate(-50%,0) rotate(0deg)', opacity: 0, offset: 0 },
      { transform: 'translate(-50%,-34px) rotate(0deg)', opacity: 1, offset: 0.05 },
      { transform: `translate(calc(-50% + ${(Math.random() - 0.5) * 3}px),-50px) rotate(${(Math.random() - 0.5) * 3}deg)`, opacity: 1, offset: 0.40 },
      { transform: `translate(calc(-50% + ${drift * 0.25 - wiggleA * 0.3}px),-110px) rotate(${rotA * 0.4}deg)`, opacity: 1, offset: 0.55 },
      { transform: `translate(calc(-50% + ${drift * 0.55 + wiggleA * 0.6}px),-220px) rotate(${rotA * 0.7}deg)`, opacity: 1, offset: 0.72 },
      { transform: `translate(calc(-50% + ${drift * 0.82 - wiggleA * 0.4}px),-340px) rotate(${rotA * 0.9}deg)`, opacity: 0.85, offset: 0.88 },
      { transform: `translate(calc(-50% + ${drift}px),-460px) rotate(${rotA}deg)`, opacity: 0, offset: 1 },
    ],
    { duration: dur, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
  ).onfinish = () => span.remove();
}

// ─── Gamification: deferred (user is brainstorming, not shipping) ──────────
// Helpers below (spawnRareBonus, spawnLevelUp) are kept as dead code in the
// module, never called from KudosCta. They're not exported anywhere they'd
// load. Tree-shaker drops them from the bundle since nothing imports them.

const RARE_ICONS = ['🌟', '💎', '🏆', '🍩', '🦄'];

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
