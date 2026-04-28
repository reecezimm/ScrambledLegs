// Scrambled Legs — Cloud Functions
//
// =============================================================================
// ADMIN UID SETUP (Phase 2)
// =============================================================================
// 1. Sign up via the Settings cog on the website.
// 2. In Firebase Console → Authentication → Users, copy your UID.
// 3. Add it to the ADMIN_UIDS array below.
// 4. ALSO set userProfiles/{your-uid}/isAdmin: true in the Realtime Database
//    (the database security rules check this flag — both must be set).
// 5. Deploy: npx firebase-tools deploy --only functions --project fundraiser-f0831
// =============================================================================
//
// Endpoints:
//   sendPush  — admin-only (verified via Firebase ID token).
//   logOpen   — public, no auth (called from SW notificationclick + page load).
//   onNewsletterSignup — RTDB trigger; auto-creates user accounts and writes
//                        password reset link to pendingWelcomeEmails queue.

const { onRequest } = require('firebase-functions/v2/https');
const { onValueCreated } = require('firebase-functions/v2/database');
const { setGlobalOptions } = require('firebase-functions/v2');
const admin = require('firebase-admin');

admin.initializeApp();

setGlobalOptions({ region: 'us-central1', maxInstances: 10 });

const ADMIN_UIDS = [];
const ADMIN_EMAILS = ['gm@thescrambledlegs.com', 'coach@thescrambledlegs.com'];

const NOTIFICATION_ICON =
  'https://thescrambledlegs.com/android-chrome-192x192.png';
const DEFAULT_CLICK_URL = 'https://thescrambledlegs.com/';

// Build a "navigate-then-log" tracking URL that always lands on our origin
// first. The page-load tracker (src/services/openTracking.js) sees ?n=, fires
// logOpen from a real Window context (where keepalive/sendBeacon work), then
// follows the &to= redirect. This sidesteps SW lifetime + sendBeacon-in-SW
// limits + CORS preflight races that broke open-tracking from PWA clicks.
function buildClickUrl(base, notifId) {
  const dest = (base || DEFAULT_CLICK_URL).trim();
  const params = new URLSearchParams({ n: notifId });
  if (dest && dest !== DEFAULT_CLICK_URL) params.set('to', dest);
  return `${DEFAULT_CLICK_URL}?${params.toString()}`;
}

async function verifyAdmin(req, res) {
  const authHeader = req.get('Authorization') || req.get('authorization') || '';
  const m = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!m) {
    res.status(401).json({ error: 'Missing Authorization bearer token.' });
    return null;
  }
  const idToken = m[1];
  let decoded;
  try {
    decoded = await admin.auth().verifyIdToken(idToken);
  } catch (e) {
    res.status(401).json({ error: 'Invalid or expired token.' });
    return null;
  }
  const uid = decoded.uid;

  // Three ways to be admin: hardcoded UID list, designated admin email,
  // OR userProfiles/{uid}/isAdmin == true.
  if (ADMIN_UIDS.includes(uid)) return decoded;
  if (decoded.email && ADMIN_EMAILS.includes(decoded.email.toLowerCase())) return decoded;
  try {
    const snap = await admin.database()
      .ref(`userProfiles/${uid}/isAdmin`).once('value');
    if (snap.val() === true) return decoded;
  } catch (_) {}

  res.status(403).json({ error: 'Not authorized.' });
  return null;
}

// ---------------------------------------------------------------------------
// sendPush — admin-only.
// ---------------------------------------------------------------------------

