// ─────────────────────────────────────────────────────────────────────────────
// HighScoreCelebration — center-screen flash overlay that fires once when
// the live count crosses the session-best threshold and once when it crosses
// the cumulative all-time threshold. If both crossings happen at the same
// frame, only the all-time copy is shown (it's the bigger achievement).
//
// Pointer-events: none. Z-index 9070 — above GameStatus (9050), below input
// blockers (9100+). Doesn't interrupt gameplay; it's a quick visual flash.
// ─────────────────────────────────────────────────────────────────────────────
import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useMashHighScore } from '../../hooks/useMashHighScore';

const fadeIn = keyframes`
  0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const fadeOut = keyframes`
  0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(1.08); }
`;

const rainbowShift = keyframes`
  0%   { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9070;
  pointer-events: none;
  text-align: center;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  white-space: nowrap;
  ${(p) => p.phase === 'in' && css`
    animation: ${fadeIn} 200ms cubic-bezier(.22,.61,.36,1) forwards;
  `}
  ${(p) => p.phase === 'hold' && css`
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  `}
  ${(p) => p.phase === 'out' && css`
    animation: ${fadeOut} 400ms ease-out forwards;
  `}
`;

const Headline = styled.div`
  font-size: clamp(36px, 10vw, 96px);
  letter-spacing: 0.04em;
  line-height: 1;
  text-shadow:
    0 0 28px rgba(0, 0, 0, 0.85),
    0 0 56px rgba(0, 0, 0, 0.7),
    0 6px 18px rgba(0, 0, 0, 0.95);

  &[data-tier="session"] {
    color: #FFD700;
    text-shadow:
      0 0 24px rgba(255, 215, 0, 0.85),
      0 0 48px rgba(255, 140, 0, 0.6),
      0 6px 18px rgba(0, 0, 0, 0.95);
  }

  &[data-tier="all-time"] {
    color: #fff;
    background: linear-gradient(
      90deg,
      #FF4747 0%, #FFC72C 25%, #4CD964 50%, #2EC4FF 75%, #FF4DB6 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${rainbowShift} 1.2s linear infinite;
  }
`;

const Sub = styled.div`
  margin-top: 10px;
  font-size: clamp(14px, 3.4vw, 22px);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #fff;
  text-shadow:
    0 0 14px rgba(0, 0, 0, 0.85),
    0 2px 8px rgba(0, 0, 0, 0.9);
  opacity: 0.95;

  &[data-tier="all-time"] {
    color: #FFE66D;
  }
`;

const HOLD_MS = 1600;
const FADE_IN_MS = 200;
const FADE_OUT_MS = 400;

export default function HighScoreCelebration() {
  const { current, cumulative, sessionActive } = useMashHighScore();

  // One-shot guard so we don't spam the celebration on every frame after
  // the user has already crossed the PR threshold this session.
  const cumulativeAnnouncedRef = useRef(false);

  // The active celebration: { tier: 'all-time', phase: 'in' | 'hold' | 'out', token }.
  const [active, setActive] = useState(null);
  const timersRef = useRef([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  // Reset announce flag when not in a session.
  useEffect(() => {
    if (!sessionActive || current === 0) {
      cumulativeAnnouncedRef.current = false;
    }
  }, [sessionActive, current]);

  // PR crossing: fires once per session when current strictly exceeds the
  // stored all-time personal best. Requires cumulative loaded and > 0 —
  // first-ever recorded sessions (cumulative=0) don't trigger a fanfare.
  useEffect(() => {
    if (current <= 0 || !sessionActive) return;
    if (
      !cumulativeAnnouncedRef.current &&
      typeof cumulative === 'number' &&
      cumulative > 0 &&
      current > cumulative
    ) {
      cumulativeAnnouncedRef.current = true;
      triggerCelebration('all-time');
    }
  }, [current, sessionActive, cumulative]); // eslint-disable-line react-hooks/exhaustive-deps

  function triggerCelebration(tier) {
    clearTimers();
    const token = Date.now() + ':' + tier;
    setActive({ tier, phase: 'in', token });
    timersRef.current.push(setTimeout(() => {
      setActive((a) => (a && a.token === token ? { ...a, phase: 'hold' } : a));
    }, FADE_IN_MS));
    timersRef.current.push(setTimeout(() => {
      setActive((a) => (a && a.token === token ? { ...a, phase: 'out' } : a));
    }, FADE_IN_MS + HOLD_MS));
    timersRef.current.push(setTimeout(() => {
      setActive((a) => (a && a.token === token ? null : a));
    }, FADE_IN_MS + HOLD_MS + FADE_OUT_MS));
  }

  useEffect(() => () => clearTimers(), []);

  if (!active) return null;

  const { tier, phase, token } = active;
  // Only PR celebration remains (session-tier removed per design).
  const headline = 'NEW PR';
  const sub = 'Personal best for this event';

  return (
    <Wrap key={token} phase={phase} aria-hidden="true">
      <Headline data-tier={tier}>{headline}</Headline>
      <Sub data-tier={tier}>{sub}</Sub>
    </Wrap>
  );
}
