import React from 'react';
import { useWeather } from '../../hooks/useWeather';
import { weatherInRange } from '../../hooks/useEventLifecycle';
import EggMansTake from './EggMansTake';

// `showEggMansTake` controls whether to render the AI monologue.
// Set to false on the featured/home card so the prompt only fires when an
// event sheet is actually opened (the cache layer handles repeat views).
export default function WeatherPanel({ event, onData, showEggMansTake = true }) {
  const lat = event?.startLoc?.lat;
  const lng = event?.startLoc?.lng;
  const timestamp = event?.start;
  const inRange = weatherInRange(timestamp);

  const { data } = useWeather(
    inRange ? lat : null,
    inRange ? lng : null,
    inRange ? timestamp : null
  );

  React.useEffect(() => {
    if (data && onData) onData(data);
  }, [data, onData]);

  if (!showEggMansTake) return null;
  return <EggMansTake event={event} weather={data} />;
}
