import { useEffect, useState } from 'react';
import { weatherInRange } from './useEventLifecycle';

// Verbatim port of WMO_CODE and fetchWeather from calendar-mockup.html
const WMO_CODE = {
  0:  ['☀️',  'Clear'],
  1:  ['🌤',  'Mostly clear'],
  2:  ['⛅',  'Partly cloudy'],
  3:  ['☁️',  'Overcast'],
  45: ['🌫',  'Fog'],
  48: ['🌫',  'Freezing fog'],
  51: ['🌦',  'Light drizzle'],
  53: ['🌦',  'Drizzle'],
  55: ['🌧',  'Heavy drizzle'],
  61: ['🌧',  'Light rain'],
  63: ['🌧',  'Rain'],
  65: ['🌧',  'Heavy rain'],
  71: ['🌨',  'Light snow'],
  73: ['🌨',  'Snow'],
  75: ['❄️',  'Heavy snow'],
  77: ['🌨',  'Snow grains'],
  80: ['🌦',  'Rain showers'],
  81: ['🌧',  'Heavy showers'],
  82: ['⛈',  'Violent showers'],
  85: ['🌨',  'Snow showers'],
  86: ['❄️',  'Heavy snow showers'],
  95: ['⛈',  'Thunderstorm'],
  96: ['⛈',  'Thunderstorm + hail'],
  99: ['⛈',  'Severe thunderstorm'],
};

export async function fetchWeather(lat, lng, eventStartMs) {
  const startDate = new Date(eventStartMs);
  const dateStr = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
  const cacheKey = `sl_wx_${lat.toFixed(3)}_${lng.toFixed(3)}_${dateStr}_${startDate.getHours()}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const obj = JSON.parse(cached);
      if (obj.expires > Date.now()) return obj.data;
    } catch {}
  }

  const daysOut = (eventStartMs - Date.now()) / 86400000;
  if (daysOut > 10) return null;

  const url = `https://api.open-meteo.com/v1/forecast`
    + `?latitude=${lat}&longitude=${lng}`
    + `&hourly=temperature_2m,weather_code,wind_speed_10m,precipitation_probability`
    + `&daily=sunset`
    + `&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`
    + `&start_date=${dateStr}&end_date=${dateStr}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    const hour = startDate.getHours();
    const code = json.hourly.weather_code[hour];
    const [icon, desc] = WMO_CODE[code] || ['🌤', 'Forecast'];
    const data = {
      temp: Math.round(json.hourly.temperature_2m[hour]),
      icon,
      desc,
      code,
      wind: Math.round(json.hourly.wind_speed_10m[hour]),
      precip: json.hourly.precipitation_probability[hour] ?? 0,
      sunset: json.daily?.sunset?.[0] || null,
      real: true,
    };
    localStorage.setItem(cacheKey, JSON.stringify({ data, expires: Date.now() + 30 * 60 * 1000 }));
    return data;
  } catch {
    return null;
  }
}

export function useWeather(lat, lng, timestamp) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // Bumped by `staleSession:soft` to force a re-fetch after a long away period.
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    if (!lat || !lng || !timestamp || !weatherInRange(timestamp)) return;
    setIsLoading(true);
    // If the stale-session guard tripped, clear our cache key for this
    // lat/lng/date/hour combo so fetchWeather hits the network.
    if (refreshTick > 0) {
      try {
        const startDate = new Date(timestamp);
        const dateStr = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
        const cacheKey = `sl_wx_${lat.toFixed(3)}_${lng.toFixed(3)}_${dateStr}_${startDate.getHours()}`;
        localStorage.removeItem(cacheKey);
      } catch (_) { /* ignore */ }
    }
    fetchWeather(lat, lng, timestamp)
      .then(w => { setData(w); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, [lat, lng, timestamp, refreshTick]);

  // Listen for the stale-session soft-refresh event and bump refreshTick.
  useEffect(() => {
    const onSoft = () => setRefreshTick((t) => t + 1);
    window.addEventListener('staleSession:soft', onSoft);
    return () => window.removeEventListener('staleSession:soft', onSoft);
  }, []);

  return { data, isLoading };
}
