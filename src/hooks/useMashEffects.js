// Module-level counter shared across all KudosCta instances
// (so different cards don't get independent counters that fight each other)
export let activeHotDogs = 0;
export const MAX_ACTIVE_HOTDOGS = 80;

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
}

export function clearMashEnergy() {
  document.body.style.removeProperty('--mash-energy');
  document.body.style.removeProperty('--mash-overdrive');
  delete document.body.dataset.mashing;
  delete document.body.dataset.eggsRainbow;
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
  const dur = 1700 + Math.random() * 1200;

  const hd = document.createElement('div');
  hd.className = 'flying-hot-dog' + (opts.rainbow ? ' is-rainbow' : '');
  hd.textContent = emoji;
  hd.style.cssText = `position:fixed;pointer-events:none;z-index:1000;font-size:36px;will-change:transform,opacity;left:${startX}px;top:${startY}px;`;
  document.body.appendChild(hd);

  hd.animate(
    [
      { transform: 'translate(-50%,-50%) scale(0.2) rotate(0deg)', opacity: 0, offset: 0 },
      { transform: `translate(calc(-50% + ${dx * 8}px), calc(-50% + ${dy * 8}px)) scale(1) rotate(${rot * 0.1}deg)`, opacity: 1, offset: 0.12 },
      { transform: `translate(calc(-50% + ${endDx * 0.6}px), calc(-50% + ${endDy * 0.6}px)) scale(1) rotate(${rot * 0.6}deg)`, opacity: 0.85, offset: 0.6 },
      { transform: `translate(calc(-50% + ${endDx}px), calc(-50% + ${endDy}px)) scale(1) rotate(${rot}deg)`, opacity: 0, offset: 1 },
    ],
    { duration: dur, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
  ).onfinish = () => { hd.remove(); decActiveHotDogs(); };
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
  const dur = 1900 + Math.random() * 1300;

  const eg = document.createElement('div');
  eg.className = 'flying-egg is-rainbow';
  eg.textContent = '🥚';
  eg.style.cssText = `position:fixed;pointer-events:none;z-index:1000;font-size:28px;will-change:transform,opacity;left:${startX}px;top:${startY}px;`;
  document.body.appendChild(eg);

  eg.animate(
    [
      { transform: 'translate(-50%,-50%) scale(0.2) rotate(0deg)', opacity: 0, offset: 0 },
      { transform: `translate(calc(-50% + ${dx * 8}px), calc(-50% + ${dy * 8}px)) scale(1) rotate(${rot * 0.1}deg)`, opacity: 1, offset: 0.12 },
      { transform: `translate(calc(-50% + ${endDx * 0.6}px), calc(-50% + ${endDy * 0.6}px)) scale(1) rotate(${rot * 0.6}deg)`, opacity: 0.85, offset: 0.6 },
      { transform: `translate(calc(-50% + ${endDx}px), calc(-50% + ${endDy}px)) scale(1) rotate(${rot}deg)`, opacity: 0, offset: 1 },
    ],
    { duration: dur, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
  ).onfinish = () => { eg.remove(); decActiveHotDogs(); };
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
  const baseX = rect.left + rect.width / 2;
  const baseY = rect.top - 8;
  const charWidth = 16;
  const totalWidth = phrase.length * charWidth;
  const startX = baseX - totalWidth / 2;

  [...phrase].forEach((ch, idx) => {
    const span = document.createElement('span');
    span.className = 'phrase-char';
    span.textContent = ch;
    span.style.cssText = `position:fixed;pointer-events:none;z-index:1001;font-family:'Fredoka',sans-serif;font-weight:700;font-size:26px;background:linear-gradient(45deg,#FFE66D,#FF8800);-webkit-background-clip:text;-webkit-text-fill-color:transparent;will-change:transform,opacity;left:${startX + idx * charWidth}px;top:${baseY}px;`;
    document.body.appendChild(span);

    const drift = (Math.random() - 0.5) * 70;
    const wiggleA = 18 + Math.random() * 22;
    const rotA = (Math.random() - 0.5) * 36;
    const dur = 8500 + Math.random() * 900 + idx * 45;
    const delay = idx * 60;

    span.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)', opacity: 0, offset: 0 },
        { transform: 'translate(0,-34px) rotate(0deg)', opacity: 1, offset: 0.05 },
        { transform: `translate(${(Math.random() - 0.5) * 3}px,-50px) rotate(${(Math.random() - 0.5) * 3}deg)`, opacity: 1, offset: 0.40 },
        { transform: `translate(${drift * 0.25 - wiggleA * 0.3}px,-110px) rotate(${rotA * 0.4}deg)`, opacity: 1, offset: 0.55 },
        { transform: `translate(${drift * 0.55 + wiggleA * 0.6}px,-220px) rotate(${rotA * 0.7}deg)`, opacity: 1, offset: 0.72 },
        { transform: `translate(${drift * 0.82 - wiggleA * 0.4}px,-340px) rotate(${rotA * 0.9}deg)`, opacity: 0.85, offset: 0.88 },
        { transform: `translate(${drift}px,-460px) rotate(${rotA}deg)`, opacity: 0, offset: 1 },
      ],
      { duration: dur, delay, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
    ).onfinish = () => span.remove();
  });
}
