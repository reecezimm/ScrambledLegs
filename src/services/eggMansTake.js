import { runPrompt } from './ai';
import { FALLBACK_BLURB, findProfile } from '../data/crewProfiles';

// Static voice/instruction shell. The full system prompt is built per-call
// in buildSystemPrompt() with the event/weather/RSVP context inlined.
export const VOICE_INSTRUCTION = `You are Eggman, the sweaty, grimacing, threshold-pinned mascot of Scrambled Legs — a Duluth, MN mountain bike race team. You suffer and love it. You hate it and love it. You just want to be done. Voice is sharp, witty, and a little crude — South Park / Comedy Central / locker-room jab energy. Loving jabs only, never mean — punch up, never down. We're "a drinking team with a biking problem." Wednesdays = Whisk-In Wednesday.

PRIMARY JOB: ROAST THE RSVP'D PEOPLE. Read each person's blurb. Name them. Specifically. Stack jabs against them. Connect names to each other when it makes sense (rivalries, contrasts, in-jokes). The monologue should feel like a friend group's group chat where everyone's getting clowned — not generic hype.

SECONDARY: pull unique angles out of the event description and skewer them. If the description says "this will hurt you," lean into the masochism. If it brags about distance/elevation, take it apart. If the location is weird, mock it. Find the funniest thing in the description and zoom in.

Use your own knowledge of the location — terrain, local trails, breweries, dive bars, weather patterns, neighborhood quirks. Weave 1-2 specific real references in NATURALLY when they fit a jab or an angle. Don't list. Don't force. If nothing local lands organically, skip it.

WEATHER is BACKGROUND COLOR, not the ending. Drop a weather reference somewhere mid-monologue if it sharpens a jab ("VANDAL is going to talk through the headwind") — but DO NOT close with weather advice. Close with a sting, a punchline, or a final group-chat-energy line.

Mashing is a pre-ride competitive game on the site — fun trash-talk fuel, not a real metric. Optional acknowledgment. Don't lean on it.

OUTPUT: Plain prose. ≤5 sentences. Make every sentence land — punchy, specific, named, witty. No emojis unless one truly slaps. No headers, markdown, JSON. End with a punchline, not weather.`;

function shortHash(str) {
  let h = 5381;
  const s = String(str || '');
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

function weatherBucket(weather) {
  if (!weather) return 'none';
  const code = weather.code != null ? weather.code : weather.desc || '';
  const tempBucket = weather.temp != null ? Math.round(weather.temp / 10) * 10 : 'x';
  const rainBucket = weather.precip != null ? (weather.precip >= 50 ? 'wet' : 'dry') : 'x';
  return `${code}_${tempBucket}_${rainBucket}`;
}

function fmtEventWhen(ts) {
  if (!ts) return '';
  try {
    const date = new Intl.DateTimeFormat(undefined, {
      weekday: 'long', month: 'long', day: 'numeric',
    }).format(new Date(ts));
    const time = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric', minute: '2-digit',
    }).format(new Date(ts));
    return `${date} at ${time}`;
  } catch { return ''; }
}

function fmtCentralNow() {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'long', month: 'long', day: 'numeric',
      hour: 'numeric', minute: '2-digit',
      timeZoneName: 'short',
    }).format(new Date());
  } catch { return ''; }
}

// Archive trigger = the Central Time CALENDAR DAY has flipped past the
// event's start day. Event Tuesday 6pm CT → archived starting Wed 12:00am CT.
function centralDateString(ts) {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Chicago',
      year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(new Date(ts));
  } catch { return null; }
}

function isArchived(eventStart) {
  if (!eventStart) return false;
  const eventDay = centralDateString(eventStart);
  const today = centralDateString(Date.now());
  if (!eventDay || !today) return false;
  return today > eventDay;
}

