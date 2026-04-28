# Scrambled Legs — Project Status

Last updated: 2026-04-28

---

## 🚀 Running the app locally

```bash
cd C:/Users/Reece/Development/Source/sl
npm install          # one-time, or after pulling changes
npm start            # dev server → http://localhost:3000 (hot reload)
npm run build        # production build into build/
```

Push to `main` → CI auto-deploys to https://thescrambledlegs.com/ via GitHub Actions.

---

## ✅ Completed workstreams

| Item | Status | Notes |
|---|---|---|
| Repo cleanup pass | ✅ Done | Removed dead PWA/notification stubs, 230 unused packages, bundle −7 kB |
| Admin panel — Phase 1 (events CRUD) | ✅ Built | Password gate, event create/edit/delete, map pin picker, tag chips, image upload, ride leader avatar upload |
| Admin panel — Phase 2 (notifications) | ✅ Built | Compose form, live send progress, history, per-device delivery view, FAB + bottom sheet + service worker |
| SEO quick wins #1 + #2 | ✅ Shipped | Meta tags, Open Graph, JSON-LD SportsOrganization, robots.txt, sitemap.xml |
| Per-event unlock feature | ✅ Mockup + admin | Admin toggle per event; unlocked cards tappable in Coming Up |

---

## 🔄 Active workstreams

### 📅 Calendar widget — mockup complete, PENDING port to real React

**Mockup file:** `calendar-mockup.html` — double-click to open. Open it on mobile (resize browser to 375px or open on phone) as well.

**Confirmed design decisions:**
- Widget placement: ABOVE newsletter on home page
- Central event card: banner OR map, ride leader overlay (crown + shimmer), weather panel (live Open-Meteo, ≤10 days out), countdown (CT timezone anchored), actions grid (Directions / Route / Calendar / Share), hot dog CTA
- Coming Up: 4 locked cards by default, "Show more" button, locked tap → toast
- Unlocked cards: visually distinct (yolk tint + 🔓 icon), tap → full detail sheet
- Past rides: collapsible accordion, last 10 only
- URL routing: any event deep-linkable via `#/events/{id}` (mockup) → `/events/:id` (production)

**Kudos / hot dog CTA behavior (confirmed):**
- Idle: "MASH ME" emergency-button style, glowing pulsing, 🌭 + count visible
- Press 1: MASH ME transitions, +N centered, challenge below (same overlay)
- Challenge font: dynamic sizing via `setSub()` — always single line, never ellipsis
- Press 1-25: hand-tuned escalation ladder (GO GO GO → DOG MODE: ACTIVE)
- Press 26+: unified long-haul pool, message refreshes every 2.5s
- Vignette: starts press 10, peaks at 25
- Shockwave: page text warps per click (transform only, no letter-spacing)
- Farm animals: mix in at press 25 (15% fire 🔥, then farm)
- Chaos emojis: at press 50 (random emoji pool)
- Diverse cyclists/people: at press 100 (25% of spawns)
- Post-save burn: 4s taunting flash with 4 pulses
- Effects persist through burn; snap back to idle on PHASE C

**Pending decisions before React port:**
1. Global persistent kudos count? (confirm yes/no — currently local-only in mockup)
2. RSVPs — add "I'm in / can't make it" toggle? (leaning no, ask user)
3. Nav variant pick (V1 / V2 / V3 / V4 in `nav-mockup.html`) — STILL NEEDED

---

### 🔔 Push notifications — awaiting Firebase manual setup

**All 9 decisions locked.** Code built (Phase 1 + 2), QA clean.

**Manual setup remaining:**
1. Firebase Console → upgrade to Blaze plan (credit card, ~$0/month expected)
2. Cloud Messaging → Web Push certificates → Generate key pair → `.env.local`: `REACT_APP_FIREBASE_VAPID_KEY=...`
3. `cd functions && npm install`
4. `firebase deploy --only functions,database`

**Docs:** `NOTIFICATIONS.md` (full plan + all locked decisions)

---

### 🌐 Strava integration — research delivered

**Doc:** `STRAVA.md` (~640 lines)

