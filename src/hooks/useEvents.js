import { useEffect, useState } from 'react';
import { subscribeEvents } from '../services/events';

const CACHE_KEY = 'sl_events_cache_v2';

function readCachedEvents() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { events } = JSON.parse(raw);
    if (!Array.isArray(events)) return null;
    return events;
  } catch {
    return null;
  }
}

function writeCachedEvents(events) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ events, t: Date.now() }));
  } catch {}
}

export function useEvents() {
  const [events, setEvents] = useState(() => readCachedEvents() || []);
  const [isStale, setIsStale] = useState(true);

  useEffect(() => {
    const unsub = subscribeEvents((next) => {
      setEvents(next);
      setIsStale(false);
      writeCachedEvents(next);
    });
    return unsub;
  }, []);

  return { events, isStale };
}
