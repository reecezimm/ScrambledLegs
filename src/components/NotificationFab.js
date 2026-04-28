import React, { useEffect, useState, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { getSubscriptionState, dismissPrompt } from '../services/messaging';
import NotificationSheet from './NotificationSheet';

const pulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(255,199,44,0.55), 0 8px 24px rgba(0,0,0,0.35); }
  70%  { box-shadow: 0 0 0 18px rgba(255,199,44,0), 0 8px 24px rgba(0,0,0,0.35); }
  100% { box-shadow: 0 0 0 0 rgba(255,199,44,0), 0 8px 24px rgba(0,0,0,0.35); }
`;

const wiggle = keyframes`
  0%,100% { transform: rotate(0deg); }
  20% { transform: rotate(-12deg); }
  40% { transform: rotate(10deg); }
  60% { transform: rotate(-8deg); }
  80% { transform: rotate(6deg); }
`;

const FabWrap = styled.div`
  position: fixed;
  right: 16px;
  bottom: 20px;
  z-index: 9000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const FabLabel = styled.span`
  background: linear-gradient(135deg, #FFE66D, #FFC72C);
  color: #1a1a1a;
  font-family: 'Fredoka', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  white-space: nowrap;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
  ${(p) => p.$pulse && css`animation: ${pulse} 2.2s ease-out 3;`}
`;

const FabBtn = styled.button`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 3px solid rgba(255,230,109,0.6);
  background: linear-gradient(135deg, #FFE66D 0%, #FFC72C 60%, #FF8800 100%);
  color: #1a1a1a;
  font-size: 34px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 32px rgba(0,0,0,0.4), 0 0 0 0 rgba(255,199,44,0.55);
  transition: transform 0.18s ease;

  ${(p) => p.$pulse && css`animation: ${pulse} 1.8s ease-out infinite;`}
  ${(p) => p.$wiggle && css`animation: ${wiggle} 0.7s ease-in-out 1;`}

  &:hover { transform: translateY(-3px) scale(1.06); }
  &:active { transform: translateY(0) scale(0.96); }

  &::after {
    content: "${(p) => (p.$badge ? 'i' : '')}";
    position: absolute;
    top: -3px;
    right: -3px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #FF6B6B;
    color: white;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 700;
    display: ${(p) => (p.$badge ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
  }

  @media (max-width: 480px) {
    width: 68px;
    height: 68px;
    font-size: 32px;
  }
`;

const PeekBtn = styled.button`
  position: fixed;
  right: 14px;
  bottom: 16px;
  z-index: 9000;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255,199,44,0.85);
  color: #1a1a1a;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  opacity: 0.85;
  transition: transform 0.15s, opacity 0.15s;

  &:hover { opacity: 1; transform: scale(1.1); }
`;

const BlockedPill = styled.button`
  position: fixed;
  right: 14px;
  bottom: 18px;
  z-index: 9000;
  max-width: calc(100vw - 28px);
  padding: 10px 14px 10px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(40,40,42,0.92);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.35);
  text-align: left;
  backdrop-filter: blur(8px);

  .em { font-size: 16px; }
  .arrow { color: #FFC72C; font-weight: 700; margin-left: 4px; }
  &:hover { background: rgba(50,50,52,0.95); }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 9px 12px 9px 10px;
  }
`;

const NUDGE_MESSAGES = [
  { title: '🌭 Join the Notification Club', sub: 'Where we\'re riding. When plans change. Free beer. Scrambled Legs only bothers you when it counts.' },
  { title: '🥚 Don\'t be a bad egg', sub: 'Get Scrambled Legs ride alerts straight to your phone. No group chat required.' },
  { title: '🚴 Wednesday rolls are calling', sub: 'Know where we\'re meeting before everyone else. Enable notifications.' },
  { title: '🔥 Stay in the yolk', sub: 'Ride changes, beer calls, and the occasional emergency — right to your phone.' },
  { title: '🌭 The crew is already in', sub: 'Scrambled Legs drops push notifications for rides, location changes, and free stuff.' },
  { title: '🥚 Crack open notifications', sub: 'Stop missing the Wednesday roll-out. It only takes a tap.' },
];

