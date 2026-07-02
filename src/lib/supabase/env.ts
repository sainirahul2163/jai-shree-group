export function getSupabaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    "https://placeholder.supabase.co"
  );
}

export function getSupabaseAnonKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "placeholder-anon-key"
  );
}

export const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return (
    !!url &&
    !!anonKey &&
    !url.includes("placeholder") &&
    !url.includes("your-supabase") &&
    url.startsWith("https://") &&
    url.includes(".supabase.co") &&
    anonKey.length > 30
  );
};
