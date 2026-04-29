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

export default function EventMap({ startLoc, endLoc }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  // Use lat/lng primitives in deps so the effect only fires when coordinates
  // actually change — not on every parent re-render that hands us a new
  // startLoc object reference. This prevents the map blink when the
  // surrounding card re-renders (countdown ticker, weather pill data, etc.).
  const sLat = startLoc?.lat;
  const sLng = startLoc?.lng;
  const eLat = endLoc?.lat;
  const eLng = endLoc?.lng;

  useEffect(() => {
    if (!containerRef.current || sLat == null || sLng == null || !window.L) return;

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
      }).setView([sLat, sLng], 13);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      const yolkIcon = L.divIcon({
        className: 'pin-yolk',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      L.marker([sLat, sLng], { icon: yolkIcon }).addTo(map);

      const hasDiffEnd = eLat != null && eLng != null &&
        (eLat !== sLat || eLng !== sLng);

      if (hasDiffEnd) {
        L.marker([eLat, eLng], { icon: yolkIcon }).addTo(map);
        L.polyline(
          [[sLat, sLng], [eLat, eLng]],
          { color: '#FFC72C', weight: 3, opacity: 0.7, dashArray: '6 8' }
        ).addTo(map);
        map.fitBounds(
          [[sLat, sLng], [eLat, eLng]],
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
  }, [sLat, sLng, eLat, eLng]);

  return (
    <MapContainer>
      <MapInner ref={containerRef} />
    </MapContainer>
  );
}
