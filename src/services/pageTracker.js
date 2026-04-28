// Page-view tracker. Mounted once inside <Router> in App.js.
//
// Fires `page_view` for every path change (including the initial mount).
// Uses pathname as the de-dup key so React StrictMode double-mounts and
// hash-only changes don't double-count.

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { logEvent } from './analytics';
import { bumpPageViewCount } from './sessionTracker';

export default function PageTracker() {
  const location = useLocation();
  const lastPathRef = useRef(null);

  useEffect(() => {
    const path = location.pathname + (location.search || '');
    if (lastPathRef.current === path) return;
    lastPathRef.current = path;
    try {
      logEvent('page_view', {
        path: location.pathname,
        search: location.search || '',
        title: typeof document !== 'undefined' ? document.title : '',
      });
      bumpPageViewCount();
    } catch (_) {}
  }, [location.pathname, location.search]);

  return null;
}
