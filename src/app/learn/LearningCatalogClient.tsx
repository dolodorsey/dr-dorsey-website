"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useMemo, useState } from "react";

const usd = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(cents || 0) / 100);
const range = (level: any) => level.price_floor_cents === level.price_ceiling_cents ? usd(level.price_floor_cents) : `${usd(level.price_floor_cents)}-${usd(level.price_ceiling_cents)}${level.billing_period === "monthly" ? "/mo" : ""}`;

function CheckoutForm({ offer, offerType, applicationId = null }: { offer: any; offerType: "course" | "consultation"; applicationId?: string | null }) {
  const [form, setForm] = useState({ buyer_name: "", buyer_email: "", buyer_phone: "" });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function checkout() {
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/learning/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offer_type: offerType, offer_id: offer.id, application_id: applicationId, ...form, source: "doctordorsey_learning" }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.checkout_url) throw new Error(data.blockers?.join(", ") || data.error || "Checkout unavailable");
      window.location.assign(data.checkout_url);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Checkout unavailable"); }
    finally { setBusy(false); }
  }
  const amount = offerType === "consultation" ? Number(offer.deposit_cents || offer.price_cents) : Number(offer.price_cents);
  return <div className="ddForm compact">
    <input value={form.buyer_name} onChange={(event) => setForm({ ...form, buyer_name: event.target.value })} placeholder="Your name" />
    <input type="email" value={form.buyer_email} onChange={(event) => setForm({ ...form, buyer_email: event.target.value })} placeholder="Email for receipt and access" />
    <input value={form.buyer_phone} onChange={(event) => setForm({ ...form, buyer_phone: event.target.value })} placeholder="Phone (optional)" />
    <button disabled={busy || !form.buyer_email} onClick={checkout}>{busy ? "Opening secure checkout..." : offerType === "course" ? `Enroll - ${usd(amount)}` : `Reserve - ${usd(amount)}`}</button>
    {message ? <p className="ddError">{message}</p> : null}
  </div>;
}

function ApplicationForm({ offer }: { offer: any }) {
  const [form, setForm] = useState({ contact_name: "", contact_email: "", contact_phone: "", company_name: "", website_url: "", primary_goal: "", current_challenge: "", desired_outcome: "", budget_range: "", timeline: "", company_fax: "" });
  const [result, setResult] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  async function submit() {
    setBusy(true); setResult(null);
    try {
      const response = await fetch("/api/learning/intake", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ offer_id: offer.id, ...form, source: "doctordorsey_learning" }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Application failed");
      setResult({ ...data, contact: { buyer_name: form.contact_name, buyer_email: form.contact_email, buyer_phone: form.contact_phone } });
    } catch (error) { setResult({ error: error instanceof Error ? error.message : "Application failed" }); }
    finally { setBusy(false); }
  }
  if (result?.application_id) return <div className="ddSubmitted"><strong>Application received.</strong><p>Your fit score and next action are now in the Doctor Dorsey engagement pipeline.</p>{result.status === "qualified" ? <CheckoutForm offer={offer} offerType="consultation" applicationId={result.application_id} /> : <p>We will review fit before requesting payment or scheduling.</p>}</div>;
  return <div className="ddForm">
    <div className="ddFormGrid"><input value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} placeholder="Name *"/><input type="email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} placeholder="Email *"/></div>
    <div className="ddFormGrid"><input value={form.contact_phone} onChange={(e) => setForm({ ...form, contact_phone: e.target.value })} placeholder="Phone"/><input value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} placeholder="Company / brand"/></div>
    <input value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} placeholder="Website or primary profile"/>
    <textarea value={form.primary_goal} onChange={(e) => setForm({ ...form, primary_goal: e.target.value })} placeholder="What is the one outcome you need? *"/>
    <textarea value={form.current_challenge} onChange={(e) => setForm({ ...form, current_challenge: e.target.value })} placeholder="What is blocking that outcome right now? *"/>
    <textarea value={form.desired_outcome} onChange={(e) => setForm({ ...form, desired_outcome: e.target.value })} placeholder="What must this engagement produce? *"/>
    <div className="ddFormGrid"><select value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })}><option value="">Timeline *</option><option>Immediate / 30 days</option><option>Within 60 days</option><option>Within 90 days</option><option>Exploring</option></select><select value={form.budget_range} onChange={(e) => setForm({ ...form, budget_range: e.target.value })}><option value="">Approved budget</option><option>Under $750</option><option>$750-$2,500</option><option>$2,500-$7,500</option><option>$7,500-$15,000</option><option>$15,000+</option></select></div>
    <input className="ddHoney" tabIndex={-1} autoComplete="off" value={form.company_fax} onChange={(e) => setForm({ ...form, company_fax: e.target.value })}/>
    <button disabled={busy || !form.contact_name || !form.contact_email || !form.primary_goal || !form.current_challenge || !form.desired_outcome || !form.timeline} onClick={submit}>{busy ? "Submitting..." : "Apply for this level"}</button>
    {result?.error ? <p className="ddError">{result.error}</p> : null}
  </div>;
}

