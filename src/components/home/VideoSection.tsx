"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";

import { COMPANY_VIDEO } from "@/lib/constants";

const SPRING = { type: "spring", stiffness: 100, damping: 30 } as const;

function VideoPlaceholder({ onPlay }: { onPlay: () => void }) {
  return (
    <div
      className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#0C0C0C]"
      onClick={onPlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onPlay();
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(232,82,26,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 28px",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,82,26,0.08), transparent 70%)",
        }}
      />

      <div className="absolute top-4 left-4 h-8 w-8 rounded-tl border-t-2 border-l-2 border-[#E8521A]/40" />
      <div className="absolute top-4 right-4 h-8 w-8 rounded-tr border-t-2 border-r-2 border-[#E8521A]/40" />
      <div className="absolute bottom-4 left-4 h-8 w-8 rounded-bl border-b-2 border-l-2 border-[#E8521A]/40" />
      <div className="absolute bottom-4 right-4 h-8 w-8 rounded-br border-b-2 border-r-2 border-[#E8521A]/40" />

      <div className="relative z-10 flex flex-col items-center gap-4 px-8 text-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={SPRING}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-[#E8521A]/20"
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-[#E8521A]/15"
            animate={{ scale: [1, 2.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#E8521A] shadow-[0_0_40px_rgba(232,82,26,0.4)]">
            <Play className="ml-1 h-8 w-8 fill-white text-white" />
          </div>
        </motion.div>

        <div>
          <p className="text-lg font-bold text-white">Factory Tour</p>
          <p className="mt-1 text-sm text-[#666]">
            Coming Soon — Drone &amp; walkthrough footage
          </p>
        </div>

        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {["CNC Machines", "Fiber Laser", "Wire Mesh Plant", "Talawade Facility"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#2A2A2A] px-3 py-1 text-xs text-[#666]"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <span className="text-xs tracking-[0.2em] text-[#444] uppercase">
          Video available soon
        </span>
      </div>
    </div>
  );
}

function YoutubeEmbed({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#2A2A2A] bg-black">
      {!playing ? (
        <div
          className="group relative h-full w-full cursor-pointer"
          onClick={() => setPlaying(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setPlaying(true);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Factory tour video thumbnail"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={SPRING}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[#E8521A]/30"
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#E8521A] shadow-[0_0_40px_rgba(232,82,26,0.5)]">
                <Play className="ml-1 h-8 w-8 fill-white text-white" />
              </div>
            </motion.div>
          </div>
          <div className="absolute right-4 bottom-4 rounded bg-black/70 px-2 py-1 backdrop-blur-sm">
            <span className="text-xs font-medium text-white">Factory Tour</span>
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full">
          <iframe
            className="h-full w-full"
            title="Jai Shree Group factory tour"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&modestbranding=1&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            type="button"
            onClick={() => setMuted(!muted)}
            className="absolute right-4 bottom-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-[#E8521A]"
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function LocalVideo({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(containerRef, { once: false, margin: "-20% 0px" });

  useEffect(() => {
    if (!videoRef.current) return;
    if (inView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [inView]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#2A2A2A] bg-black"
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 80px 20px rgba(0,0,0,0.4)" }}
      />
    </div>
  );
}

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  const hasYoutube = Boolean(COMPANY_VIDEO.youtubeId);
  const hasLocal = Boolean(COMPANY_VIDEO.localVideo);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 40, filter: "blur(8px)" },
    animate: isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
    transition: { ...SPRING, delay },
  });

  return (
    <section
      ref={sectionRef}
      className="bg-[#060606] px-4 py-24 md:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid grid-cols-1 items-end gap-12 lg:grid-cols-2">
          <div>
            <motion.div {...reveal(0)} className="mb-5 flex items-center gap-3">
              <span aria-hidden className="h-px w-6 bg-orange-500/40" />
              <span className="text-xs font-medium tracking-[0.25em] text-orange-500 uppercase">
                {COMPANY_VIDEO.label}
              </span>
            </motion.div>

            <motion.h2
              {...reveal(0.1)}
              className="text-4xl leading-[1.05] font-black tracking-tight md:text-5xl"
            >
              <span className="text-white">{COMPANY_VIDEO.heading}</span>
              <br />
              <span className="bg-gradient-to-r from-[#E8521A] via-[#FF6B35] to-[#E8521A] bg-clip-text text-transparent">
                {COMPANY_VIDEO.headingOrange}
              </span>
            </motion.h2>
          </div>

          <div>
            <motion.p
              {...reveal(0.2)}
              className="mb-8 text-base leading-relaxed text-[#8A8A8A]"
            >
              {COMPANY_VIDEO.subtext}
            </motion.p>

            <motion.div {...reveal(0.3)} className="grid grid-cols-3 gap-4">
              {COMPANY_VIDEO.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] p-4"
                >
                  <p className="text-2xl font-black text-[#E8521A] tabular-nums">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-[#666]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div {...reveal(0.25)}>
          {hasYoutube ? (
            <YoutubeEmbed videoId={COMPANY_VIDEO.youtubeId} />
          ) : hasLocal ? (
            <LocalVideo src={COMPANY_VIDEO.localVideo} />
          ) : (
            <VideoPlaceholder onPlay={() => {}} />
          )}
        </motion.div>

        <motion.p
          {...reveal(0.4)}
          className="mt-6 text-center text-sm text-[#3A3A3A]"
        >
          Jai Shree Group Manufacturing Facility — Talawade, Pune, Maharashtra
        </motion.p>
      </div>
    </section>
  );
}
