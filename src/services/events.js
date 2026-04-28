// Realtime DB CRUD wrappers for /events.
//
// Schema (superset of what the public calendar widget reads):
//   {
//     name, description,
//     start: <unix ms>,
//     durationMinutes: <number>,
//     startLoc: { lat, lng, label },
//     endLoc:   { lat, lng, label },
//     difficulty:      'chill' | 'race' | 'work' | 'custom',
//     difficultyLabel: <string>,
//     tags:            <string[]>,
//     rideLeader: { name, photoUrl },
//     bannerUrl: <string>,
//     routeUrl:  <string>,
//     hotdogs:   <number>,
//     unlocked:  <boolean>,   // admin opens this future event for
//                             // visitors — appears as a tappable card
//                             // in the Coming Up list. Default false.
//     createdAt, updatedAt
//   }

import {
  ref,
  push,
  set,
  update,
  remove,
  onValue,
  off,
} from 'firebase/database';
import { database } from './firebase';

const EVENTS_PATH = 'events';

export function eventsRef() {
  return ref(database, EVENTS_PATH);
}

export function eventRef(id) {
  return ref(database, `${EVENTS_PATH}/${id}`);
}

// Subscribe to all events. callback receives an array of { id, ...data }
// sorted by start ascending. Returns an unsubscribe fn.
export function subscribeEvents(callback) {
  const r = eventsRef();
  const handler = (snap) => {
    const out = [];
    snap.forEach((child) => {
      const v = child.val() || {};
      out.push({ id: child.key, ...v });
    });
    out.sort((a, b) => (a.start || 0) - (b.start || 0));
    callback(out);
  };
  onValue(r, handler);
  return () => off(r, 'value', handler);
}

// Create a new event. Returns the generated push key.
export async function createEvent(data) {
  const r = eventsRef();
  const newRef = push(r);
  const now = Date.now();
  const payload = {
    hotdogs: 0,
    unlocked: false,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  await set(newRef, payload);
  return newRef.key;
}

// Update an existing event. Merges fields via update().
export async function updateEvent(id, data) {
  const payload = { ...data, updatedAt: Date.now() };
  await update(eventRef(id), payload);
}

// Delete an event entirely.
export async function deleteEvent(id) {
  await remove(eventRef(id));
}

// Helper — partition into upcoming and past based on start.
// "Past" = start + (durationMinutes||120) is in the past, so an event in
// progress still counts as upcoming. Caller can decide what to do with it.
export function partitionEvents(events) {
  const now = Date.now();
  const upcoming = [];
  const past = [];
  events.forEach((e) => {
    const dur = (e.durationMinutes || 120) * 60_000;
    const endsAt = (e.start || 0) + dur;
    if (endsAt >= now) upcoming.push(e);
    else past.push(e);
  });
  upcoming.sort((a, b) => (a.start || 0) - (b.start || 0));
  past.sort((a, b) => (b.start || 0) - (a.start || 0));
  return { upcoming, past };
}
