"use client"

import { useState } from "react"
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

// Soft pink beach narrative palette
const narrativePalette = {
  primaryPink: "#F6C1CF",
  secondaryPink: "#F48FB1",
  accentPink: "#D95C8A",
  lavender: "#D8B4E2",
  baseWhite: "#FFF6F8",
  textDeep: "rgba(108, 23, 61, 0.95)",
}

const ABOUT_TEXT = `Piel is a vibrant and kind-hearted young woman who enjoys expressing herself through her talents and hobbies. She loves spending time with family and friends, listening to music, watching movies, and capturing fun moments that turn into beautiful memories.
Piel is known for her positive attitude, creativity, and determination in everything she does. Whether it’s exploring new interests or working toward her goals, she continues to grow and learn every day.`

export function Narrative() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <Section id="narrative" className="relative py-20 md:py-32 bg-[#FFF6F8] overflow-hidden">
      {/* Soft pastel background accents */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 0%, ${narrativePalette.primaryPink}26 0, transparent 55%),
            radial-gradient(circle at 100% 100%, ${narrativePalette.lavender}26 0, transparent 55%)
          `,
        }}
      />

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
            style={{ color: narrativePalette.accentPink }}
          >
            A little about Piel
          </p>
          <h2
            className={`${greatVibes.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl`}
            style={{
              color: narrativePalette.accentPink,
              textShadow: "0 12px 32px rgba(217,92,138,0.4)",
            }}
          >
            My Journey to 18
          </h2>
          <p
            className={`${inter.className} text-base sm:text-lg md:text-xl mt-4 tracking-[0.04em]`}
            style={{ color: narrativePalette.textDeep }}
          >
            A soft pink seaside story of growing up, holding on to simple joys, and stepping into eighteen with grace and gratitude.
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
                className="relative min-h-[500px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[620px] rounded-3xl border shadow-[0_18px_45px_rgba(0,0,0,0.08)] bg-white transition-transform duration-700"
                style={{
                  borderColor: `${narrativePalette.secondaryPink}55`,
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
                      style={{ backgroundImage: "url('/desktop-background/debut (2).webp')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.25)] to-transparent" />

                    <div className="absolute inset-x-6 bottom-6 sm:bottom-8 flex flex-col items-start gap-2 text-left">
                      <p
                        className={`${inter.className} text-xs sm:text-sm tracking-[0.32em] uppercase text-[rgba(255,246,248,0.9)]`}
                      >
                        Meet the debutant
                      </p>
                      <h3
                        className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl text-[#FFF6F8] leading-tight drop-shadow-[0_12px_32px_rgba(0,0,0,0.8)]`}
                      >
                        Piel Allen G. Marasigan
                      </h3>
                      <p
                        className={`${inter.className} text-xs sm:text-sm max-w-sm text-[rgba(255,246,248,0.9)]`}
                      >
                        Tap to flip and read a little more about her story.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back: about me text */}
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden"
                  style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", backgroundColor: "#FFFFFF" }}
                >
                  {/* subtle corner accents */}
                  <div className="pointer-events-none absolute -top-10 -left-6 w-32 h-32 rounded-full border border-[rgba(255,246,248,0.7)]" />
                  <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-32 rounded-[999px] border border-[rgba(244,143,177,0.45)]" />

                  <div className="relative z-10 h-full w-full px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 flex flex-col justify-between">
                    <div className="space-y-5 sm:space-y-6">
                      <div>
                        <h3
                          className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl leading-tight`}
                          style={{ color: narrativePalette.accentPink }}
                        >
                          About Me
                        </h3>
                      </div>

                      <div className="space-y-4 sm:space-y-5">
                        {ABOUT_TEXT.split("\n").map((para, idx) => (
                          <p
                            key={idx}
                            className="text-sm sm:text-base md:text-lg leading-relaxed"
                            style={{ color: narrativePalette.textDeep }}
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>

                    <p
                      className={`${inter.className} mt-4 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-right`}
                      style={{ color: "rgba(108,23,61,0.7)" }}
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
