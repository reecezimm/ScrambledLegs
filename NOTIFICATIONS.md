# NOTIFICATIONS.md — Push Notifications Feature Plan

Last updated: 2026-04-28
Status: **all 9 decisions locked · implementation cleared to proceed (admin agent Phase 2)**

This is the canonical doc for the push-notifications feature build-out. Everything from the initial agent research through the latest UX decisions lives here. Update as we go.

---

## TL;DR

- **Stack:** Firebase Cloud Messaging (FCM) Web Push HTTP v1, Firebase Realtime Database for token storage and history, single Firebase Cloud Function (2nd gen) for the admin "send" action.
- **Detection:** We *can* tell whether a device has notifications enabled (`Notification.permission`), and whether iOS users have installed the PWA (`navigator.standalone`). We never re-prompt a granted user. We re-prompt every visit when in `default` state, with a 3-day cool-off after explicit dismissal.
- **Branded subscribe UX:** Floating call-to-action ("Join the Notification Club") that opens a fun, on-brand bottom sheet with platform-aware instructions.
- **Tracking:** Real-time delivery counter while sending; persistent history of every push (title/body/url, sent count, accepted count, failed count, opened count, per-device delivery records).
- **iOS reality:** Apple still requires PWA install on iPhone before push works. We can't change this; we communicate it well.

---

## Goal

Replace the scattered "did everyone see this?" comms (texts, Snapchat, Facebook, etc.) with a single push channel:

1. Visitors who land on the site are invited (insistently, but not obnoxiously) to subscribe.
2. Admin composes a notification manually whenever something needs to go out (ride change, weather call, beer plans).
3. Push lands on every subscriber's device — iPhone (via PWA install), Android, desktop.
4. Admin can come back later and see exactly what was sent, when, to how many devices, and how many people clicked through.

No automation. No cron jobs. No "auto-remind 24h before event." This is a **manual broadcast tool**.

---

## What we can and cannot detect about a device

| Signal | API | What it tells us |
|---|---|---|
| Notifications supported | `'Notification' in window` | Browser supports the Notification API at all |
| Push API supported | `'PushManager' in window` | Browser supports the Push API |
| Service worker supported | `'serviceWorker' in navigator` | Required for FCM web push |
| Permission state | `Notification.permission` | `'granted'` / `'denied'` / `'default'` |
| Running as installed PWA | `window.matchMedia('(display-mode: standalone)').matches` OR iOS-specific `window.navigator.standalone === true` | True if user opened from home screen icon |
| iOS device | `/iPad\|iPhone\|iPod/.test(navigator.userAgent) && !window.MSStream` | True for iOS Safari |
| Has FCM token | `getToken()` returns a string or null | Whether they're an active subscriber on this device |

**Combined into a clean state machine:**

```
unsupported   = !Notification || !ServiceWorker || !PushManager
ios           = /iPad|iPhone|iPod/.test(ua)
ios_installed = ios && (navigator.standalone === true)

state =
  unsupported                   → "unsupported"      (hide all UI, do nothing)
  ios && !ios_installed         → "ios_needs_install" (show install instructions only)
  Notification.permission==='granted' → "subscribed" (hide CTA, optionally show "🔔 ON" pill)
  Notification.permission==='denied'  → "blocked"   (show passive recover-instructions pill)
  Notification.permission==='default' → "askable"   (show subscribe CTA, can prompt)
```

This state determines what UI we show on every page load. We never "guess" — every check is live and accurate.

---

## Subscribe UX

### Where it lives

A **floating circular button** in the bottom-right corner of the viewport (above the bottom-tab nav if we end up using one). Yolk-yellow, with a 🔔 icon, gently pulsing the first 3 seconds after page load to draw the eye, then static. Above the kudos/share buttons in z-index but below modals.

**Why floating, not banner:** banners get scrolled past and forgotten on mobile. A persistent FAB is always visible without obstructing content. Plus it scales: when the user dismisses it, the FAB shrinks to a 32px peek so we still have a re-entry point if they change their mind.

### When it shows

