# The Kollective Mobile App

One account. The whole enterprise. Immediate action.

## Included in this scaffold

- Expo SDK 57 + React Native 0.86
- Expo Router five-tab navigation
- Home, Explore, Actions, Inbox and Profile
- Supabase passwordless email authentication
- Managed enterprise registry
- Current-focus and full-enterprise discovery
- Device-aware CTA resolution
- Black Pages deep-link / app-store / waitlist routing
- In-app enterprise content inbox
- User profile and home-city personalization foundation
- Expo push-token registration foundation
- EAS development, preview and production profiles

## Run locally

```bash
cd apps/mobile
cp .env.example .env
npm install
npx expo install --fix
npx expo start --clear
```

Use Node.js 22.13 or newer for Expo SDK 57.

## First native build

```bash
npm install -g eas-cli
eas login
eas init
```

After `eas init`, copy the generated EAS project ID into `expo.extra.eas.projectId` in `app.json`. Then run:

```bash
eas build --profile development --platform all
```

A development build is required for reliable push-notification and custom-scheme testing.

## Data source

The app reads from these managed Supabase resources:

- `kollective_public_divisions`
- `kollective_public_entities`
- `kollective_public_destinations`
- `kollective_public_entity_directory`
- `kollective_public_content`
- `kollective_app_profiles`
- `kollective_app_preferences`
- `kollective_app_push_tokens`
- `kollective_app_saved_items`
- `kollective_public_cta_events`

Public registry tables are read-only to anonymous users. User profile, preference, saved-item and push-token records are protected by Row Level Security.

## CTA routing

All actions call the Supabase function:

```text
kollective_resolve_destination
```

Routing order:

1. Try the standalone app deep link when applicable.
2. Use the iOS App Store URL on iPhone/iPad.
3. Use the Google Play URL on Android.
4. Use the approved web or waitlist fallback.
5. Record the CTA event and source attribution.

Black Pages is currently configured as prelaunch. Its App Store and Google Play URLs remain null until approved listings exist, so users are routed to the early-access fallback instead of a fake or broken store page.

## Next engineering release

- Add Apple and Google social login credentials.
- Complete EAS project and notification credentials.
- Add city and interest onboarding.
- Add favorites and saved items UI.
- Build the Supabase publishing dashboard.
- Add universal/deferred links for standalone apps.
- Add store listing URLs only after each app is approved.
