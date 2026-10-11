"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function PageViewTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string>("");

  useEffect(() => {
    // usePathname() only signals a navigation. Read the browser URL itself:
    // the proxy rewrites pages to /<site>/…, which visitors never see.
    const page = window.location.pathname;
    if (!pathname || lastTracked.current === page) return;
    lastTracked.current = page;

    const productMatch = page.match(/^\/products\/([^/]+)/);
    const cityMatch = page.match(/^\/(pune|mumbai)\//);

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page,
        product: productMatch?.[1] ?? null,
        city: cityMatch?.[1] ?? null,
      }),
    }).catch(() => {
      // Analytics should never block the UI.
    });
  }, [pathname]);

  return null;
}
