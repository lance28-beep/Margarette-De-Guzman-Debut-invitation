"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, Navigation, Copy, Check, Palette, Car, Sparkles, ListOrdered, Music, Video, Backpack } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Great_Vibes, Inter } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

// Soft pink beach details palette
const COLORS = {
     // Section background
  sectionBackground: "#020819",
  // Celestial gradients
  gradientSky: "#BAD6EB",
  gradientRoyal: "#334EAC",
  gradientMidnight: "#081F5C",
  // Card + text
  unitCardBg: "rgba(2, 8, 25, 0.96)",
  unitCardBorder: "rgba(186, 214, 235, 0.55)",
  unitNumber: "#F7F2EB",
  unitLabel: "#BAD6EB",
  unitTagline: "rgba(237, 241, 246, 0.8)",
  // Header
  eyebrow: "#BAD6EB",
  heading: "#F7F2EB",
  subheading: "rgba(237, 241, 246, 0.86)",
  // Date card
  dateAccent: "#BAD6EB",
  dateDay: "#F7F2EB",
  dateYear: "rgba(237, 241, 246, 0.85)",
  // Time + location
  timeLocation: "rgba(237, 241, 246, 0.8)",
  // MoonBeige
  MoonBeige: "#F7F2EB",
  // Porcelain
  Porcelain: "#EDF1F6",
  // Moonlight
  Moonlight: "#BACEDB",
  // Royal Blue
  RoyalBlue: "#334EAC",
  // Midnight Blue
  MidnightBlue: "#081F5C",

}
const starField: { top: string; left: string; size: number; delay: string; duration: string; glow?: boolean }[] = [
  { top: "5%",  left: "7%",  size: 1.2, delay: "0s",   duration: "6.2s" },
  { top: "8%",  left: "24%", size: 2.2, delay: "1.1s", duration: "4.8s", glow: true },
  { top: "11%", left: "44%", size: 1.4, delay: "0.5s", duration: "5.6s" },
  { top: "14%", left: "62%", size: 1.9, delay: "1.9s", duration: "4.3s", glow: true },
  { top: "9%",  left: "78%", size: 1.1, delay: "0.8s", duration: "5.0s" },
  { top: "19%", left: "14%", size: 1.3, delay: "2.2s", duration: "5.9s" },
  { top: "22%", left: "36%", size: 2.4, delay: "0.3s", duration: "6.4s", glow: true },
  { top: "26%", left: "57%", size: 1.0, delay: "1.5s", duration: "4.6s" },
  { top: "23%", left: "88%", size: 1.6, delay: "0.1s", duration: "5.3s" },
  { top: "33%", left: "6%",  size: 1.2, delay: "2.6s", duration: "4.9s" },
  { top: "38%", left: "29%", size: 1.5, delay: "1.0s", duration: "6.0s" },
  { top: "41%", left: "73%", size: 2.1, delay: "0.6s", duration: "5.5s", glow: true },
  { top: "44%", left: "92%", size: 1.1, delay: "2.0s", duration: "4.7s" },
  { top: "50%", left: "17%", size: 1.4, delay: "1.4s", duration: "5.8s" },
  { top: "55%", left: "48%", size: 1.9, delay: "0.9s", duration: "6.5s", glow: true },
  { top: "59%", left: "82%", size: 1.2, delay: "1.7s", duration: "5.2s" },
  { top: "65%", left: "33%", size: 1.5, delay: "2.3s", duration: "4.4s" },
  { top: "69%", left: "61%", size: 1.0, delay: "0.4s", duration: "5.7s" },
  { top: "73%", left: "8%",  size: 2.3, delay: "1.3s", duration: "6.1s", glow: true },
  { top: "78%", left: "76%", size: 1.3, delay: "0.7s", duration: "4.5s" },
  { top: "83%", left: "22%", size: 1.6, delay: "2.8s", duration: "5.9s" },
  { top: "87%", left: "45%", size: 1.1, delay: "1.6s", duration: "4.8s" },
  { top: "91%", left: "85%", size: 1.9, delay: "0.2s", duration: "6.3s", glow: true },
  { top: "3%",  left: "55%", size: 1.3, delay: "3.0s", duration: "5.4s" },
  { top: "47%", left: "40%", size: 1.0, delay: "2.5s", duration: "4.2s" },
]

