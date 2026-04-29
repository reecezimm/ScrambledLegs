// ─────────────────────────────────────────────────────────────────────────────
// Apply resolved director state to the DOM. Side-effecting glue between the
// pure director and the existing ambient systems (KudosCta, useMashEffects).
//
// We write body data attributes (data-amb-*, data-mash-mode, data-game-clock,
// data-button-state) and a few CSS vars (--game-accent). The existing
// ambient code reads these as gates.
//
// All attributes are removed when there's no active mini-game so default
// behavior resumes.
// ─────────────────────────────────────────────────────────────────────────────

export function applySideEffects(prev, next) {
  if (typeof document === 'undefined') return;
  if (!next) return;

  const body = document.body;

  // Mashing mode: 'normal' | 'paused' | 'inverted'
  setAttr(body, 'mashMode', next.mashingMode || 'normal');

  // Button state: 'visible' | 'hidden' | 'roaming'
  setAttr(body, 'buttonState', next.buttonState || 'visible');

  // Game clock: 'run' | 'paused' (gates setMashEnergy visual updates)
  setAttr(body, 'gameClock', next.gameClockPaused ? 'paused' : 'run');

  // Ambient toggles
  const amb = next.ambient || {};
  setAmbAttr(body, 'flying', amb.flyingEmojis);
  setAmbAttr(body, 'bubble', amb.bubbleText);
  setAmbAttr(body, 'challenge', amb.challengeText);
  setAmbAttr(body, 'heartbeat', amb.heartbeat);
  setAmbAttr(body, 'flash', amb.flash);
  setAmbAttr(body, 'shockwave', amb.shockwave);

  // Mini-game accent color (presentation)
  const accent = next.presentation && next.presentation.accentColor;
  if (accent) body.style.setProperty('--game-accent', accent);
  else body.style.removeProperty('--game-accent');

  // Mini-game id for debug / per-game CSS hooks
  if (next.miniGameId) body.dataset.miniGameId = next.miniGameId;
  else delete body.dataset.miniGameId;

  // Phase kind (for status-zone display logic)
  if (next.phaseKind && next.phaseKind !== 'idle') body.dataset.phaseKind = next.phaseKind;
  else delete body.dataset.phaseKind;
}

function setAttr(el, key, value) {
  if (value == null) delete el.dataset[key];
  else el.dataset[key] = value;
}

// Ambient values can be 'on' | 'off' | 'frozen' | 'default' or an override
// object; for gating purposes we only need to encode 'off' and 'frozen' as
// data attributes the rest of the codebase can read. 'on'/'default' = clear.
function setAmbAttr(el, name, val) {
  const key = 'amb' + capitalize(name);
  if (val === 'off' || val === 'frozen') {
    el.dataset[key] = String(val);
  } else if (val && typeof val === 'object') {
    el.dataset[key] = 'override';
  } else {
    delete el.dataset[key];
  }
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
