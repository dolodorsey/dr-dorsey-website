import { eventMotion } from '@/lib/event-motion';
import { motion, type MotionAsset } from '@/lib/motion';

export const BLACK_BALL_TICKETS = 'https://black-ball.eventbrite.com';

export type SeasonEvent = {
  title: string;
  /** Long date line shown above the title. */
  date: string;
  shortDate: string;
  description: string;
  href: string;
  cta: string;
  badge: string;
  animation: MotionAsset;
};

/**
 * The currently promoted season, in date order. This list is static: remove an
 * event here once its date has passed. Black Ball's animation is the
 * events/nightlife cover for the site.
 */
export const kollectiveSeason: SeasonEvent[] = [
  {
    title: 'Black Ball',
    date: 'SATURDAY · NOVEMBER 21, 2026',
    shortDate: 'NOV 21',
    description: 'One palette. Maximum presence. An all-black formal night built around intentional elegance, sharp silhouettes and collective visual impact.',
    href: BLACK_BALL_TICKETS,
    cta: 'Get tickets',
    badge: 'Tickets Live',
    animation: eventMotion.blackBall,
  },
  {
    title: 'Snow Ball',
    date: 'SATURDAY · DECEMBER 19, 2026',
    shortDate: 'DEC 19',
    description: 'A glowing winter-white world built for elevated dress, holiday energy and a grown social experience that feels transported.',
    href: 'https://www.eventbrite.com/e/snow-ball-winter-white-party-tickets-1985661311435',
    cta: 'Get tickets',
    badge: 'Tickets Live',
    animation: eventMotion.snowBall,
  },
  {
    title: 'Santa in Atlanta',
    date: 'TUESDAY · DECEMBER 22, 2026',
    shortDate: 'DEC 22',
    description: 'The holiday season in Atlanta. RSVP for event details and access updates.',
    href: '/app/forms/rsvp?event=Santa%20in%20Atlanta',
    cta: 'RSVP',
    badge: 'Holiday',
    animation: motion.kollectiveGlobal,
  },
  {
    title: 'Champagne Ball',
    date: 'THURSDAY · DECEMBER 31, 2026 · ATLANTA',
    shortDate: 'DEC 31',
    description: 'The last toast of the year — black-tie energy, champagne hospitality and a polished chapter designed to close 2026 correctly.',
    href: 'https://www.eventbrite.com/e/champagne-ball-new-year-black-tie-tickets-1998051720482',
    cta: 'Get tickets',
    badge: 'NYE',
    animation: eventMotion.champagneBall,
  },
];
