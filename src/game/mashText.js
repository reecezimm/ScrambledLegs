// ─────────────────────────────────────────────────────────────────────────────
// mashText.js — single source of truth for all Zone 1 (challenge) and Zone 2
// (bubble phrase) text used during mashing.
//
// Structure:
//   MASH_TEXT_GENERAL  — cycling/hot-dog hype, no crew references. Safe from
//                        press 1 for bubbles; also included in full pool.
//   MASH_TEXT_CREW     — crew-specific taunts. Gated to press 30+ for bubbles.
//   MASH_TEXT_POOL     — full combined array (general + crew). Used by Zone 1
//                        challenge text (press 26+) and Zone 2 bubbles (press 30+).
//   CREW_TEXT_SET      — Set of all crew strings for O(1) dwell-time detection.
//
// Picker:
//   pickMashText(pool, fifoRef) — random pick with FIFO-3 repeat guard.
//   fifoRef.current must be initialized to [].
// ─────────────────────────────────────────────────────────────────────────────

// ── General — no crew references ─────────────────────────────────────────────
export const MASH_TEXT_GENERAL = [
  // On-ramp / early
  "Press for more stoke",
  "That's a start",
  "Keep mashing",
  "Mash me if you're ready",
  "Mash pedals next",
  "Drop the hammer",
  "Pace yourself",
  // Mid
  "Crank it harder",
  "More watts",
  "All gas no brakes",
  "Brake for nobody",
  "Hammer down",
  "Turn yourself inside out",
  "Pin it",
  "Send it",
  "Dig deeper",
  "Big watts only",
  "Climbing mode",
  "Drop them",
  "You're a machine",
  // High intensity
  "Absolutely shredding",
  "You're cooking now",
  "Feral mode unlocked",
  "Send it sender",
  "PR pace",
  "King of the trail",
  "Dirty dog energy",
  "Egg-cellent form",
  "Tunnel vision unlocked",
  // Hot dog / scrambled vibes
  "Beast mode",
  "The dog approves",
  "Scrambled glory",
  "Yolked beyond mortal",
  "Trail crew legend",
  "You broke the buns",
  "Cooked, smoked, served",
  "Is that all you got?",
  "You're in it for the long haul",
  "Keep pedaling",
  "Keep cranking",
  "Someone's ahead of you",
  "Catch that person",
  "Don't stop now",
  "Bad eggs, scrambled",
  "Go, go, go",
  "No mercy",
  "Eyes on the wheel ahead",
  "GOATed",
  "Actually unhinged",
  "You ARE the dog",
  "Actually godlike",
  "The trail bows to you",
  "Hot dog Hall of Fame",
  "You ARE Scrambled Legs",
  "Beyond the bun veil",
  "The yolk is real",
  "You took a wrong turn",
  "Almost to 1000",
  "Pure scrambled",
  "Drop the dog",
  "Yolk supremacy",
  "The bun has fallen",
  // Short bubble-style general phrases
  "Get crackin'!",
  "Egg-cellent!",
  "Sunny side up!",
  "You rock!",
  "Send it!",
  "Grease lightning!",
  "Mustard moves!",
  "Wheels up!",
  "Yolks on you!",
  "Hot dog hero!",
  "Crank it!",
  "Sender alert!",
  "Scrambled glory!",
  "Pedal punisher!",
  "Bun voyage!",
  "You're in! 🥚",
  "Roll call answered!",
  "See you Wednesday!",
  "Yolked + stoked!",
  "Eggs-traordinary!",
  "Cracked it!",
  "On the roster!",
  "Whisk on!",
  "Wednesday loading…",
  "Locked and loaded!",
  "LET'S GET SCRAMBLED",
  "CRACK 'EM ALL",
  "YOLK ON FIRE",
  "FULL SEND",
  "EGG MODE: ON",
  "Comeback energy!",
];

