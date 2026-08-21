import type { MotionAsset } from './motion';

/**
 * Current event animations sourced from the Creative Engine Supabase project.
 *
 * These files stay in the shared public `animations` bucket so the Dorsey and
 * Kollective websites can use the same canonical media without committing
 * large video binaries to git.
 */
const EVENT_MOTION_BASE =
  'https://woqlhjodiedyqfvzweoe.supabase.co/storage/v1/object/public/animations/events';

const DEFAULT_POSTER = '/brand/kollective-hero-poster.png';

function eventAsset(path: string, poster = DEFAULT_POSTER): MotionAsset {
  return {
    src: `${EVENT_MOTION_BASE}/${path}`,
    poster,
    orientation: 'landscape',
  };
}

export const eventMotion = {
  blow: eventAsset('blow/blow-ani-2.mp4'),
  tasteOfArt: eventAsset('taste-of-art/taste-of-art-ani.mp4', '/dorsey/current/taste-of-art.jpg'),
  teaTime: eventAsset('tea-time/tea-time-ani.mp4'),
  bravo: eventAsset('bravo/bravo-ani.mp4'),
} satisfies Record<string, MotionAsset>;
