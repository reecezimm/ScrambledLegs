import { ref, push, set, serverTimestamp } from 'firebase/database';
import { auth, database } from './firebase';
import { getDeviceId } from './deviceId';
import { getSessionId, bumpEventCount } from './sessionTracker';
import { APP_VERSION, BUILD_NUM, BUILD_SHA } from './buildInfo';

let _firstEventFired = false;

export function logEvent(name, props = {}) {
  if (!name) return;
  try {
    const r = push(ref(database, 'analyticsEvents'));
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const includeReferrer = !_firstEventFired;
    _firstEventFired = true;
    const payload = {
      name: String(name),
      props: props || {},
      uid: (auth.currentUser && auth.currentUser.uid) || null,
      deviceId: getDeviceId(),
      sessionId: getSessionId(),
      path,
      version: APP_VERSION,
      buildNum: BUILD_NUM,
      buildSha: BUILD_SHA,
      ts: serverTimestamp(),
    };
    if (includeReferrer && typeof document !== 'undefined') {
      payload.referrer = document.referrer || '';
    }
    set(r, payload).catch(() => {});
    // Fire-and-forget session bookkeeping. Throttled internally.
    try { bumpEventCount(); } catch (_) {}
  } catch (_) {}
}
