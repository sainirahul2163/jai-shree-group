import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

import { isAdminEmail } from "@/lib/admin";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/env";
import { findSite } from "@/sites";
import { domains } from "@/sites/domains";
import { isSiteKey } from "@/sites/keys";
import type { SiteKey } from "@/sites/types";

async function adminGate(req: NextRequest) {
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

const SITE_COOKIE = "site";
const LOCAL_SUFFIX = ".localhost";

/**
 * Host → site key. Production hosts come from domains.ts; `<key>.localhost`
 * selects a site locally. Any other host (plain localhost, Vercel previews)
 * is the group site unless `?site=<key>` chose one — remembered in a cookie.
 * Production domains never honour the query or the cookie.
 */
function resolveSite(req: NextRequest): { key: SiteKey; remember?: SiteKey } {
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();

  const production = (domains as Record<string, SiteKey>)[host];
  if (production) return { key: production };

  if (host.endsWith(LOCAL_SUFFIX)) {
    const sub = host.slice(0, -LOCAL_SUFFIX.length);
    if (isSiteKey(sub)) return { key: sub };
  }

  const query = req.nextUrl.searchParams.get("site");
  if (query && isSiteKey(query)) return { key: query, remember: query };

  const cookie = req.cookies.get(SITE_COOKIE)?.value;
  if (cookie && isSiteKey(cookie)) return { key: cookie };

  return { key: "group" };
}

/**
 * Each site's /sitemap.xml and /robots.txt are served by route handlers at
 * /<key>/site-sitemap and /<key>/site-robots. The folders must not be named
 * sitemap.xml or robots.txt: Next treats those names as metadata routes, and
 * Vercel's build adapter then fails with "failed to find source route".
 */
const SITE_FILES = new Map([
  ["/sitemap.xml", "/site-sitemap"],
  ["/robots.txt", "/site-robots"],
]);

/** No route has this segment, so a path under it lands on [site]/[...rest] (a real 404). */
const NO_PAGE = "/__no-page";

/**
 * Path under /<key> for a request. A first segment the site does not enable
 * in config.pages goes to NO_PAGE. A path that already names a site
 * (/group/about, /shree-perforators) also 404s, so one site is never
 * reachable under another site's domain.
 */
function sitePath(key: SiteKey, pathname: string): string {
  if (pathname === "/") return "";
  const siteFile = SITE_FILES.get(pathname);
  if (siteFile) return siteFile;
  const [, firstSegment, slug] = pathname.split("/");
  const site = findSite(key);
  if (!site?.pages.includes(`/${firstSegment}`)) return `${NO_PAGE}${pathname}`;
  // A product or industry the site does not list 404s too, so a unit site never
  // serves the group's other products or industries.
  if (slug && firstSegment === "products" && !(site.products as string[]).includes(slug)) {
    return `${NO_PAGE}${pathname}`;
  }
  if (slug && firstSegment === "industries" && !site.industries.includes(slug)) {
    return `${NO_PAGE}${pathname}`;
  }
  return pathname;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return adminGate(req);
  }

  const { key, remember } = resolveSite(req);

  let response: NextResponse;
  if (pathname === "/api" || pathname.startsWith("/api/")) {
    // API routes stay at the root; they read the site from this header.
    const headers = new Headers(req.headers);
    headers.set("x-site", key);
    response = NextResponse.next({ request: { headers } });
  } else {
    // Every page lives under /<key>.
    const url = req.nextUrl.clone();
    url.pathname = `/${key}${sitePath(key, pathname)}`;
    response = NextResponse.rewrite(url);
  }

  if (remember) {
    response.cookies.set(SITE_COOKIE, remember, { path: "/", sameSite: "lax" });
  }
  return response;
}

export const config = {
  // Everything except Next internals and files (anything whose last segment
  // has a dot: icons, public/ assets), plus the per-site sitemap and robots.
  // /<key>/sitemap.xml and /<key>/robots.txt are matched too, so they 404
  // instead of resolving under another site's domain.
  matcher: [
    "/((?!_next/|__nextjs|.*\\.[^/]+$).*)",
    "/sitemap.xml",
    "/robots.txt",
    "/:site/sitemap.xml",
    "/:site/robots.txt",
  ],
};
