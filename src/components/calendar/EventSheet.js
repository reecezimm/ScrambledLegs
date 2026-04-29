import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import EventMap from './EventMap';
import WeatherPills from './WeatherPills';
import RideLeaderBadge from './RideLeaderBadge';
import WeatherPanel from './WeatherPanel';
import EventActions from './EventActions';
import KudosCta from './KudosCta';
import RsvpCrewPanel from './RsvpCrewPanel';
import { logEvent } from '../../services/analytics';
import { fmtDateLong, fmtTime, getStatus, STATUS_LABEL, fmtCountdown, fmtTimeSince } from '../../hooks/useEventLifecycle';

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const sheetSlide = keyframes`from { transform: translateY(100%); } to { transform: translateY(0); }`;

const SheetWrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  pointer-events: auto;
  animation: ${fadeIn} 0.2s ease;
`;

const SheetBody = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
  max-height: 92vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: linear-gradient(160deg, #232325, #1a1a1a);
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 20px 20px 0 0;
  padding: 0 0 22px;
  pointer-events: auto;
  animation: ${sheetSlide} 0.28s cubic-bezier(.22,.61,.36,1);
  box-shadow: 0 -10px 50px rgba(0,0,0,0.55);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 40;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.10);
  color: #f4f4f4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  line-height: 1;
  backdrop-filter: blur(6px);
  &:hover { background: rgba(0,0,0,0.75); border-color: rgba(255,199,44,0.25); }
`;

/* Tappable drag handle — tap closes the sheet on mobile. The wider
   hit area (40px tall) makes it easy to hit on a small touchscreen. */
const Handle = styled.button`
  display: block;
  width: 100%;
  padding: 14px 0 6px;
  margin: 0;
  background: none;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 4px;
    margin: 0 auto;
    background: rgba(255,255,255,0.18);
    border-radius: 2px;
    transition: background 0.15s;
  }
  &:hover::after, &:active::after {
    background: rgba(255,199,44,0.55);
  }
`;

const MediaWrap = styled.div`
  position: relative;
  width: 100%;
`;

const BannerImg = styled.div`
  position: relative;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: #1a1a1a;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.20) 0%, transparent 50%, rgba(26,26,26,0.85) 100%);
    pointer-events: none;
  }
`;

const MapHeaderOverlay = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  z-index: 30;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6px;
  pointer-events: none;

  & > * { pointer-events: auto; }
`;

const MapBottomOverlay = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 30;
  pointer-events: none;
  & > * { pointer-events: auto; }
`;

const chipPulse = keyframes`
  0%,100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.4); opacity: 0.55; }
`;

