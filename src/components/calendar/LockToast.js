import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
`;

const Toast = styled.div`
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%) translateY(20px);
  background: rgba(20,20,20,0.95);
  border: 1px solid rgba(255,199,44,0.25);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 11px 18px;
  border-radius: 999px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.5);
  backdrop-filter: blur(8px);
  z-index: 3000;
  pointer-events: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: calc(100vw - 32px);
  white-space: nowrap;
  animation: ${slideUp} 0.25s cubic-bezier(.22,.61,.36,1) forwards;

  svg { width: 14px; height: 14px; color: #FFC72C; flex-shrink: 0; }
`;

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

// Module-level singleton to avoid multiple toasts
let showToastGlobal = null;

export function useLockToast() {
  const [, forceUpdate] = useState(0);

  const show = (message) => {
    if (showToastGlobal) showToastGlobal(message);
  };

  return show;
}

export default function LockToast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Unlocks when it's the next ride.");
  const timerRef = useRef(null);

  useEffect(() => {
    showToastGlobal = (msg) => {
      setMessage(msg || "Unlocks when it's the next ride.");
      setVisible(false);
      // Force re-mount for animation
      setTimeout(() => setVisible(true), 10);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), 2500);
    };
    return () => { showToastGlobal = null; };
  }, []);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <Toast role="status" aria-live="polite">
      <LockIcon />
      <span>{message}</span>
    </Toast>,
    document.body
  );
}

export function showLockToast(message) {
  if (showToastGlobal) showToastGlobal(message);
}
