import React, { useEffect } from 'react';

/**
 * Full-viewport "game canvas" layer that grows from the mash button center
 * during the mash game (presses 1-50). Driven entirely by CSS vars set by
 * useMashEffects.setMashEnergy(): --mash-x, --mash-y, --canvas-radius,
 * and the body[data-mash-locked] + body[data-mash-level] attributes.
 *
 * z-stack while locked:
 *   page content  (z auto)
 *   MashCanvas    (z 9000) ← us
 *   button        (z 9001 via body[data-mash-locked] rule on .kudos-row)
 *
 * Mounted once via the existing MashOverlays portal in CalendarWidget.
 * Pure visual layer — no state, no listeners.
 */
export default function MashCanvas() {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    let el = document.getElementById('mash-canvas');
    if (!el) {
      el = document.createElement('div');
      el.id = 'mash-canvas';
      el.className = 'mash-canvas';
      document.body.appendChild(el);
    }
    return () => {
      // Don't remove on unmount — other instances may still need it.
    };
  }, []);
  return null;
}
