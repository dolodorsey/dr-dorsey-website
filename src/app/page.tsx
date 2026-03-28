'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';
const W = `${SB}/dr_dorsey/website`;
const CG = 'https://casper-group.vercel.app/images';
const DORSEY_W = `${SB}/dr_dorsey/01_logos/DorseyNewW.png`;
const KHG_EMBLEM = `${SB}/dr_dorsey/01_logos/KOLLECTIVEemblemW.png`;
const FF_BG = `${SB}/forever_futbol/website/ff-museum-interior.png`;

/* ═══ ALL BRAND LOGOS — MARQUEE (ENLARGED) ═══ */
const ALL_LOGOS = [
  { n:'HugLife', s:`${SB}/huglife/logos/huglife-white.png`, u:'https://huglife.vercel.app' },
  { n:'Forever Futbol', s:`${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png`, u:'https://foreverfutbol.museum' },
  { n:'Casper Group', s:`${CG}/casper-logo-white.png`, u:'https://casper-group.vercel.app' },
  { n:'Good Times', s:`${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png`, u:'https://good-times-app.vercel.app' },
  { n:'NOIR', s:`${SB}/noir_event/01_logos/NOIR_LOGO.png` },
  { n:'REMIX', s:`${SB}/remix_event/01_logos/REMIX_LOGO.png` },
  { n:'Taste of Art', s:`${SB}/taste_of_art/01_logos/TASTE_OF_ART_LOGO.png` },
  { n:'WRST BHVR', s:`${SB}/wrst_bhvr_event/01_logos/WRST_BHVR_LOGO.png` },
  { n:'Gangsta Gospel', s:`${SB}/gangsta_gospel/01_logos/GANGSTA_GOSPEL_LOGO.png` },
  { n:'Angel Wings', s:`${CG}/logo-angel-wings.png` },
  { n:'Patty Daddy', s:`${CG}/logo-patty-daddy.png` },
  { n:'Taco Yaki', s:`${CG}/logo-taco-yaki.png` },
  { n:'Morning After', s:`${CG}/logo-morning-after.png` },
  { n:'Sweet Tooth', s:`${CG}/logo-sweet-tooth.png` },
  { n:'Mojo Juice', s:`${CG}/logo-mojo-juice.png` },
  { n:'Pasta Bish', s:`${CG}/logo-pasta-bish.png` },
  { n:'Mr. Oyster', s:`${CG}/logo-mr-oyster.png` },
  { n:'Espresso Co', s:`${CG}/logo-espresso-co.png` },
  { n:'TOSSD', s:`${CG}/logo-tossd.png` },
  { n:'Paparazzi', s:`${SB}/paparazzi/01_logos/PAPARAZZI_LOGO.png` },
  { n:'Pawchella', s:`${SB}/pawchella/01_logos/PAWCHELLA_LOGO.png` },
  { n:'Beauty & Beast', s:`${SB}/beauty_beast/01_logos/BEAUTY_BEAST_LOGO.png` },
  { n:'Black Ball', s:`${SB}/black_ball/01_logos/BLACK_BALL_LOGO.png` },
  { n:'Sundays Best', s:`${SB}/sundays_best/01_logos/SUNDAYS_BEST_LOGO.png` },
  { n:'ICONIC', s:`${SB}/dr_dorsey/00-brand-assets/logos/iconic-logo-gold.png` },
  { n:'Mind Studio', s:`${SB}/mind_studio/gt_card_mind_studio.png` },
  { n:'Kulture', s:'https://the-kulture-event.vercel.app/logo.png' },
  { n:'Underground King', s:`${SB}/underground_king/01_logos/UNDERGROUND_KING_LOGO.png` },
  { n:'Cravings', s:`${SB}/cravings/01_logos/CRAVINGS_LOGO.png` },
  { n:'Soul Sessions', s:'https://soul-sessions-event.vercel.app/logo.png' },
  { n:'Cinco de Drinko', s:`${SB}/cinco_de_drinko/01_logos/CINCO_DE_DRINKO_LOGO.png` },
  { n:'Secret Society', s:`${SB}/secret_society/gt_card_secret_society.png` },
  { n:'MAGA', s:'https://make-atlanta-great-again.vercel.app/brand/MAGA_hawks.png', u:'https://make-atlanta-great-again.vercel.app' },
];

