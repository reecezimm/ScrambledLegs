// Stable per-browser device identity, persisted in localStorage.
//
// Same ID survives across sessions and across signed-in / signed-out states,
// so we can correlate "anon mashing on phone Tue" with "signed-in account on
// phone Wed". Cleared only when the user clears site data.

const KEY = 'sl_device_id';

function fallbackUuid() {
  // RFC4122-ish v4 from Math.random — fine for analytics correlation, not
  // crypto. Used only when crypto.randomUUID is missing (very old browsers).
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

let _cached = null;

export function getDeviceId() {
  if (_cached) return _cached;
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = (typeof crypto !== 'undefined' && crypto.randomUUID)
        ? crypto.randomUUID()
        : fallbackUuid();
      localStorage.setItem(KEY, id);
    }
    _cached = id;
    return id;
  } catch (_) {
    // localStorage unavailable (private mode, etc) — generate a per-tab ID.
    _cached = fallbackUuid();
    return _cached;
  }
}
