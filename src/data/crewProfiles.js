export const CREW_PROFILES = [
  {
    name: 'Casey Newton',
    aliases: [],
    emails: [],
    blurb: "Dr. Newton trained all winter on Zwift, guarantees dad pace, flosses harder than you mash.",
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
    name: 'Glarbtron',
    aliases: ['GLARBTRON', 'Glarb Tron'],
    emails: [],
    blurb: "GLARBTRON is the supreme entity, hell-bent on world domination, calculating your failure probability in real time.",
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
    aliases: ['Bad Egg'],
    emails: [],
    blurb: "Jordan would rather run. Bad Egg crashed harder than that. Running is NOT cycling, Jordan.",
  },
  {
    name: 'Dave SWIDZ',
    aliases: ['David Swidz', 'SWIDZ', 'Swidz'],
    emails: [],
    blurb: "SWIDZ already sent it. To the moon and to the bar. Send it like SWIDZ.",
  },
  {
    name: 'Pig Boy',
    aliases: ['Zack Klein', 'Zack Kline', 'PigBoy'],
    emails: [],
    blurb: "Pig Boy broke every bone in his body. Watches from the couch now. Too scared to send it.",
  },
  {
    name: 'Reed Peer',
    aliases: [],
    emails: [],
    blurb: "Reed thinks this is too hard. He's paddling somewhere. Boundary Waters > your effort. Self-admitted fattest he's ever been.",
  },
  {
    name: 'Alexa Mattson',
    aliases: [],
    emails: [],
    blurb: "Alexa runs more than she rides. Will talk your ear off about her dog and how much responsibility a dog is.",
  },
  {
    name: 'Ashley Zimm',
    aliases: [],
    emails: [],
    blurb: "Ashley is an ultra-runner, dentist, and mom — certified smoke show outpacing everyone with zero notice.",
  },
  {
    name: 'George Lyall',
    aliases: ['Coach Lyle', 'Coach Lyall'],
    emails: [],
    blurb: "Coach Lyall is solid. He just keeps showing up and getting faster. Be like Coach.",
  },
  {
    name: 'Reece Zimm',
    aliases: ['REECEZIMM', 'reecezimm', 'Calf Daddy'],
    emails: ['zimm.reece@gmail.com', 'gm@thescrambledlegs.com'],
    blurb: "GM Reece Zimm — aka Calf Daddy. No fun, no talking, no laughing. All business. Just hammers. Tried-and-true navigator. Coach Lyall reports to him. Be on time.",
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
