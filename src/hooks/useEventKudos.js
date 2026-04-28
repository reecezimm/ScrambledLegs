import { useEffect, useRef, useState, useCallback } from 'react';
import { ref as dbRef, runTransaction } from 'firebase/database';
import { database } from '../services/firebase';

const IDLE_DEBOUNCE_MS = 300;
const HARD_CEILING_MS = 5000;

export function useEventKudos(eventId, initialCount) {
  const [remoteCount, setRemoteCount] = useState(initialCount || 0);
  const [pendingDelta, setPendingDelta] = useState(0);
  const [inFlightDelta, setInFlightDelta] = useState(0);
  const [isFlushing, setIsFlushing] = useState(false);

  const idleTimer = useRef(null);
  const hardTimer = useRef(null);
  const retryMs = useRef(1000);
  const pendingRef = useRef(0);
  const inFlightRef = useRef(0);
  const remoteAtFlushStart = useRef(initialCount || 0);

  pendingRef.current = pendingDelta;
  inFlightRef.current = inFlightDelta;

  // Sync remoteCount when the prop changes (live subscription updates)
  useEffect(() => {
    setRemoteCount(initialCount || 0);
  }, [initialCount]);

  const flush = useCallback(async () => {
    if (idleTimer.current) { clearTimeout(idleTimer.current); idleTimer.current = null; }
    if (hardTimer.current) { clearTimeout(hardTimer.current); hardTimer.current = null; }
    const toCommit = pendingRef.current;
    if (toCommit <= 0 || inFlightRef.current > 0) return;

    remoteAtFlushStart.current = remoteCount;
    setInFlightDelta(toCommit);
    setPendingDelta(0);
    setIsFlushing(true);

    try {
      await runTransaction(
        dbRef(database, `events/${eventId}/hotdogs`),
        (cur) => (cur || 0) + toCommit,
      );
      retryMs.current = 1000;
    } catch (err) {
      setPendingDelta((p) => p + toCommit);
      setInFlightDelta(0);
      const delay = retryMs.current;
      retryMs.current = Math.min(delay * 2, 30000);
      setTimeout(() => schedule(), delay); // eslint-disable-line no-use-before-define
    } finally {
      setIsFlushing(false);
    }
  }, [eventId, remoteCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const schedule = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(flush, IDLE_DEBOUNCE_MS);
    if (!hardTimer.current) {
      hardTimer.current = setTimeout(flush, HARD_CEILING_MS);
    }
  }, [flush]);

  const mash = useCallback(() => {
    setPendingDelta((p) => p + 1);
    schedule();
  }, [schedule]);

  // Reconcile inFlightDelta when remoteCount catches up
  useEffect(() => {
    if (inFlightDelta > 0 && remoteCount >= remoteAtFlushStart.current + inFlightDelta) {
      setInFlightDelta(0);
    }
  }, [remoteCount, inFlightDelta]);

  useEffect(() => {
    if (inFlightDelta > 0) remoteAtFlushStart.current = remoteCount - inFlightDelta;
  }, [inFlightDelta]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup: best-effort flush on unmount
  useEffect(() => {
    return () => {
      if (pendingRef.current > 0) flush();
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (hardTimer.current) clearTimeout(hardTimer.current);
    };
  }, [flush]);

  const displayCount = (remoteCount || 0) + inFlightDelta + pendingDelta;
  return { displayCount, mash, isFlushing, pendingDelta };
}
