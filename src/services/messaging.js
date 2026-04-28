// Push notifications client service.
//
// Setup the user must do BEFORE this works:
//   1. Firebase Console → Project Settings → Cloud Messaging → Web Push
//      certificates → Generate key pair. Copy the public key.
//   2. Create .env.local at repo root with:
//        REACT_APP_FIREBASE_VAPID_KEY=BLahBlahLongString
//   3. Restart `npm start` to pick it up.
//
// Without the key, requestAndSubscribe() will throw a clear error in the
// console and the FAB will surface a generic "subscribe failed" toast.

import { getToken, onMessage } from 'firebase/messaging';
import { ref, set, update, serverTimestamp } from 'firebase/database';
import { auth, database, getMessagingIfSupported } from './firebase';

const VAPID_KEY = 'BEsmXUl-hHK0FAmHVdbUeZ3kDbSyhOPId-66fJ5NRJ44XFYy5MujmXiXKBp8MH_7hBmFedktB5y7iF3NOjV86tY';

const SW_PATH = '/firebase-messaging-sw.js';

const LS_DISMISSED = 'sl_notif_dismissed_until';
const LS_TOKEN_HASH = 'sl_notif_token_hash';
const COOLDOWN_MS = 1 * 86400000; // 1 day — friends-only site, can be aggressive
const NOTIFICATION_ICON =
  'https://thescrambledlegs.com/android-chrome-192x192.png';

// ---------- platform detection ----------

export function isIOS() {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

export function isStandalone() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }
  return window.navigator && window.navigator.standalone === true;
}

export function detectPlatform() {
  if (typeof navigator === 'undefined') return 'desktop';
  if (isIOS()) return 'ios';
  if (/Android/i.test(navigator.userAgent)) return 'android';
  return 'desktop';
}

function pushSupported() {
  return (
    typeof window !== 'undefined' &&
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  );
}

// ---------- state machine ----------

export function getSubscriptionState() {
  if (!pushSupported()) return 'unsupported';
  const ios = isIOS();
  if (ios && !isStandalone()) return 'ios_needs_install';

  let perm = 'default';
  try {
    perm = Notification.permission;
  } catch (e) {
    return 'unsupported';
  }

  if (perm === 'granted') return 'subscribed';
  if (perm === 'denied') return 'blocked';

  // permission === 'default' — askable, but maybe in a cooldown
  let dismissedUntil = 0;
  try {
    dismissedUntil = parseInt(localStorage.getItem(LS_DISMISSED) || '0', 10) || 0;
  } catch (e) {
    dismissedUntil = 0;
  }
  if (Date.now() < dismissedUntil) return 'dismissed';
  return 'askable';
}

// ---------- token hashing ----------

async function sha256Hex(input) {
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  const bytes = new Uint8Array(buf);
  let out = '';
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i].toString(16).padStart(2, '0');
  }
  return out;
}

export function getCachedTokenHash() {
  try {
    return localStorage.getItem(LS_TOKEN_HASH) || null;
  } catch (e) {
    return null;
  }
}

// ---------- service worker registration ----------

let _swReg = null;
async function ensureServiceWorker() {
  if (_swReg) return _swReg;
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service workers not supported in this browser.');
  }
  // We register the SW from the public path so its scope covers the entire site.
  _swReg = await navigator.serviceWorker.register(SW_PATH);
  return _swReg;
}

// ---------- subscribe ----------