| State | FAB visible? | Tap behavior |
|---|---|---|
| `subscribed` | No (or tiny "🔔 ON" pill, dismissible) | n/a |
| `askable` | Yes, full size | Open bottom sheet |
| `ios_needs_install` | Yes, full size with little "i" badge | Open bottom sheet (instruction-only) |
| `blocked` | Yes, but smaller, muted color | Open bottom sheet with re-enable steps |
| `unsupported` | No | n/a |
| `askable` + dismissed within last 3 days | Tiny 32px peek bottom-right | Tap → re-opens full FAB and bottom sheet |

### Bottom sheet — branded copy (LOCKED 2026-04-28)

> **🌭 Join the Notification Club**
>
> Group chats die. Facebook eats your soul. Just let us ping your phone when there's a ride. Or beer. Or moose-on-the-trail vibes. We'll only be annoying when it counts. Mostly.

Subhead-style instruction line follows ("Here's how:") then the platform-specific steps below.

### Platform-specific instructions inside the bottom sheet

Detect platform on render. Show the relevant block, hide the others. Each block is short — 2-4 lines max.

**iOS Safari (not installed):**
> 🍎 **On iPhone?** Apple makes us do this dance:
> 1. Tap ⬆ **Share** at the bottom of Safari
> 2. Tap ➕ **Add to Home Screen**
> 3. Open the egg from your home screen
> 4. Come back here and tap **Notify Me**
>
> *(Yes, it's silly. Worth it.)*

Use real iOS share-icon and plus-icon SVGs inline. Show a small annotated screenshot/illustration of the Safari toolbar with an arrow pointing at Share — we'll either embed an SVG mockup or one ~10KB PNG.

**iOS PWA (already installed):**
> 🍎 **You're in!** Tap **Notify Me** below. iPhone will ask once — tap Allow.

**Android Chrome / desktop / other:**
> 🌐 Tap **Notify Me** below. Your browser will pop a permission box — hit **Allow** and you're done.

**Already denied (`'denied'` state) — passive pill copy on every page load:**
> 🥚 **You blocked us. Wild.** Enjoy missing the rides, the beer calls, the moose alerts. *Tap to fix →*

Tapping opens a sheet with the recovery instructions. Same instructions, slightly less smug:
> Open the site permissions and flip notifications back to **Allow**:
> - **iPhone:** Settings → Notifications → Scrambled Legs → Allow
> - **Android Chrome:** Tap the lock icon in the URL bar → Permissions → Notifications → Allow
> - **Desktop Chrome:** Tap the lock icon in the URL bar → Site settings → Notifications → Allow

The bottom sheet has a primary button at the bottom labeled **"Notify Me"** (or **"Got it, take me there"** in iOS-not-installed state) and a "Maybe later" text link.

### Re-prompt strategy

The user said "be annoying — but only if not subscribed." Translating that into rules:

| Condition | What happens |
|---|---|
| State = `subscribed` | We never show anything. They're in. |
| State = `askable`, never dismissed | FAB is visible on every page load. Never auto-pops the bottom sheet — user must tap. |
| State = `askable`, dismissed bottom sheet without subscribing | Hide bottom sheet for 3 days; FAB shrinks to 32px peek. After 3 days, FAB returns to full size, with a slight "Hey, still in?" wiggle on first appearance after the cooldown. |
| State = `ios_needs_install`, never dismissed | FAB is visible on every page load. |
| State = `ios_needs_install`, dismissed | Same 3-day cooldown as `askable`. |
| State = `blocked` | Tiny passive pill shown ("Notifications are off — tap to fix"). No nag. |
| Hard "never ask me again" in bottom sheet | Set localStorage flag, hide FAB indefinitely on this device. Optional — probably skip for v1. |

We track all of this client-side in `localStorage`:
- `sl_notif_dismissed_until` — unix ms; show FAB peek instead of full when `now < this`
- `sl_notif_last_state_seen` — debug only
- `sl_notif_token_hash` — so we know which token belongs to this browser instance (helps with sign-out flow if we ever add one)

We do NOT track "have they ever been prompted" because it's irrelevant: `Notification.permission` is the source of truth at every page load.

---

## Send flow (admin)

### Compose form (in `/admin1` after password gate)

Single-screen form, mobile-friendly. Fields:

| Field | Required | Notes |
|---|---|---|
| Title | yes | Max ~50 chars (iOS truncates). Live char counter. |
| Body | yes | Max ~150 chars. Live char counter. Multi-line OK. |
| Click URL | optional, defaults to `https://thescrambledlegs.com/` | Dropdown of upcoming events auto-fills `/events/{id}`. Custom URL input below. |
| Tag | optional | Defaults to a random ID; admin can set a known tag if they want a re-send to *replace* a prior notification (e.g., "ride moved"). |
| Send to | radio | **"All subscribers"** (default) **or "Test → one device"**. Test mode reveals a dropdown listing every active subscriber from `/fcmTokens` with platform icon + first 8 chars of token hash + UA snippet. Picking one sends only to that token — perfect for end-to-end QA before a real broadcast. |

**No image attachment field.** Decision 2026-04-28: skip image uploads entirely. Every notification ships with a fixed icon: `https://thescrambledlegs.com/android-chrome-192x192.png` (the deployed favicon). The Cloud Function hardcodes this so the admin never has to think about it.

A live preview pane shows roughly what the notification will look like on iOS and Android, side by side. Static mock — won't be exact (OS controls colors/fonts) but close enough that the admin won't be surprised.

A confirm dialog before send: **"This will go out to N subscribers. Send?"** The N number reads live from `/fcmTokens` count.

### Cloud Function — `sendPush`

HTTPS callable function (not HTTP). The admin web client invokes it via the Firebase Functions SDK with `httpsCallable('sendPush')`. The function body:

```js
const ADMIN_PASSWORD = "OG scrambled crew";  // plain text per 2026-04-28 decision
const NOTIFICATION_ICON = "https://thescrambledlegs.com/android-chrome-192x192.png";

exports.sendPush = onCall(async (request) => {
  // 1. Verify password (plaintext compare, per locked decision)
  if (request.data.password !== ADMIN_PASSWORD) {
    throw new HttpsError('permission-denied', 'Bad password');
  }

  // 2. Read tokens — either all, or just the test target
  const snap = await admin.database().ref('fcmTokens').once('value');
  let entries = Object.entries(snap.val() || {});         // [[hash, {token, ...}], ...]
  if (request.data.testTokenHash) {
    entries = entries.filter(([hash]) => hash === request.data.testTokenHash);
    if (entries.length === 0) throw new HttpsError('not-found', 'Test token not found');
  }
  const tokens = entries.map(([_, v]) => v.token);

  // 3. Create a notification record with status: 'sending' so admin UI can subscribe live
  const notifRef = await admin.database().ref('notifications').push({
    title:       request.data.title,
    body:        request.data.body,
    icon:        NOTIFICATION_ICON,
    clickUrl:    request.data.clickUrl || 'https://thescrambledlegs.com/',
    tag:         request.data.tag || notifRef.key,
    sentAt:      admin.database.ServerValue.TIMESTAMP,
    sentBy:      'admin',
    recipients:  tokens.length,
    accepted:    0,
    failed:      0,
    opened:      0,
    isTest:      !!request.data.testTokenHash,
    status:      'sending',
  });
  const notifId = notifRef.key;

  // 4. Build message with notifId embedded so we can track opens
  const buildClickUrl = (base) => {
    const u = new URL(base);
    u.searchParams.set('n', notifId);
    return u.toString();
  };

  // 5. Use sendEachForMulticast — FCM batches, returns per-token results
  const message = {
    notification: { title: request.data.title, body: request.data.body },
    data: { clickUrl: buildClickUrl(request.data.clickUrl), notifId, tag: request.data.tag },
    webpush: {
      notification: { icon: NOTIFICATION_ICON },
      fcmOptions: { link: buildClickUrl(request.data.clickUrl) },
      headers: { Urgency: 'high' },
    },
    tokens,
  };
  const response = await admin.messaging().sendEachForMulticast(message);

  // 6. Process per-token results: write deliveries, prune dead tokens, update counters
  let accepted = 0, failed = 0;
  const updates = {};
  response.responses.forEach((res, i) => {
    const [hash, _] = entries[i];
    if (res.success) {
      accepted++;
      updates[`notifications/${notifId}/deliveries/${hash}`] = {
        result: 'success', sentAt: Date.now(), opened: false,
      };
    } else {
      failed++;
      updates[`notifications/${notifId}/deliveries/${hash}`] = {
        result: 'failure', errorCode: res.error?.code, sentAt: Date.now(),
      };
      // Prune dead tokens
      if (res.error?.code === 'messaging/registration-token-not-registered') {
        updates[`fcmTokens/${hash}`] = null;
      }
    }
  });
  updates[`notifications/${notifId}/accepted`] = accepted;
  updates[`notifications/${notifId}/failed`]   = failed;
  updates[`notifications/${notifId}/status`]   = 'sent';
  await admin.database().ref().update(updates);

  return { ok: true, notifId, accepted, failed };
});
```

This is the **real-time** part the user asked for: the admin UI subscribes to `/notifications/{notifId}` while the function is running, and watches `accepted` and `failed` tick up.

### What "real-time" looks like in the admin UI

After clicking send, the form swaps to a "sending..." state showing:

```
✉️  Sending to 47 devices...
✅  Accepted: 32     [progress bar]
❌  Failed: 1
🚀  Status: sending → done!
```

Each counter is wired to `onValue('notifications/{id}/accepted')` etc. We could go a step further and stream the final per-token results as they land (writing each result as it comes back from FCM rather than batching at the end), but `sendEachForMulticast` returns the full batch synchronously so the practical experience is: counters jump from 0 to final values within a couple seconds. Fine for a hobbyist tool. If we want true streaming we'd have to manually loop tokens and write per-token, which is more code for marginal UX gain.

---

## Tracking & history

### Firebase data model

```
/fcmTokens/{sha256OfToken}
  token:        "<actual FCM token string>"
  createdAt:    1714320000000
  lastSeenAt:   1714320000000
  userAgent:    "Mozilla/5.0 ..."
  platform:     "ios" | "android" | "desktop"
  isStandalone: true | false                 # iOS-only meaningful

/notifications/{pushKey}
  title:       "Wednesday roll moved!"
  body:        "Meeting at Hartley instead. Same time."
  image:       null | "https://..."
  clickUrl:    "https://thescrambledlegs.com/events/abc?n={pushKey}"
  tag:         "ride-2026-04-30"
  sentAt:      <unix ms>
  sentBy:      "admin"
  recipients:  47
  accepted:    32
  failed:      1
  opened:      8
  status:      "sending" | "sent" | "failed"

/notifications/{pushKey}/deliveries/{sha256OfToken}
  result:      "success" | "failure"
  errorCode:   string?               # only on failure
  sentAt:      <unix ms>
  opened:      false | true
  openedAt:    <unix ms>?
  platform:    "ios" | "android" | "desktop"   # denormalized at send time
```

### What we can measure

| Metric | Source | Reliable? |
|---|---|---|
| **Recipients** (devices we attempted to send to) | tokens.length at send time | Yes |
| **Accepted** (FCM accepted the token) | `sendEachForMulticast` per-token success | Yes |
| **Failed** (token rejected — usually expired) | per-token failure | Yes, with reason code |
| **Opened** (user clicked through to site) | URL `?n={notifId}` param + log endpoint | Yes |
| **Time to open** (latency from send → click) | `openedAt - sentAt` | Yes |
| **Per-device platform breakdown** | denormalized at send | Yes |

### What we **cannot** measure (and why)

| Metric | Why not |
|---|---|
| **Delivered to lock screen** | Web Push spec doesn't expose receipts. FCM "accepted" only means the FCM service accepted the token — not that the OS displayed it. |
| **Read but not clicked** | No API surface for "user saw the notification on lock screen and dismissed without tapping." |
| **Unsubscribe events** | We learn about unsubscribed tokens *after the fact* when the next send fails with `registration-token-not-registered`. There's no real-time webhook. |

We surface these limits transparently in the admin UI so the admin doesn't think failures = bad delivery.

### Open tracking — how it actually works

When the function builds the click URL, it appends `?n={notifId}` (and we also pass it through `data.notifId` for the SW). Two trigger points:

1. **Service worker `notificationclick`** — runs when the user taps the notification. We `fetch()` a tiny logging endpoint (`/logOpen` Cloud Function) before calling `clients.openWindow()`. This works in the SW context where regular Firebase SDK doesn't.

2. **Page load** — when the user lands on the URL with `?n={notifId}` present, we fire-and-forget a `fetch()` to the same `/logOpen` endpoint, then `history.replaceState()` to strip the param so it doesn't pollute their URL. This is the **belt-and-suspenders** in case the SW fetch fails (sometimes browsers throttle SW fetch, or the notification is opened in a way that doesn't reliably run the SW handler).

