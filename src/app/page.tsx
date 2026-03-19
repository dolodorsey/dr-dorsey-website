'use client';
import { useEffect, useRef, useState } from 'react';
import { brands, statusColors, casperBrands, dorseyAssets, eventShowcase, productShots, type BrandStatus } from './data/brands';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';

/* ═══ DATA ═══ */
const PARTNERS = [
  { n:'HugLife', logo:`${SB}/huglife_events/00-brand-assets/logos/huglife-logo-buddha-black.png` },
  { n:'Forever Futbol', logo:`${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png` },
  { n:'NOIR', logo:`${SB}/noir_event/01_logos/NOIR_LOGO.png` },
  { n:'REMIX', logo:`${SB}/remix_event/01_logos/REMIX_LOGO.png` },
  { n:'Taste of Art', logo:`${SB}/taste_of_art/01_logos/TASTE_OF_ART_LOGO.png` },
  { n:'Gangsta Gospel', logo:`${SB}/gangsta_gospel/01_logos/GANGSTA_GOSPEL_LOGO.png` },
  { n:'WRST BHVR', logo:`${SB}/wrst_bhvr_event/03_event_flyers/WRST_generic_logo.png` },
  { n:'Pronto Energy', logo:`${SB}/pronto_energy/logos/pronto-logo.png` },
  { n:'Good Times', logo:`${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png` },
  { n:'Casper Group', logo:`${SB}/casper_group/logos/casper-white.png` },
];

const DIVS = [
  { num:'01', name:'Events',
    hl:'15+ event brands.\nOne engine.',
    body:'HugLife Events curates nightlife, cultural, and entertainment experiences across Atlanta, Houston, Miami, Dallas, and beyond.',
    tags:['NOIR','Taste of Art','REMIX','Gangsta Gospel','WRST BHVR','The Kulture','Soul Sessions','Underground King','Cravings'],
    img:`${SB}/noir_event/03_event_flyers/NOIR_NEWS.png` },
  { num:'02', name:'Food & Culture',
    hl:'Spaces that feed\nand inspire.',
    body:'Casper Group operates multi-concept food & beverage ventures across 15 cities. Forever Futbol is an immersive museum destination.',
    tags:['Casper Group','Forever Futbol','Living Legends','Bodegea'],
    img:`${SB}/casper_group/logos/casper-white.png` },
  { num:'03', name:'Products & Tech',
    hl:'Physical. Digital.\nBoth.',
    body:'Infinity Water and Pronto Energy lead consumer products. The tech stack — Good Times, Rule Radar, Mind Studio — all built in-house.',
    tags:['Infinity Water','Pronto Energy','Good Times','Rule Radar','Mind Studio'],
    img:`${SB}/pronto-energy/product-shots/all-flavors-lineup.png` },
  { num:'04', name:'Services',
    hl:'Already in motion.',
    body:'Umbrella Group manages services. The pipeline includes education tech, wellness expansion, and new city market entries.',
    tags:['Umbrella Group','Mind Studio','NYC Expansion','Living Legends'],
    img:null },
];

const STATS = [
  { n:57, s:'+', l:'Ventures' },
  { n:8, s:'', l:'Cities' },
  { n:15, s:'+', l:'Event Brands' },
  { n:198, s:'', l:'AI Agents' },
  { n:34, s:'', l:'Departments' },
];

const PIPE = [
  { st:'Live', nm:'Good Times', d:'837 venues across 10 cities. The nightlife concierge.', c:['ATL','HOU','MIA','DAL','NYC','LA'], img:`${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png` },
  { st:'Live', nm:'Mind Studio', d:'3-entity MSO. Telemed + wellness portals.', c:['ATL','Digital'], img:null },
  { st:'Building', nm:'Rule Radar', d:'Legal intelligence across jurisdictions.', c:['Multi-State'], img:null },
  { st:'Building', nm:'UTube University', d:'Digital education platform.', c:['Digital'], img:null },
  { st:'Expanding', nm:'City Markets', d:'New York, Phoenix, Scottsdale.', c:['NY','PHX','SCO'], img:null },
  { st:'Incubating', nm:'Living Legends', d:'Cultural destination celebrating legacy.', c:['TBD'], img:null },
];

