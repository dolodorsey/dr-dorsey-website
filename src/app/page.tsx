'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';
const W = `${SB}/dr_dorsey/website`;
const DORSEY_W = `${SB}/dr_dorsey/01_logos/DorseyNewW.png`;
const KHG_EMBLEM = `${SB}/dr_dorsey/01_logos/KOLLECTIVEemblemW.png`;

const ALL_LOGOS = [
  { n:'HugLife', s:`${SB}/huglife_events/00-brand-assets/logos/huglife-logo-buddha-black.png`, u:'https://huglife.vercel.app' },
  { n:'Forever Futbol', s:`${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png`, u:'https://foreverfutbol.museum' },
  { n:'Casper Group', s:`${SB}/casper_group/logos/casper-logo-dark.png`, u:'https://casper-group.vercel.app' },
  { n:'Good Times', s:`${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png`, u:'https://good-times-app.vercel.app' },
  { n:'NOIR', s:`${SB}/noir_event/01_logos/NOIR_LOGO.png` },
  { n:'REMIX', s:`${SB}/remix_event/01_logos/REMIX_LOGO.png` },
  { n:'Taste of Art', s:`${SB}/taste_of_art/01_logos/TASTE_OF_ART_LOGO.png` },
  { n:'WRST BHVR', s:`${SB}/wrst_bhvr_event/01_logos/WRST_BHVR_LOGO.png` },
  { n:'Gangsta Gospel', s:`${SB}/gangsta_gospel/01_logos/GANGSTA_GOSPEL_LOGO.png` },
  { n:'Angel Wings', s:`${SB}/angel_wings/logos/angel-wings-logo.png` },
  { n:'Patty Daddy', s:`${SB}/patty_daddy/logos/patty-daddy-logo.png` },
  { n:'Taco Yaki', s:`${SB}/taco_yaki/logos/taco-yaki-logo.png` },
  { n:'Morning After', s:`${SB}/morning_after/logos/morning-after-logo.png` },
  { n:'Sweet Tooth', s:`${SB}/sweet_tooth/logos/sweet-tooth-logo.png` },
  { n:'Mojo Juice', s:`${SB}/mojo_juice/logos/mojo-juice-logo.png` },
  { n:'Pasta Bish', s:`${SB}/pasta_bish/logos/pasta-bish-logo.png` },
  { n:'Mr. Oyster', s:`${SB}/mr_oyster/logos/mr-oyster-logo.png` },
  { n:'Paparazzi', s:`${SB}/paparazzi/01_logos/PAPARAZZI_LOGO.png` },
  { n:'Pawchella', s:`${SB}/pawchella/01_logos/PAWCHELLA_LOGO.png` },
  { n:'Beauty & Beast', s:`${SB}/beauty_beast/01_logos/BEAUTY_BEAST_LOGO.png` },
  { n:'Black Ball', s:`${SB}/black_ball/01_logos/BLACK_BALL_LOGO.png` },
  { n:'Sundays Best', s:`${SB}/sundays_best/01_logos/SUNDAYS_BEST_LOGO.png` },
  { n:'ICONIC', s:`${SB}/dr_dorsey/00-brand-assets/logos/iconic-logo-gold.png` },
  { n:'TOSSD', s:`${SB}/tossd/logos/tossd-logo.png` },
  { n:'Mind Studio', s:`${SB}/mind_studio/gt_card_mind_studio.png` },
];

