import { Cormorant_Garamond, DM_Sans } from 'next/font/google';

/**
 * Flagship V2 typography.
 * Display: high-contrast serif (KHG standing standard).
 * Body: modern geometric sans.
 * Self-hosted + preloaded by next/font — no render-blocking Google <link>.
 */
export const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const body = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const fontVars = `${display.variable} ${body.variable}`;
