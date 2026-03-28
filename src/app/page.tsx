'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';
const WEB = `${SB}/dr_dorsey/website`;

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

const DIVISIONS = [
  { num:'01', name:'HugLife Events', desc:'15+ event brands across nightlife, culture, food experiences, and lifestyle.', tags:['NOIR','REMIX','Taste of Art','WRST BHVR'], bg:`${WEB}/luxury-venue.jpg` },
  { num:'02', name:'Casper Group', desc:'Food & beverage empire — restaurants, bars, and culinary experiences.', tags:['Bodegea','Casper'] },
  { num:'03', name:'Forever Futbol', desc:'The world\'s first immersive futbol museum. Atlanta. May 29 — Jul 6, 2026.', tags:['Museum','ATL'] },
  { num:'04', name:'Good Times', desc:'837 venues. 10 cities. The nightlife & events discovery platform.', tags:['App','Technology'] },
  { num:'05', name:'Mind Studio', desc:'Telemed wellness MSO — clinic, consumer, and personal injury verticals.', tags:['Wellness','MSO'], bg:`${WEB}/garden-district.jpg` },
  { num:'06', name:'Products', desc:'Consumer goods engineered for lifestyle — energy, hydration, merchandise.', tags:['Infinity Water','Pronto','Stush'] },
  { num:'07', name:'Technology', desc:'AI-first platforms — 34 departments, 198 agents, full autonomous operation.', tags:['Rule Radar','UTube U'] },
  { num:'08', name:'Services', desc:'Umbrella Group — legal, roadside, on-call infrastructure services.', tags:['Umbrella','S.O.S'] },
];

