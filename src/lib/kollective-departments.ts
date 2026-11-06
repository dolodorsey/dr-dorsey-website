import type { Department } from '@/lib/departments';
import { eventMotion } from '@/lib/event-motion';
import { motion } from '@/lib/motion';

/** The department grid for thekollectivehospitality.com: promoted and active only. */
export const kollectiveDepartments: Department[] = [
  {
    title: 'Nightlife / Events / Activations',
    eyebrow: 'Nightlife · Events · Cultural IP',
    detail: 'Recurring nightlife concepts, signature event series, cultural activations, tournaments and major destination events.',
    sample: ['Black Ball', 'Snow Ball', 'Santa in Atlanta', 'Champagne Ball'],
    href: '/events',
    cta: 'Open nightlife and events',
    animations: [eventMotion.blackBall],
  },
  {
    title: 'Staples',
    eyebrow: 'Flagship Brands',
    detail: 'The high-visibility operating brands that serve as permanent anchors of the enterprise.',
    sample: ['Goodfellas Pizza & Wings', 'Hungry AF', 'Opium ATL', 'Sea Salt ATL', 'Tulum ATL'],
    href: '/companies#staples',
    cta: 'Explore the staples',
    animations: [motion.opium, motion.seaSaltAlt, motion.tulum, motion.hungryAf],
  },
  {
    title: 'Dorsey / Kollective',
    eyebrow: 'Founder & Enterprise',
    detail: 'The founder platform, publishing, personal brand and enterprise command layer behind the full portfolio.',
    sample: ['Dr. Dorsey', 'The Kollective ENT.', 'Hakuna Matata'],
    href: '/companies#dorsey-kollective',
    cta: 'Enter the enterprise',
    animations: [motion.drDorsey, motion.hakunaMatata],
  },
  {
    title: 'Our Apps',
    eyebrow: 'Platforms & Intelligence',
    detail: 'Consumer platforms and service-routing products that turn attention into utility.',
    sample: ['GOOD TIMES', 'S.O.S.', 'Mission 365'],
    href: '/directory?division=technology-apps',
    cta: 'Explore our apps',
    animations: [motion.goodTimes, motion.sos, motion.mission365],
  },
  {
    title: 'The Inner Circle',
    eyebrow: 'Venue Revenue Optimization',
    detail: 'A strategic operating layer that helps independent venues monetize guest traffic, media, food, beverage, underused space, automated retail, merchandise and digital follow-up.',
    sample: ['Memory Machine', 'GOOD TIMES', 'BEVCO', 'VAPR', 'Sole Exchange'],
    href: 'https://innercircle.thekollectivehospitality.com',
    cta: 'Review your venue',
    animations: [motion.innerCircle],
  },
  {
    title: 'Products / Clothing',
    eyebrow: 'Commerce',
    detail: 'Fashion and consumer product worlds with direct routes to purchase.',
    sample: ['FĚNYX', 'STUSH', 'Bodega', 'PULSE', 'Make Atlanta Great Again'],
    href: '/store',
    cta: 'Shop the portfolio',
    animations: [motion.stush, motion.bodega, motion.pulse, motion.maga],
  },
  {
    title: 'Beverages',
    eyebrow: 'Consumer Products',
    detail: 'BEVCO INTL. and its distinct beverage brands built for hospitality, culture, retail, distribution and everyday movement.',
    sample: ['BEVCO INTL.', 'Infinity Water', 'Pronto Energy', 'ORA', 'OTINI', 'TEMPO', 'Casa Cantina', 'Island Water', '00 : DOUBLE ZERO', 'PRIVÈ VODKA', 'XXX VODKA'],
    href: '/store',
    cta: 'Explore beverages',
    animations: [motion.infinityWater, motion.pronto],
  },
  {
    title: 'Change the World',
    eyebrow: 'Impact & Community',
    detail: 'Sneaker recovery, youth development, mental-health conversations and community pathways built to last.',
    sample: ['Sole Exchange', "Playmaker's Sports Association", "Let's Talk About It"],
    href: 'https://soleexchangeworldwide.com',
    cta: 'Enter the impact network',
    animations: [motion.soleExchange, motion.psa, motion.letsTalk],
  },
];
