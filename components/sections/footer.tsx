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
      style={{ background: "linear-gradient(to bottom, #D95C8A, #F48FB1)" }}

    >

      {/* Ornate pattern background */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">

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

                    src="/monogram/newmonogram.png"

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

              <blockquote className={`${inter.className} text-[#D95C8A] italic text-lg leading-relaxed min-h-[80px]`}>

                "{displayedText}

                <span className="inline-block w-0.5 h-6 bg-[#D95C8A] ml-1 animate-pulse">|</span>"

              </blockquote>

              <div className="flex items-center gap-2 mt-4">

                <div className="w-2 h-2 bg-[#D95C8A]/70 rounded-full" />

                <div className="w-2 h-2 bg-[#D95C8A]/50 rounded-full" />

                <div className="w-2 h-2 bg-[#D95C8A]/70 rounded-full" />

              </div>

            </motion.div>

          </motion.div>



          {/* Event Details quick tiles */}

          <motion.div className="space-y-6" variants={fadeInUp}>

            <motion.div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30 hover:border-[#013662]/40 transition-all duration-300" whileHover={{ y: -5 }}>

              <div className="flex items-center gap-3 mb-4">

                <div className="w-10 h-10 bg-[#D95C8A]/10 rounded-full flex items-center justify-center border-2 border-[#D95C8A]/20">

                  <Clock className="w-5 h-5 text-[#D95C8A]" />

                </div>

                <h4 className={`${playfair.className} font-bold text-xl text-[#D95C8A]`}>Debut Celebration</h4>

              </div>

              <div className={`space-y-3 ${inter.className} text-[#013662]/80 text-sm`}>

                <div className="flex items-center gap-3">

                  <MapPin className="w-4 h-4 text-[#D95C8A]/70" />

                  <span style={{ color: "#D95C8A" }}>{siteConfig.wedding.venue}</span>

                </div>

                <div className="flex items-center gap-3">

                  <Clock className="w-4 h-4 text-[#D95C8A]/70" />

                  <span style={{ color: "#D95C8A" }}>{siteConfig.wedding.time}</span>

                </div>

              </div>

            </motion.div>



            <motion.div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30 hover:border-[#013662]/40 transition-all duration-300" whileHover={{ y: -5 }}>

              <div className="flex items-center gap-3 mb-4">

                <div className="w-10 h-10 bg-[#013662]/10 rounded-full flex items-center justify-center border-2 border-[#013662]/20">

                  <Sparkles className="w-5 h-5 text-[#D95C8A]" />

                </div>

                <h4 className={`${playfair.className} font-bold text-xl text-[#D95C8A]`}>Evening Reception</h4>

              </div>

              <div className={`space-y-3 ${inter.className} text-[#D95C8A]/80 text-sm`}>

                <div className="flex items-center gap-3">

                  <MapPin className="w-4 h-4 text-[#D95C8A]/70" />

                  <span style={{ color: "#D95C8A" }}>{siteConfig.wedding.venue}</span>

                </div>

                <div className="flex items-center gap-3">

                  <Clock className="w-4 h-4 text-[#D95C8A]/70" />

                  <span style={{ color: "#D95C8A" }}>Following the debut</span>

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

              <p className={`text-[white]/85 ${inter.className} text-sm`}>© {year} Ena Gerangaya's Debut. All rights reserved.</p>

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
