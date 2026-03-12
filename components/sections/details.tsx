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
  primaryPink: "#F6C1CF",
  secondaryPink: "#F48FB1",
  accentPink: "#D95C8A",
  lavender: "#D8B4E2",
  baseWhite: "#FFF6F8",
  textDeep: "rgba(108, 23, 61, 0.95)",
}

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
      className="relative overflow-hidden py-14 sm:py-18 md:py-20 lg:py-24 bg-[#FFF6F8]"
    >
      {/* Soft pink beach background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              radial-gradient(circle at 0% 0%, ${COLORS.primaryPink}26 0, transparent 55%),
              radial-gradient(circle at 100% 100%, ${COLORS.lavender}26 0, transparent 55%),
              radial-gradient(circle at 15% 80%, ${COLORS.accentPink}22 0, transparent 60%)
            `,
          }}
        />
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
              borderColor: COLORS.accentPink,
              borderWidth: 1,
              backgroundColor: "rgba(246,193,207,0.22)",
              color: COLORS.accentPink,
            }}
          >
            Event Details
          </div>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4`}
            style={{
              color: COLORS.accentPink,
              textShadow: "0 12px 32px rgba(217,92,138,0.38)",
            }}
          >
            Your Day Guide
          </h2>
          <p
            className={`${inter.className} text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed`}
            style={{ color: COLORS.textDeep }}
          >
            Schedule, venue, dress code, and travel tips for {siteConfig.couple.debutNickname}&apos;s 18th—everything you need for our soft pink beach celebration.
          </p>
        </div>

        <div className="grid gap-5 lg:gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch mb-12 sm:mb-16 lg:mb-20">
          {/* Venue card */}
          <div
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border backdrop-blur-2xl shadow-xl"
            style={{ backgroundColor: "rgba(255,255,255,0.9)", borderColor: `${COLORS.secondaryPink}55` }}
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
                    borderColor: `${COLORS.accentPink}88`,
                    borderWidth: 1,
                    backgroundColor: "rgba(246,193,207,0.2)",
                    color: COLORS.textDeep,
                  }}
                >
                  {`${ceremony.day}, ${ceremony.date}`}
                </div>
                <p
                  className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center sm:text-right"
                  style={{ color: COLORS.textDeep }}
                >
                  Guests may arrive starting {guestsCall}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                {schedule.map((entry) => (
                  <div
                    key={entry.label}
                    className="rounded-xl border px-3.5 py-3 text-center bg-white/80"
                    style={{ borderColor: `${COLORS.secondaryPink}66` }}
                  >
                    <p
                      className="text-[9px] sm:text-[11px] tracking-[0.34em] uppercase mb-1"
                      style={{ color: COLORS.textDeep }}
                    >
                      {entry.label}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: COLORS.accentPink }} />
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
                    backgroundImage: `linear-gradient(120deg, ${COLORS.primaryPink}, ${COLORS.secondaryPink})`,
                    color: "#2b1016",
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
                    borderColor: `${COLORS.accentPink}88`,
                    color: COLORS.textDeep,
                    backgroundColor: "rgba(255,255,255,0.9)",
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
              style={{ borderColor: `${COLORS.secondaryPink}55` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{ backgroundColor: COLORS.accentPink }}
                >
                  <ListOrdered className="h-5 w-5 text-[#FFF6F8]" />
                </div>
                <div>
                  <p
                    className="text-xs sm:text-sm uppercase tracking-[0.38em]"
                    style={{ color: COLORS.accentPink }}
                  >
                    Debut Program
                  </p>
                  <h3
                    className="text-base sm:text-lg font-semibold"
                    style={{ color: COLORS.textDeep }}
                  >
                    Celebration Flow
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p
                    className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-2 flex items-center gap-2"
                    style={{ color: COLORS.textDeep }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.accentPink }} />
                    Part 1
                  </p>
                  <ul
                    className="space-y-1.5 text-xs sm:text-sm leading-relaxed"
                    style={{ color: COLORS.textDeep }}
                  >
                    {PROGRAM_PART1.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Sparkles className="mt-1 h-3 w-3 flex-shrink-0" style={{ color: COLORS.accentPink }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p
                    className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-2 flex items-center gap-2 mt-4"
                    style={{ color: COLORS.textDeep }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.accentPink }} />
                    Part 2
                  </p>
                  <ul
                    className="space-y-1.5 text-xs sm:text-sm leading-relaxed"
                    style={{ color: COLORS.textDeep }}
                  >
                    {PROGRAM_PART2.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Sparkles className="mt-1 h-3 w-3 flex-shrink-0" style={{ color: COLORS.accentPink }} />
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
              style={{ borderColor: `${COLORS.secondaryPink}55` }}
            >
              <div className="flex items-center gap-3">
                <Palette className="h-6 w-6" style={{ color: COLORS.accentPink }} />
                <div>
                  <p
                    className="text-xs sm:text-sm uppercase tracking-[0.38em]"
                    style={{ color: COLORS.accentPink }}
                  >
                    Attire & Palette
                  </p>
                  <h3
                    className="text-base sm:text-lg font-semibold"
                    style={{ color: COLORS.textDeep }}
                  >
                    Guest Attire
                  </h3>
                </div>
              </div>
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: COLORS.textDeep }}
              >
                {siteConfig.dressCode.note}
              </p>
              {/* Attire guidelines: ladies & gentlemen */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="relative w-full rounded-xl overflow-hidden border" style={{ borderColor: `${COLORS.secondaryPink}55` }}>
                  <Image
                    src="/Details/ladies.png"
                    alt="Ladies attire guidelines"
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain"
                  />
                  <p
                    className="text-center text-xs font-semibold py-2"
                    style={{ color: COLORS.accentPink }}
                  >
                    Ladies
                  </p>
                </div>
                <div className="relative w-full rounded-xl overflow-hidden border" style={{ borderColor: `${COLORS.secondaryPink}55` }}>
                  <Image
                    src="/Details/gentlemen.png"
                    alt="Gentlemen attire guidelines"
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain"
                  />
                  <p
                    className="text-center text-xs font-semibold py-2"
                    style={{ color: COLORS.accentPink }}
                  >
                    Gentlemen
                  </p>
                </div>
              </div>
              {/* Color palette display */}
              <div className="flex flex-col items-center gap-2 pt-2">
                <p
                  className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: COLORS.textDeep }}
                >
                  Color Palette
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {[
                    { color: COLORS.primaryPink, label: "Primary Pink" },
                    { color: COLORS.secondaryPink, label: "Secondary Pink" },
                    { color: COLORS.accentPink, label: "Accent Pink" },
                    { color: COLORS.lavender, label: "Lavender Accent" },
                    { color: COLORS.baseWhite, label: "Base White" },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white/30 shadow-lg transition-transform duration-300 hover:scale-110"
                        style={{ backgroundColor: item.color }}
                        title={item.label}
                      />
                      <span
                        className="text-[8px] sm:text-[9px] hidden sm:block"
                        style={{ color: COLORS.textDeep }}
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
              style={{ borderColor: `${COLORS.secondaryPink}55` }}
            >
              <div className="flex items-center gap-3">
                <Car className="h-6 w-6" style={{ color: COLORS.accentPink }} />
                <div>
                  <p
                    className="text-xs sm:text-sm uppercase tracking-[0.38em]"
                    style={{ color: COLORS.accentPink }}
                  >
                    Travel Notes
                  </p>
                  <h3
                    className="text-base sm:text-lg font-semibold"
                    style={{ color: COLORS.textDeep }}
                  >
                    Parking & Transport
                  </h3>
                </div>
              </div>
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: COLORS.textDeep }}
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
