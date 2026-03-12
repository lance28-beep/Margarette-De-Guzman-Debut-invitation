"use client"

import { useState } from "react"
import { Section } from "@/components/section"
import { motion } from "motion/react"
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
  weight: ["300", "400", "500", "600"],
})

// Narrative section color controls (celestial theme)
const narrativeColors = {
  // sectionBackground: '#020819',
  // gradientSky: '#BAD6EB',
  // gradientRoyal: '#334EAC',
  gradientMidnight: '#081F5C',
  cardFrontOverlayFrom: 'rgba(2,6,20,0.85)',
  cardFrontOverlayTo: 'rgba(2,6,20,0.15)',
  label: '#BAD6EB',
  heading: '#F7F2EB',
  subtitle: 'rgba(237,241,246,0.88)',
  frontTitle: '#F7F2EB',
  frontText: 'rgba(237,241,246,0.9)',
  backTitle: '#F7F2EB',
  backBody: 'rgba(237,241,246,0.9)',
  backHint: 'rgba(186,214,235,0.85)',
  cardBorder: 'rgba(186,214,235,0.55)',
}

const ABOUT_TEXT = `${siteConfig.couple.debutNickname} is a vibrant and kind-hearted young woman who enjoys expressing herself through her talents and hobbies. She loves spending time with family and friends, listening to music, watching movies, and capturing fun moments that turn into beautiful memories.
${siteConfig.couple.debutNickname} is known for her positive attitude, creativity, and determination in everything she does. Whether it’s exploring new interests or working toward her goals, she continues to grow and learn every day.`

export function Narrative() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <Section id="narrative" className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs sm:text-sm tracking-[0.35em] uppercase mb-4"
            style={{ color: narrativeColors.label }}
          >
            A little about {siteConfig.couple.debutNickname}
          </p>
          <h2
            className={`${greatVibes.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl`}
            style={{
              color: narrativeColors.heading,
              textShadow:
                "0 0 22px rgba(208,227,255,0.9), 0 0 52px rgba(8,31,92,0.9), 0 18px 46px rgba(0,0,0,0.9)",
            }}
          >
            My Journey to 18
          </h2>
          <p
            className={`${inter.className} text-base sm:text-lg md:text-xl mt-4 tracking-[0.04em]`}
            style={{ color: narrativeColors.subtitle }}
          >
            A celestial story of growing up under moonlit skies, holding on to quiet joys, and stepping into {siteConfig.couple.debutNickname} with grace and wonder.
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
            <motion.button
              type="button"
              onClick={() => setIsFlipped((prev) => !prev)}
              className="group relative w-full [perspective:1400px] focus:outline-none"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              aria-label={isFlipped ? "Hide about me" : "Show about me"}
            >
              <div
                className="relative min-h-[500px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[620px] rounded-3xl border shadow-[0_24px_70px_rgba(0,0,0,0.6)] bg-transparent transition-transform duration-700"
                style={{
                  borderColor: narrativeColors.cardBorder,
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front: photo-style card */}
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="relative h-full w-full">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: "url('/mobile-background/debut (2).jpg')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t"
                      style={{ backgroundImage: `linear-gradient(to top, ${narrativeColors.cardFrontOverlayFrom}, ${narrativeColors.cardFrontOverlayTo})` }} />

                    <div className="absolute inset-x-6 bottom-6 sm:bottom-8 flex flex-col items-start gap-2 text-left">
                      <p
                        className={`${inter.className} text-xs sm:text-sm tracking-[0.32em] uppercase text-[rgba(255,246,248,0.9)]`}
                      >
                        Meet the debutant
                      </p>
                      <h3
                        className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl leading-tight drop-shadow-[0_14px_36px_rgba(0,0,0,0.85)]`}
                      style={{ color: narrativeColors.frontTitle }}
                      >
                       {siteConfig.couple.debut}
                      </h3>
                      <p
                        className={`${inter.className} text-xs sm:text-sm max-w-sm`}
                      style={{ color: narrativeColors.frontText }}
                      >
                        Tap to flip and read a little more about her story.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back: about me text */}
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden"
                  style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", background: "rgba(2,6,20,0.96)" }}
                >
                  {/* subtle corner accents */}
                  <div className="pointer-events-none absolute -top-10 -left-6 w-32 h-32 rounded-full border"
                  style={{ borderColor: "rgba(186,214,235,0.55)" }} />
                  <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-32 rounded-[999px] border"
                  style={{ borderColor: "rgba(186,214,235,0.38)" }} />

                  <div className="relative z-10 h-full w-full px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 flex flex-col justify-between">
                    <div className="space-y-5 sm:space-y-6">
                      <div>
                        <h3
                          className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl leading-tight`}
                          style={{ color: narrativeColors.backTitle }}
                        >
                          About Me
                        </h3>
                      </div>

                      <div className="space-y-4 sm:space-y-5">
                        {ABOUT_TEXT.split("\n").map((para, idx) => (
                          <p
                            key={idx}
                            className="text-sm sm:text-base md:text-lg leading-relaxed"
                            style={{ color: narrativeColors.backBody }}
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>

                    <p
                      className={`${inter.className} mt-4 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-right`}
                      style={{ color: narrativeColors.backHint }}
                    >
                      Tap to flip back
                    </p>
                  </div>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
