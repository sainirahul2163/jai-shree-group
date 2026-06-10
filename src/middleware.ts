import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/env";

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({ request: req });

  if (!getSupabaseUrl() || !getSupabaseAnonKey()) {
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextUrl.pathname !== "/admin/login"
    ) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return response;
  }

  const supabase = createServerClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            req.cookies.set(name, value);
          });
          response = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    req.nextUrl.pathname !== "/admin/login"
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  if (req.nextUrl.pathname === "/admin/login" && session) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