// ── Crew-specific — gated to press 30+ for bubbles ───────────────────────────
export const MASH_TEXT_CREW = [
  // Zimm
  "GM Zimm is watching 👀",
  "Zimm didn't build this for quitters",
  // Coach Lyall
  "Coach Lyall says dig deeper",
  "Lyall's seen better effort from his couch",
  "Coach Lyall is NOT impressed",
  "Lyall's giving you THE look",
  "Coach Lyall expected more",
  "Coach is at his cabin. Disappoint him remotely.",
  "Coach Lyall's steady pedal already passed you",
  "Predictable as paint drying — Coach is faster",
  "Coach is mowing his lawn. He's still ahead.",
  "Lyall left the cabin for this. Don't waste it.",
  // General crew taunts (no specific name)
  "You call that scrambled?",
  "Eggs-cuse me?! That's it?",
  "Over-easy isn't a training plan",
  "Bad egg energy right here",
  "Runny. Very runny.",
  "Mash those pedals like you mean it",
  "Drop the hammer — mash 'em flat",
  "Big-ring mash mode engaged",
  "Pedal-mash with prejudice",
  "Mash pedals, drop riders, repeat",
  "Out-mash 'em on the next climb",
  "Pedal harder. Make their legs cry.",
  "Crush the cranks — they're free",
  "Mash 'em into next Tuesday",
  "Big-watt mash. No chamois cream is saving them.",
  "The crew has seen better",
  "Soft boiled at best",
  "The yolk's on you",
  // Jordan / Bad Egg / Little Chip
  "Jordan would rather run",
  "Bad Egg is judging you",
  "Jordan crashed harder than that",
  "Running is NOT cycling, Jordan",
  "Even Bad Egg mashes better",
  "Little Chip's IT band just twanged in solidarity",
  "Jordan tried running. His IT band said no.",
  "Little Chip is too old for this. So are you.",
  "Jordan should just stick to ice fishing",
  "Bad Egg failed at running. Don't fail at this.",
  "Bad Egg approved!",
  "Jordan would run. You ride.",
  // SWIDZ / Dave
  "SWIDZ already sent it",
  "Dave's at the bar. Are you?",
  "Send it like SWIDZ",
  "SWIDZ would've sent that by now",
  "Dave's getting a beer. Keep going.",
  "SWIDZ just sent it to the moon. You're still here.",
  "Dave got big air. You got a flat effort.",
  "SWIDZ boosted that gap. Easily.",
  "Dave's so chill he's already done and at the after-party",
  "SWIDZ doesn't try harder. He just sends harder.",
  "SWIDZ would send it!",
  "Dave's at the bar — keep going!",
  // Pig Boy
  "Pig Boy watched from the couch",
  "Every bone Pig Boy broke screams harder",
  "Pig Boy's wrist is judging you",
  "Pig Boy has no more excuses. Do you?",
  "Even Pig Boy remembers how to send it",
  "Pig Boy's watching!",
  "Pig Boy's wrist approves!",
  // Reed / Peer / DBS
  "Reed is paddling right now",
  "Peer thinks this is too hard",
  "Boundary waters > your effort",
  "Reed's on a lake. What's your excuse?",
  "Reed's Rumblefish is faster than you",
  "\"Reed Peer with DBS here\" — even mid-climb",
  "Reed's pitching you a basement remodel right now",
  "Peer's ice-fishing harder than you're mashing",
  "Reed could be hunting. He chose this. Disrespect him.",
  "DBS Reed has 3 sales calls ahead of you",
  "Reed's on a lake!",
  "Boundary waters can wait!",
  // Casey Newton / Dr. Newton
  "Casey's Zwift PR is a certified dad pace",
  "Dr. Newton flosses harder than you mash",
  "Casey trained all winter on a stationary bike for this",
  "Newton's dentist hands could squeeze harder",
  "Casey guarantees dad speed. He delivered. Can you?",
  "Dad speed activated!",
  "Dr. Newton is proud!",
  // Tyler VANDAL
  "VANDAL is chasing you with a story you've heard twice",
  "Vandal is already on mile 40. You're still here.",
  "VANDAL will finish. Stubbornly. Inevitably.",
  "Tyler's about to tell you the story. Keep going.",
  "Vandal doesn't stop. Neither do you.",
  "Vandal is mid-monologue. There's no exit.",
  "Tyler hasn't taken a breath in 8 miles",
  "Mash to drown out Vandal's third anecdote",
  "Vandal will keep talking until you cross the finish",
  "You've nodded politely for 40 minutes. Don't break now.",
  "VANDAL will finish. Always.",
  "Vandal heard this story twice!",
  // Matt Wiley
  "Wiley showed up 30 min late and still crushed it",
  "Matt's on his third IPA and still faster than this",
  "Wiley forgot about this but still thought of you",
  "Matt's confident you can do better. Annoyingly confident.",
  "Wiley's somewhere drinking an IPA judging this performance",
  "Wiley is rating IPAs by hop intensity instead of riding",
  "Matt's at Bent Paddle. He says 'tell them I said hi.'",
  "Wiley pre-loaded a hazy IPA. He's fine. Are you?",
  "An IPA-fueled Wiley is still your top threat",
  "Matt grades watts on the IBU scale",
  "Wiley showed up late and crushed it!",
  "IPA energy!",
  // Will Markes
  "Markes is already training for next year",
  "Will believes in you. Don't blow it.",
  "Markes doesn't quit. He just keeps getting faster.",
  "Will puts in the work every single week. What about you?",
  "Markes is solid. So be solid.",
  "Will sees worse output every day in the urology ward",
  "Markes has seen actual kidney stones tougher than your climb",
  "Your pain level is a 4. Markes treats 11s for breakfast.",
  "Will deals with bigger issues than your effort, daily",
  "Urology Will is unimpressed. He's seen things.",
  "Markes believes in you!",
  "Will puts in the work!",
  // Derek VanSlyke
  "Derek traded trails for Spandex. Actual tragedy.",
  "VanSlyke is on pavement right now. In full Spandex kit.",
  "Derek can't hear you over the sound of his chamois",
  "VanSlyke would be here but road season started",
  "Derek became a roadie. Pray for him. Mash harder.",
  "Derek's in Spandex. You're not.",
  "Trail life, no Spandex!",
  // Paul Manoppo
  "Paul broke his back in 3 places and is ahead of you",
  "Manoppo had 6 surgeries and a better FTP than this",
  "Paul's spine is held together by zip ties and willpower",
  "Manoppo's doctor said no. Paul said watch me.",
  "Paul's titanium knee is still faster than your excuses",
  "Manoppo had 6 surgeries. Still faster.",
  // GLARBTRON
  "GLARBTRON has calculated your failure probability: high",
  "The robot supreme being demands maximum output",
  "Glarbtron did not survive the machine wars for this",
  "GLARBTRON requires more wattage. NOW.",
  "The supreme entity is disappointed in your numbers",
  "GLARBTRON is everywhere. He sees your watts.",
  "GLARBTRON exists in all timelines. Every one is disappointing.",
  "GLARBTRON's vacuum-tube heart hums in pity",
  "Resistance is futile, but so is your output",
  "GLARBTRON.exe is judging in 8-bit",
  "GLARBTRON approves!",
  "Supreme entity satisfied.",
  // Brent St. Martin
  "Brent is not having fun and wants you to know it",
  "St. Martin would like it on record: this is not fun",
  "Brent thinks you're wrong for enjoying this",
  "This is not Brent's type of fun. Reconsider your life.",
  "Brent has left the chat. He was never spiritually present.",
  "Brent hates this. You love it.",
  "Not Brent's fun — yours!",
  // Alexa Mattson
  "Alexa is on foot and already passed you. She runs marathons. You're on a bike.",
  "Alexa has to get home to feed her dog. She's still ahead of you.",
  "Alexa left to feed her dog, came back, and is still beating you.",
  "Alexa stopped to help a homeless man tie his shoes. She's back. You're behind.",
  "Alexa is telling you a full story about her dog right now. Mash through it.",
  "Alexa trains for Grandma's Marathon. She does this for fun. What's your excuse?",
  "Alexa just lapped you on foot. Mountain biking is her new hobby. This is week six.",
  "Alexa's talking your ear off and still pulling away. Stop listening. Start mashing.",
  "Alexa stopped, helped a stranger, called her mom, walked her dog, and is still faster than you.",
  "Six weeks on a mountain bike and Alexa is doing this to you. Embarrassing.",
  // Annalise Peck (Ana)
  "Ana is sun gazing at the summit. She beat you here twenty minutes ago.",
  "Ana found inner peace on that descent. You found your brakes.",
  "She's in savasana. She finished. You're still on the climb.",
  "Ana signed up for this race ten minutes ago. She's already ahead of you.",
  "Ana is aligned with the cheeseburger. You are not.",
  // Kai Syck (King Kai)
  "King Kai showed up. That name alone carries a legal obligation to send it.",
  "Kai Syck is too nice to drop you. He'll hype you the whole climb. Still faster.",
  "King Kai is doing a wheelie somewhere right now. He always is.",
  "Kai's golden retriever energy is showing. He's stoked. Also gapping you.",
  "King Kai trained Goku. He can handle this climb better than you.",
  "Kai Syck will send it, hype you, and apologize for the gap. In that order.",
  "That name was built for trail riding. King Kai is living up to every letter.",
  "Kai showed up to make everyone feel good and then went faster than all of them.",
  "King Kai's send decisions are only questionable if you can't back them up. He can.",
  "Golden retriever on a mountain bike. Stoked, fast, already at the bottom waiting.",
  // Becky Manoppo
  "Becky already wrote a song about your performance. It's in the key of disappointment.",
  "Becky is turning your flat tire into a lesson about preparation. She's already humming the intro.",
  "That wasn't a crash. That was an unscheduled learning opportunity. Becky has a song for this.",
  "Becky genuinely believes you can do better. She's been right every time. That's the worst part.",
  "Becky is reframing your bonk into a lesson about fueling. There's definitely a song.",
  "You got dropped and Becky is already at the bottom with warm encouragement and a musical number.",
  "Becky will not be mean about this. She will be kind and supportive and somehow that's worse.",
  "There is no situation Becky cannot turn into a teachable moment. This one is about effort.",
  "Becky showed up with golden energy and is beating you with it.",
  "Becky loves every person on this trail. She loves you. She also thinks you can mash harder.",
  // Alex Birno
  "Birno is on the back nine right now and thriving",
  "Alex drove his snowmobile to the golf course. In July.",
  "Birno is a rad dad who eagles harder than you mash",
  "Alex has a tee time at 2. This better be worth it.",
  "Birno is snowmobiling somewhere warm. Goals.",
  "Birno is on the back nine!",
  "Snowmobile in July energy!",
];

// Full pool — both zones draw from this after their respective press gates.
export const MASH_TEXT_POOL = [...MASH_TEXT_GENERAL, ...MASH_TEXT_CREW];

// O(1) crew lookup for dwell-time logic (crew strings get 4s, others 2.5s).
export const CREW_TEXT_SET = new Set(MASH_TEXT_CREW);

// ─────────────────────────────────────────────────────────────────────────────
// pickMashText — random pick with FIFO-3 repeat guard.
//
// fifoRef.current must be initialized to [].
// Returns the selected string and mutates fifoRef.current.
// ─────────────────────────────────────────────────────────────────────────────
export function pickMashText(pool, fifoRef) {
  if (!pool || pool.length === 0) return '';
  const recent = fifoRef.current || [];
  let idx;
  let attempts = 0;
  do {
    idx = Math.floor(Math.random() * pool.length);
    attempts++;
  } while (recent.includes(idx) && attempts < 15);

  // FIFO-3: push new index, drop oldest if over 3
  const next = [...recent, idx];
  if (next.length > 3) next.shift();
  fifoRef.current = next;

  return pool[idx];
}
