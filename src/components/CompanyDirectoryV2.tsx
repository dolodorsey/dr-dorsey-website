'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './CompanyDirectoryV2.module.css';
import MotionCover from './MotionCover';
import type { RegistryEntity } from '@/lib/kollective-public';
import { currentFocusBrands } from '@/lib/enterprise';
import { motionFor, type MotionAsset } from '@/lib/motion';
import { isEventEntity, isPublicEvent, isRetired, priorityRank } from '@/lib/roster';
import { departmentFor, departmentRank, departmentSlug } from '@/lib/company-departments';

type Company = {
  key: string;
  slug?: string;
  name: string;
  category: string;
  description?: string;
  status: string;
  href: string;
  logo?: string;
  hero?: string;
  division: string;
};

type VideoSpec = { path?: string; src?: string; poster?: string };

const CREATIVE_MOTION_BASE =
  'https://woqlhjodiedyqfvzweoe.supabase.co/storage/v1/object/public/animations';
const EVENT_MOTION_BASE =
  'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/motion/111atl';
const TRANSPARENT_POSTER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

// Only verified landscape media belongs on the company grid. Portrait media is
// intentionally excluded here so a portrait animation can never be stacked or
// letterboxed on top of a landscape company card.
const LANDSCAPE_VIDEO_BY_SLUG: Record<string, VideoSpec> = {
  'synergy-sounds': {
    path: 'synergy-ani2.mp4',
    poster: `${CREATIVE_MOTION_BASE}/synergy-sounds-logo.png`,
  },
  'the-casper-group': { path: 'casper-group/casper/casper-group-ani.mp4' },
  'angel-wings': {
    path: 'casper-group/angel-wings-ani.mp4',
    poster: `${CREATIVE_MOTION_BASE}/gif/angel-wings.gif`,
  },
  'pasta-bish': {
    path: 'casper-group/pasta-bish-ani.mp4',
    poster: `${CREATIVE_MOTION_BASE}/gif/pasta-bish.gif`,
  },
  'taco-yaki': {
    path: 'casper-group/taco-yaki-ani.mp4',
    poster: `${CREATIVE_MOTION_BASE}/gif/taco-yaki.gif`,
  },
  'patty-daddy': {
    path: 'casper-group/patty-daddy-ani.mp4',
    poster: `${CREATIVE_MOTION_BASE}/gif/patty-daddy.gif`,
  },
  'espresso-co': {
    path: 'casper-group/espresso-ani.mp4',
    poster: `${CREATIVE_MOTION_BASE}/gif/espresso-co.gif`,
  },
  'morning-after': {
    path: 'casper-group/mornig-ani.mp4',
    poster: `${CREATIVE_MOTION_BASE}/gif/morning-after.gif`,
  },
  tossd: { path: 'casper-group/tossd-ani.mp4' },
  'sweet-tooth': {
    path: 'casper-group/sweet-tooth-ani.mp4',
    poster: `${CREATIVE_MOTION_BASE}/gif/sweet-tooth.gif`,
  },
  'mojo-juice': {
    path: 'casper-group/mojo-ani.mp4',
    poster: `${CREATIVE_MOTION_BASE}/gif/mojo-juice.gif`,
  },
  'mr-oyster': {
    path: 'casper-group/mr-oyster-ani.mp4',
    poster: `${CREATIVE_MOTION_BASE}/gif/mr-oyster.gif`,
  },
  'peace-pizza': { path: 'casper-group/peace-pizza-ani.mp4' },
  'american-dragon': { path: 'casper-group/american-dragon.mp4' },
  'members-elite': { path: 'members-elite-ani.mp4' },

  // Current event motion — owner-supplied landscape animations in Supabase.
  'greek-ball': { src: `${EVENT_MOTION_BASE}/greek-ball.mp4` },
  'monsters-ball': { src: `${EVENT_MOTION_BASE}/monsters-ball.mp4` },
  'black-ball': { src: `${EVENT_MOTION_BASE}/black-ball.mp4` },
  'snow-ball': { src: `${EVENT_MOTION_BASE}/snow-ball.mp4` },
  'winter-wonderland': { src: `${EVENT_MOTION_BASE}/winter-wonderland.mp4` },
  'champagne-ball': { src: `${EVENT_MOTION_BASE}/champagne-ball.mp4` },
  'rose-ball': { src: `${EVENT_MOTION_BASE}/rose-ball.mp4` },
};

// These have approved still art but no approved landscape motion yet. They get
// subtle movement rather than borrowing/stretching a portrait animation.
const KINETIC_STILL_SLUGS = new Set([
  'frequency-productions',
  'just-print',
  'mister-manufacturing',
  'living-legacy-farms',
]);

function companyMotion(company: Company): MotionAsset | undefined {
  if (company.slug) {
    const exact = LANDSCAPE_VIDEO_BY_SLUG[company.slug];
    if (exact) {
      return {
        src: exact.src || `${CREATIVE_MOTION_BASE}/${exact.path}`,
        poster: exact.poster || company.hero || TRANSPARENT_POSTER,
        orientation: 'landscape',
      };
    }

    if (KINETIC_STILL_SLUGS.has(company.slug)) return undefined;
  }

  const inherited = motionFor(company.name);
  return inherited?.orientation === 'landscape' ? inherited : undefined;
}

function companyWebsite(entity: RegistryEntity) {
  const directWeb = entity.destinations?.find(
    (destination) =>
      destination.action_key === 'open' &&
      destination.destination_type === 'web' &&
      Boolean(destination.web_url),
  )?.web_url;

  if (directWeb) return directWeb;
  if (entity.website_url && !/111atl\.com/i.test(entity.website_url)) return entity.website_url;

  const primaryWeb = entity.destinations?.find(
    (destination) =>
      destination.is_primary &&
      destination.destination_type === 'web' &&
      Boolean(destination.web_url),
  )?.web_url;

  if (primaryWeb) return primaryWeb;
  return `/go/${entity.slug}?source=companies_page`;
}

