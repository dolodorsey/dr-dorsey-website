"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Bot, CheckCircle2, Clipboard, Code2, GitPullRequest, PlayCircle, ShieldCheck, TimerReset } from "lucide-react";

type CodexTask = {
  id: string;
  brand: string;
  project: string;
  task: string;
  type: string;
  priority: "P0" | "P1" | "P2" | "P3";
  status: string;
  resetWindow: string;
  owner: string;
  goal: string;
  acceptance: string[];
  doNotChange: string;
  testSteps: string[];
};

const storageKey = "khg_codex_sprint_queue_v1";

const seedTasks: CodexTask[] = [
  {
    id: "CODEX-001",
    brand: "KHG Master Dashboard",
    project: "dr-dorsey-website / ops-os",
    task: "Build full-page department dashboard views",
    type: "UI / Routing / Dashboard Architecture",
    priority: "P0",
    status: "Spec Ready",
    resetWindow: "Sprint 1",
    owner: "Codex",
    goal: "Replace sidebar-only behavior with dedicated full-page command surfaces for each major department.",
    acceptance: [
      "Every department opens as a full workspace, not only a side panel.",
      "Each workspace shows Calendar, Tasks, Uploads, Preview, Status, and Automations cards.",
      "Existing auth, Supabase config, and current ops-os routes continue working.",
    ],
    doNotChange: "Do not break current /ops-os auth, existing API routes, Supabase config, or active section pages.",
    testSteps: ["Run the local build.", "Visit /ops-os and every department route.", "Confirm mobile navigation still opens and closes correctly."],
  },
  {
    id: "CODEX-002",
    brand: "Social Media Division",
    project: "ops-os social command",
    task: "Add programmable post scheduler with asset and caption preview",
    type: "Feature Build",
    priority: "P0",
    status: "Queued",
    resetWindow: "Sprint 2",
    owner: "Codex",
    goal: "Create a schedule-ready content system for IG, TikTok, Facebook, X, YouTube, LinkedIn, and Threads.",
    acceptance: [
      "Post cards include account, platform, creative preview, caption, CTA, schedule time, and approval status.",
      "Drag/drop or upload field is visible in the creation flow.",
      "Statuses include Needs Asset, Needs Caption, Ready For Review, Approved, Scheduled, Posted.",
    ],
    doNotChange: "Do not merge social accounts or brands. Each account must remain independently filterable.",
    testSteps: ["Create one sample post.", "Filter by platform and status.", "Confirm the caption and asset preview render together."],
  },
  {
    id: "CODEX-003",
    brand: "Marketing Division",
    project: "ops-os marketing command",
    task: "Build marketing calendar for email, SMS, evite, ads, SEO, and engagement",
    type: "Feature Build",
    priority: "P1",
    status: "Queued",
    resetWindow: "Sprint 3",
    owner: "Codex",
    goal: "Separate marketing execution from social posting and track every conversion path by campaign.",
    acceptance: [
      "Calendar records include channel, audience, offer, funnel stage, budget, copy preview, and launch time.",
      "GHL stages are represented: Lead Captured, Invited, Clicked, RSVP'd, Confirmed, Attended, Bought, Follow-Up Needed, Converted.",
      "Campaigns can be grouped by brand/division without mixing brands.",
    ],
    doNotChange: "Do not combine marketing and social calendars into one generic queue.",
    testSteps: ["Create email, SMS, and ad campaign examples.", "Filter by channel.", "Confirm conversion stage is visible on each card."],
  },
  {
    id: "CODEX-004",
    brand: "Events / Nightlife Division",
    project: "ops-os events command",
    task: "Build event command dashboard for hosts, birthdays, vendors, sponsors, assets, RSVPs, and recaps",
    type: "Feature Build",
    priority: "P1",
    status: "Queued",
    resetWindow: "Sprint 4",
    owner: "Codex",
    goal: "Make each event a command page with rollout, promo, staffing, revenue, and proof of execution.",
    acceptance: [
      "Event records show date, venue, theme, hosts, birthdays, vendors, sponsors, ticket link, RSVP count, and recap status.",
      "Graphics and captions have separate request statuses.",
      "Each event remains separate from other events and brands.",
    ],
    doNotChange: "Do not collapse nightlife, civic, product, or service activations into one event type.",
    testSteps: ["Create one event rollout.", "Mark graphic/caption statuses separately.", "Confirm ticket link and RSVP count display."],
  },
  {
    id: "CODEX-005",
    brand: "Casper Group",
    project: "ops-os Casper command",
    task: "Add quick-serve brand execution dashboards",
    type: "Division Buildout",
    priority: "P2",
    status: "Backlog",
    resetWindow: "Sprint 5",
    owner: "Codex",
    goal: "Create separate execution views for Lemon Pepper Lou's, Tha Morning After, Espresso Co., Mojo Juice, Taco Yaki, Sweet Tooth, Mister Oyster, Patty Daddy, Toss'd, and Pasta Bish.",
    acceptance: [
      "Each Casper brand has its own dashboard card and route target.",
      "Menu, location, SOP, inventory, launch checklist, and kitchen ticket modules are represented.",
      "No Casper brand is merged into another Casper brand.",
    ],
    doNotChange: "Do not place Mind Studio under Casper Group.",
    testSteps: ["Open each Casper brand card.", "Confirm menu and location modules are visible.", "Confirm all 10 concepts remain separated."],
  },
  {
    id: "CODEX-006",
    brand: "The Mind Studio",
    project: "ops-os services command",
    task: "Add partner pipeline and therapist operations dashboard",
    type: "Division Buildout",
    priority: "P2",
    status: "Backlog",
    resetWindow: "Sprint 6",
    owner: "Codex",
    goal: "Track OB-GYN partners, PI attorney partners, therapist onboarding, client intake, and referral sources in a clean professional workspace.",
    acceptance: [
      "OB-GYN and PI pipelines are separate lanes.",
      "Therapist onboarding and client intake are separate modules.",
      "Compliance-safe operating notes are visible.",
    ],
    doNotChange: "Do not mix Mind Studio with nightlife, Casper, or product sales.",
    testSteps: ["Create one OB-GYN partner record.", "Create one PI partner record.", "Confirm therapist and client modules are separate."],
  },
  {
    id: "CODEX-007",
    brand: "Products Division",
    project: "ops-os products command",
    task: "Add product launch dashboard for Infinity Water, Pronto Energy, Mister Manufacturing, and merch drops",
    type: "Division Buildout",
    priority: "P2",
    status: "Backlog",
    resetWindow: "Sprint 7",
    owner: "Codex",
    goal: "Track SKUs, vendors, manufacturers, launch content, Vercel/Shopify sync, and drop campaigns by product brand.",
    acceptance: [
      "Each product brand has its own launch tracker.",
      "SKU, vendor, content, and campaign statuses are visible.",
      "Product campaigns are not mixed with service or event campaigns.",
    ],
    doNotChange: "Do not reveal private owner ties for products that should stay separated publicly.",
    testSteps: ["Create one product launch card.", "Add SKU/vendor details.", "Confirm brand filter separates products."],
  },
  {
    id: "CODEX-008",
    brand: "Apps / Tech Division",
    project: "ops-os build infrastructure",
    task: "Add app roadmap, bug tracker, repo sync, deployment tracker, and Codex prompt generator",
    type: "Engineering Ops",
    priority: "P1",
    status: "Queued",
    resetWindow: "Sprint 8",
    owner: "Codex",
    goal: "Make the dashboard the command center for GOOD TIMES, Casper App, Mind Studio Portal, The Fraternity App, and the internal KHG Dashboard.",
    acceptance: [
      "Every app has roadmap, bugs, repo, deployment, and next action fields.",
      "Prompt generator outputs Codex-ready specs with acceptance criteria and test steps.",
      "Repo and deployment states are visible without combining apps.",
    ],
    doNotChange: "Do not merge app roadmaps. Each app must keep its own backlog and release lane.",
    testSteps: ["Create one bug record.", "Generate one Codex prompt.", "Confirm app filter keeps roadmaps separate."],
  },
];

