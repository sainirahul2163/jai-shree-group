/* eslint-disable @next/next/no-img-element */
import {
  CONSULTANCY_QUOTE,
  CUSTOM,
  EXPANDED,
  LASER,
  LEVELING,
  OPEN_AREA_FORMULAS,
  PATTERNS,
  PERFORATED,
  TURRET,
} from "@/data/brochure";

import { ExpandedTerminologyDiagram, FormulaDiagram, PatternSwatch } from "./graphics";
import { Field, NumList, Quote, Sheet, SqList, Tag } from "./kit";

/**
 * Product page template, following the 2022 brochure: photograph across the
 * top, orange section banner, then Material / Categories / Characteristics /
 * Application, and the numbered "Our Strength" list.
 */
function ProductPage({
  page,
  title,
  image,
  caption,
  imageHeight,
  material,
  categories,
  categoriesLabel = "Categories",
  characteristics,
  characteristicsLabel,
  application,
  strengths,
  quote = false,
}: {
  page: number;
  title: string;
  image: string;
  caption: string;
  imageHeight: string;
  material: string;
  categories: string;
  categoriesLabel?: string;
  characteristics: string;
  characteristicsLabel: string;
  application: string;
  strengths: readonly string[];
  quote?: boolean;
}) {
  return (
    <Sheet page={page} foot={title}>
      <figure className="shot" style={{ height: imageHeight }}>
        <img src={image} alt={caption} />
        <figcaption className="shot__cap">{caption}</figcaption>
      </figure>

      <div className="pad pad--tight">
        <Tag>{title}</Tag>
        <Field k="Material">{material}</Field>
        <Field k={categoriesLabel}>{categories}</Field>
        <Field k={characteristicsLabel}>{characteristics}</Field>
        <Field k="Application">{application}</Field>

        <div className="field__k mb-[2.4mm]">Our Strength</div>
        <NumList items={strengths} />

        {quote && (
          <div className="mt-auto pb-[4mm]">
            <Quote>{CONSULTANCY_QUOTE}</Quote>
          </div>
        )}
      </div>
    </Sheet>
  );
}

/* ══════════════ 04 · Perforated Sheet ══════════════ */

export function PagePerforated() {
  return (
    <ProductPage
      page={4}
      title="Perforated Sheet"
      image="/brochure/img/perforated-collage.jpg"
      caption="Perforated sheets — round, square, hexagonal and slotted"
      imageHeight="62mm"
      material={PERFORATED.material}
      categories={PERFORATED.categories}
      characteristics={PERFORATED.characteristics}
      characteristicsLabel="The Characteristics of Perforated Sheet"
      application={PERFORATED.application}
      strengths={PERFORATED.strengths}
    />
  );
}

/* ══════════════ 05 · Patterns & open area ══════════════ */