exports.sendPush = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const decoded = await verifyAdmin(req, res);
  if (!decoded) return;

  const data = req.body || {};
  const title = (data.title || '').trim();
  const body = (data.body || '').trim();
  if (!title || !body) {
    res.status(400).json({ error: 'Title and body are required.' }); return;
  }
  const clickUrl = (data.clickUrl || DEFAULT_CLICK_URL).trim();

  const snap = await admin.database().ref('fcmTokens').once('value');
  let entries = Object.entries(snap.val() || {});
  if (data.testTokenHash) {
    entries = entries.filter(([hash]) => hash === data.testTokenHash);
    if (entries.length === 0) {
      res.status(404).json({ error: 'Test token not found.' }); return;
    }
  }

  if (entries.length === 0) {
    res.status(400).json({ error: 'No subscribers to send to.' }); return;
  }

  const notifRef = admin.database().ref('notifications').push();
  const notifId = notifRef.key;
  const tag = (data.tag || '').trim() || notifId;

  await notifRef.set({
    title,
    body,
    icon: NOTIFICATION_ICON,
    clickUrl,
    tag,
    sentAt: admin.database.ServerValue.TIMESTAMP,
    sentBy: decoded.uid,
    sentByEmail: decoded.email || null,
    recipients: entries.length,
    accepted: 0,
    failed: 0,
    opened: 0,
    isTest: !!data.testTokenHash,
    status: 'sending',
  });

  const link = buildClickUrl(clickUrl, notifId);
  const tokens = entries.map(([_, v]) => v.token);

  const message = {
    notification: { title, body },
    data: {
      title,
      body,
      clickUrl: link,
      notifId,
      tag,
    },
    webpush: {
      notification: {
        icon: NOTIFICATION_ICON,
        badge: NOTIFICATION_ICON,
        tag,
      },
      fcmOptions: { link },
      headers: { Urgency: 'high' },
    },
    tokens,
  };

  const response = await admin.messaging().sendEachForMulticast(message);

  let accepted = 0;
  let failed = 0;
  const updates = {};

  response.responses.forEach((r, i) => {
    const [hash, info] = entries[i];
    if (r.success) {
      accepted += 1;
      updates[`notifications/${notifId}/deliveries/${hash}`] = {
        result: 'success',
        sentAt: Date.now(),
        opened: false,
        platform: (info && info.platform) || 'unknown',
      };
    } else {
      failed += 1;
      const errCode = (r.error && r.error.code) || 'unknown';
      updates[`notifications/${notifId}/deliveries/${hash}`] = {
        result: 'failure',
        errorCode: errCode,
        sentAt: Date.now(),
        platform: (info && info.platform) || 'unknown',
      };
      if (
        errCode === 'messaging/registration-token-not-registered' ||
        errCode === 'messaging/invalid-registration-token'
      ) {
        updates[`fcmTokens/${hash}`] = null;
      }
    }
  });
  updates[`notifications/${notifId}/accepted`] = accepted;
  updates[`notifications/${notifId}/failed`] = failed;
  updates[`notifications/${notifId}/status`] = 'sent';
  await admin.database().ref().update(updates);

  res.json({ ok: true, notifId, recipients: entries.length, accepted, failed });
});

// ---------------------------------------------------------------------------
// logOpen — public, no auth.
// ---------------------------------------------------------------------------

exports.logOpen = onRequest({ cors: true }, async (req, res) => {
  // sendBeacon from the SW arrives as POST; the page-load tracker uses GET.
  // Accept both. notifId/tokenHash come from query string in either case
  // (sendBeacon-with-no-body still preserves URL search params).
  const notifId = (req.query && req.query.notifId) ||
    (req.body && req.body.notifId) || '';
  const tokenHash = (req.query && req.query.tokenHash) ||
    (req.body && req.body.tokenHash) || '';
  if (!notifId) {
    res.status(400).send('missing notifId');
    return;
  }

  try {
    const refRoot = admin.database().ref(`notifications/${notifId}`);
    if (tokenHash) {
      const delRef = refRoot.child(`deliveries/${tokenHash}`);
      const snap = await delRef.once('value');
      const cur = snap.val() || {};
      if (!cur.opened) {
        await delRef.update({ opened: true, openedAt: Date.now() });
      }
    }
    await refRoot.child('opened').transaction((curr) => (curr || 0) + 1);
    res.status(204).send('');
  } catch (err) {
    res.status(500).send('logOpen failed');
  }
});

// ---------------------------------------------------------------------------
// deleteUser — admin-only. Wipes a user's auth record + all their data.
// ---------------------------------------------------------------------------

