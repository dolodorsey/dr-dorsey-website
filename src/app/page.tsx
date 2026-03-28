'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';
const W = `${SB}/dr_dorsey/website`;
const KHG = `${SB}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;

/* ═══ DATA ═══ */
const LOGOS = [
  { n:'HugLife', s:`${SB}/huglife_events/00-brand-assets/logos/huglife-logo-buddha-black.png`, u:'https://huglife.vercel.app' },
  { n:'Forever Futbol', s:`${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png`, u:'https://forever-futbol.vercel.app' },
  { n:'Casper', s:`${SB}/casper_group/logos/casper-white.png`, u:'https://casper-group.vercel.app' },
  { n:'Good Times', s:`${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png`, u:'https://good-times-app.vercel.app' },
  { n:'NOIR', s:`${SB}/noir_event/01_logos/NOIR_LOGO.png` },
  { n:'Pronto', s:`${SB}/pronto_energy/logos/pronto-logo.png`, u:'https://pronto-energy-website.vercel.app' },
  { n:'REMIX', s:`${SB}/remix_event/01_logos/REMIX_LOGO.png` },
  { n:'Taste of Art', s:`${SB}/taste_of_art/01_logos/TASTE_OF_ART_LOGO.png` },
  { n:'WRST BHVR', s:`${SB}/wrst_bhvr_event/03_event_flyers/WRST_generic_logo.png` },
  { n:'Gangsta Gospel', s:`${SB}/gangsta_gospel/01_logos/GANGSTA_GOSPEL_LOGO.png` },
];

const DISTRICTS = [
  {
    title: 'Night District',
    sub: 'HugLife × ICONIC',
    desc: '15+ event brands. NOIR, REMIX, Taste of Art, Secret Society, Soul Sessions, WRST BHVR, Gangsta Gospel, Underground King, Cravings, The Kulture.',
    img: `${W}/rooftop-lounge.jpg`,
    logo: `${SB}/huglife_events/00-brand-assets/logos/huglife-logo-buddha-black.png`,
    brands: ['NOIR','REMIX','Taste of Art','Soul Sessions','Secret Society'],
  },
  {
    title: 'Culinary District',
    sub: 'Casper Group',
    desc: 'Restaurants, bars, ghost kitchens, and culinary experiences. Bodegea, Angel Wings, Pasta Bish, Mr. Oyster, Patty Daddy.',
    img: `${W}/luxury-venue.jpg`,
    logo: `${SB}/casper_group/logos/casper-white.png`,
    brands: ['Bodegea','Angel Wings','Pasta Bish'],
  },
  {
    title: 'Museum Quarter',
    sub: 'Forever Futbol',
    desc: 'The world\'s first immersive futbol museum. Atlanta. May 29 — Jul 6, 2026. 45 DJs. Culture meets sport.',
    img: `${W}/garden-district.jpg`,
    logo: `${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png`,
    brands: ['Museum','ATL','2026'],
  },
  {
    title: 'Technology Hub',
    sub: 'Good Times × Digital',
    desc: '837 venues. 10 cities. 198 AI agents. 34 departments. Rule Radar. UTube University. Full autonomous operation.',
    img: `${W}/penthouse-skyline.jpg`,
    logo: `${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png`,
    brands: ['Good Times','Rule Radar','UTube U'],
  },
  {
    title: 'Wellness Wing',
    sub: 'Mind Studio MSO',
    desc: 'Telemed wellness. Clinic, consumer, and personal injury verticals. 3 portals. 33 outreach targets.',
    img: `${W}/thesis-bg.jpg`,
    logo: `${SB}/mind_studio/gt_card_mind_studio.png`,
    brands: ['Clinic','Consumer','PI'],
  },
  {
    title: 'Service Exchange',
    sub: 'Umbrella Group',
    desc: 'Legal infrastructure, roadside services, on-call systems. The backbone that supports every brand.',
    img: `${W}/hero-bg.jpg`,
    logo: `${SB}/umbrella_injury/00-brand-assets/logos/hurt-911-logo-black.png`,
    brands: ['Umbrella','S.O.S','On Call'],
  },
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

const PARTNERSHIPS = [
  { title:'Invest', desc:'Equity partnerships across the portfolio.' },
  { title:'Collaborate', desc:'Brand-to-brand creative partnerships.' },
  { title:'Sponsor', desc:'Sponsorship across events, museums, and products.' },
];

/* ═══ HOOKS ═══ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if(!el) return;
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){setV(true);obs.disconnect()} }, {threshold:0.08,rootMargin:'0px 0px -20px 0px'});
    obs.observe(el); return()=>obs.disconnect();
  }, []);
  return { ref, v };
}

function Rv({children,d=0,style={}}:{children:React.ReactNode;d?:number;style?:React.CSSProperties}) {
  const {ref,v} = useReveal();
  return <div ref={ref} style={{opacity:v?1:0,transform:v?'translateY(0)':'translateY(35px)',transition:`opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s`,...style}}>{children}</div>;
}

function Counter({target,suffix=''}:{target:number;suffix?:string}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val,setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if(!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if(e.isIntersecting && !started.current) {
        started.current=true; const s=performance.now();
        function up(t:number){const p=Math.min((t-s)/2000,1);setVal(Math.floor((1-Math.pow(1-p,4))*target));if(p<1)requestAnimationFrame(up)}
        requestAnimationFrame(up); obs.disconnect();
      }
    }, {threshold:0.5});
    obs.observe(el); return()=>obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ═══ SHARED STYLES ═══ */
const GOLD = '#C8A96E';
const mono = 'DM Mono,monospace';
const serif = 'Cormorant Garamond,serif';
const tag = (color=GOLD):React.CSSProperties => ({fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.35em',textTransform:'uppercase',color});
const heading = (size='clamp(28px,5vw,72px)'):React.CSSProperties => ({fontFamily:serif,fontSize:size,fontWeight:300,lineHeight:1.1,letterSpacing:'-0.02em'});
const goldBar:React.CSSProperties = {width:40,height:1,background:GOLD,marginBottom:16};

/* ═══ PAGE ═══ */
export default function Home() {
  const [loaded,setLoaded] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  const [videoReady,setVideoReady] = useState(false);
  const [mob,setMob] = useState(false);
  const vRef = useRef<HTMLVideoElement>(null);

  useEffect(()=>{setTimeout(()=>setLoaded(true),1600);const f=()=>setScrolled(window.scrollY>60);window.addEventListener('scroll',f);return()=>window.removeEventListener('scroll',f)},[]);
  useEffect(()=>{const v=vRef.current;if(!v)return;const r=()=>setVideoReady(true);v.addEventListener('canplaythrough',r);v.addEventListener('playing',r);const t=setTimeout(()=>setVideoReady(true),3000);return()=>{v.removeEventListener('canplaythrough',r);v.removeEventListener('playing',r);clearTimeout(t)}},[]);
  const go = useCallback((id:string)=>{setMob(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'})},[]);

  return <>
    {/* PRELOADER */}
    <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',background:'#080604',zIndex:10000,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',transition:'opacity 1s cubic-bezier(0.16,1,0.3,1),visibility 1s',...(loaded?{opacity:0,visibility:'hidden' as const,pointerEvents:'none' as const}:{})}}>
      <div style={{width:64,height:64,border:'1px solid rgba(200,169,110,0.3)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img src={KHG} alt="" style={{width:36,height:36,objectFit:'contain'}} />
      </div>
      <div style={{fontFamily:serif,fontSize:14,letterSpacing:'0.3em',textTransform:'uppercase',color:GOLD,marginTop:20,opacity:0.6}}>Dr. Dorsey + The Kollective</div>
    </div>

    {/* MOBILE MENU */}
    <div style={{position:'fixed',top:0,right:mob?0:'-100%',width:'100%',height:'100%',background:'#080604',zIndex:999,display:'flex',flexDirection:'column',justifyContent:'center',padding:'96px clamp(20px,4vw,80px)',transition:'right 0.6s cubic-bezier(0.16,1,0.3,1)'}}>
      {['ecosystem','districts','cities','partnerships','connect'].map(id=>(
        <a key={id} href={`#${id}`} style={{fontFamily:serif,fontSize:'clamp(28px,5vw,56px)',fontWeight:300,textDecoration:'none',display:'block',padding:'14px 0',borderBottom:'1px solid rgba(245,240,232,0.06)',color:'#F5F0E8'}} onClick={e=>{e.preventDefault();go(id)}}>{id.charAt(0).toUpperCase()+id.slice(1)}</a>
      ))}
    </div>

    {/* NAV */}
    <nav style={{position:'fixed',top:0,left:0,width:'100%',zIndex:1000,padding:'20px clamp(20px,4vw,80px)',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'background 0.4s,backdrop-filter 0.4s',...(scrolled?{background:'rgba(8,6,4,0.9)',backdropFilter:'blur(20px)'}:{})}}>
      <a href="#" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none',color:'#F5F0E8'}}>
        <div style={{width:32,height:32,border:'1px solid rgba(200,169,110,0.3)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <img src={KHG} alt="" style={{width:18,height:18,objectFit:'contain'}} />
        </div>
        <span style={{...tag(),letterSpacing:'0.25em',fontSize:'clamp(7px,0.65vw,9px)'}}>Dr. Dorsey + The Kollective</span>
      </a>
      <ul className="desk-nav" style={{display:'flex',gap:36,listStyle:'none'}}>
        {['ecosystem','districts','cities','partnerships'].map(id=>(
          <li key={id}><a href={`#${id}`} className="na" style={{...tag('rgba(245,240,232,0.5)'),textDecoration:'none',letterSpacing:'0.15em'}} onClick={e=>{e.preventDefault();go(id)}}>{id}</a></li>
        ))}
      </ul>
      <a href="#connect" className="desk-cta" style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.2em',textTransform:'uppercase',color:'#080604',background:GOLD,padding:'9px 22px',textDecoration:'none'}} onClick={e=>{e.preventDefault();go('connect')}}>Enter</a>
      <button className="mob-btn" style={{display:'none',background:'none',border:'none',cursor:'pointer',width:26,height:18,position:'relative'}} onClick={()=>setMob(!mob)}>
        <span style={{display:'block',width:'100%',height:1,background:'#F5F0E8',position:'absolute',left:0,top:mob?8:2,transition:'all 0.3s',transform:mob?'rotate(45deg)':'none'}} />
        <span style={{display:'block',width:'100%',height:1,background:'#F5F0E8',position:'absolute',left:0,top:8,transition:'all 0.3s',opacity:mob?0:1}} />
        <span style={{display:'block',width:'100%',height:1,background:'#F5F0E8',position:'absolute',left:0,top:mob?8:14,transition:'all 0.3s',transform:mob?'rotate(-45deg)':'none'}} />
      </button>
    </nav>

    {/* ═══ HERO — Cinematic aerial with video ═══ */}
    <section style={{position:'relative',height:'100vh',overflow:'hidden',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
      <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0}}>
        <img src={`${W}/hero-bg.jpg`} alt="" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.25}} />
        <video ref={vRef} style={{width:'100%',height:'100%',objectFit:'cover',opacity:videoReady?0.45:0,transition:'opacity 2s',position:'relative',zIndex:1}} autoPlay muted loop playsInline preload="auto">
          <source src={`${W}/hero-video.mp4`} type="video/mp4" />
        </video>
        {/* Warm overlay like reference */}
        <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:2,background:'linear-gradient(180deg,rgba(8,6,4,0.4) 0%,rgba(8,6,4,0.15) 35%,rgba(8,6,4,0.15) 65%,rgba(8,6,4,0.85) 90%,#080604 100%)'}} />
        <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:2,background:'radial-gradient(ellipse at 50% 60%,rgba(200,169,110,0.06) 0%,transparent 60%)'}} />
      </div>
      <div style={{position:'relative',zIndex:3,maxWidth:900,padding:'0 clamp(20px,4vw,80px)'}}>
        <div style={{...tag(),marginBottom:20,animation:'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.8s both'}}>Dr. Dorsey + The Kollective</div>
        <h1 style={{fontFamily:serif,fontSize:'clamp(32px,6vw,80px)',fontWeight:300,lineHeight:1.1,letterSpacing:'-0.02em',animation:'fadeUp 1s cubic-bezier(0.16,1,0.3,1) 2s both'}}>
          Where Culture Becomes<br/><em style={{fontStyle:'italic',color:GOLD}}>Infrastructure.</em>
        </h1>
        <a href="#ecosystem" style={{display:'inline-block',fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.25em',textTransform:'uppercase',color:GOLD,border:`1px solid ${GOLD}`,padding:'14px 40px',textDecoration:'none',marginTop:40,animation:'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 2.4s both',transition:'all 0.3s'}}
          onClick={e=>{e.preventDefault();go('ecosystem')}}>Enter the Ecosystem</a>
      </div>
      {/* Bottom gradient bar like reference */}
      <div style={{position:'absolute',bottom:0,left:0,width:'100%',height:2,background:`linear-gradient(90deg,transparent,${GOLD},transparent)`,zIndex:3,opacity:0.4}} />
    </section>

    {/* ═══ LOGO STRIP ═══ */}
    <div style={{padding:'32px clamp(20px,4vw,80px)',background:'#080604',borderBottom:'1px solid rgba(245,240,232,0.04)'}}>
      <div style={{maxWidth:1400,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',gap:'clamp(24px,4vw,56px)',flexWrap:'wrap'}}>
        {LOGOS.map(l=>(
          <a key={l.n} href={l.u||'#'} target={l.u?'_blank':undefined} rel="noopener noreferrer" className="logo-i" style={{opacity:0.3,transition:'opacity 0.4s'}}>
            <div style={{width:72,height:32,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <img src={l.s} alt={l.n} style={{maxWidth:72,maxHeight:32,objectFit:'contain',filter:'brightness(1.4)'}} />
            </div>
          </a>
        ))}
      </div>
    </div>

    {/* ═══ ECOSYSTEM — Founder + Command Map (3-col like reference) ═══ */}
    <section style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',background:'#080604'}} id="ecosystem">
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <Rv><div style={goldBar} /></Rv>
        <Rv><h2 style={{...heading('clamp(28px,5vw,64px)'),marginBottom:64}}>Architect of Experiences,<br/>Curator of <em style={{fontStyle:'italic',color:GOLD}}>Worlds.</em></h2></Rv>

        {/* 3-column grid like reference: Founder | Command Map | Forever Futbol */}
        <div className="eco-grid" style={{display:'grid',gridTemplateColumns:'1fr 1.4fr 1fr',gap:2,marginBottom:2}}>
          {/* Founder portrait cell */}
          <Rv d={0.1}>
            <div style={{position:'relative',height:'clamp(300px,40vw,500px)',overflow:'hidden',background:'#0D0A07'}}>
              <img src={`${W}/thesis-bg.jpg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.5}} />
              <div style={{position:'absolute',bottom:0,left:0,width:'100%',padding:'32px 28px',background:'linear-gradient(0deg,rgba(8,6,4,0.9) 0%,transparent 100%)'}}>
                <div style={{fontFamily:serif,fontSize:'clamp(16px,2vw,24px)',fontWeight:300,fontStyle:'italic',color:GOLD,lineHeight:1.3}}>Architect of Experiences,<br/>Curator of Worlds</div>
              </div>
            </div>
          </Rv>

          {/* Empire Command Map — center */}
          <Rv d={0.2}>
            <div style={{position:'relative',height:'clamp(300px,40vw,500px)',overflow:'hidden',background:'#0D0A07',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:32}}>
              <img src={`${W}/hero-bg.jpg`} alt="" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.15}} />
              <div style={{position:'relative',zIndex:1,textAlign:'center'}}>
                <div style={{fontFamily:serif,fontSize:'clamp(18px,2.5vw,32px)',fontWeight:400,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:32,color:'#F5F0E8'}}>Empire Command Map</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,maxWidth:360,margin:'0 auto'}}>
                  {['Night District','Culinary District','Museum Quarter','Technology Hub','Wellness Wing','Service Exchange'].map(d=>(
                    <div key={d} style={{border:'1px solid rgba(200,169,110,0.2)',padding:'12px 16px',fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(245,240,232,0.6)',textAlign:'center',background:'rgba(200,169,110,0.04)',transition:'all 0.3s',cursor:'pointer'}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=GOLD;e.currentTarget.style.color=GOLD}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(200,169,110,0.2)';e.currentTarget.style.color='rgba(245,240,232,0.6)'}}>
                      {d}
                    </div>
                  ))}
                </div>
                {/* Stats below map */}
                <div style={{display:'flex',gap:40,justifyContent:'center',marginTop:32}}>
                  {[{t:57,s:'+',l:'Ventures'},{t:8,s:'',l:'Cities'},{t:198,s:'',l:'Agents'}].map(s=>(
                    <div key={s.l} style={{textAlign:'center'}}>
                      <div style={{fontFamily:serif,fontSize:'clamp(24px,3vw,44px)',fontWeight:300,color:GOLD,lineHeight:1}}><Counter target={s.t} suffix={s.s}/></div>
                      <div style={{fontFamily:mono,fontSize:8,letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(245,240,232,0.3)',marginTop:4}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Rv>

          {/* Forever Futbol cell */}
          <Rv d={0.3}>
            <div style={{position:'relative',height:'clamp(300px,40vw,500px)',overflow:'hidden',background:'#0D0A07'}}>
              <img src={`${W}/garden-district.jpg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.45}} />
              <div style={{position:'absolute',top:24,left:0,width:'100%',textAlign:'center'}}>
                <div style={{fontFamily:serif,fontSize:'clamp(16px,2vw,28px)',fontWeight:400,letterSpacing:'0.08em',textTransform:'uppercase',color:'#F5F0E8'}}>Forever Futbol</div>
                <div style={{fontFamily:mono,fontSize:8,letterSpacing:'0.2em',color:GOLD,marginTop:4}}>May 29 — Jul 6, 2026</div>
              </div>
              <div style={{position:'absolute',bottom:24,left:24}}>
                <img src={`${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png`} alt="" style={{height:40,objectFit:'contain',filter:'brightness(1.3)',opacity:0.7}} />
              </div>
            </div>
          </Rv>
        </div>
      </div>
    </section>

    {/* ═══ DISTRICTS — 3-col image cards like reference ═══ */}
    <section style={{padding:'0 clamp(20px,4vw,80px) clamp(80px,10vw,140px)',background:'#080604'}} id="districts">
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <Rv><div style={{...tag(),marginBottom:12}}>The Districts</div></Rv>
        <Rv><h2 style={{...heading('clamp(26px,4.5vw,56px)'),marginBottom:48}}>Six divisions. One <em style={{fontStyle:'italic',color:GOLD}}>ecosystem.</em></h2></Rv>

        <div className="dist-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:2}}>
          {DISTRICTS.map((d,i)=>(
            <Rv key={d.title} d={i*0.08}>
              <div className="dist-card" style={{position:'relative',height:'clamp(260px,32vw,420px)',overflow:'hidden',background:'#0D0A07',cursor:'pointer'}}>
                <img src={d.img} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.35,transition:'opacity 0.6s,transform 6s cubic-bezier(0.37,0,0.63,1)'}} />
                <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,rgba(8,6,4,0.2) 0%,rgba(8,6,4,0.75) 100%)'}} />
                <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:1,padding:'clamp(20px,2vw,32px)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                  <div>
                    <div style={{fontFamily:serif,fontSize:'clamp(18px,2.5vw,32px)',fontWeight:400,letterSpacing:'0.05em',textTransform:'uppercase',color:'#F5F0E8',marginBottom:4}}>{d.title}</div>
                    <div style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.15em',color:GOLD}}>{d.sub}</div>
                  </div>
                  <div>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
                      {d.brands.map(b=><span key={b} style={{fontFamily:mono,fontSize:7,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(245,240,232,0.5)',border:'1px solid rgba(245,240,232,0.1)',padding:'2px 8px'}}>{b}</span>)}
                    </div>
                    <div style={{width:36,height:36,display:'flex',alignItems:'center',justifyContent:'flex-start',opacity:0.5}}>
                      <img src={d.logo} alt="" style={{maxWidth:36,maxHeight:36,objectFit:'contain',filter:'brightness(1.4)'}} />
                    </div>
                  </div>
                </div>
              </div>
            </Rv>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ FULL-BLEED QUOTE ═══ */}
    <div style={{position:'relative',height:'clamp(250px,35vw,400px)',overflow:'hidden'}}>
      <img src={`${W}/penthouse-skyline.jpg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.35}} />
      <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,#080604 0%,transparent 25%,transparent 75%,#080604 100%)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{fontFamily:serif,fontSize:'clamp(20px,3.5vw,48px)',fontWeight:300,fontStyle:'italic',color:GOLD,textAlign:'center',maxWidth:600,padding:'0 clamp(20px,4vw,80px)',lineHeight:1.3}}>
          &ldquo;Everybody wants to eat at night — nobody wants to hunt in the morning.&rdquo;
        </div>
      </div>
    </div>

    {/* ═══ CITIES — image cards with backgrounds ═══ */}
    <section style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',background:'#080604'}} id="cities">
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <Rv><div style={goldBar} /></Rv>
        <Rv><h2 style={{...heading('clamp(26px,4.5vw,56px)'),marginBottom:48}}>Eight cities. One <em style={{fontStyle:'italic',color:GOLD}}>frequency.</em></h2></Rv>
        <div className="city-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:2}}>
          {CITIES.map((c,i)=>(
            <Rv key={c.n} d={i*0.06}>
              <div className="city-c" style={{position:'relative',overflow:'hidden',background:'#000',minHeight:c.hq?260:140,...(c.hq?{gridColumn:'span 2',gridRow:'span 2'}:{})}}>
                <img src={c.bg} alt="" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.35,transition:'opacity 0.5s,transform 6s cubic-bezier(0.37,0,0.63,1)'}} />
                <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.6) 100%)'}} />
                <div style={{position:'relative',zIndex:1,padding:c.hq?'clamp(32px,4vw,56px)':'clamp(20px,2vw,32px)',height:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                  {c.hq && <span style={{...tag(),marginBottom:12}}>Headquarters</span>}
                  <div style={{fontFamily:serif,fontSize:c.hq?'clamp(32px,5vw,64px)':'clamp(18px,2.5vw,28px)',fontWeight:400,color:'#F5F0E8'}}>{c.n}</div>
                  <div style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.3em',textTransform:'uppercase',color:GOLD,marginTop:2}}>{c.s}</div>
                  <div style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',color:'rgba(245,240,232,0.4)',marginTop:6}}>{c.c}</div>
                </div>
              </div>
            </Rv>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ PARTNERSHIPS — 3-col like reference ═══ */}
    <section style={{position:'relative',padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',overflow:'hidden'}} id="partnerships">
      <img src={`${W}/luxury-venue.jpg`} alt="" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.15}} />
      <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,#080604 0%,rgba(8,6,4,0.7) 50%,#080604 100%)'}} />
      <div style={{maxWidth:1400,margin:'0 auto',position:'relative',zIndex:1}}>
        <Rv><div style={goldBar} /></Rv>
        <Rv><h2 style={{...heading('clamp(26px,4.5vw,56px)'),marginBottom:12,textAlign:'center'}}>Partnerships &amp; <em style={{fontStyle:'italic',color:GOLD}}>Opportunities</em></h2></Rv>
        <Rv><p style={{fontFamily:mono,fontSize:'clamp(9px,0.8vw,11px)',letterSpacing:'0.15em',color:'rgba(245,240,232,0.4)',textAlign:'center',marginBottom:56,textTransform:'uppercase'}}>Investment · Collaboration · Sponsorship</p></Rv>
        <div className="part-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:2}}>
          {PARTNERSHIPS.map((p,i)=>(
            <Rv key={p.title} d={i*0.1}>
              <div style={{background:'rgba(13,10,7,0.85)',border:'1px solid rgba(200,169,110,0.1)',padding:'clamp(32px,4vw,56px)',textAlign:'center',backdropFilter:'blur(8px)',transition:'border-color 0.4s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(200,169,110,0.3)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(200,169,110,0.1)'}>
                <div style={{fontFamily:serif,fontSize:'clamp(22px,3vw,40px)',fontWeight:300,fontStyle:'italic',color:GOLD,marginBottom:16}}>{p.title}</div>
                <div style={{fontSize:'clamp(12px,1vw,15px)',color:'rgba(245,240,232,0.5)',lineHeight:1.6}}>{p.desc}</div>
              </div>
            </Rv>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ CONNECT ═══ */}
    <section style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',background:'#080604',borderTop:'1px solid rgba(245,240,232,0.04)'}} id="connect">
      <div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}>
        <Rv><div style={{...goldBar,margin:'0 auto 16px'}} /></Rv>
        <Rv><h2 style={{...heading('clamp(28px,5vw,64px)'),marginBottom:24}}>Live <em style={{fontStyle:'italic',color:GOLD}}>The Kollective.</em></h2></Rv>
        <Rv d={0.1}><p style={{fontSize:'clamp(14px,1.3vw,18px)',color:'rgba(245,240,232,0.5)',lineHeight:1.7,marginBottom:48,maxWidth:560,margin:'0 auto 48px'}}>
          Whether it&rsquo;s sponsorship, investment, venue partnership, or brand collaboration — the ecosystem is designed for those who build at this level.
        </p></Rv>
        <Rv d={0.2}>
          <div style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap',marginBottom:56}}>
            <a href="mailto:thekollectiveworldwide@gmail.com?subject=Partnership — Dr. Dorsey" style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.2em',textTransform:'uppercase',color:'#080604',background:GOLD,padding:'14px 36px',textDecoration:'none',border:`1px solid ${GOLD}`}}>Start a Conversation</a>
            <a href="https://instagram.com/dolodorsey" target="_blank" rel="noopener noreferrer" style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.2em',textTransform:'uppercase',color:'#F5F0E8',background:'transparent',padding:'14px 36px',textDecoration:'none',border:'1px solid rgba(245,240,232,0.2)'}}>@dolodorsey</a>
          </div>
        </Rv>
        <Rv d={0.3}>
          <div style={{display:'flex',gap:40,justifyContent:'center',flexWrap:'wrap'}}>
            {[{l:'Email',v:'thekollectiveworldwide@gmail.com',h:'mailto:thekollectiveworldwide@gmail.com'},{l:'Instagram',v:'@dolodorsey',h:'https://instagram.com/dolodorsey'},{l:'HQ',v:'Atlanta, Georgia'}].map(d=>(
              <div key={d.l} style={{textAlign:'center'}}>
                <div style={{...tag(),marginBottom:6}}>{d.l}</div>
                <div style={{fontSize:'clamp(12px,1vw,15px)',color:'rgba(245,240,232,0.5)'}}>
                  {d.h ? <a href={d.h} target={d.h.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" style={{textDecoration:'none',color:'inherit',borderBottom:'1px solid rgba(245,240,232,0.1)'}}>{d.v}</a> : d.v}
                </div>
              </div>
            ))}
          </div>
        </Rv>
      </div>
    </section>

    {/* ═══ FOOTER ═══ */}
    <footer className="ftr" style={{padding:'40px clamp(20px,4vw,80px)',borderTop:`1px solid rgba(200,169,110,0.1)`,display:'flex',alignItems:'center',justifyContent:'space-between',background:'#080604'}}>
      <div style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.2em',color:'rgba(245,240,232,0.2)'}}>&copy; 2026 Dr. DoLo Dorsey — The Kollective Hospitality Group</div>
      <div style={{display:'flex',gap:24}}>
        {[{n:'Instagram',u:'https://instagram.com/dolodorsey'},{n:'Twitter',u:'https://twitter.com/mrdolodorsey'},{n:'Facebook',u:'https://facebook.com/DoLoDorsey'}].map(s=>(
          <a key={s.n} href={s.u} target="_blank" rel="noopener noreferrer" style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.1em',color:'rgba(245,240,232,0.2)',textDecoration:'none'}}>{s.n}</a>
        ))}
      </div>
    </footer>

    {/* CSS */}
    <style>{`
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes lineUp{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}
      .logo-i:hover{opacity:0.7!important}
      .na:hover{color:#F5F0E8!important}
      .dist-card:hover img{opacity:0.5!important;transform:scale(1.03)!important}
      .city-c:hover img{opacity:0.5!important;transform:scale(1.03)!important}
      @media(max-width:1024px){
        .eco-grid{grid-template-columns:1fr!important}
        .dist-grid{grid-template-columns:repeat(2,1fr)!important}
        .city-grid{grid-template-columns:repeat(2,1fr)!important}
        .part-grid{grid-template-columns:1fr!important}
      }
      @media(max-width:768px){
        .desk-nav{display:none!important}
        .desk-cta{display:none!important}
        .mob-btn{display:block!important}
        .dist-grid{grid-template-columns:1fr!important}
        .city-grid{grid-template-columns:1fr!important}
        .city-c[style*="grid-column"]{grid-column:span 1!important;grid-row:span 1!important}
        .ftr{flex-direction:column!important;gap:16px!important;text-align:center!important}
      }
    `}</style>
  </>;
}
