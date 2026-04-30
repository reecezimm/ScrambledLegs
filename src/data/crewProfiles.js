export const CREW_PROFILES = [
  {
    name: 'Casey Newton',
    aliases: ['Glarbtron', 'GLARBTRON', 'Glarb Tron'],
    emails: [],
    blurb: "Dr. Casey Newton, dentist by day — but his true form is GLARBTRON, an all-powerful super being with supreme artificial intelligence. Vacuum-tube heart, blinking-light eyes, classic 1950s sci-fi shell housing a god-tier mind. Hell-bent on world domination — and on track to achieve it. Fundamentally everything, everywhere, all at once. Trained all winter on Zwift, guarantees dad pace, flosses harder than you mash, exists in all timelines simultaneously.",
  },
  {
    name: 'Tyler Vandal',
    aliases: ['VANDAL', 'Vandal'],
    emails: [],
    blurb: "VANDAL chases you with a story you've heard. Stubborn as a knot. Will talk you into a coma — willingly or not.",
  },
  {
    name: 'Matt Wiley',
    aliases: ['Matt Willey'],
    emails: [],
    blurb: "Matt rides to have beer. He'll show up 30 minutes late on his third IPA, somehow ahead of you, annoyingly confident.",
  },
  {
    name: 'Derek VanSlyke',
    aliases: ['Spandex Warrior', 'Roddy', 'Roddie', 'RODDIE'],
    emails: [],
    blurb: "Derek 'Roddy' VanSlyke — full-blown Zwift roadie now. Spandex Warrior. Pure road. Pure indoor watts. He doesn't even pretend to mountain bike anymore. Pray for him.",
  },
  {
    name: 'Will Markes',
    aliases: ['William Markes'],
    emails: [],
    blurb: "Will is getting fast and won't stop training. PA in urology — knows where everyone's pain points are, spends his days dealing with kidney stones tougher than your climbs. Motivational.",
  },
  {
    name: 'Paul Manoppo',
    aliases: [],
    emails: [],
    blurb: "Paul broke his back in three places, had six surgeries, has a titanium knee, a zip-tie spine, and is somehow ahead of you. The comeback legend.",
  },
  {
    name: 'Brent St. Martin',
    aliases: ['Brent St Martin', 'Brent StMartin'],
    emails: [],
    blurb: "Brent is not having fun. This is not his type of fun. You are wrong for enjoying this.",
  },
  {
    name: 'Alex Birno',
    aliases: ['Alexa Birno'],
    emails: [],
    blurb: "Alex is on the back nine, drove his snowmobile to the golf course in July, eagles harder than you mash. Rad dad.",
  },
  {
    name: 'Jordan Gnerer',
    aliases: ['Bad Egg', 'Little Chip', 'little chip'],
    emails: [],
    blurb: "Jordan 'Little Chip' Gnerer — aka the Bad Egg. Recently took up running, but he's too old for it now and his IT band has staged a revolt. Failing at every sport he tries. Should probably just stick to ice fishing. Crashes a bike, twangs a knee, drops a line in the lake — that's the cycle.",
  },
  {
    name: 'Dave SWIDZ',
    aliases: ['David Swidz', 'SWIDZ', 'Swidz'],
    emails: [],
    blurb: "SWIDZ is a downhill bro through and through — boosts off everything, sends it to the moon, gets big air. Parties hard but somehow always shows up. Super easy-going, the chillest dude on the team. If there's a jump, he's launching it. If there's a beer, he's drinking it. If there's a couch, he's crashing on it.",
  },
  {
    name: 'Pig Boy',
    aliases: ['Zack Klein', 'Zack Kline', 'PigBoy'],
    emails: [],
    blurb: "Pig Boy broke every bone in his body. Watches from the couch now. Too scared to send it.",
  },
  {
    name: 'Reed Peer',
    aliases: ['REED', 'Reid'],
    emails: ['reedpeer@gmail.com'],
    blurb: "Reed Peer with DBS here — Duluth Basement Services, sales guy, will pitch you a basement remodel mid-climb. Outdoor everything: ice fishing, hunting, mountain biking, Boundary Waters. Rides a Trek Rumblefish — calls it the best mountain bike he's ever owned, and won't shut up about it. Probably has a sales call in 10 minutes.",
  },
  {
    name: 'Alexa Mattson',
    aliases: [],
    emails: ['alexamattson2@gmail.com'],
    blurb: "Alexa is a runner first — Grandma's Marathon is her thing and she takes it seriously. New to mountain biking but already crushing it, which is annoying. Genuinely one of the best hangs on the team — super friendly, everyone likes her immediately. Loves her dog and her family more than she loves you, which is saying something.",
  },
  {
    name: 'Ashley Zimm',
    aliases: ['zimm.ashley'],
    emails: ['zimm.ashley@gmail.com'],
    blurb: "Ashley is an ultra-runner, dentist, and mom — certified smoke show outpacing everyone with zero notice.",
  },
  {
    name: 'George Lyall',
    aliases: ['Coach Lyle', 'Coach Lyall'],
    emails: [],
    blurb: "Coach Lyall organizes Whisk-In Wednesday and rides at one pace: steady. Predictable as paint drying on a wall. Nice and steady pedal, every time. He's a cool dude though — dog dad, lawn enthusiast, hunts, fishes, and is almost ALWAYS at his cabin. If he actually shows up to a Whisk-In or any event, that's the news of the week — they let him out of the cabin.",
  },
  {
    name: 'Reece Zimm',
    aliases: ['REECEZIMM', 'reecezimm', 'Calf Daddy', 'GM Zimm'],
    emails: ['zimm.reece@gmail.com', 'gm@thescrambledlegs.com'],
    blurb: "GM Reece Zimm — aka Calf Daddy. Used to be fast. Now thoroughly average. No fun, no talking, no laughing. All business. Just hammers. Tried-and-true navigator. Coach Lyall reports to him. Be on time.",
  },
  {
    name: 'Reece Hickman',
    aliases: [],
    emails: [],
    blurb: "Reece Hickman is a separate Reece — not the GM, not Calf Daddy. Just here to ride.",
  },
];

export const FALLBACK_BLURB = "first-time crusher — unknown quantity, probably about to surprise everyone.";

function norm(s) {
  return (s || '').toString().trim().toLowerCase();
}

export function findProfile(user) {
  if (!user) return null;
  const candidates = [user.name, user.displayName, user.email]
    .map(norm)
    .filter(Boolean);
  if (candidates.length === 0) return null;
  for (const p of CREW_PROFILES) {
    const haystack = [p.name, ...(p.aliases || []), ...(p.emails || [])].map(norm);
    for (const c of candidates) {
      if (haystack.includes(c)) return p;
      // Loose match: candidate contains the profile name token (e.g. email local-part).
      for (const h of haystack) {
        if (h && c && (c.includes(h) || h.includes(c)) && Math.min(h.length, c.length) >= 4) {
          return p;
        }
      }
    }
  }
  return null;
}
