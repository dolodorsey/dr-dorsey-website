'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { brands, statusColors, casperBrands, dorseyAssets, eventShowcase, productShots, ffMerch, type BrandStatus } from './data/brands';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';

/* ═══════════════════════════════════════════════════════════════
   DR. DORSEY — THE KOLLECTIVE HOSPITALITY GROUP
   V3 REBUILD — "CINEMATIC EMPIRE"
   
   Design: Cormorant Garamond + DM Mono + Inter
   Motion: cubic-bezier(0.16,1,0.3,1) everywhere
   Glass: Frosted cards with gradient borders
   Atmosphere: BG images at 5-7% opacity per section
   Mobile: Full hamburger nav with overlay
   ═══════════════════════════════════════════════════════════════ */

const MARQUEE_ITEMS = [
  'HugLife Events','Forever Futbol Museum','Casper Group','Good Times App',
  'Mind Studio','Infinity Water','Pronto Energy','NOIR','Taste of Art',
  'REMIX','Gangsta Gospel','WRST BHVR','The Kulture','Rule Radar',
  'Umbrella Group','ICONIC','Underground King','Soul Sessions','Cravings','Stella',
];

const DIVISIONS = [
  { 
    num: '01', label: 'Events & Experiences', name: 'HugLife Events',
    headline: '15+ event\nbrands.\nOne engine.',
    body: 'HugLife Events is the flagship events operation — curating nightlife, cultural, and entertainment experiences across Atlanta, Houston, Miami, Dallas, and beyond. Each brand carries its own identity, audience, and energy.',
    tags: ['NOIR','Taste of Art','REMIX','Gangsta Gospel','WRST BHVR','The Kulture','Soul Sessions','Underground King','Cravings','Stella'],
    visual: 'events',
    bgImg: `${SB}/noir_event/03_event_flyers/NOIR_NEWS.png`,
    accent: '#C8A96E',
  },
  {
    num: '02', label: 'F&B & Culture', name: 'Casper Group',
    headline: 'Spaces\nthat feed\nand inspire.',
    body: 'Casper Group operates multi-concept food and beverage ventures with an active prospect pipeline across 15 cities. Forever Futbol is an immersive museum celebrating the beautiful game.',
    tags: ['Casper Group','Forever Futbol','Living Legends','Bodegea Archive'],
    visual: 'food',
    bgImg: `${SB}/casper_group/logos/casper-white.png`,
    accent: '#E74C3C',
  },
  {
    num: '03', label: 'Products & Technology', name: 'Product Division',
    headline: 'Physical.\nDigital.\nBoth.',
    body: 'Infinity Water and Pronto Energy lead consumer products. The tech stack includes Good Times, Rule Radar, UTube University, Mission 365, and Mind Studio — all built in-house.',
    tags: ['Infinity Water','Pronto Energy','Good Times','Rule Radar','Mission 365','Mind Studio'],
    visual: 'products',
    bgImg: `${SB}/pronto-energy/product-shots/all-flavors-lineup.png`,
    accent: '#4A9FD5',
  },
  {
    num: '04', label: 'Services & Pipeline', name: 'The Next Chapter',
    headline: 'Already\nin motion.',
    body: 'Umbrella Group manages services and support. The pipeline includes political intelligence, education tech, wellness expansion, and new city market entries for 2026 and beyond.',
    tags: ['Umbrella Group','Mind Studio','NYC Expansion','Living Legends'],
    visual: 'future',
    accent: '#9A7C48',
  },
];

const STATS = [
  { n: '57+', l: 'Active Entities' },
  { n: '8', l: 'Cities' },
  { n: '15+', l: 'Event Brands' },
  { n: '198', l: 'AI Agents' },
  { n: '34', l: 'Departments' },
];

