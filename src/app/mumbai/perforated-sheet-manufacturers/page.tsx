import { locationMetadata, renderLocationPage } from "@/lib/location-page";

const PATH = "mumbai/perforated-sheet-manufacturers";

export const metadata = locationMetadata(PATH);

export default function Page() {
  return renderLocationPage(PATH);
}