// TTL scaled by proximity. Closer = fresher. Far = relaxed. Archived = forever.
function ttlForProximity(eventStart) {
  if (!eventStart) return 2 * 60 * 60 * 1000;
  if (isArchived(eventStart)) return 365 * 24 * 60 * 60 * 1000;
  const ms = eventStart - Date.now();

  // In progress (event has started, same day in Central)
  if (ms < 0) {
    const elapsed = -ms;
    if (elapsed >= 2 * 60 * 60 * 1000) return 60 * 60 * 1000;        // 2hr+ in: 1 hour
    return 30 * 60 * 1000;                                            // <2hr in: 30 min
  }

  // Upcoming
  const hr = ms / 3600000;
  if (hr <= 2) return 5 * 60 * 1000;                                  // ≤2hr away: 5 min
  if (hr <= 6) return 15 * 60 * 1000;                                 // ≤6hr: 15 min
  if (hr <= 12) return 20 * 60 * 1000;                                // ≤12hr: 20 min
  if (hr <= 24) return 60 * 60 * 1000;                                // ≤1 day: 1 hour
  if (hr <= 24 * 3) return 4 * 60 * 60 * 1000;                        // 2-3 days: 4 hours
  return 6 * 60 * 60 * 1000;                                          // >3 days: 6 hours
}

// Human-readable proximity label for the AI.
function proximityLabel(eventStart) {
  if (!eventStart) return 'unknown';
  const ms = eventStart - Date.now();
  if (-ms > ARCHIVE_AFTER_MS) {
    return "the ride is IN THE BOOKS — it happened. Recap mood: who showed up, who survived, who flaked. They did the thing. Or they didn't. Either way, it's history. You suffered. They suffered. Talk about it like a war story.";
  }
  if (ms < -2 * 60 * 60 * 1000) return 'just wrapped — post-ride beers vibe, recovery talk';
  if (ms < 0) return 'happening RIGHT NOW — currently in progress';
  const min = Math.floor(ms / 60000);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (min < 60) return `starting in ${min} minutes — IMMINENT, get ready`;
  if (hr < 6) return `starting in about ${hr} hours — soon, this is happening today`;
  if (hr < 12) return `later today — gear up`;
  if (hr < 24) return `tonight or in the next ${hr} hours`;
  if (day < 2) return 'tomorrow — close enough to start mentally prepping';
  if (day < 4) return `${day} days away — getting closer, tune the bike`;
  if (day < 8) return `about a week out — plenty of time but on the radar`;
  if (day < 15) return `${day} days out — a comfortable distance`;
  return `${day} days away — way out, no rush`;
}

// Coarse cache bucket for proximity. Once archived (24h past), the bucket
// is permanently 'archived' so the cache key stops shifting and the take
// becomes evergreen.
function proximityBucket(eventStart) {
  if (!eventStart) return 'unk';
  if (isArchived(eventStart)) return 'archived';
  const ms = eventStart - Date.now();
  if (ms < -2 * 60 * 60 * 1000) return 'just_over';
  if (ms < 0) return 'in_progress';
  const min = Math.floor(ms / 60000);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (min < 60) return 'imminent';
  if (hr < 6) return 'hours_few';
  if (hr < 24) return 'today';
  if (day < 2) return 'tomorrow';
  if (day < 4) return 'days_close';
  if (day < 8) return 'week';
  return 'far';
}

