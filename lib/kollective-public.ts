export const KOLLECTIVE_SUPABASE_URL =
  process.env.NEXT_PUBLIC_KOLLECTIVE_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://dzlmtvodpyhetvektfuo.supabase.co';

export const KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_ekvoOK6QQ05dUZuWgzQfUw_2RgbWPFR';

export type RegistryDestination = {
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

export type RegistryEntity = {
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
  destinations: RegistryDestination[];
};