const PILLARS = [
  { num:'01', title:'Compound Vision', body:'Every brand is designed to make the next one stronger. Events drive products, products fund technology, technology automates everything. The ecosystem feeds itself.' },
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

const CITIES = [
  { name:'Atlanta', state:'Georgia', count:'25+ active brands', hq:true },
  { name:'Houston', state:'Texas', count:'10+ brands' },
  { name:'Miami', state:'Florida', count:'Expanding' },
  { name:'Los Angeles', state:'California', count:'Active' },
  { name:'Dallas', state:'Texas', count:'Active' },
  { name:'Washington', state:'D.C.', count:'Active' },
  { name:'Charlotte', state:'N. Carolina', count:'Active' },
  { name:'New York', state:'New York', count:'Pipeline' },
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
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

function useCounter(target: number, duration = 2000) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        function up(t: number) {
          const p = Math.min((t - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          setVal(Math.floor(eased * target));
          if (p < 1) requestAnimationFrame(up);
        }
        requestAnimationFrame(up);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { ref, val };
}

/* ═══ COMPONENTS ═══ */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, vis } = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

function StatNum({ target, suffix = '' }: { target: number; suffix?: string }) {
  const { ref, val } = useCounter(target);
  return <div ref={ref} style={S.heroStatNum}>{val}{suffix}</div>;
}

/* ═══ STYLES (inline for single-file) ═══ */
const S: Record<string, React.CSSProperties> = {
  /* Preloader */
  preloader: { position:'fixed',top:0,left:0,width:'100%',height:'100%',background:'#060607',zIndex:10000,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',transition:'opacity 1s cubic-bezier(0.16,1,0.3,1), visibility 1s' },
  preloaderHidden: { opacity:0,visibility:'hidden' as const,pointerEvents:'none' as const },
  preloaderMark: { width:72,height:72,border:'1px solid rgba(200,169,110,0.3)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center' },
  preloaderMarkImg: { width:40,height:40,objectFit:'contain' as const,filter:'brightness(1.2)' },
  
  /* Nav */
  nav: { position:'fixed' as const,top:0,left:0,width:'100%',zIndex:1000,padding:'24px clamp(20px,4vw,80px)',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'background 0.4s, backdrop-filter 0.4s' },
  navScrolled: { background:'rgba(6,6,7,0.88)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)' },
  navBrand: { display:'flex',alignItems:'center',gap:12,textDecoration:'none' },
  navMark: { width:36,height:36,border:'1px solid rgba(200,169,110,0.3)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center' },
  navMarkImg: { width:20,height:20,objectFit:'contain' as const },
  navLabel: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase' as const,color:'rgba(245,240,232,0.6)' },
  navLinks: { display:'flex',gap:40,listStyle:'none' },
  navLink: { fontSize:'clamp(10px,0.85vw,12px)',fontWeight:400,color:'rgba(245,240,232,0.6)',textDecoration:'none',letterSpacing:'0.15em',textTransform:'uppercase' as const,transition:'color 0.3s' },
  navCta: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.2em',textTransform:'uppercase' as const,color:'#060607',background:'#C8A96E',padding:'10px 24px',textDecoration:'none',border:'none',cursor:'pointer',transition:'all 0.3s' },
  navToggle: { display:'none',background:'none',border:'none',cursor:'pointer',width:28,height:20 },

  /* Hero */
  hero: { minHeight:'100vh',position:'relative' as const,overflow:'hidden',display:'flex',alignItems:'flex-end',padding:'0 clamp(20px,4vw,80px) clamp(48px,10vh,96px)' },
  heroVideoWrap: { position:'absolute' as const,top:0,left:0,width:'100%',height:'100%',zIndex:0 },
  heroFallback: { position:'absolute' as const,top:0,left:0,width:'100%',height:'100%',objectFit:'cover' as const,opacity:0.2,filter:'grayscale(20%) contrast(1.1)' },
  heroVideo: { width:'100%',height:'100%',objectFit:'cover' as const,transition:'opacity 1.5s' },
  heroOverlay: { position:'absolute' as const,top:0,left:0,width:'100%',height:'100%',zIndex:1,background:'radial-gradient(ellipse at 65% 25%,rgba(200,169,110,0.07) 0%,transparent 55%),radial-gradient(ellipse at 20% 80%,rgba(200,169,110,0.04) 0%,transparent 50%),linear-gradient(180deg,rgba(6,6,7,0.3) 0%,rgba(6,6,7,0.1) 40%,rgba(6,6,7,0.6) 75%,#060607 100%)' },
  heroContent: { position:'relative' as const,zIndex:2,maxWidth:1400,width:'100%' },
  heroTag: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.4em',textTransform:'uppercase' as const,color:'#C8A96E',marginBottom:24 },
  heroH1: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(52px,11vw,160px)',fontWeight:300,lineHeight:0.92,letterSpacing:'-0.03em' },
  heroEm: { fontStyle:'italic' as const,color:'#C8A96E' },
  heroSub: { fontSize:'clamp(14px,1.3vw,18px)',fontWeight:300,color:'rgba(245,240,232,0.6)',maxWidth:520,lineHeight:1.7,marginTop:40 },
  heroBottom: { display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginTop:64 },
  heroStats: { display:'flex',gap:64 },
  heroStatNum: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(28px,3.5vw,52px)',fontWeight:300,color:'#C8A96E',lineHeight:1 },
  heroStatLabel: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase' as const,color:'rgba(245,240,232,0.25)',marginTop:4 },

  /* Section shared */
  sec: { padding:'128px clamp(20px,4vw,80px)',position:'relative' as const },
  secInner: { maxWidth:1400,margin:'0 auto' },
  secTag: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.4em',textTransform:'uppercase' as const,color:'#C8A96E',marginBottom:16 },
  secTitle: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(26px,4.5vw,64px)',fontWeight:300,lineHeight:1.1,letterSpacing:'-0.02em',marginBottom:64 },

  /* Logo row */
  logoRow: { padding:'64px clamp(20px,4vw,80px)',borderTop:'1px solid rgba(245,240,232,0.08)',borderBottom:'1px solid rgba(245,240,232,0.08)' },
  logoRowInner: { maxWidth:1400,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:40,flexWrap:'wrap' as const },
  logoItem: { opacity:0.35,transition:'opacity 0.4s',flex:'0 0 auto' },
  logoImg: { height:'clamp(40px,5vw,64px)',width:'auto',objectFit:'contain' as const,filter:'brightness(1.5)' },

  /* Thesis */
  thesisLayout: { display:'grid',gridTemplateColumns:'1fr 1fr',gap:96,alignItems:'center' },
  thesisQuote: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(30px,5vw,72px)',fontWeight:300,lineHeight:1.2,marginBottom:40 },
  thesisBody: { fontSize:'clamp(14px,1.3vw,18px)',color:'rgba(245,240,232,0.6)',lineHeight:1.8,marginBottom:24 },
  thesisSig: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(18px,2.5vw,32px)',fontWeight:300,fontStyle:'italic' as const,color:'#C8A96E',marginTop:40 },
  thesisImgWrap: { position:'relative' as const,height:'clamp(280px,50vw,580px)',overflow:'hidden',border:'1px solid rgba(245,240,232,0.08)' },
  thesisImg: { width:'100%',height:'100%',objectFit:'cover' as const,filter:'contrast(1.05)',transition:'transform 8s cubic-bezier(0.37,0,0.63,1)' },
  thesisImgLabel: { position:'absolute' as const,bottom:-12,right:40,fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase' as const,color:'#8A7650',background:'#060607',padding:'0 16px' },

  /* Divisions */
  divGrid: { display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:1,background:'rgba(245,240,232,0.08)',border:'1px solid rgba(245,240,232,0.08)' },
  divCard: { background:'#0C0C0E',padding:'64px 40px',position:'relative' as const,overflow:'hidden',cursor:'pointer',transition:'background 0.5s' },
  divNum: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(40px,4vw,72px)',fontWeight:300,color:'rgba(245,240,232,0.08)',lineHeight:1,marginBottom:24,position:'relative' as const },
  divName: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(18px,2.5vw,32px)',fontWeight:400,marginBottom:8,position:'relative' as const },
  divDesc: { fontSize:'clamp(10px,0.85vw,12px)',color:'rgba(245,240,232,0.25)',lineHeight:1.5,marginBottom:24,position:'relative' as const },
  divTags: { display:'flex',gap:6,flexWrap:'wrap' as const,position:'relative' as const },
  divTag: { fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.15em',textTransform:'uppercase' as const,color:'#C8A96E',border:'1px solid rgba(200,169,110,0.3)',padding:'3px 8px' },

  /* Image band */
  imgBand: { display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:0,borderTop:'1px solid rgba(245,240,232,0.08)',borderBottom:'1px solid rgba(245,240,232,0.08)' },
  imgBandCell: { position:'relative' as const,height:'clamp(200px,30vw,400px)',overflow:'hidden' },
  imgBandImg: { width:'100%',height:'100%',objectFit:'cover' as const,opacity:0.5,transition:'opacity 0.6s, transform 6s cubic-bezier(0.37,0,0.63,1)' },
  imgBandLabel: { position:'absolute' as const,bottom:24,left:24,fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase' as const,color:'#C8A96E',background:'rgba(6,6,7,0.7)',padding:'4px 12px',backdropFilter:'blur(8px)' },

  /* Marquee */
  marquee: { padding:'64px 0',overflow:'hidden',borderTop:'1px solid rgba(245,240,232,0.08)',borderBottom:'1px solid rgba(245,240,232,0.08)' },
  marqueeTrack: { display:'flex',gap:64,width:'max-content' },
  marqueeItem: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(20px,3vw,44px)',fontWeight:300,color:'rgba(245,240,232,0.25)',whiteSpace:'nowrap' as const,display:'flex',alignItems:'center',gap:24 },
  marqueeDot: { width:6,height:6,background:'#C8A96E',borderRadius:'50%',flexShrink:0 },

  /* Philosophy */
  philLayout: { display:'grid',gridTemplateColumns:'1fr 1fr',gap:128 },
  pillar: { padding:'40px 0',borderBottom:'1px solid rgba(245,240,232,0.08)' },
  pillarFirst: { borderTop:'1px solid rgba(245,240,232,0.08)' },
  pillarHead: { display:'flex',alignItems:'baseline',gap:24,marginBottom:16 },
  pillarNum: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',color:'#C8A96E',letterSpacing:'0.2em' },
  pillarTitle: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(18px,2.5vw,32px)',fontWeight:400 },
  pillarBody: { fontSize:'clamp(13px,1.1vw,16px)',color:'rgba(245,240,232,0.25)',lineHeight:1.7,paddingLeft:48 },
  philRight: { display:'flex',flexDirection:'column' as const,gap:40 },
  metric: { padding:40,border:'1px solid rgba(245,240,232,0.08)',position:'relative' as const,overflow:'hidden',transition:'border-color 0.4s' },
  metricVal: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(36px,4.5vw,60px)',fontWeight:300,color:'#C8A96E',lineHeight:1 },
  metricLabel: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase' as const,color:'rgba(245,240,232,0.25)',marginTop:6 },
  metricDesc: { fontSize:'clamp(13px,1.1vw,16px)',color:'rgba(245,240,232,0.6)',marginTop:16,lineHeight:1.6 },

  /* Full-bleed image */
  fullImg: { position:'relative' as const,height:'clamp(300px,50vw,600px)',overflow:'hidden' },
  fullImgImg: { width:'100%',height:'100%',objectFit:'cover' as const,opacity:0.4,filter:'contrast(1.05)' },
  fullImgOverlay: { position:'absolute' as const,top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,#060607 0%,transparent 30%,transparent 70%,#060607 100%)',display:'flex',alignItems:'center',justifyContent:'center' },
  fullImgText: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(24px,4vw,56px)',fontWeight:300,fontStyle:'italic' as const,color:'#C8A96E',textAlign:'center' as const,maxWidth:700,padding:'0 clamp(20px,4vw,80px)',lineHeight:1.3 },

  /* Cities */
  citiesGrid: { display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:1,background:'rgba(245,240,232,0.08)' },
  city: { background:'#0C0C0E',padding:'64px 40px',position:'relative' as const,overflow:'hidden',transition:'background 0.4s' },
  cityHq: { gridColumn:'span 2',gridRow:'span 2',display:'flex',flexDirection:'column' as const,justifyContent:'flex-end' },
  cityHqTag: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.2em',textTransform:'uppercase' as const,color:'rgba(200,169,110,0.3)',marginBottom:24,position:'relative' as const },
  cityName: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(18px,2.5vw,32px)',fontWeight:400,position:'relative' as const },
  cityNameHq: { fontSize:'clamp(26px,4.5vw,64px)' },
  cityState: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase' as const,color:'#C8A96E',position:'relative' as const },
  cityCount: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',color:'rgba(245,240,232,0.25)',marginTop:8,position:'relative' as const },
  cityBg: { position:'absolute' as const,top:0,left:0,width:'100%',height:'100%',opacity:0.08 },
  cityBgImg: { width:'100%',height:'100%',objectFit:'cover' as const },

  /* Timeline */
  tlTrack: { position:'relative' as const,paddingLeft:96 },
  tlLine: { position:'absolute' as const,top:0,left:24,width:1,height:'100%',background:'linear-gradient(180deg,#C8A96E,rgba(245,240,232,0.08),transparent)' },
  tlItem: { position:'relative' as const,paddingBottom:64 },
  tlDot: { position:'absolute' as const,left:-76,top:8,width:9,height:9,border:'1px solid #C8A96E',borderRadius:'50%',background:'#060607' },
  tlYear: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',color:'#C8A96E',marginBottom:8 },
  tlTitle: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(18px,2.5vw,32px)',fontWeight:400,marginBottom:8 },
  tlDesc: { fontSize:'clamp(13px,1.1vw,16px)',color:'rgba(245,240,232,0.25)',maxWidth:500,lineHeight:1.6 },

  /* Connect */
  connectLayout: { display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:96,alignItems:'center',position:'relative' as const },
  connectHL: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(30px,5vw,72px)',fontWeight:300,lineHeight:1.15,marginBottom:40 },
  connectBody: { fontSize:'clamp(14px,1.3vw,18px)',color:'rgba(245,240,232,0.6)',lineHeight:1.7,marginBottom:64,maxWidth:480 },
  connectBtns: { display:'flex',gap:24,flexWrap:'wrap' as const },
  btnGold: { fontFamily:'DM Mono,monospace',fontSize:'clamp(10px,0.85vw,12px)',letterSpacing:'0.2em',textTransform:'uppercase' as const,color:'#060607',background:'#C8A96E',padding:'16px 40px',textDecoration:'none',border:'1px solid #C8A96E',transition:'all 0.3s',display:'inline-block' },
  btnOutline: { fontFamily:'DM Mono,monospace',fontSize:'clamp(10px,0.85vw,12px)',letterSpacing:'0.2em',textTransform:'uppercase' as const,color:'#F5F0E8',background:'transparent',padding:'16px 40px',textDecoration:'none',border:'1px solid rgba(245,240,232,0.25)',transition:'all 0.3s',display:'inline-block' },
  cdItem: { padding:'24px 0',borderBottom:'1px solid rgba(245,240,232,0.08)' },
  cdLabel: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase' as const,color:'#C8A96E',marginBottom:6 },
  cdValue: { fontSize:'clamp(14px,1.3vw,18px)' },
  cdLink: { textDecoration:'none',borderBottom:'1px solid rgba(245,240,232,0.08)',transition:'all 0.3s',color:'inherit' },

  /* Eco links */
  ecoLinks: { padding:'96px clamp(20px,4vw,80px)',borderTop:'1px solid rgba(245,240,232,0.08)' },
  ecoGrid: { display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:64 },
  ecoH4: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase' as const,color:'#C8A96E',marginBottom:24 },
  ecoA: { display:'block',fontSize:'clamp(13px,1.1vw,16px)',color:'rgba(245,240,232,0.25)',textDecoration:'none',padding:'6px 0',transition:'color 0.3s' },

  /* Footer */
  footer: { padding:'64px clamp(20px,4vw,80px)',borderTop:'1px solid rgba(245,240,232,0.08)',display:'flex',alignItems:'center',justifyContent:'space-between' },
  footerL: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.2em',color:'rgba(245,240,232,0.25)' },
  footerR: { fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase' as const,color:'rgba(245,240,232,0.25)' },

  /* Mobile menu */
  mobMenu: { position:'fixed' as const,top:0,right:'-100%',width:'100%',height:'100%',background:'#060607',zIndex:999,display:'flex',flexDirection:'column' as const,justifyContent:'center',padding:'96px clamp(20px,4vw,80px)',transition:'right 0.6s cubic-bezier(0.16,1,0.3,1)' },
  mobMenuOpen: { right:0 },
  mobMenuLink: { fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(30px,5vw,72px)',fontWeight:300,textDecoration:'none',display:'block',padding:'16px 0',borderBottom:'1px solid rgba(245,240,232,0.08)',transition:'color 0.3s',color:'#F5F0E8' },
};

const KHG_LOGO = `${SB}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;

/* ═══ MAIN PAGE ═══ */
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 1800);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setVideoReady(true);
    v.addEventListener('canplaythrough', onReady);
    v.addEventListener('playing', onReady);
    const fallback = setTimeout(() => setVideoReady(true), 3000);
    return () => { v.removeEventListener('canplaythrough', onReady); v.removeEventListener('playing', onReady); clearTimeout(fallback); };
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Preloader */}
      <div style={{ ...S.preloader, ...(loaded ? S.preloaderHidden : {}) }}>
        <div style={S.preloaderMark}><img src={KHG_LOGO} alt="KHG" style={S.preloaderMarkImg} /></div>
        <div style={{ width:100,height:1,background:'rgba(245,240,232,0.08)',marginTop:24,position:'relative',overflow:'hidden' }}>
          <div style={{ position:'absolute',left:'-100%',top:0,width:'100%',height:'100%',background:'#C8A96E',animation:'pSlide 1s cubic-bezier(0.16,1,0.3,1) infinite' }} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={{ ...S.mobMenu, ...(mobOpen ? S.mobMenuOpen : {}) }}>
        {['about','empire','philosophy','cities','journey','connect'].map(id => (
          <a key={id} href={`#${id}`} style={S.mobMenuLink} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{id.charAt(0).toUpperCase() + id.slice(1)}</a>
        ))}
        <a href="/events" style={{...S.mobMenuLink, color:'#C8A96E'}}>Events</a>
      </div>

      {/* Nav */}
      <nav style={{ ...S.nav, ...(scrolled ? S.navScrolled : {}) }}>
        <a href="#" style={S.navBrand}>
          <div style={S.navMark}><img src={KHG_LOGO} alt="KHG" style={S.navMarkImg} /></div>
          <span style={S.navLabel}>Dr. Dorsey</span>
        </a>
        <ul style={S.navLinks} className="nav-links">
          {['about','empire','philosophy','cities','journey'].map(id => (
            <li key={id}><a href={`#${id}`} style={S.navLink} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{id.charAt(0).toUpperCase() + id.slice(1)}</a></li>
          ))}
          <li><a href="/events" style={{...S.navLink, color:'#C8A96E'}}>Events</a></li>
        </ul>
        <a href="#connect" className="nav-cta" style={S.navCta} onClick={(e) => { e.preventDefault(); scrollTo('connect'); }}>Connect</a>
        <button className="nav-toggle" style={S.navToggle} onClick={() => setMobOpen(!mobOpen)}>
          <span style={{ display:'block',width:'100%',height:1,background:'#F5F0E8',position:'absolute' as const,left:0,top:3,transition:'all 0.3s',transform:mobOpen?'translateY(6px) rotate(45deg)':'none' }} />
          <span style={{ display:'block',width:'100%',height:1,background:'#F5F0E8',position:'absolute' as const,left:0,top:9,transition:'all 0.3s',opacity:mobOpen?0:1 }} />
          <span style={{ display:'block',width:'100%',height:1,background:'#F5F0E8',position:'absolute' as const,left:0,top:15,transition:'all 0.3s',transform:mobOpen?'translateY(-6px) rotate(-45deg)':'none' }} />
        </button>
      </nav>

      {/* HERO */}
      <section style={S.hero}>
        <div style={S.heroVideoWrap}>
          <img src={`${WEB}/hero-bg.jpg`} alt="" style={S.heroFallback} />
          <video ref={videoRef} style={{ ...S.heroVideo, opacity: videoReady ? 0.35 : 0 }} autoPlay muted loop playsInline preload="auto">
            <source src={`${WEB}/hero-video.mp4`} type="video/mp4" />
          </video>
          <div style={S.heroOverlay} />
        </div>
        <div style={S.heroContent}>
          <div style={{ ...S.heroTag, animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 2s both' }}>Founder — CEO — Architect</div>
          <h1 style={S.heroH1}>
            <span style={{ display:'block',overflow:'hidden' }}><span style={{ display:'block',animation:'lineUp 1s cubic-bezier(0.16,1,0.3,1) 2.1s both' }}>Live for today.</span></span>
            <span style={{ display:'block',overflow:'hidden' }}><span style={{ display:'block',animation:'lineUp 1s cubic-bezier(0.16,1,0.3,1) 2.25s both' }}>Plan for <em style={S.heroEm}>tomorrow.</em></span></span>
            <span style={{ display:'block',overflow:'hidden' }}><span style={{ display:'block',animation:'lineUp 1s cubic-bezier(0.16,1,0.3,1) 2.4s both' }}>Party <em style={S.heroEm}>tonight.</em></span></span>
          </h1>
          <p style={{ ...S.heroSub, animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 2.7s both' }}>
            The mind behind 57+ ventures, 8 cities, and an ecosystem engineered to compound. Dr. DoLo Dorsey builds empires in silence.
          </p>
          <div className="hero-bottom" style={{ ...S.heroBottom, animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 3s both' }}>
            <div style={S.heroStats} className="hero-stats">
              <div><StatNum target={57} suffix="+" /><div style={S.heroStatLabel}>Ventures</div></div>
              <div><StatNum target={8} /><div style={S.heroStatLabel}>Cities</div></div>
              <div><StatNum target={198} /><div style={S.heroStatLabel}>AI Agents</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO ROW */}
      <div style={S.logoRow}>
        <div style={S.logoRowInner}>
          {LOGOS.map(l => (
            <a key={l.n} href={l.url || '#'} target={l.url ? '_blank' : undefined} rel="noopener noreferrer" style={S.logoItem}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')} onMouseLeave={e => (e.currentTarget.style.opacity = '0.35')}>
              <img src={l.src} alt={l.n} style={S.logoImg} />
            </a>
          ))}
        </div>
      </div>

      {/* THESIS */}
      <section className="sec" style={S.sec} id="about">
        <div style={S.secInner}>
          <div style={S.thesisLayout} className="grid-thesis">
            <Reveal>
              <div style={S.secTag}>The Founder</div>
              <blockquote style={S.thesisQuote}>&ldquo;Everybody wants to eat at night — nobody wants to <em style={S.heroEm}>hunt in the morning.</em>&rdquo;</blockquote>
              <p style={S.thesisBody}>Dr. DoLo Dorsey is the founder and CEO of The Kollective Hospitality Group — a multi-brand enterprise spanning events, food &amp; beverage, museums, consumer products, technology, and wellness. What started as a single event has compounded into an autonomous empire: 57+ entities, 34 AI-powered departments, 198 agents, 8 cities deep.</p>
              <p style={S.thesisBody}>The philosophy is simple: build systems that outlast trends. Build brands that mean something. Build in silence and let the results speak.</p>
              <div style={S.thesisSig}>— Dr. DoLo Dorsey</div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={S.thesisImgWrap}>
                <img src={`${WEB}/thesis-bg.jpg`} alt="Atlanta nightlife" style={S.thesisImg} />
                <span style={S.thesisImgLabel}>Atlanta, GA</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DIVISIONS */}
      <section className="sec" style={{ ...S.sec, background:'#0C0C0E' }} id="empire">
        <div style={S.secInner}>
          <Reveal><div style={S.secTag}>The Empire</div></Reveal>
          <Reveal><h2 style={S.secTitle}>Eight divisions. One <em style={S.heroEm}>machine.</em></h2></Reveal>
          <Reveal delay={0.2}>
            <div style={S.divGrid} className="grid-divisions">
              {DIVISIONS.map(d => (
                <div key={d.num} style={S.divCard}
                  onMouseEnter={e => { e.currentTarget.style.background='#111114'; const n=e.currentTarget.querySelector('.dn') as HTMLElement; if(n)n.style.color='rgba(200,169,110,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#0C0C0E'; const n=e.currentTarget.querySelector('.dn') as HTMLElement; if(n)n.style.color='rgba(245,240,232,0.08)'; }}>
                  <div className="dn" style={S.divNum}>{d.num}</div>
                  <div style={S.divName}>{d.name}</div>
                  <div style={S.divDesc}>{d.desc}</div>
                  <div style={S.divTags}>{d.tags.map(t => <span key={t} style={S.divTag}>{t}</span>)}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* IMAGE BAND */}
      <div style={S.imgBand} className="grid-imgband">
        {[
          { src:`${WEB}/luxury-venue.jpg`, label:'Events' },
          { src:`${WEB}/penthouse-skyline.jpg`, label:'Hospitality' },
          { src:`${WEB}/rooftop-lounge.jpg`, label:'Nightlife' },
        ].map(i => (
          <div key={i.label} className="imgband-cell" style={S.imgBandCell}
            onMouseEnter={e => { const img = e.currentTarget.querySelector('img') as HTMLElement; if(img){img.style.opacity='0.8';img.style.transform='scale(1.03)'} }}
            onMouseLeave={e => { const img = e.currentTarget.querySelector('img') as HTMLElement; if(img){img.style.opacity='0.5';img.style.transform='scale(1)'} }}>
            <img src={i.src} alt={i.label} style={S.imgBandImg} />
            <span style={S.imgBandLabel}>{i.label}</span>
          </div>
        ))}
      </div>

      {/* MARQUEE */}
      <div style={S.marquee}>
        <div style={{ ...S.marqueeTrack, animation:'mScroll 35s linear infinite' }}>
          {[...MARQUEE_BRANDS,...MARQUEE_BRANDS].map((b,i) => (
            <span key={`${b}-${i}`} style={S.marqueeItem}><span style={S.marqueeDot} />{b}</span>
          ))}
        </div>
      </div>

      {/* PHILOSOPHY */}
      <section style={S.sec} id="philosophy">
        <div style={S.secInner}>
          <Reveal><div style={S.secTag}>Operating System</div></Reveal>
          <Reveal><h2 style={S.secTitle}>The principles behind <em style={S.heroEm}>the machine.</em></h2></Reveal>
          <div style={S.philLayout} className="grid-philosophy">
            <div>
              {PILLARS.map((p, i) => (
                <Reveal key={p.num} delay={i * 0.1}>
                  <div style={{ ...S.pillar, ...(i === 0 ? S.pillarFirst : {}) }}>
                    <div style={S.pillarHead}><span style={S.pillarNum}>{p.num}</span><h3 style={S.pillarTitle}>{p.title}</h3></div>
                    <p style={S.pillarBody} className="pillar-body">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={S.philRight}>
              {METRICS.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.1}>
                  <div style={S.metric}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.3)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,240,232,0.08)')}>
                    <div style={S.metricVal}>{m.val}</div>
                    <div style={S.metricLabel}>{m.label}</div>
                    <div style={S.metricDesc}>{m.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FULL-BLEED QUOTE */}
      <div style={S.fullImg} className="full-img-section">
        <img src={`${WEB}/garden-district.jpg`} alt="" style={S.fullImgImg} />
        <div style={S.fullImgOverlay}><div style={S.fullImgText}>&ldquo;Don&rsquo;t let lame people make you do lame shit.&rdquo;</div></div>
      </div>

      {/* CITIES */}
      <section style={{ ...S.sec, background:'#0C0C0E' }} id="cities">
        <div style={S.secInner}>
          <Reveal><div style={S.secTag}>Geography</div></Reveal>
          <Reveal><h2 style={S.secTitle}>Eight cities. One <em style={S.heroEm}>frequency.</em></h2></Reveal>
          <Reveal delay={0.2}>
            <div style={S.citiesGrid} className="grid-cities">
              {CITIES.map((c, i) => (
                <div key={c.name} className={c.hq ? "city-hq" : "city-cell"} style={{ ...S.city, ...(c.hq ? S.cityHq : {}) }}
                  onMouseEnter={e => (e.currentTarget.style.background='#111114')}
                  onMouseLeave={e => (e.currentTarget.style.background='#0C0C0E')}>
                  {c.hq && <div style={S.cityBg}><img src={`${WEB}/hero-bg.jpg`} alt="" style={S.cityBgImg} /></div>}
                  {c.hq && <span style={S.cityHqTag}>Headquarters</span>}
                  <div style={{ ...S.cityName, ...(c.hq ? S.cityNameHq : {}) }}>{c.name}</div>
                  <div style={S.cityState}>{c.state}</div>
                  <div style={S.cityCount}>{c.count}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={S.sec} id="journey">
        <div style={S.secInner}>
          <Reveal><div style={S.secTag}>The Journey</div></Reveal>
          <Reveal><h2 style={S.secTitle}>Built in chapters, <em style={S.heroEm}>not overnight.</em></h2></Reveal>
          <div style={S.tlTrack} className="tl-track">
            <div style={S.tlLine} />
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.1}>
                <div style={S.tlItem}>
                  <div style={S.tlDot} />
                  <div style={S.tlYear}>{t.year}</div>
                  <div style={S.tlTitle}>{t.title}</div>
                  <div style={S.tlDesc}>{t.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-BLEED QUOTE 2 */}
      <div style={S.fullImg}>
        <img src={`${WEB}/penthouse-skyline.jpg`} alt="" style={S.fullImgImg} />
        <div style={S.fullImgOverlay}><div style={S.fullImgText}>&ldquo;Greatness is earned in silence.&rdquo;</div></div>
      </div>

      {/* CONNECT */}
      <section className="sec" style={{ ...S.sec, minHeight:'80vh',display:'flex',alignItems:'center',borderTop:'1px solid rgba(245,240,232,0.08)',position:'relative',overflow:'hidden' }} id="connect">
        <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',opacity:0.05 }}>
          <img src={`${WEB}/rooftop-lounge.jpg`} alt="" style={{ width:'100%',height:'100%',objectFit:'cover' }} />
        </div>
        <div style={S.secInner}>
          <div style={S.connectLayout} className="grid-connect">
            <Reveal>
              <div style={S.secTag}>Let&rsquo;s Build</div>
              <h2 style={S.connectHL}>The ecosystem is <em style={S.heroEm}>designed</em> for collaboration.</h2>
              <p style={S.connectBody}>Whether it&rsquo;s sponsorship, investment, venue partnership, brand collaboration, or something nobody&rsquo;s thought of yet — the door is open for those who build at this level.</p>
              <div style={S.connectBtns}>
                <a href="mailto:thekollectiveworldwide@gmail.com?subject=Partnership — Dr. Dorsey" style={S.btnGold}
                  onMouseEnter={e => { e.currentTarget.style.background='#D4BC8A'; e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#C8A96E'; e.currentTarget.style.transform='translateY(0)'; }}>Start a Conversation</a>
                <a href="https://instagram.com/dolodorsey" target="_blank" rel="noopener noreferrer" style={S.btnOutline}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='#C8A96E'; e.currentTarget.style.color='#C8A96E'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(245,240,232,0.25)'; e.currentTarget.style.color='#F5F0E8'; }}>@dolodorsey</a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                {[
                  { label:'Email', value:'thekollectiveworldwide@gmail.com', href:'mailto:thekollectiveworldwide@gmail.com' },
                  { label:'Instagram', value:'@dolodorsey', href:'https://instagram.com/dolodorsey' },
                  { label:'The Kollective', value:'@thekollectiveworldwide', href:'https://instagram.com/thekollectiveworldwide' },
                  { label:'Headquarters', value:'Atlanta, Georgia' },
                ].map(d => (
                  <div key={d.label} style={S.cdItem}>
                    <div style={S.cdLabel}>{d.label}</div>
                    <div style={S.cdValue}>{d.href ? <a href={d.href} target={d.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" style={S.cdLink}>{d.value}</a> : d.value}</div>
                  </div>
                ))}
                <div style={{ display:'flex',gap:24,marginTop:24 }}>
                  {[
                    { n:'Instagram', u:'https://instagram.com/dolodorsey' },
                    { n:'Twitter', u:'https://twitter.com/mrdolodorsey' },
                    { n:'Facebook', u:'https://facebook.com/DoLoDorsey' },
                  ].map(s => (
                    <a key={s.n} href={s.u} target="_blank" rel="noopener noreferrer" style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(10px,0.85vw,12px)',color:'rgba(245,240,232,0.25)',textDecoration:'none',letterSpacing:'0.1em',transition:'color 0.3s' }}
                      onMouseEnter={e => (e.currentTarget.style.color='#C8A96E')} onMouseLeave={e => (e.currentTarget.style.color='rgba(245,240,232,0.25)')}>{s.n}</a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM LINKS */}
      <div style={S.ecoLinks} className="eco-links-section">
        <div style={{ maxWidth:1400,margin:'0 auto' }}>
          <div style={S.ecoGrid} className="grid-eco">
            <div>
              <h4 style={S.ecoH4}>Navigate</h4>
              {['about','empire','philosophy','cities','journey','connect'].map(id => (
                <a key={id} href={`#${id}`} style={S.ecoA} onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                  onMouseEnter={e => (e.currentTarget.style.color='#C8A96E')} onMouseLeave={e => (e.currentTarget.style.color='rgba(245,240,232,0.25)')}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </div>
            <div>
              <h4 style={S.ecoH4}>Flagship Brands</h4>
              {[{n:'HugLife Events',u:'https://huglife.vercel.app'},{n:'Forever Futbol Museum',u:'https://forever-futbol.vercel.app'},{n:'Casper Group',u:'https://casper-group.vercel.app'},{n:'Good Times App',u:'https://good-times-app.vercel.app'}].map(l => (
                <a key={l.n} href={l.u} target="_blank" rel="noopener noreferrer" style={S.ecoA}
                  onMouseEnter={e => (e.currentTarget.style.color='#C8A96E')} onMouseLeave={e => (e.currentTarget.style.color='rgba(245,240,232,0.25)')}>{l.n}</a>
              ))}
            </div>
            <div>
              <h4 style={S.ecoH4}>Products</h4>
              {[{n:'Pronto Energy',u:'https://pronto-energy-website.vercel.app'},{n:'Infinity Water',u:'https://infinity-water.vercel.app'},{n:'Stush',u:'https://stushusa.myshopify.com'},{n:'MAGA Merch',u:'https://makeatlantagreatagain.myshopify.com'}].map(l => (
                <a key={l.n} href={l.u} target="_blank" rel="noopener noreferrer" style={S.ecoA}
                  onMouseEnter={e => (e.currentTarget.style.color='#C8A96E')} onMouseLeave={e => (e.currentTarget.style.color='rgba(245,240,232,0.25)')}>{l.n}</a>
              ))}
            </div>
            <div>
              <h4 style={S.ecoH4}>Connect</h4>
              {[{n:'Email',u:'mailto:thekollectiveworldwide@gmail.com'},{n:'Instagram',u:'https://instagram.com/dolodorsey'},{n:'KHG Instagram',u:'https://instagram.com/thekollectiveworldwide'},{n:'Twitter',u:'https://twitter.com/mrdolodorsey'}].map(l => (
                <a key={l.n} href={l.u} target={l.u.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" style={S.ecoA}
                  onMouseEnter={e => (e.currentTarget.style.color='#C8A96E')} onMouseLeave={e => (e.currentTarget.style.color='rgba(245,240,232,0.25)')}>{l.n}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={S.footer} className="site-footer">
        <div style={S.footerL}>&copy; 2026 Dr. DoLo Dorsey — The Kollective Hospitality Group</div>
        <div style={S.footerR}>Live for today. Plan for tomorrow. Party tonight.</div>
      </footer>

      {/* CSS Animations + Responsive */}
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lineUp { from{opacity:0;transform:translateY(100%)} to{opacity:1;transform:translateY(0)} }
        @keyframes pSlide { from{left:-100%} to{left:100%} }
        @keyframes mScroll { to{transform:translateX(-50%)} }
        @keyframes scrollPulse { 0%,100%{opacity:.3;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.2)} }

        /* ═══ TABLET (≤1024px) ═══ */
        @media(max-width:1024px){
          .grid-thesis{grid-template-columns:1fr!important;gap:48px!important}
          .grid-divisions{grid-template-columns:repeat(2,1fr)!important}
          .grid-philosophy{grid-template-columns:1fr!important;gap:48px!important}
          .grid-cities{grid-template-columns:repeat(2,1fr)!important}
          .grid-connect{grid-template-columns:1fr!important;gap:48px!important}
          .grid-eco{grid-template-columns:repeat(2,1fr)!important;gap:40px!important}
        }

        /* ═══ MOBILE (≤768px) ═══ */
        @media(max-width:768px){
          /* Nav */
          .nav-links{display:none!important}
          .nav-cta{display:none!important}
          .nav-toggle{display:block!important;position:relative;width:28px;height:20px}

          /* Hero */
          .hero-bottom{flex-direction:column!important;gap:32px!important;align-items:flex-start!important}
          .hero-stats{gap:32px!important}

          /* Sections */
          .sec{padding:64px 20px!important}

          /* Grids collapse to 1 column */
          .grid-thesis{grid-template-columns:1fr!important;gap:32px!important}
          .grid-divisions{grid-template-columns:1fr!important}
          .grid-imgband{grid-template-columns:1fr!important}
          .grid-philosophy{grid-template-columns:1fr!important;gap:40px!important}
          .grid-cities{grid-template-columns:1fr!important}
          .grid-connect{grid-template-columns:1fr!important;gap:40px!important}
          .grid-eco{grid-template-columns:1fr 1fr!important;gap:32px!important}

          /* City HQ no longer spans */
          .city-hq{grid-column:span 1!important;grid-row:span 1!important}

          /* Pillar body less padding */
          .pillar-body{padding-left:24px!important}

          /* Timeline */
          .tl-track{padding-left:48px!important}

          /* Footer stacks */
          .site-footer{flex-direction:column!important;gap:12px!important;text-align:center!important}

          /* Full-bleed images shorter on mobile */
          .full-img-section{height:250px!important}

          /* Eco links section */
          .eco-links-section{padding:48px 20px!important}

          /* Image band cells shorter */
          .imgband-cell{height:180px!important}

          /* Thesis image shorter */
          .grid-thesis > div:last-child > div{height:300px!important}
        }

        /* ═══ SMALL MOBILE (≤480px) ═══ */
        @media(max-width:480px){
          .hero-stats{flex-wrap:wrap!important;gap:24px!important}
          .grid-eco{grid-template-columns:1fr!important}
          .imgband-cell{height:150px!important}
          .full-img-section{height:200px!important}
        }
      `}</style>
    </>
  );
}
