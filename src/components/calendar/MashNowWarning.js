// ─────────────────────────────────────────────────────────────────────────────
// MashNowWarning — flashing warning in bottom-right after mini-games complete
// with success. Self-manages 2.5 second display timer. Z-index 9051 (above
// GameStatus, below modal overlays).
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGameState } from '../../game/store';

const Wrap = styled.div`
  position: fixed;
  bottom: 17vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9051;
  pointer-events: none;
  text-align: center;
  white-space: nowrap;
`;

const WarningText = styled.div`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: clamp(36px, 8vw, 64px);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  will-change: color, transform, text-shadow;
  animation:
    mashNowColors 0.25s steps(1, end) infinite,
    mashNowScale 0.18s ease-in-out infinite;

  @keyframes mashNowColors {
    0%   { color: #ff0000; text-shadow: 0 0 20px #ff0000, 0 0 45px #ff0000, 0 2px 6px #000; }
    14%  { color: #ff7700; text-shadow: 0 0 20px #ff7700, 0 0 45px #ff7700, 0 2px 6px #000; }
    28%  { color: #ffff00; text-shadow: 0 0 20px #ffff00, 0 0 45px #ffff00, 0 2px 6px #000; }
    42%  { color: #00ff44; text-shadow: 0 0 20px #00ff44, 0 0 45px #00ff44, 0 2px 6px #000; }
    57%  { color: #00ccff; text-shadow: 0 0 20px #00ccff, 0 0 45px #00ccff, 0 2px 6px #000; }
    71%  { color: #8800ff; text-shadow: 0 0 20px #8800ff, 0 0 45px #8800ff, 0 2px 6px #000; }
    85%  { color: #ff00cc; text-shadow: 0 0 20px #ff00cc, 0 0 45px #ff00cc, 0 2px 6px #000; }
    100% { color: #ff0000; text-shadow: 0 0 20px #ff0000, 0 0 45px #ff0000, 0 2px 6px #000; }
  }

  @keyframes mashNowScale {
    0%, 100% { transform: scale(1);    opacity: 1;   }
    50%       { transform: scale(1.1); opacity: 0.9; }
  }
`;

export default function MashNowWarning() {
  const state = useGameState();
  const r = state.resolved;
  const [isVisible, setIsVisible] = useState(false);

  // When flashWarning appears in game state, show it and auto-hide after 2.5s.
  // Dependency on flashWarningCounter ensures effect re-runs when a new warning is
  // triggered (same string value "MASH NOW!" for each mini-game, so counter detects change).
  useEffect(() => {
    if (r && r.flashWarning) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [r?.flashWarning, r?.flashWarningCounter]);

  if (!isVisible || !r || !r.flashWarning) {
    return null;
  }

  return (
    <Wrap>
      <WarningText>{r.flashWarning}</WarningText>
    </Wrap>
  );
}
