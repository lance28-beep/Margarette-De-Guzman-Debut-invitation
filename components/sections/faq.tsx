"use client"

import { useState } from "react"

import { ChevronDown } from "lucide-react"

import { Section } from "@/components/section"

import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

import { siteConfig } from "@/content/site"



const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

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

interface FAQItem {

  question: string

  answer: string

}



const faqItems: FAQItem[] = [

  {

    question: `What is the dress code for ${siteConfig.couple.debutNickname}'s debut?`,

    answer: `Our celebration theme is "${siteConfig.dressCode.theme}". Guests are encouraged to wear attire —${siteConfig.dressCode.guests.ladies}. Gentlemen may come in ${siteConfig.dressCode.guests.gents}.`,
  },

  {

    question: "When and where is the debut celebration?",

    answer:

      `${siteConfig.couple.debutNickname}'s 18th birthday celebration will be held on ${siteConfig.ceremony.day}, ${siteConfig.ceremony.date} at ${siteConfig.ceremony.time}. The celebration will take place at ${siteConfig.ceremony.location} in Batangas City.`,

  },

  {

    question: "What time should I arrive?",

    answer:

      `Guests are invited to arrive by ${siteConfig.ceremony.guestsTime}. We recommend coming 15–20 minutes early to sign the guest book, take photos, and settle in before the program begins.`,

  },

  {

    question: "When is the RSVP deadline?",

    answer:

      `Kindly RSVP on or before ${siteConfig.details.rsvp.deadline}. Your response helps us prepare for ${siteConfig.couple.debutNickname}'s special evening. [RSVP_LINK]Click here to RSVP[/RSVP_LINK]`,

  },

  {

    question: "Do you have a gift registry?",

    answer:

      `Your presence is the most precious gift. If you wish to share a token of love, monetary gifts are warmly appreciated as ${siteConfig.couple.debutNickname} begins a new chapter and pursues her dreams.`,

  },

  {

    question: "Is there parking available at the venue?",

    answer:

      `Yes. Parking is available at ${siteConfig.ceremony.location}. We recommend arriving a bit early to secure a comfortable parking space before the program begins.`,

  },

  {

    question: "Can I bring additional guests?",

    answer:

      "We kindly request that only the guests listed on your invitation attend, as seating and catering are arranged in advance. If you have questions about bringing an additional guest, please reach out to the family directly.",

  },

  {

    question: "What if I have dietary restrictions or allergies?",

    answer:

      "Please mention any dietary restrictions, allergies, or special meal requests in the message field when you submit your RSVP. We will do our best to accommodate your needs with the caterer.",

  },

  {

    question: "Can I take photos during the debut?",

    answer:

      `Yes, please feel free to capture the moments! We also have a professional photo and video team. You may share your photos using our event hashtag ${siteConfig.snapShare.hashtag} so we can look back on your beautiful memories with us.`,

  },

  {

    question: "What should I do if I need to cancel or update my RSVP?",

    answer:

      "If your plans change, please update your RSVP as soon as possible. You may revisit the RSVP section and adjust your response so we can update our guest list and arrangements.",

  },

  {

    question: "What time does the celebration end?",

    answer:

      `The program is expected to run until around ${siteConfig.reception.time}. We hope you enjoy the evening and still have a safe and comfortable trip home.`,

  },

  {

    question: "Are children welcome at the debut?",

    answer:

      "While we love children, this is a formal evening celebration. We kindly request that only the guests listed in your invitation or RSVP join us. If you need clarification, please feel free to contact the family.",

  },

  {

    question: "Is there a specific entrance or registration area?",

    answer:

      "Yes. There will be a registration area at the entrance where you can sign the guest book and receive your program card. Our ushers will happily guide you to your assigned table.",

  },

  {

    question: "What if I'm running late?",

    answer:

      "We understand that delays can happen. Kindly enter quietly and our ushers will help you find your seat with minimal disruption to the program.",

  },

]



