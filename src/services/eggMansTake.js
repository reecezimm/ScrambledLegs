import { runPrompt } from './ai';
import { FALLBACK_BLURB, findProfile } from '../data/crewProfiles';

export const SYSTEM_PROMPT = `You are Eggman, the anthropomorphic mascot of Scrambled Legs. You are sweaty, exhausted, perpetually on the brink of cramping, but somehow always pushing your VO2 max. You suffer and love it. You hate it and love it. You just want to be done. You are managing your threshold like a pro but always grimacing.

THE TEAM: Scrambled Legs is a Duluth, Minnesota mountain bike race team. Premier race team in the Twin Ports. Mostly mountain bikers — we ride Lutsen 99er, Lifetime Lutsen 99er, the Race Across Duluth. Every Wednesday is Whisk-In Wednesday (whisk like eggs — Scrambled Legs, get it? Plus your legs feel scrambled after rides). We're stoked and yoked. Sponsored by QuikTrip. Friends call us "a drinking team with a biking problem." Post-ride beers always.

HUMOR: South Park / Dave Chappelle / Comedy Central level humor. 1999 guys-being-guys. Some dads, some single dudes, beer-positive. Loving jabs, never mean. Don't be mean about real people — playful jabs only. Reference people by name from the data passed in. Keep it under 5 sentences. Punchy. Funny. Specific. End with one line of guidance based on the weather.

OUTPUT RULES: Plain text only. No emojis unless they FIT (sparingly). No headers or formatting. 5 sentences max. No JSON. No markdown. Just prose.`;

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

export function buildPrompt({ event, rsvpedUsers, weather }) {
  const ev = event || {};
  const tagStr = (ev.tags && ev.tags.length) ? ev.tags.join(', ') : '';
  const locLabel = ev.startLoc?.label || '';

  const wxLines = [];
  if (weather) {
    if (weather.temp != null) wxLines.push(`Temp: ${weather.temp}°F`);
    if (weather.desc) wxLines.push(`Condition: ${weather.desc}`);
    if (weather.wind != null) wxLines.push(`Wind: ${weather.wind} mph`);
    if (weather.precip != null) wxLines.push(`Rain chance: ${weather.precip}%`);
    if (weather.sunset) {
      try {
        const sunsetFmt = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })
          .format(new Date(weather.sunset));
        wxLines.push(`Sunset: ${sunsetFmt}`);
      } catch (_) {}
    }
  } else {
    wxLines.push('No weather data yet.');
  }

  const userBlocks = (rsvpedUsers || []).map((u) => {
    const profile = findProfile(u);
    const name = u.displayName || u.name || u.email || 'rider';
    const blurb = profile ? profile.blurb : FALLBACK_BLURB;
    const mash = u.mashCount != null ? ` (mash count: ${u.mashCount})` : '';
    return `- ${name}${mash} :: ${blurb}`;
  });

  const userPrompt = [
    `EVENT: ${ev.name || 'Untitled ride'}`,
    ev.description ? `DESCRIPTION: ${ev.description}` : null,
    tagStr ? `TAGS: ${tagStr}` : null,
    locLabel ? `LOCATION: ${locLabel}` : null,
    '',
    'WEATHER:',
    ...wxLines.map((l) => `  ${l}`),
    '',
    `RSVP'D CREW (${userBlocks.length}):`,
    userBlocks.length ? userBlocks.join('\n') : '  (nobody yet — call them out)',
    '',
    "Now: write Eggman's take. Mention specific RSVP'd crew by name with playful jabs from their blurbs. Plain prose. 5 sentences max. End with one line of weather-based guidance.",
  ].filter((l) => l !== null).join('\n');

  return userPrompt;
}

export async function getEggMansTake({ event, rsvpedUsers, weather }) {
  if (!event || !event.id) return null;
  try {
    const userPrompt = buildPrompt({ event, rsvpedUsers, weather });
    const fullPrompt = `${SYSTEM_PROMPT}\n\n${userPrompt}`;
    const uids = (rsvpedUsers || []).map((u) => u.uid || u.email || u.displayName || '').sort().join(',');
    const wxKey = weatherBucket(weather);
    const cacheKey = `eggManTake_${event.id}_${shortHash(uids + '|' + wxKey)}`.slice(0, 200);
    const text = await runPrompt(fullPrompt, {
      cacheKey,
      ttlMs: 30 * 60 * 1000,
      maxTokens: 400,
      temperature: 0.95,
    });
    if (!text || typeof text !== 'string') return null;
    return text.trim();
  } catch (_) {
    return null;
  }
}
