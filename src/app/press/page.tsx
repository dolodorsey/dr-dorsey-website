import type { Metadata } from 'next';
import styles from '../authority.module.css';

export const metadata: Metadata = {
  title: 'Press & Media — Dr. Dorsey',
  description: 'Official media center for Dr. DoLo Dorsey: approved positioning, interview topics, media requests, quotes and source standards.',
  alternates: { canonical: '/press' },
};

const lanes = [
  ['Founder & Enterprise Systems', 'Entrepreneurship, operating systems, portfolio design, leadership and building repeatable infrastructure.'],
  ['Hospitality & Culture', 'First-hand operating perspective on hospitality, nightlife, experiences, community and culture-led business.'],
  ['Brand Architecture', 'How independent brands keep distinct identities while sharing enterprise-level capabilities and leverage.'],
  ['Hakuna Matata', 'Leadership, ambition, pressure, discipline, enjoying the present and building deliberately for tomorrow.'],
  ['Community Impact', 'Verified public programs and community work only; impact claims are tied to program-level evidence before publication.'],
  ['Technology & Automation', 'Practical use of automation, agents and operating intelligence to reduce friction across a multi-brand organization.'],
] as const;

const standards = [
  ['Verified', 'Current factual claims are checked against a source record before public use.'],
  ['Dated', 'Milestones, roles and historical claims are tied to a time period instead of presented as timeless facts.'],
  ['Separated', 'Dr. Dorsey, The Kollective and every operating brand maintain separate identities, sources and media narratives.'],
  ['Controlled', 'Prelaunch plans, confidential ownership details and legal-sensitive topics stay restricted until cleared.'],
] as const;

export default function PressPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Press & Media — Dr. Dorsey',
    url: 'https://doctordorsey.com/press',
    about: { '@id': 'https://doctordorsey.com/author/dr-dorsey#person' },
    isPartOf: { '@id': 'https://doctordorsey.com/#website' },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className={styles.nav}>
        <a className={styles.navBrand} href="/">Dr. Dorsey / Media Center</a>
        <div className={styles.navLinks}><a href="/author/dr-dorsey">Author</a><a href="/insights">Insights</a><a href="/companies">Companies</a><a href="/access">Access</a></div>
      </nav>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>Official source · media requests · verified facts</p>
        <h1>Press needs a <em>source of truth.</em></h1>
        <p className={styles.lead}>Use this media center for approved Dr. Dorsey positioning, attributable published ideas, interview topics and press requests. Owned statements and press releases are identified as owned sources; earned editorial coverage is tracked separately.</p>
        <div className={styles.actions}><a href="/forms/media">Request interview / media access</a><a href="/insights">Read published ideas</a></div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}><p>Media positioning</p><div><h2>Founder. Author. Operator. Enterprise architect.</h2><span>Dr. Dorsey’s public work sits at the intersection of entrepreneurship, hospitality, culture, consumer brands, technology, operating systems and community infrastructure. Specific company, ownership, metric and launch claims are published only when the underlying fact pack is cleared.</span></div></div>
          <div className={styles.grid}>{lanes.map(([title, copy]) => <article className={styles.card} key={title}><small>Interview lane</small><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}><p>Fact standard</p><div><h2>What reporters can rely on.</h2><span>The public record should get stronger over time, not noisier. Facts are versioned, sources are retained, historical claims stay dated and confidential plans stay out of public copy until their release tier changes.</span></div></div>
          <div className={styles.factBand}>{standards.map(([title, copy]) => <div className={styles.fact} key={title}><strong>{title}</strong><span>{copy}</span></div>)}</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}><p>Source hierarchy</p><div><h2>Owned source is not the same thing as independent coverage.</h2><span>Official bios, essays, newsroom posts, transcripts and press releases are primary sources for what Dr. Dorsey or The Kollective says. Independent reporting, interviews and third-party profiles are stored as separate earned-media evidence.</span></div></div>
          <div className={styles.actions}><a href="/forms/media">Send a media request</a><a href="/author/dr-dorsey">Verify author identity</a></div>
        </div>
      </section>

      <footer className={styles.footer}><span>© 2026 Dr. Dorsey · Official media center.</span><a href="/access">All access ↗</a></footer>
    </main>
  );
}
