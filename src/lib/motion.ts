/**
 * Brand motion library.
 *
 * Single source of truth for every animated company cover across
 * doctordorsey.com, thekollectivehospitality.com, the Companies pages, and
 * the Kollective customer app.
 *
 * The files live in Supabase storage (brand-graphics/motion) rather than in
 * this repo — 48 MB of video does not belong in a git history, and hosting
 * them centrally means the customer app and the mobile shell read the same
 * assets. Point MOTION_BASE at any CDN root to move them again.
 */

export const MOTION_BASE =
  'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/motion';

export type Orientation = 'landscape' | 'portrait';

export type MotionAsset = {
  /** Looping animation source. */
  src: string;
  /** First-frame still. Used as the poster and as the blurred backdrop. */
  poster: string;
  /**
   * Frame shape of the source. Cards are grouped by this so a row is either
   * all landscape or all portrait — mixing the two letterboxes half the row
   * and the grid stops reading as one system.
   */
  orientation: Orientation;
};

function asset(slug: string, orientation: Orientation = 'landscape'): MotionAsset {
  return {
    src: `${MOTION_BASE}/${slug}.mp4`,
    poster: `${MOTION_BASE}/${slug}.jpg`,
    orientation,
  };
}

/** Every animation currently in the library, keyed by file slug. */
export const motion = {
  aquifer: asset('aquifer-ani'),
  blackPages: asset('black-pages-ani2'),
  bodega: asset('bodega-ani'),
  casperGroup: asset('casper-group-ani'),
  everydayWater: asset('everyday-wg-ani'),
  drDorsey: asset('dr-dolo-ani'),
  freedomFest: asset('freedom-fest-ani'),
  dorseyConsult: asset('dorsey-consult-ani'),
  kollectiveLogos: asset('kollective-logos-ani'),
  resetTherapy: asset('reset-therapy-ani'),
  psa: asset('psa-ani'),
  onCall: asset('on-call-ani'),
  mission365: asset('mission-365-ani'),
  luxeOnDemand: asset('luxe-on-demand-ani'),
  gentlemansClub: asset('gentlemans-club-ani'),
  littleFarmers: asset('little-farmers-ani'),
  umbrellaAccounting: asset('umbrella-accounting-ani'),
  umbrellaAutomation: asset('umbrella-automation-ani'),
  umbrellaClean: asset('umbrella-clean-ani'),
  umbrellaPeople: asset('umbrella-people-ani'),
  umbrellaRealty: asset('umbrella-realty-ani'),
  umbrellaMind: asset('umbrella-mind-ani'),
  umbrellaInjury: asset('umbrella-injury-ani'),
  umbrellaAuto: asset('umbrella-auto-ani'),
  fraternity: asset('fraternity-ani'),
  goodfellas: asset('goodfellas-ani'),
  goodfellasAlt: asset('goodfellas-ani2'),
  goodfellasAltTwo: asset('goodfellas-anii'),
  goodfellasPortrait: asset('goodfellas-ani-port', 'portrait'),
  goodfellasPortraitAlt: asset('goodfellas-ani-port2', 'portrait'),
  goodTimes: asset('goodtimes'),
  goodTimesPortrait: asset('good-times', 'portrait'),
  grownish: asset('grownish-ani'),
  grownishWeekly: asset('grownish-weekly', 'portrait'),
  hakunaMatata: asset('hakuna-1'),
  hakunaTwo: asset('hakuna-2'),
  hakunaThree: asset('hakuna-3'),
  hakunaFour: asset('hakuna-4'),
  hakunaFive: asset('hakuna-5'),
  hakunaSix: asset('hakuna-6'),
  hakunaSeven: asset('hakuna-7'),
  drDolo: asset('dr-dolo-ani'),
  drAni: asset('dr-ani'),
  innerCircle: asset('inner-ani'),
  letsTalk: asset('lets-talk-about-it-1'),
  letsTalkTwo: asset('lets-talk-about-it-2'),
  letsTalkThree: asset('lets-talk-about-it-3'),
  kollectiveLobby: asset('kollective-lobby-ani'),
  kollectiveLibrary: asset('kollective-library-ani'),
  help911: asset('help-911-ani'),
  hungryAf: asset('hungry-ani'),
  infinityWater: asset('infinity-bottles-2'),
  kollectiveGlobal: asset('kollective-global'),
  kollectiveAni: asset('kollective-ani'),
  kollectiveAnimation: asset('kollective-animationn'),
  kollectiveNetwork: asset('kollective-network', 'portrait'),
  maga: asset('maga-anii'),
  medicine: asset('medicine-ani', 'portrait'),
  medicineAlt: asset('medicine2', 'portrait'),
  medicineAltTwo: asset('medicine3', 'portrait'),
  magaCollage: asset('maga-collage'),
  magaScene: asset('maga-scene'),
  nativa: asset('nativa-ani'),
  opium: asset('opium-ani'),
  revel: asset('revel-animation'),
  pronto: asset('pronto-cans'),
  projectX: asset('project-x-animation'),
  pulse: asset('pulse-ani'),
  rose: asset('rose-on-piedmont'),
  seaSalt: asset('sea-salt-ani'),
  seaSaltAlt: asset('seasalt-ani'),
  soleExchange: asset('sole-exchange-ani'),
  sos: asset('sos-ani'),
  sosAlt: asset('sos-ani2'),
  stush: asset('stush-ani'),
  tasteOfArt: asset('taste-of-art'),
  tasteOfArtPortrait: asset('taste-of-art-porttait', 'portrait'),
  theLaw: asset('the-law-ani'),
  theVote: asset('the-vote-ani'),
  trailblazer: asset('trailblazer-ani'),
  tribalWater: asset('tribal-water-ani'),
  tribe: asset('tribe-ani'),
  tulum: asset('tulum-ani'),
  university: asset('university-ani'),
  umbrellaGroup: asset('umbrella-group-ani'),
} satisfies Record<string, MotionAsset>;

