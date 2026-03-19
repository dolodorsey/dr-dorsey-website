'use client';
import { useEffect, useRef, useState } from 'react';
import { brands, statusColors, casperBrands, dorseyAssets, eventShowcase, productShots, type BrandStatus } from './data/brands';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';

const PARTNERS = [
  { n:'HugLife', logo:`${SB}/huglife_events/00-brand-assets/logos/huglife-logo-buddha-black.png` },
  { n:'Forever Futbol', logo:`${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png` },
  { n:'NOIR', logo:`${SB}/noir_event/01_logos/NOIR_LOGO.png` },
  { n:'REMIX', logo:`${SB}/remix_event/01_logos/REMIX_LOGO.png` },
  { n:'Taste of Art', logo:`${SB}/taste_of_art/01_logos/TASTE_OF_ART_LOGO.png` },
  { n:'Gangsta Gospel', logo:`${SB}/gangsta_gospel/01_logos/GANGSTA_GOSPEL_LOGO.png` },
  { n:'WRST BHVR', logo:`${SB}/wrst_bhvr_event/03_event_flyers/WRST_generic_logo.png` },
  { n:'Pronto', logo:`${SB}/pronto_energy/logos/pronto-logo.png` },
  { n:'Good Times', logo:`${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png` },
  { n:'Casper', logo:`${SB}/casper_group/logos/casper-white.png` },
];

/* Portfolio — magic5 style with LARGE images */
const PORTFOLIO = [
  { name:'NOIR', sub:'Premier nightlife experience', year:'2026', type:'Event Brand', img:`${SB}/noir_event/03_event_flyers/NOIR_NEWS.png`, url:'https://noir-event.vercel.app', big:true },
  { name:'Taste of Art', sub:'Art meets nightlife', year:'2026', type:'Event Brand', img:`${SB}/taste_of_art/03_event_flyers/TASTE_MAIN2.JPEG`, url:'https://taste-of-art-event.vercel.app', big:true },
  { name:'REMIX', sub:'DJ culture redefined', year:'2026', type:'Event Brand', img:`${SB}/remix_event/03-event-flyers/remix-dj-dates-cities.png`, url:'https://remix-event.vercel.app', big:false },
  { name:'Gangsta Gospel', sub:'Where faith meets the streets', year:'2026', type:'Event Brand', img:`${SB}/gangsta_gospel/03_event_flyers/GANGSTA_DATE.png`, url:'https://gangsta-gospel-event.vercel.app', big:false },
  { name:'Pronto Energy', sub:'6 bold flavors', year:'2026', type:'Consumer Product', img:`${SB}/pronto-energy/product-shots/all-flavors-lineup.png`, url:'https://pronto-energy-website.vercel.app', big:false },
  { name:'Forever Futbol', sub:'The beautiful game, preserved', year:'2026', type:'Museum', img:`${SB}/forever_futbol/07_packaging_merch/MERCH_1.jpeg`, url:'https://forever-futbol.vercel.app', big:false },
];

const PRINCIPLES = [
  { n:'01', title:'Vision', desc:'Long-view thinking across every venture — building for decades, not quarters. Every brand is designed to compound.', img:`${SB}/dr_dorsey/04-social-posts/feed/quote-everybody-wants-to-eat-night.png` },
  { n:'02', title:'Systems', desc:'198 AI agents. 34 departments. Infrastructure that scales across 57+ entities and 8 cities autonomously.', img:`${SB}/dr_dorsey/04-social-posts/feed/quote-greatness-earned-silence.png` },
  { n:'03', title:'Culture', desc:'Brands rooted in authentic experience, community identity, and the architecture of real influence — not clout.', img:`${SB}/dr_dorsey/04-social-posts/feed/quote-hustle-louder-talk-less.png` },
  { n:'04', title:'Ownership', desc:'Physical, digital, and intellectual property designed for long-term equity. Every asset is owned, not rented.', img:`${SB}/dr_dorsey/04-social-posts/feed/quote-better-than-good-enough.png` },
];

const STATS = [{n:57,s:'+',l:'Ventures'},{n:8,s:'',l:'Cities'},{n:15,s:'+',l:'Event Brands'},{n:198,s:'',l:'AI Agents'},{n:34,s:'',l:'Departments'}];

