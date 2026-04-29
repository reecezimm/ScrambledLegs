import React, { useState } from 'react';
import styled from 'styled-components';
import { fmtMonth, fmtDayNum, fmtWeekday, fmtTime } from '../../hooks/useEventLifecycle';
import { showLockToast } from './LockToast';
import { logEvent } from '../../services/analytics';

const INITIAL_COUNT = 4;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Card = styled.div`
  display: flex;
  align-items: stretch;
  gap: 14px;
  padding: 12px 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  position: relative;
  opacity: 0.92;

  &.is-unlocked {
    background: linear-gradient(90deg, rgba(255,199,44,0.06), rgba(255,107,107,0.03));
    border-color: rgba(255,199,44,0.25);
    opacity: 1;
    cursor: pointer;
    transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
  }
  &.is-unlocked:hover {
    transform: translateY(-1px);
    background: linear-gradient(90deg, rgba(255,199,44,0.10), rgba(255,107,107,0.05));
    border-color: rgba(255,199,44,0.45);
  }
`;

const DateStamp = styled.div`
  flex-shrink: 0;
  width: 54px;
  text-align: center;
  padding: 6px 0;
  border-right: 1px solid rgba(255,255,255,0.10);

  .month {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #FFC72C;
  }
  .day {
    font-family: 'Fredoka', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #f4f4f4;
    line-height: 1;
    margin: 2px 0 1px;
  }
  .weekday { font-size: 10px; color: rgba(255,255,255,0.55); font-weight: 500; }
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  text-align: left;
  min-width: 0;
  gap: 4px;

  .name {
    text-align: left;
    font-family: 'Fredoka', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #f4f4f4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  .meta {
    text-align: left;
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 2px;
  }
`;

const MiniTag = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(255,199,44,0.10);
  border: 1px solid rgba(255,199,44,0.25);
  color: #FFE66D;
  white-space: nowrap;

  &.diff-race  { background: rgba(255,107,107,0.12); border-color: rgba(255,107,107,0.30); color: #ffb3b3; }
  &.diff-chill { background: rgba(111,207,151,0.10); border-color: rgba(111,207,151,0.30); color: #b6e9cb; }
  &.diff-work  { background: rgba(255,177,85,0.10); border-color: rgba(255,177,85,0.30); color: #ffd2a3; }
`;

const LockIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 14px;
  height: 14px;
  color: rgba(255,255,255,0.32);
  svg { width: 14px; height: 14px; }
`;

const UnlockIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  line-height: 14px;
  filter: drop-shadow(0 0 6px rgba(255,199,44,0.6));
`;

const ShowMore = styled.button`
  margin-top: 12px;
  width: 100%;
  background: transparent;
  color: rgba(255,255,255,0.55);
  border: 1px dashed rgba(255,255,255,0.10);
  padding: 12px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { color: #FFC72C; border-color: rgba(255,199,44,0.25); }
`;

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

const LockSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

export default function EventComingUp({ events, onOpen }) {
  const [expanded, setExpanded] = useState(false);

  if (!events || events.length === 0) {
    return (
      <Empty>
        <div className="em">📅</div>
        <div className="head">Nothing else on the books</div>
        <div className="sub">Once the next ride drops, you'll see it here.</div>
      </Empty>
    );
  }

  const visible = expanded ? events : events.slice(0, INITIAL_COUNT);
  const hiddenCount = events.length - INITIAL_COUNT;

  return (
    <div>
      <List className="coming-list">
        {visible.map(ev => {
          const isUnlocked = !!ev.unlocked;
          const handleClick = () => {
            try { logEvent('event_card_clicked', { eventId: ev.id, locked: !isUnlocked }); } catch (_) {}
            if (isUnlocked) onOpen(ev.id);
            else showLockToast("Unlocks when it's the next ride.");
          };
          const handleKeyDown = (e) => {
            if (isUnlocked && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleClick();
            }
          };
          return (
            <Card
              key={ev.id}
              className={`coming-card${isUnlocked ? ' is-unlocked' : ''}`}
              onClick={handleClick}
              role={isUnlocked ? 'button' : undefined}
              tabIndex={isUnlocked ? 0 : undefined}
              onKeyDown={handleKeyDown}
              title={!isUnlocked ? "Unlocks when it's the next ride." : undefined}
            >
              {isUnlocked
                ? <UnlockIcon aria-label="Unlocked — tap to open">🔓</UnlockIcon>
                : <LockIcon><LockSvg /></LockIcon>
              }
              <DateStamp className="date-stamp">
                <div className="month">{fmtMonth(ev.start)}</div>
                <div className="day">{fmtDayNum(ev.start)}</div>
                <div className="weekday">{fmtWeekday(ev.start)}</div>
              </DateStamp>
              <Info className="info">
                <div className="name">{ev.name}</div>
                <div className="meta">
                  <span>{fmtTime(ev.start)}</span>
                  {ev.startLoc && <span>{ev.startLoc.label}</span>}
                </div>
                {(ev.difficultyLabel || ev.distance || ev.elevation || (ev.tags && ev.tags.length)) && (
                  <div className="tags">
                    {ev.difficultyLabel && (
                      <MiniTag className={`diff-${ev.difficulty || ''}`}>{ev.difficultyLabel}</MiniTag>
                    )}
                    {ev.distance && <MiniTag>{ev.distance}</MiniTag>}
                    {ev.elevation && <MiniTag>{ev.elevation}</MiniTag>}
                    {ev.tags && ev.tags.map((t, i) => <MiniTag key={i}>{t}</MiniTag>)}
                  </div>
                )}
              </Info>
            </Card>
          );
        })}
      </List>
      {hiddenCount > 0 && !expanded && (
        <ShowMore className="show-more" onClick={() => setExpanded(true)}>
          Show {hiddenCount} more
        </ShowMore>
      )}
    </div>
  );
}
