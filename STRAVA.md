# Strava API Integration Plan — Scrambled Legs MTB Team Site

> Generated: 2026-04-28  
> Stack: React 18 SPA · GitHub Pages (static) · Firebase Realtime Database · Firebase Cloud Functions (Blaze)

---

## TL;DR

**Can we do it?** Mostly yes — with important caveats.

The Strava API is free to use and the club admin can authorize a single OAuth token that a Firebase Cloud Function uses as a proxy. The club profile, member list with photos, and a recent activity feed are all accessible. However, Strava's **November 2024 API agreement update** introduces a hard legal rule: *third-party apps may only display a user's activity data to that specific user.* Displaying a public feed of club members' rides on a public website is arguably in violation of this rule unless you treat it carefully (aggregated stats only, or members explicitly opt in to the public site).

**How hard?** Medium. The OAuth dance and token storage in Firebase is the trickiest part. The React page itself is straightforward once the Cloud Function proxy exists. Estimated effort: 1–2 focused weekends.

**What does it look like?** A `/strava` page showing the club header, recent rides (first name + last initial per Strava's privacy design), aggregate totals, and a "Join our Strava club" CTA. A leaderboard built from aggregated club activity data is doable but requires server-side accumulation since the API omits timestamps and unique IDs from the club activity feed.

**Hard blocks to know upfront:**
1. The club activities endpoint returns `firstname` + last initial only — no full last name, no athlete ID, no activity ID, no timestamp. This is intentional by Strava.
2. Strava does not expose a leaderboard endpoint via the API — it must be computed from the activity feed.
3. The November 2024 ToS restricts public display of other users' activity data. A public feed of member rides is a legal gray area for this use case.
4. Webhooks cover only the *authorizing athlete's* activity events, not the whole club — so polling is required for club data freshness.

---

## Data Availability Table

| Endpoint | Key Fields Returned | Who Can Access | Privacy / Restrictions |
|---|---|---|---|
| `GET /clubs/{id}` | `id`, `name`, `description`, `profile` (avatar URL), `cover_photo` (URL), `sport_type`, `city`, `state`, `country`, `member_count`, `owner_id`, `admin`, `owner`, `membership`, `private`, `verified` | Any authenticated club member | Public clubs: no restriction. Private clubs: member token required |
| `GET /clubs/{id}/members` | `firstname`, `lastname` (full), `profile_medium` (avatar URL), `city`, `state`, `country`, `sex`, `resource_state` | Members only; Enhanced Privacy Mode respected | Members with Enhanced Privacy enabled may be excluded from response |
| `GET /clubs/{id}/activities` | `athlete` (firstname + last initial only — no athlete ID), `name` (ride title), `distance`, `moving_time`, `elapsed_time`, `total_elevation_gain`, `type`, `sport_type`, `workout_type` | Club members only | **No timestamp. No activity ID. No polyline/map. No full last name.** Max 200 activities returned total. "Only Me" activities are filtered out. |
| `GET /clubs/{id}/admins` | Same as members response | Club members; write scope required for admin actions | Admin/owner fields on the club object indicate your status |
| `GET /athlete/clubs` | Club summaries for the authed athlete | Authenticated athlete only | Used to confirm club membership and retrieve club ID |
| Strava Leaderboard (web only) | Weekly/monthly distance, elevation, moving time per member | Strava app only | **No API endpoint.** Leaderboard data is not exposed in v3. Must be computed manually from the activity feed. |
| Club Events / Announcements | None | N/A | **No API endpoint.** Strava club events (group rides, etc.) are not exposed via v3 API as of 2026. |
| Segment / Map Data | `map.summary_polyline` on individual activities | Requires individual athlete auth, not club endpoint | Not available on the club activity feed at all |

### Notable Fields Missing from Club Activities (Intentional by Strava)

- `start_date` / `start_date_local` — timestamp is absent. This is deliberate.
- `id` — no unique activity ID. Deduplication requires hashing `(firstname, last_initial, name, distance, moving_time)`.
- `athlete.id` — athlete identifier is stripped. You get a display string only.
- `map` / `summary_polyline` — no route geometry.
- Full last name — you get `"Jane D."` not `"Jane Doe"`.

---

## Architecture Diagram

```
                           ┌─────────────────────────────────┐
                           │   thescrambledlegs.com (GH Pages) │
                           │   React SPA — /strava page        │
                           └──────────────┬──────────────────┘
                                          │  HTTPS fetch
                                          ▼
                    ┌─────────────────────────────────────────┐
                    │       Firebase Cloud Functions           │
                    │                                         │
                    │  [HTTP-callable]  stravaProxy()         │
                    │    1. Read cached data from RTDB        │
                    │    2. If stale (> 30 min): call Strava  │
                    │    3. Refresh token if needed           │
                    │    4. Write fresh data to RTDB          │
                    │    5. Return data to client             │
                    │                                         │
                    │  [Scheduled — every 30 min]             │
                    │  stravaRefreshCache()                   │
                    │    Proactively refreshes club data      │
                    │    so the HTTP function is fast         │
                    └───────────┬─────────────────────────────┘
                                │  Strava API calls (bearer token)
                                ▼
                    ┌───────────────────────────┐
                    │     Strava API v3          │
                    │  GET /clubs/{id}           │
                    │  GET /clubs/{id}/members   │
                    │  GET /clubs/{id}/activities│
                    └───────────────────────────┘
                                │
                    ┌───────────▼───────────────┐
                    │  Firebase RTDB             │
                    │  /strava/club              │
                    │  /strava/members           │
                    │  /strava/activities        │
                    │  /strava/lastFetched       │
                    │  /strava/tokens  (private) │
                    └───────────────────────────┘

Token storage:
  Firebase Functions environment config OR
  Google Cloud Secret Manager (recommended for Blaze plan)
  Keys: STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET,
        STRAVA_ACCESS_TOKEN, STRAVA_REFRESH_TOKEN,
        STRAVA_TOKEN_EXPIRES_AT
```

---

## OAuth Scopes Required

For this use case (read club data as admin, no writing):

```
read,profile:read_all,activity:read
```

- `read` — public club profile, member count, cover photo
- `profile:read_all` — full member profiles including photos (vs. summary only)
- `activity:read` — club activity feed (respects "Everyone" and "Followers" visibility)

`activity:read_all` is NOT needed and should not be requested — it adds access to private "Only Me" activities which is unnecessary and increases privacy risk.

---

## Token / Auth Flow Walk-Through

### One-Time Admin Authorization (done manually by the site owner)

```
Step 1 — Build the authorization URL:
  https://www.strava.com/oauth/authorize
    ?client_id=YOUR_CLIENT_ID
    &redirect_uri=https://your-firebase-function-url/stravaCallback
    (or any URL you control — even localhost during setup)
    &response_type=code
    &approval_prompt=force
    &scope=read,profile:read_all,activity:read

Step 2 — Visit the URL in a browser while logged in as the club admin.
         Strava shows the permission screen. Click "Authorize."

Step 3 — Strava redirects to redirect_uri?code=XXXX&scope=...
         Note the code= value.

Step 4 — Exchange the code for tokens (one curl command):
  POST https://www.strava.com/oauth/token
  Body:
    client_id=YOUR_CLIENT_ID
    client_secret=YOUR_CLIENT_SECRET
    code=XXXX
    grant_type=authorization_code

  Response:
    {
      "token_type": "Bearer",
      "expires_at": 1234567890,      // Unix timestamp
      "expires_in": 21600,           // 6 hours in seconds
      "refresh_token": "LONG_STRING",
      "access_token": "SHORT_STRING",
      "athlete": { ... }
    }

Step 5 — Store refresh_token, access_token, expires_at in
         Firebase Functions config or Secret Manager.
         These are the permanent credentials. Never commit to git.
```

### Token Refresh (automated, every call)

```javascript
// Pseudocode for Cloud Function token management
async function getValidAccessToken() {
  const config = await getStoredTokens(); // from Firestore or Secret Manager
  const nowSecs = Math.floor(Date.now() / 1000);

  if (config.expires_at > nowSecs + 300) {
    // Token still valid (with 5-min buffer)
    return config.access_token;
  }

  // Refresh
  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: config.refresh_token,
    }),
  });
  const data = await response.json();

  // IMPORTANT: Strava rotates the refresh token on each refresh.
  // Save both the new access_token AND the new refresh_token.
  await saveTokens({
    access_token: data.access_token,
    refresh_token: data.refresh_token,  // new value
    expires_at: data.expires_at,
  });

  return data.access_token;
}
```

Key points:
- Access tokens expire every **6 hours** (`expires_in: 21600`)
- Refresh tokens are **rotated** — after each refresh, the old refresh token is invalidated. Always store the new one returned in the response.
- Strava issues a new access token only when the current one expires within 1 hour. If you refresh too early, Strava may return the existing token unchanged. The safe pattern is: check `expires_at`, refresh only if within 5–10 minutes of expiry or already expired.

---

## Rate Limits

| Window | Limit |
|---|---|
| Per 15 minutes | 200 requests total; 100 for non-upload endpoints |
| Per day | 2,000 requests total; 1,000 for non-upload endpoints |

- Resets at :00, :15, :30, :45 of each hour (UTC) for 15-minute windows
- Resets at midnight UTC for daily window
- Exceeding returns `429 Too Many Requests`
- Tier: **free for all registered apps.** No paid API tier exists. Rate limits can be increased by contacting Strava for high-volume apps, but the defaults are ample for hobbyist use.

### At 50 visitors/day with Firebase caching:

The Cloud Function makes at most 3 Strava API calls per cache refresh cycle:
1. `GET /clubs/{id}` — 1 call
2. `GET /clubs/{id}/members` — 1–2 calls (paginated at 30/page, ~2 pages for a typical club)
3. `GET /clubs/{id}/activities` — 1 call

Running a scheduled refresh every 30 minutes = 48 cycles/day × 3 calls = ~144 API calls/day.  
**This is 14% of the daily limit.** Rate limits are a complete non-issue with caching.

---

## Proposed `/strava` Page Design

### Section 1 — Club Header

```
┌──────────────────────────────────────────────────────────────┐
│  [cover_photo image — full width]                            │
│                                                              │
│  [club profile avatar]  Scrambled Legs                       │
│                         Mountain Biking · 47 members         │
│                         Somewhere, CO                        │
│                         "We shred trails and eat hot dogs."  │
│                                                              │
│  [Join Our Strava Club →]  (links to strava.com/clubs/{id}) │
└──────────────────────────────────────────────────────────────┘
```

Field mapping:
- Cover photo: `club.cover_photo` (full) or `club.cover_photo_small`
- Avatar: `club.profile_medium` or `club.profile`
- Name: `club.name`
- Sport type: `club.sport_type`
- Member count: `club.member_count`
- Location: `club.city`, `club.state`
- Description: `club.description`

### Section 2 — Recent Club Rides

```
┌──────────────────────────────────────────────────────┐
│  Recent Club Rides                          [30]     │
├──────────────────────────────────────────────────────┤
│  [avatar]  Jane D.          Evening Shred            │
│            🏔 1,200 ft   📍 18.4 mi   ⏱ 1h 42m     │
│            Mountain Bike Ride                        │
├──────────────────────────────────────────────────────┤
│  [avatar]  Mike S.          Tuesday Hammerfest       │
│            🏔 450 ft    📍 32.1 mi   ⏱ 1h 15m      │
│            Road Ride                                 │
└──────────────────────────────────────────────────────┘
```

Field mapping from `GET /clubs/{id}/activities`:
- Athlete display: `activity.athlete.firstname` + `activity.athlete.lastname` (last initial only per API design)
- Athlete avatar: Not available from club activities. If members have authorized the site's app, you could cross-reference. Otherwise use a generic avatar or the member list profile photos.
- Ride name: `activity.name`
- Distance: `activity.distance` (meters → convert to miles or km)
- Elevation: `activity.total_elevation_gain` (meters)
- Moving time: `activity.moving_time` (seconds → format as h:mm)
- Sport type: `activity.sport_type` (Ride, MountainBikeRide, GravelRide, etc.)
- **No timestamp available** — cannot show "3 days ago" without accumulating data over time

### Section 3 — Aggregate Stats (computed from activity feed)

Since the feed has no timestamps, aggregate stats must be computed from the Cloud Function's accumulated snapshot. On each poll, new activities (detected by comparing against the previous snapshot using a hash) are added to a running total in RTDB.

```
┌─────────────┬─────────────┬─────────────┐
│ Club Miles  │ Total Rides │ Total Elev  │
│  4,821 mi   │    342      │  284,000 ft │
└─────────────┴─────────────┴─────────────┘
```

Note: these totals will be approximate/cumulative from whenever you start running the integration.

### Section 4 — Member Grid

```
┌────────────────────────────────────────────┐
│  The Crew                       47 riders  │
│                                            │
│  [photo]  [photo]  [photo]  [photo]  ...   │
│  Jane D.  Mike S.  Reece Z. Sarah T.       │
└────────────────────────────────────────────┘
```

Field mapping from `GET /clubs/{id}/members`:
- Avatar: `member.profile_medium` (62x62 px) or `member.profile` (full)
- Name: `member.firstname` + `member.lastname` (FULL name available here, unlike activities)
- Location: `member.city`, `member.state`

### Section 5 — CTA Footer

```
  Ride with us → [Join on Strava]
  https://www.strava.com/clubs/scrambled-legs  (use vanity URL or club ID)
```

---

## Privacy Considerations

### Strava's November 2024 API Agreement — Critical Issue

Effective November 11, 2024, Strava's updated API terms state:

> "Third-party apps may now only display a user's Strava activity data to that specific user."

This rule was designed to prevent apps from building public activity feeds or heatmaps using other people's data without their knowledge. For the Scrambled Legs site, the relevant questions are:

1. **Is a public club activity feed allowed?** This is a gray area. The rule targets apps where users are unaware their data is being shown to others. A club-specific site where members knowingly join the Strava club could be argued as an implicit opt-in context. However, the strict reading of the terms would prohibit showing `"Jane D. rode 18 miles"` on a public page that non-Strava users can see.

2. **Safer approach — aggregate only.** Displaying club-level totals (`"The club rode 4,821 miles this year"`) without attributing specific rides to specific people is much safer under the new terms.

3. **Safest approach — member opt-in.** Add a notice in the Strava club description or a separate team communication: "Your rides may appear on thescrambledlegs.com. To opt out, set rides to 'Only You' visibility." Activities with "Only Me" visibility are already filtered by the API.

4. **GDPR angle.** For a hobbyist site with a US-based audience this is low risk, but best practice is: don't display full names + activity details without consent. The API's own privacy design (last initial only, no athlete ID) signals Strava's intent to limit individual identification.

### What the API Already Protects

- Activities set to "Only Me" are filtered out by the API automatically
- Athletes with Enhanced Privacy Mode enabled may not appear in member lists
- The club activities feed uses `firstname` + last initial, not full names
- No GPS coordinates or route polylines are available from the club endpoint

---

## Implementation Checklist

### Phase 1 — Strava App Registration

- [ ] Go to https://www.strava.com/settings/api
- [ ] Create a new application:
  - **Application Name:** Scrambled Legs (or "SL Site")
  - **Category:** choose "Other"
  - **Club:** optionally link your club here
  - **Website:** `https://thescrambledlegs.com`
  - **Authorization Callback Domain:** your Firebase Functions domain (e.g., `us-central1-YOUR-PROJECT.cloudfunctions.net`)
- [ ] Note your **Client ID** and **Client Secret**
- [ ] Your Strava app icon should not look like Strava's own branding (per ToS)

### Phase 2 — Find Your Club ID

Option A: Go to your club page on Strava in a browser. The URL will be `https://www.strava.com/clubs/NNNN` or `https://www.strava.com/clubs/vanity-slug`. If it's a number, that's your club ID. If it's a vanity slug, make one API call to `GET /athlete/clubs` with your access token to see the numeric ID.

Option B: Use the Strava API playground at `https://developers.strava.com/playground` to call `GET /athlete/clubs` after authorizing.

### Phase 3 — One-Time Admin OAuth Authorization

- [ ] Build the auth URL (see OAuth section above) with `redirect_uri` pointing to a temporary local server or a simple Cloud Function endpoint
- [ ] Visit the URL as the club admin Strava account
- [ ] Authorize and capture the `?code=` parameter from the redirect
- [ ] Exchange the code for tokens via POST (curl or Postman)
- [ ] Save `access_token`, `refresh_token`, and `expires_at`

### Phase 4 — Store Tokens Securely

Recommended: **Google Cloud Secret Manager** (available on Blaze plan, already in use for Firebase Functions)

```bash
# Set secrets via Firebase CLI
firebase functions:secrets:set STRAVA_CLIENT_ID
firebase functions:secrets:set STRAVA_CLIENT_SECRET
firebase functions:secrets:set STRAVA_REFRESH_TOKEN
```

For `access_token` and `expires_at` (which change frequently), store in a **private Firestore document** (e.g., `/private/stravaTokens`) with appropriate Firestore security rules that deny all client reads. Only the Cloud Function reads/writes this document.

### Phase 5 — Write the Proxy Cloud Function

Two functions needed:

**`stravaFetchAndCache` (HTTP-callable or Scheduled)**
1. Read `/strava/lastFetched` from RTDB
2. If less than 30 minutes ago, return cached data
3. Otherwise: call `getValidAccessToken()` → refresh if needed
4. Call `GET /clubs/{id}`, `GET /clubs/{id}/members`, `GET /clubs/{id}/activities`
5. Write results to RTDB `/strava/club`, `/strava/members`, `/strava/activities`
6. Update `/strava/lastFetched` to `Date.now()`

**`stravaScheduledRefresh` (Scheduled, every 30 minutes)**
```javascript
exports.stravaScheduledRefresh = functions.pubsub
  .schedule('every 30 minutes')
  .onRun(async () => {
    await fetchAndCacheStravaData();
  });
```

This keeps the cache warm so the HTTP function returns instantly.

### Phase 6 — React Page (`/src/pages/StravaPage.js`)

- [ ] Add route in `App.js`: `<Route path="/strava" element={<StravaPage />} />`
- [ ] On mount, call the `stravaProxy` Cloud Function (or read RTDB directly if data is public)
- [ ] Render club header, activity feed, member grid using cached data
- [ ] Add loading skeleton and error state
- [ ] Add "Join our Strava Club" CTA button linking to `https://www.strava.com/clubs/{id}`

### Phase 7 — Optional Strava Webhook

Strava webhooks notify you when the **authorizing athlete** (the admin) creates or updates an activity. This is useful for keeping the admin's own rides fresh in near-real-time, but it does NOT cover other club members' activities. For the club feed, scheduled polling remains necessary.

To set up a webhook:
```bash
POST https://www.strava.com/api/v3/push_subscriptions
  client_id=YOUR_CLIENT_ID
  client_secret=YOUR_CLIENT_SECRET
  callback_url=https://YOUR-FUNCTION-URL/stravaWebhook
  verify_token=ANY_SECRET_STRING_YOU_CHOOSE
```

Your Cloud Function must handle Strava's validation GET request within 2 seconds and echo back `hub.challenge`.

---

## Data Freshness Strategy

| Layer | Mechanism | Freshness |
|---|---|---|
| Strava API | Source of truth | Real-time |
| Firebase RTDB | Cache populated by Cloud Function | Up to 30 min stale |
| React client | Reads RTDB on page load | Instant (from cache) |

Recommended poll interval: **30 minutes.** This gives ~144 API calls/day, well within limits, and means the page is never more than 30 minutes behind real activity.

If you want near-real-time for the admin's own rides: add a webhook (Phase 7). For all other members, 30-minute polling is the only option.

---

## Architecture Notes: Why Not Client-Side?

Options considered:

| Option | Verdict | Reason |
|---|---|---|
| Client fetches Strava directly with stored token | No | Exposes client credentials. Any visitor can extract and abuse the token. Even read-only tokens could be used to access the admin's full activity history. |
| Client reads from Firebase RTDB (public node) | Yes, for display | Safe. The Cloud Function writes sanitized/cached data. Clients read a public RTDB node. No Strava credentials involved. |
| Server-side proxy (Cloud Function) | Yes, for fetching | Cloud Function holds credentials, performs token refresh, enforces rate-limit logic. Clients never talk to Strava directly. |

The hybrid approach — Cloud Function fetches + caches into RTDB, client reads RTDB — is ideal for this stack.

---

## Open Questions for the Site Owner

1. **Do you have your club ID?** Check your club URL at strava.com/clubs/. If it's a vanity URL (like `/clubs/scrambled-legs`), you'll need to make one API call to find the numeric ID.

2. **Are you comfortable with member first names + last initials appearing on the public site?** The API only returns last initials for the activity feed, but the member list endpoint returns full last names. Do you want to display the full member grid with full names, or use initials throughout?

3. **Do you want to notify club members that their rides may appear on the site?** Best practice: post a note in the Strava club description or at a team meeting. Members who want privacy can set their activities to "Only Me" and they'll automatically be excluded.

4. **Aggregate stats vs. individual attribution?** Given the November 2024 API ToS concerns, do you prefer a "club totals only" display (safer) or are you comfortable with `"Jane D. rode 18 miles"` style individual activity cards?

5. **Do you want a leaderboard?** Building one requires the Cloud Function to accumulate activity data over time (since the API provides no timestamps). It will only show data from the date you deploy the integration onward. Is that acceptable?

6. **Is the admin's Strava account the same as the site owner account?** The OAuth authorization must be performed by whoever is logged in to Strava as the club admin. If that's someone other than the developer, you'll need to coordinate the one-time auth step.

7. **Webhook setup?** Do you want near-real-time updates for the admin's own rides, or is 30-minute polling sufficient for everything?

---

## Sources

- [Strava API v3 Reference](https://developers.strava.com/docs/reference/)
- [Strava API Authentication (OAuth2)](https://developers.strava.com/docs/authentication/)
- [Strava API Rate Limits](https://developers.strava.com/docs/rate-limits/)
- [Strava Webhook Events API](https://developers.strava.com/docs/webhooks/)
- [Strava API Getting Started Guide](https://developers.strava.com/docs/getting-started/)
- [Strava V3 API Changelog](https://developers.strava.com/docs/changelog/)
- [Strava Clubs V3 API (legacy reference)](https://strava.github.io/api/v3/clubs/)
- [Strava API v3.1 — ClubsApi.md (GitHub)](https://github.com/sshevlyagin/strava-api-v3.1/blob/master/docs/ClubsApi.md)
- [Updates to Strava's API Agreement (November 2024)](https://press.strava.com/articles/updates-to-stravas-api-agreement)
- [API Agreement Update & How Data Appears on 3rd Party Apps — Strava Support](https://support.strava.com/hc/en-us/articles/31798729397773-API-Agreement-Update-How-Data-Appears-on-3rd-Party-Apps)
- [Strava's Changes to Kill Off Apps — DC Rainmaker Analysis (2024)](https://www.dcrainmaker.com/2024/11/stravas-changes-to-kill-off-apps.html)
- [Club API Feedback and Improvements — Strava Community Hub](https://communityhub.strava.com/developers-api-7/club-api-feedback-and-improvements-2736)
- [API Club Activities Not Showing Activity Date — Community Discussion](https://communityhub.strava.com/developers-api-7/api-club-activities-not-showing-activity-date-1777)
- [Club Activities — Suggestion/Request Thread (Google Groups)](https://groups.google.com/g/strava-api/c/zJLM6VKKIuc)
- [StravaClubTracker — Open Source Club Dashboard Example](https://github.com/picasticks/StravaClubTracker)
- [Strava's "Security" Changes Wall Out Third-Party Apps — Marathon Handbook](https://marathonhandbook.com/strava-api-changes/)
- [Strava API — Postman Documentation](https://www.postman.com/api-evangelist/strava/documentation/32kgkzg/strava-api-v3)
