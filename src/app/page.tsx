'use client';

import { useEffect, useState } from 'react';
import styles from './home.module.css';
import upgrade from './dorsey-upgrade.module.css';
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

const currentMoves = [
  { name: 'GOOD TIMES', kind: 'The culture calendar', image: '/brand-logos/good-times.png', href: 'https://www.thegoodtimesworldwide.com' },
  { name: 'Taste of Art', kind: 'Art show / event series', image: '/brand-logos/taste-of-art.png', href: 'https://thatasteofart.com' },
  { name: 'GROWN-ISH', kind: 'Nightlife event series', image: '/brand-logos/grown-ish.png', href: 'https://111atl.com/company.html?brand=grown-ish' },
  { name: 'STUSH', kind: 'Fashion', image: '/brand-logos/stush.png', href: 'https://stushusa.com' },
  { name: 'Pronto Energy', kind: 'Active beverage brand', image: '/brand-logos/pronto-energy.png', href: 'https://prontoenergydrink.com' },
  { name: 'Infinity Water', kind: 'Active water brand', image: '/brand-logos/infinity-water.png', href: 'https://watertoinfinity.com' },
];

const ENTITY_CDN =
  'https://sccmgpssfwhgxefbdwbc.supabase.co/storage/v1/object/public/entity-motion/dorsey';

const entityMotion = [
  {
    number: '01',
    title: 'AQUIFER',
    note: 'Water infrastructure / stewardship',
    video: `${ENTITY_CDN}/aquifer.mp4`,
    poster: '/dorsey/editorial/entity-network-green.png',
    href: 'https://aquifer-waterworks.vercel.app',
  },
  {
    number: '02',
    title: 'EVERYDAY',
    note: 'Daily culture / lifestyle',
    video: `${ENTITY_CDN}/everyday.mp4`,
    poster: '/dorsey/editorial/entity-gallery-light.png',
    href: 'https://everyday-water-group.vercel.app',
  },
  {
    number: '03',
    title: 'THE ROSE BAR',
    note: 'Hospitality / nightlife',
    video: `${ENTITY_CDN}/rose-bar.mp4`,
    poster: '/brand-logos/rose-on-piedmont.png',
    href: 'https://111atl.com/company.html?brand=rose-on-piedmont',
  },
  {
    number: '04',
    title: 'TRAILBLAZER',
    note: 'Leadership / new markets',
    video: `${ENTITY_CDN}/trailblazer.mp4`,
    poster: '/dorsey/editorial/city-architect.png',
    href: 'https://111atl.com/forms/inquiry?brand=trailblazers',
  },
  {
    number: '05',
    title: 'TRIBAL WATER',
    note: 'Community water / impact',
    video: `${ENTITY_CDN}/tribal-water.mp4`,
    poster: '/dorsey/editorial/entity-network-green.png',
    href: 'https://tribal-water.vercel.app',
  },
  {
    number: '06',
    title: 'THE TRIBE',
    note: 'Membership / shared progress',
    video: `${ENTITY_CDN}/tribe.mp4`,
    poster: '/dorsey/editorial/entity-wall-red.png',
    href: 'https://the-tribe-wine.vercel.app',
  },
  {
    number: '07',
    title: 'THE UNIVERSITY',
    note: 'Education / ownership / legacy',
    video: `${ENTITY_CDN}/university.mp4`,
    poster: '/dorsey/editorial/mind-behind-movement.png',
    href: 'https://the-university.vercel.app',
  },
  {
    number: '08',
    title: 'INFINITY WATER',
    note: 'Luxury water / elemental design',
    video: `${ENTITY_CDN}/infinity-water.mp4`,
    poster: '/dorsey/current/infinity-water.jpg',
    href: 'https://watertoinfinity.com',
  },
  {
    number: '09',
    title: 'PRONTO ENERGY',
    note: 'Energy / flavor multiverse',
    video: `${ENTITY_CDN}/pronto-energy.mp4`,
    poster: '/dorsey/editorial/dorsey-kollective-legacy.png',
    href: 'https://prontoenergydrink.com',
  },
];

