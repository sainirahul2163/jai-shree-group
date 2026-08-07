/* eslint-disable @next/next/no-img-element */
import {
  BROCHURE_COVER,
  BROCHURE_EDGE,
  BROCHURE_HISTORY,
  BROCHURE_HISTORY_NOTE,
  BROCHURE_INTRO,
  BROCHURE_MISSION,
  BROCHURE_VISION,
} from "@/data/brochure";

import { QuoteBanner, SectionTag, Sheet } from "./ui";

/* ── Page 1 · Cover ── */

/** Honeycomb: hex w=46.5mm, h=w×0.866; columns every 0.75w, half-height stagger. */
const HEX_W = 46.5;
const HEX_H = 40.3;
const COL = 34.9;
const ROW = HEX_H / 2;
const HEX_CELLS: ReadonlyArray<{ x: number; y: number; img: number }> = [
  { x: COL * 2, y: 0, img: 1 }, // top
  { x: COL * 1, y: ROW, img: 3 }, // upper ring
  { x: COL * 3, y: ROW, img: 4 },
  { x: 0, y: ROW * 2, img: 5 }, // sides
  { x: COL * 4, y: ROW * 2, img: 6 },
  { x: COL * 1, y: ROW * 3, img: 7 }, // lower ring
  { x: COL * 3, y: ROW * 3, img: 8 },
  { x: COL * 2, y: ROW * 4, img: 9 }, // bottom
  { x: 0, y: 0, img: 10 }, // outer corners
  { x: COL * 4, y: ROW * 4, img: 2 },
];

