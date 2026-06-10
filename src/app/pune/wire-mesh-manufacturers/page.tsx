import { locationMetadata, renderLocationPage } from "@/lib/location-page";

const PATH = "pune/wire-mesh-manufacturers";

export const metadata = locationMetadata(PATH);

export default function Page() {
  return renderLocationPage(PATH);
}
