'use client';

import styles from './CinematicHero.module.css';

/**
 * FLAGSHIP V2 — Cinematic Empire Introduction.
 *
 * Sequence (CSS timeline, no animation library, no JS on the critical path):
 *   0.0s  black
 *   0.3s  emblem resolves out of blur
 *   1.2s  city lights ignite, staggered west-to-east
 *   1.6s  film underlay fades up behind the constellation
 *   2.6s  statement lines rise, one per line
 *   4.2s  sub-line + scroll cue settle
 *
 * Degrades to the final frame on prefers-reduced-motion.
 * Mobile runs a shortened timeline with no scale transform on the film.
 */

export type HeroCity = { name: string; x: number; y: number };

const DEFAULT_CITIES: HeroCity[] = [
  { name: 'Los Angeles', x: 11, y: 47 },
  { name: 'Las Vegas', x: 21, y: 39 },
  { name: 'Houston', x: 42, y: 68 },
  { name: 'Atlanta', x: 63, y: 52 },
  { name: 'Washington DC', x: 79, y: 34 },
  { name: 'New York', x: 86, y: 25 },
  { name: 'Miami', x: 76, y: 76 },
];

type CinematicHeroProps = {
  emblem: string;
  video?: string;
  poster?: string;
  /** Each string renders as its own rising line. Wrap italics with <em> via `accentLast`. */
  lines: string[];
  accentLast?: boolean;
  sub?: string;
  cities?: HeroCity[];
  cueHref?: string;
  label?: string;
};

export default function CinematicHero({
  emblem,
  video,
  poster,
  lines,
  accentLast = true,
  sub,
  cities = DEFAULT_CITIES,
  cueHref = '#intro',
  label = 'Enterprise introduction',
}: CinematicHeroProps) {
  return (
    <section className={styles.hero} id="top" aria-label={label}>
      {video && (
        <video
          className={styles.film}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.cities} aria-hidden="true">
        {cities.map((city, i) => (
          <div
            key={city.name}
            className={styles.city}
            style={{
              left: `${city.x}%`,
              top: `${city.y}%`,
              animationDelay: `${1200 + i * 190}ms`,
            }}
          >
            <span className={styles.cityDot} style={{ animationDelay: `${i * 420}ms` }} />
            <span className={styles.cityName}>{city.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.stage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.emblem} src={emblem} alt="" aria-hidden="true" />

        <h1 className={styles.statement}>
          {lines.map((line, i) => {
            const isAccent = accentLast && i === lines.length - 1;
            return (
              <span className={styles.line} key={line}>
                <span style={{ animationDelay: `${2600 + i * 220}ms` }}>
                  {isAccent ? <em>{line}</em> : line}
                </span>
              </span>
            );
          })}
        </h1>

        {sub && <p className={styles.sub}>{sub}</p>}
      </div>

      <a className={styles.cue} href={cueHref} aria-label="Scroll to continue" />
    </section>
  );
}