/* ═══ UPDATED DISTRICTS ═══ */
const DISTRICTS = [
  { title:'Night District', sub:'Opium · HugLife × ICONIC', brands:['NOIR','REMIX','Taste of Art','Soul Sessions','Secret Society','WRST BHVR','Gangsta Gospel','Underground King','Cravings','Kulture','Pawchella','Paparazzi','Black Ball','Beauty & Beast','Sundays Best'], img:`${W}/rooftop-lounge.jpg`, logo:`${SB}/huglife/logos/huglife-white.png` },
  { title:'Culinary District', sub:'Sea Salt · Hungry AF · Tulum · Angel Wings · Espresso Co · Goodfellas Pizza', brands:['Patty Daddy','Taco Yaki','Morning After','Sweet Tooth','Mojo Juice','Pasta Bish','Mr. Oyster','TOSSD'], img:`${W}/luxury-venue.jpg`, logo:`${CG}/casper-logo-white.png` },
  { title:'Shopping District', sub:'Bodega Bodega Bodega · Stush · MAGA', brands:['Streetwear','Culture','ATL Merch'], img:`${W}/penthouse-skyline.jpg`, logo:'https://make-atlanta-great-again.vercel.app/brand/MAGA_hawks.png' },
  { title:'Technology Hub', sub:'Good Times · The Brand Studio · The Automation Agency', brands:['837 Venues','10 Cities','198 AI Agents','34 Departments'], img:`${W}/hero-bg.jpg`, logo:`${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png` },
  { title:'Wellness Wing', sub:'HURT 911 · Umbrella Injury Network · The Mind Studio · Let\'s Talk About It', brands:['Personal Injury','Telemed','Mental Health','Clinic','Consumer'], img:`${W}/thesis-bg.jpg`, logo:`${SB}/mind_studio/gt_card_mind_studio.png` },
  { title:'Service Exchange', sub:'Umbrella Auto Exchange · Umbrella Realty Group · Umbrella Clean Services · The People\'s Dept.', brands:['Auto Exchange','Realty','Clean Services','People\'s Dept.'], img:`${W}/garden-district.jpg`, logo:`${SB}/umbrella_injury/00-brand-assets/logos/hurt-911-logo-black.png` },
];

const CITIES = [
  { n:'Atlanta', s:'Georgia', c:'25+ brands', bg:`${W}/hero-bg.jpg`, hq:true },
  { n:'Houston', s:'Texas', c:'10+ brands', bg:`${W}/luxury-venue.jpg` },
  { n:'Miami', s:'Florida', c:'Expanding', bg:`${W}/rooftop-lounge.jpg` },
  { n:'Los Angeles', s:'California', c:'Active', bg:`${W}/penthouse-skyline.jpg` },
  { n:'Dallas', s:'Texas', c:'Active', bg:`${W}/garden-district.jpg` },
  { n:'Washington', s:'D.C.', c:'Active', bg:`${W}/thesis-bg.jpg` },
  { n:'Charlotte', s:'N. Carolina', c:'Active', bg:`${W}/luxury-venue.jpg` },
  { n:'New York', s:'New York', c:'Pipeline', bg:`${W}/rooftop-lounge.jpg` },
];

const CONSULT = [
  { title:'Brand Architecture', desc:'Multi-brand portfolio strategy, naming, positioning, and ecosystem design. From single concept to 57+ brand empire.', icon:'01' },
  { title:'Event Production', desc:'End-to-end event creation, ticketing strategy, venue partnerships, and night-of execution for 1,000+ capacity events.', icon:'02' },
  { title:'Restaurant & F&B', desc:'Concept development, ghost kitchen strategy, multi-unit expansion, franchise architecture, and menu engineering.', icon:'03' },
  { title:'AI & Automation', desc:'198-agent AI infrastructure, n8n workflow design, CRM automation, and fully autonomous business operations.', icon:'04' },
  { title:'Marketing Systems', desc:'GHL pipeline builds, email sequences, social media engines, content calendars, and 48K+ contact management.', icon:'05' },
  { title:'Museum & Cultural', desc:'Immersive experience design, ticketing systems, sponsorship strategy, cultural programming, and launch campaigns.', icon:'06' },
];

const GOLD = '#D4B87A';
const GB = '#E8D5A3';
const mono = 'DM Mono,monospace';
const serif = 'Cormorant Garamond,serif';
const tg = (c=GOLD):React.CSSProperties => ({fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.35em',textTransform:'uppercase',color:c});
const hd = (s='clamp(28px,5vw,72px)'):React.CSSProperties => ({fontFamily:serif,fontSize:s,fontWeight:300,lineHeight:1.1,letterSpacing:'-0.02em'});
const bar:React.CSSProperties = {width:40,height:1,background:GOLD,marginBottom:16};

function useReveal(){const ref=useRef<HTMLDivElement>(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);obs.disconnect()}},{threshold:0.08,rootMargin:'0px 0px -20px 0px'});obs.observe(el);return()=>obs.disconnect()},[]);return{ref,v}}
function Rv({children,d=0,style={}}:{children:React.ReactNode;d?:number;style?:React.CSSProperties}){const{ref,v}=useReveal();return<div ref={ref} style={{opacity:v?1:0,transform:v?'translateY(0)':'translateY(35px)',transition:`opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s`,...style}}>{children}</div>}
function Counter({target,suffix=''}:{target:number;suffix?:string}){const ref=useRef<HTMLSpanElement>(null);const[val,setVal]=useState(0);const started=useRef(false);useEffect(()=>{const el=ref.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!started.current){started.current=true;const s=performance.now();function up(t:number){const p=Math.min((t-s)/2000,1);setVal(Math.floor((1-Math.pow(1-p,4))*target));if(p<1)requestAnimationFrame(up)}requestAnimationFrame(up);obs.disconnect()}},{threshold:0.5});obs.observe(el);return()=>obs.disconnect()},[target]);return<span ref={ref}>{val}{suffix}</span>}

