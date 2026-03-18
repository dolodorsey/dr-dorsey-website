'use client';
import { useEffect, useRef, useState } from 'react';
import { brands, statusColors, casperBrands, dorseyAssets, eventShowcase, productShots, ffMerch, type BrandStatus } from './data/brands';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';

/* ─── CONSTANTS ──────────────────────────────────────────────────────────── */

const MARQUEE = [
  'HugLife Events','Forever Futbol Museum','Casper Group','Good Times App',
  'Mind Studio','Infinity Water','Pronto Energy','NOIR','Taste of Art',
  'REMIX','Gangsta Gospel','WRST BHVR','The Kulture','Rule Radar',
  'Umbrella Group','ICONIC','Underground King','Soul Sessions','Cravings','Stella',
];

const SLIDES = [
  { num:'003', ey:'Current Focus · Flagship', h:'Where the\nenergy is\nconcentrated\nnow', p:'Six divisions receiving the heaviest strategic investment and operational push across the KHG ecosystem in 2026.', tags:['HugLife Events','Forever Futbol','Casper Group','Good Times','Mind Studio'], vis:'stats' },
  { num:'004', ey:'Division One · Events & Experiences', h:'15+ event\nbrands.\nOne engine.', p:'HugLife Events is the flagship events operation — curating nightlife, cultural, and entertainment experiences across Atlanta, Houston, Miami, Dallas, and beyond.', tags:['NOIR','Taste of Art','REMIX','Gangsta Gospel','WRST BHVR','The Kulture','Soul Sessions','Underground King'], vis:'events' },
  { num:'005', ey:'Division Two · F&B & Culture', h:'Spaces that\nfeed and\ninspire', p:'Casper Group operates multi-concept food and beverage venues with an active prospect pipeline across 15 cities. Forever Futbol is an immersive museum destination.', tags:['Casper Group','Forever Futbol','Living Legends','Bodegea Archive'], vis:'food' },
  { num:'006', ey:'Division Three · Products & Technology', h:'Physical.\nDigital.\nBoth.', p:'Infinity Water and Pronto Energy lead consumer products. The technology stack includes Good Times, Rule Radar, UTube University, Mission 365, Mind Studio — all built in-house.', tags:['Infinity Water','Pronto Energy','Good Times App','Rule Radar','Mission 365'], vis:'products' },
  { num:'007', ey:'Division Four · Services & Future', h:'The next\nchapter is\nalready\nmoving', p:'Umbrella Group manages services and operational support. The pipeline includes political intelligence, education tech, wellness expansion, and new city market entries.', tags:['Umbrella Group','Mind Studio','Politics Platform','NYC Expansion','Living Legends'], vis:'future' },
];

const STATS = [{n:'50+',l:'Active Brands'},{n:'8',l:'Cities'},{n:'15+',l:'Event Brands'},{n:'198',l:'AI Agents'}];
const CITIES = [
  {name:'Atlanta',state:'GA',label:'Flagship',active:true},
  {name:'Houston',state:'TX',label:'Active',active:true},
  {name:'Miami',state:'FL',label:'Active',active:true},
  {name:'Los Angeles',state:'CA',label:'Expanding',active:true},
  {name:'Washington',state:'D.C.',label:'Active',active:true},
  {name:'Dallas',state:'TX',label:'Active',active:true},
  {name:'New York',state:'NY',label:'Pipeline',active:false},
  {name:'Scottsdale',state:'AZ',label:'Active',active:true},
];

const PIPELINE = [
  {stage:'In Development',name:'UTube University',desc:'Digital education platform built around the KHG knowledge base and the entrepreneurial ecosystem.',tags:['Digital','National']},
  {stage:'Building',name:'Rule Radar',desc:'Legal intelligence platform surfacing jurisdiction-specific compliance and regulatory intelligence.',tags:['Multi-State','B2B']},
  {stage:'In Development',name:'Mission 365',desc:'Productivity and accountability platform designed for the entrepreneurial operating model.',tags:['App','Consumer']},
  {stage:'Concept Stage',name:'Politics Platform',desc:'Civic intelligence and engagement platform. Category and structure in active scoping phase.',tags:['National']},
  {stage:'Expanding',name:'City Market Entry',desc:'Structured expansion across New York, Phoenix, Scottsdale, and additional markets now scoped.',tags:['NY','Phoenix','+More']},
  {stage:'Incubating',name:'Living Legends Museum',desc:'Cultural experience destination celebrating legacy figures across sports, music, and entertainment.',tags:['Venue TBD']},
];

