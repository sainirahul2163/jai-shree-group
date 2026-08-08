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
import { Field, NumList, QuoteBanner, SectionTag, Sheet } from "./ui";

/* ── Page 4 · Perforated Sheet ── */

export function PagePerforated() {
  return (
    <Sheet page={4}>
      <figure className="b-photo b-photo-tick mx-[11mm] mt-[10mm] h-[92mm] rounded-[10px]">
        <img src="/brochure/img/perforated-collage.jpg" alt="Perforated sheets in multiple hole patterns" />
      </figure>
      <div className="b-pad !pt-[5mm]">
        <SectionTag>Perforated Sheet</SectionTag>
        <Field label="Material">{PERFORATED.material}</Field>
        <Field label="Categories">{PERFORATED.categories}</Field>
        <Field label="The Characteristics of Perforated Sheet">{PERFORATED.characteristics}</Field>
        <Field label="Application">{PERFORATED.application}</Field>
        <div className="b-field">
          <div className="b-field-label">Our Strength</div>
          <NumList items={PERFORATED.strengths} />
        </div>
      </div>
    </Sheet>
  );
}

/* ── Page 5 · Perforation patterns + open area ── */

export function PagePatterns() {
  return (
    <Sheet page={5}>
      <div className="b-pad">
        <SectionTag>Perforation Patterns</SectionTag>
        <div className="grid grid-cols-4 gap-[3mm]">
          {PATTERNS.slice(0, 4).map((p) => (
            <PatternSwatch key={p.id} id={p.id} label={p.label} />
          ))}
        </div>
        <div className="mt-[3mm] grid grid-cols-3 gap-[3mm] px-[8mm]">
          {PATTERNS.slice(4, 7).map((p) => (
            <PatternSwatch key={p.id} id={p.id} label={p.label} />
          ))}
        </div>
        <div className="mt-[3mm] grid grid-cols-3 gap-[3mm] px-[8mm]">
          {PATTERNS.slice(7).map((p) => (
            <PatternSwatch key={p.id} id={p.id} label={p.label} />
          ))}
        </div>

        <div className="mt-[5mm]">
          <SectionTag>Formula for Calculation of Open Area</SectionTag>
          <div className="grid grid-cols-2 gap-[3mm]">
            {OPEN_AREA_FORMULAS.map((f) => (
              <div key={f.label} className="b-formula !p-[3.6mm]">
                <div>
                  <div className="mb-[2mm] text-[9.2px] font-extrabold uppercase tracking-[0.05em] text-white">
                    {f.label}
                  </div>
                  <div className="flex items-center gap-[2.6mm]">
                    <span className="text-[8.8px] font-bold text-[#8a8a8a]">% Open Area =</span>
                    <span className="b-frac">
                      <span className="b-frac-top">{f.numerator}</span>
                      <span className="b-frac-bottom">{f.denominator}</span>
                    </span>
                  </div>
                </div>
                <FormulaDiagram kind={f.diagram} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pb-[4mm] pt-[4mm]">
          <QuoteBanner>{CONSULTANCY_QUOTE}</QuoteBanner>
        </div>
      </div>
    </Sheet>
  );
}

/* ── Page 6 · Laser Cutting ── */

export function PageLaser() {
  return (
    <Sheet page={6}>
      <figure className="b-photo b-photo-tick mx-[11mm] mt-[10mm] h-[124mm] rounded-[10px]">
        <img src="/brochure/img/laser.jpg" alt="Fiber laser cutting metal sheet with sparks" />
        <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-[4mm] pb-[2.6mm] pt-[8mm] text-[8.4px] font-bold uppercase tracking-[0.18em] text-[#e6e6e6]">
          Latest Fiber Laser Technology
        </figcaption>
      </figure>
      <div className="b-pad !pt-[5mm]">
        <SectionTag>Laser Cutting</SectionTag>
        <Field label="Material">{LASER.material}</Field>
        <Field label="Categories">{LASER.categories}</Field>
        <Field label="The Characteristics of Laser Cutting">{LASER.characteristics}</Field>
        <Field label="Application">{LASER.application}</Field>
        <div className="b-field">
          <div className="b-field-label">Our Strength</div>
          <NumList items={LASER.strengths} />
        </div>
      </div>
    </Sheet>
  );
}

/* ── Page 7 · Expanded Metal ── */

export function PageExpanded() {
  return (
    <Sheet page={7}>
      <div className="b-pad">
        <SectionTag>Expanded Metal</SectionTag>
        <Field label="Material">{EXPANDED.material}</Field>
        <Field label="Expanding Shapes / Design">{EXPANDED.shapes}</Field>
        <Field label="Application">{EXPANDED.application}</Field>
        <Field label="Expanded Metal Benefits">{EXPANDED.benefits}</Field>
        <p className="b-body mb-[1.8mm]">
          <strong className="text-[#ff6b35]">Minimum Waste </strong>
          {EXPANDED.minimumWaste}
        </p>
        <p className="b-body">
          <strong className="text-[#ff6b35]">Cost Saving </strong>
          {EXPANDED.costSaving}
        </p>

        <div className="my-[3.6mm] rounded-[8px] border border-[#3a2a24] bg-[#160e0a] px-[4mm] py-[2.2mm] text-center text-[10px] font-black uppercase tracking-[0.06em] text-[#ff9a70]">
          {EXPANDED.specialNote}
        </div>

        <div className="grid flex-1 grid-cols-4 grid-rows-4 gap-[2.4mm]" style={{ minHeight: 0 }}>
          {Array.from({ length: 16 }, (_, i) => (
            <figure key={i} className="b-photo rounded-[8px]">
              <img src={`/brochure/img/expanded-${i + 1}.jpg`} alt={`Expanded metal design ${i + 1}`} />
            </figure>
          ))}
        </div>
        <div className="h-[5mm]" />
      </div>
    </Sheet>
  );
}

/* ── Page 8 · Expanded Metal continued ── */

export function PageExpanded2() {
  return (
    <Sheet page={8}>
      <div className="b-pad">
        <div className="grid h-[104mm] grid-cols-2 grid-rows-2 gap-[3mm]">
          <figure className="b-photo b-photo-tick">
            <img src="/brochure/img/em-red-flat.jpg" alt="Powder coated hexagonal expanded metal" />
          </figure>
          <figure className="b-photo b-photo-tick">
            <img src="/brochure/img/em-brass.jpg" alt="Brass expanded metal sheets" />
          </figure>
          <figure className="b-photo b-photo-tick">
            <img src="/brochure/img/em-black.jpg" alt="Diamond expanded metal close-up" />
          </figure>
          <figure className="b-photo b-photo-tick">
            <img src="/brochure/img/em-red-hex.jpg" alt="Coloured expanded metal mesh" />
          </figure>
        </div>

        <div className="mt-[4.4mm]">
          <p className="b-body mb-[1.8mm]">
            <strong className="text-[#ff6b35]">Aesthetics </strong>
            {EXPANDED.aesthetics}
          </p>
          <p className="b-body mb-[1.8mm]">
            <strong className="text-[#ff6b35]">Strength to Weight Ratio </strong>
            {EXPANDED.strengthToWeight}
          </p>
          <p className="b-body">
            <strong className="text-[#ff6b35]">Anti-Skid </strong>
            {EXPANDED.antiSkid}
          </p>
        </div>

        <div className="mt-[4.4mm] grid grid-cols-[1fr_64mm] items-start gap-[5mm]">
          <div>
            <div className="b-field-label">Expanded Metal Terminology</div>
            <dl className="mt-[1mm] grid gap-[1.3mm]">
              {EXPANDED.terminology.map(([term, def]) => (
                <div key={term} className="grid grid-cols-[34mm_1fr] gap-[2.4mm] text-[9.6px] leading-[1.45]">
                  <dt className="font-extrabold uppercase tracking-[0.02em] text-white">{term}</dt>
                  <dd className="text-[#c7c7c7]">{def}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-[3.4mm]">
              <div className="b-field-label">Technical Notes</div>
              <NumList items={EXPANDED.technicalNotes} />
            </div>
          </div>
          <ExpandedTerminologyDiagram />
        </div>

        <div className="mt-auto pb-[4mm] pt-[3.6mm]">
          <QuoteBanner>{CONSULTANCY_QUOTE}</QuoteBanner>
        </div>
      </div>
    </Sheet>
  );
}

/* ── Page 9 · Turret Punching ── */

export function PageTurret() {
  return (
    <Sheet page={9}>
      <figure className="b-photo b-photo-tick mx-[11mm] mt-[10mm] h-[104mm] rounded-[10px]">
        <img src="/gallery/perforated-round-blank.jpg" alt="CNC turret punched round blank" />
        <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-[4mm] pb-[2.6mm] pt-[8mm] text-[8.4px] font-bold uppercase tracking-[0.18em] text-[#e6e6e6]">
          Turret Punched Blank · Round Hole, 60° Staggered
        </figcaption>
      </figure>
      <div className="b-pad !pt-[5mm]">
        <SectionTag>{TURRET.title}</SectionTag>
        <Field label="Material">{TURRET.material}</Field>
        <Field label="Categories">{TURRET.categories}</Field>
        <Field label="The Characteristics of Turret Punching">{TURRET.characteristics}</Field>
        <Field label="Application">{TURRET.application}</Field>
        <div className="b-field">
          <div className="b-field-label">Our Strength</div>
          <NumList items={TURRET.strengths} />
        </div>
      </div>
    </Sheet>
  );
}

/* ── Page 10 · Precision Sheet Leveling ── */

export function PageLeveling() {
  return (
    <Sheet page={10}>
      <figure className="b-photo b-photo-tick mx-[11mm] mt-[10mm] h-[104mm] rounded-[10px]">
        <img src="/gallery/perforated-coil-stock.jpg" alt="Perforated coil stock ready for leveling" />
        <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-[4mm] pb-[2.6mm] pt-[8mm] text-[8.4px] font-bold uppercase tracking-[0.18em] text-[#e6e6e6]">
          Coil-to-Coil Stock · Leveled In-House
        </figcaption>
      </figure>
      <div className="b-pad !pt-[5mm]">
        <SectionTag>{LEVELING.title}</SectionTag>
        <Field label="Material">{LEVELING.material}</Field>
        <Field label="Process">{LEVELING.categories}</Field>
        <Field label="The Characteristics of Sheet Leveling">{LEVELING.characteristics}</Field>
        <Field label="Application">{LEVELING.application}</Field>
        <div className="b-field">
          <div className="b-field-label">Our Strength</div>
          <NumList items={LEVELING.strengths} />
        </div>
      </div>
    </Sheet>
  );
}

/* ── Page 11 · Custom Components ── */

export function PageCustom() {
  return (
    <Sheet page={11}>
      <figure className="b-photo b-photo-tick mx-[11mm] mt-[10mm] h-[96mm] rounded-[10px]">
        <img src="/gallery/perforated-fine-blank.jpg" alt="Fine perforated custom screen" />
        <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-[4mm] pb-[2.6mm] pt-[8mm] text-[8.4px] font-bold uppercase tracking-[0.18em] text-[#e6e6e6]">
          Custom Fine Perforated Screen
        </figcaption>
      </figure>
      <div className="b-pad !pt-[5mm]">
        <SectionTag>{CUSTOM.title}</SectionTag>
        <Field label="Material">{CUSTOM.material}</Field>
        <Field label="Process">{CUSTOM.categories}</Field>
        <Field label="Special Jobs We Undertake">{CUSTOM.characteristics}</Field>
        <Field label="Application">{CUSTOM.application}</Field>
        <div className="b-field">
          <div className="b-field-label">Our Strength</div>
          <NumList items={CUSTOM.strengths} />
        </div>
        <div className="mt-auto pb-[4mm]">
          <QuoteBanner>{CONSULTANCY_QUOTE}</QuoteBanner>
        </div>
      </div>
    </Sheet>
  );
}