const statuses = ["Spec Ready", "Queued", "Running", "PR Ready", "QA Needed", "Approved", "Deployed", "Backlog"];
const priorities = ["P0", "P1", "P2", "P3"] as const;

function nextFiveHourWindow() {
  const now = new Date();
  const next = new Date(now);
  const nextHour = Math.ceil((now.getHours() + now.getMinutes() / 60) / 5) * 5;
  if (nextHour >= 24) {
    next.setDate(next.getDate() + 1);
    next.setHours(nextHour - 24, 0, 0, 0);
  } else {
    next.setHours(nextHour, 0, 0, 0);
  }
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(next);
}

function promptFor(task: CodexTask) {
  return `BRAND / DIVISION:\n${task.brand}\n\nPROJECT / REPO:\n${task.project}\n\nTASK TYPE:\n${task.type}\n\nPRIORITY:\n${task.priority}\n\nRESET WINDOW:\n${task.resetWindow}\n\nGOAL:\n${task.goal}\n\nCURRENT PROBLEM:\nThis work is not yet fully programmed into the dashboard as a dedicated execution system. Codex usage resets in windows, so this task must be small enough to complete, test, and summarize in one run.\n\nREQUIRED CHANGE:\n${task.task}\n\nACCEPTANCE CRITERIA:\n${task.acceptance.map((item) => `- ${item}`).join("\n")}\n\nDO NOT CHANGE:\n${task.doNotChange}\n\nTEST STEPS:\n${task.testSteps.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n\nOUTPUT REQUIRED:\n- Summary of changes\n- Files changed\n- Branch or PR link\n- Testing notes\n- Anything still needed`;
}

