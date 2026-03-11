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
  sectionBg: "#F6C1CF",
  sectionBgDark: "#F48FB1",
  cardBg: "rgba(255, 246, 248, 0.95)",
  cardBorder: "rgba(217, 92, 138, 0.35)",
  title: "#D95C8A",
  text: "rgba(108, 23, 61, 0.95)",
  textMuted: "rgba(108, 23, 61, 0.8)",
  patternStroke: "#F8D7E2",
  overlay: "rgba(244, 143, 177, 0.2)",
}



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
          style={{ color: COLOR.text }}
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
      style={{ background: `linear-gradient(to bottom, ${COLOR.sectionBg}, ${COLOR.sectionBgDark})` }}
    >
      {/* Ornate pattern background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 70px, rgba(248,215,226,0.12) 70px, rgba(248,215,226,0.12) 71px),
              repeating-linear-gradient(-45deg, transparent, transparent 70px, rgba(248,215,226,0.12) 70px, rgba(248,215,226,0.12) 71px)
            `,
            backgroundSize: "70px 70px, 70px 70px",
          }}
        />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <defs>
            <pattern id="sponsorScrollPattern" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
              <g fill="none" stroke={COLOR.patternStroke} strokeWidth="0.5">

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

          <rect width="100%" height="100%" fill="url(#sponsorScrollPattern)" />

        </svg>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${COLOR.overlay}, transparent 50%, ${COLOR.overlay})`,
          }}
        />
      </div>

      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-4">
        <h2
          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_18px_48px_rgba(217,92,138,0.4)]`}
          style={{ color: COLOR.title }}
        >
         Our Cotillion De Honor
        </h2>
        <p
          className={`${inter.className} text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-2 leading-relaxed`}
          style={{ color: COLOR.textMuted }}
        >
          Tonight, we honor the remarkable individuals who stand beside the debutante as she steps into a new chapter of her life. Each pair represents friendship, support, cherished memories, and the beautiful journey that has shaped her into the woman she is becoming.

With grace, elegance, and heartfelt celebration, they take part in this special tradition — a dance that symbolizes love, gratitude, and lasting bonds.
        </p>
      </div>



      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div
          className="relative backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-[0_25px_80px_rgba(217,92,138,0.25)] overflow-hidden"
          style={{
            backgroundColor: COLOR.cardBg,
            border: `2px solid ${COLOR.cardBorder}`,
          }}
        >
          <div
            className="absolute inset-[10px] sm:inset-[14px] md:inset-[18px] rounded-lg sm:rounded-xl pointer-events-none border"
            style={{ borderColor: `${COLOR.cardBorder}66` }}
          />



          <div className="relative p-4 sm:p-5 md:p-6 lg:p-7">

            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="w-12 h-12 border-4 rounded-full animate-spin"
                    style={{ borderColor: `${COLOR.title}30`, borderTopColor: COLOR.title }}
                  />
                  <span className={`${inter.className} text-lg`} style={{ color: COLOR.textMuted }}>
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
                <p className={`${inter.className} text-lg`} style={{ color: COLOR.textMuted }}>
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
