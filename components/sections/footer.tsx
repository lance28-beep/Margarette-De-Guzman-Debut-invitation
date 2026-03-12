"use client"

import { useState, useEffect } from "react"

import { motion } from "motion/react"

import { Instagram, Twitter, Facebook, MapPin, Calendar, Clock, Sparkles, Music2 } from "lucide-react"

import Image from "next/image"

import { Great_Vibes, Playfair_Display, Inter, WindSong } from "next/font/google"

import { siteConfig } from "@/content/site"



const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

const windSong = WindSong({ subsets: ["latin"], weight: ["400", "500"] })

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

export function Footer() {

  const year = new Date().getFullYear()

  // Helper function to parse date safely
  const parseWeddingDate = (): Date => {
    const dateStr = siteConfig.wedding.date
    // Try to parse format: "FEBRUARY 14, 2026" or "February 14, 2026" or "FEB 8, 2026"
    let dateMatch = dateStr.match(/(\w+)\s+(\d+),\s+(\d+)/)
    
    // If no match, try format without comma: "February 14 2026"
    if (!dateMatch) {
      dateMatch = dateStr.match(/(\w+)\s+(\d+)\s+(\d+)/)
    }
    
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
      return new Date(parseInt(year), monthMap[monthName] ?? 0, parseInt(day))
    }
    
    // Fallback to default parsing
    return new Date(dateStr)
  }

  const weddingDate = parseWeddingDate()



  const quotes = [

    "Eighteen years of dreams, and tonight we celebrate this beautiful milestone together.",

    "From a little girl with big dreams to a young woman ready to shine—this is her moment.",

    "A celebration of grace, elegance, and the beautiful journey into womanhood."

  ]



  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  const [displayedText, setDisplayedText] = useState("")

  const [isDeleting, setIsDeleting] = useState(false)

  const [isPaused, setIsPaused] = useState(false)



  useEffect(() => {

    if (isPaused) {

      const pauseTimeout = setTimeout(() => {

        setIsPaused(false)

      }, 3000)

      return () => clearTimeout(pauseTimeout)

    }



    if (isDeleting) {

      if (displayedText.length > 0) {

        const deleteTimeout = setTimeout(() => {

          setDisplayedText(displayedText.slice(0, -1))

        }, 30)

        return () => clearTimeout(deleteTimeout)

      } else {

        setIsDeleting(false)

        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)

      }

    } else {

      const currentQuote = quotes[currentQuoteIndex]

      if (displayedText.length < currentQuote.length) {

        const typeTimeout = setTimeout(() => {

          setDisplayedText(currentQuote.slice(0, displayedText.length + 1))

        }, 50)

        return () => clearTimeout(typeTimeout)

      } else {

        setIsPaused(true)

        setIsDeleting(true)

      }

    }

  }, [displayedText, isDeleting, isPaused, currentQuoteIndex, quotes])



  const fadeInUp = {

    initial: { opacity: 0, y: 60 },

    animate: { opacity: 1, y: 0 },

    transition: { duration: 0.8, ease: "easeOut" },

  }



  const staggerChildren = {

    animate: {

      transition: { staggerChildren: 0.2 },

    },

  }



  const nav = [

    { label: "Home", href: "#home" },

    { label: "My Journey", href: "#narrative" },

    { label: "Gallery", href: "#gallery" },

    { label: "Snap & Share", href: "#snap-share" },

    { label: "RSVP", href: "#guest-list" },

    { label: "FAQ", href: "#faq" },

  ] as const



  return (

    <footer 

      className="relative z-20 mt-16 text-cream overflow-hidden"
      style={{ background: "linear-gradient(160deg, rgba(2,6,20,1) 0%, rgba(6,18,58,0.92) 40%, rgba(2,6,20,1) 100%)" }}

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

      {/* Ornate pattern background */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">

        {/* Base pattern - diagonal lines forming diamonds */}

        <div 

          className="absolute inset-0"

          style={{

            backgroundImage: `

              repeating-linear-gradient(45deg, transparent, transparent 70px, rgba(217,92,138,0.06) 70px, rgba(217,92,138,0.06) 71px),

              repeating-linear-gradient(-45deg, transparent, transparent 70px, rgba(217,92,138,0.06) 70px, rgba(217,92,138,0.06) 71px)

            `,

            backgroundSize: '70px 70px, 70px 70px',

          }}

        />

        

        {/* Decorative scroll motifs - using SVG pattern */}

        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>

          <defs>

            <pattern id="scrollPatternFooter" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">

              {/* Scroll motifs at intersections */}

              <g fill="none" stroke="#D95C8A" strokeWidth="0.5">

                {/* Top scroll */}

                <path d="M 70 0 Q 65 15 70 30 Q 75 15 70 0" />

                {/* Bottom scroll */}

                <path d="M 70 140 Q 65 125 70 110 Q 75 125 70 140" />

                {/* Left scroll */}

                <path d="M 0 70 Q 15 65 30 70 Q 15 75 0 70" />

                {/* Right scroll */}

                <path d="M 140 70 Q 125 65 110 70 Q 125 75 140 70" />

                {/* Center decorative element */}

                <path d="M 70 30 Q 60 50 70 70 Q 80 50 70 30" />

                <path d="M 70 110 Q 60 90 70 70 Q 80 90 70 110" />

                <path d="M 30 70 Q 50 60 70 70 Q 50 80 30 70" />

                <path d="M 110 70 Q 90 60 70 70 Q 90 80 110 70" />

              </g>

            </pattern>

          </defs>

          <rect width="100%" height="100%" fill="url(#scrollPatternFooter)" />

        </svg>



        {/* Subtle overlay for depth */}

        <div className="absolute inset-0 bg-gradient-to-b from-[#01123D]/40 via-transparent to-[#15156B]/40" />

      </div>



      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16">

        {/* Debut date presentation */}

        <motion.div className="flex justify-center px-4 mb-16" variants={fadeInUp}>

          <div className="max-w-2xl w-full">

            {/* Save The Debut Night Header */}

            <div className="text-center mb-8 sm:mb-10 md:mb-12">

              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">

                <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />

                <div className="w-1 h-1 bg-white/50 rounded-full" />

                <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />

              </div>



              <p className="text-xs sm:text-sm md:text-base font-medium text-white uppercase tracking-[0.25em] sm:tracking-[0.35em] mb-3 sm:mb-4">

                Save The Debut Date

              </p>



              <div className="flex items-center justify-center gap-2">

                <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />

                <div className="w-1 h-1 bg-white/50 rounded-full" />

                <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />

              </div>

            </div>



            {/* Date Section - Elegant Layout */}

            <div className="text-center mb-8 sm:mb-10 md:mb-12">

              {/* Month - Elegant script style */}

              <div className="mb-4 sm:mb-5 md:mb-6">

                <p

                  className={`${windSong.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-none drop-shadow-[0_10px_35px_rgba(1,54,98,0.65)]`}

                >

                  {weddingDate.toLocaleDateString('en-US', { month: 'long' })}

                </p>

              </div>

              

              {/* Day and Year - Horizontal layout with divider */}

              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">

                {/* Day - Large and bold focal point */}

                <p

                  className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-semibold text-white leading-none drop-shadow-[0_18px_35px_rgba(1,54,98,0.45)]"

                >

                  {weddingDate.toLocaleDateString('en-US', { day: 'numeric' })}

                </p>

                

                {/* Vertical divider */}

                <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent" />

                

                {/* Year - Elegant and refined */}

                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-none tracking-[0.2em] uppercase">

                  {weddingDate.toLocaleDateString('en-US', { year: 'numeric' })}

                </p>

              </div>

            </div>



            {/* Time Section */}

            <div className="text-center">

              {/* Top decorative dots */}

              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">

                <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />

                <div className="w-1 h-1 bg-white/50 rounded-full" />

                <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />

              </div>

              

              {/* Time */}

              <div className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white/90 tracking-[0.4em] uppercase mb-3 sm:mb-4 space-y-2">

                <div className="block">

                  {siteConfig.wedding.time} • {siteConfig.wedding.venue}

                </div>

              </div>

              

              {/* Bottom decorative dots */}

              <div className="flex items-center justify-center gap-2">

                <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />

                <div className="w-1 h-1 bg-white/50 rounded-full" />

                <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />

              </div>

            </div>

          </div>

        </motion.div>



        <motion.div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12" variants={staggerChildren} initial="initial" animate="animate">

          {/* Debutante Info */}

          <motion.div className="lg:col-span-2" variants={fadeInUp}>

            <div className="mb-8">

              <div className="flex items-center gap-3 mb-6">

                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center">

                  <Image

                    src="/monogram/mongoram.png"

                    alt="Piel Allen Debut Monogram"

                    width={128}

                    height={128}

                    className="object-contain"

                    priority

                    style={{

                      filter: 'brightness(0) invert(1)',

                    }}

                  />

                </div>

              </div>

              <div className="space-y-4">

                <div className={`flex items-center gap-3 ${inter.className} text-white/95`}>

                  <Calendar className="w-5 h-5 text-white/80" />

                  <span className="text-lg">{siteConfig.wedding.date}</span>

                </div>

                <div className={`flex items-center gap-3 ${inter.className} text-white/90`}>

                  <MapPin className="w-5 h-5 text-white/70" />

                  <span>{siteConfig.wedding.venue}</span>

                </div>

              </div>

            </div>



            <motion.div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>

              <blockquote className={`${inter.className} text-[#081F5C] italic text-lg leading-relaxed min-h-[80px]`}>

                "{displayedText}

                <span className="inline-block w-0.5 h-6 bg-[#081F5C] ml-1 animate-pulse">|</span>"

              </blockquote>

              <div className="flex items-center gap-2 mt-4">

                  <div className="w-2 h-2 bg-[#081F5C]/70 rounded-full" />

                <div className="w-2 h-2 bg-[#081F5C]/50 rounded-full" />

                <div className="w-2 h-2 bg-[#081F5C]/70 rounded-full" />

              </div>

            </motion.div>

          </motion.div>



          {/* Event Details quick tiles */}

          <motion.div className="space-y-6" variants={fadeInUp}>

            <motion.div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30 hover:border-[#013662]/40 transition-all duration-300" whileHover={{ y: -5 }}>

              <div className="flex items-center gap-3 mb-4">

                <div className="w-10 h-10 bg-[#081F5C]/10 rounded-full flex items-center justify-center border-2 border-[#081F5C]/20">

                  <Clock className="w-5 h-5 text-[#081F5C]" />

                </div>

                <h4 className={`${playfair.className} font-bold text-xl text-[#081F5C]`}>Debut Celebration</h4>

              </div>

              <div className={`space-y-3 ${inter.className} text-[#013662]/80 text-sm`}>

                <div className="flex items-center gap-3">

                  <MapPin className="w-4 h-4 text-[#081F5C]/70" />

                  <span style={{ color: "#081F5C" }}>{siteConfig.wedding.venue}</span>

                </div>

                <div className="flex items-center gap-3">

                  <Clock className="w-4 h-4 text-[#081F5C]/70" />

                  <span style={{ color: "#081F5C" }}>{siteConfig.wedding.time}</span>

                </div>

              </div>

            </motion.div>



            <motion.div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30 hover:border-[#013662]/40 transition-all duration-300" whileHover={{ y: -5 }}>

              <div className="flex items-center gap-3 mb-4">

                <div className="w-10 h-10 bg-[#013662]/10 rounded-full flex items-center justify-center border-2 border-[#013662]/20">

                  <Sparkles className="w-5 h-5 text-[#081F5C]" />

                </div>

                <h4 className={`${playfair.className} font-bold text-xl text-[#081F5C]`}>Evening Reception</h4>

              </div>

              <div className={`space-y-3 ${inter.className} text-[#081F5C]/80 text-sm`}>

                <div className="flex items-center gap-3">

                    <MapPin className="w-4 h-4 text-[#081F5C]/70" />

                  <span style={{ color: "#081F5C" }}>{siteConfig.wedding.venue}</span>

                </div>

                <div className="flex items-center gap-3">

                      <Clock className="w-4 h-4 text-[#081F5C]/70" />

                  <span style={{ color: "#081F5C" }}>Following the debut</span>

                </div>

              </div>

            </motion.div>

          </motion.div>



          {/* Contact + Quick Links */}

          <motion.div className="space-y-8" variants={fadeInUp}>

            <div>

              <h4 className={`${playfair.className} font-bold text-xl mb-6 flex items-center gap-3 text-white`}>

                <div className="w-2 h-8 bg-white/50 rounded-full" /> Follow Her Journey

              </h4>

              <div className="flex items-center gap-3 flex-wrap">

                <a 

                  href="https://www.facebook.com" 

                  target="_blank" 

                  rel="noopener noreferrer" 

                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/10 border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all hover:scale-110"

                  aria-label="Facebook"

                >

                  <Facebook className="w-5 h-5 text-white" />

                </a>

                <a 

                  href="https://www.instagram.com" 

                  target="_blank" 

                  rel="noopener noreferrer" 

                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/10 border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all hover:scale-110"

                  aria-label="Instagram"

                >

                  <Instagram className="w-5 h-5 text-white" />

                </a>

                <a 

                  href="https://www.tiktok.com" 

                  target="_blank" 

                  rel="noopener noreferrer" 

                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/10 border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all hover:scale-110"

                  aria-label="TikTok"

                >

                  <Music2 className="w-5 h-5 text-white" />

                </a>

                <a 

                  href="https://www.twitter.com" 

                  target="_blank" 

                  rel="noopener noreferrer" 

                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/10 border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all hover:scale-110"

                  aria-label="Twitter"

                >

                  <Twitter className="w-5 h-5 text-white" />

                </a>

              </div>

            </div>



            <div>

              <h5 className={`${playfair.className} font-bold text-lg mb-4 text-white`}>Quick Links</h5>

              <div className="space-y-2">

                {nav.map((item) => (

                  <a key={item.href} href={item.href} className={`block text-white/80 hover:text-white transition-colors duration-200 ${inter.className} text-sm`}>

                    {item.label}

                  </a>

                ))}

              </div>

            </div>

          </motion.div>

        </motion.div>



        {/* Bottom Row */}

        <motion.div className="border-t border-white/20 pt-8" variants={fadeInUp}>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div className="text-center md:text-left">

              <p className={`text-[white]/85 ${inter.className} text-sm`}>© {year} {siteConfig.couple.debutNickname}'s Debut. All rights reserved.</p>

              <p className={`text-[white]/90 ${inter.className} text-sm mt-1`}>

                Made with love for her special celebration

              </p>

            </div>

            

            <div className="text-center md:text-right space-y-1">

              <p className={`text-[white]/80 ${inter.className} text-xs`}>

                Developed by{" "}

                <a 

                  href="https://lance28-beep.github.io/portfolio-website/" 

                  target="_blank" 

                  rel="noopener noreferrer"

                  className="text-[white] hover:text-[white]/80 transition-colors duration-200 underline decoration-[white]/50 hover:decoration-[white]/70"

                >

                  Lance Valle

                </a>

              </p>

              <p className={`text-[white]/80 ${inter.className} text-xs`}>

                Want a website like this? Visit{" "}

                <a 

                  href="https://www.facebook.com/WeddingInvitationNaga" 

                  target="_blank" 

                  rel="noopener noreferrer"

                  className="text-[white] hover:text-[white]/80 transition-colors duration-200 underline decoration-[white]/50 hover:decoration-[white]/70"

                >

                  Wedding Invitation Naga

                </a>

              </p>

            </div>

          </div>

        </motion.div>



      </div>

    </footer>

  )

}
