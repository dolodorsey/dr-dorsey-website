const routes = [
  ['Private Strategy', 'Founder access', 'A focused conversation about enterprise architecture, positioning, growth, and the next move.', '/forms/consultation'],
  ['Speaking & Appearances', 'Founder platform', 'Keynotes, panels, interviews, podcasts, lectures, and cultural conversations.', '/forms/speaking'],
  ['Partnership / Sponsor', 'Enterprise', 'Sponsorship, integrations, licensing, strategic alliances, and multi-brand opportunities.', '/forms/sponsor'],
  ['Careers / Internships', 'Talent', 'Operating, creative, technology, hospitality, management, and learning opportunities.', '/forms/hiring_inquiry'],
  ['Vendor Network', 'Capabilities', 'Introduce your company, coverage, products, services, and operating capabilities.', '/forms/vendor'],
  ['Media / Press', 'Editorial', 'Interviews, profiles, media requests, image access, and enterprise information.', '/forms/media'],
  ['Reserve / RSVP', 'Hospitality', 'Tables, celebrations, reservations, event attendance, and VIP access.', 'https://111atl.com/#forms'],
  ['Hospitality Licensing', 'Casper Group', 'Group pricing, concept licensing, food-hall placement, and expansion conversations.', '/forms/group_pricing'],
  ['Volunteer / Impact', 'Community', 'Support Sole Exchange, PSA, education, youth, and community initiatives.', '/forms/volunteer'],
  ['NDA / Private Review', 'Protected access', 'Begin a confidential company, investment, development, or strategic conversation.', '/forms/nda'],
  ['Bulk Book Orders', 'Hakuna Matata', 'Corporate, school, organization, book-club, and event orders.', '/forms/bulk_orders'],
  ['General Inquiry', 'Open channel', 'Use this route when the right lane is not immediately clear.', '/forms/inquiry'],
];

export default function FormsIndex() {
  return (
    <main style={{minHeight:'100vh',color:'#f5efe5',background:'#080706',fontFamily:'Arial,sans-serif'}}>
      <nav style={{position:'fixed',zIndex:20,top:0,right:0,left:0,height:64,padding:'0 5vw',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#070605e8',borderBottom:'1px solid #ffffff1f',backdropFilter:'blur(14px)'}}>
        <a href="/" style={{display:'block'}}><img src="/dorsey/logo.png" alt="Dr. Dorsey" style={{width:145,height:38,objectFit:'contain'}} /></a>
        <div style={{display:'flex',gap:22}}><a href="/directory" style={navLink}>Directory</a><a href="/links" style={navLink}>Links</a><a href="/access" style={navLink}>All Access</a></div>
      </nav>
      <header style={{position:'relative',minHeight:680,padding:'130px 5vw 58px',display:'flex',flexDirection:'column',justifyContent:'flex-end',overflow:'hidden',background:'#090705'}}>
        <img src="/dorsey/letter.webp" alt="" style={{position:'absolute',top:64,right:0,width:'46%',height:'calc(100% - 64px)',objectFit:'cover',filter:'brightness(.42) saturate(.7)'}} />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,#080706 0 44%,transparent 80%),linear-gradient(0deg,#080706,transparent 45%)'}} />
        <div style={{position:'relative',zIndex:2,maxWidth:1050}}>
          <p style={{margin:'0 0 18px',color:'#d2b36d',fontSize:8,fontWeight:800,letterSpacing:'.22em',textTransform:'uppercase'}}>Direct access / choose the conversation</p>
          <h1 style={{margin:0,fontFamily:'Georgia,serif',fontSize:'clamp(64px,8.4vw,128px)',fontWeight:400,lineHeight:.8,letterSpacing:'-.06em'}}>EVERY MOVE<br/>STARTS WITH<br/><em style={{color:'#c8a35a',fontWeight:400}}>THE RIGHT DOOR.</em></h1>
          <p style={{width:'min(570px,70vw)',margin:'30px 0 0 auto',color:'#ffffffa2',fontFamily:'Georgia,serif',fontSize:16,lineHeight:1.65}}>Strategy, speaking, partnerships, hospitality, careers, media, vendors, impact, and private enterprise access—organized by intent.</p>
        </div>
      </header>
      <section style={{padding:'68px 5vw 96px',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(285px,1fr))',gap:1,background:'#2a2217'}}>
        {routes.map(([title,eyebrow,detail,href],index) => (
          <a href={href} key={title} style={{minHeight:315,padding:25,display:'flex',flexDirection:'column',color:'#f5efe5',background:'#0e0b08',textDecoration:'none'}}>
            <span style={{color:'#c8a35a',fontFamily:'Georgia,serif',fontSize:13}}>{String(index+1).padStart(2,'0')} / {eyebrow}</span>
            <h2 style={{margin:'auto 0 15px',fontFamily:'Georgia,serif',fontSize:'clamp(34px,3vw,48px)',fontWeight:400,lineHeight:.9,letterSpacing:'-.04em'}}>{title}</h2>
            <p style={{minHeight:58,margin:'0 0 24px',color:'#ffffff8a',fontSize:11,lineHeight:1.65}}>{detail}</p>
            <b style={{fontSize:8,letterSpacing:'.15em',textTransform:'uppercase'}}>Open form ↗</b>
          </a>
        ))}
      </section>
      <footer style={{padding:'35px 5vw',display:'flex',alignItems:'center',justifyContent:'space-between',gap:25,borderTop:'1px solid #ffffff1e'}}>
        <img src="/dorsey/logo.png" alt="Dr. Dorsey" style={{width:130,height:36,objectFit:'contain'}} />
        <p style={{margin:0,color:'#ffffff5c',fontSize:7,letterSpacing:'.16em',textTransform:'uppercase'}}>Live for today. Plan for tomorrow. Party tonight.</p>
        <a href="/forms/inquiry" style={navLink}>General inquiry ↗</a>
      </footer>
    </main>
  );
}

const navLink = {color:'#fff',fontSize:8,fontWeight:700,letterSpacing:'.15em',textDecoration:'none',textTransform:'uppercase'};
