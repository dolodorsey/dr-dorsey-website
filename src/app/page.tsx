'use client';
import { useEffect, useRef, useState } from 'react';
import { brands, statusColors, casperBrands, dorseyAssets, eventShowcase, productShots, ffMerch, type BrandStatus } from './data/brands';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';

const MARQUEE_ITEMS = [
  'HugLife Events','Forever Futbol Museum','Casper Group','Good Times App',
  'Mind Studio','Infinity Water','Pronto Energy','NOIR','Taste of Art',
  'REMIX','Gangsta Gospel','WRST BHVR','The Kulture','Rule Radar',
  'Umbrella Group','ICONIC','Underground King','Soul Sessions','Cravings','Stella',
];

const SLIDES = [
  { num:'003', eyebrow:'Current Focus · Flagship', heading:'Where the\nenergy is\nconcentrated\nnow', desc:'Six divisions receiving the heaviest strategic investment and operational push across the KHG ecosystem in 2026.', tags:['HugLife Events','Forever Futbol','Casper Group','Good Times','Mind Studio'], visual:'stats' },
  { num:'004', eyebrow:'Division One · Events & Experiences', heading:'15+ event\nbrands.\nOne engine.', desc:'HugLife Events is the flagship events operation — curating nightlife, cultural, and entertainment experiences across Atlanta, Houston, Miami, Dallas, and beyond.', tags:['NOIR','Taste of Art','REMIX','Gangsta Gospel','WRST BHVR','The Kulture','Soul Sessions','Underground King'], visual:'events' },
  { num:'005', eyebrow:'Division Two · F&B & Culture', heading:'Spaces that\nfeed and\ninspire', desc:'Casper Group operates multi-concept food and beverage venues with an active prospect pipeline across 15 cities. Forever Futbol is an immersive museum destination.', tags:['Casper Group','Forever Futbol','Living Legends','Bodegea Archive'], visual:'food' },
  { num:'006', eyebrow:'Division Three · Products & Technology', heading:'Physical.\nDigital.\nBoth.', desc:'Infinity Water and Pronto Energy lead consumer products. The technology stack includes Good Times, Rule Radar, UTube University, Mission 365, Mind Studio — all built in-house.', tags:['Infinity Water','Pronto Energy','Good Times App','Rule Radar','Mission 365'], visual:'products' },
  { num:'007', eyebrow:'Division Four · Services & Future', heading:'The next\nchapter is\nalready\nmoving', desc:'Umbrella Group manages services and operational support. The pipeline includes political intelligence, education tech, wellness expansion, and new city market entries.', tags:['Umbrella Group','Mind Studio','Politics Platform','NYC Expansion','Living Legends'], visual:'future' },
];

const STATS = [{n:'50+',l:'Active Brands'},{n:'8',l:'Cities'},{n:'15+',l:'Event Brands'},{n:'198',l:'AI Agents'}];
const CITIES = [{name:'Atlanta, GA',label:'Flagship'},{name:'Houston, TX',label:'Active'},{name:'Miami, FL',label:'Active'},{name:'Los Angeles, CA',label:'Expanding'},{name:'Washington D.C.',label:'Active'},{name:'Dallas, TX',label:'Active'},{name:'New York, NY',label:'Pipeline'},{name:'Scottsdale, AZ',label:'Active'}];
const APPS = [{name:'Good Times',status:'v2.0 Live'},{name:'Mind Studio',status:'Active'},{name:'Rule Radar',status:'Building'},{name:'UTube University',status:'Dev'},{name:'Mission 365',status:'Dev'},{name:'S.O.S',status:'Active'}];
const PIPELINE = [
  {stage:'In Development',name:'UTube University',desc:'Digital education platform built around the KHG knowledge base and the entrepreneurial ecosystem.',cities:['Digital','National']},
  {stage:'Building',name:'Rule Radar',desc:'Legal intelligence platform surfacing jurisdiction-specific compliance and regulatory intelligence.',cities:['Multi-State','B2B']},
  {stage:'In Development',name:'Mission 365',desc:'Productivity and accountability platform designed for the entrepreneurial operating model.',cities:['App','Consumer']},
  {stage:'Concept Stage',name:'Politics Platform',desc:'Civic intelligence and engagement platform. Category and structure in active scoping phase.',cities:['National']},
  {stage:'Expanding',name:'City Market Entry',desc:'Structured expansion across New York, Phoenix, Scottsdale, and additional markets now scoped.',cities:['NY','Phoenix','+More']},
  {stage:'Incubating',name:'Living Legends Museum',desc:'Cultural experience destination celebrating legacy figures across sports, music, and entertainment.',cities:['Venue TBD']},
];
const LEGACY = [{year:'2024',name:"Sunday's Best",div:'Events · Multi-City'},{year:'2023',name:'Paparazzi',div:'Events · Atlanta'},{year:'2023',name:'Bodegea',div:'F&B Concept'},{year:'2022',name:'Scented Flowers',div:'Lifestyle Brand'},{year:'2022',name:'On Call · Roadside',div:'Services Apps · Pivoting'},{year:'2021',name:'Early HugLife Concepts',div:'Events · Foundation Era'}];
const PARTNER_TYPES = [
  {title:'Sponsorship',desc:'Align with HugLife, Forever Futbol, and 50+ brands across 8 cities'},
  {title:'Venue Partnership',desc:'Activate your space through KHG event programming and F&B'},
  {title:'Investment & Strategic',desc:'Growth capital, licensing, co-development, or operational partnership'},
  {title:'Media & Press',desc:'Press requests, founder profile, media kit, editorial coverage'},
  {title:'Co-Brand & Collab',desc:'Creative, product, and experiential collaborations'},
  {title:'Distribution',desc:'Retail and wholesale for Infinity Water, Pronto Energy, and future products'},
];

