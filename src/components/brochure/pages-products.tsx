/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

import {
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
import { Caps, Masthead, Sheet, Spec } from "./kit";

/* ══════════════ 06 · Capabilities divider ══════════════ */

const CAPABILITIES = [
  ["01", "Perforated Sheets", "CNC, turret and coil-to-coil perforation up to 12mm plate."],
  ["02", "Laser Cutting", "Fiber laser cutting to any drawing, up to 14mm plate."],
  ["03", "Expanded Metal", "Diamond, square, hexagonal and grating patterns."],
  ["04", "Turret Punching", "Any hole shape, combined with laser for cost saving."],
  ["05", "Precision Sheet Leveling", "Bow and warpage control to tight flatness tolerances."],
  ["06", "Custom Components", "Special dies, tools and machinery built to requirement."],
] as const;

export function PageCapabilities() {
  return (
    <Sheet dark foot="Our Capabilities" page={6}>
      <div
        className="glow"
        style={{
          right: "-36mm",
          bottom: "-24mm",
          width: "125mm",
          height: "125mm",
          background: "radial-gradient(circle, rgba(232,82,26,0.24), transparent 68%)",
        }}
      />
      <div className="pad relative">
        <Masthead no="04" kicker="What we manufacture" title="Six capabilities, one group" />

        <p className="lead mb-[9mm]" style={{ maxWidth: "142mm" }}>
          Every process runs in-house across our own plants — so tooling, perforation,
          cutting and finishing stay under one quality system, on one schedule.
        </p>

        <div className="grid gap-0">
          {CAPABILITIES.map(([no, name, desc]) => (
            <div
              key={no}
              className="grid grid-cols-[14mm_1fr_78mm] items-baseline gap-[6mm] border-t border-[var(--dark-rule)] py-[5.4mm]"
            >
              <span className="secno">{no}</span>
              <span className="h3" style={{ color: "#fff" }}>
                {name}
              </span>
              <span className="body" style={{ fontSize: "13px" }}>
                {desc}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-3 gap-[3mm] pb-[2mm]">
          {["/brochure/img/perforated-collage.jpg", "/brochure/img/laser.jpg", "/brochure/img/em-brass.jpg"].map(
            (src) => (
              <figure key={src} className="shot" style={{ height: "44mm" }}>
                <img src={src} alt="" />
              </figure>
            ),
          )}
        </div>
      </div>
    </Sheet>
  );
}

/* ══════════════ shared product template ══════════════ */

function ProductPage({
  no,
  title,
  kicker,
  page,
  image,
  caption,
  lead,
  material,
  process,
  processLabel = "Process",
  application,
  capabilities,
  imageHeight = "80mm",
  children,
}: {
  no: string;
  title: string;
  kicker: string;
  page: number;
  image: string;
  caption: string;
  lead: string;
  material: string;
  process: string;
  processLabel?: string;
  application: string;
  capabilities: readonly string[];
  imageHeight?: string;
  children?: ReactNode;
}) {
  return (
    <Sheet foot={title} page={page}>
      <figure className="shot" style={{ height: imageHeight }}>
        <img src={image} alt={caption} />
        <figcaption className="shot__cap">{caption}</figcaption>
      </figure>

      <div className="pad pad--tight">
        <Masthead no={no} kicker={kicker} title={title} />

        <p className="lead mb-[6mm]" style={{ maxWidth: "155mm" }}>
          {lead}
        </p>

        <dl className="mb-[7mm]">
          <Spec k="Material">{material}</Spec>
          <Spec k={processLabel}>{process}</Spec>
          <Spec k="Application">{application}</Spec>
        </dl>

        <div className="label mb-[4mm]">Our Strength</div>
        <Caps items={capabilities} />

        {children}
      </div>
    </Sheet>
  );
}

/* ══════════════ 07 · Perforated Sheets ══════════════ */

export function PagePerforated() {
  return (
    <ProductPage
      no="05"
      kicker="Core capability"
      title="Perforated Sheets"
      page={7}
      image="/gallery/perforated-round-blank.jpg"
      caption="CNC perforated blank — round hole, 60° staggered"
      lead={PERFORATED.characteristics}
      material={PERFORATED.material}
      process={PERFORATED.categories}
      processLabel="Categories"
      application={PERFORATED.application}
      capabilities={PERFORATED.strengths}
      imageHeight="56mm"
    />
  );
}

/* ══════════════ 08 · Patterns & open area ══════════════ */

export function PagePatterns() {
  return (
    <Sheet foot="Perforation Patterns" page={8}>
      <div className="pad">
        <Masthead no="06" kicker="Technical reference" title="Patterns & open area" />

        <div className="grid grid-cols-5 gap-x-[5mm] gap-y-[5mm]">
          {PATTERNS.map((p) => (
            <PatternSwatch key={p.id} id={p.id} label={p.label} />
          ))}
        </div>

        <div className="mt-[9mm] border-t-2 border-[var(--ink)] pt-[6mm]">
          <h3 className="h2 mb-[2mm]">Calculating open area</h3>
          <p className="body mb-[6mm]" style={{ maxWidth: "150mm" }}>
            Open area is the proportion of the sheet removed by perforation. Use the
            formula matching your hole shape and pitch — our team will confirm the
            right specification for your application.
          </p>

          <div className="grid grid-cols-2 gap-x-[9mm] gap-y-[5mm]">
            {OPEN_AREA_FORMULAS.map((f) => (
              <div
                key={f.label}
                className="grid grid-cols-[1fr_auto] items-center gap-[5mm] border-t border-[var(--rule)] pt-[4mm]"
              >
                <div>
                  <div className="h3 mb-[2.4mm]" style={{ fontSize: "14px" }}>
                    {f.label}
                  </div>
                  <div className="flex items-center gap-[3mm]">
                    <span className="small" style={{ fontWeight: 600 }}>
                      % Open Area
                    </span>
                    <span className="mono" style={{ color: "var(--ink-3)" }}>
                      =
                    </span>
                    <span className="inline-grid justify-items-center">
                      <span className="mono" style={{ fontWeight: 700, padding: "0 2mm" }}>
                        {f.numerator}
                      </span>
                      <span
                        className="mono"
                        style={{
                          fontWeight: 700,
                          padding: "0.8mm 2mm 0",
                          borderTop: "1.5px solid var(--brand)",
                          color: "var(--ink-2)",
                        }}
                      >
                        {f.denominator}
                      </span>
                    </span>
                  </div>
                </div>
                <FormulaDiagram kind={f.diagram} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sheet>
  );
}

/* ══════════════ 09 · Laser Cutting ══════════════ */

export function PageLaser() {
  return (
    <ProductPage
      no="07"
      kicker="Fiber laser"
      title="Laser Cutting"
      page={9}
      image="/brochure/img/laser.jpg"
      caption="Fiber laser cutting — Talawade, Pune"
      lead={LASER.characteristics}
      material={LASER.material}
      process={LASER.categories}
      processLabel="Categories"
      application={LASER.application}
      capabilities={LASER.strengths}
      imageHeight="104mm"
    />
  );
}

/* ══════════════ 10 · Expanded Metal ══════════════ */

export function PageExpanded() {
  return (
    <Sheet foot="Expanded Metal" page={10}>
      <figure className="shot" style={{ height: "84mm" }}>
        <img src="/brochure/img/em-brass.jpg" alt="Brass expanded metal sheets" />
        <figcaption className="shot__cap">Expanded metal — brass, diamond pattern</figcaption>
      </figure>

      <div className="pad pad--tight">
        <Masthead no="08" kicker="Single sheet, slit and stretched" title="Expanded Metal" />

        <p className="lead mb-[6mm]" style={{ maxWidth: "155mm" }}>
          {EXPANDED.benefits}
        </p>

        <dl className="mb-[6mm]">
          <Spec k="Material">{EXPANDED.material}</Spec>
          <Spec k="Shapes">{EXPANDED.shapes}</Spec>
          <Spec k="Application">{EXPANDED.application}</Spec>
        </dl>

        <div className="grid grid-cols-2 gap-[9mm]">
          <div>
            <div className="label mb-[2.6mm]" style={{ color: "var(--brand)" }}>
              Minimum Waste
            </div>
            <p className="body">{EXPANDED.minimumWaste}</p>
          </div>
          <div>
            <div className="label mb-[2.6mm]" style={{ color: "var(--brand)" }}>
              Cost Saving
            </div>
            <p className="body">{EXPANDED.costSaving}</p>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-4 gap-[2.6mm] pb-[3mm]">
          {[1, 5, 8, 12].map((i) => (
            <figure key={i} className="shot" style={{ height: "30mm" }}>
              <img src={`/brochure/img/expanded-${i}.jpg`} alt={`Expanded metal pattern ${i}`} />
            </figure>
          ))}
        </div>
      </div>
    </Sheet>
  );
}

/* ══════════════ 11 · Expanded Metal — technical ══════════════ */

export function PageExpandedTech() {
  return (
    <Sheet foot="Expanded Metal" page={11}>
      <div className="pad">
        <div className="masthead">
          <div className="masthead__top">
            <span className="secno">08</span>
            <span className="label">Continued</span>
          </div>
          <h2 className="h1">Terminology & range</h2>
        </div>

        <div className="grid grid-cols-[1fr_74mm] items-start gap-[10mm]">
          <dl>
            {EXPANDED.terminology.map(([term, def]) => (
              <Spec key={term} k={term}>
                {def}
              </Spec>
            ))}
          </dl>
          <div>
            <ExpandedTerminologyDiagram />
            <div className="mt-[5mm]">
              <div className="label mb-[3mm]">Technical Notes</div>
              <Caps items={EXPANDED.technicalNotes} />
            </div>
          </div>
        </div>

        <div className="mt-[9mm] border-t-2 border-[var(--ink)] pt-[6mm]">
          <h3 className="h2 mb-[5mm]">Why specifiers choose it</h3>
          <div className="grid grid-cols-3 gap-[8mm]">
            <p className="body">
              <strong style={{ color: "var(--brand)" }}>Aesthetics </strong>
              {EXPANDED.aesthetics}
            </p>
            <p className="body">
              <strong style={{ color: "var(--brand)" }}>Strength to weight ratio </strong>
              {EXPANDED.strengthToWeight}
            </p>
            <p className="body">
              <strong style={{ color: "var(--brand)" }}>Anti-skid. </strong>
              {EXPANDED.antiSkid}
            </p>
          </div>
        </div>

      </div>
    </Sheet>
  );
}

/* ══════════════ 12 · Turret Punching ══════════════ */

export function PageTurret() {
  return (
    <ProductPage
      no="09"
      kicker="Any hole shape"
      title="Turret Punching"
      page={12}
      image="/gallery/perforated-fine-blank.jpg"
      caption="Micro-perforated screen — CNC turret punched"
      lead={TURRET.characteristics}
      material={TURRET.material}
      process={TURRET.categories}
      processLabel="Categories"
      application={TURRET.application}
      capabilities={TURRET.strengths}
      imageHeight="86mm"
    />
  );
}

/* ══════════════ 13 · Precision Sheet Leveling ══════════════ */

export function PageLeveling() {
  return (
    <ProductPage
      no="10"
      kicker="Flatness control"
      title="Precision Sheet Leveling"
      page={13}
      image="/gallery/perforated-coil-stock.jpg"
      caption="Coil-to-coil stock — leveled in-house"
      lead={LEVELING.characteristics}
      material={LEVELING.material}
      process={LEVELING.categories}
      application={LEVELING.application}
      capabilities={LEVELING.strengths}
      imageHeight="86mm"
    />
  );
}

/* ══════════════ 14 · Custom Components ══════════════ */

export function PageCustom() {
  return (
    <ProductPage
      no="11"
      kicker="Built to your drawing"
      title="Custom Components"
      page={14}
      image="/gallery/perforated-sheet-detail.jpg"
      caption="Custom perforation — round hole, staggered pitch"
      lead={CUSTOM.characteristics}
      material={CUSTOM.material}
      process={CUSTOM.categories}
      application={CUSTOM.application}
      capabilities={CUSTOM.strengths}
      imageHeight="72mm"
    />
  );
}
