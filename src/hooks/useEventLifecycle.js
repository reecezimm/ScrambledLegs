// Timezone-anchored lifecycle helpers.
// Verbatim port from calendar-mockup.html — pure functions, no DOM deps.

const TIMEZONE = 'America/Chicago';
export const LIFECYCLE = { BEERS_AFTER_MS: 2 * 60 * 60 * 1000 };

export function tzOffsetMs(timestamp, tz) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const parts = fmt.formatToParts(new Date(timestamp));
  const get = (t) => parseInt(parts.find(p => p.type === t).value, 10);
  const fakeUtc = Date.UTC(get('year'), get('month') - 1, get('day'),
                            get('hour'), get('minute'), get('second'));
  return fakeUtc - timestamp;
}

export function ctMidnightOf(year, month, day) {
  const guessUtc = Date.UTC(year, month - 1, day, 12, 0, 0);
  const offset = tzOffsetMs(guessUtc, TIMEZONE);
  return Date.UTC(year, month - 1, day, 0, 0, 0) - offset;
}

export function nextCtMidnightAfter(eventStart) {
  const dateStr = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date(eventStart));
  const [y, m, d] = dateStr.split('-').map(Number);
  return ctMidnightOf(y, m, d + 1);
}

export function getStatus(ev) {
  const now = Date.now();
  if (now < ev.start) return 'upcoming';
  if (now < ev.start + LIFECYCLE.BEERS_AFTER_MS) return 'in_progress';
  if (now < nextCtMidnightAfter(ev.start)) return 'beers';
  return 'archived';
}

export const STATUS_LABEL = {
  upcoming: 'UPCOMING',
  in_progress: 'IN PROGRESS',
  beers: 'BEERS BEING CONSUMED',
};

export function fmtCountdown(ms) {
  if (ms <= 0) return null;
  const totalSec = Math.floor(ms / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n) => String(n).padStart(2, '0');
  if (d > 0) return `${d}d · ${pad(h)}h · ${pad(m)}m · ${pad(s)}s`;
  if (h > 0) return `${pad(h)}h · ${pad(m)}m · ${pad(s)}s`;
  return `${pad(m)}m · ${pad(s)}s`;
}

export function fmtTimeSince(ms) {
  const totalMin = Math.floor(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h > 0) return `${h}h ${m} min in`;
  return `${m} min in`;
}

export const fmtDateLong = (ts) =>
  new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(ts));
export const fmtTime = (ts) =>
  new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(ts));
export const fmtDayNum = (ts) => new Date(ts).getDate();
export const fmtMonth = (ts) =>
  new Intl.DateTimeFormat(undefined, { month: 'short' }).format(new Date(ts)).toUpperCase();
export const fmtWeekday = (ts) =>
  new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(new Date(ts));
export const fmtCount = (n) => new Intl.NumberFormat().format(n || 0);

export const WEATHER_HORIZON_DAYS = 10;
export function weatherInRange(eventStartMs) {
  return (eventStartMs - Date.now()) / 86400000 <= WEATHER_HORIZON_DAYS;
}

export function directionsUrl(ev) {
  if (!ev.startLoc) return '#';
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const sameLoc = ev.startLoc.lat === (ev.endLoc && ev.endLoc.lat) &&
                  ev.startLoc.lng === (ev.endLoc && ev.endLoc.lng);
  if (isIOS) return `https://maps.apple.com/?daddr=${ev.startLoc.lat},${ev.startLoc.lng}`;
  if (sameLoc || !ev.endLoc)
    return `https://www.google.com/maps/dir/?api=1&destination=${ev.startLoc.lat},${ev.startLoc.lng}`;
  return `https://www.google.com/maps/dir/?api=1&origin=${ev.startLoc.lat},${ev.startLoc.lng}&destination=${ev.endLoc.lat},${ev.endLoc.lng}`;
}

export function googleCalUrl(ev) {
  const fmt = (ts) => new Date(ts).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.name,
    dates: `${fmt(ev.start)}/${fmt(ev.start + 2 * 60 * 60 * 1000)}`,
    details: `${ev.description || ''}\n\nhttps://thescrambledlegs.com/events/${ev.id}`,
    location: ev.startLoc ? ev.startLoc.label : '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function outlookCalUrl(ev) {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: ev.name,
    startdt: new Date(ev.start).toISOString(),
    enddt: new Date(ev.start + 2 * 60 * 60 * 1000).toISOString(),
    body: `${ev.description || ''}\n\nhttps://thescrambledlegs.com/events/${ev.id}`,
    location: ev.startLoc ? ev.startLoc.label : '',
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function downloadIcs(ev) {
  const fmtIcs = (ts) => new Date(ts).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const start = fmtIcs(ev.start);
  const end = fmtIcs(ev.start + 2 * 60 * 60 * 1000);
  const body = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Scrambled Legs//Calendar//EN\nBEGIN:VEVENT\nUID:${ev.id}@thescrambledlegs.com\nDTSTAMP:${fmtIcs(Date.now())}\nDTSTART:${start}\nDTEND:${end}\nSUMMARY:${ev.name}\nDESCRIPTION:${(ev.description || '').replace(/\n/g, '\\n')}\nLOCATION:${ev.startLoc ? ev.startLoc.label : ''}\nGEO:${ev.startLoc ? ev.startLoc.lat : ''};${ev.startLoc ? ev.startLoc.lng : ''}\nURL:https://thescrambledlegs.com/events/${ev.id}\nEND:VEVENT\nEND:VCALENDAR`;
  const blob = new Blob([body], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${ev.id}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

export async function shareEvent(ev) {
  const url = `https://thescrambledlegs.com/events/${ev.id}`;
  const title = `${ev.name} · Scrambled Legs`;
  const text = `${ev.name}\n🗓  ${fmtDateLong(ev.start)} · ${fmtTime(ev.start)}\n📍 ${ev.startLoc ? ev.startLoc.label : ''}${ev.rideLeader ? `\n🥚 Led by ${ev.rideLeader.name}` : ''}`;
  if (navigator.share) {
    try { await navigator.share({ title, text, url }); return; } catch (e) { return; }
  }
  const fallback = `${title}\n\n${text}\n\n${url}`;
  try {
    await navigator.clipboard.writeText(fallback);
    alert('Link copied to clipboard');
  } catch (e) {
    prompt('Copy this:', fallback);
  }
}

export function routeSource(url) {
  if (!url) return null;
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (host.includes('strava')) return 'Strava';
    if (host.includes('ridewithgps')) return 'Ride with GPS';
    if (host.includes('trailforks')) return 'Trailforks';
    if (host.includes('komoot')) return 'Komoot';
    if (host.includes('garmin')) return 'Garmin Connect';
    if (url.toLowerCase().endsWith('.gpx')) return 'GPX file';
    return null;
  } catch { return null; }
}
