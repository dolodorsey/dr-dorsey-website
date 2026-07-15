'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { CART_ORIGIN } from '@/lib/shopify';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';
const W = `${SB}/dr_dorsey/website`;
const CG = 'https://casper-group.vercel.app/images';
const DORSEY_W = `${SB}/dr_dorsey/01_logos/DorseyNewW.png`;
const FF_BG = `${SB}/forever_futbol/website/ff-museum-interior.png`;
const BOOK_URL = `${CART_ORIGIN}/products/hakuna-matata-by-dr-dorsey`;
const BOOK_COVER = 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/cover-hero.png?v=1783903956';

const SIGNATURE_EVENTS = [
  { name:'Sole Exchange', label:'Sneaker culture · Community', image:`${SB}/email-newsletters/sole-exchange-flyer-v3-air-force-1.png`, logo:`${SB}/email-newsletters/sole-exchange-logo.png` },
  { name:'Diaspora in ATL', label:'Music · Food · Culture', image:'/images/events/diaspora/main-festival.jpg', monogram:'DIASPORA\nIN ATL' },
  { name:'Grown-ish', label:'Culture · Nightlife', image:`${SB}/grownish/03_event_flyers/grownish-jcole-falloff-skyline.jpg`, logo:`${SB}/grownish/logo/grownish-logo-primary.jpg` },
  { name:'Taste of Art', label:'Diaspora in ATL · Art Show', image:'/images/events/diaspora/taste-of-art.jpg', logo:`${SB}/taste_of_art/01_logos/TASTE_OF_ART_LOGO.png` },
  { name:'Freedom Fest', label:'Culture · Independence', image:`${W}/garden-district.jpg`, monogram:'FREEDOM\nFEST', past:true },
];

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
function Counter({target,suffix=''}:{target:number;suffix?:string}){const ref=useRef<HTMLSpanElement>(null);const[val,setVal]=useState(0);const started=useRef(false);useEffect(()=>{const el=ref.current;if(!el)return;let frame=0;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!started.current){started.current=true;const s=performance.now();const up=(t:number)=>{const p=Math.min((t-s)/2000,1);setVal(Math.floor((1-Math.pow(1-p,4))*target));if(p<1)frame=requestAnimationFrame(up)};frame=requestAnimationFrame(up);obs.disconnect()}},{threshold:0.5});obs.observe(el);return()=>{obs.disconnect();cancelAnimationFrame(frame)}},[target]);return<span ref={ref}>{val}{suffix}</span>}

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
      {['events','ecosystem','strategist','districts','cities','connect'].map(id=>(<a key={id} href={`#${id}`} style={{fontFamily:serif,fontSize:'clamp(28px,5vw,56px)',fontWeight:300,textDecoration:'none',display:'block',padding:'14px 0',borderBottom:'1px solid rgba(245,240,232,0.06)',color:'#F5F0E8'}} onClick={e=>{e.preventDefault();go(id)}}>{id.charAt(0).toUpperCase()+id.slice(1)}</a>))}
      <a href={BOOK_URL} style={{fontFamily:serif,fontSize:'clamp(28px,5vw,56px)',fontWeight:300,textDecoration:'none',display:'block',padding:'14px 0',borderBottom:'1px solid rgba(245,240,232,0.06)',color:GOLD}}>Hakuna Matata</a>
      <a href="/learn" style={{fontFamily:serif,fontSize:'clamp(28px,5vw,56px)',fontWeight:300,textDecoration:'none',display:'block',padding:'14px 0',borderBottom:'1px solid rgba(245,240,232,0.06)',color:GOLD}}>Courses + Consultations</a>
      <a href="/brands" style={{fontFamily:serif,fontSize:'clamp(28px,5vw,56px)',fontWeight:300,textDecoration:'none',display:'block',padding:'14px 0',borderBottom:'1px solid rgba(245,240,232,0.06)',color:GOLD}}>Brands</a>
    </div>

    {/* NAV */}
    <nav style={{position:'fixed',top:0,left:0,width:'100%',zIndex:1000,padding:'20px clamp(20px,4vw,80px)',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'background 0.4s,backdrop-filter 0.4s',...(scrolled?{background:'rgba(8,6,4,0.9)',backdropFilter:'blur(20px)'}:{})}}>
      <a href="#" style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none',color:'#F5F0E8'}}><img src={DORSEY_W} alt="" style={{height:28,objectFit:'contain'}}/></a>
      <ul className="desk-nav" style={{display:'flex',gap:30,listStyle:'none'}}>{['events','ecosystem','strategist','districts','cities'].map(id=>(<li key={id}><a href={`#${id}`} className="na" style={{...tg('rgba(245,240,232,0.5)'),textDecoration:'none',letterSpacing:'0.15em'}} onClick={e=>{e.preventDefault();go(id)}}>{id}</a></li>))}<li><a href="/learn" className="na" style={{...tg(GOLD),textDecoration:'none',letterSpacing:'0.15em'}}>Learn</a></li><li><a href={BOOK_URL} className="na" style={{...tg(GOLD),textDecoration:'none',letterSpacing:'0.15em'}}>Book</a></li><li><a href="/brands" className="na" style={{...tg(GOLD),textDecoration:'none',letterSpacing:'0.15em'}}>Brands</a></li></ul>
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
      <div className="hero-content" style={{position:'relative',zIndex:3,width:'100%',maxWidth:1400,margin:'0 auto',padding:'80px clamp(20px,4vw,80px) 20px',display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(220px,0.72fr)',alignItems:'center',gap:'clamp(28px,6vw,100px)'}}>
        <div style={{maxWidth:620}}>
          <div style={{...tg(),marginBottom:20,animation:'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.8s both'}}>Dr. Dorsey — The Strategist</div>
          <h1 style={{fontFamily:serif,fontSize:'clamp(32px,6vw,80px)',fontWeight:300,lineHeight:1.1,letterSpacing:'-0.02em',animation:'fadeUp 1s cubic-bezier(0.16,1,0.3,1) 2s both'}}>Live for today.<br/>Plan for <em style={{fontStyle:'italic',color:GB}}>tomorrow.</em><br/>Party <em style={{fontStyle:'italic',color:GB}}>tonight!</em></h1>
          <div className="hero-actions" style={{display:'flex',gap:16,flexWrap:'wrap',marginTop:40,animation:'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 2.4s both'}}>
            <a href={BOOK_URL} className="book-btn" style={{display:'inline-block',fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.25em',textTransform:'uppercase',color:'#080604',background:GOLD,border:`1px solid ${GOLD}`,padding:'14px 40px',textDecoration:'none',fontWeight:600,transition:'all 0.35s'}}>Buy Hakuna Matata — $44.44</a>
            <a href="#ecosystem" style={{display:'inline-block',fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.25em',textTransform:'uppercase',color:GOLD,border:`1px solid ${GOLD}`,padding:'14px 40px',textDecoration:'none'}} onClick={e=>{e.preventDefault();go('ecosystem')}}>Enter the Ecosystem</a>
          </div>
        </div>
        <a href={BOOK_URL} className="hero-book" aria-label="Buy Hakuna Matata by Dr. Dorsey" style={{justifySelf:'center',textDecoration:'none',color:'#F5F0E8',textAlign:'center',animation:'fadeUp 1s cubic-bezier(0.16,1,0.3,1) 2.2s both'}}>
          <div className="hero-book-kicker" style={{...tg(GB),letterSpacing:'0.28em',marginBottom:12}}>New Release · By Dr. Dorsey</div>
          <img src={BOOK_COVER} alt="Hakuna Matata by Dr. Dorsey book cover" style={{display:'block',width:'clamp(190px,24vw,360px)',maxHeight:'58vh',objectFit:'contain',filter:'drop-shadow(0 28px 42px rgba(0,0,0,0.58)) drop-shadow(0 0 36px rgba(212,184,122,0.16))',transition:'transform 0.45s cubic-bezier(0.16,1,0.3,1)'}}/>
          <div className="hero-book-shopline" style={{fontFamily:mono,fontSize:10,letterSpacing:'0.24em',textTransform:'uppercase',color:GOLD,marginTop:14}}>Shop now · $44.44 →</div>
        </a>
      </div>
      <div style={{position:'absolute',bottom:0,left:0,width:'100%',height:2,background:`linear-gradient(90deg,transparent,${GOLD},transparent)`,zIndex:3,opacity:0.4}}/>
    </section>

    {/* ═══ HAKUNA MATATA — BOOK FEATURE ═══ */}
    <section className="book-feature" id="hakuna-matata">
      <div className="book-feature-art"><div className="book-glow"/><span className="book-edition">THE DEFINITIVE DR. DORSEY EDITION</span><img src={BOOK_COVER} alt="Hakuna Matata by Dr. Dorsey"/><div className="book-price">$44.44</div></div>
      <div className="book-feature-copy">
        <div style={tg('#8B7340')}>THE BOOK BEHIND THE PHILOSOPHY</div>
        <h2>Hakuna<br/><em>Matata.</em></h2>
        <div className="book-rule"/>
        <p className="book-lead">A philosophy for living with intention, building without fear, and refusing to postpone the life you were meant to experience.</p>
        <blockquote>“Live for today. Plan for tomorrow. Party tonight.”</blockquote>
        <div className="book-pillars"><div><b>01</b><strong>Perspective</strong><span>Turn pressure into clarity.</span></div><div><b>02</b><strong>Purpose</strong><span>Build the life behind the goals.</span></div><div><b>03</b><strong>Presence</strong><span>Stop waiting to start living.</span></div></div>
        <a href={BOOK_URL} className="book-feature-cta">Get the book <span>→</span></a>
      </div>
    </section>

    {/* ═══ COURSES + CONSULTATIONS — HOMEPAGE FEATURE ═══ */}
    <section className="learn-feature">
      <div className="learn-feature-head"><div><span>THE DOCTOR DORSEY ASCENSION SYSTEM</span><h2>Knowledge is cheap.<br/><em>Execution changes everything.</em></h2></div><p>Courses, cohorts, private strategy, and enterprise-level advisory—organized by the depth of transformation your next move actually requires.</p></div>
      <div className="learn-level-preview">
        {[{n:'01',name:'Essentials',sub:'Self-paced execution',price:'$49–$499'},{n:'02',name:'Premium',sub:'Interactive cohort',price:'$500–$2K'},{n:'03',name:'Elite',sub:'Private application',price:'$2K–$5K'},{n:'04',name:'Mastery',sub:'Certification + licensing',price:'$5K–$10K+'}].map((level)=><a key={level.n} href="/learn#course-levels"><b>{level.n}</b><span>{level.sub}</span><h3>{level.name}</h3><strong>{level.price}</strong><i>Explore level →</i></a>)}
      </div>
      <div className="learn-feature-actions"><a href="/learn">Explore courses + consultations</a><a href="/learn#consultations">Choose direct access</a></div>
    </section>

    {/* ═══ BRAND PORTFOLIO WALL ═══ */}
    <section className="brand-wall">
      <div className="brand-wall-head"><div><span>THE KOLLECTIVE PORTFOLIO</span><h2>Not concepts.<br/><em>Operating brands.</em></h2></div><div className="brand-wall-count"><strong>57+</strong><span>ventures across<br/>seven divisions</span></div></div>
      <div className="brand-logo-grid">{ALL_LOGOS.filter((brand)=>!brand.s.startsWith(CG)).slice(0,18).map((brand)=><a key={brand.n} href={brand.u||'/brands'} target={brand.u?'_blank':undefined} rel={brand.u?'noopener noreferrer':undefined}><div><img src={brand.s} alt={`${brand.n} logo`}/></div><span>{brand.n}</span></a>)}</div>
      <a className="brand-wall-cta" href="/brands">Explore the complete brand ecosystem <span>→</span></a>
    </section>

    {/* ═══ SIGNATURE EVENTS ═══ */}
    <section className="events-portfolio" id="events">
      <div className="events-portfolio-head">
        <div><span>DR. DORSEY EVENT PROPERTIES</span><h2>Five worlds.<br/><em>One cultural portfolio.</em></h2></div>
        <p>Original event concepts built at the intersection of culture, community, art, style, and nightlife.</p>
      </div>
      <div className="events-portfolio-grid">
        {SIGNATURE_EVENTS.map((event)=><article className={`event-portfolio-card${event.past?' is-past':''}`} key={event.name}>
          <img src={event.image} alt=""/>
          <div className="event-portfolio-shade"/>
          <div className="event-portfolio-content">
            {event.past&&<span className="past-event-tag">Past event</span>}
            {event.logo?<div className="event-portfolio-logo"><img src={event.logo} alt={`${event.name} logo`}/></div>:<div className="event-portfolio-monogram">{event.monogram?.split('\n').map((line)=><span key={line}>{line}</span>)}</div>}
            <div className="event-portfolio-meta"><span>{event.label}</span><h3>{event.name}</h3></div>
          </div>
        </article>)}
      </div>
      <a className="events-portfolio-cta" href="/events"><span>Enter the complete event portfolio</span><b>Explore events →</b></a>
    </section>

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
          <Rv><div><h2 style={{fontFamily:serif,fontSize:'clamp(32px,5.5vw,72px)',fontWeight:300,lineHeight:1.05,letterSpacing:'-0.02em',color:'#080604',marginBottom:24}}>Dr. Dorsey<br/><em style={{fontStyle:'italic',color:'#8B7340'}}>The Strategist.</em></h2><p style={{fontSize:'clamp(15px,1.4vw,19px)',color:'rgba(8,6,4,0.55)',lineHeight:1.8,marginBottom:32}}>Dr. Dorsey doesn&rsquo;t just build brands — he architects ecosystems. With 57+ ventures across 8 cities, 198 AI agents, and 34 automated departments, the blueprint isn&rsquo;t theoretical. It&rsquo;s running. Now it&rsquo;s available to those who build at this level.</p><div style={{display:'flex',gap:32}}>{[{n:'57+',l:'Brands Built'},{n:'8',l:'Cities'},{n:'$0',l:'VC Raised'}].map(s=>(<div key={s.l}><div style={{fontFamily:serif,fontSize:'clamp(28px,3vw,48px)',fontWeight:300,color:'#8B7340',lineHeight:1}}>{s.n}</div><div style={{fontFamily:mono,fontSize:8,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(8,6,4,0.35)',marginTop:4}}>{s.l}</div></div>))}</div></div></Rv>
          <Rv d={0.2}><div style={{position:'relative',height:'clamp(300px,35vw,450px)',overflow:'hidden'}}><img src={`${W}/thesis-bg.jpg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.85,filter:'brightness(1.1)'}}/><div style={{position:'absolute',bottom:0,left:0,right:0,padding:'40px 32px',background:'linear-gradient(0deg,rgba(8,6,4,0.95) 0%,transparent 100%)'}}><div style={{fontFamily:serif,fontSize:'clamp(14px,1.5vw,20px)',fontWeight:300,fontStyle:'italic',color:GB,lineHeight:1.4}}>&ldquo;I built the system that builds the brands.&rdquo;</div><div style={{fontFamily:mono,fontSize:8,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,213,163,0.5)',marginTop:8}}>— Dr. DoLo Dorsey</div></div></div></Rv>
        </div>

        <div className="consult-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,marginBottom:56}}>
          {CONSULT.map((s,i)=>(<Rv key={s.title} d={i*0.06}><div className="consult-card" style={{background:'#FFFDF8',border:'1px solid rgba(8,6,4,0.06)',padding:'clamp(32px,3vw,48px)',transition:'all 0.4s',cursor:'pointer',height:'100%',position:'relative',overflow:'hidden'}}><div style={{fontFamily:serif,fontSize:'clamp(56px,6vw,80px)',fontWeight:300,color:'rgba(139,115,64,0.08)',position:'absolute',top:-8,right:12,lineHeight:1}}>{s.icon}</div><div style={{fontFamily:serif,fontSize:'clamp(22px,2.5vw,32px)',fontWeight:700,color:'#080604',marginBottom:14,lineHeight:1.2,position:'relative'}}>{s.title}</div><div style={{fontSize:'clamp(12px,1vw,14px)',color:'rgba(8,6,4,0.5)',lineHeight:1.75,position:'relative'}}>{s.desc}</div></div></Rv>))}
        </div>

        <Rv d={0.3}><div style={{background:'#080604',padding:'clamp(48px,5vw,80px) clamp(32px,5vw,80px)',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',backgroundImage:'url(/strategy-bg.png)',backgroundSize:'cover',backgroundPosition:'center',opacity:0.35}}/>
          <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'radial-gradient(ellipse at 50% 30%,rgba(212,184,122,0.12) 0%,transparent 60%)'}}/>
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'clamp(300px,60vw,700px)',height:'clamp(300px,60vw,700px)',borderRadius:'50%',border:'1px solid rgba(212,184,122,0.06)',pointerEvents:'none'}}/>
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'clamp(200px,40vw,500px)',height:'clamp(200px,40vw,500px)',borderRadius:'50%',border:'1px solid rgba(212,184,122,0.04)',pointerEvents:'none'}}/>
          <div style={{position:'relative',zIndex:1}}>
            <div style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.5em',textTransform:'uppercase',color:GOLD,marginBottom:24}}>Private Consultation</div>
            <div style={{fontFamily:serif,fontSize:'clamp(36px,6vw,80px)',fontWeight:300,color:'#F5F0E8',lineHeight:1.05,marginBottom:8}}>Book a Strategy</div>
            <div style={{fontFamily:serif,fontSize:'clamp(36px,6vw,80px)',fontWeight:300,fontStyle:'italic',color:GB,lineHeight:1.05,marginBottom:32}}>Session.</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:16,justifyContent:'center',marginBottom:48}}>
              {['Brand Architecture','Operational Buildout','AI Systems Design','Empire Blueprint'].map(s=>(
                <span key={s} style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(245,240,232,0.4)',border:'1px solid rgba(245,240,232,0.08)',padding:'8px 16px',background:'rgba(245,240,232,0.02)'}}>{s}</span>
              ))}
            </div>
            <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
              <a href="/learn" className="book-btn" style={{fontFamily:serif,fontSize:'clamp(14px,1.6vw,20px)',fontWeight:600,letterSpacing:'0.15em',textTransform:'uppercase',color:'#080604',background:`linear-gradient(135deg,${GOLD},${GB},${GOLD})`,padding:'clamp(16px,1.8vw,22px) clamp(36px,4vw,60px)',textDecoration:'none',display:'inline-block',position:'relative',overflow:'hidden',boxShadow:'0 4px 30px rgba(212,184,122,0.3),0 0 60px rgba(212,184,122,0.1)',transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)'}}>COURSES + CONSULTATIONS</a>
              <a href="/learn#consultations" className="book-btn" style={{fontFamily:serif,fontSize:'clamp(14px,1.6vw,20px)',fontWeight:600,letterSpacing:'0.15em',textTransform:'uppercase',color:'#F5F0E8',background:'transparent',border:`2px solid ${GOLD}`,padding:'clamp(16px,1.8vw,22px) clamp(36px,4vw,60px)',textDecoration:'none',display:'inline-block',position:'relative',overflow:'hidden',boxShadow:'0 4px 30px rgba(212,184,122,0.15)',transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)'}}>CHOOSE ACCESS LEVEL</a>
            </div>
            <div style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(245,240,232,0.2)',marginTop:24}}>1-on-1 with Dr. Dorsey · By Invitation</div>
          </div>
        </div></Rv>
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
                <img src={d.logo} alt="" style={{maxWidth:44,maxHeight:44,objectFit:'contain',filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',opacity:0.9}}/>
              </div>
            </div>
          </div></Rv>))}
        </div>
        <Rv d={0.4}><div style={{textAlign:'center',marginTop:48}}><a href="/brands" style={{fontFamily:mono,fontSize:'clamp(9px,0.8vw,11px)',letterSpacing:'0.25em',textTransform:'uppercase',color:GOLD,textDecoration:'none',borderBottom:`1px solid ${GOLD}`,paddingBottom:4,transition:'all 0.3s'}}>View All 57+ Brands →</a></div></Rv>
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
          {CITIES.map((c,i)=>(<Rv key={c.n} d={i*0.06}><div className={`city-c${c.hq?' city-hq':''}`} style={{position:'relative',overflow:'hidden',background:'#000',minHeight:c.hq?260:140,...(c.hq?{gridColumn:'span 2',gridRow:'span 2'}:{})}}><img src={c.bg} alt="" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.6,transition:'opacity 0.5s,transform 6s cubic-bezier(0.37,0,0.63,1)'}}/><div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.5) 100%)'}}/><div style={{position:'relative',zIndex:1,padding:c.hq?'clamp(32px,4vw,56px)':'clamp(20px,2vw,32px)',height:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>{c.hq&&<span style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.35em',textTransform:'uppercase',color:GB,marginBottom:12}}>Headquarters</span>}<div style={{fontFamily:serif,fontSize:c.hq?'clamp(32px,5vw,64px)':'clamp(18px,2.5vw,28px)',fontWeight:400,color:'#F5F0E8'}}>{c.n}</div><div style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.3em',textTransform:'uppercase',color:GB,marginTop:2}}>{c.s}</div><div style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',color:'rgba(245,240,232,0.5)',marginTop:6}}>{c.c}</div></div></div></Rv>))}
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

    <style suppressHydrationWarning>{`
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}
      .marquee-logos{animation:marqueeScroll 80s linear infinite}
      .marquee-logos:hover{animation-play-state:paused}
      .logo-i:hover{opacity:1!important}
      .na:hover{color:#F5F0E8!important}
      .dist-card:hover img{opacity:0.65!important;transform:scale(1.03)!important}
      .city-c:hover img{opacity:0.75!important;transform:scale(1.03)!important}
      .consult-card:hover{border-color:rgba(139,115,64,0.3)!important;box-shadow:0 12px 40px rgba(0,0,0,0.1)!important;transform:translateY(-2px)}
      .book-btn:hover{transform:translateY(-3px)!important;box-shadow:0 8px 40px rgba(212,184,122,0.5),0 0 80px rgba(212,184,122,0.2)!important}
      .hero-book:hover img{transform:translateY(-8px) rotate(-1deg)}
      .logo-i:hover{opacity:1!important}
      .book-feature{display:grid;grid-template-columns:minmax(360px,.9fr) minmax(0,1.1fr);min-height:820px;background:#E9DFCF;color:#080604;overflow:hidden}
      .book-feature-art{position:relative;display:flex;align-items:center;justify-content:center;min-height:760px;background:radial-gradient(circle at 50% 48%,rgba(212,184,122,.42),transparent 28%),linear-gradient(135deg,#0A0805,#171008);overflow:hidden}
      .book-feature-art:before{content:'';position:absolute;inset:30px;border:1px solid rgba(232,213,163,.15)}
      .book-feature-art:after{content:'HAKUNA MATATA';position:absolute;left:-20px;bottom:32px;font-family:${serif};font-size:clamp(70px,10vw,150px);font-weight:300;line-height:.7;letter-spacing:-.06em;color:rgba(232,213,163,.045);white-space:nowrap}
      .book-feature-art img{position:relative;z-index:2;width:min(54%,390px);max-height:650px;object-fit:contain;filter:drop-shadow(0 40px 52px rgba(0,0,0,.62));transform:rotate(-2deg)}
      .book-edition{position:absolute;z-index:3;left:48px;top:50px;font-family:${mono};font-size:8px;letter-spacing:.28em;color:${GB};writing-mode:vertical-rl}
      .book-price{position:absolute;z-index:3;right:44px;bottom:44px;width:92px;height:92px;border:1px solid rgba(232,213,163,.5);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:${serif};font-size:24px;color:${GB};background:rgba(8,6,4,.55);backdrop-filter:blur(10px)}
      .book-glow{position:absolute;width:360px;height:360px;border:1px solid rgba(232,213,163,.18);border-radius:50%}.book-glow:before,.book-glow:after{content:'';position:absolute;border:1px solid rgba(232,213,163,.1);border-radius:50%;inset:-70px}.book-glow:after{inset:-140px}
      .book-feature-copy{padding:clamp(70px,8vw,130px);display:flex;flex-direction:column;justify-content:center}
      .book-feature-copy h2{font-family:${serif};font-size:clamp(70px,9vw,138px);font-weight:300;line-height:.7;letter-spacing:-.055em;margin:38px 0}.book-feature-copy h2 em{color:#8B7340}
      .book-rule{width:100%;height:1px;background:linear-gradient(90deg,#8B7340,transparent);margin:12px 0 30px}.book-lead{max-width:680px;font-size:clamp(17px,1.5vw,21px);line-height:1.75;color:rgba(8,6,4,.67)}
      .book-feature-copy blockquote{font-family:${serif};font-size:clamp(28px,3vw,44px);font-style:italic;line-height:1.15;color:#5F4A26;margin:36px 0}
      .book-pillars{display:grid;grid-template-columns:repeat(3,1fr);border-block:1px solid rgba(8,6,4,.13);margin-bottom:38px}.book-pillars>div{padding:22px 18px 22px 0;border-right:1px solid rgba(8,6,4,.13);display:flex;flex-direction:column}.book-pillars>div+div{padding-left:22px}.book-pillars>div:last-child{border:0}.book-pillars b{font-family:${mono};font-size:8px;color:#8B7340}.book-pillars strong{font-family:${serif};font-size:24px;margin:8px 0 3px}.book-pillars span{font-size:11px;color:rgba(8,6,4,.48)}
      .book-feature-cta{align-self:flex-start;background:#080604;color:${GB};padding:17px 28px;text-decoration:none;font-family:${mono};font-size:9px;letter-spacing:.2em;text-transform:uppercase}.book-feature-cta span{margin-left:34px}
      .learn-feature{padding:clamp(90px,10vw,150px) clamp(20px,5vw,86px);background:#0C0906;position:relative;overflow:hidden}.learn-feature:before{content:'';position:absolute;right:-15vw;top:-28vw;width:60vw;height:60vw;border:1px solid rgba(212,184,122,.08);border-radius:50%;box-shadow:0 0 0 8vw rgba(212,184,122,.025),0 0 0 16vw rgba(212,184,122,.015)}
      .learn-feature-head{position:relative;display:grid;grid-template-columns:1.25fr .75fr;gap:80px;align-items:end;max-width:1450px;margin:0 auto 68px}.learn-feature-head span{font-family:${mono};font-size:9px;letter-spacing:.32em;color:${GOLD}}.learn-feature-head h2{font-family:${serif};font-size:clamp(48px,6.5vw,92px);font-weight:300;line-height:.92;letter-spacing:-.04em;margin:20px 0 0}.learn-feature-head h2 em{color:${GB}}.learn-feature-head p{font-size:16px;line-height:1.8;color:rgba(245,240,232,.5);max-width:500px}
      .learn-level-preview{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:1450px;margin:0 auto}.learn-level-preview a{min-height:390px;padding:30px;display:flex;flex-direction:column;color:#F5F0E8;text-decoration:none;background:linear-gradient(160deg,rgba(212,184,122,.09),rgba(255,255,255,.02));border:1px solid rgba(212,184,122,.18);transition:transform .4s,border-color .4s,background .4s;overflow:hidden;position:relative}.learn-level-preview a:hover{transform:translateY(-9px);border-color:rgba(232,213,163,.55);background:linear-gradient(160deg,rgba(212,184,122,.16),rgba(255,255,255,.03))}.learn-level-preview b{position:absolute;right:12px;top:-36px;font-family:${serif};font-size:140px;font-weight:300;color:rgba(212,184,122,.06)}.learn-level-preview span{position:relative;font-family:${mono};font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:${GOLD}}.learn-level-preview h3{position:relative;font-family:${serif};font-size:46px;font-weight:400;margin:90px 0 12px}.learn-level-preview strong{font-family:${serif};font-size:25px;color:${GB}}.learn-level-preview i{margin-top:auto;font-family:${mono};font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:${GOLD};font-style:normal}
      .learn-feature-actions{position:relative;display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-top:48px}.learn-feature-actions a{padding:16px 24px;border:1px solid ${GOLD};color:#080604;background:${GOLD};font-family:${mono};font-size:9px;letter-spacing:.18em;text-transform:uppercase;text-decoration:none}.learn-feature-actions a+ a{background:transparent;color:${GB}}
      .brand-wall{padding:clamp(70px,7vw,105px) clamp(20px,5vw,86px);background:#E9DFCF;color:#080604;border-block:1px solid rgba(8,6,4,.12)}
      .brand-wall-head{max-width:1450px;margin:0 auto 44px;display:flex;align-items:end;justify-content:space-between;gap:40px}.brand-wall-head span{font-family:${mono};font-size:10px;letter-spacing:.3em;color:#735B30}.brand-wall-head h2{font-family:${serif};font-size:clamp(48px,6vw,88px);font-weight:300;line-height:.88;letter-spacing:-.035em;margin-top:15px}.brand-wall-head h2 em{color:#735B30}.brand-wall-count{display:flex;align-items:center;gap:16px;padding-left:30px;border-left:1px solid rgba(8,6,4,.2)}.brand-wall-count strong{font-family:${serif};font-size:clamp(55px,6vw,86px);font-weight:300;line-height:.8;color:#735B30}.brand-wall-count span{font-family:${mono};font-size:9px;line-height:1.55;letter-spacing:.14em;text-transform:uppercase;color:rgba(8,6,4,.58)}
      .brand-logo-grid{max-width:1450px;margin:0 auto;display:grid;grid-template-columns:repeat(6,1fr);gap:10px}.brand-logo-grid a{min-width:0;padding:14px 14px 12px;background:#F8F3EA;border:1px solid rgba(8,6,4,.11);text-decoration:none;transition:transform .35s,box-shadow .35s,border-color .35s}.brand-logo-grid a:hover{transform:translateY(-6px);border-color:rgba(115,91,48,.5);box-shadow:0 18px 45px rgba(8,6,4,.12)}.brand-logo-grid a>div{height:108px;display:flex;align-items:center;justify-content:center;padding:14px;background:#0C0906}.brand-logo-grid img{max-width:150px;max-height:70px;object-fit:contain;filter:drop-shadow(0 5px 12px rgba(0,0,0,.24))}.brand-logo-grid a>span{display:block;margin-top:11px;font-family:${mono};font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:rgba(8,6,4,.7);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.brand-wall-cta{display:flex;justify-content:space-between;max-width:1450px;margin:24px auto 0;padding:18px 22px;background:#080604;color:${GB};font-family:${mono};font-size:10px;letter-spacing:.18em;text-transform:uppercase;text-decoration:none}.desk-nav .na{font-size:10px!important;letter-spacing:.14em!important}
      .events-portfolio{padding:clamp(70px,7vw,105px) clamp(20px,5vw,86px);background:#080604;color:#F5F0E8;scroll-margin-top:70px}.events-portfolio-head{max-width:1450px;margin:0 auto 44px;display:grid;grid-template-columns:1.15fr .65fr;gap:70px;align-items:end}.events-portfolio-head>div>span{font-family:${mono};font-size:9px;letter-spacing:.31em;color:${GOLD}}.events-portfolio-head h2{font-family:${serif};font-size:clamp(48px,6.2vw,90px);font-weight:300;line-height:.9;letter-spacing:-.04em;margin-top:16px}.events-portfolio-head h2 em{color:${GB}}.events-portfolio-head p{font-size:17px;line-height:1.7;color:rgba(245,240,232,.66);max-width:500px}.events-portfolio-grid{max-width:1450px;margin:0 auto;display:grid;grid-template-columns:repeat(6,1fr);grid-auto-rows:250px;gap:10px}.event-portfolio-card{position:relative;overflow:hidden;grid-column:span 2;background:#16100a;border:1px solid rgba(212,184,122,.16)}.event-portfolio-card:nth-child(1),.event-portfolio-card:nth-child(2){grid-column:span 3}.event-portfolio-card>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.66;transition:transform 1.2s cubic-bezier(.16,1,.3,1),opacity .5s}.event-portfolio-card:hover>img{transform:scale(1.035);opacity:.82}.event-portfolio-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,6,4,.08),rgba(8,6,4,.25) 42%,rgba(8,6,4,.94))}.event-portfolio-content{position:relative;height:100%;z-index:1;padding:22px;display:flex;flex-direction:column;align-items:flex-start}.event-portfolio-logo{height:70px;max-width:190px;display:flex;align-items:center}.event-portfolio-logo img{max-height:64px;max-width:180px;object-fit:contain;filter:drop-shadow(0 6px 14px rgba(0,0,0,.65))}.event-portfolio-monogram{font-family:${serif};font-size:clamp(30px,3vw,45px);line-height:.75;letter-spacing:-.035em;color:#F7E9C6;text-shadow:0 5px 20px rgba(0,0,0,.6)}.event-portfolio-monogram span{display:block}.event-portfolio-meta{margin-top:auto}.event-portfolio-meta>span{font-family:${mono};font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:${GB}}.event-portfolio-meta h3{font-family:${serif};font-size:clamp(27px,2.7vw,39px);font-weight:400;line-height:1;margin-top:7px}.past-event-tag{display:inline-flex;margin-bottom:12px;background:#F5F0E8;color:#080604;padding:7px 10px;font-family:${mono};font-size:8px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}.is-past>img{filter:grayscale(.55)}.events-portfolio-cta{max-width:1450px;margin:14px auto 0;padding:19px 22px;border:1px solid rgba(212,184,122,.22);display:flex;justify-content:space-between;gap:20px;color:#F5F0E8;text-decoration:none;font-family:${mono};font-size:9px;letter-spacing:.15em;text-transform:uppercase}.events-portfolio-cta span{color:rgba(245,240,232,.5)}.events-portfolio-cta b{color:${GOLD}}
      #ecosystem,#strategist,#districts,#cities,#connect{padding-top:clamp(58px,6vw,92px)!important;padding-bottom:clamp(58px,6vw,92px)!important}
      #ecosystem h2,#strategist h2,#districts h2,#cities h2,#connect h2{line-height:1!important}
      #strategist p,#connect p{font-size:clamp(15px,1.15vw,18px)!important;color:rgba(8,6,4,.67)!important;line-height:1.65!important}
      #connect p{color:rgba(245,240,232,.66)!important}
      .book-feature{min-height:700px}.book-feature-art{min-height:680px}.book-feature-copy{padding-top:70px;padding-bottom:70px}.learn-feature{padding-top:clamp(70px,7vw,105px);padding-bottom:clamp(70px,7vw,105px)}.learn-level-preview a{min-height:340px}.learn-feature-head{margin-bottom:46px}.learn-feature-head p{color:rgba(245,240,232,.68);font-size:17px;line-height:1.65}
      @media(max-width:1024px){.eco-grid{grid-template-columns:1fr!important}.dist-grid{grid-template-columns:repeat(2,1fr)!important}.city-grid{grid-template-columns:repeat(2,1fr)!important}.consult-grid{grid-template-columns:repeat(2,1fr)!important}.strat-hero{grid-template-columns:1fr!important}}
      @media(max-width:1100px){.book-feature{grid-template-columns:.8fr 1.2fr}.book-feature-copy{padding:60px 50px}.learn-level-preview{grid-template-columns:repeat(2,1fr)}.learn-feature-head{grid-template-columns:1fr;gap:24px}.brand-logo-grid{grid-template-columns:repeat(3,1fr)}.events-portfolio-grid{grid-template-columns:repeat(2,1fr)}.event-portfolio-card,.event-portfolio-card:nth-child(1),.event-portfolio-card:nth-child(2){grid-column:span 1}}
      @media(max-width:768px){.desk-nav{display:none!important}.desk-cta{display:none!important}.mob-btn{display:block!important}.hero-content{grid-template-columns:1fr!important;gap:18px!important;padding-top:84px!important}.hero-content h1{font-size:clamp(30px,10vw,48px)!important}.hero-actions{margin-top:24px!important}.hero-book img{width:clamp(125px,35vw,175px)!important;max-height:24vh!important}.hero-book-kicker{display:none}.hero-book-shopline{margin-top:6px!important;font-size:8px!important}.book-feature{grid-template-columns:1fr}.book-feature-art{min-height:540px}.book-feature-copy{padding:55px 22px}.book-feature-copy h2{font-size:clamp(72px,24vw,106px)}.book-pillars{grid-template-columns:1fr}.book-pillars>div,.book-pillars>div+div{padding:16px 0;border-right:0;border-bottom:1px solid rgba(8,6,4,.12)}.learn-feature{padding:60px 20px}.learn-level-preview{grid-template-columns:1fr}.learn-level-preview a{min-height:280px}.brand-wall{padding:58px 18px}.brand-wall-head{display:block}.brand-wall-count{margin-top:30px;padding:20px 0 0;border-left:0;border-top:1px solid rgba(8,6,4,.18)}.brand-logo-grid{grid-template-columns:repeat(2,1fr);gap:7px}.brand-logo-grid a{padding:9px}.brand-logo-grid a>div{height:90px}.brand-wall-cta{font-size:8px;line-height:1.5}.events-portfolio{padding:58px 18px}.events-portfolio-head{grid-template-columns:1fr;gap:20px}.events-portfolio-grid{grid-template-columns:1fr;grid-auto-rows:280px}.events-portfolio-cta{align-items:flex-start;flex-direction:column}.dist-grid{grid-template-columns:1fr!important}.city-grid{grid-template-columns:1fr!important}.consult-grid{grid-template-columns:1fr!important}.city-hq{grid-column:span 1!important;grid-row:span 1!important}.ftr{flex-direction:column!important;gap:16px!important;text-align:center!important}.strat-hero{grid-template-columns:1fr!important}}
    `}</style>
  </>;
}
