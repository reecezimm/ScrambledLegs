import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ref, onValue, get, update, serverTimestamp } from 'firebase/database';
import { database, auth } from '../../services/firebase';
import { getEggMansTake } from '../../services/eggMansTake';
import { logError } from '../../services/errorLogger';
import { logEvent } from '../../services/analytics';

const pulse = keyframes`
  0%,100% { opacity: 0.55; }
  50%     { opacity: 1; }
`;

const Box = styled.div`
  margin-top: 16px;
  position: relative;
  padding: 16px 18px 16px 22px;
  border-radius: 14px;
  background: linear-gradient(160deg, rgba(0,0,0,0.55), rgba(26,26,26,0.85));
  border: 1px solid rgba(255,199,44,0.30);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #FFC72C, #FF8800);
    box-shadow: 0 0 14px rgba(255,199,44,0.55);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const Egg = styled.span`
  font-size: 16px;
  filter: drop-shadow(0 0 6px rgba(255,199,44,0.5));
`;

const Label = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,199,44,0.75);
`;

const Quote = styled.div`
  position: relative;
  font-family: 'Inter', sans-serif;
  font-style: italic;
  font-size: 13px;
  line-height: 1.55;
  color: rgba(255,255,255,0.85);
  white-space: pre-wrap;

  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 1.5;
  }

  &::before {
    content: '“';
    position: absolute;
    left: -6px;
    top: -10px;
    font-family: Georgia, serif;
    font-style: normal;
    font-size: 36px;
    line-height: 1;
    color: rgba(255,199,44,0.30);
  }
  padding-left: 14px;
`;

const Loading = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  padding-left: 14px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  animation: ${pulse} 1.4s ease-in-out infinite;
`;

const ToggleBtn = styled.button`
  margin-top: 8px;
  margin-left: 14px;
  background: none;
  border: none;
  padding: 4px 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #FFC72C;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover { color: #FFE66D; }
`;

function splitFirstTwoSentences(text) {
  if (!text) return { preview: '', rest: '' };
  // Show the first TWO sentences by default so there's enough context before
  // the "Read more" gate.
  const re = /([^.!?]+[.!?]+\s*){2}/;
  const m = text.match(re);
  if (!m) return { preview: text, rest: '' };
  const preview = m[0].trim();
  const rest = text.slice(m[0].length).trim();
  if (!rest) return { preview, rest: '' };
  return { preview, rest };
}

export default function EggMansTake({ event, weather }) {
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rsvps, setRsvps] = useState({});
  const [totals, setTotals] = useState({});
  const [profilesMap, setProfilesMap] = useState({});
  // Tracks which rsvpSig the last profile fetch was completed for, so the
  // Eggman generation effect waits for profiles before firing — prevents the
  // FALLBACK_BLURB race where generation fires before profiles arrive.
  const profilesReadySigRef = useRef('');
  const [expanded, setExpanded] = useState(false);
  // Bumped by `staleSession:soft` to force a forceRefresh re-fetch.
  const [staleTick, setStaleTick] = useState(0);

  const eventId = event && event.id;

  useEffect(() => {
    const onSoft = () => setStaleTick((t) => t + 1);
    window.addEventListener('staleSession:soft', onSoft);
    return () => window.removeEventListener('staleSession:soft', onSoft);
  }, []);

  useEffect(() => {
    if (!eventId) return undefined;
    const rRsvp = ref(database, `rsvps/${eventId}`);
    const rTot = ref(database, `eventMashTotals/${eventId}`);
    const u1 = onValue(rRsvp, (s) => setRsvps(s.val() || {}));
    const u2 = onValue(rTot, (s) => setTotals(s.val() || {}));
    return () => { u1(); u2(); };
  }, [eventId]);

  // Fetch userProfiles for each RSVP'd uid to get blurb + gender.
  // Runs whenever the set of RSVP'd users changes.
  const rsvpUids = Object.keys(rsvps).sort();
  const rsvpSig = rsvpUids.join(',');
  useEffect(() => {
    if (!rsvpUids.length) { setProfilesMap({}); return; }
    Promise.all(rsvpUids.map((uid) => get(ref(database, `userProfiles/${uid}`))))
      .then((snaps) => {
        const map = {};
        snaps.forEach((snap, i) => { if (snap.val()) map[rsvpUids[i]] = snap.val(); });
        setProfilesMap(map);
        profilesReadySigRef.current = rsvpSig;
      })
      .catch(() => {
        profilesReadySigRef.current = rsvpSig; // mark done even on error
      });
  }, [rsvpSig]); // eslint-disable-line react-hooks/exhaustive-deps
  const wxSig = weather
    ? `${weather.code ?? weather.desc ?? ''}_${weather.temp ?? ''}_${weather.precip >= 50 ? 'wet' : 'dry'}`
    : '';

  useEffect(() => {
    if (!event || !eventId) return undefined;
    // Wait for profile fetch to complete for the current RSVP set before
    // generating — prevents FALLBACK_BLURB appearing because generation fired
    // before the async profile reads came back.
    if (rsvpUids.length > 0 && profilesReadySigRef.current !== rsvpSig) {
      return undefined;
    }
    let cancelled = false;
    setLoading(true);
    const rsvpedUsers = Object.entries(rsvps).map(([uid, r]) => ({
      uid,
      displayName: (r && r.displayName) || null,
      email: (r && r.email) || null,
      mashCount: totals[uid] || 0,
      blurb: (profilesMap[uid] && profilesMap[uid].blurb) || null,
      gender: (profilesMap[uid] && profilesMap[uid].gender) || null,
    }));
    getEggMansTake({ event, rsvpedUsers, weather, forceRefresh: staleTick > 0 })
      .then((result) => {
        if (cancelled) return;
        setText(result || null);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        try { logError(err, { context: 'eggMansTake' }); } catch (_) {}
        setText(null);
        setLoading(false);
      });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, rsvpSig, wxSig, staleTick, profilesMap]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!event) return null;
  if (!loading && !text) return null;

  const { preview, rest } = splitFirstTwoSentences(text || '');
  const hasMore = !!rest;

  return (
    <Box>
      <Header>
        <Egg>🥚</Egg>
        <Label className="eggman-take-label">Eggman's Take</Label>
      </Header>
      {loading && !text ? (
        <Loading>Eggman is thinking…</Loading>
      ) : (
        <>
          <Quote className="eggman-take">
            {expanded || !hasMore ? text : `${preview}…`}
          </Quote>
          {hasMore && (
            <ToggleBtn type="button" onClick={() => {
              // Require sign-in to read more — opens auth modal for guests.
              if (!expanded && !auth.currentUser) {
                window.dispatchEvent(new Event('auth:open'));
                return;
              }
              const next = !expanded;
              setExpanded(next);
              if (next) {
                try { logEvent('eggman_read_more', { eventId: event && event.id }); } catch (_) {}
                try {
                  const u = auth.currentUser;
                  if (u && event && event.id) {
                    update(ref(database, `eventInteractions/${event.id}/${u.uid}`), {
                      lastAt: serverTimestamp(),
                      readMore: true,
                    }).catch(() => {});
                  }
                } catch (_) {}
              }
            }}>
              {expanded ? '▴ Show less' : '▾ Read more'}
            </ToggleBtn>
          )}
        </>
      )}
    </Box>
  );
}