export default function CodexSprintPage() {
  const [tasks, setTasks] = useState<CodexTask[]>(seedTasks);
  const [selectedId, setSelectedId] = useState(seedTasks[0].id);
  const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState("");
  const [newTask, setNewTask] = useState({ brand: "", project: "", task: "", goal: "" });

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CodexTask[];
        if (Array.isArray(parsed) && parsed.length) {
          setTasks(parsed);
          setSelectedId(parsed[0].id);
        }
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks]);

  const selected = tasks.find((task) => task.id === selectedId) || tasks[0];
  const ready = tasks.filter((task) => ["Spec Ready", "Queued"].includes(task.status)).length;
  const active = tasks.filter((task) => ["Running", "PR Ready", "QA Needed"].includes(task.status)).length;
  const done = tasks.filter((task) => ["Approved", "Deployed"].includes(task.status)).length;
  const blocked = tasks.filter((task) => task.status === "Backlog").length;

  const visible = useMemo(() => {
    return tasks.filter((task) => filter === "all" || task.status === filter || task.priority === filter || task.brand === filter);
  }, [tasks, filter]);

  const filters = useMemo(() => Array.from(new Set(["all", ...statuses, ...priorities, ...tasks.map((task) => task.brand)])), [tasks]);

  function updateTask(id: string, changes: Partial<CodexTask>) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, ...changes } : task)));
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(promptFor(selected));
    setNotice(`${selected.id} Codex prompt copied.`);
  }

  function resetQueue() {
    setTasks(seedTasks);
    setSelectedId(seedTasks[0].id);
    setNotice("Codex queue reset to the default KHG sprint system.");
  }

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: CodexTask = {
      id: `CODEX-${String(tasks.length + 1).padStart(3, "0")}`,
      brand: newTask.brand || "Unassigned Division",
      project: newTask.project || "ops-os",
      task: newTask.task || "New Codex dashboard task",
      type: "Engineering Task",
      priority: "P1",
      status: "Spec Ready",
      resetWindow: `Sprint ${tasks.length + 1}`,
      owner: "Codex",
      goal: newTask.goal || "Convert this request into a clean, testable dashboard improvement.",
      acceptance: ["Change is visible in the dashboard.", "No existing route, auth, or brand separation is broken.", "Codex summarizes files changed and test notes."],
      doNotChange: "Do not merge brands/divisions or break existing ops-os workflows.",
      testSteps: ["Run build.", "Open affected dashboard route.", "Confirm the requested workflow works end to end."],
    };
    setTasks((current) => [next, ...current]);
    setSelectedId(next.id);
    setNewTask({ brand: "", project: "", task: "", goal: "" });
    setNotice(`${next.id} added to the Codex sprint queue.`);
  }

  return (
    <div className="ops-workspace">
      <header className="ops-header">
        <div>
          <span className="ops-eyebrow">CODEX • RESET WINDOWS • ENGINEERING EXECUTION</span>
          <h1>Codex Sprint Command</h1>
          <p>Program Codex like a 5-hour engineering sprint worker. Queue the right task, generate a clean prompt, run it during the next reset window, then move the result through PR, QA, approval, and deployment.</p>
        </div>
        <div className="ops-header-actions">
          <button className="ops-icon-button" title="Reset queue" onClick={resetQueue}><TimerReset size={18} /></button>
          <button className="ops-button" onClick={copyPrompt}><Clipboard size={17} /> Copy Codex Prompt</button>
        </div>
      </header>

      <section className="ops-metrics">
        <div><span>Ready / Queued</span><strong>{ready}</strong></div>
        <div><span>Active QA</span><strong>{active}</strong></div>
        <div><span>Approved / Deployed</span><strong>{done}</strong></div>
        <div><span>Backlog</span><strong>{blocked}</strong></div>
      </section>

      {notice && <div className="ops-alert success">{notice}</div>}

      <section className="ops-panel">
        <div className="ops-panel-heading">
          <div><span className="ops-eyebrow">NEXT AVAILABLE WINDOW</span><h2>{nextFiveHourWindow()}</h2></div>
          <span className="ops-badge ready">5-hour sprint rhythm</span>
        </div>
        <div className="ops-records calendar-grid">
          <div className="ops-record command-card">
            <div className="ops-record-top"><span className="ops-badge pending">Sprint 1</span><Bot size={18} /></div>
            <h2>Architecture First</h2>
            <p>Use the first reset window for routes, dashboard structure, shared components, database shape, and repo cleanup.</p>
          </div>
          <div className="ops-record command-card">
            <div className="ops-record-top"><span className="ops-badge approved">Sprint 2</span><Code2 size={18} /></div>
            <h2>Feature Build</h2>
            <p>Use the second reset window for direct modules: scheduler, marketing calendar, event command, forms, uploads, and preview cards.</p>
          </div>
          <div className="ops-record command-card">
            <div className="ops-record-top"><span className="ops-badge needs_approval">Sprint 3</span><ShieldCheck size={18} /></div>
            <h2>QA + Deploy</h2>
            <p>Use the third reset window for bug fixes, TypeScript/build errors, test steps, PR review, mobile cleanup, and deployment notes.</p>
          </div>
        </div>
      </section>

      <section className="ops-panel ops-create">
        <div className="ops-panel-heading">
          <div><span className="ops-eyebrow">ADD READY-TO-CODE TASK</span><h2>New Codex Task</h2></div>
        </div>
        <form className="ops-form" onSubmit={addTask}>
          <label><span>Brand / Division</span><input value={newTask.brand} onChange={(event) => setNewTask({ ...newTask, brand: event.target.value })} placeholder="KHG Master Dashboard" /></label>
          <label><span>Project / Repo</span><input value={newTask.project} onChange={(event) => setNewTask({ ...newTask, project: event.target.value })} placeholder="dr-dorsey-website / ops-os" /></label>
          <label><span>Task</span><input value={newTask.task} onChange={(event) => setNewTask({ ...newTask, task: event.target.value })} placeholder="Build scheduler preview cards" /></label>
          <label className="wide"><span>Goal</span><textarea value={newTask.goal} onChange={(event) => setNewTask({ ...newTask, goal: event.target.value })} placeholder="What should be true when Codex finishes this task?" /></label>
          <div className="wide ops-form-footer"><span>New tasks default to Spec Ready so they can go straight into the next Codex reset window.</span><button className="ops-button" type="submit"><PlayCircle size={17} /> Add to Queue</button></div>
        </form>
      </section>

      <div className="ops-toolbar">
        <input aria-label="Search queue" placeholder="Filter by task, division, project, or sprint..." onChange={(event) => setFilter(event.target.value || "all")} list="codex-filters" />
        <select aria-label="Status filter" value={filter} onChange={(event) => setFilter(event.target.value)}>
          {filters.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <datalist id="codex-filters">{filters.map((item) => <option key={item} value={item} />)}</datalist>
      </div>

      <section className="ops-records">
        {visible.map((task) => (
          <article className="ops-record command-card" key={task.id} onClick={() => setSelectedId(task.id)}>
            <div className="ops-record-top"><span>{task.id}</span><span className={`ops-badge ${task.status.toLowerCase().replaceAll(" ", "_")}`}>{task.status}</span></div>
            <h2>{task.task}</h2>
            <p>{task.goal}</p>
            <div className="ops-record-meta">
              <span><GitPullRequest size={14} /> {task.project}</span>
              <span><CheckCircle2 size={14} /> {task.brand}</span>
              <span><Bot size={14} /> {task.priority} • {task.resetWindow}</span>
            </div>
            <div className="ops-inline-edit" onClick={(event) => event.stopPropagation()}>
              <span>Move status</span>
              <select value={task.status} onChange={(event) => updateTask(task.id, { status: event.target.value })}>{statuses.map((status) => <option key={status}>{status}</option>)}</select>
            </div>
          </article>
        ))}
      </section>

      <section className="ops-panel" style={{ marginTop: 18 }}>
        <div className="ops-panel-heading">
          <div><span className="ops-eyebrow">SELECTED TASK PROMPT</span><h2>{selected.id} — {selected.brand}</h2></div>
          <button className="ops-button secondary" onClick={copyPrompt}><Clipboard size={17} /> Copy</button>
        </div>
        <div className="ops-copy-preview">
          <span className="ops-badge approved">Codex-ready</span>
          <h3>{selected.task}</h3>
          <p>{promptFor(selected)}</p>
        </div>
      </section>
    </div>
  );
}
