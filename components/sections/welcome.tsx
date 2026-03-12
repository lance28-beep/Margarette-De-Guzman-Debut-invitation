"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

// Welcome section color controls (edit here to restyle quickly)
const welcomeColors = {
  // Background behind the card
  background: "transparent",
  // Card surface + border
  cardBackground: "rgba(2, 8, 25, 0.88)", // deep celestial glass
  cardBorder: "rgba(186, 214, 235, 0.55)",
  // Text colors
  label: "#BAD6EB", // small label text
  heading: "#F7F2EB", // main welcome heading
  verse: "#EDF1F6", // quote/verse text
  body: "rgba(237, 241, 246, 0.9)", // body copy
  // Divider / accents
  dividerLine: "rgba(186, 214, 235, 0.55)",
  dividerDot: "#BAD6EB",
}

export function Welcome() {
  const brideName = siteConfig.couple.brideNickname || siteConfig.couple.bride
  const groomName = siteConfig.couple.groomNickname || siteConfig.couple.groom
  return (
    <Section
      id="welcome"
      className="relative overflow-hidden py-12 sm:py-16 md:py-20"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] border backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.6)] px-5 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12"
          style={{
            background: welcomeColors.cardBackground,
            borderColor: welcomeColors.cardBorder,
          }}
        >
          <div className="text-center space-y-6 sm:space-y-7 md:space-y-8">
          {/* Main heading */}
          <div className="space-y-1.5 sm:space-y-2.5">
            <p
              className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em]`}
              style={{
                color: welcomeColors.label,
                textShadow: "0 2px 12px rgba(0,0,0,0.85)",
              }}
            >
              {siteConfig.couple.debut}
            </p>
            <h2
              className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-[2.9rem]"
              style={{
                color: welcomeColors.heading,
                textShadow:
                  "0 0 18px rgba(208,227,255,0.9), 0 0 42px rgba(8,31,92,0.9), 0 18px 46px rgba(0,0,0,0.85)",
              }}
            >
              Welcome to {siteConfig.couple.debutNickname}  18th Birthday Celebration
            </h2>


            {/* Verse */}
            <div className="space-y-1">
              <p
                className={`${cormorant.className} text-xs sm:text-sm md:text-base italic`}
                style={{
                  color: welcomeColors.verse,
                  textShadow: "0 2px 14px rgba(0,0,0,0.8)",
                }}
              >
                &quot;Stepping into eighteen with grace, dreams, and endless possibilities.&quot;
              </p>
              {/* <p
                className={`${cormorant.className} text-[0.65rem] sm:text-xs md:text-sm tracking-[0.2em] uppercase`}
                style={{ color: "rgba(108,23,61,0.85)", textShadow: "0 1px 6px rgba(108,23,61,0.3)" }}
              >
                - Piel Allen G. Marasigan
              </p> */}
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <span
                className="h-px w-10 sm:w-16 md:w-20"
                style={{ backgroundColor: welcomeColors.dividerLine }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full shadow-[0_0_14px_rgba(186,214,235,0.9)]"
                style={{ backgroundColor: welcomeColors.dividerDot }}
              />
              <span
                className="h-px w-10 sm:w-16 md:w-20"
                style={{ backgroundColor: welcomeColors.dividerLine }}
              />
            </div>
          </div>

          {/* Body text */}
          <div
            className={`${cormorant.className} text-[0.85rem] sm:text-sm md:text-base leading-relaxed sm:leading-7 space-y-3 sm:space-y-4`}
            style={{
              color: welcomeColors.body,
              textShadow: "0 1px 10px rgba(0,0,0,0.85)",
            }}
          >
            <p>
            Welcome to my 18th birthday celebration! Turning eighteen is a beautiful milestone, 
            and I’m so grateful to share this special moment with the people who mean the most to me. 
            Thank you for being part of my journey and celebrating this unforgettable chapter of my life.

            </p>
            <p>
            I’m looking forward to celebrating with you and creating lasting memories together. Thank you for your love, support, and for making this day so special.
            I can’t wait to see you there!
            </p>
          </div>
          </div>
        </div>
      </div>
    </Section>
  )
}


