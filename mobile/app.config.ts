import type { ConfigContext, ExpoConfig } from "expo/config";

const BRAND_GRAPHICS =
  "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics";
const EMBLEM = `${BRAND_GRAPHICS}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;

export default ({ config }: ConfigContext): ExpoConfig => {
  const easProjectId = process.env.EAS_PROJECT_ID?.trim();

  return {
    ...config,
    name: "Kollective",
    slug: "kollective-customer",
    owner: process.env.EXPO_OWNER || undefined,
    version: "1.0.0",
    orientation: "portrait",
    icon: EMBLEM,
    scheme: "kollective",
    userInterfaceStyle: "dark",
    newArchEnabled: true,
    primaryColor: "#D8B04C",
    backgroundColor: "#050505",
    splash: {
      image: EMBLEM,
      resizeMode: "contain",
      backgroundColor: "#050505",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      enabled: true,
      checkAutomatically: "ON_LOAD",
      fallbackToCacheTimeout: 8000,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.kollective.customer",
      buildNumber: "1",
      associatedDomains: [
        "applinks:doctordorsey.com",
        "applinks:www.doctordorsey.com",
      ],
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      package: "com.kollective.customer",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: EMBLEM,
        backgroundColor: "#050505",
      },
      intentFilters: [
        {
          action: "VIEW",
          autoVerify: true,
          data: [
            { scheme: "https", host: "doctordorsey.com", pathPrefix: "/app" },
            { scheme: "https", host: "www.doctordorsey.com", pathPrefix: "/app" },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
    },
    plugins: [
      "expo-secure-store",
      "expo-video",
      [
        "expo-splash-screen",
        {
          image: EMBLEM,
          imageWidth: 260,
          resizeMode: "contain",
          backgroundColor: "#050505",
          dark: {
            image: EMBLEM,
            backgroundColor: "#050505",
          },
        },
      ],
    ],
    extra: {
      apiBaseUrl: "https://doctordorsey.com",
      ...(easProjectId ? { eas: { projectId: easProjectId } } : {}),
    },
  };
};
