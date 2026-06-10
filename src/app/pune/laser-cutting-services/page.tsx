import { locationMetadata, renderLocationPage } from "@/lib/location-page";

const PATH = "pune/laser-cutting-services";

export const metadata = locationMetadata(PATH);

export default function Page() {
  return renderLocationPage(PATH);
}
