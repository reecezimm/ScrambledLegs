# EVENTS_INDEXING.md — Get rides on Google Events, Facebook, etc.

_Last updated: 2026-04-28. Author: planning doc, not yet implemented in code._

This is the operational playbook for getting Scrambled Legs rides
discoverable in external event surfaces — Google Search's Events
feature first, then Facebook, then the long tail of free local
aggregators. It's scoped to a hobbyist mountain bike team on a static
GitHub Pages SPA. It is honest about what the stack can do and what
it can't, and it will not recommend rebuilding on Next.js to chase a
rich result that isn't guaranteed.

This builds on `SEO.md`. Quick wins #1 (meta tags) and #2 (sitemap +
robots) from that doc are already shipped. The next layer of work is
specifically about events.

---

## TL;DR — top 3 things to do, ordered

1. **Add `Event` JSON-LD to the homepage `<head>` for the next 3-5
   upcoming events.** Generated at build time from a Firebase fetch.
   Zero new infra, no per-event pages required, gets the markup
   into the static HTML on the first crawl wave. **Effort: ~3 hours.
   Impact: high.**
2. **Build-time prerender per-event pages at `build/events/{id}/index.html`
   with full meta + JSON-LD baked in.** A small Node script (Firebase
   Admin SDK, no Cloud Function) runs in the existing GitHub Action
   before `npm run build`. Sitemap auto-regenerated in the same step.
   **Effort: ~1 evening. Impact: medium-high; this is the canonical
   way to win Google Events.**
3. **Cross-post to Perfect Duluth Day, Visit Duluth, and AllEvents.in
   manually.** Each accepts free event submissions. PDD is the single
   highest-leverage local board for Duluth MTB visibility. **Effort:
   ~10 minutes per event. Impact: medium, immediate.**

Do **not** burn time on Facebook Events API integration. It's been
effectively closed to third parties since ~2018 and Meta has no plans
to reopen it. If the team has a Facebook Page, the workflow is manual
event creation on facebook.com plus OG tags for nice link previews —
nothing more.

---

## Reality check on SPA + GitHub Pages

### What our stack can do for events SEO

- Static HTML in `public/index.html` is ingested on Googlebot's first
  crawl wave. JSON-LD placed there is reliably indexed.
- Per-route content rendered by React (via `react-helmet-async`) is
  ingested on the second wave when Web Rendering Service runs, often
  days later.
- We can produce as many static HTML files at build time as we want.
  GitHub Pages serves them happily; React Router never needs to see
  them.

### What our stack can NOT do

- No SSR, no edge functions, no custom HTTP headers, no on-demand
  rendering. **Prerender.io is therefore off the table** — its model
  needs an upstream proxy that detects bot user-agents and rewrites
  the response. GitHub Pages won't let us insert that hop. Some teams
  work around this with Cloudflare in front of Pages, but that's
  out of scope.
- We can't issue real 301 redirects, so any URL we publish is forever.
- We can't run Node at request time. Anything dynamic happens either
  in the browser or at build time.

### What "build time" means for us

The repo already has a CI workflow that runs on push to `main` and
deploys the `build/` dir to `gh-pages`. We can do absolutely anything
inside that build step: fetch from Firebase, generate HTML files, mutate
`build/sitemap.xml`, etc. That's the lever. CI is free for public
repos, and Firebase Admin SDK reads of `/events` are free (Realtime
Database free tier covers more than 50 reads per build).

### The Googlebot + JS reality, current as of 2025-2026

- Googlebot **does** render JavaScript and **does** see JSON-LD
  injected by `react-helmet-async`. It works. There's no mystery.
- Reliability is the issue. Martin Splitt has said publicly: "Even
  though Googlebot can render JavaScript, we don't want to rely on
  that." Onely's 2023 study found Googlebot failed to render key
  content on ~15% of client-side sites. JSON-LD that arrives only
  after a Firebase round-trip is exactly the case Splitt warns about
  — the data may resolve after WRS finishes.
- For events specifically, Google's events feature is competitive
  enough (Bandsintown, Eventbrite, Ticketmaster, Songkick all push
  rich `Event` markup) that "indexed eventually" is functionally
  equivalent to "not indexed." Static HTML wins.
- **Conclusion**: don't trust the React render path for `Event`
  JSON-LD. Bake it in at build time.

---

## Google Events

### Current status (2025-2026)

Google Search has a dedicated **Events experience** — the "Events" tab
in Search and a horizontal Events carousel that appears under certain
queries (e.g. `[city] [activity] this weekend`). It's been live since
2017, expanded to Maps, and has had multiple eligibility tweaks.

Notable recent changes:

- **June 2025**: Google removed the dedicated documentation section
  for online-only event properties. Online events without a physical
  component are no longer eligible for the events experience. Lucky
  for us — every Scrambled Legs ride has a physical trailhead.
- **November 2025**: Google announced deprecation of seven other
  structured data types starting January 2026, but `Event` is
  explicitly NOT on that list. Events are sticking around.