function fromRegistry(entity: RegistryEntity): Company {
  return {
    key: entity.id || entity.slug,
    slug: entity.slug,
    name: entity.name,
    category: entity.category || '',
    description: entity.short_description || undefined,
    status: entity.status_label || entity.status || '',
    href: companyWebsite(entity),
    logo: entity.logo_url || undefined,
    hero: entity.hero_url || undefined,
    division: entity.division_name || 'The Enterprise',
  };
}

export default function CompanyDirectoryV2() {
  const [entities, setEntities] = useState<RegistryEntity[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [brokenArt, setBrokenArt] = useState<Record<string, true>>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/enterprise/registry', { cache: 'no-store', signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Registry request failed: ${response.status}`);
        return response.json();
      })
      .then((payload) => setEntities(Array.isArray(payload.entities) ? payload.entities : []))
      .catch((error) => {
        if (error?.name !== 'AbortError') {
          console.error('company_directory_fetch_failed', error);
          setFailed(true);
        }
      });

    return () => controller.abort();
  }, []);

  const companies: Company[] = useMemo(() => {
    const source: Company[] =
      entities && entities.length
        ? entities.map(fromRegistry)
        : entities || failed
          ? currentFocusBrands.map((brand) => ({
              key: brand.name,
              name: brand.name,
              category: brand.category,
              status: brand.status,
              href: brand.href,
              logo: brand.logo,
              division: 'Current Enterprise Command',
            }))
          : [];

    return source.filter((company) => {
      if (isRetired(company.name)) return false;
      if (isEventEntity(company.name, company.division)) return isPublicEvent(company.name);
      return true;
    });
  }, [entities, failed]);

  const featured = companies.slice(0, 2);
  const rest = companies.slice(2);

  const staples = useMemo(
    () =>
      rest
        .filter((company) => priorityRank(company.name) >= 0)
        .sort((a, b) => priorityRank(a.name) - priorityRank(b.name)),
    [rest],
  );

  const sections = useMemo(() => {
    const grouped = new Map<string, Company[]>();
    for (const company of rest) {
      if (priorityRank(company.name) >= 0) continue;
      const department = departmentFor(company);
      if (!grouped.has(department)) grouped.set(department, []);
      grouped.get(department)!.push(company);
    }

    return [...grouped.entries()]
      .sort(([a], [b]) => departmentRank(a) - departmentRank(b))
      .map(([division, items]) => ({ division, slug: departmentSlug(division), items }));
  }, [rest]);

  if (!companies.length) return <p className={styles.empty}>Loading the enterprise registry…</p>;

  const card = (company: Company, variant: 'feature' | 'tile') => {
    const animation = companyMotion(company);
    const hasOwnStill = Boolean(company.hero && !brokenArt[company.key]);
    const kinetic = Boolean(
      !animation && company.slug && KINETIC_STILL_SLUGS.has(company.slug) && hasOwnStill,
    );
    const awaitingArt = !animation && !hasOwnStill;

    return (
      <a className={`${styles.card} ${styles[variant]}`} href={company.href} key={company.key}>
        <span
          className={`${styles.media} ${awaitingArt ? styles.awaiting : ''} ${kinetic ? styles.kinetic : ''}`}
        >
          {awaitingArt ? (
            <span className={styles.plate} aria-hidden="true">
              <b>{company.name}</b>
              <i>{company.division}</i>
            </span>
          ) : (
            <MotionCover
              animation={animation}
              image={company.hero}
              alt={company.name}
              onImageError={() => setBrokenArt((previous) => ({ ...previous, [company.key]: true }))}
            />
          )}
        </span>

        <div className={styles.body}>
          {company.status ? <small className={styles.status}>{company.status}</small> : null}
          <h3 className={styles.name}>{company.name}</h3>
          {company.category ? <small className={styles.status}>{company.category}</small> : null}
          {company.description ? <p className={styles.category}>{company.description}</p> : null}
          <b className={styles.open}>Open ↗</b>
        </div>
      </a>
    );
  };

  const grid = (items: Company[], variant: 'feature' | 'tile') => (
    <div className={variant === 'feature' ? styles.featureGrid : styles.grid}>
      {items.map((company) => card(company, variant))}
    </div>
  );

  return (
    <div className={styles.wrap}>
      <nav className={styles.chips} aria-label="Jump to a department">
        {staples.length ? (
          <a href="#staples" className={styles.chipLead}>
            Staples <b>{staples.length}</b>
          </a>
        ) : null}
        {sections.map((section) => (
          <a href={`#${section.slug}`} key={section.slug}>
            {section.division} <b>{section.items.length}</b>
          </a>
        ))}
      </nav>

      {featured.length ? <div className={styles.section}>{grid(featured, 'feature')}</div> : null}

      {staples.length ? (
        <section className={styles.section} id="staples">
          <header className={styles.sectionHead}><h3>Staples</h3></header>
          {grid(staples, 'tile')}
        </section>
      ) : null}

      {sections.map((section) => (
        <section className={styles.section} id={section.slug} key={section.slug}>
          <header className={styles.sectionHead}>
            <h3>{section.division}</h3>
            <span>{section.items.length} {section.items.length === 1 ? 'company' : 'companies'}</span>
          </header>
          {grid(section.items, 'tile')}
        </section>
      ))}
    </div>
  );
}
