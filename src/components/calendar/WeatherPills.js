import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 25;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  max-width: calc(100% - 110px);
  pointer-events: none;
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(20,20,20,0.78);
  border: 1px solid rgba(255,255,255,0.22);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 14px rgba(0,0,0,0.45);
  text-shadow: 0 1px 2px rgba(0,0,0,0.55);
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #f4f4f4;
  white-space: nowrap;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;

  &.warn { color: #FFB155; border-color: rgba(255,177,85,0.55); }
`;

export default function WeatherPills({ weather }) {
  if (!weather) return null;
  const sunsetFmt = weather.sunset
    ? (() => {
        try {
          return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })
            .format(new Date(weather.sunset));
        } catch { return null; }
      })()
    : null;

  return (
    <Overlay>
      <Pill>
        <span>{weather.icon || '🌤'}</span>
        <span>{weather.temp != null ? `${weather.temp}°` : '—°'}</span>
      </Pill>
      {weather.wind != null && <Pill>💨 {weather.wind} mph</Pill>}
      {weather.precip != null && (
        <Pill className={weather.precip >= 50 ? 'warn' : ''}>💧 {weather.precip}%</Pill>
      )}
      {sunsetFmt && <Pill>🌅 {sunsetFmt}</Pill>}
    </Overlay>
  );
}