const siteWorlds = [
  ['Companies', 'The full enterprise architecture', '/companies'],
  ['Directory', 'Every company and entity record', '/directory'],
  ['Links', 'One page for every public move', '/links'],
  ['Forms', 'Strategy, speaking, careers, vendors', '/forms'],
  ['Events', 'What is happening now', '/events'],
  ['Store', 'Fashion, books, water, energy', '/store'],
  ['Upcoming', 'What is moving through the pipeline', '/upcoming'],
  ['Network', 'The Tribe and water ecosystem', '/network'],
  ['Team', 'Leadership and specialist network', '/team'],
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
    <main id="main-content" className={styles.page}>
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

      <section className={upgrade.hero} id="top" aria-label="Dr. Dorsey introduction">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/dorsey/editorial/dorsey-kollective-legacy.png"
          aria-hidden="true"
        >
          <source src="/dorsey/motion/founder-hero.mp4" type="video/mp4" />
        </video>
        <h1 className={upgrade.srOnly}>Dr. Dorsey — founder, architect, investor, and cultural strategist</h1>
        <a className={upgrade.heroCue} href="#entity-motion" aria-label="Continue to the Dr. Dorsey company portfolio" />
      </section>

      <section className={upgrade.motion} id="entity-motion">
        <header>
          <p>One founder / many independent worlds</p>
          <h2>THE ENTITIES<br /><em>MOVE.</em></h2>
          <span>
            Every company holds its own identity. Together, they reveal the
            architecture behind the work.
          </span>
        </header>
        <div className={upgrade.motionGrid}>
          {entityMotion.map((item) => (
            <a href={item.href} className={upgrade.motionCard} key={item.number}>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={item.poster}
                aria-hidden="true"
              >
                <source src={item.video} type="video/mp4" />
              </video>
              <div>
                <span>{item.number}</span>
                <p>{item.note}</p>
                <h3>{item.title}</h3>
                <b>Explore ↗</b>
              </div>
            </a>
          ))}
        </div>
        <a className={upgrade.allEntities} href="/directory">
          <span>60+ brands, companies, concepts, and systems</span>
          <b>Open the complete directory ↗</b>
        </a>
      </section>

      <section className={upgrade.editorial}>
        <figure className={upgrade.editorialLead}>
          <img src="/dorsey/editorial/mind-behind-movement.png" alt="Dr. Dorsey — the mind behind the movement" />
        </figure>
        <div className={upgrade.editorialPair}>
          <figure>
            <img src="/dorsey/editorial/entity-gallery-light.png" alt="The Dr. Dorsey and Kollective enterprise gallery" />
            <figcaption><span>01 / Architecture</span><b>Independent identities. Shared intelligence.</b></figcaption>
          </figure>
          <figure>
            <img src="/dorsey/editorial/entity-wall-red.png" alt="Dr. Dorsey surrounded by the enterprise entity portfolio" />
            <figcaption><span>02 / Portfolio</span><b>A living system of culture and commerce.</b></figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.current} id="current">
        <header>
          <p className={styles.kicker}>Current / moving now</p>
          <h2>THE WORK IS <em>ALIVE.</em></h2>
          <span>Events, products, campaigns, and releases with a direct route to action.</span>
        </header>
        <div className={styles.currentGrid}>
          {currentMoves.map((item, index) => (
            <a href={item.href} className={`${styles[`current${index + 1}`]} ${upgrade.logoCard}`} key={item.name}>
              <img src={item.image} alt={item.name} />
              <div><small>{item.kind}</small><h3>{item.name}</h3><b>Enter ↗</b></div>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.manifesto}>
        <div className={styles.manifestoImage}>
          <img src="/dorsey/editorial/founder-lounge.png" alt="Dr. Dorsey in the founder lounge" />
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
          <img src="/dorsey/editorial/city-architect.png" alt="Dr. Dorsey — The Architect" />
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
          <img src="/dorsey/editorial/entity-network-green.png" alt="The Kollective enterprise network" />
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

      <section className={styles.casper}>
        <video autoPlay muted loop playsInline>
          <source src="/dorsey/motion/casper-group.mp4" type="video/mp4" />
        </video>
        <div>
          <p className={styles.kicker}>Hospitality / food / licensing</p>
          <h2>THE CASPER GROUP.</h2>
          <a href="https://caspergroupworldwide.com">Enter the portfolio ↗</a>
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
        <img src="/dorsey/editorial/golf-legacy.png" alt="Dr. Dorsey building legacy on and off the course" />
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

      <section className={styles.siteMap}>
        <header><p className={styles.kicker}>The complete platform</p><h2>EVERY DOOR IS <em>OPEN.</em></h2></header>
        <div>
          {siteWorlds.map(([name, note, href], index) => (
            <a href={href} key={name}><span>{String(index + 1).padStart(2, '0')}</span><h3>{name}</h3><p>{note}</p><b>↗</b></a>
          ))}
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