export function FAQ() {

  const [openIndex, setOpenIndex] = useState<number | null>(null)



  const toggleItem = (index: number) => {

    setOpenIndex(openIndex === index ? null : index)

  }

  const faqPalette = {
    baseWhite: "#F7F2EB",
    textDeep: "#081F5C",
    MoonBeige: "#F7F2EB",
    Porcelain: "#EDF1F6",
    Moonlight: "#BACEDB",
    RoyalBlue: "#334EAC",
    MidnightBlue: "#081F5C",
  }


  return (

    <Section

      id="faq"

      className="relative z-[30] overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"


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

      {/* Ornate pattern background */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">

        {/* Base pattern - diagonal lines forming diamonds */}

        <div 

          className="absolute inset-0"

          style={{

            backgroundImage: `

              repeating-linear-gradient(45deg, transparent, transparent 70px, ${faqPalette.MoonBeige}0.06 70px, ${faqPalette.MoonBeige}0.06 71px),

              repeating-linear-gradient(-45deg, transparent, transparent 70px, ${faqPalette.MoonBeige}0.06 70px, ${faqPalette.MoonBeige}0.06 71px)

            `,

            backgroundSize: '70px 70px, 70px 70px',

          }}

        />

        

        {/* Decorative scroll motifs - using SVG pattern */}

        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>

          <defs>

            <pattern id="scrollPatternFAQ" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">

              {/* Scroll motifs at intersections */}

              <g fill="none" stroke="${faqPalette.RoyalBlue}" strokeWidth="0.5">

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

          <rect width="100%" height="100%" fill="url(#scrollPatternFAQ)" />

        </svg>



        {/* Subtle overlay for depth */}

        <div className="absolute inset-0 bg-gradient-to-b from-[#F48FB1]/40 via-transparent to-[#D8B4E2]/45" />

      </div>



      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-14 lg:mb-16 px-3 sm:px-4">

        <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-[${faqPalette.RoyalBlue}]/70 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-white">

          Event Details & FAQ

        </div>

        <h2

          className={`${greatVibes.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#F7F2EB] drop-shadow-[0_18px_40px_${faqPalette.RoyalBlue}0.75] mt-3 sm:mt-4`}

        >

          Frequently Asked Questions 

        </h2>

        <p className={`${inter.className} text-[11px] sm:text-xs md:text-sm lg:text-base text-[#F7F2EB] max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed px-2`}>

          Everything you need to know for {siteConfig.couple.debut}&apos;s soft pink beach-inspired celebration

        </p>

      </div>



      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">

        <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] md:rounded-[32px] border-2 border-white/60 bg-white/95 backdrop-blur-md shadow-[0_20px_55px_${faqPalette.RoyalBlue}0.35] sm:shadow-[0_26px_70px_${faqPalette.RoyalBlue}0.45]">

          <div className="relative px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">

            <div className="space-y-2.5 sm:space-y-3 md:space-y-4">

              {faqItems.map((item, index) => {

                const isOpen = openIndex === index

                const contentId = `faq-item-${index}`

                return (

                  <div

                    key={index}

                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[${faqPalette.RoyalBlue}]/20 bg-white transition-all duration-300 hover:border-[${faqPalette.RoyalBlue}]/40 hover:shadow-[0_12px_30px_${faqPalette.RoyalBlue}0.25]"

                  >

                    <button

                      onClick={() => toggleItem(index)}

                      className="w-full px-4 py-3.5 sm:px-5 sm:py-4 md:px-6 md:py-5 flex items-start sm:items-center justify-between gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#013662]/30 transition-colors min-h-[3.5rem] sm:min-h-[4rem]"

                      aria-expanded={isOpen}

                      aria-controls={contentId}

                    >

                      <span

                        className={`${playfair.className} font-semibold text-[#081F5C] flex-1 text-[13px] sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed group-hover:text-[#081F5C]/80 transition-colors duration-200`}

                      >

                        {item.question}

                      </span>

                      <ChevronDown

                        size={18}

                        className={`text-[#081F5C]/70 flex-shrink-0 transition-all duration-300 ${isOpen ? "rotate-180 text-[#081F5C]/80" : ""} w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-0 group-hover:text-[#081F5C]/80`}

                        aria-hidden

                      />

                    </button>



                    <div

                      id={contentId}

                      role="region"

                      className={`grid transition-all duration-500 ease-out ${

                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"

                      }`}

                    >

                      <div className="overflow-hidden">

                        <div className="px-4 py-3.5 sm:px-5 sm:py-4 md:px-6 md:py-5 bg-[${faqPalette.RoyalBlue}]/5 border-t border-[${faqPalette.RoyalBlue}]/20">

                          {item.answer.includes("[RSVP_LINK]") ? (

                            <p className={`${inter.className} text-[${faqPalette.RoyalBlue}]/80 leading-relaxed text-[12px] sm:text-sm md:text-base lg:text-lg whitespace-pre-line`}>

                              {item.answer.split("[RSVP_LINK]")[0]}

                              <a

                                href="#guest-list"

                                className="text-[${faqPalette.RoyalBlue}] underline font-semibold hover:text-[${faqPalette.RoyalBlue}]/70 transition-colors break-words"

                                onClick={(e) => {

                                  e.preventDefault()

                                  document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth" })

                                }}

                              >

                                {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}

                              </a>

                              {item.answer.split("[/RSVP_LINK]")[1]}

                            </p>

                          ) : (

                            <p className={`${inter.className} text-[${faqPalette.RoyalBlue}]/80 leading-relaxed text-[12px] sm:text-sm md:text-base lg:text-lg whitespace-pre-line`}>

                              {item.answer}

                            </p>

                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                )

              })}

            </div>

          </div>

        </div>

      </div>

    </Section>

  )

}
