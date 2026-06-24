import Link from "next/link";
import { BrainCircuit, CalendarDays, CheckCircle2, ClipboardList, Code2, Megaphone, PackageOpen, Rocket, ShieldCheck, Utensils } from "lucide-react";

type DivisionKey = "departments" | "casper" | "mind-studio" | "products" | "apps-tech";

type Module = {
  title: string;
  purpose: string;
  cadence: string;
  owner: string;
  status: string;
};

type Division = {
  eyebrow: string;
  title: string;
  intro: string;
  priority: string;
  route: string;
  icon: typeof ClipboardList;
  metrics: { label: string; value: string }[];
  modules: Module[];
  workflow: string[];
  fields: string[];
  automations: string[];
  links: { label: string; href: string }[];
};

const divisions: Record<DivisionKey, Division> = {
  departments: {
    eyebrow: "FULL-PAGE DEPARTMENT COMMAND",
    title: "Department Operating System",
    intro: "Every division gets its own execution surface, queue, SOP lane, calendar, asset flow, and automation path. No brands are merged. No department gets buried inside a sidebar.",
    priority: "Master Control",
    route: "/ops-os/departments",
    icon: ClipboardList,
    metrics: [
      { label: "Primary divisions", value: "8" },
      { label: "Sprint-ready modules", value: "32" },
      { label: "Automation lanes", value: "24" },
      { label: "Brand mixing", value: "0" },
    ],
    modules: [
      { title: "Social Media", purpose: "Post calendar, story schedule, creative preview, captions, approval, and posting proof.", cadence: "Daily", owner: "Social Lead", status: "Active" },
      { title: "Marketing", purpose: "Email, SMS, evite, ads, SEO, engagement, campaign stages, and conversion paths.", cadence: "Daily", owner: "Marketing Lead", status: "Active" },
      { title: "Events / Nightlife", purpose: "Hosts, birthdays, vendors, sponsors, graphics, captions, RSVPs, ticketing, and recaps.", cadence: "Event-based", owner: "Event Ops", status: "Active" },
      { title: "Codex Sprint", purpose: "Engineering queue, prompt generator, 5-hour sprint rhythm, PR, QA, and deployment tracking.", cadence: "Every reset", owner: "Tech Ops", status: "Active" },
    ],
    workflow: ["Capture request", "Assign brand/division", "Generate spec", "Program or queue", "Review proof", "Approve", "Deploy", "Document SOP"],
    fields: ["Division", "Brand", "Owner", "Priority", "Status", "Due Date", "Asset", "Caption", "CTA", "Proof URL", "Blocker", "Automation Trigger"],
    automations: ["New request creates dashboard task", "Approved content moves to publishing lane", "Blocked work pings owner", "Completed work creates SOP/documentation follow-up"],
    links: [
      { label: "Social Media", href: "/ops-os/social" },
      { label: "Marketing", href: "/ops-os/marketing" },
      { label: "Events", href: "/ops-os/events" },
      { label: "Codex Sprint", href: "/ops-os/codex" },
    ],
  },
  casper: {
    eyebrow: "CASPER GROUP • QUICK-SERVE COMMAND",
    title: "Casper Group Operating Dashboard",
    intro: "Quick-serve brands stay separated by concept, menu, location, SOP, inventory, launch status, and kitchen workflow.",
    priority: "Food Ops Scale System",
    route: "/ops-os/casper",
    icon: Utensils,
    metrics: [
      { label: "Concepts", value: "10" },
      { label: "Launch lanes", value: "6" },
      { label: "Kitchen systems", value: "5" },
      { label: "Mixed brands", value: "0" },
    ],
    modules: [
      { title: "Brand Dashboards", purpose: "Separate command card for Lemon Pepper Lou's, Tha Morning After, Espresso Co., Mojo Juice, Taco Yaki, Sweet Tooth, Mister Oyster, Patty Daddy, Toss'd, and Pasta Bish.", cadence: "Weekly", owner: "Casper Ops", status: "Build Next" },
      { title: "Menu Management", purpose: "Menu items, modifiers, pricing, packaging, kitchen notes, and photo assets per concept.", cadence: "Weekly", owner: "Culinary Lead", status: "Build Next" },
      { title: "Location Launches", purpose: "City, address, partner kitchen, launch checklist, training status, equipment, and go-live date.", cadence: "Launch-based", owner: "Launch Ops", status: "Build Next" },
      { title: "Inventory + Ticket Flow", purpose: "Stock requests, prep lists, low inventory alerts, daily ticket issues, and proof logs.", cadence: "Daily", owner: "Kitchen Manager", status: "Build Next" },
    ],
    workflow: ["Select Casper concept", "Assign location", "Load menu", "Confirm equipment", "Train staff", "Open ordering", "Track tickets", "Recap performance"],
    fields: ["Concept", "Location", "Menu Status", "Training Status", "Inventory Status", "Launch Date", "Kitchen Partner", "Equipment", "Packaging", "Daily Sales", "Ticket Issues"],
    automations: ["Low inventory creates restock task", "New location creates 14-day launch checklist", "Menu update creates photo/content request", "Ticket issue creates QA log"],
    links: [
      { label: "Tasks", href: "/ops-os/tasks" },
      { label: "Content Studio", href: "/ops-os/content-studio" },
      { label: "Revenue", href: "/ops-os/revenue" },
      { label: "Codex Sprint", href: "/ops-os/codex" },
    ],
  },
  "mind-studio": {
    eyebrow: "THE MIND STUDIO • SERVICE OPS COMMAND",
    title: "The Mind Studio Operating Dashboard",
    intro: "Professional, separate, compliance-aware command center for partner acquisition, therapist onboarding, referral sources, and client intake.",
    priority: "Healthcare Service Growth",
    route: "/ops-os/mind-studio",
    icon: BrainCircuit,
    metrics: [
      { label: "Partner lanes", value: "2" },
      { label: "Ops modules", value: "5" },
      { label: "Referral sources", value: "Live" },
      { label: "Mixed with nightlife", value: "Never" },
    ],
    modules: [
      { title: "OB-GYN Partnerships", purpose: "Clinic prospects, contacts, outreach, meeting status, referral agreement, and follow-up.", cadence: "Daily", owner: "OB-GYN Partnerships", status: "Build Next" },
      { title: "PI Attorney Partnerships", purpose: "Law firm prospects, accident trauma referral flow, contact status, and conversion tracking.", cadence: "Daily", owner: "PI Partnerships", status: "Build Next" },
      { title: "Therapist Operations", purpose: "Recruiting, credentialing support, availability, specialty, territory, and onboarding stage.", cadence: "Weekly", owner: "Therapist Ops", status: "Build Next" },
      { title: "Client Intake", purpose: "Referral source, service need, intake status, appointment handoff, and follow-up without exposing sensitive clinical details.", cadence: "Daily", owner: "Client Ops", status: "Build Next" },
    ],
    workflow: ["Capture partner lead", "Assign lane", "Send outreach", "Book meeting", "Confirm referral process", "Track intake", "Follow up", "Report partner performance"],
    fields: ["Partner Type", "Organization", "Contact", "City", "Outreach Stage", "Meeting Date", "Referral Source", "Therapist Need", "Client Ops Status", "Follow-Up Date"],
    automations: ["New partner lead creates outreach task", "Booked meeting creates prep checklist", "Referral received creates client ops task", "Inactive partner triggers reactivation campaign"],
    links: [
      { label: "Marketing", href: "/ops-os/marketing" },
      { label: "Revenue", href: "/ops-os/revenue" },
      { label: "Tasks", href: "/ops-os/tasks" },
      { label: "Codex Sprint", href: "/ops-os/codex" },
    ],
  },
  products: {
    eyebrow: "PRODUCTS • LAUNCH + SKU COMMAND",
    title: "Products Division Operating Dashboard",
    intro: "Separate launch, content, manufacturing, vendor, campaign, and SKU tracking for each product brand.",
    priority: "Commerce Scale System",
    route: "/ops-os/products",
    icon: PackageOpen,
    metrics: [
      { label: "Product lanes", value: "4" },
      { label: "Launch modules", value: "6" },
      { label: "Campaign paths", value: "Active" },
      { label: "Public overlap", value: "Controlled" },
    ],
    modules: [
      { title: "Infinity Water", purpose: "Aluminum water product tracker, venue placement, inventory, campaign content, and distribution targets.", cadence: "Weekly", owner: "Product Ops", status: "Build Next" },
      { title: "Pronto Energy", purpose: "Energy drink launch tracker, sample activations, accounts, assets, and retail follow-up.", cadence: "Weekly", owner: "Product Ops", status: "Build Next" },
      { title: "Mister Manufacturing", purpose: "Dropship/merch manufacturing tracker, mockups, vendors, proofs, and product pages.", cadence: "Daily", owner: "Merch Ops", status: "Build Next" },
      { title: "Drop Campaigns", purpose: "SKU, creative, captions, landing pages, email/SMS, influencer pushes, and sales recap.", cadence: "Launch-based", owner: "Marketing + Product", status: "Build Next" },
    ],
    workflow: ["Create product idea", "Assign product brand", "Create SKU", "Request mockups", "Approve vendor/proof", "Build product page", "Launch campaign", "Track revenue"],
    fields: ["Product Brand", "SKU", "Vendor", "Cost", "Retail Price", "Mockup URL", "Proof Status", "Inventory", "Launch Date", "Campaign", "Sales", "Restock Trigger"],
    automations: ["Approved proof creates product page task", "Low inventory creates reorder task", "Launch date creates campaign checklist", "New SKU creates content request"],
    links: [
      { label: "Marketing", href: "/ops-os/marketing" },
      { label: "Content Studio", href: "/ops-os/content-studio" },
      { label: "Revenue", href: "/ops-os/revenue" },
      { label: "Codex Sprint", href: "/ops-os/codex" },
    ],
  },
  "apps-tech": {
    eyebrow: "APPS + TECH • BUILD COMMAND",
    title: "Apps / Tech Operating Dashboard",
    intro: "Engineering roadmap, bug tracker, repo status, deployment tracking, prompt generation, and QA lane for every app without merging backlogs.",
    priority: "Internal Tech Scale",
    route: "/ops-os/apps-tech",
    icon: Rocket,
    metrics: [
      { label: "App lanes", value: "5" },
      { label: "Build stages", value: "7" },
      { label: "Codex-ready", value: "Yes" },
      { label: "Merged roadmaps", value: "0" },
    ],
    modules: [
      { title: "GOOD TIMES™", purpose: "Roadmap, bugs, feature requests, deployments, API notes, and city curator build items.", cadence: "Weekly", owner: "Tech Ops", status: "Build Next" },
      { title: "Casper App", purpose: "Admin, employee, partner portals, ticket flow, inventory, training, and report bugs.", cadence: "Weekly", owner: "Tech Ops", status: "Build Next" },
      { title: "Mind Studio Portal", purpose: "Client, therapist, and admin portal roadmap with compliance-safe field planning.", cadence: "Weekly", owner: "Tech Ops", status: "Build Next" },
      { title: "Internal KHG Dashboard", purpose: "Ops OS roadmap, bugs, repos, deployment status, Codex prompts, and QA checklist.", cadence: "Daily", owner: "Tech Ops", status: "Active" },
    ],
    workflow: ["Capture feature", "Assign app", "Write spec", "Queue Codex", "Create PR", "QA", "Deploy", "Document release"],
    fields: ["App", "Repo", "Feature", "Bug", "Priority", "Spec", "Codex Prompt", "Branch", "PR", "QA Status", "Deploy Status", "Release Notes"],
    automations: ["New bug creates Codex-ready task", "PR Ready creates QA task", "Deploy success creates release note", "Failed build creates blocker alert"],
    links: [
      { label: "Codex Sprint", href: "/ops-os/codex" },
      { label: "Tasks", href: "/ops-os/tasks" },
      { label: "Approvals", href: "/ops-os/approvals" },
      { label: "Department OS", href: "/ops-os/departments" },
    ],
  },
};

