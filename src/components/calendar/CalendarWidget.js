import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';
import { useEventSheet } from '../../hooks/useEventSheet';
import { getStatus } from '../../hooks/useEventLifecycle';
import EventFeatured from './EventFeatured';
import EventComingUp from './EventComingUp';
import EventArchive from './EventArchive';
import EventSheet from './EventSheet';
import LockToast from './LockToast';
import GameStatus from './GameStatus';
import TimerWidget from './TimerWidget';
import DevTogglePanel from './DevTogglePanel';
import { gameStore } from '../../game/store';
import { createDefaultInfiniteStrategy } from '../../game/miniGames';

// ─── Layout ───────────────────────────────────────────────────────────────────
const CalSection = styled.section`
  width: 100%;
  max-width: 560px;
  margin: 0 auto 30px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin: 10px 4px 12px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.10), transparent);
  }
`;

// ─── Fixed overlay elements (rendered once per page via portal) ───────────────
function MashOverlays() {
  useEffect(() => {
    // Ensure vignette and flash divs exist exactly once
    let vignette = document.getElementById('mash-vignette');
    if (!vignette) {
      vignette = document.createElement('div');
      vignette.id = 'mash-vignette';
      vignette.className = 'mash-vignette';
      document.body.appendChild(vignette);
    }
    let flash = document.getElementById('mash-flash');
    if (!flash) {
      flash = document.createElement('div');
      flash.id = 'mash-flash';
      flash.className = 'mash-flash';
      document.body.appendChild(flash);
    }
    let canvas = document.getElementById('mash-canvas');
    if (!canvas) {
      canvas = document.createElement('div');
      canvas.id = 'mash-canvas';
      canvas.className = 'mash-canvas';
      document.body.appendChild(canvas);
    }
    return () => {
      // Don't remove — may be used by other instances
    };
  }, []);
  return null;
}

// ─── Partition events ─────────────────────────────────────────────────────────
function partitionEvents(events) {
  const upcoming = events
    .filter(e => getStatus(e) !== 'archived')
    .sort((a, b) => a.start - b.start);
  const past = events
    .filter(e => getStatus(e) === 'archived')
    .sort((a, b) => b.start - a.start)
    .slice(0, 10);
  return { upcoming, past };
}

// Label only — countdown lives in the StatusChip on the map.
function featuredLabel(event) {
  if (!event) return 'Up Next';
  return 'Up Next';
}

// ─── CalendarWidget ───────────────────────────────────────────────────────────
export default function CalendarWidget() {
  const { eventId } = useParams();
  const { events } = useEvents();
  const { openEventId, openSheet, closeSheet } = useEventSheet(eventId || null);
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Bootstrap the mini-game schedule once with the infinite-loop strategy:
  // first game is always Golden Egg at press 40; subsequent games are
  // random from the pool with 15-press gaps and no repeats in a row.
  // DevTogglePanel may override this (in development) by calling setSchedule
  // with the user's choice.
  // Unmount cleanup: if the user navigates away from the calendar entirely,
  // tear down the schedule + strategy + any pending timers so nothing keeps
  // ticking in the background.
  useEffect(() => {
    if (gameStore.getState().schedule.length === 0) {
      gameStore.setSchedule({ strategy: createDefaultInfiniteStrategy() });
    }
    return () => {
      try {
        gameStore.reset();
        gameStore.setSchedule([]);
      } catch (_) {}
    };
  }, []);

  const { upcoming, past } = partitionEvents(events);

  const featuredEvent = upcoming[0] || null;
  const comingUpEvents = upcoming.slice(1);

  return (
    <CalSection className="cal-section">
      <div id="featured-section">
        <SectionLabel className="cal-section-label">{featuredLabel(featuredEvent)}</SectionLabel>
        <EventFeatured event={featuredEvent} />
      </div>

      {(comingUpEvents.length > 0 || upcoming.length === 0) && (
        <div id="coming-section">
          <SectionLabel className="cal-section-label">Coming Up</SectionLabel>
          <EventComingUp events={comingUpEvents} onOpen={openSheet} />
        </div>
      )}

      {past.length > 0 && (
        <div id="archive-section">
          <EventArchive events={past} />
        </div>
      )}

      {openEventId && (
        <EventSheet
          eventId={openEventId}
          events={events}
          onClose={closeSheet}
        />
      )}

      <LockToast />
      <MashOverlays />
      <GameStatus />
      <TimerWidget />
      <DevTogglePanel />
    </CalSection>
  );
}
