"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Section } from "@/components/section"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { siteConfig } from "@/content/site"

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

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

// Soft pink beach palette for gallery
const galleryPalette = {
  MidnightBlue: "#081F5C",
  RoyalBlue: "#334EAC",
  SkyBlueAccent: "#BAD6EB",
  DawnBlue: "#D0E3FF",
  Porcelain: "#EDF1F6",
  MoonBeige: "#F7F2EB",
}

const galleryItems = [
  { image: "/mobile-background/debut (1).jpg", text: "Moonrise Beginning" },
  { image: "/mobile-background/debut (2).jpg", text: "Starlit Horizon" },
  { image: "/mobile-background/debut (3).jpg", text: "Celestial Glow" },
  { image: "/mobile-background/debut (4).jpg", text: "Whispers of the Moon" },
  { image: "/mobile-background/debut (5).jpg", text: "A Sky Full of Dreams" },
  { image: "/mobile-background/debut (6).jpg", text: "Moonlight Memories" },
  { image: "/mobile-background/debut (2).jpg", text: "Under the Silver Sky" },
  { image: "/mobile-background/debut (3).jpg", text: "Stardust Wishes" },
  { image: "/mobile-background/debut (4).jpg", text: "Celestial Reflections" },
  { image: "/mobile-background/debut (5).jpg", text: "Dancing with the Stars" },
]

