"use client";

import {FormEvent,useState} from "react";

const CONSENT='I want to receive The Inner Circle Venue Revenue Brief and occasional venue-revenue marketing emails. I can unsubscribe at any time.';

export default function InnerCircleBrief(){
  const [status,setStatus]=useState('');
  const [loading,setLoading]=useState(false);

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    setLoading(true);setStatus('');
    const fd=new FormData(e.currentTarget);
    const response=await fetch('/api/forms/submit',{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({
        form_type:'newsletter',
        full_name:String(fd.get('full_name')||''),
        email:String(fd.get('email')||''),
        phone:'',
        form_data:{
          email_marketing_consent:fd.get('email_marketing_consent')==='on',
          email_marketing_consent_text:CONSENT,
          request_type:'inner_circle_venue_revenue_brief',
        },
        source:'inner-circle',
      }),
    });
    const output=await response.json().catch(()=>null);
    if(response.ok&&output?.success){setStatus('success');e.currentTarget.reset();}
    else setStatus(output?.error||'We could not save the subscription yet.');
    setLoading(false);
  }

  return (
    <main style={{minHeight:'100vh',padding:'90px 20px',background:'#080706',color:'#f5f0e8',fontFamily:'Arial,sans-serif'}}>
      <section style={{width:'min(720px,100%)',margin:'0 auto',border:'1px solid rgba(255,255,255,.15)',borderRadius:22,padding:'clamp(28px,5vw,50px)',background:'linear-gradient(180deg,#11100e,#090807)'}}>
        <a href="/inner-circle" style={{color:'#d7c49a',textDecoration:'none',fontSize:11,letterSpacing:2,textTransform:'uppercase'}}>← The Inner Circle</a>
        <p style={{margin:'36px 0 10px',fontSize:10,letterSpacing:2.5,textTransform:'uppercase',color:'#d7c49a'}}>Venue operator intelligence</p>
        <h1 style={{margin:'0 0 14px',fontSize:'clamp(46px,7vw,78px)',lineHeight:.92,fontWeight:500}}>Venue Revenue Brief</h1>
        <p style={{margin:'0 0 30px',maxWidth:630,color:'rgba(255,255,255,.68)',lineHeight:1.65}}>Short operating notes for independent venue owners and hospitality operators: revenue per guest, underused space, sponsorship/media surfaces, guest experience, food and beverage, commerce, and what should — or should not — be activated inside a property.</p>
        <form onSubmit={submit} style={{display:'grid',gap:15}}>
          <label style={label}>Full name<input name="full_name" required style={input}/></label>
          <label style={label}>Business email<input name="email" type="email" required style={input}/></label>
          <label style={{display:'flex',gap:10,alignItems:'flex-start',fontSize:12,lineHeight:1.55,color:'rgba(255,255,255,.78)'}}>
            <input name="email_marketing_consent" type="checkbox" required style={{marginTop:3}}/>
            <span>{CONSENT}</span>
          </label>
          {status==='success'?<div style={success}>You’re subscribed. The Venue Revenue Brief will only use this Inner Circle opt-in.</div>:status?<div style={error}>{status}</div>:null}
          <button disabled={loading} style={button}>{loading?'Saving…':'Join the Brief'}</button>
        </form>
        <p style={{margin:'18px 0 0',fontSize:11,lineHeight:1.55,color:'rgba(255,255,255,.48)'}}>This opt-in is specific to The Inner Circle. It does not subscribe you to other Kollective brands.</p>
      </section>
    </main>
  );
}
const label={display:'grid',gap:8,fontSize:10,letterSpacing:1.4,textTransform:'uppercase' as const,color:'rgba(255,255,255,.8)',fontWeight:700};
const input={width:'100%',boxSizing:'border-box' as const,padding:'13px 14px',borderRadius:9,border:'1px solid rgba(255,255,255,.17)',background:'rgba(255,255,255,.07)',color:'#fff',fontSize:14,outline:'none'};
const button={padding:'16px 20px',border:0,borderRadius:999,background:'#f5f0e8',color:'#111',fontWeight:900,letterSpacing:1.5,textTransform:'uppercase' as const,cursor:'pointer'};
const success={padding:14,border:'1px solid #4e8f72',borderRadius:10,color:'#a9e2c8'};
const error={padding:14,border:'1px solid #9c4d4d',borderRadius:10,color:'#ffb9b9'};
