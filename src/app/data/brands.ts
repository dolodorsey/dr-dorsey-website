export type BrandStatus = 'flagship' | 'active' | 'seasonal' | 'legacy' | 'dev';

export interface Brand {
  name: string;
  division: string;
  status: BrandStatus;
  featured?: boolean;
  logo?: string;
  mascot?: string;
  flyer?: string;
  website?: string;
}

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';

export const brands: Brand[] = [
  { name: 'HugLife Events', division: 'Events', status: 'flagship', featured: true,
    logo: `${SB}/huglife_events/00-brand-assets/logos/huglife-logo-buddha-black.png`,
    website: 'https://huglife.vercel.app' },
  { name: 'Forever Futbol', division: 'Museums', status: 'flagship', featured: true,
    logo: `${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png`,
    website: 'https://forever-futbol.vercel.app' },
  { name: 'Casper Group', division: 'F&B', status: 'flagship', featured: true,
    logo: `${SB}/casper_group/logos/casper-logo-white.png`,
    website: 'https://casper-group.vercel.app' },
  { name: 'Good Times', division: 'Technology', status: 'active',
    logo: `${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png`,
    website: 'https://good-times-app.vercel.app' },
  { name: 'Mind Studio', division: 'Wellness', status: 'active',
    website: 'https://themindstudioworldwide.com' },
  { name: 'Infinity Water', division: 'Products', status: 'active',
    website: 'https://infinity-water-website.vercel.app' },
  { name: 'Pronto Energy', division: 'Products', status: 'active',
    website: 'https://pronto-energy-website.vercel.app' },
  { name: 'NOIR', division: 'Events', status: 'active',
    flyer: `${SB}/noir_event/03_event_flyers/NOIR_NEWS.png` },
  { name: 'Taste of Art', division: 'Events', status: 'active',
    flyer: `${SB}/taste_of_art/03_event_flyers/TASTE_MAIN2.JPEG` },
  { name: 'REMIX', division: 'Events', status: 'active',
    flyer: `${SB}/remix_event/03-event-flyers/remix-dj-dates-cities.png` },
  { name: 'Gangsta Gospel', division: 'Events', status: 'seasonal',
    flyer: `${SB}/gangsta_gospel/03_event_flyers/GANGSTA_DATE.png` },
  { name: 'WRST BHVR', division: 'Events', status: 'seasonal',
    logo: `${SB}/wrst_bhvr_event/03_event_flyers/WRST_generic_logo.png`,
    flyer: `${SB}/wrst_bhvr_event/03-event-flyers/wrst-bhvr-napkin-wars-crime-scene.png` },
  { name: 'Underground King', division: 'Events', status: 'active',
    website: 'https://underground-king-event.vercel.app' },
  { name: 'Soul Sessions', division: 'Events', status: 'active',
    website: 'https://soul-sessions-event.vercel.app' },
  { name: 'The Kulture', division: 'Events', status: 'active',
    website: 'https://the-kulture-event.vercel.app' },
  { name: 'Cravings', division: 'Events', status: 'active',
    website: 'https://cravings-event.vercel.app' },
  { name: 'Stella', division: 'Events', status: 'active' },
  { name: "Sunday's Best", division: 'Events', status: 'legacy',
    flyer: `${SB}/sundays_best/03_event_flyers/SUNDAYS_BEST_MAIN2.JPEG` },
  { name: 'Paparazzi', division: 'Events', status: 'legacy',
    flyer: `${SB}/paparazzi/03_event_flyers/PAPARAZZI_NEWS.png` },
  { name: 'Bodegea', division: 'F&B', status: 'legacy' },
  { name: 'Scented Flowers', division: 'Lifestyle', status: 'legacy' },
  { name: 'Rule Radar', division: 'Technology', status: 'dev' },
  { name: 'UTube University', division: 'Technology', status: 'dev' },
  { name: 'Mission 365', division: 'Technology', status: 'dev' },
  { name: 'Living Legends', division: 'Museums', status: 'dev' },
  { name: 'On Call', division: 'Services', status: 'legacy' },
  { name: 'Roadside', division: 'Services', status: 'legacy' },
  { name: 'S.O.S', division: 'Services', status: 'active' },
  { name: 'Umbrella Group', division: 'Services', status: 'active',
    logo: `${SB}/umbrella_injury/00-brand-assets/logos/hurt-911-logo-black.png` },
  { name: 'ICONIC', division: 'Events', status: 'active',
    logo: `${SB}/dr_dorsey/00-brand-assets/logos/iconic-logo-gold.png` },
  { name: 'Pawchella', division: 'Events', status: 'seasonal',
    flyer: `${SB}/pawchella/03_event_flyers/PAWCHELLA_MAIN.JPEG` },
];

export const statusColors: Record<BrandStatus, string> = {
  flagship: '#C8A96E',
  active: 'rgba(111,168,111,0.8)',
  seasonal: 'rgba(111,143,168,0.8)',
  legacy: 'rgba(138,118,80,0.5)',
  dev: 'rgba(168,111,111,0.7)',
};