- The Events feature still does **not** require ticketing/paid events
  — free local meetups are eligible, provided they're "bookable to
  the general public."

### Eligibility requirements (must-have)

From [Google's Event structured data docs](https://developers.google.com/search/docs/appearance/structured-data/event):

- Events must be **bookable to the general public**. Membership-only
  or invitation-only events are ineligible.
- Events must take place at a **physical location** (post-June-2025).
- Spectator events whose primary participants and audience are minors
  on school premises are ineligible.

Scrambled Legs rides pass all three.

### Required `Event` JSON-LD properties

Per Google's docs, exactly these four are required:

- `name`
- `startDate` (ISO 8601 with offset)
- `location` (a `Place` with `address` + `name`)
- `location.address` (a `PostalAddress` with at least street/city/region)

Validation will fail without all four. Everything else below is
recommended.

### Recommended `Event` properties (Google specifically lists these)

- `description`
- `endDate`
- `eventStatus` (e.g. `https://schema.org/EventScheduled`)
- `eventAttendanceMode` (use `OfflineEventAttendanceMode` for our rides)
- `image` (1:1, 4:3, 16:9 — Google specifically wants three ratios)
- `location.name`
- `offers` (with `price`, `priceCurrency`, `availability`, `url`,
  `validFrom`)
- `organizer`
- `performer`
- `previousStartDate` (only when an event was rescheduled)

`isAccessibleForFree: true` is honored and useful for free events.

### Where to put the JSON-LD

Two complementary places. Both, ideally:

#### Option A — Homepage `<head>`, multiple events as an array

Put a `<script type="application/ld+json">` in `public/index.html`
(rendered at build time) containing an array of the next N upcoming
events. This:

- Lives in the static HTML, so first-wave crawl picks it up.
- Doesn't require per-event URLs to exist.
- Risks: Google may not show the rich result without a per-event
  landing URL to link to. The `url` property of each `Event` should
  point at `/events/{id}` — which means we still want those pages
  to exist. Without them, Google may follow the URL, get the SPA
  shell, and downgrade trust.

#### Option B — Per-event pages at `/events/{id}` with their own JSON-LD

The canonical, "Google really likes this" placement. Every event
gets its own crawlable HTML file with title, description, OG image,
and a single `Event` JSON-LD payload describing that event.

Because we're a SPA on GH Pages, the only way to make per-event
pages real-HTML-not-just-React is **build-time prerender**.

**Recommendation**: do BOTH. Homepage carousel JSON-LD covers the
"casual crawl of the homepage" case. Per-event pages cover the
"Google opens the canonical link to confirm" case.

### Build-time prerender approach

Here's the realistic pipeline:

1. CI checks out the repo and installs deps (already happens).
2. **New step**: a Node script runs `firebase-admin` against the
   Realtime DB, reads `/events`, filters to `unlocked: true` and
   `start > now`, and writes one HTML file per event into
   `build/events/{id}/index.html`. Each file extends a template
   with the right `<title>`, meta description, OG tags, and
   `Event` JSON-LD inlined.
3. Same script regenerates `build/sitemap.xml` to include each
   `/events/{id}` URL with a fresh `lastmod`.
4. Same script (or a sibling) writes a JSON-LD array into a
   placeholder span in `build/index.html` so the homepage `<head>`
   has the next 3-5 events too.
5. The existing `npm run build` step continues — CRA writes the
   SPA into `build/`, and our prerendered event pages sit alongside
   it. CRA's `index.html` is still the SPA shell; our event HTML
   files are static.
6. Deploy to `gh-pages` as usual.

A subtle point: the SPA's client-side routing assumes any path
without a real file falls through to `index.html` (the standard
GH-Pages-SPA hack). With our prerendered files in place, GH Pages
serves the prerendered HTML directly when a crawler hits
`/events/{id}/`, but humans navigating client-side via React Router
get the React-rendered version. We need both routes to look correct
to humans, so the React `EventPage` component must render the same
content the prerender script bakes in. The prerender script just has
the data ahead of the JS bundle.

### Build-time prerender is realistic for our scale

- ~30-50 events per year. Even with year-over-year accumulation,
  we're talking <500 prerendered files. Trivial.
- Firebase Admin SDK + Realtime DB read of all `/events`: <1s.
- Total CI overhead: estimated 5-15 seconds added to a build that
  currently takes 1-2 minutes.
- Failure mode: if Firebase is unreachable from CI, the script
  should `exit 0` with a warning and let the build proceed without
  prerendered event pages. The site keeps working; we just don't
  index that day's new event until the next build.

### Sitemap: combined or separate?

Google does **not** require a separate "events sitemap." There is no
official `<event:event>` sitemap extension (unlike News, Image, and
Video sitemaps). All event URLs go in the regular `sitemap.xml`. With
~50 events/year we are nowhere near the 50,000-URL split point that
would force a sitemap index.

Recommend: one `sitemap.xml`, regenerated on every build, covering
static routes + every upcoming/recent event URL.

---

## Facebook Events

### Hard truth, current as of 2026

You **cannot** programmatically create Facebook Events from a third-
party site. Meta locked this down years ago and has shown zero
appetite to reopen it. The remaining `pages_manage_events` scope on
the Graph API is, in practice, only granted to first-party Page
admins through Page-tied integrations (e.g. Eventbrite's official
import); new third-party apps don't get approved. Multiple
plugin/dev communities have given up — see the historical thread
at [The Events Calendar's "Important Facebook API Changes" post](https://theeventscalendar.com/blog/news/important-facebook-api-changes/).

Meta's [Content Library API](https://developers.facebook.com/docs/content-library-and-api/content-library-api/guides/fb-events/)
exposes some Facebook event data for academic researchers, but it's
read-only and gated behind an institutional review process. Useless
for us.

### What does work

- **A Facebook Page can create events manually** through facebook.com.
  Five clicks, one image upload, takes ~2 minutes per event. If the
  team has a Page, this is the path.
- Facebook **does scrape Open Graph** when our event URLs are pasted
  into Facebook posts, Messenger, comments, etc. Tags it understands:
  `og:type=event`, `og:title`, `og:description`, `og:image`,
  `og:url`, plus event-specific `event:start_time`, `event:end_time`,
  `event:location:latitude`, `event:location:longitude`. These do not
  create a Facebook Event object — they just produce a richer link
  preview card.
- When Facebook caches the preview wrong (it will, eventually), the
  fix is the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  → Scrape Again.

### Recommendation for Scrambled Legs

- **If the team has a Facebook Page**: an admin manually creates each
  event on the Page. No code involvement. Tag the canonical site URL
  in the event description so traffic flows back. Optional: post the
  `/events/{id}` link in the event body so the OG card shows.
- **If the team does not have a Page**: don't create one for SEO
  alone. The cost (a person to keep posting) outweighs the benefit
  for a 30-event-a-year hobby team. Focus on Google Events and PDD
  instead.
- Either way: include `og:type=event` and the event:* meta tags on
  per-event pages. Free win for link previews when riders share to
  group chats.

> **Open question for the user**: does the team already have a
> Facebook Page? If yes, who admins it? If we can hand them a copy-
> paste workflow (date, time, location, description, banner image)
> they can post to FB in 30 seconds per event.

---

## Other aggregators

| Aggregator | Free? | Programmatic? | Indexed by Google? | Verdict |
|---|---|---|---|---|
| **Perfect Duluth Day events** | Yes | No (web form, also `calendar@perfectduluthday.com` email) | Yes — high local authority | **Do this.** Single best Duluth-specific board. |
| **Visit Duluth events** | Yes | No (web form, ~7 business day review) | Yes — strong domain | **Do this for big events** (race day, season opener). Skip for weekly Wednesday rolls. |
| **Duluth News Tribune calendar** | Yes | No (web submission) | Yes | Worth it for the seasonal big-three (kickoff, fundraiser, season-end). Skip weeklies. |
| **Duluth Reader calendar** | Yes | No (web form) | Yes — niche | Same as Tribune. Niche audience matches us well. |
| **AllEvents.in** | Yes (post free events for free) | Yes — public API at `developer.allevents.in` | Yes (own domain ranks; pages get indexed) | **Worth a try** for the volume play. They re-syndicate to other aggregators. API supports posting events for affiliates. |
| **Eventbrite** | Free for free events; Bending Spoons just acquired (Mar 2026) so terms may tighten | Yes (Eventbrite API) | Yes — extremely strong domain | **Worth it for races** (paid registration, anyway). Don't double-list weekly rolls. |
| **Meetup** | Pro plan ~$20/mo to host; free to attend | API exists but write access requires Pro | Yes | **Skip**. Too much for a hobby team; Strava + the website do this job. |
| **Strava Club Events** | Yes (need a club) | Read-only API; no event-create endpoint | Strava club pages occasionally rank | **Yes manually** — the team probably already has riders on Strava. Cross-post each ride. ~30s per event. |
| **Trailforks events** | Yes | Limited API | Yes within MTB community | **Worth a one-time setup** if a Trailforks club already exists for the region. Niche but on-topic. |
| **AllTrails** | No event support | n/a | n/a | Skip — AllTrails is trails, not events. |
| **Bandsintown** | Music-only | Music-only | n/a | Skip. Not a fit. |
| **COGGS calendar** | Yes if affiliated | No (likely email) | Yes — strong local authority | **Yes** if the team is affiliated. Even a one-time "we ride the COGGS trails" link is a relevance signal. Ask. |
| **Google Business Profile events** | Free, requires verified GBP | n/a | Surfaces in Maps | Skip — covered in `SEO.md`. Hobby teams without storefronts get rejected. |
| **Spirit Mountain / Ski Hut / Continental Ski & Bike** | Most have community boards | Manual | Local | Worth asking the shops to mention us / cross-post. |

The pragmatic short list:

- **Always**: PDD (every event), AllEvents.in (every event), Strava
  Club (every event, manual).
- **Sometimes**: Visit Duluth, DNT, Reader, COGGS — for the bigger
  events only.
- **Never**: Meetup, AllTrails, Bandsintown, GBP events.

---

## Schema mapping (Firebase event → JSON-LD)

This maps every field in our Realtime DB schema (`/events/{id}`) to
the Google `Event` JSON-LD property it should populate.

| Firebase field | JSON-LD property | Notes |
|---|---|---|
| `name` | `name` | Direct. |
| `description` | `description` | Strip control chars; truncate to ~5000 if huge. |
| `start` (unix ms) | `startDate` | Convert to ISO 8601 with `-05:00` (Duluth Central Time, with `-06:00` for CDT — use `Intl` or `luxon`). |
| `start + durationMinutes` | `endDate` | Computed. |
| `startLoc.label` | `location.name` | Used by Google Events to display the venue. |
| `startLoc.lat` / `lng` | `location.geo.latitude` / `longitude` | Recommended; Google uses these to attach Map pins. |
| `startLoc.label` (parsed) | `location.address` | We don't store a full street/city/state. **We need to either**: (a) reverse-geocode lat/lng at build time and cache, or (b) hand-fill canonical addresses for the ~5 trailheads we use. Option (b) is easier. |
| `bannerUrl` | `image` | Google wants 3 ratios (1:1, 4:3, 16:9). We only have one. Send a single URL — Google accepts a string, not just an array. Long-term: ImageUpload generates 3 crops. |
| `rideLeader.name` | `performer.name` | Use `Person` type, not `SportsTeam` here — performer is the leader. |
| `rideLeader.photoUrl` | `performer.image` | Optional. |
| (constant) | `organizer` | Always Scrambled Legs. Hardcoded `SportsOrganization`. |
| `routeUrl` | `subjectOf.url` or skip | Strava route link — there's no perfect schema slot. Could use `additionalProperty`. Skip in v1. |
| `tags` | (none) | No mapping. Skip. |
| `unlocked` | controls inclusion | If `false`, do not emit JSON-LD or prerender a page. |
| `difficulty` / `difficultyLabel` | `description` (concat) | Append "Pace: race / casual / trail work" to the description text. No native schema slot. |
| (constant) | `eventStatus` | Default `https://schema.org/EventScheduled`. Change to `EventCancelled` / `EventPostponed` if we add a status field later. |
| (constant) | `eventAttendanceMode` | `https://schema.org/OfflineEventAttendanceMode`. |
| (constant) | `isAccessibleForFree` | `true`. |
| (constant) | `offers` | `price: "0"`, `priceCurrency: "USD"`, `availability: InStock`, `url: <event canonical URL>`, `validFrom: <createdAt as ISO>`. Keep this even though it's free; Google rewards explicit free pricing. |

**Trailhead address book** (hand-curated, since we don't store full
addresses on the event itself):

```js
const TRAILHEAD_ADDRESSES = {
  'lester-park': {
    streetAddress: '5300 Lester River Rd',
    addressLocality: 'Duluth',
    addressRegion: 'MN',
    postalCode: '55804',
    addressCountry: 'US',
  },
  'hartley': {
    streetAddress: '3001 Woodland Ave',
    addressLocality: 'Duluth',
    addressRegion: 'MN',
    postalCode: '55803',
    addressCountry: 'US',
  },
  'piedmont': {
    streetAddress: '3000 Hutchinson Rd',
    addressLocality: 'Duluth',
    addressRegion: 'MN',
    postalCode: '55811',
    addressCountry: 'US',
  },
  'mission-creek': {
    streetAddress: '7702 W Skyline Pkwy',
    addressLocality: 'Duluth',
    addressRegion: 'MN',
    postalCode: '55810',
    addressCountry: 'US',
  },
  'chester-bowl': {
    streetAddress: '1801 E Skyline Pkwy',
    addressLocality: 'Duluth',
    addressRegion: 'MN',
    postalCode: '55812',
    addressCountry: 'US',
  },
};
```

The prerender script picks the closest trailhead by lat/lng (haversine,
~10 lines) and looks up the canonical address. If nothing matches
within ~2km, fall back to a generic "Duluth, MN" address.

---

## Concrete deliverables

### Example `Event` JSON-LD (full, validated)

For "Lester Park Wednesday Roll", a real event from the calendar
mockup. This is what the prerender script should output, fully
populated:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Lester Park Wednesday Roll",
  "description": "Casual social pace, ~12 miles. Regroup at every fork. All paces welcome. Helmets and good vibes required. Pace: casual.",
  "startDate": "2026-05-06T17:45:00-05:00",
  "endDate": "2026-05-06T19:45:00-05:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "isAccessibleForFree": true,
  "location": {
    "@type": "Place",
    "name": "Lester Park Trailhead",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5300 Lester River Rd",
      "addressLocality": "Duluth",
      "addressRegion": "MN",
      "postalCode": "55804",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 46.8508,
      "longitude": -92.0035
    }
  },
  "image": [
    "https://thescrambledlegs.com/events/lester-wnr-1x1.jpg",
    "https://thescrambledlegs.com/events/lester-wnr-4x3.jpg",
    "https://thescrambledlegs.com/events/lester-wnr-16x9.jpg"
  ],
  "organizer": {
    "@type": "SportsOrganization",
    "name": "Scrambled Legs",
    "url": "https://thescrambledlegs.com/"
  },
  "performer": {
    "@type": "Person",
    "name": "Reece Z.",
    "image": "https://firebasestorage.googleapis.com/v0/b/fundraiser-f0831.appspot.com/.../leader.jpg"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://thescrambledlegs.com/events/-NkAbCdEfGhIjKlMn",
    "validFrom": "2026-04-15T00:00:00-05:00"
  }
}
</script>
```

Validate against the [Rich Results Test](https://search.google.com/test/rich-results)
before merging the prerender script.

### Prerender script skeleton

CommonJS (matches the rest of `functions/`), depends only on
`firebase-admin` (already an indirect dep — they just need to install
it for CI). Drop at repo root as `scripts/prerender-events.js`.

```js
// scripts/prerender-events.js
//
// Reads /events from Firebase RTDB, prerenders one HTML file per
// upcoming unlocked event into build/events/{id}/index.html, and
// regenerates build/sitemap.xml.
//
// Run after CRA's `npm run build`. CI step:
//   - npm run build
//   - node scripts/prerender-events.js
//
// Env required:
//   FIREBASE_DATABASE_URL  e.g. https://fundraiser-f0831-default-rtdb.firebaseio.com
//   FIREBASE_SERVICE_ACCOUNT  JSON of a service account key (CI secret)
//
// On any error, exit 0 with a warning so the build still ships.

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const SITE_URL = 'https://thescrambledlegs.com';
const BUILD_DIR = path.join(__dirname, '..', 'build');
const EVENTS_DIR = path.join(BUILD_DIR, 'events');

