import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useWeather } from '../../hooks/useWeather';
import { weatherInRange } from '../../hooks/useEventLifecycle';

const shimmer = keyframes`
  0%   { transform: translateX(0); }
  100% { transform: translateX(400%); }
`;

const Panel = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 14px;
  padding: 12px 14px;
  background: linear-gradient(135deg, rgba(135,206,250,0.08), rgba(255,199,44,0.04));
  border: 1px solid rgba(135,206,250,0.22);
  border-radius: 12px;
  position: relative;
  overflow: hidden;

  &.is-loading::after {
    content: '';
    position: absolute;
    left: -50%;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
    animation: ${shimmer} 1.5s linear infinite;
  }
`;

const BigIcon = styled.span`
  font-size: 34px;
  line-height: 1;
  flex-shrink: 0;
`;

const TempBig = styled.span`
  font-family: 'Fredoka', sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(45deg, #87CEFA, #FFE66D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-variant-numeric: tabular-nums;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  min-width: 0;
`;

const Desc = styled.span`
  font-family: 'Fredoka', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #f4f4f4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Extra = styled.span`
  font-size: 11px;
  color: rgba(255,255,255,0.55);
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  .warn { color: #FFB155; font-weight: 600; }
`;

const Source = styled.span`
  position: absolute;
  bottom: 4px;
  right: 8px;
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.32);
  opacity: 0.6;
`;

const Fallback = styled.div`
  margin-top: 14px;
  padding: 10px 12px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 10px;
  font-size: 11px;
  color: rgba(255,255,255,0.55);
  text-align: center;
  letter-spacing: 0.04em;
`;

export default function WeatherPanel({ event }) {
  const lat = event?.startLoc?.lat;
  const lng = event?.startLoc?.lng;
  const timestamp = event?.start;
  const inRange = weatherInRange(timestamp);

  const { data, isLoading } = useWeather(
    inRange ? lat : null,
    inRange ? lng : null,
    inRange ? timestamp : null
  );

  if (!inRange) {
    return <Fallback>Forecast available 10 days before the ride</Fallback>;
  }

  const sunsetFmt = data?.sunset
    ? new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(data.sunset))
    : null;

  return (
    <Panel className={isLoading ? 'is-loading' : ''}>
      <BigIcon>{data?.icon || '🌤'}</BigIcon>
      <div>
        <TempBig>{data ? `${data.temp}°` : '—°'}</TempBig>
      </div>
      <Details>
        <Desc className="weather-desc">{data?.desc || 'Loading…'}</Desc>
        <Extra className="weather-extra">
          {data ? (
            <>
              <span>💨 {data.wind} mph</span>
              <span className={data.precip >= 50 ? 'warn' : ''}>💧 {data.precip}% rain</span>
              {sunsetFmt && <span>🌅 {sunsetFmt}</span>}
            </>
          ) : (
            <span>—</span>
          )}
        </Extra>
      </Details>
      <Source>{data?.real ? 'open-meteo' : isLoading ? 'forecast loading…' : 'forecast unavailable'}</Source>
    </Panel>
  );
}
