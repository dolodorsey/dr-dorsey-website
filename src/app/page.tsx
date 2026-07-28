'use client';

import { useEffect, useState } from 'react';
import styles from './home.module.css';
import { BOOK_URL } from '@/lib/enterprise';

const worlds = [
  {
    number: '01',
    name: 'Culture',
    line: 'I create the moments people remember.',
    detail: 'Hospitality, nightlife, music, live programming, and original cultural IP built from the inside of the room.',
  },
  {
    number: '02',
    name: 'Companies',
    line: 'I turn ideas into independent identities.',
    detail: 'Distinct brands with their own audience, offer, visual system, route to market, and reason to exist.',
  },
  {
    number: '03',
    name: 'Systems',
    line: 'I build the machine behind the magic.',
    detail: 'Shared operating intelligence, technology, data, creative direction, partnerships, and repeatable execution.',
  },
  {
    number: '04',
    name: 'Legacy',
    line: 'I design for what survives the moment.',
    detail: 'Education, institutions, water, ownership, mentorship, and infrastructure built to outlive a trend.',
  },
];

const rules = [
  ['01', 'Identity before attention.', 'The goal is not to look busy. The goal is to become unmistakable.'],
  ['02', 'Culture is an operating system.', 'It shapes the product, the room, the language, the customer, and the standard.'],
  ['03', 'Make the world feel complete.', 'A company becomes powerful when every detail reinforces the same belief.'],
  ['04', 'Build the route to action.', 'Discovery should end in a move: buy, book, join, partner, invest, or enter.'],
  ['05', 'Own the outcome.', 'Ideas do not compound until systems make execution repeatable.'],
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
          <a href="#architect">The Architect</a>
          <a href="#worlds">The Work</a>
          <a href="#book">The Book</a>
          <a href="#access">Access</a>
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
        <a href="#architect" onClick={() => setMenu(false)}>The Architect <span>01</span></a>
        <a href="#worlds" onClick={() => setMenu(false)}>The Work <span>02</span></a>
        <a href="#book" onClick={() => setMenu(false)}>Hakuna Matata <span>03</span></a>
        <a href="/kollective">The Kollective <span>04</span></a>
        <a href="/access">All Access <span>05</span></a>
      </div>

      <section className={styles.hero} id="top">
        <div className={styles.heroGrid} />
        <div className={styles.heroCopy}>
          <p>Founder · Enterprise Architect · Cultural Operator</p>
          <h1>
            I BUILD THE
            <br />
            <em>MACHINES</em>
            <br />
            BEHIND CULTURE.
          </h1>
          <div className={styles.heroLower}>
            <p>
              Brands are what people see. I build the identity, systems,
              leverage, and operating world behind them.
            </p>
            <a href="#architect">Enter the architecture ↓</a>
          </div>
        </div>
        <div className={styles.heroPortrait}>
          <img src="/dorsey/book-office.png" alt="Dr. Dorsey with Hakuna Matata" />
        </div>
        <div className={styles.heroEdge}>DOLO DORSEY / ATLANTA / WORLDWIDE</div>
      </section>

      <section className={styles.manifesto}>
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

      <section className={styles.architect} id="architect">
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

      <section className={styles.worlds} id="worlds">
        <header>
          <p className={styles.kicker}>What I actually build</p>
          <h2>
            FOUR DISCIPLINES.
            <br />
            <em>ONE PRACTICE.</em>
          </h2>
        </header>
        <div className={styles.worldGrid}>
          {worlds.map((world) => (
            <article key={world.number}>
              <span>{world.number}</span>
              <h3>{world.name}</h3>
              <blockquote>{world.line}</blockquote>
              <p>{world.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.enterprise}>
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
            <a href="https://the-kollective-worlds.dolodorsey.chatgpt.site/entities">Open Entity Universe ↗</a>
          </div>
        </div>
      </section>

      <section className={styles.rules}>
        <header>
          <p className={styles.kicker}>Field notes</p>
          <h2>THE RULES I BUILD BY.</h2>
        </header>
        <div>
          {rules.map(([number, title, detail]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.book} id="book">
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

      <section className={styles.letter}>
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

      <section className={styles.access} id="access">
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
