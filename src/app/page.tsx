'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { brands, statusColors, casperBrands, dorseyAssets, eventShowcase, productShots, ffMerch, type BrandStatus } from './data/brands';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';

/* ═══════════════════════════════════════════════════════════════
   DR. DORSEY — THE KOLLECTIVE HOSPITALITY GROUP
   Design Philosophy: "EDITORIAL EMPIRE"
   
   Spatial Rules: Asymmetric tension. 60/40 splits. Left-anchored 
   authority with right-breathing negative space. Numbered sections 
   create institutional rhythm. Wide margins communicate confidence.
   
   Material Language: Brushed brass on obsidian. Museum glass over 
   archival paper. The weight of a folio, the precision of a blueprint.
   
   Motion Grammar: Vertical reveals with slight skew. Deliberate, 
   never frantic. cubic-bezier(0.16,1,0.3,1) everywhere. Staggered 
   children. Scroll progress as subtle orientation.
   
   Color Discipline: Gold (#C8A96E) + Void (#040404) dominate 85%. 
   Ivory (#F2EDE3) for text only. No other colors. Accent appears 
   on interaction and CTA moments — earned, not sprayed.
   ═══════════════════════════════════════════════════════════════ */

const MARQUEE_ITEMS = [
  'HugLife Events','Forever Futbol Museum','Casper Group','Good Times App',
  'Mind Studio','Infinity Water','Pronto Energy','NOIR','Taste of Art',
  'REMIX','Gangsta Gospel','WRST BHVR','The Kulture','Rule Radar',
  'Umbrella Group','ICONIC','Underground King','Soul Sessions','Cravings','Stella',
];

const DIVISIONS = [
  { 
    num: '004', label: 'Division One', name: 'Events & Experiences',
    headline: '15+ event\nbrands.\nOne engine.',
    body: 'HugLife Events is the flagship events operation — curating nightlife, cultural, and entertainment experiences across Atlanta, Houston, Miami, Dallas, and beyond.',
    tags: ['NOIR','Taste of Art','REMIX','Gangsta Gospel','WRST BHVR','The Kulture','Soul Sessions','Underground King','Cravings','Stella'],
    visual: 'events',
    bgImg: `${SB}/noir_event/03_event_flyers/NOIR_NEWS.png`,
  },
  {
    num: '005', label: 'Division Two', name: 'F&B & Culture',
    headline: 'Spaces that\nfeed and\ninspire.',
    body: 'Casper Group operates multi-concept food and beverage venues with an active prospect pipeline across 15 cities. Forever Futbol is an immersive museum destination celebrating the world\'s game.',
    tags: ['Casper Group','Forever Futbol','Living Legends','Bodegea Archive'],
    visual: 'food',
    bgImg: `${SB}/casper_group/logos/casper-white.png`,
  },
  {
    num: '006', label: 'Division Three', name: 'Products & Technology',
    headline: 'Physical.\nDigital.\nBoth.',
    body: 'Infinity Water and Pronto Energy lead consumer products. The technology stack includes Good Times, Rule Radar, UTube University, Mission 365, and Mind Studio — all built in-house.',
    tags: ['Infinity Water','Pronto Energy','Good Times App','Rule Radar','Mission 365'],
    visual: 'products',
    bgImg: `${SB}/pronto-energy/product-shots/all-flavors-lineup.png`,
  },
  {
    num: '007', label: 'Division Four', name: 'Services & Pipeline',
    headline: 'The next\nchapter is\nalready\nmoving.',
    body: 'Umbrella Group manages services and operational support. The pipeline includes political intelligence, education tech, wellness expansion, and new city market entries.',
    tags: ['Umbrella Group','Mind Studio','NYC Expansion','Living Legends'],
    visual: 'future',
  },
];

const STATS = [
  { n: '50+', l: 'Active Brands', delay: 0 },
  { n: '8', l: 'Cities', delay: 0.1 },
  { n: '15+', l: 'Event Brands', delay: 0.2 },
  { n: '198', l: 'AI Agents', delay: 0.3 },
];

