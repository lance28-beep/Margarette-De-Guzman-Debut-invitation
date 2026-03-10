"use client"

import { useEffect, useState } from "react"

import { Section } from "@/components/section"

import Counter from "@/components/Counter"

import { WindSong, Playfair_Display, Great_Vibes } from "next/font/google"

import { siteConfig } from "@/content/site"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const windSong = WindSong({
  subsets: ["latin"],
  weight: ["400", "500"],
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

// Soft pink beach aesthetic palette for countdown section
const countdownPalette = {
  primaryPink: "#F6C1CF",
  secondaryPink: "#F48FB1",
  accentPink: "#D95C8A",
  lavender: "#D8B4E2",
  coral: "#E57399",
  baseWhite: "#FFF6F8",
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Parse date from siteConfig.wedding.date: "FEB 8, 2026" or "February 8, 2026"
      const dateStr = siteConfig.wedding.date
      const timeStr = siteConfig.wedding.time // "4PM" or "3:00 PM"
      
      // Try to parse format: "February 14, 2026" or "FEB 8, 2026"
      let dateMatch = dateStr.match(/(\w+)\s+(\d+),\s+(\d+)/)
      
      // If no match, try format without comma: "February 8 2026"
      if (!dateMatch) {
        dateMatch = dateStr.match(/(\w+)\s+(\d+)\s+(\d+)/)
      }
      
      if (!dateMatch) return
      
      const [, monthName, day, year] = dateMatch
      const monthMap: Record<string, number> = {
        January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
        July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
        JANUARY: 0, FEBRUARY: 1, MARCH: 2, APRIL: 3, MAY: 4, JUNE: 5,
        JULY: 6, AUGUST: 7, SEPTEMBER: 8, OCTOBER: 9, NOVEMBER: 10, DECEMBER: 11,
        JAN: 0, FEB: 1, MAR: 2, APR: 3, JUN: 5,
        JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
      }
      
      // Parse time: "4PM" or "3:00 PM" -> 16:00 or 15:00
      const timeMatch = timeStr.match(/(\d+)(?::(\d+))?\s*(AM|PM)/i)
      let hours = 0
      let minutes = 0
      if (timeMatch) {
        hours = parseInt(timeMatch[1])
        minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0
        if (timeMatch[3].toUpperCase() === 'PM' && hours !== 12) hours += 12
        if (timeMatch[3].toUpperCase() === 'AM' && hours === 12) hours = 0
      }
      
      // Convert to UTC (assuming GMT+8, subtract 8 hours)
      const targetDate = Date.UTC(
        parseInt(year),
        monthMap[monthName] ?? 0,
        parseInt(day),
        hours - 8,
        minutes,
        0
      )
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // Event has passed or is happening now
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const labelTaglines: Record<string, string> = {
    Days: "Days of Dreaming",
    Hours: "Hours of Sparkle",
    Minutes: "Moments of Magic",
    Seconds: "Heartbeats Away",
  }

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      {/* Simple, elegant card */}
      <div className="relative group">
        {/* Main card */}
        <div
          className="relative rounded-2xl sm:rounded-3xl px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-7 border backdrop-blur-md transition-all duration-300 min-w-[65px] sm:min-w-[75px] md:min-w-[90px] lg:min-w-[100px] shadow-[0_8px_18px_rgba(217,92,138,0.16)] group-hover:shadow-[0_12px_26px_rgba(217,92,138,0.22)] translate-y-0 group-hover:-translate-y-1"
          style={{
            backgroundColor: countdownPalette.baseWhite,
            borderColor: "rgba(244,143,177,0.7)",
          }}
        >
          {/* Counter */}
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={value >= 100 ? [100, 10, 1] : [10, 1]}
              fontSize={36}
              padding={6}
              gap={3}
              textColor={countdownPalette.accentPink}
              fontWeight={500}
              borderRadius={8}
              horizontalPadding={4}
              gradientHeight={10}
              gradientFrom="rgba(255,255,255,0.9)"
              gradientTo="rgba(255,255,255,0)"
            />
          </div>
        </div>
      </div>

      {/* Enhanced label */}
      <div className="flex flex-col items-center text-center gap-1">
        <span
          className={`${playfair.className} text-base sm:text-lg tracking-[0.25em] uppercase`}
          style={{ color: countdownPalette.accentPink }}
        >
          {label}
        </span>
        <span
          className="text-[10px] sm:text-xs tracking-[0.45em] uppercase"
          style={{ color: "rgba(137,31,73,0.85)" }}
        >
          {labelTaglines[label] ?? "Until the Celebration"}
        </span>
      </div>
    </div>
  )

  // Parse date for display
  const dateStr = siteConfig.wedding.date
  let displayDate: Date | null = null
  try {
    // Try to parse the date string
    const dateMatch = dateStr.match(/(\w+)\s+(\d+),\s+(\d+)/) || dateStr.match(/(\w+)\s+(\d+)\s+(\d+)/)
    if (dateMatch) {
      const [, monthName, day, year] = dateMatch
      const monthMap: Record<string, number> = {
        January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
        July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
        JANUARY: 0, FEBRUARY: 1, MARCH: 2, APRIL: 3, MAY: 4, JUNE: 5,
        JULY: 6, AUGUST: 7, SEPTEMBER: 8, OCTOBER: 9, NOVEMBER: 10, DECEMBER: 11,
        JAN: 0, FEB: 1, MAR: 2, APR: 3, JUN: 5,
        JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
      }
      displayDate = new Date(parseInt(year), monthMap[monthName] ?? 0, parseInt(day))
    }
  } catch (e) {
    // Fallback to ceremony date if available
    try {
      displayDate = new Date(siteConfig.ceremony.date)
    } catch (e2) {
      displayDate = null
    }
  }

  return (
    <Section
      id="countdown"
      className="relative bg-[#FFF6F8] py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Soft pastel beach background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft pastel grain / texture */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              radial-gradient(circle at 0% 0%, ${countdownPalette.primaryPink}26 0, transparent 55%),
              radial-gradient(circle at 100% 100%, ${countdownPalette.lavender}26 0, transparent 55%),
              radial-gradient(circle at 15% 80%, ${countdownPalette.coral}1f 0, transparent 60%)
            `,
          }}
        />

        {/* Soft vignette for depth (very light) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top, rgba(255,255,255,0.4) 0, transparent 55%), radial-gradient(circle at bottom, rgba(233,176,196,0.25) 0, transparent 60%)",
          }}
        />

        {/* Minimal white line art – sun, waves, seashell */}
        {/* Sun */}
        <div className="absolute -top-10 left-8 sm:left-16 w-24 h-24 sm:w-28 sm:h-28 opacity-50">
          <div className="w-full h-full rounded-full border border-white/40" />
          <div className="absolute inset-4 rounded-full border border-white/20" />
          <div className="absolute -bottom-2 left-1/2 h-6 w-px -translate-x-1/2 bg-white/35" />
          <div className="absolute top-1/2 -left-2 h-px w-6 -translate-y-1/2 bg-white/35" />
          <div className="absolute top-1/2 -right-2 h-px w-6 -translate-y-1/2 bg-white/35" />
        </div>

        {/* Waves */}
        <div className="absolute -bottom-10 left-4 sm:left-10 w-40 sm:w-56 h-20 opacity-60">
          <div className="absolute inset-x-0 bottom-8 h-6 rounded-full border border-white/50" />
          <div className="absolute inset-x-4 bottom-4 h-5 rounded-full border border-white/35" />
          <div className="absolute inset-x-8 bottom-0 h-4 rounded-full border border-white/25" />
        </div>

        {/* Seashell */}
        <div className="absolute -bottom-6 right-6 sm:right-16 w-20 h-16 opacity-70">
          <div className="absolute inset-x-2 bottom-0 h-10 rounded-t-[999px] border-t border-l border-r border-white/60" />
          <div className="absolute left-1/2 bottom-0 h-10 w-px -translate-x-1/2 border-l border-white/45" />
          <div className="absolute left-3 bottom-1 h-9 w-px rotate-[-12deg] border-l border-white/35" />
          <div className="absolute right-3 bottom-1 h-9 w-px rotate-[12deg] border-l border-white/35" />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
        <p
          className="text-xs sm:text-sm md:text-base tracking-[0.45em] uppercase mb-3"
          style={{ color: countdownPalette.accentPink }}
        >
          Soft Pink Skies Await
        </p>
        <h2
          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] mb-3 sm:mb-4`}
          style={{
            color: countdownPalette.accentPink,
            textShadow: "0 10px 30px rgba(217,92,138,0.45)",
          }}
        >
          Countdown to Piel’s Debut
        </h2>
        <p
          className="text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
          style={{ color: "rgba(137,31,73,0.9)" }}
        >
          Every day brings us closer to a soft pink seaside celebration of Piel Allen’s 18th—full of warmth, laughter, and unforgettable memories.
        </p>
      </div>

      {/* Main countdown container */}
      <div className="relative z-10">
        <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-8 sm:mb-10 md:mb-12 flex-wrap px-4">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Debut date presentation - Keepsake Card Style */}
        <div className="flex justify-center px-4">
          <div className="max-w-2xl w-full">
            {/* Save The Date Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownPalette.accentPink }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(137,31,73,0.8)" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownPalette.accentPink }} />
              </div>

              <p
                className="text-xs sm:text-sm md:text-base font-medium uppercase tracking-[0.25em] sm:tracking-[0.35em] mb-3 sm:mb-4"
                style={{ color: countdownPalette.accentPink }}
              >
                Save The Debut Day
              </p>

              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownPalette.accentPink }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(137,31,73,0.8)" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownPalette.accentPink }} />
              </div>
            </div>

            {/* Date Section - Elegant Layout */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Month - Elegant script style */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <p
                  className={`${windSong.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none`}
                  style={{
                    color: countdownPalette.accentPink,
                    textShadow: "0 8px 26px rgba(217,92,138,0.4)",
                  }}
                >
                  {displayDate ? displayDate.toLocaleDateString('en-US', { month: 'long' }) : siteConfig.ceremony.date.split(' ')[0]}
                </p>
              </div>
              
              {/* Day and Year - Horizontal layout with divider */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                {/* Day - Large and bold focal point */}
                <p
                  className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-semibold leading-none"
                  style={{
                    color: countdownPalette.accentPink,
                    textShadow: "0 18px 35px rgba(217,92,138,0.4)",
                  }}
                >
                  {displayDate ? displayDate.toLocaleDateString('en-US', { day: 'numeric' }) : siteConfig.ceremony.date.split(' ')[1]}
                </p>
                
                {/* Vertical divider */}
                <div
                  className="h-16 sm:h-20 md:h-24 lg:h-28 w-px bg-gradient-to-b from-transparent to-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, transparent, rgba(255,246,248,0.85), transparent)`,
                  }}
                />
                
                {/* Year - Elegant and refined */}
                <p
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-none tracking-[0.2em] uppercase"
                  style={{ color: "rgba(137,31,73,0.9)" }}
                >
                  {displayDate ? displayDate.toLocaleDateString('en-US', { year: 'numeric' }) : siteConfig.ceremony.date.split(' ')[2]}
                </p>
              </div>
            </div>

            {/* Time Section */}
            <div className="text-center">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownPalette.accentPink }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(137,31,73,0.8)" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownPalette.accentPink }} />
              </div>
              
              {/* Time */}
                <div
                  className="text-xs sm:text-sm md:text-base lg:text-lg font-medium tracking-[0.4em] uppercase mb-3 sm:mb-4"
                  style={{ color: "rgba(137,31,73,0.9)" }}
                >
                <span className="block sm:inline">{siteConfig.wedding.time} • {siteConfig.ceremony.venue}</span>
                {/* <span className="block sm:inline sm:before:content-['•'] sm:before:mx-2">
                  {siteConfig.ceremony.location.includes(',') 
                    ? siteConfig.ceremony.location.split(',').slice(-2).join(',').trim()
                    : siteConfig.ceremony.location}
                </span> */}
              </div>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownPalette.accentPink }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(137,31,73,0.8)" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownPalette.accentPink }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
