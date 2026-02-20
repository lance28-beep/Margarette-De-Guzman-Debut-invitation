"use client"

import { Section } from "@/components/section"
import { motion } from "motion/react"
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
  weight: ["300", "400", "500", "600"],
})

const ABOUT_TEXT = `Ena is a passionate young lady who aspires to travel the world. She is kind-hearted and constantly demonstrates compassion and understanding for those around her.
People are immediately at ease around her, as though they have known her for a very long time. Ena appreciates the small pleasures of fashion, self-care, and anything that enhances her individuality.
She has an adventurous spirit that encourages her to try new things, and live life to the fullest with a gentle heart and curious charm. Ena is a truly remarkable person because of her warmth, kindness, patience, and adventure. `

export function Narrative() {
  return (
    <Section id="narrative" className="relative py-20 md:py-32">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs sm:text-sm tracking-[0.4em] uppercase text-white mb-4">
            Sapphire tales of the celebrant
          </p>
          <h2
            className={`${greatVibes.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white`}
          >
            My Journey to 18
          </h2>
          <p className={`${inter.className} text-base sm:text-lg md:text-xl text-white mt-4 tracking-[0.08em]`}>
            Every chapter glows richer beneath sapphire skies and champagne lights.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-col items-center gap-12 lg:gap-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="w-full max-w-3xl">
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-[#E5C9B7]/25 px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <h3 className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl text-[#FBF1E7] leading-tight`}>
                    About Me
                  </h3>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <p className="text-sm sm:text-base md:text-lg text-[#E5C9B7]/85 leading-relaxed">
                    {ABOUT_TEXT}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
