# Kollective Customer — Native App

This directory contains the native Expo/React Native customer application. It is not a WebView wrapper and does not depend on the `/app` website for its interface.

## Live services

- Customer feed: `https://doctordorsey.com/api/customer/home`
- Universal-link companion route: `https://doctordorsey.com/app`
- Bundle identifier: `com.kollective.customer`
- Expo slug: `kollective-customer`

The app consumes the same controlled customer feed as the web hub while rendering native tabs, event cards, brand cards, filters, linking and video.

## Local verification

```bash
npm install --legacy-peer-deps
npm run type-check
npx expo config --type public
npx expo export --platform ios --output-dir dist-ios
```

## EAS setup

The Expo project must be linked once by an account with access:

```bash
EAS_PROJECT_ID=<real-project-id> EXPO_OWNER=<expo-owner> npx eas-cli@latest init
```

Store `EXPO_TOKEN`, `EAS_PROJECT_ID` and `EXPO_OWNER` as encrypted GitHub Actions secrets. Apple certificates, provisioning profiles and the App Store Connect API key must be stored in EAS/Apple credential storage, never committed to GitHub.

## TestFlight

After the EAS project and Apple app record exist, run the **Customer TestFlight** GitHub Actions workflow. It creates the signed iOS build and can submit the latest build to App Store Connect/TestFlight.
