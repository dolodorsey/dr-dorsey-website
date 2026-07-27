# KOLLECTIVE APP FOUNDATION — IMPLEMENTATION REPORT

**Implementation date:** July 27, 2026  
**Status:** Core foundation completed

## 1. Managed Supabase Registry

Production Supabase project: `dzlmtvodpyhetvektfuo`

Created and activated:

- `kollective_public_divisions`
- `kollective_public_entities`
- `kollective_public_destinations`
- `kollective_public_content`
- `kollective_public_entity_directory`
- `kollective_app_profiles`
- `kollective_app_preferences`
- `kollective_app_push_tokens`
- `kollective_app_saved_items`
- `kollective_public_cta_events`

The registry currently contains:

- Eight enterprise divisions
- Twenty current-focus entities
- Black Pages as a prelaunch standalone-app destination
- One primary CTA destination for every seeded entity
- One published enterprise-app early-access content record

Controlled public statuses:

```text
operating
active
available_now
launching
building
seasonal
portfolio_ip
paused
archived
private
```

Row Level Security is enabled. Public users may only read public entities, active destinations and published content. Authenticated users may only manage their own profiles, preferences, push tokens and saved items.

## 2. Smart CTA Resolver

Production database function:

```text
kollective_resolve_destination
```

The resolver:

1. Finds the requested public entity.
2. Loads the requested active destination.
3. Detects iOS, Android or web routing intent.
4. Selects an internal path, website, checkout, reservation, app-store listing or approved fallback.
5. Returns the resolved destination.
6. Records attribution in `kollective_public_cta_events`.

Production web route:

```text
/go/[slug]
```

Examples:

```text
/go/hakuna-matata
/go/rose-on-piedmont
/go/grown-ish
/go/good-times
/go/black-pages
```

Black Pages is configured as `app_store`. Its Apple and Google store URLs remain blank until approved listings exist. Current behavior routes users to the approved early-access form rather than a fake or broken store page.

Validated outcomes:

- Hakuna Matata → approved Shopify checkout
- Black Pages on iOS → approved early-access fallback while store URL is unavailable
- Black Pages on web → approved early-access fallback
- CTA source, campaign, platform and destination are recorded

## 3. Live Website Integration

The Dr. Dorsey and Kollective sites now request current-focus data from:

```text
/api/enterprise/registry?current_focus=true
```

The response is uncached and database-managed. The sites retain a static emergency fallback, but normal production behavior reads entity names, statuses, priorities, logos and destinations from Supabase.

All live registry cards route through `/go/[slug]` for consistent destination logic and attribution.

## 4. Expo Mobile Scaffold

Location:

```text
apps/mobile
```

Included:

- Expo SDK 57 configuration
- React Native 0.86 scaffold
- Expo Router
- Five-tab navigation
- Home
- Explore
- Actions
- Notifications
- Profile
- Supabase passwordless email authentication
- Session persistence
- Current-focus directory
- Full-enterprise search
- Database-driven content inbox
- Device-aware CTA resolver
- Deep-link attempt before app-store fallback
- User profile and home-city persistence
- Expo push-token registration foundation
- EAS build profiles
- Environment template
- Mobile runbook

## 5. Remaining Account-Level Setup

These steps require the authenticated Expo, Apple Developer and Google Play accounts and cannot be completed by repository code alone:

1. Run `eas init` and generate the EAS project ID.
2. Add iOS and Android signing credentials.
3. Build a physical-device development client.
4. Configure Apple and Google social-login credentials if those login methods are enabled.
5. Create Black Pages App Store and Google Play listings.
6. Insert approved store URLs into `kollective_public_destinations`.
7. Submit production builds after device QA and legal review.

## 6. Production Verification

Verified:

- Vercel production deployment is READY.
- Registry API returns 20 current-focus entities on both public domains.
- Black Pages route reaches the approved fallback.
- Hakuna Matata resolves to the approved checkout.
- CTA events are written to Supabase.
- No new production error logs appeared after the resolver correction.
