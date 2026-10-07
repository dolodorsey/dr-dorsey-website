import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// Founder correction: the public site does not own Dorsey execution.
// Full execution/browser acceptance lives in dolodorsey/khg-dashboard.
const page=fs.readFileSync("src/app/ops-os/dorsey/page.tsx","utf8");
const api=fs.readFileSync("src/app/api/ops-os/dorsey/route.ts","utf8");

test("misplaced page redirects to the canonical private dashboard",()=>{
  assert.match(page,/redirect\("https:\/\/thedoctordorsey\.com\/"\)/);
  assert.doesNotMatch(page,/<DorseyExecutionOS/);
});
test("retired public API fails closed instead of forwarding writes",()=>{
  assert.match(api,/status:\s*410/);
  assert.match(api,/export const GET = retired/);
  assert.match(api,/export const POST = retired/);
  assert.match(api,/export const PATCH = retired/);
  assert.doesNotMatch(api,/getOpsClient|createClient|\.from\(|fetch\(/);
});
test("retired route does not leak into search or caches",()=>{
  assert.match(page,/index:\s*false/);
  assert.match(api,/"Cache-Control":\s*"no-store"/);
});
