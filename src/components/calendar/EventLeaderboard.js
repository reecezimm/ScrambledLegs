import React, { useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ref, onValue, get, child } from 'firebase/database';
import { database } from '../../services/firebase';
import { useCurrentUser } from '../../services/auth';
import { teaserCountFor } from './RsvpToggle';

const BAD_EGG_THRESHOLD = 10;

const Wrap = styled.div`
  margin-top: 18px;
  background:
    radial-gradient(circle at 20% 0%, rgba(255,199,44,0.07), transparent 55%),
    linear-gradient(160deg, rgba(35,35,37,0.85), rgba(20,20,20,0.85));
  border: 1px solid rgba(255,199,44,0.18);
  border-radius: 16px;
  padding: 14px 14px 12px;
  box-shadow:
    0 6px 24px rgba(0,0,0,0.35),
    inset 0 1px 0 rgba(255,255,255,0.05);
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
  gap: 10px;
  padding: 6px 4px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  &:last-child { border-bottom: none; }
`;

const AvatarWrap = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
`;

const goldRingShine = keyframes`
  0%,100% { box-shadow: 0 0 0 2px #FFD24A, 0 0 8px rgba(255,210,74,0.55); }
  50%      { box-shadow: 0 0 0 2px #FFE066, 0 0 14px rgba(255,210,74,0.85); }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
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
  position: relative;
  z-index: 1;

  &[data-medal="1"] { animation: ${goldRingShine} 2.4s ease-in-out infinite; }
  &[data-medal="2"] { box-shadow: 0 0 0 2px #D8D9DD, 0 0 8px rgba(216,217,221,0.45); }
  &[data-medal="3"] { box-shadow: 0 0 0 2px #C98A55, 0 0 8px rgba(201,138,85,0.45); }
`;

const RankBadge = styled.span`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 9px;
  color: #1a1a1a;
  border: 1.5px solid #1a1a1a;
  font-variant-numeric: tabular-nums;
  z-index: 2;
  background: rgba(255,255,255,0.55);

  &[data-medal="1"] { background: linear-gradient(135deg, #FFE066, #FFD24A 60%, #C99417); }
  &[data-medal="2"] { background: linear-gradient(135deg, #F2F2F4, #B5B6BA 60%, #8B8C90); }
  &[data-medal="3"] { background: linear-gradient(135deg, #E0A47A, #B5713E 60%, #7A4920); }
  &[data-medal="other"] { background: #2a2a2a; color: rgba(255,255,255,0.65); border-color: #1a1a1a; }
`;

const LaurelSvg = styled.svg`
  position: absolute;
  inset: -8px -16px -8px -16px;
  width: 64px;
  height: 48px;
  pointer-events: none;
  opacity: 0.85;
  z-index: 0;
  filter: drop-shadow(0 0 4px rgba(120,200,80,0.45));
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

const NameWrap = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 6px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
`;

const Name = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #f4f4f4;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;

  @media (max-width: 480px) { font-size: 12px; }
`;

const Stat = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.65);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  @media (max-width: 480px) { font-size: 11px; }
`;

const Crown = styled.span`
  font-size: 14px;
`;

const TierTag = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-left: 4px;
  white-space: nowrap;

  &[data-medal="1"] { color: #FFD24A; }
  &[data-medal="2"] { color: #D8D9DD; }
  &[data-medal="3"] { color: #C98A55; }
`;

const TIER_LABEL = {
  1: 'Top Masher',
  2: 'Vice Masher',
  3: 'Mash Cadet',
};

const goldShine = keyframes`
  0%, 100% { box-shadow: 0 0 8px rgba(255,210,74,0.50), 0 0 18px rgba(255,210,74,0.25), inset 0 1px 0 rgba(255,255,255,0.45); }
  50%      { box-shadow: 0 0 14px rgba(255,210,74,0.85), 0 0 28px rgba(255,210,74,0.40), inset 0 1px 0 rgba(255,255,255,0.55); }
`;

const Rank = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 9px;
  flex-shrink: 0;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  color: rgba(255,255,255,0.55);
  font-variant-numeric: tabular-nums;
  transition: transform 0.15s;

  &[data-medal="1"] {
    width: 30px;
    height: 30px;
    font-size: 13px;
    background: linear-gradient(135deg, #FFE066 0%, #FFD24A 35%, #C99417 100%);
    border: 1.5px solid #FFE066;
    color: #1a1a1a;
    text-shadow: 0 1px 0 rgba(255,255,255,0.35);
    animation: ${goldShine} 2.4s ease-in-out infinite;
  }
  &[data-medal="2"] {
    width: 22px;
    height: 22px;
    font-size: 10px;
    background: linear-gradient(135deg, #F2F2F4, #B5B6BA 60%, #8B8C90);
    border: 1px solid #F2F2F4;
    color: #1a1a1a;
    box-shadow: 0 0 8px rgba(224,224,229,0.40), inset 0 1px 0 rgba(255,255,255,0.45);
  }
  &[data-medal="3"] {
    width: 21px;
    height: 21px;
    font-size: 10px;
    background: linear-gradient(135deg, #E0A47A, #B5713E 60%, #7A4920);
    border: 1px solid #E0A47A;
    color: #1a1a1a;
    box-shadow: 0 0 7px rgba(216,144,96,0.40), inset 0 1px 0 rgba(255,255,255,0.30);
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
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: linear-gradient(140deg, rgba(60,40,20,0.55), rgba(40,30,20,0.55));
  border: 1px dashed rgba(180,120,70,0.40);
  color: #C68B5A;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  font-style: italic;
  cursor: pointer;
  padding: 10px 12px;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow:
    inset 0 2px 6px rgba(0,0,0,0.45),
    inset 0 -1px 0 rgba(255,255,255,0.04);
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: linear-gradient(140deg, rgba(80,55,30,0.65), rgba(55,40,25,0.65));
    color: #E0A47A;
  }

  .chev {
    display: inline-block;
    transition: transform 0.18s ease;
    font-size: 11px;
    color: #A66;
  }
  &[data-open="true"] .chev { transform: rotate(90deg); }
`;

const RottenList = styled.div`
  filter: hue-rotate(-15deg) saturate(0.7);
  margin-top: 4px;
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
            crew.map((row, i) => {
              const medal = i < 3 ? String(i + 1) : 'other';
              return (
                <Row key={row.uid}>
                  <AvatarWrap>
                    {i === 0 && (
                      <LaurelSvg viewBox="0 0 48 44" aria-hidden="true">
                        <g fill="none" stroke="#7DBE7D" strokeWidth="1.6" strokeLinecap="round">
                          <path d="M8 22 C 6 14, 8 8, 14 5" />
                          <path d="M9 26 C 5 22, 4 16, 7 10" />
                          <path d="M11 30 C 6 26, 4 20, 6 14" />
                          <path d="M40 22 C 42 14, 40 8, 34 5" />
                          <path d="M39 26 C 43 22, 44 16, 41 10" />
                          <path d="M37 30 C 42 26, 44 20, 42 14" />
                        </g>
                        <g fill="#7DBE7D" opacity="0.85">
                          <ellipse cx="9" cy="11" rx="2.4" ry="1.2" transform="rotate(-30 9 11)" />
                          <ellipse cx="7" cy="17" rx="2.4" ry="1.2" transform="rotate(-15 7 17)" />
                          <ellipse cx="7" cy="23" rx="2.4" ry="1.2" transform="rotate(0 7 23)" />
                          <ellipse cx="39" cy="11" rx="2.4" ry="1.2" transform="rotate(30 39 11)" />
                          <ellipse cx="41" cy="17" rx="2.4" ry="1.2" transform="rotate(15 41 17)" />
                          <ellipse cx="41" cy="23" rx="2.4" ry="1.2" transform="rotate(0 41 23)" />
                        </g>
                      </LaurelSvg>
                    )}
                    <Avatar $photo={row.photoURL} data-medal={i < 3 ? String(i + 1) : undefined}>
                      {!row.photoURL && initialFor(row.displayName)}
                    </Avatar>
                    <RankBadge data-medal={medal}>{i + 1}</RankBadge>
                  </AvatarWrap>
                  <NameWrap className="crew-name">
                    <Name>{row.displayName}</Name>
                    {i < 3 && row.mashes > 0 && (
                      <TierTag data-medal={medal}>{TIER_LABEL[i + 1]}</TierTag>
                    )}
                  </NameWrap>
                  <Stat>🌭 {row.mashes}</Stat>
                </Row>
              );
            })
          )}

          {badEggs.length > 0 && (
            <>
              <Toggle type="button" data-open={showBadEggs} onClick={() => setShowBadEggs((s) => !s)}>
                <span><span className="chev">{showBadEggs ? '▼' : '▶'}</span> Bad Eggs · {badEggs.length}</span>
                <span style={{ opacity: 0.7 }}>🥚</span>
              </Toggle>
              {showBadEggs && (
                <RottenList>
                  {badEggs.map((row) => {
                    const prof = profiles[row.uid] || {};
                    const dn = prof.displayName || row.displayName || 'Anonymous masher';
                    const photo = prof.photoURL || row.photoURL || null;
                    return (
                      <Row key={`bad-${row.uid}`}>
                        <RottenAvatar $photo={photo}>
                          {!photo && initialFor(dn)}
                        </RottenAvatar>
                        <RottenName>🤢 {dn}</RottenName>
                        <RottenStat>🌭 {row.mashes}</RottenStat>
                      </Row>
                    );
                  })}
                </RottenList>
              )}
            </>
          )}

        </>
      )}
    </Wrap>
  );
}
