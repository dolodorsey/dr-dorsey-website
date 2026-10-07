# CLAUDE HANDOFF — DORSEY DASHBOARD EXECUTION OS

**Date:** October 7, 2026  
**Owner:** Dr. Dorsey  
**Executor:** Claude  
**Scope:** DORSEY / KOLLECTIVE dashboard only.

## Read first
Canonical visual/reference handoff with embedded screen examples:
https://docs.google.com/document/d/1F25hSiQah_H5i_U5L_GF6bXNKH5DVxYzxsRf_nDJ2gs/edit

## Technical truth
- GitHub: `dolodorsey/dr-dorsey-website`
- Vercel: `dr-dorsey-website` / `prj_3YF3X7szVlzsUjzPK6dTsTtDYM23`
- Production branch: `main`
- Execution branch: `claude/dorsey-dashboard-execution-os`
- Current Ops OS: `/ops-os`
- New dedicated Dorsey route must resolve at: `/ops-os/dorsey`
- Live Ops OS Supabase project: **MCP Gateway** `dzlmtvodpyhetvektfuo`
- Do **not** silently switch this dashboard to KOLLECTIVE BOH.

## Mission
Convert Dorsey from a generic/read-only dashboard into an editable execution cockpit. Every actionable card/row must create work, edit work, approve/reject, route work, trigger a permitted worker action, show proof, escalate a blocker, or hand off.

## Locked Dorsey engines
1. Social
2. Content
3. Engagement
4. Authority / PR
5. Relationships
6. Enterprise Origination

Founder queue max 5–10 items. Routine admin stays off founder view.

## Existing code to audit first
- `src/app/ops-os/page.tsx`
- `src/app/ops-os/Workspace.tsx`
- `src/app/ops-os/OpsShell.tsx`
- `src/app/api/ops-os/data/route.ts`
- `src/app/api/ops-os/worker-agent/route.ts`
- `src/lib/ops-supabase.ts`

## Existing live tables to reuse first
`khg_dashboard_cards`, `khg_work_queues`, `khg_approval_requests`, `khg_revenue_opportunities`, `khg_content_items`, `khg_content_assets`, `khg_content_captions`, `khg_content_calendar_slots`, `khg_marketing_calendar_items`, `khg_content_generation_requests`, `khg_social_accounts`, `enterprise_handoff_notes`, `khg_managed_agent_handoffs`, `khg_session_handoffs`, `khg_claude_memory`, `khg_worker_config`, `worker_dispatch_log`, `worker_state`, `agent_executions`, `agent_health`, `action_center_registry`, `enterprise_dashboards`, `enterprise_command_centers`, `ai_build_tasks`.

Do not create parallel schema unless the existing execution contract genuinely cannot support the feature.

## 10-screen build order
Build one screen fully, QA it, then move on:
1. Command Center / Today
2. Founder Queue
3. Social + Content
4. Engagement + Relationships
5. Authority / PR
6. Enterprise Origination
7. Approvals
8. Campaigns + Distribution
9. Muse / Agent Control
10. Proof / Audit / History

### Screen 1 — Command Center / Today
Must show TODAY, NEEDS DORSEY, HOT SIGNALS, BLOCKERS, PROOF/RECENTLY EXECUTED, TOMORROW PREP. Max 5 key priorities. All rows editable/actionable.

### Screen 2 — Founder Queue
Show exact action, person/org, why Dorsey is needed, potential leverage/value, due time, source engine, next action. Buttons: Done+proof, snooze, delegate, convert to opportunity, open source, add note.

### Screen 3 — Social + Content
Today’s content, Needs Recording, Needs Photo, Ready for Approval, Approved/Ready for Muse, Scheduled, Posted+URL. Buttons create/edit/approve/reject/revise/schedule/hand to Muse/mark posted with proof. Scheduled is never complete.

### Screen 4 — Engagement + Relationships
High-value engagement, VIP inbound, warm intros, reconnect, watchlist, follow-ups. Buttons log interaction, follow-up, request intro, assign Muse research, escalate to Dorsey, convert to opportunity.

### Screen 5 — Authority / PR
Media pitches, podcasts/interviews, speaking, expert requests, published proof, search-authority actions. Buttons create pitch, talking points, approve, assign outreach, log submission, mark published with URL, follow-up.

### Screen 6 — Enterprise Origination
Relationship, originating conversation, opportunity, destination brand, source=DORSEY, estimated value, handoff status, next action. Handoff to independent brand and remove from Dorsey active queue unless founder leverage remains needed.

### Screen 7 — Approvals
One decision center. Approve/reject/revise/reassign/open source. Approval updates actual source object.

### Screen 8 — Campaigns + Distribution
Social, email, SMS where permitted, LinkedIn, PR, SEO/AEO/GEO, partner distribution. Show status, owner, approval, scheduled time, proof, exception. No uncontrolled external sends.

### Screen 9 — Muse / Agent Control
Muse status/check-in, Claude handoffs, DOT handoffs, worker health, queued/failed checks, receipts. Buttons assign Muse, create Claude/DOT handoff, rerun permitted check, pause/resume worker, open result, escalate error.

