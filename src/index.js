import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';
// Side-effect import: parses ?n= notif-open param and pings the logOpen function.
import './services/openTracking';

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
      ellipse 58% 42% at 50% 75%,
      transparent 16%,
      rgba(0,0,0,0.7) 48%,
      rgba(0,0,0,1) 92%
    );
    transition: opacity 0.45s ease;
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
  body[data-sheet-open="1"] .mash-vignette { z-index: 2200; }
  body[data-sheet-open="1"] .mash-flash   { z-index: 2150; }
  body[data-sheet-open="1"] .mash-vignette {
    background: radial-gradient(
      ellipse 58% 40% at 50% 88%,
      transparent 16%,
      rgba(0,0,0,0.70) 48%,
      rgba(0,0,0,1) 92%
    );
  }

  /* ── kudos-row stays above vignette when mashing ── */
  body[data-mashing="1"] .kudos-row {
    z-index: 700;
  }

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
  .weather-desc, .weather-extra, .countdown-display, .countdown-label {
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
  .leaflet-tile-pane { filter: brightness(0.85) saturate(0.7); }
  .leaflet-control-attribution { font-size: 9px !important; opacity: 0.5; }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);