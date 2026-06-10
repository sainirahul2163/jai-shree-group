import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/env";

/** Anonymous Supabase client for public inserts and reads (API routes, server queries). */
export function createAnonClient(): SupabaseClient {
  return createClient(getSupabaseUrl(), getSupabaseAnonKey());
}
