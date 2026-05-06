import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';
// Side-effect import: parses ?n= notif-open param and pings the logOpen function.
import './services/openTracking';
import './services/ai';
// Cache-mismatch self-heal + new-version detection.
import './services/freshness';
// Stale-session guard — soft/hard refresh after long away periods.
import './services/staleSessionGuard';
// Capture and log uncaught errors / promise rejections to RTDB.
import './services/errorLogger';
// Per-tab session tracking — writes to sessions/{sid}, attributes events.
import './services/sessionTracker';

const BUILD_ID = `${process.env.NODE_ENV}-${new Date().toISOString().replace(/[:.]/g, '')}`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    height: -webkit-fill-available;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #2c3539;
    position: relative;
    overflow-x: hidden;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    touch-action: manipulation;
    -webkit-overflow-scrolling: touch;
  }

  /* ── Calendar / Mash global CSS vars ── */
  body {
    --mash-energy: 0;
    --mash-overdrive: 0;
  }

  /* ── Mash vignette ── */
  .mash-vignette {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 500;
    opacity: var(--mash-energy, 0);
    background: radial-gradient(
      ellipse 58% 42% at var(--mash-x, 50%) var(--mash-y, 75%),
      transparent 16%,
      rgba(0,0,0,0.7) 48%,
      rgba(0,0,0,1) 92%
    );
    transition: opacity 0.45s ease;
  }

  @media (max-width: 768px) {
    .mash-vignette {
      background: radial-gradient(
        ellipse 58% 42% at var(--mash-x, 50%) var(--mash-y, 75%),
        transparent 16%,
        rgba(0,0,0,0.56) 48%,
        rgba(0,0,0,0.80) 92%
      );
    }
  }

  /* ── Mash flash ── */
  .mash-flash {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 490;
    opacity: 0;
  }

  /* ── When sheet is open, bump z-indexes above sheet ── */
  body[data-sheet-open="1"] .flying-hot-dog,
  body[data-sheet-open="1"] .flying-egg,
  body[data-sheet-open="1"] .phrase-char { z-index: 9000; }
  /* Vignette sits BELOW the sheet (sheet z-index 2100) so it darkens the
     world behind without covering the mash button — mirrors the home-page
     feel where the button stays lit while the screen dims. */
  body[data-sheet-open="1"] .mash-vignette { z-index: 2050; }
  body[data-sheet-open="1"] .mash-flash   { z-index: 2150; }
  body[data-sheet-open="1"] .mash-vignette {
    background: radial-gradient(
      ellipse 58% 40% at var(--mash-x, 50%) var(--mash-y, 88%),
      transparent 16%,
      rgba(0,0,0,0.70) 48%,
      rgba(0,0,0,1) 92%
    );
  }

  @media (max-width: 768px) {
    body[data-sheet-open="1"] .mash-vignette {
      background: radial-gradient(
        ellipse 58% 40% at var(--mash-x, 50%) var(--mash-y, 88%),
        transparent 16%,
        rgba(0,0,0,0.56) 48%,
        rgba(0,0,0,0.80) 92%
      );
    }
  }

  /* ── kudos-row stays above vignette when mashing ── */
  body[data-mashing="1"] .kudos-row {
    z-index: 700;
  }

  /* ────────────────────────────────────────────────────────────────────────
     MASH GAME — locked-state visual stack
     Activates on first press (body[data-mash-locked="1"]).
     Releases on burn-complete (cleared by clearMashEnergy).
     Mobile portrait is the design center; desktop scales gracefully.
     ──────────────────────────────────────────────────────────────────────── */

  /* MashCanvas — full-viewport gradient layer that grows from button center.
     --canvas-radius scales 0→1 across presses 1→50 on an ease-in curve.
     Opacity is bound to canvas-radius so the canvas fades IN as it grows —
     by press 50 it's fully opaque + fully sized = completely solid takeover. */
  .mash-canvas {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 480;
    opacity: var(--canvas-radius, 0);
    background:
      radial-gradient(
        circle at var(--mash-x, 50%) var(--mash-y, 72%),
        rgba(255,107,107,1) 0%,
        rgba(120,40,110,1) 30%,
        rgba(35,20,55,1) 70%,
        rgba(8,5,15,1) 100%
      );
    clip-path: circle(
      calc(var(--canvas-radius, 0) * 150vmax)
      at var(--mash-x, 50%) var(--mash-y, 72%)
    );
    will-change: clip-path, opacity;
  }
  body[data-mash-locked="1"] .mash-canvas {
    /* Canvas stays purely visual — input isolation is done by body::before
       below, which is full-viewport regardless of the canvas clip-path. */
    pointer-events: none;
    z-index: 9000;
  }

  /* ── Input isolation layer ────────────────────────────────────────────────
     During the mash game the page underneath must be fully inert: no link
     activation, no native selection, no map/share button taps, no double-tap
     editor pop-ups. The visible canvas can't do this on its own because its
     clip-path also clips hit-testing — so during the intro (presses 1–24)
     anything outside the growing circle would still receive events.

     Solution: a transparent full-viewport ::before pseudo on body, sitting
     just below the canvas (z 8999) but above all page UI. It absorbs every
     pointer/touch event the moment lock engages.

     What still receives input:
       - kudos-row (z 9001) — the mash button stays clickable
       - flying spawns (z 9100+) — future clickable game elements
     Everything else: dead. */
  body[data-mash-locked="1"]::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 8999;
    background: transparent;
    pointer-events: auto;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  /* Kill page-wide text selection / iOS callout while locked so a long-press
     or double-click anywhere can't pop the OS text editor. */
  body[data-mash-locked="1"] {
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }

  /* Lift all spawn effects above the canvas during the mash game so the
     flying hot dogs, eggs, and phrase characters paint over the canvas
     instead of being buried beneath it. */
  body[data-mash-locked="1"] .flying-hot-dog,
  body[data-mash-locked="1"] .flying-egg,
  body[data-mash-locked="1"] .phrase-char {
    z-index: 9100 !important;
  }

  /* ── Heartbeat / save-timer indicator ────────────────────────────────────
     2500ms duration matches KUDOS_SAVE_DELAY_MS. Restarts on each press.
     Phases (non-linear, accelerating intensity):
     - 0-50%   calm, barely visible
     - 50-65%  subtle scale + slight color drift starts
     - 65-80%  noticeable color shift, hue starts cycling, brightness up
     - 80-92%  scale beats + dramatic hue jumps + saturation spikes
     - 92-100% rapid strobe, intense hue rotation, "about to explode"
     Concentric rings emanate from the button via ::before / ::after with
     staggered keyframes — first ripple at 55%, accelerating through 100%. */
  @keyframes hdHeartbeat {
    0%, 50% { transform: scale(min(var(--mash-scale, 1), 1.15)); filter: none; }
    /* Phase 1: 50→65% — color awareness starts */
    55% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.02)); filter: brightness(1.05) saturate(1.10) hue-rotate(8deg); }
    62% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 0.99)); filter: brightness(1.02) saturate(1.05) hue-rotate(-4deg); }
    /* Phase 2: 65→80% — color drift dialing up */
    68% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.06)); filter: brightness(1.12) saturate(1.20) hue-rotate(18deg); }
    75% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.00)); filter: brightness(1.05) saturate(1.15) hue-rotate(-12deg); }
    /* Phase 3: 80→92% — scale beats + dramatic shifts */
    82% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.10)); filter: brightness(1.20) saturate(1.30) hue-rotate(35deg); }
    86% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 0.97)); filter: brightness(0.92) saturate(1.40) hue-rotate(-25deg); }
    90% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.14)); filter: brightness(1.30) saturate(1.50) hue-rotate(55deg); }
    /* Phase 4: 92→100% — rapid strobe */
    93% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 0.94)); filter: brightness(0.78) saturate(1.60) hue-rotate(-50deg); }
    95% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.20)); filter: brightness(1.50) saturate(1.70) hue-rotate(80deg); }
    97% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 0.90)); filter: brightness(0.65) saturate(1.80) hue-rotate(-70deg); }
    99% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.24)); filter: brightness(1.75) saturate(1.95) hue-rotate(120deg); }
    100% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.28)); filter: brightness(1.95) saturate(2.10) hue-rotate(160deg); }
  }

  /* Ripple ring 1 — starts at 55%, expands to white. 3 emissions, accelerating. */
  @keyframes hdRipple1 {
    0%, 55% { box-shadow: 0 0 0 0 rgba(255,255,255,0); transform: scale(1); }
    /* Wave A — white */
    58% { box-shadow: 0 0 0 0 rgba(255,255,255,0.95); }
    68% { box-shadow: 0 0 0 18px rgba(255,255,255,0); }
    /* Wave B — gold */
    78% { box-shadow: 0 0 0 0 rgba(255,200,80,1); }
    86% { box-shadow: 0 0 0 24px rgba(255,200,80,0); }
    /* Wave C — red, intense */
    91% { box-shadow: 0 0 0 0 rgba(255,80,80,1); }
    96% { box-shadow: 0 0 0 32px rgba(255,80,80,0); }
    /* Wave D — magenta strobe */
    98% { box-shadow: 0 0 0 0 rgba(255,40,180,1); }
    100% { box-shadow: 0 0 0 38px rgba(255,40,180,0); }
  }

  /* Ripple ring 2 — offset for layered/staggered effect */
  @keyframes hdRipple2 {
    0%, 62% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
    65% { box-shadow: 0 0 0 0 rgba(255,220,150,0.9); }
    74% { box-shadow: 0 0 0 22px rgba(255,220,150,0); }
    83% { box-shadow: 0 0 0 0 rgba(255,140,60,1); }
    89% { box-shadow: 0 0 0 28px rgba(255,140,60,0); }
    94% { box-shadow: 0 0 0 0 rgba(255,60,60,1); }
    98% { box-shadow: 0 0 0 36px rgba(255,60,60,0); }
    100% { box-shadow: 0 0 0 0 rgba(255,60,60,0); }
  }

  .hd-cta.hd-heartbeat {
    animation: hdHeartbeat 2500ms ease-in forwards;
  }
  .hd-cta.hd-heartbeat::before,
  .hd-cta.hd-heartbeat::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: -1;
  }
  .hd-cta.hd-heartbeat::before { animation: hdRipple1 2500ms ease-in forwards; }
  .hd-cta.hd-heartbeat::after  { animation: hdRipple2 2500ms ease-in forwards; }

  /* During the locked game (presses 1–25) the count and challenge sub-text
     coexist inside the button:
       - .mash-num pinned dead-center (vertical + horizontal)
       - .mash-sub pinned to the button's bottom edge (8px above bottom),
         centered horizontally, so it never overlaps the count.
     On press 26 (--sub-out flips 0→1 instantly) the sub JUMPS to a position
     just above the button (anchored to the actual button height --btn-h, so
     it always lands the same visual gap above the box regardless of padding
     or scale). No transition — the user wants a hard cut, not a slide. */
  /* Locked overlay: takes the full button height so flex-stacked children
     (num + sub during 1–25) actually have room to lay out without
     overlapping. transform restores the Y translate that .is-mashing drops. */
  body[data-mash-locked="1"] .hd-cta-mash {
    top: 50% !important;
    bottom: auto !important;
    height: 100% !important;
    transform: translate(-50%, -50%) scale(var(--mash-scale, 1)) !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 2px !important;
    padding: 4px 8px !important;
  }
  body[data-mash-locked="1"] .mash-num {
    /* Flex child — natural width, centered text, line-height tight so it
       doesn't claim more vertical space than its glyph height. */
    position: static;
    left: auto;
    top: auto;
    transform: none;
    width: 100%;
    max-width: 100%;
    text-align: center;
    line-height: 1;
    flex: 0 0 auto;
  }

  /* Sub during PRESSES 1–25 (data-sub-out="0"): sits IN the flex column
     directly below the count, inside the button. No absolute positioning
     means it can't overlap with num — they share the column and stack. */
  body[data-mash-locked="1"][data-sub-out="0"] .mash-sub {
    position: static;
    left: auto;
    bottom: auto;
    transform: none;
    transition: none;
    flex: 0 0 auto;
    /* Smaller during the intro so num + sub stack within the button's
       58–117px height range. */
    font-size: clamp(11px, 2.6vw, 14px);
    line-height: 1.05;
    max-width: 100%;
  }

  /* Sub during PRESSES 26+ (data-sub-out="1"): jumps above the button.
     Uses the measured button height (--btn-h written each press). The
     0.8× ratio lands sub's bottom edge ~8px above the button's top edge
     (math derived from overlay being ~0.6× btn_h centered in button +
     sub anchored 8px from overlay bottom — verified via dumpMashLayout). */
  body[data-mash-locked="1"][data-sub-out="1"] .mash-sub {
    position: absolute;
    left: 50%;
    bottom: 8px;
    /* Math (overlay now fills btn h so sub natural bottom sits at btn_top +
       (btn_h - 8)). To land sub bottom 8px ABOVE btn top:
       translateY = (btn_top - 8) − (btn_top + btn_h − 8) = -btn_h. */
    transform: translateX(-50%)
      translateY(calc(-1 * var(--btn-h, 120px)));
    transition: none;
    flex: initial;
    font-size: clamp(13px, 4vw, 19px);
    line-height: 1.15;
  }

  /* Killing backdrop-filter on the event shell during lock destroys its
     stacking context. Same for CalSection's z-index. Both are stacking
     context creators that were trapping the kudos-row's z-index 9001 inside
     a context lower than the canvas's z 9000. With these dropped, the
     row's z 9001 competes directly with the canvas in the body's stacking
     context — row wins, button paints above canvas.

     The shell/section's other content (banner, name, etc.) stays at z auto
     and remains visually covered by the canvas — desired. */
  body[data-mash-locked="1"] .event-shell {
    backdrop-filter: none !important;
    /* Card's overflow:hidden was clipping the migrated button below its
       natural box. Allow children to render outside while locked. */
    overflow: visible !important;
  }
  body[data-mash-locked="1"] .cal-section,
  body[data-mash-locked="1"] .home-content {
    z-index: auto !important;
  }


  /* Vignette fades while the canvas owns the screen — canvas does the
     darkening job once it's full. */
  body[data-mash-locked="1"] .mash-vignette {
    opacity: calc(0.65 * (1 - var(--canvas-radius, 0))) !important;
    transition: opacity 0.4s ease;
  }

  /* Kudos row migration via transform — stays in document flow (avoids
     containing-block issues with backdrop-filter on Card/SheetBody) and just
     visually translates from its natural slot toward the captured target
     delta over presses 1→25. */
  body[data-mash-locked="1"] .kudos-row {
    z-index: 9001;
    position: relative;
    /* Migration translate + optional drag offset (Pig Boy Attack uses this).
       --btn-drag-x/y are written by KudosCta during pointermove while the
       buttonState is 'draggable'. They persist after pointerup (button
       parks where released) and clear on phase-end (button snaps back
       via the transition rule below). */
    transform: translate(
      calc(var(--btn-dx, 0px) * var(--migration-progress, 0) + var(--btn-drag-x, 0px)),
      calc(var(--btn-dy, 0px) * var(--migration-progress, 0) + var(--btn-drag-y, 0px))
    );
    transition: transform 0.42s cubic-bezier(.22,.61,.36,1);
  }
  /* While draggable, kill the transition so the button tracks the finger
     1:1. data-snap-back is a one-frame override that mode cleanup uses
     to force the button to teleport back to anchor rather than glide. */
  body[data-button-state="draggable"] .kudos-row,
  body[data-snap-back="1"] .kudos-row {
    transition: none;
  }
  body[data-button-state="draggable"] .hd-cta {
    /* Prevent native scroll-on-drag on touch devices */
    touch-action: none;
    cursor: grab;
  }
  body[data-button-state="draggable"] .hd-cta:active {
    cursor: grabbing;
  }

  /* Pig Boy Attack avatar: when active, the mode renders a small emoji
     that tracks the button center. The avatar itself is the touch target
     (pointer-events: auto + direct pointer listeners in the mode), so we
     hide the underlying button visuals and shrink it to a tiny invisible
     disc that just provides positional anchoring for the avatar. */
  /* Pig Boy: the button stays full-sized and fully interactable for drag
     input — but it's visually INVISIBLE. Only the girl emoji (avatar
     overlay) is visible. The button is still the drag target (KudosCta's
     drag wiring handles pointerdown on .hd-cta), but its background /
     border / shadow are transparent and its content is hidden, so the
     player only sees the girl. Pig collision uses the avatar's bounding
     rect (in the mode), not the button's, so pigs only "touch" the
     visible girl, never an invisible button edge. */
  body[data-pig-avatar="1"] .hd-cta {
    background: transparent !important;
    border-color: transparent !important;
    box-shadow: none !important;
    color: transparent !important;
  }
  body[data-pig-avatar="1"] .hd-cta-mash,
  body[data-pig-avatar="1"] .hd-cta-top,
  body[data-pig-avatar="1"] .hd-cta-text,
  body[data-pig-avatar="1"] .hd-cta.hd-heartbeat::before,
  body[data-pig-avatar="1"] .hd-cta.hd-heartbeat::after {
    display: none;
  }
  /* Avatar pulse — slow, subtle, signals "she's still the target." */
  @keyframes pigAvatarPulse {
    0%, 100% { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.55)) brightness(1.0); }
    50%      { filter: drop-shadow(0 6px 16px rgba(255,179,217,0.85)) brightness(1.10); }
  }
  /* Pure visual overlay — pointer-events: none so taps go through to the
     button below. KudosCta's drag wiring captures pointerdown on .hd-cta
     just like Pong does. */
  .pig-target-avatar {
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .pig-target-avatar.is-pulsing {
    animation: pigAvatarPulse 1.4s ease-in-out infinite;
  }

  /* Button reshape during migration:
     - Width shrinks 25% (1.0 → 0.75) over presses 1→25
     - Vertical padding grows so button gets ~25% taller
     Result by press 25: noticeably more square-ish (still rectangular).
     Outer scale cap at 1.15 stays. */
  /* Button reshape during migration:
     - Width shrinks 32.5% (1.0 → 0.675) by press 25 (25% + additional 10%)
     - Vertical padding grows from 14 → ~45 over presses 1→25 (~50% taller)
     Result: noticeably more square-ish action button at destination.
     Outer scale cap at 1.15 stays. */
  body[data-mash-locked="1"] .hd-cta {
    transform: scale(min(var(--mash-scale, 1), 1.15));
    width: calc(100% - 32.5% * var(--migration-progress, 0));
    margin-left: auto;
    margin-right: auto;
    display: flex;
    /* Use --migration-fast (sqrt curve) so growth is felt earlier in the
       intro. Bumped max from 31 to 48 so final button is heftier. */
    padding-top: calc((var(--hd-pad-y, 14px)) + 48px * var(--migration-fast, 0));
    padding-bottom: calc((var(--hd-pad-y, 14px)) + 48px * var(--migration-fast, 0));
    transition: width 0.42s cubic-bezier(.22,.61,.36,1),
                padding 0.42s cubic-bezier(.22,.61,.36,1);
  }

  /* Lock-release transitions back. .kudos-row drops back into flow when
     [data-mash-locked] is removed. The transition above handles the snap-back
     direction (~450ms). Then position:fixed inline rule clears with the body
     attr removal — kudos-row returns to natural document flow. */

  /* ── Rainbow animations ── */
  @keyframes rainbowHalo {
    0%   { filter: drop-shadow(0 0 10px hsl(  0,100%,60%)) drop-shadow(0 0 22px hsl( 40,100%,60%)) brightness(1.3) saturate(1.5); }
    17%  { filter: drop-shadow(0 0 10px hsl( 60,100%,60%)) drop-shadow(0 0 22px hsl(100,100%,60%)) brightness(1.3) saturate(1.5); }
    33%  { filter: drop-shadow(0 0 10px hsl(120,100%,60%)) drop-shadow(0 0 22px hsl(160,100%,60%)) brightness(1.3) saturate(1.5); }
    50%  { filter: drop-shadow(0 0 10px hsl(180,100%,60%)) drop-shadow(0 0 22px hsl(220,100%,60%)) brightness(1.3) saturate(1.5); }
    67%  { filter: drop-shadow(0 0 10px hsl(240,100%,60%)) drop-shadow(0 0 22px hsl(280,100%,60%)) brightness(1.3) saturate(1.5); }
    83%  { filter: drop-shadow(0 0 10px hsl(300,100%,60%)) drop-shadow(0 0 22px hsl(340,100%,60%)) brightness(1.3) saturate(1.5); }
    100% { filter: drop-shadow(0 0 10px hsl(360,100%,60%)) drop-shadow(0 0 22px hsl(400,100%,60%)) brightness(1.3) saturate(1.5); }
  }

  .flying-hot-dog.is-rainbow,
  .flying-egg.is-rainbow {
    animation: rainbowHalo 0.7s linear infinite;
  }

  /* ── Background egg rainbow at 50+ presses ── */
  @keyframes eggBgRainbow {
    0%   { filter: drop-shadow(0 0 12px hsl(  0,100%,60%)) brightness(1.5) saturate(1.6); }
    17%  { filter: drop-shadow(0 0 12px hsl( 60,100%,60%)) brightness(1.5) saturate(1.6); }
    33%  { filter: drop-shadow(0 0 12px hsl(120,100%,60%)) brightness(1.5) saturate(1.6); }
    50%  { filter: drop-shadow(0 0 12px hsl(180,100%,60%)) brightness(1.5) saturate(1.6); }
    67%  { filter: drop-shadow(0 0 12px hsl(240,100%,60%)) brightness(1.5) saturate(1.6); }
    83%  { filter: drop-shadow(0 0 12px hsl(300,100%,60%)) brightness(1.5) saturate(1.6); }
    100% { filter: drop-shadow(0 0 12px hsl(360,100%,60%)) brightness(1.5) saturate(1.6); }
  }

  body[data-eggs-rainbow="1"] .egg {
    z-index: 550;
    opacity: 0.9;
    animation-name: floatEgg, eggBgRainbow;
    animation-duration: var(--dur, 22s), 1.4s;
    animation-timing-function: ease-in-out, linear;
    animation-iteration-count: infinite, infinite;
  }

  body[data-sheet-open="1"][data-eggs-rainbow="1"] .egg { z-index: 2300; }

  /* ── idleEmergencyPulse ── */
  @keyframes idleEmergencyPulse {
    0%, 100% { transform: scale(1);    opacity: 0.85; }
    50%       { transform: scale(1.06); opacity: 1;    }
  }

  /* ── burnFlash ── */
  @keyframes burnFlash {
    0%   { opacity: 0; transform: scale(0.65); }
    6%   { opacity: 1; transform: scale(1.18); }
    12%  { opacity: 1; transform: scale(1.00); }
    22%  { transform: scale(1.10); }
    30%  { transform: scale(1.00); }
    42%  { transform: scale(1.10); }
    50%  { transform: scale(1.00); }
    62%  { transform: scale(1.08); }
    70%  { transform: scale(1.00); }
    80%  { transform: scale(1.06); }
    88%  { opacity: 1; transform: scale(1.00); }
    100% { opacity: 0; transform: scale(0.95); }
  }

  /* ── blinkDots ── */
  @keyframes blinkDots {
    0%   { content: ''; }
    25%  { content: '.'; }
    50%  { content: '..'; }
    75%  { content: '...'; }
    100% { content: ''; }
  }

  /* ── Shockwave text dislodging (applied via JS --jx/--jy/--jr vars) ── */
  .cal-section-label,
  .event-name, .event-meta span,
  .event-desc, .tags .tag,
  .coming-card .name, .coming-card .meta,
  .coming-card .date-stamp .day,
  .coming-card .date-stamp .month,
  .coming-card .date-stamp .weekday,
  .archive-toggle,
  .archive-card .arch-name,
  .archive-card .arch-date,
  .archive-card .arch-kudos,
  .weather-desc, .weather-extra, .countdown-display, .countdown-label,
  .event-status-chip,
  .weather-pill,
  .eggman-take,
  .eggman-take-label,
  .crew-name,
  .crew-rank {
    transition: transform 0.20s cubic-bezier(.34,1.56,.64,1);
    transform:
      translateX(calc(var(--jx, 0) * (var(--mash-energy, 0) * 14px + var(--mash-overdrive, 0) * 24px)))
      translateY(calc(var(--jy, 0) * (var(--mash-energy, 0) *  9px + var(--mash-overdrive, 0) * 18px)))
      rotate(calc(var(--jr, 0) * (var(--mash-energy, 0) * 3deg + var(--mash-overdrive, 0) * 5deg)));
  }

  .coming-card {
    --jx: 0; --jy: 0; --jr: 0;
    transition: transform 0.20s cubic-bezier(.34,1.56,.64,1);
    transform:
      translateX(calc(var(--jx, 0) * (var(--mash-energy, 0) * 6px + var(--mash-overdrive, 0) * 12px)))
      translateY(calc(var(--jy, 0) * (var(--mash-energy, 0) * 3px + var(--mash-overdrive, 0) * 8px)))
      rotate(calc(var(--jr, 0) * (var(--mash-energy, 0) * 1deg + var(--mash-overdrive, 0) * 2deg)));
  }

  /* Hard exemption — kudos row must never shockwave */
  .kudos-row,
  .kudos-row *,
  .hd-cta-mash, .hd-cta-mash * {
    --jx: 0 !important;
    --jy: 0 !important;
    --jr: 0 !important;
  }

  /* ── Section label fades with mash energy ── */
  .cal-section-label {
    transition: opacity 0.4s ease;
    opacity: calc(1 - var(--mash-energy, 0) * 0.85);
  }

  /* ── Leaflet pin ── */
  .pin-yolk {
    background: #FFC72C;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 3px solid #1a1a1a;
    box-shadow: 0 0 0 2px #FFC72C, 0 0 18px rgba(255,199,44,0.8);
  }
  /* No filter — CartoDB Voyager renders at native, designed-for-readability colors. */
  .leaflet-control-attribution { font-size: 9px !important; opacity: 0.5; }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);