const TRAILHEAD_ADDRESSES = require('./trailhead-addresses.json');

function escHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function tzOffset(ms) {
  // Duluth is America/Chicago. CDT (-05:00) Mar-Nov, CST (-06:00) Nov-Mar.
  // Quick & dirty; for production use luxon.
  const d = new Date(ms);
  const m = d.getUTCMonth();
  return (m >= 2 && m < 11) ? '-05:00' : '-06:00';
}

function isoLocal(ms) {
  const d = new Date(ms);
  const off = tzOffset(ms);
  // Build YYYY-MM-DDTHH:mm:ss in the local Chicago wall-clock.
  // Easiest: use Intl with timeZone: America/Chicago.
  const fmt = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'America/Chicago',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  });
  const parts = fmt.formatToParts(d).reduce((a, p) => {
    a[p.type] = p.value; return a;
  }, {});
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${off}`;
}

function nearestTrailhead(lat, lng) {
  let best = null, bestD = Infinity;
  for (const [k, v] of Object.entries(TRAILHEAD_ADDRESSES)) {
    const d = Math.hypot(lat - v.lat, lng - v.lng);
    if (d < bestD) { bestD = d; best = k; }
  }
  return bestD < 0.05 ? TRAILHEAD_ADDRESSES[best] : null;
}

function buildEventJsonLd(ev) {
  const startMs = ev.start;
  const endMs = startMs + (ev.durationMinutes || 120) * 60_000;
  const trailhead = nearestTrailhead(ev.startLoc.lat, ev.startLoc.lng) || {
    streetAddress: ev.startLoc.label || 'Trailhead',
    addressLocality: 'Duluth',
    addressRegion: 'MN',
    postalCode: '',
    addressCountry: 'US',
  };
  const eventUrl = `${SITE_URL}/events/${ev.id}`;
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: ev.name,
    description: (ev.description || '').slice(0, 5000),
    startDate: isoLocal(startMs),
    endDate: isoLocal(endMs),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: true,
    location: {
      '@type': 'Place',
      name: ev.startLoc.label || 'Trailhead',
      address: { '@type': 'PostalAddress', ...trailhead },
      geo: ev.startLoc.lat && ev.startLoc.lng ? {
        '@type': 'GeoCoordinates',
        latitude: ev.startLoc.lat,
        longitude: ev.startLoc.lng,
      } : undefined,
    },
    image: ev.bannerUrl ? [ev.bannerUrl] : [`${SITE_URL}/og-image.png`],
    organizer: {
      '@type': 'SportsOrganization',
      name: 'Scrambled Legs',
      url: SITE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: eventUrl,
      validFrom: new Date(ev.createdAt || startMs - 7 * 86400_000).toISOString(),
    },
  };
  if (ev.rideLeader && ev.rideLeader.name) {
    obj.performer = {
      '@type': 'Person',
      name: ev.rideLeader.name,
      ...(ev.rideLeader.photoUrl ? { image: ev.rideLeader.photoUrl } : {}),
    };
  }
  return obj;
}

function buildEventHtml(ev) {
  const url = `${SITE_URL}/events/${ev.id}`;
  const ld = buildEventJsonLd(ev);
  const dateStr = new Date(ev.start).toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'long', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
  const title = `${ev.name} — ${dateStr} — Scrambled Legs`;
  const desc = (ev.description || '').replace(/\s+/g, ' ').slice(0, 155);
  const ogImg = ev.bannerUrl || `${SITE_URL}/og-image.png`;

  // Read the CRA-built index.html as a template; mutate <head> + body.
  const tpl = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8');
  const headInjection = `
    <title>${escHtml(title)}</title>
    <meta name="description" content="${escHtml(desc)}">
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="event">
    <meta property="og:title" content="${escHtml(title)}">
    <meta property="og:description" content="${escHtml(desc)}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${ogImg}">
    <meta property="event:start_time" content="${ld.startDate}">
    <meta property="event:end_time" content="${ld.endDate}">
    <meta property="event:location:latitude" content="${ev.startLoc.lat || ''}">
    <meta property="event:location:longitude" content="${ev.startLoc.lng || ''}">
    <meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">${JSON.stringify(ld)}</script>
  `;
  // Insert just before </head>. The CRA template has minimal head, so
  // we strip its <title> so ours wins.
  return tpl
    .replace(/<title>[^<]*<\/title>/, '')
    .replace('</head>', `${headInjection}</head>`);
}

async function main() {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
    const snap = await admin.database().ref('events').once('value');
    const all = [];
    snap.forEach((c) => all.push({ id: c.key, ...c.val() }));
    const now = Date.now();
    // Index unlocked events from 30 days ago (keep recent past for a bit) onward.
    const events = all.filter((e) =>
      e.unlocked && e.start && e.start > now - 30 * 86400_000
    );

    if (!fs.existsSync(EVENTS_DIR)) fs.mkdirSync(EVENTS_DIR, { recursive: true });

    for (const ev of events) {
      const dir = path.join(EVENTS_DIR, ev.id);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), buildEventHtml(ev));
    }

    // Regenerate sitemap.xml
    const today = new Date().toISOString().slice(0, 10);
    const staticUrls = [
      { loc: `${SITE_URL}/`,             priority: '1.0', cf: 'weekly' },
      { loc: `${SITE_URL}/lester-park`,  priority: '0.8', cf: 'daily' },
    ];
    const eventUrls = events
      .filter((e) => e.start > now)
      .map((e) => ({
        loc: `${SITE_URL}/events/${e.id}`,
        lastmod: new Date(e.updatedAt || e.createdAt || now).toISOString().slice(0, 10),
        priority: '0.7',
        cf: 'weekly',
      }));
    const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.cf}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
${eventUrls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.cf}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`;
    fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), sm);

    // Inject homepage carousel JSON-LD (next 5 events)
    const homepageLd = events
      .filter((e) => e.start > now)
      .sort((a, b) => a.start - b.start)
      .slice(0, 5)
      .map(buildEventJsonLd);
    if (homepageLd.length) {
      const homepagePath = path.join(BUILD_DIR, 'index.html');
      let html = fs.readFileSync(homepagePath, 'utf8');
      const tag = `<script type="application/ld+json" data-events>${JSON.stringify(homepageLd)}</script>`;
      html = html.replace('</head>', `${tag}</head>`);
      fs.writeFileSync(homepagePath, html);
    }

    console.log(`prerender-events: wrote ${events.length} event pages, sitemap, homepage LD.`);
    process.exit(0);
  } catch (err) {
    console.warn(`prerender-events: SKIPPED due to error: ${err.message}`);
    process.exit(0); // never fail the build
  }
}

