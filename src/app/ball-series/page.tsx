import type { Metadata } from 'next';
import MotionCover from '@/components/MotionCover';
import { BALLS, getBallLiveState } from '@/lib/ball-series';
import { eventMotion } from '@/lib/event-motion';
import styles from './page.module.css';

const EVENT_HUB = 'https://111atl.com';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'The Ball Series — The Kollective',
  description:
    'Six signature formal event chapters across Atlanta: Greek Ball, Monster’s Ball, Black Ball, Snow Ball, Champagne Ball and Rose Ball.',
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

export default async function BallSeriesPage() {
  const liveStates = await Promise.all(BALLS.map((ball) => getBallLiveState(ball)));
  const balls = BALLS.map((ball, index) => ({ ...ball, live: liveStates[index] }));
  const [featured, ...chapters] = balls;
  const featuredTickets = featured.live.trackingUrl || featured.live.ticketUrl;

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
            <p>Six distinct formal worlds. Six reasons to change the room. Every chapter keeps its own culture, dress code and atmosphere.</p>
          </div>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="/ball-series/greek-ball">Enter Greek Ball ↗</a>
            {featuredTickets ? <a className={styles.textButton} href={featuredTickets}>Tickets live ↗</a> : null}
          </div>
        </div>
      </header>

      <section className={styles.seasonRail} id="season" aria-label="Ball Series season schedule">
        {balls.map((ball) => (
          <a href={`/ball-series/${ball.slug}`} key={ball.slug}>
            <span>{ball.date}</span>
            <div><small>{ball.year}</small><b>{ball.name}</b></div>
            {ball.live.onSale ? <em>LIVE</em> : ball.live.soldOut ? <em>SOLD OUT</em> : null}
          </a>
        ))}
      </section>

      <section className={styles.featured} id={featured.slug}>
        <div className={styles.featureMedia}>
          <MotionCover animation={featured.animation} alt={featured.name} fill />
          <div className={styles.featureDate}><small>NEXT CHAPTER</small><strong>{featured.date}</strong><span>{featured.year}</span></div>
        </div>
        <div className={styles.featureCopy}>
          <div className={styles.chapterLine}><span>CHAPTER {featured.chapter}</span><span>{featured.day} · ATLANTA</span></div>
          <p className={styles.eyebrow}>{featured.eyebrow}</p>
          <h2>{featured.title}</h2>
          <h3>{featured.name}</h3>
          <p className={styles.description}>{featured.description}</p>
          <div className={styles.dress}><small>THE LOOK</small><b>{featured.dress}</b></div>
          <div className={styles.featureActions}>
            <a className={styles.primaryButton} href={`/ball-series/${featured.slug}`}>Explore chapter ↗</a>
            <span>{featured.live.venueName || 'Venue announced soon'} · {featured.live.city}</span>
          </div>
        </div>
      </section>

      <section className={styles.chapters} aria-label="Ball Series chapters">
        {chapters.map((ball) => (
          <a className={styles.chapterCard} href={`/ball-series/${ball.slug}`} id={ball.slug} key={ball.slug}>
            <div className={styles.chapterMedia}>
              <MotionCover animation={ball.animation} alt={ball.name} fill />
              <div className={styles.chapterOverlay}><span>CH. {ball.chapter}</span><div><b>{ball.date}</b><small>{ball.year}</small></div></div>
            </div>
            <div className={styles.chapterBody}>
              <div className={styles.chapterMeta}><span>{ball.day} · {ball.live.city.toUpperCase()}</span><em>{ball.live.statusLabel}</em></div>
              <small>{ball.eyebrow}</small>
              <h2>{ball.name}</h2>
              <strong>{ball.title}</strong>
              <p>{ball.description}</p>
              <div className={styles.chapterFooter}><span>{ball.dress}</span><b>Enter chapter ↗</b></div>
            </div>
          </a>
        ))}
      </section>

      <section className={styles.standard} id="standard">
        <div className={styles.standardLead}>
          <p>THE BALL SERIES STANDARD</p>
          <h2>DRESS IS PART<br />OF THE <em>EXPERIENCE.</em></h2>
          <span>This is not six versions of the same party. The room, the music, the look and the cultural language change every chapter. The standard does not.</span>
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
          <a className={styles.primaryButton} href="/ball-series/greek-ball">Open Greek Ball ↗</a>
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