const CITIES = [
  { name: 'Atlanta, GA', label: 'Flagship', active: true },
  { name: 'Houston, TX', label: 'Active', active: true },
  { name: 'Miami, FL', label: 'Active', active: true },
  { name: 'Los Angeles, CA', label: 'Expanding', active: true },
  { name: 'Washington D.C.', label: 'Active', active: true },
  { name: 'Dallas, TX', label: 'Active', active: true },
  { name: 'Charlotte, NC', label: 'Active', active: true },
  { name: 'New York, NY', label: 'Pipeline', active: false },
];

const PIPELINE = [
  { stage: 'In Development', name: 'UTube University', desc: 'Digital education platform built around the KHG knowledge base and the entrepreneurial ecosystem.', cities: ['Digital','National'] },
  { stage: 'Building', name: 'Rule Radar', desc: 'Legal intelligence platform surfacing jurisdiction-specific compliance and regulatory intelligence.', cities: ['Multi-State','B2B'] },
  { stage: 'In Development', name: 'Mission 365', desc: 'Productivity and accountability platform designed for the entrepreneurial operating model.', cities: ['App','Consumer'] },
  { stage: 'Expanding', name: 'City Markets', desc: 'Structured expansion across New York, Phoenix, Scottsdale, and additional markets now scoped.', cities: ['NY','PHX','+More'] },
  { stage: 'Incubating', name: 'Living Legends', desc: 'Cultural experience destination celebrating legacy figures across sports, music, and entertainment.', cities: ['Venue TBD'] },
];

const LEGACY = [
  { year: '2024', name: "Sunday's Best", div: 'Events · Multi-City' },
  { year: '2023', name: 'Paparazzi', div: 'Events · Atlanta' },
  { year: '2023', name: 'Bodegea', div: 'F&B Concept' },
  { year: '2022', name: 'Scented Flowers', div: 'Lifestyle Brand' },
  { year: '2022', name: 'On Call · Roadside', div: 'Services Apps · Pivoting' },
  { year: '2021', name: 'Early HugLife Concepts', div: 'Events · Foundation Era' },
];

const PARTNER_TYPES = [
  { title: 'Sponsorship', desc: 'Align with HugLife, Forever Futbol, and 50+ brands across 8 cities', icon: '◈' },
  { title: 'Venue Partnership', desc: 'Activate your space through KHG event programming and F&B', icon: '◇' },
  { title: 'Investment & Strategic', desc: 'Growth capital, licensing, co-development, or operational partnership', icon: '△' },
  { title: 'Media & Press', desc: 'Press requests, founder profile, media kit, editorial coverage', icon: '▽' },
  { title: 'Co-Brand & Collab', desc: 'Creative, product, and experiential collaborations', icon: '○' },
  { title: 'Distribution', desc: 'Retail and wholesale for Infinity Water, Pronto Energy, and future products', icon: '□' },
];

/* ─── UTILITIES ────────────────────────────────────────────── */
function Img({ src, alt, style, className }: { src: string; alt: string; style?: React.CSSProperties; className?: string }) {
  const [err, setErr] = useState(false);
  if (err || !src) return null;
  return <img src={src} alt={alt} style={style} className={className} onError={() => setErr(true)} loading="lazy" />;
}

function SectionNum({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <div className="section-num">{num}</div>
      <div style={{ width: 32, height: 1, background: 'rgba(200,169,110,0.2)' }} />
      <div className="section-num">{label}</div>
    </div>
  );
}

