# PR0 baseline report

Audit date: 2026-07-13 (America/New_York)

Branch: `upgrade/doctordorsey-extreme-v2`

Verified live production baseline at audit time: `0e0555f475e4bea6b716e2073d59d174f20f677e`

Current PR target baseline after reconciliation: `9283589e25f35ded1e0ec74418ac7298dceeff3a`

## Decision

PR0 is inventory, reproducible smoke coverage, and risk documentation only. It does not change public behavior, visual design, database schema or policies, storage, DNS, or deployment state.

The V2 handoff named `e336eaf1a389f90b3616e010f976ed70e2883b8f` as production. Live Vercel evidence instead showed production at `0e0555f`, which adds `/book`, the home-page book CTA, and the current `$44.44` Shopify fallback. While PR0 was being prepared, `main` advanced through `9283589` with a direct Bodega book redirect and image-host cleanup. The audit branch was reconciled onto that latest target to prevent regression.

## Verification summary

| Check | Result | Notes |
|---|---|---|
| Dependency install | Pass | `npm ci`; 391 packages |
| Baseline contracts | Pass | `npm run test:baseline` |
| TypeScript | Pass | `npm run typecheck` |
| Production build | Pass with warnings | Next.js 14.2.35; build skips lint and type validation by configuration; Shopify `no-store` produces a dynamic-render warning |
| Lint | Fail | 8 errors plus image/font warnings; see `release-rollback.md` |
| Dependency audit | Warn | 9 findings: 3 moderate, 6 high, 0 critical |
| Live route smoke | Pass | Apex and `www`; routes returned HTTP 200 except the intentional `/book` redirect 307 |
| Anonymous API probes | Warn | Config, Ops reads, and worker health are reachable without a user session |
| Live database/policy inspection | Warn | Broad anonymous reads and authenticated `ALL` policies exist on Ops tables |
| Storage inspection | Warn | Bucket has MIME/size controls, but public upload policy remains broad |

## Highest-priority follow-up gates

1. PR1: make lint/type validation enforceable without breaking the production build; address the high-severity dependency path with an explicit upgrade/test plan.
2. PR2: define authenticated Ops roles and remove anonymous access to operational/private datasets.
3. PR3: narrow worker RPC execution grants and isolate worker credentials.
4. PR4: replace public `brand-graphics` upload with authenticated, path-scoped writes.
5. Later PRs: make multi-table writes transactional/idempotent and add end-to-end customer/admin tests.

Stop after PR0. Do not merge or deploy this branch without explicit approval.
