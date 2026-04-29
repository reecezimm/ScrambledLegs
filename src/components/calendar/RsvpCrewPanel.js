import React, { useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ref, onValue, set, remove, get, child, serverTimestamp } from 'firebase/database';
import { database } from '../../services/firebase';
import { useCurrentUser } from '../../services/auth';
import { logEvent } from '../../services/analytics';
import { teaserCountFor } from './RsvpToggle';

const PENDING_KEY = 'sl_pending_rsvp_event_id';
const BAD_EGG_THRESHOLD = 10;

// ─── Unified panel shell ─────────────────────────────────────────────────────
// One card. Top half = RSVP action. Bottom half = Crew header (expandable).
// Shared border / shadow so RSVP + Crew read as a single component.
const Panel = styled.div`
  margin-top: 14px;
  border-radius: 16px;
  border: 1px solid rgba(255,199,44,0.22);
  background:
    radial-gradient(circle at 20% 0%, rgba(255,199,44,0.07), transparent 55%),
    linear-gradient(160deg, rgba(35,35,37,0.85), rgba(20,20,20,0.85));
  box-shadow:
    0 6px 24px rgba(0,0,0,0.35),
    inset 0 1px 0 rgba(255,255,255,0.05);
  overflow: hidden;
`;

// RSVP action sits flush at the top, full-bleed inside the panel.
const RsvpAction = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 18px;
  border: none;
  border-bottom: 1px solid rgba(255,199,44,0.22);
  background: ${(p) => p.$rsvped
    ? 'linear-gradient(45deg, #6FCF97, #4FA67A)'
    : 'linear-gradient(45deg, #FFC72C, #FFE66D)'};
  color: ${(p) => p.$rsvped ? '#0e1f15' : '#1a1a1a'};
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  cursor: pointer;
  transition: filter 0.15s, transform 0.15s;
  &:hover { filter: brightness(1.05); }
  &:active { transform: scale(0.995); }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

const InlineCount = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(0,0,0,0.18);
  color: inherit;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

const Body = styled.div`
  padding: 12px 14px 12px;
`;

const HeaderBtn = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0 ${(p) => p.$open ? '10px' : '4px'};
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

const Hint = styled.div`
  margin: 8px 0 2px;
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  text-align: center;
  font-family: 'Inter', sans-serif;
`;

const SignInPrompt = styled.button`
  display: block;
  width: 100%;
  margin: 4px 0 0;
  padding: 16px 14px;
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

const Toast = styled.div`
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  background: rgba(26,26,26,0.95);
  border: 1px solid rgba(255,199,44,0.35);
  color: #FFE66D;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  padding: 10px 16px;
  border-radius: 999px;
  z-index: 2200;
  box-shadow: 0 6px 24px rgba(0,0,0,0.5);
  pointer-events: none;
`;

// ─── Leaderboard rows (carried over from EventLeaderboard) ──────────────────
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

const TIER_LABEL = { 1: 'Top Masher', 2: 'Vice Masher', 3: 'Mash Cadet' };

const Empty = styled.div`
  padding: 14px 4px;
  font-size: 12px;
  color: rgba(255,255,255,0.45);
  text-align: center;
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

function initialFor(name) {
  if (!name) return '?';
  return name.charAt(0);
}

