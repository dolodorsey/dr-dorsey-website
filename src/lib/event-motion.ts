import type { MotionAsset } from './motion';

/**
 * Current event animations sourced from Supabase.
 *
 * Labor Day / BRAVO media lives in the Creative Engine. Ball Series media
 * lives in the shared brand-graphics motion library. Both are public, shared
 * sources so Dorsey and Kollective render the same canonical event covers.
 */
const EVENT_MOTION_BASE =
  'https://woqlhjodiedyqfvzweoe.supabase.co/storage/v1/object/public/animations/events';
const BALL_MOTION_BASE =
  'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/motion/111atl';

const DEFAULT_POSTER = '/brand/kollective-hero-poster.png';

function eventAsset(path: string, poster = DEFAULT_POSTER): MotionAsset {
  return {
    src: `${EVENT_MOTION_BASE}/${path}`,
    poster,
    orientation: 'landscape',
  };
}

function ballAsset(slug: string): MotionAsset {
  return {
    src: `${BALL_MOTION_BASE}/${slug}.mp4`,
    poster: `${BALL_MOTION_BASE}/${slug}.jpg`,
    orientation: 'landscape',
  };
}

export const eventMotion = {
  blow: eventAsset('blow/blow-ani-2.mp4'),
  tasteOfArt: eventAsset('taste-of-art/taste-of-art-ani.mp4', '/dorsey/current/taste-of-art.jpg'),
  teaTime: eventAsset('tea-time/tea-time-ani.mp4'),
  bravo: eventAsset('bravo/bravo-ani.mp4'),
  greekBall: ballAsset('greek-ball'),
  monstersBall: ballAsset('monsters-ball'),
  snowBall: ballAsset('snow-ball'),
  champagneBall: ballAsset('champagne-ball'),
  blackBall: ballAsset('black-ball'),
  roseBall: ballAsset('rose-ball'),
} satisfies Record<string, MotionAsset>;