exports.deleteUser = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const decoded = await verifyAdmin(req, res);
  if (!decoded) return;

  const data = req.body || {};
  const uid = (data.uid || '').trim();
  if (!uid) { res.status(400).json({ error: 'uid is required' }); return; }
  if (uid === decoded.uid) {
    res.status(400).json({ error: 'Refusing to delete the calling admin.' });
    return;
  }

  try {
    try {
      await admin.auth().deleteUser(uid);
    } catch (e) {
      if (e.code !== 'auth/user-not-found') {
        console.error('[deleteUser] auth.deleteUser failed:', e.message);
        res.status(500).json({ error: 'Failed to delete auth user: ' + e.message });
        return;
      }
    }

    const db = admin.database();
    const updates = {};
    updates[`userProfiles/${uid}`] = null;

    const [mashSnap, rsvpSnap, sessSnap, tokenSnap] = await Promise.all([
      db.ref('eventMashTotals').once('value'),
      db.ref('rsvps').once('value'),
      db.ref('mashSessions').once('value'),
      db.ref('fcmTokens').once('value'),
    ]);

    const mashVal = mashSnap.val() || {};
    Object.keys(mashVal).forEach((eventId) => {
      if (mashVal[eventId] && mashVal[eventId][uid] !== undefined) {
        updates[`eventMashTotals/${eventId}/${uid}`] = null;
      }
    });

    const rsvpVal = rsvpSnap.val() || {};
    Object.keys(rsvpVal).forEach((eventId) => {
      if (rsvpVal[eventId] && rsvpVal[eventId][uid] !== undefined) {
        updates[`rsvps/${eventId}/${uid}`] = null;
      }
    });

    const sessVal = sessSnap.val() || {};
    Object.keys(sessVal).forEach((eventId) => {
      if (sessVal[eventId] && sessVal[eventId][uid] !== undefined) {
        updates[`mashSessions/${eventId}/${uid}`] = null;
      }
    });

    const tokenVal = tokenSnap.val() || {};
    Object.keys(tokenVal).forEach((hash) => {
      if (tokenVal[hash] && tokenVal[hash].uid === uid) {
        updates[`fcmTokens/${hash}`] = null;
      }
    });

    await db.ref().update(updates);

    res.json({ ok: true, uid });
  } catch (err) {
    console.error('[deleteUser] failed:', err);
    res.status(500).json({ error: (err && err.message) || 'Delete failed.' });
  }
});

// ---------------------------------------------------------------------------
// onNewsletterSignup — RTDB trigger.
// Creates a Firebase Auth user (if missing), generates a password reset link,
// and writes it to pendingWelcomeEmails. To actually deliver:
//   • Install the Firebase "Trigger Email" extension and point it at
//     pendingWelcomeEmails, OR
//   • Wire SMTP (e.g., nodemailer) and consume the queue manually.
// ---------------------------------------------------------------------------

exports.onNewsletterSignup = onValueCreated(
  '/newsletterRegistrants/{pushId}',
  async (event) => {
    const data = event.data.val() || {};
    const email = (data.email || '').trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    let userType = 'existing';
    let uid = null;

    try {
      const existing = await admin.auth().getUserByEmail(email);
      uid = existing.uid;
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        try {
          const created = await admin.auth().createUser({
            email,
            emailVerified: false,
            displayName: data.name || undefined,
            password: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2).toUpperCase() + '!',
          });
          uid = created.uid;
          userType = 'new';
          await admin.database().ref(`userProfiles/${uid}`).update({
            email,
            displayName: data.name || email.split('@')[0],
            createdAt: admin.database.ServerValue.TIMESTAMP,
            createdVia: 'newsletter',
          });
        } catch (createErr) {
          console.error('[onNewsletterSignup] Failed to create user:', createErr.message);
          return;
        }
      } else {
        console.error('[onNewsletterSignup] Lookup failed:', e.message);
        return;
      }
    }

    let resetLink = null;
    try {
      resetLink = await admin.auth().generatePasswordResetLink(email);
    } catch (e) {
      console.error('[onNewsletterSignup] Failed to generate reset link:', e.message);
      return;
    }

    try {
      await admin.database().ref('pendingWelcomeEmails').push({
        email,
        name: data.name || null,
        link: resetLink,
        type: userType,
        uid,
        createdAt: admin.database.ServerValue.TIMESTAMP,
        sourcePushId: event.params.pushId,
      });
      console.warn(
        `[onNewsletterSignup] Wrote pendingWelcomeEmails for ${email} (${userType}). ` +
        `Install Firebase Trigger Email extension or wire SMTP to actually deliver.`
      );
    } catch (e) {
      console.error('[onNewsletterSignup] Failed to write pendingWelcomeEmails:', e.message);
    }
  }
);
