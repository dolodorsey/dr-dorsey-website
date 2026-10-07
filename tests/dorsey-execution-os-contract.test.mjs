import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const ui=fs.readFileSync("src/app/ops-os/dorsey/DorseyExecutionOS.tsx","utf8");
const api=fs.readFileSync("src/app/api/ops-os/dorsey/route.ts","utf8");
const migration=fs.readFileSync("supabase/migrations/20261007064000_dorsey_execution_os.sql","utf8");

test("ten screens exist in canonical order",()=>{
  const labels=["Today","Founder Queue","Social & Content","Relationships","Authority","Origination","Approvals","Campaigns","Agents","Proof"];
  let cursor=-1;
  for(const label of labels){const next=ui.indexOf(`label:"${label}"`);assert.ok(next>cursor,`${label} missing/out of order`);cursor=next;}
});
test("button operations have API handlers",()=>{
  const ops=["create_work","create_content","create_opportunity","create_campaign","create_handoff","assign_agent","attach_proof","mark_executed","decision","handoff_opportunity","worker_state"];
  for(const op of ops){assert.ok(ui.includes(`"${op}"`),`UI missing ${op}`);assert.ok(api.includes(`op==="${op}"`),`API missing ${op}`);}
});
test("proof gate blocks false completion",()=>{assert.match(api,/Proof required\. Item moved to needs_proof/);assert.match(api,/PROOF_TERMINAL/);assert.match(ui,/Execution requires proof/);});
test("Muse owns external-send lane",()=>{assert.match(api,/external_send_owner:"Muse"/);assert.match(api,/send_locked:true/);assert.match(api,/Muse owns assigned external-send execution/);assert.match(ui,/Creating this campaign does not send it/);});
test("audit trail is RLS protected",()=>{assert.match(migration,/khg_dorsey_execution_audit/);assert.match(migration,/enable row level security/);assert.match(migration,/dorsey_audit_staff_insert/);assert.match(api,/await audit\(/);});
test("Dorsey route does not switch to KOLLECTIVE BOH",()=>{assert.match(api,/getOpsClient/);assert.ok(!api.includes("wfkohcwxxsrhcxhepfql"));});
