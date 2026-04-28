# Events Firebase Data Layer — Plan

> Companion to [`calendar-mockup.html`](./calendar-mockup.html) (UX reference) and the existing thin RTDB wrappers in [`src/services/events.js`](./src/services/events.js). This doc covers the production wiring: instant first paint, live subscriptions, and a kudos counter that stays smooth across simultaneous mashers.
>
> Cross-refs: [`NOTIFICATIONS.md`](./NOTIFICATIONS.md) (Blaze + Functions context), [`SEO.md`](./SEO.md) (build-time prerender for SEO — complementary to the runtime cache discussed here), [`STATUS.md`](./STATUS.md).
>
> **Hobbyist scope.** ~50 events ever, ~100 daily visitors, one Cloud Function deploy already paid for. We are NOT designing for 100K concurrent mashers.

---

## TL;DR

| Concern | Decision |
|---|---|
| First paint of events | localStorage stale-while-revalidate (`sl_events_cache_v1`) — render cached snapshot synchronously on mount, swap in live data when `onValue` fires. |
| Live subscription | Single `onValue('/events')` subscription on the Home component, sorted client-side. No per-event subscriptions for the detail sheet — derive from the list. |
| Kudos writes | RTDB `runTransaction` on `/events/{id}/hotdogs`, debounced flush of `pendingDelta` (300 ms idle, 5 s hard ceiling). Display = `remoteCount + pendingDelta`, never goes down on remote sync. |
| Kudos reads | Piggyback on the events-list `onValue`. No separate listener per card. |
| Schema | Existing shape is correct. Add `archivedAt: number\|null` to freeze final kudos cleanly. |
| Rules | Tighten public writes to "increment `hotdogs` by ≤ N per write, nothing else." Admin path is still client-password for now. |
| Cost | Free tier swallows it whole. Transactions are the only thing worth thinking about; debouncing pins it to ~1 write per masher per 300 ms-5 s. |

---

## A. Initial-load latency

### What happens today (cold cache, V1 production wiring)

1. Browser fetches `index.html` → ~5–20 KB.
2. Browser fetches main JS bundle (~120 KB gzipped per `STATUS.md`).
3. React boots, App mounts, Home mounts.
4. Home `useEffect` calls `subscribeEvents` → `onValue` opens WebSocket to RTDB.
5. RTDB returns the snapshot (one round-trip, ~150–400 ms from the US Central edge for a US visitor; multi-second on a flaky cellular connection).
6. First event card paints.

Floor on a warm CDN cache is ~500 ms; cold cellular regularly hits 2–3 s. The widget is the centerpiece of the home page. Three seconds of skeleton shimmer is the difference between feeling like a polished native app and feeling like a hobbyist React site.

### Options considered

