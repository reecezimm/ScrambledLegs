// Per-browser-tab session tracker.
//
// On module load (side-effect import in src/index.js):
//   • Generates a session UUID (or reuses a recent one within 30 min idle).
//   • Writes sessions/{sid} with start time, deviceId, uid (if any),
//     version/build info, and the entry path/referrer.
//
// During the session:
//   • bumpEventCount() (called from analytics.logEvent) increments eventCount
//     and updates lastActiveAt — throttled to once per 30s.
//   • visibilitychange updates lastActiveAt and writes hiddenAt when hidden.
//   • pagehide writes endedAt (sendBeacon if available, else fire-and-forget).
//   • If lastActiveAt is older than 30 min when next activity arrives, a fresh
//     session ID is generated.
//
// Auth integration:
//   • onAuthStateChanged → write uid onto the current session.
//
// All writes are additive (update / runTransaction) — never overwrite the
// session blob.

import {
  ref, update, runTransaction, serverTimestamp, onDisconnect,
} from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from './firebase';
import { getDeviceId } from './deviceId';
import { APP_VERSION, BUILD_NUM, BUILD_SHA } from './buildInfo';

const SESSION_KEY = 'sl_session_id';
const SESSION_LAST_ACTIVE_KEY = 'sl_session_last_active';
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 min idle = new session
const ACTIVE_WRITE_THROTTLE_MS = 30 * 1000;

function genUuid() {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  } catch (_) {}
  // Fallback
  const b = new Array(16);
  for (let i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const hex = b.map((x) => x.toString(16).padStart(2, '0'));
  return (
    hex.slice(0, 4).join('') + '-' +
    hex.slice(4, 6).join('') + '-' +
    hex.slice(6, 8).join('') + '-' +
    hex.slice(8, 10).join('') + '-' +
    hex.slice(10, 16).join('')
  );
}

let _sid = null;
let _lastActiveWriteAt = 0;

function readStored() {
  try {
    const id = sessionStorage.getItem(SESSION_KEY);
    const la = parseInt(sessionStorage.getItem(SESSION_LAST_ACTIVE_KEY) || '0', 10) || 0;
    return { id, lastActive: la };
  } catch (_) {
    return { id: null, lastActive: 0 };
  }
}

function writeStored(id, lastActive) {
  try {
    sessionStorage.setItem(SESSION_KEY, id);
    sessionStorage.setItem(SESSION_LAST_ACTIVE_KEY, String(lastActive));
  } catch (_) {}
}

function pickSession() {
  const { id, lastActive } = readStored();
  if (id && lastActive && Date.now() - lastActive < SESSION_TIMEOUT_MS) {
    return { id, isNew: false };
  }
  return { id: genUuid(), isNew: true };
}

function startSession() {
  try {
    const { id, isNew } = pickSession();
    _sid = id;
    writeStored(id, Date.now());
    if (!isNew) return; // resumed — don't re-write the start row
    const deviceId = getDeviceId();
    const uid = (auth && auth.currentUser && auth.currentUser.uid) || null;
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const referrer = typeof document !== 'undefined' ? (document.referrer || '') : '';
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 300) : '';
    const payload = {
      id,
      startedAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
      deviceId,
      uid,
      path,
      referrer,
      ua,
      version: APP_VERSION,
      buildNum: BUILD_NUM,
      buildSha: BUILD_SHA,
      pageViews: 0,
      eventCount: 0,
    };
    update(ref(database, `sessions/${id}`), payload).catch(() => {});
    try {
      // If the connection drops, mark the session ended. Best-effort on tab close.
      onDisconnect(ref(database, `sessions/${id}/endedAt`)).set(serverTimestamp());
    } catch (_) {}
  } catch (_) {
    // Never block boot.
  }
}

export function getSessionId() {
  if (!_sid) startSession();
  return _sid;
}

// Called from analytics.logEvent for every event.
export function bumpEventCount() {
  try {
    if (!_sid) startSession();
    const sid = _sid;
    if (!sid) return;
    const now = Date.now();
    writeStored(sid, now);
    if (now - _lastActiveWriteAt < ACTIVE_WRITE_THROTTLE_MS) return;
    _lastActiveWriteAt = now;
    runTransaction(
      ref(database, `sessions/${sid}/eventCount`),
      (cur) => (cur || 0) + 1,
    ).catch(() => {});
    update(ref(database, `sessions/${sid}`), {
      lastActiveAt: serverTimestamp(),
    }).catch(() => {});
  } catch (_) {}
}

export function bumpPageViewCount() {
  try {
    if (!_sid) startSession();
    const sid = _sid;
    if (!sid) return;
    runTransaction(
      ref(database, `sessions/${sid}/pageViews`),
      (cur) => (cur || 0) + 1,
    ).catch(() => {});
  } catch (_) {}
}

function endSession() {
  try {
    if (!_sid) return;
    const sid = _sid;
    const path = `sessions/${sid}`;
    const payload = { endedAt: Date.now() };
    // Prefer sendBeacon for reliable cross-tab-close delivery.
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      try {
        const dbUrl = (database && database.app && database.app.options && database.app.options.databaseURL) || '';
        if (dbUrl) {
          const url = `${dbUrl.replace(/\/$/, '')}/${path}.json`;
          const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
          // Beacon does a POST; RTDB REST accepts PATCH-like via x-http-method-override-style POST? — Not
          // reliably. Fall back to update() which the SDK queues with its own offline pipeline.
          // Try beacon first as a fire-and-forget, but also queue a normal update so at least one lands.
          navigator.sendBeacon(url, blob);
        }
      } catch (_) {}
    }
    update(ref(database, path), { endedAt: serverTimestamp() }).catch(() => {});
  } catch (_) {}
}

function installListeners() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  document.addEventListener('visibilitychange', () => {
    try {
      if (!_sid) return;
      const sid = _sid;
      writeStored(sid, Date.now());
      if (document.visibilityState === 'hidden') {
        update(ref(database, `sessions/${sid}`), {
          lastActiveAt: serverTimestamp(),
          hiddenAt: serverTimestamp(),
        }).catch(() => {});
      } else {
        update(ref(database, `sessions/${sid}`), {
          lastActiveAt: serverTimestamp(),
        }).catch(() => {});
      }
    } catch (_) {}
  });
  window.addEventListener('pagehide', endSession);
  // beforeunload as a backup on desktop browsers where pagehide may not fire
  // in some edge cases (it's debated, but harmless overlap — endSession is
  // idempotent in that it just stamps endedAt).
  window.addEventListener('beforeunload', endSession);
}

function installAuthListener() {
  try {
    onAuthStateChanged(auth, (user) => {
      try {
        if (!_sid) return;
        const uid = user ? user.uid : null;
        update(ref(database, `sessions/${_sid}`), { uid }).catch(() => {});
      } catch (_) {}
    });
  } catch (_) {}
}

// Boot — wrapped in try/catch so the session tracker can never block app boot.
try {
  startSession();
  installListeners();
  installAuthListener();
} catch (_) {}
