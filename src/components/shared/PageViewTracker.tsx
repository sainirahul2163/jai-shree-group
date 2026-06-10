"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function PageViewTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string>("");

  useEffect(() => {
    if (!pathname || lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    const productMatch = pathname.match(/^\/products\/([^/]+)/);
    const cityMatch = pathname.match(/^\/(pune|mumbai)\//);

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: pathname,
        product: productMatch?.[1] ?? null,
        city: cityMatch?.[1] ?? null,
      }),
    }).catch(() => {
      // Analytics should never block the UI.
    });
  }, [pathname]);

  return null;
}
