import type { Metadata } from 'next';
import MotionCover from '@/components/MotionCover';
import { eventMotion } from '@/lib/event-motion';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Ball Series — The Kollective',
  description: 'Six signature formal worlds inside The Kollective Ball Series.',
};

const balls = [
  {
    name: 'Greek Ball',
    eyebrow: 'GREEK CULTURE',
    description: 'Greek-letter culture, alumni and undergraduate community, elevated dress, celebration, and a campus-connected social experience.',
    animation: eventMotion.greekBall,
  },
  {
    name: 'Monster’s Ball',
    eyebrow: 'HALLOWEEN',
    description: 'A theatrical Halloween costume gala built around dark glamour, costume excellence, and creative nightlife.',
    animation: eventMotion.monstersBall,
  },
  {
    name: 'Snow Ball',
    eyebrow: 'WINTER WHITE',
    description: 'A winter-white holiday gala with glowing atmosphere, elevated dress, and an adult winter-fantasy experience.',
    animation: eventMotion.snowBall,
  },
  {
    name: 'Champagne Ball',
    eyebrow: 'CHAMPAGNE CELEBRATION',
    description: 'An elevated champagne-themed chapter built around celebration, formal style, hospitality, and its own distinct identity.',
    animation: eventMotion.champagneBall,
  },
  {
    name: 'Black Ball',
    eyebrow: 'ALL BLACK',
    description: 'An all-black semi-formal gala built around a unified palette, intentional elegance, and every guest dressed in black.',
    animation: eventMotion.blackBall,
  },
  {
    name: 'Rose Ball',
    eyebrow: 'SHADES OF RED',
    description: 'A Valentine’s-weekend Ball Series experience built around shades of red, romance, style, and elevated nightlife.',
    animation: eventMotion.roseBall,
  },
] as const;

export default function BallSeriesPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a href="https://thekollectivehospitality.com">THE KOLLECTIVE</a>
        <div>
          <a href="/companies">Companies</a>
          <a href="/events">Current</a>
          <a href="https://111atl.com">Event Access ↗</a>
        </div>
      </nav>

      <header className={styles.hero}>
        <p>THE KOLLECTIVE / SIGNATURE EVENT SERIES</p>
        <h1>
          BALL
          <br />
          <em>SERIES.</em>
        </h1>
        <div className={styles.heroCopy}>
          <strong>Six signature formal worlds. One series.</strong>
          <span>
            Each Ball keeps its own identity, dress code, atmosphere, and cultural moment — connected by one premium event standard.
          </span>
        </div>
        <a className={styles.heroCta} href="#series">Explore the series ↓</a>
      </header>

      <section className={styles.grid} id="series">
        {balls.map((ball, index) => (
          <article className={styles.card} key={ball.name}>
            <a className={styles.media} href="https://111atl.com" aria-label={`Open ${ball.name} event access`}>
              <MotionCover animation={ball.animation} alt={ball.name} fill />
            </a>
            <div className={styles.cardBody}>
              <div className={styles.number}>{String(index + 1).padStart(2, '0')}</div>
              <div className={styles.copy}>
                <small>{ball.eyebrow}</small>
                <h2>{ball.name}</h2>
                <p>{ball.description}</p>
                <a href="https://111atl.com">Open event access ↗</a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.statement}>
        <p>THE STANDARD</p>
        <h2>ONE SERIES.<br /><em>SIX WORLDS.</em></h2>
        <span>Formal without feeling stiff. Cultural without feeling generic. Every edition is built to stand on its own.</span>
        <a href="https://111atl.com">View current event inventory ↗</a>
      </section>

      <footer className={styles.footer}>
        <b>THE KOLLECTIVE</b>
        <span>BALL SERIES</span>
        <a href="https://111atl.com">111ATL ↗</a>
      </footer>
    </main>
  );
}
