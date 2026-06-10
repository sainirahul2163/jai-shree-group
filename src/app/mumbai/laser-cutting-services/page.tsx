import { locationMetadata, renderLocationPage } from "@/lib/location-page";

const PATH = "mumbai/laser-cutting-services";

export const metadata = locationMetadata(PATH);

export default function Page() {
  return renderLocationPage(PATH);
}
