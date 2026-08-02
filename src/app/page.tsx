'use client';

import { useEffect, useState } from 'react';
import styles from './home.module.css';
import { BOOK_URL } from '@/lib/enterprise';
import MotionCover from '@/components/MotionCover';
import DepartmentGrid from '@/components/DepartmentGrid';
import FilmBackdrop from '@/components/FilmBackdrop';
import { motion } from '@/lib/motion';

/**
 * The first two entries render as the large featured pair.
 * Everything after them renders four across.
 */
const currentMoves = [
  { name: 'GOOD TIMES', kind: 'The culture calendar', image: '/dorsey/current/good-times.jpg', href: 'https://www.thegoodtimesworldwide.com' },
  { name: 'Taste of Art', kind: 'August 22 · Atlanta', image: '/dorsey/current/taste-of-art.jpg', href: 'https://www.eventbrite.com/e/the-taste-of-art-aug-22-tickets-1988881972519' },
  { name: 'GROWN-ISH', kind: 'August 7 · Atlanta', image: '/dorsey/current/grownish.jpg', href: 'https://www.eventbrite.com/e/the-grown-ish-aug-07-tickets-1988881854165' },
  { name: 'STUSH', kind: 'Fashion', image: '/dorsey/current/stush-fashion.jpg', href: 'https://stushusa.com' },
  { name: 'Pronto Energy', kind: 'Active beverage brand', image: '/dorsey/current/pronto-energy.jpg', href: 'https://prontoenergydrink.com' },
  { name: 'Infinity Water', kind: 'Active water brand', image: '/dorsey/current/infinity-water.jpg', href: 'https://watertoinfinity.com' },
  { name: 'Sole Exchange', kind: 'Impact · Philanthropy', href: 'https://soleexchangeworldwide.com' },
  { name: 'Help 911', kind: 'Response network', href: 'https://www.help911.help' },
  { name: 'The University', kind: 'Trades · Workforce · Ownership', href: 'https://the-university.vercel.app' },
  { name: 'Hakuna Matata', kind: 'The founder’s field manual', href: BOOK_URL },
];


