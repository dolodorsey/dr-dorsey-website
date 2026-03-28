'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';
const WEB = `${SB}/dr_dorsey/website`;
const KHG_LOGO = `${SB}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;

const LOGOS = [
  { n:'HugLife', src:`${SB}/huglife_events/00-brand-assets/logos/huglife-logo-buddha-black.png`, url:'https://huglife.vercel.app' },
  { n:'Forever Futbol', src:`${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png`, url:'https://forever-futbol.vercel.app' },
  { n:'Casper', src:`${SB}/casper_group/logos/casper-white.png`, url:'https://casper-group.vercel.app' },
  { n:'Good Times', src:`${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png`, url:'https://good-times-app.vercel.app' },
  { n:'NOIR', src:`${SB}/noir_event/01_logos/NOIR_LOGO.png` },
  { n:'Pronto', src:`${SB}/pronto_energy/logos/pronto-logo.png`, url:'https://pronto-energy-website.vercel.app' },
  { n:'REMIX', src:`${SB}/remix_event/01_logos/REMIX_LOGO.png` },
  { n:'Taste of Art', src:`${SB}/taste_of_art/01_logos/TASTE_OF_ART_LOGO.png` },
];

/* Division logos added per request */
const DIVISIONS = [
  { num:'01', name:'HugLife Events', desc:'15+ event brands across nightlife, culture, food experiences, and lifestyle.', tags:['NOIR','REMIX','Taste of Art','WRST BHVR'], logo:`${SB}/huglife_events/00-brand-assets/logos/huglife-logo-buddha-black.png` },
  { num:'02', name:'Casper Group', desc:'Food & beverage empire — restaurants, bars, and culinary experiences.', tags:['Bodegea','Casper'], logo:`${SB}/casper_group/logos/casper-white.png` },
  { num:'03', name:'Forever Futbol', desc:'The world\'s first immersive futbol museum. Atlanta. May 29 — Jul 6, 2026.', tags:['Museum','ATL'], logo:`${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png` },
  { num:'04', name:'Good Times', desc:'837 venues. 10 cities. The nightlife & events discovery platform.', tags:['App','Technology'], logo:`${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png` },
  { num:'05', name:'Mind Studio', desc:'Telemed wellness MSO — clinic, consumer, and personal injury verticals.', tags:['Wellness','MSO'], logo:`${SB}/mind_studio/gt_card_mind_studio.png` },
  { num:'06', name:'Products', desc:'Consumer goods engineered for lifestyle — energy, hydration, merchandise.', tags:['Infinity Water','Pronto','Stush'], logo:`${SB}/casper_group/logos/casper-white.png` },
  { num:'07', name:'Technology', desc:'AI-first platforms — 34 departments, 198 agents, full autonomous operation.', tags:['Rule Radar','UTube U'], logo:`${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png` },
  { num:'08', name:'Services', desc:'Umbrella Group — legal, roadside, on-call infrastructure services.', tags:['Umbrella','S.O.S'], logo:`${SB}/umbrella_injury/00-brand-assets/logos/hurt-911-logo-black.png` },
];

const PILLARS = [
  { num:'01', title:'Compound Vision', body:'Every brand is designed to make the next one stronger. Events drive products, products fund technology, technology automates everything.' },
  { num:'02', title:'Build in Silence', body:'Greatness is earned in silence, not performed for an audience. The results arrive when the work is done, not when it\'s announced.' },
  { num:'03', title:'Extraordinary is the Baseline', body:'"Good enough" is disqualifying. Every output — every flyer, every event, every product — is held to a standard most people save for their best work.' },
  { num:'04', title:'Systems Over Hustle', body:'198 AI agents run 34 departments across 57+ entities. The empire doesn\'t depend on one person being in the room. It depends on the system being right.' },
];

const METRICS = [
  { val:'57+', label:'Active Ventures', desc:'Events, restaurants, museums, products, apps, and services — each with its own brand, audience, and revenue model.' },
  { val:'198', label:'AI Agents', desc:'Autonomous agents managing content, outreach, analytics, operations, and CX across every brand.' },
  { val:'34', label:'Departments', desc:'Each department has its own SOP, agent team, and quality tier — from design to legal to growth to intelligence.' },
  { val:'8', label:'Cities', desc:'Atlanta, Houston, Miami, LA, Dallas, DC, Charlotte, New York — with expansion targets already in pipeline.' },
];

/* Cities with background images */
const CITIES = [
  { name:'Atlanta', state:'Georgia', count:'25+ active brands', hq:true, bg:`${WEB}/hero-bg.jpg` },
  { name:'Houston', state:'Texas', count:'10+ brands', bg:`${WEB}/luxury-venue.jpg` },
  { name:'Miami', state:'Florida', count:'Expanding', bg:`${WEB}/rooftop-lounge.jpg` },
  { name:'Los Angeles', state:'California', count:'Active', bg:`${WEB}/penthouse-skyline.jpg` },
  { name:'Dallas', state:'Texas', count:'Active', bg:`${WEB}/garden-district.jpg` },
  { name:'Washington', state:'D.C.', count:'Active', bg:`${WEB}/thesis-bg.jpg` },
  { name:'Charlotte', state:'N. Carolina', count:'Active', bg:`${WEB}/luxury-venue.jpg` },
  { name:'New York', state:'New York', count:'Pipeline', bg:`${WEB}/rooftop-lounge.jpg` },
];

const TIMELINE = [
  { year:'THE BEGINNING', title:'First Event', desc:'One party. One idea. The realization that nightlife could be architected, not improvised.' },
  { year:'EXPANSION', title:'HugLife Events', desc:'From one brand to fifteen. NOIR, Taste of Art, REMIX, Gangsta Gospel — each its own world.' },
  { year:'DIVERSIFICATION', title:'The Kollective Forms', desc:'Events alone weren\'t the vision. F&B, products, technology, services — the multi-brand empire takes shape.' },
  { year:'CULTURE', title:'Forever Futbol Museum', desc:'The world\'s first immersive futbol museum. Culture meets sport. Atlanta, May 29 — Jul 6, 2026.' },
  { year:'AUTOMATION', title:'AI-First Infrastructure', desc:'198 agents. 34 departments. The empire runs on systems — content, outreach, operations, analytics — all autonomous.' },
  { year:'NOW', title:'57+ Ventures. 8 Cities.', desc:'The machine compounds. New brands, new cities, new technology. The next chapter is already in motion.' },
];

const MARQUEE_BRANDS = ['NOIR','HugLife','Forever Futbol','Casper Group','Good Times','REMIX','Taste of Art','Mind Studio','Pronto Energy','Infinity Water','WRST BHVR','Gangsta Gospel'];

/* ═══ HOOKS ═══ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

function useCounter(target: number, dur = 2000) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const s = performance.now();
        function up(t: number) { const p = Math.min((t-s)/dur,1); setVal(Math.floor((1-Math.pow(1-p,4))*target)); if(p<1)requestAnimationFrame(up); }
        requestAnimationFrame(up); obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el); return () => obs.disconnect();
  }, [target, dur]);
  return { ref, val };
}

function Reveal({ children, className='', delay=0, style={} }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const { ref, vis } = useReveal();
  return <div ref={ref} className={className} style={{ opacity:vis?1:0, transform:vis?'translateY(0)':'translateY(40px)', transition:`opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...style }}>{children}</div>;
}

function StatNum({ target, suffix='' }: { target:number; suffix?:string }) {
  const { ref, val } = useCounter(target);
  return <div ref={ref} className="stat-num">{val}{suffix}</div>;
}

/* ═══ COLORS ═══ */
const DARK = '#060607';
const DARK_EL = '#0C0C0E';
const LIGHT_BG = '#F5F0E8';
const LIGHT_SURFACE = '#FFFFFF';
const GOLD = '#C8A96E';
const GOLD_BRIGHT = '#D4BC8A';
const TEXT_DARK = '#1A1A1E';
const TEXT_MID = '#555555';
const TEXT_LIGHT_DIM = 'rgba(245,240,232,0.25)';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 1800); const fn = () => setScrolled(window.scrollY > 60); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn); }, []);
  useEffect(() => { const v = videoRef.current; if (!v) return; const r = () => setVideoReady(true); v.addEventListener('canplaythrough',r); v.addEventListener('playing',r); const t = setTimeout(()=>setVideoReady(true),3000); return()=>{v.removeEventListener('canplaythrough',r);v.removeEventListener('playing',r);clearTimeout(t)}; }, []);
  const scrollTo = useCallback((id:string) => { setMobOpen(false); document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); }, []);

  return (
    <>
      {/* PRELOADER */}
      <div style={{ position:'fixed',top:0,left:0,width:'100%',height:'100%',background:DARK,zIndex:10000,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',transition:'opacity 1s cubic-bezier(0.16,1,0.3,1),visibility 1s',...(loaded?{opacity:0,visibility:'hidden' as const,pointerEvents:'none' as const}:{}) }}>
        <div style={{ width:72,height:72,border:`1px solid rgba(200,169,110,0.3)`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center' }}>
          <img src={KHG_LOGO} alt="KHG" style={{ width:40,height:40,objectFit:'contain',filter:'brightness(1.2)' }} />
        </div>
      </div>

      {/* MOBILE MENU */}
      <div style={{ position:'fixed',top:0,right:mobOpen?0:'-100%',width:'100%',height:'100%',background:DARK,zIndex:999,display:'flex',flexDirection:'column',justifyContent:'center',padding:'96px clamp(20px,4vw,80px)',transition:'right 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
        {['about','empire','philosophy','cities','journey','connect'].map(id => (
          <a key={id} href={`#${id}`} style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(30px,5vw,72px)',fontWeight:300,textDecoration:'none',display:'block',padding:'16px 0',borderBottom:'1px solid rgba(245,240,232,0.08)',color:'#F5F0E8' }}
            onClick={e=>{e.preventDefault();scrollTo(id)}}>{id.charAt(0).toUpperCase()+id.slice(1)}</a>
        ))}
      </div>

      {/* NAV */}
      <nav style={{ position:'fixed',top:0,left:0,width:'100%',zIndex:1000,padding:'24px clamp(20px,4vw,80px)',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'background 0.4s,backdrop-filter 0.4s',...(scrolled?{background:'rgba(6,6,7,0.88)',backdropFilter:'blur(24px)'}:{}) }}>
        <a href="#" style={{ display:'flex',alignItems:'center',gap:12,textDecoration:'none',color:'#F5F0E8' }}>
          <div style={{ width:36,height:36,border:'1px solid rgba(200,169,110,0.3)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center' }}>
            <img src={KHG_LOGO} alt="" style={{ width:20,height:20,objectFit:'contain' }} />
          </div>
          <span style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(245,240,232,0.6)' }}>Dr. Dorsey</span>
        </a>
        <ul className="nav-links-desktop" style={{ display:'flex',gap:40,listStyle:'none' }}>
          {['about','empire','philosophy','cities','journey'].map(id => (
            <li key={id}><a href={`#${id}`} className="nav-a" style={{ fontSize:'clamp(10px,0.85vw,12px)',fontWeight:400,color:'rgba(245,240,232,0.6)',textDecoration:'none',letterSpacing:'0.15em',textTransform:'uppercase' }}
              onClick={e=>{e.preventDefault();scrollTo(id)}}>{id}</a></li>
          ))}
        </ul>
        <a href="#connect" className="nav-cta-desktop" style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.2em',textTransform:'uppercase',color:DARK,background:GOLD,padding:'10px 24px',textDecoration:'none',border:'none',cursor:'pointer' }}
          onClick={e=>{e.preventDefault();scrollTo('connect')}}>Connect</a>
        <button className="nav-toggle-mobile" style={{ display:'none',background:'none',border:'none',cursor:'pointer',width:28,height:20,position:'relative' }} onClick={()=>setMobOpen(!mobOpen)}>
          <span style={{ display:'block',width:'100%',height:1,background:'#F5F0E8',position:'absolute',left:0,top:3,transition:'all 0.3s',transform:mobOpen?'translateY(6px) rotate(45deg)':'none' }} />
          <span style={{ display:'block',width:'100%',height:1,background:'#F5F0E8',position:'absolute',left:0,top:9,transition:'all 0.3s',opacity:mobOpen?0:1 }} />
          <span style={{ display:'block',width:'100%',height:1,background:'#F5F0E8',position:'absolute',left:0,top:15,transition:'all 0.3s',transform:mobOpen?'translateY(-6px) rotate(-45deg)':'none' }} />
        </button>
      </nav>

      {/* ═══ HERO (DARK) — SMALLER HEADLINE ═══ */}
      <section style={{ minHeight:'100vh',position:'relative',overflow:'hidden',display:'flex',alignItems:'flex-end',padding:'0 clamp(20px,4vw,80px) 96px' }}>
        <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0 }}>
          <img src={`${WEB}/hero-bg.jpg`} alt="" style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.2 }} />
          <video ref={videoRef} style={{ width:'100%',height:'100%',objectFit:'cover',opacity:videoReady?0.4:0,transition:'opacity 1.5s',position:'relative',zIndex:1 }} autoPlay muted loop playsInline preload="auto">
            <source src={`${WEB}/hero-video.mp4`} type="video/mp4" />
          </video>
          <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:2,background:'radial-gradient(ellipse at 65% 25%,rgba(200,169,110,0.07) 0%,transparent 55%),radial-gradient(ellipse at 20% 80%,rgba(200,169,110,0.04) 0%,transparent 50%),linear-gradient(180deg,rgba(6,6,7,0.2) 0%,rgba(6,6,7,0.05) 40%,rgba(6,6,7,0.5) 75%,#060607 100%)' }} />
        </div>
        <div style={{ position:'relative',zIndex:3,maxWidth:1400,width:'100%' }}>
          <div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.4em',textTransform:'uppercase',color:GOLD,marginBottom:24,animation:'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 2s both' }}>Founder — CEO — Architect</div>
          {/* SMALLER hero headline per request */}
          <h1 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(36px,7vw,100px)',fontWeight:300,lineHeight:0.95,letterSpacing:'-0.03em' }}>
            <span style={{ display:'block',overflow:'hidden' }}><span style={{ display:'block',animation:'lineUp 1s cubic-bezier(0.16,1,0.3,1) 2.1s both' }}>Live for today.</span></span>
            <span style={{ display:'block',overflow:'hidden' }}><span style={{ display:'block',animation:'lineUp 1s cubic-bezier(0.16,1,0.3,1) 2.25s both' }}>Plan for <em style={{ fontStyle:'italic',color:GOLD }}>tomorrow.</em></span></span>
            <span style={{ display:'block',overflow:'hidden' }}><span style={{ display:'block',animation:'lineUp 1s cubic-bezier(0.16,1,0.3,1) 2.4s both' }}>Party <em style={{ fontStyle:'italic',color:GOLD }}>tonight.</em></span></span>
          </h1>
          <p style={{ fontSize:'clamp(13px,1.2vw,17px)',fontWeight:300,color:'rgba(245,240,232,0.6)',maxWidth:480,lineHeight:1.7,marginTop:32,animation:'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 2.7s both' }}>
            The mind behind 57+ ventures, 8 cities, and an ecosystem engineered to compound.
          </p>
          <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginTop:48,animation:'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 3s both' }}>
            <div style={{ display:'flex',gap:48 }}>
              <div><StatNum target={57} suffix="+" /><div className="stat-label">Ventures</div></div>
              <div><StatNum target={8} /><div className="stat-label">Cities</div></div>
              <div><StatNum target={198} /><div className="stat-label">AI Agents</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LOGO ROW (DARK) — UNIFORM SIZE ═══ */}
      <div style={{ padding:'48px clamp(20px,4vw,80px)',borderTop:'1px solid rgba(245,240,232,0.08)',borderBottom:'1px solid rgba(245,240,232,0.08)',background:DARK }}>
        <div style={{ maxWidth:1400,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:32,flexWrap:'wrap' }}>
          {LOGOS.map(l => (
            <a key={l.n} href={l.url||'#'} target={l.url?'_blank':undefined} rel="noopener noreferrer" className="logo-item" style={{ opacity:0.4,transition:'opacity 0.4s',flex:'0 0 auto' }}>
              {/* Uniform logo size: fixed 40px height container */}
              <div style={{ width:80,height:40,display:'flex',alignItems:'center',justifyContent:'center' }}>
                <img src={l.src} alt={l.n} style={{ maxWidth:80,maxHeight:40,width:'auto',height:'auto',objectFit:'contain',filter:'brightness(1.5)' }} />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ═══ THESIS (WHITE SECTION) ═══ */}
      <section style={{ padding:'128px clamp(20px,4vw,80px)',background:LIGHT_BG,color:TEXT_DARK }} id="about">
        <div style={{ maxWidth:1400,margin:'0 auto' }}>
          <div className="thesis-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:96,alignItems:'center' }}>
            <Reveal>
              <div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.4em',textTransform:'uppercase',color:GOLD,marginBottom:16 }}>The Founder</div>
              <blockquote style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(28px,4.5vw,64px)',fontWeight:300,lineHeight:1.2,marginBottom:40,color:TEXT_DARK }}>
                &ldquo;Everybody wants to eat at night — nobody wants to <em style={{ fontStyle:'italic',color:GOLD }}>hunt in the morning.</em>&rdquo;
              </blockquote>
              <p style={{ fontSize:'clamp(14px,1.3vw,18px)',color:TEXT_MID,lineHeight:1.8,marginBottom:24 }}>Dr. DoLo Dorsey is the founder and CEO of The Kollective Hospitality Group — a multi-brand enterprise spanning events, food &amp; beverage, museums, consumer products, technology, and wellness.</p>
              <p style={{ fontSize:'clamp(14px,1.3vw,18px)',color:TEXT_MID,lineHeight:1.8,marginBottom:40 }}>What started as a single event has compounded into an autonomous empire: 57+ entities, 34 AI-powered departments, 198 agents, 8 cities deep.</p>
              <div style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(18px,2.5vw,32px)',fontWeight:300,fontStyle:'italic',color:GOLD }}>— Dr. DoLo Dorsey</div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ position:'relative',height:500,overflow:'hidden',border:`1px solid rgba(0,0,0,0.08)` }}>
                <img src={`${WEB}/thesis-bg.jpg`} alt="Atlanta nightlife" style={{ width:'100%',height:'100%',objectFit:'cover',transition:'transform 8s cubic-bezier(0.37,0,0.63,1)' }} />
                <span style={{ position:'absolute',bottom:-12,right:40,fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase',color:'#8A7650',background:LIGHT_BG,padding:'0 16px' }}>Atlanta, GA</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ DIVISIONS (DARK) — WITH LOGOS ═══ */}
      <section style={{ padding:'128px clamp(20px,4vw,80px)',background:DARK_EL }} id="empire">
        <div style={{ maxWidth:1400,margin:'0 auto' }}>
          <Reveal><div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.4em',textTransform:'uppercase',color:GOLD,marginBottom:16 }}>The Empire</div></Reveal>
          <Reveal><h2 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(26px,4.5vw,64px)',fontWeight:300,lineHeight:1.1,marginBottom:64,color:'#F5F0E8' }}>Eight divisions. One <em style={{ fontStyle:'italic',color:GOLD }}>machine.</em></h2></Reveal>
          <Reveal delay={0.2}>
            <div className="div-grid" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:1,background:'rgba(245,240,232,0.08)',border:'1px solid rgba(245,240,232,0.08)' }}>
              {DIVISIONS.map(d => (
                <div key={d.num} className="div-card" style={{ background:DARK_EL,padding:'48px 32px',position:'relative',overflow:'hidden',cursor:'pointer',transition:'background 0.5s' }}>
                  {/* Division logo */}
                  <div style={{ width:48,height:48,marginBottom:20,display:'flex',alignItems:'center',justifyContent:'flex-start',opacity:0.5 }}>
                    <img src={d.logo} alt="" style={{ maxWidth:48,maxHeight:48,objectFit:'contain',filter:'brightness(1.3)' }} />
                  </div>
                  <div style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(40px,4vw,72px)',fontWeight:300,color:'rgba(245,240,232,0.06)',lineHeight:1,marginBottom:16,position:'absolute',top:16,right:20 }}>{d.num}</div>
                  <div style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(18px,2vw,28px)',fontWeight:400,marginBottom:8,color:'#F5F0E8' }}>{d.name}</div>
                  <div style={{ fontSize:'clamp(10px,0.85vw,12px)',color:'rgba(245,240,232,0.3)',lineHeight:1.5,marginBottom:20 }}>{d.desc}</div>
                  <div style={{ display:'flex',gap:6,flexWrap:'wrap' }}>
                    {d.tags.map(t => <span key={t} style={{ fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.15em',textTransform:'uppercase',color:GOLD,border:'1px solid rgba(200,169,110,0.3)',padding:'3px 8px' }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ IMAGE BAND ═══ */}
      <div className="img-band" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:0 }}>
        {[{src:`${WEB}/luxury-venue.jpg`,label:'Events'},{src:`${WEB}/penthouse-skyline.jpg`,label:'Hospitality'},{src:`${WEB}/rooftop-lounge.jpg`,label:'Nightlife'}].map(i => (
          <div key={i.label} style={{ position:'relative',height:'clamp(200px,30vw,400px)',overflow:'hidden' }}>
            <img src={i.src} alt={i.label} style={{ width:'100%',height:'100%',objectFit:'cover',opacity:0.6 }} />
            <span style={{ position:'absolute',bottom:24,left:24,fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase',color:GOLD,background:'rgba(6,6,7,0.7)',padding:'4px 12px',backdropFilter:'blur(8px)' }}>{i.label}</span>
          </div>
        ))}
      </div>

      {/* ═══ PHILOSOPHY (WHITE SECTION) ═══ */}
      <section style={{ padding:'128px clamp(20px,4vw,80px)',background:LIGHT_BG,color:TEXT_DARK }} id="philosophy">
        <div style={{ maxWidth:1400,margin:'0 auto' }}>
          <Reveal><div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.4em',textTransform:'uppercase',color:GOLD,marginBottom:16 }}>Operating System</div></Reveal>
          <Reveal><h2 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(26px,4.5vw,64px)',fontWeight:300,lineHeight:1.1,marginBottom:64,color:TEXT_DARK }}>The principles behind <em style={{ fontStyle:'italic',color:GOLD }}>the machine.</em></h2></Reveal>
          <div className="phil-layout" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:96 }}>
            <div>
              {PILLARS.map((p,i) => (
                <Reveal key={p.num} delay={i*0.1}>
                  <div style={{ padding:'32px 0',borderBottom:'1px solid rgba(0,0,0,0.08)',...(i===0?{borderTop:'1px solid rgba(0,0,0,0.08)'}:{}) }}>
                    <div style={{ display:'flex',alignItems:'baseline',gap:24,marginBottom:12 }}>
                      <span style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',color:GOLD,letterSpacing:'0.2em' }}>{p.num}</span>
                      <h3 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(18px,2.5vw,32px)',fontWeight:400,color:TEXT_DARK }}>{p.title}</h3>
                    </div>
                    <p style={{ fontSize:'clamp(13px,1.1vw,16px)',color:TEXT_MID,lineHeight:1.7,paddingLeft:48 }}>{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{ display:'flex',flexDirection:'column',gap:32 }}>
              {METRICS.map((m,i) => (
                <Reveal key={m.label} delay={i*0.1}>
                  <div style={{ padding:32,border:'1px solid rgba(0,0,0,0.08)',background:LIGHT_SURFACE,transition:'border-color 0.4s' }}>
                    <div style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(36px,4.5vw,60px)',fontWeight:300,color:GOLD,lineHeight:1 }}>{m.val}</div>
                    <div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase',color:TEXT_MID,marginTop:6 }}>{m.label}</div>
                    <div style={{ fontSize:'clamp(13px,1.1vw,16px)',color:TEXT_MID,marginTop:12,lineHeight:1.6 }}>{m.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FULL-BLEED QUOTE (DARK) ═══ */}
      <div style={{ position:'relative',height:'clamp(300px,45vw,500px)',overflow:'hidden' }}>
        <img src={`${WEB}/garden-district.jpg`} alt="" style={{ width:'100%',height:'100%',objectFit:'cover',opacity:0.4 }} />
        <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,#060607 0%,transparent 30%,transparent 70%,#060607 100%)',display:'flex',alignItems:'center',justifyContent:'center' }}>
          <div style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(22px,3.5vw,48px)',fontWeight:300,fontStyle:'italic',color:GOLD,textAlign:'center',maxWidth:600,padding:'0 clamp(20px,4vw,80px)',lineHeight:1.3 }}>
            &ldquo;Don&rsquo;t let lame people make you do lame shit.&rdquo;
          </div>
        </div>
      </div>

      {/* ═══ CITIES (WHITE) — WITH BACKGROUND IMAGES ═══ */}
      <section style={{ padding:'128px clamp(20px,4vw,80px)',background:LIGHT_BG,color:TEXT_DARK }} id="cities">
        <div style={{ maxWidth:1400,margin:'0 auto' }}>
          <Reveal><div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.4em',textTransform:'uppercase',color:GOLD,marginBottom:16 }}>Geography</div></Reveal>
          <Reveal><h2 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(26px,4.5vw,64px)',fontWeight:300,lineHeight:1.1,marginBottom:64,color:TEXT_DARK }}>Eight cities. One <em style={{ fontStyle:'italic',color:GOLD }}>frequency.</em></h2></Reveal>
          <Reveal delay={0.2}>
            <div className="cities-grid" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:2 }}>
              {CITIES.map(c => (
                <div key={c.name} className="city-card" style={{ position:'relative',overflow:'hidden',padding:c.hq?'64px 40px':'40px 32px',background:'#000',minHeight:c.hq?280:160,...(c.hq?{gridColumn:'span 2',gridRow:'span 2',display:'flex',flexDirection:'column',justifyContent:'flex-end'}:{}),transition:'transform 0.4s' }}>
                  {/* Background image for every city */}
                  <img src={c.bg} alt="" style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.35,transition:'opacity 0.6s,transform 6s cubic-bezier(0.37,0,0.63,1)' }} />
                  <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.6) 100%)' }} />
                  <div style={{ position:'relative',zIndex:1 }}>
                    {c.hq && <span style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.2em',textTransform:'uppercase',color:GOLD,marginBottom:16,display:'block' }}>Headquarters</span>}
                    <div style={{ fontFamily:'Cormorant Garamond,serif',fontSize:c.hq?'clamp(32px,5vw,64px)':'clamp(20px,2.5vw,32px)',fontWeight:400,color:'#F5F0E8' }}>{c.name}</div>
                    <div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase',color:GOLD }}>{c.state}</div>
                    <div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',color:'rgba(245,240,232,0.5)',marginTop:8 }}>{c.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ MARQUEE (DARK) ═══ */}
      <div style={{ padding:'48px 0',overflow:'hidden',borderTop:'1px solid rgba(245,240,232,0.08)',borderBottom:'1px solid rgba(245,240,232,0.08)',background:DARK }}>
        <div style={{ display:'flex',gap:64,animation:'mScroll 35s linear infinite',width:'max-content' }}>
          {[...MARQUEE_BRANDS,...MARQUEE_BRANDS].map((b,i) => (
            <span key={`${b}-${i}`} style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(20px,3vw,44px)',fontWeight:300,color:'rgba(245,240,232,0.25)',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:24 }}>
              <span style={{ width:6,height:6,background:GOLD,borderRadius:'50%',flexShrink:0 }} />{b}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ TIMELINE (WHITE) ═══ */}
      <section style={{ padding:'128px clamp(20px,4vw,80px)',background:LIGHT_BG,color:TEXT_DARK }} id="journey">
        <div style={{ maxWidth:1400,margin:'0 auto' }}>
          <Reveal><div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.4em',textTransform:'uppercase',color:GOLD,marginBottom:16 }}>The Journey</div></Reveal>
          <Reveal><h2 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(26px,4.5vw,64px)',fontWeight:300,lineHeight:1.1,marginBottom:64,color:TEXT_DARK }}>Built in chapters, <em style={{ fontStyle:'italic',color:GOLD }}>not overnight.</em></h2></Reveal>
          <div style={{ position:'relative',paddingLeft:96 }}>
            <div style={{ position:'absolute',top:0,left:24,width:1,height:'100%',background:`linear-gradient(180deg,${GOLD},rgba(0,0,0,0.1),transparent)` }} />
            {TIMELINE.map((t,i) => (
              <Reveal key={t.year} delay={i*0.1}>
                <div style={{ position:'relative',paddingBottom:48 }}>
                  <div style={{ position:'absolute',left:-76,top:8,width:9,height:9,border:`1px solid ${GOLD}`,borderRadius:'50%',background:LIGHT_BG }} />
                  <div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',color:GOLD,marginBottom:8 }}>{t.year}</div>
                  <div style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(18px,2.5vw,32px)',fontWeight:400,marginBottom:8,color:TEXT_DARK }}>{t.title}</div>
                  <div style={{ fontSize:'clamp(13px,1.1vw,16px)',color:TEXT_MID,maxWidth:500,lineHeight:1.6 }}>{t.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FULL-BLEED QUOTE 2 ═══ */}
      <div style={{ position:'relative',height:'clamp(250px,40vw,450px)',overflow:'hidden' }}>
        <img src={`${WEB}/penthouse-skyline.jpg`} alt="" style={{ width:'100%',height:'100%',objectFit:'cover',opacity:0.4 }} />
        <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,#060607 0%,transparent 30%,transparent 70%,#060607 100%)',display:'flex',alignItems:'center',justifyContent:'center' }}>
          <div style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(22px,3.5vw,48px)',fontWeight:300,fontStyle:'italic',color:GOLD,textAlign:'center',maxWidth:600,padding:'0 clamp(20px,4vw,80px)',lineHeight:1.3 }}>
            &ldquo;Greatness is earned in silence.&rdquo;
          </div>
        </div>
      </div>

      {/* ═══ CONNECT (DARK) ═══ */}
      <section style={{ padding:'128px clamp(20px,4vw,80px)',background:DARK,minHeight:'80vh',display:'flex',alignItems:'center',position:'relative',overflow:'hidden' }} id="connect">
        <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',opacity:0.05 }}>
          <img src={`${WEB}/rooftop-lounge.jpg`} alt="" style={{ width:'100%',height:'100%',objectFit:'cover' }} />
        </div>
        <div style={{ maxWidth:1400,margin:'0 auto',width:'100%' }}>
          <div className="connect-grid" style={{ display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:96,alignItems:'center',position:'relative' }}>
            <Reveal>
              <div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.4em',textTransform:'uppercase',color:GOLD,marginBottom:16 }}>Let&rsquo;s Build</div>
              <h2 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(30px,5vw,72px)',fontWeight:300,lineHeight:1.15,marginBottom:40,color:'#F5F0E8' }}>The ecosystem is <em style={{ fontStyle:'italic',color:GOLD }}>designed</em> for collaboration.</h2>
              <p style={{ fontSize:'clamp(14px,1.3vw,18px)',color:'rgba(245,240,232,0.6)',lineHeight:1.7,marginBottom:48,maxWidth:480 }}>Whether it&rsquo;s sponsorship, investment, venue partnership, brand collaboration, or something nobody&rsquo;s thought of yet.</p>
              <div style={{ display:'flex',gap:24,flexWrap:'wrap' }}>
                <a href="mailto:thekollectiveworldwide@gmail.com?subject=Partnership — Dr. Dorsey" style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(10px,0.85vw,12px)',letterSpacing:'0.2em',textTransform:'uppercase',color:DARK,background:GOLD,padding:'16px 40px',textDecoration:'none',border:`1px solid ${GOLD}`,display:'inline-block' }}>Start a Conversation</a>
                <a href="https://instagram.com/dolodorsey" target="_blank" rel="noopener noreferrer" style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(10px,0.85vw,12px)',letterSpacing:'0.2em',textTransform:'uppercase',color:'#F5F0E8',background:'transparent',padding:'16px 40px',textDecoration:'none',border:'1px solid rgba(245,240,232,0.25)',display:'inline-block' }}>@dolodorsey</a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                {[
                  {label:'Email',value:'thekollectiveworldwide@gmail.com',href:'mailto:thekollectiveworldwide@gmail.com'},
                  {label:'Instagram',value:'@dolodorsey',href:'https://instagram.com/dolodorsey'},
                  {label:'The Kollective',value:'@thekollectiveworldwide',href:'https://instagram.com/thekollectiveworldwide'},
                  {label:'Headquarters',value:'Atlanta, Georgia'},
                ].map(d => (
                  <div key={d.label} style={{ padding:'24px 0',borderBottom:'1px solid rgba(245,240,232,0.08)' }}>
                    <div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase',color:GOLD,marginBottom:6 }}>{d.label}</div>
                    <div style={{ fontSize:'clamp(14px,1.3vw,18px)',color:'#F5F0E8' }}>{d.href ? <a href={d.href} target={d.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" style={{ textDecoration:'none',borderBottom:'1px solid rgba(245,240,232,0.08)',color:'inherit' }}>{d.value}</a> : d.value}</div>
                  </div>
                ))}
                <div style={{ display:'flex',gap:24,marginTop:24 }}>
                  {[{n:'Instagram',u:'https://instagram.com/dolodorsey'},{n:'Twitter',u:'https://twitter.com/mrdolodorsey'},{n:'Facebook',u:'https://facebook.com/DoLoDorsey'}].map(s => (
                    <a key={s.n} href={s.u} target="_blank" rel="noopener noreferrer" style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(10px,0.85vw,12px)',color:'rgba(245,240,232,0.25)',textDecoration:'none',letterSpacing:'0.1em' }}>{s.n}</a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ ECOSYSTEM LINKS (WHITE) ═══ */}
      <div style={{ padding:'96px clamp(20px,4vw,80px)',background:LIGHT_BG,borderTop:'1px solid rgba(0,0,0,0.06)',color:TEXT_DARK }}>
        <div style={{ maxWidth:1400,margin:'0 auto' }}>
          <div className="eco-grid" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:64 }}>
            {[
              {h:'Navigate',links:[{n:'About',u:'#about'},{n:'Empire',u:'#empire'},{n:'Philosophy',u:'#philosophy'},{n:'Cities',u:'#cities'},{n:'Journey',u:'#journey'},{n:'Connect',u:'#connect'}]},
              {h:'Flagship Brands',links:[{n:'HugLife Events',u:'https://huglife.vercel.app'},{n:'Forever Futbol Museum',u:'https://forever-futbol.vercel.app'},{n:'Casper Group',u:'https://casper-group.vercel.app'},{n:'Good Times App',u:'https://good-times-app.vercel.app'}]},
              {h:'Products',links:[{n:'Pronto Energy',u:'https://pronto-energy-website.vercel.app'},{n:'Infinity Water',u:'https://infinity-water.vercel.app'},{n:'Stush',u:'https://stushusa.myshopify.com'},{n:'MAGA Merch',u:'https://makeatlantagreatagain.myshopify.com'}]},
              {h:'Connect',links:[{n:'Email',u:'mailto:thekollectiveworldwide@gmail.com'},{n:'Instagram',u:'https://instagram.com/dolodorsey'},{n:'KHG Instagram',u:'https://instagram.com/thekollectiveworldwide'},{n:'Twitter',u:'https://twitter.com/mrdolodorsey'}]},
            ].map(col => (
              <div key={col.h}>
                <h4 style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase',color:GOLD,marginBottom:24 }}>{col.h}</h4>
                {col.links.map(l => (
                  <a key={l.n} href={l.u} target={l.u.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" style={{ display:'block',fontSize:'clamp(13px,1.1vw,16px)',color:TEXT_MID,textDecoration:'none',padding:'6px 0' }}
                    onClick={l.u.startsWith('#')?e=>{e.preventDefault();scrollTo(l.u.slice(1))}:undefined}>{l.n}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ FOOTER (DARK) ═══ */}
      <footer className="footer-bar" style={{ padding:'48px clamp(20px,4vw,80px)',borderTop:'1px solid rgba(245,240,232,0.08)',display:'flex',alignItems:'center',justifyContent:'space-between',background:DARK }}>
        <div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.2em',color:'rgba(245,240,232,0.25)' }}>&copy; 2026 Dr. DoLo Dorsey — The Kollective Hospitality Group</div>
        <div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(245,240,232,0.25)' }}>Live for today. Plan for tomorrow. Party tonight.</div>
      </footer>

      {/* CSS */}
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes lineUp{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}
        @keyframes mScroll{to{transform:translateX(-50%)}}
        .stat-num{font-family:Cormorant Garamond,serif;font-size:clamp(28px,3.5vw,52px);font-weight:300;color:#C8A96E;line-height:1}
        .stat-label{font-family:DM Mono,monospace;font-size:clamp(8px,0.7vw,10px);letter-spacing:0.3em;text-transform:uppercase;color:rgba(245,240,232,0.25);margin-top:4px}
        .logo-item:hover{opacity:0.8!important}
        .div-card:hover{background:#111114!important}
        .nav-a:hover{color:#F5F0E8!important}
        .city-card:hover img{opacity:0.5!important;transform:scale(1.03)!important}
        @media(max-width:1024px){
          .thesis-grid,.phil-layout,.connect-grid{grid-template-columns:1fr!important}
          .div-grid{grid-template-columns:repeat(2,1fr)!important}
          .cities-grid{grid-template-columns:repeat(2,1fr)!important}
          .eco-grid{grid-template-columns:repeat(2,1fr)!important}
        }
        @media(max-width:768px){
          .nav-links-desktop{display:none!important}
          .nav-cta-desktop{display:none!important}
          .nav-toggle-mobile{display:block!important}
          .div-grid{grid-template-columns:1fr!important}
          .img-band{grid-template-columns:1fr!important}
          .cities-grid{grid-template-columns:1fr!important}
          .city-card[style*="grid-column"]{grid-column:span 1!important;grid-row:span 1!important}
          .eco-grid{grid-template-columns:1fr!important}
          .footer-bar{flex-direction:column!important;gap:16px!important;text-align:center!important}
        }
      `}</style>
    </>
  );
}