const PIPELINE = [
  { stage: 'Active', name: 'Good Times App', desc: '837 venues across 10 cities. The nightlife concierge.', cities: ['ATL','HOU','MIA','DAL','NYC','LA'] },
  { stage: 'Building', name: 'Rule Radar', desc: 'Legal intelligence platform surfacing compliance across jurisdictions.', cities: ['Multi-State','B2B'] },
  { stage: 'Building', name: 'UTube University', desc: 'Digital education built around the KHG knowledge base.', cities: ['Digital'] },
  { stage: 'Expanding', name: 'City Markets', desc: 'Structured expansion into New York, Phoenix, Scottsdale.', cities: ['NY','PHX','SCO'] },
  { stage: 'Incubating', name: 'Living Legends', desc: 'Cultural destination celebrating legacy figures in sports, music, entertainment.', cities: ['Venue TBD'] },
  { stage: 'Active', name: 'Mind Studio', desc: '3-entity MSO. Telemed + wellness. Client, provider, and BOH portals live.', cities: ['ATL','Digital'] },
];

const PARTNER_TYPES = [
  { title: 'Sponsorship', desc: 'Align with HugLife, Forever Futbol, and 50+ brands across 8 cities', icon: '◈' },
  { title: 'Venue Partnership', desc: 'Activate your space through KHG event programming and F&B', icon: '◇' },
  { title: 'Investment', desc: 'Growth capital, licensing, co-development, or operational partnership', icon: '△' },
  { title: 'Media & Press', desc: 'Press requests, founder profile, media kit, editorial coverage', icon: '▽' },
  { title: 'Brand Collab', desc: 'Creative, product, and experiential collaborations', icon: '○' },
  { title: 'Distribution', desc: 'Retail and wholesale for Infinity Water, Pronto Energy, and beyond', icon: '□' },
];

const NAV_LINKS = [
  ['#founder', 'Founder'],
  ['#divisions', 'Divisions'],
  ['#brands', 'Universe'],
  ['#pipeline', 'Pipeline'],
  ['#connect', 'Connect'],
];

/* ─── UTILITIES ─── */
function Img({ src, alt, style, className, onLoad }: { src: string; alt: string; style?: React.CSSProperties; className?: string; onLoad?: () => void }) {
  const [err, setErr] = useState(false);
  if (err || !src) return null;
  return <img src={src} alt={alt} style={style} className={className} onError={() => setErr(true)} onLoad={onLoad} loading="lazy" />;
}

function SecNum({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.3em', color: 'rgba(200,169,110,0.3)' }}>{num}</span>
      <span style={{ width: 40, height: 1, background: 'rgba(200,169,110,0.15)', display: 'block' }} />
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.25)' }}>{label}</span>
    </div>
  );
}

