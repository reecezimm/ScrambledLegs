import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { isIOS, isStandalone } from '../services/messaging';

// ---------- constants ----------

const LS_INSTALL_DISMISSED = 'sl_install_dismissed';
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function isDismissedRecently() {
  try {
    const until = parseInt(localStorage.getItem(LS_INSTALL_DISMISSED) || '0', 10);
    return Date.now() < until;
  } catch {
    return false;
  }
}

function setDismissed() {
  try {
    localStorage.setItem(LS_INSTALL_DISMISSED, String(Date.now() + COOLDOWN_MS));
  } catch {
    // ignore
  }
}

function isAlreadyInstalled() {
  try {
    return window.matchMedia('(display-mode: standalone)').matches;
  } catch {
    return false;
  }
}

// ---------- animation ----------

const nudgeSlideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

// ---------- shared card shell ----------

const ToastCard = styled.div`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 90px;
  z-index: 8998;
  max-width: 520px;
  margin: 0 auto;
  background: linear-gradient(135deg, rgba(30,30,32,0.97), rgba(26,26,26,0.97));
  border: 1px solid rgba(255,199,44,0.35);
  border-radius: 16px;
  padding: 14px 14px 14px 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.55);
  backdrop-filter: blur(10px);
  animation: ${nudgeSlideUp} 0.35s cubic-bezier(.34,1.56,.64,1) forwards;

  @media (max-width: 480px) {
    left: 12px;
    right: 12px;
    bottom: 86px;
    padding: 12px 10px 12px 12px;
  }
`;

const Icon = styled.span`
  font-size: 22px;
  flex-shrink: 0;
  margin-top: 1px;
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.div`
  font-family: 'Fredoka', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Sub = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.6);
  margin-top: 3px;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const InstallBtn = styled.button`
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
  align-self: center;
  white-space: nowrap;

  &:hover { transform: scale(1.04); }
  &:active { transform: scale(0.97); }

  @media (max-width: 480px) {
    padding: 7px 10px;
    font-size: 11px;
  }
`;

const DismissBtn = styled.button`
  flex-shrink: 0;
  background: none;
  border: none;
  color: rgba(255,255,255,0.4);
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  align-self: flex-start;

  &:hover { color: rgba(255,255,255,0.7); }
`;

// ---------- iOS coach mark extras ----------

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 6px;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.75);

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const StepNum = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  min-width: 16px;
  border-radius: 50%;
  background: rgba(255,199,44,0.25);
  color: #FFC72C;
  font-size: 9px;
  font-weight: 700;
`;

// Inline SVG for iOS Share icon (box with upward arrow)
function ShareIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFC72C"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }}
      aria-hidden="true"
    >
      <path d="M8.59 5.41L12 2l3.41 3.41" />
      <line x1="12" y1="2" x2="12" y2="15" />
      <path d="M5 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1" />
    </svg>
  );
}

// ---------- Android prompt ----------

function AndroidPrompt({ deferredPrompt, onDismiss }) {
  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        onDismiss(true); // accepted — hide permanently for this session
      }
      // If dismissed by user in the OS dialog, do nothing special — let them re-see it
    } catch (err) {
      console.warn('[InstallPrompt] Android prompt error:', err);
    }
  }, [deferredPrompt, onDismiss]);

  return (
    <ToastCard role="complementary" aria-label="Install app prompt">
      <Icon>🥚</Icon>
      <Body>
        <Title>Add Scrambled Legs to your home screen</Title>
        <Sub>Get the app experience — faster loads, offline access, and push notifications.</Sub>
      </Body>
      <InstallBtn type="button" onClick={handleInstall}>
        Install
      </InstallBtn>
      <DismissBtn type="button" aria-label="Dismiss install prompt" onClick={() => onDismiss(false)}>
        ×
      </DismissBtn>
    </ToastCard>
  );
}

// ---------- iOS coach mark ----------

function IOSPrompt({ onDismiss }) {
  return (
    <ToastCard role="complementary" aria-label="Add to Home Screen instructions">
      <Icon>🥚</Icon>
      <Body>
        <Title>Install on iPhone</Title>
        <Sub>Required for notifications on iPhone.</Sub>
        <Steps>
          <Step>
            <StepNum>1</StepNum>
            Tap <ShareIcon /> <strong style={{ color: '#FFC72C' }}>Share</strong> in your browser toolbar
          </Step>
          <Step>
            <StepNum>2</StepNum>
            Choose <strong style={{ color: '#FFC72C' }}>Add to Home Screen ＋</strong>
          </Step>
          <Step>
            <StepNum>3</StepNum>
            Tap <strong style={{ color: '#FFC72C' }}>Add</strong> — done!
          </Step>
        </Steps>
      </Body>
      <DismissBtn type="button" aria-label="Dismiss iOS install prompt" onClick={onDismiss}>
        ×
      </DismissBtn>
    </ToastCard>
  );
}

// ---------- main component ----------

export default function InstallPrompt() {
  // Android deferred prompt state
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  // iOS dwell-based visibility
  const [showIOS, setShowIOS] = useState(false);
  // Track whether we should even consider showing (guards against SSR / installed)
  const mountedRef = useRef(false);

  // Android: capture beforeinstallprompt
  useEffect(() => {
    // Don't show if already running as installed PWA
    if (isAlreadyInstalled()) return;
    // Don't show if user dismissed recently
    if (isDismissedRecently()) return;

    const handler = (e) => {
      e.preventDefault(); // suppress Chrome's native banner
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Hide if the user installs via another path
    const installedHandler = () => {
      setDeferredPrompt(null);
    };
    window.addEventListener('appinstalled', installedHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, []);

  // iOS: show after 5-second dwell
  useEffect(() => {
    mountedRef.current = true;

    if (!isIOS()) return;
    if (isStandalone()) return;
    if (isDismissedRecently()) return;

    const timer = setTimeout(() => {
      if (mountedRef.current) {
        setShowIOS(true);
      }
    }, 5000);

    return () => {
      mountedRef.current = false;
      clearTimeout(timer);
    };
  }, []);

  const handleAndroidDismiss = useCallback((accepted) => {
    setDeferredPrompt(null);
    if (!accepted) {
      setDismissed();
    }
  }, []);

  const handleIOSDismiss = useCallback(() => {
    setShowIOS(false);
    setDismissed();
  }, []);

  // Android prompt wins — iOS check is irrelevant on Android
  if (deferredPrompt) {
    return (
      <AndroidPrompt
        deferredPrompt={deferredPrompt}
        onDismiss={handleAndroidDismiss}
      />
    );
  }

  if (showIOS) {
    return <IOSPrompt onDismiss={handleIOSDismiss} />;
  }

  return null;
}
