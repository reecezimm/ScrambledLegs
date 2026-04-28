// Admin auth — deliberately low-security, password-gated only.
// User has accepted this tradeoff. No bcrypt, no Firebase Auth — just a
// plaintext compare against the constant below.
//
// The session flag lives in sessionStorage so it auto-clears when the tab is
// closed. Same tab (e.g., reload) keeps you signed in.

export const ADMIN_PASSWORD = "OG scrambled crew";

const SESSION_KEY = 'sl_admin_authed';

export function isAuthed() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch (e) {
    return false;
  }
}

export function signIn(password) {
  if (password === ADMIN_PASSWORD) {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch (e) {
      // ignore — sessionStorage may be unavailable in some private modes
    }
    return true;
  }
  return false;
}

export function signOut() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (e) {
    // ignore
  }
}
