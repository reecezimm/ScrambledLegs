import React from 'react';
import { useWeather } from '../../hooks/useWeather';
import { weatherInRange } from '../../hooks/useEventLifecycle';
import EggMansTake from './EggMansTake';

export default function WeatherPanel({ event, onData }) {
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

  return <EggMansTake event={event} weather={data} />;
}
