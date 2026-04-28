// Lightweight client-side error logger.
//
// Writes uncaught errors + unhandled promise rejections to RTDB at
// errorLogs/{pushId}. Throttled so a runaway loop can't flood the database.
// Public write, admin read (rules-gated).
//
// Manually log: `import { logError } from './services/errorLogger'; logError(e, { context: ... })`.

import { ref, push, set, serverTimestamp } from 'firebase/database';
import { database, auth } from './firebase';
import { BUILD_NUM, BUILD_SHA, APP_VERSION } from './buildInfo';

const RECENT_KEY = 'sl_recent_errors';
const RECENT_TTL_MS = 60 * 1000;
const MAX_PER_MIN = 8;

function shouldRateLimit() {
  try {
    const now = Date.now();
    const raw = sessionStorage.getItem(RECENT_KEY);
    let arr = raw ? JSON.parse(raw) : [];
    arr = arr.filter((t) => now - t < RECENT_TTL_MS);
    if (arr.length >= MAX_PER_MIN) {
      sessionStorage.setItem(RECENT_KEY, JSON.stringify(arr));
      return true;
    }
    arr.push(now);
    sessionStorage.setItem(RECENT_KEY, JSON.stringify(arr));
    return false;
  } catch (_) {
    return false;
  }
}

function safeStr(v, max = 4000) {
  try {
    if (v == null) return '';
    const s = typeof v === 'string' ? v : (v.message || String(v));
    return s.length > max ? s.slice(0, max) : s;
  } catch (_) {
    return '';
  }
}

export async function logError(err, context = {}) {
  if (shouldRateLimit()) return;
  try {
    const r = push(ref(database, 'errorLogs'));
    const user = auth && auth.currentUser;
    await set(r, {
      msg: safeStr(err && (err.message || err)),
      stack: safeStr(err && err.stack, 6000),
      url: typeof window !== 'undefined' ? window.location.href : '',
      ua: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 300) : '',
      uid: (user && user.uid) || null,
      email: (user && user.email) || null,
      version: APP_VERSION,
      buildNum: BUILD_NUM,
      buildSha: BUILD_SHA,
      context: context || null,
      ts: serverTimestamp(),
    });
  } catch (_) {
    // Logging the logger failing would loop. Drop it.
  }
}

(function installGlobalHandlers() {
  if (typeof window === 'undefined') return;
  window.addEventListener('error', (e) => {
    // Skip ResizeObserver noise (browsers fire this benignly).
    const msg = e && e.message;
    if (msg && /ResizeObserver loop/i.test(msg)) return;
    logError(e && (e.error || e), {
      type: 'error',
      filename: e && e.filename,
      lineno: e && e.lineno,
      colno: e && e.colno,
    });
  });
  window.addEventListener('unhandledrejection', (e) => {
    logError(e && (e.reason || e), { type: 'unhandledrejection' });
  });
})();