The `/logOpen` function is dead simple:

```js
exports.logOpen = onRequest({ cors: true }, async (req, res) => {
  const { notifId, tokenHash } = req.query;
  if (!notifId) return res.status(400).end();
  // Find the delivery if we have tokenHash; otherwise increment global counter
  const ref = admin.database().ref(`notifications/${notifId}`);
  if (tokenHash) {
    await ref.child(`deliveries/${tokenHash}`).update({ opened: true, openedAt: Date.now() });
  }
  await ref.child('opened').transaction(curr => (curr || 0) + 1);
  res.status(204).end();
});
```

Note: we send `tokenHash` from the SW (it has access to the active subscription) but the page-load fallback can't easily know which tokenHash *this* user is unless we read it from `localStorage` (which we already store as `sl_notif_token_hash`). So both paths can identify the device. If both fire, the transaction increments by 2 — small bug. Solution: also pass a one-time `openId` and dedupe. For v1, we accept the small over-count.

### Admin history view

Lives at `/admin1`, below the compose form. Default view: vertical list of past notifications **from the last 365 days**, newest first. Older entries stay in the database (we don't delete) but are filtered out of the default view via a `sentAt > Date.now() - 365*86400000` filter. If we ever want to view older we add a "show all" toggle later.

**List item:**
```
[Apr 29 · 5:42 PM]  Wednesday roll moved!
                    Meeting at Hartley instead. Same time.
                    47 sent · 46 accepted · 1 failed · 8 opened (17%)
                    [tap to expand]
```

**Expanded item** shows the full payload + per-device delivery list:
- Status of every device (✅ delivered / ❌ failed reason / 🔵 opened)
- Per-device row: token hash (first 8 chars), platform icon, sent timestamp, open timestamp if any
- Filter chips: "All / Opened / Failed"

What's actually exposed to the admin per device:
- Token hash (anonymous — opaque)
- Platform (`ios` / `android` / `desktop`)
- User agent string (for debugging)
- Sent/accepted/opened timestamps

What's **not** exposed: actual FCM token string (security — never display the raw token), no IP, no real identifying info. This is a hobbyist team site — we don't capture name/email at subscription time, so anonymity is the natural state.

Tap a device row → details popover with the full UA string and timestamps. That's it. No other "tracking."

---

## File map (when implementing)

| File | New / Edit | Purpose | Approx LOC |
|---|---|---|---|
| `public/firebase-messaging-sw.js` | **New** | SW: `onBackgroundMessage`, `notificationclick` handler, log-open fetch | ~60 |
| `public/manifest.json` | Edit | `display: standalone`, `start_url`, `id`, `scope` | ~5 changed |
| `public/index.html` | Edit | iOS meta tags (`apple-mobile-web-app-capable`, etc.) | ~3 |
| `src/services/firebase.js` | Edit | Export `messaging` instance | ~5 |
| `src/services/messaging.js` | **New** | `getSubscriptionState()`, `requestAndSubscribe()`, `unsubscribe()`, `setupForegroundHandler()`, token register/dedupe with hashing | ~120 |
| `src/services/openTracking.js` | **New** | Page-load `?n=` param logger + URL cleaner | ~25 |
| `src/components/NotificationFab.js` | **New** | Floating CTA + state machine + dismiss/cooldown logic | ~140 |
| `src/components/NotificationSheet.js` | **New** | Bottom sheet with branded copy + platform-specific instructions | ~180 |
| `src/components/NotificationOnPill.js` | **New** | Tiny passive "🔔 ON" indicator for subscribed users (dismissible) | ~40 |
| `src/components/NotificationBlockedPill.js` | **New** | Passive "blocked — tap to fix" pill | ~50 |
| `src/pages/AdminPage.js` | Edit | Compose form, live send progress, history list, expandable per-device delivery view | ~400 |
| `src/pages/Home.js` | Edit | Mount `NotificationFab` | ~5 |
| `functions/index.js` | **New** | `sendPush` callable + `logOpen` HTTP endpoint | ~120 |
| `functions/package.json` | **New** (auto via `firebase init`) | `firebase-admin`, `firebase-functions`, `bcryptjs` | n/a |
| `firebase.json` | New / edit | Functions, database, hosting config | ~15 |
| `database.rules.json` | **New** | Rules for `fcmTokens`, `notifications`, `pushLog` | ~40 |
| `.gitignore` | Edit | `functions/node_modules`, `functions/.env*` | ~3 |

**Total new code: roughly 1,200 lines.** Realistic implementation time: 4-6 hours of focused work.

---

## Manual setup the user does

### Firebase Console (one-time, ~5-7 minutes)
1. Upgrade project `fundraiser-f0831` to **Blaze plan** (credit card required, $1 budget alert recommended).
2. Project Settings → **Cloud Messaging** tab → Web configuration → **Web Push certificates** → "Generate key pair". Copy the public VAPID key string. Paste into Claude.
3. Project Settings → **Service accounts** → optional: do nothing here. Cloud Functions will use Application Default Credentials automatically.

### Local terminal (one-time)
```bash
npm install -g firebase-tools
firebase login                                    # opens browser, log in with Google
cd /c/Users/Reece/Development/Source/sl
firebase init                                     # select Functions + Database
                                                  # use existing project: fundraiser-f0831
                                                  # JS, no ESLint, install deps now
firebase functions:config:set admin.password_hash="<bcrypt hash of 'OG scrambled crew'>"
                                                  # Claude will provide the exact command with hash baked in
```

### After Claude implements the code
```bash
firebase deploy --only functions
firebase deploy --only database
git push                                          # CI deploys the React frontend to GitHub Pages
```

Total user time: **~10 minutes** active work, plus waiting for the function deploy (~2 minutes).

---

## Confirmed decisions (locked 2026-04-28)

All 9 decisions resolved. Implementation can proceed without further user input on the notifications scope.

| # | Topic | Decision |
|---|-------|----------|
| 1 | Branded copy on subscribe sheet | **Option A, sarcastic flavor.** Headline: "🌭 Join the Notification Club". Body: "Group chats die. Facebook eats your soul. Just let us ping your phone when there's a ride. Or beer. Or moose-on-the-trail vibes. We'll only be annoying when it counts. Mostly." |
| 2 | Behavior when `Notification.permission === 'denied'` | **Aggressive muted pill.** Always-visible passive pill: "🥚 You blocked us. Wild. Enjoy missing the rides, the beer calls, the moose alerts. *Tap to fix →*" Tap opens a sheet with platform-specific recovery instructions. |
| 3 | Image attachment in compose form | **Skip.** No image upload. Every notification ships with a hardcoded icon: `https://thescrambledlegs.com/android-chrome-192x192.png`. Cloud Function bakes this in. |
| 4 | History retention | **Keep forever, display only the last 365 days by default.** No deletion. Admin UI filters out anything older than 1 year so the history view stays light. |
| 5 | "Never ask again" option | **Skip.** 3-day dismissal cooldown is the only opt-out. Internal-friends scope — anyone who really wants out can block at the OS level. |
| 6 | Send to subset | **All-by-default + "Test → one device" mode.** Admin can flip a toggle in the compose form to send to a single subscriber picked from a list (subscribers sourced live from `/fcmTokens`, shown with platform icon + first 8 chars of token hash + UA snippet). Function accepts an optional `testTokenHash` parameter that limits the batch to that one token. |
| 7 | Admin password storage | **Plaintext constant in Cloud Function source.** Match the events admin password (`"OG scrambled crew"`). No bcrypt. No env config. Acknowledged low security; acceptable for the friends-only scope. |
| 8 | Real-time delivery streaming | **Batched-at-end.** Use `sendEachForMulticast`, write final accepted/failed counters once when the batch resolves. Simpler implementation; with <50 subscribers the batch returns in under a second so streaming would add complexity for no perceptible UX gain. |
| 9 | Manual-only sends | **Confirmed.** No auto-reminders, no scheduled sends. Admin clicks "Send" or nothing happens. |

---

## Risks / gotchas

- **iOS install drop-off:** Realistically 60-80% of iPhone users won't install the PWA. Communicate it well, then accept it. Half the audience (Android + desktop) works without install.
- **Token churn:** Browsers invalidate FCM tokens on incognito clear, browser uninstall, profile reset. ~5-10% of stored tokens at any time will be dead. The send function auto-prunes them, but the recipient count will lag reality slightly until the next send.
- **iOS major version regressions:** Apple's PWA implementation has historically broken on x.0 releases (e.g., the brief EU PWA removal in iOS 17.4). Expect to retest each year and possibly tweak the install instructions.
- **GitHub Pages caching:** Service worker updates lag ~10 min after deploy due to GH Pages' default cache. Acceptable. We register the SW with a `?v=` query string per build to force updates if it ever becomes a problem.
- **Per-token write fanout cost:** With 1000 subscribers and one push, we write 1000 entries to `/notifications/{id}/deliveries/`. RTDB handles this fine; egress is well under free tier. Just don't store unbounded data per delivery.
- **Privacy:** We don't collect email/name at subscribe time. Tokens are anonymous opaque IDs. If we ever add user names later, this doc needs a privacy revision.
- **Admin password is shared:** Multiple operators will need to know "OG scrambled crew." Rotate annually. Document the rotation procedure when more than one person knows it.

---

## Implementation order (when we start coding)

1. Firebase project setup (Blaze, VAPID, `firebase init`).
2. Realtime DB security rules (`database.rules.json` + deploy).
3. Service worker (`public/firebase-messaging-sw.js`) + manifest tweaks.
4. `messaging.js` client service: state detection, subscribe/unsubscribe, token write.
5. `NotificationFab` + `NotificationSheet` components mounted on home page.
6. `sendPush` Cloud Function (no UI yet — test via Firebase CLI shell).
7. Admin compose form in `AdminPage.js`.
8. Real-time send progress wiring.
9. `logOpen` Cloud Function.
10. Admin history list with expandable delivery details.
11. End-to-end test on real iPhone (PWA install + push), real Android, real desktop.

Each step ships independently — you can deploy after step 5 and have working subscribe with no admin send yet.

---

## Sources / further reading

- [Apple Developer: Sending web push notifications](https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers)
- [WebKit blog: Web Push for Web Apps on iOS and iPadOS](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)
- [Firebase: Set up a JavaScript FCM client](https://firebase.google.com/docs/cloud-messaging/js/client)
- [Firebase: Migrate from legacy FCM APIs to HTTP v1](https://firebase.google.com/docs/cloud-messaging/migrate-v1)
- [Firebase: sendEachForMulticast](https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging.messaging#messagingsendeachformulticast)
- [react-ios-pwa-prompt](https://github.com/chrisdancee/react-ios-pwa-prompt) — reference for iOS install bottom sheet styling
- [MDN: Notification.permission](https://developer.mozilla.org/en-US/docs/Web/API/Notification/permission)
- [MDN: matchMedia display-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode)
