'use client';
import { useEffect, useRef, useState } from 'react';
import { brands, statusColors, casperBrands, dorseyAssets, eventShowcase, productShots, type BrandStatus } from './data/brands';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';

const MARQUEE = [
  'HugLife Events','Forever Futbol Museum','Casper Group','Good Times App',
  'Mind Studio','Infinity Water','Pronto Energy','NOIR','Taste of Art',
  'REMIX','Gangsta Gospel','WRST BHVR','The Kulture','Rule Radar',
  'Underground King','Soul Sessions','Cravings','Stella','ICONIC',
];

const DIVS = [
  { num:'01', name:'Events & Experiences',
    hl:'15+ event\nbrands.\nOne engine.',
    body:'HugLife Events curates nightlife, cultural, and entertainment experiences across Atlanta, Houston, Miami, Dallas, and beyond. Each brand carries its own identity, audience, and energy.',
    tags:['NOIR','Taste of Art','REMIX','Gangsta Gospel','WRST BHVR','The Kulture','Soul Sessions','Underground King','Cravings','Stella'],
    vis:'events', bg:`${SB}/noir_event/03_event_flyers/NOIR_NEWS.png` },
  { num:'02', name:'F&B & Culture',
    hl:'Spaces\nthat feed\nand inspire.',
    body:'Casper Group operates multi-concept food & beverage ventures across 15 cities. Forever Futbol is an immersive museum destination celebrating the beautiful game.',
    tags:['Casper Group','Forever Futbol','Living Legends','Bodegea'],
    vis:'food', bg:`${SB}/casper_group/logos/casper-white.png` },
  { num:'03', name:'Products & Technology',
    hl:'Physical.\nDigital.\nBoth.',
    body:'Infinity Water and Pronto Energy lead consumer products. The tech stack — Good Times, Rule Radar, Mind Studio — all built in-house with 198 AI agents.',
    tags:['Infinity Water','Pronto Energy','Good Times','Rule Radar','Mind Studio'],
    vis:'products', bg:`${SB}/pronto-energy/product-shots/all-flavors-lineup.png` },
  { num:'04', name:'Services & Pipeline',
    hl:'Already\nin motion.',
    body:'Umbrella Group manages services. The pipeline includes education tech, wellness expansion, political intelligence, and new city market entries.',
    tags:['Umbrella Group','Mind Studio','NYC Expansion','Living Legends'],
    vis:'future' },
];

const STATS = [
  { n:57, s:'+', l:'Active Entities' },
  { n:8, s:'', l:'Cities' },
  { n:15, s:'+', l:'Event Brands' },
  { n:198, s:'', l:'AI Agents' },
  { n:34, s:'', l:'Departments' },
];

const PIPE = [
  { st:'Active', nm:'Good Times App', d:'837 venues across 10 cities. The nightlife concierge.', c:['ATL','HOU','MIA','DAL','NYC','LA'] },
  { st:'Active', nm:'Mind Studio', d:'3-entity MSO. Telemed + wellness. Client, provider, BOH portals live.', c:['ATL','Digital'] },
  { st:'Building', nm:'Rule Radar', d:'Legal intelligence surfacing compliance across jurisdictions.', c:['Multi-State'] },
  { st:'Building', nm:'UTube University', d:'Digital education built around the KHG knowledge base.', c:['Digital'] },
  { st:'Expanding', nm:'City Markets', d:'Structured expansion — New York, Phoenix, Scottsdale.', c:['NY','PHX','SCO'] },
  { st:'Incubating', nm:'Living Legends', d:'Cultural destination celebrating legacy figures across sports, music, entertainment.', c:['TBD'] },
];

const PARTNERS = [
  { t:'Sponsorship', d:'Align with 50+ brands across 8 cities', ic:'◈' },
  { t:'Venue Partnership', d:'Activate your space through KHG programming', ic:'◇' },
  { t:'Investment', d:'Growth capital, licensing, co-development', ic:'△' },
  { t:'Media & Press', d:'Founder profile, media kit, editorial', ic:'▽' },
  { t:'Brand Collab', d:'Creative and experiential collaborations', ic:'○' },
  { t:'Distribution', d:'Retail + wholesale for product lines', ic:'□' },
];

const NAV = [['#founder','Founder'],['#divisions','Divisions'],['#showcase','Events'],['#brands','Brands'],['#pipeline','Pipeline'],['#connect','Connect']];

function Img({src,alt,style,className,onLoad}:{src:string;alt:string;style?:React.CSSProperties;className?:string;onLoad?:()=>void}) {
  const [e,setE]=useState(false);
  if(e||!src) return null;
  return <img src={src} alt={alt} style={style} className={className} onError={()=>setE(true)} onLoad={onLoad} loading="lazy" />;
}

