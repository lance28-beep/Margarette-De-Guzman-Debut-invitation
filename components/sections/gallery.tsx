"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Section } from "@/components/section"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

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

// Soft pink beach palette for gallery
const galleryPalette = {
  primaryPink: "#F6C1CF",
  secondaryPink: "#F48FB1",
  accentPink: "#D95C8A",
  lavender: "#D8B4E2",
  coral: "#E57399",
  baseWhite: "#FFF6F8",
  textDeep: "rgba(108, 23, 61, 0.95)",
}

const galleryItems = [
  { image: "/desktop-background/debut (1).webp", text: "Soft Shoreline" },
  { image: "/desktop-background/debut (2).webp", text: "Pink Horizon" },
  { image: "/desktop-background/debut (3).webp", text: "Seaside Glow" },
  { image: "/desktop-background/debut (4).webp", text: "Sunset Whispers" },
  { image: "/desktop-background/debut (5).webp", text: "Pastel Dream" },
  { image: "/desktop-background/debut (6).jpg", text: "Tide of Memories" },
  { image: "/mobile-background/debut (6).jpg", text: "Shoreline Smiles" },
  { image: "/mobile-background/debut (1).jpg", text: "Blush Skies" },
  { image: "/desktop-background/debut (9).jpg", text: "Seafoam Stories" },
  { image: "/mobile-background/debut (2).webp", text: "Seafoam Stories" },
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
      className="relative py-14 sm:py-20 md:py-24 lg:py-28 overflow-hidden bg-[#FFF6F8]"
    >
      {/* Soft pink beach background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              radial-gradient(circle at 0% 0%, ${galleryPalette.primaryPink}26 0, transparent 55%),
              radial-gradient(circle at 100% 100%, ${galleryPalette.lavender}26 0, transparent 55%),
              radial-gradient(circle at 15% 80%, ${galleryPalette.coral}22 0, transparent 60%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mx-auto max-w-3xl">
          <p
            className="text-xs sm:text-sm tracking-[0.45em] uppercase mb-3 font-medium"
            style={{ color: galleryPalette.accentPink }}
          >
            Soft pink snapshots
          </p>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl`}
            style={{
              color: galleryPalette.accentPink,
              textShadow: "0 10px 30px rgba(217,92,138,0.4)",
            }}
          >
            Gallery of Sweet Moments
          </h2>
          <p
            className={`${inter.className} text-sm sm:text-base md:text-lg mt-4 leading-relaxed max-w-2xl mx-auto`}
            style={{ color: galleryPalette.textDeep }}
          >
            A collection of seaside-inspired memories from Piel Allen’s 18th—soft pastels, bright smiles, and little snapshots of a day to remember.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-12 sm:mt-14 lg:mt-16 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64 sm:h-80 md:h-96">
              <div className="w-14 h-14 border-[3px] border-[rgba(217,92,138,0.25)] border-t-[rgba(244,143,177,0.95)] rounded-full animate-spin" />
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
                      <div className="absolute -inset-3 bg-gradient-to-br from-[rgba(246,193,207,0.35)] via-transparent to-[rgba(216,180,226,0.4)] blur-xl" />
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.45)] via-transparent to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-2.5 md:p-3 flex items-center justify-between text-white z-10">
                      <span
                        className={`${playfair.className} text-[9px] sm:text-[10px] md:text-xs tracking-[0.15em] uppercase truncate max-w-[72%] drop-shadow-md`}
                      >
                        {item.text}
                      </span>
                      <span className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-[rgba(255,246,248,0.9)] flex-shrink-0">
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
          className="fixed inset-0 z-[9999] bg-[rgba(6,0,18,0.96)] backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
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
              <div className="bg-[rgba(217,92,138,0.95)] backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-[rgba(255,246,248,0.65)] shadow-[0_12px_24px_rgba(0,0,0,0.55)]">
                <span className="text-xs sm:text-sm font-medium text-[#FFF6F8] tracking-[0.18em]">
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
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-[rgba(217,92,138,0.9)] hover:bg-[rgba(217,92,138,1)] backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-[rgba(255,246,248,0.7)]"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="sm:w-7 sm:h-7 text-[#FFF6F8]" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage("next")
                    resetZoom()
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-[rgba(217,92,138,0.9)] hover:bg-[rgba(217,92,138,1)] backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border=[rgba(255,246,248,0.7)]"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="sm:w-7 sm:h-7 text-[#FFF6F8]" />
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
                  className="absolute top-3 right-3 z-40 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[rgba(255,246,248,0.7)] bg-[rgba(217,92,138,0.95)] backdrop-blur-md shadow-[0_14px_28px_rgba(0,0,0,0.6)] transition-all duration-200 hover:scale-105"
                  aria-label="Close lightbox"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <X size={18} className="sm:w-6 sm:h-6 text-[#FFF6F8] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
                </button>
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.text || "Gallery image"}
                  style={{
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`,
                    transition: pinchStartDist ? "none" : "transform 200ms ease-out",
                  }}
                  className="max-w-full max-h-[75vh] sm:max-h-[85vh] object-contain rounded-2xl shadow-[0_32px_64px_rgba(0,0,0,0.7)] ring-2 ring-[rgba(244,143,177,0.6)]"
                />

                {zoomScale > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      resetZoom()
                    }}
                    className="absolute bottom-2 right-2 bg-[rgba(217,92,138,0.9)] hover:bg-[rgba(217,92,138,1)] backdrop-blur-md text-[#FFF6F8] rounded-full px-3 py-1.5 text-xs font-medium border border-[rgba(255,246,248,0.7)] transition-all duration-200"
                  >
                    Reset Zoom
                  </button>
                )}
              </div>
            </div>

            {galleryItems.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:hidden z-20">
                <p className="text-xs text-[#FFF6F8] bg-[rgba(217,92,138,0.9)] backdrop-blur-sm rounded-full px-3 py-1.5 border border-[rgba(255,246,248,0.7)]">
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
            backgroundImage: `linear-gradient(120deg, ${galleryPalette.primaryPink}, ${galleryPalette.secondaryPink})`,
            borderColor: galleryPalette.accentPink,
            color: "#2b1016",
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