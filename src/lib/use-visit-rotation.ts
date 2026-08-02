'use client';

import { useEffect, useState } from 'react';

/**
 * A counter that advances once per visit.
 *
 * Used to rotate which animation represents a department, so someone coming
 * back to the page sees a different face of it rather than the same frame
 * every time. It advances rather than randomises — random repeats itself
 * often enough that a returning viewer would frequently see no change at all.
 *
 * Returns 0 on the server and on first paint, then the stored value once
 * mounted. That ordering matters: picking during render would make the server
 * and client disagree and React would throw a hydration mismatch.
 */
export function useVisitRotation(key = 'kollective:visit'): number {
  const [visit, setVisit] = useState(0);

  useEffect(() => {
    let next = 0;
    try {
      const stored = Number(window.localStorage.getItem(key) ?? '0');
      next = (Number.isFinite(stored) ? stored : 0) + 1;
      window.localStorage.setItem(key, String(next));
    } catch {
      // Private mode or storage disabled — fall back to something that still
      // varies between visits rather than pinning every viewer to the same one.
      next = Math.floor(performance.now()) % 997;
    }
    setVisit(next);
  }, [key]);

  return visit;
}
