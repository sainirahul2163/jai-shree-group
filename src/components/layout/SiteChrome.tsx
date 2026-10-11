import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageViewTracker } from "@/components/shared/PageViewTracker";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

/** Navbar, main, Footer, WhatsApp button and page tracker around a page. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex-1 bg-background">{children}</main>
      <Footer />
      <WhatsAppButton />
      <PageViewTracker />
    </>
  );
}
