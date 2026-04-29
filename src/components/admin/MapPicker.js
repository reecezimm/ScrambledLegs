import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// Default center: Duluth, MN — sensible for the Scrambled Legs crew.
const DEFAULT_CENTER = { lat: 46.7867, lng: -92.1005 };
const DEFAULT_ZOOM = 11;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MapBox = styled.div`
  position: relative;
  height: 280px;
  border-radius: 14px;
  overflow: hidden;
  background: #1a1a1a;
  border: 1px solid rgba(255,255,255,0.10);

  & .leaflet-container {
    width: 100%;
    height: 100%;
    background: #1a1a1a;
  }

  & .leaflet-tile-pane {
    filter: brightness(1.0) saturate(0.85) contrast(1.05);
  }

  & .leaflet-control-attribution {
    font-size: 9px !important;
    opacity: 0.55;
  }

  @media (max-width: 480px) {
    height: 240px;
  }
`;

const Hint = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 500;
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #1a1a1a;
  background: rgba(255,199,44,0.92);
  padding: 5px 9px;
  border-radius: 999px;
  pointer-events: none;
`;

const Coords = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.6);
`;

const DoneBtn = styled.button`
  align-self: flex-start;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255,199,44,0.30);
  background: rgba(255,199,44,0.10);
  color: #FFE66D;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: rgba(255,199,44,0.20); }
`;

const yolkPinHtml = `<div style="
  width:18px;height:18px;border-radius:50%;
  background:#FFC72C;border:3px solid #1a1a1a;
  box-shadow:0 0 0 2px #FFC72C, 0 0 18px rgba(255,199,44,0.8);"></div>`;

// Wait until window.L (Leaflet) is loaded by the deferred CDN script tag.
function whenLeafletReady() {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.L) {
      resolve(window.L);
      return;
    }
    let tries = 0;
    const iv = setInterval(() => {
      tries++;
      if (typeof window !== 'undefined' && window.L) {
        clearInterval(iv);
        resolve(window.L);
      } else if (tries > 100) {
        clearInterval(iv);
        resolve(null);
      }
    }, 50);
  });
}

export function MapPicker({ value, onChange, doneTargetId }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Initialize map once Leaflet is available.
  useEffect(() => {
    let cancelled = false;
    whenLeafletReady().then((L) => {
      if (cancelled || !L || !containerRef.current) return;

      const center = value && value.lat != null && value.lng != null
        ? [value.lat, value.lng]
        : [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng];
      const zoom = value && value.lat != null ? 13 : DEFAULT_ZOOM;

      const map = L.map(containerRef.current, {
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: false,
      }).setView(center, zoom);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap &copy; CARTO',
      }).addTo(map);

      const icon = L.divIcon({
        className: 'sl-yolk-pin',
        html: yolkPinHtml,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      if (value && value.lat != null && value.lng != null) {
        markerRef.current = L.marker([value.lat, value.lng], { icon }).addTo(map);
      }

      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng], { icon }).addTo(map);
        }
        if (onChange) {
          onChange({ lat, lng, label: value?.label || '' });
        }
      });

      mapRef.current = map;
      setReady(true);

      // Leaflet sometimes needs a kick if the container size changes.
      setTimeout(() => map.invalidateSize(), 50);
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
    // We deliberately only init once; updates flow through the other effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update marker if `value` changes externally (e.g. round-trip toggle).
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    if (!window.L) return;
    if (value && value.lat != null && value.lng != null) {
      const ll = [value.lat, value.lng];
      if (!markerRef.current) {
        const icon = window.L.divIcon({
          className: 'sl-yolk-pin',
          html: yolkPinHtml,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });
        markerRef.current = window.L.marker(ll, { icon }).addTo(mapRef.current);
      } else {
        markerRef.current.setLatLng(ll);
      }
    } else if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
  }, [value, ready]);

  const onDone = () => {
    if (doneTargetId) {
      const el = document.getElementById(doneTargetId);
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const lat = value?.lat;
  const lng = value?.lng;

  return (
    <Wrap>
      <MapBox>
        <Hint>Tap map to drop pin</Hint>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      </MapBox>
      <Coords>
        {lat != null && lng != null
          ? `Pin: ${lat.toFixed(5)}, ${lng.toFixed(5)}`
          : 'No pin set yet — tap the map to choose a location.'}
      </Coords>
      <DoneBtn type="button" onClick={onDone}>Done picking ↓</DoneBtn>
    </Wrap>
  );
}

export default MapPicker;
