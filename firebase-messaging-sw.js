/* eslint-disable no-undef */
// Firebase Cloud Messaging service worker.
//
// This file MUST live at the site root so the SW scope covers the whole app.
// Background messages (tab closed / backgrounded) hit onBackgroundMessage.
// Foreground messages are handled in src/services/messaging.js via onMessage.

importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

// Inline Firebase config — apiKey is public; same as src/services/firebase.js.
firebase.initializeApp({
  apiKey: 'AIzaSyAmwwbvmvxNYX-8PesRl8io9CH60sI2v2A',
  authDomain: 'fundraiser-f0831.firebaseapp.com',
  databaseURL: 'https://fundraiser-f0831-default-rtdb.firebaseio.com',
  projectId: 'fundraiser-f0831',
  storageBucket: 'fundraiser-f0831.firebasestorage.app',
  messagingSenderId: '900827039889',
  appId: '1:900827039889:web:4bd336cb4f88a0c76e1730',
});

const NOTIFICATION_ICON = 'https://thescrambledlegs.com/android-chrome-192x192.png';
const LOG_OPEN_URL =
  'https://us-central1-fundraiser-f0831.cloudfunctions.net/logOpen';

const messaging = firebase.messaging();

// When a push lands while the app is not visible, FCM auto-renders the
// notification from the `notification` payload. We hook onBackgroundMessage
// only to attach our data fields (notifId, clickUrl) onto the system notification.
messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};
  const title =
    (payload.notification && payload.notification.title) || data.title || 'Scrambled Legs';
  const body = (payload.notification && payload.notification.body) || data.body || '';
  const tag = data.tag || 'sl-default';
  const clickUrl = data.clickUrl || 'https://thescrambledlegs.com/';
  const notifId = data.notifId || '';

  return self.registration.showNotification(title, {
    body,
    icon: NOTIFICATION_ICON,
    badge: NOTIFICATION_ICON,
    tag,
    renotify: true,
    data: { clickUrl, notifId },
  });
});

// Tap → close + log open + open the click URL (or focus an existing tab).
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const data = (event.notification && event.notification.data) || {};
  const clickUrl = data.clickUrl || 'https://thescrambledlegs.com/';
  const notifId = data.notifId || '';

  event.waitUntil(
    (async () => {
      // Fire-and-forget log to /logOpen. We pass tokenHash if we cached one.
      if (notifId) {
        try {
          const url = new URL(LOG_OPEN_URL);
          url.searchParams.set('notifId', notifId);
          // SW has no access to localStorage; we send what we know.
          await fetch(url.toString(), { method: 'GET', mode: 'no-cors', keepalive: true });
        } catch (e) {
          // ignore — page-load fallback handles it
        }
      }

      // Try to focus an existing window first.
      const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const c of allClients) {
        try {
          if (c.url && c.url.indexOf('thescrambledlegs.com') !== -1) {
            await c.focus();
            if ('navigate' in c) {
              try { await c.navigate(clickUrl); } catch (e) { /* cross-origin nav blocked */ }
            }
            return;
          }
        } catch (e) {
          // continue
        }
      }
      await clients.openWindow(clickUrl);
    })()
  );
});
