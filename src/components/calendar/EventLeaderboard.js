import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ref, onValue } from 'firebase/database';
import { database } from '../../services/firebase';
import { useCurrentUser } from '../../services/auth';

const BAD_EGG_THRESHOLD = 10;

const Wrap = styled.div`
  margin-top: 18px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  padding: 14px 14px 12px;
`;

const SectionLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
  margin: 4px 0 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 4px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  &:last-child { border-bottom: none; }
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(45deg, #FFC72C, #FFE66D);
  color: #1a1a1a;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  flex-shrink: 0;
`;

const Name = styled.div`
  flex: 1;
  min-width: 0;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #f4f4f4;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Stat = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.65);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

const Crown = styled.span`
  font-size: 14px;
`;

const Empty = styled.div`
  padding: 14px 4px;
  font-size: 12px;
  color: rgba(255,255,255,0.45);
  text-align: center;
`;

const SignInPrompt = styled.button`
  display: block;
  width: 100%;
  margin: 4px 0 0;
  padding: 18px 14px;
  background: rgba(255,199,44,0.06);
  border: 1px dashed rgba(255,199,44,0.30);
  border-radius: 12px;
  color: #FFE66D;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  transition: background 0.15s;
  &:hover { background: rgba(255,199,44,0.12); }
`;

const Toggle = styled.button`
  background: none;
  border: none;
  color: rgba(255,255,255,0.55);
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 8px 4px;
  margin-top: 4px;
  &:hover { color: #FFE66D; }
`;

const AnonLine = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed rgba(255,255,255,0.08);
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  text-align: center;
  font-family: 'Inter', sans-serif;
`;

function initialFor(name) {
  if (!name) return '?';
  return name.charAt(0);
}

export default function EventLeaderboard({ event }) {
  const { user } = useCurrentUser();
  const [rsvps, setRsvps] = useState({});
  const [totals, setTotals] = useState({});
  const [showBadEggs, setShowBadEggs] = useState(false);

  useEffect(() => {
    if (!event || !event.id || !user) return undefined;
    const rRsvp = ref(database, `rsvps/${event.id}`);
    const rTot = ref(database, `eventMashTotals/${event.id}`);
    const u1 = onValue(rRsvp, (s) => setRsvps(s.val() || {}));
    const u2 = onValue(rTot, (s) => setTotals(s.val() || {}));
    return () => { u1(); u2(); };
  }, [event, user]);

  if (!user) {
    const handleNudge = () => {
      window.dispatchEvent(new Event('auth:open'));
      window.dispatchEvent(new Event('auth:nudge'));
    };
    return (
      <Wrap>
        <SectionLabel>The Crew</SectionLabel>
        <SignInPrompt type="button" onClick={handleNudge}>
          🥚 Sign in to see who's coming.
        </SignInPrompt>
      </Wrap>
    );
  }

  const { crew, badEggs, attributedTotal } = useMemo(() => {
    const allUids = new Set([...Object.keys(rsvps), ...Object.keys(totals)]);
    const rows = [];
    let totalAttributed = 0;
    allUids.forEach((uid) => {
      const r = rsvps[uid];
      const mashes = totals[uid] || 0;
      totalAttributed += mashes;
      rows.push({
        uid,
        rsvped: !!r,
        rsvpedAt: r ? (r.rsvpedAt || 0) : 0,
        displayName: (r && r.displayName) || `rider-${uid.slice(0, 4)}`,
        mashes,
      });
    });
    const crewRows = rows.filter((r) => r.rsvped)
      .sort((a, b) => (b.mashes - a.mashes) || (a.rsvpedAt - b.rsvpedAt));
    const eggRows = rows.filter((r) => !r.rsvped && r.mashes >= BAD_EGG_THRESHOLD)
      .sort((a, b) => b.mashes - a.mashes);
    return { crew: crewRows, badEggs: eggRows, attributedTotal: totalAttributed };
  }, [rsvps, totals]);

  const totalHotdogs = (event && event.hotdogs) || 0;
  const anonMashes = Math.max(0, totalHotdogs - attributedTotal);

  return (
    <Wrap>
      <SectionLabel>The Crew · {crew.length}</SectionLabel>
      {crew.length === 0 ? (
        <Empty>No RSVPs yet — be the first to lock it in.</Empty>
      ) : (
        crew.map((row, i) => (
          <Row key={row.uid}>
            <Avatar>{initialFor(row.displayName)}</Avatar>
            <Name>
              {row.displayName} {i === 0 && row.mashes > 0 && <Crown>👑</Crown>}
            </Name>
            <Stat>🌭 {row.mashes}</Stat>
            <Stat style={{ color: '#6FCF97' }}>✓ RSVP'd</Stat>
          </Row>
        ))
      )}

      {badEggs.length > 0 && (
        <>
          <Toggle type="button" onClick={() => setShowBadEggs((s) => !s)}>
            {showBadEggs ? '▾' : '▸'} Bad Eggs · {badEggs.length}
          </Toggle>
          {showBadEggs && badEggs.map((row) => (
            <Row key={row.uid}>
              <Avatar style={{ background: 'linear-gradient(45deg, #888, #aaa)' }}>
                {initialFor(row.displayName)}
              </Avatar>
              <Name>{row.displayName}</Name>
              <Stat>🌭 {row.mashes}</Stat>
              <Stat style={{ color: '#FF8E8E' }}>🥚 didn't RSVP</Stat>
            </Row>
          ))}
        </>
      )}

      {anonMashes > 0 && (
        <AnonLine>(Anonymous mashes: {anonMashes})</AnonLine>
      )}
    </Wrap>
  );
}
