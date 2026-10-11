import { siteName } from "@/sites/names";

export function SiteBadge({ site }: { site: string }) {
  return (
    <span
      className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.08)", color: "#A0A0A0" }}
      title={site}
    >
      {siteName(site)}
    </span>
  );
}
