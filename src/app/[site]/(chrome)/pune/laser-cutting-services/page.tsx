import { locationMetadata, renderLocationPage } from "@/lib/location-page";
import type { SiteParams } from "@/sites/params";

const PATH = "pune/laser-cutting-services";

export function generateMetadata({ params }: SiteParams) {
  return locationMetadata(PATH, params);
}

export default function Page({ params }: SiteParams) {
  return renderLocationPage(PATH, params);
}
