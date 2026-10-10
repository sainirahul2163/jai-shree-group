import { SiteChrome } from "@/components/layout/SiteChrome";

// Every public page except /landing and /brochure, which sit outside this
// route group and draw their own chrome.
export default function ChromeLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
