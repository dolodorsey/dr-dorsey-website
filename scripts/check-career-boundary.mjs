import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const career = read('src/lib/dorsey-career.ts');
const founder = read('src/app/page.tsx');
const profile = read('src/app/author/dr-dorsey/page.tsx');
const corporate = read('src/app/kollective/page.tsx');
const middleware = read('src/middleware.ts');
const checks = [];
function check(name, fn) { fn(); checks.push(name); }
check('All three specific curation entries exist', () => {
  for (const key of ['parking-lot-concert', 'pink-trap-house-activation', 'pink-trap-house-tour']) assert.ok(career.includes(`key: '${key}'`));
  assert.equal((career.match(/role: 'Curation'/g) || []).length, 3);
});
check('High-school origin is explicit without an invented start year', () => {
  assert.match(career, /high school/);
  assert.doesNotMatch(career, /\b(?:19|20)\d{2}\b/);
});
check('Parking Lot Pimpin is not substituted for the concert', () => assert.doesNotMatch(career, /Parking Lot Pimpin/));
check('Founder homepage uses the shared source module', () => {
  assert.match(founder, /from '@\/lib\/dorsey-career'/);
  assert.ok(founder.includes('/author/dr-dorsey#selected-work'));
});
check('Author page has origin and selected-work anchors', () => {
  assert.ok(profile.includes('id="atlanta-roots"'));
  assert.ok(profile.includes('id="selected-work"'));
  assert.match(profile, /DORSEY_SELECTED_WORK\.map/);
});
check('Corporate module is founder history, not a new portfolio company', () => {
  assert.ok(corporate.includes('id="founder-history"'));
  assert.ok(corporate.includes('personal curation credits'));
  assert.ok(corporate.includes('https://doctordorsey.com/author/dr-dorsey#selected-work'));
});
check('Public files do not import private prototype or evidence payloads', () => {
  for (const source of [career, founder, profile, corporate]) assert.doesNotMatch(source, /PR_Atelier|Experience_v3\.html|pr_claims|pr_approval_receipts|SUPABASE_SERVICE_ROLE|MAGAZINE\(3\)/);
});
check('Existing corporate host routing is unchanged byte-for-byte', () => {
  const buf = Buffer.from(middleware);
  const sha = createHash('sha1').update(`blob ${buf.length}\0`).update(buf).digest('hex');
  assert.equal(sha, 'b4a9000b8f181639bd4231a44f36e5650164e00e');
});
console.log(JSON.stringify({ passed: checks.length, checks, scope: 'source assertions only; not rendered or production QA' }, null, 2));