const SR = styled.span`
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
`;

const nudgeSlideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

const NudgeToast = styled.div`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 100px;
  z-index: 8999;
  width: auto;
  max-width: 520px;
  margin: 0 auto;
  background: linear-gradient(135deg, rgba(30,30,32,0.97), rgba(26,26,26,0.97));
  border: 1px solid rgba(255,199,44,0.35);
  border-radius: 16px;
  padding: 14px 14px 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.55);
  backdrop-filter: blur(10px);
  animation: ${nudgeSlideUp} 0.35s cubic-bezier(.34,1.56,.64,1) forwards;

  .nudge-icon { font-size: 22px; flex-shrink: 0; }

  .nudge-text {
    flex: 1;
    min-width: 0;
    .nudge-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 15px;
      font-weight: 700;
      color: #fff;
      line-height: 1.2;
    }
    .nudge-sub {
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      color: rgba(255,255,255,0.6);
      margin-top: 2px;
    }
  }

  .nudge-enable {
    flex-shrink: 0;
    padding: 8px 14px;
    border-radius: 999px;
    border: none;
    background: linear-gradient(135deg, #FFE66D, #FFC72C);
    color: #1a1a1a;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.03em;
    transition: transform 0.15s;
    &:hover { transform: scale(1.04); }
  }

  .nudge-dismiss {
    flex-shrink: 0;
    background: none;
    border: none;
    color: rgba(255,255,255,0.4);
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
    &:hover { color: rgba(255,255,255,0.7); }
  }

  @media (max-width: 480px) {
    left: 12px;
    right: 12px;
    bottom: 96px;
    padding: 12px 10px 12px 12px;
    .nudge-title { font-size: 14px; }
    .nudge-sub { font-size: 10px; }
    .nudge-enable { padding: 7px 10px; font-size: 11px; }
  }
`;

