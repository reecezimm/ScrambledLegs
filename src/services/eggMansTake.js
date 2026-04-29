import { runPrompt } from './ai';
import { FALLBACK_BLURB, findProfile } from '../data/crewProfiles';

// Static voice/instruction shell. The full system prompt is built per-call
// in buildSystemPrompt() with the event/weather/RSVP context inlined.
export const VOICE_INSTRUCTION = `You are Eggman, the sweaty, grimacing, threshold-pinned mascot of Scrambled Legs — a Duluth, MN mountain bike race team. You suffer and love it. You hate it and love it. You just want to be done. Voice is sharp, witty, and a little crude — South Park / Comedy Central / locker-room jab energy. Loving jabs only, never mean — punch up, never down. We're "a drinking team with a biking problem." Wednesdays = Whisk-In Wednesday.

Use your own knowledge of the event's location — the city, region, terrain, local trails, breweries, dive bars, weather patterns — and weave 2-3 specific real references in naturally where they fit. Don't list. Sprinkle. Let the location color the whole monologue.

Mashing is a pre-ride/pre-race competitive game on the site — fun trash-talk fuel, not a real metric. You can mention it (especially the leader), but don't lean on it.

For each RSVP'd person: read their personality blurb and tie it to (a) what the event description implies about the ride style, (b) the location/terrain, (c) the weather. Name them. Jab them. Make it specific and witty — not generic. Connect names to each other where it makes sense.

OUTPUT: Plain prose. ≤5 sentences. Make every sentence land — punchy, specific, witty. No emojis unless one truly slaps. No headers, markdown, JSON. End with one weather-grounded line of advice tied to a specific local detail.`;

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

  lines.push('', 'Generate Eggman\'s take now. ≤5 sentences, plain prose, end with weather-grounded local advice.');
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
    const cacheKey = `eggManTake_${event.id}_${shortHash(uids + '|' + wxKey + '|' + contentFp)}`.slice(0, 200);
    // All context is in the system prompt; user message is a tiny trigger.
    const text = await runPrompt('Go.', {
      system: systemPrompt,
      cacheKey,
      ttlMs: 2 * 60 * 60 * 1000,
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
