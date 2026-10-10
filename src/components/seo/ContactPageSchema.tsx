import { siteUrl } from "@/lib/seo";
import type { SiteConfig } from "@/sites/types";

import { geoCoordinates, postalAddress, telephone } from "./schema-parts";

const WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

/** "9:00 AM – 6:00 PM" → ["09:00", "18:00"]; undefined when the hours are not in that form. */
function parseHours(hours: string | undefined): [string, string] | undefined {
  const match = hours?.match(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)$/i
  );
  if (!match) return undefined;
  const to24 = (h: string, m: string, half: string) => {
    const hour = (Number(h) % 12) + (half.toUpperCase() === "PM" ? 12 : 0);
    return `${String(hour).padStart(2, "0")}:${m}`;
  };
  return [to24(match[1], match[2], match[3]), to24(match[4], match[5], match[6])];
}

function openingHours(site: SiteConfig) {
  const holiday = site.contact.weeklyHoliday;
  const hours = parseHours(site.contact.hours);
  const closed = {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [holiday],
    opens: "00:00",
    closes: "00:00",
  };
  if (!hours) return [closed];
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: WEEK.filter((day) => day !== holiday),
      opens: hours[0],
      closes: hours[1],
    },
    closed,
  ];
}

export function ContactPageSchema({ site }: { site: SiteConfig }) {
  const contactUrl = siteUrl(site, "/contact");
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    image: siteUrl(site, site.seo.ogImage),
    "@id": contactUrl,
    url: contactUrl,
    telephone: telephone(site),
    email: site.contact.email,
    address: postalAddress(site),
    geo: geoCoordinates(site),
    openingHoursSpecification: openingHours(site),
    priceRange: site.seo.schema?.priceRange,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
