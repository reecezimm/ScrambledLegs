import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useEventKudos } from '../../hooks/useEventKudos';
import { useCurrentUser } from '../../services/auth';
import MashNowWarning from './MashNowWarning';
import { ref as dbRef, push as dbPush, set as dbSet, runTransaction } from 'firebase/database';
import { database } from '../../services/firebase';
import { logEvent } from '../../services/analytics';
import {
  setMashEnergy, clearMashEnergy, applyShockwave, clearShockwave,
  spawnHotDog, spawnRainbowEgg, flashBackground, spawnPhrase, rainbowChance,
  purgeMashWorld,
} from '../../hooks/useMashEffects';
import { fmtCount } from '../../hooks/useEventLifecycle';
import { gameStore } from '../../game/store';
import { MASH_TEXT_POOL, CREW_TEXT_SET, pickMashText } from '../../game/mashText';
import getAudioManager from '../../services/AudioManager';
import {
  emitCurrent as emitMashCurrent,
  emitSessionStart as emitMashSessionStart,
  emitSessionEnd as emitMashSessionEnd,
  emitCumulativeWritten as emitMashCumulativeWritten,
  emitEventContext as emitMashEventContext,
} from '../../hooks/useMashHighScore';

// Spawn a "+N" or "-N" floater at (x, y). Single source of truth for bonus
// visual feedback — both mode-driven (golden egg taps, freeze penalties) and
// director-driven (gauntlet win bonus) end up here via the bonus listener.
function spawnPressCountBurst(delta, x, y) {
  if (typeof document === 'undefined' || !delta) return;
  const isPenalty = delta < 0;
  const burst = document.createElement('div');
  burst.textContent = (isPenalty ? '' : '+') + delta;
  const color = isPenalty ? '#FF4747' : '#FFD700';
  const shadow = isPenalty
    ? '0 0 16px rgba(255,71,71,0.95),0 0 32px rgba(180,0,0,0.85),0 3px 10px rgba(0,0,0,0.75)'
    : '0 0 16px rgba(255,215,0,0.95),0 0 32px rgba(255,140,0,0.8),0 3px 10px rgba(0,0,0,0.7)';
  burst.style.cssText = [
    'position:fixed', 'pointer-events:none', 'z-index:9200',
    `left:${x}px`, `top:${y}px`,
    "font-family:'Fredoka',sans-serif", 'font-weight:700', 'font-size:42px',
    `color:${color}`,
    `text-shadow:${shadow}`,
    'transform:translate(-50%,-50%)', 'will-change:transform,opacity',
  ].join(';') + ';';
  document.body.appendChild(burst);
  burst.animate(
    [
      { transform: 'translate(-50%,-50%) scale(0.4)', opacity: 0, offset: 0 },
      { transform: 'translate(-50%,-50%) scale(1.3)', opacity: 1, offset: 0.18 },
      { transform: 'translate(-50%,-90px) scale(1)',  opacity: 1, offset: 0.7 },
      { transform: 'translate(-50%,-160px) scale(0.9)', opacity: 0, offset: 1 },
    ],
    { duration: 1100, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
  ).onfinish = () => burst.remove();
}

// ─── Constants ───────────────────────────────────────────────────────────────
const KUDOS_SAVE_DELAY_MS = 2500;
const KUDOS_SAVE_ANIM_MS = 1300;
const KUDOS_BURN_MS = 4000;
const DEEP_MASH_THRESHOLD = 10;

const HD_BURN_MESSAGES = [
  // Scrambled Legs / egg puns dialed up — irritating, judgmental, "do better"
  "That was over-easy. Try again.",
  "Scrambled? More like sunny-side weak.",
  "The shell is laughing at you.",
  "Eggs-actly what we expected. Disappointing.",
  "Cracked under pressure. Literally.",
  "Coach Lyall yawned mid-mash.",
  "GM Zimm noticed. He's not happy.",
  "That's not Scrambled. That's poached.",
  "Bad egg behavior. Hatch some effort.",
  "Yolk's empty. You held back.",
  "An actual egg would've mashed harder.",
  "Even Jordan ran past that effort.",
  "VANDAL would've finished by now.",
  "Soft boiled. We need rolling boil energy.",
  "The buns are laughing at you.",
  "You can do better. You will. Or you won't. Probably won't.",
  "Whisk-In Wednesday says no.",
  "That was a DNS in egg form.",
  "Stoked? No. Try again.",
  "The yolk is on you. Again.",
  "Hot dog hall of shame entry.",
  "Scrambled Legs is silently judging.",
  "Rollover effort. Literal egg roll.",
  "Hatched, then quit. Classic.",
  "Brent isn't having fun watching this.",
  "QuikTrip would refund this performance.",
  "Devil-eggs harder than you next time.",
  "Coach said 'again.' He's serious.",
  "Even SWIDZ would've sent it harder.",
  "You're not getting yolked at this rate.",
];

// Kept for button intensity dataset (btn.dataset.intensity). Text selection
// now uses MASH_TEXT_POOL from mashText.js via pickMashText().
const HD_CHALLENGE_BANDS = [
  ["Press for more stoke", "That's a start", "Keep mashing"],
  ["Mash me if you're ready", "Mash pedals next", "Drop the hammer", "Pace yourself"],
  ["Crank it harder", "More watts", "All gas no brakes", "Brake for nobody", "Hammer down", "Turn yourself inside out"],
  ["Pin it", "Send it", "Dig deeper", "Big watts only", "Climbing mode", "Drop them", "You're a machine"],
  ["Absolutely shredding", "You're cooking now", "Feral mode unlocked", "Send it sender", "PR pace", "King of the trail", "Dirty dog energy", "Egg-cellent form", "Tunnel vision unlocked"],
  ["Beast mode", "The dog approves", "Scrambled glory", "Pro-level dog work", "Coach Lyle is impressed", "Yolked beyond mortal",
   "Trail crew legend", "You broke the buns", "Cooked, smoked, served", "Is that all you got?", "You're in it for the long haul",
   "Keep pedaling", "Keep cranking", "Someone's ahead of you", "Catch that person", "More watts", "Don't stop now",
   "Bad eggs, scrambled", "Go, go, go", "No mercy", "Eyes on the wheel ahead",
   "GOATed", "Actually unhinged", "You ARE the dog", "Actually godlike", "The trail bows to you", "Hot dog Hall of Fame",
   "You ARE Scrambled Legs", "Beyond the bun veil", "The yolk is real",
   "You took a wrong turn", "Almost to 1000", "Pure scrambled",
   "Drop the dog", "Yolk supremacy", "The bun has fallen",
   // GM Zimm watching
   "GM Zimm is watching 👀",
   "Zimm didn't build this for quitters",
   // Coach Lyall — half motivating half judging, steady pedal, cabin man
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
   // Scrambled Legs / bad egg puns
   "You call that scrambled?",
   "Eggs-cuse me?! That's it?",
   "Over-easy isn't a training plan",
   "Bad egg energy right here",
   "Runny. Very runny.",
   // PEDAL MASHING — bike cranks, big watts, drop riders
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
   // General crew pressure
   "The crew has seen better",
   "Soft boiled at best",
   "The yolk's on you",
   // Jordan / Little Chip / Bad Egg — running era, IT band, ice fishing fallback
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
   // Dave SWIDZ — downhill bro, big air, sends it, parties, easy-going
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
   // Pig Boy — broken bones, couch potato
   "Pig Boy watched from the couch",
   "Every bone Pig Boy broke screams harder",
   "Pig Boy's wrist is judging you",
   "Pig Boy has no more excuses. Do you?",
   "Even Pig Boy remembers how to send it",
   // Reed Peer — DBS sales, ice fishing, hunting, MTB, "Reed Peer with DBS here"
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
   // Casey Newton — dentist, Zwift dad speed
   "Casey's Zwift PR is a certified dad pace",
   "Dr. Newton flosses harder than you mash",
   "Casey trained all winter on a stationary bike for this",
   "Newton's dentist hands could squeeze harder",
   "Casey guarantees dad speed. He delivered. Can you?",
   // Tyler VANDAL — stubborn story-teller, guaranteed finisher, won't shut up
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
   // Matt Wiley — IPAs, IPAs, more IPAs
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
   // Will Markes — solid + getting fast + urology PA
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
   // Derek VanSlyke — Spandex Warrior, abandoned mountain biking
   "Derek traded trails for Spandex. Actual tragedy.",
   "VanSlyke is on pavement right now. In full Spandex kit.",
   "Derek can't hear you over the sound of his chamois",
   "VanSlyke would be here but road season started",
   "Derek became a roadie. Pray for him. Mash harder.",
   // Will Markes — solid, getting fast, motivational
   "Markes is already training for next year",
   "Will believes in you. Don't blow it.",
   "Markes doesn't quit. He just keeps getting faster.",
   "Will puts in the work every single week. What about you?",
   "Markes is solid. So be solid.",
   // Paul Manoppo — comeback legend, fictional injuries
   "Paul broke his back in 3 places and is ahead of you",
   "Manoppo had 6 surgeries and a better FTP than this",
   "Paul's spine is held together by zip ties and willpower",
   "Manoppo's doctor said no. Paul said watch me.",
   "Paul's titanium knee is still faster than your excuses",
   // Glarbtron — all-powerful supreme AI, omnipresent retro shell, world-dominator
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
   // Brent St. Martin — not having fun, you're wrong
   "Brent is not having fun and wants you to know it",
   "St. Martin would like it on record: this is not fun",
   "Brent thinks you're wrong for enjoying this",
   "This is not Brent's type of fun. Reconsider your life.",
   "Brent has left the chat. He was never spiritually present.",
   // Alex Birno — golf, rad dad, summer snowmobiles
   "Birno is on the back nine right now and thriving",
   "Alex drove his snowmobile to the golf course. In July.",
   "Birno is a rad dad who eagles harder than you mash",
   "Alex has a tee time at 2. This better be worth it.",
   "Birno is snowmobiling somewhere warm. Goals."],
];

// All crew-specific challenges that warrant an extra 1.5s dwell time so
// people can actually read the inside jokes.
const CREW_CHALLENGES = new Set([
  "Jordan would rather run","Bad Egg is judging you","Jordan crashed harder than that",
  "Running is NOT cycling, Jordan","Even Bad Egg mashes better",
  "Little Chip's IT band just twanged in solidarity",
  "Jordan tried running. His IT band said no.",
  "Little Chip is too old for this. So are you.",
  "Jordan should just stick to ice fishing",
  "Bad Egg failed at running. Don't fail at this.",
  "SWIDZ already sent it","Dave's at the bar. Are you?","Send it like SWIDZ",
  "SWIDZ would've sent that by now","Dave's getting a beer. Keep going.",
  "SWIDZ just sent it to the moon. You're still here.",
  "Dave got big air. You got a flat effort.",
  "SWIDZ boosted that gap. Easily.",
  "Dave's so chill he's already done and at the after-party",
  "SWIDZ doesn't try harder. He just sends harder.",
  "Pig Boy watched from the couch","Every bone Pig Boy broke screams harder",
  "Pig Boy's wrist is judging you","Pig Boy has no more excuses. Do you?",
  "Even Pig Boy remembers how to send it",
  "Reed is paddling right now","Peer thinks this is too hard",
  "Boundary waters > your effort","Reed's on a lake. What's your excuse?",
  "Reed's Rumblefish is faster than you",
  "\"Reed Peer with DBS here\" — even mid-climb",
  "Reed's pitching you a basement remodel right now",
  "Peer's ice-fishing harder than you're mashing",
  "Reed could be hunting. He chose this. Disrespect him.",
  "DBS Reed has 3 sales calls ahead of you",
  "Casey's Zwift PR is a certified dad pace","Dr. Newton flosses harder than you mash",
  "Casey trained all winter on a stationary bike for this",
  "Newton's dentist hands could squeeze harder",
  "Casey guarantees dad speed. He delivered. Can you?",
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
  "Derek traded trails for Spandex. Actual tragedy.",
  "VanSlyke is on pavement right now. In full Spandex kit.",
  "Derek can't hear you over the sound of his chamois",
  "VanSlyke would be here but road season started",
  "Derek became a roadie. Pray for him. Mash harder.",
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
  "Paul broke his back in 3 places and is ahead of you",
  "Manoppo had 6 surgeries and a better FTP than this",
  "Paul's spine is held together by zip ties and willpower",
  "Manoppo's doctor said no. Paul said watch me.",
  "Paul's titanium knee is still faster than your excuses",
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
  "Brent is not having fun and wants you to know it",
  "St. Martin would like it on record: this is not fun",
  "Brent thinks you're wrong for enjoying this",
  "This is not Brent's type of fun. Reconsider your life.",
  "Brent has left the chat. He was never spiritually present.",
  "Birno is on the back nine right now and thriving",
  "Alex drove his snowmobile to the golf course. In July.",
  "Birno is a rad dad who eagles harder than you mash",
  "Alex has a tee time at 2. This better be worth it.",
  "Birno is snowmobiling somewhere warm. Goals.",
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
]);

const HD_HYPE_POOL = [
  "LET'S GET SCRAMBLED",
  "CRACK 'EM ALL",
  "YOLK ON FIRE",
  "FULL SEND",
  "EGG MODE: ON",
];

const HD_FIRST_25 = [
  // 1-5: SUPER CLEAR instructions — make sure first-time users know to keep tapping.
  "PRESS AGAIN!",
  "KEEP PRESSING!",
  "DON'T STOP — TAP!",
  "TAP FASTER!",
  "NOW MASH!",
  // 6-13: CRITICAL RULE — Don't stop mashing, even during mini-games.
  // Repeated 8 times so it sinks in before mini-games appear at press 25.
  "DON'T STOP MASHING\nEVEN DURING MINI-GAMES",
  "DON'T STOP MASHING\nEVEN DURING MINI-GAMES",
  "DON'T STOP MASHING\nEVEN DURING MINI-GAMES",
  "DON'T STOP MASHING\nEVEN DURING MINI-GAMES",
  "DON'T STOP MASHING\nEVEN DURING MINI-GAMES",
  "DON'T STOP MASHING\nEVEN DURING MINI-GAMES",
  "DON'T STOP MASHING\nEVEN DURING MINI-GAMES",
  "DON'T STOP MASHING\nEVEN DURING MINI-GAMES",
  // 14-19: Consequence warning — stopping = game over.
  // Repeated 6 times to drive the stakes home.
  "STOP MASHING = GAME OVER",
  "STOP MASHING = GAME OVER",
  "STOP MASHING = GAME OVER",
  "STOP MASHING = GAME OVER",
  "STOP MASHING = GAME OVER",
  "STOP MASHING = GAME OVER",
  // 20-25: final hype before mini-games.
  "HAMMER DOWN!", "SEND IT!", "THEY'RE BEATING YOU",
  "ALMOST THERE", "BEAST MODE", "UNHINGED YET?",
];

function bandForPress(c) {
  if (c <= 2) return 0;
  if (c <= 5) return 1;
  if (c <= 9) return 2;
  if (c <= 14) return 3;
  if (c <= 24) return 4;
  return 5;
}

// pickChallenge — returns the challenge string for a given press.
// Press 1-25: hand-tuned HD_FIRST_25 (linear, no random).
// Press 26+:  random pick from MASH_TEXT_POOL with FIFO-3 repeat guard via
//             pickMashText(). fifoRef must be passed in by the caller.
function pickChallenge(pressCount, fifoRef) {
  if (pressCount >= 1 && pressCount <= HD_FIRST_25.length) {
    return HD_FIRST_25[pressCount - 1];
  }
  return pickMashText(MASH_TEXT_POOL, fifoRef);
}

function setSub(el, text) {
  if (!el) return;
  el.textContent = text;
  if (!text) { el.style.fontSize = ''; return; }
  const maxW = Math.min(window.innerWidth * 0.86, 480);
  const maxPx = 26, minPx = 14;
  const estPx = Math.floor(maxW / Math.max(text.length * 0.63, 1));
  el.style.fontSize = `${Math.max(minPx, Math.min(maxPx, estPx))}px`;
}

// ─── Styled Components ────────────────────────────────────────────────────────
const ctaPulse = keyframes`
  0%, 100% { box-shadow: 0 6px 22px rgba(255,107,107,0.40); }
  50%       { box-shadow: 0 10px 34px rgba(255,107,107,0.70); }
`;

const ctaThrob = keyframes`
  0%, 100% { filter: brightness(1) saturate(1); }
  50%       { filter: brightness(1.30) saturate(1.45); }
`;

// blinkDots is applied via className in the global CSS (index.js GlobalStyle)
// rather than here to avoid the styled-components keyframes conflict with
// ::after content pseudo-elements. Defined globally, referenced by class name.
// eslint-disable-next-line no-unused-vars
const blinkDots = keyframes`
  0%   { content: ''; }
  25%  { content: '.'; }
  50%  { content: '..'; }
  75%  { content: '...'; }
  100% { content: ''; }
`;

const hdPing = keyframes`
  0%   { opacity: 0.7; }
  100% { opacity: 0; transform: scale(1.04); }
`;

const KudosRow = styled.div`
  margin-top: 14px;
  position: relative;
  z-index: 1;
`;

const HdCta = styled.button`
  position: relative;
  width: 100%;
  padding: var(--hd-pad-y, 14px) 18px;
  border: none;
  border-radius: 16px;
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
  background: linear-gradient(135deg,
    hsl(var(--hd-hue, 0), 85%, 60%),
    hsl(calc(var(--hd-hue, 0) + 35), 90%, 50%));
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  font-family: 'Fredoka', sans-serif;
  overflow: visible;
  --hd-scale: 1;
  --hd-rest: 1;
  --hd-rest-y: 1;
  transform-origin: center center;
  transform: scale(var(--hd-scale)) scaleY(var(--hd-rest-y, 1));
  transition: transform 0.18s cubic-bezier(.34,1.56,.64,1), padding 0.20s ease-out, background 0.3s;
  animation: ${ctaPulse} 1.5s ease-in-out infinite;
  z-index: 1;

  &:active { --hd-scale: calc(var(--hd-rest, 1) * 0.96); transition-duration: 0.08s; }
  &:not(:active) { --hd-scale: var(--hd-rest, 1); }

  &.is-saving, &.is-burning { pointer-events: none; cursor: default; }

  &[data-intensity="0"] { box-shadow: 0 6px 22px rgba(255,107,107,0.40); }
  &[data-intensity="1"] { box-shadow: 0 8px 28px rgba(255,107,107,0.55); animation-duration: 1.3s; }
  &[data-intensity="2"] { box-shadow: 0 10px 36px rgba(255,107,107,0.65); animation-duration: 1.1s; }
  &[data-intensity="3"] { box-shadow: 0 14px 48px rgba(255,107,107,0.78); animation: ${ctaThrob} 0.85s ease-in-out infinite; }
  &[data-intensity="4"] { box-shadow: 0 20px 70px rgba(255,180,60,0.65); animation: ${ctaThrob} 0.65s ease-in-out infinite; }
  &[data-intensity="5"] { box-shadow: 0 24px 90px rgba(255,160,40,0.85), 0 0 60px rgba(255,140,30,0.5); animation: ${ctaThrob} 0.45s ease-in-out infinite; }
  &[data-intensity="6"] { box-shadow: 0 30px 120px rgba(255,255,255,1), 0 0 100px rgba(255,255,200,0.95); animation: ${ctaThrob} 0.30s ease-in-out infinite; }

  /* Hide top/text during mashing, saving, burning */
  &.is-mashing .hd-cta-top,
  &.is-mashing .hd-cta-text,
  &.is-saving .hd-cta-top,
  &.is-saving .hd-cta-text,
  &.is-burning .hd-cta-top,
  &.is-burning .hd-cta-text { opacity: 0; transition: opacity 0.2s; }

  /* Idle hides right text */
  &.is-idle .hd-cta-text { opacity: 0; transition: opacity 0.25s; }

  .ping {
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: rgba(255,255,255,0.22);
    animation: ${hdPing} 0.45s ease-out forwards;
    pointer-events: none;
  }
`;

const CtaTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  transition: opacity 0.2s;

  /* In idle, shrink the count display so it doesn't overlap the centered
     MASH ME overlay — tucks into the left corner as a subtle indicator */
  ${HdCta}.is-idle & {
    gap: 5px;
    opacity: 0.65;
  }
`;

const CtaCount = styled.span`
  font-size: clamp(11px, 3.2vw, 22px);
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  text-align: left;
`;

const CtaText = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: right;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.95;
  transition: opacity 0.22s ease;
  &.is-fading { opacity: 0; }
`;

const MashOverlay = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(var(--mash-scale, 1));
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.18s, transform 0.25s cubic-bezier(.34,1.56,.64,1);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  /* Fit within the button (button is width:100%, padded 18px each side).
     Leaving extra slack so 1.18x burn pulse + 1.06x idle pulse don't bleed. */
  width: calc(100% - 28px);
  max-width: calc(100% - 28px);
  text-align: center;

  /* Visible during mashing/saving/burning and idle */
  .is-mashing ~ &,
  .is-saving ~ &,
  .is-burning ~ &,
  .is-idle ~ & { opacity: 1; }

  /* During mashing, anchor to bottom */
  .is-mashing ~ & {
    top: auto;
    bottom: 6px;
    transform: translateX(-50%) scale(var(--mash-scale, 1));
    justify-content: flex-end;
  }
`;

const MashNum = styled.span`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  font-size: 30px;
  line-height: 1.05;
  color: #fff;
  text-shadow: 0 3px 12px rgba(0,0,0,0.85), 0 0 24px rgba(255,255,255,0.45);
  transition: font-size 0.22s ease;
  text-align: center;
  max-width: calc(100vw - 32px);
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  white-space: normal;

  /* Idle big style */
  .is-idle ~ ${MashOverlay} & {
    font-size: clamp(20px, 6.5vw, 30px) !important;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    animation: idleEmergencyPulse 1.5s ease-in-out infinite;
  }

  /* Saving style */
  .is-saving ~ ${MashOverlay} & {
    color: #FFE66D;
    font-style: italic;
    letter-spacing: 0.02em;
  }

  /* Burning style — sized so the 1.18x burnFlash scale peak still fits the button */
  .is-burning ~ ${MashOverlay} & {
    font-size: clamp(15px, 4.6vw, 22px) !important;
    font-style: italic;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: normal;
    text-align: center;
    line-height: 1.15;
    animation: burnFlash 4s cubic-bezier(.34,1.56,.64,1) forwards;
    max-width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }
`;

const toastSlideUp = keyframes`
  from { opacity: 0; transform: translate(-50%, 20px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
`;

const Toast = styled.button`
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  z-index: 1200;
  max-width: min(420px, calc(100vw - 24px));
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255,199,44,0.35);
  background: linear-gradient(160deg, #1a1a1a 0%, #232325 100%);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.35;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 12px 36px rgba(0,0,0,0.5);
  animation: ${toastSlideUp} 0.28s ease-out;

  strong { color: #FFC72C; font-weight: 700; }
`;

const MashSub = styled.span`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-style: italic;
  font-size: clamp(13px, 4vw, 19px);
  line-height: 1.15;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #FFE66D;
  text-shadow: 0 0 12px rgba(255,199,44,0.55), 0 0 24px rgba(255,107,107,0.4), 0 2px 8px rgba(0,0,0,0.8);
  opacity: 0;
  transition: opacity 0.22s;
  pointer-events: none;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  max-width: 100%;
  text-align: center;

  .is-mashing ~ ${MashOverlay} & { opacity: 1; }
  .is-idle ~ ${MashOverlay} &,
  .is-saving ~ ${MashOverlay} &,
  .is-burning ~ ${MashOverlay} & { opacity: 0; }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function KudosCta({ event, isSheetContext }) {
  const { displayCount, mash } = useEventKudos(event.id, event.hotdogs);
  const { user } = useCurrentUser();
  const [showNudge, setShowNudge] = useState(false);
  const nudgeTimerRef = useRef(null);
  const anonMashCountRef = useRef(0);
  const btnRef = useRef(null);
  const hdPressCountRef = useRef(0);
  const hdLastChallengeRef = useRef('');
  const hdLastChallengeAtRef = useRef(0);
  const hdLastBurnRef = useRef('');
  const hdResetTimerRef = useRef(null);
  const saveFlowInProgressRef = useRef(false);
  const hdChallengeFifoRef = useRef([]);
  const phraseCooldownRef = useRef(0);
  const phraseFifoRef = useRef([]);
  const sessionStartRef = useRef(0);
  const sessionUidRef = useRef(null);
  const vvCleanupRef = useRef(null);

  const updateMashFocus = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const xPct = (cx / Math.max(window.innerWidth, 1)) * 100;
    const yPct = (cy / Math.max(window.innerHeight, 1)) * 100;
    document.body.style.setProperty('--mash-x', `${xPct.toFixed(2)}%`);
    document.body.style.setProperty('--mash-y', `${yPct.toFixed(2)}%`);
  }, []);

  useEffect(() => {
    if (isSheetContext) {
      document.body.dataset.sheetOpen = '1';
    }
    // Publish the event context so HighScoreHud can subscribe to globalBest
    // immediately — without waiting for a press. Re-fires when event/user
    // changes via the deps below.
    console.log(`[hs] emitEventContext from KudosCta | eventId=${event && event.id} uid=${user ? user.uid : null}`);
    emitMashEventContext({
      eventId: event && event.id,
      uid: user ? user.uid : null,
    });
    // Ensure idle state on mount
    enterIdleState();
    updateMashFocus();
    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateMashFocus();
      });
    };
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, true);
    return () => {
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule, true);
      if (raf) cancelAnimationFrame(raf);
      if (isSheetContext) {
        delete document.body.dataset.sheetOpen;
      }
      document.body.style.removeProperty('--mash-x');
      document.body.style.removeProperty('--mash-y');
      // Cleanup on unmount
      if (hdPressCountRef.current > 0) enterIdleState();
      if (hdResetTimerRef.current) clearTimeout(hdResetTimerRef.current);
      if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
    };
  }, [isSheetContext, updateMashFocus, event && event.id, user && user.uid]); // eslint-disable-line react-hooks/exhaustive-deps

  const enterIdleState = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const row = btn.parentElement;
    btn.classList.remove('is-mashing', 'is-deep-mashing', 'is-saving', 'is-burning', 'hd-heartbeat');
    btn.classList.add('is-idle');
    btn.dataset.intensity = '0';
    btn.style.setProperty('--hd-rest', '1');
    btn.style.setProperty('--hd-rest-y', '1');
    btn.style.removeProperty('--hd-hue');
    const numEl = row && row.querySelector('.mash-num');
    const subEl = row && row.querySelector('.mash-sub');
    if (numEl) {
      numEl.style.fontSize = '';
      numEl.textContent = 'MASH ME';
    }
    if (subEl) setSub(subEl, '');
    clearMashEnergy();
    clearShockwave();
    delete document.body.dataset.mashPhase;
    // Defensive: any pending save timer is now obsolete (we're already
    // tearing down). Cancel it before reset so it can't fire post-cleanup.
    if (hdResetTimerRef.current) {
      clearTimeout(hdResetTimerRef.current);
      hdResetTimerRef.current = null;
    }
    // Comprehensive world-purge: removes every stray spawned DOM node
    // (eggs, beers, stars, pigs, balls, avatars, phrase floaters), restores
    // the body + canvas backgrounds (Twilight overrides them), and force-
    // clears every body data-attribute the mash system writes. Safety net
    // so a session that ended mid-mini-game can't leave the screen looking
    // empty / broken on the next session.
    try { purgeMashWorld(); } catch (_) {}
    // Reset mini-game director so the next session starts clean. Director
    // clears its own timeouts (mode, status timeout) and resets the
    // strategy so the next session opens with Golden Egg again.
    try { gameStore.reset(); } catch (_) {}
    // High-score bus: signal session end (HUD hides, celebration flags
    // reset) and zero out the current value.
    try {
      emitMashCurrent(0);
      emitMashSessionEnd();
    } catch (_) {}
    if (vvCleanupRef.current) vvCleanupRef.current();
    // ── MASH GAME END ──
    // Release the page lock and restore scroll. clearMashEnergy already
    // removed body data flags + CSS vars.
    try {
      const wasLocked = !!document.body.dataset.savedScrollY;
      const savedY = parseInt(document.body.dataset.savedScrollY || '0', 10);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overscrollBehavior = '';
      delete document.body.dataset.savedScrollY;
      // Restore viewport meta so non-game pages are normally zoomable again.
      const vp = document.querySelector('meta[name="viewport"]');
      if (vp && vp.dataset.preGameContent) {
        vp.content = vp.dataset.preGameContent;
        delete vp.dataset.preGameContent;
      }
      window.scrollTo(0, savedY);
    } catch (e) {
      console.warn('[mash-game] GAME END failed:', e && e.message);
    }
  }, []);

  // ── Save flow ─────────────────────────────────────────────────────────
  // Extracted so it can be called by either the normal save-timer (after
  // KUDOS_SAVE_DELAY_MS of inactivity) or the mini-game session-end
  // listener (when a `endsMashSession: true` mini-game fails — fires
  // immediately, no delay).
  const runSaveFlow = useCallback(() => {
    if (saveFlowInProgressRef.current) {
      return;
    }
    saveFlowInProgressRef.current = true;

    const btn = btnRef.current;
    if (!btn) {
      return;
    }
    const row = btn.parentElement;
    const numEl = row && row.querySelector('.mash-num');
    const subEl = row && row.querySelector('.mash-sub');

    if (hdPressCountRef.current <= 0) {
      btn.classList.remove('is-mashing', 'is-deep-mashing', 'is-saving', 'is-burning');
      btn.dataset.intensity = '0';
      btn.style.setProperty('--hd-rest', '1');
      btn.style.setProperty('--hd-pad-y', '14px');
      btn.style.removeProperty('--hd-hue');
      if (numEl) { numEl.style.fontSize = ''; numEl.textContent = '+1'; }
      if (subEl) subEl.textContent = '';
      return;
    }

    // Phase A — saving
    btn.classList.remove('is-mashing', 'is-deep-mashing');
    btn.classList.add('is-saving');
    document.body.dataset.mashPhase = 'saving';   // hides GameStatus
    if (numEl) { numEl.textContent = `saving ${fmtCount(hdPressCountRef.current)}`; numEl.style.fontSize = '28px'; }
    if (subEl) subEl.textContent = '';

    setTimeout(() => {
      btn.classList.remove('is-saving');
      btn.classList.add('is-burning');
      document.body.dataset.mashPhase = 'burning';
      let burnMsg;
      if (hdPressCountRef.current < 10) {
        burnMsg = "TRY AGAIN\nKEEP MASHING TO PLAY";
      } else {
        do { burnMsg = HD_BURN_MESSAGES[Math.floor(Math.random() * HD_BURN_MESSAGES.length)]; }
        while (burnMsg === hdLastBurnRef.current && HD_BURN_MESSAGES.length > 1);
        hdLastBurnRef.current = burnMsg;
      }
      if (numEl) { numEl.textContent = burnMsg; numEl.style.fontSize = ''; }
      setTimeout(() => {
        // Phase C — reset
        const finalCount = hdPressCountRef.current;
        const sessionStart = sessionStartRef.current;
        const sessionUid = sessionUidRef.current;

        if (sessionUid && finalCount > 0 && event && event.id) {
          try {
            const sessionRef = dbPush(dbRef(database, `mashSessions/${event.id}/${sessionUid}`));
            dbSet(sessionRef, {
              startedAt: sessionStart || Date.now(),
              endedAt: Date.now(),
              count: finalCount,
            }).catch(() => {});
            runTransaction(
              dbRef(database, `eventMashTotals/${event.id}/${sessionUid}`),
              (cur) => (cur || 0) + finalCount,
            ).catch(() => {});
            // High score write — path: mashHighScores/{eventId}/{uid}/best
            console.log(`[hs] writing | path=mashHighScores/${event.id}/${sessionUid}/best finalCount=${finalCount}`);
            runTransaction(
              dbRef(database, `mashHighScores/${event.id}/${sessionUid}/best`),
              (cur) => Math.max(cur || 0, finalCount),
            ).then((res) => {
              if (res && res.committed) {
                const committedBest = (res.snapshot && res.snapshot.val()) || finalCount;
                console.log(`[hs] write committed | best=${committedBest} eventId=${event.id} uid=${sessionUid}`);
                emitMashCumulativeWritten({
                  eventId: event.id,
                  uid: sessionUid,
                  best: committedBest,
                });
              }
            }).catch((err) => {
              console.log(`[hs] write FAILED | path=mashHighScores/${event.id}/${sessionUid}/best err=${err && err.message}`);
            });
            logEvent('mash_session_complete', {
              eventId: event.id,
              count: finalCount,
              durationMs: Date.now() - (sessionStart || Date.now()),
            });
          } catch (err) {
            console.error(`[hs] exception during database writes:`, err);
          }
        } else if (finalCount > 0 && event && event.id) {
          logEvent('mash_session_complete', {
            eventId: event.id,
            count: finalCount,
            anonymous: true,
          });
        } else {
          console.log(`[hs] skipping write | finalCount=${finalCount} sessionUid=${!!sessionUid} eventId=${event ? event.id : 'null'}`);
        }

        hdPressCountRef.current = 0;
        hdLastChallengeRef.current = '';
        hdLastChallengeAtRef.current = 0;
        sessionStartRef.current = 0;
        sessionUidRef.current = null;
        btn.style.setProperty('--hd-rest-y', '1');
        saveFlowInProgressRef.current = false;
        enterIdleState();
      }, KUDOS_BURN_MS);
    }, KUDOS_SAVE_ANIM_MS);
  }, [enterIdleState, user, event]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Mini-game session-end listener ────────────────────────────────────
  // When a mini-game fails with endsMashSession:true, the gameStore fires
  // sessionEnd. We clear any pending save timer and run the save flow now.
  useEffect(() => {
    const unsub = gameStore.onSessionEnd(() => {
      if (hdResetTimerRef.current) {
        clearTimeout(hdResetTimerRef.current);
        hdResetTimerRef.current = null;
      }
      runSaveFlow();
    });
    return unsub;
  }, [runSaveFlow]);

  // ── Drag-and-hold wiring ──────────────────────────────────────────────
  // Activates when a mini-game declares overrides.button: 'draggable'.
  // Pointerdown on the mash button captures the pointer; pointermove
  // translates the kudos-row via --btn-drag-x/y CSS vars; pointerup
  // releases. Cumulative offset persists across gestures (button parks
  // where released and a re-grab continues from there). When the play
  // phase exits (buttonState no longer 'draggable'), the offset is cleared
  // and the row's CSS transition slides the button back to anchor.
  useEffect(() => {
    let attached = false;
    let pointerId = null;
    let lastX = 0, lastY = 0;
    let cumDX = 0, cumDY = 0;
    let rafId = 0;
    let pendingX = 0, pendingY = 0;
    // Captured at dragStart so we can clamp horizontal moves to viewport
    // bounds (Pong paddle behavior). Anchor center = current button center
    // minus current cumulative offset (i.e. where the button would be at
    // cumDX=0). halfW/halfH come from the button's bounding box at
    // dragStart so we keep the WHOLE button inside the viewport.
    let anchorCx = 0, halfW = 0;

    const clampForAxis = () => {
      const r = gameStore.getState().resolved;
      if (r && r.dragAxis === 'horizontal') {
        // Lock vertical movement.
        cumDY = 0;
        // Clamp horizontal so the button stays fully on-screen.
        const vw = window.innerWidth;
        const minDx = halfW - anchorCx;          // anchorCx + cumDX - halfW >= 0
        const maxDx = vw - anchorCx - halfW;     // anchorCx + cumDX + halfW <= vw
        if (cumDX < minDx) cumDX = minDx;
        if (cumDX > maxDx) cumDX = maxDx;
      }
    };

    const onMove = (e) => {
      if (e.pointerId !== pointerId) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      cumDX += dx; cumDY += dy;
      clampForAxis();
      pendingX = e.clientX; pendingY = e.clientY;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        document.body.style.setProperty('--btn-drag-x', cumDX + 'px');
        document.body.style.setProperty('--btn-drag-y', cumDY + 'px');
        gameStore.handleDragMove({ x: pendingX, y: pendingY, dx: cumDX, dy: cumDY });
      });
    };
    const onUp = (e) => {
      if (pointerId == null || e.pointerId !== pointerId) return;
      const btn = btnRef.current;
      try { btn && btn.releasePointerCapture(pointerId); } catch (_) {}
      pointerId = null;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      gameStore.handleDragEnd({ x: e.clientX, y: e.clientY, dx: cumDX, dy: cumDY });
    };
    const onDown = (e) => {
      const btn = btnRef.current;
      if (!btn) return;
      e.preventDefault();
      pointerId = e.pointerId;
      lastX = e.clientX; lastY = e.clientY;
      // Snapshot the natural anchor (current center minus current drag) so
      // axis-clamp math works even after the user has dragged before.
      const rect = btn.getBoundingClientRect();
      halfW = rect.width / 2;
      anchorCx = rect.left + halfW - cumDX;
      try { btn.setPointerCapture(pointerId); } catch (_) {}
      gameStore.handleDragStart({ x: e.clientX, y: e.clientY });
      window.addEventListener('pointermove', onMove, { passive: false });
      window.addEventListener('pointerup', onUp, { passive: false });
      window.addEventListener('pointercancel', onUp, { passive: false });
    };

    function attach() {
      const btn = btnRef.current;
      if (!btn || attached) return;
      attached = true;
      btn.addEventListener('pointerdown', onDown, { passive: false });
    }
    function detach() {
      const btn = btnRef.current;
      if (btn) btn.removeEventListener('pointerdown', onDown);
      attached = false;
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
      if (pointerId != null) {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        pointerId = null;
      }
      // Clear drag offset so the button snaps back to the migration anchor.
      document.body.style.removeProperty('--btn-drag-x');
      document.body.style.removeProperty('--btn-drag-y');
      cumDX = 0; cumDY = 0;
    }

    const unsub = gameStore.subscribe((s) => {
      const draggable = s.resolved && s.resolved.buttonState === 'draggable';
      if (draggable && !attached) attach();
      else if (!draggable && attached) detach();
    });
    return () => { unsub(); detach(); };
  }, []);

  // ── Bonus delta listener ──────────────────────────────────────────────
  // bonusCount changes (mode awardBonus + director onWin/onLose rules) fan
  // out as { delta, opts } where opts may carry tap coordinates. We roll
  // delta into hdPressCountRef so the user-facing score reflects rewards/
  // penalties immediately, update the MashNum overlay text, and spawn a
  // floating "+N"/"-N" burst at the supplied tap coords (or button center
  // for director-applied bonuses).
  useEffect(() => {
    const unsub = gameStore.onBonusAwarded((delta, opts) => {
      if (!delta) return;
      const before = hdPressCountRef.current;
      hdPressCountRef.current = Math.max(0, hdPressCountRef.current + delta);
      emitMashCurrent(hdPressCountRef.current);
      const btn = btnRef.current;
      if (btn) {
        const row = btn.parentElement;
        const numEl = row && row.querySelector('.mash-num');
        if (numEl && btn.classList.contains('is-mashing')) {
          numEl.textContent = `+${fmtCount(hdPressCountRef.current)}`;
        }
        // Pick spawn location: tap coords if provided, else button center.
        let x, y;
        if (opts && typeof opts.x === 'number' && typeof opts.y === 'number') {
          x = opts.x; y = opts.y;
        } else {
          const r = btn.getBoundingClientRect();
          x = r.left + r.width / 2;
          y = r.top + r.height / 2;
        }
        spawnPressCountBurst(delta, x, y);
      }
    });
    return unsub;
  }, []);

  // ── Pause save-timer when gameClock is paused ─────────────────────────
  // Mini-games declaring `overrides.gameClock: 'paused'` (e.g. Freeze)
  // expect the WHOLE world to halt — not just the canvas/heartbeat. Pause
  // the save timer here too so the user isn't auto-saved out from under
  // the freeze. On unpause, re-arm with a fresh full delay so the user has
  // time to resume mashing before the save kicks in.
  useEffect(() => {
    let pausedSnapshot = false;
    let activeIdSnapshot = null;
    const unsub = gameStore.subscribe((s) => {
      // Pause the save timer in any state where the user CAN'T extend it:
      //   - gameClockPaused
      //   - mashing 'paused' (Pig Boy, Pong — drag-only mini-games)
      //   - mashing 'inverted' (taps cost points; user supposed to NOT mash)
      const r = s.resolved;
      const paused = !!(r && (
        r.gameClockPaused ||
        r.mashingMode === 'paused' ||
        r.mashingMode === 'inverted'
      ));
      const activeId = r ? r.miniGameId : null;

      // Pause flip → clear the save timer. Don't re-arm on the unpause
      // flip — the play-phase often unpauses during the outcome status
      // phase (which still runs for 2400ms), and re-arming there means
      // save fires ~100ms after the outcome message disappears, leaving
      // the user no breathing room to resume mashing. Defer re-arm to
      // mini-game END (active → null) below.
      if (paused && !pausedSnapshot) {
        pausedSnapshot = true;
        if (hdResetTimerRef.current) {
          clearTimeout(hdResetTimerRef.current);
          hdResetTimerRef.current = null;
        }
      } else if (!paused && pausedSnapshot) {
        pausedSnapshot = false;
      }

      // Mini-game fully complete (active goes from non-null to null) —
      // THIS is when we re-arm the save timer + flash the heartbeat. By
      // now the outcome status phase has finished, so the user gets a
      // full grace period AFTER the win/loss message disappears. Mini-
      // games are designed to chain — the player wants to keep mashing
      // through to the next one — so the post-mini-game grace is bumped
      // longer than the normal 2.5s idle save (4s) and the heartbeat ring
      // fires for visual feedback so the user knows to resume mashing.
      const POST_MINI_GAME_GRACE_MS = 4000;
      if (activeIdSnapshot != null && activeId == null) {
        // Skip re-arm and heartbeat if a session-end save flow is already
        // running (endsMashSession mini-game fail). The sessionEndPulse
        // listener already called runSaveFlow() — arming the timer here
        // would be a duplicate, and triggering the heartbeat animation
        // mid-burn makes the UI look like a second failure.
        if (!saveFlowInProgressRef.current) {
          const press = hdPressCountRef.current;
          if (press > 0 && !hdResetTimerRef.current) {
            hdResetTimerRef.current = setTimeout(() => {
              runSaveFlow();
            }, POST_MINI_GAME_GRACE_MS);
            // Visual: trigger the heartbeat ring so the user sees the burn
            // counting down. Mini-games are meant to chain, so this is the
            // visual "keep going" cue between games.
            const btn = btnRef.current;
            if (btn && document.body.dataset.ambHeartbeat !== 'off') {
              btn.classList.remove('hd-heartbeat');
              // eslint-disable-next-line no-unused-expressions
              btn.offsetWidth;
              btn.classList.add('hd-heartbeat');
            }
          }
        }
      }
      activeIdSnapshot = activeId;
    });
    return unsub;
  }, [runSaveFlow]);

  const handleClick = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    if (btn.classList.contains('is-saving') || btn.classList.contains('is-burning')) return;

    // ── Mini-game director hook ──
    // Always notify the store so subscribed modes (e.g. doNotPress, threshold-
    // Mash) hear the press. If the active mini-game has overridden mashing to
    // 'paused' or 'inverted', we early-return without running mash visuals or
    // incrementing pressCount.
    const gs = gameStore.getState().resolved;
    const mashingMode = (gs && gs.mashingMode) || 'normal';
    gameStore.handlePress(Date.now());
    if (mashingMode === 'paused' || mashingMode === 'inverted') return;

    btn.classList.remove('is-idle');
    updateMashFocus();
    mash();

    if (!user) {
      anonMashCountRef.current += 1;
      if (anonMashCountRef.current === 5) {
        try {
          if (!sessionStorage.getItem('sl_anon_mash_nudged')) {
            sessionStorage.setItem('sl_anon_mash_nudged', '1');
            setShowNudge(true);
            if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
            nudgeTimerRef.current = setTimeout(() => setShowNudge(false), 6000);
            window.dispatchEvent(new Event('auth:nudge'));
          }
        } catch (_) {}
      }
    }

    hdPressCountRef.current += 1;
    const pressCount = hdPressCountRef.current;
    // Push canonical press count to the mini-game director.
    gameStore.setPressCount(pressCount);
    // Mirror to the high-score bus so HighScoreHud / Celebration can react.
    emitMashCurrent(pressCount);
    if (pressCount === 1) {
      sessionStartRef.current = Date.now();
      sessionUidRef.current = user ? user.uid : null;
      emitMashSessionStart({
        eventId: event && event.id,
        uid: user ? user.uid : null,
      });
      // ── AUDIO START ──
      // Start main track fade-in on first press (6.5 second fade)
      const audioManager = getAudioManager();
      audioManager.startMainTrack('/audio/main-tracks/mash-theme.mp3', 0.7, 6500).catch(err => {
        console.error('[audio] Failed to start main track on first mash press:', err);
      });
      // ── MASH GAME START ──
      // Compute the DELTA needed to translate the row from its natural slot
      // to the viewport center-bottom anchor (50vw, 62vh top of row). Using
      // transform: translate() instead of position:fixed because parent
      // containers (Card, SheetBody) have backdrop-filter which creates a
      // containing block — position:fixed would anchor to them, not viewport.
      try {
        const row = btn.parentElement;
        const r = (row || btn).getBoundingClientRect();
        const rowCx = r.left + r.width / 2;
        const rowCy = r.top + r.height / 2;
        const targetCx = window.innerWidth / 2;
        // Bottom fifth of the viewport — center of button at ~85% Y so the
        // bottom of the button lands near 90vh (thumb-friendly anchor zone).
        // Use visualViewport.height when available so we measure the actually-
        // visible viewport (Android Chrome's nav bar / chrome insets handled).
        const vh = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
        const targetCy = vh * 0.85;
        const dx = Math.round(targetCx - rowCx);
        const dy = Math.round(targetCy - rowCy);
        document.body.style.setProperty('--btn-dx', `${dx}px`);
        document.body.style.setProperty('--btn-dy', `${dy}px`);
        document.body.style.setProperty('--migration-progress', '0');
        document.body.style.setProperty('--canvas-radius', '0');
        const savedY = window.scrollY || window.pageYOffset || 0;
        document.body.dataset.savedScrollY = String(savedY);
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.style.overscrollBehavior = 'none';
        document.body.dataset.mashLocked = '1';
        // Lock viewport zoom for the duration of the game. Pinch-zoom breaks
        // the fixed-layout canvas and can expose the page beneath it.
        // Restored in enterIdleState so other pages remain normally zoomable.
        const vp = document.querySelector('meta[name="viewport"]');
        if (vp) {
          vp.dataset.preGameContent = vp.content;
          vp.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }
        // Recompute --btn-dy on visualViewport changes (Android chrome
        // collapse, soft keyboard, etc.) so the migration target stays
        // anchored to the actually-visible viewport bottom-fifth.
        try {
          if (window.visualViewport && !vvCleanupRef.current) {
            const recalc = () => {
              if (document.body.dataset.mashLocked !== '1') return;
              const rowEl = btn.parentElement;
              if (!rowEl) return;
              // Read the row's CURRENT (translated) position, then back out
              // the migration delta to find its natural origin, then recompute
              // the new delta against the fresh viewport height.
              const cs = getComputedStyle(rowEl);
              // Grab the natural rect by temporarily ignoring transform isn't
              // trivial; instead use the captured --btn-dx/--btn-dy by reading
              // body style and the migration progress.
              const progress = parseFloat(cs.getPropertyValue('--migration-progress')) || 0;
              const curRect = rowEl.getBoundingClientRect();
              const curCx = curRect.left + curRect.width / 2;
              const curCy = curRect.top + curRect.height / 2;
              const oldDx = parseFloat(document.body.style.getPropertyValue('--btn-dx')) || 0;
              const oldDy = parseFloat(document.body.style.getPropertyValue('--btn-dy')) || 0;
              const naturalCx = curCx - oldDx * progress;
              const naturalCy = curCy - oldDy * progress;
              const vv = window.visualViewport;
              const newTargetCx = vv.width / 2;
              const newTargetCy = vv.height * 0.85;
              const newDx = Math.round(newTargetCx - naturalCx);
              const newDy = Math.round(newTargetCy - naturalCy);
              document.body.style.setProperty('--btn-dx', newDx + 'px');
              document.body.style.setProperty('--btn-dy', newDy + 'px');
            };
            window.visualViewport.addEventListener('resize', recalc);
            window.visualViewport.addEventListener('scroll', recalc);
            vvCleanupRef.current = () => {
              try {
                window.visualViewport.removeEventListener('resize', recalc);
                window.visualViewport.removeEventListener('scroll', recalc);
              } catch (_) {}
              vvCleanupRef.current = null;
            };
          }
        } catch (_) {}
      } catch (e) {
        console.warn('[mash-game] GAME START failed:', e && e.message);
      }
      // First press in the session — if signed in, mark this event as
      // interacted-with so they qualify for the Bad Eggs list if they
      // never RSVP. Fire-and-forget; safe if rules reject.
      if (user && event && event.id) {
        try {
          dbSet(
            dbRef(database, `eventInteractions/${event.id}/${user.uid}/lastAt`),
            Date.now()
          ).catch(() => {});
          dbSet(
            dbRef(database, `eventInteractions/${event.id}/${user.uid}/mashed`),
            true
          ).catch(() => {});
        } catch (_) {}
      }
    }
    try {
      logEvent('mash_button_clicked', {
        eventId: event && event.id,
        pressCount,
        uid: user ? user.uid : null,
        signedIn: !!user,
      });
    } catch (_) {}
    const row = btn.parentElement;
    const numEl = row && row.querySelector('.mash-num');
    const subEl = row && row.querySelector('.mash-sub');

    // Ping ripple
    const ping = document.createElement('span');
    ping.className = 'ping';
    btn.appendChild(ping);
    setTimeout(() => ping.remove(), 500);

    // Flying hot dogs — capped at 15 per press for perf headroom.
    // Cap concurrent emojis at 12 per press (was 15) and stagger spawns
    // across a wider window (~1100ms vs 800ms) so they release in a more
    // visible cascade rather than a tight burst.
    const dogCount = Math.min(pressCount, 8);
    const stagger = Math.max(22, Math.floor(1100 / dogCount));
    const pRainbow = rainbowChance(pressCount);
    for (let i = 0; i < dogCount; i++) {
      const rainbow = Math.random() < pRainbow;
      const emoji = pickSpawnEmoji(pressCount);
      setTimeout(() => spawnHotDog(btn, { rainbow, emoji }), i * stagger);
    }
    spawnPhrase(btn, phraseCooldownRef, phraseFifoRef, hdPressCountRef.current);

    // Rainbow eggs at 25+
    if (pressCount >= 25 && Math.random() < 0.30) {
      const eggCount = Math.random() < 0.4 ? 2 : 1;
      for (let i = 0; i < eggCount; i++) {
        setTimeout(() => spawnRainbowEgg(btn), i * 60);
      }
    }

    flashBackground(pressCount);

    // Heartbeat: restart the save-timer indicator animation. Each press
    // resets the heartbeat so it only plays through if the user pauses.
    if (document.body.dataset.ambHeartbeat !== 'off') {
      btn.classList.remove('hd-heartbeat');
      void btn.offsetWidth; // force reflow so the animation actually restarts
      btn.classList.add('hd-heartbeat');
    } else {
      btn.classList.remove('hd-heartbeat');
    }

    // Button scale ramp
    const restScale = 1 + pressCount * 0.022;
    const restScaleY = 1 + pressCount * 0.014;
    btn.style.setProperty('--hd-rest', restScale.toFixed(3));
    btn.style.setProperty('--hd-rest-y', restScaleY.toFixed(3));
    btn.style.setProperty('--hd-pad-y', '14px');

    // Color cycle
    const hue = (pressCount * 14) % 360;
    btn.style.setProperty('--hd-hue', String(hue));

    // Mash energy + shockwave
    setMashEnergy(pressCount);
    applyShockwave();

    // Strobe
    const strobeBoost = 1.5 + Math.min(pressCount * 0.04, 1.5);
    btn.animate(
      [
        { filter: `brightness(${strobeBoost.toFixed(2)}) saturate(${strobeBoost.toFixed(2)})` },
        { filter: 'brightness(1) saturate(1)' }
      ],
      { duration: 160, easing: 'ease-out' }
    );

    // +N counter
    btn.classList.remove('is-saving', 'is-burning');
    btn.classList.add('is-mashing');
    if (numEl) {
      numEl.style.removeProperty('font-size');
      numEl.textContent = `+${fmtCount(pressCount)}`;
      const numSize = 30 + Math.min(pressCount * 1.3, 40);
      numEl.style.fontSize = `${numSize}px`;
    }
    if (row) {
      const mashEl = row.querySelector('.hd-cta-mash');
      if (mashEl) mashEl.style.setProperty('--mash-scale', '1');
    }

    // Intensity
    btn.dataset.intensity = String(bandForPress(pressCount));

    // Challenge text — crew-specific challenges get 1.5s extra dwell (4s total)
    // so there's time to actually read the inside jokes.
    // When a mini-game has frozen the challenge text (data-amb-challenge=
    // frozen) or turned it off, skip the rotation so the user reads the
    // mini-game's instruction instead.
    const now = Date.now();
    const ambChallenge = document.body.dataset.ambChallenge;
    if (ambChallenge !== 'frozen' && ambChallenge !== 'off') {
      const isHandTuned = pressCount <= HD_FIRST_25.length;
      const currentDwell = CREW_TEXT_SET.has(hdLastChallengeRef.current) ? 4000 : 2500;
      const shouldRefreshChallenge = isHandTuned || (now - hdLastChallengeAtRef.current >= currentDwell);
      if (shouldRefreshChallenge) {
        const challenge = pickChallenge(pressCount, hdChallengeFifoRef);
        hdLastChallengeRef.current = challenge;
        hdLastChallengeAtRef.current = now;
        if (subEl) setSub(subEl, challenge);
      }
    }

    // ── Layout diagnostics ──
    if (pressCount >= DEEP_MASH_THRESHOLD) btn.classList.add('is-deep-mashing');
    else btn.classList.remove('is-deep-mashing');

    // Save/burn/reset sequence — armed each press; cleared by the next
    // press. If the user stops mashing for KUDOS_SAVE_DELAY_MS, runSaveFlow
    // fires. Also called directly by gameStore.onSessionEnd on a mini-game
    // fail-out.
    if (hdResetTimerRef.current) clearTimeout(hdResetTimerRef.current);
    // Don't arm a save timer while the world is paused OR when the user
    // can't physically extend it (mashing paused/inverted — Pig Boy, Pong,
    // Freeze). The pause subscription re-arms it when the mini-game ends.
    const r = gameStore.getState().resolved;
    const cantExtend = r && (
      r.gameClockPaused ||
      r.mashingMode === 'paused' ||
      r.mashingMode === 'inverted'
    );
    if (!cantExtend) {
      hdResetTimerRef.current = setTimeout(() => {
        runSaveFlow();
      }, KUDOS_SAVE_DELAY_MS);
    }
  }, [mash, updateMashFocus, user, event, runSaveFlow]);

  return (
    <KudosRow className="kudos-row">
      <HdCta
        ref={btnRef}
        className="hd-cta"
        data-intensity="0"
        title="Mash for hot doggy dog love"
        onClick={handleClick}
        type="button"
      >
        <CtaTop className="hd-cta-top">
          <CtaCount className="hd-cta-count">+{fmtCount(displayCount)}</CtaCount>
        </CtaTop>
        <CtaText className="hd-cta-text">Mash me</CtaText>
      </HdCta>
      <MashOverlay className="hd-cta-mash">
        <MashNum className="mash-num">MASH ME</MashNum>
        <MashSub className="mash-sub" />
      </MashOverlay>
      <MashNowWarning />
      {showNudge && (
        <Toast
          type="button"
          onClick={() => {
            setShowNudge(false);
            if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
            window.dispatchEvent(new Event('auth:open'));
          }}
        >
          Mashing in the dark? 🌭 <strong>Sign in</strong> to track your streak and climb the leaderboard.
        </Toast>
      )}
    </KudosRow>
  );
}

