import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("public and operations route entrypoints remain present", async () => {
  const routes = [
    "src/app/page.tsx",
    "src/app/book/page.tsx",
    "src/app/brands/page.tsx",
    "src/app/events/page.tsx",
    "src/app/shop/page.tsx",
    "src/app/enterprise/page.tsx",
    "src/app/enterprise/[...slug]/page.tsx",
    "src/app/ops-os/page.tsx",
    "src/app/ops-os/[section]/page.tsx",
    "src/app/os/[lane]/page.tsx",
    "src/app/os/ig-connect/page.tsx",
    "src/app/os/ig-sessions/page.tsx",
  ];
  await Promise.all(routes.map(read));
});

test("Ops data resources keep their baseline table contracts", async () => {
  const source = await read("src/app/api/ops-os/data/route.ts");
  const contracts = {
    home: "khg_dashboard_cards",
    social: "v_khg_social_command",
    '"social-accounts"': "khg_social_accounts",
    marketing: "khg_marketing_calendar_items",
    approvals: "khg_approval_requests",
    '"content-studio"': "khg_content_generation_requests",
    events: "khg_event_rollouts",
    revenue: "khg_revenue_opportunities",
    tasks: "khg_work_queues",
  };
  for (const [resource, table] of Object.entries(contracts)) {
    assert.match(source, new RegExp(`${resource}: [\"']${table}[\"']`));
  }
});

test("worker-agent action-to-RPC compatibility is preserved", async () => {
  const source = await read("src/app/api/ops-os/worker-agent/route.ts");
  const contracts = {
    claim_sms: "worker_claim_sms",
    finish_sms: "worker_finish_sms",
    claim_ig_dm: "worker_claim_ig_dm",
    finish_ig_dm: "worker_finish_ig_dm",
    claim_ig_scrape: "worker_claim_ig_scrape",
    finish_ig_scrape: "worker_finish_ig_scrape",
    insert_ig_commenters: "worker_insert_ig_commenters",
    insert_ig_likers: "worker_insert_ig_likers",
    insert_ig_inbound: "worker_insert_ig_inbound",
    get_ig_creds: "worker_get_ig_creds",
  };
  for (const [action, rpc] of Object.entries(contracts)) {
    assert.match(source, new RegExp(`${action}: [\"']${rpc}[\"']`));
  }
});

test("worker controls retain the known worker and action allowlists", async () => {
  const source = await read("src/app/api/ops-os/workers/route.ts");
  for (const worker of ["sms_watcher_9609", "ig_worker_dolodorsey", "ig_scraper_dolodorsey"]) {
    assert.ok(source.includes(worker));
  }
  for (const action of ["ping", "pause", "resume"]) assert.ok(source.includes(`\"${action}\"`));
});

test("baseline records that build currently bypasses lint and type failures", async () => {
  const source = await read("next.config.mjs");
  assert.match(source, /ignoreDuringBuilds:\s*true/);
  assert.match(source, /ignoreBuildErrors:\s*true/);
});
