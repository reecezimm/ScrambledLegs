// ─────────────────────────────────────────────────────────────────────────────
// HighScoreHud — top-right fixed overlay showing three numbers during an
// active mash session: current run count, in-tab session best, and the
// user's cumulative all-time best for this event (RTDB-backed).
//
// Hidden when no active session (current === 0) and during the save/burn
// phases (mirrors GameStatus / TimerWidget). Pointer-events: none.
//
// Z-index 9050 (same band as GameStatus / TimerWidget). Anchored top-right
// at 16px inset since TimerWidget owns top-left.
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';
import styled from 'styled-components';
import { useMashHighScore } from '../../hooks/useMashHighScore';
import { fmtCount } from '../../hooks/useEventLifecycle';

const Wrap = styled.div`
  position: fixed;
  top: calc(16px + env(safe-area-inset-top, 0px));
  right: calc(16px + env(safe-area-inset-right, 0px));
  z-index: 9050;
  pointer-events: none;
  font-family: 'Fredoka', sans-serif;
  font-variant-numeric: tabular-nums;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.38);
  border-radius: 10px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  text-shadow:
    0 0 12px rgba(0, 0, 0, 0.85),
    0 2px 8px rgba(0, 0, 0, 0.9);
  min-width: 120px;
  text-align: right;

  body[data-mash-phase="saving"] &,
  body[data-mash-phase="burning"] & {
    display: none;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  line-height: 1;
`;

const Label = styled.span`
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
`;

const Value = styled.span`
  font-weight: 700;
  font-size: 22px;
  color: ${(p) => p.color || '#fff'};

  &[data-tier="all-time"] {
    color: #FFE66D;
    text-shadow:
      0 0 10px rgba(255, 199, 44, 0.6),
      0 2px 8px rgba(0, 0, 0, 0.9);
  }
  &[data-tier="session"] {
    color: #FFB347;
  }
  /* Top score across ALL users — the score-to-beat. Brightest treatment;
     subtle pulse glow when the active user is the one holding the crown. */
  &[data-tier="top"] {
    color: #FFD700;
    font-size: 26px;
    text-shadow:
      0 0 14px rgba(255, 215, 0, 0.85),
      0 0 28px rgba(255, 140, 0, 0.55),
      0 3px 10px rgba(0, 0, 0, 0.95);
  }
  &[data-tier="top"][data-yours="1"] {
    animation: hsCrownPulse 2.2s ease-in-out infinite;
  }
  @keyframes hsCrownPulse {
    0%, 100% { filter: drop-shadow(0 0 0 rgba(255,215,0,0)); }
    50%      { filter: drop-shadow(0 0 8px rgba(255,215,0,0.85)); }
  }
`;

export default function HighScoreHud() {
  const {
    current, cumulative, globalBest, isHoldingGlobal, uid,
  } = useMashHighScore();

  // Visible only during an active mash session. Subscriptions are
  // pre-warmed via emitEventContext on KudosCta mount, so globalBest /
  // cumulative are already loaded by the time the first press fires.
  if (!current || current <= 0) return null;

  return (
    <Wrap aria-hidden="true">
      <Row>
        <Label>High Score</Label>
        <Value
          data-tier="top"
          data-yours={isHoldingGlobal ? '1' : '0'}
          title={isHoldingGlobal ? "It's yours — for now." : 'Top score across all crew'}
        >
          {typeof globalBest === 'number' && globalBest > 0
            ? fmtCount(globalBest)
            : '—'}
        </Value>
      </Row>
      <Row>
        <Label>PR</Label>
        <Value data-tier="all-time">
          {uid && typeof cumulative === 'number' ? fmtCount(cumulative) : '—'}
        </Value>
      </Row>
      <Row>
        <Label>Now</Label>
        <Value>{fmtCount(current)}</Value>
      </Row>
    </Wrap>
  );
}