const allDivisionKeys: DivisionKey[] = ["departments", "casper", "mind-studio", "products", "apps-tech"];

function FieldList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="ops-panel">
      <div className="ops-panel-heading"><div><span className="ops-eyebrow">{title}</span><h2>{title}</h2></div></div>
      <div className="ops-status-line">{items.map((item) => <span key={item}>{item}</span>)}</div>
    </div>
  );
}

export function DepartmentCommand({ divisionKey }: { divisionKey: DivisionKey }) {
  const division = divisions[divisionKey];
  const Icon = division.icon;

  return (
    <div className="ops-workspace">
      <header className="ops-header">
        <div>
          <span className="ops-eyebrow">{division.eyebrow}</span>
          <h1>{division.title}</h1>
          <p>{division.intro}</p>
        </div>
        <div className="ops-header-actions">
          <Link className="ops-button secondary" href="/ops-os/codex"><Code2 size={17} /> Queue Codex Build</Link>
          <Link className="ops-button" href="/ops-os/tasks"><ClipboardList size={17} /> Add Task</Link>
        </div>
      </header>

      <section className="ops-metrics">
        {division.metrics.map((metric) => <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>)}
      </section>

      {divisionKey === "departments" && (
        <section className="ops-records calendar-grid" style={{ marginBottom: 18 }}>
          {allDivisionKeys.filter((key) => key !== "departments").map((key) => {
            const item = divisions[key];
            const CardIcon = item.icon;
            return (
              <article className="ops-record command-card" key={key}>
                <div className="ops-record-top"><span className="ops-badge ready">{item.priority}</span><CardIcon size={18} /></div>
                <h2>{item.title}</h2>
                <p>{item.intro}</p>
                <Link className="ops-button secondary" href={item.route}>Open Dashboard</Link>
              </article>
            );
          })}
        </section>
      )}

      <section className="ops-panel">
        <div className="ops-panel-heading">
          <div><span className="ops-eyebrow">OPERATING MODULES</span><h2>{division.priority}</h2></div>
          <span className="ops-badge approved"><Icon size={13} /> Full Page</span>
        </div>
        <div className="ops-records calendar-grid">
          {division.modules.map((module) => (
            <article className="ops-record command-card" key={module.title}>
              <div className="ops-record-top"><span className={`ops-badge ${module.status.toLowerCase().replaceAll(" ", "_")}`}>{module.status}</span><CheckCircle2 size={18} /></div>
              <h2>{module.title}</h2>
              <p>{module.purpose}</p>
              <div className="ops-record-meta">
                <span><CalendarDays size={14} /> {module.cadence}</span>
                <span><ShieldCheck size={14} /> {module.owner}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="ops-preview-grid">
        <FieldList title="Workflow" items={division.workflow} />
        <FieldList title="Required Fields" items={division.fields} />
      </div>

      <section className="ops-panel">
        <div className="ops-panel-heading"><div><span className="ops-eyebrow">AUTOMATION PATH</span><h2>n8n / Airtable / GHL Ready</h2></div><Megaphone size={20} /></div>
        <div className="ops-records calendar-grid">
          {division.automations.map((automation) => <article className="ops-record" key={automation}><div className="ops-record-top"><span className="ops-badge planned">Automation</span></div><h2>{automation}</h2><p>Use this as the trigger/action logic for the next build sprint.</p></article>)}
        </div>
      </section>

      <section className="ops-panel">
        <div className="ops-panel-heading"><div><span className="ops-eyebrow">CONNECTED COMMANDS</span><h2>Open Related Workspaces</h2></div></div>
        <div className="ops-action-row">
          {division.links.map((link) => <Link className="ops-button secondary" key={link.href} href={link.href}>{link.label}</Link>)}
        </div>
      </section>
    </div>
  );
}
