import { PageBack, PageIndustries } from "./pages-back";
import { PageCover, PageHistory, PageIntro } from "./pages-front";
import {
  PageCustom,
  PageExpanded,
  PageExpandedCont,
  PageLaser,
  PageLeveling,
  PagePatterns,
  PagePerforated,
  PageTurret,
} from "./pages-products";

/**
 * The 13 sheets, in order. Shared so the plain and icon variants of the
 * Industries page can be compared without duplicating the page list.
 */
export function BrochureBody({ industryIcons = false }: { industryIcons?: boolean }) {
  return (
    <>
      <PageCover />
      <PageIntro />
      <PageHistory />
      <PagePerforated />
      <PagePatterns />
      <PageLaser />
      <PageExpanded />
      <PageExpandedCont />
      <PageTurret />
      <PageLeveling />
      <PageCustom />
      <PageIndustries icons={industryIcons} />
      <PageBack />
    </>
  );
}
