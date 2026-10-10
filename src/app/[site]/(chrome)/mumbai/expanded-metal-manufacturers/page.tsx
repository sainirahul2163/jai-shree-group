import { locationMetadata, renderLocationPage } from "@/lib/location-page";
import type { SiteParams } from "@/sites/params";

const PATH = "mumbai/expanded-metal-manufacturers";

export function generateMetadata({ params }: SiteParams) {
  return locationMetadata(PATH, params);
}

export default function Page({ params }: SiteParams) {
  return renderLocationPage(PATH, params);
}
