import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MotionCover from '@/components/MotionCover';
import {
  BALLS,
  formatPrice,
  getBallConfig,
  getBallLiveState,
  type BallConfig,
} from '@/lib/ball-series';
import BallLiveClient from './BallLiveClient';
import GreekBallConversion from './GreekBallConversion';
import styles from './page.module.css';

export const revalidate = 300;

export function generateStaticParams() {
  return BALLS.map((ball) => ({ slug: ball.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const ball = getBallConfig(params.slug);
  if (!ball) return {};
  return {
    title: `${ball.title}: ${ball.name} — The Ball Series`,
    description: ball.description,
    alternates: { canonical: `https://thekollectivehospitality.com/ball-series/${ball.slug}` },
    openGraph: {
      title: `${ball.title}: ${ball.name}`,
      description: `${ball.date} · ${ball.year} · Atlanta. ${ball.dress}.`,
      images: [{ url: ball.animation.poster }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${ball.title}: ${ball.name}`,
      description: `${ball.date} · ${ball.year} · Atlanta.`,
      images: [ball.animation.poster],
    },
  };
}

function venueLabel(ball: BallConfig, venueName: string | null) {
  if (!venueName || /tba|announced soon/i.test(venueName)) return 'VENUE REVEAL PENDING';
  return venueName.toUpperCase();
}

export default async function BallDetailPage({ params }: { params: { slug: string } }) {
  const ball = getBallConfig(params.slug);
  if (!ball) notFound();
  const live = await getBallLiveState(ball);
  const ticketAccess = live.trackingUrl || live.ticketUrl;

  return (
    <main className={styles.page} style={{ '--ball-accent': ball.accent } as React.CSSProperties}>
      <nav className={styles.nav}>
        <a className={styles.brand} href="https://thekollectivehospitality.com">THE KOLLECTIVE</a>
        <div>
          <a href="/ball-series">All Balls</a>
          <a href="#tickets">Tickets</a>
          {ball.slug === 'greek-ball' ? <a href="#greek-sales">Group Sales</a> : null}
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroMedia}>
          <MotionCover animation={ball.animation} alt={ball.name} fill />
        </div>
        <div className={styles.heroShade} />
        <div className={styles.heroTop}>
          <span>THE BALL SERIES · CHAPTER {ball.chapter}</span>
          <span>{ball.date} · {ball.year} · ATLANTA</span>
        </div>
        <div className={styles.heroCopy}>
          <p>{ball.eyebrow}</p>
          <h1>{ball.title}</h1>
          <h2>{ball.name}</h2>
          <strong>{ball.dress}</strong>
        </div>
        <div className={styles.heroLive}>
          <span className={live.soldOut ? styles.soldOut : styles.onSale}>{live.statusLabel}</span>
          <BallLiveClient
            slug={ball.slug}
            name={ball.name}
            title={ball.title}
            dateIso={ball.dateIso}
            ticketUrl={live.ticketUrl}
            trackingUrl={live.trackingUrl}
            poster={ball.animation.poster}
            statusLabel={live.statusLabel}
          />
        </div>
      </header>

      <section className={styles.eventFacts}>
        <article><small>DATE</small><b>{ball.day}<br />{ball.date} · {ball.year}</b></article>
        <article><small>DOORS</small><b>{live.eventTime ? live.eventTime.replace(/^0?/, '') : 'ANNOUNCED SOON'}</b></article>
        <article><small>VENUE</small><b>{venueLabel(ball, live.venueName)}</b>{live.venueAddress ? <span>{live.venueAddress}</span> : null}</article>
        <article><small>CITY</small><b>{live.city.toUpperCase()}</b></article>
      </section>

      <section className={styles.story}>
        <div className={styles.storyLead}>
          <p>CHAPTER {ball.chapter} / THE WORLD</p>
          <h2>{ball.name.toUpperCase()}<br /><em>CHANGES THE ROOM.</em></h2>
        </div>
        <div className={styles.storyBody}>
          <p>{ball.description}</p>
          <div><small>THE LOOK</small><strong>{ball.dress}</strong></div>
          <div><small>THE RULE</small><strong>COME DRESSED FOR THE WORLD YOU ARE ENTERING.</strong></div>
        </div>
      </section>

      <section className={styles.ticketSection} id="tickets">
        <header>
          <p>TICKET ACCESS</p>
          <h2>CHOOSE YOUR<br /><em>LEVEL.</em></h2>
          <span>Pricing and packages are pulled from the Ball Series ticket configuration. Final availability is confirmed at checkout.</span>
        </header>

        {live.admissionTiers.length ? (
          <div className={styles.tierGrid}>
            {live.admissionTiers.map((tier) => (
              <article key={tier.tier_key}>
                <small>{tier.is_vip ? 'VIP ADMISSION' : 'ADMISSION'}</small>
                <h3>{tier.tier_label}</h3>
                <b>{formatPrice(tier.price_cents)}</b>
                {tier.capacity ? <span>{tier.capacity} configured at this tier</span> : <span>While available</span>}
                {ticketAccess ? <a href={ticketAccess}>Select at checkout ↗</a> : <em>Release pending</em>}
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.noTiers}>Ticket tiers are being released. Use the official event listing for current access.</div>
        )}

        {live.sectionTiers.length ? (
          <div className={styles.sectionPackages}>
            <div>
              <p>VIP SECTIONS / TABLE PACKAGES</p>
              <h3>DON’T JUST ATTEND.<br /><em>HOST THE NIGHT.</em></h3>
            </div>
            <div className={styles.packageList}>
              {live.sectionTiers.map((tier) => (
                <article key={tier.tier_key}>
                  <div><small>{tier.section_capacity ? `UP TO ${tier.section_capacity} PEOPLE` : 'VIP SECTION'}</small><b>{tier.tier_label}</b></div>
                  <div><strong>{formatPrice(tier.price_cents)}</strong><span>{tier.bottles_included ? `${tier.bottles_included} bottle${tier.bottles_included === 1 ? '' : 's'} included` : 'Package details at checkout'}</span></div>
                  {ball.slug === 'greek-ball' ? <a href="#greek-sales">Request this package ↗</a> : ticketAccess ? <a href={ticketAccess}>View package ↗</a> : null}
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {ball.slug === 'greek-ball' ? (
        <GreekBallConversion pageUrl="https://thekollectivehospitality.com/ball-series/greek-ball" />
      ) : null}

      <section className={styles.shareStrip}>
        <div><small>SHARE THE CHAPTER</small><b>{ball.title}: {ball.name}</b></div>
        <span>Every Ball has its own share-ready story asset and referral-aware ticket path above.</span>
      </section>

      <section className={styles.nextChapter}>
        <p>THE SERIES CONTINUES</p>
        <h2>ONE NIGHT ENDS.<br /><em>THE NEXT WORLD OPENS.</em></h2>
        <div className={styles.nextGrid}>
          {BALLS.filter((item) => item.slug !== ball.slug).slice(0, 3).map((item) => (
            <a href={`/ball-series/${item.slug}`} key={item.slug}>
              <MotionCover animation={item.animation} alt={item.name} fill />
              <div><small>{item.date} · {item.year}</small><b>{item.name}</b><span>Enter chapter ↗</span></div>
            </a>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <b>THE KOLLECTIVE</b>
        <span>THE BALL SERIES · ATLANTA · 2026—27</span>
        <a href="/ball-series">ALL CHAPTERS ↗</a>
      </footer>
    </main>
  );
}
