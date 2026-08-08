/* eslint-disable @next/next/no-img-element */
import {
  NETWORK_MUMBAI,
  NETWORK_PUNE,
  type BrochureUnit,
} from "@/data/brochure";

import { IconGlobe, IconMail, IconPhone, IconPin, Sheet } from "./ui";

/* ── Back cover · Network ── */

function UnitCard({ unit }: { unit: BrochureUnit }) {
  return (
    <div className="b-unit">
      <div className="b-unit-name">
        {unit.name}
        {unit.name2 && (
          <>
            <br />
            {unit.name2}
          </>
        )}
      </div>
      <div className="b-unit-row">
        <IconPin />
        <span>{unit.address}</span>
      </div>
      <div className="b-unit-row">
        <IconGlobe />
        <span className="b-unit-mono">{unit.website}</span>
      </div>
      <div className="b-unit-row">
        <IconMail />
        <span className="b-unit-mono">{unit.emails.join("  ·  ")}</span>
      </div>
      <div className="b-unit-row">
        <IconPhone />
        <span className="b-unit-mono">{unit.phones.join("  ·  ")}</span>
      </div>
    </div>
  );
}

function CityBand({ city }: { city: string }) {
  return (
    <div className="mb-[3.6mm] mt-[6mm] flex items-center gap-[3mm]">
      <h3 className="b-tag !text-[13px]">{city}</h3>
      <span className="h-[1px] flex-1 bg-gradient-to-r from-[#e8521a66] via-[#2a2a2a] to-transparent" />
    </div>
  );
}

export function PageNetwork() {
  return (
    <Sheet className="b-hexbg">
      <div
        className="pointer-events-none absolute -left-[28mm] -top-[28mm] h-[85mm] w-[85mm] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(232,82,26,0.16), transparent 70%)" }}
      />
      <div className="relative flex h-full flex-col px-[11mm] pt-[10mm]">
        <div className="flex items-start justify-between">
          <img src="/logo/logo-stacked-dark.svg" alt="Jai Shree®" className="h-[26mm] w-auto" />
          <div className="pt-[2mm] text-right">
            <div className="text-[16px] font-black uppercase tracking-[0.06em] leading-[1.2] text-white">
              Our <span className="text-[#ff6b35]">Network</span>
            </div>
            <div className="mt-[1mm] text-[8px] font-bold uppercase tracking-[0.22em] text-[#8a8a8a]">
              Six Manufacturing Units · Pune &amp; Mumbai
            </div>
          </div>
        </div>

        <CityBand city="Pune" />
        <div className="grid grid-cols-3 gap-[3.2mm]">
          {NETWORK_PUNE.map((unit) => (
            <UnitCard key={unit.name} unit={unit} />
          ))}
        </div>

        <CityBand city="Mumbai" />
        <div className="grid grid-cols-3 gap-[3.2mm]">
          {NETWORK_MUMBAI.map((unit) => (
            <UnitCard key={unit.name} unit={unit} />
          ))}
        </div>

        <div className="mt-auto pb-[10mm]">
          <div className="flex items-center justify-between gap-[6mm] rounded-[12px] border border-[#3a2a24] bg-gradient-to-r from-[#170d08] to-[#111111] px-[6mm] py-[4mm]">
            <div>
              <div className="text-[13.5px] font-black uppercase tracking-[0.04em] text-white">
                One Group. <span className="text-[#ff6b35]">Every Metal Solution.</span>
              </div>
              <div className="mt-[1.4mm] text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a0a0a0]">
                www.jaishreegroup.com &ensp;·&ensp; Scan to visit
              </div>
            </div>
            <div className="rounded-[8px] bg-white p-[1.8mm]">
              <img src="/brochure/img/qr.png" alt="QR code — www.jaishreegroup.com" className="h-[20mm] w-[20mm]" />
            </div>
          </div>
        </div>
      </div>
    </Sheet>
  );
}
