import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  position: relative;
  height: 200px;
  background: #1a1a1a;
  z-index: 1;

  .leaflet-container {
    width: 100%;
    height: 100%;
    background: #1a1a1a;
    border-radius: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(26,26,26,0.85) 100%);
    pointer-events: none;
    z-index: 2;
  }

  .leaflet-tile-pane { filter: brightness(1.0) saturate(0.85) contrast(1.05); }
  .leaflet-control-attribution { font-size: 9px !important; opacity: 0.5; }
`;

const MapInner = styled.div`
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  max-width: calc(100% - 16px);
  pointer-events: none;
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,199,44,0.35);
  backdrop-filter: blur(6px);
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #f4f4f4;
  white-space: nowrap;
  letter-spacing: 0.02em;

  &.warn { color: #FFB155; border-color: rgba(255,177,85,0.55); }
`;

export default function EventMap({ startLoc, endLoc, weather }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !startLoc || !window.L) return;

    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }

      const L = window.L;
      const map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false,
        tap: false,
      }).setView([startLoc.lat, startLoc.lng], 13);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      const yolkIcon = L.divIcon({
        className: 'pin-yolk',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      L.marker([startLoc.lat, startLoc.lng], { icon: yolkIcon }).addTo(map);

      const hasDiffEnd = endLoc &&
        (endLoc.lat !== startLoc.lat || endLoc.lng !== startLoc.lng);

      if (hasDiffEnd) {
        L.marker([endLoc.lat, endLoc.lng], { icon: yolkIcon }).addTo(map);
        L.polyline(
          [[startLoc.lat, startLoc.lng], [endLoc.lat, endLoc.lng]],
          { color: '#FFC72C', weight: 3, opacity: 0.7, dashArray: '6 8' }
        ).addTo(map);
        map.fitBounds(
          [[startLoc.lat, startLoc.lng], [endLoc.lat, endLoc.lng]],
          { padding: [40, 40] }
        );
      }

      mapRef.current = map;
    }, 30);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [startLoc, endLoc]);

  const sunsetFmt = weather && weather.sunset
    ? (() => {
        try {
          return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })
            .format(new Date(weather.sunset));
        } catch { return null; }
      })()
    : null;

  return (
    <MapContainer>
      <MapInner ref={containerRef} />
      {weather && (
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
      )}
    </MapContainer>
  );
}