export const casperBrands = [
  { name: 'Sweet Tooth', logo: `${SB}/sweet_tooth/logos/sweet-tooth-logo.png`, mascot: `${SB}/sweet_tooth/mascots/sweet-tooth.png` },
  { name: 'Pasta Bish', logo: `${SB}/pasta_bish/logos/pasta-bish-logo.png`, mascot: `${SB}/pasta_bish/mascots/mac-daddy.png` },
  { name: 'Patty Daddy', logo: `${SB}/patty_daddy/logos/patty-daddy-logo.png`, mascot: `${SB}/patty_daddy/mascots/paddy-daddy.png` },
  { name: 'Mr. Oyster', logo: `${SB}/mr_oyster/logos/mr-oyster-logo.png`, mascot: `${SB}/mr_oyster/mascots/mr-miss-oyster.png` },
  { name: 'TOSSD', logo: `${SB}/tossd/logos/tossd-logo.png`, mascot: `${SB}/tossd/mascots/king-kale.png` },
  { name: 'Taco Yaki', logo: `${SB}/taco_yaki/logos/taco-yaki-logo.png`, mascot: `${SB}/taco_yaki/mascots/yaki.png` },
  { name: 'Mojo Juice', logo: `${SB}/mojo_juice/logos/mojo-juice-logo.png`, mascot: `${SB}/mojo_juice/mascots/mojo-the-mango.png` },
  { name: 'Morning After', logo: `${SB}/morning_after/logos/morning-after-logo.png`, mascot: `${SB}/morning_after/mascots/eggavier.png` },
  { name: 'Angel Wings', logo: `${SB}/angel_wings/logos/angel-wings-logo.png`, mascot: `${SB}/angel_wings/mascots/loudini.png` },
];

export const dorseyAssets = {
  logo: `${SB}/dr_dorsey/00-brand-assets/logos/dorsey-logo-black-red.png`,
  kollectiveGoldWhite: `${SB}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`,
  kollectiveGoldBlack: `${SB}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-black.png`,
  iconicGold: `${SB}/dr_dorsey/00-brand-assets/logos/iconic-logo-gold.png`,
  lifestyleVideo: `${SB}/dr_dorsey/02-evergreen-content/video-editing-lifestyle.mp4`,
  nightlifeVideo: `${SB}/dr_dorsey/02-evergreen-content/cinematic-luxury-nightlife.mp4`,
  quotes: [
    `${SB}/dr_dorsey/04-social-posts/feed/quote-better-than-good-enough.png`,
    `${SB}/dr_dorsey/04-social-posts/feed/quote-hustle-louder-talk-less.png`,
    `${SB}/dr_dorsey/04-social-posts/feed/quote-broke-dreams-rich-goals.png`,
    `${SB}/dr_dorsey/04-social-posts/feed/quote-greatness-earned-silence.png`,
    `${SB}/dr_dorsey/04-social-posts/feed/quote-first-phase-greatness-misunderstanding.png`,
    `${SB}/dr_dorsey/04-social-posts/feed/quote-love-idea-success-recipe.png`,
  ],
};

export const eventShowcase = [
  { name: 'REMIX', img: `${SB}/remix_event/03-event-flyers/remix-dj-dates-cities.png` },
  { name: 'Taste of Art', img: `${SB}/taste_of_art/03_event_flyers/TASTE_MAIN2.JPEG` },
  { name: 'NOIR', img: `${SB}/noir_event/03_event_flyers/NOIR_NEWS.png` },
  { name: 'Gangsta Gospel', img: `${SB}/gangsta_gospel/03_event_flyers/GANGSTA_DATE.png` },
  { name: 'WRST BHVR', img: `${SB}/wrst_bhvr_event/03-event-flyers/wrst-bhvr-napkin-wars-crime-scene.png` },
  { name: "Sunday's Best", img: `${SB}/sundays_best/03_event_flyers/SUNDAYS_BEST_MAIN2.JPEG` },
  { name: 'Paparazzi', img: `${SB}/paparazzi/03_event_flyers/PAPARAZZI_NEWS.png` },
  { name: 'Pawchella', img: `${SB}/pawchella/03_event_flyers/PAWCHELLA_MAIN.JPEG` },
];

export const prontoProducts = [
  { name: 'Dragonfruit', img: `${SB}/pronto-energy/product-shots/dragonfruit.png` },
  { name: 'Strawburst', img: `${SB}/pronto-energy/product-shots/strawburst.png` },
  { name: 'Blue Vanilla Ice', img: `${SB}/pronto-energy/product-shots/blue-vanilla-ice.png` },
  { name: 'White Pineapple', img: `${SB}/pronto-energy/product-shots/white-pineapple.png` },
  { name: 'Matcha', img: `${SB}/pronto-energy/product-shots/matcha.png` },
  { name: 'Original', img: `${SB}/pronto-energy/product-shots/original.png` },
];

export const casperWebGraphics = {
  sweetTooth: `${SB}/casper_group/website/sweet-tooth.png`,
  pattyDaddyRain: `${SB}/casper_group/website/patty-daddy-rain.jpg`,
  pattyDaddyHero: `${SB}/casper_group/website/patty-daddy-hero.jpg`,
  pastaBish: `${SB}/casper_group/website/pasta-bish.jpg`,
  mrOyster: `${SB}/casper_group/website/mr-oyster.png`,
  morningAfterHero: `${SB}/casper_group/website/morning-after-hero.jpg`,
  espressoMachine: `${SB}/casper_group/website/espresso-machine.jpg`,
  tacoYakiSumo: `${SB}/casper_group/website/taco-yaki-sumo.png`,
  tossd: `${SB}/casper_group/website/tossd.png`,
  angelWingsHero: `${SB}/casper_group/website/angel-wings-hero.jpg`,
  mojoJuice: `${SB}/casper_group/website/mojo-juice.png`,
};