export default function HomePage() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', close);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', close);
    };
  }, [menu]);

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a className={styles.navBrand} href="#top" aria-label="Dr. Dorsey home">
          <img src="/dorsey/logo.png" alt="Dr. Dorsey" />
        </a>
        <div className={styles.navLinks}>
          <a href="/companies">Companies</a>
          <a href="/directory">Directory</a>
          <a href="/events">Current</a>
          <a href="/links">Links</a>
        </div>
        <a className={styles.navCta} href="/forms/consultation">Book strategy ↗</a>
        <button
          className={styles.menuButton}
          onClick={() => setMenu((open) => !open)}
          aria-label={menu ? 'Close menu' : 'Open menu'}
          aria-expanded={menu}
          type="button"
        >
          <span />
          <span />
        </button>
      </nav>

      <div className={`${styles.mobileMenu} ${menu ? styles.open : ''}`}>
        <p>Dr. Dorsey / Direct access</p>
        <a href="/companies" onClick={() => setMenu(false)}>Companies <span>01</span></a>
        <a href="/directory" onClick={() => setMenu(false)}>Directory <span>02</span></a>
        <a href="/events" onClick={() => setMenu(false)}>Current & Events <span>03</span></a>
        <a href="/network">Network <span>04</span></a>
        <a href="/links">All Links <span>05</span></a>
      </div>

      <section className={styles.hero} id="top">
        <video className={styles.heroFilm} autoPlay muted loop playsInline>
          <source src="/dorsey/motion/founder-hero.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroFilmShade} />
        <a className={styles.heroBook} href={BOOK_URL}>
          <img src="/dorsey/book-cover.png" alt="Hakuna Matata by Dr. Dorsey" />
          <span>Buy the book <b>↗</b></span>
        </a>
      </section>

      <section className={`${styles.current} k-surface k-surface-deep`} id="departments">
        <FilmBackdrop animation={motion.kollectiveGlobal} opacity={0.16} />
        <header>
          <p className={styles.kicker}>The departments</p>
          <h2>NINE DEPARTMENTS. <em>ONE ENTERPRISE.</em></h2>
          <span>Every department runs its own companies, audience, economics, and atmosphere.</span>
        </header>
        <DepartmentGrid />
        <div className={styles.departmentsCta}>
          <a href="/companies">See every company ↗</a>
          <a href="/directory">Open the directory ↗</a>
        </div>
      </section>

      <section className={`${styles.current} k-surface k-emblem k-edge`}>
        <header>
          <p className={styles.kicker}>Current / moving now</p>
          <h2>THE WORK IS <em>ALIVE.</em></h2>
          <span>Events, products, campaigns, and releases with a direct route to action.</span>
        </header>
        <div className={styles.currentGrid}>
          {currentMoves.map((item) => (
            <a href={item.href} className={styles.currentTile} key={item.name}>
              <MotionCover name={item.name} image={item.image} alt={item.name} veil />
              <div><small>{item.kind}</small><h3>{item.name}</h3><b>Enter ↗</b></div>
            </a>
          ))}
        </div>
      </section>

      <section className={`${styles.manifesto} k-surface k-surface-warm k-collage k-inverted`}>
        <div className={styles.manifestoImage}>
          <img src="/dorsey/manifesto.webp" alt="Dr. Dorsey manifesto" />
        </div>
        <div className={styles.manifestoCopy}>
          <p>The founder’s code</p>
          <h2>
            LIVE FOR TODAY.
            <br />
            PLAN FOR TOMORROW.
            <br />
            <em>PARTY TONIGHT.</em>
          </h2>
          <p>
            Ambition without a life is empty. A life without a plan is fragile.
            The work is learning to build tomorrow without disappearing from today.
          </p>
        </div>
        <div className={styles.manifestoStats}>
          <div><b>60+</b><span>Entities and concepts</span></div>
          <div><b>09</b><span>Enterprise worlds</span></div>
          <div><b>01</b><span>Command philosophy</span></div>
        </div>
      </section>

      <section className={`${styles.architect} k-surface k-emblem k-emblem-left`} id="architect">
        <div className={styles.architectCopy}>
          <p className={styles.kicker}>The architect / not the influencer</p>
          <h2>
            THE WORK ISN’T
            <br />
            ONE COMPANY.
            <br />
            <em>IT’S THE SYSTEM.</em>
          </h2>
          <div className={styles.architectBody}>
            <p>
              Dr. Dorsey operates where hospitality, culture, enterprise,
              products, technology, and community infrastructure meet.
            </p>
            <p>
              The method is direct: establish the belief, create the identity,
              build the experience, install the operating model, connect the
              enterprise leverage, and make the next market possible.
            </p>
          </div>
          <div className={styles.architectActions}>
            <a href="/forms/consultation">Private strategy ↗</a>
            <a href="/forms/speaking">Speaking & appearances ↗</a>
          </div>
        </div>
        <div className={styles.architectVisual}>
          <img src="/dorsey/architect.webp" alt="Dr. Dorsey — The Architect" />
          <span>Founder / Builder / Architect of Culture</span>
        </div>
      </section>

      <section className={`${styles.enterprise} k-surface k-surface-deep`}>
        <FilmBackdrop animation={motion.kollectiveNetwork} opacity={0.14} />
        <div className={styles.enterpriseVisual}>
          <img src="/dorsey/enterprise.webp" alt="The Kollective enterprise overview" />
        </div>
        <div className={styles.enterpriseCopy}>
          <img src="/dorsey/kollective.png" alt="The Kollective" />
          <p className={styles.kicker}>The enterprise expression</p>
          <h2>
            SEPARATE BRANDS.
            <br />
            <em>SHARED LEVERAGE.</em>
          </h2>
          <p>
            The Kollective is where the method becomes an ecosystem: independent
            identities connected by one intelligence layer across culture,
            hospitality, technology, products, services, water, and impact.
          </p>
          <div>
            <a href="/kollective">Enter The Kollective ↗</a>
            <a href="https://thekollectivehospitality.com/entities">Open Entity Universe ↗</a>
          </div>
        </div>
      </section>

      <section className={`${styles.book} k-surface k-emblem`} id="book">
        <div className={styles.bookCopy}>
          <p className={styles.kicker}>The founder’s field manual</p>
          <h2>
            HAKUNA
            <br />
            <em>MATATA.</em>
          </h2>
          <blockquote>“The mindset behind the machine.”</blockquote>
          <p>
            A direct look at pressure, ambition, discipline, leadership,
            enjoying the present, and building something that lasts.
          </p>
          <div>
            <a href={BOOK_URL}>Buy the book · $44.44 ↗</a>
            <a href="/forms/bulk_orders">Bulk orders ↗</a>
            <a href="/forms/book_club">Book clubs ↗</a>
          </div>
        </div>
        <div className={styles.bookVisual}>
          <img src="/dorsey/book-office.png" alt="Hakuna Matata by Dr. Dorsey" />
        </div>
      </section>

      <section className={`${styles.letter} k-surface k-surface-warm k-emblem k-inverted`}>
        <img src="/dorsey/letter.webp" alt="A letter from Dr. Dorsey" />
        <div>
          <p className={styles.kicker}>A note from Dorsey</p>
          <blockquote>
            “I don’t think bigger because the world told me to.
            I think bigger because I can see the architecture.”
          </blockquote>
          <a href="/forms/consultation">Build with me ↗</a>
        </div>
      </section>

      <section className={`${styles.access} k-surface k-surface-deep k-edge`} id="access">
        <p className={styles.kicker}>Direct access / choose the move</p>
        <h2>
          STRATEGY. SPEAKING.
          <br />
          PARTNERSHIP. <em>ENTRY.</em>
        </h2>
        <div className={styles.accessGrid}>
          <a href="/forms/consultation"><span>01</span><b>Private Strategy</b><small>Book a consultation</small><i>↗</i></a>
          <a href="/forms/speaking"><span>02</span><b>Speaking</b><small>Keynotes and appearances</small><i>↗</i></a>
          <a href="/forms/sponsor"><span>03</span><b>Partnership</b><small>Enterprise and brand deals</small><i>↗</i></a>
          <a href={BOOK_URL}><span>04</span><b>Hakuna Matata</b><small>Order the book</small><i>↗</i></a>
          <a href="/kollective"><span>05</span><b>The Enterprise</b><small>Explore The Kollective</small><i>↗</i></a>
          <a href="/access"><span>06</span><b>All Access</b><small>Every link and form</small><i>↗</i></a>
        </div>
      </section>

      <footer className={styles.footer}>
        <img src="/dorsey/logo.png" alt="Dr. Dorsey" />
        <p>LIVE FOR TODAY. PLAN FOR TOMORROW. PARTY TONIGHT.</p>
        <div>
          <a href="/kollective">The Kollective</a>
          <a href="https://111atl.com">111ATL</a>
          <a href="https://instagram.com/dolodorsey">Instagram</a>
        </div>
      </footer>
    </main>
  );
}