const NAV = [['#about','About'],['#divisions','Divisions'],['#brands','Brands'],['#pipeline','Pipeline'],['#connect','Connect']];

function Img({src,alt,style}:{src:string;alt:string;style?:React.CSSProperties}) {
  const [e,se]=useState(false);
  if(e||!src)return null;
  return <img src={src} alt={alt} style={style} onError={()=>se(true)} loading="lazy"/>;
}

function useCounter(target:number,dur=1400){
  const [v,sv]=useState(0);const [go,sg]=useState(false);const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){sg(true);io.disconnect();}},{threshold:.4});if(ref.current)io.observe(ref.current);return()=>io.disconnect();},[]);
  useEffect(()=>{if(!go)return;let s=0;const f=(t:number)=>{if(!s)s=t;const p=Math.min((t-s)/dur,1);sv(Math.round(p*target));if(p<1)requestAnimationFrame(f);};requestAnimationFrame(f);},[go,target,dur]);
  return{v,ref};
}

export default function Home(){
  const [filter,setF]=useState<BrandStatus|'all'>('all');
  const [qi,setQi]=useState(0);
  const [navS,setNS]=useState(false);
  const [mob,setMob]=useState(false);
  const [vR,setVR]=useState(false);
  const [divIdx,setDivIdx]=useState(0);
  const dRef=useRef<HTMLDivElement>(null);
  const rRef=useRef<HTMLDivElement>(null);
  const fb=filter==='all'?brands:brands.filter(b=>b.status===filter);

  useEffect(()=>{const t=setInterval(()=>setQi(i=>(i+1)%dorseyAssets.quotes.length),4500);return()=>clearInterval(t);},[]);

  useEffect(()=>{
    let mx=0,my=0,cx=0,cy=0;
    const om=(e:MouseEvent)=>{mx=e.clientX;my=e.clientY;if(dRef.current){dRef.current.style.left=mx+'px';dRef.current.style.top=my+'px';}};
    const af=()=>{cx+=(mx-cx)*.08;cy+=(my-cy)*.08;if(rRef.current){rRef.current.style.left=cx+'px';rRef.current.style.top=cy+'px';}requestAnimationFrame(af);};
    document.addEventListener('mousemove',om);af();
    const os=()=>{const p=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;const el=document.getElementById('sp');if(el)el.style.width=p+'%';setNS(window.scrollY>50);};
    window.addEventListener('scroll',os,{passive:true});
    const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});},{threshold:.05,rootMargin:'0px 0px -40px 0px'});
    setTimeout(()=>document.querySelectorAll('.rv,.stg').forEach(el=>io.observe(el)),100);
    return()=>{document.removeEventListener('mousemove',om);window.removeEventListener('scroll',os);io.disconnect();};
  },[]);

  const navTo=(h:string)=>{setMob(false);setTimeout(()=>{document.querySelector(h)?.scrollIntoView({behavior:'smooth'});},200);};

  return(<>
    <div id="cd" ref={dRef}/><div id="cr" ref={rRef}/><div id="sp"/>

    {/* MOBILE NAV */}
    <div className={`mn ${mob?'on':''}`}>
      {NAV.map(([h,l])=><a key={l} onClick={()=>navTo(h)}>{l}</a>)}
    </div>

    {/* NAV — floating pill like magic5 */}
    <nav className="nv">
      <div className="nv-in">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{height:22,width:'auto',opacity:.85}}/>
          <span className="mono mh" style={{fontSize:'clamp(9px,.75vw,11px)',letterSpacing:'.4em',textTransform:'uppercase',color:'var(--text3)',fontWeight:400}}>Dr. Dorsey</span>
        </div>
        <div className="ndsk" style={{display:'flex',gap:36}}>
          {NAV.map(([h,l])=><a key={l} href={h} className="nl">{l}</a>)}
        </div>
        <div className="ndsk">
          <a href="#connect" className="cta" style={{padding:'10px 28px',fontSize:'clamp(9px,.7vw,11px)'}}>Contact</a>
        </div>
        <div className={`mbtn ${mob?'on':''}`} onClick={()=>setMob(!mob)}><span/><span/><span/></div>
      </div>
    </nav>

    {/* ═══ HERO — magic5 style: big centered video + bold type ═══ */}
    <section style={{background:'var(--bg)',paddingTop:120,paddingBottom:0,position:'relative',overflow:'hidden'}}>
      <div style={{maxWidth:'var(--max)',margin:'0 auto',padding:'0 var(--g)',textAlign:'center'}}>
        {/* Pre-headline */}
        <div style={{opacity:0,animation:'fadeR .7s .1s var(--ease) forwards',display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:24}}>
          <Img src={dorseyAssets.kollectiveGoldWhite} alt="" style={{height:20,width:'auto',opacity:.6}}/>
          <span className="mono" style={{fontSize:'clamp(9px,.75vw,11px)',letterSpacing:'.4em',textTransform:'uppercase',color:'var(--text3)'}}>The Kollective Hospitality Group</span>
        </div>

        {/* BOLD headline — not thin */}
        <h1 style={{fontSize:'clamp(48px,9vw,130px)',fontWeight:700,lineHeight:.9,letterSpacing:'-.03em',marginBottom:28,opacity:0,animation:'heroIn 1s .05s var(--ease) forwards'}}>
          The Architecture<br/>of a Modern <em>Empire</em>
        </h1>
        <p style={{fontSize:'clamp(16px,1.3vw,20px)',color:'var(--text2)',maxWidth:560,margin:'0 auto 36px',lineHeight:1.7,opacity:0,animation:'fadeU .8s .3s var(--ease) forwards'}}>
          A founder-led ecosystem — hospitality, events, food & beverage, museums, products, and technology across 8 cities and 57+ ventures.
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',opacity:0,animation:'fadeU .8s .45s var(--ease) forwards',flexWrap:'wrap'}}>
          <a href="#about" className="cta">Explore the Ecosystem</a>
          <a href="#brands" className="cta-ghost">View All Brands</a>
        </div>
      </div>

      {/* BIG ROUNDED VIDEO — magic5 signature */}
      <div style={{maxWidth:1100,margin:'60px auto 0',padding:'0 var(--g)',position:'relative'}}>
        <div style={{position:'relative',borderRadius:'var(--r-xl)',overflow:'hidden',aspectRatio:'16/9',background:'var(--bg2)',border:'1px solid rgba(245,241,234,.04)'}}>
          <video autoPlay muted loop playsInline onLoadedData={()=>setVR(true)} style={{width:'100%',height:'100%',objectFit:'cover',opacity:vR?.85:0,transition:'opacity 1.5s var(--ease)'}}>
            <source src="/videos/hero-animation.mp4" type="video/mp4"/>
          </video>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,var(--bg) 0%,transparent 30%)',pointerEvents:'none'}}/>
        </div>
        {/* Floating scroll indicator */}
        <div style={{position:'absolute',bottom:-20,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:6,zIndex:5}}>
          <div style={{width:1,height:32,background:'rgba(212,184,122,.3)',animation:'scl 2.5s ease-in-out infinite'}}/>
        </div>
      </div>
    </section>

    {/* PARTNER LOGO STRIP — like magic5 */}
    <section style={{background:'var(--bg)',padding:'56px 0',overflow:'hidden',borderBottom:'1px solid rgba(245,241,234,.04)'}}>
      <div className="ps">
        {[...PARTNERS,...PARTNERS,...PARTNERS].map((p,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'0 40px',flexShrink:0,height:48}}>
            <Img src={p.logo} alt={p.n} style={{height:36,width:'auto',opacity:.35,filter:'brightness(1.5) contrast(.8)',objectFit:'contain',transition:'opacity .3s'}}/>
          </div>
        ))}
      </div>
    </section>

    {/* ═══ ABOUT / FOUNDER ═══ */}
    <section id="about" style={{background:'var(--bg2)',padding:'var(--pad) var(--g)',position:'relative',overflow:'hidden'}}>
      <div style={{maxWidth:'var(--max)',margin:'0 auto'}}>
        <div className="rv" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'clamp(40px,6vw,100px)',alignItems:'center'}} >
          <div>
            <span className="mono" style={{fontSize:'clamp(10px,.8vw,12px)',letterSpacing:'.3em',textTransform:'uppercase',color:'var(--gold)',display:'block',marginBottom:16,fontWeight:500}}>001 — The Founder</span>
            <h2 style={{fontSize:'clamp(36px,5vw,72px)',marginBottom:28}}>
              Not building brands.<br/>Building <em>infrastructure.</em>
            </h2>
            <p style={{fontSize:'clamp(15px,1.2vw,18px)',color:'var(--text2)',lineHeight:1.9,marginBottom:32,maxWidth:480}}>
              Every venture is a node in a larger system. Events generate attention. Food & beverage create physical space. Products extend reach. Technology automates at scale. Each division feeds the others — the whole compounds.
            </p>
            <p style={{fontSize:'clamp(13px,1vw,15px)',color:'var(--text3)',lineHeight:1.8,maxWidth:480}}>
              Engineered by a single founder with a systems-first philosophy, powered by 198 AI agents across 34 departments, expanding into 8+ cities simultaneously.
            </p>
          </div>
          {/* Quote rotator in rounded card */}
          <div className="mh" style={{position:'relative'}}>
            <div className="card" style={{aspectRatio:'1',overflow:'hidden',borderRadius:'var(--r-lg)'}}>
              {dorseyAssets.quotes.map((q,i)=>(
                <Img key={i} src={q} alt="Quote" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:qi===i?1:0,transition:'opacity 1s ease',filter:'brightness(.9)'}}/>
              ))}
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,var(--bg2) 0%,transparent 35%)'}}/>
            </div>
            <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:14}}>
              {dorseyAssets.quotes.map((_,i)=>(
                <div key={i} onClick={()=>setQi(i)} style={{width:qi===i?24:8,height:8,borderRadius:4,background:qi===i?'var(--gold)':'rgba(212,184,122,.12)',transition:'all .4s var(--ease)',cursor:'pointer'}}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══ STATS — bold counters ═══ */}
    <section style={{background:'var(--bg)',padding:'72px var(--g)'}}>
      <div style={{maxWidth:'var(--max)',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8}} className="g4 stg">
        {STATS.map(s=>{const{v,ref}=useCounter(s.n);return(
          <div key={s.l} ref={ref} className="card" style={{textAlign:'center',padding:'clamp(24px,3vw,40px) 16px'}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(40px,5vw,72px)',fontWeight:700,color:'var(--gold)',lineHeight:1}}>{v}{s.s}</div>
            <div className="mono" style={{fontSize:'clamp(9px,.75vw,11px)',letterSpacing:'.3em',textTransform:'uppercase',color:'var(--text3)',marginTop:10}}>{s.l}</div>
          </div>
        );})}
      </div>
    </section>

    {/* ═══ DIVISIONS — numbered tabs like magic5 principles ═══ */}
    <section id="divisions" style={{background:'var(--bg2)',padding:'var(--pad) var(--g)',position:'relative'}}>
      <div style={{maxWidth:'var(--max)',margin:'0 auto'}}>
        <div className="rv" style={{textAlign:'center',marginBottom:64}}>
          <span className="mono" style={{fontSize:'clamp(10px,.8vw,12px)',letterSpacing:'.3em',textTransform:'uppercase',color:'var(--gold)',display:'block',marginBottom:14,fontWeight:500}}>002 — Divisions</span>
          <h2 style={{fontSize:'clamp(36px,5.5vw,76px)'}}>Four divisions.<br/>One <em>ecosystem.</em></h2>
        </div>

        {/* Numbered tabs */}
        <div className="rv" style={{display:'flex',gap:8,justifyContent:'center',marginBottom:48}}>
          {DIVS.map((d,i)=>(
            <button key={d.num} onClick={()=>setDivIdx(i)} style={{
              padding:'14px 28px',background:divIdx===i?'rgba(212,184,122,.1)':'transparent',
              border:`1.5px solid ${divIdx===i?'var(--gold)':'rgba(245,241,234,.06)'}`,
              borderRadius:60,color:divIdx===i?'var(--gold)':'var(--text3)',
              fontFamily:"'Space Grotesk',sans-serif",fontSize:'clamp(11px,.85vw,13px)',fontWeight:600,
              letterSpacing:'.1em',textTransform:'uppercase',transition:'all .3s var(--ease)',
            }}>
              <span className="mono" style={{marginRight:8,opacity:.5}}>{d.num}</span>{d.name}
            </button>
          ))}
        </div>

        {/* Active division content */}
        <div className="card" style={{padding:'clamp(32px,4vw,64px)',borderRadius:'var(--r-lg)',position:'relative',overflow:'hidden',minHeight:300}}>
          {DIVS[divIdx].img && <div style={{position:'absolute',inset:0,opacity:.06,filter:'brightness(.2)',backgroundImage:`url(${DIVS[divIdx].img})`,backgroundSize:'cover',backgroundPosition:'center',pointerEvents:'none'}}/>}
          <div style={{position:'relative',zIndex:2,display:'grid',gridTemplateColumns:'1fr 1fr',gap:'clamp(32px,4vw,64px)',alignItems:'center'}} className="g2">
            <div>
              <div className="mono" style={{fontSize:'clamp(10px,.8vw,12px)',letterSpacing:'.3em',color:'var(--gold)',marginBottom:16}}>{DIVS[divIdx].num} — {DIVS[divIdx].name}</div>
              <h3 style={{fontSize:'clamp(32px,4vw,56px)',whiteSpace:'pre-line',marginBottom:20}}>{DIVS[divIdx].hl}</h3>
              <p style={{fontSize:'clamp(14px,1.1vw,17px)',color:'var(--text2)',lineHeight:1.8,marginBottom:28}}>{DIVS[divIdx].body}</p>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {DIVS[divIdx].tags.map(t=><span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="mh" style={{display:'flex',justifyContent:'center'}}>
              {/* Division visual — event logos or product shots */}
              {DIVS[divIdx].num==='03' ? (
                <div style={{display:'flex',gap:6,alignItems:'flex-end'}}>
                  {productShots.pronto.slice(0,5).map((s,i)=>(
                    <div key={i} style={{flex:1,animation:`float ${3+i*.3}s ease-in-out infinite`,animationDelay:`${i*.25}s`,maxWidth:60}}>
                      <Img src={s} alt="" style={{width:'100%',filter:'drop-shadow(0 8px 24px rgba(0,0,0,.6))'}}/>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,maxWidth:320}}>
                  {eventShowcase.filter(e=>e.logo).slice(0,6).map(e=>(
                    <div key={e.brand} className="card" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8,padding:'16px 8px'}}>
                      <div style={{width:44,height:44,display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <Img src={e.logo!} alt={e.brand} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain',opacity:.8}}/>
                      </div>
                      <div className="mono" style={{fontSize:'8px',letterSpacing:'.1em',textTransform:'uppercase',color:'var(--text3)',textAlign:'center'}}>{e.brand}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══ BRANDS — grid of rounded cards ═══ */}
    <section id="brands" style={{background:'var(--bg)',padding:'var(--pad) var(--g)'}}>
      <div style={{maxWidth:'var(--max)',margin:'0 auto'}}>
        <div className="rv" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:48,flexWrap:'wrap',gap:20}}>
          <div>
            <span className="mono" style={{fontSize:'clamp(10px,.8vw,12px)',letterSpacing:'.3em',textTransform:'uppercase',color:'var(--gold)',display:'block',marginBottom:14,fontWeight:500}}>003 — Brand Universe</span>
            <h2 style={{fontSize:'clamp(36px,5vw,72px)'}}>Every brand. One <em>ecosystem.</em></h2>
          </div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            {(['all','flagship','active','seasonal','dev','legacy'] as const).map(f=>(
              <button key={f} onClick={()=>setF(f)} style={{
                padding:'8px 18px',background:filter===f?'rgba(212,184,122,.08)':'transparent',
                border:`1px solid ${filter===f?'rgba(212,184,122,.3)':'rgba(245,241,234,.06)'}`,
                color:filter===f?'var(--gold)':'var(--text3)',borderRadius:60,
                fontFamily:"'Space Grotesk',sans-serif",fontSize:'clamp(10px,.8vw,12px)',fontWeight:500,
                letterSpacing:'.12em',textTransform:'uppercase',transition:'all .3s',
              }}>{f}</button>
            ))}
          </div>
        </div>
        <div className="rv stg" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}} className="g4 stg">
          {fb.map(b=>(
            <div key={b.name} className={`${b.featured?'fcard':'card'}`} style={{padding:'24px',cursor:b.website?'pointer':'default',transition:'all .4s var(--ease)'}} onClick={()=>b.website&&window.open(b.website,'_blank')}>
              {b.logo && (
                <div style={{marginBottom:16,height:64,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(245,241,234,.02)',borderRadius:'var(--r)',padding:12}}>
                  <Img src={b.logo} alt={b.name} style={{maxWidth:'55%',maxHeight:'100%',objectFit:'contain',opacity:.85}}/>
                </div>
              )}
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
                <div>
                  <div style={{fontSize:'clamp(13px,1vw,15px)',fontWeight:500,color:'var(--text)'}}>{b.name}</div>
                  <div className="mono" style={{fontSize:'clamp(9px,.7vw,10px)',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--text4)',marginTop:3}}>{b.division}</div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <div style={{width:7,height:7,borderRadius:'50%',background:statusColors[b.status]}}/>
                  {b.website&&<span style={{fontSize:14,color:'var(--text4)'}}>→</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ PIPELINE ═══ */}
    <section id="pipeline" style={{background:'var(--bg3)',padding:'var(--pad) var(--g)'}}>
      <div style={{maxWidth:'var(--max)',margin:'0 auto'}}>
        <div className="rv" style={{textAlign:'center',marginBottom:56}}>
          <span className="mono" style={{fontSize:'clamp(10px,.8vw,12px)',letterSpacing:'.3em',textTransform:'uppercase',color:'var(--gold)',display:'block',marginBottom:14,fontWeight:500}}>004 — Pipeline</span>
          <h2 style={{fontSize:'clamp(36px,5.5vw,76px)'}}>The next chapter is<br/><em>already</em> in motion.</h2>
        </div>
        <div className="stg" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}} >
          {PIPE.map(p=>(
            <div key={p.nm} className={p.st==='Live'?'fcard':'card'} style={{padding:'clamp(24px,3vw,40px)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                <span className="mono" style={{fontSize:'clamp(10px,.8vw,12px)',letterSpacing:'.25em',textTransform:'uppercase',fontWeight:500,color:p.st==='Live'?'#6fb86f':'var(--text3)'}}>{p.st}</span>
                <div style={{width:8,height:8,borderRadius:'50%',background:p.st==='Live'?'#6fb86f':'rgba(212,184,122,.2)',animation:p.st==='Live'?'pulse 3s ease infinite':'none'}}/>
              </div>
              <h3 style={{fontSize:'clamp(22px,2.5vw,36px)',marginBottom:12}}>{p.nm}</h3>
              <p style={{fontSize:'clamp(13px,1vw,15px)',color:'var(--text2)',lineHeight:1.7,marginBottom:24}}>{p.d}</p>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {p.c.map(c=><span key={c} className="tag">{c}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ CONTACT — rich section like magic5 ═══ */}
    <section id="connect" style={{background:'var(--bg)',padding:'var(--pad) var(--g)',position:'relative',overflow:'hidden'}}>
      {/* Ambient glow */}
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:700,height:700,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(212,184,122,.05) 0%,transparent 60%)',pointerEvents:'none'}}/>
      <div style={{maxWidth:800,margin:'0 auto',textAlign:'center',position:'relative',zIndex:2}}>
        <div className="rv">
          <span className="mono" style={{fontSize:'clamp(10px,.8vw,12px)',letterSpacing:'.3em',textTransform:'uppercase',color:'var(--gold)',display:'block',marginBottom:14,fontWeight:500}}>005 — Connect</span>
          <h2 style={{fontSize:'clamp(44px,7vw,100px)',marginBottom:28}}>{"Let's"} <em>build</em><br/>together.</h2>
          <p style={{fontSize:'clamp(15px,1.2vw,18px)',color:'var(--text2)',lineHeight:1.8,marginBottom:40,maxWidth:500,margin:'0 auto 40px'}}>
            Partnership, sponsorship, investment, media — the ecosystem is built for collaboration.
          </p>
        </div>
        <div className="rv" style={{display:'flex',gap:12,justifyContent:'center',marginBottom:56,flexWrap:'wrap'}}>
          <a href="mailto:thekollectiveworldwide@gmail.com?subject=Partnership%20—%20KHG" className="cta">Start a Conversation</a>
          <a href="https://instagram.com/thekollectiveworldwide" target="_blank" rel="noopener noreferrer" className="cta-ghost">Instagram</a>
        </div>
        <div className="rv" style={{display:'flex',gap:0,justifyContent:'center',flexWrap:'wrap'}}>
          {['Sponsorship','Venue','Investment','Media','Collab'].map((l,i,a)=>(
            <a key={l} href={`mailto:thekollectiveworldwide@gmail.com?subject=${encodeURIComponent(l+' — KHG')}`} className="mono" style={{padding:'14px 24px',borderTop:'1px solid rgba(245,241,234,.06)',borderBottom:'1px solid rgba(245,241,234,.06)',borderLeft:'1px solid rgba(245,241,234,.06)',borderRight:i===a.length-1?'1px solid rgba(245,241,234,.06)':'none',color:'var(--text3)',fontSize:'clamp(9px,.75vw,11px)',letterSpacing:'.2em',textTransform:'uppercase',transition:'all .3s',borderRadius:i===0?'60px 0 0 60px':i===a.length-1?'0 60px 60px 0':'0'}}>
              {l}
            </a>
          ))}
        </div>
        <div className="rv" style={{marginTop:48}}>
          <a href="mailto:thekollectiveworldwide@gmail.com" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(18px,2.5vw,32px)',fontWeight:500,color:'rgba(212,184,122,.5)',transition:'color .3s'}}>thekollectiveworldwide@gmail.com</a>
        </div>
      </div>
    </section>

    {/* FOOTER */}
    <footer style={{padding:'44px var(--g)',borderTop:'1px solid rgba(245,241,234,.04)',background:'var(--bg)'}}>
      <div style={{maxWidth:'var(--max)',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:20}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Img src={dorseyAssets.kollectiveGoldWhite} alt="" style={{height:18,width:'auto',opacity:.3}}/>
          <span className="mono" style={{fontSize:'clamp(9px,.7vw,10px)',letterSpacing:'.35em',textTransform:'uppercase',color:'var(--text4)'}}>The Kollective Hospitality Group</span>
        </div>
        <div style={{display:'flex',gap:32}}>
          {[['Instagram','https://instagram.com/thekollectiveworldwide'],['HugLife','https://huglife.vercel.app'],['Good Times','https://good-times-app.vercel.app']].map(([l,u])=>(
            <a key={l} href={u} target="_blank" rel="noopener noreferrer" className="mono" style={{fontSize:'clamp(9px,.7vw,10px)',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--text4)',transition:'color .3s'}}>{l}</a>
          ))}
        </div>
        <span className="mono" style={{fontSize:'clamp(9px,.7vw,10px)',letterSpacing:'.1em',color:'rgba(245,241,234,.08)'}}>© 2026 Dr. Dorsey · Atlanta, GA</span>
      </div>
    </footer>
  </>);
}
