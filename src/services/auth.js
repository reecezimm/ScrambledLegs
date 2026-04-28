import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { ref, update, serverTimestamp, get } from 'firebase/database';
import { auth, database } from './firebase';
import { logEvent } from './analytics';
import { backfillTokenOwnership } from './messaging';

export const ADMIN_UIDS = [];
export const ADMIN_EMAILS = ['gm@thescrambledlegs.com', 'coach@thescrambledlegs.com'];

function emailLocalPart(email) {
  if (!email) return '';
  const at = email.indexOf('@');
  return at > 0 ? email.slice(0, at) : email;
}

function isAdminEmail(email) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

async function maybeAutoPromote(user) {
  if (!user || !user.email) return;
  if (!isAdminEmail(user.email)) return;
  try {
    const snap = await get(ref(database, `userProfiles/${user.uid}/isAdmin`));
    if (snap.val() === true) return;
    await update(ref(database, `userProfiles/${user.uid}`), { isAdmin: true });
  } catch (_) {
    // Rules permit this only when auth.token.email matches; ignore otherwise.
  }
}

export async function signUp(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const { uid } = cred.user;
  await update(ref(database, `userProfiles/${uid}`), {
    email,
    displayName: emailLocalPart(email),
    createdAt: serverTimestamp(),
    lastSeenAt: serverTimestamp(),
  });
  if (isAdminEmail(email)) {
    update(ref(database, `userProfiles/${uid}`), { isAdmin: true }).catch(() => {});
  }
  logEvent('signup_completed', { uid });
  backfillTokenOwnership(cred.user).catch(() => {});
  return cred.user;
}

export async function signIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const { uid } = cred.user;
  update(ref(database, `userProfiles/${uid}`), { lastSeenAt: serverTimestamp() }).catch(() => {});
  if (isAdminEmail(cred.user.email)) {
    maybeAutoPromote(cred.user).catch(() => {});
  }
  logEvent('signin_completed', { uid });
  backfillTokenOwnership(cred.user).catch(() => {});
  return cred.user;
}

export function signOutUser() {
  return signOut(auth);
}

export async function sendResetEmail(email) {
  await sendPasswordResetEmail(auth, email);
  logEvent('password_reset_requested', { email });
}

export function useCurrentUser() {
  const [state, setState] = useState({ user: null, isAdmin: false, loading: true });
  useEffect(() => {
    let cancelled = false;
    let currentUid = null;
    const unsub = onAuthStateChanged(auth, async (user) => {
      currentUid = user ? user.uid : null;
      if (!user) {
        if (!cancelled) setState({ user: null, isAdmin: false, loading: false });
        return;
      }
      const emailAdmin = isAdminEmail(user.email);
      let isAdmin = ADMIN_UIDS.includes(user.uid) || emailAdmin;
      // Optimistic — show signed-in immediately, then refine isAdmin async.
      if (!cancelled) setState({ user, isAdmin, loading: false });
      if (emailAdmin) {
        maybeAutoPromote(user).catch(() => {});
      }
      if (!isAdmin) {
        try {
          const snap = await get(ref(database, `userProfiles/${user.uid}/isAdmin`));
          if (!cancelled && currentUid === user.uid && snap.val() === true) {
            setState({ user, isAdmin: true, loading: false });
          }
        } catch (_) {}
      }
    });
    return () => { cancelled = true; unsub(); };
  }, []);
  return state;
}

export function friendlyAuthError(code) {
  switch (code) {
    case 'auth/invalid-email': return 'That email address looks invalid.';
    case 'auth/user-disabled': return 'This account has been disabled.';
    case 'auth/user-not-found': return 'No account found for that email.';
    case 'auth/wrong-password': return 'Wrong password. Try again.';
    case 'auth/invalid-credential': return 'Email or password is incorrect.';
    case 'auth/email-already-in-use': return 'An account already exists for that email.';
    case 'auth/weak-password': return 'Password should be at least 6 characters.';
    case 'auth/too-many-requests': return 'Too many attempts. Try again in a moment.';
    case 'auth/network-request-failed': return 'Network error. Check your connection.';
    case 'auth/missing-password': return 'Please enter a password.';
    default: return 'Something went wrong. Please try again.';
  }
}
