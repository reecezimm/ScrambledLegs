import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`from { transform: translateY(120%); opacity: 0; } to { transform: translateY(0); opacity: 1; }`;

const Toast = styled.div`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 18px;
  margin: 0 auto;
  max-width: 420px;
  background: linear-gradient(135deg, rgba(35,35,37,0.96), rgba(26,26,26,0.96));
  border: 1px solid rgba(255,199,44,0.45);
  color: #FFE66D;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  padding: 12px 14px;
  border-radius: 14px;
  z-index: 2400;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 24px rgba(255,199,44,0.15);
  animation: ${slideUp} 0.32s cubic-bezier(.22,.61,.36,1);
`;

const Msg = styled.div` flex: 1; line-height: 1.35; `;

const Btn = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 9px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FFE66D);
  color: #1a1a1a;
  cursor: pointer;
  &:hover { filter: brightness(1.05); }
`;

const DismissBtn = styled.button`
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.45);
  font-size: 18px;
  cursor: pointer;
  padding: 4px 6px;
  &:hover { color: #f4f4f4; }
`;

export default function UpdateAvailableToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onUpdate() { setVisible(true); }
    window.addEventListener('freshness:update-available', onUpdate);
    return () => window.removeEventListener('freshness:update-available', onUpdate);
  }, []);

  if (!visible) return null;

  return (
    <Toast role="status">
      <Msg>🥚 New version available</Msg>
      <Btn type="button" onClick={() => {
        try {
          const u = new URL(window.location.href);
          u.searchParams.set('_v', String(Date.now()));
          window.location.replace(u.toString());
        } catch (_) {
          window.location.reload();
        }
      }}>Refresh</Btn>
      <DismissBtn type="button" aria-label="Dismiss" onClick={() => setVisible(false)}>×</DismissBtn>
    </Toast>
  );
}