| Option | Verdict |
|---|---|
| **localStorage SWR cache** (`sl_events_cache_v1`) | ✅ Recommended. ~50 events × ~1 KB JSON = trivial. Synchronous read. Survives across sessions. |
| **IndexedDB / Cache API** | ❌ Overkill. Async API, structured-clone cost, transaction overhead. Worth maybe 10 ms vs localStorage on this payload size — and we burn 30 LOC of boilerplate per hook. Skip. |
| **Firebase JS SDK offline persistence** | ❌ Not available for the RTDB web SDK. (Firestore web has it via `enableIndexedDbPersistence`; RTDB only has it on iOS/Android native and a separate `keepSynced` for queries — which doesn't survive a page reload anyway.) Don't plan around it. |
| **Build-time prerender of `<script id="__SL_EVENTS__">…</script>`** | ✅ but covered separately. The SEO workstream bakes the events list into `index.html` for crawlers. That JSON can also seed the cache on first-ever visit (eliminating the skeleton fallback entirely). See [`SEO.md`](./SEO.md) — don't duplicate. |
| **Skeleton placeholders** | ⚠️ Fallback only. Used when localStorage is empty (truly first visit) AND the build-time bake hasn't shipped yet. After SEO ships, this branch should rarely fire. |

### Recommended pattern

**Render order on mount:**

```
1. Synchronous read of localStorage → if present, render immediately, mark isStale=true
2. (If empty) read window.__SL_EVENTS__ from build-time bake → render, mark isStale=true
3. (If both empty) render skeleton, mark isLoading=true
4. Subscribe to /events via onValue
5. On first onValue snapshot:
     - write fresh JSON to localStorage
     - swap state, mark isStale=false, isLoading=false
```

**Cache key versioning.** Key is `sl_events_cache_v1`. Bump to `_v2` on any breaking schema change (e.g., the day we add `archivedAt`). Old keys are abandoned, not migrated — cheaper and safer than writing a migrator for ~50 records that will refresh on next live snapshot anyway.

**What gets cached.** The full sorted array as returned from `subscribeEvents`. No partial caching, no per-event keys. Single read, single write.

**Read sketch:**

```js
// src/services/eventsCache.js
const CACHE_KEY = 'sl_events_cache_v1';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days, just a sanity bound

export function readCachedEvents() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { savedAt, events } = JSON.parse(raw);
    if (!Array.isArray(events)) return null;
    if (Date.now() - savedAt > MAX_AGE_MS) return null;
    return events;
  } catch {
    return null;
  }
}

export function writeCachedEvents(events) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      savedAt: Date.now(),
      events,
    }));
  } catch {
    /* quota exceeded → silently drop, live data still works */
  }
}
```

**Why synchronous matters.** localStorage reads are blocking but fast (<1 ms for 50 KB). Doing this *inside the initial `useState` initializer* means the first React render already has data. No flash of empty state, no `useEffect` round-trip.

```js
// inside useEvents()
const [events, setEvents] = useState(() => readCachedEvents() || []);
const [isStale, setIsStale] = useState(() => readCachedEvents() != null);
const [isLoading, setIsLoading] = useState(() => readCachedEvents() == null);
```

### What "instant" actually means here

- **Repeat visit:** event list paints in the same frame as the React tree mounts. Sub-100 ms perceived. The kudos counts shown are whatever was last saved (could be a few minutes stale; live count fades in within ~500 ms).
- **First-ever visit, after SEO bake ships:** event list paints in the same frame from `window.__SL_EVENTS__`. Same UX as repeat visit.
- **First-ever visit, no SEO bake:** 1–2 skeleton cards with shimmer until live data arrives.

---

## B. Live data subscription model

### One subscription, not many

Open exactly one `onValue('/events')` listener at the Home component level. Sort client-side by `start`. Pass the full list down to:

- the featured-event card (= first upcoming),
- the Coming Up list,
- the archive list,
- the unlocked-event detail sheet (which receives a single event by id, derived from the list, not a separate subscription).

**Why not per-section:**

- RTDB doesn't have a real "where" filter. `orderByChild('start').startAt(now)` would split upcoming/past into two listeners but each still fetches the full child range and we end up paying for two WebSocket subscriptions to the same endpoint. Net loss.
- Sorting and partitioning 50 events client-side is microseconds. `partitionEvents` already exists in `events.js`.
- One subscription = one source of truth = no reconciliation between two listeners.

### Where to subscribe

Inside a top-level `useEffect` in `useEvents()`, mounted once on Home. Yes, this means the subscription opens *after* React mounts (~50–150 ms post-bundle-execute), but the localStorage cache covers that gap. There is no benefit to opening the subscription before React mounts (and significant complexity in doing so — module-level subscriptions don't clean up).

### Detach pattern

The thin wrapper `subscribeEvents` already returns `() => off(r, 'value', handler)`. Hooks must call this in the `useEffect` cleanup:

```js
useEffect(() => {
  const unsubscribe = subscribeEvents((next) => {
    setEvents(next);
    setIsStale(false);
    setIsLoading(false);
    writeCachedEvents(next);
  });
  return unsubscribe;
}, []);
```

**Failure mode to avoid:** the unlocked-event detail sheet must NOT open its own `/events/{id}` subscription. If it did, navigating between events would leak listeners (every open = one new listener; close without unsubscribe = listener stays alive in memory, fires forever). Instead, the detail sheet receives `event` as a prop sourced from the parent list — when that event's `hotdogs` changes via the list's listener, the sheet rerenders for free.

### When the detail sheet really does need a fresh read

Edge case: notification deep-link to `/events/:eventId` lands directly on a route that is NOT the home page, so the events list isn't mounted. Two options:

1. Mount `useEvents()` at the App root so the list is always live. Trivial, ~10 KB of extra subscription state, recommended.
2. Lazy-load just that event with `get(ref(db, 'events/'+id))` (one-shot, no listener). Fine fallback if we don't want a global subscription.

Pick **option 1**. It keeps the data layer simple — every page can read the same `useEvents()` and never needs to know about the difference.

---

## C. Reactive hot-dog kudos counter

This is the load-bearing section. Get this wrong and the counter flickers, loses clicks, or shows the same user different numbers across two tabs.

### Mockup behavior recap

From `calendar-mockup.html`:

- Click → optimistic local increment (`ev.hotdogs += 1; kudosPendingDelta += 1`).
- Display reads from `ev.hotdogs` directly.
- Debounce timer, 5 s, flushes `kudosPendingDelta` (currently a no-op that just zeroes it).
- No transaction, no remote read, no reconciliation.

That works for one tab on one device. It falls apart the moment two people click at the same time.

### Failure modes the production version must handle

| Mode | Symptom | Fix |
|---|---|---|
| Multi-user race on naive write | A reads 47, B reads 47, both write 48. One click vanishes. | `runTransaction` on the leaf, not `set`. |
| Display reconciliation flicker | Local shows 50 (47 remote + 3 pending). Flush succeeds, remote becomes 50, our `onValue` fires with 50. If we naively render `remote + pending` we'd show 53. If we reset `pending` to 0 first then receive the snapshot we briefly show 47. | Track an in-flight delta separately from a queued delta. Decrement in-flight only when the corresponding snapshot arrives. |
| Pop animation on remote update | Another user mashes 5 times. Our `onValue` fires with `+5`. The +N pop animation triggers as if WE clicked, which is wrong. | Pop is purely a function of click events, not state changes. Animate from the click handler, never from state-change effects. |
| Stale-cache + concurrent mash | Cached count 47. User mashes once → 48. Live data arrives showing 52 (other people mashed). We want to display 53, not 48 or 52. | `display = remoteCount + pendingDelta`. As long as `pendingDelta` survives the cache→live swap, the math just works. |
| Network failure during flush | Transaction throws. Pending delta is zeroed. Clicks lost. | Catch the error, restore the delta to `pendingDelta`, retry on next debounce tick (or on next click). |
| Per-event independence | Two kudos pills can be on screen at once (featured + open detail sheet for a different unlocked event). They must not share state. | Hook is keyed by `eventId`. Each instance owns its own `pendingDelta` and debounce timer. |

### State machine

Three numbers per event in the React tree:

```
remoteCount      // last value from onValue snapshot (authoritative)
inFlightDelta    // clicks currently being written by an in-flight transaction
pendingDelta     // clicks queued for the next flush
displayCount = remoteCount + inFlightDelta + pendingDelta
```

Click:
```
pendingDelta += 1
schedule flush (debounced 300 ms idle, 5 s hard ceiling)
fire +1 pop animation
```

Flush start:
```
inFlightDelta = pendingDelta
pendingDelta  = 0
runTransaction(ref('events/'+id+'/hotdogs'), (cur) => (cur || 0) + inFlightDelta)
```

Flush success:
```
// onValue will fire with the new authoritative value (which now INCLUDES our delta).
// We don't decrement inFlightDelta here. We wait for the snapshot.
```

`onValue` snapshot arrives:
```
const newRemote = snapshot.value
// If the snapshot reflects our committed delta, swallow it.
// We can't perfectly identify "our" delta, but we can use the heuristic:
//   if newRemote >= remoteCount + inFlightDelta, our write is in
if (newRemote >= remoteCount + inFlightDelta) {
  inFlightDelta = 0
}
remoteCount = newRemote
// displayCount recomputes from the formula → no jump
```

Flush failure (network, transaction aborted, permission denied):
```
pendingDelta += inFlightDelta   // put them back at the front of the queue
inFlightDelta = 0
schedule flush again with backoff (1 s, 2 s, 4 s, max 30 s)
```

Why this never visually decreases:
- `displayCount = remoteCount + inFlightDelta + pendingDelta`.
- On flush start: `inFlightDelta` jumps up by N, `pendingDelta` drops by N. Net zero.
- On flush success + snapshot: `remoteCount` jumps up by N (or more — others mashed too), `inFlightDelta` drops to 0. Net = up by (others' delta), never down.
- On flush failure: `pendingDelta` jumps up by N, `inFlightDelta` drops by N. Net zero.

### Hook sketch — `useEventKudos(eventId, remoteCount)`

`remoteCount` is passed in from the parent `useEvents()` because the events list listener already has it. No separate subscription.

```js
// src/hooks/useEventKudos.js
import { useEffect, useRef, useState, useCallback } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { database } from '../services/firebase';

const IDLE_DEBOUNCE_MS = 300;
const HARD_CEILING_MS  = 5000;

export function useEventKudos(eventId, remoteCount) {
  const [pendingDelta, setPendingDelta]   = useState(0);
  const [inFlightDelta, setInFlightDelta] = useState(0);
  const [isFlushing, setIsFlushing]       = useState(false);

  const idleTimer = useRef(null);
  const hardTimer = useRef(null);
  const retryMs   = useRef(1000);

  // refs to avoid stale closures inside timers
  const pendingRef  = useRef(0);
  const inFlightRef = useRef(0);
  pendingRef.current  = pendingDelta;
  inFlightRef.current = inFlightDelta;

  const flush = useCallback(async () => {
    if (idleTimer.current) { clearTimeout(idleTimer.current); idleTimer.current = null; }
    if (hardTimer.current) { clearTimeout(hardTimer.current); hardTimer.current = null; }
    const toCommit = pendingRef.current;
    if (toCommit <= 0 || inFlightRef.current > 0) return;

    setInFlightDelta(toCommit);
    setPendingDelta(0);
    setIsFlushing(true);

    try {
      await runTransaction(
        ref(database, `events/${eventId}/hotdogs`),
        (cur) => (cur || 0) + toCommit,
      );
      retryMs.current = 1000;
      // inFlightDelta is cleared by the snapshot reconciliation effect below
    } catch (err) {
      // Restore: clicks return to the queue.
      setPendingDelta((p) => p + toCommit);
      setInFlightDelta(0);
      // Backoff
      const delay = retryMs.current;
      retryMs.current = Math.min(delay * 2, 30000);
      setTimeout(() => schedule(), delay);
    } finally {
      setIsFlushing(false);
    }
  }, [eventId]);

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

  // Reconcile inFlightDelta when remoteCount catches up.
  // We snapshot the remoteCount AT THE TIME we kicked off the transaction
  // by stashing it in a ref when inFlightDelta transitions 0 → N.
  const remoteAtFlushStart = useRef(remoteCount);
  useEffect(() => {
    if (inFlightDelta > 0 && remoteAtFlushStart.current === remoteCount) {
      // we just started; snapshot point already set
    }
    if (inFlightDelta > 0 && remoteCount >= remoteAtFlushStart.current + inFlightDelta) {
      setInFlightDelta(0);
    }
  }, [remoteCount, inFlightDelta]);

  useEffect(() => {
    if (inFlightDelta > 0) remoteAtFlushStart.current = remoteCount - inFlightDelta;
  }, [inFlightDelta]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup: on unmount, try a best-effort flush so we don't lose clicks.
  useEffect(() => () => {
    if (pendingRef.current > 0) flush();
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (hardTimer.current) clearTimeout(hardTimer.current);
  }, [flush]);

  const count = (remoteCount || 0) + inFlightDelta + pendingDelta;
  return { count, mash, isFlushing, pendingDelta };
}
```

Notes:
- The reconciliation effect uses `>=` not `===` so we still clear `inFlightDelta` when other users mashed concurrently (snapshot value is `remoteAtFlushStart + ourDelta + others`, which is `>=` our threshold).
- `retryMs` lives in a ref, not state, because it shouldn't trigger rerenders.
- Best-effort flush on unmount catches the case where the user clicks 3 times then immediately closes the detail sheet.

### Pop animation

The `+N` pop is fired from inside `mash()` (or from the click handler that calls `mash()`), via direct DOM/CSS class toggling on the button element — exactly as the mockup does today. **Do not** drive it from a `useEffect` watching `count`, because then remote updates would trigger the pop. Click events are the source; state is the consequence.

### Why 300 ms idle / 5 s ceiling

- The mockup uses 2.5 s. That's reasonable for the phrase-balloon dwell, but for the *write* it's too long — close the tab inside 2.5 s and clicks vanish unless cleanup-flush works.
- 300 ms idle means a single click flushes fast (feels real-time to other viewers), while a mashing burst still coalesces.
- 5 s hard ceiling guarantees we never sit on more than 5 s of clicks regardless of how fast someone mashes.

---

## D. Firebase data shape

### Existing schema (from `src/services/events.js`)

```
/events/{pushKey}: {
  name, description,
  start: <unix ms>,
  durationMinutes: <number>,
  startLoc: { lat, lng, label },
  endLoc:   { lat, lng, label },
  difficulty:      'chill' | 'race' | 'work' | 'custom',
  difficultyLabel: <string>,
  tags:            <string[]>,
  rideLeader: { name, photoUrl },
  bannerUrl: <string>,
  routeUrl:  <string>,
  hotdogs:   <number>,
  unlocked:  <boolean>,
  createdAt, updatedAt,
}
```

### Proposed additions

| Field | Type | Why |
|---|---|---|
| `archivedAt` | `number \| null` | Stamped by admin (or by a Cloud Function on a cron) when an event tips into the `archived` lifecycle state. Lets rules freeze `hotdogs` writes after archive. Prevents the "bot mashes the 2019 Lester race to 1M kudos" failure mode. |

Optional — punt unless we need them:

| Field | Why we're skipping |
|---|---|
| `kudosByUserId` | Hobbyist scope says total only. Keeping per-user state requires auth, and we don't have it. Confirmed: total only. |
| `routeGeoJson` | `routeUrl` (link out to RWGPS/Strava) is enough for v1. |
| `cancelled` | Use `unlocked: false` + a `description` note for now. Add later if there's actual demand. |

### Per-user kudos tracking

**Decision:** no. Total only. Hobbyist scope, no auth, anonymous mashing is the fun part. If anyone ever wants leaderboards, that's a v2 conversation involving Firebase Auth.

### Frozen-on-archive vs always-open

**Decision:** freeze. After `archivedAt` is set, rules block further `hotdogs` increments. The number on the archive card is the ride's final score — it should be a memorial, not a leaderboard slot you can pad post-hoc. Implementation is in §F.

### Indexing

Existing `.indexOn: ['start']` is sufficient. Client sorts a 50-element array; index isn't even hit. Keeping the index in case we ever do `orderByChild('start').limitToLast(N)` later.

---

## E. React component patterns

### `useEvents()` hook

```js
// src/hooks/useEvents.js
import { useEffect, useState } from 'react';
import { subscribeEvents } from '../services/events';
import { readCachedEvents, writeCachedEvents } from '../services/eventsCache';

export function useEvents() {
  const cached = readCachedEvents();
  const [events, setEvents]       = useState(cached || []);
  const [isStale, setIsStale]     = useState(cached != null);
  const [isLoading, setIsLoading] = useState(cached == null);

  useEffect(() => {
    const unsub = subscribeEvents((next) => {
      setEvents(next);
      setIsStale(false);
      setIsLoading(false);
      writeCachedEvents(next);
    });
    return unsub;
  }, []);

  return { events, isStale, isLoading };
}
```

### `useEvent(eventId)` hook

```js
// src/hooks/useEvent.js
import { useEvents } from './useEvents';

export function useEvent(eventId) {
  const { events, isStale, isLoading } = useEvents();
  const event = events.find((e) => e.id === eventId) || null;
  return { event, isStale, isLoading };
}
```

That's it. No separate subscription. Mounted somewhere up the tree (App or Home) keeps `useEvents` alive everywhere; this hook is a pure projection.

### `useEventKudos(eventId, remoteCount)` hook

See §C above. The caller pulls `remoteCount` from `useEvent(eventId).event.hotdogs` and passes it in, e.g.:

```js
function FeaturedCard() {
  const { events } = useEvents();
  const featured = events.find(/* first upcoming */);
  const { count, mash } = useEventKudos(featured?.id, featured?.hotdogs || 0);
  return (
    <button onClick={mash}>
      🌭 {count}
    </button>
  );
}
```

### Cleanup invariants

- `useEvents` cleans its `onValue` listener on unmount.
- `useEventKudos` clears both timers and best-effort-flushes on unmount.
- `useEvent` doesn't subscribe to anything → nothing to clean.
- The detail-sheet route component must not start its own listener.

---

## F. Security rules tightening

Current `database.rules.json` for `/events`:

```json
"events": {
  ".read": true,
  ".write": true,
  ".indexOn": ["start"],
  "$id": {
    "hotdogs": { ".validate": "newData.isNumber()" }
  }
}
```

This lets anyone delete or rewrite anything. Tighten to: anonymous users can only INCREMENT `hotdogs` on a non-archived event, by a small amount per write, and can do nothing else. Admin writes will need a real path (see §H — punted for now).

### Proposed `events` block

```json
"events": {
  ".read": true,
  ".indexOn": ["start"],
  "$id": {
    ".write": false,
    "hotdogs": {
      ".write": "
        (data.exists() || newData.val() == 0) &&
        newData.isNumber() &&
        newData.val() >= (data.val() || 0) &&
        newData.val() - (data.val() || 0) <= 50 &&
        (!root.child('events').child($id).child('archivedAt').exists() ||
          root.child('events').child($id).child('archivedAt').val() == 0)
      ",
      ".validate": "newData.isNumber()"
    }
  }
}
```

Rule-by-rule:

| Clause | Why |
|---|---|
| `data.exists() \|\| newData.val() == 0` | If the event row doesn't exist yet, only allow seeding to 0. Prevents creating fake events from the public path. |
| `newData.isNumber()` | Type check. |
| `newData.val() >= (data.val() \|\| 0)` | Monotonic. Cannot decrease. Stops vandalism. |
| `newData.val() - (data.val() \|\| 0) <= 50` | Per-write cap of 50. The hook commits whole bursts in one transaction; 50 is generous for a 5-second window of normal mashing. Above 50 is a script. |
| `archivedAt` check | Once archived, kudos are frozen. |

### Admin path

Admin writes (create/edit/delete events) still go through the client with a hard-coded password, same as `/admin1` today. That means **the rules must still allow public write of all-non-hotdogs fields**, which we can't safely enforce in pure rules without auth.

**Pragmatic compromise:** admin writes continue under the current "all paths writable" assumption, but only via the admin UI. The client hides the admin route behind a password and an obscure URL (`/admin1`). This is the same trust model as the current production deployment; we are not regressing. Treat as a known-temporary risk; long-term fix is a callable Cloud Function (`adminUpsertEvent`) gated by the same `OG scrambled crew` password as `sendPush`. That function would be the only admin write path, and rules could then say `".write": false` everywhere.

For v1 of the calendar, do this:

```json
"events": {
  ".read": true,
  ".write": "auth != null || true",  // see note below
  ".indexOn": ["start"],
  "$id": {
    "hotdogs": {
      ".validate": "
        newData.isNumber() &&
        newData.val() >= (data.val() || 0) &&
        newData.val() - (data.val() || 0) <= 50 &&
        (!root.child('events').child($id).child('archivedAt').exists() ||
          root.child('events').child($id).child('archivedAt').val() == 0)
      "
    }
  }
}
```

Note: `".write": "auth != null || true"` is intentionally permissive for now. The hardening to `false` happens the day we ship the admin Cloud Function. Document the regression risk in `STATUS.md` so it doesn't stay forgotten.

The kudos `.validate` does the heavy lifting: any write that touches `/events/{id}/hotdogs` must satisfy it, even if the parent `.write` is open. Validates run at every node touched, so the hot-dog increment is protected even though admin writes aren't.

---

## G. Cost & quotas

### Storage and bandwidth

| Item | Math | Notes |
|---|---|---|
| 50 events × ~1 KB | 50 KB total stored | Trivial vs 1 GB free tier. |
| 100 visitors/day × 50 KB initial sync | 5 MB/day = 150 MB/month | Trivial vs 10 GB egress free. |
| Live updates as people mash | Per-write payload ~80 bytes (the leaf only); subscribers receive deltas, not full snapshots | Negligible. |
| Concurrent connections | Best case ≈ visitors currently on the home page. RTDB free tier = 100 simultaneous. | Hobbyist site, hits maybe 5–10 peak. Fine. |

### Transaction writes — the only real concern

A masher generating 1 click/sec for 30 s = 30 clicks. Coalesced with 300 ms idle / 5 s ceiling, that's ~6 transactions for the whole burst. Ten simultaneous mashers on the same event = ~60 transactions over 30 s. RTDB transactions are charged as writes; each is well under the free tier's daily budget on Blaze (Blaze just bills $1 per GB egress beyond 10 GB; transactions are essentially free at this scale).

The actual bottleneck before money is the *contention*: every transaction on the same leaf retries if there's a concurrent write. With 10 mashers writing every 300 ms, expect 1–3 retries per write — adds ~100–500 ms latency to a flush, which is invisible to the masher because the optimistic UI already shows the new value.

### When to worry

If a TikTok ever points 50K people at the unlocked event card, the contention on a single transaction leaf becomes pathological. Mitigation (only if it happens): switch to a fan-out write pattern where each click writes to `/events/{id}/kudosShards/{randomShardKey}` (one of 10 shards), and a Cloud Function periodically rolls up the shards into the canonical `hotdogs` field. **Don't build this yet.** This is YAGNI until proven.

---

## H. Implementation order

1. **Add `eventsCache.js`** with `read`/`writeCachedEvents`. No UI changes yet. Verify in DevTools that the home page's existing data flow doesn't break.
2. **Build `useEvents()` hook** (replaces direct `subscribeEvents` calls in Home). Wire the cache read into `useState` initializer. Cold load now shows last-cached events instantly; live data swaps in.
3. **Build `useEvent(eventId)`** as a pure projection. Wire into the unlocked-event detail sheet route component.
4. **Build `useEventKudos(eventId, remoteCount)`** with the state machine in §C. Replace the mockup's local-only counter on featured + detail-sheet pills.
5. **Tighten `database.rules.json`** with the kudos increment validator from §F. Test by attempting a malicious decrement / large-jump write from the console; verify rejection.
6. **Add `archivedAt`** to the schema. Default `null`. Add an admin-side toggle (or a daily Cloud Function — punt to v2). Confirm rules block kudos writes once stamped.
7. **Cross-link with the SEO build-time bake** ([`SEO.md`](./SEO.md)): seed `useEvents()` from `window.__SL_EVENTS__` if localStorage is empty. Order: SEO ships first; this is a one-line addition once it does.
8. **Long-term — admin Cloud Function**: `adminUpsertEvent` callable, password-gated like `sendPush`. Once shipped, flip `.write` on `/events` from permissive to `false`. Tracked in [`STATUS.md`](./STATUS.md) backlog, NOT part of the calendar v1 milestone.

---

## Risks / things to double-check at implementation time

- **`runTransaction` on a leaf path** behavior in the modular v9 SDK: confirm the import is `import { runTransaction } from 'firebase/database'` (yes per current docs) and that it accepts a function `(currentData) => newData` returning a number. Verify with a manual write before trusting the masher path.
- **`onValue` firing before `runTransaction` resolves.** The SDK normally fires the local optimistic snapshot first, then the server-confirmed snapshot. The reconciliation logic in §C tolerates both orderings — but worth a test with 2 tabs side by side.
- **Best-effort unmount flush** uses an async function inside an effect cleanup; the Promise is discarded. Acceptable for the "user closed the sheet with 2 pending clicks" case but means the very last clicks before a hard tab-close *can* be lost. To paper over this we'd register a `pagehide` listener that calls `flush()` synchronously — file as a follow-up if anyone reports lost clicks.
- **localStorage quota** on Safari private mode is 0 bytes. The `try/catch` swallow is correct; just confirm UX still works (it should — falls back to live-load skeleton).
- **Cache version bump discipline**: any breaking schema change must bump `_v1` → `_v2`. Easy to forget. Worth a comment at the top of `eventsCache.js` and a checklist item in `STATUS.md`.
