import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useEventSheet(initialEventId) {
  const [openEventId, setOpenEventId] = useState(initialEventId || null);
  const navigate = useNavigate();

  // Sync if initialEventId changes (e.g., route param changes)
  useEffect(() => {
    setOpenEventId(initialEventId || null);
  }, [initialEventId]);

  const openSheet = useCallback((id) => {
    setOpenEventId(id);
    navigate(`/events/${id}`, { replace: false });
  }, [navigate]);

  const closeSheet = useCallback(() => {
    setOpenEventId(null);
    navigate('/', { replace: false });
  }, [navigate]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && openEventId) closeSheet();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [openEventId, closeSheet]);

  return { openEventId, openSheet, closeSheet };
}