function LevelCard({ level, program, open, onToggle }: { level: any; program?: any; open: boolean; onToggle: () => void }) {
  return <article className={`ddLevelCard lane-${level.lane}`}>
    <div className="ddLevelNumber">{String(level.level_number).padStart(2, "0")}</div>
    <span className="ddKicker">LEVEL {level.level_number}</span>
    <h3>{level.name}</h3><h4>{level.subtitle}</h4><p>{level.description}</p>
    <div className="ddLevelMeta"><strong>{range(level)}</strong><span>{level.duration_label}</span></div>
    <ul>{(level.includes || []).map((item: string) => <li key={item}>{item}</li>)}</ul>
    {level.lane === "course" && level.level_number === 1 ? <a className="ddCardAction" href="#self-paced">Choose a self-paced course</a> : null}
    {program ? <><button className="ddCardAction" onClick={onToggle}>{open ? "Close application" : `Apply for ${level.name}`}</button>{open ? <ApplicationForm offer={program}/> : null}</> : null}
  </article>;
}

export default function LearningCatalogClient({ courses, courseLevels, consultationLevels, hybridLevels, levelPrograms, consultations, readiness }: any) {
  const [openCourse, setOpenCourse] = useState<string | null>(null);
  const [openOffer, setOpenOffer] = useState<string | null>(null);
  const paidCourses = useMemo(() => courses.filter((course: any) => Number(course.price_cents) > 0), [courses]);
  const freeCourses = useMemo(() => courses.filter((course: any) => Number(course.price_cents) === 0), [courses]);
  const programByLevel = useMemo(() => new Map(levelPrograms.map((offer: any) => [offer.level_id, offer])), [levelPrograms]);

  return <main className="ddLearn">
    <nav className="ddLearnNav"><Link href="/">DR. DORSEY</Link><div><a href="#course-levels">Course levels</a><a href="#consultations">Consultations</a><a href="#hybrid">Hybrid</a></div></nav>
    <section className="ddLearnHero">
      <div className="ddHeroBackdrop"/>
      <div className="ddHeroCopy">
        <span>THE DOCTOR DORSEY ASCENSION SYSTEM</span>
        <h1>Learn it.<br/>Install it.<br/><em>Master it.</em></h1>
        <p>A commercial education and private advisory system for operators who are done collecting information and ready to build the thing.</p>
        <div className="ddHeroActions"><a href="#course-levels">Enter the academy</a><a href="#consultations" className="outline">Work with Dr. Dorsey</a></div>
        <div className="ddHeroProof"><div><strong>04</strong><span>Course levels</span></div><div><strong>05</strong><span>Access levels</span></div><div><strong>29</strong><span>Operating lessons</span></div></div>
      </div>
      <div className="ddHeroMedia" aria-hidden="true">
        <img src="https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/website/thesis-bg.jpg" alt=""/>
        <div className="ddHeroMediaShade"/>
        <div className="ddHeroStamp"><span>BUILT FROM</span><strong>57+</strong><span>REAL VENTURES</span></div>
        <div className="ddHeroQuote">“The blueprint isn’t theoretical.<br/><em>It’s running.</em>”</div>
      </div>
    </section>
    {!readiness.stripeConfigured ? <div className="ddNotice">Secure checkout is temporarily in configuration mode. No payment will be collected until the connection is verified.</div> : null}

    <section className="ddAscension"><span>THE ASCENSION LADDER</span><div className="ddLadder"><div><b>00</b><strong>Free Entry</strong><small>Orientation and guides</small></div><div><b>01</b><strong>Essentials</strong><small>$49-$499</small></div><div><b>02</b><strong>Premium</strong><small>$500-$2K</small></div><div><b>03</b><strong>Elite</strong><small>$2K-$5K</small></div><div><b>04</b><strong>Mastery</strong><small>$5K-$10K+</small></div></div></section>

    <section className="ddChoose">
      <div className="ddChooseIntro"><span>CHOOSE BY OUTCOME</span><h2>Three ways into<br/>the <em>system.</em></h2><p>Do not buy more access than the decision requires. Start with the format that matches the work in front of you.</p></div>
      <div className="ddChooseGrid">
        <a href="#self-paced"><b>01</b><span>Learn</span><h3>I need the framework.</h3><p>Self-paced operating courses with practical assignments and reusable assets.</p><strong>Browse courses →</strong></a>
        <a href="#consultations"><b>02</b><span>Decide</span><h3>I need expert direction.</h3><p>Focused access to Dr. Dorsey for one expensive decision, roadmap, or buildout.</p><strong>Choose access →</strong></a>
        <a href="#hybrid"><b>03</b><span>Transform</span><h3>I need implementation.</h3><p>Cohorts, accelerators, mentorship, and certification with accountability built in.</p><strong>Explore programs →</strong></a>
      </div>
    </section>

    <section id="course-levels" className="ddSection"><header><span>COURSE LEVELS</span><h2>Four depths of transformation.</h2><p>Start with the amount of support the outcome actually requires. Move upward as the cost of delay and complexity increase.</p></header><div className="ddLevelGrid">{courseLevels.map((level: any) => <LevelCard key={level.id} level={level} program={programByLevel.get(level.id)} open={openOffer === `level-${level.id}`} onToggle={() => setOpenOffer(openOffer === `level-${level.id}` ? null : `level-${level.id}`)}/>)}</div></section>

    <section id="self-paced" className="ddSection ddSelfPaced"><header><span>ESSENTIALS / SELF-PACED</span><h2>Buy the exact operating skill.</h2><p>Every course ends with a usable artifact, assignment, and scorecard.</p></header><div className="ddCourseGrid">{[...freeCourses, ...paidCourses].map((course: any) => <article className="ddCourseCard" key={course.id}><div><span>{course.price_cents ? "ESSENTIALS" : "FREE ENTRY"}</span><h3>{course.title}</h3><p>{course.subtitle || course.transformation_promise || course.description}</p></div><div className="ddCourseStats"><small>{course.lessons.length} lessons</small><small>{Math.round(Number(course.duration_minutes || 0) / 6) / 10} hours</small><strong>{course.price_cents ? usd(course.price_cents) : "Free"}</strong></div><button onClick={() => setOpenCourse(openCourse === course.id ? null : course.id)}>{openCourse === course.id ? "Close curriculum" : "View curriculum"}</button>{openCourse === course.id ? <div className="ddCourseDetail"><ol>{course.lessons.map((lesson: any) => <li key={lesson.id}><strong>{lesson.title}</strong><span>{lesson.summary}</span></li>)}</ol>{course.price_cents ? <CheckoutForm offer={course} offerType="course"/> : <p className="ddFree">Free orientation enrollment opens with the learning portal.</p>}</div> : null}</article>)}</div></section>

    <section id="consultations" className="ddSection ddConsult"><header><span>DIRECT ACCESS TO DR. DORSEY</span><h2>Five levels of consultation.</h2><p>From a fast diagnosis to ongoing private advisory. Each level has a different decision weight, depth, and access model.</p></header><div className="ddConsultGrid">{consultationLevels.map((level: any) => { const offer = consultations.find((item: any) => item.level_id === level.id); if (!offer) return null; const open = openOffer === `consult-${offer.id}`; return <article className="ddConsultCard" key={offer.id}><div className="ddConsultTop"><span>LEVEL {level.level_number}</span><small>{level.duration_label}</small></div><h3>{offer.name}</h3><p>{offer.transformation_promise || offer.description}</p><div className="ddConsultPrice"><strong>{offer.price_label || range(level)}</strong>{offer.deposit_cents && offer.deposit_cents < offer.price_cents ? <small>Reserve from {usd(offer.deposit_cents)}</small> : null}</div><ul>{(offer.deliverables || []).map((item: string) => <li key={item}>{item}</li>)}</ul><button className="ddCardAction" onClick={() => setOpenOffer(open ? null : `consult-${offer.id}`)}>{open ? "Close" : offer.requires_application ? "Apply + reserve" : "Reserve discovery"}</button>{open ? offer.requires_application ? <ApplicationForm offer={offer}/> : <CheckoutForm offer={offer} offerType="consultation"/> : null}</article>; })}</div></section>

    <section id="hybrid" className="ddSection ddHybrid"><header><span>HYBRID MODELS</span><h2>Knowledge plus access.</h2><p>For outcomes that need both the operating framework and live implementation support.</p></header><div className="ddHybridGrid">{hybridLevels.map((level: any) => <article key={level.id}><span>{String(level.level_number).padStart(2, "0")}</span><h3>{level.name}</h3><p>{level.description}</p><strong>{range(level)}</strong><small>{level.duration_label}</small></article>)}</div><a className="ddHybridCta" href="#course-levels">Choose the matching course level</a></section>

    <section className="ddWho"><span>WHO BUYS WHAT</span><div><article><b>DIY Learners</b><p>Essentials and self-paced courses.</p></article><article><b>Guided Learners</b><p>Premium cohorts and accountability.</p></article><article><b>Hands-On Clients</b><p>Strategy, implementation, and VIP intensives.</p></article><article><b>High-Rollers</b><p>Private advisory and VIP accelerators.</p></article><article><b>Licensees</b><p>Mastery certification and framework licensing.</p></article></div></section>
    <footer className="ddLearnFooter"><div><strong>DR. DORSEY</strong><span>Learn the system. Install the system. Master the system.</span></div><Link href="/">Return to doctordorsey.com</Link></footer>
  </main>;
}