export function NotificationFab() {
  const [state, setState] = useState(() => {
    const s = getSubscriptionState();
    console.log('[NotifFab] Initial subscription state:', s,
      '| Notification.permission:', typeof Notification !== 'undefined' ? Notification.permission : 'N/A',
      '| pushSupported:', typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window
    );
    return s;
  });
  const [open, setOpen] = useState(false);
  const [pulseOnce, setPulseOnce] = useState(true);
  const [wiggleOnce, setWiggleOnce] = useState(false);
  const [nudgeVisible, setNudgeVisible] = useState(false);
  const [nudgeMsg] = useState(() => {
    // Rotate through messages using a visit counter in localStorage
    try {
      const idx = (parseInt(localStorage.getItem('sl_nudge_idx') || '0', 10) + 1) % NUDGE_MESSAGES.length;
      localStorage.setItem('sl_nudge_idx', String(idx));
      return NUDGE_MESSAGES[idx];
    } catch {
      return NUDGE_MESSAGES[0];
    }
  });

  // Re-check state on visibility change (user returns from settings) and on storage events.
  useEffect(() => {
    const refresh = () => setState(getSubscriptionState());
    const onVis = () => { if (document.visibilityState === 'visible') refresh(); };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('focus', refresh);
    window.addEventListener('storage', refresh);
    // First-load: if we just transitioned out of dismissed cooldown, wiggle once.
    try {
      const saw = sessionStorage.getItem('sl_notif_wiggle_done');
      if (!saw && state === 'askable') {
        sessionStorage.setItem('sl_notif_wiggle_done', '1');
        setWiggleOnce(true);
      }
    } catch (e) { /* ignore */ }
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // First-render pulse triggers once
  useEffect(() => {
    const t = setTimeout(() => setPulseOnce(false), 7000);
    return () => clearTimeout(t);
  }, []);

  // Nudge strategy:
  //   New user (askable / ios_needs_install) → full sheet opens at 3s
  //   Previously dismissed                  → toast appears at 3s on every page load
  useEffect(() => {
    const currentState = getSubscriptionState();
    console.log('[NotifFab] Nudge useEffect — state:', currentState);

    if (currentState === 'askable' || currentState === 'ios_needs_install') {
      // First-time visitor — skip the toast, go straight to the full ask
      console.log('[NotifFab] New user — opening full sheet in 3s');
      const t = setTimeout(() => {
        if (getSubscriptionState() === 'askable' || getSubscriptionState() === 'ios_needs_install') {
          setOpen(true);
        }
      }, 3000);
      return () => clearTimeout(t);
    }

    if (currentState === 'dismissed') {
      // Was dismissed before — just a persistent toast reminder on every load
      console.log('[NotifFab] Dismissed user — showing toast in 3s');
      const t = setTimeout(() => setNudgeVisible(true), 3000);
      return () => clearTimeout(t);
    }

    console.log('[NotifFab] No nudge — state:', currentState);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNudgeDismiss = useCallback(() => {
    setNudgeVisible(false);
    dismissPrompt();
    setState(getSubscriptionState());
  }, []);

  const handleNudgeEnable = useCallback(() => {
    setNudgeVisible(false);
    setOpen(true);
  }, []);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => {
    setOpen(false);
    // Refresh state — user may have just subscribed or dismissed.
    setState(getSubscriptionState());
  }, []);

  // Hide entirely when subscribed or unsupported — no pill, no bell, nothing.
  // If they want to disable notifications they can do it through browser settings.
  if (state === 'unsupported' || state === 'subscribed') return null;

  if (state === 'blocked') {
    return (
      <>
        <BlockedPill type="button" onClick={handleOpen} aria-label="Notifications are blocked. Tap to fix.">
          <span className="em">🥚</span>
          <span>You blocked us. Wild. <span className="arrow">Tap to fix →</span></span>
        </BlockedPill>
        {open && <NotificationSheet state={state} onClose={handleClose} />}
      </>
    );
  }

  if (state === 'dismissed') {
    return (
      <>
        <PeekBtn type="button" onClick={handleOpen} aria-label="Open notification subscribe">
          🔔
          <SR>Subscribe to notifications</SR>
        </PeekBtn>
        {open && <NotificationSheet state="askable" onClose={handleClose} />}
      </>
    );
  }

  // askable or ios_needs_install — big obvious FAB + label + auto-nudge toast
  const showBadge = state === 'ios_needs_install';
  return (
    <>
      {nudgeVisible && (
        <NudgeToast role="alert">
          <span className="nudge-icon">🌭</span>
          <div className="nudge-text">
            <div className="nudge-title">{nudgeMsg.title}</div>
            <div className="nudge-sub">{nudgeMsg.sub}</div>
          </div>
          <button className="nudge-enable" onClick={handleNudgeEnable} type="button">
            Enable
          </button>
          <button className="nudge-dismiss" onClick={handleNudgeDismiss} type="button" aria-label="Dismiss">
            ×
          </button>
        </NudgeToast>
      )}
      <FabWrap>
        <FabLabel $pulse={!pulseOnce}>Get Notified</FabLabel>
        <FabBtn
          type="button"
          $pulse={true}
          $wiggle={wiggleOnce}
          $badge={showBadge}
          onClick={handleOpen}
          aria-label="Subscribe to Scrambled Legs notifications"
        >
          🔔
          <SR>{showBadge ? 'Install to get notifications on iPhone' : 'Subscribe to notifications'}</SR>
        </FabBtn>
      </FabWrap>
      {open && <NotificationSheet state={state} onClose={handleClose} />}
    </>
  );
}

export default NotificationFab;
