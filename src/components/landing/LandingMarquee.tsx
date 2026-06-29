"use client";

const ROW_ONE = [
  "PERFORATED SHEETS",
  "LASER CUTTING",
  "EXPANDED METAL",
  "WIRE MESH",
  "WELDED MESH",
  "TURRET PUNCHING",
  "DEMISTER PAD",
];

const ROW_TWO = [
  "PUNE",
  "MUMBAI",
  "ISO 9001:2015",
  "CNC PRECISION",
  "FIBER LASER",
  "GLOBAL DELIVERY",
  "SINCE 1970",
];

function MarqueeRow({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const animationClass =
    direction === "left" ? "landing-marquee-left" : "landing-marquee-right";

  return (
    <div className="landing-marquee-row overflow-hidden py-6">
      <div className={`flex w-max items-center ${animationClass}`}>
        {/* Duplicated content for a seamless -50% loop */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <span key={item} className="flex items-center whitespace-nowrap">
                <span className="landing-marquee-text text-5xl font-black tracking-tight md:text-7xl">
                  {item}
                </span>
                <span aria-hidden className="mx-8 text-2xl text-[#E8521A]">
                  ◆
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LandingMarquee() {
  return (
    <section
      aria-label="Capabilities and locations"
      className="overflow-hidden bg-[#060606] py-20"
    >
      <MarqueeRow items={ROW_ONE} direction="left" />
      <MarqueeRow items={ROW_TWO} direction="right" />
    </section>
  );
}
