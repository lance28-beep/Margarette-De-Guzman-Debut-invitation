"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Sparkles } from "lucide-react"
import { WindSong, Great_Vibes, Cormorant_Garamond } from "next/font/google"
import { siteConfig } from "@/content/site"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const windSong = WindSong({ subsets: ["latin"], weight: ["400", "500"] })

const palette = {
  midnightBlue: "#081F5C",
  royalBlue:    "#334EAC",
  skyBlue:      "#BAD6EB",
  dawnBlue:     "#D0E3FF",
  porcelain:    "#EDF1F6",
  moonBeige:    "#F7F2EB",
}

// Curated slide sets — CSS controls which set is visible (no JS flash)
const MOBILE_SLIDES = [
  "/mobile-backgroundnew/debut (43).webp",
  "/mobile-backgroundnew/debut (44).webp",
  "/mobile-backgroundnew/debut (4).webp",
  "/mobile-backgroundnew/debut (5).webp",
  "/mobile-backgroundnew/debut (6).webp",
  "/mobile-backgroundnew/debut (7).webp",
  "/mobile-backgroundnew/debut (46).webp",
]
const DESKTOP_SLIDES = [
  "/desktop-backgroundNew/debut (1).webp",
  "/desktop-backgroundNew/debut (4).webp",
  "/desktop-backgroundNew/debut (7).webp",
  "/desktop-backgroundNew/debut (10).webp",
  "/desktop-backgroundNew/debut (13).webp",
]
const SLIDE_INTERVAL_MS = 5500
const CROSSFADE_MS      = 2000

// Fixed star positions — stable across renders
const STARS = [
  { w: 1,   top: "7%",  left: "11%", delay: "0s",   dur: "3.2s" },
  { w: 2,   top: "13%", left: "27%", delay: "0.6s", dur: "4.1s" },
  { w: 1.5, top: "21%", left: "67%", delay: "1.2s", dur: "2.8s" },
  { w: 1,   top: "34%", left: "81%", delay: "0.3s", dur: "3.7s" },
  { w: 2,   top: "9%",  left: "49%", delay: "1.8s", dur: "4.5s" },
  { w: 1,   top: "47%", left: "7%",  delay: "0.9s", dur: "3.1s" },
  { w: 1.5, top: "54%", left: "41%", delay: "2.1s", dur: "5.0s" },
  { w: 1,   top: "61%", left: "74%", delay: "0.5s", dur: "2.6s" },
  { w: 2.5, top: "19%", left: "87%", delay: "1.5s", dur: "3.9s" },
  { w: 1,   top: "74%", left: "17%", delay: "2.5s", dur: "4.3s" },
  { w: 1.5, top: "29%", left: "37%", delay: "0.7s", dur: "3.5s" },
  { w: 1,   top: "43%", left: "59%", delay: "1.9s", dur: "2.9s" },
  { w: 2,   top: "5%",  left: "72%", delay: "1.1s", dur: "4.8s" },
  { w: 1,   top: "81%", left: "54%", delay: "0.2s", dur: "3.3s" },
  { w: 1.5, top: "69%", left: "34%", delay: "1.7s", dur: "4.0s" },
  { w: 1,   top: "89%", left: "79%", delay: "2.3s", dur: "3.6s" },
  { w: 2,   top: "4%",  left: "41%", delay: "0.4s", dur: "5.2s" },
  { w: 1,   top: "57%", left: "91%", delay: "1.4s", dur: "2.7s" },
  { w: 1.5, top: "37%", left: "21%", delay: "2.0s", dur: "4.6s" },
  { w: 1,   top: "25%", left: "5%",  delay: "0.8s", dur: "3.0s" },
  { w: 1,   top: "16%", left: "56%", delay: "1.3s", dur: "3.4s" },
  { w: 1.5, top: "66%", left: "63%", delay: "2.2s", dur: "4.7s" },
  { w: 1,   top: "85%", left: "30%", delay: "0.1s", dur: "2.5s" },
  { w: 2,   top: "40%", left: "95%", delay: "1.6s", dur: "3.8s" },
]

// Floating bokeh particles
const BOKEH = [
  { l: "10%", t: "80%", s: 12, delay: "0s",   dur: "7s"   },
  { l: "30%", t: "85%", s:  8, delay: "1.8s", dur: "8.5s" },
  { l: "55%", t: "78%", s: 16, delay: "0.9s", dur: "6.5s" },
  { l: "75%", t: "82%", s:  9, delay: "2.5s", dur: "9s"   },
  { l: "88%", t: "88%", s: 11, delay: "3.2s", dur: "7.5s" },
  { l: "45%", t: "92%", s:  7, delay: "1.2s", dur: "8s"   },
]

