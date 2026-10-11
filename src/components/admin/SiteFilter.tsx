"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SITE_OPTIONS } from "@/sites/names";
import type { SiteKey } from "@/sites/types";

const ALL = "all";

/** Site filter for admin lists. Lives in the URL as `?site=`; no value = all sites. */
export function SiteFilter({ value }: { value: SiteKey | null }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select
      value={value ?? ALL}
      onValueChange={(next) => {
        const params = new URLSearchParams(window.location.search);
        if (next === ALL) params.delete("site");
        else params.set("site", next);
        params.delete("page");
        const qs = params.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname);
      }}
    >
      <SelectTrigger
        className="w-60 border-[#2A2A2A] bg-[#111111]"
        aria-label="Filter by site"
      >
        <SelectValue placeholder="Site" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>All sites</SelectItem>
        {SITE_OPTIONS.map((s) => (
          <SelectItem key={s.key} value={s.key}>
            {s.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/** Site picker for admin create/edit forms. */
export function SiteSelect({
  value,
  onChange,
  className,
}: {
  value: SiteKey;
  onChange: (site: SiteKey) => void;
  className?: string;
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as SiteKey)}>
      <SelectTrigger className={className} aria-label="Site">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SITE_OPTIONS.map((s) => (
          <SelectItem key={s.key} value={s.key}>
            {s.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
