import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactDOM from 'react-dom';
import {
  directionsUrl, routeSource, googleCalUrl, outlookCalUrl, downloadIcs, shareEvent
} from '../../hooks/useEventLifecycle';

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const sheetSlide = keyframes`from { transform: translateY(100%); } to { transform: translateY(0); }`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
  gap: 8px;
  margin-top: 14px;
`;

const ActionBtn = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 6px 9px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 11px;
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: all 0.15s ease;

  svg { width: 18px; height: 18px; color: #FFC72C; }

  &:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,199,44,0.25);
    transform: translateY(-1px);
  }
  &:active { transform: translateY(0); }
`;

const ActionBtnButton = styled(ActionBtn).attrs({ as: 'button' })`
  border: 1px solid rgba(255,255,255,0.10);
`;

// Cal sheet portal
const SheetWrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  pointer-events: auto;
  animation: ${fadeIn} 0.2s ease;
`;

const SheetBody = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  background: linear-gradient(160deg, #232325, #1a1a1a);
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 20px 20px 0 0;
  padding: 14px 16px 22px;
  pointer-events: auto;
  animation: ${sheetSlide} 0.28s cubic-bezier(.22,.61,.36,1);
  box-shadow: 0 -10px 50px rgba(0,0,0,0.5);
`;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  margin: 0 auto 12px;
  background: rgba(255,255,255,0.10);
  border-radius: 2px;
`;

const SheetTitle = styled.div`
  font-family: 'Fredoka', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #f4f4f4;
  text-align: center;
  margin-bottom: 4px;
`;

const SheetSub = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.55);
  text-align: center;
  margin-bottom: 14px;
`;

const SheetOpt = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 12px;
  color: #f4f4f4;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'Inter', sans-serif;
  text-align: left;

  &:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,199,44,0.25);
    transform: translateY(-1px);
  }
`;

const SheetOptBtn = styled(SheetOpt).attrs({ as: 'button' })``;

const OptIcon = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;

  &.g { background: linear-gradient(135deg, #4285F4, #34A853); color: #fff; }
  &.o { background: linear-gradient(135deg, #0078D4, #2B88D8); color: #fff; }
  &.a { background: linear-gradient(135deg, #555, #2a2a2a); color: #fff; font-size: 22px; }
`;

const OptName = styled.div`font-size: 14px; font-weight: 600;`;
const OptSub = styled.div`font-size: 11px; color: rgba(255,255,255,0.55); margin-top: 1px;`;

const CancelBtn = styled.button`
  width: 100%;
  margin-top: 6px;
  padding: 12px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.55);
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  &:hover { color: #f4f4f4; }
`;

function CalSheet({ event, onClose }) {
  return ReactDOM.createPortal(
    <SheetWrap>
      <Backdrop onClick={onClose} />
      <SheetBody>
        <Handle />
        <SheetTitle>Add to calendar</SheetTitle>
        <SheetSub>Pick where you keep your schedule</SheetSub>
        <SheetOpt href={googleCalUrl(event)} target="_blank" rel="noopener noreferrer" onClick={() => setTimeout(onClose, 100)}>
          <OptIcon className="g">G</OptIcon>
          <div><OptName>Google Calendar</OptName><OptSub>Opens in your Google account</OptSub></div>
        </SheetOpt>
        <SheetOpt href={outlookCalUrl(event)} target="_blank" rel="noopener noreferrer" onClick={() => setTimeout(onClose, 100)}>
          <OptIcon className="o">⊞</OptIcon>
          <div><OptName>Outlook</OptName><OptSub>Outlook.com or Office 365</OptSub></div>
        </SheetOpt>
        <SheetOptBtn type="button" onClick={() => { downloadIcs(event); onClose(); }}>
          <OptIcon className="a"></OptIcon>
          <div><OptName>Apple Calendar / .ics</OptName><OptSub>Auto-opens on iPhone & Mac · downloads on Windows</OptSub></div>
        </SheetOptBtn>
        <CancelBtn type="button" onClick={onClose}>Close</CancelBtn>
      </SheetBody>
    </SheetWrap>,
    document.body
  );
}

const NavIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>
);
const RouteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/>
    <path d="M6 16V8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v0M18 8v8a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v0"/>
  </svg>
);
const CalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/>
  </svg>
);

export default function EventActions({ event }) {
  const [calOpen, setCalOpen] = useState(false);

  return (
    <>
      <Grid>
        <ActionBtn href={directionsUrl(event)} target="_blank" rel="noopener noreferrer">
          <NavIcon />
          <span>Directions</span>
        </ActionBtn>
        {event.routeUrl && (
          <ActionBtn
            href={event.routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={routeSource(event.routeUrl) ? `Opens in ${routeSource(event.routeUrl)}` : 'Opens in a new tab'}
          >
            <RouteIcon />
            <span>Route</span>
          </ActionBtn>
        )}
        <ActionBtnButton type="button" onClick={() => setCalOpen(true)}>
          <CalIcon />
          <span>Calendar</span>
        </ActionBtnButton>
        <ActionBtnButton type="button" onClick={() => shareEvent(event)}>
          <ShareIcon />
          <span>Share</span>
        </ActionBtnButton>
      </Grid>
      {calOpen && <CalSheet event={event} onClose={() => setCalOpen(false)} />}
    </>
  );
}
