"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"

import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"



const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })



export function Registry() {

  return (

    <Section

      id="registry"

      className="relative z-[30] overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 bg-transparent"

    >



      <div className="relative z-10 text-center mb-10 sm:mb-14 lg:mb-16 px-4">

        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#D95C8A]/40 px-5 py-2 text-[10px] sm:text-xs uppercase tracking-[0.48em] text-white">

          Gift Registry

        </div>

        <h2

          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_40px_rgba(1,54,98,0.68)] mt-4`}

        >

          Your Thoughtful Gifts

        </h2>

        <p

          className={`${inter.className} text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed`}

        >

          Your presence is the most precious gift for {`${siteConfig.couple.debut}`}'s debut celebration. If you wish to share a token of love,

          we welcome your thoughtful contributions to help her pursue her dreams.

        </p>

      </div>



      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">

        <div className="relative overflow-hidden rounded-[32px] border-2 border-white/30 bg-white/90 backdrop-blur-md shadow-[0_26px_70px_rgba(1,54,98,0.35)]">

          <div className="relative px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">

            <div className="max-w-2xl mx-auto text-center">

              <p className={`${playfair.className} text-lg sm:text-xl md:text-2xl text-[#D95C8A] leading-relaxed`}>

                "As {`${siteConfig.couple.debut}`} celebrates her debut, your presence is the greatest gift she treasures."

              </p>

            </div>

          </div>

        </div>

      </div>

    </Section>

  )

}
