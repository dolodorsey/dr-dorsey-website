import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { kollectivePages } from '@/lib/kollective-pages';
import styles from './page.module.css';

const navigation = [
  ['Companies', '/companies'],
  ['Team', '/team'],
  ['Current', '/events'],
  ['Network', '/network'],
  ['Links', '/links'],
  ['Apps', '/app'],
] as const;

const dedicatedRoutes = new Set(['companies', 'team', 'events', 'network', 'links']);

export function generateStaticParams() {
  return Object.keys(kollectivePages)
    .filter((slug) => !dedicatedRoutes.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = kollectivePages[slug];
  if (!page) return {};
  return {
    title: `${page.title} — The Kollective`,
    description: page.description,
    alternates: { canonical: `/kollective/${slug}` },
    openGraph: {
      title: `${page.title} — The Kollective`,
      description: page.description,
      images: [{ url: '/brand/kollective-hero-poster.png' }],
    },
  };
}

export default async function KollectiveInformationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = kollectivePages[slug];
  if (!page) notFound();

  const preferredRelated = ['companies', 'team', 'events', 'network', 'links', 'access'];
  const related = preferredRelated
    .filter((key) => key !== slug && kollectivePages[key])
    .slice(0, 3)
    .map((key) => [key, kollectivePages[key]] as const);

  return (
    <div className={styles.site}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>THE KOLLECTIVE</Link>
        <nav aria-label="The Kollective sections">
          {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link href="/access" className={styles.action}>Open Access</Link>
      </header>

      <main>
        <section className={styles.hero}>
          <Image src="/brand/kollective-hero-poster.png" alt="" fill sizes="100vw" priority />
          <div />
          <article>
            <p>{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <span>{page.intro}</span>
          </article>
        </section>

        <section className={styles.facts}>
          {page.facts.map(([value, label]) => <article key={value}><strong>{value}</strong><span>{label}</span></article>)}
        </section>

        <section className={styles.content}>
          <header><p>ENTERPRISE BRIEF</p><h2>Clear structure.<br />Direct language.</h2></header>
          <div>
            {page.sections.map((section, index) => (
              <article key={section.title}>
                <b>{String(index + 1).padStart(2, '0')}</b>
                <section>
                  <h2>{section.title}</h2>
                  {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets?.length ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                  {section.links?.length ? (
                    <div className={styles.sectionLinks}>
                      {section.links.map(([label, href]) => <a href={href} key={label}>{label} ↗</a>)}
                    </div>
                  ) : null}
                </section>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.related}>
          {related.map(([key, item]) => (
            <Link href={`/${key}`} key={key}>
              <span>{item.eyebrow}</span>
              <strong>{item.title}</strong>
              <b>↗</b>
            </Link>
          ))}
        </section>

        <section className={styles.cta}>
          <p>CHOOSE THE CORRECT ENTRY POINT</p>
          <h2>Turn discovery into a move.</h2>
          <div><Link href="/access">Open all access</Link><Link href="/app/forms/inquiry">Enterprise inquiry</Link></div>
        </section>
      </main>

      <footer><strong>The Kollective</strong><span>Independent brands. Shared enterprise leverage. Direct action.</span></footer>
    </div>
  );
}