const LEGACY = [
  {year:'2024',name:"Sunday's Best",div:'Events · Multi-City'},
  {year:'2023',name:'Paparazzi',div:'Events · Atlanta'},
  {year:'2023',name:'Bodegea',div:'F&B Concept'},
  {year:'2022',name:'Scented Flowers',div:'Lifestyle Brand'},
  {year:'2022',name:'On Call · Roadside',div:'Services Apps · Pivoting'},
  {year:'2021',name:'Early HugLife Concepts',div:'Events · Foundation Era'},
];

const PARTNER_TYPES = [
  {title:'Sponsorship',desc:'Align with HugLife, Forever Futbol, and 50+ brands across 8 cities',icon:'◆'},
  {title:'Venue Partnership',desc:'Activate your space through KHG event programming and F&B',icon:'◇'},
  {title:'Investment & Strategic',desc:'Growth capital, licensing, co-development, or operational partnership',icon:'▲'},
  {title:'Media & Press',desc:'Press requests, founder profile, media kit, editorial coverage',icon:'●'},
  {title:'Co-Brand & Collab',desc:'Creative, product, and experiential collaborations',icon:'■'},
  {title:'Distribution',desc:'Retail and wholesale for Infinity Water, Pronto Energy, and future products',icon:'▸'},
];

/* ─── HELPERS ────────────────────────────────────────────────────────────── */

function Img({ src, alt, style, className }: { src: string; alt: string; style?: React.CSSProperties; className?: string }) {
  const [err, setErr] = useState(false);
  if (err || !src) return null;
  return <img src={src} alt={alt} style={style} className={className} onError={() => setErr(true)} loading="lazy" />;
}

