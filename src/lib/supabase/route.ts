import { createServerClient as createSupabaseServerClient } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/env";

/** Supabase client for Route Handlers (API routes). */
export async function createRouteClient(): Promise<SupabaseClient> {
  const cookieStore = await cookies();

  return createSupabaseServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Route handler cookie writes may be limited in some contexts.
        }
      },
    },
  });
}
