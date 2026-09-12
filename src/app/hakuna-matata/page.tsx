import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

const SHOP_URL = 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey';
const media = (id: string) => `/api/media/hakuna/${id}`;

export const metadata: Metadata = {
  title: 'Hakuna Matata — The Book by Dr. DoLo Dorsey',
  description: 'The official home of Hakuna Matata by Dr. DoLo Dorsey — a personal philosophy on living today, planning tomorrow, and moving through life without surrendering ambition.',
  alternates: { canonical: '/hakuna-matata' },
  openGraph: {
    title: 'Hakuna Matata — Dr. DoLo Dorsey',
    description: 'A book, philosophy, and operating mindset from Dr. DoLo Dorsey.',
    url: 'https://doctordorsey.com/hakuna-matata',
    images: [{ url: media('1ZRtzUYyTLLrvgzyNu8mIXU0Lgw3E1sQ1') }],
    type: 'book',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hakuna Matata — Dr. DoLo Dorsey',
    description: 'Live for today. Plan for tomorrow. Party tonight.',
    images: [media('1ZRtzUYyTLLrvgzyNu8mIXU0Lgw3E1sQ1')],
  },
};

const ideas = [
  ['01', 'LIVE', 'Presence is not the absence of responsibility. It is refusing to miss the life you are building while you build it.'],
  ['02', 'PLAN', 'Freedom works better with structure. Vision, preparation, ownership, and a longer horizon protect the present.'],
  ['03', 'MOVE', 'Life changes quickly. The operating mindset is to keep moving, adapt without losing yourself, and turn experience into direction.'],
];

export default function HakunaMatataPage() {
  return <main className={styles.site}>
    <nav className={styles.nav}>
      <Link href="/" className={styles.wordmark}>DR. DOLO DORSEY</Link>
      <div><a href="#philosophy">Philosophy</a><a href="#book">The Book</a><a href="#gallery">Visual World</a></div>
      <a className={styles.buyMini} href={SHOP_URL}>Buy the book ↗</a>
    </nav>

    <section className={styles.hero}>
      <div className={styles.heroMedia}><img src={media('1Rff5LFZc9QfcuCHI9wAzWA26lrARt_Vh')} alt="Dr. Dorsey with Hakuna Matata" /></div>
      <div className={styles.heroVeil}></div>
      <div className={styles.heroCopy}>
        <span>THE BOOK / THE PHILOSOPHY / THE LIFE</span>
        <h1>HAKUNA<br/><em>MATATA.</em></h1>
        <p>Not “no problems.” A way of refusing to let the problems own the entire story.</p>
        <div><a className={styles.primary} href={SHOP_URL}>Get your copy ↗</a><a href="#philosophy">Enter the philosophy</a></div>
      </div>
      <aside><small>DR. DOLO DORSEY</small><strong>LIVE FOR TODAY.</strong><strong>PLAN FOR TOMORROW.</strong><strong>PARTY TONIGHT.</strong></aside>
    </section>

    <section className={styles.statement} id="philosophy">
      <p>HAKUNA MATATA IS NOT AN EXCUSE TO IGNORE LIFE.</p>
      <h2>IT IS PERMISSION TO<br/><em>LIVE IT ON PURPOSE.</em></h2>
      <div className={styles.ideaGrid}>{ideas.map(([n,t,c])=><article key={n}><small>{n}</small><h3>{t}</h3><p>{c}</p></article>)}</div>
    </section>

    <section className={styles.bookSection} id="book">
      <div className={styles.bookArt}><img src={media('1ZRtzUYyTLLrvgzyNu8mIXU0Lgw3E1sQ1')} alt="Hakuna Matata front and back cover"/></div>
      <div className={styles.bookCopy}>
        <span>THE OFFICIAL BOOK</span>
        <h2>A PHILOSOPHY<br/>BUILT FROM <em>LIVING.</em></h2>
        <p>Hakuna Matata belongs inside the larger Dr. Dorsey story: entrepreneurship, hospitality, culture, family, pressure, celebration, reinvention, and the discipline to keep building without postponing life until some imaginary finish line.</p>
        <blockquote>“Live for today. Plan for tomorrow. Party tonight.”</blockquote>
        <a className={styles.darkButton} href={SHOP_URL}>Purchase Hakuna Matata ↗</a>
      </div>
    </section>

    <section className={styles.editorial}>
      <div><small>THE MINDSET</small><h2>NO WORRIES<br/>DOESN’T MEAN<br/><em>NO WORK.</em></h2></div>
      <div className={styles.editorialNotes}>
        <article><b>01 / AMBITION</b><p>Build aggressively without turning the future into the only place where you allow yourself to be alive.</p></article>
        <article><b>02 / RESILIENCE</b><p>Pressure is real. So are recovery, perspective, humor, people, music, travel, family, and the next move.</p></article>
        <article><b>03 / LEGACY</b><p>The goal is bigger than a résumé. The work should leave systems, stories, experiences, ownership, and possibility behind.</p></article>
      </div>
    </section>

    <section className={styles.gallery} id="gallery">
      <header><span>THE HAKUNA WORLD</span><h2>THE BOOK<br/><em>OUTSIDE THE PAGE.</em></h2></header>
      <div className={styles.galleryGrid}>
        {[
          ['1b0tMahIiM9r3GZG0yeXI8VKoIii-7nbv','Hakuna Matata campaign'],
          ['1qVEgE1XFXt2DodzEcDZX0b0Ot3hPvEEs','Hakuna Matata editorial'],
          ['1r7zOgLhV8-0ebqMYx34enGsN20Sze-j1','Hakuna Matata visual'],
          ['1lrguvZp9cMjZ_U07P7cTXrl2CBvn9G6h','Hakuna Matata creative'],
          ['193hbCbC89LffZ1uCtmZl5gce8-W1axDC','Hakuna Matata campaign world'],
          ['1L35fZzAr3BjQTrXpPPLuDqvsu9X5eUN6','Hakuna Matata archive'],
        ].map(([id, alt],i)=><figure key={id}><img src={media(id)} alt={alt}/><figcaption>{String(i+1).padStart(2,'0')} / HAKUNA MATATA</figcaption></figure>)}
      </div>
    </section>

    <section className={styles.newsletter}>
      <img src={media('12NDVa_b0GMWLWuozALsHWOo2ERYvgRcl')} alt="Hakuna Matata newsletter creative"/>
      <div><span>KEEP THE PHILOSOPHY CLOSE</span><h2>READ IT.<br/>LIVE IT.<br/><em>BUILD FROM IT.</em></h2><p>The official purchase path is live now. Additional book events, conversations, and Hakuna Matata experiences can live here as they are confirmed.</p><a href={SHOP_URL}>Get the book ↗</a></div>
    </section>

    <footer className={styles.footer}><b>DR. DOLO DORSEY</b><span>HAKUNA MATATA © 2026</span><Link href="/">DOCTORDORSEY.COM ↗</Link></footer>
  </main>;
}
