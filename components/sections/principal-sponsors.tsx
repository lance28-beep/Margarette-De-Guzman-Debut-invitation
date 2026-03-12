"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Section } from "@/components/section"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { siteConfig } from "@/content/site" 

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

// Soft pink beach theme — change here to update section colors in one place
const COLOR = {
  sectionBg: "#BAD6EB",
  sectionBgDark: "#F48FB1",
  cardBg: "#F7F2EB",
  cardBorder: "#BACEDB",
  title: "#334EAC",
  text: "#081F5C",
  textMuted: "#6C173D80",
  patternStroke: "#D95C8A",
  overlay: "#F48FB120",
  MoonBeige: "#F7F2EB",
  Porcelain: "#EDF1F6",
  Moonlight: "#BACEDB",
  RoyalBlue: "#334EAC",
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

interface PrincipalSponsor {
  MalePrincipalSponsor: string

  FemalePrincipalSponsor: string

}



export function PrincipalSponsors() {
  const NameItem = ({ name, align = "center" }: { name: string; align?: "left" | "center" | "right" }) => {

    const containerAlign =

      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"

    const textAlign =

      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"

    return (

      <div className={`flex flex-col ${containerAlign} justify-center py-0.5 sm:py-1 w-full`}>

        <p
          className={`${playfair.className} text-[13px] sm:text-sm md:text-base font-medium leading-snug break-words ${textAlign}`}
          style={{ color: COLOR.MidnightBlue }}
        >
          {name}
        </p>

      </div>

    )

  }



  const [sponsors, setSponsors] = useState<PrincipalSponsor[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)



  const fetchSponsors = async () => {

    setIsLoading(true)

    try {

      const res = await fetch("/api/principal-sponsor", { cache: "no-store" })

      if (!res.ok) throw new Error("Failed to load principal sponsors")

      const data: PrincipalSponsor[] = await res.json()

      setSponsors(data)

    } catch (e: any) {

      console.error(e)

      setError(e?.message || "Failed to load principal sponsors")

    } finally {

      setIsLoading(false)

    }

  }



  useEffect(() => {

    fetchSponsors()

  }, [])



  const sponsorPairs = useMemo(

    () => sponsors.filter((s) => s.MalePrincipalSponsor || s.FemalePrincipalSponsor),

    [sponsors]

  )



  return (
    <Section
      id="sponsors"
      className="relative py-10 sm:py-12 md:py-14 lg:py-16 overflow-hidden"
      
    >
      {/* Celestial background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 12% 15%, ${COLOR.Moonlight}0.32 0%, transparent 48%),
              radial-gradient(ellipse at 88% 80%, ${COLOR.RoyalBlue}0.55 0%, transparent 55%),
              radial-gradient(ellipse at 50% 50%, ${COLOR.MidnightBlue}0.5 0%, transparent 70%),
              linear-gradient(160deg, ${COLOR.MoonBeige}1 0%, ${COLOR.MidnightBlue}0.88 40%, ${COLOR.MoonBeige}1 100%)
            `,
          }}
        />
        <div
          className="absolute -top-16 -left-20 w-[55%] h-[55%] mix-blend-screen"
          style={{
            background: "radial-gradient(ellipse at 40% 40%, #F7F2EB0.9 0%, #334EAC0.55 38%, transparent 70%)",
            filter: "blur(52px)",
            opacity: 0.28,
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[60%] h-[60%] mix-blend-screen"
          style={{
            background: "radial-gradient(ellipse at 60% 60%, #F7F2EB0.88 0%, #081F5C0.5 45%, transparent 70%)",
            filter: "blur(58px)",
            opacity: 0.25,
          }}
        />
      </div>
      {/* Celestial background (base) */}
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

      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-4">
        <h2
          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_18px_48px_${COLOR.RoyalBlue}0.4]`}
          style={{ color: COLOR.MoonBeige }}
        >
         Our Cotillion De Honor
        </h2>
        <p
          className={`${inter.className} text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-2 leading-relaxed`}
          style={{ color: COLOR.MoonBeige}}
        >
          Tonight, we honor the remarkable individuals who stand beside the debutante as she steps into a new chapter of her life. Each pair represents friendship, support, cherished memories, and the beautiful journey that has shaped her into the woman she is becoming.

With grace, elegance, and heartfelt celebration, they take part in this special tradition — a dance that symbolizes love, gratitude, and lasting bonds.
        </p>
      </div>



      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div
          className="relative backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-[0_25px_80px_${COLOR.RoyalBlue}0.25] overflow-hidden"
          style={{
            backgroundColor: COLOR.cardBg,
            border: `2px solid ${COLOR.Moonlight}`,
          }}
        >
          <div
            className="absolute inset-[10px] sm:inset-[14px] md:inset-[18px] rounded-lg sm:rounded-xl pointer-events-none border"
            style={{ borderColor: `${COLOR.Moonlight}` }}
          />



          <div className="relative p-4 sm:p-5 md:p-6 lg:p-7">

            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="w-12 h-12 border-4 rounded-full animate-spin"
                    style={{ borderColor: `${COLOR.RoyalBlue}30`, borderTopColor: COLOR.RoyalBlue }}
                  />
                  <span className={`${inter.className} text-lg`} style={{ color: COLOR.MidnightBlue }}>
                    Loading sponsors…
                  </span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-24">
                <div className="text-center">
                  <p className={`${inter.className} text-red-600 text-lg mb-2`}>{error}</p>
                  <button
                    onClick={fetchSponsors}
                    className={`${playfair.className} transition-colors underline`}
                    style={{ color: COLOR.title }}
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : sponsorPairs.length === 0 ? (
              <div className="text-center py-24">
                <p className={`${inter.className} text-lg`} style={{ color: COLOR.MidnightBlue }}>
                  Sponsors and special persons will be announced soon.
                </p>
              </div>
            ) : (

              <div className="mb-0">
                <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                  {sponsorPairs.map((pair, idx) => (
                    <div key={`pair-${idx}`} className="w-full">
                      <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6 gap-y-1 sm:gap-y-1.5">
                        {pair.MalePrincipalSponsor && (
                          <NameItem name={pair.MalePrincipalSponsor} align="right" />
                        )}
                        {pair.FemalePrincipalSponsor && (
                          <NameItem name={pair.FemalePrincipalSponsor} align="left" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            )}

          </div>

        </div>

      </div>

    </Section>

  )

}