export async function requestAndSubscribe() {
  if (!pushSupported()) {
    throw new Error('This browser does not support push notifications.');
  }
  if (VAPID_KEY === 'REPLACE_WITH_VAPID_KEY') {
    throw new Error(
      'VAPID key not configured. Set REACT_APP_FIREBASE_VAPID_KEY in .env.local and restart npm start.'
    );
  }

  // *** requestPermission MUST be called immediately — before any other awaits.
  // Mobile browsers (Chrome Android, Safari iOS) require the permission dialog
  // to be triggered synchronously within the user-gesture call stack. Any
  // async operation before this call can break that requirement, causing the
  // browser to silently return 'default' without showing the dialog at all.
  const permission = await Notification.requestPermission();
  try {
    const { logEvent } = await import('./analytics');
    if (permission === 'granted') {
      logEvent('notification_permission_granted', { platform: detectPlatform() });
    } else {
      logEvent('notification_permission_denied', { platform: detectPlatform(), permission });
    }
  } catch (_) {}
  if (permission !== 'granted') {
    throw new Error(
      permission === 'denied'
        ? 'Notifications are blocked. Open your browser settings to re-enable.'
        : 'Permission was not granted. Please try again and tap Allow.'
    );
  }

  const messaging = await getMessagingIfSupported();
  if (!messaging) {
    throw new Error('Firebase messaging is not available in this browser.');
  }

  const swReg = await ensureServiceWorker();
  const token = await getToken(messaging, {
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration: swReg,
  });
  if (!token) {
    throw new Error('FCM did not return a token.');
  }

  const hash = await sha256Hex(token);

  try {
    const u = auth.currentUser;
    const platform = detectPlatform();
    const record = {
      token,
      createdAt: serverTimestamp(),
      lastSeenAt: serverTimestamp(),
      userAgent:
        typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 400) : '',
      platform,
      isStandalone: isStandalone(),
    };
    if (u) {
      record.uid = u.uid;
      if (u.email) record.email = u.email;
      if (u.displayName) record.displayName = u.displayName;
      else if (u.email) record.displayName = u.email.split('@')[0];
    }
    await set(ref(database, `fcmTokens/${hash}`), record);
    if (u) {
      update(ref(database, `userProfiles/${u.uid}/devices/${hash}`), {
        platform,
        lastSeenAt: serverTimestamp(),
        notificationsEnabled: true,
      }).catch(() => {});
    }
    try {
      const { logEvent } = await import('./analytics');
      logEvent('notification_subscribed', { platform });
    } catch (_) {}
    console.log('[messaging] Token written to Firebase /fcmTokens/', hash.slice(0, 8));
  } catch (writeErr) {
    // Surface clearly — usually means database rules haven't been deployed yet.
    console.error('[messaging] Token write FAILED — likely Firebase rules not deployed:', writeErr.message);
    throw new Error(
      'Subscribed but could not save your token to Firebase. ' +
      'Run `firebase deploy --only database` to deploy the database rules. ' +
      'Error: ' + writeErr.message
    );
  }

  try {
    localStorage.setItem(LS_TOKEN_HASH, hash);
    // Clear any lingering dismissal — they're in.
    localStorage.removeItem(LS_DISMISSED);
  } catch (e) {
    // ignore
  }

  return { token, hash };
}

// ---------- post sign-in back-fill ----------

// Called when a user signs in: back-fill uid/email/displayName onto their
// device's existing fcmTokens row, and write the reverse index under
// userProfiles/{uid}/devices/{hash}.
export async function backfillTokenOwnership(user) {
  if (!user) return;
  const hash = getCachedTokenHash();
  if (!hash) return;
  try {
    const patch = { uid: user.uid };
    if (user.email) patch.email = user.email;
    if (user.displayName) patch.displayName = user.displayName;
    else if (user.email) patch.displayName = user.email.split('@')[0];
    patch.lastSeenAt = serverTimestamp();
    await update(ref(database, `fcmTokens/${hash}`), patch);
    await update(ref(database, `userProfiles/${user.uid}/devices/${hash}`), {
      platform: detectPlatform(),
      lastSeenAt: serverTimestamp(),
      notificationsEnabled: true,
    });
  } catch (_) {
    // Silent — non-critical denormalization.
  }
}

// ---------- dismissal cooldown ----------

export function dismissPrompt() {
  try {
    localStorage.setItem(LS_DISMISSED, String(Date.now() + COOLDOWN_MS));
  } catch (e) {
    // ignore
  }
}

// ---------- foreground messages ----------

let _foregroundInstalled = false;
export async function setupForegroundHandler() {
  if (_foregroundInstalled) return;
  _foregroundInstalled = true;
  const messaging = await getMessagingIfSupported();
  if (!messaging) return;
  onMessage(messaging, (payload) => {
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    const data = payload.data || {};
    const title =
      (payload.notification && payload.notification.title) || data.title || 'Scrambled Legs';
    const body = (payload.notification && payload.notification.body) || data.body || '';
    const tag = data.tag || 'sl-foreground';
    try {
      // Use the active SW registration if we can — gives us click handling.
      navigator.serviceWorker.ready
        .then((reg) =>
          reg.showNotification(title, {
            body,
            icon: NOTIFICATION_ICON,
            badge: NOTIFICATION_ICON,
            tag,
            renotify: true,
            data: {
              clickUrl: data.clickUrl || 'https://thescrambledlegs.com/',
              notifId: data.notifId || '',
            },
          })
        )
        .catch(() => {
          // Last-ditch: native Notification. No click logging.
          try {
            // eslint-disable-next-line no-new
            new Notification(title, { body, icon: NOTIFICATION_ICON, tag });
          } catch (e) {
            // ignore
          }
        });
    } catch (e) {
      // ignore
    }
  });
}
