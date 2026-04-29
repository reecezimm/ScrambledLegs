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
  const idle = !next.miniGameId;

  if (idle) {
    // Idle (no active mini-game): wipe ALL mini-game body data attrs and
    // CSS vars so no stale state lingers. Existing ambient systems
    // (spawnHotDog, spawnPhrase, setMashEnergy, etc.) treat absent attrs
    // as "default" and run normally.
    delete body.dataset.mashMode;
    delete body.dataset.buttonState;
    delete body.dataset.gameClock;
    delete body.dataset.ambFlying;
    delete body.dataset.ambBubble;
    delete body.dataset.ambChallenge;
    delete body.dataset.ambHeartbeat;
    delete body.dataset.ambFlash;
    delete body.dataset.ambShockwave;
    delete body.dataset.miniGameId;
    delete body.dataset.phaseKind;
    delete body.dataset.subOut;
    body.style.removeProperty('--game-accent');
    return;
  }

  setAttr(body, 'mashMode', next.mashingMode || 'normal');
  setAttr(body, 'buttonState', next.buttonState || 'visible');
  setAttr(body, 'gameClock', next.gameClockPaused ? 'paused' : 'run');

  const amb = next.ambient || {};
  setAmbAttr(body, 'flying', amb.flyingEmojis);
  setAmbAttr(body, 'bubble', amb.bubbleText);
  setAmbAttr(body, 'challenge', amb.challengeText);
  setAmbAttr(body, 'heartbeat', amb.heartbeat);
  setAmbAttr(body, 'flash', amb.flash);
  setAmbAttr(body, 'shockwave', amb.shockwave);

  const accent = next.presentation && next.presentation.accentColor;
  if (accent) body.style.setProperty('--game-accent', accent);
  else body.style.removeProperty('--game-accent');

  body.dataset.miniGameId = next.miniGameId;

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
