'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './directory.module.css';

type Destination = {
  action_key: string;
  action_label: string;
  web_url?: string | null;
  fallback_url?: string | null;
  is_primary?: boolean;
};

type Entity = {
  id: string;
  slug: string;
  name: string;
  category?: string | null;
  short_description?: string | null;
  status: string;
  status_label?: string | null;
  current_focus: boolean;
  logo_url?: string | null;
  hero_url?: string | null;
  website_url?: string | null;
  featured_priority?: number | null;
  division_slug?: string | null;
  division_name?: string | null;
  destinations?: Destination[];
};

const statusOrder = ['operating', 'active', 'available_now', 'launching', 'building', 'seasonal', 'portfolio', 'portfolio_ip', 'paused'];

function profileUrl(slug: string) {
  return `https://111atl.com/company.html?brand=${encodeURIComponent(slug)}`;
}

export default function EnterpriseDirectoryPage() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [query, setQuery] = useState('');
  const [division, setDivision] = useState('all');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch('/api/enterprise/registry', { cache: 'no-store' })
      .then((response) => response.json())
      .then((payload) => {
        if (active) {
          const records = Array.isArray(payload.entities) ? payload.entities : [];
          setEntities(records.filter((entity: Entity) => !/\bnation\b|sovereign/i.test(`${entity.name} ${entity.slug}`)));
        }
      })
      .catch((error) => console.error('enterprise_directory_load_failed', error))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const divisions = useMemo(() => Array.from(new Map(
    entities
      .filter((entity): entity is Entity & { division_slug: string } => Boolean(entity.division_slug))
      .map((entity) => [entity.division_slug, entity.division_name || entity.division_slug] as const),
  ).entries()), [entities]);
  const statuses = useMemo(() => Array.from(new Set(entities.map((entity) => entity.status))).sort((a, b) => statusOrder.indexOf(a) - statusOrder.indexOf(b)), [entities]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return entities.filter((entity) => {
      if (division !== 'all' && entity.division_slug !== division) return false;
      if (status !== 'all' && entity.status !== status) return false;
      if (!normalized) return true;
      return `${entity.name} ${entity.category || ''} ${entity.short_description || ''} ${entity.division_name || ''}`.toLowerCase().includes(normalized);
    });
  }, [entities, query, division, status]);

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a href="/kollective" className={styles.wordmark}>THE KOLLECTIVE</a>
        <div><a href="/kollective">Enterprise</a><a href="https://111atl.com">111ATL</a><a href="/access">Access</a></div>
      </nav>

      <header className={styles.hero}>
        <p>Managed Enterprise Directory</p>
        <h1>Every brand.<br />Its own world.</h1>
        <div className={styles.heroMeta}><span>{entities.length || '—'} enterprise records</span><span>{divisions.length || '—'} divisions</span><span>Source-backed profiles</span></div>
      </header>

      <section className={styles.controls}>
        <label><span>Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a brand, service, event, app, product…" /></label>
        <label><span>Division</span><select value={division} onChange={(event) => setDivision(event.target.value)}><option value="all">All divisions</option>{divisions.map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}</select></label>
        <label><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All statuses</option>{statuses.map((item) => <option key={item} value={item}>{item.replaceAll('_', ' ')}</option>)}</select></label>
      </section>

      <section className={styles.results}>
        <div className={styles.resultHeader}><p>{loading ? 'Loading enterprise registry…' : `${filtered.length} brands shown`}</p><a href="/forms/inquiry?interest=enterprise_directory">Correct or add information →</a></div>
        <div className={styles.grid}>
          {filtered.map((entity, index) => {
            const direct = entity.website_url || entity.destinations?.find((destination) => destination.is_primary)?.web_url || null;
            return (
              <article className={styles.card} key={entity.id}>
                <a className={styles.media} href={profileUrl(entity.slug)}>
                  {entity.hero_url ? <img className={styles.cover} src={entity.hero_url} alt={`${entity.name} visual`} /> : null}
                  {entity.logo_url
                    ? <img className={entity.hero_url ? styles.logo : styles.logoCover} src={entity.logo_url} alt={`${entity.name} logo`} />
                    : <div className={styles.identityPending}><span>Identity artwork in preparation</span></div>}
                  <b>{String(index + 1).padStart(3, '0')}</b>
                </a>
                <div className={styles.copy}>
                  <small>{entity.status_label || entity.status.replaceAll('_', ' ')}</small>
                  <h2>{entity.name}</h2>
                  <span>{entity.division_name || entity.category}</span>
                  <p>{entity.short_description || 'Official enterprise record.'}</p>
                  <div><a href={profileUrl(entity.slug)}>Full Profile</a>{direct && <a href={direct}>Direct Access ↗</a>}</div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <footer className={styles.footer}><b>The Kollective</b><p>Independent brands. Shared intelligence. Source-backed access.</p><div><a href="https://doctordorsey.com">Dr. Dorsey</a><a href="https://111atl.com">111ATL</a></div></footer>
    </main>
  );
}
