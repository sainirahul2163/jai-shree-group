import { CtaBanner } from "@/components/shared/CtaBanner";
import { PageHero } from "@/components/shared/PageHero";
import type { ExportContent } from "@/sites/content/types";

/** "We deliver globally" page for manufacturing units; copy from the site's content. */
export function ExportPage({
  content,
  banner,
}: {
  content: ExportContent;
  banner: { title: string; text: string };
}) {
  const { hero, sections } = content;

  return (
    <>
      <PageHero
        label={hero.label}
        title={hero.title}
        subtitle={hero.subtitle}
        badges={hero.badges?.map((text) => ({ text }))}
      />
      <section className="section-padding" style={{ backgroundColor: "var(--surface)" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <div
              key={section.heading}
              className="rounded-xl border p-8"
              style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
            >
              <h2 className="text-xl font-black" style={{ color: "var(--foreground)" }}>
                {section.heading}
              </h2>
              <div className="mt-4 space-y-3">
                {section.paragraphs.map((text) => (
                  <p
                    key={text.slice(0, 24)}
                    className="text-base leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaBanner title={banner.title} text={banner.text} />
    </>
  );
}
