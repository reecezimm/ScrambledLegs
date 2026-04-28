// Scrambled Legs — Push notification Cloud Functions
//
// Two endpoints:
//   sendPush  — callable, admin compose form invokes via httpsCallable.
//   logOpen   — HTTP GET, called from the SW notificationclick handler and
//               from the page-load ?n= tracker.
//
// Locked decisions (see NOTIFICATIONS.md):
//   • Plaintext password compare (low security; friends-only scope)
//   • Hardcoded notification icon URL (no admin upload)
//   • Batched-at-end delivery via sendEachForMulticast
//   • Optional testTokenHash → single-device test send

const { onCall, onRequest, HttpsError } = require('firebase-functions/v2/https');
const { setGlobalOptions } = require('firebase-functions/v2');
const admin = require('firebase-admin');

admin.initializeApp();

setGlobalOptions({ region: 'us-central1', maxInstances: 10 });

const ADMIN_PASSWORD = 'OG scrambled crew';
const NOTIFICATION_ICON =
  'https://thescrambledlegs.com/android-chrome-192x192.png';
const DEFAULT_CLICK_URL = 'https://thescrambledlegs.com/';

function buildClickUrl(base, notifId) {
  try {
    const u = new URL(base || DEFAULT_CLICK_URL);
    u.searchParams.set('n', notifId);
    return u.toString();
  } catch (e) {
    const sep = (base || DEFAULT_CLICK_URL).includes('?') ? '&' : '?';
    return `${base || DEFAULT_CLICK_URL}${sep}n=${encodeURIComponent(notifId)}`;
  }
}

// ---------------------------------------------------------------------------
// sendPush — callable admin endpoint.
// ---------------------------------------------------------------------------

exports.sendPush = onCall(async (request) => {
  const data = request.data || {};

  // 1. Plaintext password check.
  if (data.password !== ADMIN_PASSWORD) {
    throw new HttpsError('permission-denied', 'Bad password.');
  }

  const title = (data.title || '').trim();
  const body = (data.body || '').trim();
  if (!title || !body) {
    throw new HttpsError('invalid-argument', 'Title and body are required.');
  }
  const clickUrl = (data.clickUrl || DEFAULT_CLICK_URL).trim();

  // 2. Read tokens — either all or just the test target.
  const snap = await admin.database().ref('fcmTokens').once('value');
  let entries = Object.entries(snap.val() || {});
  if (data.testTokenHash) {
    entries = entries.filter(([hash]) => hash === data.testTokenHash);
    if (entries.length === 0) {
      throw new HttpsError('not-found', 'Test token not found.');
    }
  }

  if (entries.length === 0) {
    throw new HttpsError('failed-precondition', 'No subscribers to send to.');
  }

  // 3. Create notification record (status: sending) so admin UI can subscribe live.
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
    sentBy: 'admin',
    recipients: entries.length,
    accepted: 0,
    failed: 0,
    opened: 0,
    isTest: !!data.testTokenHash,
    status: 'sending',
  });

  // 4. Build the multicast message.
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

  // 5. Process per-token results, prune dead tokens, update counters.
  let accepted = 0;
  let failed = 0;
  const updates = {};

  response.responses.forEach((res, i) => {
    const [hash, info] = entries[i];
    if (res.success) {
      accepted += 1;
      updates[`notifications/${notifId}/deliveries/${hash}`] = {
        result: 'success',
        sentAt: Date.now(),
        opened: false,
        platform: (info && info.platform) || 'unknown',
      };
    } else {
      failed += 1;
      const errCode = (res.error && res.error.code) || 'unknown';
      updates[`notifications/${notifId}/deliveries/${hash}`] = {
        result: 'failure',
        errorCode: errCode,
        sentAt: Date.now(),
        platform: (info && info.platform) || 'unknown',
      };
      // Prune known-dead tokens.
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

  return { ok: true, notifId, recipients: entries.length, accepted, failed };
});

// ---------------------------------------------------------------------------
// logOpen — HTTP GET. Called from SW notificationclick + page-load ?n= tracker.
// ---------------------------------------------------------------------------

exports.logOpen = onRequest({ cors: true }, async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
    return;
  }

  const notifId = req.query.notifId;
  const tokenHash = req.query.tokenHash;
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