export function PagePatterns() {
  return (
    <Sheet page={5} foot="Perforation Patterns">
      <div className="pad">
        <Tag>Perforation Patterns</Tag>

        <div className="grid grid-cols-5 gap-x-[4mm] gap-y-[4mm]">
          {PATTERNS.map((p) => (
            <PatternSwatch key={p.id} id={p.id} label={p.label} />
          ))}
        </div>

        <div className="mt-[7mm]">
          <Tag>Formula for Calculation of Open Area</Tag>

          <div className="grid grid-cols-2 gap-x-[8mm] gap-y-[4mm]">
            {OPEN_AREA_FORMULAS.map((f) => (
              <div key={f.label} className="border-t border-[var(--rule)] pt-[3mm]">
                <div className="mb-[2.4mm] flex items-start justify-between gap-[4mm]">
                  <div className="h3" style={{ fontSize: "13px" }}>
                    {f.label}
                  </div>
                  <FormulaDiagram kind={f.diagram} />
                </div>
                <div className="flex items-center gap-[2.4mm]" style={{ whiteSpace: "nowrap" }}>
                  <span className="small" style={{ fontWeight: 600, color: "var(--ink-2)" }}>
                    % Open Area
                  </span>
                  <span className="mono" style={{ color: "var(--ink-3)" }}>
                    =
                  </span>
                  <span className="inline-grid justify-items-center">
                    <span
                      className="mono"
                      style={{ fontSize: "11.5px", fontWeight: 700, padding: "0 2.4mm 0.5mm" }}
                    >
                      {f.numerator}
                    </span>
                    <span
                      className="mono"
                      style={{
                        fontSize: "11.5px",
                        fontWeight: 700,
                        padding: "0.8mm 2.4mm 0",
                        borderTop: "1.6px solid var(--orange)",
                        color: "var(--ink-2)",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      {f.denominator}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pb-[4mm]">
          <Quote>{CONSULTANCY_QUOTE}</Quote>
        </div>
      </div>
    </Sheet>
  );
}

/* ══════════════ 06 · Laser Cutting ══════════════ */

export function PageLaser() {
  return (
    <ProductPage
      page={6}
      title="Laser Cutting"
      image="/brochure/img/laser.jpg"
      caption="Fiber laser cutting — Talawade, Pune"
      imageHeight="96mm"
      material={LASER.material}
      categories={LASER.categories}
      characteristics={LASER.characteristics}
      characteristicsLabel="The Characteristics of Laser Cutting"
      application={LASER.application}
      strengths={LASER.strengths}
    />
  );
}

/* ══════════════ 07 · Expanded Metal ══════════════ */

export function PageExpanded() {
  return (
    <Sheet page={7} foot="Expanded Metal">
      <div className="pad">
        <Tag>Expanded Metal</Tag>

        <div className="grid grid-cols-2 gap-x-[9mm]">
          <div>
            <Field k="Material">{EXPANDED.material}</Field>
            <Field k="Expanding Shapes / Design">{EXPANDED.shapes}</Field>
          </div>
          <Field k="Application">{EXPANDED.application}</Field>
        </div>

        <Field k="Expanded Metal Benefits">{EXPANDED.benefits}</Field>

        <div className="grid grid-cols-2 gap-x-[9mm]">
          <p className="body">
            <strong style={{ color: "var(--orange)" }}>Minimum Waste </strong>
            {EXPANDED.minimumWaste}
          </p>
          <p className="body">
            <strong style={{ color: "var(--orange)" }}>Cost Saving </strong>
            {EXPANDED.costSaving}
          </p>
        </div>

        <div
          className="my-[4mm] px-[5mm] py-[2.4mm] text-center"
          style={{
            background: "var(--orange)",
            color: "#fff",
            fontSize: "12.5px",
            fontWeight: 800,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Special designs and sizes are also available at customer&rsquo;s request
        </div>

        <div className="grid flex-1 grid-cols-4 grid-rows-3 gap-[2.4mm]" style={{ minHeight: 0 }}>
          {[1, 2, 3, 4, 5, 6, 8, 9, 11, 12, 15, 16].map((i) => (
            <figure key={i} className="shot">
              <img src={`/brochure/img/expanded-${i}.jpg`} alt={`Expanded metal design ${i}`} />
            </figure>
          ))}
        </div>
        <div className="h-[4mm]" />
      </div>
    </Sheet>
  );
}

/* ══════════════ 08 · Expanded Metal continued ══════════════ */

export function PageExpandedCont() {
  return (
    <Sheet page={8} foot="Expanded Metal">
      <div className="pad">
        <div className="grid h-[54mm] grid-cols-3 gap-[3mm]">
          <figure className="shot">
            <img src="/brochure/img/em-brass.jpg" alt="Brass expanded metal" />
          </figure>
          <figure className="shot">
            <img src="/brochure/img/em-red-flat.jpg" alt="Powder coated expanded metal" />
          </figure>
          <figure className="shot">
            <img src="/brochure/img/em-black.jpg" alt="Diamond expanded metal detail" />
          </figure>
        </div>

        <div className="mt-[6mm] grid grid-cols-2 gap-x-[9mm]">
          <div>
            <p className="body mb-[3mm]">
              <strong style={{ color: "var(--orange)" }}>Aesthetics </strong>
              {EXPANDED.aesthetics}
            </p>
            <p className="body mb-[3mm]">
              <strong style={{ color: "var(--orange)" }}>Strength to weight ratio </strong>
              {EXPANDED.strengthToWeight}
            </p>
            <p className="body">
              <strong style={{ color: "var(--orange)" }}>Anti-skid. </strong>
              {EXPANDED.antiSkid}
            </p>
          </div>

          <div>
            <div className="field__k mb-[2.4mm]">Expanded Metal Terminology</div>
            <dl className="grid gap-[1.4mm]">
              {EXPANDED.terminology.map(([term, def]) => (
                <div key={term} className="grid grid-cols-[30mm_1fr] gap-[3mm]">
                  <dt style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink)" }}>{term}</dt>
                  <dd style={{ fontSize: "12.5px", lineHeight: 1.45, color: "var(--ink-2)" }}>{def}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-[6mm] grid grid-cols-[1fr_74mm] items-start gap-[9mm]">
          <div>
            <div className="field__k mb-[2.4mm]">Technical Notes</div>
            <SqList items={EXPANDED.technicalNotes} />
          </div>
          <ExpandedTerminologyDiagram />
        </div>

        <div className="mt-auto pb-[4mm]">
          <Quote>{CONSULTANCY_QUOTE}</Quote>
        </div>
      </div>
    </Sheet>
  );
}

/* ══════════════ 09 · Turret Punching ══════════════ */

export function PageTurret() {
  return (
    <ProductPage
      page={9}
      title="Turret Punching"
      image="/gallery/perforated-round-blank.jpg"
      caption="CNC turret punched blank — round hole, 60° staggered"
      imageHeight="86mm"
      material={TURRET.material}
      categories={TURRET.categories}
      characteristics={TURRET.characteristics}
      characteristicsLabel="The Characteristics of Turret Punching"
      application={TURRET.application}
      strengths={TURRET.strengths}
    />
  );
}

/* ══════════════ 10 · Precision Sheet Leveling ══════════════ */

export function PageLeveling() {
  return (
    <ProductPage
      page={10}
      title="Precision Sheet Leveling"
      image="/gallery/perforated-coil-stock.jpg"
      caption="Coil-to-coil stock — leveled in-house"
      imageHeight="86mm"
      material={LEVELING.material}
      categories={LEVELING.categories}
      categoriesLabel="Process"
      characteristics={LEVELING.characteristics}
      characteristicsLabel="The Characteristics of Sheet Leveling"
      application={LEVELING.application}
      strengths={LEVELING.strengths}
    />
  );
}

/* ══════════════ 11 · Custom Components ══════════════ */

export function PageCustom() {
  return (
    <ProductPage
      page={11}
      title="Custom Components"
      image="/gallery/perforated-fine-blank.jpg"
      caption="Micro-perforated custom screen"
      imageHeight="76mm"
      material={CUSTOM.material}
      categories={CUSTOM.categories}
      categoriesLabel="Process"
      characteristics={CUSTOM.characteristics}
      characteristicsLabel="Special Jobs We Undertake"
      application={CUSTOM.application}
      strengths={CUSTOM.strengths}
      quote
    />
  );
}
