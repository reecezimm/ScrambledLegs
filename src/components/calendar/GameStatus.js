// ─────────────────────────────────────────────────────────────────────────────
// GameStatus — the dead-center status text zone. Used by every mini-game to
// communicate instructions, countdowns, outcomes. Big, viewport-fit, fades on
// text change. Pointer-events: none — purely visual.
//
// Z-index 9050 sits above the canvas (9000) and below clickable game spawns
// (9100+). Reads resolved state from the game store.
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';
import styled from 'styled-components';
import { useGameState } from '../../game/store';

const Wrap = styled.div`
  position: fixed;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  z-index: 9050;
  pointer-events: none;
  width: min(92vw, 720px);
  max-width: min(92vw, 720px);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  /* Hide while the save/burn flow is running so the burn message isn't
     covered by leftover mini-game status text. KudosCta sets data-mash-
     phase on body during saving/burning. */
  body[data-mash-phase="saving"] &,
  body[data-mash-phase="burning"] & {
    display: none;
  }
`;

const StatusText = styled.div`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: clamp(28px, 9vw, 80px);
  line-height: 1.05;
  letter-spacing: 0.02em;
  color: var(--game-accent, #fff);
  text-shadow:
    0 0 20px rgba(0,0,0,0.85),
    0 0 40px rgba(0,0,0,0.7),
    0 4px 14px rgba(0,0,0,0.95);
  white-space: pre-line;
  text-wrap: balance;
  animation: gameStatusIn 0.3s cubic-bezier(.22,.61,.36,1);
  will-change: transform, opacity;

  &[data-kind="countdown"] {
    font-size: clamp(64px, 22vw, 200px);
    color: #FFE66D;
    text-shadow:
      0 0 32px rgba(255,199,44,0.8),
      0 0 64px rgba(255,107,107,0.6),
      0 6px 20px rgba(0,0,0,0.9);
  }

  @keyframes gameStatusIn {
    0%   { opacity: 0; transform: scale(0.7); }
    60%  { opacity: 1; transform: scale(1.08); }
    100% { opacity: 1; transform: scale(1); }
  }
`;

const SubStatus = styled.div`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: clamp(18px, 5vw, 32px);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  opacity: 0.9;
  text-shadow: 0 2px 10px rgba(0,0,0,0.8);
`;

export default function GameStatus() {
  const state = useGameState();
  const r = state.resolved;
  if (!r) return null;
  const text = r.statusText;
  const sub = r.subStatus;
  if (!text && !sub) return null;

  // Use the text as a key so React remounts the node on text change,
  // re-triggering the entrance animation.
  return (
    <Wrap aria-live="polite">
      {text && (
        <StatusText
          key={text}
          data-kind={r.phaseKind}
          className="game-status-text"
        >
          {text}
        </StatusText>
      )}
      {sub && (
        <SubStatus key={sub} className="game-status-sub">{sub}</SubStatus>
      )}
    </Wrap>
  );
}
