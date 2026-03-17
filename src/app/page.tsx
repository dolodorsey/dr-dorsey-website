'use client';
import { useEffect, useRef, useState } from 'react';
import { brands, statusColors, type BrandStatus } from './data/brands';

const MARQUEE_ITEMS = [
  'HugLife Events','Forever Futbol Museum','Casper Group','Good Times App',
  'Mind Studio','Infinity Water','Pronto Energy','NOIR','Taste of Art',
  'REMIX','Gangsta Gospel','WRST BHVR','The Kulture','Rule Radar',
  'Umbrella Group','ICONIC','Underground King','Soul Sessions',
];

const SLIDES = [
  {
    num:'003', eyebrow:'Current Focus · Flagship', heading:'Where the\nenergy is\nconcentrated\nnow',
    desc:'Six divisions receiving the heaviest strategic investment and operational push across the KHG ecosystem in 2026.',
    tags:['HugLife Events','Forever Futbol','Casper Group','Good Times','Mind Studio'],
    visual:'stats',
  },
  {
    num:'004', eyebrow:'Division One · Events & Experiences', heading:'15+ event\nbrands.\nOne engine.',
    desc:'HugLife Events is the flagship events operation — curating nightlife, cultural, and entertainment experiences across Atlanta, Houston, Miami, Dallas, and beyond.',
    tags:['NOIR','Taste of Art','REMIX','Gangsta Gospel','WRST BHVR','The Kulture','Soul Sessions','Underground King'],
    visual:'brands',
  },
  {
    num:'005', eyebrow:'Division Two · F&B & Culture', heading:'Spaces that\nfeed and\ninspire',
    desc:'Casper Group operates multi-concept food and beverage venues with an active prospect pipeline across 15 cities. Forever Futbol is an immersive museum destination.',
    tags:['Casper Group','Forever Futbol','Living Legends','Bodegea Archive'],
    visual:'cities',
  },
  {
    num:'006', eyebrow:'Division Three · Products & Technology', heading:'Physical.\nDigital.\nBoth.',
    desc:'Infinity Water and Pronto Energy lead consumer products. The technology stack includes Good Times, Rule Radar, UTube University, Mission 365, Mind Studio — all built in-house.',
    tags:['Infinity Water','Pronto Energy','Good Times App','Rule Radar','Mission 365'],
    visual:'apps',
  },
  {
    num:'007', eyebrow:'Division Four · Services & Future', heading:'The next\nchapter is\nalready\nmoving',
    desc:'Umbrella Group manages services and operational support. The pipeline includes political intelligence, education tech, wellness expansion, and new city market entries.',
    tags:['Umbrella Group','Mind Studio','Politics Platform','NYC Expansion','Living Legends'],
    visual:'future',
  },
];

const STATS = [
  {n:'50+',l:'Active Brands'},{n:'8',l:'Cities'},{n:'15+',l:'Event Brands'},{n:'198',l:'AI Agents'},
];

const CITIES = [
  {name:'Atlanta, GA',label:'Flagship'},{name:'Houston, TX',label:'Active'},{name:'Miami, FL',label:'Active'},
  {name:'Los Angeles, CA',label:'Expanding'},{name:'Washington D.C.',label:'Active'},
  {name:'Dallas, TX',label:'Active'},{name:'New York, NY',label:'Pipeline'},{name:'Scottsdale, AZ',label:'Active'},
];

const APPS = [
  {name:'Good Times',status:'v2.0 Live'},{name:'Mind Studio',status:'Active'},
  {name:'Rule Radar',status:'Building'},{name:'UTube University',status:'Dev'},
  {name:'Mission 365',status:'Dev'},{name:'S.O.S',status:'Active'},
];

const BRAND_PAIRS = [
  ['NOIR','REMIX'],['Taste of Art','WRST BHVR'],['Gangsta Gospel','The Kulture'],
];

const PIPELINE = [
  {stage:'In Development',name:'UTube University',desc:'Digital education platform built around the KHG knowledge base and the entrepreneurial ecosystem.',cities:['Digital','National']},
  {stage:'Building',name:'Rule Radar',desc:'Legal intelligence platform surfacing jurisdiction-specific compliance and regulatory intelligence.',cities:['Multi-State','B2B']},
  {stage:'In Development',name:'Mission 365',desc:'Productivity and accountability platform designed for the entrepreneurial operating model.',cities:['App','Consumer']},
  {stage:'Concept Stage',name:'Politics Platform',desc:'Civic intelligence and engagement platform. Category and structure in active scoping phase.',cities:['National']},
  {stage:'Expanding',name:'City Market Entry',desc:'Structured expansion across New York, Phoenix, Scottsdale, and additional markets now scoped.',cities:['NY','Phoenix','+More']},
  {stage:'Incubating',name:'Living Legends Museum',desc:'Cultural experience destination celebrating legacy figures across sports, music, and entertainment.',cities:['Venue TBD']},
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
  {title:'Sponsorship',desc:'Align with HugLife, Forever Futbol, and 50+ brands across 8 cities'},
  {title:'Venue Partnership',desc:'Activate your space through KHG event programming and F&B'},
  {title:'Investment & Strategic',desc:'Growth capital, licensing, co-development, or operational partnership'},
  {title:'Media & Press',desc:'Press requests, founder profile, media kit, editorial coverage'},
  {title:'Co-Brand & Collab',desc:'Creative, product, and experiential collaborations'},
  {title:'Distribution',desc:'Retail and wholesale for Infinity Water, Pronto Energy, and future products'},
];

