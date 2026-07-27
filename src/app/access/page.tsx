import styles from './access.module.css';
import { accessLinks, SB } from '@/lib/enterprise';

const groups = ['Sales & Reservations', 'Partnerships', 'Talent & Team', 'Book & Media', 'Private & Legal'] as const;
const EMBLEM = `${SB}/dr_dorsey/01_logos/KOLLECTIVEemblemW.png`;

export default function AccessPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a href="/kollective"><img src={EMBLEM} alt="The Kollective" /><span>The Kollective Access Center</span></a>
        <div><a href="/">Dr. Dorsey</a><a href="/kollective">Enterprise</a><a href="https://111atl.com">111ATL</a></div>
      </nav>
      <header className={styles.hero}>
        <img src="/brand/kollective-hero.svg" alt="The Kollective gateway" />
        <div className={styles.overlay} />
        <div className={styles.heroContent}>
          <span>One Directory · Every Entry Point</span>
          <h1>Choose how you want to enter the enterprise.</h1>
          <p>Sales, RSVPs, reservations, partnerships, jobs, media, book orders, NDA requests and private inquiries are organized below.</p>
        </div>
      </header>

      <section className={styles.directory}>
        {groups.map((group, groupIndex) => (
          <div className={styles.group} key={group}>
            <div className={styles.groupHeader}><span>{String(groupIndex + 1).padStart(2, '0')}</span><h2>{group}</h2></div>
            <div className={styles.cards}>
              {accessLinks.filter((item) => item.group === group).map((item) => (
                <a key={item.title} href={item.href} className={item.featured ? styles.featured : ''}>
                  <div><strong>{item.title}</strong>{item.featured && <b>Priority</b>}</div>
                  <p>{item.description}</p>
                  <span>Open form ↗</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.directContact}>
        <div><span>Not sure where to start?</span><h2>Use the general enterprise inquiry.</h2></div>
        <div className={styles.contactActions}><a href="/forms/inquiry">General Inquiry</a><a href="mailto:thekollectivehospitality@gmail.com">Email The Kollective</a><a href="mailto:thedoctordorsey@gmail.com">Email Dr. Dorsey</a></div>
      </section>

      <footer className={styles.footer}>© 2026 The Kollective · Access center powered by the enterprise forms system.</footer>
    </main>
  );
}
