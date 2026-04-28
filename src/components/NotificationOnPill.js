import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getSubscriptionState } from '../services/messaging';

const Pill = styled.button`
  position: fixed;
  right: 14px;
  bottom: 18px;
  z-index: 8500;
  padding: 7px 12px 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,199,44,0.45);
  background: rgba(40,40,42,0.85);
  color: #FFE66D;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 14px rgba(0,0,0,0.3);
  opacity: ${(p) => (p.$faded ? 0.0 : 0.9)};
  pointer-events: ${(p) => (p.$faded ? 'none' : 'auto')};
  transition: opacity 0.4s ease, transform 0.15s;

  .em { font-size: 13px; }
  &:hover { transform: translateY(-1px); opacity: 1; }
`;

const SESSION_DISMISS = 'sl_notif_pill_dismissed';

export function NotificationOnPill() {
  const [state, setState] = useState(() => getSubscriptionState());
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(SESSION_DISMISS) === '1'; }
    catch (e) { return false; }
  });
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    const refresh = () => setState(getSubscriptionState());
    document.addEventListener('visibilitychange', refresh);
    window.addEventListener('focus', refresh);
    return () => {
      document.removeEventListener('visibilitychange', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, []);

  // Fade after the user scrolls past the first viewport.
  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.6;
      setFaded(past);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (state !== 'subscribed') return null;
  if (dismissed) return null;

  const handleClick = () => {
    try { sessionStorage.setItem(SESSION_DISMISS, '1'); } catch (e) { /* ignore */ }
    setDismissed(true);
  };

  return (
    <Pill type="button" $faded={faded} onClick={handleClick} aria-label="Notifications are on. Tap to dismiss this indicator.">
      <span className="em">🔔</span> ON
    </Pill>
  );
}

export default NotificationOnPill;