const tileLayouts = [
  "md:col-span-3 md:row-span-3 md:col-start-1 md:row-start-1",
  "md:col-span-2 md:row-span-3 md:col-start-4 md:row-start-1",
  "md:col-span-1 md:row-span-3 md:col-start-6 md:row-start-1",
  "md:col-span-3 md:row-span-2 md:col-start-1 md:row-start-4",
  "md:col-span-3 md:row-span-2 md:col-start-4 md:row-start-4",
  "md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-6",
  "md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-6",
  "md:col-span-2 md:row-span-1 md:col-start-5 md:row-start-6",
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)
  const [zoomScale, setZoomScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null)
  const [pinchStartScale, setPinchStartScale] = useState(1)
  const [lastTap, setLastTap] = useState(0)
  const [panStart, setPanStart] = useState<{ x: number; y: number; panX: number; panY: number } | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const navigateImage = useCallback((direction: "prev" | "next") => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex
      if (direction === "next") {
        newIndex = (prevIndex + 1) % galleryItems.length
      } else {
        newIndex = (prevIndex - 1 + galleryItems.length) % galleryItems.length
      }
      setSelectedImage(galleryItems[newIndex])
      return newIndex
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return

      if (e.key === "ArrowLeft") navigateImage("prev")
      if (e.key === "ArrowRight") navigateImage("next")
      if (e.key === "Escape") setSelectedImage(null)
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedImage, currentIndex, navigateImage])

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedImage])

  useEffect(() => {
    if (selectedImage) {
      const next = new Image()
      next.src = galleryItems[(currentIndex + 1) % galleryItems.length].image
      const prev = new Image()
      prev.src = galleryItems[(currentIndex - 1 + galleryItems.length) % galleryItems.length].image
    }
  }, [selectedImage, currentIndex])

  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))
  const resetZoom = () => {
    setZoomScale(1)
    setPan({ x: 0, y: 0 })
    setPanStart(null)
  }

  return (
    <Section
      id="gallery"
      className="relative py-14 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
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

      <div className="relative z-10 text-center px-4">
        <div className="mx-auto max-w-3xl">
          <p
            className="text-xs sm:text-sm tracking-[0.45em] uppercase mb-3 font-medium"
            style={{ color: galleryPalette.MoonBeige }}
          >
            {siteConfig.couple.debutNickname}&apos;s Gallery
          </p>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl`}
            style={{
              color: galleryPalette.MoonBeige,
              textShadow: "0 10px 30px rgba(8,31,92,0.4)",
            }}
          >
            Gallery of {siteConfig.couple.debutNickname}&apos;s 18th Debut
          </h2>
          <p
            className={`${inter.className} text-sm sm:text-base md:text-lg mt-4 leading-relaxed max-w-2xl mx-auto`}
            style={{ color: galleryPalette.MoonBeige }}
          >
            A collection of seaside-inspired memories from  {siteConfig.couple.debutNickname}&apos;s 18th Debut—soft pastels, bright smiles, and little snapshots of a day to remember.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-12 sm:mt-14 lg:mt-16 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64 sm:h-80 md:h-96">
              <div className="w-14 h-14 border-[3px] border-[rgba(8,31,92,0.25)] border-t-[rgba(186,214,235,0.95)] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="mx-auto max-w-6xl w-full px-3 sm:px-4 md:px-6">
              {/* Mobile: 2-col equal cards; Tablet: 3-col; Desktop: 4-col uniform masonry */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-2.5 lg:gap-3 w-full">
                {galleryItems.map((item, index) => (
                  <button
                    key={item.image + index}
                    type="button"
                    className="group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-2xl border border-[rgba(244,143,177,0.35)] bg-white/80 backdrop-blur-sm shadow-[0_10px_26px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-[rgba(217,92,138,0.8)] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(217,92,138,0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF6F8] min-h-[140px] sm:min-h-[160px] md:min-h-[200px] lg:min-h-[220px] aspect-[3/4]"
                    onClick={() => {
                      setSelectedImage(item)
                      setCurrentIndex(index)
                    }}
                    aria-label={`Open image ${index + 1}: ${item.text}`}
                    >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1] pointer-events-none">
                      <div className="absolute -inset-3 bg-gradient-to-br from-[rgba(8,31,92,0.35)] via-transparent to-[rgba(186,214,235,0.4)] blur-xl" />
                    </div>

                    <div className="relative h-full w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.text || `Gallery image ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,31,92,0.45)] via-transparent to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-2.5 md:p-3 flex items-center justify-between text-white z-10">
                      <span
                        className={`${playfair.className} text-[9px] sm:text-[10px] md:text-xs tracking-[0.15em] uppercase truncate max-w-[72%] drop-shadow-md`}
                      >
                        {item.text}
                      </span>
                      <span className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-[rgba(186,214,235,0.9)] flex-shrink-0">
                        {index + 1}/{galleryItems.length}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-[rgba(8,31,92,0.96)] backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
          onClick={() => {
            setSelectedImage(null)
            resetZoom()
          }}
        >
          <div
            className="relative max-w-6xl w-full h-full sm:h-auto flex flex-col items-center justify-center"
            onTouchStart={(e) => {
              if (e.touches.length === 1) {
                const now = Date.now()
                if (now - lastTap < 300) {
                  setZoomScale((s) => (s > 1 ? 1 : 2))
                  setPan({ x: 0, y: 0 })
                }
                setLastTap(now)
                const t = e.touches[0]
                setTouchStartX(t.clientX)
                setTouchDeltaX(0)
                if (zoomScale > 1) {
                  setPanStart({ x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y })
                }
              }
              if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX
                const dy = e.touches[0].clientY - e.touches[1].clientY
                const dist = Math.hypot(dx, dy)
                setPinchStartDist(dist)
                setPinchStartScale(zoomScale)
              }
            }}
            onTouchMove={(e) => {
              if (e.touches.length === 2 && pinchStartDist) {
                const dx = e.touches[0].clientX - e.touches[1].clientX
                const dy = e.touches[0].clientY - e.touches[1].clientY
                const dist = Math.hypot(dx, dy)
                const scale = clamp((dist / pinchStartDist) * pinchStartScale, 1, 3)
                setZoomScale(scale)
              } else if (e.touches.length === 1) {
                const t = e.touches[0]
                if (zoomScale > 1 && panStart) {
                  const dx = t.clientX - panStart.x
                  const dy = t.clientY - panStart.y
                  setPan({ x: panStart.panX + dx, y: panStart.panY + dy })
                } else if (touchStartX !== null) {
                  setTouchDeltaX(t.clientX - touchStartX)
                }
              }
            }}
            onTouchEnd={() => {
              setPinchStartDist(null)
              setPanStart(null)
              if (zoomScale === 1 && Math.abs(touchDeltaX) > 50) {
                navigateImage(touchDeltaX > 0 ? "prev" : "next")
              }
              setTouchStartX(null)
              setTouchDeltaX(0)
            }}
          >
            <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-3 sm:px-6 pt-3 sm:pt-6">
              <div className="bg-[rgba(8,31,92,0.95)] backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-[rgba(186,214,235,0.65)] shadow-[0_12px_24px_rgba(0,0,0,0.55)]">
                <span className="text-xs sm:text-sm font-medium text-white tracking-[0.18em]">
                  {currentIndex + 1} / {galleryItems.length}
                </span>
              </div>
            </div>

            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage("prev")
                    resetZoom()
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-[rgba(8,31,92,0.9)] hover:bg-[rgba(8,31,92,1)] backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-[rgba(186,214,235,0.7)]"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage("next")
                    resetZoom()
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-[rgba(8,31,92,0.9)] hover:bg-[rgba(8,31,92,1)] backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border=[rgba(186,214,235,0.7)]"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>
              </>
            )}

            <div className="relative w-full h-full flex items-center justify-center pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden">
              <div
                className="relative inline-block max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(null)
                    resetZoom()
                  }}
                  className="absolute top-3 right-3 z-40 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[rgba(186,214,235,0.7)] bg-[rgba(8,31,92,0.95)] backdrop-blur-md shadow-[0_14px_28px_rgba(0,0,0,0.6)] transition-all duration-200 hover:scale-105"
                  aria-label="Close lightbox"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <X size={18} className="sm:w-6 sm:h-6 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] " />
                </button>
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.text || "Gallery image"}
                  style={{
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`,
                    transition: pinchStartDist ? "none" : "transform 200ms ease-out",
                  }}
                  className="max-w-full max-h-[75vh] sm:max-h-[85vh] object-contain rounded-2xl shadow-[0_32px_64px_rgba(0,0,0,0.7)] ring-2 ring-[rgba(186,214,235,0.6)]"
                />

                {zoomScale > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      resetZoom()
                    }}
                    className="absolute bottom-2 right-2 bg-[rgba(8,31,92,0.9)] hover:bg-[rgba(8,31,92,1)] backdrop-blur-md text-white rounded-full px-3 py-1.5 text-xs font-medium border border-[rgba(186,214,235,0.7)] transition-all duration-200"
                  >
                    Reset Zoom
                  </button>
                )}
              </div>
            </div>

            {galleryItems.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:hidden z-20">
                <p className="text-xs text-white bg-[rgba(8,31,92,0.9)] backdrop-blur-sm rounded-full px-3 py-1.5 border border-[rgba(186,214,235,0.7)]">
                  Swipe to navigate
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative z-10 mt-12 sm:mt-14 md:mt-16 flex justify-center px-4">
        <a
          href="/gallery"
          className="group relative inline-flex h-full min-h-[3.5rem] sm:min-h-[3.75rem] items-center justify-center overflow-hidden rounded-full border-2 px-10 sm:px-12 md:px-14 text-[9px] sm:text-[10px] md:text-xs tracking-[0.48em] uppercase font-semibold shadow-[0_20px_48px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_56px_rgba(0,0,0,0.22)]"
          style={{
            backgroundImage: `linear-gradient(120deg, ${galleryPalette.MidnightBlue}, ${galleryPalette.RoyalBlue})`,
            borderColor: galleryPalette.SkyBlueAccent,
            color: galleryPalette.MoonBeige,
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 inline-flex items-center justify-center">
            View Full Gallery
          </span>
        </a>
      </div>
    </Section>
  )
}