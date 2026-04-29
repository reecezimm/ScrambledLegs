import React, { useState, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import EventMap from './EventMap';
import WeatherPills from './WeatherPills';
import RideLeaderBadge from './RideLeaderBadge';
import WeatherPanel from './WeatherPanel';
import EventActions from './EventActions';
import KudosCta from './KudosCta';
import RsvpCrewPanel from './RsvpCrewPanel';
import { getStatus, STATUS_LABEL, fmtCountdown, fmtTimeSince, fmtDateLong, fmtTime } from '../../hooks/useEventLifecycle';

const pulse = keyframes`
  0%,100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.4); opacity: 0.55; }
`;

const Card = styled.div`
  position: relative;
  background: linear-gradient(140deg, rgba(255,199,44,0.06), rgba(255,107,107,0.04));
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 0 32px rgba(255,199,44,0.12);
  backdrop-filter: blur(10px);
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

const StatusChip = styled.div`
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

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: ${pulse} 1.6s infinite;

  [data-status="upcoming"] &   { background: #FFC72C; box-shadow: 0 0 8px #FFC72C; }
  [data-status="in_progress"] &{ background: #6FCF97; box-shadow: 0 0 8px #6FCF97; animation-duration: 1.2s; }
  [data-status="beers"] &      { background: #FFB155; box-shadow: 0 0 8px #FFB155; animation-duration: 2s; }
`;

const Body = styled.div`
  padding: 18px 18px 14px;
  text-align: left;

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

const Empty = styled.div`
  text-align: center;
  padding: 38px 20px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 16px;
  background: rgba(255,255,255,0.02);

  .em { font-size: 36px; margin-bottom: 8px; filter: grayscale(0.3); opacity: 0.7; }
  .head { font-family: 'Fredoka', sans-serif; font-size: 17px; font-weight: 600; color: #f4f4f4; margin-bottom: 4px; }
  .sub { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.5; }
`;

function statusText(event, status) {
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

export default function EventFeatured({ event }) {
  const [liveWeather, setLiveWeather] = useState(null);
  const handleWeatherData = useCallback((wx) => setLiveWeather(wx), []);
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  if (!event) {
    return (
      <Empty>
        <div className="em">🥚</div>
        <div className="head">No rides on the books</div>
        <div className="sub">Check back soon — the crew schedules new rides every week.</div>
      </Empty>
    );
  }

  const status = getStatus(event);
  const hasRl = !!event.rideLeader;

  return (
    <Card className="event-shell">
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
          <StatusChip className="event-status-chip" data-status={status}>
            <Dot />
            <span>{statusText(event, status)}</span>
          </StatusChip>
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

        <KudosCta event={event} isSheetContext={false} />

        <RsvpCrewPanel event={event} />

        <EventActions event={event} isSheetContext={false} />
      </Body>
    </Card>
  );
}
