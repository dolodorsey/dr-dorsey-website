import type { Metadata } from 'next';
import styles from '../../authority.module.css';

const CANONICAL = 'https://doctordorsey.com/insights/shared-infrastructure-independent-brands';

export const metadata: Metadata = {
  title: 'Independent Brands Should Share Infrastructure, Not Identity — Dr. Dorsey',
  description: 'Dr. Dorsey explains the operating principle behind a multi-brand enterprise: centralize capabilities and evidence, while keeping each brand’s identity, audience and economics distinct.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Independent Brands Should Share Infrastructure, Not Identity',
    description: 'A founder operating note on multi-brand architecture, shared systems and brand isolation.',
    url: CANONICAL,
    type: 'article',
  },
};

const published = '2026-10-06';

export default function SharedInfrastructureArticle() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Independent Brands Should Share Infrastructure, Not Identity',
    description: 'A founder operating note on multi-brand architecture, shared systems and brand isolation.',
    datePublished: published,
    dateModified: published,
    mainEntityOfPage: CANONICAL,
    author: {
      '@type': 'Person',
      '@id': 'https://doctordorsey.com/author/dr-dorsey#person',
      name: 'Dr. DoLo Dorsey',
      url: 'https://doctordorsey.com/author/dr-dorsey',
    },
    publisher: {
      '@type': 'Person',
      '@id': 'https://doctordorsey.com/author/dr-dorsey#person',
      name: 'Dr. DoLo Dorsey',
    },
    about: [
      'Multi-brand enterprise architecture',
      'Brand strategy',
      'Operating systems',
      'Shared infrastructure',
      'Brand isolation',
    ],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className={styles.nav}>
        <a className={styles.navBrand} href="/">Dr. Dorsey / Insights</a>
        <div className={styles.navLinks}>
          <a href="/insights">Insights</a>
          <a href="/author/dr-dorsey">Author</a>
          <a href="/press">Press</a>
          <a href="/companies">Companies</a>
        </div>
      </nav>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>Operating note · October 6, 2026 · Dr. DoLo Dorsey</p>
        <h1>Independent brands should share <em>infrastructure, not identity.</em></h1>
        <p className={styles.lead}>
          A portfolio gets stronger when the companies can borrow capability from the enterprise without borrowing each other&apos;s voice, audience, proof or economics.
        </p>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p>The principle</p>
            <div>
              <h2>Centralize capability. Decentralize identity.</h2>
              <span>
                I do not want ten companies pretending to be one brand. I want ten distinct businesses that can use the same operating intelligence without losing the reason each one exists.
              </span>
            </div>
          </div>

          <div className={styles.grid}>
            <article className={styles.card}>
              <small>Keep separate</small>
              <h3>Customer promise</h3>
              <p>Each brand needs its own reason to exist, its own buyer, its own language and its own standard for what a good customer experience looks like.</p>
            </article>
            <article className={styles.card}>
              <small>Keep separate</small>
              <h3>Audience &amp; permission</h3>
              <p>A customer relationship belongs to the brand that earned it. A list, consent record or community should not quietly become permission for a sibling company.</p>
            </article>
            <article className={styles.card}>
              <small>Keep separate</small>
              <h3>Economics &amp; proof</h3>
              <p>Revenue, conversion, partnerships and results must stay attributable to the company that produced them. Parent-company scale should never be used to manufacture a child brand&apos;s proof.</p>
            </article>
            <article className={styles.card}>
              <small>Share centrally</small>
              <h3>Data &amp; operating systems</h3>
              <p>Reporting, automation, CRM standards, finance controls, security and execution infrastructure can be shared so every company does not have to rebuild the same machinery.</p>
            </article>
            <article className={styles.card}>
              <small>Share centrally</small>
              <h3>Learning</h3>
              <p>One company can teach the enterprise something about acquisition, retention, pricing or operations. The lesson can travel even when the customer data and brand voice cannot.</p>
            </article>
            <article className={styles.card}>
              <small>Share centrally</small>
              <h3>Accountability</h3>
              <p>The enterprise should make it easier to answer a simple question: what actually happened? Planned, drafted and scheduled work are not the same as executed work with evidence.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p>The test</p>
            <div>
              <h2>Five questions before a shared system crosses a brand line.</h2>
              <span>A shared capability is useful only if it preserves the boundaries that make the businesses trustworthy.</span>
            </div>
          </div>
          <div className={styles.factBand}>
            <div className={styles.fact}><strong>1. Identity</strong><span>Would the customer know which company is speaking?</span></div>
            <div className={styles.fact}><strong>2. Permission</strong><span>Did this brand earn the right to contact this audience?</span></div>
            <div className={styles.fact}><strong>3. Attribution</strong><span>Will the result be credited to the company that actually produced it?</span></div>
            <div className={styles.fact}><strong>4. Economics</strong><span>Can we see the real cost, revenue and margin without hiding behind the parent?</span></div>
          </div>
          <p className={styles.quote}>“The enterprise should create leverage without erasing identity.”</p>
          <p className={styles.quoteSource}>Dr. Dorsey · operating principle</p>
          <div className={styles.factBand}>
            <div className={styles.fact}><strong>5. Evidence</strong><span>Can the claim be traced to a receipt, record, source or real customer outcome?</span></div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p>Why it matters</p>
            <div>
              <h2>Scale should make the brands more precise, not more generic.</h2>
              <span>
                The advantage of a portfolio is not that every company can send the same message. The advantage is that each company can move with the infrastructure of a larger organization while still behaving like a focused specialist.
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            <a href="/author/dr-dorsey">Canonical author profile</a>
            <a href="/press">Media source center</a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© 2026 Dr. Dorsey · First-hand operating perspective.</span>
        <a href="/forms/media">Media / press request ↗</a>
      </footer>
    </main>
  );
}
