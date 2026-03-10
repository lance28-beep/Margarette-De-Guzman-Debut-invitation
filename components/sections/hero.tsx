"use client"

import { useEffect, useState, useMemo } from "react"
import { Sparkles } from "lucide-react"
import { WindSong, Great_Vibes } from "next/font/google"
import { siteConfig } from "@/content/site"

const desktopImages = [
  "/mobile-background/debut (1).webp",
]

const mobileImages = [
  "/desktop-background/debut (9).jpg",
]

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const windSong = WindSong({
  subsets: ["latin"],
  weight: ["400", "500"],
})

// Shared soft pink beach aesthetic palette (aligns with loader Hero & LoadingScreen)
const heroPalette = {
  primaryPink: "#F6C1CF",
  secondaryPink: "#F48FB1",
  accentPink: "#D95C8A",
  lavender: "#D8B4E2",
  coral: "#E57399",
  baseWhite: "#FFF6F8",
}

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()

    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const backgroundImages = useMemo(() => {
    return isMobile ? mobileImages : desktopImages
  }, [isMobile])

  useEffect(() => {
    setImagesLoaded(false)
    setCurrentImageIndex(0)

    const firstImg = new Image()
    firstImg.src = backgroundImages[0]
    firstImg.onload = () => {
      setImagesLoaded(true)
    }

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

    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(imageTimer)
  }, [imagesLoaded, backgroundImages])

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (imagesLoaded) {
      setIsVisible(true)
    }
  }, [imagesLoaded])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2b1016]">
      <div className="absolute inset-0 w-full h-full">
        {imagesLoaded &&
          backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
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
        {/* Pastel overlays aligned with loader Hero & LoadingScreen */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `radial-gradient(circle at top left, ${heroPalette.primaryPink}55 0%, transparent 45%),
                         radial-gradient(circle at bottom right, ${heroPalette.lavender}55 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.75), transparent 40%)`,
          }}
        />
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.75))`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,246,248,0.32),transparent_35%)] opacity-80 animate-[pulse_9s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-end min-h-screen pb-12 sm:pb-20 md:pb-28 lg:pb-40 xl:pb-48">
        <div
          className={`w-full max-w-4xl text-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-2 sm:space-y-3 mb-2 sm:mb-4">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-[0.35em] text-[#FFF6F8]/90 drop-shadow-lg">
              Join us in celebrating
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#FFF6F8]/90 drop-shadow-lg italic">
              the debut of
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-4 py-1">
              <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-[rgba(255,246,248,0.7)] to-[rgba(244,143,177,0.95)]" />
              <Sparkles
                size={12}
                className="sm:w-3 sm:h-3 md:w-4 md:h-4 drop-shadow-md"
                style={{ color: heroPalette.baseWhite }}
              />
              <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-[rgba(255,246,248,0.7)] to-[rgba(244,143,177,0.95)]" />
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <h1
              className={`${greatVibes.className} text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8.5rem] text-[#FFF6F8] drop-shadow-[0_18px_40px_rgba(0,0,0,0.75)] leading-tight tracking-[0.06em]`}
              style={{
                letterSpacing: "0.08em",
              }}
              >
              {siteConfig.couple.debutNickname}
            </h1>
            <p
              className={`${windSong.className} text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] text-[#FFF6F8] drop-shadow-[0_14px_32px_rgba(0,0,0,0.7)]`}
              style={{
                marginTop: "-0.25rem",
              }}
              >
              on her 18th birthday
            </p>
            <div className="h-0.5 sm:h-1 w-28 sm:w-32 md:w-40 lg:w-52 mx-auto bg-gradient-to-r from-transparent via-[#FFF6F8] to-transparent shadow-[0_0_20px_rgba(255,246,248,0.85)]" />
          </div>

          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <div className="space-y-2 sm:space-y-2.5 md:space-y-3 pt-1 sm:pt-2">
              <p
                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium drop-shadow-lg tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.2em] lg:tracking-[0.24em]"
                style={{
                  textShadow: "0 2px 16px rgba(0, 0, 0, 0.8)",
                  color: "rgba(255,246,248,0.95)",
                }}
              >
                {siteConfig.ceremony.location}
              </p>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 flex justify-center items-center max-w-3xl mx-auto w-full px-2">
             <a
               href="#guest-list"
               className="group relative w-full sm:max-w-none sm:min-w-[200px] md:min-w-[240px] rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(244,143,177,0.5)]"
             >
               <span
                 className="absolute inset-0 rounded-2xl border transition-colors duration-300"
                 style={{
                   backgroundImage: `linear-gradient(120deg, ${heroPalette.primaryPink}, ${heroPalette.secondaryPink}, ${heroPalette.lavender})`,
                   borderColor: "rgba(255,246,248,0.85)",
                 }}
                 aria-hidden
               />
               <span className="relative z-10 inline-flex h-full min-h-[3.5rem] sm:min-h-[3.75rem] w-full items-center justify-center px-7 sm:px-9 md:px-11 text-[9px] sm:text-[10px] md:text-xs tracking-[0.42em] text-[#AC2F52] uppercase font-semibold transition-colors duration-300">
                 RSVP & Guestbook
               </span>
             </a>
          </div>
        </div>
      </div>
    </section>
  )
}