const PIPE = [
  { st:'Live', nm:'Good Times App', d:'837 venues, 10 cities.', url:'https://good-times-app.vercel.app' },
  { st:'Live', nm:'Mind Studio', d:'Telemed + wellness MSO.', url:'https://themindstudioworldwide.com' },
  { st:'Building', nm:'Rule Radar', d:'Legal intelligence.', url:null },
  { st:'Building', nm:'UTube University', d:'Education platform.', url:null },
  { st:'Expanding', nm:'City Markets', d:'NY, PHX, Scottsdale.', url:null },
  { st:'Incubating', nm:'Living Legends', d:'Cultural destination.', url:null },
];

const NAV = [['#portfolio','Portfolio'],['#principles','Principles'],['#brands','Brands'],['#pipeline','Pipeline'],['#connect','Connect']];

function Img({src,alt,style}:{src:string;alt:string;style?:React.CSSProperties}){const[e,se]=useState(false);if(e||!src)return null;return <img src={src} alt={alt} style={style} onError={()=>se(true)} loading="lazy"/>;}

function useCounter(target:number,dur=1400){const[v,sv]=useState(0);const[go,sg]=useState(false);const ref=useRef<HTMLDivElement>(null);useEffect(()=>{const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){sg(true);io.disconnect();}},{threshold:.4});if(ref.current)io.observe(ref.current);return()=>io.disconnect();},[]);useEffect(()=>{if(!go)return;let s=0;const f=(t:number)=>{if(!s)s=t;const p=Math.min((t-s)/dur,1);sv(Math.round(p*target));if(p<1)requestAnimationFrame(f);};requestAnimationFrame(f);},[go,target,dur]);return{v,ref};}