export default function RsvpCrewPanel({ event }) {
  const { user, loading } = useCurrentUser();

  // RSVP state
  const [rsvped, setRsvped] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');

  // Leaderboard state
  const [rsvps, setRsvps] = useState({});
  const [totals, setTotals] = useState({});
  const [showBadEggs, setShowBadEggs] = useState(false);
  const [open, setOpen] = useState(false);
  const [profiles, setProfiles] = useState({});

  // Subscribe to RSVPs (count + leaderboard share this).
  useEffect(() => {
    if (!event || !event.id) return undefined;
    const r = ref(database, `rsvps/${event.id}`);
    const unsub = onValue(r, (snap) => setRsvps(snap.val() || {}));
    return () => unsub();
  }, [event]);

  // Subscribe to mash totals (only meaningful when signed in but cheap either way).
  useEffect(() => {
    if (!event || !event.id || !user) {
      setTotals({});
      return undefined;
    }
    const rTot = ref(database, `eventMashTotals/${event.id}`);
    const unsub = onValue(rTot, (s) => setTotals(s.val() || {}));
    return () => unsub();
  }, [event, user]);

  // Track current user's RSVP state.
  useEffect(() => {
    if (!event || !event.id || !user) {
      setRsvped(false);
      return undefined;
    }
    const r = ref(database, `rsvps/${event.id}/${user.uid}`);
    const unsub = onValue(r, (snap) => setRsvped(!!snap.val()));
    return () => unsub();
  }, [event, user]);

  const doRsvp = async () => {
    if (!user || !event || !event.id) return;
    setBusy(true);
    try {
      let profileName = '';
      let profilePhoto = null;
      try {
        const snap = await get(child(ref(database), `userProfiles/${user.uid}`));
        const v = snap.val() || {};
        profileName = v.displayName || '';
        profilePhoto = v.photoURL || null;
      } catch (_) { /* ignore */ }
      const fallbackName = user.email ? user.email.split('@')[0] : 'rider';
      await set(ref(database, `rsvps/${event.id}/${user.uid}`), {
        rsvpedAt: serverTimestamp(),
        displayName: profileName || fallbackName,
        photoURL: profilePhoto,
        email: user.email || null,
      });
      logEvent('rsvp_added', { eventId: event.id });
    } catch (_) {} finally {
      setBusy(false);
    }
  };

  const undoRsvp = async () => {
    if (!user || !event || !event.id) return;
    setBusy(true);
    try {
      await remove(ref(database, `rsvps/${event.id}/${user.uid}`));
      logEvent('rsvp_removed', { eventId: event.id });
    } catch (_) {} finally {
      setBusy(false);
    }
  };

  // Replay pending RSVP after sign-in.
  useEffect(() => {
    if (!user || !event || !event.id) return;
    let pending = '';
    try { pending = sessionStorage.getItem(PENDING_KEY) || ''; } catch (_) {}
    if (pending && pending === event.id) {
      try { sessionStorage.removeItem(PENDING_KEY); } catch (_) {}
      doRsvp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, event]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast((t) => (t === msg ? '' : t)), 2600);
  };

  const handleRsvpClick = () => {
    if (loading || busy) return;
    if (!user) {
      try { sessionStorage.setItem(PENDING_KEY, event.id); } catch (_) {}
      showToast('Sorry, gotta log in to RSVP 🥚');
      window.dispatchEvent(new Event('auth:open'));
      window.dispatchEvent(new Event('auth:nudge'));
      return;
    }
    if (rsvped) undoRsvp();
    else doRsvp();
  };

  const handleSignInNudge = () => {
    window.dispatchEvent(new Event('auth:open'));
    window.dispatchEvent(new Event('auth:nudge'));
  };

  // Derive crew + bad eggs.
  const { crew, badEggs } = useMemo(() => {
    const allUids = new Set([...Object.keys(rsvps), ...Object.keys(totals)]);
    const rows = [];
    allUids.forEach((uid) => {
      const r = rsvps[uid];
      const mashes = totals[uid] || 0;
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
    return { crew: crewRows, badEggs: eggRows };
  }, [rsvps, totals]);

  // Hydrate Bad Egg profiles (their displayName isn't on the rsvp record).
  useEffect(() => {
    if (!user) return undefined;
    const uidsToFetch = badEggs
      .map((r) => r.uid)
      .filter((uid) => !(uid in profiles));
    if (uidsToFetch.length === 0) return undefined;
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

  // Display count: real RSVPs if present, otherwise the deterministic teaser.
  const realCount = Object.keys(rsvps).length;
  const displayCount = realCount > 0 ? realCount : teaserCountFor(event && event.id);

  return (
    <Panel>
      {/* Top half: RSVP action */}
      <RsvpAction
        type="button"
        $rsvped={rsvped}
        disabled={busy}
        onClick={handleRsvpClick}
      >
        <span>{rsvped ? "✓ You're in" : "I'm coming"}</span>
        <InlineCount>🥚 {displayCount}</InlineCount>
      </RsvpAction>

      {/* Bottom half: Crew header + (expanded) leaderboard */}
      <Body>
        <HeaderBtn
          type="button"
          $open={open}
          onClick={() => (user ? setOpen((o) => !o) : handleSignInNudge())}
        >
          <span>The Crew</span>
          <HeaderRight>
            {user ? `${displayCount} coming` : 'Sign in to view'}
            <Chevron $open={open}>›</Chevron>
          </HeaderRight>
        </HeaderBtn>

        {!user && !loading && (
          <>
            <Hint>Sign in to lock in your RSVP and join the leaderboard.</Hint>
            <SignInPrompt type="button" onClick={handleSignInNudge}>
              🥚 Sign in to see who's coming.
            </SignInPrompt>
          </>
        )}

        {user && open && (
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
      </Body>

      {toast && <Toast>{toast}</Toast>}
    </Panel>
  );
}
