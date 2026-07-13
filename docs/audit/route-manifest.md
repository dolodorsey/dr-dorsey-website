# Route and deployment manifest

## Public surfaces

| Route | Entry point | Live result |
|---|---|---|
| `/` | `src/app/page.tsx` | 200 |
| `/book` | `src/app/book/page.tsx` | 307 to the Bodega product page (intentional App Router redirect) |
| `/brands` | `src/app/brands/page.tsx` | 200 |
| `/events` | `src/app/events/page.tsx` | 200 |
| `/shop` | `src/app/shop/page.tsx` | 200 |
| `/forms` | redirect/rewrite surface | 200 |
| `/enterprise` and `/enterprise/*` | Enterprise workspace | 200 |
| `/os/[lane]` | Canonical Ops lanes | sampled 200 |
| `/os/ig-connect`, `/os/ig-sessions` | Social connection controls | 200 |

## Ops OS surfaces

`/ops-os` plus the sections `social`, `marketing`, `approvals`, `content-studio`, `events`, `revenue`, `tasks`, `casper`, `mind-studio`, `products`, `tech`, `workers`, `codex`, and `departments` all returned HTTP 200 in the 2026-07-13 live smoke.

## API routes

| Route | Methods | Purpose |
|---|---|---|
| `/api/ops-os/config` | GET | Returns browser Supabase configuration |
| `/api/ops-os/data` | GET, POST, PATCH | Ops resources and mutations |
| `/api/ops-os/workers` | GET, POST | Worker health and authenticated controls |
| `/api/ops-os/worker-agent` | POST | Compatibility adapter to worker RPCs |
| `/api/enterprise/data` | GET, POST, PATCH | Enterprise resources and mutations |

## Vercel and domains

- Project: `dr-dorsey-website`
- Verified production deployment: `dpl_BrWVPnQLGiHrneRPL8vi4aVJDw4M`
- Verified production commit: `0e0555f475e4bea6b716e2073d59d174f20f677e`
- Primary aliases include `doctordorsey.com` and `www.doctordorsey.com`.
- Secondary aliases include the Dorsey birthday/event domains and Vercel project aliases.
- Apex and `www` currently serve the same experience; canonical-host/SEO policy remains a follow-up.
- Host-based redirects in `next.config.mjs` send `drdorseyevents.com` roots to `/events` and consolidate the secondary Ops host.