export default function Home(){
  const[filter,setF]=useState<'all'|import('./data/brands').BrandStatus>('all');
  const[qi,setQi]=useState(0);
  const[navS,setNS]=useState(false);
  const[mob,setMob]=useState(false);
  const[vR,setVR]=useState(false);
  const[pi,setPi]=useState(0);
  const dR=useRef<HTMLDivElement>(null);const rR=useRef<HTMLDivElement>(null);
  const fb=filter==='all'?brands:brands.filter(b=>b.status===filter);

  useEffect(()=>{const t=setInterval(()=>setQi(i=>(i+1)%dorseyAssets.quotes.length),4500);return()=>clearInterval(t);},[]);

  useEffect(()=>{
    let mx=0,my=0,cx=0,cy=0;
    const om=(e:MouseEvent)=>{mx=e.clientX;my=e.clientY;if(dR.current){dR.current.style.left=mx+'px';dR.current.style.top=my+'px';}};
    const af=()=>{cx+=(mx-cx)*.08;cy+=(my-cy)*.08;if(rR.current){rR.current.style.left=cx+'px';rR.current.style.top=cy+'px';}requestAnimationFrame(af);};
    document.addEventListener('mousemove',om);af();
    const os=()=>{const p=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;const el=document.getElementById('sp');if(el)el.style.width=p+'%';setNS(window.scrollY>50);};
    window.addEventListener('scroll',os,{passive:true});
    const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});},{threshold:.05,rootMargin:'0px 0px -40px 0px'});
    setTimeout(()=>document.querySelectorAll('.rv,.stg').forEach(el=>io.observe(el)),100);
    return()=>{document.removeEventListener('mousemove',om);window.removeEventListener('scroll',os);io.disconnect();};
  },[]);

  const navTo=(h:string)=>{setMob(false);setTimeout(()=>{document.querySelector(h)?.scrollIntoView({behavior:'smooth'});},200);};

  return(<>
    <div id="cd" ref={dR}/><div id="cr" ref={rR}/><div id="sp"/>
    <div className={`mn ${mob?'on':''}`}>{NAV.map(([h,l])=><a key={l} onClick={()=>navTo(h)}>{l}</a>)}</div>

    {/* NAV */}
    <nav className="nv"><div className="nv-in">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{height:22,width:'auto',opacity:.85}}/>
        <span className="mono mh" style={{fontSize:10,letterSpacing:'.4em',textTransform:'uppercase',color:'var(--t3)'}}>Dr. Dorsey</span>
      </div>
      <div className="ndsk" style={{display:'flex',gap:36}}>{NAV.map(([h,l])=><a key={l} href={h} className="nl">{l}</a>)}</div>
      <div className="ndsk"><a href="#connect" className="cta" style={{padding:'10px 28px',fontSize:11}}>Contact</a></div>
      <div className={`mbtn ${mob?'on':''}`} onClick={()=>setMob(!mob)}><span/><span/><span/></div>
    </div></nav>

    {/* ═══ 1. HERO — magic5 centered + big video ═══ */}
    <section style={{background:'var(--bg)',paddingTop:120,position:'relative',overflow:'hidden'}}>
      {/* Giant watermark text — like magic5's red SVG */}
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-60%)',fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(80px,18vw,280px)',fontWeight:700,color:'rgba(212,184,122,.03)',whiteSpace:'nowrap',pointerEvents:'none',letterSpacing:'-.04em',lineHeight:1,zIndex:0}}>THE KOLLECTIVE</div>

      <div style={{maxWidth:'var(--mx)',margin:'0 auto',padding:'0 var(--g)',textAlign:'center',position:'relative',zIndex:2}}>
        <div style={{opacity:0,animation:'fr .7s .1s var(--e) forwards',display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:24}}>
          <Img src={dorseyAssets.kollectiveGoldWhite} alt="" style={{height:20,width:'auto',opacity:.6}}/>
          <span className="label">The Kollective Hospitality Group</span>
        </div>
        <h1 style={{fontSize:'clamp(48px,9vw,130px)',fontWeight:700,lineHeight:.9,letterSpacing:'-.03em',marginBottom:28,opacity:0,animation:'hi 1s .05s var(--e) forwards'}}>
          The Architecture<br/>of a Modern <em>Empire</em>
        </h1>
        <p style={{fontSize:'clamp(16px,1.3vw,20px)',color:'var(--t2)',maxWidth:560,margin:'0 auto 36px',lineHeight:1.7,opacity:0,animation:'fu .8s .3s var(--e) forwards'}}>
          A founder-led ecosystem — hospitality, events, food & beverage, museums, products, and technology across 8 cities and 57+ ventures.
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',opacity:0,animation:'fu .8s .45s var(--e) forwards',flexWrap:'wrap'}}>
          <a href="#portfolio" className="cta">Explore Our Work</a>
          <a href="#brands" className="cta-g">All Brands</a>
        </div>
      </div>

      {/* BIG ROUNDED VIDEO — magic5 hero */}
      <div style={{maxWidth:1100,margin:'60px auto 0',padding:'0 var(--g)',position:'relative'}}>
        <div style={{position:'relative',borderRadius:'var(--rx)',overflow:'hidden',aspectRatio:'16/9',background:'var(--bg2)',border:'1px solid rgba(245,241,234,.04)'}}>
          <video autoPlay muted loop playsInline onLoadedData={()=>setVR(true)} style={{width:'100%',height:'100%',objectFit:'cover',opacity:vR?.85:0,transition:'opacity 1.5s var(--e)'}}>
            <source src="/videos/hero-animation.mp4" type="video/mp4"/>
          </video>
          {/* PLACEHOLDER overlay for better video */}
          {!vR && <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'var(--card)'}}>
            <div style={{textAlign:'center'}}>
              <div style={{width:64,height:64,borderRadius:'50%',border:'2px solid rgba(212,184,122,.2)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}><span style={{fontSize:24,color:'var(--gold)',marginLeft:4}}>▶</span></div>
              <div className="mono" style={{fontSize:10,letterSpacing:'.3em',textTransform:'uppercase',color:'var(--t4)'}}>Sizzle Reel</div>
            </div>
          </div>}
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,var(--bg) 0%,transparent 25%)',pointerEvents:'none'}}/>
        </div>
      </div>
    </section>

    {/* ═══ 2. PARTNER LOGOS — magic5 strip ═══ */}
    <section style={{background:'var(--bg)',padding:'48px 0 56px',overflow:'hidden',borderBottom:'1px solid rgba(245,241,234,.04)'}}>
      <p className="rv" style={{textAlign:'center',fontSize:'clamp(14px,1.1vw,17px)',color:'var(--t3)',marginBottom:28,padding:'0 var(--g)'}}>Building brands and experiences for ventures with the courage to be different.</p>
      <div className="ps">
        {[...PARTNERS,...PARTNERS,...PARTNERS].map((p,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'0 clamp(24px,3vw,48px)',flexShrink:0,height:44}}>
            <Img src={p.logo} alt={p.n} style={{height:32,width:'auto',opacity:.3,filter:'brightness(1.5) contrast(.8)',objectFit:'contain',transition:'opacity .3s'}}/>
          </div>
        ))}
      </div>
    </section>

    {/* ═══ 3. PORTFOLIO — magic5 project grid ═══ */}
    <section id="portfolio" style={{background:'var(--bg2)',padding:'var(--pad) var(--g)'}}>
      <div style={{maxWidth:'var(--mx)',margin:'0 auto'}}>
        <div className="rv" style={{textAlign:'center',marginBottom:56}}>
          <span className="label" style={{display:'block',marginBottom:14}}>Our Portfolio</span>
          <h2 style={{fontSize:'clamp(36px,5.5vw,76px)'}}>Brands we've <em>built.</em></h2>
        </div>

        {/* Top 2 — BIG cards like magic5 */}
        <div className="rv stg" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}} >
          {PORTFOLIO.filter(p=>p.big).map(p=>(
            <div key={p.name} className="pcard" style={{aspectRatio:'16/10',position:'relative'}} onClick={()=>window.open(p.url,'_blank')}>
              <Img src={p.img} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              <div className="pinfo">
                <div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(22px,2.5vw,36px)',fontWeight:600,color:'var(--w)'}}>{p.name}</div>
                  <div style={{fontSize:'clamp(12px,1vw,14px)',color:'var(--t2)',marginTop:4}}>{p.sub}</div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <span className="tag">{p.year}</span>
                  <span className="tag">{p.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom 4 — smaller grid */}
        <div className="rv stg" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}} >
          {PORTFOLIO.filter(p=>!p.big).map(p=>(
            <div key={p.name} className="pcard" style={{aspectRatio:'4/5',position:'relative'}} onClick={()=>window.open(p.url,'_blank')}>
              <Img src={p.img} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              <div className="pinfo" style={{padding:20}}>
                <div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(16px,1.5vw,24px)',fontWeight:600,color:'var(--w)'}}>{p.name}</div>
                  <div className="mono" style={{fontSize:9,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--t3)',marginTop:4}}>{p.type}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ 4. PRINCIPLES — magic5 numbered tabs ═══ */}
    <section id="principles" style={{background:'var(--bg)',padding:'var(--pad) var(--g)'}}>
      <div style={{maxWidth:'var(--mx)',margin:'0 auto'}}>
        <div className="rv" style={{textAlign:'center',marginBottom:56}}>
          <span className="label" style={{display:'block',marginBottom:14}}>Our Principles</span>
          <h2 style={{fontSize:'clamp(36px,5.5vw,76px)'}}>What drives the <em>machine.</em></h2>
        </div>
        {/* Number tabs — magic5 exact pattern */}
        <div className="rv" style={{display:'flex',gap:8,justifyContent:'center',marginBottom:48}}>
          {PRINCIPLES.map((p,i)=>(<button key={p.n} onClick={()=>setPi(i)} style={{width:56,height:56,borderRadius:'50%',background:pi===i?'var(--gold)':'transparent',border:`1.5px solid ${pi===i?'var(--gold)':'rgba(245,241,234,.08)'}`,color:pi===i?'var(--bg)':'var(--t3)',fontFamily:"'DM Mono',monospace",fontSize:14,fontWeight:600,transition:'all .3s var(--e)'}}>{p.n}</button>))}
        </div>
        {/* Content card */}
        <div className="card" style={{borderRadius:'var(--rl)',overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:400}} className="g2">
            {/* Image side */}
            <div style={{position:'relative',overflow:'hidden',minHeight:300}}>
              {PRINCIPLES.map((p,i)=>(<Img key={p.n} src={p.img} alt={p.title} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:pi===i?1:0,transition:'opacity .6s ease',filter:'brightness(.85) contrast(1.1)'}}/>))}
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,transparent 60%,var(--card) 100%)'}} className="mh"/>
            </div>
            {/* Text side */}
            <div style={{padding:'clamp(32px,4vw,64px)',display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <div className="mono" style={{fontSize:11,letterSpacing:'.3em',color:'var(--gold)',marginBottom:16}}>{PRINCIPLES[pi].n}</div>
              <h3 style={{fontSize:'clamp(28px,3.5vw,52px)',marginBottom:20}}>{PRINCIPLES[pi].title}</h3>
              <p style={{fontSize:'clamp(15px,1.2vw,18px)',color:'var(--t2)',lineHeight:1.9}}>{PRINCIPLES[pi].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══ 5. SOCIAL PROOF / STATS — magic5 "180+ reviews" ═══ */}
    <section style={{background:'var(--bg2)',padding:'var(--pad) var(--g)'}}>
      <div style={{maxWidth:'var(--mx)',margin:'0 auto'}}>
        <div className="rv" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'clamp(40px,6vw,100px)',alignItems:'center'}} className="g2 rv">
          <div>
            <div style={{display:'flex',gap:20,marginBottom:32}}>
              {STATS.slice(0,2).map(s=>{const{v,ref}=useCounter(s.n);return(
                <div key={s.l} ref={ref}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(56px,7vw,96px)',fontWeight:700,color:'var(--gold)',lineHeight:1}}>{v}{s.s}</div>
                  <div className="mono" style={{fontSize:11,letterSpacing:'.3em',textTransform:'uppercase',color:'var(--t3)',marginTop:6}}>{s.l}</div>
                </div>
              );})}
            </div>
            <p style={{fontSize:'clamp(15px,1.2vw,18px)',color:'var(--t2)',lineHeight:1.9,maxWidth:480}}>The results confirm the vision. 57+ active ventures across 8 cities, powered by 198 AI agents and 34 autonomous departments — all engineered by a single founder.</p>
          </div>
          {/* Remaining stats in cards */}
          <div className="stg" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
            {STATS.slice(2).map(s=>{const{v,ref}=useCounter(s.n);return(
              <div key={s.l} ref={ref} className="card" style={{textAlign:'center',padding:'clamp(20px,2.5vw,36px) 12px'}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(32px,4vw,56px)',fontWeight:700,color:'var(--gold)',lineHeight:1}}>{v}{s.s}</div>
                <div className="mono" style={{fontSize:9,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--t3)',marginTop:8}}>{s.l}</div>
              </div>
            );})}
          </div>
        </div>
      </div>
    </section>

    {/* ═══ 6. MANIFESTO STRIP — magic5 "Websites from another world!" ═══ */}
    <section style={{background:'var(--bg)',padding:'clamp(48px,8vh,100px) 0',overflow:'hidden',borderTop:'1px solid rgba(245,241,234,.04)',borderBottom:'1px solid rgba(245,241,234,.04)'}}>
      <div className="mstrip">
        {['Brands from another','dimension!','We build empires','that compound.','Brands from another','dimension!','We build empires','that compound.'].map((t,i)=>(
          <span key={i}>{t.includes('dimension')||t.includes('compound')?<em>{t}</em>:t}</span>
        ))}
      </div>
    </section>

    {/* ═══ 7. BRANDS ═══ */}
    <section id="brands" style={{background:'var(--bg2)',padding:'var(--pad) var(--g)'}}>
      <div style={{maxWidth:'var(--mx)',margin:'0 auto'}}>
        <div className="rv" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:48,flexWrap:'wrap',gap:20}}>
          <div>
            <span className="label" style={{display:'block',marginBottom:14}}>Brand Universe</span>
            <h2 style={{fontSize:'clamp(36px,5vw,72px)'}}>Every brand. One <em>ecosystem.</em></h2>
          </div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            {(['all','flagship','active','seasonal','dev','legacy'] as const).map(f=>(
              <button key={f} onClick={()=>setF(f)} style={{padding:'8px 18px',background:filter===f?'rgba(212,184,122,.08)':'transparent',border:`1px solid ${filter===f?'rgba(212,184,122,.3)':'rgba(245,241,234,.06)'}`,color:filter===f?'var(--gold)':'var(--t3)',borderRadius:60,fontSize:11,fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',transition:'all .3s'}}>{f}</button>
            ))}
          </div>
        </div>
        <div className="stg" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
          {fb.map(b=>(
            <div key={b.name} className={b.featured?'fcard':'card'} style={{padding:24,cursor:b.website?'pointer':'default'}} onClick={()=>b.website&&window.open(b.website,'_blank')}>
              {b.logo&&<div style={{marginBottom:14,height:64,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(245,241,234,.02)',borderRadius:'var(--r)',padding:12}}><Img src={b.logo} alt={b.name} style={{maxWidth:'55%',maxHeight:'100%',objectFit:'contain',opacity:.85}}/></div>}
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
                <div>
                  <div style={{fontSize:'clamp(13px,1vw,15px)',fontWeight:500,color:'var(--t1)'}}>{b.name}</div>
                  <div className="mono" style={{fontSize:9,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--t4)',marginTop:3}}>{b.division}</div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <div style={{width:7,height:7,borderRadius:'50%',background:statusColors[b.status]}}/>
                  {b.website&&<span style={{fontSize:14,color:'var(--t4)'}}>→</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ 8. PIPELINE ═══ */}
    <section id="pipeline" style={{background:'var(--bg)',padding:'var(--pad) var(--g)'}}>
      <div style={{maxWidth:'var(--mx)',margin:'0 auto'}}>
        <div className="rv" style={{textAlign:'center',marginBottom:56}}>
          <span className="label" style={{display:'block',marginBottom:14}}>Pipeline</span>
          <h2 style={{fontSize:'clamp(36px,5.5vw,76px)'}}>The next chapter is <em>already</em> in motion.</h2>
        </div>
        <div className="stg" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
          {PIPE.map(p=>(
            <div key={p.nm} className={p.st==='Live'?'fcard':'card'} style={{padding:'clamp(24px,3vw,40px)',cursor:p.url?'pointer':'default'}} onClick={()=>p.url&&window.open(p.url,'_blank')}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                <span className="mono" style={{fontSize:11,letterSpacing:'.25em',textTransform:'uppercase',fontWeight:500,color:p.st==='Live'?'#6fb86f':'var(--t3)'}}>{p.st}</span>
                <div style={{width:8,height:8,borderRadius:'50%',background:p.st==='Live'?'#6fb86f':'rgba(212,184,122,.2)',animation:p.st==='Live'?'pu 3s ease infinite':'none'}}/>
              </div>
              <h3 style={{fontSize:'clamp(22px,2.5vw,36px)',marginBottom:12}}>{p.nm}</h3>
              <p style={{fontSize:'clamp(13px,1vw,15px)',color:'var(--t2)',lineHeight:1.7}}>{p.d}</p>
              {p.url&&<div style={{marginTop:16,fontSize:12,color:'var(--gold)',fontWeight:500}}>Visit →</div>}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ 9. CONTACT — magic5 style with video bg + form ═══ */}
    <section id="connect" style={{background:'var(--bg3)',padding:'var(--pad) var(--g)',position:'relative',overflow:'hidden'}}>
      {/* Video background placeholder */}
      <div style={{position:'absolute',inset:0,opacity:.08,filter:'brightness(.3)',backgroundImage:`url(${dorseyAssets.quotes[2]})`,backgroundSize:'cover',backgroundPosition:'center',pointerEvents:'none'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,var(--bg3),rgba(19,19,24,.85),var(--bg3))',pointerEvents:'none'}}/>
      
      <div style={{maxWidth:900,margin:'0 auto',position:'relative',zIndex:2}}>
        <div className="rv" style={{textAlign:'center',marginBottom:48}}>
          <span className="label" style={{display:'block',marginBottom:14}}>Your Project, Our Challenge</span>
          <h2 style={{fontSize:'clamp(36px,6vw,80px)',marginBottom:20}}>{"Let's"} <em>build</em> together.</h2>
          <p style={{fontSize:'clamp(15px,1.2vw,18px)',color:'var(--t2)',lineHeight:1.8,maxWidth:560,margin:'0 auto'}}>Ready to collaborate? Whether it's sponsorship, investment, venue partnership, or brand collaboration — the ecosystem is designed for it.</p>
        </div>

        {/* Team row — PLACEHOLDER for real photos */}
        <div className="rv" style={{display:'flex',justifyContent:'center',gap:12,marginBottom:48,flexWrap:'wrap'}}>
          {['Dr. Dorsey','Linda','Maia','Nya','Myia B','Brad'].map(name=>(
            <div key={name} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
              <div style={{width:64,height:64,borderRadius:'50%',background:'var(--card)',border:'1.5px solid rgba(212,184,122,.1)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:600,color:'var(--gold)',opacity:.5}}>{name[0]}</span>
              </div>
              <span className="mono" style={{fontSize:9,letterSpacing:'.1em',color:'var(--t3)'}}>{name}</span>
            </div>
          ))}
        </div>

        <div className="rv" style={{display:'flex',gap:12,justifyContent:'center',marginBottom:40,flexWrap:'wrap'}}>
          <a href="mailto:thekollectiveworldwide@gmail.com?subject=Partnership%20—%20KHG" className="cta">Start a Conversation</a>
          <a href="https://instagram.com/thekollectiveworldwide" target="_blank" rel="noopener noreferrer" className="cta-g">Instagram</a>
        </div>

        <div className="rv" style={{textAlign:'center'}}>
          <a href="mailto:thekollectiveworldwide@gmail.com" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(18px,2.5vw,32px)',fontWeight:500,color:'rgba(212,184,122,.45)',transition:'color .3s'}}>thekollectiveworldwide@gmail.com</a>
        </div>
      </div>
    </section>

    {/* ═══ 10. FOOTER — magic5 rich 4-column ═══ */}
    <footer style={{background:'var(--bg)',padding:'64px var(--g) 40px',borderTop:'1px solid rgba(245,241,234,.04)'}}>
      <div style={{maxWidth:'var(--mx)',margin:'0 auto'}}>
        {/* 4 columns */}
        <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr 1.2fr',gap:'clamp(24px,4vw,64px)',marginBottom:48}} className="g4">
          <div>
            <Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{height:28,width:'auto',opacity:.7,marginBottom:20}}/>
            <p style={{fontSize:'clamp(13px,1vw,15px)',color:'var(--t3)',lineHeight:1.8,maxWidth:280}}>A founder-led multi-brand ecosystem spanning hospitality, events, culture, products, and technology across 8 cities.</p>
          </div>
          <div className="ft-col">
            <h4>Navigate</h4>
            <a href="#portfolio">Portfolio</a>
            <a href="#principles">Principles</a>
            <a href="#brands">Brands</a>
            <a href="#pipeline">Pipeline</a>
            <a href="#connect">Contact</a>
          </div>
          <div className="ft-col">
            <h4>Ecosystem</h4>
            <a href="https://huglife.vercel.app" target="_blank" rel="noopener noreferrer">HugLife Events</a>
            <a href="https://forever-futbol.vercel.app" target="_blank" rel="noopener noreferrer">Forever Futbol</a>
            <a href="https://casper-group.vercel.app" target="_blank" rel="noopener noreferrer">Casper Group</a>
            <a href="https://good-times-app.vercel.app" target="_blank" rel="noopener noreferrer">Good Times</a>
            <a href="https://pronto-energy-website.vercel.app" target="_blank" rel="noopener noreferrer">Pronto Energy</a>
          </div>
          <div className="ft-col">
            <h4>Connect</h4>
            <a href="mailto:thekollectiveworldwide@gmail.com">thekollectiveworldwide@gmail.com</a>
            <a href="https://instagram.com/thekollectiveworldwide" target="_blank" rel="noopener noreferrer">Instagram</a>
            <p style={{fontSize:'clamp(12px,.9vw,14px)',color:'var(--t4)',marginTop:8}}>Atlanta, GA · Houston, TX · Miami, FL<br/>Los Angeles, CA · Dallas, TX · Washington D.C.<br/>Charlotte, NC · New York, NY</p>
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{borderTop:'1px solid rgba(245,241,234,.04)',paddingTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
          <span className="mono" style={{fontSize:9,letterSpacing:'.15em',color:'var(--t4)'}}>© 2026 Dr. Dorsey · The Kollective Hospitality Group · All Rights Reserved</span>
          <div style={{display:'flex',gap:24}}>
            {['Instagram','TikTok','LinkedIn'].map(s=>(<a key={s} href={s==='Instagram'?'https://instagram.com/thekollectiveworldwide':'#'} target="_blank" rel="noopener noreferrer" className="mono" style={{fontSize:9,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t4)',transition:'color .3s'}}>{s}</a>))}
          </div>
        </div>
      </div>
    </footer>
  </>);
}