**What's available as club admin:**
- Club profile with cover photo, member count, sport type
- Member list with full names + profile avatars ✅
- Club activity feed (last 200 rides — name, distance, elevation, time, sport type) ✅
- **Missing:** timestamps, athlete IDs, map polylines (Strava stripped these from the club endpoint)

**Hard blocks:**
- Strava Nov 2024 ToS: displaying one user's activity to other users on 3rd-party surfaces is in the gray zone
- No leaderboard endpoint (must be computed by polling over time)
- Webhooks don't cover club activity — polling only

**Architecture:** Firebase Cloud Function proxy (stores OAuth tokens, refreshes every 6h, caches responses in RTDB). Client never sees credentials.

**Worth doing:** Yes, especially for a `/crew` or `/strava` page showing club header, member grid with avatars, and aggregate stats.

---

## 📋 Pending TODO (awaiting user decision)

| # | What | Blocking what |
|---|---|---|
| 1 | **Pick nav variant** (V1/V2/V3/V4 in `nav-mockup.html`) | Porting nav to real App.js |
| 2 | **Firebase Blaze upgrade** + VAPID key generation | Push notifications going live |
| 3 | **Calendar: global kudos or local-only?** | React port of calendar widget |
| 4 | **Calendar: RSVPs (I'm in / can't make it)?** | React port |
| 5 | **Calendar: sign-off on current mockup** | React port |
| 6 | **Strava: authorize app + share club ID** | Strava page implementation |
| 7 | **Do you have a Facebook Page for the team?** | Facebook Events cross-posting plan |
| 8 | **DNS TXT record at domain registrar** | Google Search Console Domain property verification |

---

## 🐛 Known issues / backlog

- **AdminPage `hotdogCounter` data wire broken** — admin listens to `hotdogCounter` but public hot dog counter writes to `users/{username}`. The "Reset Counter" button does nothing visible. Either fix wiring (sum across users) or remove the section.
- **Newsletter form duplicated** in `Home.js` and `LesterPark.js` — extract to `<NewsletterForm />` component when next touched.
- **Footer version drift** — `Footer.js` hardcodes `APP_VERSION = "0.3.0"`, `package.json` says `0.1.0`. Pick one source of truth.
- **package.json / package-lock.json** show as modified in git status from cleanup work — needs commit.
- **FAB `bottom: 22px`** may collide with iOS home indicator on newer iPhones.
- **`/notifications` rules use `.read: true`** — no Firebase Auth in client, so reads would be blocked otherwise. Tokens live separately. Acceptable interim posture.

---

## 📁 Reference docs

| Doc | Purpose |
|---|---|
| `NOTIFICATIONS.md` | Push notification feature plan (all 9 decisions locked) |
| `SEO.md` | SEO research + ~95 keyword phrases |
| `EVENTS_INDEXING.md` | Google Events / Facebook / aggregator strategy + prerender plan |
| `EVENTS_FIREBASE.md` | Firebase data layer plan — stale-while-revalidate cache, reactive kudos state machine |
| `STRAVA.md` | Strava API club integration research |

---

## 🗺️ Routes

| Route | Component | Status |
|---|---|---|
| `/` | Home | Live — logo, subtitle, newsletter. Calendar widget PENDING |
| `/hotdog-counter` | HotDogCounter | Live |
| `/lester-park` | LesterPark | Live — trail conditions + TrailBot iframe |
| `/admin1` | AdminPage | Built, uncommitted — events CRUD + notifications admin |
| `/events/:eventId` | Planned | URL routing wired in mockup; React route not yet created |
| `/strava` or `/crew` | Planned | After Strava auth |

---

## Firebase paths

| Path | Use |
|---|---|
| `events/{pushKey}` | Calendar events (planned) |
| `users/{username}` | Hot dog counter per-user |
| `hotdogLogs/{pushKey}` | Global hot dog activity |
| `newsletterRegistrants/{pushKey}` | Newsletter signups |
| `fcmTokens/{sha256}` | Push notification tokens (planned) |
| `notifications/{pushKey}` | Push notification history (planned) |
| `hotdogCounter` | ORPHANED — nothing writes to it |
