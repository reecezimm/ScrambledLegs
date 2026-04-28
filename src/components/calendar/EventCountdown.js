import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStatus, fmtCountdown, fmtTimeSince, STATUS_LABEL } from '../../hooks/useEventLifecycle';

const Block = styled.div`
  margin-top: 18px;
  padding: 14px 14px 12px;
  border-radius: 14px;
  background: rgba(0,0,0,0.30);
  border: 1px solid rgba(255,255,255,0.10);
  text-align: center;
`;

const Label = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 6px;
`;

const Display = styled.div`
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: clamp(20px, 5vw, 26px);
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(45deg, #FFE66D, #FF8800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &.is-progress {
    background: linear-gradient(45deg, #6FCF97, #b6e9cb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  &.is-beers {
    background: linear-gradient(45deg, #FFB155, #ffd2a3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Sep = styled.span`
  color: rgba(255,255,255,0.32);
  margin: 0 6px;
  -webkit-text-fill-color: rgba(255,255,255,0.32);
`;

function formatDisplay(event, status) {
  if (status === 'upcoming') {
    const ms = event.start - Date.now();
    const raw = fmtCountdown(ms);
    if (!raw) return '—';
    // Replace · with separator spans
    return raw.split(' · ').map((part, i, arr) => (
      <React.Fragment key={i}>
        {part}{i < arr.length - 1 && <Sep>·</Sep>}
      </React.Fragment>
    ));
  }
  if (status === 'in_progress') {
    return <>🚴 In progress <Sep>·</Sep> {fmtTimeSince(Date.now() - event.start)}</>;
  }
  if (status === 'beers') {
    return <>🍺 Beers being consumed</>;
  }
  return STATUS_LABEL[status] || '—';
}

export default function EventCountdown({ event, onArchived }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const status = getStatus(event);

  useEffect(() => {
    if (status === 'archived' && onArchived) onArchived();
  }, [status, onArchived]);

  const labelText = status === 'upcoming' ? 'Starts in' : 'Status';
  const isProgress = status === 'in_progress';
  const isBeers = status === 'beers';

  return (
    <Block>
      <Label className="countdown-label">{labelText}</Label>
      <Display
        className={`countdown-display${isProgress ? ' is-progress' : ''}${isBeers ? ' is-beers' : ''}`}
      >
        {formatDisplay(event, status)}
      </Display>
    </Block>
  );
}
