import React from 'react';
import styled from 'styled-components';

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin: 24px 4px 10px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.10), transparent);
  }
`;

const NewBtn = styled.button`
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(255,199,44,0.30);
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(255,199,44,0.42); }
  &:active { transform: translateY(0); }
`;

const Row = styled.button`
  display: flex;
  align-items: stretch;
  gap: 12px;
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  cursor: pointer;
  color: inherit;
  font-family: inherit;
  margin-bottom: 8px;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,199,44,0.25);
  }

  &[data-past="1"] {
    opacity: 0.55;
    cursor: default;
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
    line-height: 1;
    margin: 2px 0 1px;
  }
  .weekday {
    font-size: 10px;
    color: rgba(255,255,255,0.55);
    font-weight: 500;
  }
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;

  .name {
    font-family: 'Fredoka', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #f4f4f4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .name .unlock-pill {
    flex-shrink: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #FFC72C;
    background: rgba(255,199,44,0.10);
    border: 1px solid rgba(255,199,44,0.35);
    border-radius: 999px;
    padding: 2px 7px;
    line-height: 1.4;
  }
  .meta {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    margin-top: 3px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
`;

const Empty = styled.div`
  text-align: center;
  padding: 28px 16px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 14px;
  background: rgba(255,255,255,0.02);
  color: rgba(255,255,255,0.55);
  font-size: 13px;

  .em { font-size: 30px; margin-bottom: 6px; opacity: 0.7; }
`;

const fmtMonth = (ts) => new Intl.DateTimeFormat(undefined, { month: 'short' }).format(new Date(ts)).toUpperCase();
const fmtDay = (ts) => new Date(ts).getDate();
const fmtWeekday = (ts) => new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(new Date(ts));
const fmtTime = (ts) => new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(ts));

function eventRowText(e) {
  const tagCount = Array.isArray(e.tags) ? e.tags.length : 0;
  const kudos = e.hotdogs || 0;
  const leader = e.rideLeader && e.rideLeader.name ? e.rideLeader.name : null;
  const bits = [fmtTime(e.start)];
  if (leader) bits.push(`led by ${leader}`);
  bits.push(`${tagCount} ${tagCount === 1 ? 'tag' : 'tags'}`);
  bits.push(`${kudos} 🌭`);
  return bits.join(' · ');
}

export function EventList({ upcoming, past, onNew, onEdit }) {
  return (
    <div>
      <NewBtn type="button" onClick={onNew}>+ New Event</NewBtn>

      <SectionLabel>Upcoming</SectionLabel>
      {upcoming.length === 0 ? (
        <Empty>
          <div className="em">🥚</div>
          Nothing on the books yet. Tap "New Event" to add one.
        </Empty>
      ) : (
        upcoming.map((e) => (
          <Row key={e.id} type="button" onClick={() => onEdit(e.id)}>
            <DateStamp>
              <div className="month">{fmtMonth(e.start)}</div>
              <div className="day">{fmtDay(e.start)}</div>
              <div className="weekday">{fmtWeekday(e.start)}</div>
            </DateStamp>
            <Info>
              <div className="name">
                <span>{e.name || '(untitled)'}</span>
                {e.unlocked && (
                  <span className="unlock-pill" title="Visitors can open this event from the Coming Up list">🔓 Unlocked</span>
                )}
              </div>
              <div className="meta">
                <span>{eventRowText(e)}</span>
              </div>
            </Info>
          </Row>
        ))
      )}

      <SectionLabel>Past (last 10)</SectionLabel>
      {past.length === 0 ? (
        <Empty>No past events yet.</Empty>
      ) : (
        past.slice(0, 10).map((e) => (
          <Row key={e.id} type="button" data-past="1" onClick={() => onEdit(e.id)}>
            <DateStamp>
              <div className="month">{fmtMonth(e.start)}</div>
              <div className="day">{fmtDay(e.start)}</div>
              <div className="weekday">{fmtWeekday(e.start)}</div>
            </DateStamp>
            <Info>
              <div className="name">{e.name || '(untitled)'}</div>
              <div className="meta">
                <span>{eventRowText(e)}</span>
              </div>
            </Info>
          </Row>
        ))
      )}
    </div>
  );
}

export default EventList;