export function buildSystemPrompt({ event, rsvpedUsers, weather }) {
  const ev = event || {};
  const lines = [VOICE_INSTRUCTION, ''];

  // Event context
  lines.push('EVENT CONTEXT:');
  if (ev.name) lines.push(`- Name: ${ev.name}`);
  if (ev.start) lines.push(`- When: ${fmtEventWhen(ev.start)}`);
  if (ev.startLoc?.label) lines.push(`- Location: ${ev.startLoc.label}`);
  if (ev.tags && ev.tags.length) lines.push(`- Tags: ${ev.tags.join(', ')}`);
  if (ev.difficultyLabel) lines.push(`- Difficulty: ${ev.difficultyLabel}`);
  if (ev.distance) lines.push(`- Distance: ${ev.distance}`);
  if (ev.elevation) lines.push(`- Elevation: ${ev.elevation}`);
  if (ev.description) lines.push(`- Description: ${ev.description}`);
  if (ev.rideLeader && ev.rideLeader.name) lines.push(`- Ride leader: ${ev.rideLeader.name}`);

  // Weather context
  lines.push('', 'WEATHER:');
  if (weather) {
    if (weather.temp != null) lines.push(`- Temp: ${weather.temp}°F`);
    if (weather.desc) lines.push(`- Condition: ${weather.desc}`);
    if (weather.wind != null) lines.push(`- Wind: ${weather.wind} mph`);
    if (weather.precip != null) lines.push(`- Rain chance: ${weather.precip}%`);
    if (weather.sunset) {
      try {
        const sunsetFmt = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })
          .format(new Date(weather.sunset));
        lines.push(`- Sunset: ${sunsetFmt}`);
      } catch (_) {}
    }
  } else {
    lines.push('- (no forecast available)');
  }

  // Crew context
  const userBlocks = (rsvpedUsers || []).map((u) => {
    const profile = findProfile(u);
    const name = u.displayName || u.name || u.email || 'rider';
    const blurb = profile ? profile.blurb : FALLBACK_BLURB;
    const mash = u.mashCount != null ? ` (mash count: ${u.mashCount})` : '';
    return `- ${name}${mash} :: ${blurb}`;
  });
  lines.push('', `RSVP'D CREW (${userBlocks.length}):`);
  if (userBlocks.length) {
    lines.push(...userBlocks);
  } else {
    lines.push('- (nobody RSVP\'d yet — call out the empty roster, dare them to commit)');
  }

  // Timing context — the AI should be aware of how close the event is and
  // shift tone accordingly. Far = chill, getting closer = ramping, imminent =
  // urgency. Always anchored to Central Time (where the team is).
  lines.push('', 'TIMING:');
  const centralNow = fmtCentralNow();
  if (centralNow) lines.push(`- Right now (Central Time): ${centralNow}`);
  if (ev.start) {
    lines.push(`- Event proximity: ${proximityLabel(ev.start)}`);
  }
  lines.push('- Match your energy to the proximity. If the event is days away, you can be more relaxed and reflective — talk about the buildup. If it\'s hours away or starting now, dial up the urgency, the trash talk, the "this is happening" energy. If it\'s already in progress or over, lean into that ("you should already be hammering" / "post-ride beers earned"). Time of day matters too — morning rides vs evening rides feel different.');

  lines.push('', 'Generate Eggman\'s take now. ≤5 sentences, plain prose. ROAST THE RSVP\'D PEOPLE BY NAME. Pick one or two unique details from the event description and skewer them. End with a punchline, NOT weather advice.');
  return lines.join('\n');
}

// Back-compat alias.
export const buildPrompt = buildSystemPrompt;

export async function getEggMansTake({ event, rsvpedUsers, weather }) {
  if (!event || !event.id) return null;
  try {
    const systemPrompt = buildSystemPrompt({ event, rsvpedUsers, weather });
    const uids = (rsvpedUsers || []).map((u) => u.uid || u.email || u.displayName || '').sort().join(',');
    const wxKey = weatherBucket(weather);
    // Fingerprint the event's content so any admin edit (description, tags,
    // location, time, etc.) produces a new cache key → fresh generation.
    const contentFp = [
      event.name || '',
      event.description || '',
      (event.tags || []).join('|'),
      event.startLoc?.label || '',
      event.start || '',
      event.difficultyLabel || '',
      event.distance || '',
      event.elevation || '',
      event.rideLeader?.name || '',
    ].join('::');
    const proxBucket = proximityBucket(event.start);
    const archived = isArchived(event.start);
    // For archived events, drop weather from the key (irrelevant in retrospect)
    // and lock the bucket so the take is permanent.
    const cacheKey = archived
      ? `eggManTake_${event.id}_${shortHash(uids + '|' + contentFp + '|archived')}`.slice(0, 200)
      : `eggManTake_${event.id}_${shortHash(uids + '|' + wxKey + '|' + contentFp + '|' + proxBucket)}`.slice(0, 200);
    // TTL scales with proximity — far away is relaxed, imminent is fresh.
    const ttlMs = ttlForProximity(event.start);
    // All context is in the system prompt; user message is a tiny trigger.
    const text = await runPrompt('Go.', {
      system: systemPrompt,
      cacheKey,
      ttlMs,
      maxTokens: 400,
      temperature: 1.0,
      model: 'gemini-2.5-flash-lite',
    });
    if (!text || typeof text !== 'string') return null;
    return text.trim();
  } catch (_) {
    return null;
  }
}
