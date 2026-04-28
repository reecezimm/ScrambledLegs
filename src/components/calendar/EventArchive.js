import React, { useState } from 'react';
import styled from 'styled-components';
import { fmtMonth, fmtDayNum, fmtCount } from '../../hooks/useEventLifecycle';

const Toggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;
  padding: 14px 16px;
  background: transparent;
  color: rgba(255,255,255,0.55);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { color: #f4f4f4; border-color: rgba(255,199,44,0.25); }
`;

const Chev = styled.svg`
  width: 14px;
  height: 14px;
  transition: transform 0.2s;
  transform: ${props => props.open ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const Body = styled.div`
  margin-top: 8px;
  display: ${props => props.open ? 'block' : 'none'};
`;

const ArchiveCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid rgba(255,255,255,0.10);
  font-size: 13px;

  &:first-child { border-top-left-radius: 12px; border-top-right-radius: 12px; }
  &:last-child  { border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; }
`;

const ArchDate = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.32);
  width: 70px;
  flex-shrink: 0;
`;

const ArchName = styled.div`
  flex: 1;
  color: #f4f4f4;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArchKudos = styled.div`
  font-size: 12px;
  color: #FF6B6B;
  font-weight: 600;
  flex-shrink: 0;
`;

export default function EventArchive({ events }) {
  const [open, setOpen] = useState(false);

  if (!events || events.length === 0) return null;

  const capped = events.slice(0, 10);

  return (
    <div>
      <Toggle
        className="archive-toggle"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span>Past rides</span>
        <Chev
          open={open}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </Chev>
      </Toggle>
      <Body open={open}>
        {capped.map(ev => (
          <ArchiveCard key={ev.id} className="archive-card">
            <ArchDate className="arch-date">{fmtMonth(ev.start)} {fmtDayNum(ev.start)}</ArchDate>
            <ArchName className="arch-name">{ev.name}</ArchName>
            <ArchKudos className="arch-kudos">{fmtCount(ev.hotdogs || ev.finalKudos || 0)} 🌭</ArchKudos>
          </ArchiveCard>
        ))}
      </Body>
    </div>
  );
}
