import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  detectPlatform,
  dismissPrompt,
  requestAndSubscribe,
} from '../services/messaging';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9500;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.18s ease-out;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Sheet = styled.div`
  width: 100%;
  max-width: 480px;
  background: linear-gradient(180deg, #2a2a2c 0%, #1f1f21 100%);
  color: #f4f4f4;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
  border-top: 1px solid rgba(255,199,44,0.25);
  padding: 18px 20px 28px;
  animation: ${slideUp} 0.28s cubic-bezier(0.18, 0.89, 0.32, 1.15);
  box-shadow: 0 -16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04);
  max-height: 90vh;
  overflow-y: auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Grabber = styled.div`
  width: 38px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,0.18);
  margin: 0 auto 14px;
`;

const Headline = styled.h2`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin: 0 0 8px;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.01em;
`;

const Body = styled.p`
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255,255,255,0.85);
  margin: 0 0 18px;
`;

const Section = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,199,44,0.18);
  border-radius: 14px;
  padding: 14px 14px 12px;
  margin-bottom: 16px;

  h3 {
    font-family: 'Fredoka', sans-serif;
    font-size: 15px;
    font-weight: 600;
    margin: 0 0 8px;
    color: #FFC72C;
  }
  ol, ul {
    margin: 0;
    padding-left: 22px;
    font-size: 13.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.85);
  }
  li { margin-bottom: 4px; }
  .quip {
    margin-top: 8px;
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    font-style: italic;
  }
`;

const PrimaryBtn = styled.button`
  width: 100%;
  padding: 15px 18px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(45deg, #FF6B6B, #FF8800);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 6px;
  box-shadow: 0 6px 20px rgba(255,107,107,0.35);
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover { transform: translateY(-1px); box-shadow: 0 8px 26px rgba(255,107,107,0.5); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
`;

const SecondaryLink = styled.button`
  display: block;
  margin: 12px auto 0;
  background: none;
  border: none;
  color: rgba(255,255,255,0.6);
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;

  &:hover { color: #f4f4f4; }
`;

const ErrorLine = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #FFB4B4;
  text-align: center;
  min-height: 16px;
`;

// Inline iOS Share / Plus icons rendered as SVG so we don't ship a PNG.
const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle' }}>
    <path d="M12 3v13M7 8l5-5 5 5" stroke="#FFC72C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" stroke="#FFC72C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle' }}>
    <path d="M12 5v14M5 12h14" stroke="#FFC72C" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

function IOSNotInstalled() {
  return (
    <Section>
      <h3>🍎 On iPhone? Apple makes us do this dance:</h3>
      <ol>
        <li>Tap <ShareIcon /> <strong>Share</strong> at the bottom of Safari</li>
        <li>Tap <PlusIcon /> <strong>Add to Home Screen</strong></li>
        <li>Open the egg from your home screen</li>
        <li>Come back here and tap <strong>Notify Me</strong></li>
      </ol>
      <div className="quip">(Yes, it's silly. Worth it.)</div>
    </Section>
  );
}

function IOSInstalled() {
  return (
    <Section>
      <h3>🍎 You're in!</h3>
      <ul>
        <li>Tap <strong>Notify Me</strong> below.</li>
        <li>iPhone will ask once — tap <strong>Allow</strong>.</li>
      </ul>
    </Section>
  );
}

function StandardWeb() {
  return (
    <Section>
      <h3>🌐 Quick one.</h3>
      <ul>
        <li>Tap <strong>Notify Me</strong> below.</li>
        <li>Your browser will pop a permission box — hit <strong>Allow</strong>.</li>
        <li>That's it. You're scrambled.</li>
      </ul>
    </Section>
  );
}

function BlockedRecovery({ platform }) {
  return (
    <Section>
      <h3>🛠 Re-enable notifications</h3>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', margin: '0 0 8px' }}>
        Open the site permissions and flip notifications back to <strong>Allow</strong>:
      </p>
      <ul>
        <li><strong>iPhone:</strong> Settings → Notifications → Scrambled Legs → Allow</li>
        <li><strong>Android Chrome:</strong> Tap the lock icon in the URL bar → Permissions → Notifications → Allow</li>
        <li><strong>Desktop Chrome:</strong> Tap the lock icon in the URL bar → Site settings → Notifications → Allow</li>
      </ul>
      <div className="quip">Once you flip it, refresh this page.</div>
    </Section>
  );
}

export function NotificationSheet({ state, onClose }) {
  const [platform, setPlatform] = useState('desktop');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setPlatform(detectPlatform());
    // Lock background scroll while sheet is open.
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = orig; };
  }, []);

  const handleMaybeLater = () => {
    dismissPrompt();
    onClose && onClose();
  };

  const handlePrimary = async () => {
    if (state === 'ios_needs_install') {
      // No actionable subscribe step — just close.
      onClose && onClose();
      return;
    }
    if (state === 'blocked') {
      // Can't fix programmatically — close and let them go to settings.
      onClose && onClose();
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await requestAndSubscribe();
      onClose && onClose();
    } catch (err) {
      setError(err.message || 'Subscribe failed.');
      setSubmitting(false);
    }
  };

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose && onClose();
  };

  let primaryLabel = 'Notify Me';
  if (state === 'ios_needs_install') primaryLabel = 'Got it, take me there';
  else if (state === 'blocked') primaryLabel = 'Got it';
  if (submitting) primaryLabel = 'Asking…';

  return (
    <Backdrop onClick={onBackdropClick}>
      <Sheet role="dialog" aria-modal="true" aria-labelledby="sl-notif-headline">
        <Grabber />
        <Headline id="sl-notif-headline">🌭 Join the Notification Club</Headline>
        <Body>
          Texts get buried. The group chat is chaos. Scrambled Legs
          drops notifications when there's a ride, a location change,
          or free beer. We'll only bother you when it actually matters.
          That's the scrambled promise.
        </Body>

        {state === 'blocked' ? (
          <BlockedRecovery platform={platform} />
        ) : state === 'ios_needs_install' ? (
          <IOSNotInstalled />
        ) : platform === 'ios' ? (
          <IOSInstalled />
        ) : (
          <StandardWeb />
        )}

        <PrimaryBtn type="button" onClick={handlePrimary} disabled={submitting}>
          {primaryLabel}
        </PrimaryBtn>
        <ErrorLine role="alert">{error}</ErrorLine>
        {state !== 'blocked' && (
          <SecondaryLink type="button" onClick={handleMaybeLater}>
            Maybe later
          </SecondaryLink>
        )}
      </Sheet>
    </Backdrop>
  );
}

export default NotificationSheet;