/**
 * Company / entity name -> animation.
 *
 * Names are matched case-insensitively after stripping punctuation, so
 * "GROWN-ISH", "Grown Ish" and "grownish" all resolve to the same asset.
 * This matters because the Kollective focus grid is driven by the live
 * enterprise registry, where names are edited outside this repo.
 */
const NAME_MOTION: Record<string, MotionAsset> = {
  'dr dorsey': motion.drAni,
  'doctor dorsey': motion.drAni,
  'dolo dorsey': motion.drAni,
  'dr dolo': motion.drAni,
  'freedom fest': motion.freedomFest,
  'freedom fest juneteent atl': motion.freedomFest,
  'freedom fest juneteenth atl': motion.freedomFest,
  'the kollective ent': motion.kollectiveGlobal,
  'the kollective': motion.kollectiveGlobal,
  'the kollective hospitality group': motion.kollectiveGlobal,
  'hakuna matata': motion.hakunaMatata,
  'inner circle': motion.innerCircle,
  'the inner circle': motion.innerCircle,
  'lets talk about it': motion.letsTalk,
  'courses': motion.kollectiveLibrary,
  'consultations': motion.kollectiveLobby,
  'the kollective library': motion.kollectiveLibrary,
  'the kollective lobby': motion.kollectiveLobby,
  'dr dorsey consultations': motion.dorseyConsult,
  'reset therapy': motion.resetTherapy,
  'playmakers sports association': motion.psa,
  'psa': motion.psa,
  'on call': motion.onCall,
  'mission 365': motion.mission365,
  'luxe on demand': motion.luxeOnDemand,
  'the gentlemans club': motion.gentlemansClub,
  'gentlemans club': motion.gentlemansClub,
  'little farmers of the future': motion.littleFarmers,
  'umbrella accounting': motion.umbrellaAccounting,
  'umbrella automation': motion.umbrellaAutomation,
  'umbrella clean services': motion.umbrellaClean,
  'umbrella clean': motion.umbrellaClean,
  'the peoples department': motion.umbrellaPeople,
  'umbrella realty group': motion.umbrellaRealty,
  'umbrella realty': motion.umbrellaRealty,
  'the mind studio': motion.umbrellaMind,
  'umbrella mind': motion.umbrellaMind,
  'umbrella injury network': motion.umbrellaInjury,
  'umbrella injury': motion.umbrellaInjury,
  'umbrella auto exchange': motion.umbrellaAuto,
  'umbrella auto': motion.umbrellaAuto,
  'the tribe memphis': motion.tribe,
  'the tribe': motion.tribe,
  'the fraternity': motion.fraternity,
  'the university': motion.university,
  'everyday water group': motion.everydayWater,
  'aquifer waterworks': motion.aquifer,
  'aquifer': motion.aquifer,
  'nativa waterworks': motion.nativa,
  'nativa': motion.nativa,
  'infinity water': motion.infinityWater,
  'tribal water': motion.tribalWater,
  'pronto energy': motion.pronto,
  'pronto': motion.pronto,
  'project x': motion.projectX,
  'the umbrella group': motion.umbrellaGroup,
  'umbrella group': motion.umbrellaGroup,
  'rose on piedmont': motion.rose,
  'opium atl': motion.opium,
  'opium': motion.opium,
  'sea salt atl': motion.seaSaltAlt,
  'sea salt': motion.seaSaltAlt,
  'tulum atl': motion.tulum,
  'tulum': motion.tulum,
  'hungry af': motion.hungryAf,
  'goodfellas pizza wings': motion.goodfellasAlt,
  'goodfellas pizza and wings': motion.goodfellasAlt,
  'goodfellas': motion.goodfellasAlt,
  'revel': motion.revel,
  'medicine': motion.medicine,
  'rose bar': motion.rose,
  'bodega': motion.bodega,
  'bodegea': motion.bodega,
  'pulse': motion.pulse,
  'make atlanta great again': motion.maga,
  'maga': motion.maga,
  'grownish': motion.grownish,
  'grown ish': motion.grownish,
  'good times': motion.goodTimes,
  'the good times': motion.goodTimes,
  'taste of art': motion.tasteOfArt,
  'the taste of art': motion.tasteOfArt,
  'sole exchange': motion.soleExchange,
  'stush': motion.stush,
  'black pages': motion.blackPages,
  'the black pages': motion.blackPages,
  'help 911': motion.help911,
  'hurt 911': motion.help911,
  'sos': motion.sos,
  'sos roadside': motion.sos,
  'the law': motion.theLaw,
  'the vote': motion.theVote,
  'trailblazer': motion.trailblazer,
  'trailblazers': motion.trailblazer,
  'the casper group': motion.casperGroup,
  'casper group': motion.casperGroup,
  'kollective network': motion.kollectiveNetwork,
};