function Img({ src, alt, style, className }: { src: string; alt: string; style?: React.CSSProperties; className?: string }) {
  const [err, setErr] = useState(false);
  if (err || !src) return null;
  return <img src={src} alt={alt} style={style} className={className} onError={() => setErr(true)} loading="lazy" />;
}

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

  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(i => (i + 1) % dorseyAssets.quotes.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let mx = 0, my = 0, cx = 0, cy = 0;
    const moveCursor = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; if (curRef.current) { curRef.current.style.left = mx+'px'; curRef.current.style.top = my+'px'; } };
    const animCursor = () => { cx+=(mx-cx)*0.12; cy+=(my-cy)*0.12; if(cur2Ref.current){cur2Ref.current.style.left=cx+'px';cur2Ref.current.style.top=cy+'px';} requestAnimationFrame(animCursor); };
    document.addEventListener('mousemove',moveCursor); animCursor();
    const updateProgress = () => { const pct=window.scrollY/(document.body.scrollHeight-window.innerHeight)*100; const p=document.getElementById('prog'); if(p)p.style.width=pct+'%'; };
    const io = new IntersectionObserver(entries => { entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); }); }, { threshold: 0.08 });
    document.querySelectorAll('.rev, .rev-left').forEach(el => io.observe(el));
    const handleScroll = () => {
      updateProgress();
      const wrap=hscrollRef.current, track=trackRef.current;
      if(!wrap||!track)return;
      const rect=wrap.getBoundingClientRect(), wh=window.innerHeight;
      if(rect.top<=0&&rect.bottom>=wh){
        const scrolled=-rect.top, total=wrap.offsetHeight-wh;
        const pct=Math.min(1,Math.max(0,scrolled/total));
        track.style.transform=`translateX(-${pct*(SLIDES.length-1)*100}vw)`;
        setSlideIdx(Math.round(pct*(SLIDES.length-1)));
      }
    };
    window.addEventListener('scroll',handleScroll,{passive:true});
    const hoverEls=document.querySelectorAll('a,button,.interactive');
    hoverEls.forEach(el=>{
      el.addEventListener('mouseenter',()=>{if(curRef.current){curRef.current.style.width='14px';curRef.current.style.height='14px';}if(cur2Ref.current){cur2Ref.current.style.width='56px';cur2Ref.current.style.height='56px';}});
      el.addEventListener('mouseleave',()=>{if(curRef.current){curRef.current.style.width='8px';curRef.current.style.height='8px';}if(cur2Ref.current){cur2Ref.current.style.width='36px';cur2Ref.current.style.height='36px';}});
    });
    return () => { document.removeEventListener('mousemove',moveCursor); window.removeEventListener('scroll',handleScroll); io.disconnect(); };
  }, []);

  const SlideVisual = ({ type }: { type: string }) => {
    if (type==='stats') return (
      <div style={{display:'flex',flexDirection:'column',gap:0,width:220}}>
        {STATS.map(s=>(<div key={s.l} style={{padding:'20px 24px',borderLeft:'2px solid rgba(200,169,110,0.15)',marginLeft:24}}><div style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(28px,3.5vw,48px)',fontWeight:300,color:'var(--ivory)',lineHeight:1}}>{s.n}</div><div style={{fontSize:8,letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(200,169,110,0.4)',marginTop:4,fontFamily:'DM Mono,monospace'}}>{s.l}</div></div>))}
      </div>
    );
    if (type==='events') return (
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,width:320}}>
        {eventShowcase.slice(0,4).map(e=>(<div key={e.brand} style={{position:'relative',aspectRatio:'3/4',overflow:'hidden',border:'1px solid rgba(200,169,110,0.08)'}}><Img src={e.img} alt={e.brand} style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.85}} /><div style={{position:'absolute',bottom:0,left:0,right:0,padding:'16px 10px 8px',background:'linear-gradient(transparent,rgba(0,0,0,0.85))'}}><div style={{fontSize:8,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(200,169,110,0.7)',fontFamily:'DM Mono,monospace'}}>{e.brand}</div></div></div>))}
      </div>
    );
    if (type==='food') return (
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,width:300}}>
        {casperBrands.slice(0,6).map(b=>(<div key={b.name} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,padding:'12px 4px',background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,169,110,0.06)'}}><div style={{width:48,height:48,display:'flex',alignItems:'center',justifyContent:'center'}}><Img src={b.mascot||b.logo} alt={b.name} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain'}} /></div><div style={{fontSize:7,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(200,169,110,0.45)',textAlign:'center',fontFamily:'DM Mono,monospace'}}>{b.name}</div></div>))}
      </div>
    );
    if (type==='products') return (
      <div style={{display:'flex',gap:4,width:320,alignItems:'flex-end'}}>
        {productShots.pronto.slice(0,5).map((src,i)=>(<div key={i} style={{flex:1}}><Img src={src} alt={`Pronto ${i}`} style={{width:'100%',height:'auto',filter:'drop-shadow(0 4px 16px rgba(0,0,0,0.5))',transform:`translateY(${i%2===0?0:-8}px)`}} /></div>))}
      </div>
    );
    return (
      <div style={{display:'flex',flexDirection:'column',gap:0,width:220}}>
        {[{n:'34',l:'Departments'},{n:'6+',l:'Apps in Dev'},{n:'10+',l:'New Markets'}].map(s=>(<div key={s.l} style={{padding:'20px 24px',borderLeft:'2px solid rgba(200,169,110,0.15)',marginLeft:24}}><div style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(28px,3.5vw,48px)',fontWeight:300,color:'var(--ivory)',lineHeight:1}}>{s.n}</div><div style={{fontSize:8,letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(200,169,110,0.4)',marginTop:4,fontFamily:'DM Mono,monospace'}}>{s.l}</div></div>))}
      </div>
    );
  };

  return (
    <>
      <div id="cur" ref={curRef}/><div id="cur2" ref={cur2Ref}/><div id="prog"/>

      {/* NAV */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:1000,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'32px 56px'}}>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(5,5,5,0.9),transparent)',pointerEvents:'none',zIndex:-1}}/>
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{height:28,width:'auto',opacity:0.85}}/>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.5em',textTransform:'uppercase',color:'rgba(200,169,110,0.7)',fontWeight:300}}>KHG · Dr. Dorsey</div>
        </div>
        <div style={{display:'flex',gap:48,alignItems:'center'}}>
          {[['#manifesto','Founder'],['#hscroll','Divisions'],['#brands','Universe'],['#vault','Legacy'],['#close','Contact']].map(([href,label])=>(<a key={label} href={href} className="nav-link">{label}</a>))}
        </div>
      </nav>

      {/* HERO WITH VIDEO */}
      <section style={{position:'relative',height:'100vh',minHeight:800,display:'flex',flexDirection:'column',justifyContent:'flex-end',overflow:'hidden',background:'var(--void)'}}>
        <video autoPlay muted loop playsInline onLoadedData={()=>setHeroLoaded(true)} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:heroLoaded?0.35:0,transition:'opacity 2s cubic-bezier(0.16,1,0.3,1)',zIndex:1}}>
          <source src="/videos/hero-animation.mp4" type="video/mp4"/>
        </video>
        <div style={{position:'absolute',inset:0,zIndex:2,background:'radial-gradient(ellipse 90% 80% at 65% 25%,rgba(29,21,8,0.6) 0%,transparent 65%),radial-gradient(ellipse 50% 40% at 20% 70%,rgba(13,12,9,0.7) 0%,transparent 60%)'}}/>
        <div style={{position:'absolute',inset:0,zIndex:2,background:'linear-gradient(to top,var(--void) 0%,transparent 40%,transparent 60%,rgba(5,5,5,0.6) 100%)'}}/>
        <div style={{position:'absolute',inset:0,zIndex:3,opacity:0.04,backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',backgroundSize:'128px'}}/>
        <div style={{position:'absolute',inset:0,overflow:'hidden',opacity:0.06,zIndex:3}}><svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}}><line x1="0" y1="300" x2="1400" y2="300" stroke="#C8A96E" strokeWidth="0.3"/><line x1="0" y1="600" x2="1400" y2="600" stroke="#C8A96E" strokeWidth="0.15"/><line x1="300" y1="0" x2="300" y2="900" stroke="#C8A96E" strokeWidth="0.2"/><line x1="900" y1="0" x2="900" y2="900" stroke="#C8A96E" strokeWidth="0.15"/><circle cx="900" cy="300" r="200" stroke="#C8A96E" strokeWidth="0.3" fill="none"/><circle cx="900" cy="300" r="100" stroke="#C8A96E" strokeWidth="0.2" fill="none"/><circle cx="900" cy="300" r="4" fill="#C8A96E" opacity="0.6"/></svg></div>
        <div style={{position:'absolute',right:'-0.05em',bottom:'-0.15em',fontFamily:'Playfair Display,serif',fontSize:'clamp(200px,40vw,600px)',fontWeight:300,color:'rgba(200,169,110,0.03)',lineHeight:1,pointerEvents:'none',zIndex:3}}>I</div>
        <div style={{position:'absolute',top:'50%',right:60,transform:'translateY(-50%)',fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.2em',color:'rgba(200,169,110,0.25)',writingMode:'vertical-rl',zIndex:4}}>001 / 012 — EMPIRE HQ</div>
        <div style={{position:'relative',zIndex:10,padding:'0 56px 72px'}}>
          <div style={{display:'flex',alignItems:'center',gap:20,marginBottom:28,opacity:0,animation:'fadeRight 1s 0.4s cubic-bezier(0.16,1,0.3,1) forwards'}}><div style={{width:48,height:1,background:'var(--gold)',opacity:0.6}}/><span style={{fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.45em',textTransform:'uppercase',color:'rgba(200,169,110,0.7)'}}>The Kollective Hospitality Group · Est. by Dr. Dorsey</span></div>
          <h1 style={{fontFamily:'Playfair Display,serif',fontWeight:300,fontSize:'clamp(56px,10.5vw,156px)',lineHeight:0.92,letterSpacing:'-0.025em',color:'var(--ivory)',opacity:0,animation:'heroReveal 1.4s 0.7s cubic-bezier(0.16,1,0.3,1) forwards',maxWidth:1100}}>The Architecture<span style={{display:'block',paddingLeft:'clamp(40px,7vw,120px)'}}>of a Modern</span><span style={{display:'block',paddingLeft:'clamp(80px,14vw,240px)',color:'var(--gold)',fontStyle:'italic'}}>Empire</span></h1>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginTop:56,opacity:0,animation:'fadeUp 1s 1.4s cubic-bezier(0.16,1,0.3,1) forwards'}}>
            <p style={{maxWidth:400,fontSize:13,lineHeight:2,color:'var(--muted)',fontWeight:300}}>A founder-led multi-brand ecosystem spanning hospitality, nightlife, events, food & beverage, museums, products, media, and technology across 8 cities and 50+ ventures.</p>
            <a href="#manifesto" style={{display:'flex',alignItems:'center',gap:16,textDecoration:'none'}}><div style={{width:56,height:56,borderRadius:'50%',border:'1px solid rgba(200,169,110,0.4)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="#C8A96E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg></div><span style={{fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.35em',textTransform:'uppercase',color:'rgba(242,237,227,0.5)'}}>Enter the Ecosystem</span></a>
          </div>
        </div>
        <div style={{position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:10,opacity:0,animation:'fadeIn 1s 2s forwards',zIndex:10}}><div style={{width:1,height:48,background:'linear-gradient(to bottom,rgba(200,169,110,0.5),transparent)',animation:'scrollPulse 2s ease-in-out infinite'}}/><span style={{fontFamily:'DM Mono,monospace',fontSize:7,letterSpacing:'0.4em',textTransform:'uppercase',color:'rgba(242,237,227,0.2)'}}>Scroll</span></div>
      </section>

      {/* MARQUEE */}
      <div style={{overflow:'hidden',background:'var(--void)',borderBottom:'1px solid rgba(200,169,110,0.06)',padding:'20px 0'}}><div className="marquee-track">{[...MARQUEE_ITEMS,...MARQUEE_ITEMS].map((item,i)=>(<span key={i} style={{fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.35em',textTransform:'uppercase',color:'rgba(200,169,110,0.25)',whiteSpace:'nowrap',padding:'0 48px'}}>{item}<span style={{color:'rgba(200,169,110,0.1)',padding:'0 20px'}}>·</span></span>))}</div></div>

      {/* MANIFESTO with Dorsey content */}
      <section id="manifesto" style={{position:'relative',padding:'160px 0 120px',background:'var(--void)',overflow:'hidden'}}>
        <div style={{position:'absolute',left:-80,top:100,width:360,height:360,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(200,169,110,0.04) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <div style={{position:'relative',zIndex:2,maxWidth:1200,margin:'0 auto',padding:'0 56px',display:'grid',gridTemplateColumns:'300px 1fr',gap:80,alignItems:'start'}}>
          <div className="rev-left" style={{position:'sticky',top:120}}>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.4em',textTransform:'uppercase',color:'rgba(200,169,110,0.4)',marginBottom:24}}>002 — The Founder</div>
            <div style={{marginBottom:24,padding:20,background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,169,110,0.08)'}}><Img src={dorseyAssets.logo} alt="Dr. Dorsey" style={{width:'100%',height:'auto',opacity:0.9}}/></div>
            <div style={{position:'relative',aspectRatio:'1',overflow:'hidden',border:'1px solid rgba(200,169,110,0.08)'}}>
              {dorseyAssets.quotes.map((q,i)=>(<Img key={i} src={q} alt={`Quote ${i}`} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:i===quoteIdx?1:0,transition:'opacity 1.2s cubic-bezier(0.16,1,0.3,1)'}}/>))}
            </div>
            <div style={{marginTop:24,display:'flex',justifyContent:'center'}}><Img src={dorseyAssets.kollectiveGoldBlack} alt="KHG" style={{width:80,height:'auto',opacity:0.4}}/></div>
          </div>
          <div>
            <h2 className="rev" style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(36px,5.5vw,78px)',fontWeight:300,lineHeight:0.95,letterSpacing:'-0.02em',color:'var(--ivory)',marginBottom:48}}>Dr. Dorsey is <span style={{color:'var(--gold)'}}>not building brands.</span><br/>He is building <em style={{fontStyle:'italic',color:'var(--gold)'}}>infrastructure.</em></h2>
            <div className="rev" style={{display:'flex',flexDirection:'column',gap:32}}>
              <p style={{fontSize:14,lineHeight:2,color:'var(--muted)',fontWeight:300}}>Every venture is a node in a larger system. Events generate attention. Food and beverage create physical space. Products extend the ecosystem beyond geography. Technology automates at scale. Museums preserve culture. Each division feeds the others — and the whole is designed to compound.</p>
              <p style={{fontSize:14,lineHeight:2,color:'var(--muted)',fontWeight:300}}>The Kollective Hospitality Group is not a portfolio. It is a machine — engineered by a single founder with a systems-first operating philosophy, powered by 198 AI agents across 34 departments, and expanding into 8+ cities simultaneously.</p>
            </div>
            <div className="rev" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'32px 56px',marginTop:56,paddingTop:40,borderTop:'1px solid rgba(200,169,110,0.08)'}}>
              {[{n:'001',h:'Vision',b:'Long-view thinking across every venture, category, and city — building for a decade, not a quarter.'},{n:'002',h:'Culture',b:'Brands rooted in authentic experience, community identity, and the architecture of influence.'},{n:'003',h:'Systems',b:'192 agents. 34 departments. Infrastructure that scales across 50+ brands and 8 cities simultaneously.'},{n:'004',h:'Ownership',b:'Equity through enterprise. Physical, digital, and intellectual property designed for long-term value.'}].map(p=>(<div key={p.n}><span style={{fontFamily:'DM Mono,monospace',fontSize:8,color:'rgba(200,169,110,0.3)',letterSpacing:'0.3em'}}>{p.n}</span><h4 style={{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:400,color:'var(--ivory)',margin:'8px 0',letterSpacing:'-0.01em'}}>{p.h}</h4><p style={{fontSize:12,color:'rgba(242,237,227,0.35)',lineHeight:1.8}}>{p.b}</p></div>))}
            </div>
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL DIVISIONS */}
      <div id="hscroll" ref={hscrollRef} style={{height:`${SLIDES.length*100}vh`,position:'relative',background:'var(--ink)'}}>
        <div style={{position:'sticky',top:0,height:'100vh',overflow:'hidden'}}>
          <div ref={trackRef} style={{display:'flex',width:`${SLIDES.length*100}vw`,height:'100%',transition:'transform 0.1s linear'}}>
            {SLIDES.map((s,i)=>(<div key={s.num} style={{width:'100vw',height:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'0 56px 80px',position:'relative',flexShrink:0}}>
              <div style={{position:'absolute',right:'-0.05em',bottom:'-0.1em',fontFamily:'Playfair Display,serif',fontSize:'min(28vw,420px)',color:'rgba(200,169,110,0.025)',fontWeight:300,lineHeight:1,pointerEvents:'none'}}>{s.num}</div>
              <div style={{position:'absolute',top:40,right:56,fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.35em',textTransform:'uppercase',color:'rgba(200,169,110,0.3)'}}>{s.eyebrow}</div>
              <div style={{display:'flex',gap:24,marginBottom:20}}>{SLIDES.map((_,si)=>(<button key={si} style={{width:si===i?40:16,height:2,background:si===i?'var(--gold)':'rgba(200,169,110,0.15)',border:'none',cursor:'pointer',transition:'all 0.4s'}}/>))}</div>
              <div style={{width:'100%',display:'grid',gridTemplateColumns:'1fr auto',gap:60,alignItems:'end'}}>
                <div><h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(40px,6.5vw,100px)',fontWeight:300,color:'var(--ivory)',lineHeight:0.95,letterSpacing:'-0.02em',whiteSpace:'pre-line',marginBottom:24}}>{s.heading}</h2><p style={{fontSize:13,color:'var(--muted)',lineHeight:1.9,maxWidth:480,marginBottom:24}}>{s.desc}</p><div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{s.tags.map(t=>(<span key={t} style={{padding:'6px 16px',border:'1px solid rgba(200,169,110,0.15)',fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(200,169,110,0.5)'}}>{t}</span>))}</div></div>
                <SlideVisual type={s.visual}/>
              </div>
            </div>))}
          </div>
        </div>
      </div>

      {/* EVENT SHOWCASE */}
      <section style={{background:'var(--void)',padding:'120px 0',overflow:'hidden'}}>
        <div className="rev" style={{padding:'0 56px',marginBottom:60}}><span style={{fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.45em',textTransform:'uppercase',color:'rgba(200,169,110,0.5)',display:'block',marginBottom:12}}>006 — Event Portfolio</span><h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(36px,5.5vw,80px)',fontWeight:300,color:'var(--ivory)',letterSpacing:'-0.02em',lineHeight:0.95}}>The experience<br/><em style={{color:'var(--gold)',fontStyle:'italic'}}>engine</em></h2></div>
        <div className="rev" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:2,padding:'0 2px'}}>
          {eventShowcase.map(e=>(<div key={e.brand} className="interactive" style={{position:'relative',aspectRatio:'3/4',overflow:'hidden',cursor:'pointer'}}><Img src={e.img} alt={e.brand} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.8s cubic-bezier(0.16,1,0.3,1)'}}/><div style={{position:'absolute',inset:0,background:'linear-gradient(transparent 50%,rgba(0,0,0,0.8))',transition:'opacity 0.4s'}}/><div style={{position:'absolute',bottom:0,left:0,right:0,padding:'24px 20px'}}><div style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(16px,1.8vw,24px)',fontWeight:300,color:'var(--ivory)',marginBottom:4}}>{e.brand}</div><div style={{fontFamily:'DM Mono,monospace',fontSize:7,letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(200,169,110,0.6)'}}>HugLife Events</div></div></div>))}
        </div>
      </section>

      {/* CASPER GROUP */}
      <section style={{background:'var(--ink)',padding:'120px 56px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',right:'-5%',top:'10%',width:400,height:400,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(94,31,36,0.08) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <div className="rev" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'start',marginBottom:80}}>
          <div><span style={{fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.45em',textTransform:'uppercase',color:'rgba(200,169,110,0.5)',display:'block',marginBottom:12}}>007 — Casper Group</span><h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(36px,5.5vw,80px)',fontWeight:300,color:'var(--ivory)',letterSpacing:'-0.02em',lineHeight:0.95}}>Nine concepts.<br/>One <em style={{color:'var(--gold)',fontStyle:'italic'}}>kitchen.</em></h2></div>
          <div style={{display:'flex',alignItems:'center',gap:20}}><Img src={`${SB}/casper_group/logos/casper-logo-white.png`} alt="Casper" style={{height:48,width:'auto',opacity:0.7}}/><p style={{fontSize:13,color:'var(--muted)',lineHeight:1.9}}>Multi-concept food and beverage empire with 9 unique restaurant brands, each with their own identity, mascot, and culinary vision.</p></div>
        </div>
        <div className="rev" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:2}}>
          {casperBrands.map(b=>(<div key={b.name} className="interactive" style={{padding:'40px 32px',background:'rgba(255,255,255,0.015)',border:'1px solid rgba(200,169,110,0.06)',display:'flex',gap:20,alignItems:'center',cursor:'pointer',transition:'all 0.35s'}}>
            <div style={{width:64,height:64,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.03)',borderRadius:4,overflow:'hidden'}}><Img src={b.logo} alt={b.name} style={{maxWidth:'90%',maxHeight:'90%',objectFit:'contain'}}/></div>
            <div style={{flex:1}}><div style={{fontFamily:'Playfair Display,serif',fontSize:18,fontWeight:400,color:'rgba(242,237,227,0.8)',marginBottom:4}}>{b.name}</div><div style={{fontSize:8,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(200,169,110,0.35)',fontFamily:'DM Mono,monospace'}}>Casper Group</div></div>
            {b.mascot&&<div style={{width:56,height:56,flexShrink:0}}><Img src={b.mascot} alt={`${b.name} mascot`} style={{width:'100%',height:'100%',objectFit:'contain',filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.4))'}}/></div>}
          </div>))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section style={{background:'var(--void)',padding:'120px 56px',overflow:'hidden'}}>
        <div className="rev" style={{marginBottom:80}}><span style={{fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.45em',textTransform:'uppercase',color:'rgba(200,169,110,0.5)',display:'block',marginBottom:12}}>007.5 — Products</span><h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(36px,5.5vw,80px)',fontWeight:300,color:'var(--ivory)',letterSpacing:'-0.02em',lineHeight:0.95}}>Beyond <em style={{color:'var(--gold)',fontStyle:'italic'}}>hospitality</em></h2></div>
        <div className="rev" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40}}>
          <div style={{background:'rgba(255,255,255,0.015)',border:'1px solid rgba(200,169,110,0.06)',padding:'48px 40px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,right:0,bottom:0,width:'50%',opacity:0.15,background:'radial-gradient(ellipse at right,rgba(200,36,36,0.3),transparent 70%)'}}/>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.4em',textTransform:'uppercase',color:'rgba(200,169,110,0.4)',marginBottom:20}}>Pronto Energy</div>
            <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:24}}>{productShots.pronto.map((src,i)=>(<div key={i} style={{width:52}}><Img src={src} alt={`Pronto ${i}`} style={{width:'100%',height:'auto',filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.5))'}}/></div>))}</div>
            <div style={{textAlign:'center'}}><Img src={productShots.prontoLineup} alt="All flavors" style={{width:'100%',maxWidth:400,height:'auto',margin:'0 auto',filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.4))'}}/></div>
            <p style={{fontSize:12,color:'var(--muted)',lineHeight:1.8,marginTop:24,textAlign:'center'}}>7 flavors. Zero sugar. Full energy. Available for distribution partnerships.</p>
          </div>
          <div style={{background:'rgba(255,255,255,0.015)',border:'1px solid rgba(200,169,110,0.06)',padding:'48px 40px'}}>
            <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:32}}><Img src={`${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png`} alt="FF" style={{height:40,width:'auto',opacity:0.7}}/><div style={{fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.4em',textTransform:'uppercase',color:'rgba(200,169,110,0.4)'}}>Forever Futbol · Merch</div></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>{ffMerch.map((src,i)=>(<div key={i} style={{aspectRatio:'1',overflow:'hidden',border:'1px solid rgba(200,169,110,0.06)'}}><Img src={src} alt={`FF Merch ${i}`} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>))}</div>
            <p style={{fontSize:12,color:'var(--muted)',lineHeight:1.8,marginTop:24,textAlign:'center'}}>Limited edition museum collection. Soccer heritage meets streetwear culture.</p>
          </div>
        </div>
      </section>

      {/* BRAND UNIVERSE with logos */}
      <section id="brands" style={{background:'var(--coal)',padding:'120px 0 0'}}>
        <div className="rev" style={{padding:'0 56px',marginBottom:80,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
          <div><span style={{fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.45em',textTransform:'uppercase',color:'rgba(200,169,110,0.5)',display:'block',marginBottom:12}}>008 — Brand Universe</span><h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(36px,5.5vw,80px)',fontWeight:300,color:'var(--ivory)',letterSpacing:'-0.02em',lineHeight:0.95}}>The full portfolio</h2></div>
          <div style={{display:'flex'}}>{([['all','All'],['flagship','Flagship'],['active','Active'],['seasonal','Seasonal'],['legacy','Legacy'],['dev','Pipeline']] as [BrandStatus|'all',string][]).map(([f,label])=>(<button key={f} onClick={()=>setBrandFilter(f)} style={{padding:'10px 24px',border:'1px solid rgba(200,169,110,0.1)',borderRight:f==='dev'?'1px solid rgba(200,169,110,0.1)':'none',background:brandFilter===f?'rgba(200,169,110,0.08)':'transparent',color:brandFilter===f?'var(--gold)':'rgba(242,237,227,0.3)',fontFamily:'DM Sans,sans-serif',fontSize:8,letterSpacing:'0.25em',textTransform:'uppercase',cursor:'pointer',transition:'all 0.3s',borderColor:brandFilter===f?'rgba(200,169,110,0.25)':'rgba(200,169,110,0.1)'}}>{label}</button>))}</div>
        </div>
        <div className="brands-masonry" style={{padding:'0 56px'}}>
          {filteredBrands.map((b,i)=>(<a key={b.name} href={b.website||'#'} target={b.website?'_blank':undefined} rel="noopener noreferrer" className="interactive" style={{breakInside:'avoid',marginBottom:1,padding:'20px',background:b.featured?'rgba(200,169,110,0.05)':'rgba(255,255,255,0.015)',border:b.featured?'1px solid rgba(200,169,110,0.15)':'1px solid rgba(200,169,110,0.04)',cursor:'pointer',position:'relative',transition:'border-color 0.35s',textDecoration:'none',display:'flex',alignItems:'center',gap:14}}>
            <div style={{position:'absolute',top:16,right:16,width:5,height:5,borderRadius:'50%',background:statusColors[b.status]}}/>
            {(b.logo||b.flyer)&&<div style={{width:36,height:36,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',borderRadius:2}}><Img src={b.logo||b.flyer||''} alt={b.name} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain',opacity:0.75}}/></div>}
            <div><div style={{fontFamily:'Playfair Display,serif',fontSize:15,fontWeight:400,color:'rgba(242,237,227,0.8)',marginBottom:4,lineHeight:1.2}}>{b.name}</div><div style={{fontSize:8,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(200,169,110,0.35)'}}>{b.division}{b.website?' · Live':''}</div></div>
          </a>))}
        </div>
        <div style={{padding:'40px 56px',borderTop:'1px solid rgba(200,169,110,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:1}}>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:9,color:'rgba(200,169,110,0.35)',letterSpacing:'0.2em'}}>{filteredBrands.length} ventures · {brandFilter}</div>
          <div style={{display:'flex',gap:24}}>{([['flagship','#C8A96E'],['active','rgba(111,168,111,0.8)'],['seasonal','rgba(111,143,168,0.8)'],['legacy','rgba(138,118,80,0.5)'],['dev','rgba(168,111,111,0.7)']] as [string,string][]).map(([s,c])=>(<div key={s} style={{display:'flex',alignItems:'center',gap:8,fontSize:8,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(242,237,227,0.25)'}}><div style={{width:5,height:5,borderRadius:'50%',background:c}}/>{s}</div>))}</div>
        </div>
      </section>

      {/* EMPIRE NUMBERS */}
      <section style={{background:'var(--ink)',padding:'100px 56px',overflow:'hidden'}}>
        <div className="rev" style={{marginBottom:80,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}><div><span style={{fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.45em',textTransform:'uppercase',color:'rgba(200,169,110,0.5)',display:'block',marginBottom:12}}>009 — Built at Scale</span><h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(32px,5vw,72px)',fontWeight:300,color:'var(--ivory)',letterSpacing:'-0.02em',lineHeight:1}}>The numbers<br/>behind the <em style={{color:'var(--gold)'}}>empire</em></h2></div></div>
        <div className="rev">{[[{n:'50+',l:'Ventures Across Ecosystem'},{n:'8',l:'Cities & Markets'},{n:'15+',l:'Event Brands Active'}],[{n:'198',l:'AI Agents in Operation'},{n:'34',l:'Internal Departments'},{n:'6+',l:'Apps Built & Deployed'}]].map((row,ri)=>(<div key={ri} style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid rgba(200,169,110,0.06)',borderTop:ri===0?'1px solid rgba(200,169,110,0.06)':undefined}}>{row.map(item=>(<div key={item.l} className="interactive" style={{flex:1,padding:'48px 0 48px 40px',borderRight:'1px solid rgba(200,169,110,0.06)',cursor:'pointer',transition:'background 0.3s'}}><div style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(52px,7vw,110px)',fontWeight:300,color:'var(--ivory)',lineHeight:1,letterSpacing:'-0.03em'}}>{item.n}</div><div style={{fontSize:8,letterSpacing:'0.35em',textTransform:'uppercase',color:'rgba(200,169,110,0.4)',marginTop:8,fontFamily:'DM Mono,monospace'}}>{item.l}</div></div>))}</div>))}</div>
      </section>

      {/* LEGACY VAULT */}
      <section id="vault" style={{background:'#080706',padding:'120px 56px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',right:'-0.02em',top:'50%',transform:'translateY(-50%)',fontFamily:'Playfair Display,serif',fontSize:'min(38vw,600px)',color:'rgba(200,169,110,0.018)',fontWeight:300,pointerEvents:'none',letterSpacing:'-0.06em',whiteSpace:'nowrap',lineHeight:1}}>ARCHIVE</div>
        <div className="rev" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:80}}>
          <div><div style={{fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.4em',textTransform:'uppercase',color:'rgba(200,169,110,0.4)',marginBottom:12}}>010 — Legacy Vault</div><h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(36px,6vw,90px)',fontWeight:300,color:'var(--ivory)',letterSpacing:'-0.02em',lineHeight:1}}>Past ventures.<br/><em style={{color:'var(--gold)'}}>Permanent proof.</em></h2></div>
          <div style={{maxWidth:280,fontSize:12,color:'rgba(242,237,227,0.3)',lineHeight:1.8,textAlign:'right'}}>The legacy archive documents the concepts, campaigns, and brand experiments that shaped the evolution of the ecosystem.</div>
        </div>
        <div className="rev">{LEGACY.map(entry=>(<div key={entry.name} className="interactive" style={{display:'grid',gridTemplateColumns:'80px 1px 1fr',gap:'0 32px',padding:'28px 0',borderBottom:'1px solid rgba(200,169,110,0.06)',cursor:'pointer'}}><div style={{fontFamily:'DM Mono,monospace',fontSize:9,color:'rgba(200,169,110,0.3)',letterSpacing:'0.1em',alignSelf:'center'}}>{entry.year}</div><div style={{background:'rgba(200,169,110,0.12)',position:'relative'}}><div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:6,height:6,borderRadius:'50%',background:'#080706',border:'1px solid rgba(200,169,110,0.3)'}}/></div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(18px,2vw,28px)',fontWeight:300,color:'rgba(242,237,227,0.7)'}}>{entry.name}</div><div style={{display:'flex',gap:24,alignItems:'center'}}><div style={{fontSize:8,letterSpacing:'0.25em',textTransform:'uppercase',color:'rgba(200,169,110,0.3)'}}>{entry.div}</div><div style={{fontSize:14,color:'rgba(200,169,110,0.2)'}}>→</div></div></div></div>))}</div>
      </section>

      {/* PIPELINE */}
      <section style={{background:'var(--void)',padding:'120px 56px'}}>
        <div className="rev" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,alignItems:'end',marginBottom:80}}>
          <div><span style={{fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.45em',textTransform:'uppercase',color:'rgba(200,169,110,0.5)',display:'block',marginBottom:12}}>011 — In Development</span><h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(36px,6vw,88px)',fontWeight:300,color:'var(--ivory)',lineHeight:0.95,letterSpacing:'-0.02em'}}>The next<br/>chapter is<br/><em style={{color:'var(--gold)'}}>already</em><br/>in motion</h2></div>
          <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.9,maxWidth:400}}>Beyond current operations, The Kollective continues to build and incubate new concepts across hospitality, products, experiences, media, and digital platforms.</p>
        </div>
        <div className="rev" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,background:'rgba(200,169,110,0.06)'}}>{PIPELINE.map(p=>(<div key={p.name} className="interactive" style={{background:'var(--void)',padding:'40px 32px',position:'relative',overflow:'hidden',cursor:'pointer',transition:'background 0.4s'}}><div style={{fontFamily:'DM Mono,monospace',fontSize:7,letterSpacing:'0.4em',textTransform:'uppercase',color:'rgba(200,169,110,0.4)',marginBottom:20}}>{p.stage}</div><h3 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(20px,2.2vw,30px)',fontWeight:300,color:'var(--ivory)',marginBottom:14,lineHeight:1.2}}>{p.name}</h3><p style={{fontSize:12,color:'rgba(242,237,227,0.35)',lineHeight:1.8,marginBottom:28}}>{p.desc}</p><div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{p.cities.map(c=>(<span key={c} style={{padding:'4px 12px',border:'1px solid rgba(200,169,110,0.15)',fontFamily:'DM Mono,monospace',fontSize:7,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(200,169,110,0.4)'}}>{c}</span>))}</div></div>))}</div>
      </section>

      {/* PARTNER */}
      <section style={{background:'var(--coal)',padding:'120px 56px'}}>
        <div className="rev" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'start'}}>
          <div><h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(36px,5.5vw,80px)',fontWeight:300,lineHeight:0.95,letterSpacing:'-0.02em',color:'var(--ivory)',marginBottom:40}}>Partner<br/>across the<br/><em style={{color:'var(--gold)',fontStyle:'italic'}}>ecosystem</em></h2><p style={{fontSize:13,color:'var(--muted)',lineHeight:1.9,maxWidth:400,marginBottom:48}}>The Kollective Hospitality Group is structured for partnership. Sponsorships, venue activations, licensing, co-branded experiences, media, and strategic growth relationships.</p><a href="#close" className="partner-cta" style={{display:'inline-flex',alignItems:'center',gap:16,padding:'16px 40px',border:'1px solid var(--gold)',color:'var(--gold)',fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.35em',textTransform:'uppercase',textDecoration:'none',position:'relative',overflow:'hidden'}}><span>Begin a Conversation</span></a></div>
          <div style={{display:'flex',flexDirection:'column',gap:1}}>{PARTNER_TYPES.map(pt=>(<div key={pt.title} className="interactive" style={{padding:'28px 32px',background:'rgba(255,255,255,0.015)',border:'1px solid rgba(200,169,110,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',transition:'all 0.3s'}}><div><h4 style={{fontFamily:'Playfair Display,serif',fontSize:18,fontWeight:400,color:'rgba(242,237,227,0.7)',marginBottom:4}}>{pt.title}</h4><p style={{fontSize:11,color:'rgba(242,237,227,0.28)',lineHeight:1.6}}>{pt.desc}</p></div><div style={{fontSize:14,color:'rgba(200,169,110,0.2)',marginLeft:24}}>→</div></div>))}</div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="close" style={{background:'var(--void)',padding:'160px 56px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:600,height:600,borderRadius:'50%',background:'radial-gradient(ellipse at center,rgba(200,169,110,0.05) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',opacity:0.04,pointerEvents:'none'}}><Img src={dorseyAssets.kollectiveGoldWhite} alt="" style={{width:400,height:'auto'}}/></div>
        <span className="rev" style={{display:'block',fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.5em',textTransform:'uppercase',color:'rgba(200,169,110,0.4)',marginBottom:32,position:'relative',zIndex:1}}>012 — Enter the Ecosystem</span>
        <h2 className="rev" style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(52px,10vw,150px)',fontWeight:300,color:'var(--ivory)',lineHeight:0.9,letterSpacing:'-0.03em',marginBottom:48,position:'relative',zIndex:1}}>{"Let's"}<br/><em style={{color:'var(--gold)'}}>build</em><br/>together</h2>
        <div className="rev" style={{display:'flex',gap:0,justifyContent:'center',marginBottom:80,flexWrap:'wrap',position:'relative',zIndex:1}}>{['Sponsorship','Venue Partnership','Investment','Media / Press','Brand Collab','Founder Appearance','General'].map((label,i,arr)=>(<button key={label} style={{padding:'14px 28px',border:'1px solid rgba(200,169,110,0.1)',borderRight:i===arr.length-1?'1px solid rgba(200,169,110,0.1)':'none',background:'transparent',color:'rgba(242,237,227,0.3)',fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.25em',textTransform:'uppercase',cursor:'pointer',transition:'all 0.3s'}}>{label}</button>))}</div>
        <div className="rev" style={{position:'relative',zIndex:1}}><p style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(16px,2vw,26px)',fontWeight:300,color:'rgba(242,237,227,0.2)',marginBottom:8}}>Or reach out directly</p><p style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(20px,3vw,40px)',fontWeight:300,color:'rgba(200,169,110,0.6)',letterSpacing:'-0.01em',cursor:'pointer'}}>thekollectiveworldwide.com</p></div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:'40px 56px',borderTop:'1px solid rgba(200,169,110,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:16}}><Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{height:20,width:'auto',opacity:0.4}}/><div style={{fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.5em',textTransform:'uppercase',color:'rgba(200,169,110,0.3)'}}>The Kollective Hospitality Group</div></div>
        <div style={{display:'flex',gap:40,alignItems:'center'}}>{['Instagram','Press Kit','Partner Deck'].map(l=>(<span key={l} style={{fontFamily:'DM Mono,monospace',fontSize:7,letterSpacing:'0.25em',textTransform:'uppercase',color:'rgba(242,237,227,0.2)',cursor:'pointer'}}>{l}</span>))}</div>
        <div style={{fontFamily:'DM Mono,monospace',fontSize:7,letterSpacing:'0.2em',color:'rgba(242,237,227,0.15)'}}>© 2026 Dr. Dorsey · Atlanta, GA · All Rights Reserved</div>
      </footer>
    </>
  );
}
