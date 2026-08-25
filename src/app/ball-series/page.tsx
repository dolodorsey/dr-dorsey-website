import type { Metadata } from 'next';
import MotionCover from '@/components/MotionCover';
import { eventMotion } from '@/lib/event-motion';
import styles from './page.module.css';

const EVENT_HUB = 'https://111atl.com';
const GREEK_TICKETS = 'https://www.eventbrite.com/e/greek-ball-divine-nine-homecoming-tickets-1998051718476';
const CHAMPAGNE_TICKETS = 'https://www.eventbrite.com/e/champagne-ball-new-year-black-tie-tickets-1998051720482';
const ROSE_TICKETS = 'https://www.eventbrite.com/e/rose-ball-valentines-weekend-tickets-1998051724494';

export const metadata: Metadata = {
  title: 'The Ball Series — The Kollective',
  description:
    'Six signature formal event chapters across Atlanta: Greek Ball, Monster’s Ball, Snow Ball, Black Ball, Champagne Ball and Rose Ball.',
  alternates: { canonical: 'https://thekollectivehospitality.com/ball-series' },
  openGraph: {
    title: 'The Ball Series — The Kollective',
    description: 'Dress up. Show out. Come correct. Six formal worlds across the 2026–27 season.',
    images: [{ url: eventMotion.greekBall.poster }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ball Series — The Kollective',
    description: 'Six formal worlds. One premium event standard.',
    images: [eventMotion.greekBall.poster],
  },
};

const balls = [
  {
    slug: 'greek-ball',
    chapter: '01',
    name: 'Greek Ball',
    title: 'BEAUTY & THE BEAST',
    date: 'OCT 17',
    year: '2026',
    day: 'SATURDAY',
    eyebrow: 'DIVINE NINE · HOMECOMING',
    dress: 'FORMAL · GREEK CULTURE',
    description:
      'Greek-letter culture, alumni and undergraduate community meet formal style, celebration and a premium Atlanta social experience.',
    animation: eventMotion.greekBall,
    href: GREEK_TICKETS,
    cta: 'Tickets live ↗',
    live: true,
  },
  {
    slug: 'monsters-ball',
    chapter: '02',
    name: 'Monster’s Ball',
    title: 'AFTER DARK',
    date: 'OCT 31',
    year: '2026',
    day: 'SATURDAY',
    eyebrow: 'HALLOWEEN · THEATRICAL NIGHTLIFE',
    dress: 'COSTUME FORMAL · DARK GLAMOUR',
    description:
      'A Halloween gala where costume excellence meets formal nightlife — cinematic, theatrical and intentionally over the top.',
    animation: eventMotion.monstersBall,
    href: EVENT_HUB,
    cta: 'Release coming ↗',
    live: false,
  },
  {
    slug: 'snow-ball',
    chapter: '03',
    name: 'Snow Ball',
    title: 'WINTER WHITE',
    date: 'NOV 21',
    year: '2026',
    day: 'SATURDAY',
    eyebrow: 'HOLIDAY · WINTER FANTASY',
    dress: 'ALL WHITE · ELEVATED',
    description:
      'A glowing winter-white world built for elevated dress, holiday energy and a grown social experience that feels transported.',
    animation: eventMotion.snowBall,
    href: EVENT_HUB,
    cta: 'Release coming ↗',
    live: false,
  },
  {
    slug: 'black-ball',
    chapter: '04',
    name: 'Black Ball',
    title: 'BLACK ON BLACK',
    date: 'NOV 27',
    year: '2026',
    day: 'FRIDAY',
    eyebrow: 'THANKSGIVING WEEKEND · FORMAL',
    dress: 'ALL BLACK · NO EXCEPTIONS',
    description:
      'One palette. Maximum presence. An all-black formal night built around intentional elegance, sharp silhouettes and collective visual impact.',
    animation: eventMotion.blackBall,
    href: EVENT_HUB,
    cta: 'Release coming ↗',
    live: false,
  },
  {
    slug: 'champagne-ball',
    chapter: '05',
    name: 'Champagne Ball',
    title: 'THE TOAST',
    date: 'JAN 02',
    year: '2027',
    day: 'SATURDAY',
    eyebrow: 'NEW YEAR · BLACK TIE',
    dress: 'BLACK TIE · CHAMPAGNE TONES',
    description:
      'The first toast of the year — black-tie energy, champagne hospitality and a polished chapter designed to begin 2027 correctly.',
    animation: eventMotion.champagneBall,
    href: CHAMPAGNE_TICKETS,
    cta: 'Tickets live ↗',
    live: true,
  },
  {
    slug: 'rose-ball',
    chapter: '06',
    name: 'Rose Ball',
    title: 'LOVE IN COLOR',
    date: 'FEB 13',
    year: '2027',
    day: 'SATURDAY',
    eyebrow: 'VALENTINE’S WEEKEND · ROMANCE',
    dress: 'SHADES OF RED · FORMAL',
    description:
      'A Valentine’s-weekend world in shades of red — romance, style, dramatic rooms and elevated nightlife without the cliché.',
    animation: eventMotion.roseBall,
    href: ROSE_TICKETS,
    cta: 'Tickets live ↗',
    live: true,
  },
] as const;

const [featured, ...chapters] = balls;

export default function BallSeriesPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a className={styles.brand} href="https://thekollectivehospitality.com">THE KOLLECTIVE</a>
        <div>
          <a href="#season">Season</a>
          <a href="#standard">The Standard</a>
          <a href={EVENT_HUB}>Current Events ↗</a>
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true">
          <MotionCover animation={eventMotion.greekBall} alt="" fill />
        </div>
        <div className={styles.heroShade} />
        <div className={styles.heroTopline}>
          <span>THE KOLLECTIVE PRESENTS</span>
          <span>ATLANTA · 2026—27</span>
        </div>
        <div className={styles.heroTitle}>
          <p>SIGNATURE FORMAL EVENT SERIES</p>
          <h1>THE<br /><em>BALL</em><br />SERIES</h1>
        </div>
        <div className={styles.heroBottom}>
          <div>
            <strong>Dress up. Show out. Come correct.</strong>
            <p>
              Six distinct formal worlds. Six reasons to change the room. Every chapter keeps its own culture, dress code and atmosphere.
            </p>
          </div>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={GREEK_TICKETS}>Greek Ball tickets ↗</a>
            <a className={styles.textButton} href="#season">See the full season ↓</a>
          </div>
        </div>
      </header>

      <section className={styles.seasonRail} id="season" aria-label="Ball Series season schedule">
        {balls.map((ball) => (
          <a href={`#${ball.slug}`} key={ball.slug}>
            <span>{ball.date}</span>
            <div>
              <small>{ball.year}</small>
              <b>{ball.name}</b>
            </div>
            {ball.live ? <em>LIVE</em> : null}
          </a>
        ))}
      </section>

      <section className={styles.featured} id={featured.slug}>
        <div className={styles.featureMedia}>
          <MotionCover animation={featured.animation} alt={featured.name} fill />
          <div className={styles.featureDate}>
            <small>NEXT CHAPTER</small>
            <strong>{featured.date}</strong>
            <span>{featured.year}</span>
          </div>
        </div>
        <div className={styles.featureCopy}>
          <div className={styles.chapterLine}><span>CHAPTER {featured.chapter}</span><span>{featured.day} · ATLANTA</span></div>
          <p className={styles.eyebrow}>{featured.eyebrow}</p>
          <h2>{featured.title}</h2>
          <h3>{featured.name}</h3>
          <p className={styles.description}>{featured.description}</p>
          <div className={styles.dress}><small>THE LOOK</small><b>{featured.dress}</b></div>
          <div className={styles.featureActions}>
            <a className={styles.primaryButton} href={featured.href}>{featured.cta}</a>
            <span>Venue announced soon · Atlanta</span>
          </div>
        </div>
      </section>

      <section className={styles.chapters} aria-label="Ball Series chapters">
        {chapters.map((ball) => (
          <a className={styles.chapterCard} href={ball.href} id={ball.slug} key={ball.slug}>
            <div className={styles.chapterMedia}>
              <MotionCover animation={ball.animation} alt={ball.name} fill />
              <div className={styles.chapterOverlay}>
                <span>CH. {ball.chapter}</span>
                <div><b>{ball.date}</b><small>{ball.year}</small></div>
              </div>
            </div>
            <div className={styles.chapterBody}>
              <div className={styles.chapterMeta}><span>{ball.day} · ATLANTA</span>{ball.live ? <em>ON SALE</em> : <em>COMING SOON</em>}</div>
              <small>{ball.eyebrow}</small>
              <h2>{ball.name}</h2>
              <strong>{ball.title}</strong>
              <p>{ball.description}</p>
              <div className={styles.chapterFooter}><span>{ball.dress}</span><b>{ball.cta}</b></div>
            </div>
          </a>
        ))}
      </section>

      <section className={styles.standard} id="standard">
        <div className={styles.standardLead}>
          <p>THE BALL SERIES STANDARD</p>
          <h2>DRESS IS PART<br />OF THE <em>EXPERIENCE.</em></h2>
          <span>
            This is not six versions of the same party. The room, the music, the look and the cultural language change every chapter. The standard does not.
          </span>
        </div>
        <div className={styles.principles}>
          <article><span>01</span><h3>FORMAL,<br />NOT STIFF.</h3><p>Elevated presentation with enough energy to actually live in the room.</p></article>
          <article><span>02</span><h3>CULTURAL,<br />NOT GENERIC.</h3><p>Every chapter has a reason, a visual code and a community it speaks to.</p></article>
          <article><span>03</span><h3>DIFFERENT<br />EVERY TIME.</h3><p>No copy-and-paste nightlife. Each Ball earns its own identity.</p></article>
        </div>
      </section>

      <section className={styles.finalCta}>
        <p>THE FIRST CHAPTER IS LIVE</p>
        <h2>BEAUTY & THE BEAST:<br /><em>GREEK BALL.</em></h2>
        <div>
          <span>Saturday · October 17 · Atlanta</span>
          <a className={styles.primaryButton} href={GREEK_TICKETS}>Get tickets ↗</a>
          <a className={styles.textButton} href={EVENT_HUB}>View all current events ↗</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <b>THE KOLLECTIVE</b>
        <span>THE BALL SERIES · ATLANTA · 2026—27</span>
        <a href={EVENT_HUB}>EVENT ACCESS ↗</a>
      </footer>
    </main>
  );
}
