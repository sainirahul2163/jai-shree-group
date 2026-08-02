import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

import { isAdminEmail } from "@/lib/admin";
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

  // getUser() re-validates the JWT with the auth server (getSession only
  // trusts the cookie). We then gate on the admin allow-list, not merely
  // "is someone logged in" — any Supabase user must NOT reach the panel.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = isAdminEmail(user?.email);

  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  // Every admin route except the login page requires an allow-listed admin.
  // Non-admins (including logged-in-but-not-admin users) go to the login page;
  // because the login page itself never redirects non-admins, there is no loop.
  if (pathname.startsWith("/admin") && !isLoginPage && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Already-authenticated admins skip the login page.
  if (isLoginPage && isAdmin) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