const SheetStatusChip = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 999px;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  background: rgba(20,20,20,0.78);
  border: 1px solid rgba(255,255,255,0.22);
  box-shadow: 0 4px 14px rgba(0,0,0,0.45);
  text-shadow: 0 1px 2px rgba(0,0,0,0.55);
  font-variant-numeric: tabular-nums;

  &[data-status="upcoming"]   { color: #FFE66D; border-color: rgba(255,199,44,0.55); }
  &[data-status="in_progress"]{ color: #8DEBA9; border-color: rgba(111,207,151,0.55); }
  &[data-status="beers"]      { color: #FFC58A; border-color: rgba(255,177,85,0.55); }
`;

const SheetDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: ${chipPulse} 1.6s infinite;

  [data-status="upcoming"] &   { background: #FFC72C; box-shadow: 0 0 8px #FFC72C; }
  [data-status="in_progress"] &{ background: #6FCF97; box-shadow: 0 0 8px #6FCF97; animation-duration: 1.2s; }
  [data-status="beers"] &      { background: #FFB155; box-shadow: 0 0 8px #FFB155; animation-duration: 2s; }
`;

function sheetStatusText(event, status) {
  if (status === 'upcoming') {
    const ms = (event.start || 0) - Date.now();
    return fmtCountdown(ms) || STATUS_LABEL.upcoming;
  }
  if (status === 'in_progress') {
    return `Riding · ${fmtTimeSince(Date.now() - event.start)}`;
  }
  if (status === 'beers') return 'Beers being consumed';
  return STATUS_LABEL[status] || status;
}

const Body = styled.div`
  padding: 18px 18px 14px;

  &.has-rl .event-name,
  &.has-rl .event-meta { padding-right: 92px; }

  @media (max-width: 380px) {
    &.has-rl .event-name,
    &.has-rl .event-meta { padding-right: 84px; }
  }
`;

const EventName = styled.div`
  font-family: 'Fredoka', sans-serif;
  font-size: clamp(22px, 6vw, 28px);
  font-weight: 700;
  line-height: 1.15;
  background: linear-gradient(45deg, #ffffff, #f0d97a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  font-weight: 500;

  span { display: inline-flex; align-items: center; gap: 6px; }
  svg { width: 14px; height: 14px; color: #FFC72C; flex-shrink: 0; }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
`;

const Tag = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255,199,44,0.10);
  border: 1px solid rgba(255,199,44,0.25);
  color: #FFE66D;

  &.diff-race  { background: rgba(255,107,107,0.12); border-color: rgba(255,107,107,0.30); color: #ffb3b3; }
  &.diff-chill { background: rgba(111,207,151,0.10); border-color: rgba(111,207,151,0.30); color: #b6e9cb; }
  &.diff-work  { background: rgba(255,177,85,0.10); border-color: rgba(255,177,85,0.30); color: #ffd2a3; }
`;

const EventDesc = styled.div`
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255,255,255,0.78);
  margin-top: 14px;
`;

const CalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

function SheetContent({ event, onClose }) {
  const hasRl = !!event.rideLeader;
  const [liveWeather, setLiveWeather] = useState(null);
  const handleWeatherData = useCallback((wx) => setLiveWeather(wx), []);
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.dataset.sheetOpen = '1';
    const openedAt = Date.now();
    if (event && event.id) logEvent('event_sheet_opened', { eventId: event.id });
    // Prevent body scroll while sheet is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      delete document.body.dataset.sheetOpen;
      document.body.style.overflow = prev;
      try {
        if (event && event.id) {
          logEvent('event_sheet_closed', {
            eventId: event.id,
            dwellMs: Date.now() - openedAt,
          });
        }
      } catch (_) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SheetWrap>
      <Backdrop onClick={onClose} />
      <SheetBody className="event-shell" onClick={e => e.stopPropagation()}>
        <CloseBtn type="button" aria-label="Close" onClick={onClose}>×</CloseBtn>
        <Handle type="button" onClick={onClose} aria-label="Close panel" />

        <MediaWrap>
          {event.bannerUrl
            ? <BannerImg style={{ backgroundImage: `url('${event.bannerUrl}')` }} />
            : event.startLoc && (
              <EventMap startLoc={event.startLoc} endLoc={event.endLoc} />
            )
          }

          <MapHeaderOverlay>
            <WeatherPills weather={liveWeather} />
          </MapHeaderOverlay>

          <MapBottomOverlay>
            <SheetStatusChip data-status={getStatus(event)}>
              <SheetDot />
              <span>{sheetStatusText(event, getStatus(event))}</span>
            </SheetStatusChip>
          </MapBottomOverlay>
        </MediaWrap>

        <RideLeaderBadge rideLeader={event.rideLeader} />

        <Body className={`featured-body${hasRl ? ' has-rl' : ''}`}>
          <EventName className="event-name">{event.name}</EventName>
          <EventMeta className="event-meta">
            <span><CalIcon />{fmtDateLong(event.start)}</span>
            <span><ClockIcon />{fmtTime(event.start)}</span>
            {event.startLoc && <span><PinIcon />{event.startLoc.label}</span>}
          </EventMeta>

          {(event.difficultyLabel || event.distance || event.elevation) && (
            <Tags className="tags">
              {event.difficultyLabel && (
                <Tag className={`tag diff-${event.difficulty || ''}`}>{event.difficultyLabel}</Tag>
              )}
              {event.distance && <Tag className="tag">{event.distance}</Tag>}
              {event.elevation && <Tag className="tag">{event.elevation}</Tag>}
              {event.tags && event.tags.map((t, i) => <Tag key={i} className="tag">{t}</Tag>)}
            </Tags>
          )}

          {event.description && <EventDesc className="event-desc">{event.description}</EventDesc>}

          <WeatherPanel event={event} onData={handleWeatherData} />

          <KudosCta event={event} isSheetContext={true} />

          <RsvpCrewPanel event={event} />

          <EventActions event={event} isSheetContext={true} />
        </Body>
      </SheetBody>
    </SheetWrap>
  );
}

export default function EventSheet({ eventId, events, onClose }) {
  const event = events && events.find(e => e.id === eventId);
  if (!event) return null;

  return ReactDOM.createPortal(
    <SheetContent event={event} onClose={onClose} />,
    document.body
  );
}
