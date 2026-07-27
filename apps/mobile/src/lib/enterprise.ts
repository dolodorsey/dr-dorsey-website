import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, processLock, type Session } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import { AppState, Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://dzlmtvodpyhetvektfuo.supabase.co';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_ekvoOK6QQ05dUZuWgzQfUw_2RgbWPFR';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
});

if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });
}

export type Destination = {
  id: string;
  action_key: string;
  action_label: string;
  destination_type: string;
  internal_path?: string | null;
  web_url?: string | null;
  ios_store_url?: string | null;
  android_store_url?: string | null;
  deep_link_scheme?: string | null;
  universal_link?: string | null;
  fallback_url: string;
  is_primary: boolean;
};

export type Entity = {
  id: string;
  slug: string;
  name: string;
  category?: string | null;
  short_description?: string | null;
  status: string;
  status_label?: string | null;
  current_focus: boolean;
  logo_url?: string | null;
  hero_url?: string | null;
  website_url?: string | null;
  city_scope: string[];
  access_level: string;
  featured_priority: number;
  division_slug?: string | null;
  division_name?: string | null;
  destinations: Destination[];
};

export type ContentItem = {
  id: string;
  slug: string;
  content_type: string;
  title: string;
  summary?: string | null;
  body?: string | null;
  image_url?: string | null;
  priority: number;
  starts_at?: string | null;
  ends_at?: string | null;
};

export async function getCurrentFocus(): Promise<Entity[]> {
  const { data, error } = await supabase
    .from('kollective_public_entity_directory')
    .select('*')
    .eq('current_focus', true)
    .order('featured_priority', { ascending: true });
  if (error) throw error;
  return (data || []) as Entity[];
}

export async function getAllEntities(): Promise<Entity[]> {
  const { data, error } = await supabase
    .from('kollective_public_entity_directory')
    .select('*')
    .order('division_name', { ascending: true })
    .order('featured_priority', { ascending: true });
  if (error) throw error;
  return (data || []) as Entity[];
}

export async function getPublishedContent(): Promise<ContentItem[]> {
  const { data, error } = await supabase
    .from('kollective_public_content')
    .select('id,slug,content_type,title,summary,body,image_url,priority,starts_at,ends_at')
    .eq('is_published', true)
    .order('priority', { ascending: true });
  if (error) throw error;
  return (data || []) as ContentItem[];
}

function platformName(): 'ios' | 'android' | 'web' {
  if (Platform.OS === 'ios') return 'ios';
  if (Platform.OS === 'android') return 'android';
  return 'web';
}

export async function resolveAndOpen(entitySlug: string, sourceScreen: string, sourceCampaign?: string): Promise<string> {
  const { data: sessionData } = await supabase.auth.getSession();
  const { data, error } = await supabase.rpc('kollective_resolve_destination', {
    p_entity_slug: entitySlug,
    p_platform: platformName(),
    p_action_key: 'primary',
    p_session_id: sessionData.session?.access_token?.slice(-24) || null,
    p_user_id: sessionData.session?.user.id || null,
    p_source_screen: sourceScreen,
    p_source_campaign: sourceCampaign || null,
    p_city: null,
    p_metadata: { app: 'the-kollective', app_version: Constants.expoConfig?.version },
  });
  if (error) throw error;

  const result = Array.isArray(data) ? data[0] : data;
  const deepLink = result?.deep_link_scheme as string | null | undefined;
  const resolvedUrl = result?.resolved_url as string | undefined;

  if (deepLink && result?.destination_type === 'app_store') {
    try {
      if (await Linking.canOpenURL(deepLink)) {
        await Linking.openURL(deepLink);
        return deepLink;
      }
    } catch {
      // Continue to the store URL or approved fallback.
    }
  }

  const destination = resolvedUrl || 'https://thekollectivehospitality.com';
  await Linking.openURL(destination);
  return destination;
}

export async function signInWithEmail(email: string) {
  return supabase.auth.signInWithOtp({
    email: email.trim().toLowerCase(),
    options: { emailRedirectTo: Linking.createURL('/profile') },
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function registerPushToken(userId: string): Promise<string | null> {
  const platform = platformName();
  if (!Device.isDevice || platform === 'web') return null;

  const existing = await Notifications.getPermissionsAsync();
  let status = existing.status;
  if (status !== 'granted') status = (await Notifications.requestPermissionsAsync()).status;
  if (status !== 'granted') return null;

  const projectId = Constants.expoConfig?.extra?.eas?.projectId || Constants.easConfig?.projectId;
  if (!projectId) return null;

  const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  const { error } = await supabase.from('kollective_app_push_tokens').upsert(
    {
      user_id: userId,
      expo_push_token: token,
      platform,
      is_active: true,
      last_seen_at: new Date().toISOString(),
    },
    { onConflict: 'expo_push_token' },
  );
  if (error) throw error;
  return token;
}
