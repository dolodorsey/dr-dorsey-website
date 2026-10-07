# Release, failures, and rollback

## Baseline failures and warnings

`npm run lint` currently fails with eight errors:

- `src/app/enterprise/EnterpriseWorkspace.tsx:7` — explicit `any`
- `src/app/events/page.tsx:366` — explicit `any`
- `src/app/ops-os/Workspace.tsx:7` — explicit `any`
- `src/app/ops-os/marketing/MarketingCommandLive.tsx:6` — explicit `any`
- `src/app/ops-os/marketing/MarketingCommandPro.tsx:7` — explicit `any`
- `src/app/ops-os/social/SocialCommandPro.tsx:7` — explicit `any`
- `src/app/page.tsx:8` — unused `KHG_EMBLEM`
- `src/lib/shopify.ts:22` — explicit `any`

Additional warnings cover raw `<img>` usage and custom fonts. `next.config.mjs` sets both `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` to `true`, so a successful build is not an enforcement gate. `npm audit` reports 3 moderate and 6 high findings, including the pinned Next.js/eslint-config-next line. Build also emits a Shopify `DYNAMIC_SERVER_USAGE` message because product fetching uses `cache: 'no-store'`.

## Reproduce

```sh
npm ci
npm run test:baseline
npm run typecheck
npm run lint
npm run build
BASE_URL=https://doctordorsey.com npm run smoke:routes
```

## PR0 release rule

Do not merge or deploy PR0 until reviewed. It only adds documentation, tests, and scripts. If merged changes must be reverted, revert the PR commit; no database, storage, domain, or environment rollback is required because PR0 changes none of those systems.

For any later production release: preserve the last Ready Vercel deployment, verify apex and `www`, run the route smoke, validate customer and admin flows, and promote only after checks pass. Roll back by restoring the prior Ready deployment and reverting any separately versioned migration according to its written down migration.
