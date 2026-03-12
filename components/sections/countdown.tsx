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

// Countdown section color controls (edit here to restyle quickly)
const countdownColors = {
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
}

// Starfield layout — varied sizes, some with glow halos, for animated celestial sky
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
    Days: "Nights beneath the royal sky",
    Hours: "Moonlit hours until we gather",
    Minutes: "Moments of magic drawing closer",
    Seconds: "Heartbeats from her celestial night",
  }

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      {/* Celestial glass card */}
      <div className="relative group">
        {/* Main card */}
        <div
          className="relative rounded-2xl sm:rounded-3xl px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-7 border backdrop-blur-md transition-all duration-300 min-w-[65px] sm:min-w-[75px] md:min-w-[90px] lg:min-w-[100px] translate-y-0 group-hover:-translate-y-1"
          style={{
            background: countdownColors.unitCardBg,
            borderColor: countdownColors.unitCardBorder,
            boxShadow: "0 14px 45px rgba(0,0,0,0.65)",
          }}
        >
          {/* Counter */}
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={value >= 100 ? [100, 10, 1] : [10, 1]}
              fontSize={34}
              padding={6}
              gap={3}
              textColor={countdownColors.unitNumber}
              fontWeight={600}
              borderRadius={8}
              horizontalPadding={4}
              gradientHeight={12}
              // gradientFrom="rgba(237,241,246,0.95)"
              // gradientTo="rgba(237,241,246,0)"
            />
          </div>
        </div>
      </div>

      {/* Enhanced label */}
      <div className="flex flex-col items-center text-center gap-1">
        <span
          className={`${playfair.className} text-base sm:text-lg tracking-[0.25em] uppercase`}
          style={{ color: countdownColors.unitLabel }}
        >
          {label}
        </span>
        <span
          className="text-[10px] sm:text-xs tracking-[0.45em] uppercase"
          style={{ color: countdownColors.unitTagline }}
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
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
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

      {/* Header */}
      <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
        <p
          className="text-xs sm:text-sm md:text-base tracking-[0.45em] uppercase mb-3"
          style={{ color: countdownColors.eyebrow }}
        >
          Celestial countdown to her night
        </p>
        <h2
          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] mb-3 sm:mb-4`}
          style={{
            color: countdownColors.heading,
            textShadow:
              "0 0 22px rgba(208,227,255,0.9), 0 0 52px rgba(8,31,92,0.95), 0 18px 46px rgba(0,0,0,0.9)",
          }}
        >
          Counting down to Margarette’s celestial debut
        </h2>
        <p
          className="text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
          style={{ color: countdownColors.subheading }}
        >
          Each moment brings you closer to a moonlit, princess-like celebration beneath royal night skies<br /> where stars shimmer, wishes unfold, and {siteConfig.couple.debutNickname} steps into her magical eighteenth year.
        </p>
      </div>

      {/* Main countdown container */}
      <div className="relative z-10">
        {/* Soft halo behind units */}
        <div
          className="pointer-events-none absolute inset-x-10 sm:inset-x-20 md:inset-x-32 -top-4 sm:-top-6 h-40 sm:h-44 md:h-48 mx-auto rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(186,214,235,0.45) 0%, transparent 65%)",
          }}
        />
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
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownColors.dateAccent }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(8,31,92,0.9)" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownColors.dateAccent }} />
              </div>

              <p
                className="text-xs sm:text-sm md:text-base font-medium uppercase tracking-[0.25em] sm:tracking-[0.35em] mb-3 sm:mb-4"
                style={{ color: countdownColors.dateAccent }}
              >
                Save the celestial debut
              </p>

              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownColors.dateAccent }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(8,31,92,0.9)" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownColors.dateAccent }} />
              </div>
            </div>

            {/* Date Section - Elegant Layout */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Month - Elegant script style */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <p
                  className={`${windSong.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none`}
                  style={{
                    color: countdownColors.dateAccent,
                    textShadow: "0 8px 26px rgba(0,0,0,0.7)",
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
                    color: countdownColors.dateDay,
                    textShadow: "0 18px 40px rgba(0,0,0,0.9)",
                  }}
                >
                  {displayDate ? displayDate.toLocaleDateString('en-US', { day: 'numeric' }) : siteConfig.ceremony.date.split(' ')[1]}
                </p>
                
                {/* Vertical divider */}
                {/* <div
                  className="h-16 sm:h-20 md:h-24 lg:h-28 w-px bg-gradient-to-b from-transparent to-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, transparent, rgba(255,246,248,0.85), transparent)`,
                  }}
                /> */}
                
                {/* Year - Elegant and refined */}
                <p
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-none tracking-[0.2em] uppercase"
                  style={{ color: countdownColors.dateYear }}
                >
                  {displayDate ? displayDate.toLocaleDateString('en-US', { year: 'numeric' }) : siteConfig.ceremony.date.split(' ')[2]}
                </p>
              </div>
            </div>

            {/* Time Section */}
            <div className="text-center">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownColors.dateAccent }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(8,31,92,0.9)" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownColors.dateAccent }} />
              </div>
              
              {/* Time */}
                <div
                  className="text-xs sm:text-sm md:text-base lg:text-lg font-medium tracking-[0.4em] uppercase mb-3 sm:mb-4"
                  style={{ color: countdownColors.timeLocation }}
                >
                <span className="block sm:inline">{siteConfig.wedding.time} • {siteConfig.ceremony.location}</span>
                {/* <span className="block sm:inline sm:before:content-['•'] sm:before:mx-2">
                  {siteConfig.ceremony.location.includes(',') 
                    ? siteConfig.ceremony.location.split(',').slice(-2).join(',').trim()
                    : siteConfig.ceremony.location}
                </span> */}
              </div>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownColors.dateAccent }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(8,31,92,0.9)" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: countdownColors.dateAccent }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Local keyframes for celestial motion */}
      <style jsx>{`
        @keyframes countdownTwinkle {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
        }

        @keyframes countdownAurora {
          0%   { transform: translate3d(0, 0, 0); opacity: 0.65; }
          50%  { transform: translate3d(-12px, -7px, 0); opacity: 1; }
          100% { transform: translate3d(0, 0, 0); opacity: 0.65; }
        }
        @keyframes countdownNebula1 {
          0%   { transform: translate(0, 0) scale(1); opacity: 0.28; }
          33%  { transform: translate(20px, -12px) scale(1.06); opacity: 0.38; }
          66%  { transform: translate(-10px, 14px) scale(0.96); opacity: 0.22; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.28; }
        }
        @keyframes countdownNebula2 {
          0%   { transform: translate(0, 0) scale(1); opacity: 0.22; }
          40%  { transform: translate(-16px, 10px) scale(1.08); opacity: 0.32; }
          80%  { transform: translate(12px, -16px) scale(0.94); opacity: 0.18; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.22; }
        }
        @keyframes countdownNebula3 {
          0%   { transform: scale(1); opacity: 0.13; }
          50%  { transform: scale(1.14); opacity: 0.21; }
          100% { transform: scale(1); opacity: 0.13; }
        }
        @keyframes countdownShootingStar {
          0%   { opacity: 0; transform: rotate(-26deg) translateX(0); }
          4%   { opacity: 1; }
          22%  { opacity: 0; transform: rotate(-26deg) translateX(200px); }
          100% { opacity: 0; transform: rotate(-26deg) translateX(200px); }
        }
      `}</style>
    </Section>
  )
}
