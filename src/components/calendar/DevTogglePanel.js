// ─────────────────────────────────────────────────────────────────────────────
// Dev-only toggle for selecting which mini-game (or sequence) runs at press 50.
// Right-side fixed strip, collapsed by default, persists to localStorage.
// Visible only when localStorage 'sl_dev_panel' === '1' (toggle by tapping
// the small ▶ tab). Disable in prod by checking NODE_ENV.
// ─────────────────────────────────────────────────────────────────────────────
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gameStore } from '../../game/store';
import { GOLDEN_EGG, MASH_GAUNTLET, TWILIGHT, PIG_BOY_ATTACK, PONG, createDefaultInfiniteStrategy } from '../../game/miniGames';

const STORAGE_KEY = 'sl_dev_minigame_choice';
const PANEL_OPEN_KEY = 'sl_dev_panel_open';

const CHOICES = [
  { id: 'auto',          label: 'Auto (infinite loop)' },
  { id: 'golden-egg',    label: 'Golden Egg only' },
  { id: 'mash-gauntlet', label: 'Mash Gauntlet only' },
  { id: 'twilight',      label: 'Twilight only' },
  { id: 'pig-boy-attack', label: 'Pig Boy Attack only' },
  { id: 'pong',          label: 'Pong only' },
];

// Returns a schedule spec for gameStore.setSchedule. "auto" yields the
// infinite strategy (Golden Egg first, random rotation, 15-press gaps).
// The single-game options yield a one-item array (manual mode, no auto-
// refill — useful for isolating a single mini-game during testing).
function buildScheduleSpec(choiceId) {
  if (choiceId === 'auto') return { strategy: createDefaultInfiniteStrategy() };
  if (choiceId === 'golden-egg') return [GOLDEN_EGG];
  if (choiceId === 'mash-gauntlet') return [MASH_GAUNTLET];
  if (choiceId === 'twilight') return [TWILIGHT];
  if (choiceId === 'pig-boy-attack') return [PIG_BOY_ATTACK];
  if (choiceId === 'pong') return [PONG];
  return { strategy: createDefaultInfiniteStrategy() };
}

const Tab = styled.button`
  position: fixed;
  right: 0;
  top: 35%;
  z-index: 9300;
  width: 24px;
  height: 56px;
  border: none;
  border-radius: 8px 0 0 8px;
  background: rgba(20,20,28,0.85);
  color: #FFC72C;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: -2px 2px 10px rgba(0,0,0,0.4);
  user-select: none;
`;

const Panel = styled.div`
  position: fixed;
  right: 0;
  top: 30%;
  z-index: 9300;
  background: rgba(15,15,22,0.94);
  border: 1px solid rgba(255,199,44,0.35);
  border-right: none;
  border-radius: 12px 0 0 12px;
  padding: 12px 14px;
  box-shadow: -4px 4px 18px rgba(0,0,0,0.55);
  font-family: 'Inter', sans-serif;
  color: #f4f4f4;
  min-width: 180px;
`;

const Header = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #FFC72C;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
  padding: 0 4px;
`;

const Row = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 4px;
  cursor: pointer;
  font-size: 13px;
  color: ${(p) => (p.$active ? '#FFE66D' : '#ccc')};
  font-weight: ${(p) => (p.$active ? '700' : '400')};

  input { accent-color: #FFC72C; cursor: pointer; }
`;

const ResetBtn = styled.button`
  margin-top: 10px;
  width: 100%;
  background: rgba(255,107,107,0.18);
  border: 1px solid rgba(255,107,107,0.5);
  color: #ff9b9b;
  padding: 6px 10px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
`;

// Strict local-dev detection: must be a development build AND running on
// localhost / 127.0.0.1 / 0.0.0.0. Production builds and any non-local host
// (deploy preview, staging, prod) hide the panel entirely.
const IS_DEV = (() => {
  if (process.env.NODE_ENV !== 'development') return false;
  if (typeof window === 'undefined') return false;
  const host = window.location && window.location.hostname;
  if (!host) return false;
  return host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0';
})();

export default function DevTogglePanel() {
  const [open, setOpen] = useState(() => {
    try { return localStorage.getItem(PANEL_OPEN_KEY) === '1'; }
    catch (_) { return false; }
  });
  const [choice, setChoice] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || 'auto'; }
    catch (_) { return 'auto'; }
  });

  // On mount + on choice change, push schedule into the store.
  useEffect(() => {
    gameStore.setSchedule(buildScheduleSpec(choice));
    try { localStorage.setItem(STORAGE_KEY, choice); } catch (_) {}
  }, [choice]);

  useEffect(() => {
    try { localStorage.setItem(PANEL_OPEN_KEY, open ? '1' : '0'); } catch (_) {}
  }, [open]);

  if (!IS_DEV) return null;

  if (!open) {
    return (
      <Tab title="Open mini-game dev panel" onClick={() => setOpen(true)}>◀</Tab>
    );
  }

  return (
    <Panel>
      <Header>
        Mini-game @ 50
        <CloseBtn onClick={() => setOpen(false)} title="Close">✕</CloseBtn>
      </Header>
      {CHOICES.map((c) => (
        <Row key={c.id} $active={choice === c.id}>
          <input
            type="radio"
            name="sl-dev-minigame"
            value={c.id}
            checked={choice === c.id}
            onChange={() => setChoice(c.id)}
          />
          {c.label}
        </Row>
      ))}
      <ResetBtn onClick={() => { gameStore.reset(); }}>
        Reset Game State
      </ResetBtn>
    </Panel>
  );
}