export default function Home() {
  const [brandFilter, setBrandFilter] = useState<BrandStatus | 'all'>('all');
  const [slideIdx, setSlideIdx] = useState(0);
  const hscrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);
  const cur2Ref = useRef<HTMLDivElement>(null);

  const filteredBrands = brandFilter === 'all' ? brands : brands.filter(b => b.status === brandFilter);

  useEffect(() => {
    // Cursor
    let mx = 0, my = 0, cx = 0, cy = 0;
    const moveCursor = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (curRef.current) { curRef.current.style.left = mx + 'px'; curRef.current.style.top = my + 'px'; }
    };
    const animCursor = () => {
      cx += (mx - cx) * 0.12; cy += (my - cy) * 0.12;
      if (cur2Ref.current) { cur2Ref.current.style.left = cx + 'px'; cur2Ref.current.style.top = cy + 'px'; }
      requestAnimationFrame(animCursor);
    };
    document.addEventListener('mousemove', moveCursor);
    animCursor();

    // Progress bar
    const updateProgress = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      const prog = document.getElementById('prog');
      if (prog) prog.style.width = pct + '%';
    };

    // Reveal on scroll
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.rev, .rev-left').forEach(el => io.observe(el));

    // Horizontal scroll
    const handleScroll = () => {
      updateProgress();
      const wrap = hscrollRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const rect = wrap.getBoundingClientRect();
      const wh = window.innerHeight;
      if (rect.top <= 0 && rect.bottom >= wh) {
        const scrolled = -rect.top;
        const total = wrap.offsetHeight - wh;
        const pct = Math.min(1, Math.max(0, scrolled / total));
        const slideCount = SLIDES.length;
        const maxShift = (slideCount - 1) * 100;
        track.style.transform = `translateX(-${pct * maxShift}vw)`;
        setSlideIdx(Math.round(pct * (slideCount - 1)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cursor hover effect
    const hoverEls = document.querySelectorAll('a, button, .interactive');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (curRef.current) { curRef.current.style.width = '14px'; curRef.current.style.height = '14px'; }
        if (cur2Ref.current) { cur2Ref.current.style.width = '56px'; cur2Ref.current.style.height = '56px'; }
      });
      el.addEventListener('mouseleave', () => {
        if (curRef.current) { curRef.current.style.width = '8px'; curRef.current.style.height = '8px'; }
        if (cur2Ref.current) { cur2Ref.current.style.width = '36px'; cur2Ref.current.style.height = '36px'; }
      });
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
      io.disconnect();
    };
  }, []);

  const scrollToSlide = (i: number) => {
    if (!hscrollRef.current) return;
    const wrapTop = hscrollRef.current.offsetTop;
    const vh = window.innerHeight;
    const totalScroll = hscrollRef.current.offsetHeight - vh;
    const t = wrapTop + (totalScroll / SLIDES.length) * i;
    window.scrollTo({ top: t, behavior: 'smooth' });
  };

  const SlideVisual = ({ type }: { type: string }) => {
    if (type === 'stats') return (
      <div style={{ display:'flex', flexDirection:'column', gap:0, width:220 }}>
        {STATS.map(s => (
          <div key={s.l} style={{ padding:'20px 24px', borderLeft:'2px solid rgba(200,169,110,0.15)', marginLeft:24 }}>
            <div style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,3.5vw,48px)', fontWeight:300, color:'var(--ivory)', lineHeight:1 }}>{s.n}</div>
            <div style={{ fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase' as const, color:'rgba(200,169,110,0.4)', marginTop:4, fontFamily:'DM Mono,monospace' }}>{s.l}</div>
          </div>
        ))}
      </div>
    );
    if (type === 'brands') return (
      <div style={{ display:'flex', flexDirection:'column', gap:1, width:280 }}>
        {BRAND_PAIRS.map(([a,b]) => (
          <div key={a} style={{ display:'flex', gap:1 }}>
            {[a,b].map(n => (
              <div key={n} style={{ flex:1, padding:'14px 16px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(200,169,110,0.06)' }}>
                <div style={{ fontSize:9, color:'rgba(242,237,227,0.5)', marginBottom:4 }}>{n}</div>
                <div style={{ fontSize:7, letterSpacing:'0.2em', textTransform:'uppercase' as const, color:'rgba(200,169,110,0.3)' }}>Events</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
    if (type === 'cities') return (
      <div style={{ display:'flex', flexDirection:'column', gap:2, width:260 }}>
        {CITIES.map(c => (
          <div key={c.name} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:'1px solid rgba(200,169,110,0.06)' }}>
            <div style={{ width:5, height:5, borderRadius:'50%', background:'var(--gold)', opacity:0.6, flexShrink:0 }} />
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:9, color:'rgba(242,237,227,0.5)', flex:1 }}>{c.name}</div>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:8, color:'rgba(200,169,110,0.35)' }}>{c.label}</div>
          </div>
        ))}
      </div>
    );
    if (type === 'apps') return (
      <div style={{ display:'flex', flexDirection:'column', gap:2, width:240 }}>
        {APPS.map(a => (
          <div key={a.name} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background:'rgba(255,255,255,0.015)', border:'1px solid rgba(200,169,110,0.05)' }}>
            <div style={{ fontSize:9, color:'rgba(242,237,227,0.55)' }}>{a.name}</div>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:7, letterSpacing:'0.2em', textTransform:'uppercase' as const, color:'rgba(200,169,110,0.4)' }}>{a.status}</div>
          </div>
        ))}
      </div>
    );
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:0, width:220 }}>
        {[{n:'34',l:'Departments'},{n:'6+',l:'Apps in Dev'},{n:'10+',l:'New Markets'}].map(s => (
          <div key={s.l} style={{ padding:'20px 24px', borderLeft:'2px solid rgba(200,169,110,0.15)', marginLeft:24 }}>
            <div style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,3.5vw,48px)', fontWeight:300, color:'var(--ivory)', lineHeight:1 }}>{s.n}</div>
            <div style={{ fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase' as const, color:'rgba(200,169,110,0.4)', marginTop:4, fontFamily:'DM Mono,monospace' }}>{s.l}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div id="cur" ref={curRef} />
      <div id="cur2" ref={cur2Ref} />
      <div id="prog" />

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'32px 56px' }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(5,5,5,0.9),transparent)', pointerEvents:'none', zIndex:-1 }} />
        <div style={{ fontFamily:'DM Mono,monospace', fontSize:8, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(200,169,110,0.7)', fontWeight:300 }}>KHG · Dr. Dorsey</div>
        <div style={{ display:'flex', gap:48, alignItems:'center' }}>
          {[['#manifesto','Founder'],['#hscroll','Divisions'],['#brands','Universe'],['#vault','Legacy'],['#close','Contact']].map(([href,label]) => (
            <a key={label} href={href} className="nav-link">{label}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position:'relative', height:'100vh', minHeight:800, display:'flex', flexDirection:'column', justifyContent:'flex-end', overflow:'hidden', background:'var(--void)' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 90% 80% at 65% 25%,#1d1508 0%,transparent 65%),radial-gradient(ellipse 50% 40% at 20% 70%,#0d0c09 0%,transparent 60%)' }} />
        {/* Architectural lines */}
        <div style={{ position:'absolute', inset:0, overflow:'hidden', opacity:0.06 }}>
          <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" style={{ width:'100%', height:'100%' }}>
            <line x1="0" y1="300" x2="1400" y2="300" stroke="#C8A96E" strokeWidth="0.3"/>
            <line x1="0" y1="600" x2="1400" y2="600" stroke="#C8A96E" strokeWidth="0.15"/>
            <line x1="300" y1="0" x2="300" y2="900" stroke="#C8A96E" strokeWidth="0.2"/>
            <line x1="900" y1="0" x2="900" y2="900" stroke="#C8A96E" strokeWidth="0.15"/>
            <circle cx="900" cy="300" r="200" stroke="#C8A96E" strokeWidth="0.3" fill="none"/>
            <circle cx="900" cy="300" r="100" stroke="#C8A96E" strokeWidth="0.2" fill="none"/>
            <circle cx="900" cy="300" r="4" fill="#C8A96E" opacity="0.6"/>
          </svg>
        </div>
        {/* BG numeral */}
        <div style={{ position:'absolute', right:'-0.05em', bottom:'-0.15em', fontFamily:'Playfair Display,serif', fontSize:'clamp(200px,40vw,600px)', fontWeight:300, color:'rgba(200,169,110,0.04)', lineHeight:1, pointerEvents:'none', zIndex:1 }}>I</div>
        <div style={{ position:'absolute', top:'50%', right:60, transform:'translateY(-50%)', fontFamily:'DM Mono,monospace', fontSize:9, letterSpacing:'0.2em', color:'rgba(200,169,110,0.25)', writingMode:'vertical-rl' }}>001 / 008 — EMPIRE HQ</div>

        <div style={{ position:'relative', zIndex:10, padding:'0 56px 72px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:28, opacity:0, animation:'fadeRight 1s 0.4s cubic-bezier(0.16,1,0.3,1) forwards' }}>
            <div style={{ width:48, height:1, background:'var(--gold)', opacity:0.6 }} />
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(200,169,110,0.7)' }}>The Kollective Hospitality Group · Est. by Dr. Dorsey</span>
          </div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontWeight:300, fontSize:'clamp(56px,10.5vw,156px)', lineHeight:0.92, letterSpacing:'-0.025em', color:'var(--ivory)', opacity:0, animation:'heroReveal 1.4s 0.7s cubic-bezier(0.16,1,0.3,1) forwards', maxWidth:1100 }}>
            The Architecture
            <span style={{ display:'block', paddingLeft:'clamp(40px,7vw,120px)' }}>of a Modern</span>
            <span style={{ display:'block', paddingLeft:'clamp(80px,14vw,240px)', color:'var(--gold)', fontStyle:'italic' }}>Empire</span>
          </h1>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:56, opacity:0, animation:'fadeUp 1s 1.4s cubic-bezier(0.16,1,0.3,1) forwards' }}>
            <p style={{ maxWidth:400, fontSize:13, lineHeight:2, color:'var(--muted)', fontWeight:300 }}>A founder-led multi-brand ecosystem spanning hospitality, nightlife, events, food & beverage, museums, products, media, and technology across 8 cities and 50+ ventures.</p>
            <a href="#manifesto" style={{ display:'flex', alignItems:'center', gap:16, textDecoration:'none' }}>
              <div style={{ width:56, height:56, borderRadius:'50%', border:'1px solid rgba(200,169,110,0.4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="#C8A96E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontFamily:'DM Mono,monospace', fontSize:9, letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(242,237,227,0.5)' }}>Enter the Ecosystem</span>
            </a>
          </div>
        </div>
        <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:10, opacity:0, animation:'fadeIn 1s 2s forwards' }}>
          <div style={{ width:1, height:48, background:'linear-gradient(to bottom,rgba(200,169,110,0.5),transparent)', animation:'scrollPulse 2s ease-in-out infinite' }} />
          <span style={{ fontFamily:'DM Mono,monospace', fontSize:7, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(242,237,227,0.2)' }}>Scroll</span>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background:'var(--gold)', padding:'14px 0', overflow:'hidden', whiteSpace:'nowrap' }}>
        <div style={{ display:'inline-flex', animation:'marquee 22s linear infinite' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ fontFamily:'DM Mono,monospace', fontSize:9, letterSpacing:'0.4em', textTransform:'uppercase', color:'#050505', padding:'0 40px' }}>
              {item}
              {i < MARQUEE_ITEMS.length * 2 - 1 && <span style={{ opacity:0.3, marginLeft:40 }}>·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* MANIFESTO */}
      <section id="manifesto" style={{ position:'relative', padding:'160px 0 120px', background:'var(--void)', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:'Playfair Display,serif', fontSize:'clamp(80px,18vw,280px)', color:'rgba(200,169,110,0.025)', fontWeight:300, whiteSpace:'nowrap', pointerEvents:'none', letterSpacing:'-0.05em', fontStyle:'italic' }}>Empire</div>
        <div style={{ position:'relative', zIndex:2, maxWidth:1200, margin:'0 auto', padding:'0 56px', display:'grid', gridTemplateColumns:'280px 1fr', gap:80, alignItems:'start' }}>
          <div className="rev-left" style={{ position:'sticky', top:120 }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:9, color:'rgba(200,169,110,0.35)', letterSpacing:'0.2em', marginBottom:16 }}>002</div>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:9, letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(200,169,110,0.6)' }}>The Founder</div>
            <div style={{ width:40, height:1, background:'var(--gold)', opacity:0.4, marginTop:16 }} />
          </div>
          <div>
            <p className="rev" style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,3.8vw,56px)', fontWeight:300, lineHeight:1.25, color:'var(--ivory)' }}>
              Dr. Dorsey is <span style={{ color:'var(--gold)' }}>not building brands.</span>
              <span style={{ color:'rgba(242,237,227,0.35)' }}><br />He is building an architecture.</span>
              <br />A connected enterprise where hospitality, culture,
              <br /><span style={{ color:'var(--gold)' }}>products, and technology</span>
              <span style={{ color:'rgba(242,237,227,0.35)' }}> operate as distinct</span>
              <br />worlds under a unified growth vision.
            </p>
            <div className="rev" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px 56px', marginTop:56, paddingTop:40, borderTop:'1px solid rgba(200,169,110,0.08)' }}>
              {[{n:'001',h:'Vision',b:'Long-view thinking across every venture, category, and city — building for a decade, not a quarter.'},{n:'002',h:'Culture',b:'Brands rooted in authentic experience, community identity, and the architecture of influence.'},{n:'003',h:'Systems',b:'192 agents. 34 departments. Infrastructure that scales across 50+ brands and 8 cities simultaneously.'},{n:'004',h:'Ownership',b:'Equity through enterprise. Physical, digital, and intellectual property designed for long-term value.'}].map(p => (
                <div key={p.h}>
                  <div style={{ fontFamily:'DM Mono,monospace', fontSize:8, color:'rgba(200,169,110,0.3)', letterSpacing:'0.15em', marginBottom:10 }}>{p.n}</div>
                  <div style={{ fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:8, fontWeight:400 }}>{p.h}</div>
                  <p style={{ fontSize:12, color:'rgba(242,237,227,0.38)', lineHeight:1.8 }}>{p.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL DIVISIONS */}
      <div id="hscroll" ref={hscrollRef} style={{ height:`${SLIDES.length * 100}vh`, position:'relative', background:'var(--ink)' }}>
        <div style={{ position:'sticky', top:0, height:'100vh', overflow:'hidden' }}>
          <div ref={trackRef} className="hscroll-track" style={{ transform:'translateX(0)' }}>
            {SLIDES.map((slide, i) => (
              <div key={i} style={{ flexShrink:0, width:'100vw', height:'100%', position:'relative', display:'flex', alignItems:'flex-end', padding:60, background: i%2===0 ? 'linear-gradient(135deg,#0d0b08,#110f0a)' : 'linear-gradient(135deg,#080b0d,#0a0d11)' }}>
                <div style={{ position:'absolute', top:56, left:60, fontFamily:'DM Mono,monospace', fontSize:9, color:'rgba(200,169,110,0.25)', letterSpacing:'0.2em' }}>{slide.num}</div>
                {/* Slide nav dots */}
                <div style={{ position:'absolute', top:56, right:60, display:'flex', gap:8 }}>
                  {SLIDES.map((_,j) => (
                    <button key={j} onClick={() => scrollToSlide(j)} style={{ width:20, height:1, background: j===slideIdx ? 'var(--gold)' : 'rgba(200,169,110,0.2)', border:'none', cursor:'pointer', padding:0, transition:'background 0.3s' }} />
                  ))}
                </div>
                <div style={{ width:'100%', display:'grid', gridTemplateColumns:'1fr auto', gap:60, alignItems:'end' }}>
                  <div>
                    <div style={{ fontFamily:'DM Mono,monospace', fontSize:8, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(200,169,110,0.5)', marginBottom:20, display:'flex', alignItems:'center', gap:16 }}>
                      <div style={{ width:32, height:1, background:'var(--gold)', opacity:0.4 }} />
                      {slide.eyebrow}
                    </div>
                    <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(40px,7vw,108px)', fontWeight:300, lineHeight:0.95, color:'var(--ivory)', letterSpacing:'-0.02em', marginBottom:32, whiteSpace:'pre-line' }}>
                      {slide.heading.split('\n').map((line, li) => (
                        <span key={li} style={{ display:'block', fontStyle: li===slide.heading.split('\n').length-1 && i>0 ? 'italic' : 'normal', color: li===2 && i===0 ? 'var(--gold)' : 'var(--ivory)' }}>{line}</span>
                      ))}
                    </h2>
                    <p style={{ fontSize:13, color:'var(--muted)', lineHeight:1.9, maxWidth:480, marginBottom:36 }}>{slide.desc}</p>
                    <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                      {slide.tags.map(tag => (
                        <span key={tag} style={{ padding:'5px 14px', border:'1px solid rgba(200,169,110,0.18)', fontSize:8, letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(200,169,110,0.5)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <SlideVisual type={slide.visual} />
                </div>
                <div style={{ position:'absolute', bottom:56, right:60, fontFamily:'DM Mono,monospace', fontSize:10, color:'rgba(200,169,110,0.2)', letterSpacing:'0.2em' }}>0{i+1} — 05</div>
                {/* Bottom progress */}
                <div style={{ position:'absolute', bottom:0, left:0, height:1, background:'var(--gold)', width: slideIdx===i ? '100%' : '0%', transition:'width 0.6s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BRAND UNIVERSE */}
      <section id="brands" style={{ background:'var(--coal)', padding:'120px 0 0' }}>
        <div className="rev" style={{ padding:'0 56px', marginBottom:80, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(200,169,110,0.5)', display:'block', marginBottom:12 }}>008 — Brand Universe</span>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(36px,5.5vw,80px)', fontWeight:300, color:'var(--ivory)', letterSpacing:'-0.02em', lineHeight:0.95 }}>The full portfolio</h2>
          </div>
          <div style={{ display:'flex' }}>
            {([['all','All'],['flagship','Flagship'],['active','Active'],['seasonal','Seasonal'],['legacy','Legacy'],['dev','Pipeline']] as [BrandStatus|'all',string][]).map(([f,label]) => (
              <button key={f} onClick={() => setBrandFilter(f)} style={{ padding:'10px 24px', border:'1px solid rgba(200,169,110,0.1)', borderRight: f==='dev' ? '1px solid rgba(200,169,110,0.1)' : 'none', background: brandFilter===f ? 'rgba(200,169,110,0.08)' : 'transparent', color: brandFilter===f ? 'var(--gold)' : 'rgba(242,237,227,0.3)', fontFamily:'DM Sans,sans-serif', fontSize:8, letterSpacing:'0.25em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.3s', borderColor: brandFilter===f ? 'rgba(200,169,110,0.25)' : 'rgba(200,169,110,0.1)' }}>{label}</button>
            ))}
          </div>
        </div>
        <div className="brands-masonry" style={{ padding:'0 56px' }}>
          {filteredBrands.map((b, i) => (
            <div key={b.name} className="interactive" style={{ breakInside:'avoid', marginBottom:1, padding: i%3===2 ? '24px 20px 48px' : '24px 20px', background: b.featured ? 'rgba(200,169,110,0.05)' : 'rgba(255,255,255,0.015)', border: b.featured ? '1px solid rgba(200,169,110,0.15)' : '1px solid rgba(200,169,110,0.04)', cursor:'pointer', position:'relative', transition:'border-color 0.35s' }}>
              <div style={{ position:'absolute', top:16, right:16, width:5, height:5, borderRadius:'50%', background: statusColors[b.status] }} />
              <div style={{ fontFamily:'Playfair Display,serif', fontSize:15, fontWeight:400, color:'rgba(242,237,227,0.8)', marginBottom:6, lineHeight:1.2 }}>{b.name}</div>
              <div style={{ fontSize:8, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(200,169,110,0.35)' }}>{b.division}</div>
            </div>
          ))}
        </div>
        <div style={{ padding:'40px 56px', borderTop:'1px solid rgba(200,169,110,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:1 }}>
          <div style={{ fontFamily:'DM Mono,monospace', fontSize:9, color:'rgba(200,169,110,0.35)', letterSpacing:'0.2em' }}>{filteredBrands.length} ventures · {brandFilter}</div>
          <div style={{ display:'flex', gap:24 }}>
            {([['flagship','#C8A96E'],['active','rgba(111,168,111,0.8)'],['seasonal','rgba(111,143,168,0.8)'],['legacy','rgba(138,118,80,0.5)'],['dev','rgba(168,111,111,0.7)']] as [string,string][]).map(([s,c]) => (
              <div key={s} style={{ display:'flex', alignItems:'center', gap:8, fontSize:8, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(242,237,227,0.25)' }}>
                <div style={{ width:5, height:5, borderRadius:'50%', background:c }} />{s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMPIRE NUMBERS */}
      <section style={{ background:'var(--ink)', padding:'100px 56px', overflow:'hidden' }}>
        <div className="rev" style={{ marginBottom:80, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(200,169,110,0.5)', display:'block', marginBottom:12 }}>009 — Built at Scale</span>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(32px,5vw,72px)', fontWeight:300, color:'var(--ivory)', letterSpacing:'-0.02em', lineHeight:1 }}>The numbers<br />behind the <em style={{ color:'var(--gold)' }}>empire</em></h2>
          </div>
        </div>
        <div className="rev">
          {[[{n:'50+',l:'Ventures Across Ecosystem'},{n:'8',l:'Cities & Markets'},{n:'15+',l:'Event Brands Active'}],[{n:'198',l:'AI Agents in Operation'},{n:'34',l:'Internal Departments'},{n:'6+',l:'Apps Built & Deployed'}]].map((row, ri) => (
            <div key={ri} style={{ display:'flex', justifyContent:'space-between', borderBottom:'1px solid rgba(200,169,110,0.06)', borderTop: ri===0 ? '1px solid rgba(200,169,110,0.06)' : undefined }}>
              {row.map(item => (
                <div key={item.l} className="interactive" style={{ flex:1, padding:'48px 0 48px 40px', borderRight:'1px solid rgba(200,169,110,0.06)', cursor:'pointer', transition:'background 0.3s' }}>
                  <div style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(52px,7vw,110px)', fontWeight:300, color:'var(--ivory)', lineHeight:1, letterSpacing:'-0.03em' }}>{item.n}</div>
                  <div style={{ fontSize:8, letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(200,169,110,0.4)', marginTop:8, fontFamily:'DM Mono,monospace' }}>{item.l}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* LEGACY VAULT */}
      <section id="vault" style={{ background:'#080706', padding:'120px 56px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', right:'-0.02em', top:'50%', transform:'translateY(-50%)', fontFamily:'Playfair Display,serif', fontSize:'min(38vw,600px)', color:'rgba(200,169,110,0.018)', fontWeight:300, pointerEvents:'none', letterSpacing:'-0.06em', whiteSpace:'nowrap', lineHeight:1 }}>ARCHIVE</div>
        <div className="rev" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:80 }}>
          <div>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:9, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(200,169,110,0.4)', marginBottom:12 }}>010 — Legacy Vault</div>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(36px,6vw,90px)', fontWeight:300, color:'var(--ivory)', letterSpacing:'-0.02em', lineHeight:1 }}>Past ventures.<br /><em style={{ color:'var(--gold)' }}>Permanent proof.</em></h2>
          </div>
          <div style={{ maxWidth:280, fontSize:12, color:'rgba(242,237,227,0.3)', lineHeight:1.8, textAlign:'right' }}>The legacy archive documents the concepts, campaigns, and brand experiments that shaped the evolution of the ecosystem. Past is not dead weight — it is track record.</div>
        </div>
        <div className="rev">
          {LEGACY.map(entry => (
            <div key={entry.name} className="interactive" style={{ display:'grid', gridTemplateColumns:'80px 1px 1fr', gap:'0 32px', padding:'28px 0', borderBottom:'1px solid rgba(200,169,110,0.06)', cursor:'pointer' }}>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:9, color:'rgba(200,169,110,0.3)', letterSpacing:'0.1em', alignSelf:'center' }}>{entry.year}</div>
              <div style={{ background:'rgba(200,169,110,0.12)', position:'relative' }}>
                <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:6, height:6, borderRadius:'50%', background:'#080706', border:'1px solid rgba(200,169,110,0.3)' }} />
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(18px,2vw,28px)', fontWeight:300, color:'rgba(242,237,227,0.7)' }}>{entry.name}</div>
                <div style={{ display:'flex', gap:24, alignItems:'center' }}>
                  <div style={{ fontSize:8, letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(200,169,110,0.3)' }}>{entry.div}</div>
                  <div style={{ fontSize:14, color:'rgba(200,169,110,0.2)' }}>→</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PIPELINE */}
      <section id="pipeline" style={{ background:'var(--void)', padding:'120px 56px' }}>
        <div className="rev" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'end', marginBottom:80 }}>
          <div>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(200,169,110,0.5)', display:'block', marginBottom:12 }}>011 — In Development</span>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(36px,6vw,88px)', fontWeight:300, color:'var(--ivory)', lineHeight:0.95, letterSpacing:'-0.02em' }}>The next<br />chapter is<br /><em style={{ color:'var(--gold)' }}>already</em><br />in motion</h2>
          </div>
          <p style={{ fontSize:13, color:'var(--muted)', lineHeight:1.9, maxWidth:400 }}>Beyond current operations, The Kollective continues to build and incubate new concepts across hospitality, products, experiences, media, and digital platforms.</p>
        </div>
        <div className="rev" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'rgba(200,169,110,0.06)' }}>
          {PIPELINE.map(p => (
            <div key={p.name} className="interactive" style={{ background:'var(--void)', padding:'40px 32px', position:'relative', overflow:'hidden', cursor:'pointer', transition:'background 0.4s' }}>
              <div style={{ position:'absolute', left:0, top:0, bottom:0, width:2, background:'transparent', transition:'background 0.4s' }} className="pipe-bar" />
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:7, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(200,169,110,0.4)', marginBottom:20 }}>{p.stage}</div>
              <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(20px,2.2vw,30px)', fontWeight:300, color:'var(--ivory)', marginBottom:14, lineHeight:1.2 }}>{p.name}</h3>
              <p style={{ fontSize:12, color:'rgba(242,237,227,0.35)', lineHeight:1.8, marginBottom:28 }}>{p.desc}</p>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {p.cities.map(c => (
                  <span key={c} style={{ padding:'4px 12px', border:'1px solid rgba(200,169,110,0.15)', fontFamily:'DM Mono,monospace', fontSize:7, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(200,169,110,0.4)' }}>{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNER */}
      <section style={{ background:'var(--coal)', padding:'120px 56px' }}>
        <div className="rev" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }}>
          <div>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(36px,5.5vw,80px)', fontWeight:300, lineHeight:0.95, letterSpacing:'-0.02em', color:'var(--ivory)', marginBottom:40 }}>Partner<br />across the<br /><em style={{ color:'var(--gold)', fontStyle:'italic' }}>ecosystem</em></h2>
            <p style={{ fontSize:13, color:'var(--muted)', lineHeight:1.9, maxWidth:400, marginBottom:48 }}>The Kollective Hospitality Group is structured for partnership. Sponsorships, venue activations, licensing, co-branded experiences, media, and strategic growth relationships.</p>
            <a href="#close" className="partner-cta" style={{ display:'inline-flex', alignItems:'center', gap:16, padding:'16px 40px', border:'1px solid var(--gold)', color:'var(--gold)', fontFamily:'DM Mono,monospace', fontSize:9, letterSpacing:'0.35em', textTransform:'uppercase', textDecoration:'none', position:'relative', overflow:'hidden' }}>
              <span>Begin a Conversation</span>
            </a>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
            {PARTNER_TYPES.map(pt => (
              <div key={pt.title} className="interactive" style={{ padding:'28px 32px', background:'rgba(255,255,255,0.015)', border:'1px solid rgba(200,169,110,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer', transition:'all 0.3s' }}>
                <div>
                  <h4 style={{ fontFamily:'Playfair Display,serif', fontSize:18, fontWeight:400, color:'rgba(242,237,227,0.7)', marginBottom:4 }}>{pt.title}</h4>
                  <p style={{ fontSize:11, color:'rgba(242,237,227,0.28)', lineHeight:1.6 }}>{pt.desc}</p>
                </div>
                <div style={{ fontSize:14, color:'rgba(200,169,110,0.2)', marginLeft:24 }}>→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CLOSE */}
      <section id="close" style={{ background:'var(--void)', padding:'160px 56px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:600, borderRadius:'50%', background:'radial-gradient(ellipse at center,rgba(200,169,110,0.05) 0%,transparent 70%)', pointerEvents:'none' }} />
        <span className="rev" style={{ display:'block', fontFamily:'DM Mono,monospace', fontSize:8, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(200,169,110,0.4)', marginBottom:32 }}>012 — Enter the Ecosystem</span>
        <h2 className="rev" style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(52px,10vw,150px)', fontWeight:300, color:'var(--ivory)', lineHeight:0.9, letterSpacing:'-0.03em', marginBottom:48 }}>
          {"Let's"}<br /><em style={{ color:'var(--gold)' }}>build</em><br />together
        </h2>
        <div className="rev" style={{ display:'flex', gap:0, justifyContent:'center', marginBottom:80, flexWrap:'wrap' }}>
          {['Sponsorship','Venue Partnership','Investment','Media / Press','Brand Collab','Founder Appearance','General'].map((label, i, arr) => (
            <button key={label} style={{ padding:'14px 28px', border:'1px solid rgba(200,169,110,0.1)', borderRight: i===arr.length-1 ? '1px solid rgba(200,169,110,0.1)' : 'none', background:'transparent', color:'rgba(242,237,227,0.3)', fontFamily:'DM Mono,monospace', fontSize:8, letterSpacing:'0.25em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.3s' }}>{label}</button>
          ))}
        </div>
        <div className="rev">
          <p style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(16px,2vw,26px)', fontWeight:300, color:'rgba(242,237,227,0.2)', marginBottom:8 }}>Or reach out directly</p>
          <p style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(20px,3vw,40px)', fontWeight:300, color:'rgba(200,169,110,0.6)', letterSpacing:'-0.01em', cursor:'pointer' }}>thekollectiveworldwide.com</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:'40px 56px', borderTop:'1px solid rgba(200,169,110,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontFamily:'DM Mono,monospace', fontSize:8, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(200,169,110,0.3)' }}>The Kollective Hospitality Group</div>
        <div style={{ display:'flex', gap:40, alignItems:'center' }}>
          {['Instagram','Press Kit','Partner Deck'].map(l => (
            <span key={l} style={{ fontFamily:'DM Mono,monospace', fontSize:7, letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(242,237,227,0.2)', cursor:'pointer' }}>{l}</span>
          ))}
        </div>
        <div style={{ fontFamily:'DM Mono,monospace', fontSize:7, letterSpacing:'0.2em', color:'rgba(242,237,227,0.15)' }}>© 2026 Dr. Dorsey · Atlanta, GA · All Rights Reserved</div>
      </footer>
    </>
  );
}
