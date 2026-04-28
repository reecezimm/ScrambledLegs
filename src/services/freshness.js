// Cache mismatch self-heal + new-version detection.
//
// Two layers:
//   1. Chunk-load error → force a one-shot reload. Fixes the classic
//      stale-index.html-referencing-deleted-chunk-hash white screen.
//   2. On window focus / 5-min interval, fetch /asset-manifest.json (CRA
//      always emits this) and compare its main.js hash to the one we booted
//      with. If different, the user is on a stale page → fire a
//      `freshness:update-available` window event so the UI can prompt a
//      reload (or auto-reload after N seconds of being foregrounded).

const RELOAD_FLAG = 'sl_chunk_reload_at';
const RELOAD_COOLDOWN_MS = 30 * 1000;

function safeReload() {
  // Avoid an infinite reload loop if something else is broken.
  try {
    const last = parseInt(sessionStorage.getItem(RELOAD_FLAG) || '0', 10);
    if (Date.now() - last < RELOAD_COOLDOWN_MS) return;
    sessionStorage.setItem(RELOAD_FLAG, String(Date.now()));
  } catch (_) { /* ignore */ }
  window.location.reload();
}

function isChunkLoadError(msg) {
  if (!msg) return false;
  const s = String(msg);
  return /Loading chunk [\w-]+ failed/i.test(s) ||
    /Loading CSS chunk [\w-]+ failed/i.test(s) ||
    /ChunkLoadError/i.test(s);
}

(function installSelfHeal() {
  if (typeof window === 'undefined') return;
  window.addEventListener('error', (e) => {
    if (isChunkLoadError(e && (e.message || (e.error && e.error.message)))) {
      safeReload();
    }
  });
  window.addEventListener('unhandledrejection', (e) => {
    const reason = e && e.reason;
    const msg = reason && (reason.message || String(reason));
    if (isChunkLoadError(msg)) safeReload();
  });
})();

let bootHash = null;

async function readManifestHash() {
  try {
    const url = `${process.env.PUBLIC_URL || ''}/asset-manifest.json?ts=${Date.now()}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    const main = (json.files && (json.files['main.js'] || json.files['main.css'])) || '';
    return main || null;
  } catch (_) {
    return null;
  }
}

async function checkFreshness() {
  if (typeof document === 'undefined') return;
  if (document.visibilityState !== 'visible') return;
  const current = await readManifestHash();
  if (!current) return;
  if (!bootHash) {
    bootHash = current;
    return;
  }
  if (current !== bootHash) {
    try {
      window.dispatchEvent(new CustomEvent('freshness:update-available', {
        detail: { from: bootHash, to: current },
      }));
    } catch (_) { /* ignore */ }
  }
}

(function installVersionCheck() {
  if (typeof window === 'undefined') return;
  // Initial bootstrapped hash, after first paint.
  setTimeout(() => { checkFreshness(); }, 2000);
  window.addEventListener('focus', checkFreshness);
  document.addEventListener('visibilitychange', checkFreshness);
  setInterval(checkFreshness, 5 * 60 * 1000);
})();