/**
 * Verified entity -> assigned asset.
 *
 * Explicit hero/card assignment, keyed by entity slug. This is the source of
 * truth: NAME_MOTION above only resolves a display name to one of these keys.
 * Nothing is inferred from the name itself, so an entity can never inherit
 * another brand's animation because the two strings happened to look alike.
 */
export type EntityMotion = { hero: MotionAsset; card: MotionAsset };

export const ENTITY_MOTION = {
  'dr-dorsey': { hero: motion.drDolo, card: motion.drAni },
  'rose-on-piedmont': { hero: motion.rose, card: motion.rose },
  'grown-ish': { hero: motion.grownish, card: motion.grownish },
  'casper-group': { hero: motion.casperGroup, card: motion.casperGroup },
  'inner-circle': { hero: motion.innerCircle, card: motion.innerCircle },
  'hakuna-matata': { hero: motion.hakunaMatata, card: motion.hakunaMatata },
  'lets-talk-about-it': { hero: motion.letsTalk, card: motion.letsTalk },
  'kollective-courses': { hero: motion.kollectiveLobby, card: motion.kollectiveLibrary },
} satisfies Record<string, EntityMotion>;

export type EntityKey = keyof typeof ENTITY_MOTION;

/** Alternate takes, for surfaces that want variety rather than one fixed loop. */
export const ENTITY_MOTION_ALTS = {
  'hakuna-matata': [
    motion.hakunaMatata, motion.hakunaTwo, motion.hakunaThree, motion.hakunaFour,
    motion.hakunaFive, motion.hakunaSix, motion.hakunaSeven,
  ],
  'lets-talk-about-it': [motion.letsTalk, motion.letsTalkTwo, motion.letsTalkThree],
} satisfies Partial<Record<EntityKey, MotionAsset[]>>;

/**
 * Resolve an entity's assigned animation.
 *
 * Returns undefined for entities with no assignment yet — the caller falls back
 * to a still or the holding plate. It never guesses.
 */
export function motionForEntity(
  key: string | undefined | null,
  variant: 'hero' | 'card' = 'card',
): MotionAsset | undefined {
  if (!key) return undefined;
  const entry = ENTITY_MOTION[key as EntityKey];
  return entry ? entry[variant] : undefined;
}

/**
 * The whole library as a flat, consumable list.
 *
 * Served from /api/motion so the Kollective customer app, the mobile shell,
 * and any future surface can pull the same animations without copying files.
 * Pass an origin to get absolute URLs.
 */
export function motionManifest(origin = '') {
  const base = origin.replace(/\/$/, '');
  // Paths are already absolute once MOTION_BASE points at a CDN — only
  // relative sources need the origin prepended.
  const abs = (path: string) => (/^https?:\/\//.test(path) ? path : `${base}${path}`);
  const byAsset = new Map<string, string[]>();
  for (const [name, entry] of Object.entries(NAME_MOTION)) {
    const list = byAsset.get(entry.src) || [];
    list.push(name);
    byAsset.set(entry.src, list);
  }

  return Object.entries(motion).map(([key, entry]) => ({
    key,
    slug: entry.src.split('/').pop()!.replace(/\.mp4$/, ''),
    video: abs(entry.src),
    poster: abs(entry.poster),
    orientation: entry.orientation,
    matches: byAsset.get(entry.src) || [],
  }));
}

function normalise(name: string): string {
  return name
    .toLowerCase()
    .replace(/[’'`.]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** Resolve an animation for a company name. Returns undefined when none exists yet. */
export function motionFor(name: string | undefined | null): MotionAsset | undefined {
  if (!name) return undefined;
  return NAME_MOTION[normalise(name)];
}

/**
 * Frame shape a card should use. Companies with a hero still or no artwork at
 * all default to landscape, which is what the holding plate and the 16:9
 * stills are cut for.
 */
export function orientationFor(name: string | undefined | null): Orientation {
  return motionFor(name)?.orientation ?? 'landscape';
}
