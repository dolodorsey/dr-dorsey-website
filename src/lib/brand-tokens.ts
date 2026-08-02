/**
 * Brand tokens — the single source of truth for all four properties.
 *
 *   1. Dr. Dorsey site        doctordorsey.com                 brand: dorsey
 *   2. The Kollective site    thekollectivehospitality.com     brand: kollective
 *   3. Kollective BOH app     kollective-enterprise-app        brand: kollective
 *   4. Kollective customer    thekollectivehospitality.com/app brand: kollective
 *
 * Dr. Dorsey and The Kollective are separate entities and must not converge.
 * What they share is the *system* — the surface technique, the grid rules, the
 * motion library. What they never share is the palette or the display face.
 *
 * Everything downstream reads from here: the surface CSS variables are emitted
 * from this file at render, the customer app shell reads it directly, and the
 * BOH app pulls it over /api/brand. Nothing hardcodes a hex, so the four can
 * drift only if someone edits this file.
 */

export type BrandKey = 'dorsey' | 'kollective';

export type BrandTokens = {
  /** Human name, for docs and the API response. */
  name: string;
  /** Primary gold. Rules, CTAs, kickers, active states. */
  gold: string;
  /** Lifted gold. Emphasis inside headlines, status labels. */
  goldSoft: string;
  /** Page ground. */
  ink: string;
  /** Warmer ground, for bands that used to be paper. */
  inkWarm: string;
  /** Deepest ground, for bands that sit behind film. */
  inkDeep: string;
  /** Card and panel ground. */
  surface: string;
  /** Light type. */
  cream: string;
  /** The brand's paper, where a light band is still wanted. */
  paper: string;
  /** Display face for headlines and card titles. */
  display: string;
  /** Display weight — Dorsey sets a serif at book weight, the Kollective a heavy sans. */
  displayWeight: number;
  /** Display tracking. */
  displayTracking: string;
};

export const brands: Record<BrandKey, BrandTokens> = {
  dorsey: {
    name: 'Dr. DoLo Dorsey',
    gold: '#c8a35a',
    goldSoft: '#efd492',
    ink: '#080807',
    inkWarm: '#0c0a07',
    inkDeep: '#050403',
    surface: '#100d09',
    cream: '#f4efe6',
    paper: '#eae3d6',
    display: "Georgia, 'Times New Roman', serif",
    displayWeight: 400,
    displayTracking: '-0.04em',
  },
  kollective: {
    name: 'The Kollective',
    gold: '#d8b04c',
    goldSoft: '#f3d67d',
    ink: '#050505',
    inkWarm: '#0a0a09',
    inkDeep: '#030303',
    surface: '#111110',
    cream: '#f2f0ea',
    paper: '#f2f0ea',
    display: 'Manrope, Inter, Arial, sans-serif',
    displayWeight: 800,
    displayTracking: '-0.055em',
  },
};

/** The layout measure and rhythm, shared by every property. */
export const layout = {
  max: '1720px',
  gap: '16px',
  /** Device shell width for the two apps. */
  appMeasure: '560px',
} as const;

function declarations(tokens: BrandTokens): string {
  return [
    `--k-gold:${tokens.gold}`,
    `--k-gold-soft:${tokens.goldSoft}`,
    `--k-ink-solid:${tokens.ink}`,
    `--k-ink-warm:${tokens.inkWarm}`,
    `--k-ink-deep:${tokens.inkDeep}`,
    `--k-surface:${tokens.surface}`,
    `--k-cream:${tokens.cream}`,
    `--k-paper:${tokens.paper}`,
    `--k-display:${tokens.display}`,
    `--k-display-weight:${tokens.displayWeight}`,
    `--k-display-tracking:${tokens.displayTracking}`,
  ].join(';');
}

/**
 * The custom properties the surface system reads, emitted from the tokens
 * above so the CSS never carries a literal. Dorsey is the default scope;
 * anything under [data-brand="kollective"] takes the Kollective side.
 */
export function brandVariablesCss(): string {
  return [
    `:root{${declarations(brands.dorsey)};--k-max:${layout.max};--k-gap:${layout.gap};--app-measure:${layout.appMeasure}}`,
    `[data-brand="dorsey"]{${declarations(brands.dorsey)}}`,
    `[data-brand="kollective"]{${declarations(brands.kollective)}}`,
  ].join('\n');
}
