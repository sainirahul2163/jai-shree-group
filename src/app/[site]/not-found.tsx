import { SiteChrome } from "@/components/layout/SiteChrome";
import { NotFoundView } from "@/components/status/NotFoundView";

// 404 for paths no page matches ([...rest]). It sits outside (chrome), so it
// draws the chrome itself.
export default function NotFound() {
  return (
    <SiteChrome>
      <NotFoundView />
    </SiteChrome>
  );
}