/* ─── MAIN COMPONENT ───────────────────────────────────────── */
export default function Home() {
  const [brandFilter, setBrandFilter] = useState<BrandStatus | 'all'>('all');
  const [slideIdx, setSlideIdx] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const hscrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);
  const cur2Ref = useRef<HTMLDivElement>(null);
  const filteredBrands = brandFilter === 'all' ? brands : brands.filter(b => b.status === brandFilter);

  // Rotate quotes
  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(i => (i + 1) % dorseyAssets.quotes.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Master scroll/cursor/IO effect
  useEffect(() => {
    let mx = 0, my = 0, cx = 0, cy = 0;
    const moveCursor = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (curRef.current) { curRef.current.style.left = mx + 'px'; curRef.current.style.top = my + 'px'; }
    };
    const animCursor = () => {
      cx += (mx - cx) * 0.1; cy += (my - cy) * 0.1;
      if (cur2Ref.current) { cur2Ref.current.style.left = cx + 'px'; cur2Ref.current.style.top = cy + 'px'; }
      requestAnimationFrame(animCursor);
    };
    document.addEventListener('mousemove', moveCursor);
    animCursor();

    const updateProgress = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      const p = document.getElementById('prog');
      if (p) p.style.width = pct + '%';
    };

    // IntersectionObserver for reveals
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.rev,.rev-left,.rev-scale,.stagger').forEach(el => io.observe(el));

    // Horizontal scroll handler
    const handleScroll = () => {
      updateProgress();
      const wrap = hscrollRef.current, track = trackRef.current;
      if (!wrap || !track) return;
      const rect = wrap.getBoundingClientRect(), wh = window.innerHeight;
      if (rect.top <= 0 && rect.bottom >= wh) {
        const scrolled = -rect.top, total = wrap.offsetHeight - wh;
        const pct = Math.min(1, Math.max(0, scrolled / total));
        track.style.transform = `translateX(-${pct * (DIVISIONS.length - 1) * 100}vw)`;
        setSlideIdx(Math.round(pct * (DIVISIONS.length - 1)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cursor hover expansion
    const hoverEls = document.querySelectorAll('a,button,.interactive,.cta-primary');
    const grow = () => { if (curRef.current) { curRef.current.style.width = '14px'; curRef.current.style.height = '14px'; } if (cur2Ref.current) { cur2Ref.current.style.width = '56px'; cur2Ref.current.style.height = '56px'; } };
    const shrink = () => { if (curRef.current) { curRef.current.style.width = '8px'; curRef.current.style.height = '8px'; } if (cur2Ref.current) { cur2Ref.current.style.width = '40px'; cur2Ref.current.style.height = '40px'; } };
    hoverEls.forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink); });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
      io.disconnect();
    };
  }, []);

  /* ─── SLIDE VISUALS ────────────────────────────────────────── */
  const SlideVisual = ({ type }: { type: string }) => {
    if (type === 'events') return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, width: 'clamp(220px,22vw,340px)' }}>
        {eventShowcase.slice(0, 4).map(e => (
          <div key={e.brand} style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', border: '1px solid rgba(200,169,110,0.06)' }}>
            <Img src={e.img} alt={e.brand} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, transition: 'transform 0.6s var(--ease-out)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 10px 8px', background: 'linear-gradient(transparent,rgba(0,0,0,0.85))' }}>
              <div style={{ fontSize: 'var(--text-micro)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.7)', fontFamily: "'DM Mono',monospace" }}>{e.brand}</div>
            </div>
          </div>
        ))}
      </div>
    );
    if (type === 'food') return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, width: 'clamp(220px,22vw,320px)' }}>
        {casperBrands.slice(0, 6).map(b => (
          <div key={b.name} className="interactive" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '16px 6px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(200,169,110,0.05)', cursor: 'pointer' }}>
            <div style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Img src={b.logo} alt={b.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ fontSize: 'var(--text-micro)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.4)', textAlign: 'center', fontFamily: "'DM Mono',monospace" }}>{b.name}</div>
          </div>
        ))}
      </div>
    );
    if (type === 'products') return (
      <div style={{ display: 'flex', gap: 6, width: 'clamp(220px,22vw,340px)', alignItems: 'flex-end' }}>
        {productShots.pronto.slice(0, 5).map((src, i) => (
          <div key={i} style={{ flex: 1, animation: `float ${3 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}>
            <Img src={src} alt={`Pronto ${i}`} style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }} />
          </div>
        ))}
      </div>
    );
    // future/stats
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 'clamp(180px,18vw,240px)' }}>
        {[{ n: '34', l: 'Departments' }, { n: '6+', l: 'Apps in Dev' }, { n: '10+', l: 'New Markets' }].map(s => (
          <div key={s.l} style={{ padding: '24px 28px', borderLeft: '2px solid rgba(200,169,110,0.12)', marginLeft: 24 }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 300, color: 'var(--ivory)', lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: 'var(--text-micro)', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.35)', marginTop: 4, fontFamily: "'DM Mono',monospace" }}>{s.l}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Custom cursor */}
      <div id="cur" ref={curRef} />
      <div id="cur2" ref={cur2Ref} />
      <div id="prog" />

      {/* ═══ NAVIGATION ═══ */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px var(--gutter)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(4,4,4,0.92) 0%,rgba(4,4,4,0.4) 70%,transparent 100%)', pointerEvents: 'none', zIndex: -1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{ height: 30, width: 'auto', opacity: 0.9 }} />
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.6)', fontWeight: 300 }}>KHG · Dr. Dorsey</div>
        </div>
        <div className="nav-links-desktop" style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
          {[['#manifesto', 'Founder'], ['#hscroll', 'Divisions'], ['#brands', 'Universe'], ['#vault', 'Legacy'], ['#close', 'Contact']].map(([href, label]) => (
            <a key={label} href={href} className="nav-link">{label}</a>
          ))}
        </div>
      </nav>

      {/* ═══ 001 — HERO ═══ */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 800, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', background: 'var(--void)' }}>
        {/* FULL SCREEN VIDEO — BRIGHTENED as center focus */}
        <video
          autoPlay muted loop playsInline
          onLoadedData={() => setHeroLoaded(true)}
          className="hero-video"
          style={{ opacity: heroLoaded ? 0.55 : 0, transition: 'opacity 2.5s cubic-bezier(0.16,1,0.3,1)', zIndex: 1 }}
        >
          <source src="/videos/hero-animation.mp4" type="video/mp4" />
        </video>

        {/* Light vignette — edges only, center stays bright for video */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse 70% 60% at 50% 45%,transparent 0%,rgba(4,4,4,0.35) 55%,rgba(4,4,4,0.85) 100%)' }} />
        {/* Bottom fade for text legibility */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to top,var(--void) 0%,rgba(4,4,4,0.6) 20%,transparent 45%,transparent 80%,rgba(4,4,4,0.3) 100%)' }} />
        
        {/* Grain layer */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, opacity: 0.03, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '128px' }} />

        {/* Ghost numeral — subtle corner accent */}
        <div style={{ position: 'absolute', right: '-0.05em', bottom: '-0.15em', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(200px,40vw,600px)', fontWeight: 300, color: 'rgba(200,169,110,0.02)', lineHeight: 1, pointerEvents: 'none', zIndex: 3 }}>I</div>
        
        {/* Section indicator — top right */}
        <div style={{ position: 'absolute', top: '50%', right: 'var(--gutter)', transform: 'translateY(-50%)', fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.2em', color: 'rgba(200,169,110,0.15)', writingMode: 'vertical-rl', zIndex: 4 }}>001 / 012 — EMPIRE HQ</div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 1, height: 32, background: 'rgba(200,169,110,0.3)', animation: 'scrollLine 2s ease-in-out infinite' }} />
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 6, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.2)' }}>Scroll</div>
        </div>

        {/* Hero content — bottom-left perimeter, off the video center */}
        <div style={{ position: 'relative', zIndex: 10, padding: '0 var(--gutter) 72px', maxWidth: 700 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, opacity: 0, animation: 'fadeRight 1s 0.6s cubic-bezier(0.16,1,0.3,1) forwards' }}>
            <Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{ height: 22, width: 'auto', opacity: 0.7 }} />
            <div style={{ width: 32, height: 1, background: 'var(--gold)', opacity: 0.4 }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.5)' }}>Est. by Dr. Dorsey</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(48px, 8vw, 120px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-0.02em', color: 'var(--ivory)', opacity: 0, animation: 'heroReveal 1.4s 0.3s cubic-bezier(0.16,1,0.3,1) forwards' }}>
            The Architecture<br />of a Modern<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Empire</em>
          </h1>
          <p style={{ fontSize: 'var(--text-body)', color: 'rgba(242,237,227,0.5)', maxWidth: 420, marginTop: 24, lineHeight: 1.8, opacity: 0, animation: 'fadeUp 1s 1s cubic-bezier(0.16,1,0.3,1) forwards' }}>
            A founder-led multi-brand ecosystem across hospitality, events, food & beverage, museums, products, and technology — 8 cities, 50+ ventures.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 32, opacity: 0, animation: 'fadeUp 1s 1.2s cubic-bezier(0.16,1,0.3,1) forwards' }}>
            <a href="#manifesto" className="cta-primary"><span>Enter the Ecosystem</span></a>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE TICKER ═══ */}
      <div style={{ background: 'var(--void)', borderTop: '1px solid rgba(200,169,110,0.04)', borderBottom: '1px solid rgba(200,169,110,0.04)', padding: '16px 0', overflow: 'hidden' }}>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.18)', padding: '0 28px', whiteSpace: 'nowrap' }}>
              {item}<span style={{ margin: '0 28px', color: 'rgba(200,169,110,0.08)' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ 002 — THE FOUNDER ═══ */}
      <section id="manifesto" style={{ background: 'var(--void)', padding: 'var(--pad) var(--gutter)', position: 'relative', overflow: 'hidden' }}>
        {/* BG image at 5% opacity per SOP */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, filter: 'brightness(0.2) saturate(0.3)', pointerEvents: 'none', backgroundImage: `url(${dorseyAssets.quotes[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 'clamp(40px,6vw,120px)', alignItems: 'start' }} className="mob-stack">
          <div>
            <div className="rev">
              <SectionNum num="002" label="The Founder" />
              <h2 className="heading-empire" style={{ fontSize: 'var(--text-section)' }}>
                Dr. Dorsey is not<br />building brands.<br />He is building<br /><em>infrastructure.</em>
              </h2>
            </div>
            <div className="rev" style={{ marginTop: 48 }}>
              <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--muted)', lineHeight: 2, maxWidth: 480 }}>
                Every venture is a node in a larger system. Events generate attention. Food and beverage create physical space. Products extend the ecosystem beyond geography. Technology automates at scale. Museums preserve culture. Each division feeds the others — and the whole is designed to compound.
              </p>
            </div>
            <div className="rev" style={{ marginTop: 48 }}>
              <p style={{ fontSize: 'var(--text-body)', color: 'rgba(242,237,227,0.2)', lineHeight: 2 }}>
                The Kollective Hospitality Group is not a portfolio. It is a machine — engineered by a single founder with a systems-first operating philosophy, powered by 198 AI agents across 34 departments, and expanding into 8+ cities simultaneously.
              </p>
            </div>
          </div>

          {/* Rotating quote graphics */}
          <div className="rev mob-hide" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 40 }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1', overflow: 'hidden', border: '1px solid rgba(200,169,110,0.06)' }}>
              {dorseyAssets.quotes.map((q, i) => (
                <Img key={i} src={q} alt="Quote" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: quoteIdx === i ? 1 : 0, transition: 'opacity 1.2s ease', filter: 'brightness(0.85) contrast(1.1)' }} />
              ))}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--void) 0%, transparent 30%)' }} />
            </div>
            {/* Quote dots */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              {dorseyAssets.quotes.map((_, i) => (
                <div key={i} onClick={() => setQuoteIdx(i)} style={{ width: quoteIdx === i ? 24 : 6, height: 6, borderRadius: 3, background: quoteIdx === i ? 'var(--gold)' : 'rgba(200,169,110,0.15)', transition: 'all 0.4s var(--ease-out)', cursor: 'pointer' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Pillar Stats */}
        <div className="rev stagger" style={{ maxWidth: 1400, margin: '80px auto 0', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(200,169,110,0.04)' }}>
          {[
            { num: '001', title: 'Vision', desc: 'Long-view thinking across every venture — building for a decade, not a quarter.' },
            { num: '002', title: 'Culture', desc: 'Brands rooted in authentic experience, community identity, and the architecture of influence.' },
            { num: '003', title: 'Systems', desc: '198 agents. 34 departments. Infrastructure that scales across 50+ brands and 8 cities.' },
            { num: '004', title: 'Ownership', desc: 'Physical, digital, and intellectual property designed for long-term equity and value.' },
          ].map(p => (
            <div key={p.num} style={{ background: 'var(--void)', padding: 'clamp(24px,3vw,48px)', position: 'relative' }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', color: 'rgba(200,169,110,0.25)', letterSpacing: '0.3em', marginBottom: 16 }}>{p.num}</div>
              <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'var(--text-sub)', fontWeight: 300, color: 'var(--ivory)', marginBottom: 12 }}>{p.title}</h4>
              <p style={{ fontSize: 'var(--text-caption)', color: 'var(--muted)', lineHeight: 1.9 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 003 — STATS BAR ═══ */}
      <section style={{ background: 'var(--coal)', padding: '60px var(--gutter)', borderTop: '1px solid rgba(200,169,110,0.04)', borderBottom: '1px solid rgba(200,169,110,0.04)' }}>
        <div className="rev stagger" style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32 }}>
          <div>
            <SectionNum num="003" label="The Numbers" />
          </div>
          <div style={{ display: 'flex', gap: 'clamp(32px,5vw,80px)', flexWrap: 'wrap' }}>
            {STATS.map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 004-007 — DIVISIONS (HORIZONTAL SCROLL) ═══ */}
      <div id="hscroll" ref={hscrollRef} className="hscroll-wrap" style={{ height: `${DIVISIONS.length * 100}vh` }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <div ref={trackRef} className="hscroll-track">
            {DIVISIONS.map((div, idx) => (
              <div key={div.num} className="hscroll-slide" style={{ background: 'var(--void)' }}>
                {/* BG Image at 5% */}
                {div.bgImg && <div style={{ position: 'absolute', inset: 0, opacity: 0.05, filter: 'brightness(0.2)', backgroundImage: `url(${div.bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none' }} />}
                
                <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'clamp(40px,6vw,100px)', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  {/* Text side */}
                  <div>
                    <SectionNum num={div.num} label={`${div.label} · ${div.name}`} />
                    <h2 className="heading-empire" style={{ fontSize: 'var(--text-section)', marginTop: 16, whiteSpace: 'pre-line' }}>{div.headline}</h2>
                    <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', lineHeight: 2, maxWidth: 440, marginTop: 28 }}>{div.body}</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 32 }}>
                      {div.tags.map(t => (
                        <span key={t} style={{ padding: '6px 14px', border: '1px solid rgba(200,169,110,0.1)', fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.35)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  {/* Visual side */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <SlideVisual type={div.visual} />
                  </div>
                </div>

                {/* Slide progress dots */}
                <div style={{ position: 'absolute', right: 'var(--gutter)', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {DIVISIONS.map((_, i) => (
                    <div key={i} style={{ width: 6, height: slideIdx === i ? 24 : 6, borderRadius: 3, background: slideIdx === i ? 'var(--gold)' : 'rgba(200,169,110,0.12)', transition: 'all 0.4s var(--ease-out)' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ 008 — EVENT SHOWCASE ═══ */}
      <section style={{ background: 'var(--ink)', padding: 'var(--pad) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ padding: '0 var(--gutter)', maxWidth: 1400, margin: '0 auto 48px' }}>
          <div className="rev">
            <SectionNum num="008" label="Event Showcase" />
            <h2 className="heading-empire" style={{ fontSize: 'var(--text-section)' }}>The world we<br /><em>curate.</em></h2>
          </div>
        </div>
        <div className="rev-scale" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 3, padding: '0 3px' }}>
          {eventShowcase.map((e, i) => (
            <div key={e.brand} className="interactive" style={{ position: 'relative', aspectRatio: i === 0 || i === 3 ? '4/5' : '3/4', overflow: 'hidden', cursor: 'pointer' }}>
              <Img src={e.img} alt={e.brand} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s var(--ease-out)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.8))' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 16px' }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.7)' }}>{e.brand}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 009 — BRAND UNIVERSE ═══ */}
      <section id="brands" style={{ background: 'var(--void)', padding: 'var(--pad) var(--gutter)', position: 'relative' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="rev" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'end', marginBottom: 48 }} >
            <div>
              <SectionNum num="009" label="Brand Universe" />
              <h2 className="heading-empire" style={{ fontSize: 'var(--text-section)' }}>Every brand.<br />One <em>ecosystem.</em></h2>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              {(['all', 'flagship', 'active', 'seasonal', 'dev', 'legacy'] as const).map(f => (
                <button key={f} onClick={() => setBrandFilter(f)} style={{ padding: '8px 16px', border: `1px solid ${brandFilter === f ? 'rgba(200,169,110,0.4)' : 'rgba(200,169,110,0.08)'}`, background: brandFilter === f ? 'rgba(200,169,110,0.06)' : 'transparent', color: brandFilter === f ? 'var(--gold)' : 'var(--muted)', fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }}>{f}</button>
              ))}
            </div>
          </div>

          <div className="rev brands-masonry">
            {filteredBrands.map(b => (
              <div key={b.name} className="interactive" style={{ breakInside: 'avoid', padding: '20px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(200,169,110,0.04)', marginBottom: 2, cursor: b.website ? 'pointer' : 'default' }} onClick={() => b.website && window.open(b.website, '_blank')}>
                {/* LOGO DISPLAY — always show logo, never flyer here */}
                {b.logo && (
                  <div style={{ marginBottom: 14, overflow: 'hidden', aspectRatio: '3/2', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
                    <Img src={b.logo} alt={b.name} style={{ maxWidth: '70%', maxHeight: '70%', objectFit: 'contain', opacity: 0.85 }} />
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(14px,1.4vw,20px)', fontWeight: 400, color: 'rgba(242,237,227,0.7)' }}>{b.name}</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.25)', marginTop: 4 }}>{b.division}</div>
                  </div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusColors[b.status], flexShrink: 0 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 010 — LEGACY VAULT ═══ */}
      <section id="vault" style={{ background: '#080706', padding: 'var(--pad) var(--gutter)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-0.02em', top: '50%', transform: 'translateY(-50%)', fontFamily: "'Playfair Display',serif", fontSize: 'min(38vw,600px)', color: 'rgba(200,169,110,0.015)', fontWeight: 300, pointerEvents: 'none', letterSpacing: '-0.06em', whiteSpace: 'nowrap', lineHeight: 1 }}>ARCHIVE</div>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="rev" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <SectionNum num="010" label="Legacy Vault" />
              <h2 className="heading-empire" style={{ fontSize: 'var(--text-section)' }}>Past ventures.<br /><em>Permanent proof.</em></h2>
            </div>
            <p style={{ maxWidth: 280, fontSize: 'var(--text-caption)', color: 'rgba(242,237,227,0.25)', lineHeight: 1.9, textAlign: 'right' }}>The legacy archive documents the concepts, campaigns, and brand experiments that shaped the evolution of the ecosystem.</p>
          </div>
          <div className="rev stagger">
            {LEGACY.map(entry => (
              <div key={entry.name} className="interactive" style={{ display: 'grid', gridTemplateColumns: '80px 1px 1fr', gap: '0 32px', padding: '28px 0', borderBottom: '1px solid rgba(200,169,110,0.05)', cursor: 'pointer' }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', color: 'rgba(200,169,110,0.25)', letterSpacing: '0.1em', alignSelf: 'center' }}>{entry.year}</div>
                <div style={{ background: 'rgba(200,169,110,0.1)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 6, height: 6, borderRadius: '50%', background: '#080706', border: '1px solid rgba(200,169,110,0.25)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(18px,2vw,28px)', fontWeight: 300, color: 'rgba(242,237,227,0.6)' }}>{entry.name}</div>
                  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                    <div style={{ fontSize: 'var(--text-micro)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.2)' }}>{entry.div}</div>
                    <div style={{ fontSize: 14, color: 'rgba(200,169,110,0.15)' }}>→</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 011 — PIPELINE ═══ */}
      <section style={{ background: 'var(--void)', padding: 'var(--pad) var(--gutter)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="rev" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'end', marginBottom: 64 }} >
            <div>
              <SectionNum num="011" label="In Development" />
              <h2 className="heading-empire" style={{ fontSize: 'var(--text-section)' }}>The next<br />chapter is<br /><em>already</em><br />in motion.</h2>
            </div>
            <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', lineHeight: 2, maxWidth: 400 }}>Beyond current operations, The Kollective continues to build and incubate new concepts across hospitality, products, experiences, media, and digital platforms.</p>
          </div>
          <div className="rev stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(200,169,110,0.04)' }} >
            {PIPELINE.map(p => (
              <div key={p.name} className="interactive" style={{ background: 'var(--void)', padding: 'clamp(28px,3vw,48px)', cursor: 'pointer' }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.35)', marginBottom: 20 }}>{p.stage}</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'var(--text-sub)', fontWeight: 300, color: 'var(--ivory)', marginBottom: 14, lineHeight: 1.2 }}>{p.name}</h3>
                <p style={{ fontSize: 'var(--text-caption)', color: 'rgba(242,237,227,0.3)', lineHeight: 1.9, marginBottom: 28 }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {p.cities.map(c => (
                    <span key={c} style={{ padding: '4px 12px', border: '1px solid rgba(200,169,110,0.12)', fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.3)' }}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PARTNER ═══ */}
      <section style={{ background: 'var(--coal)', padding: 'var(--pad) var(--gutter)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="rev" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} >
            <div>
              <h2 className="heading-empire" style={{ fontSize: 'var(--text-section)', marginBottom: 40 }}>Partner<br />across the<br /><em>ecosystem.</em></h2>
              <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', lineHeight: 2, maxWidth: 400, marginBottom: 48 }}>The Kollective Hospitality Group is structured for partnership. Sponsorships, venue activations, licensing, co-branded experiences, media, and strategic growth relationships.</p>
              <a href="mailto:thekollectiveworldwide@gmail.com?subject=Partnership%20Inquiry" className="cta-primary"><span>Begin a Conversation</span></a>
            </div>
            <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {PARTNER_TYPES.map(pt => (
                <a key={pt.title} href={`mailto:thekollectiveworldwide@gmail.com?subject=${encodeURIComponent(pt.title + ' Inquiry — KHG')}`} className="interactive" style={{ padding: '28px 32px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(200,169,110,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: 'rgba(200,169,110,0.2)' }}>{pt.icon}</span>
                    <div>
                      <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 400, color: 'rgba(242,237,227,0.65)', marginBottom: 4 }}>{pt.title}</h4>
                      <p style={{ fontSize: 'var(--text-caption)', color: 'rgba(242,237,227,0.22)', lineHeight: 1.6 }}>{pt.desc}</p>
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(200,169,110,0.15)', marginLeft: 24, transition: 'transform 0.3s var(--ease-out)' }}>→</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 012 — CONTACT / CONVERSION CLOSE ═══ */}
      <section id="close" style={{ background: 'var(--void)', padding: 'clamp(100px,16vh,200px) var(--gutter)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(ellipse at center,rgba(200,169,110,0.04) 0%,transparent 65%)', pointerEvents: 'none' }} />
        {/* Watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.03, pointerEvents: 'none' }}>
          <Img src={dorseyAssets.kollectiveGoldWhite} alt="" style={{ width: 500, height: 'auto' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="rev">
            <SectionNum num="012" label="Enter the Ecosystem" />
          </div>
          <h2 className="rev heading-empire" style={{ fontSize: 'clamp(52px,10vw,150px)', marginBottom: 48, marginTop: 16 }}>{"Let's"}<br /><em>build</em><br />together.</h2>
          
          {/* Partnership type buttons — now functional mailto */}
          <div className="rev" style={{ display: 'flex', gap: 0, justifyContent: 'center', marginBottom: 64, flexWrap: 'wrap' }}>
            {['Sponsorship', 'Venue Partnership', 'Investment', 'Media / Press', 'Brand Collab', 'General'].map((label, i, arr) => (
              <a key={label} href={`mailto:thekollectiveworldwide@gmail.com?subject=${encodeURIComponent(label + ' — The Kollective Hospitality Group')}`} style={{ padding: '14px 28px', border: '1px solid rgba(200,169,110,0.08)', borderRight: i === arr.length - 1 ? '1px solid rgba(200,169,110,0.08)' : 'none', background: 'transparent', color: 'rgba(242,237,227,0.25)', fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s', display: 'inline-block' }}>
                {label}
              </a>
            ))}
          </div>

          <div className="rev">
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(16px,2vw,26px)', fontWeight: 300, color: 'rgba(242,237,227,0.15)', marginBottom: 8 }}>Or reach out directly</p>
            <a href="mailto:thekollectiveworldwide@gmail.com" style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(20px,3vw,40px)', fontWeight: 300, color: 'rgba(200,169,110,0.5)', letterSpacing: '-0.01em', transition: 'color 0.3s' }}>thekollectiveworldwide@gmail.com</a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: '40px var(--gutter)', borderTop: '1px solid rgba(200,169,110,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{ height: 20, width: 'auto', opacity: 0.35 }} />
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.25)' }}>The Kollective Hospitality Group</div>
        </div>
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          {[
            { label: 'Instagram', href: 'https://instagram.com/thekollectiveworldwide' },
            { label: 'HugLife', href: 'https://huglife.vercel.app' },
            { label: 'Good Times', href: 'https://good-times-app.vercel.app' },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(242,237,227,0.18)', transition: 'color 0.3s' }}>{l.label}</a>
          ))}
        </div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.2em', color: 'rgba(242,237,227,0.12)' }}>© 2026 Dr. Dorsey · Atlanta, GA · All Rights Reserved</div>
      </footer>
    </>
  );
}
