"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, Navigation, Copy, Check, Palette, Car, Sparkles, ListOrdered } from "lucide-react"
import { useState, useMemo } from "react"
import Image from "next/image"
import { Great_Vibes, Inter } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

// Color palette: #01123D #01184C #010080 #191873 #15156B
const COLORS = {
  dark: "#01123D",
  navy: "#01184C",
  royal: "#010080",
  indigo: "#191873",
  deep: "#15156B",
  accent: "#E5C9B7",
  cream: "#FBF1E7",
}

const PROGRAM_PART1 = [
  "Debut Program",
  "Entrance of the debutant's family (Parents)",
  "Entrance of the Debutant",
  "Opening prayer",
  "Trivia c/o host",
  "18 Blooms",
  "18 Candles (first 2 message via video)",
  "Singing of happy birthday song",
  "Blowing of the candle",
  "Gracing of the food",
  "Dinner",
  "DJ or Background Track",
]

const PROGRAM_PART2 = [
  "Intermission Number – To confirm by the celebrant (Dance Number)",
  "Trivia c/o Host",
  "18 Shots with trivia games c/o celebrant for questions",
  "Video messages",
  "SDE",
  "Intermission song number – Host",
  "Message from the parent",
  "Message from the celebrant",
  "Closing spiel host",
  "Community Dance",
]

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())

  // Generate particles once to avoid re-rendering
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1, // 1-4px
      left: Math.random() * 100, // 0-100%
      top: Math.random() * 100, // 0-100%
      delay: Math.random() * 5, // 0-5s
      duration: Math.random() * 8 + 10, // 10-18s
      opacity: Math.random() * 0.6 + 0.3, // 0.3-0.9
    }))
  }, [])

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
    <Section id="details" className="relative overflow-hidden py-14 sm:py-18 md:py-20 lg:py-24" style={{ background: "linear-gradient(to bottom, #013662, #00558F)" }}>
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 70px, rgba(229,201,183,0.06) 70px, rgba(229,201,183,0.06) 71px),
              repeating-linear-gradient(-45deg, transparent, transparent 70px, rgba(229,201,183,0.06) 70px, rgba(229,201,183,0.06) 71px)
            `,
            backgroundSize: "70px 70px, 70px 70px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#01123D]/40 via-transparent to-[#15156B]/40" />
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
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-white/90" style={{ backgroundColor: `${COLORS.navy}99` }}>
            Event Details
          </div>
          <h2 className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg mt-4`} style={{ color: COLORS.cream }}>
            Your Evening Guide
          </h2>
          <p className={`${inter.className} text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed`}>
            Join us as we celebrate Ena Gerangaya&apos;s debut. Here&apos;s everything you need to know—from call times and venue to the program flow and dress code for this special evening.
          </p>
        </div>

        <div className="grid gap-5 lg:gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch mb-12 sm:mb-16 lg:mb-20">
          {/* Venue card */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 backdrop-blur-2xl shadow-xl" style={{ backgroundColor: `${COLORS.navy}40` }}>
            <div className="relative h-[220px] sm:h-60 md:h-80 lg:h-[380px] xl:h-[420px] overflow-hidden">
              <Image
                src="/Details/venue.jpg"
                alt={venue}
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01123D]/95 via-[#01123D]/40 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 sm:bottom-6 text-white">
                <h3 className="text-xl sm:text-3xl font-serif font-semibold tracking-wide drop-shadow-lg">
                  {siteConfig.wedding.venue}
                </h3>
                <p className="text-[10px] sm:text-[12px] text-white/85 tracking-[0.24em] uppercase mt-1">
                  Bacolod City
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-7 lg:p-8 space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="inline-flex justify-center rounded-full border border-white/25 px-4 py-1.5 text-white/90 text-[9px] sm:text-[11px] tracking-[0.24em] sm:tracking-[0.32em] uppercase whitespace-nowrap" style={{ backgroundColor: `${COLORS.royal}66` }}>
                  {`${ceremony.day}, ${ceremony.date}`}
                </div>
                <p className="text-[10px] sm:text-xs text-white/80 tracking-[0.3em] uppercase text-center sm:text-right">
                  Guests may arrive starting 5:30 PM
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                {schedule.map((entry) => (
                  <div
                    key={entry.label}
                    className="rounded-xl border border-white/20 px-3.5 py-3 text-center"
                    style={{ backgroundColor: `${COLORS.indigo}40` }}
                  >
                    <p className="text-[9px] sm:text-[11px] tracking-[0.34em] uppercase text-white/70 mb-1">{entry.label}</p>
                    <div className="flex items-center justify-center gap-2 text-white text-sm sm:text-base font-semibold">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: COLORS.accent }} />
                      <span>{entry.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-row gap-2.5 sm:gap-3">
                <button
                  onClick={openInMaps}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                  style={{ backgroundColor: COLORS.royal }}
                  aria-label="Get directions to the venue"
                >
                  <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Get Directions
                </button>
                <button
                  onClick={() => copyToClipboard(venue, "venue")}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 px-4 py-3 text-xs sm:text-sm font-semibold text-white/90 transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
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
            <div className="rounded-2xl sm:rounded-3xl border border-white/15 backdrop-blur-xl p-5 sm:p-7 lg:p-8 space-y-4" style={{ backgroundColor: `${COLORS.navy}50` }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ backgroundColor: COLORS.royal }}>
                  <ListOrdered className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.38em] text-white/70">Debut Program</p>
                  <h3 className="text-white text-base sm:text-lg font-semibold">Evening Program</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[10px] sm:text-xs font-semibold text-white/90 tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.accent }} />
                    Part 1
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-white/85 leading-relaxed">
                    {PROGRAM_PART1.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Sparkles className="mt-1 h-3 w-3 flex-shrink-0" style={{ color: COLORS.accent }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-semibold text-white/90 tracking-[0.2em] uppercase mb-2 flex items-center gap-2 mt-4">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.accent }} />
                    Part 2
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-white/85 leading-relaxed">
                    {PROGRAM_PART2.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Sparkles className="mt-1 h-3 w-3 flex-shrink-0" style={{ color: COLORS.accent }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Attire card */}
            <div className="rounded-2xl sm:rounded-3xl border border-white/15 backdrop-blur-xl p-5 sm:p-7 lg:p-8 space-y-3 sm:space-y-4" style={{ backgroundColor: `${COLORS.navy}50` }}>
              <div className="flex items-center gap-3">
                <Palette className="h-6 w-6" style={{ color: COLORS.accent }} />
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.38em] text-white/70">Attire & Palette</p>
                  <h3 className="text-white text-base sm:text-lg font-semibold">Guest Attire</h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                Dress in shades that complement our palette—deep navy, royal blue & indigo. Ladies: formal gown. Gentlemen: Suits Coat and Tie or Tuxedo.
              </p>
              <div className="relative w-full rounded-xl overflow-hidden border border-white/20 mb-4">
                <Image
                  src="/Details/guestattire.png"
                  alt="Guest attire guidelines"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              {/* Color palette display */}
              <div className="flex flex-col items-center gap-2 pt-2">
                <p className="text-[9px] sm:text-[10px] text-white/70 tracking-[0.2em] uppercase">Color Palette</p>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {[
                    { color: "#01123D", label: "Deep Navy" },
                    { color: "#01184C", label: "Navy" },
                    { color: "#010080", label: "Royal Blue" },
                    { color: "#191873", label: "Indigo" },
                    { color: "#15156B", label: "Deep Indigo" },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white/30 shadow-lg transition-transform duration-300 hover:scale-110"
                        style={{ backgroundColor: item.color }}
                        title={item.label}
                      />
                      <span className="text-[8px] sm:text-[9px] text-white/60 hidden sm:block">{item.color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel card */}
            <div className="rounded-2xl sm:rounded-3xl border border-white/15 backdrop-blur-xl p-5 sm:p-7 lg:p-8 space-y-3 sm:space-y-4" style={{ backgroundColor: `${COLORS.navy}50` }}>
              <div className="flex items-center gap-3">
                <Car className="h-6 w-6" style={{ color: COLORS.accent }} />
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.38em] text-white/70">Travel Notes</p>
                  <h3 className="text-white text-base sm:text-lg font-semibold">Parking & Transport</h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                Complimentary parking is available at the venue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