export function PageCover() {
  return (
    <Sheet className="b-hexbg">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -right-[30mm] -top-[30mm] h-[95mm] w-[95mm] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(232,82,26,0.22), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -left-[35mm] top-[95mm] h-[80mm] w-[80mm] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(232,82,26,0.1), transparent 70%)" }}
      />

      <div className="relative flex h-full flex-col justify-between px-[11mm] pb-[9mm] pt-[10mm]">
        {/* top rail */}
        <div className="flex items-start justify-between">
          <img src="/logo/logo-stacked-dark.svg" alt="Jai Shree®" className="h-[30mm] w-auto" />
          <div className="flex flex-col items-end gap-[2.4mm]">
            <span className="inline-flex items-center gap-[2mm] rounded-full border border-[#3a2a24] bg-[#160e0a] px-[3.4mm] py-[1.5mm] text-[8px] font-extrabold uppercase tracking-[0.14em] text-[#ff9a70]">
              <svg viewBox="0 0 12 12" className="h-[3mm] w-[3mm]" fill="none" stroke="#e8521a" strokeWidth="1.2">
                <path d="M6 1.2 7.4 4l3.1.3-2.3 2 .7 3-2.9-1.6L3.1 9.3l.7-3-2.3-2L4.6 4Z" />
              </svg>
              {BROCHURE_COVER.certified}
            </span>
            <div className="text-right">
              <div className="flex items-baseline justify-end gap-[1.5mm]">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#a0a0a0]">Over</span>
                <span
                  className="text-[64px] font-black leading-[0.9] tracking-[-0.04em]"
                  style={{
                    background: "linear-gradient(135deg, #ff6b35 0%, #e8521a 60%, #b23407 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {BROCHURE_COVER.years}
                </span>
              </div>
              <div className="mt-[0.6mm] text-[10px] font-extrabold uppercase tracking-[0.3em] text-white">
                {BROCHURE_COVER.yearsLabel}
              </div>
            </div>
          </div>
        </div>

        {/* honeycomb collage with center mark */}
        <div className="relative mx-auto" style={{ width: `${COL * 4 + HEX_W}mm`, height: `${ROW * 4 + HEX_H}mm` }}>
          {HEX_CELLS.map((cell) => (
            <div
              key={cell.img}
              className="b-hex"
              style={{ left: `${cell.x}mm`, top: `${cell.y}mm`, width: `${HEX_W}mm`, height: `${HEX_H}mm` }}
            >
              <div className="b-hex-inner">
                <img src={`/brochure/img/hex-${cell.img}.jpg`} alt="" />
              </div>
            </div>
          ))}
          {/* center message hexagon */}
          <div
            className="b-hex"
            style={{
              left: `${COL * 2}mm`,
              top: `${ROW * 2}mm`,
              width: `${HEX_W}mm`,
              height: `${HEX_H}mm`,
              background: "linear-gradient(135deg, #ff6b35, #e8521a)",
              padding: "0.8mm",
            }}
          >
            <div className="b-hex-inner flex flex-col items-center justify-center gap-[1.6mm] bg-[#0d0d0d] text-center">
              <img
                src="/logo/mark-dark.svg"
                alt=""
                style={{ height: "13mm", width: "auto", objectFit: "contain" }}
              />
              <span className="text-[8.6px] font-black uppercase tracking-[0.26em] text-[#c0c0c0]">
                Est.&nbsp;<span className="text-[#ff6b35]">1970</span>
              </span>
            </div>
          </div>
        </div>

        {/* trust headline */}
        <div className="text-center">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.34em] text-[#a0a0a0]">
            <span className="text-[#ff6b35]">Jai Shree</span> · A Trusted Brand For
          </div>
          <div className="mt-[1.6mm] text-[34px] font-black uppercase leading-none tracking-[0.02em] text-white">
            Jali <span className="text-[#e8521a]">/</span> Meshes
          </div>
          <div
            className="mt-[2mm] text-[19px] font-black uppercase leading-none tracking-[0.14em]"
            style={{ color: "transparent", WebkitTextStroke: "1px #8a8a8a" }}
          >
            Since Last 50+ Years
          </div>
        </div>

        {/* solutions band */}
        <div>
          <div className="mb-[3.4mm] flex items-center gap-[3mm]">
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#e8521a]" />
            <h2 className="text-center text-[14.5px] font-black uppercase tracking-[0.1em] text-white">
              Assuring <span className="text-[#ff6b35]">One Stop Perfect Solution</span> For
            </h2>
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#e8521a]" />
          </div>
          <div className="grid grid-cols-3 gap-[2mm]">
            {BROCHURE_COVER.solutions.map((item) => (
              <span key={item} className="b-chip justify-center">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Sheet>
  );
}

/* ── Page 2 · Introduction ── */

export function PageIntro() {
  return (
    <Sheet page={2}>
      <div className="b-pad">
        <SectionTag>Introduction</SectionTag>
        <div className="grid gap-[2.6mm]">
          {BROCHURE_INTRO.map((para) => (
            <p key={para.slice(0, 24)} className="b-body">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-[4.5mm] grid grid-cols-4 gap-[2.6mm]">
          <div className="b-stat">
            <div className="b-stat-value">
              50<span>+</span>
            </div>
            <div className="b-stat-label">Years of Experience</div>
          </div>
          <div className="b-stat">
            <div className="b-stat-value">
              6<span>+</span>
            </div>
            <div className="b-stat-label">Manufacturing Units</div>
          </div>
          <div className="b-stat">
            <div className="b-stat-value">
              2<span>&nbsp;Cities</span>
            </div>
            <div className="b-stat-label">Mumbai &amp; Pune</div>
          </div>
          <div className="b-stat">
            <div className="b-stat-value">
              ISO<span>&nbsp;9001</span>
            </div>
            <div className="b-stat-label">2015 Certified</div>
          </div>
        </div>

        <figure className="b-photo b-photo-tick mt-[4.5mm] flex-1" style={{ minHeight: 0 }}>
          <img src="/brochure/img/factory.jpg" alt="Jai Shree Group manufacturing facility" />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-[4mm] pb-[2.6mm] pt-[8mm] text-[8.4px] font-bold uppercase tracking-[0.18em] text-[#e6e6e6]">
            Manufacturing Facility · Talawade, Pune
          </figcaption>
        </figure>
        <div className="h-[6mm]" />
      </div>
    </Sheet>
  );
}

/* ── Page 3 · History · Vision · Mission · Edge ── */

export function PageHistory() {
  return (
    <Sheet page={3}>
      <div className="b-pad">
        <SectionTag>History of the Group</SectionTag>
        <div className="b-timeline">
          {BROCHURE_HISTORY.map((item) => (
            <div key={item.year} className="b-timeline-item">
              <div className="b-timeline-year">{item.year}</div>
              <div className="b-timeline-text">{item.text}</div>
            </div>
          ))}
        </div>
        <p className="b-body mt-[3.2mm] text-[9.9px]">{BROCHURE_HISTORY_NOTE}</p>

        <div className="mt-[4.6mm] grid grid-cols-2 gap-[3mm]">
          <div className="rounded-[10px] border border-[#2a2a2a] bg-[#111111] p-[3.6mm]">
            <SectionTag>Our Vision</SectionTag>
            <p className="b-body -mt-[1.6mm] text-[9.9px]">{BROCHURE_VISION}</p>
          </div>
          <div className="rounded-[10px] border border-[#2a2a2a] bg-[#111111] p-[3.6mm]">
            <SectionTag>Our Mission</SectionTag>
            <p className="b-body -mt-[1.6mm] text-[9.9px]">{BROCHURE_MISSION}</p>
          </div>
        </div>

        <div className="mt-[4.6mm]">
          <SectionTag>Edge on Others</SectionTag>
          <ol className="b-numlist grid-cols-2 gap-x-[5mm]">
            {BROCHURE_EDGE.map((item) => (
              <li key={item.slice(0, 24)}>{item}</li>
            ))}
          </ol>
        </div>
        <figure className="b-photo b-photo-tick mt-[4.6mm] flex-1" style={{ minHeight: 0 }}>
          <img
            src="/brochure/img/factory.jpg"
            alt="Jai Shree Group plant, Talawade"
            style={{ objectPosition: "50% 78%" }}
          />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-[4mm] pb-[2.4mm] pt-[8mm] text-[8.4px] font-bold uppercase tracking-[0.18em] text-[#e6e6e6]">
            Five Decades of Continuous Expansion
          </figcaption>
        </figure>
        <div className="pb-[4mm] pt-[3.6mm]">
          <QuoteBanner>
            Independence of a privately owned company — total quality management under the
            promoters&rsquo; control, on-schedule delivery, and tailor-made custom solutions.
          </QuoteBanner>
        </div>
      </div>
    </Sheet>
  );
}
