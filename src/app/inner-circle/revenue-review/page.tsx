"use client";

import { FormEvent, useState } from "react";

const assets = [
  "Memory Machine / guest-content capture",
  "Good Times / venue discovery + promotion",
  "BEVCO / beverage placement",
  "VAPR / automated retail",
  "Casper Group / food + kitchen activation",
  "Mister Manufacturing / venue merchandise",
  "Sole Exchange / commerce + community activation",
];

export default function InnerCircleRevenueReview() {
  const [status,setStatus]=useState("");
  const [loading,setLoading]=useState(false);

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const data=Object.fromEntries(new FormData(event.currentTarget));
    const response=await fetch("/api/forms/submit",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({
        form_type:"inquiry",
        full_name:String(data.full_name||""),
        email:String(data.email||""),
        phone:String(data.phone||""),
        form_data:{...data,request_type:"venue_revenue_review"},
        source:"inner-circle",
      }),
    });
    const output=await response.json().catch(()=>null);
    if(response.ok&&output?.success){
      setStatus("success");
      event.currentTarget.reset();
    }else{
      setStatus(output?.error||"We could not save the request yet.");
    }
    setLoading(false);
  }

  return (
    <main style={{minHeight:"100vh",padding:"90px 20px",background:"#080706",color:"#f5f0e8",fontFamily:"Arial,sans-serif"}}>
      <section style={{width:"min(760px,100%)",margin:"0 auto",border:"1px solid rgba(255,255,255,.15)",borderRadius:22,padding:"clamp(26px,5vw,48px)",background:"linear-gradient(180deg,#11100e,#090807)"}}>
        <a href="/inner-circle" style={{color:"#d7c49a",textDecoration:"none",fontSize:11,letterSpacing:2,textTransform:"uppercase"}}>← Inner Circle</a>
        <p style={{margin:"34px 0 10px",fontSize:10,letterSpacing:2.5,textTransform:"uppercase",color:"#d7c49a"}}>The Venue Revenue Optimization Engine™</p>
        <h1 style={{margin:"0 0 16px",fontSize:"clamp(44px,7vw,78px)",lineHeight:.92,fontWeight:500}}>Venue Revenue Review</h1>
        <p style={{margin:"0 0 30px",maxWidth:650,color:"rgba(255,255,255,.68)",lineHeight:1.65}}>Tell us what you operate and where the friction is. We will review the venue against the Inner Circle portfolio and identify the highest-fit revenue opportunities—without forcing every asset into every property.</p>

        <form onSubmit={submit} style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:14}}>
          <label style={label}>Full name<input name="full_name" required style={input}/></label>
          <label style={label}>Title / role<input name="title" required style={input}/></label>
          <label style={label}>Email<input name="email" type="email" required style={input}/></label>
          <label style={label}>Phone<input name="phone" type="tel" required style={input}/></label>
          <label style={label}>Venue / company<input name="venue_name" required style={input}/></label>
          <label style={label}>City / market<input name="city" required style={input}/></label>
          <label style={label}>Venue type<select name="venue_type" required style={input}><option value="">Select</option><option>Nightclub / lounge</option><option>Restaurant / hospitality</option><option>Event venue</option><option>Bowling / entertainment</option><option>Arena / stadium</option><option>Hotel / resort</option><option>Other</option></select></label>
          <label style={label}>Primary objective<select name="primary_objective" required style={input}><option value="">Select</option><option>Increase revenue per guest</option><option>Activate underused space / kitchen</option><option>Increase venue traffic</option><option>Add sponsorship / media value</option><option>Add products / retail</option><option>Improve guest experience</option><option>Multiple objectives</option></select></label>
          <label style={{...label,gridColumn:"1 / -1"}}>Assets you want us to evaluate<select name="asset_interest" multiple size={7} style={{...input,minHeight:175}}>{assets.map(x=><option key={x}>{x}</option>)}</select><small style={{opacity:.55}}>Choose one or more. We will still recommend only what fits.</small></label>
          <label style={{...label,gridColumn:"1 / -1"}}>Current revenue gaps / notes<textarea name="notes" rows={5} required style={{...input,resize:"vertical"}}/></label>
          <label style={label}>Preferred review date<input name="preferred_date" type="date" style={input}/></label>
          <label style={label}>Best way to follow up<select name="preferred_channel" style={input}><option>Email</option><option>Phone</option></select></label>
          {status==="success"?<div style={{gridColumn:"1 / -1",padding:14,border:"1px solid #4e8f72",borderRadius:10,color:"#a9e2c8"}}>Received. Inner Circle will review the venue and route the next step.</div>:status?<div style={{gridColumn:"1 / -1",padding:14,border:"1px solid #9c4d4d",borderRadius:10,color:"#ffb9b9"}}>{status}</div>:null}
          <button disabled={loading} style={{gridColumn:"1 / -1",padding:"16px 20px",border:0,borderRadius:999,background:"#f5f0e8",color:"#111",fontWeight:900,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer"}}>{loading?"Submitting…":"Request Venue Revenue Review"}</button>
        </form>
      </section>
    </main>
  );
}

const label={display:"flex",flexDirection:"column" as const,gap:8,fontSize:10,letterSpacing:1.4,textTransform:"uppercase" as const,color:"rgba(255,255,255,.8)",fontWeight:700};
const input={width:"100%",boxSizing:"border-box" as const,padding:"13px 14px",borderRadius:9,border:"1px solid rgba(255,255,255,.17)",background:"rgba(255,255,255,.07)",color:"#fff",fontSize:14,outline:"none"};
