import { locationMetadata, renderLocationPage } from "@/lib/location-page";

const PATH = "pune/expanded-metal-manufacturers";

export const metadata = locationMetadata(PATH);

export default function Page() {
  return renderLocationPage(PATH);
}