/* ─── MAIN ─── */
export default function Home() {
  const [brandFilter, setBrandFilter] = useState<BrandStatus | 'all'>('all');
  const [slideIdx, setSlideIdx] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const hscrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const filteredBrands = brandFilter === 'all' ? brands : brands.filter(b => b.status === brandFilter);

  // Loading intro
  useEffect(() => {
    const t = setTimeout(() => setLoadingDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  // Rotate quotes
  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(i => (i + 1) % dorseyAssets.quotes.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Master scroll/cursor/IO
  useEffect(() => {
    let mx = 0, my = 0, cx = 0, cy = 0;
    const moveCursor = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) { dotRef.current.style.left = mx + 'px'; dotRef.current.style.top = my + 'px'; }
    };
    const animCursor = () => {
      cx += (mx - cx) * 0.08; cy += (my - cy) * 0.08;
      if (ringRef.current) { ringRef.current.style.left = cx + 'px'; ringRef.current.style.top = cy + 'px'; }
      requestAnimationFrame(animCursor);
    };
    document.addEventListener('mousemove', moveCursor);
    animCursor();

    const handleScroll = () => {
      // Progress bar
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      const p = document.getElementById('scroll-progress');
      if (p) p.style.width = pct + '%';

      // Nav glass
      setNavScrolled(window.scrollY > 80);

      // Horizontal scroll
      const wrap = hscrollRef.current, track = trackRef.current;
      if (wrap && track) {
        const rect = wrap.getBoundingClientRect(), wh = window.innerHeight;
        if (rect.top <= 0 && rect.bottom >= wh) {
          const scrolled = -rect.top, total = wrap.offsetHeight - wh;
          const pct2 = Math.min(1, Math.max(0, scrolled / total));
          track.style.transform = `translateX(-${pct2 * (DIVISIONS.length - 1) * 100}vw)`;
          setSlideIdx(Math.round(pct2 * (DIVISIONS.length - 1)));
        }
      }
    };

    // IO for reveals
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.06, rootMargin: '0px 0px -60px 0px' });
    setTimeout(() => {
      document.querySelectorAll('.rv,.rv-left,.rv-scale,.stg').forEach(el => io.observe(el));
    }, 200);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cursor hover
    const grow = () => {
      if (dotRef.current) { dotRef.current.style.width = '12px'; dotRef.current.style.height = '12px'; }
      if (ringRef.current) { ringRef.current.style.width = '60px'; ringRef.current.style.height = '60px'; }
    };
    const shrink = () => {
      if (dotRef.current) { dotRef.current.style.width = '6px'; dotRef.current.style.height = '6px'; }
      if (ringRef.current) { ringRef.current.style.width = '44px'; ringRef.current.style.height = '44px'; }
    };
    const addHoverListeners = () => {
      document.querySelectorAll('a,button,.interactive,.cta-primary,.glass-card').forEach(el => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });
    };
    setTimeout(addHoverListeners, 500);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
      io.disconnect();
    };
  }, []);

  // Close mobile menu on nav click
  const handleMobileNav = (href: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  /* ─── SLIDE VISUALS ─── */
  const SlideVisual = ({ type }: { type: string }) => {
    if (type === 'events') return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, width: 'clamp(260px,26vw,400px)' }}>
        {eventShowcase.filter(e => e.logo).slice(0, 6).map(e => (
          <div key={e.brand} className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '20px 10px' }}>
            <div style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Img src={e.logo!} alt={e.brand} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', opacity: 0.85 }} />
            </div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.45)', textAlign: 'center' }}>{e.brand}</div>
          </div>
        ))}
      </div>
    );
    if (type === 'food') return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, width: 'clamp(240px,24vw,360px)' }}>
        {casperBrands.slice(0, 6).map(b => (
          <div key={b.name} className="glass-card interactive" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '20px 8px' }}>
            <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Img src={b.logo} alt={b.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.4)', textAlign: 'center' }}>{b.name}</div>
          </div>
        ))}
      </div>
    );
    if (type === 'products') return (
      <div style={{ display: 'flex', gap: 8, width: 'clamp(240px,24vw,380px)', alignItems: 'flex-end' }}>
        {productShots.pronto.slice(0, 5).map((src, i) => (
          <div key={i} style={{ flex: 1, animation: `float ${3 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}>
            <Img src={src} alt={`Pronto ${i}`} style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.7))' }} />
          </div>
        ))}
      </div>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 'clamp(200px,20vw,280px)' }}>
        {[{ n: '34', l: 'AI Departments' }, { n: '6+', l: 'Apps Building' }, { n: '10+', l: 'New Markets' }].map(s => (
          <div key={s.l} className="glass-card" style={{ padding: '28px 32px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,4vw,56px)', fontWeight: 300, color: 'var(--ivory)', lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.35)', marginTop: 6 }}>{s.l}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* ═══ LOADING SCREEN ═══ */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 10001, background: 'var(--void)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
        opacity: loadingDone ? 0 : 1, pointerEvents: loadingDone ? 'none' : 'all',
        transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{ height: 48, width: 'auto', opacity: 0.8 }} />
        <div style={{ width: 120, height: 1, background: 'rgba(200,169,110,0.1)', borderRadius: 1, overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', background: 'var(--gold)', animation: 'shimmer 1.5s ease-in-out infinite', backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg,transparent,var(--gold),transparent)' }} />
        </div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.25)' }}>Entering the Ecosystem</div>
      </div>

      {/* Custom cursor */}
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
      <div id="scroll-progress" />

      {/* ═══ MOBILE NAV OVERLAY ═══ */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(([href, label]) => (
          <a key={label} onClick={() => handleMobileNav(href)}>{label}</a>
        ))}
        <div style={{ marginTop: 32, display: 'flex', gap: 24 }}>
          {['Instagram', 'HugLife', 'Good Times'].map(l => (
            <a key={l} href={l === 'Instagram' ? 'https://instagram.com/thekollectiveworldwide' : l === 'HugLife' ? 'https://huglife.vercel.app' : 'https://good-times-app.vercel.app'} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.3)' }}>{l}</a>
          ))}
        </div>
      </div>

      {/* ═══ NAVIGATION ═══ */}
      <nav className={`nav-glass ${navScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-glass-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{ height: 28, width: 'auto', opacity: 0.85 }} />
            <div className="mob-hide" style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.45)', fontWeight: 400 }}>Dr. Dorsey</div>
          </div>
          <div className="nav-links-desk" style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
            {NAV_LINKS.map(([href, label]) => (
              <a key={label} href={href} className="nav-link">{label}</a>
            ))}
          </div>
          <div className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span /><span /><span />
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 700, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', background: 'var(--void)' }}>
        <video autoPlay muted loop playsInline onLoadedData={() => setHeroLoaded(true)} className="hero-video" style={{ opacity: heroLoaded ? 0.5 : 0, transition: 'opacity 2.5s cubic-bezier(0.16,1,0.3,1)', zIndex: 1 }}>
          <source src="/videos/hero-animation.mp4" type="video/mp4" />
        </video>
        
        {/* Atmospheric layers */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse 70% 60% at 50% 45%,transparent 0%,rgba(3,3,3,0.3) 55%,rgba(3,3,3,0.85) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to top,var(--void) 0%,rgba(3,3,3,0.5) 20%,transparent 50%,transparent 85%,rgba(3,3,3,0.2) 100%)' }} />
        
        {/* Decorative orbit ring */}
        <div style={{ position: 'absolute', top: '15%', right: '8%', width: 'clamp(200px,30vw,500px)', height: 'clamp(200px,30vw,500px)', border: '1px solid rgba(200,169,110,0.04)', borderRadius: '50%', animation: 'orbitSlow 120s linear infinite', zIndex: 3, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', width: 4, height: 4, borderRadius: '50%', background: 'rgba(200,169,110,0.2)', transform: 'translate(-50%,-50%)' }} />
        </div>
        
        {/* Side label */}
        <div className="mob-hide" style={{ position: 'absolute', top: '50%', right: 'var(--gutter)', transform: 'translateY(-50%)', fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.2em', color: 'rgba(200,169,110,0.12)', writingMode: 'vertical-rl', zIndex: 4 }}>THE KOLLECTIVE HOSPITALITY GROUP · EST. ATLANTA</div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 1, height: 40, background: 'rgba(200,169,110,0.25)', animation: 'scrollPulse 2.5s ease-in-out infinite' }} />
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.15)' }}>Scroll</div>
        </div>

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 10, padding: '0 var(--gutter) 80px', maxWidth: 800 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, opacity: 0, animation: 'fadeRight 1s 2.2s cubic-bezier(0.16,1,0.3,1) forwards' }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold)', opacity: 0.4 }} />
            <span className="mono-label">Founded by Dr. Dorsey</span>
          </div>
          <h1 className="heading-empire" style={{ fontSize: 'var(--text-display)', opacity: 0, animation: 'heroTitle 1.6s 2s cubic-bezier(0.16,1,0.3,1) forwards' }}>
            The Architecture<br />of a Modern<br /><em>Empire</em>
          </h1>
          <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--muted)', maxWidth: 480, marginTop: 28, lineHeight: 1.9, fontWeight: 300, opacity: 0, animation: 'fadeUp 1s 2.6s cubic-bezier(0.16,1,0.3,1) forwards' }}>
            A founder-led multi-brand ecosystem across hospitality, events, food & beverage, museums, products, and technology — 8 cities, 57+ ventures.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 36, opacity: 0, animation: 'fadeUp 1s 2.8s cubic-bezier(0.16,1,0.3,1) forwards', flexWrap: 'wrap' }}>
            <a href="#founder" className="cta-primary"><span>Enter the Ecosystem</span></a>
            <a href="#brands" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '18px 32px', color: 'rgba(242,237,227,0.3)', fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-micro)', letterSpacing: '0.3em', textTransform: 'uppercase', transition: 'color 0.3s' }}>View All Brands →</a>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div style={{ background: 'var(--void)', borderTop: '1px solid rgba(200,169,110,0.04)', borderBottom: '1px solid rgba(200,169,110,0.04)', padding: '18px 0', overflow: 'hidden' }}>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.15)', padding: '0 32px', whiteSpace: 'nowrap' }}>
              {item}<span style={{ margin: '0 32px', color: 'rgba(200,169,110,0.06)' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ THE FOUNDER ═══ */}
      <section id="founder" style={{ background: 'var(--void)', padding: 'var(--pad) var(--gutter)', position: 'relative', overflow: 'hidden' }}>
        {/* BG image */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, filter: 'brightness(0.2) saturate(0.3)', pointerEvents: 'none', backgroundImage: `url(${dorseyAssets.quotes[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 'clamp(48px,7vw,120px)', alignItems: 'start' }} className="desk-grid-2">
          <div>
            <div className="rv">
              <SecNum num="001" label="The Founder" />
              <h2 className="heading-empire" style={{ fontSize: 'var(--text-section)' }}>
                Dr. Dorsey is not<br />building brands.<br />He is building<br /><em>infrastructure.</em>
              </h2>
            </div>
            <div className="rv" style={{ marginTop: 48 }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'var(--text-body-lg)', color: 'var(--muted)', lineHeight: 2, maxWidth: 500, fontWeight: 400 }}>
                Every venture is a node in a larger system. Events generate attention. Food and beverage create physical space. Products extend the ecosystem beyond geography. Technology automates at scale. Museums preserve culture. Each division feeds the others — and the whole is designed to compound.
              </p>
            </div>
            <div className="rv" style={{ marginTop: 40 }}>
              <p style={{ fontSize: 'var(--text-caption)', color: 'rgba(242,237,227,0.22)', lineHeight: 2, maxWidth: 500 }}>
                The Kollective Hospitality Group is not a portfolio. It is a machine — engineered by a single founder with a systems-first philosophy, powered by 198 AI agents across 34 departments, expanding into 8+ cities simultaneously.
              </p>
            </div>
          </div>

          {/* Rotating quote graphics */}
          <div className="rv mob-hide" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 40 }}>
            <div className="glass-card" style={{ position: 'relative', width: '100%', aspectRatio: '1', overflow: 'hidden', borderRadius: 16, animation: 'glowPulse 8s ease-in-out infinite' }}>
              {dorseyAssets.quotes.map((q, i) => (
                <Img key={i} src={q} alt="Quote" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: quoteIdx === i ? 1 : 0, transition: 'opacity 1.4s ease', filter: 'brightness(0.9) contrast(1.1)' }} />
              ))}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--void) 0%, transparent 40%)' }} />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              {dorseyAssets.quotes.map((_, i) => (
                <div key={i} onClick={() => setQuoteIdx(i)} style={{ width: quoteIdx === i ? 28 : 6, height: 6, borderRadius: 3, background: quoteIdx === i ? 'var(--gold)' : 'rgba(200,169,110,0.12)', transition: 'all 0.5s var(--ease-out)', cursor: 'pointer' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Pillar stats */}
        <div className="rv stg" style={{ maxWidth: 'var(--max)', margin: '100px auto 0', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(200,169,110,0.03)', borderRadius: 16, overflow: 'hidden' }}>
          {[
            { num: '01', title: 'Vision', desc: 'Long-view thinking across every venture — building for a decade, not a quarter.' },
            { num: '02', title: 'Culture', desc: 'Brands rooted in authentic experience, community identity, and the architecture of influence.' },
            { num: '03', title: 'Systems', desc: '198 agents. 34 departments. Infrastructure that scales across 57+ entities and 8 cities.' },
            { num: '04', title: 'Ownership', desc: 'Physical, digital, and intellectual property designed for long-term equity and value.' },
          ].map(p => (
            <div key={p.num} style={{ background: 'var(--void)', padding: 'clamp(28px,3.5vw,52px)', position: 'relative' }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', color: 'rgba(200,169,110,0.2)', letterSpacing: '0.3em', marginBottom: 20 }}>{p.num}</div>
              <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'var(--text-sub)', fontWeight: 300, color: 'var(--ivory)', marginBottom: 14 }}>{p.title}</h4>
              <p style={{ fontSize: 'var(--text-caption)', color: 'var(--muted)', lineHeight: 1.9 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section style={{ background: 'var(--coal)', padding: '64px var(--gutter)', borderTop: '1px solid rgba(200,169,110,0.04)', borderBottom: '1px solid rgba(200,169,110,0.04)' }}>
        <div className="rv stg" style={{ maxWidth: 'var(--max)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          {STATS.map(s => (
            <div key={s.l} className="stat-card">
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(40px,5.5vw,72px)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 10 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DIVISIONS (HORIZONTAL SCROLL) ═══ */}
      <div id="divisions" ref={hscrollRef} className="hscroll-wrap" style={{ height: `${DIVISIONS.length * 100}vh` }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <div ref={trackRef} className="hscroll-track">
            {DIVISIONS.map((div, idx) => (
              <div key={div.num} className="hscroll-slide" style={{ background: 'var(--void)' }}>
                {div.bgImg && <div style={{ position: 'absolute', inset: 0, opacity: 0.06, filter: 'brightness(0.2)', backgroundImage: `url(${div.bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none' }} />}
                
                {/* Accent glow */}
                <div style={{ position: 'absolute', top: '30%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(ellipse at center,${div.accent}08 0%,transparent 70%)`, pointerEvents: 'none' }} />
                
                <div style={{ maxWidth: 'var(--max)', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'clamp(48px,7vw,100px)', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div>
                    <SecNum num={div.num} label={div.label} />
                    <h2 className="heading-empire" style={{ fontSize: 'var(--text-section)', marginTop: 12, whiteSpace: 'pre-line' }}>{div.headline}</h2>
                    <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', lineHeight: 2, maxWidth: 460, marginTop: 32 }}>{div.body}</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 36 }}>
                      {div.tags.map(t => (<span key={t} className="brand-tag">{t}</span>))}
                    </div>
                  </div>
                  <div className="mob-hide" style={{ display: 'flex', justifyContent: 'center' }}>
                    <SlideVisual type={div.visual} />
                  </div>
                </div>

                {/* Slide dots */}
                <div className="mob-hide" style={{ position: 'absolute', right: 'var(--gutter)', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {DIVISIONS.map((_, i) => (
                    <div key={i} style={{ width: 6, height: slideIdx === i ? 28 : 6, borderRadius: 3, background: slideIdx === i ? 'var(--gold)' : 'rgba(200,169,110,0.1)', transition: 'all 0.5s var(--ease-out)' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ BRAND UNIVERSE ═══ */}
      <section id="brands" style={{ background: 'var(--abyss)', padding: 'var(--pad) var(--gutter)', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse at center,rgba(200,169,110,0.03) 0%,transparent 60%)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <div className="rv" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <SecNum num="005" label="Brand Universe" />
              <h2 className="heading-empire" style={{ fontSize: 'var(--text-section)' }}>Every brand.<br />One <em>ecosystem.</em></h2>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(['all', 'flagship', 'active', 'seasonal', 'dev', 'legacy'] as const).map(f => (
                <button key={f} onClick={() => setBrandFilter(f)} style={{
                  padding: '8px 18px',
                  border: `1px solid ${brandFilter === f ? 'rgba(200,169,110,0.4)' : 'rgba(200,169,110,0.06)'}`,
                  background: brandFilter === f ? 'rgba(200,169,110,0.06)' : 'transparent',
                  color: brandFilter === f ? 'var(--gold)' : 'rgba(242,237,227,0.2)',
                  fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)',
                  letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'all 0.3s', borderRadius: 2,
                }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="rv stg" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {filteredBrands.map(b => (
              <div key={b.name} className="glass-card interactive" style={{ padding: '24px', cursor: b.website ? 'pointer' : 'default' }} onClick={() => b.website && window.open(b.website, '_blank')}>
                {b.logo && (
                  <div style={{ marginBottom: 16, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Img src={b.logo} alt={b.name} style={{ maxWidth: '65%', maxHeight: '100%', objectFit: 'contain', opacity: 0.85 }} />
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'var(--text-caption)', fontWeight: 500, color: 'rgba(242,237,227,0.7)', letterSpacing: '0.01em' }}>{b.name}</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.2)', marginTop: 4 }}>{b.division}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: statusColors[b.status], flexShrink: 0 }} />
                    {b.website && <span style={{ fontSize: 12, color: 'rgba(200,169,110,0.15)' }}>→</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PIPELINE ═══ */}
      <section id="pipeline" style={{ background: 'var(--void)', padding: 'var(--pad) var(--gutter)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, filter: 'brightness(0.15)', backgroundImage: `url(${SB}/pronto-energy/product-shots/all-flavors-lineup.png)`, backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div className="rv" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginBottom: 72 }} >
            <div>
              <SecNum num="006" label="In Development" />
              <h2 className="heading-empire" style={{ fontSize: 'var(--text-section)' }}>The next<br />chapter is<br /><em>already</em><br />in motion.</h2>
            </div>
            <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', lineHeight: 2, maxWidth: 420 }}>Beyond current operations, The Kollective continues to build new concepts across hospitality, products, experiences, media, and digital platforms.</p>
          </div>
          
          <div className="rv stg" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }} >
            {PIPELINE.map(p => (
              <div key={p.name} className="glass-card interactive" style={{ padding: 'clamp(28px,3.5vw,48px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.4em', textTransform: 'uppercase', color: p.stage === 'Active' ? 'rgba(111,168,111,0.7)' : 'rgba(200,169,110,0.35)' }}>{p.stage}</span>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.stage === 'Active' ? 'rgba(111,168,111,0.7)' : 'rgba(200,169,110,0.2)' }} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'var(--text-sub)', fontWeight: 300, color: 'var(--ivory)', marginBottom: 14, lineHeight: 1.2 }}>{p.name}</h3>
                <p style={{ fontSize: 'var(--text-caption)', color: 'rgba(242,237,227,0.28)', lineHeight: 1.9, marginBottom: 28 }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.cities.map(c => (<span key={c} className="brand-tag">{c}</span>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PARTNER ═══ */}
      <section style={{ background: 'var(--coal)', padding: 'var(--pad) var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <div className="rv" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} >
            <div>
              <SecNum num="007" label="Partnership" />
              <h2 className="heading-empire" style={{ fontSize: 'var(--text-section)', marginBottom: 40 }}>Partner<br />across the<br /><em>ecosystem.</em></h2>
              <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', lineHeight: 2, maxWidth: 420, marginBottom: 48 }}>The Kollective Hospitality Group is structured for partnership — sponsorships, venue activations, licensing, co-branded experiences, media, and strategic growth relationships.</p>
              <a href="mailto:thekollectiveworldwide@gmail.com?subject=Partnership%20Inquiry" className="cta-primary"><span>Begin a Conversation</span></a>
            </div>
            <div className="stg" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PARTNER_TYPES.map(pt => (
                <a key={pt.title} href={`mailto:thekollectiveworldwide@gmail.com?subject=${encodeURIComponent(pt.title + ' Inquiry — KHG')}`} className="glass-card interactive" style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: 'rgba(200,169,110,0.25)' }}>{pt.icon}</span>
                    <div>
                      <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'var(--text-body-lg)', fontWeight: 500, color: 'rgba(242,237,227,0.65)', marginBottom: 4 }}>{pt.title}</h4>
                      <p style={{ fontSize: 'var(--text-caption)', color: 'rgba(242,237,227,0.22)', lineHeight: 1.6 }}>{pt.desc}</p>
                    </div>
                  </div>
                  <div style={{ fontSize: 16, color: 'rgba(200,169,110,0.15)', marginLeft: 24, transition: 'transform 0.3s var(--ease-out)' }}>→</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT / CLOSE ═══ */}
      <section id="connect" style={{ background: 'var(--void)', padding: 'clamp(120px,18vh,240px) var(--gutter)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Large ambient glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(ellipse at center,rgba(200,169,110,0.05) 0%,transparent 60%)', pointerEvents: 'none' }} />
        {/* Ghost logo watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.025, pointerEvents: 'none' }}>
          <Img src={dorseyAssets.kollectiveGoldWhite} alt="" style={{ width: 600, height: 'auto' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="rv"><SecNum num="008" label="Enter the Ecosystem" /></div>
          <h2 className="rv heading-empire" style={{ fontSize: 'clamp(52px,10vw,150px)', marginBottom: 52, marginTop: 16 }}>{"Let's"}<br /><em>build</em><br />together.</h2>
          
          <div className="rv" style={{ display: 'flex', gap: 0, justifyContent: 'center', marginBottom: 72, flexWrap: 'wrap' }}>
            {['Sponsorship', 'Venue', 'Investment', 'Media', 'Collab', 'General'].map((label, i, arr) => (
              <a key={label} href={`mailto:thekollectiveworldwide@gmail.com?subject=${encodeURIComponent(label + ' — The Kollective Hospitality Group')}`} style={{
                padding: '14px 28px',
                border: '1px solid rgba(200,169,110,0.08)',
                borderRight: i === arr.length - 1 ? '1px solid rgba(200,169,110,0.08)' : 'none',
                background: 'transparent',
                color: 'rgba(242,237,227,0.22)',
                fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.3s',
              }}>
                {label}
              </a>
            ))}
          </div>

          <div className="rv">
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(18px,2.5vw,30px)', fontWeight: 300, color: 'rgba(242,237,227,0.15)', marginBottom: 10 }}>Or reach out directly</p>
            <a href="mailto:thekollectiveworldwide@gmail.com" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(22px,3.5vw,44px)', fontWeight: 300, color: 'rgba(200,169,110,0.45)', letterSpacing: '-0.01em', transition: 'color 0.3s' }}>thekollectiveworldwide@gmail.com</a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: '48px var(--gutter)', borderTop: '1px solid rgba(200,169,110,0.04)', background: 'var(--void)' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{ height: 22, width: 'auto', opacity: 0.35 }} />
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.2)' }}>The Kollective Hospitality Group</div>
          </div>
          <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
            {[
              { label: 'Instagram', href: 'https://instagram.com/thekollectiveworldwide' },
              { label: 'HugLife', href: 'https://huglife.vercel.app' },
              { label: 'Good Times', href: 'https://good-times-app.vercel.app' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(242,237,227,0.15)', transition: 'color 0.3s' }}>{l.label}</a>
            ))}
          </div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 'var(--text-nano)', letterSpacing: '0.2em', color: 'rgba(242,237,227,0.1)' }}>© 2026 Dr. Dorsey · Atlanta, GA</div>
        </div>
      </footer>
    </>
  );
}
