import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useEventKudos } from '../../hooks/useEventKudos';
import { useCurrentUser } from '../../services/auth';
import { ref as dbRef, push as dbPush, set as dbSet, runTransaction } from 'firebase/database';
import { database } from '../../services/firebase';
import { logEvent } from '../../services/analytics';
import {
  setMashEnergy, clearMashEnergy, applyShockwave, clearShockwave,
  spawnHotDog, spawnRainbowEgg, flashBackground, spawnPhrase, rainbowChance,
} from '../../hooks/useMashEffects';
import { fmtCount } from '../../hooks/useEventLifecycle';

// ─── Constants ───────────────────────────────────────────────────────────────
const KUDOS_SAVE_DELAY_MS = 2500;
const KUDOS_SAVE_ANIM_MS = 1300;
const KUDOS_BURN_MS = 4000;
const DEEP_MASH_THRESHOLD = 10;

const HD_BURN_MESSAGES = [
  "Better luck next time", "That was weak", "Are you a bad egg?",
  "You must be scrambled", "Soft. Try again.", "Cracked under pressure",
  "Need more yolk", "Pedaler in training", "C'mon, hammer harder",
  "Was that all? Really?", "The bun is disappointed", "Even the dog is bored",
  "Wow, I'm stoked on that", "That was good for me too", "But you can do better",
  "That's the best I've had… lately", "Come on, do better", "DNF again",
  "DNS again", "Hey, at least you tried", "Cute effort",
  "Was that supposed to impress me?", "I've felt more", "I've seen eggs work harder",
];

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
   // Coach Lyall — half motivating, half judging
   "Coach Lyall says dig deeper",
   "Lyall's seen better effort from his couch",
   "Coach Lyall is NOT impressed",
   "Lyall's giving you THE look",
   "Coach Lyall expected more",
   // Scrambled Legs / bad egg puns
   "You call that scrambled?",
   "Eggs-cuse me?! That's it?",
   "Over-easy isn't a training plan",
   "Bad egg energy right here",
   "Runny. Very runny.",
   // General crew pressure
   "The crew has seen better",
   "Soft boiled at best",
   "The yolk's on you",
   // Jordan (Bad Egg) — prefers running, crashes constantly
   "Jordan would rather run",
   "Bad Egg is judging you",
   "Jordan crashed harder than that",
   "Running is NOT cycling, Jordan",
   "Even Bad Egg mashes better",
   // Dave SWIDZ — sends it everywhere, bars included
   "SWIDZ already sent it",
   "Dave's at the bar. Are you?",
   "Send it like SWIDZ",
   "SWIDZ would've sent that by now",
   "Dave's getting a beer. Keep going.",
   // Pig Boy — broken bones, couch potato
   "Pig Boy watched from the couch",
   "Every bone Pig Boy broke screams harder",
   "Pig Boy's wrist is judging you",
   "Pig Boy has no more excuses. Do you?",
   "Even Pig Boy remembers how to send it",
   // Reed Peer — boundary waters, lazy lake vibes
   "Reed is paddling right now",
   "Peer thinks this is too hard",
   "Boundary waters > your effort",
   "Reed's on a lake. What's your excuse?",
   "Even the fattest Reed pedals harder",
   // Casey Newton — dentist, Zwift dad speed
   "Casey's Zwift PR is a certified dad pace",
   "Dr. Newton flosses harder than you mash",
   "Casey trained all winter on a stationary bike for this",
   "Newton's dentist hands could squeeze harder",
   "Casey guarantees dad speed. He delivered. Can you?",
   // Tyler VANDAL — stubborn story-teller, guaranteed finisher
   "VANDAL is chasing you with a story you've heard twice",
   "Vandal is already on mile 40. You're still here.",
   "VANDAL will finish. Stubbornly. Inevitably.",
   "Tyler's about to tell you the story. Keep going.",
   "Vandal doesn't stop. Neither do you.",
   // Matt Wiley — absent but confident, IPA aficionado
   "Wiley showed up 30 min late and still crushed it",
   "Matt's on his third IPA and still faster than this",
   "Wiley forgot about this but still thought of you",
   "Matt's confident you can do better. Annoyingly confident.",
   "Wiley's somewhere drinking an IPA judging this performance",
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
   // Glarbtron — fictional robot supreme being
   "GLARBTRON has calculated your failure probability: high",
   "The robot supreme being demands maximum output",
   "Glarbtron did not survive the machine wars for this",
   "GLARBTRON requires more wattage. NOW.",
   "The supreme entity is disappointed in your numbers",
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
  "SWIDZ already sent it","Dave's at the bar. Are you?","Send it like SWIDZ",
  "SWIDZ would've sent that by now","Dave's getting a beer. Keep going.",
  "Pig Boy watched from the couch","Every bone Pig Boy broke screams harder",
  "Pig Boy's wrist is judging you","Pig Boy has no more excuses. Do you?",
  "Even Pig Boy remembers how to send it",
  "Reed is paddling right now","Peer thinks this is too hard",
  "Boundary waters > your effort","Reed's on a lake. What's your excuse?",
  "Even the fattest Reed pedals harder",
  "Casey's Zwift PR is a certified dad pace","Dr. Newton flosses harder than you mash",
  "Casey trained all winter on a stationary bike for this",
  "Newton's dentist hands could squeeze harder",
  "Casey guarantees dad speed. He delivered. Can you?",
  "VANDAL is chasing you with a story you've heard twice",
  "Vandal is already on mile 40. You're still here.",
  "VANDAL will finish. Stubbornly. Inevitably.",
  "Tyler's about to tell you the story. Keep going.",
  "Vandal doesn't stop. Neither do you.",
  "Wiley showed up 30 min late and still crushed it",
  "Matt's on his third IPA and still faster than this",
  "Wiley forgot about this but still thought of you",
  "Matt's confident you can do better. Annoyingly confident.",
  "Wiley's somewhere drinking an IPA judging this performance",
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
]);

