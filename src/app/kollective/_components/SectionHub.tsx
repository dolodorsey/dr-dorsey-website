import Image from 'next/image';
import Link from 'next/link';
import MotionCover from '@/components/MotionCover';
import type { MotionAsset } from '@/lib/motion';
import styles from './section-hub.module.css';

type Metric = {
  value: string;
  label: string;
};

type FeatureCard = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  meta?: string;
  badge?: string;
  animation?: MotionAsset;
};

type LinkItem = {
  title: string;
  description: string;
  href: string;
  meta?: string;
};

type LinkGroup = {
  eyebrow: string;
  title: string;
  description: string;
  items: LinkItem[];
};

type SectionHubProps = {
  active: 'current' | 'network' | 'links';
  eyebrow: string;
  title: string;
  intro: string;
  metrics: Metric[];
  features: FeatureCard[];
  groups: LinkGroup[];
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
};

const navigation = [
  ['Companies', '/companies'],
  ['Current', '/events'],
  ['Network', '/network'],
  ['Links', '/links'],
  ['Apps', '/app'],
] as const;

function Destination({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  if (/^https?:\/\//i.test(href)) {
    return <a href={href} className={className} target="_blank" rel="noreferrer">{children}</a>;
  }

  return <Link href={href} className={className}>{children}</Link>;
}

export default function SectionHub({
  active,
  eyebrow,
  title,
  intro,
  metrics,
  features,
  groups,
  primaryAction,
  secondaryAction,
}: SectionHubProps) {
  return (
    <div className={styles.site} data-section={active}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>THE KOLLECTIVE</Link>
        <nav aria-label="The Kollective sections">
          {navigation.map(([label, href]) => {
            const isActive =
              (active === 'current' && href === '/events') ||
              (active === 'network' && href === '/network') ||
              (active === 'links' && href === '/links');
            return <Link key={href} href={href} className={isActive ? styles.active : undefined}>{label}</Link>;
          })}
        </nav>
        <Link href="/access" className={styles.headerAction}>Open Access</Link>
      </header>

      <main>
        <section className={styles.hero}>
          <Image src="/brand/kollective-hero-poster.png" alt="" fill sizes="100vw" priority />
          <div className={styles.heroShade} />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1>{title}</h1>
            <p className={styles.intro}>{intro}</p>
            <div className={styles.heroActions}>
              <Destination href={primaryAction.href} className={styles.primaryButton}>{primaryAction.label}</Destination>
              <Destination href={secondaryAction.href} className={styles.secondaryButton}>{secondaryAction.label}</Destination>
            </div>
          </div>
        </section>

        <section className={styles.metrics} aria-label="Section overview">
          {metrics.map((metric) => (
            <article key={`${metric.value}-${metric.label}`}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </section>

        <section className={styles.features}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>START HERE</p>
            <h2>{active === 'current' ? 'What is happening next.' : active === 'network' ? 'The connected system.' : 'The fastest routes.'}</h2>
          </header>
          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <Destination href={feature.href} className={styles.featureCard} key={feature.title}>
                {feature.animation ? (
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '16 / 9',
                      margin: '-28px -28px 24px',
                      overflow: 'hidden',
                      background: '#080808',
                      borderBottom: '1px solid rgba(255,255,255,.1)',
                    }}
                  >
                    <MotionCover animation={feature.animation} alt={feature.title} veil />
                  </div>
                ) : null}
                <div className={styles.featureTop}>
                  <span>{feature.eyebrow}</span>
                  {feature.badge ? <b>{feature.badge}</b> : null}
                </div>
                <h3 style={feature.animation ? { marginTop: 24 } : undefined}>{feature.title}</h3>
                <p>{feature.description}</p>
                <footer>
                  <span>{feature.meta || 'Open destination'}</span>
                  <b>↗</b>
                </footer>
              </Destination>
            ))}
          </div>
        </section>

        <section className={styles.groups}>
          {groups.map((group) => (
            <article className={styles.group} key={group.title}>
              <header>
                <p className={styles.eyebrow}>{group.eyebrow}</p>
                <h2>{group.title}</h2>
                <span>{group.description}</span>
              </header>
              <div className={styles.linkList}>
                {group.items.map((item) => (
                  <Destination href={item.href} className={styles.linkRow} key={item.title}>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                    <span>{item.meta || 'Open'} <b>↗</b></span>
                  </Destination>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className={styles.cta}>
          <div>
            <p className={styles.eyebrow}>ONE ENTERPRISE. DIRECT ACTION.</p>
            <h2>Find the right door and make the move.</h2>
          </div>
          <div className={styles.ctaActions}>
            <Destination href={primaryAction.href} className={styles.primaryButton}>{primaryAction.label}</Destination>
            <Destination href="/app/forms/inquiry" className={styles.secondaryButton}>Enterprise Inquiry</Destination>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <strong>The Kollective</strong>
        <span>Independent brands. Shared enterprise leverage. Direct action.</span>
        <Link href="/app">Open the App</Link>
      </footer>
    </div>
  );
}
