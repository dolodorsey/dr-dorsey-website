import { BALLS } from '@/lib/ball-series';

const CURRENT_SLUGS = ['black-ball', 'snow-ball', 'champagne-ball'];

/** The promoted chapters on this site, renumbered so there are no gaps. */
export const KOLLECTIVE_BALLS = BALLS
  .filter((ball) => CURRENT_SLUGS.includes(ball.slug))
  .map((ball, index) => ({ ...ball, chapter: String(index + 1).padStart(2, '0') }));