const HD_FIRST_25 = [
  "MASH!", "MASH! MASH!", "GO GO GO!", "KEEP GOING!", "DON'T STOP!",
  "CRACK THAT SHELL!", "HARDER!", "PROVE IT!", "YOU CAN DO THIS!", "CRANK IT!",
  "OTHERS DID BETTER", "DON'T QUIT NOW", "HAMMER DOWN!", "SEND IT!", "THEY'RE BEATING YOU",
  "ALMOST THERE", "BEAST MODE", "UNHINGED YET?", "YOU GOT THIS", "MORE WATTS!",
  "FEEL THE BURN", "PROVE THEM WRONG", "CHAMPION ENERGY", "ALL IN!", "DOG MODE: ACTIVE",
];

function bandForPress(c) {
  if (c <= 2) return 0;
  if (c <= 5) return 1;
  if (c <= 9) return 2;
  if (c <= 14) return 3;
  if (c <= 24) return 4;
  return 5;
}

function pickChallenge(pressCount, lastChallenge) {
  if (pressCount >= 1 && pressCount <= HD_FIRST_25.length) {
    return HD_FIRST_25[pressCount - 1];
  }
  const band = HD_CHALLENGE_BANDS[bandForPress(pressCount)];
  let challenge;
  let attempts = 0;
  do {
    challenge = band[Math.floor(Math.random() * band.length)];
    attempts++;
  } while (challenge === lastChallenge && band.length > 1 && attempts < 10);
  return challenge;
}

