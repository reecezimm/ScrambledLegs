// Realtime DB read helpers for the admin Notifications tab.
//
// Writes happen through the sendPush Cloud Function only — the Cloud Function
// uses the Admin SDK to bypass security rules. The browser only reads these
// paths via authenticated admins (gated by password) and never writes here.

import { ref, onValue, off } from 'firebase/database';
import { database } from './firebase';

// Subscribe to /notifications. Callback receives an array of
// { id, ...notification }, sorted by sentAt descending.
export function subscribeNotifications(callback) {
  const r = ref(database, 'notifications');
  const handler = (snap) => {
    const out = [];
    snap.forEach((child) => {
      const v = child.val() || {};
      out.push({ id: child.key, ...v });
    });
    out.sort((a, b) => (b.sentAt || 0) - (a.sentAt || 0));
    callback(out);
  };
  onValue(r, handler);
  return () => off(r, 'value', handler);
}

// Subscribe to a single notification (for live progress while sending).
export function subscribeNotification(id, callback) {
  const r = ref(database, `notifications/${id}`);
  const handler = (snap) => {
    const v = snap.val();
    callback(v ? { id, ...v } : null);
  };
  onValue(r, handler);
  return () => off(r, 'value', handler);
}

// Subscribe to the active token list — used by the "test send → one device"
// dropdown in the compose form.
export function subscribeTokens(callback) {
  const r = ref(database, 'fcmTokens');
  const handler = (snap) => {
    const out = [];
    snap.forEach((child) => {
      const v = child.val() || {};
      out.push({ hash: child.key, ...v });
    });
    out.sort((a, b) => (b.lastSeenAt || b.createdAt || 0) - (a.lastSeenAt || a.createdAt || 0));
    callback(out);
  };
  onValue(r, handler);
  return () => off(r, 'value', handler);
}

// Filter notifications older than `days` (default 365).
export function filterRecent(list, days = 365) {
  const cutoff = Date.now() - days * 86400000;
  return list.filter((n) => (n.sentAt || 0) >= cutoff);
}
