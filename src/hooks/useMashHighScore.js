// ─────────────────────────────────────────────────────────────────────────────
// useMashHighScore — module-level event bus + React hook for mash high-score
// tracking (live current count, session-best, cumulative all-time best).
//
// Why a module-level bus instead of gameStore: the high-score HUD is a
// host-side concern (KudosCta owns hdPressCountRef), not a mini-game concern.
// We keep this isolated from the game director's resolved-state pipeline.
//
// KudosCta is the producer:
//   • emitCurrent(n) on every press / bonus delta
//   • emitSessionStart({ eventId, uid }) on first press
//   • emitSessionEnd() when entering idle (after burn / cleanup)
//   • emitCumulativeWritten({ eventId, uid, best }) right after the RTDB
//     transaction succeeds — lets the HUD update immediately without waiting
//     for the onValue listener to round-trip.
//
// HighScoreHud + HighScoreCelebration are consumers via useMashHighScore().
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';
import {
  ref as dbRef,
  onValue,
  query,
  orderByChild,
  limitToLast,
} from 'firebase/database';
import { database } from '../services/firebase';

// ── Module-level state + listeners ──────────────────────────────────────────
let _current = 0;
let _session = { eventId: null, uid: null, active: false };
const _listeners = new Set();

function notify(kind, payload) {
  _listeners.forEach((fn) => {
    try { fn(kind, payload); } catch (_) {}
  });
}

export function emitCurrent(n) {
  const next = Math.max(0, Number(n) || 0);
  if (next === _current) return;
  _current = next;
  notify('current', next);
}

export function emitSessionStart({ eventId, uid }) {
  _session = { eventId: eventId || null, uid: uid || null, active: true };
  notify('sessionStart', _session);
}

// Set the event context BEFORE a press happens — lets the HUD subscribe to
// the global high score for the visible event as soon as KudosCta mounts.
// Does not flip session.active. Idempotent: a no-op if context already matches.
export function emitEventContext({ eventId, uid }) {
  const nextEv = eventId || null;
  const nextUid = uid || null;
  if (_session.eventId === nextEv && _session.uid === nextUid) return;
  _session = { eventId: nextEv, uid: nextUid, active: _session.active };
  notify('sessionStart', _session);
}

export function emitSessionEnd() {
  _session = { ..._session, active: false };
  notify('sessionEnd', _session);
}

// Hint emitted right after KudosCta writes a new cumulative best.
// Payload: { eventId, uid, best }. The onValue listener will also pick this
// up — this is purely an optimistic fast-path.
export function emitCumulativeWritten(payload) {
  notify('cumulativeWritten', payload);
}

export function getCurrent() { return _current; }
export function getSessionInfo() { return _session; }

// ── Hook ────────────────────────────────────────────────────────────────────
// Returns { current, session, cumulative, eventId, uid, sessionActive }.
//   • current — live press count (synced to a ref + rAF-throttled state)
//   • session — max(current) seen during this in-tab session lifecycle
//   • cumulative — RTDB-backed all-time best for this user/event (null until
//     loaded; null forever for anon users)
export function useMashHighScore() {
  const [current, setCurrent] = useState(_current);
  const [session, setSession] = useState(0);
  const [cumulative, setCumulative] = useState(null);
  // Top score across ALL users for this event — the "score to beat."
  // Loaded on a separate RTDB query: orderByChild('best') + limitToLast(1)
  // returns the single highest entry, and onValue keeps it live.
  const [globalBest, setGlobalBest] = useState(null);
  const [globalBestUid, setGlobalBestUid] = useState(null);
  const [sessionInfo, setSessionInfo] = useState(_session);

  const pendingRef = useRef(_current);
  const rafRef = useRef(0);

  // Subscribe to the bus.
  useEffect(() => {
    const onEvt = (kind, payload) => {
      if (kind === 'current') {
        pendingRef.current = payload;
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(() => {
            rafRef.current = 0;
            setCurrent(pendingRef.current);
          });
        }
      } else if (kind === 'sessionStart') {
        setSessionInfo(payload);
        // Note: do NOT reset session-best here. Session HS in the spec is
        // "highest count this user has reached in any session for this event
        // during the current page lifetime" — it survives saves/resets in
        // the same tab. We DO reset it when the eventId/uid pair changes
        // (handled via the keyed effect below).
      } else if (kind === 'sessionEnd') {
        setSessionInfo(payload);
      } else if (kind === 'cumulativeWritten') {
        if (
          payload &&
          payload.eventId === _session.eventId &&
          payload.uid === _session.uid &&
          typeof payload.best === 'number'
        ) {
          setCumulative((prev) => Math.max(prev || 0, payload.best));
        }
      }
    };
    _listeners.add(onEvt);
    return () => {
      _listeners.delete(onEvt);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, []);

  // Track session-best locally as current rises.
  useEffect(() => {
    if (current > session) setSession(current);
  }, [current, session]);

  // When the (eventId, uid) pair changes, reset session-best — different
  // event or different signed-in user means a fresh local-best baseline.
  useEffect(() => {
    setSession(0);
  }, [sessionInfo.eventId, sessionInfo.uid]);

  // RTDB listener for cumulative best. Re-subscribe when eventId/uid changes.
  useEffect(() => {
    setCumulative(null);
    if (!sessionInfo.eventId || !sessionInfo.uid) {
      return undefined;
    }
    const path = `mashHighScores/${sessionInfo.eventId}/${sessionInfo.uid}/best`;
    const r = dbRef(database, path);
    const unsub = onValue(r, (snap) => {
      const val = snap.val();
      setCumulative(typeof val === 'number' ? val : 0);
    }, (err) => {
      setCumulative(0);
    });
    return () => unsub();
  }, [sessionInfo.eventId, sessionInfo.uid]);

  // RTDB listener for the GLOBAL top score across all users for this event.
  // Deferred until the session is active (first press) — HUD is hidden until
  // current > 0 so there's no visual benefit to loading this before pressing.
  useEffect(() => {
    setGlobalBest(null);
    setGlobalBestUid(null);
    if (!sessionInfo.eventId) {
      return undefined;
    }
    const path = `mashHighScores/${sessionInfo.eventId}`;
    const q = query(
      dbRef(database, path),
      orderByChild('best'),
      limitToLast(1),
    );
    const unsub = onValue(q, (snap) => {
      let topVal = 0;
      let topKey = null;
      snap.forEach((child) => {
        const v = child.val();
        const n = v && typeof v.best === 'number' ? v.best : 0;
        if (n > topVal) { topVal = n; topKey = child.key; }
      });
      setGlobalBest(topVal);
      setGlobalBestUid(topKey);
    }, (err) => {
      setGlobalBest(0);
      setGlobalBestUid(null);
    });
    return () => unsub();
  }, [sessionInfo.eventId]);

  return {
    current,
    session,
    cumulative,
    globalBest,
    globalBestUid,
    isHoldingGlobal: globalBestUid != null && globalBestUid === sessionInfo.uid,
    eventId: sessionInfo.eventId,
    uid: sessionInfo.uid,
    sessionActive: sessionInfo.active,
  };
}
