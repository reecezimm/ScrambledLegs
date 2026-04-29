// ─────────────────────────────────────────────────────────────────────────────
// TimerWidget — opt-in countdown overlay for mini-game play phases.
//
// A play phase opts in by setting `config.showTimer: true` (or an object like
// `{ position: 'top-left' | 'center' }`). The widget reads
// `active.phaseStartedAtMs` + the phase's `timeout.value` and renders the
// remaining seconds, ticking via requestAnimationFrame.
//
// Z-index 9050 — same band as GameStatus, above canvas (9000), below input
// blocker layers (9100+). Pointer-events: none — purely visual.
// ─────────────────────────────────────────────────────────────────────────────
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useGameState } from '../../game/store';

const Wrap = styled.div`
  position: fixed;
  z-index: 9050;
  pointer-events: none;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  /* Doubled (was clamp(20, 4.5vw, 32)) per design pass — readable on mobile
     and dominant on desktop without crowding the status zone. */
  font-size: clamp(40px, 9vw, 64px);
  line-height: 1;
  letter-spacing: 0.04em;
  color: #fff;
  text-shadow:
    0 0 16px rgba(0, 0, 0, 0.9),
    0 0 32px rgba(0, 0, 0, 0.75),
    0 3px 12px rgba(0, 0, 0, 0.95);
  padding: 12px 18px;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transform-origin: center;
  will-change: transform, color;

  &[data-position="top-left"] {
    top: 16px;
    left: 16px;
  }
  &[data-position="center"] {
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: top center;
  }

  &.is-final {
    color: var(--game-accent, #FF4747);
    animation: timerPulse 1s ease-in-out infinite;
  }

  &[data-position="center"].is-final {
    animation: timerPulseCenter 1s ease-in-out infinite;
  }

  @keyframes timerPulse {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.08); }
  }

  @keyframes timerPulseCenter {
    0%, 100% { transform: translateX(-50%) scale(1); }
    50%      { transform: translateX(-50%) scale(1.08); }
  }

  /* Hide during save/burn flow to mirror GameStatus behavior. */
  body[data-mash-phase="saving"] &,
  body[data-mash-phase="burning"] & {
    display: none;
  }
`;

function formatTime(remainingMs) {
  const secs = Math.max(0, Math.ceil(remainingMs / 1000));
  if (secs > 60) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${secs}s`;
}

export default function TimerWidget() {
  const state = useGameState();

  // Resolve current play phase + showTimer config from the snapshot.
  let enabled = false;
  let phaseStartedAtMs = 0;
  let totalMs = 0;
  let position = 'top-left';
  let phaseKey = '';

  if (state.active) {
    const mg = state.schedule[state.active.miniGameIdx];
    const phase = mg && mg.phases[state.active.phaseIndex];
    if (
      phase &&
      phase.kind === 'play' &&
      phase.timeout &&
      phase.timeout.kind === 'ms' &&
      phase.config &&
      phase.config.showTimer
    ) {
      enabled = true;
      phaseStartedAtMs = state.active.phaseStartedAtMs || 0;
      totalMs = phase.timeout.value;
      const cfg = phase.config.showTimer;
      if (cfg && typeof cfg === 'object' && cfg.position === 'center') {
        position = 'center';
      }
      phaseKey = `${state.active.miniGameIdx}.${state.active.phaseIndex}`;
    }
  }

  // Local state ticked via rAF — avoids forcing a 60Hz React rerender of
  // unrelated subscribers and keeps the countdown crisp.
  const [remainingMs, setRemainingMs] = useState(totalMs);
  const rafRef = useRef(0);
  const lastShownSecRef = useRef(-1);

  useEffect(() => {
    if (!enabled) {
      setRemainingMs(0);
      lastShownSecRef.current = -1;
      return undefined;
    }

    // The director uses Date.now() for phaseStartedAtMs, so compute against
    // Date.now() for consistency.
    const start = phaseStartedAtMs;
    const total = totalMs;
    setRemainingMs(total);
    lastShownSecRef.current = Math.ceil(total / 1000);

    const tick = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, Math.min(total, total - elapsed));
      const sec = Math.ceil(remaining / 1000);
      // Only update React state when the displayed second changes OR when
      // we cross into the final-3s pulse window. This keeps re-renders
      // minimal while the countdown stays smooth.
      const inFinal = remaining <= 3000;
      if (sec !== lastShownSecRef.current) {
        lastShownSecRef.current = sec;
        setRemainingMs(remaining);
      } else if (inFinal && remaining < 100) {
        setRemainingMs(remaining);
      }
      if (remaining > 0) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [enabled, phaseKey, phaseStartedAtMs, totalMs]);

  if (!enabled) return null;

  const isFinal = remainingMs <= 3000;
  return (
    <Wrap
      data-position={position}
      className={isFinal ? 'is-final' : ''}
      aria-hidden="true"
    >
      {formatTime(remainingMs)}
    </Wrap>
  );
}
