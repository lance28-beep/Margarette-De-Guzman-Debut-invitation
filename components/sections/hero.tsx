"use client"

import { useEffect, useState, useMemo } from "react"
import { Sparkles } from "lucide-react"
import { WindSong, Great_Vibes } from "next/font/google"
import { siteConfig } from "@/content/site"
import { Cormorant_Garamond } from "next/font/google"
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const desktopImages = [
  "/desktop-background/debut (1).jpg",
]

const mobileImages = [
  "/mobile-background/debut (6).jpg",
]

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const windSong = WindSong({
  subsets: ["latin"],
  weight: ["400", "500"],
})

const palette = {
  midnightBlue: "#081F5C",
  royalBlue: "#334EAC",
  skyBlue: "#BAD6EB",
  dawnBlue: "#D0E3FF",
  porcelain: "#EDF1F6",
  moonBeige: "#F7F2EB",
}

// Pre-determined star positions so they remain stable during rendering
const STARS = [
  { w: 1,   h: 1,   top: "8%",  left: "12%", delay: "0s",    dur: "3.2s" },
  { w: 2,   h: 2,   top: "15%", left: "28%", delay: "0.6s",  dur: "4.1s" },
  { w: 1.5, h: 1.5, top: "22%", left: "68%", delay: "1.2s",  dur: "2.8s" },
  { w: 1,   h: 1,   top: "35%", left: "82%", delay: "0.3s",  dur: "3.7s" },
  { w: 2,   h: 2,   top: "10%", left: "50%", delay: "1.8s",  dur: "4.5s" },
  { w: 1,   h: 1,   top: "48%", left: "8%",  delay: "0.9s",  dur: "3.1s" },
  { w: 1.5, h: 1.5, top: "55%", left: "42%", delay: "2.1s",  dur: "5.0s" },
  { w: 1,   h: 1,   top: "62%", left: "75%", delay: "0.5s",  dur: "2.6s" },
  { w: 2.5, h: 2.5, top: "20%", left: "88%", delay: "1.5s",  dur: "3.9s" },
  { w: 1,   h: 1,   top: "75%", left: "18%", delay: "2.5s",  dur: "4.3s" },
  { w: 1.5, h: 1.5, top: "30%", left: "38%", delay: "0.7s",  dur: "3.5s" },
  { w: 1,   h: 1,   top: "44%", left: "60%", delay: "1.9s",  dur: "2.9s" },
  { w: 2,   h: 2,   top: "6%",  left: "73%", delay: "1.1s",  dur: "4.8s" },
  { w: 1,   h: 1,   top: "82%", left: "55%", delay: "0.2s",  dur: "3.3s" },
  { w: 1.5, h: 1.5, top: "70%", left: "35%", delay: "1.7s",  dur: "4.0s" },
  { w: 1,   h: 1,   top: "90%", left: "80%", delay: "2.3s",  dur: "3.6s" },
  { w: 2,   h: 2,   top: "5%",  left: "42%", delay: "0.4s",  dur: "5.2s" },
  { w: 1,   h: 1,   top: "58%", left: "92%", delay: "1.4s",  dur: "2.7s" },
  { w: 1.5, h: 1.5, top: "38%", left: "22%", delay: "2.0s",  dur: "4.6s" },
  { w: 1,   h: 1,   top: "26%", left: "6%",  delay: "0.8s",  dur: "3.0s" },
]

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const backgroundImages = useMemo(() => (isMobile ? mobileImages : desktopImages), [isMobile])

  useEffect(() => {
    setImagesLoaded(false)
    setCurrentImageIndex(0)
    const firstImg = new Image()
    firstImg.src = backgroundImages[0]
    firstImg.onload = () => setImagesLoaded(true)
    setTimeout(() => {
      if (typeof navigator !== "undefined" && (navigator as any).connection?.saveData) return
      backgroundImages.slice(1, 3).forEach((src) => {
        const img = new Image()
        img.decoding = "async"
        img.loading = "lazy" as any
        img.src = src
      })
    }, 200)
  }, [backgroundImages])

  useEffect(() => {
    if (!imagesLoaded) return
    const t = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(t)
  }, [imagesLoaded, backgroundImages])

  useEffect(() => {
    if (imagesLoaded) setIsVisible(true)
  }, [imagesLoaded])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020819]"
    >
      {/* ── Background image carousel ───────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full">
        {imagesLoaded &&
          backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                willChange: "opacity",
              }}
            />
          ))}

        {/* Deep celestial gradient layers */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `
              radial-gradient(ellipse at 15% 20%, rgba(186,214,235,0.18) 0%, transparent 50%),
              radial-gradient(ellipse at 85% 70%, rgba(51,78,172,0.45) 0%, transparent 55%),
              linear-gradient(175deg, rgba(2,8,25,0.55) 0%, rgba(8,31,92,0.35) 45%, rgba(2,6,18,0.88) 100%)
            `,
          }}
        />
        {/* Bottom vignette for text readability */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: `linear-gradient(to top, rgba(2,8,25,0.97) 0%, rgba(2,8,25,0.7) 22%, transparent 50%)`,
          }}
        />
        {/* Top vignette */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: `linear-gradient(to bottom, rgba(2,8,25,0.55) 0%, transparent 30%)`,
          }}
        />

        {/* Aurora-style ambient shimmer */}
        <div
          className="absolute inset-0 z-[2] animate-[pulse_12s_ease-in-out_infinite]"
          style={{
            background: `
              radial-gradient(ellipse at 20% 40%, rgba(208,227,255,0.12) 0%, transparent 45%),
              radial-gradient(ellipse at 75% 25%, rgba(186,214,235,0.10) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      {/* ── Moon ──────────────────────────────────────────────────────── */}
      {/* <div className="absolute right-5 sm:right-10 md:right-16 top-8 sm:top-14 md:top-16 z-[3]">
   
        <div
          className="absolute -inset-6 sm:-inset-8 rounded-full animate-[pulse_6s_ease-in-out_infinite]"
          style={{
            background: `radial-gradient(circle, rgba(186,214,235,0.12) 0%, rgba(186,214,235,0.04) 50%, transparent 70%)`,
          }}
        />
 
        <div
          className="absolute -inset-3 sm:-inset-4 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(208,227,255,0.18) 0%, transparent 65%)`,
            boxShadow: `0 0 40px 8px rgba(186,214,235,0.22)`,
          }}
        />

        <div
          className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle at 28% 26%, ${palette.dawnBlue} 0%, ${palette.moonBeige}f0 38%, rgba(186,214,235,0.6) 65%, transparent 80%)
            `,
            boxShadow: `
              0 0 55px rgba(186,214,235,0.98),
              0 0 100px rgba(186,214,235,0.75),
              0 0 160px rgba(208,227,255,0.45),
              inset 0 0 18px rgba(237,241,246,0.35)
            `,
          }}
        >

          <div
            className="absolute rounded-full bg-[#030c1e]"
            style={{
              width: "88%",
              height: "88%",
              top: "10%",
              right: "-4%",
            }}
          />

          <div
            className="absolute inset-0 rounded-full border border-white/30"
            style={{ boxShadow: `inset 0 0 10px rgba(237,241,246,0.4)` }}
          />
        </div>

        <div className="absolute -bottom-2 -left-3 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white blur-[1px] animate-[pulse_2.5s_ease-in-out_infinite]" />
        <div className="absolute -top-2 left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[rgba(208,227,255,0.9)] blur-[0.5px] animate-[pulse_3.8s_ease-in-out_infinite]" />
      </div> */}

      {/* ── Starfield ─────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-[3]">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${s.w}px`,
              height: `${s.h}px`,
              top: s.top,
              left: s.left,
              opacity: 0.85,
              filter: `blur(${s.w > 1.5 ? 0.5 : 0}px)`,
              animation: `pulse ${s.dur} ${s.delay} ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Hero content ──────────────────────────────────────────────── */}
      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-end min-h-screen pb-14 sm:pb-20 md:pb-28 lg:pb-36 xl:pb-44">
        <div
          className={`w-full max-w-4xl text-center transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* ── Eyebrow label ─────────────────────────────────────────── */}
          <div
            className="flex items-center justify-center gap-3 sm:gap-5 mb-5 sm:mb-7"
            style={{ animationDelay: "0.1s" }}
          >
            <div
              className="h-px flex-1 max-w-[60px] sm:max-w-[90px]"
              style={{
                background: `linear-gradient(to right, transparent, rgba(186,214,235,0.85))`,
              }}
            />
            <span
              className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.38em] sm:tracking-[0.45em] uppercase font-sans"
              style={{ color: palette.skyBlue }}
            >
              Celestial Debut Night
            </span>
            <div
              className="h-px flex-1 max-w-[60px] sm:max-w-[90px]"
              style={{
                background: `linear-gradient(to left, transparent, rgba(186,214,235,0.85))`,
              }}
            />
          </div>

          {/* ── Intro line ──────────────────────────────────────────────── */}
          <p
            className={`${cormorant.className} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3`}
            style={{
              color: `rgba(237,241,246,0.85)`,
              textShadow: `0 4px 24px rgba(0,0,0,0.8)`,
              letterSpacing: "0.04em",
            }}
          >
            you are warmly invited to celebrate
          </p>

          {/* ── Debutant name ─────────────────────────────────────────── */}
          <h1
            className={`${greatVibes.className} leading-none mb-1`}
            style={{
              fontSize: "clamp(3.8rem, 13vw, 9rem)",
              color: palette.moonBeige,
              letterSpacing: "0.06em",
              textShadow: `
                0 0 25px rgba(208,227,255,0.9),
                0 0 55px rgba(186,214,235,0.6),
                0 20px 60px rgba(0,0,0,0.9)
              `,
            }}
          >
            {siteConfig.couple.debutNickname}
          </h1>

          {/* ── Script subtitle ───────────────────────────────────────── */}
          <p
            className={`${windSong.className} text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] mb-6 sm:mb-8`}
            style={{
              color: `rgba(237,241,246,0.88)`,
              textShadow: `0 6px 28px rgba(0,0,0,0.85)`,
              marginTop: "-0.2rem",
            }}
          >
            on her 18th birthday
          </p>

          {/* ── Decorative ornament divider ───────────────────────────── */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div
              className="h-px flex-1 max-w-[80px] sm:max-w-[120px] md:max-w-[160px]"
              style={{
                background: `linear-gradient(to right, transparent, rgba(186,214,235,0.9))`,
                boxShadow: `0 0 8px rgba(186,214,235,0.6)`,
              }}
            />
            {/* <Sparkles
              size={14}
              className="sm:w-4 sm:h-4 animate-[pulse_3s_ease-in-out_infinite]"
              style={{ color: palette.dawnBlue, filter: `drop-shadow(0 0 6px rgba(208,227,255,0.9))` }}
            /> */}
            <div
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-white/50"
              style={{ boxShadow: `0 0 8px rgba(237,241,246,0.7)` }}
            />
            {/* <Sparkles
              size={14}
              className="sm:w-4 sm:h-4 animate-[pulse_4s_ease-in-out_infinite]"
              style={{ color: palette.dawnBlue, filter: `drop-shadow(0 0 6px rgba(208,227,255,0.9))` }}
            /> */}
            <div
              className="h-px flex-1 max-w-[80px] sm:max-w-[120px] md:max-w-[160px]"
              style={{
                background: `linear-gradient(to left, transparent, rgba(186,214,235,0.9))`,
                boxShadow: `0 0 8px rgba(186,214,235,0.6)`,
              }}
            />
          </div>

          {/* ── Date + venue glass badge ───────────────────────────────── */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <div
              className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl backdrop-blur-md border"
              style={{
                background: `rgba(8,31,92,0.42)`,
                borderColor: `rgba(186,214,235,0.35)`,
                boxShadow: `0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(237,241,246,0.15)`,
              }}
            >
              <span
                className="text-[10px] sm:text-xs tracking-[0.32em] uppercase font-sans"
                style={{ color: palette.skyBlue }}
              >
                {siteConfig.ceremony.day}
              </span>
              <span className="hidden sm:block w-px h-4 bg-white/25" />
              <span
                className="text-xs sm:text-sm md:text-base tracking-[0.22em] font-semibold uppercase font-sans"
                style={{ color: palette.porcelain }}
              >
                {siteConfig.ceremony.date}
              </span>
              <span className="hidden sm:block w-px h-4 bg-white/25" />
              <span
                className="text-[10px] sm:text-xs tracking-[0.22em] uppercase font-sans text-center sm:text-left"
                style={{ color: `rgba(237,241,246,0.8)` }}
              >
                {siteConfig.ceremony.venue}
              </span>
            </div>
          </div>

          {/* ── CTA button ────────────────────────────────────────────── */}
          <div className="flex justify-center">
            <a
              href="#guest-list"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full transition-all duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(186,214,235,0.7)]"
              style={{ boxShadow: `0 0 0 1px rgba(186,214,235,0.55), 0 18px 45px rgba(0,0,0,0.55)` }}
            >
              {/* Animated glow border on hover */}
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                style={{
                  background: `linear-gradient(120deg, ${palette.midnightBlue}, ${palette.royalBlue}, ${palette.skyBlue}, ${palette.dawnBlue})`,
                }}
              />
              {/* Button fill */}
              <span
                className="absolute inset-0 rounded-full transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, rgba(8,31,92,0.85) 0%, rgba(51,78,172,0.7) 60%, rgba(186,214,235,0.25) 100%)`,
                  borderRadius: "9999px",
                }}
              />
              <span
                className="relative z-10 inline-flex items-center gap-2.5 px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 text-[9px] sm:text-[11px] md:text-xs tracking-[0.45em] uppercase font-semibold font-sans"
                style={{ color: palette.porcelain }}
              >
                <Sparkles
                  size={11}
                  className="opacity-80 animate-[pulse_3s_ease-in-out_infinite]"
                  style={{ color: palette.dawnBlue }}
                />
                RSVP &amp; Guestbook
                <Sparkles
                  size={11}
                  className="opacity-80 animate-[pulse_3s_1s_ease-in-out_infinite]"
                  style={{ color: palette.dawnBlue }}
                />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────── */}
      {/* <div
        className={`absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-70" : "opacity-0"
        }`}
      >
        <span
          className="text-[8px] sm:text-[9px] tracking-[0.38em] uppercase font-sans"
          style={{ color: `rgba(186,214,235,0.8)` }}
        >
          Scroll
        </span>
        <div
          className="w-px h-7 sm:h-9"
          style={{
            background: `linear-gradient(to bottom, rgba(186,214,235,0.9), transparent)`,
            animation: `pulse 2.4s ease-in-out infinite`,
          }}
        />
      </div> */}
    </section>
  )
}
