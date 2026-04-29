import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ref, onValue } from 'firebase/database';
import { database } from '../../services/firebase';
import { getEggMansTake } from '../../services/eggMansTake';
import { logError } from '../../services/errorLogger';

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
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255,255,255,0.85);
  white-space: pre-wrap;

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

export default function EggMansTake({ event, weather }) {
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rsvps, setRsvps] = useState({});
  const [totals, setTotals] = useState({});

  const eventId = event && event.id;

  useEffect(() => {
    if (!eventId) return undefined;
    const rRsvp = ref(database, `rsvps/${eventId}`);
    const rTot = ref(database, `eventMashTotals/${eventId}`);
    const u1 = onValue(rRsvp, (s) => setRsvps(s.val() || {}));
    const u2 = onValue(rTot, (s) => setTotals(s.val() || {}));
    return () => { u1(); u2(); };
  }, [eventId]);

  // Stable signature for effect deps — avoids object identity churn.
  const rsvpSig = Object.keys(rsvps).sort().join(',');
  const wxSig = weather
    ? `${weather.code ?? weather.desc ?? ''}_${weather.temp ?? ''}_${weather.precip >= 50 ? 'wet' : 'dry'}`
    : '';

  useEffect(() => {
    if (!event || !eventId) return undefined;
    let cancelled = false;
    setLoading(true);
    const rsvpedUsers = Object.entries(rsvps).map(([uid, r]) => ({
      uid,
      displayName: (r && r.displayName) || null,
      email: (r && r.email) || null,
      mashCount: totals[uid] || 0,
    }));
    getEggMansTake({ event, rsvpedUsers, weather })
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
  }, [eventId, rsvpSig, wxSig]);

  if (!event) return null;
  if (!loading && !text) return null;

  return (
    <Box>
      <Header>
        <Egg>🥚</Egg>
        <Label>Eggman's Take</Label>
      </Header>
      {loading && !text ? (
        <Loading>Eggman is thinking…</Loading>
      ) : (
        <Quote>{text}</Quote>
      )}
    </Box>
  );
}
