# Public versus repository baseline

## Resolved mismatch

The V2 handoff identified commit `e336eaf1a389f90b3616e010f976ed70e2883b8f`. Live Vercel build metadata identified `0e0555f475e4bea6b716e2073d59d174f20f677e` as the deployed commit at audit time. That commit adds the `/book` alias, a home-page book CTA, and a `$44.44` product fallback.

During PR preparation, GitHub `main` advanced through `9283589e25f35ded1e0ec74418ac7298dceeff3a`, changing `/book` to redirect directly to the Bodega product and cleaning the image hostname allowlist. PR0 was rebased onto that target so it remains additive and does not undo either change.

## Live parity checks

- Public and Ops routes in `route-manifest.md` returned HTTP 200 on both apex and `www`, except the intentional `/book` App Router redirect (307).
- `/api/ops-os/config`, selected `/api/ops-os/data` resources, and `/api/ops-os/workers` returned successful anonymous responses.
- A deliberately invalid worker control request failed safely with HTTP 400.
- Vercel is Ready and production aliases resolve to the same deployment family.

## Known limitations

HTTP success does not prove authenticated create/update flows, third-party checkout completion, Meta OAuth completion, or worker job execution. Those need credentialed test users and controlled fixtures in later PRs. PR0 avoids mutating production records.