const DISTRICTS = [
  { title:'Night District', sub:'HugLife × ICONIC', desc:'15+ event brands across Atlanta.', img:`${W}/rooftop-lounge.jpg`, logo:`${SB}/huglife_events/00-brand-assets/logos/huglife-logo-buddha-black.png`, brands:['NOIR','REMIX','Taste of Art','Soul Sessions','Secret Society'] },
  { title:'Culinary District', sub:'Casper Group', desc:'Restaurants, ghost kitchens, and culinary experiences.', img:`${W}/luxury-venue.jpg`, logo:`${SB}/casper_group/logos/casper-logo-dark.png`, brands:['Bodega','Angel Wings','Pasta Bish'] },
  { title:'Museum Quarter', sub:'Forever Futbol', desc:'Immersive futbol museum. Atlanta. May 29 — Jul 6, 2026.', img:`${W}/garden-district.jpg`, logo:`${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png`, brands:['Museum','ATL','2026'] },
  { title:'Technology Hub', sub:'Good Times × Digital', desc:'837 venues. 10 cities. 198 AI agents. 34 departments.', img:`${W}/penthouse-skyline.jpg`, logo:`${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png`, brands:['Good Times','Rule Radar','UTube U'] },
  { title:'Wellness Wing', sub:'Mind Studio MSO', desc:'Telemed wellness. Clinic, consumer, and PI verticals.', img:`${W}/thesis-bg.jpg`, logo:`${SB}/mind_studio/gt_card_mind_studio.png`, brands:['Clinic','Consumer','PI'] },
  { title:'Service Exchange', sub:'Umbrella Group', desc:'Legal infrastructure and roadside services.', img:`${W}/hero-bg.jpg`, logo:`${SB}/umbrella_injury/00-brand-assets/logos/hurt-911-logo-black.png`, brands:['Umbrella','S.O.S','On Call'] },
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
  { title:'Brand Architecture', desc:'Multi-brand portfolio strategy, naming, positioning, and ecosystem design.' },
  { title:'Event Production', desc:'End-to-end event creation, ticketing strategy, venue partnerships.' },
  { title:'Restaurant & F&B', desc:'Concept development, ghost kitchen strategy, multi-unit expansion.' },
  { title:'AI & Automation', desc:'198-agent AI infrastructure, n8n workflows, CRM automation.' },
  { title:'Marketing Systems', desc:'GHL pipelines, email sequences, social engines, 48K+ contacts.' },
  { title:'Museum & Cultural', desc:'Immersive experience design, ticketing, sponsorship strategy.' },
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
      <img src={DORSEY_W} alt="" style={{width:180,objectFit:'contain',marginBottom:16}}/>
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

    {/* ═══ HERO — BRIGHTER, QUOTE LEFT ═══ */}
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

    {/* ═══ LOGO MARQUEE — ALL BRANDS ═══ */}
    <div style={{padding:'28px 0',background:'#080604',borderBottom:'1px solid rgba(245,240,232,0.04)',overflow:'hidden'}}>
      <div style={{display:'flex',width:'max-content'}} className="marquee-logos">
        {[...ALL_LOGOS,...ALL_LOGOS,...ALL_LOGOS].map((l,i)=>(<a key={`${l.n}-${i}`} href={l.u||'#'} target={l.u?'_blank':undefined} rel="noopener noreferrer" className="logo-i" style={{opacity:0.5,transition:'opacity 0.4s',flexShrink:0,padding:'0 clamp(16px,2.5vw,36px)'}}><div style={{width:80,height:36,display:'flex',alignItems:'center',justifyContent:'center'}}><img src={l.s} alt={l.n} style={{maxWidth:80,maxHeight:36,objectFit:'contain',filter:'brightness(1.6)'}}/></div></a>))}
      </div>
    </div>

    {/* ═══ ECOSYSTEM — BLACK ═══ */}
    <section style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',background:'#080604'}} id="ecosystem">
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <Rv><div style={bar}/></Rv>
        <Rv><h2 style={{...hd('clamp(28px,5vw,64px)'),marginBottom:64}}>Architect of Experiences,<br/>Curator of <em style={{fontStyle:'italic',color:GB}}>Worlds.</em></h2></Rv>
        <div className="eco-grid" style={{display:'grid',gridTemplateColumns:'1fr 1.4fr 1fr',gap:2}}>
          <Rv d={0.1}><div style={{position:'relative',height:'clamp(300px,40vw,500px)',overflow:'hidden',background:'#0D0A07'}}><img src={`${W}/thesis-bg.jpg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.7}}/><div style={{position:'absolute',bottom:0,left:0,width:'100%',padding:'32px 28px',background:'linear-gradient(0deg,rgba(8,6,4,0.9) 0%,transparent 100%)'}}><div style={{fontFamily:serif,fontSize:'clamp(16px,2vw,24px)',fontWeight:300,fontStyle:'italic',color:GB,lineHeight:1.3}}>Architect of Experiences,<br/>Curator of Worlds</div></div></div></Rv>
          <Rv d={0.2}><div style={{position:'relative',height:'clamp(300px,40vw,500px)',overflow:'hidden',background:'#0D0A07',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:32}}><img src={`${W}/hero-bg.jpg`} alt="" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.25}}/><div style={{position:'relative',zIndex:1,textAlign:'center'}}><div style={{fontFamily:serif,fontSize:'clamp(18px,2.5vw,32px)',fontWeight:400,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:32,color:'#F5F0E8'}}>Empire Command Map</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,maxWidth:360,margin:'0 auto'}}>{['Night District','Culinary District','Museum Quarter','Technology Hub','Wellness Wing','Service Exchange'].map(d=>(<div key={d} style={{border:'1px solid rgba(212,184,122,0.2)',padding:'12px 16px',fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(245,240,232,0.6)',textAlign:'center',background:'rgba(212,184,122,0.04)',transition:'all 0.3s',cursor:'pointer'}} onMouseEnter={e=>{e.currentTarget.style.borderColor=GOLD;e.currentTarget.style.color=GOLD}} onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(212,184,122,0.2)';e.currentTarget.style.color='rgba(245,240,232,0.6)'}}>{d}</div>))}</div><div style={{display:'flex',gap:40,justifyContent:'center',marginTop:32}}>{[{t:57,s:'+',l:'Ventures'},{t:8,s:'',l:'Cities'},{t:198,s:'',l:'Agents'}].map(s=>(<div key={s.l} style={{textAlign:'center'}}><div style={{fontFamily:serif,fontSize:'clamp(24px,3vw,44px)',fontWeight:300,color:GB,lineHeight:1}}><Counter target={s.t} suffix={s.s}/></div><div style={{fontFamily:mono,fontSize:8,letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(245,240,232,0.3)',marginTop:4}}>{s.l}</div></div>))}</div></div></div></Rv>
          <Rv d={0.3}><div style={{position:'relative',height:'clamp(300px,40vw,500px)',overflow:'hidden',background:'#0D0A07'}}><img src={`${W}/garden-district.jpg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.65}}/><div style={{position:'absolute',top:24,left:0,width:'100%',textAlign:'center'}}><div style={{fontFamily:serif,fontSize:'clamp(16px,2vw,28px)',fontWeight:400,letterSpacing:'0.08em',textTransform:'uppercase',color:'#F5F0E8'}}>Forever Futbol</div><div style={{fontFamily:mono,fontSize:8,letterSpacing:'0.2em',color:GB,marginTop:4}}>May 29 — Jul 6, 2026</div></div><div style={{position:'absolute',bottom:24,left:24}}><img src={`${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png`} alt="" style={{height:40,objectFit:'contain',filter:'brightness(1.5)',opacity:0.8}}/></div></div></Rv>
        </div>
      </div>
    </section>

    {/* ═══ STRATEGIST — WHITE SECTION ═══ */}
    <section style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',background:'#F5F0E8',color:'#080604'}} id="strategist">
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <Rv><div style={{width:40,height:1,background:'#080604',marginBottom:16}}/></Rv>
        <Rv><div style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.35em',textTransform:'uppercase',color:'#080604',opacity:0.5,marginBottom:12}}>Strategy + Consulting</div></Rv>
        <Rv><h2 style={{fontFamily:serif,fontSize:'clamp(28px,5vw,64px)',fontWeight:300,lineHeight:1.1,letterSpacing:'-0.02em',marginBottom:24,color:'#080604'}}>The <em style={{fontStyle:'italic',color:'#8B7340'}}>Strategist.</em></h2></Rv>
        <Rv d={0.1}><p style={{fontSize:'clamp(14px,1.3vw,18px)',color:'rgba(8,6,4,0.6)',lineHeight:1.7,maxWidth:700,marginBottom:56}}>Dr. Dorsey doesn&rsquo;t just build brands — he architects ecosystems. With 57+ ventures across 8 cities, the blueprint is proven. Now it&rsquo;s available to those who build at this level.</p></Rv>
        <div className="consult-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:2,marginBottom:56}}>
          {CONSULT.map((s,i)=>(<Rv key={s.title} d={i*0.08}><div className="consult-card" style={{background:'#FFFDF8',border:'1px solid rgba(8,6,4,0.08)',padding:'clamp(28px,3vw,48px)',transition:'all 0.4s',cursor:'pointer',height:'100%'}}><div style={{fontFamily:serif,fontSize:'clamp(20px,2.5vw,32px)',fontWeight:400,color:'#080604',marginBottom:12,lineHeight:1.2}}>{s.title}</div><div style={{fontSize:'clamp(12px,1vw,14px)',color:'rgba(8,6,4,0.5)',lineHeight:1.7}}>{s.desc}</div></div></Rv>))}
        </div>
        <Rv d={0.3}><div style={{background:'#080604',padding:'clamp(40px,5vw,72px)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:32}}><div><div style={{fontFamily:serif,fontSize:'clamp(24px,3.5vw,48px)',fontWeight:300,color:'#F5F0E8',lineHeight:1.2,marginBottom:12}}>Book a Strategy <em style={{fontStyle:'italic',color:GB}}>Session.</em></div><div style={{fontFamily:mono,fontSize:'clamp(9px,0.8vw,11px)',letterSpacing:'0.15em',color:'rgba(245,240,232,0.4)',textTransform:'uppercase'}}>1-on-1 with Dr. Dorsey · Brand Architecture · Operational Buildout</div></div><a href="mailto:thedoctordorsey@gmail.com?subject=Strategy Session Inquiry" style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.2em',textTransform:'uppercase',color:'#080604',background:GB,padding:'16px 40px',textDecoration:'none',whiteSpace:'nowrap'}}>Book Now</a></div></Rv>
      </div>
    </section>

    {/* ═══ DISTRICTS — BLACK, BRIGHTER IMAGES ═══ */}
    <section style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',background:'#080604'}} id="districts">
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <Rv><div style={{...tg(),marginBottom:12}}>The Districts</div></Rv>
        <Rv><h2 style={{...hd('clamp(26px,4.5vw,56px)'),marginBottom:48}}>Six divisions. One <em style={{fontStyle:'italic',color:GB}}>ecosystem.</em></h2></Rv>
        <div className="dist-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:2}}>
          {DISTRICTS.map((d,i)=>(<Rv key={d.title} d={i*0.08}><div className="dist-card" style={{position:'relative',height:'clamp(260px,32vw,420px)',overflow:'hidden',background:'#0D0A07',cursor:'pointer'}}><img src={d.img} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.55,transition:'opacity 0.6s,transform 6s cubic-bezier(0.37,0,0.63,1)'}}/><div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,rgba(8,6,4,0.1) 0%,rgba(8,6,4,0.65) 100%)'}}/><div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:1,padding:'clamp(20px,2vw,32px)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}><div><div style={{fontFamily:serif,fontSize:'clamp(18px,2.5vw,32px)',fontWeight:400,letterSpacing:'0.05em',textTransform:'uppercase',color:'#F5F0E8',marginBottom:4}}>{d.title}</div><div style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.15em',color:GB}}>{d.sub}</div></div><div><div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>{d.brands.map(b=><span key={b} style={{fontFamily:mono,fontSize:7,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(245,240,232,0.5)',border:'1px solid rgba(245,240,232,0.1)',padding:'2px 8px'}}>{b}</span>)}</div><img src={d.logo} alt="" style={{maxWidth:36,maxHeight:36,objectFit:'contain',filter:'brightness(1.6)',opacity:0.6}}/></div></div></div></Rv>))}
        </div>
      </div>
    </section>

    {/* ═══ QUOTE — LEFT ALIGNED ═══ */}
    <div style={{position:'relative',height:'clamp(250px,35vw,400px)',overflow:'hidden'}}>
      <img src={`${W}/penthouse-skyline.jpg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.55}}/>
      <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,#080604 0%,transparent 25%,transparent 75%,#080604 100%)',display:'flex',alignItems:'center',justifyContent:'flex-start',padding:'0 clamp(40px,6vw,120px)'}}>
        <div style={{fontFamily:serif,fontSize:'clamp(20px,3.5vw,48px)',fontWeight:300,fontStyle:'italic',color:GB,textAlign:'left',maxWidth:550,lineHeight:1.3}}>&ldquo;Everybody wants to eat at night — nobody wants to hunt in the morning.&rdquo;</div>
      </div>
    </div>

    {/* ═══ CITIES — WHITE SECTION ═══ */}
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

    {/* ═══ FOOTER — WHITE ═══ */}
    <footer className="ftr" style={{padding:'40px clamp(20px,4vw,80px)',borderTop:'1px solid rgba(8,6,4,0.1)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#F5F0E8',color:'#080604'}}>
      <div style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.2em',color:'rgba(8,6,4,0.3)'}}>&copy; 2026 Dr. DoLo Dorsey — The Kollective Hospitality Group</div>
      <div style={{display:'flex',gap:24}}>{[{n:'Instagram',u:'https://instagram.com/dolodorsey'},{n:'Twitter',u:'https://twitter.com/mrdolodorsey'},{n:'Facebook',u:'https://facebook.com/DoLoDorsey'}].map(s=>(<a key={s.n} href={s.u} target="_blank" rel="noopener noreferrer" style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.1em',color:'rgba(8,6,4,0.3)',textDecoration:'none'}}>{s.n}</a>))}</div>
    </footer>

    <style>{`
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}
      .marquee-logos{animation:marqueeScroll 60s linear infinite}
      .marquee-logos:hover{animation-play-state:paused}
      .logo-i:hover{opacity:0.9!important}
      .na:hover{color:#F5F0E8!important}
      .dist-card:hover img{opacity:0.7!important;transform:scale(1.03)!important}
      .city-c:hover img{opacity:0.75!important;transform:scale(1.03)!important}
      .consult-card:hover{border-color:rgba(139,115,64,0.3)!important;box-shadow:0 8px 32px rgba(0,0,0,0.08)!important}
      @media(max-width:1024px){.eco-grid{grid-template-columns:1fr!important}.dist-grid{grid-template-columns:repeat(2,1fr)!important}.city-grid{grid-template-columns:repeat(2,1fr)!important}.consult-grid{grid-template-columns:repeat(2,1fr)!important}}
      @media(max-width:768px){.desk-nav{display:none!important}.desk-cta{display:none!important}.mob-btn{display:block!important}.dist-grid{grid-template-columns:1fr!important}.city-grid{grid-template-columns:1fr!important}.consult-grid{grid-template-columns:1fr!important}.city-c[style*="grid-column"]{grid-column:span 1!important;grid-row:span 1!important}.ftr{flex-direction:column!important;gap:16px!important;text-align:center!important}}
    `}</style>
  </>;
}
