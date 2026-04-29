import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ref, onValue, set, remove, serverTimestamp } from 'firebase/database';
import { database } from '../../services/firebase';
import { useCurrentUser } from '../../services/auth';
import { logEvent } from '../../services/analytics';

const PENDING_KEY = 'sl_pending_rsvp_event_id';

const Btn = styled.button`
  display: block;
  width: 100%;
  margin-top: 14px;
  padding: 16px 18px;
  border-radius: 14px;
  border: none;
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
  box-shadow: 0 6px 22px ${(p) => p.$rsvped
    ? 'rgba(111,207,151,0.35)'
    : 'rgba(255,199,44,0.35)'};
  transition: transform 0.15s, filter 0.15s, box-shadow 0.15s;
  &:hover { filter: brightness(1.05); transform: translateY(-1px); }
  &:active { transform: scale(0.98); }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

const Hint = styled.div`
  margin-top: 6px;
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  text-align: center;
  font-family: 'Inter', sans-serif;
`;

// eslint-disable-next-line no-unused-vars
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

// eslint-disable-next-line no-unused-vars
const CountPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255,199,44,0.10);
  border: 1px solid rgba(255,199,44,0.30);
  color: #FFE66D;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
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

// Tiny non-crypto string hash (djb2-ish), stable across sessions/devices.
function stringHash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function teaserCountFor(eventId) {
  if (!eventId) return 3;
  return (stringHash(String(eventId)) % 3) + 3;
}

export default function RsvpToggle({ event }) {
  const { user, loading } = useCurrentUser();
  const [rsvped, setRsvped] = useState(false);
  const [busy, setBusy] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!event || !event.id) return undefined;
    const r = ref(database, `rsvps/${event.id}`);
    const unsub = onValue(r, (snap) => {
      const v = snap.val() || {};
      setCount(Object.keys(v).length);
    });
    return () => unsub();
  }, [event]);

  useEffect(() => {
    if (!event || !event.id || !user) {
      setRsvped(false);
      return undefined;
    }
    const r = ref(database, `rsvps/${event.id}/${user.uid}`);
    const unsub = onValue(r, (snap) => {
      setRsvped(!!snap.val());
    });
    return () => unsub();
  }, [event, user]);

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

  const doRsvp = async () => {
    if (!user || !event || !event.id) return;
    setBusy(true);
    try {
      // Pull canonical displayName + photoURL from userProfiles (we set
      // user.displayName on auth.currentUser is always null since we don't
      // call updateProfile). Fall back to email local-part, then 'rider'.
      let profileName = '';
      let profilePhoto = null;
      try {
        const { get, ref: r2 } = await import('firebase/database');
        const snap = await get(r2(database, `userProfiles/${user.uid}`));
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

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast((t) => (t === msg ? '' : t)), 2600);
  };

  const handleClick = () => {
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

  // Count pill removed — the Crew section header now shows the count.
  return (
    <>
      <Btn type="button" $rsvped={rsvped} disabled={busy} onClick={handleClick}>
        {rsvped ? "✓ You're in" : "I'm coming"}
      </Btn>
      {!user && !loading && (
        <Hint>Sign in to lock in your RSVP and join the leaderboard.</Hint>
      )}
      {toast && <Toast>{toast}</Toast>}
    </>
  );
}
