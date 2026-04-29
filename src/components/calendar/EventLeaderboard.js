import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ref, onValue, get, child } from 'firebase/database';
import { database } from '../../services/firebase';
import { useCurrentUser } from '../../services/auth';
import { teaserCountFor } from './RsvpToggle';

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
  background: ${(p) => p.$photo
    ? `center/cover no-repeat url('${p.$photo}')`
    : 'linear-gradient(45deg, #FFC72C, #FFE66D)'};
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

const HeaderBtn = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #FFC72C;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  &:hover { color: #FFE66D; }
`;

const HeaderRight = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-transform: none;
  letter-spacing: 0;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #FFE66D;
`;

const Chevron = styled.span`
  font-size: 11px;
  color: rgba(255,255,255,0.55);
  transition: transform 0.15s;
  ${(p) => p.$open && 'transform: rotate(90deg);'}
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

const TopMasherTag = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #FFD24A;
  margin-left: 4px;
  white-space: nowrap;
`;

const Rank = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 12px;
  flex-shrink: 0;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  color: rgba(255,255,255,0.65);
  font-variant-numeric: tabular-nums;

  &[data-medal="1"] {
    background: linear-gradient(135deg, #FFD24A, #C99417);
    border-color: rgba(255,210,74,0.85);
    color: #1a1a1a;
    box-shadow: 0 0 10px rgba(255,210,74,0.45);
  }
  &[data-medal="2"] {
    background: linear-gradient(135deg, #E0E0E5, #9FA0A4);
    border-color: rgba(224,224,229,0.85);
    color: #1a1a1a;
    box-shadow: 0 0 8px rgba(224,224,229,0.35);
  }
  &[data-medal="3"] {
    background: linear-gradient(135deg, #D89060, #8B5A2B);
    border-color: rgba(216,144,96,0.85);
    color: #1a1a1a;
    box-shadow: 0 0 8px rgba(216,144,96,0.35);
  }
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

const RottenAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${(p) => p.$photo
    ? `center/cover no-repeat url('${p.$photo}')`
    : 'linear-gradient(45deg, #5a4a3a, #7a6a5a)'};
  filter: ${(p) => p.$photo ? 'grayscale(0.7) brightness(0.75) sepia(0.25)' : 'none'};
  color: rgba(255,200,180,0.65);
  font-family: 'Courier New', monospace;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  flex-shrink: 0;
`;

const RottenName = styled.div`
  flex: 1;
  min-width: 0;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: rgba(255,200,180,0.65);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: italic;
`;

const RottenStat = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #A66;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

const RottenEmoji = styled.span`
  font-size: 14px;
  filter: saturate(0.6);
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
  const [open, setOpen] = useState(false);
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    if (!event || !event.id || !user) return undefined;
    const rRsvp = ref(database, `rsvps/${event.id}`);
    const rTot = ref(database, `eventMashTotals/${event.id}`);
    const u1 = onValue(rRsvp, (s) => setRsvps(s.val() || {}));
    const u2 = onValue(rTot, (s) => setTotals(s.val() || {}));
    return () => { u1(); u2(); };
  }, [event, user]);

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
        displayName: (r && r.displayName) || 'Anonymous masher',
        photoURL: (r && r.photoURL) || null,
        mashes,
      });
    });
    const crewRows = rows.filter((r) => r.rsvped)
      .sort((a, b) => (b.mashes - a.mashes) || (a.rsvpedAt - b.rsvpedAt));
    const eggRows = rows.filter((r) => !r.rsvped && r.mashes >= BAD_EGG_THRESHOLD)
      .sort((a, b) => b.mashes - a.mashes);
    return { crew: crewRows, badEggs: eggRows, attributedTotal: totalAttributed };
  }, [rsvps, totals]);

  useEffect(() => {
    if (!user) return;
    const uidsToFetch = badEggs
      .map((r) => r.uid)
      .filter((uid) => !(uid in profiles));
    if (uidsToFetch.length === 0) return;
    let cancelled = false;
    (async () => {
      const results = {};
      await Promise.all(uidsToFetch.map(async (uid) => {
        try {
          const dnSnap = await get(child(ref(database), `userProfiles/${uid}/displayName`));
          const phSnap = await get(child(ref(database), `userProfiles/${uid}/photoURL`));
          results[uid] = {
            displayName: dnSnap.exists() ? dnSnap.val() : null,
            photoURL: phSnap.exists() ? phSnap.val() : null,
          };
        } catch (_) {
          results[uid] = { displayName: null, photoURL: null };
        }
      }));
      if (!cancelled) setProfiles((prev) => ({ ...prev, ...results }));
    })();
    return () => { cancelled = true; };
  }, [badEggs, user, profiles]);

  const totalHotdogs = (event && event.hotdogs) || 0;
  const anonMashes = Math.max(0, totalHotdogs - attributedTotal);

  // Display count: real RSVPs if present, otherwise the deterministic teaser.
  const displayCount = crew.length > 0 ? crew.length : teaserCountFor(event && event.id);

  // Signed-out: collapsed crew header doubles as the sign-in nudge.
  if (!user) {
    const handleNudge = () => {
      window.dispatchEvent(new Event('auth:open'));
      window.dispatchEvent(new Event('auth:nudge'));
    };
    return (
      <Wrap>
        <HeaderBtn type="button" onClick={handleNudge}>
          <span>The Crew</span>
          <HeaderRight>
            🥚 {displayCount} coming
            <Chevron>›</Chevron>
          </HeaderRight>
        </HeaderBtn>
        <SignInPrompt type="button" onClick={handleNudge}>
          🥚 Sign in to see who's coming.
        </SignInPrompt>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <HeaderBtn type="button" onClick={() => setOpen((o) => !o)}>
        <span>The Crew</span>
        <HeaderRight>
          🥚 {displayCount} coming
          <Chevron $open={open}>›</Chevron>
        </HeaderRight>
      </HeaderBtn>

      {open && (
        <>
          {crew.length === 0 ? (
            <Empty>No RSVPs yet — be the first to lock it in.</Empty>
          ) : (
            crew.map((row, i) => (
              <Row key={row.uid}>
                <Rank data-medal={i < 3 ? String(i + 1) : undefined}>{i + 1}</Rank>
                <Avatar $photo={row.photoURL}>
                  {!row.photoURL && initialFor(row.displayName)}
                </Avatar>
                <Name>
                  {row.displayName} {i === 0 && row.mashes > 0 && (
                    <>
                      <Crown>👑</Crown>
                      <TopMasherTag>Top Masher</TopMasherTag>
                    </>
                  )}
                </Name>
                <Stat>🌭 {row.mashes}</Stat>
                <Stat style={{ color: '#6FCF97', fontSize: 18, fontWeight: 700 }}>✓</Stat>
              </Row>
            ))
          )}

          {badEggs.length > 0 && (
            <>
              <Toggle type="button" onClick={() => setShowBadEggs((s) => !s)}>
                {showBadEggs ? '▾' : '▸'} Bad Eggs · {badEggs.length}
              </Toggle>
              {showBadEggs && badEggs.map((row) => {
                const prof = profiles[row.uid] || {};
                const dn = prof.displayName || row.displayName || 'Anonymous masher';
                const photo = prof.photoURL || row.photoURL || null;
                return (
                  <Row key={`bad-${row.uid}`}>
                    <RottenAvatar $photo={photo}>
                      {!photo && initialFor(dn)}
                    </RottenAvatar>
                    <RottenName>{dn}</RottenName>
                    <RottenStat>🌭 {row.mashes}</RottenStat>
                    <RottenEmoji>🤢</RottenEmoji>
                  </Row>
                );
              })}
            </>
          )}

        </>
      )}
    </Wrap>
  );
}
