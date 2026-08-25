import type { MotionAsset } from './motion';

/**
 * Current event animations sourced from Supabase.
 *
 * Labor Day / BRAVO media lives in the Creative Engine. Ball Series and other
 * shared event media lives in the brand-graphics motion library. Both are
 * public shared sources so Dorsey and Kollective render canonical covers.
 */
const EVENT_MOTION_BASE =
  'https://woqlhjodiedyqfvzweoe.supabase.co/storage/v1/object/public/animations/events';
const SHARED_EVENT_MOTION_BASE =
  'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/motion/111atl';

const DEFAULT_POSTER = '/brand/kollective-hero-poster.png';

function eventAsset(path: string, poster = DEFAULT_POSTER): MotionAsset {
  return {
    src: `${EVENT_MOTION_BASE}/${path}`,
    poster,
    orientation: 'landscape',
  };
}

function sharedAsset(slug: string): MotionAsset {
  return {
    src: `${SHARED_EVENT_MOTION_BASE}/${slug}.mp4`,
    poster: `${SHARED_EVENT_MOTION_BASE}/${slug}.jpg`,
    orientation: 'landscape',
  };
}

export const eventMotion = {
  blow: eventAsset('blow/blow-ani-2.mp4'),
  tasteOfArt: eventAsset('taste-of-art/taste-of-art-ani.mp4', '/dorsey/current/taste-of-art.jpg'),
  teaTime: eventAsset('tea-time/tea-time-ani.mp4'),
  bravo: eventAsset('bravo/bravo-ani.mp4'),
  winterWonderland: sharedAsset('winter-wonderland'),
  greekBall: sharedAsset('greek-ball'),
  monstersBall: sharedAsset('monsters-ball'),
  snowBall: sharedAsset('snow-ball'),
  champagneBall: sharedAsset('champagne-ball'),
  blackBall: sharedAsset('black-ball'),
  roseBall: sharedAsset('rose-ball'),
} satisfies Record<string, MotionAsset>;