// Emoji spawn pool helpers (module scope)
const FIRE_EMOJIS = ['🔥', '🔥', '🔥', '💥', '🌋', '⚡'];
const FARM_EMOJIS = ['🐄','🐔','🐷','🐑','🐓','🦆','🐰','🐎','🦃','🌽','🥕','🚜','🌾','🐸','🦉'];
const CHAOS_EMOJIS = ['🎉','🎊','🎈','🌈','⭐','🌟','💥','✨','💫','🎯','🏆','🥇','🎪','🎭','🎨','🎬','🎮','🎲','🃏','🍕','🍔','🌮','🍜','🍣','🍦','🍩','🎂','🚀','✈️','🚂','🏎️','🌊','💨','🌪️','🌩️','🦄','🐉','🦋','🐬','🦁','🐯','🦊','🦅','💎','🔮','🗝️','⚔️','🛡️','🏰','🌋','🌸','🌺','🌻','🌹','🍀','🍄','🌙','☀️','🎸','🥁','🏄','🧗','🤿','🪂','⛷️','🏇','🥊','🎳','🎯','🎰'];
const DIVERSE_EMOJIS = ['🚴🏿','🚴🏾','🚴🏽','🚴🏼','🏃🏿','🏃🏾','🏃🏽','🤸🏿','🤸🏾','🤸🏽','💪🏿','💪🏾','💪🏽','🙌🏿','🙌🏾','🙌🏽','🧑🏿','👩🏿','👨🏿','🧑🏽','👩🏽','👨🏽'];

function farmMixRatio(pressCount) {
  if (pressCount < 25) return 0;
  return Math.min((pressCount - 25) / 75 * 0.65, 0.65);
}

function pickSpawnEmoji(pressCount) {
  if (pressCount >= 100 && Math.random() < 0.25)
    return DIVERSE_EMOJIS[Math.floor(Math.random() * DIVERSE_EMOJIS.length)];
  if (pressCount >= 50 && Math.random() < 0.20)
    return CHAOS_EMOJIS[Math.floor(Math.random() * CHAOS_EMOJIS.length)];
  if (pressCount >= 25 && Math.random() < 0.15)
    return FIRE_EMOJIS[Math.floor(Math.random() * FIRE_EMOJIS.length)];
  if (Math.random() < farmMixRatio(pressCount))
    return FARM_EMOJIS[Math.floor(Math.random() * FARM_EMOJIS.length)];
  return '🌭';
}