function SlideShow({ images, priority }: { images: string[]; priority?: boolean }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % images.length), SLIDE_INTERVAL_MS)
    return () => clearInterval(t)
  }, [images.length])

  return (
    <>
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            opacity:    i === idx ? 1 : 0,
            transition: `opacity ${CROSSFADE_MS}ms ease-in-out`,
            willChange: "opacity",
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={priority && i === 0}
            style={{ animation: "kbZoom 16s ease-in-out infinite alternate" }}
          />
        </div>
      ))}
    </>
  )
}

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020819]"
    >
      {/* ── Keyframes ─────────────────────────────────────────────────── */}
      <style>{`
        @keyframes kbZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.09); }
        }
        @keyframes aurora {
          0%   { transform: translateX(-10%) skewX(-5deg); opacity: 0.18; }
          50%  { transform: translateX(10%)  skewX(5deg);  opacity: 0.32; }
          100% { transform: translateX(-10%) skewX(-5deg); opacity: 0.18; }
        }
        @keyframes floatUp {
          0%   { transform: translateY(0)    scale(1);   opacity: 0;   }
          20%  { opacity: 0.65; }
          80%  { opacity: 0.4;  }
          100% { transform: translateY(-80px) scale(1.5); opacity: 0;  }
        }
        @keyframes scrollBob {
          0%, 100% { transform: translateY(0);  opacity: 0.9; }
          50%       { transform: translateY(6px); opacity: 0.4; }
        }
        @keyframes shimmerLine {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      {/* ── Background slideshows (CSS picks mobile vs desktop — no flash) ── */}
      <div className="absolute inset-0">

        {/* Mobile slides — hidden at md+ */}
        <div className="absolute inset-0 md:hidden">
          <SlideShow images={MOBILE_SLIDES} priority />
        </div>

        {/* Desktop slides — hidden below md */}
        <div className="absolute inset-0 hidden md:block">
          <SlideShow images={DESKTOP_SLIDES} priority />
        </div>

        {/* ── Atmospheric overlay layers ─────────────────────────────── */}

        {/* Edge vignette — light, just frames the subject */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 85% 85% at 50% 40%,
                           transparent 40%,
                           rgba(2,8,28,0.30) 70%,
                           rgba(2,8,28,0.60) 100%)`,
          }}
        />

        {/* Celestial color wash — very subtle tint */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `linear-gradient(172deg,
                           rgba(2,8,25,0.25) 0%,
                           transparent 50%,
                           rgba(8,31,92,0.30) 100%)`,
          }}
        />

        {/* Aurora shimmer band */}
        <div
          className="absolute inset-x-0 z-[2] pointer-events-none"
          style={{
            top: "20%",
            height: "30%",
            background: `linear-gradient(90deg,
                           transparent 0%,
                           rgba(186,214,235,0.22) 20%,
                           rgba(208,227,255,0.35) 50%,
                           rgba(186,214,235,0.22) 80%,
                           transparent 100%)`,
            filter: "blur(32px)",
            animation: "aurora 11s ease-in-out infinite",
          }}
        />

        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-40 z-[3] pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(2,8,25,0.78) 0%, transparent 100%)" }}
        />

        {/* Gentle bottom gradient — just enough to lift text off the photo */}
        <div
          className="absolute inset-x-0 bottom-0 z-[3] pointer-events-none"
          style={{
            height: "60%",
            background: `linear-gradient(0deg,
              rgba(2,8,25,0.68) 0%,
              rgba(2,8,25,0.38) 35%,
              rgba(2,8,25,0.10) 65%,
              transparent 100%)`,
          }}
        />

        {/* ── Crescent moon ─────────────────────────────────────────── */}
        <div className="absolute right-5 sm:right-10 md:right-16 top-8 sm:top-12 md:top-16 z-[4]">
          {/* Outer glow halo */}
          <div
            className="absolute -inset-8 rounded-full animate-[pulse_7s_ease-in-out_infinite]"
            style={{
              background: `radial-gradient(circle, rgba(186,214,235,0.1) 0%, transparent 68%)`,
            }}
          />
          {/* Inner glow ring */}
          <div
            className="absolute -inset-3 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(208,227,255,0.16) 0%, transparent 62%)`,
              boxShadow: "0 0 44px 6px rgba(186,214,235,0.18)",
            }}
          />
          {/* Moon body */}
          <div
            className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 28%, ${palette.dawnBlue} 0%, ${palette.moonBeige}ee 40%, rgba(186,214,235,0.5) 68%, transparent 82%)`,
              boxShadow: `0 0 48px rgba(186,214,235,0.95), 0 0 90px rgba(186,214,235,0.6), 0 0 150px rgba(208,227,255,0.35)`,
            }}
          >
            {/* Shadow disk carves crescent */}
            <div
              className="absolute rounded-full bg-[#030c1e]"
              style={{ width: "86%", height: "86%", top: "10%", right: "-5%" }}
            />
            <div className="absolute inset-0 rounded-full border border-white/25" />
          </div>
          {/* Sparkle dots near moon */}
          <div
            className="absolute -bottom-2 -left-3 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/90 blur-[1px]"
            style={{ animation: "pulse 2.6s ease-in-out infinite" }}
          />
          <div
            className="absolute -top-1.5 left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[rgba(208,227,255,0.88)] blur-[0.5px]"
            style={{ animation: "pulse 3.9s 0.8s ease-in-out infinite" }}
          />
        </div>

        {/* ── Starfield ─────────────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 z-[4]">
          {STARS.map((s, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width:  `${s.w * 4}px`,
                height: `${s.w * 4}px`,
                top:    s.top,
                left:   s.left,
                filter: `blur(${s.w > 1.5 ? 0.6 : 0}px)`,
                animation: `pulse ${s.dur} ${s.delay} ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        {/* ── Floating bokeh particles ───────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 z-[4]">
          {BOKEH.map((b, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left:   b.l,
                top:    b.t,
                width:  `${b.s}px`,
                height: `${b.s}px`,
                background: "radial-gradient(circle, rgba(186,214,235,0.65) 0%, transparent 70%)",
                filter: "blur(3px)",
                animation: `floatUp ${b.dur} ${b.delay} ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Hero content ──────────────────────────────────────────────── */}
      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-end min-h-screen pb-14 sm:pb-20 md:pb-28 lg:pb-36">

        {/* Subtle glass card — light tint so the photo shows through, text shadow does the heavy lifting */}
        {/* <div
          className="w-full max-w-2xl mx-auto text-center rounded-3xl px-6 sm:px-10 md:px-14 pt-8 sm:pt-10 pb-8 sm:pb-10"
          style={{
            background: "rgba(2,8,25,0.18)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            border: "1px solid rgba(186,214,235,0.1)",
          }}
        > */}
          {/* Eyebrow label */}
          <div
            className={`transition-all duration-700 ease-out flex items-center justify-center gap-3 sm:gap-5 mb-5 sm:mb-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.1s" }}
          >
            <div
              className="h-px flex-1 max-w-[50px] sm:max-w-[80px]"
              style={{ background: `linear-gradient(to right, transparent, rgba(186,214,235,0.85))` }}
            />
            <span
              className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.42em] uppercase font-sans"
              style={{ color: palette.skyBlue, textShadow: "0 1px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)" }}
            >
              Celestial Debut Night
            </span>
            <div
              className="h-px flex-1 max-w-[50px] sm:max-w-[80px]"
              style={{ background: `linear-gradient(to left, transparent, rgba(186,214,235,0.85))` }}
            />
          </div>

          {/* Intro line */}
          <div
            className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.25s" }}
          >
            <p
              className={`${cormorant.className} text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3 italic`}
              style={{
                color: "rgba(237,241,246,0.95)",
                letterSpacing: "0.04em",
                textShadow: "0 2px 12px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.6)",
              }}
            >
              you are warmly invited to celebrate
            </p>
          </div>

          {/* Debutant name */}
          <div
            className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "0.42s" }}
          >
            <h1
              className={`${greatVibes.className} leading-none mb-1`}
              style={{
                fontSize: "clamp(3.5rem, 13vw, 8.5rem)",
                color: palette.moonBeige,
                letterSpacing: "0.06em",
                textShadow: `
                  0 0 22px rgba(208,227,255,0.85),
                  0 0 50px rgba(186,214,235,0.45),
                  0 2px 6px rgba(0,0,0,1),
                  0 6px 24px rgba(0,0,0,0.95),
                  0 12px 40px rgba(0,0,0,0.7)
                `,
              }}
            >
              {siteConfig.couple.debutNickname}
            </h1>
          </div>

          {/* Script subtitle */}
          <div
            className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.58s" }}
          >
            <p
              className={`${windSong.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 sm:mb-7`}
              style={{
                color: "rgba(237,241,246,0.95)",
                marginTop: "-0.2rem",
                textShadow: "0 2px 10px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.9), 0 0 28px rgba(0,0,0,0.6)",
              }}
            >
              on her 18th birthday
            </p>
          </div>

          {/* Ornament divider */}
          {/* <div
            className={`transition-all duration-700 ease-out flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-7 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "0.72s" }}
          >
            <div
              className="h-px flex-1 max-w-[70px] sm:max-w-[110px]"
              style={{
                background: `linear-gradient(to right, transparent, rgba(186,214,235,0.9))`,
                boxShadow: "0 0 6px rgba(186,214,235,0.4)",
              }}
            />
            <Sparkles
              size={12}
              className="animate-[pulse_3s_ease-in-out_infinite]"
              style={{ color: palette.dawnBlue, filter: "drop-shadow(0 0 5px rgba(208,227,255,0.9))" }}
            />
            <div
              className="w-2 h-2 rounded-full border border-white/50"
              style={{ boxShadow: "0 0 8px rgba(237,241,246,0.7)" }}
            />
            <Sparkles
              size={12}
              className="animate-[pulse_4s_1s_ease-in-out_infinite]"
              style={{ color: palette.dawnBlue, filter: "drop-shadow(0 0 5px rgba(208,227,255,0.9))" }}
            />
            <div
              className="h-px flex-1 max-w-[70px] sm:max-w-[110px]"
              style={{
                background: `linear-gradient(to left, transparent, rgba(186,214,235,0.9))`,
                boxShadow: "0 0 6px rgba(186,214,235,0.4)",
              }}
            />
          </div> */}

          {/* Date + venue info row */}
          <div
            className={`transition-all duration-700 ease-out flex justify-center mb-7 sm:mb-8 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "0.86s" }}
          >
            <div
              className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl border"
              style={{
                background: "rgba(8,31,92,0.55)",
                borderColor: "rgba(186,214,235,0.28)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(237,241,246,0.12)",
              }}
            >
              <span
                className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase font-sans font-medium"
                style={{ color: palette.skyBlue }}
              >
                {siteConfig.ceremony.day}
              </span>
              <span className="hidden sm:block w-px h-3.5 bg-white/20" />
              <span
                className="text-xs sm:text-sm tracking-[0.22em] font-semibold uppercase font-sans"
                style={{ color: palette.porcelain }}
              >
                {siteConfig.ceremony.date}
              </span>
              <span className="hidden sm:block w-px h-3.5 bg-white/20" />
              <span
                className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-sans text-center sm:text-left"
                style={{ color: "rgba(208,227,255,0.88)" }}
              >
                {siteConfig.ceremony.venue}
              </span>
            </div>
          </div>

          {/* CTA button */}
          <div
            className={`transition-all duration-700 ease-out flex justify-center ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "1.0s" }}
          >
            <a
              href="#guest-list"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full transition-all duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(186,214,235,0.7)]"
              style={{ boxShadow: "0 0 0 1px rgba(186,214,235,0.45), 0 16px 44px rgba(0,0,0,0.6)" }}
            >
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                style={{
                  background: `linear-gradient(120deg, ${palette.midnightBlue}, ${palette.royalBlue}, ${palette.skyBlue}, ${palette.dawnBlue})`,
                }}
              />
              <span
                className="absolute inset-0 rounded-full transition-all duration-500 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, rgba(8,31,92,0.92) 0%, rgba(51,78,172,0.75) 60%, rgba(186,214,235,0.2) 100%)`,
                }}
              />
              <span
                className="relative z-10 inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 text-[9px] sm:text-[11px] md:text-xs tracking-[0.48em] uppercase font-semibold font-sans"
                style={{ color: palette.porcelain }}
              >
                {/* <Sparkles size={11} className="opacity-80 animate-[pulse_3s_ease-in-out_infinite]" style={{ color: palette.dawnBlue }} /> */}
                RSVP &amp; Guestbook
                {/* <Sparkles size={11} className="opacity-80 animate-[pulse_3s_1s_ease-in-out_infinite]" style={{ color: palette.dawnBlue }} /> */}
              </span>
            </a>
          </div>
        </div>
      {/* </div> */}

      {/* ── Scroll indicator ──────────────────────────────────────────── */}
      {/* <div
        className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 transition-all duration-1000 delay-[1400ms] ${
          isVisible ? "opacity-60" : "opacity-0"
        }`}
      >
        <span
          className="text-[8px] sm:text-[9px] tracking-[0.42em] uppercase font-sans"
          style={{ color: "rgba(186,214,235,0.85)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8 sm:h-10"
          style={{
            background: "linear-gradient(to bottom, rgba(186,214,235,0.9), transparent)",
            animation: "scrollBob 2.6s ease-in-out infinite",
          }}
        />
      </div> */}
    </section>
  )
}