function setSub(el, text) {
  if (!el) return;
  el.textContent = text;
  if (!text) { el.style.fontSize = ''; return; }
  const maxW = Math.min(window.innerWidth * 0.86, 480);
  const maxPx = 26, minPx = 12;
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
  &[data-intensity="4"] { box-shadow: 0 20px 70px rgba(255,255,255,0.65); animation: ${ctaThrob} 0.65s ease-in-out infinite; }
  &[data-intensity="5"] { box-shadow: 0 24px 90px rgba(255,255,200,0.85), 0 0 60px rgba(255,255,255,0.5); animation: ${ctaThrob} 0.45s ease-in-out infinite; }
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

const CtaEmoji = styled.span`
  font-size: 30px;
  line-height: 1;

  ${HdCta}.is-idle & { font-size: 17px; }
`;

const CtaCount = styled.span`
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  transition: font-size 0.2s;

  ${HdCta}.is-idle & { font-size: 13px; font-weight: 600; }
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
  gap: 6px;
  max-width: 95%;
  width: max-content;
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
  line-height: 1;
  color: #fff;
  text-shadow: 0 3px 12px rgba(0,0,0,0.85), 0 0 24px rgba(255,255,255,0.45);
  transition: font-size 0.22s ease;
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;

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

  /* Burning style */
  .is-burning ~ ${MashOverlay} & {
    font-size: clamp(22px, 6.5vw, 34px) !important;
    font-style: italic;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: normal;
    text-align: center;
    line-height: 1.15;
    animation: burnFlash 4s cubic-bezier(.34,1.56,.64,1) forwards;
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
  font-size: 24px;
  line-height: 1.1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #FFE66D;
  text-shadow: 0 0 12px rgba(255,199,44,0.55), 0 0 24px rgba(255,107,107,0.4), 0 2px 8px rgba(0,0,0,0.8);
  opacity: 0;
  transition: opacity 0.22s;
  pointer-events: none;
  white-space: nowrap;
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
  const phraseCooldownRef = useRef(0);
  const lastPhraseIndexRef = useRef(-1);
  const sessionStartRef = useRef(0);
  const sessionUidRef = useRef(null);

  useEffect(() => {
    if (isSheetContext) {
      document.body.dataset.sheetOpen = '1';
    }
    // Ensure idle state on mount
    enterIdleState();
    return () => {
      if (isSheetContext) {
        delete document.body.dataset.sheetOpen;
      }
      // Cleanup on unmount
      if (hdPressCountRef.current > 0) enterIdleState();
      if (hdResetTimerRef.current) clearTimeout(hdResetTimerRef.current);
      if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
    };
  }, [isSheetContext]); // eslint-disable-line react-hooks/exhaustive-deps

  const enterIdleState = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const row = btn.parentElement;
    btn.classList.remove('is-mashing', 'is-deep-mashing', 'is-saving', 'is-burning');
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
  }, []);

  const handleClick = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    if (btn.classList.contains('is-saving') || btn.classList.contains('is-burning')) return;

    btn.classList.remove('is-idle');
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
    if (pressCount === 1) {
      sessionStartRef.current = Date.now();
      sessionUidRef.current = user ? user.uid : null;
    }
    try {
      logEvent('mash_button_clicked', {
        eventId: event && event.id,
        pressCount,
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

    // Flying hot dogs
    const dogCount = Math.min(pressCount, 25);
    const stagger = Math.max(12, Math.floor(800 / dogCount));
    const pRainbow = rainbowChance(pressCount);
    for (let i = 0; i < dogCount; i++) {
      const rainbow = Math.random() < pRainbow;
      const emoji = pickSpawnEmoji(pressCount);
      setTimeout(() => spawnHotDog(btn, { rainbow, emoji }), i * stagger);
    }
    spawnPhrase(btn, phraseCooldownRef, lastPhraseIndexRef);

    // Rainbow eggs at 25+
    if (pressCount >= 25 && Math.random() < 0.30) {
      const eggCount = Math.random() < 0.4 ? 2 : 1;
      for (let i = 0; i < eggCount; i++) {
        setTimeout(() => spawnRainbowEgg(btn), i * 60);
      }
    }

    flashBackground(pressCount);

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
    const now = Date.now();
    const isHandTuned = pressCount <= HD_FIRST_25.length;
    const currentDwell = CREW_CHALLENGES.has(hdLastChallengeRef.current) ? 4000 : 2500;
    const shouldRefreshChallenge = isHandTuned || (now - hdLastChallengeAtRef.current >= currentDwell);
    if (shouldRefreshChallenge) {
      const challenge = pickChallenge(pressCount, hdLastChallengeRef.current);
      hdLastChallengeRef.current = challenge;
      hdLastChallengeAtRef.current = now;
      if (subEl) setSub(subEl, challenge);
    }

    if (pressCount >= DEEP_MASH_THRESHOLD) btn.classList.add('is-deep-mashing');
    else btn.classList.remove('is-deep-mashing');

    // Save/burn/reset sequence
    if (hdResetTimerRef.current) clearTimeout(hdResetTimerRef.current);
    hdResetTimerRef.current = setTimeout(() => {
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
      if (numEl) { numEl.textContent = `saving ${fmtCount(hdPressCountRef.current)}`; numEl.style.fontSize = '28px'; }
      if (subEl) subEl.textContent = '';

      setTimeout(() => {
        // Phase B — burn
        btn.classList.remove('is-saving');
        btn.classList.add('is-burning');
        let burnMsg;
        do { burnMsg = HD_BURN_MESSAGES[Math.floor(Math.random() * HD_BURN_MESSAGES.length)]; }
        while (burnMsg === hdLastBurnRef.current && HD_BURN_MESSAGES.length > 1);
        hdLastBurnRef.current = burnMsg;
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
              logEvent('mash_session_complete', {
                eventId: event.id,
                count: finalCount,
                durationMs: Date.now() - (sessionStart || Date.now()),
              });
            } catch (_) {}
          } else if (finalCount > 0 && event && event.id) {
            logEvent('mash_session_complete', {
              eventId: event.id,
              count: finalCount,
              anonymous: true,
            });
          }
          hdPressCountRef.current = 0;
          hdLastChallengeRef.current = '';
          hdLastChallengeAtRef.current = 0;
          sessionStartRef.current = 0;
          sessionUidRef.current = null;
          btn.style.setProperty('--hd-rest-y', '1');
          enterIdleState();
        }, KUDOS_BURN_MS);
      }, KUDOS_SAVE_ANIM_MS);
    }, KUDOS_SAVE_DELAY_MS);
  }, [mash, enterIdleState, user]);

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
          <CtaEmoji className="hd-cta-emoji">🌭</CtaEmoji>
          <CtaCount className="hd-cta-count">{fmtCount(displayCount)}</CtaCount>
        </CtaTop>
        <CtaText className="hd-cta-text">Mash me</CtaText>
      </HdCta>
      <MashOverlay className="hd-cta-mash">
        <MashNum className="mash-num">MASH ME</MashNum>
        <MashSub className="mash-sub" />
      </MashOverlay>
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
