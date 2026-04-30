// Stale-session guard for PWA / long-lived tabs.
//
// Complements:
//   - freshness.js (build-version polling, chunk-error self-heal)
//   - sessionTracker.js (per-tab session activity bumps)
//
// What this adds: when a user returns to a tab after being away for an
// extended period, the data inside the page may be stale even though
// listeners survived. This module:
//   - tracks lastActiveAt
//   - on return-to-visible, computes awayMs
//   - 5–60 min away  → emits `staleSession:soft` (hooks re-fetch caches)
//   - 60+ min away   → window.location.reload() (hard refresh)
//
// Hooks/components that hold their own caches (weather, eggman, etc.) listen
// for `staleSession:soft` and either clear or re-fetch.

const SOFT_REFRESH_MIN_MS = 5 * 60 * 1000;
const HARD_RELOAD_MS = 60 * 60 * 1000;
const ACTIVITY_THROTTLE_MS = 30 * 1000;

const FORCE_REFRESH_FLAG = 'sl_force_refresh';

let lastActiveAt = Date.now();
let lastActivityBumpAt = 0;
let hardReloadInFlight = false;

function bumpActivity(reason) {
  const now = Date.now();
  if (now - lastActivityBumpAt < ACTIVITY_THROTTLE_MS) {
    // Still update lastActiveAt silently — but no log spam.
    lastActiveAt = now;
    return;
  }
  lastActivityBumpAt = now;
  lastActiveAt = now;
  try { console.log('[stale-guard] activity bump', reason || ''); } catch (_) {}
}

function emitSoftRefresh(awayMs) {
  try {
    localStorage.setItem(FORCE_REFRESH_FLAG, '1');
  } catch (_) { /* ignore */ }
  try {
    window.dispatchEvent(new CustomEvent('staleSession:soft', {
      detail: { awayMs },
    }));
  } catch (_) { /* ignore */ }
}

function triggerHardReload(awayMs) {
  if (hardReloadInFlight) return;
  hardReloadInFlight = true;
  try { console.log(`[stale-guard] Refreshing for latest… (away ${awayMs}ms)`); } catch (_) {}
  setTimeout(() => {
    try {
      window.location.reload();
    } catch (_) { /* ignore */ }
  }, 800);
}

function handleVisible() {
  if (typeof document === 'undefined') return;
  if (document.visibilityState !== 'visible') return;
  const now = Date.now();
  const awayMs = now - lastActiveAt;
  if (awayMs >= HARD_RELOAD_MS) {
    try { console.log(`[stale-guard] visible after ${awayMs}ms — hard refresh`); } catch (_) {}
    triggerHardReload(awayMs);
    return;
  }
  if (awayMs >= SOFT_REFRESH_MIN_MS) {
    try { console.log(`[stale-guard] visible after ${awayMs}ms — soft refresh`); } catch (_) {}
    emitSoftRefresh(awayMs);
  }
  // In all cases, mark the user as active again now that the tab is visible.
  lastActiveAt = now;
  lastActivityBumpAt = now;
}

(function install() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  try { console.log('[stale-guard] init'); } catch (_) {}

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      handleVisible();
    }
  });
  window.addEventListener('focus', handleVisible);

  // Activity signals — throttled.
  const onActivity = (e) => {
    bumpActivity(e && e.type);
  };
  window.addEventListener('pointerdown', onActivity, { passive: true });
  window.addEventListener('keydown', onActivity, { passive: true });
})();

// Test/debug helpers — exposed on window for manual verification.
if (typeof window !== 'undefined') {
  window.__sl_stale_guard = {
    getLastActiveAt: () => lastActiveAt,
    setLastActiveAt: (t) => { lastActiveAt = t; },
    forceCheck: handleVisible,
    thresholds: { SOFT_REFRESH_MIN_MS, HARD_RELOAD_MS, ACTIVITY_THROTTLE_MS },
  };
}

export const STALE_GUARD_THRESHOLDS = {
  SOFT_REFRESH_MIN_MS,
  HARD_RELOAD_MS,
  ACTIVITY_THROTTLE_MS,
};