### Screen 10 — Proof / Audit / History
Completed work with proof, activity history, changed-by/at, source system, provider receipt/live URL, before/after state. “Complete” without proof is flagged and does not count.

## Editability contract
Editable fields: title, brief/description, priority, owner, due date/time, status, next action, blocker, notes, approval state, proof, handoff destination. All edits persist after refresh.

## Status contract
`draft` → `ready` → `needs_approval` → `approved` → `assigned` → `in_progress` → `waiting` / `blocked` → `needs_proof` → `executed` → `verified`.
“configured / queued / scheduled / prepared” are not executed.

## Proof contract
- Social: live URL
- Outreach: provider receipt/disposition
- Call: logged disposition
- Meeting: scheduled/held proof + note
- PR: submission or published URL
- Site/app: deployed + production verification
- Brand handoff: destination owner accepted
No proof → `needs_proof`.

## Button routing
- Add Task → `khg_work_queues`
- Edit → update source row
- Assign to Muse → assignment + `khg_managed_agent_handoffs`
- Ask Claude → managed handoff assigned_to=claude
- Ask DOT → managed handoff assigned_to=dot
- Approve/Reject → `khg_approval_requests` + source state
- Create Content → `khg_content_generation_requests` / `khg_content_items`
- Schedule Content → `khg_content_calendar_slots`
- Create Campaign → `khg_marketing_calendar_items`
- Create Opportunity → `khg_revenue_opportunities`
- Add Handoff → `enterprise_handoff_notes` / `khg_managed_agent_handoffs`
- Mark Executed → validate proof before state change
- Block / Resolve Blocker → persist blocker + resolution
- Open Source / Proof → real URL
- Refresh → real refetch/realtime reconcile

## Muse / agent watchdog
Use Supabase Realtime plus existing worker/agent infrastructure.
- 15-minute active-window Dorsey scan
- hourly outside active window unless high-priority incident exists
- high item due within 2h and not started → Muse check
- overdue next action → Muse check
- approval beyond SLA → surface
- complete without proof → needs_proof
- stale heartbeat > 2 expected intervals → incident/blocker
- high-value inbound/relationship signal → relationship queue
- Dorsey-originated opportunity → ensure destination handoff
- Muse result → write receipt/result + handoff summary

## Agent bridge
Supabase is authoritative. Muse writes update to Supabase first. Claude/DOT/ChatGPT read same record.
If browser bridge exists, wire Open Agent + generated handoff payload. If direct browser typing is brittle, use Open + Copy Handoff; do not fake a successful handoff.

## Outbound control
No uncontrolled sends.
Muse owns assigned send execution.
Before send: target verified, brand verified, copy customized, suppression/DNC checked where applicable, sender route verified, approval satisfied, receipt written back.

## UI standard
Use embedded Google Doc references for visual direction only.
Dorsey styling:
- premium black/charcoal/white
- restrained accents
- dense but readable
- no giant headers/dead space
- execution queue first
- status pills, owner, due, blocker, proof
- desktop-first but mobile-usable
- no neon club look
- no vanity-stat wall

Top nav:
`Today | Founder Queue | Social & Content | Relationships | Authority | Origination | Approvals | Campaigns | Agents | Proof`

Persistent controls:
`+ New Action | Search | Today/Week | Needs Dorsey | Blockers | Muse status | Realtime`

## No-read-only-card rule
Any card/list containing actionable work must expose a direct action: owner, due, status, note, approve, assign, handoff, proof, block, complete. Summary-only cards must drill into executable records.

## Backend/security
Use MCP Gateway ref `dzlmtvodpyhetvektfuo`.
Reuse Ops OS API, extend cleanly.
Prefer authenticated server-side write paths; keep RLS.
Never expose service_role.
Audit all changes.
Add migrations for durable schema changes.
Run Supabase advisors after schema work.
Verify indexes/query paths.

## Google Sheets
Sheets remain separate business-data workbooks. Dashboard is execution control; do not derail this build into a data-rearchitecture project.

## QA gate for every screen
1. source tables confirmed
2. writes confirmed
3. UI built
4. all buttons wired
5. refresh persistence verified
6. mobile verified
7. proof logic verified
8. auth/RLS verified
9. Vercel preview verified
10. only then move to next screen

## Acceptance
- `/ops-os/dorsey` works authenticated
- no demo/fake production data
- edits persist
- realtime works where supported
- founder queue cap/warning works
- no proof → no executed status
- Muse/Claude/DOT handoffs create real records
- blockers surface to Command Center
- origination can hand off and leave Dorsey queue
- no uncontrolled outbound
- build passes
- preview tested
- production custom domain tested after approved merge
- public sites, auth, Ops OS login, Good Times routes do not regress

## Final required return from Claude
1. commits
2. preview URL
3. production URL after merge
4. migration names
5. DB objects changed
6. QA matrix for all 10 screens
7. button routing test results
8. Supabase handoff updated
9. remaining blockers
10. screenshots of all completed Dorsey screens
