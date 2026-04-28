// Page-load notification open tracker — primary path (navigate-then-log).
//
// Cloud Function builds notification click URLs as:
//   https://thescrambledlegs.com/?n={notifId}&to={encoded-real-destination}
// User taps notification → SW opens that URL → this script runs in a real
// Window context (where keepalive fetch + sendBeacon both work), logs the
// open, then redirects to ?to= if present. This sidesteps SW termination,
// CORS preflight races, and sendBeacon-not-available-in-SW gotchas.

const LOG_OPEN_URL =
  'https://logopen-57u2xumnxa-uc.a.run.app';
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

    // Try sendBeacon first (most reliable across navigation), fall back to fetch.
    const logUrl = url.toString();
    let beaconSent = false;
    try {
      if (navigator && typeof navigator.sendBeacon === 'function') {
        beaconSent = navigator.sendBeacon(logUrl);
      }
    } catch (e) { /* ignore */ }
    if (!beaconSent) {
      fetch(logUrl, { method: 'GET', keepalive: true }).catch(() => {});
    }

    // If the click was originally for an external URL, redirect there now.
    const to = params.get('to');
    if (to) {
      try {
        const dest = new URL(to, window.location.origin);
        // Allow same-origin or any http(s) destination.
        if (dest.protocol === 'http:' || dest.protocol === 'https:') {
          window.location.replace(dest.toString());
          return;
        }
      } catch (e) { /* ignore — fall through to clean URL */ }
    }

    // Clean ?n= and ?to= so they don't stick around.
    params.delete('n');
    params.delete('to');
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