function Sec({n,l}:{n:string;l:string}) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:20}}>
      <span className="mono" style={{fontSize:'var(--text-micro)',letterSpacing:'.3em',color:'rgba(200,169,110,.35)'}}>{n}</span>
      <span style={{width:36,height:1,background:'rgba(200,169,110,.18)',display:'block'}} />
      <span className="mono" style={{fontSize:'var(--text-micro)',letterSpacing:'.2em',textTransform:'uppercase',color:'rgba(200,169,110,.3)'}}>{l}</span>
    </div>
  );
}

/* ─── COUNTER HOOK ─── */
function useCounter(target:number, duration=1500) {
  const [val,setVal]=useState(0);
  const [started,setStarted]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setStarted(true);io.disconnect();}},{threshold:.5});
    if(ref.current) io.observe(ref.current);
    return ()=>io.disconnect();
  },[]);
  useEffect(()=>{
    if(!started) return;
    let start=0;const step=(ts:number)=>{
      if(!start) start=ts;
      const p=Math.min((ts-start)/duration,1);
      setVal(Math.round(p*target));
      if(p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },[started,target,duration]);
  return {val,ref};
}

export default function Home() {
  const [filter,setFilter]=useState<BrandStatus|'all'>('all');
  const [si,setSi]=useState(0);
  const [vReady,setVReady]=useState(false);
  const [qi,setQi]=useState(0);
  const [navS,setNavS]=useState(false);
  const [mob,setMob]=useState(false);
  const hsRef=useRef<HTMLDivElement>(null);
  const tkRef=useRef<HTMLDivElement>(null);
  const dotRef=useRef<HTMLDivElement>(null);
  const ringRef=useRef<HTMLDivElement>(null);
  const fb = filter==='all'?brands:brands.filter(b=>b.status===filter);

  useEffect(()=>{const t=setInterval(()=>setQi(i=>(i+1)%dorseyAssets.quotes.length),5000);return ()=>clearInterval(t);},[]);

  useEffect(()=>{
    let mx=0,my=0,cx=0,cy=0;
    const onM=(e:MouseEvent)=>{mx=e.clientX;my=e.clientY;if(dotRef.current){dotRef.current.style.left=mx+'px';dotRef.current.style.top=my+'px';}};
    const anim=()=>{cx+=(mx-cx)*.08;cy+=(my-cy)*.08;if(ringRef.current){ringRef.current.style.left=cx+'px';ringRef.current.style.top=cy+'px';}requestAnimationFrame(anim);};
    document.addEventListener('mousemove',onM);anim();

    const onS=()=>{
      const pct=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;
      const p=document.getElementById('sprog');if(p)p.style.width=pct+'%';
      setNavS(window.scrollY>60);
      const w=hsRef.current,t=tkRef.current;
      if(w&&t){const r=w.getBoundingClientRect(),wh=window.innerHeight;
        if(r.top<=0&&r.bottom>=wh){const s=-r.top,tot=w.offsetHeight-wh,p2=Math.min(1,Math.max(0,s/tot));
        t.style.transform=`translateX(-${p2*(DIVS.length-1)*100}vw)`;setSi(Math.round(p2*(DIVS.length-1)));}}
    };
    window.addEventListener('scroll',onS,{passive:true});

    const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});},{threshold:.06,rootMargin:'0px 0px -50px 0px'});
    setTimeout(()=>document.querySelectorAll('.rv,.stg').forEach(el=>io.observe(el)),100);

    const grow=()=>{if(dotRef.current){dotRef.current.style.width='12px';dotRef.current.style.height='12px';}if(ringRef.current){ringRef.current.style.width='60px';ringRef.current.style.height='60px';}};
    const shrink=()=>{if(dotRef.current){dotRef.current.style.width='6px';dotRef.current.style.height='6px';}if(ringRef.current){ringRef.current.style.width='44px';ringRef.current.style.height='44px';}};
    setTimeout(()=>document.querySelectorAll('a,button,.iact,.cta,.gcard,.fcard').forEach(el=>{el.addEventListener('mouseenter',grow);el.addEventListener('mouseleave',shrink);}),300);

    return ()=>{document.removeEventListener('mousemove',onM);window.removeEventListener('scroll',onS);io.disconnect();};
  },[]);

  const navTo=(h:string)=>{setMob(false);setTimeout(()=>{const el=document.querySelector(h);if(el)el.scrollIntoView({behavior:'smooth'});},250);};

  /* SLIDE VIS */
  const SlideVis=({type}:{type:string})=>{
    if(type==='events') return (
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,width:'clamp(260px,26vw,400px)'}}>
        {eventShowcase.filter(e=>e.logo).slice(0,6).map(e=>(
          <div key={e.brand} className="gcard" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10,padding:'20px 10px'}}>
            <div style={{width:52,height:52,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Img src={e.logo!} alt={e.brand} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain',opacity:.85}} />
            </div>
            <div className="mono" style={{fontSize:'var(--text-micro)',letterSpacing:'.12em',textTransform:'uppercase',color:'rgba(200,169,110,.5)',textAlign:'center'}}>{e.brand}</div>
          </div>
        ))}
      </div>
    );
    if(type==='food') return (
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,width:'clamp(240px,24vw,360px)'}}>
        {casperBrands.slice(0,6).map(b=>(
          <div key={b.name} className="gcard iact" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10,padding:'20px 8px'}}>
            <div style={{width:48,height:48,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Img src={b.logo} alt={b.name} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain'}} />
            </div>
            <div className="mono" style={{fontSize:'var(--text-micro)',letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(200,169,110,.45)',textAlign:'center'}}>{b.name}</div>
          </div>
        ))}
      </div>
    );
    if(type==='products') return (
      <div style={{display:'flex',gap:8,width:'clamp(240px,24vw,380px)',alignItems:'flex-end'}}>
        {productShots.pronto.slice(0,5).map((s,i)=>(
          <div key={i} style={{flex:1,animation:`float ${3+i*.4}s ease-in-out infinite`,animationDelay:`${i*.3}s`}}>
            <Img src={s} alt={`Pronto ${i}`} style={{width:'100%',height:'auto',filter:'drop-shadow(0 12px 32px rgba(0,0,0,.7))'}} />
          </div>
        ))}
      </div>
    );
    return (
      <div style={{display:'flex',flexDirection:'column',gap:6,width:'clamp(200px,20vw,280px)'}}>
        {[{n:'34',l:'AI Departments'},{n:'6+',l:'Apps Building'},{n:'10+',l:'New Markets'}].map(s=>(
          <div key={s.l} className="gcard" style={{padding:'28px 32px'}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(32px,4vw,56px)',fontWeight:300,color:'var(--ivory)',lineHeight:1}}>{s.n}</div>
            <div className="mono" style={{fontSize:'var(--text-micro)',letterSpacing:'.3em',textTransform:'uppercase',color:'rgba(200,169,110,.4)',marginTop:6}}>{s.l}</div>
          </div>
        ))}
      </div>
    );
  };

  return (<>
    <div id="cdot" ref={dotRef}/><div id="cring" ref={ringRef}/><div id="sprog"/>

    {/* MOBILE NAV */}
    <div className={`mnav ${mob?'on':''}`}>
      {NAV.map(([h,l])=><a key={l} onClick={()=>navTo(h)}>{l}</a>)}
      <div style={{marginTop:28,display:'flex',gap:20}}>
        {[['Instagram','https://instagram.com/thekollectiveworldwide'],['HugLife','https://huglife.vercel.app'],['Good Times','https://good-times-app.vercel.app']].map(([l,u])=>(
          <a key={l} href={u} target="_blank" rel="noopener noreferrer" className="mono" style={{fontSize:'var(--text-micro)',letterSpacing:'.2em',textTransform:'uppercase',color:'rgba(200,169,110,.35)'}}>{l}</a>
        ))}
      </div>
    </div>

    {/* NAV */}
    <nav className={`nav-wrap ${navS?'nav-s':''}`}>
      <div className="nav-inner">
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{height:26,width:'auto',opacity:.85}} />
          <span className="mono mh" style={{fontSize:'var(--text-micro)',letterSpacing:'.5em',textTransform:'uppercase',color:'rgba(200,169,110,.5)'}}>Dr. Dorsey</span>
        </div>
        <div className="ndsk" style={{display:'flex',gap:44}}>
          {NAV.map(([h,l])=><a key={l} href={h} className="nlink">{l}</a>)}
        </div>
        <div className={`mbtn ${mob?'on':''}`} onClick={()=>setMob(!mob)}><span/><span/><span/></div>
      </div>
    </nav>

    {/* ═══ HERO ═══ */}
    <section style={{position:'relative',height:'100vh',minHeight:700,display:'flex',flexDirection:'column',justifyContent:'flex-end',overflow:'hidden',background:'var(--void)'}}>
      <video autoPlay muted loop playsInline onLoadedData={()=>setVReady(true)} className="hvid" style={{opacity:vReady?.55:0,transition:'opacity 2s var(--ease)',zIndex:1}}>
        <source src="/videos/hero-animation.mp4" type="video/mp4"/>
      </video>
      <div style={{position:'absolute',inset:0,zIndex:2,background:'radial-gradient(ellipse 70% 60% at 50% 45%,transparent 0%,rgba(3,3,3,.3) 55%,rgba(3,3,3,.85) 100%)'}}/>
      <div style={{position:'absolute',inset:0,zIndex:2,background:'linear-gradient(to top,var(--void) 0%,rgba(3,3,3,.5) 18%,transparent 45%)'}}/>
      
      {/* Orbit ring */}
      <div className="mh" style={{position:'absolute',top:'12%',right:'6%',width:'clamp(200px,30vw,500px)',height:'clamp(200px,30vw,500px)',border:'1px solid rgba(200,169,110,.04)',borderRadius:'50%',animation:'orbit 120s linear infinite',zIndex:3,pointerEvents:'none'}}>
        <div style={{position:'absolute',top:0,left:'50%',width:4,height:4,borderRadius:'50%',background:'rgba(200,169,110,.2)',transform:'translate(-50%,-50%)'}}/>
      </div>
      
      <div className="mh" style={{position:'absolute',top:'50%',right:'var(--gutter)',transform:'translateY(-50%)',fontFamily:"'DM Mono',monospace",fontSize:'var(--text-micro)',letterSpacing:'.15em',color:'rgba(200,169,110,.12)',writingMode:'vertical-rl',zIndex:4}}>THE KOLLECTIVE HOSPITALITY GROUP</div>

      {/* Scroll */}
      <div style={{position:'absolute',bottom:36,left:'50%',transform:'translateX(-50%)',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        <div style={{width:1,height:36,background:'rgba(200,169,110,.3)',animation:'scrollLine 2.5s ease-in-out infinite'}}/>
        <div className="mono" style={{fontSize:7,letterSpacing:'.5em',textTransform:'uppercase',color:'rgba(200,169,110,.18)'}}>Scroll</div>
      </div>

      {/* Content — FAST reveal, no 2s delay */}
      <div style={{position:'relative',zIndex:10,padding:'0 var(--gutter) 80px',maxWidth:800}}>
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:20,opacity:0,animation:'fadeR .8s .4s var(--ease) forwards'}}>
          <div style={{width:36,height:1,background:'var(--gold)',opacity:.4}}/>
          <span className="mono" style={{fontSize:'var(--text-label)',letterSpacing:'.35em',textTransform:'uppercase',color:'rgba(200,169,110,.5)'}}>Founded by Dr. Dorsey</span>
        </div>
        <h1 className="h-empire" style={{fontSize:'var(--text-display)',opacity:0,animation:'heroIn 1.2s .2s var(--ease) forwards'}}>
          The Architecture<br/>of a Modern<br/><em>Empire</em>
        </h1>
        <p style={{fontSize:'var(--text-body-lg)',color:'var(--muted)',maxWidth:500,marginTop:28,lineHeight:1.9,opacity:0,animation:'fadeU .8s .6s var(--ease) forwards'}}>
          A founder-led ecosystem across hospitality, events, food & beverage, museums, products, and technology — 8 cities, 57+ ventures.
        </p>
        <div style={{display:'flex',gap:14,marginTop:32,opacity:0,animation:'fadeU .8s .8s var(--ease) forwards',flexWrap:'wrap'}}>
          <a href="#founder" className="cta"><span>Enter the Ecosystem</span></a>
          <a href="#brands" style={{display:'inline-flex',alignItems:'center',gap:10,padding:'16px 28px',color:'rgba(242,237,227,.35)',fontFamily:"'DM Mono',monospace",fontSize:'var(--text-micro)',letterSpacing:'.3em',textTransform:'uppercase',transition:'color .3s'}}>View Brands →</a>
        </div>
      </div>
    </section>

    {/* MARQUEE */}
    <div style={{background:'var(--deep)',borderTop:'1px solid rgba(200,169,110,.04)',borderBottom:'1px solid rgba(200,169,110,.04)',padding:'16px 0',overflow:'hidden'}}>
      <div className="mqt">
        {[...MARQUEE,...MARQUEE].map((m,i)=>(
          <span key={i} className="mono" style={{fontSize:'var(--text-micro)',letterSpacing:'.3em',textTransform:'uppercase',color:'rgba(200,169,110,.18)',padding:'0 28px',whiteSpace:'nowrap'}}>
            {m}<span style={{margin:'0 28px',color:'rgba(200,169,110,.07)'}}>·</span>
          </span>
        ))}
      </div>
    </div>

    {/* ═══ FOUNDER — dark bg ═══ */}
    <section id="founder" style={{background:'var(--void)',padding:'var(--pad) var(--gutter)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,opacity:.05,filter:'brightness(.2) saturate(.3)',backgroundImage:`url(${dorseyAssets.quotes[0]})`,backgroundSize:'cover',backgroundPosition:'center',pointerEvents:'none'}}/>
      <div style={{maxWidth:'var(--max)',margin:'0 auto',display:'grid',gridTemplateColumns:'1.1fr 1fr',gap:'clamp(48px,7vw,120px)',alignItems:'start'}} className="g2">
        <div>
          <div className="rv">
            <Sec n="001" l="The Founder"/>
            <h2 className="h-empire" style={{fontSize:'var(--text-section)'}}>
              Not building<br/>brands. Building<br/><em>infrastructure.</em>
            </h2>
          </div>
          <div className="rv" style={{marginTop:40}}>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'var(--text-body-lg)',color:'var(--muted)',lineHeight:2,maxWidth:500,fontWeight:400}}>
              Every venture is a node in a larger system. Events generate attention. Food & beverage create physical space. Products extend reach. Technology automates at scale. Museums preserve culture. Each division feeds the others — the whole compounds.
            </p>
          </div>
          <div className="rv" style={{marginTop:32}}>
            <p style={{fontSize:'var(--text-caption)',color:'var(--dim)',lineHeight:2,maxWidth:500}}>
              The Kollective Hospitality Group is a machine — engineered by a single founder with a systems-first philosophy, powered by 198 AI agents across 34 departments, expanding into 8+ cities simultaneously.
            </p>
          </div>
        </div>
        {/* Quote rotator */}
        <div className="rv mh" style={{position:'relative',paddingTop:32}}>
          <div className="gcard" style={{position:'relative',width:'100%',aspectRatio:'1',overflow:'hidden',borderRadius:14}}>
            {dorseyAssets.quotes.map((q,i)=>(
              <Img key={i} src={q} alt="Quote" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:qi===i?1:0,transition:'opacity 1.2s ease',filter:'brightness(.9) contrast(1.1)'}} />
            ))}
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,var(--void) 0%,transparent 40%)'}}/>
          </div>
          <div style={{display:'flex',gap:10,justifyContent:'center',marginTop:16}}>
            {dorseyAssets.quotes.map((_,i)=>(
              <div key={i} onClick={()=>setQi(i)} style={{width:qi===i?28:6,height:6,borderRadius:3,background:qi===i?'var(--gold)':'rgba(200,169,110,.12)',transition:'all .4s var(--ease)',cursor:'pointer'}}/>
            ))}
          </div>
        </div>
      </div>

      {/* PILLARS — with visible gaps */}
      <div className="rv stg" style={{maxWidth:'var(--max)',margin:'80px auto 0',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}} >
        {[
          {n:'01',t:'Vision',d:'Long-view thinking — building for a decade, not a quarter.'},
          {n:'02',t:'Culture',d:'Brands rooted in authentic experience and community identity.'},
          {n:'03',t:'Systems',d:'198 agents. 34 departments. Infrastructure that scales.'},
          {n:'04',t:'Ownership',d:'Physical, digital, and IP designed for long-term equity.'},
        ].map(p=>(
          <div key={p.n} className="gcard" style={{padding:'clamp(24px,3vw,44px)'}}>
            <div className="mono" style={{fontSize:'var(--text-micro)',color:'rgba(200,169,110,.3)',letterSpacing:'.3em',marginBottom:16}}>{p.n}</div>
            <h4 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'var(--text-sub)',fontWeight:300,color:'var(--ivory)',marginBottom:12}}>{p.t}</h4>
            <p style={{fontSize:'var(--text-caption)',color:'var(--dim)',lineHeight:1.8}}>{p.d}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ═══ STATS — contrasting background ═══ */}
    <section style={{background:'var(--coal)',padding:'72px var(--gutter)',position:'relative'}}>
      <div className="sdiv" style={{position:'absolute',top:0,left:0,right:0}}/>
      <div style={{maxWidth:'var(--max)',margin:'0 auto',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:20}}>
        {STATS.map(s=>{
          const {val,ref}=useCounter(s.n);
          return (
            <div key={s.l} ref={ref} style={{textAlign:'center',flex:'1 1 auto',padding:'16px 24px',position:'relative'}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(44px,6vw,80px)',fontWeight:300,color:'var(--gold)',lineHeight:1}}>{val}{s.s}</div>
              <div className="mono" style={{fontSize:'var(--text-micro)',letterSpacing:'.35em',textTransform:'uppercase',color:'var(--muted)',marginTop:10}}>{s.l}</div>
            </div>
          );
        })}
      </div>
      <div className="sdiv" style={{position:'absolute',bottom:0,left:0,right:0}}/>
    </section>

    {/* ═══ DIVISIONS (H-SCROLL) ═══ */}
    <div id="divisions" ref={hsRef} className="hscroll-wrap" style={{height:`${DIVS.length*100}vh`}}>
      <div style={{position:'sticky',top:0,height:'100vh',overflow:'hidden'}}>
        <div ref={tkRef} className="hscroll-track">
          {DIVS.map((d,idx)=>(
            <div key={d.num} className="hscroll-slide" style={{background:idx%2===0?'var(--void)':'var(--deep)'}}>
              {d.bg && <div style={{position:'absolute',inset:0,opacity:.06,filter:'brightness(.2)',backgroundImage:`url(${d.bg})`,backgroundSize:'cover',backgroundPosition:'center',pointerEvents:'none'}}/>}
              <div style={{maxWidth:'var(--max)',margin:'0 auto',width:'100%',display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:'clamp(48px,7vw,100px)',alignItems:'center',position:'relative',zIndex:2}}>
                <div>
                  <Sec n={d.num} l={d.name}/>
                  <h2 className="h-empire" style={{fontSize:'var(--text-section)',marginTop:12,whiteSpace:'pre-line'}}>{d.hl}</h2>
                  <p style={{fontSize:'var(--text-body)',color:'var(--muted)',lineHeight:2,maxWidth:460,marginTop:28}}>{d.body}</p>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:32}}>
                    {d.tags.map(t=><span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <div className="mh" style={{display:'flex',justifyContent:'center'}}>
                  <SlideVis type={d.vis}/>
                </div>
              </div>
              <div className="mh" style={{position:'absolute',right:'var(--gutter)',top:'50%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',gap:12}}>
                {DIVS.map((_,i)=>(<div key={i} style={{width:6,height:si===i?28:6,borderRadius:3,background:si===i?'var(--gold)':'rgba(200,169,110,.1)',transition:'all .4s var(--ease)'}}/>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ═══ EVENT SHOWCASE — elevated bg ═══ */}
    <section id="showcase" style={{background:'var(--ink)',padding:'var(--pad) var(--gutter)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,opacity:.04,filter:'brightness(.15)',backgroundImage:`url(${SB}/remix_event/03-event-flyers/remix-dj-dates-cities.png)`,backgroundSize:'cover',backgroundPosition:'center',pointerEvents:'none'}}/>
      <div style={{maxWidth:'var(--max)',margin:'0 auto',position:'relative',zIndex:2}}>
        <div className="rv" style={{marginBottom:48}}>
          <Sec n="005" l="Event Brands"/>
          <h2 className="h-empire" style={{fontSize:'var(--text-section)'}}>The world we<br/><em>curate.</em></h2>
        </div>
        <div className="rv stg" style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8}} >
          {eventShowcase.map(e=>(
            <div key={e.brand} className={`${e.logo?'fcard':'gcard'} iact`} style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,padding:'clamp(20px,3vw,40px) 12px',textAlign:'center',minHeight:140}}>
              {e.logo ? (
                <div style={{width:64,height:64,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Img src={e.logo} alt={e.brand} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain',opacity:.85}} />
                </div>
              ) : (
                <div style={{width:44,height:44,borderRadius:'50%',background:'rgba(200,169,110,.06)',border:'1px solid rgba(200,169,110,.14)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:'rgba(200,169,110,.4)',fontStyle:'italic'}}>{e.brand[0]}</span>
                </div>
              )}
              <div className="mono" style={{fontSize:'var(--text-micro)',letterSpacing:'.2em',textTransform:'uppercase',color:'rgba(200,169,110,.55)'}}>{e.brand}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ BRAND UNIVERSE — contrasting bg ═══ */}
    <section id="brands" style={{background:'var(--deep)',padding:'var(--pad) var(--gutter)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'15%',left:'50%',transform:'translateX(-50%)',width:900,height:600,borderRadius:'50%',background:'radial-gradient(ellipse at center,rgba(200,169,110,.025) 0%,transparent 60%)',pointerEvents:'none'}}/>
      <div style={{maxWidth:'var(--max)',margin:'0 auto'}}>
        <div className="rv" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:48,flexWrap:'wrap',gap:20}}>
          <div>
            <Sec n="006" l="Brand Universe"/>
            <h2 className="h-empire" style={{fontSize:'var(--text-section)'}}>Every brand.<br/>One <em>ecosystem.</em></h2>
          </div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            {(['all','flagship','active','seasonal','dev','legacy'] as const).map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{
                padding:'8px 16px',border:`1px solid ${filter===f?'rgba(200,169,110,.4)':'rgba(200,169,110,.07)'}`,
                background:filter===f?'rgba(200,169,110,.06)':'transparent',
                color:filter===f?'var(--gold)':'rgba(242,237,227,.25)',
                fontFamily:"'DM Mono',monospace",fontSize:'var(--text-micro)',
                letterSpacing:'.2em',textTransform:'uppercase',borderRadius:2,transition:'all .3s',
              }}>{f}</button>
            ))}
          </div>
        </div>
        <div className="rv stg" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}} >
          {fb.map(b=>(
            <div key={b.name} className={`${b.featured?'fcard':'gcard'} iact`} style={{padding:'24px',cursor:b.website?'pointer':'default'}} onClick={()=>b.website&&window.open(b.website,'_blank')}>
              {b.logo && (
                <div style={{marginBottom:14,height:68,display:'flex',alignItems:'center',justifyContent:'center',background:b.featured?'rgba(200,169,110,.03)':'transparent',borderRadius:8}}>
                  <Img src={b.logo} alt={b.name} style={{maxWidth:'60%',maxHeight:'100%',objectFit:'contain',opacity:.85}} />
                </div>
              )}
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
                <div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'var(--text-caption)',fontWeight:500,color:'rgba(242,237,227,.75)'}}>{b.name}</div>
                  <div className="mono" style={{fontSize:'var(--text-micro)',letterSpacing:'.15em',textTransform:'uppercase',color:'rgba(200,169,110,.3)',marginTop:3}}>{b.division}</div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <div style={{width:7,height:7,borderRadius:'50%',background:statusColors[b.status],flexShrink:0}}/>
                  {b.website && <span style={{fontSize:12,color:'rgba(200,169,110,.2)'}}>→</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ PIPELINE — back to dark ═══ */}
    <section id="pipeline" style={{background:'var(--void)',padding:'var(--pad) var(--gutter)',position:'relative'}}>
      <div style={{position:'absolute',inset:0,opacity:.04,filter:'brightness(.15)',backgroundImage:`url(${SB}/pronto-energy/product-shots/all-flavors-lineup.png)`,backgroundSize:'cover',backgroundPosition:'center',pointerEvents:'none'}}/>
      <div style={{maxWidth:'var(--max)',margin:'0 auto',position:'relative',zIndex:2}}>
        <div className="rv" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'end',marginBottom:64}} >
          <div>
            <Sec n="007" l="In Development"/>
            <h2 className="h-empire" style={{fontSize:'var(--text-section)'}}>The next<br/>chapter is<br/><em>already</em><br/>in motion.</h2>
          </div>
          <p style={{fontSize:'var(--text-body)',color:'var(--muted)',lineHeight:2,maxWidth:420}}>Beyond current operations, The Kollective builds new concepts across hospitality, products, experiences, and digital platforms.</p>
        </div>
        <div className="rv stg" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}} >
          {PIPE.map(p=>(
            <div key={p.nm} className={`${p.st==='Active'?'fcard':'gcard'} iact`} style={{padding:'clamp(24px,3vw,44px)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                <span className="mono" style={{fontSize:'var(--text-micro)',letterSpacing:'.3em',textTransform:'uppercase',color:p.st==='Active'?'rgba(111,168,111,.8)':'rgba(200,169,110,.4)'}}>{p.st}</span>
                <div style={{width:8,height:8,borderRadius:'50%',background:p.st==='Active'?'rgba(111,168,111,.7)':'rgba(200,169,110,.2)',animation:p.st==='Active'?'pulse 3s ease infinite':'none'}}/>
              </div>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'var(--text-sub)',fontWeight:300,color:'var(--ivory)',marginBottom:12,lineHeight:1.2}}>{p.nm}</h3>
              <p style={{fontSize:'var(--text-caption)',color:'var(--dim)',lineHeight:1.8,marginBottom:24}}>{p.d}</p>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {p.c.map(c=><span key={c} className="tag">{c}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ PARTNER — elevated bg ═══ */}
    <section style={{background:'var(--coal)',padding:'var(--pad) var(--gutter)'}}>
      <div style={{maxWidth:'var(--max)',margin:'0 auto'}}>
        <div className="rv" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'start'}} className="g2">
          <div className="rv">
            <Sec n="008" l="Partnership"/>
            <h2 className="h-empire" style={{fontSize:'var(--text-section)',marginBottom:36}}>Partner across<br/>the <em>ecosystem.</em></h2>
            <p style={{fontSize:'var(--text-body)',color:'var(--muted)',lineHeight:2,maxWidth:420,marginBottom:44}}>Sponsorships, venue activations, licensing, co-branded experiences, media, and strategic growth.</p>
            <a href="mailto:thekollectiveworldwide@gmail.com?subject=Partnership%20Inquiry" className="cta"><span>Begin a Conversation</span></a>
          </div>
          <div className="rv stg" style={{display:'flex',flexDirection:'column',gap:6}}>
            {PARTNERS.map(p=>(
              <a key={p.t} href={`mailto:thekollectiveworldwide@gmail.com?subject=${encodeURIComponent(p.t+' Inquiry — KHG')}`} className="gcard iact" style={{padding:'22px 28px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',gap:18,alignItems:'center'}}>
                  <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:'rgba(200,169,110,.3)'}}>{p.ic}</span>
                  <div>
                    <h4 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'var(--text-body-lg)',fontWeight:500,color:'rgba(242,237,227,.7)',marginBottom:3}}>{p.t}</h4>
                    <p style={{fontSize:'var(--text-caption)',color:'var(--dim)',lineHeight:1.5}}>{p.d}</p>
                  </div>
                </div>
                <span style={{fontSize:14,color:'rgba(200,169,110,.2)',marginLeft:20}}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ═══ CONTACT ═══ */}
    <section id="connect" style={{background:'var(--void)',padding:'clamp(120px,18vh,240px) var(--gutter)',textAlign:'center',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:800,height:800,borderRadius:'50%',background:'radial-gradient(ellipse at center,rgba(200,169,110,.05) 0%,transparent 55%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',opacity:.025,pointerEvents:'none'}}>
        <Img src={dorseyAssets.kollectiveGoldWhite} alt="" style={{width:600,height:'auto'}} />
      </div>
      <div style={{position:'relative',zIndex:2}}>
        <div className="rv"><Sec n="009" l="Enter the Ecosystem"/></div>
        <h2 className="rv h-empire" style={{fontSize:'clamp(52px,10vw,150px)',marginBottom:48,marginTop:12}}>{"Let's"}<br/><em>build</em><br/>together.</h2>
        <div className="rv" style={{display:'flex',gap:0,justifyContent:'center',marginBottom:64,flexWrap:'wrap'}}>
          {['Sponsorship','Venue','Investment','Media','Collab','General'].map((l,i,a)=>(
            <a key={l} href={`mailto:thekollectiveworldwide@gmail.com?subject=${encodeURIComponent(l+' — KHG')}`} className="mono iact" style={{padding:'14px 26px',border:'1px solid rgba(200,169,110,.1)',borderRight:i===a.length-1?'1px solid rgba(200,169,110,.1)':'none',color:'rgba(242,237,227,.28)',fontSize:'var(--text-micro)',letterSpacing:'.2em',textTransform:'uppercase',transition:'all .3s'}}>
              {l}
            </a>
          ))}
        </div>
        <div className="rv">
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(18px,2.5vw,30px)',fontWeight:300,color:'rgba(242,237,227,.18)',marginBottom:8}}>Or reach out directly</p>
          <a href="mailto:thekollectiveworldwide@gmail.com" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(22px,3.5vw,44px)',fontWeight:300,color:'rgba(200,169,110,.5)',transition:'color .3s'}}>thekollectiveworldwide@gmail.com</a>
        </div>
      </div>
    </section>

    {/* FOOTER */}
    <footer style={{padding:'44px var(--gutter)',borderTop:'1px solid rgba(200,169,110,.04)',background:'var(--void)'}}>
      <div style={{maxWidth:'var(--max)',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:20}}>
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <Img src={dorseyAssets.kollectiveGoldWhite} alt="KHG" style={{height:20,width:'auto',opacity:.3}} />
          <span className="mono" style={{fontSize:'var(--text-micro)',letterSpacing:'.4em',textTransform:'uppercase',color:'rgba(200,169,110,.2)'}}>The Kollective Hospitality Group</span>
        </div>
        <div style={{display:'flex',gap:36}}>
          {[['Instagram','https://instagram.com/thekollectiveworldwide'],['HugLife','https://huglife.vercel.app'],['Good Times','https://good-times-app.vercel.app']].map(([l,u])=>(
            <a key={l} href={u} target="_blank" rel="noopener noreferrer" className="mono" style={{fontSize:'var(--text-micro)',letterSpacing:'.2em',textTransform:'uppercase',color:'rgba(242,237,227,.15)',transition:'color .3s'}}>{l}</a>
          ))}
        </div>
        <span className="mono" style={{fontSize:'var(--text-micro)',letterSpacing:'.15em',color:'rgba(242,237,227,.1)'}}>© 2026 Dr. Dorsey · Atlanta, GA</span>
      </div>
    </footer>
  </>);
}