const PROGRAM_PART1 = [
 "Opening of the Debut Program",
	"Entrance of the Debutante’s Family (Parents)",
	"Grand Entrance of the Debutante",
	"Opening Prayer",
	"Trivia Segment c/o Host",
	"18 Candles Ceremony",
	"Special Video Greetings from Kuya Earl and Ate Pat",
	"Singing of the Happy Birthday Song",
	"Blowing of the Birthday Candle",
	"18 Bills",
	"18 Gifts",
	"18 Roses",
	"Grace Before Meals",
	"Dinner",
	"DJ / Background Music",
]

const PROGRAM_PART2 = [
	"Cotillion de Honor",
	"Trivia Segment c/o Host",
	"18 Shots with Trivia Games (Questions from the Celebrant)",
	"18 Perfumes",
	"18 Bags (Backpack or Sling Bag)",
	"18 Footwear (Slides or Sandal)",
	"Intermission Song Number – Host",
	"Message from the Parents",
	"Message from the Celebrant",
	"Closing Piel – Host",
]

type Particle = {
  id: number
  size: number
  left: number
  top: number
  delay: number
  duration: number
  opacity: number
}

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [particles, setParticles] = useState<Particle[]>([])

  // Generate particles only on the client to avoid SSR hydration mismatches
  useEffect(() => {
    if (particles.length > 0) return
    const generated: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1, // 1-4px
      left: Math.random() * 100, // 0-100%
      top: Math.random() * 100, // 0-100%
      delay: Math.random() * 5, // 0-5s
      duration: Math.random() * 8 + 10, // 10-18s
      opacity: Math.random() * 0.6 + 0.3, // 0.3-0.9
    }))
    setParticles(generated)
  }, [particles.length])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems((prev) => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems((prev) => {
          const updated = new Set(prev)
          updated.delete(itemId)
          return updated
        })
      }, 1800)
    } catch (error) {
      console.error("Failed to copy text:", error)
    }
  }

  const { ceremony } = siteConfig
  const venue = ceremony.location
  const guestsCall = ceremony.guestsTime
  const mapsLink = `https://maps.google.com/?q=${encodeURIComponent(venue)}`

  const openInMaps = () => {
    window.open(mapsLink, "_blank", "noopener,noreferrer")
  }

  const schedule = [
    { label: "Program begins", value: ceremony.time },
    guestsCall && { label: "Guest Doors Open", value: guestsCall },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <Section
      id="details"
      className="relative overflow-hidden py-14 sm:py-18 md:py-20 lg:py-24"
    >
      
     {/* Celestial, dreamy background */}
     <div className="absolute inset-0 pointer-events-none overflow-hidden">

{/* Deep celestial base */}
<div
  className="absolute inset-0"
  style={{
    background: `
      radial-gradient(ellipse at 12% 15%, rgba(186,214,235,0.32) 0%, transparent 48%),
      radial-gradient(ellipse at 88% 80%, rgba(51,78,172,0.55) 0%, transparent 55%),
      radial-gradient(ellipse at 50% 50%, rgba(8,31,92,0.5) 0%, transparent 70%),
      linear-gradient(160deg, rgba(2,6,20,1) 0%, rgba(6,18,58,0.88) 40%, rgba(2,6,20,1) 100%)
    `,
  }}
/>

{/* Nebula cloud — top-left blue mist */}
<div
  className="absolute -top-16 -left-20 w-[55%] h-[55%] mix-blend-screen"
  style={{
    background: "radial-gradient(ellipse at 40% 40%, rgba(186,214,235,0.9) 0%, rgba(51,78,172,0.55) 38%, transparent 70%)",
    filter: "blur(52px)",
    opacity: 0.28,
    animation: "countdownNebula1 18s ease-in-out infinite",
  }}
/>

{/* Nebula cloud — bottom-right royal mist */}
<div
  className="absolute -bottom-20 -right-20 w-[60%] h-[60%] mix-blend-screen"
  style={{
    background: "radial-gradient(ellipse at 60% 60%, rgba(51,78,172,0.88) 0%, rgba(8,31,92,0.5) 45%, transparent 70%)",
    filter: "blur(58px)",
    opacity: 0.25,
    animation: "countdownNebula2 22s ease-in-out infinite",
  }}
/>

{/* Nebula cloud — mid soft glow */}
<div
  className="absolute top-1/3 left-1/4 w-[50%] h-[40%] mix-blend-screen"
  style={{
    background: "radial-gradient(ellipse at 50% 50%, rgba(208,227,255,0.85) 0%, transparent 65%)",
    filter: "blur(64px)",
    opacity: 0.13,
    animation: "countdownNebula3 26s ease-in-out infinite",
  }}
/>

{/* Aurora shimmer ribbon */}
<div
  className="absolute inset-0 mix-blend-screen"
  style={{
    background: `
      radial-gradient(ellipse at 20% 35%, rgba(208,227,255,0.22) 0%, transparent 50%),
      radial-gradient(ellipse at 78% 25%, rgba(186,214,235,0.24) 0%, transparent 55%)
    `,
    opacity: 0.65,
    animation: "countdownAurora 16s ease-in-out infinite",
  }}
/>

{/* Moon — top-right, partially cropped behind top edge so it never overlaps content */}
<div
  className="absolute right-4 sm:right-10 md:right-16 -top-10 sm:-top-14 md:-top-16 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full pointer-events-none"
  style={{
    backgroundImage: `radial-gradient(circle at 28% 28%, #D0E3FF 0%, #F7F2EB 36%, transparent 70%)`,
    boxShadow: `0 0 60px rgba(186,214,235,0.99), 0 0 120px rgba(186,214,235,0.88), 0 0 200px rgba(8,31,92,0.9)`,
  }}
>
  <div
    className="absolute rounded-full bg-[#020c1e]"
    style={{ width: "84%", height: "84%", top: "10%", right: "-4%" }}
  />
  <div className="absolute inset-0 rounded-full border border-white/25" />
  {/* Sparkle companions */}
  <div
    className="absolute -bottom-2 -left-3 w-2 h-2 rounded-full bg-white/90 blur-[1px]"
    style={{ animation: "countdownTwinkle 2.8s 0.4s ease-in-out infinite" }}
  />
  <div
    className="absolute top-3 -left-4 w-1 h-1 rounded-full bg-white/70 blur-[0.5px]"
    style={{ animation: "countdownTwinkle 3.6s 1.2s ease-in-out infinite" }}
  />
</div>

{/* Shooting star */}
<div
  className="absolute h-px"
  style={{
    width: "clamp(80px, 9vw, 140px)",
    top: "18%",
    left: "18%",
    background: "linear-gradient(90deg, transparent, rgba(237,241,246,0.98) 60%, transparent)",
    boxShadow: "0 0 6px rgba(237,241,246,0.95)",
    transform: "rotate(-26deg)",
    animation: "countdownShootingStar 10s 2.5s ease-in-out infinite",
    opacity: 0,
  }}
/>

{/* Stars */}
<div className="absolute inset-0 pointer-events-none">
  {starField.map((star, index) => (
    <div
      key={index}
      className="absolute rounded-full bg-[rgba(237,241,246,0.98)]"
      style={{
        width: `${star.size}px`,
        height: `${star.size}px`,
        top: star.top,
        left: star.left,
        opacity: 0.85,
        filter: star.glow
          ? `blur(0.5px) drop-shadow(0 0 3px rgba(208,227,255,0.95))`
          : star.size > 1.4 ? "blur(0.4px)" : "blur(0.2px)",
        animation: `countdownTwinkle ${star.duration} ${star.delay} ease-in-out infinite`,
      }}
    />
  ))}
</div>
</div>

      {/* Animated white dot particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${particle.opacity})`,
              animation: `floatParticle ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Particle animation styles */}
      <style>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
            opacity: 0.9;
          }
          75% {
            transform: translateY(-20px) translateX(5px);
            opacity: 0.6;
          }
        }
      `}</style>

      <div className="relative max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase"
            style={{
              borderColor: COLORS.dateAccent,
              borderWidth: 1,
              backgroundColor: "rgba(8,31,92,0.22)",
              color: COLORS.dateDay,
            }}
          >
            Event Details
          </div>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4`}
            style={{
              color: COLORS.heading,
              textShadow: "0 12px 32px rgba(8,31,92,0.38)",
            }}
          >
            Your Day Guide
          </h2>
          <p
            className={`${inter.className} text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed`}
            style={{ color: COLORS.subheading }}
          >
            Schedule, venue, dress code, and travel tips for {siteConfig.couple.debutNickname}&apos;s 18th—everything you need for our soft pink beach celebration.
          </p>
        </div>

        <div className="grid gap-5 lg:gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch mb-12 sm:mb-16 lg:mb-20">
          {/* Venue card */}
          <div
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border backdrop-blur-2xl shadow-xl"
            style={{ backgroundColor: COLORS.MoonBeige, borderColor: `${COLORS.unitCardBorder}` }}
          >
            <div className="relative h-[220px] sm:h-60 md:h-80 lg:h-[380px] xl:h-[420px] overflow-hidden">
              <Image
                src="/Details/Details.png"
                alt={venue}
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 sm:bottom-6 text-white">
                <h3 className="text-xl sm:text-3xl font-serif font-semibold tracking-wide drop-shadow-lg">
                  {siteConfig.wedding.venue}
                </h3>
                {/* <p className="text-[10px] sm:text-[12px] text-white/85 tracking-[0.24em] uppercase mt-1">
                  {siteConfig.ceremony.location}
                </p> */}
              </div>
            </div>

            <div className="p-4 sm:p-7 lg:p-8 space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div
                  className="inline-flex justify-center rounded-full px-4 py-1.5 text-[9px] sm:text-[11px] tracking-[0.24em] sm:tracking-[0.32em] uppercase whitespace-nowrap"
                  style={{
                    borderColor: `${COLORS.unitCardBorder}`,
                    borderWidth: 1,
                    backgroundColor: COLORS.unitCardBg,
                    color: COLORS.unitNumber,
                  }}
                >
                  {`${ceremony.day}, ${ceremony.date}`}
                </div>
                <p
                  className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center sm:text-right"
                  style={{ color: COLORS.MidnightBlue}}
                >
                  Guests may arrive starting {guestsCall}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                {schedule.map((entry) => (
                  <div
                    key={entry.label}
                    className="rounded-xl border px-3.5 py-3 text-center bg-MoonBeige"
                    style={{ borderColor: `${COLORS.Moonlight}` }}
                  >
                    <p
                      className="text-[9px] sm:text-[11px] tracking-[0.34em] uppercase mb-1"
                      style={{ color: COLORS.MidnightBlue }}
                    >
                      {entry.label}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: COLORS.MidnightBlue }} />
                      <span>{entry.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-row gap-2.5 sm:gap-3">
                <button
                  onClick={openInMaps}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundImage: `linear-gradient(120deg, ${COLORS.RoyalBlue}, ${COLORS.MidnightBlue})`,
                    color: COLORS.MoonBeige,
                  }}
                  aria-label="Get directions to the venue"
                >
                  <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Get Directions
                </button>
                <button
                  onClick={() => copyToClipboard(venue, "venue")}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-xs sm:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    borderColor: `${COLORS.unitCardBorder}`,
                    color: COLORS.unitNumber,
                    backgroundColor: COLORS.unitCardBg,
                  }}
                  aria-label="Copy venue address"
                >
                  {copiedItems.has("venue") ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="hidden sm:inline">{copiedItems.has("venue") ? "Copied!" : "Copy Address"}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {/* Program card */}
            <div
              className="rounded-2xl sm:rounded-3xl border backdrop-blur-xl p-5 sm:p-7 lg:p-8 space-y-4 bg-white/90"
              style={{ borderColor: `${COLORS.Moonlight}` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{ backgroundColor: COLORS.RoyalBlue }}
                >
                  <ListOrdered className="h-5 w-5 text-MoonBeige" />
                </div>
                <div>
                  <p
                    className="text-xs sm:text-sm uppercase tracking-[0.38em]"
                    style={{ color: COLORS.RoyalBlue }}
                  >
                    Debut Program
                  </p>
                  <h3
                    className="text-base sm:text-lg font-semibold"
                    style={{ color: COLORS.MidnightBlue }}
                  >
                    Celebration Flow
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p
                    className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-2 flex items-center gap-2"
                    style={{ color: COLORS.MidnightBlue }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.RoyalBlue }} />
                    Part 1
                  </p>
                  <ul
                    className="space-y-1.5 text-xs sm:text-sm leading-relaxed"
                    style={{ color: COLORS.MidnightBlue }}
                  >
                    {PROGRAM_PART1.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Sparkles className="mt-1 h-3 w-3 flex-shrink-0" style={{ color: COLORS.RoyalBlue }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p
                    className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-2 flex items-center gap-2 mt-4"
                    style={{ color: COLORS.MidnightBlue }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.RoyalBlue }} />
                    Part 2
                  </p>
                  <ul
                    className="space-y-1.5 text-xs sm:text-sm leading-relaxed"
                    style={{ color: COLORS.MidnightBlue }}
                  >
                    {PROGRAM_PART2.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Sparkles className="mt-1 h-3 w-3 flex-shrink-0" style={{ color: COLORS.RoyalBlue }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Attire card */}
            <div
              className="rounded-2xl sm:rounded-3xl border backdrop-blur-xl p-5 sm:p-7 lg:p-8 space-y-3 sm:space-y-4 bg-white/90"
              style={{ borderColor: `${COLORS.Moonlight}` }}
            >
              <div className="flex items-center gap-3">
                <Palette className="h-6 w-6" style={{ color: COLORS.RoyalBlue }} />
                <div>
                  <p
                    className="text-xs sm:text-sm uppercase tracking-[0.38em]"
                    style={{ color: COLORS.RoyalBlue }}
                  >
                    Attire & Palette
                  </p>
                  <h3
                    className="text-base sm:text-lg font-semibold"
                    style={{ color: COLORS.MidnightBlue }}
                  >
                    Guest Attire
                  </h3>
                </div>
              </div>
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: COLORS.MidnightBlue }}
              >
                {siteConfig.dressCode.note}
              </p>
              {/* Attire guidelines: ladies & gentlemen */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="relative w-full rounded-xl overflow-hidden border" style={{ borderColor: `${COLORS.Moonlight}` }}>
                  <Image
                    src="/Details/ladiesAttire.png"
                    alt="Ladies attire guidelines"
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain"
                  />
                  <p
                    className="text-center text-xs font-semibold py-2"
                    style={{ color: COLORS.RoyalBlue }}
                  >
                    Ladies
                  </p>
                </div>
                <div className="relative w-full rounded-xl overflow-hidden border" style={{ borderColor: `${COLORS.Moonlight}` }}>
                  <Image
                    src="/Details/gentlemensAttire.png"
                    alt="Gentlemen attire guidelines"
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain"
                  />
                  <p
                    className="text-center text-xs font-semibold py-2"
                    style={{ color: COLORS.RoyalBlue }}
                  >
                    Gentlemen
                  </p>
                </div>
              </div>
              {/* Color palette display */}
              <div className="flex flex-col items-center gap-2 pt-2">
                <p
                  className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: COLORS.MidnightBlue }}
                >
                  Color Palette
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {[
                    { color: COLORS.RoyalBlue, label: "Royal Blue" },
                    { color: COLORS.MidnightBlue, label: "Midnight Blue" },
                    { color: COLORS.MoonBeige, label: "Moon Beige" },
                    { color: COLORS.Porcelain, label: "Porcelain" },
                    { color: COLORS.Moonlight, label: "Moonlight" },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white/30 shadow-lg transition-transform duration-300 hover:scale-110"
                        style={{ backgroundColor: item.color }}
                        title={item.label}
                      />
                      <span
                        className="text-[8px] sm:text-[9px] hidden sm:block"
                        style={{ color: COLORS.MidnightBlue }}
                      >
                        {item.color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel card */}
            <div
              className="rounded-2xl sm:rounded-3xl border backdrop-blur-xl p-5 sm:p-7 lg:p-8 space-y-3 sm:space-y-4 bg-white/90"
              style={{ borderColor: `${COLORS.Moonlight}` }}
            >
              <div className="flex items-center gap-3">
                <Car className="h-6 w-6" style={{ color: COLORS.RoyalBlue }} />
                <div>
                  <p
                    className="text-xs sm:text-sm uppercase tracking-[0.38em]"
                    style={{ color: COLORS.RoyalBlue }}
                  >
                    Travel Notes
                  </p>
                  <h3
                    className="text-base sm:text-lg font-semibold"
                    style={{ color: COLORS.MidnightBlue }}
                  >
                    Parking & Transport
                  </h3>
                </div>
              </div>
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: COLORS.MidnightBlue }}
              >
                Complimentary parking is available at {siteConfig.ceremony.location}. We recommend arriving a little early to enjoy the photo spots and settle in before the program begins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