main();
```

Companion file `scripts/trailhead-addresses.json`:

```json
{
  "lester": { "lat": 46.8508, "lng": -92.0035, "streetAddress": "5300 Lester River Rd", "addressLocality": "Duluth", "addressRegion": "MN", "postalCode": "55804", "addressCountry": "US" },
  "hartley": { "lat": 46.8262, "lng": -92.0918, "streetAddress": "3001 Woodland Ave", "addressLocality": "Duluth", "addressRegion": "MN", "postalCode": "55803", "addressCountry": "US" },
  "piedmont": { "lat": 46.7751, "lng": -92.1474, "streetAddress": "3000 Hutchinson Rd", "addressLocality": "Duluth", "addressRegion": "MN", "postalCode": "55811", "addressCountry": "US" },
  "mission-creek": { "lat": 46.7094, "lng": -92.2391, "streetAddress": "7702 W Skyline Pkwy", "addressLocality": "Duluth", "addressRegion": "MN", "postalCode": "55810", "addressCountry": "US" },
  "chester": { "lat": 46.8131, "lng": -92.0890, "streetAddress": "1801 E Skyline Pkwy", "addressLocality": "Duluth", "addressRegion": "MN", "postalCode": "55812", "addressCountry": "US" }
}
```

### GitHub Action step

In `.github/workflows/deploy.yml`, between the existing build step
and the deploy step:

```yaml
      - name: Build
        run: npm run build
        env:
          CI: false # CRA: don't fail on warnings

      - name: Prerender event pages
        run: node scripts/prerender-events.js
        env:
          FIREBASE_DATABASE_URL: ${{ secrets.FIREBASE_DATABASE_URL }}
          FIREBASE_SERVICE_ACCOUNT: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

