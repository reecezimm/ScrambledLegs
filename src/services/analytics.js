import { ref, push, set, serverTimestamp } from 'firebase/database';
import { auth, database } from './firebase';

export function logEvent(name, props = {}) {
  if (!name) return;
  try {
    const r = push(ref(database, 'analyticsEvents'));
    set(r, {
      name: String(name),
      props: props || {},
      uid: (auth.currentUser && auth.currentUser.uid) || null,
      ts: serverTimestamp(),
    }).catch(() => {});
  } catch (_) {}
}
