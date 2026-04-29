import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';
// Side-effect import: parses ?n= notif-open param and pings the logOpen function.
import './services/openTracking';
import './services/ai';
// Cache-mismatch self-heal + new-version detection.
import './services/freshness';
// Capture and log uncaught errors / promise rejections to RTDB.
import './services/errorLogger';
// Per-tab session tracking — writes to sessions/{sid}, attributes events.
import './services/sessionTracker';

// Create unique IDs for the application
const BUILD_ID = `${process.env.NODE_ENV}-${new Date().toISOString().replace(/[:.]/g, '')}`;
const BUILD_TIMESTAMP = new Date().getTime();

// Log startup information
console.log(`Application starting with build ID: ${BUILD_ID}`);

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
    /* Pointer-events stay none so clicks pass through to the button.
       Body[position:fixed] handles the actual page lock — the canvas is
       purely visual. */
    pointer-events: none;
    z-index: 9000;
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

  /* Challenge text (MashSub) lifts OUT of the button at press 50 — when
     the canvas takeover is complete. The count (MashNum) stays in the
     button always. --sub-out 0→1 across presses 40→50 (sharp transition
     right at takeover). Lifts ~180px so it sits ~10-15px ABOVE the button
     top edge (vs over the button bounds before). */
  body[data-mash-locked="1"] .mash-sub {
    transform: translateY(calc(-180px * var(--sub-out, 0)));
    transition: transform 0.5s cubic-bezier(.22,.61,.36,1);
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
    transform: translate(
      calc(var(--btn-dx, 0px) * var(--migration-progress, 0)),
      calc(var(--btn-dy, 0px) * var(--migration-progress, 0))
    );
    transition: transform 0.42s cubic-bezier(.22,.61,.36,1);
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
    padding-top: calc((var(--hd-pad-y, 14px)) + 31px * var(--migration-progress, 0));
    padding-bottom: calc((var(--hd-pad-y, 14px)) + 31px * var(--migration-progress, 0));
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
    0%, 100% {
      transform: scale(1);
      text-shadow:
        0 0 8px rgba(255,255,255,0.55),
        0 0 18px rgba(255,199,44,0.55),
        0 0 30px rgba(255,107,107,0.45),
        0 4px 14px rgba(0,0,0,0.55);
    }
    50% {
      transform: scale(1.06);
      text-shadow:
        0 0 18px rgba(255,255,255,0.95),
        0 0 36px rgba(255,199,44,0.9),
        0 0 60px rgba(255,107,107,0.7),
        0 0 90px rgba(255,255,200,0.4),
        0 4px 18px rgba(0,0,0,0.55);
    }
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