`FIREBASE_SERVICE_ACCOUNT`: a service account key JSON with read
access to the `events` path (or default project credentials —
Realtime DB rules currently allow public reads of events anyway).
Generate at Firebase Console → Project Settings → Service Accounts
→ Generate new private key. Paste the entire JSON into the GH
secret.

`FIREBASE_DATABASE_URL`: copy from Firebase Console → Realtime
Database. e.g. `https://fundraiser-f0831-default-rtdb.firebaseio.com`.

Add to repo's package.json devDependencies:

```
"firebase-admin": "^12.0.0"
```

(~30MB install in CI; trivial.)

### sitemap.xml additions

After prerender runs, `build/sitemap.xml` should look like:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://thescrambledlegs.com/</loc><lastmod>2026-04-28</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://thescrambledlegs.com/lester-park</loc><lastmod>2026-04-28</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>
  <url><loc>https://thescrambledlegs.com/events/-NkAbCdEfGhIjKlMn</loc><lastmod>2026-04-28</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>https://thescrambledlegs.com/events/-NkOpQrStUvWxYzAb</loc><lastmod>2026-04-25</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <!-- one <url> per upcoming event, auto-generated -->
</urlset>
```

After deploy, ping Search Console: it'll re-fetch the sitemap on
its next crawl. Optionally add an IndexNow ping in the same script
to nudge Bing/Yandex.

---

## Decision tree

**If you do ONE thing:** add the homepage carousel JSON-LD via the
prerender script. Skip per-event prerendering. Skip per-event React
routes. The team gets indexed for "scrambled legs duluth events"
queries because the homepage carries the data, and people who land
on the homepage via search see the calendar widget directly. ~3
hours of work, mostly first-time GH Action wiring.

**If you do TWO things:** add the homepage JSON-LD AND the per-event
prerendered HTML pages. This is the canonical Google-Events winning
configuration. Sitemap auto-generated. ~1 evening total. Now individual
event URLs can rank for `[trail name] [day] duluth` queries — which is
where the long tail lives.

**If you go full-monty:** all of the above PLUS:
- Manual cross-post each event to Perfect Duluth Day, AllEvents.in,
  Strava Club. Build a 5-minute checklist for whoever's posting.
- If team has a FB Page, manual FB Event creation, with the
  `og:type=event` tags ensuring nice link previews if anyone shares
  the canonical URL.
- For 2-3 marquee events per year (kickoff, fundraiser, season-end),
  also submit to Visit Duluth, Duluth News Tribune, Duluth Reader.
- IndexNow ping after every deploy.
- Quarterly: review which event URLs got search impressions in GSC,
  prune from sitemap any cancelled/historical events older than 60
  days.

---

## Cost

| Item | Cost |
|---|---|
| Firebase Realtime DB reads in CI (~50 reads per build) | $0 (free tier) |
| Firebase Admin SDK service account | $0 |
| GitHub Actions minutes | $0 (public repo) |
| Cloud Functions | $0 — not used for this. Existing Blaze plan unaffected. |
| Eventbrite paid features | $0 — we only use the free tier (free events listed for free) |
| AllEvents.in posting | $0 (free) |
| PDD / Visit Duluth / DNT / Reader submissions | $0 |
| Strava Club | $0 |
| Domain / hosting | $0 — no change |
| **Total ongoing cost** | **$0** |
| One-time human time (initial implementation) | ~1 evening |
| Per-event human time (cross-posting full-monty) | ~10 minutes |

Nothing here unlocks billing on the Blaze project. Cloud Functions
and FCM use is unchanged.

---

## Honest verdict on realistic SEO impact

This is a hobby team posting 30-50 events per year in a small
metro area. Set expectations:

- **Brand-name event queries** ("scrambled legs lester ride"): should
  rank within 2-4 weeks of the first prerendered event going live.
  That's the realistic win.
- **Local long-tail event queries** ("wednesday night mountain bike
  ride duluth"): 3-6 months minimum. Possibly never if COGGS or
  Visit Duluth start running their own indexed event lists with more
  domain authority.
- **Google Events carousel** (the horizontal "Events" widget in
  Search): shows up sometimes for events with strong markup + high
  domain authority + clear local intent in the query. We will
  occasionally land on it for super-niche queries. We will not
  reliably appear for "events near me" — that surface is dominated
  by Eventbrite/Bandsintown/Songkick.
- **Maps integration**: events with valid `Place` markup sometimes
  show up as "Upcoming events at this location" pins on Maps.
  Marginal benefit; nice when it happens.
- **Actual new riders showing up because of this**: probably 1-2
  per season, conservatively. The bigger ROI is for existing riders
  who Google "scrambled legs wednesday" and need details fast.

This is worth doing because **it's free, it's idempotent with the
admin event-editor flow we already have, and it benefits the
calendar widget UX directly** (per-event canonical URLs are
already part of the calendar mockup design). SEO is the bonus, not
the goal.

Rich results are NEVER guaranteed. Schema gets you eligible. Google
decides whether to show.

---

## Open questions for the user

1. **Does the team have a Facebook Page?** If yes, who admins it,
   and are they willing to do 2 minutes of manual event creation per
   ride?
2. **Is the team OK with auto-prerender at build time?** Adds a
   `firebase-admin` dev dependency (~30MB), adds 5-15s to CI builds,
   requires one Firebase service account JSON stored as a CI secret.
3. **For Eventbrite / AllEvents.in / Strava cross-posting: full
   automation, or "ride-leader does it manually as part of publishing
   the event"?** Full automation is ~1 day of work per platform via
   their APIs; the manual cross-post checklist is a 5-minute README.
4. **Are we OK letting recently-past events stay in the sitemap for
   30 days?** The script keeps them so historical link clicks still
   land somewhere. Alternative: 410 / drop immediately after.
5. **Do we want the React `EventPage` component to exist before the
   prerender script ships?** If yes, it must render the same content
   the prerender bakes — so Googlebot's second-wave render matches.
   If no, the React route falls back to home and only the
   prerendered HTML is canonical. Either works; both should render
   identically eventually.
6. **Trailhead address book — verify the addresses are actually
   correct.** The lat/lngs in the script were eyeballed from the
   calendar mockup and the canonical addresses were guessed from
   public sources. The user should sanity-check before shipping.
7. **Three-ratio image generation (1:1, 4:3, 16:9)** for the
   `image` array on `Event` markup — worth the work? Currently
   ImageUpload only stores one URL. Punt to v2; one image still
   passes Google's validator.
8. **COGGS affiliation status?** If we're an affiliated team, ask
   them to add us to their site for backlinks.
9. **Is the team willing to be listed at a city-level address
   without a real venue?** Required for Google Events eligibility.

---

## Sources

- [Google Search Central — Event structured data](https://developers.google.com/search/docs/appearance/structured-data/event)
- [Google — June 2025 Event Structured Data Update](https://omrdigital.com/event-structured-data-update-june-2025-google-changes-what-you-need-to-know/)
- [Search Engine Journal — Google Updates Event Structured Data Requirements](https://www.searchenginejournal.com/google-updates-event-structured-data-requirements/394370/)
- [Search Engine Land — No-JavaScript fallbacks in 2026](https://searchengineland.com/no-javascript-fallbacks-474605)
- [Botify — JavaScript Rendering Q&A With Martin Splitt](https://www.botify.com/blog/martin-splitt-javascript-rendering)
- [Stackmatix — SPA Structured Data Implementation](https://www.stackmatix.com/blog/spa-structured-data-implementation)
- [Google — Manage your sitemaps with sitemap index files](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org — Event](https://schema.org/Event)
- [Schema.org — Place](https://schema.org/Place)
- [Schema.org — PostalAddress](https://schema.org/PostalAddress)
- [Schema.org — Offer](https://schema.org/Offer)
- [Open Graph protocol](https://ogp.me/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Meta Graph API — Event reference](https://developers.facebook.com/docs/graph-api/reference/event/)
- [Meta Content Library — Facebook events](https://developers.facebook.com/docs/content-library-and-api/content-library-api/guides/fb-events/)
- [The Events Calendar — Important Facebook API Changes](https://theeventscalendar.com/blog/news/important-facebook-api-changes/)
- [TechCrunch — Meta cuts off third-party access to Facebook Groups (Feb 2024)](https://techcrunch.com/2024/02/05/meta-cuts-off-third-party-access-to-facebook-groups-leaving-developers-and-customers-in-disarray/)
- [Strava API v3 reference — clubs/group_events](https://developers.strava.com/docs/reference/)
- [Strava Community Hub — APIs for Clubs and Club Events](https://communityhub.strava.com/t5/developer-discussions/apis-for-clubs-and-specifically-club-events/m-p/8247)
- [AllEvents.in — Publish events (free)](https://allevents.in/pages/publish-events)
- [AllEvents.in — Developer API](https://developer.allevents.in/)
- [Perfect Duluth Day — Events](https://www.perfectduluthday.com/duluth-events/)
- [Visit Duluth — Events](https://visitduluth.com/events/)
- [Duluth News Tribune — Calendar of Events](https://www.duluthnewstribune.com/calendar)
- [Duluth Reader — Events Calendar](https://duluthreader.com/events/calendar?city=duluth)
- [Vike — Pre-rendering on GitHub Pages](https://vike.dev/pre-rendering)
- [Onely 2023 — JavaScript SEO study (cited via Search Engine Journal)](https://www.searchenginejournal.com/googles-john-mueller-martin-splitt-answer-javascript-seo-questions/355468/)

_End of plan. Implementation lives in a follow-up PR; do not touch
`src/`, `public/`, or `.github/` from this document._