/* ─── SLIDE VISUAL ─── */
function SlideVisual({ type }: { type: string }) {
  if (type === 'stats') return (
    <div className="slide-visual-stats">
      {STATS.map((s, i) => (
        <div key={s.l} className="stat-block"><div className="stat-num">{s.n}</div><div className="stat-label">{s.l}</div></div>
      ))}
    </div>
  );
  if (type === 'events') return (
    <div className="slide-visual-events">
      {eventShowcase.slice(0, 4).map(e => (
        <div key={e.brand} className="event-thumb interactive">
          <Img src={e.img} alt={e.brand} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }} />
          <div className="event-thumb-label">{e.brand}</div>
        </div>
      ))}
    </div>
  );
  if (type === 'food') return (
    <div className="slide-visual-food">
      {casperBrands.slice(0, 6).map(b => (
        <div key={b.name} className="casper-card interactive">
          <div className="casper-card-img"><Img src={b.mascot || b.logo} alt={b.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /></div>
          <div className="casper-card-name">{b.name}</div>
        </div>
      ))}
    </div>
  );
  if (type === 'products') return (
    <div className="slide-visual-products">
      {productShots.pronto.slice(0, 5).map((src, i) => (
        <div key={i} className="pronto-bottle" style={{ transform: `translateY(${i % 2 === 0 ? 0 : -12}px)` }}>
          <Img src={src} alt={`Pronto ${i}`} style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }} />
        </div>
      ))}
    </div>
  );
  return (
    <div className="slide-visual-stats">
      {[{n:'34',l:'Departments'},{n:'6+',l:'Apps in Dev'},{n:'10+',l:'New Markets'}].map(s => (
        <div key={s.l} className="stat-block"><div className="stat-num">{s.n}</div><div className="stat-label">{s.l}</div></div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  const [brandFilter, setBrandFilter] = useState<BrandStatus | 'all'>('all');
  const [slideIdx, setSlideIdx] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const [heroVidLoaded, setHeroVidLoaded] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const hscrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);
  const cur2Ref = useRef<HTMLDivElement>(null);

  const filteredBrands = brandFilter === 'all' ? brands : brands.filter(b => b.status === brandFilter);

  useEffect(() => { const t = setTimeout(() => setHeroReady(true), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { const t = setInterval(() => setQuoteIdx(i => (i + 1) % dorseyAssets.quotes.length), 4500); return () => clearInterval(t); }, []);

  useEffect(() => {
    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; if (curRef.current) { curRef.current.style.left = mx + 'px'; curRef.current.style.top = my + 'px'; } };
    const anim = () => { cx += (mx - cx) * 0.1; cy += (my - cy) * 0.1; if (cur2Ref.current) { cur2Ref.current.style.left = cx + 'px'; cur2Ref.current.style.top = cy + 'px'; } requestAnimationFrame(anim); };
    document.addEventListener('mousemove', onMove); anim();

    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      const p = document.getElementById('prog'); if (p) p.style.width = pct + '%';
      setNavSolid(window.scrollY > 80);
      const wrap = hscrollRef.current, track = trackRef.current;
      if (!wrap || !track) return;
      const rect = wrap.getBoundingClientRect(), wh = window.innerHeight;
      if (rect.top <= 0 && rect.bottom >= wh) {
        const scrolled = -rect.top, total = wrap.offsetHeight - wh;
        const p2 = Math.min(1, Math.max(0, scrolled / total));
        track.style.transform = `translateX(-${p2 * (SLIDES.length - 1) * 100}vw)`;
        setSlideIdx(Math.round(p2 * (SLIDES.length - 1)));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // IntersectionObserver for all reveals
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.rev, .rev-left, .rev-scale').forEach(el => io.observe(el));

    // Cursor grow/shrink
    const grow = () => { if (curRef.current) { curRef.current.style.width = '14px'; curRef.current.style.height = '14px'; } if (cur2Ref.current) { cur2Ref.current.style.width = '56px'; cur2Ref.current.style.height = '56px'; cur2Ref.current.style.borderColor = 'rgba(200,169,110,0.6)'; } };
    const shrink = () => { if (curRef.current) { curRef.current.style.width = '8px'; curRef.current.style.height = '8px'; } if (cur2Ref.current) { cur2Ref.current.style.width = '36px'; cur2Ref.current.style.height = '36px'; cur2Ref.current.style.borderColor = 'rgba(200,169,110,0.35)'; } };
    const els = document.querySelectorAll('a,button,.interactive');
    els.forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink); });

    return () => { document.removeEventListener('mousemove', onMove); window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);

  return (
    <>
      <div id="cur" ref={curRef} /><div id="cur2" ref={cur2Ref} /><div id="prog" />

      {/* NAV */}
      <nav className={`site-nav ${navSolid ? 'solid' : ''}`}>
        <div className="nav-left">
          <Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{ height: 26, width: 'auto', opacity: 0.85 }} />
          <span className="nav-wordmark">KHG · Dr. Dorsey</span>
        </div>
        <div className="nav-links-desktop">
          {[['#manifesto','Founder'],['#hscroll','Divisions'],['#brands','Universe'],['#cities','Cities'],['#vault','Legacy'],['#close','Contact']].map(([href, label]) => (
            <a key={label} href={href} className="nav-link">{label}</a>
          ))}
        </div>
        <button className="nav-mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menu">
          <span className={`hamburger ${mobileMenu ? 'open' : ''}`} />
        </button>
      </nav>

      {mobileMenu && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenu(false)}>
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            {[['#manifesto','Founder'],['#hscroll','Divisions'],['#brands','Universe'],['#cities','Cities'],['#vault','Legacy'],['#close','Contact']].map(([href, label]) => (
              <a key={label} href={href} className="mobile-menu-link" onClick={() => setMobileMenu(false)}>{label}</a>
            ))}
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="hero-section">
        <video autoPlay muted loop playsInline onLoadedData={() => setHeroVidLoaded(true)} className={`hero-video ${heroVidLoaded ? 'loaded' : ''}`}>
          <source src={dorseyAssets.nightlifeVideo} type="video/mp4" />
          <source src="/videos/hero-animation.mp4" type="video/mp4" />
        </video>
        <div className="hero-gradient-1" /><div className="hero-gradient-2" /><div className="hero-grain" />
        <div className="hero-grid"><svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}><line x1="0" y1="300" x2="1400" y2="300" stroke="#C8A96E" strokeWidth="0.3" /><line x1="0" y1="600" x2="1400" y2="600" stroke="#C8A96E" strokeWidth="0.15" /><line x1="350" y1="0" x2="350" y2="900" stroke="#C8A96E" strokeWidth="0.2" /><line x1="900" y1="0" x2="900" y2="900" stroke="#C8A96E" strokeWidth="0.15" /><circle cx="900" cy="300" r="200" stroke="#C8A96E" strokeWidth="0.3" fill="none" /><circle cx="900" cy="300" r="80" stroke="#C8A96E" strokeWidth="0.2" fill="none" /><circle cx="900" cy="300" r="4" fill="#C8A96E" opacity="0.5" /></svg></div>
        <div className="hero-bg-numeral">I</div>
        <div className="hero-counter">001 / 012 — EMPIRE HQ</div>
        <div className="hero-content">
          <div className={`hero-eyebrow ${heroReady ? 'in' : ''}`}><span className="hero-eyebrow-line" /><span>The Kollective Hospitality Group · Est. by Dr. Dorsey</span></div>
          <h1 className={`hero-headline ${heroReady ? 'in' : ''}`}>The Architecture<br />of a Modern<br /><em>Empire</em></h1>
          <p className={`hero-sub ${heroReady ? 'in' : ''}`}>A founder-led multi-brand ecosystem spanning hospitality, nightlife, events, food & beverage, museums, products, media, and technology across 8 cities and 50+ ventures.</p>
          <div className={`hero-ctas ${heroReady ? 'in' : ''}`}>
            <a href="#hscroll" className="cta-primary interactive">Enter the Ecosystem</a>
            <a href="#close" className="cta-ghost interactive">Partner With Us</a>
          </div>
        </div>
        <div className={`hero-scroll-indicator ${heroReady ? 'in' : ''}`}><div className="scroll-line" /><span>Scroll</span></div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap"><div className="marquee-track">{[...MARQUEE, ...MARQUEE].map((name, i) => (<span key={i} className="marquee-item">{name}<span className="marquee-dot">·</span></span>))}</div></div>

      {/* FOUNDER */}
      <section id="manifesto" className="section-founder">
        <div className="founder-bg-text">FOUNDER</div>
        <div className="founder-grid">
          <div className="founder-left">
            <div className="rev">
              <span className="section-counter">002 — The Founder</span>
              <h2 className="founder-heading">Dr. Dorsey is not<br />building <em>brands.</em><br />He is building<br /><em>infrastructure.</em></h2>
            </div>
            <p className="rev founder-body">Every venture is a node in a larger system. Events generate attention. Food and beverage create physical space. Products extend the ecosystem beyond geography. Technology automates at scale. Museums preserve culture. Each division feeds the others — and the whole is designed to compound.</p>
            <p className="rev founder-body-sub">The Kollective Hospitality Group is not a portfolio. It is a machine — engineered by a single founder with a systems-first operating philosophy, powered by 198 AI agents across 34 departments, and expanding into 8+ cities simultaneously.</p>
          </div>
          <div className="founder-right rev">
            <div className="founder-quote-card">
              <Img src={dorseyAssets.quotes[quoteIdx]} alt="Quote" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.8s ease' }} />
              <div className="founder-quote-counter">{String(quoteIdx + 1).padStart(2, '0')} / {String(dorseyAssets.quotes.length).padStart(2, '0')}</div>
            </div>
            <div className="founder-pillars">
              {[{n:'001',t:'Vision',d:'Long-view thinking across every venture, category, and city.'},{n:'002',t:'Culture',d:'Brands rooted in authentic experience and community identity.'},{n:'003',t:'Systems',d:'198 agents. 34 departments. Infrastructure that scales.'},{n:'004',t:'Ownership',d:'Equity through enterprise. Property designed for long-term value.'}].map(p => (
                <div key={p.n} className="pillar-item interactive"><span className="pillar-num">{p.n}</span><div><div className="pillar-title">{p.t}</div><div className="pillar-desc">{p.d}</div></div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL */}
      <div id="hscroll" ref={hscrollRef} style={{ height: `${SLIDES.length * 100}vh`, position: 'relative' }}>
        <div className="hscroll-sticky">
          <div className="hscroll-dots">{SLIDES.map((_, i) => (<div key={i} className={`hscroll-dot ${slideIdx === i ? 'active' : ''}`} />))}</div>
          <div className="hscroll-track" ref={trackRef}>
            {SLIDES.map((s, i) => (
              <div key={i} className="hscroll-slide"><div className="hscroll-slide-inner">
                <div className="hscroll-slide-left">
                  <span className="section-counter">{s.num} — {s.ey.split(' · ')[0]}</span>
                  <div className="hscroll-eyebrow">{s.ey}</div>
                  <h2 className="hscroll-heading">{s.h.split('\n').map((line, li) => (<span key={li}>{line}<br /></span>))}</h2>
                  <p className="hscroll-desc">{s.p}</p>
                  <div className="hscroll-tags">{s.tags.map(t => <span key={t} className="hscroll-tag">{t}</span>)}</div>
                </div>
                <div className="hscroll-slide-right"><SlideVisual type={s.vis} /></div>
              </div></div>
            ))}
          </div>
        </div>
      </div>

      {/* BRANDS */}
      <section id="brands" className="section-brands">
        <div className="brands-bg-text">UNIVERSE</div>
        <div className="brands-header rev">
          <div><span className="section-counter">008 — Brand Universe</span><h2 className="brands-heading">The<br />Kollective<br /><em>Universe</em></h2></div>
          <div className="brands-filter">
            {(['all', 'flagship', 'active', 'seasonal', 'dev', 'legacy'] as const).map(f => (
              <button key={f} onClick={() => setBrandFilter(f)} className={`filter-btn interactive ${brandFilter === f ? 'active' : ''}`} style={brandFilter === f && f !== 'all' ? { borderColor: statusColors[f as BrandStatus] } : {}}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                {f !== 'all' && <span className="filter-dot" style={{ background: statusColors[f as BrandStatus] }} />}
              </button>
            ))}
          </div>
        </div>
        <div className="brands-masonry rev">
          {filteredBrands.map(b => (
            <div key={b.name} className="brand-card interactive">
              <div className="brand-card-header">
                {(b.logo || b.flyer) && <div className="brand-card-img"><Img src={b.flyer || b.logo || ''} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
                <div className="brand-card-status" style={{ background: statusColors[b.status] }} />
              </div>
              <div className="brand-card-info"><div className="brand-card-name">{b.name}</div><div className="brand-card-div">{b.division}</div></div>
              {b.website && <a href={b.website} target="_blank" rel="noopener noreferrer" className="brand-card-link">Visit →</a>}
            </div>
          ))}
        </div>
      </section>

      {/* CITIES */}
      <section id="cities" className="section-cities">
        <div className="cities-header rev"><span className="section-counter">009 — Geographic Reach</span><h2 className="cities-heading">8 cities.<br /><em>One system.</em></h2></div>
        <div className="cities-grid rev">
          {CITIES.map(c => (
            <div key={c.name} className="city-card interactive">
              <div className="city-status-dot" style={{ background: c.active ? '#6FA86F' : 'rgba(200,169,110,0.3)' }} />
              <div className="city-name">{c.name}</div><div className="city-state">{c.state}</div><div className="city-label">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VAULT */}
      <section id="vault" className="section-vault">
        <div className="vault-bg-text">ARCHIVE</div>
        <div className="vault-header rev">
          <div><span className="section-counter">010 — Legacy Vault</span><h2 className="vault-heading">Past ventures.<br /><em>Permanent proof.</em></h2></div>
          <p className="vault-desc">The legacy archive documents the concepts, campaigns, and brand experiments that shaped the evolution of the ecosystem.</p>
        </div>
        <div className="vault-timeline rev">
          {LEGACY.map(entry => (
            <div key={entry.name} className="vault-entry interactive">
              <div className="vault-year">{entry.year}</div>
              <div className="vault-line"><div className="vault-dot" /></div>
              <div><div className="vault-name">{entry.name}</div><div className="vault-division">{entry.div}</div></div>
              <div className="vault-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* PIPELINE */}
      <section className="section-pipeline">
        <div className="pipeline-header rev">
          <div><span className="section-counter">011 — In Development</span><h2 className="pipeline-heading">The next<br />chapter is<br /><em>already</em><br />in motion</h2></div>
          <p className="pipeline-desc">Beyond current operations, The Kollective continues to build and incubate new concepts across hospitality, products, experiences, media, and digital platforms.</p>
        </div>
        <div className="pipeline-grid rev">
          {PIPELINE.map(p => (
            <div key={p.name} className="pipeline-card interactive">
              <div className="pipeline-stage">{p.stage}</div><h3 className="pipeline-name">{p.name}</h3>
              <p className="pipeline-card-desc">{p.desc}</p>
              <div className="pipeline-tags">{p.tags.map(t => <span key={t} className="pipeline-tag">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNER */}
      <section className="section-partner">
        <div className="partner-grid rev">
          <div className="partner-left">
            <span className="section-counter">012 — Partnership</span>
            <h2 className="partner-heading">Partner<br />across the<br /><em>ecosystem</em></h2>
            <p className="partner-body">The Kollective Hospitality Group is structured for partnership. Sponsorships, venue activations, licensing, co-branded experiences, media, and strategic growth relationships.</p>
            <a href="mailto:thekollectiveworldwide@gmail.com?subject=Partnership Inquiry" className="cta-primary interactive" style={{ marginTop: 48 }}>Begin a Conversation</a>
          </div>
          <div className="partner-right">
            {PARTNER_TYPES.map(pt => (
              <a key={pt.title} href={`mailto:thekollectiveworldwide@gmail.com?subject=${encodeURIComponent(pt.title + ' Inquiry — KHG')}`} className="partner-type interactive">
                <div className="partner-type-content"><span className="partner-type-icon">{pt.icon}</span><div><h4 className="partner-type-title">{pt.title}</h4><p className="partner-type-desc">{pt.desc}</p></div></div>
                <div className="partner-type-arrow">→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="close" className="section-contact">
        <div className="contact-glow" />
        <div className="contact-watermark"><Img src={dorseyAssets.kollectiveGoldWhite} alt="" style={{ width: 400, height: 'auto', opacity: 0.03 }} /></div>
        <div className="contact-content">
          <span className="section-counter rev">013 — Enter the Ecosystem</span>
          <h2 className="contact-heading rev">{"Let's"}<br /><em>build</em><br />together</h2>
          <div className="contact-ctas rev">
            <a href="mailto:thekollectiveworldwide@gmail.com?subject=General Inquiry" className="cta-primary interactive">Get in Touch</a>
            <a href="https://instagram.com/thekollectiveworldwide" target="_blank" rel="noopener noreferrer" className="cta-ghost interactive">@thekollectiveworldwide</a>
          </div>
          <div className="contact-email rev">thekollectiveworldwide@gmail.com</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-left"><Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{ height: 18, width: 'auto', opacity: 0.4 }} /><span className="footer-wordmark">The Kollective Hospitality Group</span></div>
        <div className="footer-links">
          <a href="https://instagram.com/thekollectiveworldwide" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="mailto:thekollectiveworldwide@gmail.com?subject=Press Inquiry">Press</a>
          <a href="mailto:thekollectiveworldwide@gmail.com?subject=Partnership Deck Request">Partner Deck</a>
        </div>
        <div className="footer-copy">© 2026 Dr. Dorsey · Atlanta, GA · All Rights Reserved</div>
      </footer>
    </>
  );
}