export default function Home(){
  const[loaded,setLoaded]=useState(false);const[scrolled,setScrolled]=useState(false);const[videoReady,setVideoReady]=useState(false);const[mob,setMob]=useState(false);const vRef=useRef<HTMLVideoElement>(null);
  useEffect(()=>{setTimeout(()=>setLoaded(true),1600);const f=()=>setScrolled(window.scrollY>60);window.addEventListener('scroll',f);return()=>window.removeEventListener('scroll',f)},[]);
  useEffect(()=>{const v=vRef.current;if(!v)return;const r=()=>setVideoReady(true);v.addEventListener('canplaythrough',r);v.addEventListener('playing',r);const t=setTimeout(()=>setVideoReady(true),3000);return()=>{v.removeEventListener('canplaythrough',r);v.removeEventListener('playing',r);clearTimeout(t)}},[]);
  const go=useCallback((id:string)=>{setMob(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'})},[]);

  return<>
    {/* PRELOADER */}
    <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',background:'#080604',zIndex:10000,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',transition:'opacity 1s cubic-bezier(0.16,1,0.3,1),visibility 1s',...(loaded?{opacity:0,visibility:'hidden' as const,pointerEvents:'none' as const}:{})}}>
      <img src={DORSEY_W} alt="" style={{width:200,objectFit:'contain',marginBottom:16}}/>
      <div style={{fontFamily:mono,fontSize:9,letterSpacing:'0.3em',textTransform:'uppercase',color:GOLD,opacity:0.6}}>The Kollective Hospitality Group</div>
    </div>

    {/* MOBILE MENU */}
    <div style={{position:'fixed',top:0,right:mob?0:'-100%',width:'100%',height:'100%',background:'#080604',zIndex:999,display:'flex',flexDirection:'column',justifyContent:'center',padding:'96px clamp(20px,4vw,80px)',transition:'right 0.6s cubic-bezier(0.16,1,0.3,1)'}}>
      {['ecosystem','strategist','districts','cities','connect'].map(id=>(<a key={id} href={`#${id}`} style={{fontFamily:serif,fontSize:'clamp(28px,5vw,56px)',fontWeight:300,textDecoration:'none',display:'block',padding:'14px 0',borderBottom:'1px solid rgba(245,240,232,0.06)',color:'#F5F0E8'}} onClick={e=>{e.preventDefault();go(id)}}>{id.charAt(0).toUpperCase()+id.slice(1)}</a>))}
    </div>

    {/* NAV */}
    <nav style={{position:'fixed',top:0,left:0,width:'100%',zIndex:1000,padding:'20px clamp(20px,4vw,80px)',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'background 0.4s,backdrop-filter 0.4s',...(scrolled?{background:'rgba(8,6,4,0.9)',backdropFilter:'blur(20px)'}:{})}}>
      <a href="#" style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none',color:'#F5F0E8'}}><img src={DORSEY_W} alt="" style={{height:28,objectFit:'contain'}}/></a>
      <ul className="desk-nav" style={{display:'flex',gap:36,listStyle:'none'}}>{['ecosystem','strategist','districts','cities'].map(id=>(<li key={id}><a href={`#${id}`} className="na" style={{...tg('rgba(245,240,232,0.5)'),textDecoration:'none',letterSpacing:'0.15em'}} onClick={e=>{e.preventDefault();go(id)}}>{id}</a></li>))}</ul>
      <a href="#connect" className="desk-cta" style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.2em',textTransform:'uppercase',color:'#080604',background:GOLD,padding:'9px 22px',textDecoration:'none'}} onClick={e=>{e.preventDefault();go('connect')}}>Enter</a>
      <button className="mob-btn" style={{display:'none',background:'none',border:'none',cursor:'pointer',width:26,height:18,position:'relative'}} onClick={()=>setMob(!mob)}>
        <span style={{display:'block',width:'100%',height:1,background:'#F5F0E8',position:'absolute',left:0,top:mob?8:2,transition:'all 0.3s',transform:mob?'rotate(45deg)':'none'}}/>
        <span style={{display:'block',width:'100%',height:1,background:'#F5F0E8',position:'absolute',left:0,top:8,transition:'all 0.3s',opacity:mob?0:1}}/>
        <span style={{display:'block',width:'100%',height:1,background:'#F5F0E8',position:'absolute',left:0,top:mob?8:14,transition:'all 0.3s',transform:mob?'rotate(-45deg)':'none'}}/>
      </button>
    </nav>

    {/* ═══ HERO ═══ */}
    <section style={{position:'relative',height:'100vh',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'center'}}>
      <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0}}>
        <img src={`${W}/hero-bg.jpg`} alt="" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.5}}/>
        <video ref={vRef} style={{width:'100%',height:'100%',objectFit:'cover',opacity:videoReady?0.65:0,transition:'opacity 2s',position:'relative',zIndex:1}} autoPlay muted loop playsInline preload="auto"><source src={`${W}/hero-video.mp4`} type="video/mp4"/></video>
        <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:2,background:'linear-gradient(180deg,rgba(8,6,4,0.3) 0%,rgba(8,6,4,0.05) 35%,rgba(8,6,4,0.05) 55%,rgba(8,6,4,0.7) 85%,#080604 100%)'}}/>
      </div>
      <div style={{position:'relative',zIndex:3,maxWidth:550,padding:'0 clamp(20px,4vw,80px)'}}>
        <div style={{...tg(),marginBottom:20,animation:'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.8s both'}}>Dr. Dorsey + The Kollective</div>
        <h1 style={{fontFamily:serif,fontSize:'clamp(32px,6vw,80px)',fontWeight:300,lineHeight:1.1,letterSpacing:'-0.02em',animation:'fadeUp 1s cubic-bezier(0.16,1,0.3,1) 2s both'}}>Live for today.<br/>Plan for <em style={{fontStyle:'italic',color:GB}}>tomorrow.</em><br/>Party <em style={{fontStyle:'italic',color:GB}}>tonight!</em></h1>
        <a href="#ecosystem" style={{display:'inline-block',fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.25em',textTransform:'uppercase',color:GOLD,border:`1px solid ${GOLD}`,padding:'14px 40px',textDecoration:'none',marginTop:40,animation:'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 2.4s both'}} onClick={e=>{e.preventDefault();go('ecosystem')}}>Enter the Ecosystem</a>
      </div>
      <div style={{position:'absolute',bottom:0,left:0,width:'100%',height:2,background:`linear-gradient(90deg,transparent,${GOLD},transparent)`,zIndex:3,opacity:0.4}}/>
    </section>

    {/* ═══ LOGO MARQUEE — ENLARGED ═══ */}
    <div style={{padding:'36px 0',background:'#080604',borderBottom:'1px solid rgba(245,240,232,0.04)',overflow:'hidden'}}>
      <div style={{display:'flex',width:'max-content'}} className="marquee-logos">
        {[...ALL_LOGOS,...ALL_LOGOS,...ALL_LOGOS].map((l,i)=>(<a key={`${l.n}-${i}`} href={l.u||'#'} target={l.u?'_blank':undefined} rel="noopener noreferrer" className="logo-i" style={{opacity:0.55,transition:'opacity 0.4s',flexShrink:0,padding:'0 clamp(20px,3vw,44px)'}}><div style={{width:120,height:52,display:'flex',alignItems:'center',justifyContent:'center'}}><img src={l.s} alt={l.n} style={{maxWidth:120,maxHeight:52,objectFit:'contain',filter:'brightness(1.8) contrast(1.1)'}}/></div></a>))}
      </div>
    </div>

    {/* ═══ ECOSYSTEM — BLACK — MORE VISIBLE TEXT ═══ */}
    <section style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',background:'#080604'}} id="ecosystem">
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <Rv><div style={bar}/></Rv>
        <Rv><h2 style={{...hd('clamp(28px,5vw,64px)'),marginBottom:64}}>Architect of Experiences,<br/>Curator of <em style={{fontStyle:'italic',color:GB}}>Worlds.</em></h2></Rv>
        <div className="eco-grid" style={{display:'grid',gridTemplateColumns:'1fr 1.4fr 1fr',gap:2}}>
          <Rv d={0.1}><div style={{position:'relative',height:'clamp(300px,40vw,500px)',overflow:'hidden',background:'#0D0A07'}}><img src={`${W}/thesis-bg.jpg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.7}}/><div style={{position:'absolute',bottom:0,left:0,width:'100%',padding:'32px 28px',background:'linear-gradient(0deg,rgba(8,6,4,0.95) 0%,transparent 100%)'}}><div style={{fontFamily:serif,fontSize:'clamp(16px,2vw,24px)',fontWeight:300,fontStyle:'italic',color:GB,lineHeight:1.3}}>Architect of Experiences,<br/>Curator of Worlds</div></div></div></Rv>
          <Rv d={0.2}><div style={{position:'relative',height:'clamp(300px,40vw,500px)',overflow:'hidden',background:'#0D0A07',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:32}}><img src={`${W}/hero-bg.jpg`} alt="" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.2}}/><div style={{position:'relative',zIndex:1,textAlign:'center'}}><div style={{fontFamily:serif,fontSize:'clamp(18px,2.5vw,32px)',fontWeight:400,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:32,color:GB}}>Empire Command Map</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,maxWidth:400,margin:'0 auto'}}>{DISTRICTS.map(d=>(<div key={d.title} style={{border:`1px solid rgba(232,213,163,0.25)`,padding:'14px 16px',fontFamily:mono,fontSize:'clamp(8px,0.75vw,10px)',letterSpacing:'0.12em',textTransform:'uppercase',color:GB,textAlign:'center',background:'rgba(232,213,163,0.06)',transition:'all 0.3s',cursor:'pointer'}} onMouseEnter={e=>{e.currentTarget.style.borderColor=GB;e.currentTarget.style.background='rgba(232,213,163,0.12)'}} onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(232,213,163,0.25)';e.currentTarget.style.background='rgba(232,213,163,0.06)'}}>{d.title}</div>))}</div><div style={{display:'flex',gap:40,justifyContent:'center',marginTop:32}}>{[{t:57,s:'+',l:'Ventures'},{t:8,s:'',l:'Cities'},{t:198,s:'',l:'Agents'}].map(s=>(<div key={s.l} style={{textAlign:'center'}}><div style={{fontFamily:serif,fontSize:'clamp(24px,3vw,44px)',fontWeight:300,color:GB,lineHeight:1}}><Counter target={s.t} suffix={s.s}/></div><div style={{fontFamily:mono,fontSize:8,letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(232,213,163,0.5)',marginTop:4}}>{s.l}</div></div>))}</div></div></div></Rv>
          <Rv d={0.3}><div style={{position:'relative',height:'clamp(300px,40vw,500px)',overflow:'hidden',background:'#0D0A07'}}><img src={FF_BG} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.75}}/><div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.1) 50%,rgba(0,0,0,0.7) 100%)'}}/><div style={{position:'absolute',top:24,left:0,width:'100%',textAlign:'center',zIndex:1}}><div style={{fontFamily:serif,fontSize:'clamp(18px,2.2vw,30px)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'#F5F0E8',textShadow:'0 2px 20px rgba(0,0,0,0.8)'}}>Forever Futbol</div><div style={{fontFamily:mono,fontSize:9,letterSpacing:'0.2em',color:GB,marginTop:6,textShadow:'0 2px 10px rgba(0,0,0,0.8)'}}>May 29 — Jul 6, 2026 · Atlanta</div></div><div style={{position:'absolute',bottom:24,left:24,zIndex:1}}><img src={`${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png`} alt="" style={{height:48,objectFit:'contain',filter:'brightness(1.5) drop-shadow(0 2px 8px rgba(0,0,0,0.6))',opacity:0.9}}/></div></div></Rv>
        </div>
      </div>
    </section>

    {/* ═══ STRATEGIST — WHITE — ELABORATE ═══ */}
    <section style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',background:'#F5F0E8',color:'#080604'}} id="strategist">
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <Rv><div style={{display:'flex',alignItems:'center',gap:16,marginBottom:32}}><div style={{width:40,height:1,background:'#8B7340'}}/><div style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.35em',textTransform:'uppercase',color:'#8B7340'}}>Strategy + Consulting</div></div></Rv>
        <div className="strat-hero" style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:'clamp(32px,5vw,80px)',marginBottom:64,alignItems:'center'}}>
          <Rv><div><h2 style={{fontFamily:serif,fontSize:'clamp(32px,5.5vw,72px)',fontWeight:300,lineHeight:1.05,letterSpacing:'-0.02em',color:'#080604',marginBottom:24}}>The <em style={{fontStyle:'italic',color:'#8B7340'}}>Strategist.</em></h2><p style={{fontSize:'clamp(15px,1.4vw,19px)',color:'rgba(8,6,4,0.55)',lineHeight:1.8,marginBottom:32}}>Dr. Dorsey doesn&rsquo;t just build brands — he architects ecosystems. With 57+ ventures across 8 cities, 198 AI agents, and 34 automated departments, the blueprint isn&rsquo;t theoretical. It&rsquo;s running. Now it&rsquo;s available to those who build at this level.</p><div style={{display:'flex',gap:32}}>{[{n:'57+',l:'Brands Built'},{n:'8',l:'Cities'},{n:'$0',l:'VC Raised'}].map(s=>(<div key={s.l}><div style={{fontFamily:serif,fontSize:'clamp(28px,3vw,48px)',fontWeight:300,color:'#8B7340',lineHeight:1}}>{s.n}</div><div style={{fontFamily:mono,fontSize:8,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(8,6,4,0.35)',marginTop:4}}>{s.l}</div></div>))}</div></div></Rv>
          <Rv d={0.2}><div style={{position:'relative',height:'clamp(300px,35vw,450px)',overflow:'hidden'}}><img src={`${W}/thesis-bg.jpg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.85,filter:'brightness(1.1)'}}/><div style={{position:'absolute',bottom:0,left:0,right:0,padding:'40px 32px',background:'linear-gradient(0deg,rgba(8,6,4,0.95) 0%,transparent 100%)'}}><div style={{fontFamily:serif,fontSize:'clamp(14px,1.5vw,20px)',fontWeight:300,fontStyle:'italic',color:GB,lineHeight:1.4}}>&ldquo;I built the system that builds the brands.&rdquo;</div><div style={{fontFamily:mono,fontSize:8,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,213,163,0.5)',marginTop:8}}>— Dr. DoLo Dorsey</div></div></div></Rv>
        </div>

        <div className="consult-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,marginBottom:56}}>
          {CONSULT.map((s,i)=>(<Rv key={s.title} d={i*0.06}><div className="consult-card" style={{background:'#FFFDF8',border:'1px solid rgba(8,6,4,0.06)',padding:'clamp(32px,3vw,48px)',transition:'all 0.4s',cursor:'pointer',height:'100%',position:'relative',overflow:'hidden'}}><div style={{fontFamily:serif,fontSize:'clamp(56px,6vw,80px)',fontWeight:300,color:'rgba(139,115,64,0.08)',position:'absolute',top:-8,right:12,lineHeight:1}}>{s.icon}</div><div style={{fontFamily:serif,fontSize:'clamp(22px,2.5vw,32px)',fontWeight:400,color:'#080604',marginBottom:14,lineHeight:1.2,position:'relative'}}>{s.title}</div><div style={{fontSize:'clamp(12px,1vw,14px)',color:'rgba(8,6,4,0.5)',lineHeight:1.75,position:'relative'}}>{s.desc}</div></div></Rv>))}
        </div>

        <Rv d={0.3}><div style={{background:'#080604',padding:'clamp(48px,6vw,80px)',textAlign:'center',position:'relative',overflow:'hidden'}}><div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'radial-gradient(ellipse at 50% 50%,rgba(232,213,163,0.06) 0%,transparent 60%)'}}/><div style={{position:'relative',zIndex:1}}><div style={{fontFamily:serif,fontSize:'clamp(28px,4vw,56px)',fontWeight:300,color:'#F5F0E8',lineHeight:1.15,marginBottom:16}}>Book a Strategy <em style={{fontStyle:'italic',color:GB}}>Session.</em></div><div style={{fontFamily:mono,fontSize:'clamp(9px,0.8vw,11px)',letterSpacing:'0.15em',color:'rgba(245,240,232,0.4)',textTransform:'uppercase',marginBottom:32,maxWidth:500,margin:'0 auto 32px'}}>1-on-1 with Dr. Dorsey · Brand Architecture · Operational Buildout · AI Systems Design</div><a href="mailto:thedoctordorsey@gmail.com?subject=Strategy Session Inquiry" style={{fontFamily:mono,fontSize:'clamp(9px,0.8vw,11px)',letterSpacing:'0.2em',textTransform:'uppercase',color:'#080604',background:GB,padding:'16px 48px',textDecoration:'none',display:'inline-block'}}>Book Now →</a></div></div></Rv>
      </div>
    </section>

    {/* ═══ DISTRICTS — BLACK — WORDS ON TOP OF IMAGES ═══ */}
    <section style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',background:'#080604'}} id="districts">
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <Rv><div style={{...tg(),marginBottom:12}}>The Districts</div></Rv>
        <Rv><h2 style={{...hd('clamp(26px,4.5vw,56px)'),marginBottom:48}}>Seven divisions. One <em style={{fontStyle:'italic',color:GB}}>ecosystem.</em></h2></Rv>
        <div className="dist-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:2}}>
          {DISTRICTS.map((d,i)=>(<Rv key={d.title} d={i*0.08}><div className="dist-card" style={{position:'relative',height:'clamp(280px,34vw,440px)',overflow:'hidden',background:'#0D0A07',cursor:'pointer'}}>
            <img src={d.img} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.5,transition:'opacity 0.6s,transform 6s cubic-bezier(0.37,0,0.63,1)'}}/>
            <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,rgba(8,6,4,0.5) 0%,rgba(8,6,4,0.2) 40%,rgba(8,6,4,0.7) 100%)'}}/>
            {/* TITLE OVERLAY ON IMAGE */}
            <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:1,padding:'clamp(20px,2vw,32px)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
              <div>
                <div style={{fontFamily:serif,fontSize:'clamp(22px,3vw,40px)',fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',color:'#F5F0E8',marginBottom:6,textShadow:'0 2px 20px rgba(0,0,0,0.8)'}}>{d.title}</div>
                <div style={{fontFamily:mono,fontSize:'clamp(9px,0.8vw,11px)',letterSpacing:'0.12em',color:GB,lineHeight:1.6,textShadow:'0 1px 8px rgba(0,0,0,0.6)'}}>{d.sub}</div>
              </div>
              <div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:14}}>
                  {d.brands.slice(0,6).map(b=><span key={b} style={{fontFamily:mono,fontSize:7,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(245,240,232,0.7)',border:'1px solid rgba(245,240,232,0.15)',padding:'3px 8px',background:'rgba(0,0,0,0.3)',backdropFilter:'blur(4px)'}}>{b}</span>)}
                  {d.brands.length>6&&<span style={{fontFamily:mono,fontSize:7,letterSpacing:'0.1em',textTransform:'uppercase',color:GOLD,padding:'3px 8px'}}>+{d.brands.length-6} more</span>}
                </div>
                <img src={d.logo} alt="" style={{maxWidth:44,maxHeight:44,objectFit:'contain',filter:'brightness(1.8) drop-shadow(0 2px 6px rgba(0,0,0,0.5))',opacity:0.8}}/>
              </div>
            </div>
          </div></Rv>))}
        </div>
      </div>
    </section>

    {/* ═══ QUOTE — LEFT ═══ */}
    <div style={{position:'relative',height:'clamp(250px,35vw,400px)',overflow:'hidden'}}>
      <img src={`${W}/penthouse-skyline.jpg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.55}}/>
      <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,#080604 0%,transparent 25%,transparent 75%,#080604 100%)',display:'flex',alignItems:'center',justifyContent:'flex-start',padding:'0 clamp(40px,6vw,120px)'}}>
        <div style={{fontFamily:serif,fontSize:'clamp(20px,3.5vw,48px)',fontWeight:300,fontStyle:'italic',color:GB,textAlign:'left',maxWidth:550,lineHeight:1.3}}>&ldquo;Everybody wants to eat at night — nobody wants to hunt in the morning.&rdquo;</div>
      </div>
    </div>

    {/* ═══ CITIES — WHITE ═══ */}
    <section style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',background:'#F5F0E8',color:'#080604'}} id="cities">
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <Rv><div style={{width:40,height:1,background:'#080604',marginBottom:16}}/></Rv>
        <Rv><h2 style={{fontFamily:serif,fontSize:'clamp(26px,4.5vw,56px)',fontWeight:300,lineHeight:1.1,letterSpacing:'-0.02em',marginBottom:48,color:'#080604'}}>Eight cities. One <em style={{fontStyle:'italic',color:'#8B7340'}}>frequency.</em></h2></Rv>
        <div className="city-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:2}}>
          {CITIES.map((c,i)=>(<Rv key={c.n} d={i*0.06}><div className="city-c" style={{position:'relative',overflow:'hidden',background:'#000',minHeight:c.hq?260:140,...(c.hq?{gridColumn:'span 2',gridRow:'span 2'}:{})}}><img src={c.bg} alt="" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.6,transition:'opacity 0.5s,transform 6s cubic-bezier(0.37,0,0.63,1)'}}/><div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.5) 100%)'}}/><div style={{position:'relative',zIndex:1,padding:c.hq?'clamp(32px,4vw,56px)':'clamp(20px,2vw,32px)',height:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>{c.hq&&<span style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.35em',textTransform:'uppercase',color:GB,marginBottom:12}}>Headquarters</span>}<div style={{fontFamily:serif,fontSize:c.hq?'clamp(32px,5vw,64px)':'clamp(18px,2.5vw,28px)',fontWeight:400,color:'#F5F0E8'}}>{c.n}</div><div style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.3em',textTransform:'uppercase',color:GB,marginTop:2}}>{c.s}</div><div style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',color:'rgba(245,240,232,0.5)',marginTop:6}}>{c.c}</div></div></div></Rv>))}
        </div>
      </div>
    </section>

    {/* ═══ CONNECT — BLACK ═══ */}
    <section style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',background:'#080604'}} id="connect">
      <div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}>
        <Rv><div style={{...bar,margin:'0 auto 16px'}}/></Rv>
        <Rv><h2 style={{...hd('clamp(28px,5vw,64px)'),marginBottom:24}}>Live <em style={{fontStyle:'italic',color:GB}}>The Kollective.</em></h2></Rv>
        <Rv d={0.1}><p style={{fontSize:'clamp(14px,1.3vw,18px)',color:'rgba(245,240,232,0.5)',lineHeight:1.7,maxWidth:560,margin:'0 auto 48px'}}>Whether it&rsquo;s sponsorship, investment, venue partnership, brand collaboration, or consulting — the ecosystem is designed for those who build at this level.</p></Rv>
        <Rv d={0.2}><div style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap',marginBottom:56}}><a href="mailto:thedoctordorsey@gmail.com?subject=Partnership — Dr. Dorsey" style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.2em',textTransform:'uppercase',color:'#080604',background:GB,padding:'14px 36px',textDecoration:'none',border:`1px solid ${GB}`}}>Start a Conversation</a><a href="https://instagram.com/dolodorsey" target="_blank" rel="noopener noreferrer" style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.2em',textTransform:'uppercase',color:'#F5F0E8',background:'transparent',padding:'14px 36px',textDecoration:'none',border:'1px solid rgba(245,240,232,0.2)'}}>@dolodorsey</a></div></Rv>
        <Rv d={0.3}><div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:32,maxWidth:600,margin:'0 auto 40px'}}><div style={{textAlign:'center',padding:24,border:'1px solid rgba(245,240,232,0.06)',background:'rgba(245,240,232,0.02)'}}><div style={{...tg(),marginBottom:8}}>Dr. Dorsey</div><a href="mailto:thedoctordorsey@gmail.com" style={{fontSize:'clamp(12px,1vw,15px)',color:GB,textDecoration:'none',borderBottom:'1px solid rgba(232,213,163,0.3)',paddingBottom:2}}>thedoctordorsey@gmail.com</a></div><div style={{textAlign:'center',padding:24,border:'1px solid rgba(245,240,232,0.06)',background:'rgba(245,240,232,0.02)'}}><div style={{...tg(),marginBottom:8}}>The Kollective</div><a href="mailto:thekollectivehospitality@gmail.com" style={{fontSize:'clamp(12px,1vw,15px)',color:GB,textDecoration:'none',borderBottom:'1px solid rgba(232,213,163,0.3)',paddingBottom:2}}>thekollectivehospitality@gmail.com</a></div></div></Rv>
        <Rv d={0.4}><div style={{display:'flex',gap:40,justifyContent:'center',flexWrap:'wrap'}}>{[{l:'Instagram',v:'@dolodorsey',h:'https://instagram.com/dolodorsey'},{l:'HQ',v:'Atlanta, Georgia'}].map(d=>(<div key={d.l} style={{textAlign:'center'}}><div style={{...tg(),marginBottom:6}}>{d.l}</div><div style={{fontSize:'clamp(12px,1vw,15px)',color:'rgba(245,240,232,0.5)'}}>{d.h?<a href={d.h} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none',color:'inherit',borderBottom:'1px solid rgba(245,240,232,0.1)'}}>{d.v}</a>:d.v}</div></div>))}</div></Rv>
      </div>
    </section>

    {/* FOOTER — WHITE */}
    <footer className="ftr" style={{padding:'40px clamp(20px,4vw,80px)',borderTop:'1px solid rgba(8,6,4,0.1)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#F5F0E8',color:'#080604'}}>
      <div style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.2em',color:'rgba(8,6,4,0.3)'}}>&copy; 2026 Dr. DoLo Dorsey — The Kollective Hospitality Group</div>
      <div style={{display:'flex',gap:24}}>{[{n:'Instagram',u:'https://instagram.com/dolodorsey'},{n:'Twitter',u:'https://twitter.com/mrdolodorsey'},{n:'Facebook',u:'https://facebook.com/DoLoDorsey'}].map(s=>(<a key={s.n} href={s.u} target="_blank" rel="noopener noreferrer" style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.1em',color:'rgba(8,6,4,0.3)',textDecoration:'none'}}>{s.n}</a>))}</div>
    </footer>

    <style>{`
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}
      .marquee-logos{animation:marqueeScroll 80s linear infinite}
      .marquee-logos:hover{animation-play-state:paused}
      .logo-i:hover{opacity:1!important}
      .na:hover{color:#F5F0E8!important}
      .dist-card:hover img{opacity:0.65!important;transform:scale(1.03)!important}
      .city-c:hover img{opacity:0.75!important;transform:scale(1.03)!important}
      .consult-card:hover{border-color:rgba(139,115,64,0.3)!important;box-shadow:0 12px 40px rgba(0,0,0,0.1)!important;transform:translateY(-2px)}
      @media(max-width:1024px){.eco-grid{grid-template-columns:1fr!important}.dist-grid{grid-template-columns:repeat(2,1fr)!important}.city-grid{grid-template-columns:repeat(2,1fr)!important}.consult-grid{grid-template-columns:repeat(2,1fr)!important}.strat-hero{grid-template-columns:1fr!important}}
      @media(max-width:768px){.desk-nav{display:none!important}.desk-cta{display:none!important}.mob-btn{display:block!important}.dist-grid{grid-template-columns:1fr!important}.city-grid{grid-template-columns:1fr!important}.consult-grid{grid-template-columns:1fr!important}.city-c[style*="grid-column"]{grid-column:span 1!important;grid-row:span 1!important}.ftr{flex-direction:column!important;gap:16px!important;text-align:center!important}.strat-hero{grid-template-columns:1fr!important}}
    `}</style>
  </>;
}
