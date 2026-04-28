// Page-load notification open tracker.
//
// When a user lands on the site with ?n={notifId} in the URL (typically from
// tapping a push notification), we fire-and-forget a GET to the logOpen
// Cloud Function so the admin history view can show open counts. Then we
// strip the ?n= param via history.replaceState() so it doesn't pollute the URL.
//
// This is the belt-and-suspenders backup for the SW notificationclick handler.
// If both fire we'll over-count by 1 — accepted tradeoff per NOTIFICATIONS.md.

const LOG_OPEN_URL =
  'https://us-central1-fundraiser-f0831.cloudfunctions.net/logOpen';
const LS_TOKEN_HASH = 'sl_notif_token_hash';

(function trackOpenOnLoad() {
  if (typeof window === 'undefined' || typeof URL === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const notifId = params.get('n');
    if (!notifId) return;

    let tokenHash = null;
    try { tokenHash = localStorage.getItem(LS_TOKEN_HASH); } catch (e) { /* ignore */ }

    const url = new URL(LOG_OPEN_URL);
    url.searchParams.set('notifId', notifId);
    if (tokenHash) url.searchParams.set('tokenHash', tokenHash);

    // Fire-and-forget. mode:no-cors so we don't need preflight handshake.
    fetch(url.toString(), { method: 'GET', mode: 'no-cors', keepalive: true }).catch(() => {});

    // Clean the URL so the param doesn't stick around.
    params.delete('n');
    const cleaned =
      window.location.pathname +
      (params.toString() ? '?' + params.toString() : '') +
      window.location.hash;
    try {
      window.history.replaceState({}, '', cleaned);
    } catch (e) {
      // ignore
    }
  } catch (e) {
    // ignore — tracking failure must not break the page
  }
})();
