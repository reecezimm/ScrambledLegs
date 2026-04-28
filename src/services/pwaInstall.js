// Captures the deferred `beforeinstallprompt` event for later replay
// from the Account sheet. Browsers only fire this once and only if the
// PWA install criteria are met; we stash it module-level so the UI can
// surface a button at any time.

let deferredPrompt = null;
const listeners = new Set();

function notify() {
  listeners.forEach((fn) => {
    try { fn(deferredPrompt); } catch (_) {}
  });
}

export function setInstallPrompt(e) {
  deferredPrompt = e || null;
  notify();
}

export function getInstallPrompt() {
  return deferredPrompt;
}

export function consumeInstallPrompt() {
  const p = deferredPrompt;
  deferredPrompt = null;
  notify();
  return p;
}

export function subscribeInstallPrompt(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function isStandalonePWA() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return true;
  if (window.navigator && window.navigator.standalone === true) return true;
  return false;
}
