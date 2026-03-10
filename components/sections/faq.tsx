"use client"

import { useState } from "react"

import { ChevronDown } from "lucide-react"

import { Section } from "@/components/section"

import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

import { siteConfig } from "@/content/site"



const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })



interface FAQItem {

  question: string

  answer: string

}



const faqItems: FAQItem[] = [

  {

    question: "What is the dress code for Piel Allen's debut?",

    answer: `Our celebration theme is "${siteConfig.dressCode.theme}". Guests are encouraged to wear semi-formal attire in soft pink tones—${siteConfig.dressCode.guests.ladies} Gentlemen may come in ${siteConfig.dressCode.guests.gents}.`,

  },

  {

    question: "When and where is the debut celebration?",

    answer:

      `Piel Allen's 18th birthday celebration will be held on ${siteConfig.ceremony.day}, ${siteConfig.ceremony.date} at ${siteConfig.ceremony.time}. The celebration will take place at ${siteConfig.ceremony.venue} in Batangas City.`,

  },

  {

    question: "What time should I arrive?",

    answer:

      `Guests are invited to arrive by ${siteConfig.ceremony.guestsTime}. We recommend coming 15–20 minutes early to sign the guest book, take photos, and settle in before the program begins.`,

  },

  {

    question: "When is the RSVP deadline?",

    answer:

      `Kindly RSVP on or before ${siteConfig.details.rsvp.deadline}. Your response helps us prepare for Piel Allen's special evening. [RSVP_LINK]Click here to RSVP[/RSVP_LINK]`,

  },

  {

    question: "Do you have a gift registry?",

    answer:

      "Your presence is the most precious gift. If you wish to share a token of love, monetary gifts are warmly appreciated as Piel begins a new chapter and pursues her dreams.",

  },

  {

    question: "Is there parking available at the venue?",

    answer:

      "Yes. Parking is available at 7 Cardels Event Centre. We recommend arriving a bit early to secure a comfortable parking space before the program begins.",

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



  return (

    <Section

      id="faq"

      className="relative z-[30] overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"
      style={{ background: "linear-gradient(to bottom, #FFF6F8, #F6C1CF)" }}

    >

      {/* Ornate pattern background */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">

        {/* Base pattern - diagonal lines forming diamonds */}

        <div 

          className="absolute inset-0"

          style={{

            backgroundImage: `

              repeating-linear-gradient(45deg, transparent, transparent 70px, rgba(229,201,183,0.06) 70px, rgba(229,201,183,0.06) 71px),

              repeating-linear-gradient(-45deg, transparent, transparent 70px, rgba(229,201,183,0.06) 70px, rgba(229,201,183,0.06) 71px)

            `,

            backgroundSize: '70px 70px, 70px 70px',

          }}

        />

        

        {/* Decorative scroll motifs - using SVG pattern */}

        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>

          <defs>

            <pattern id="scrollPatternFAQ" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">

              {/* Scroll motifs at intersections */}

              <g fill="none" stroke="#F8D7E2" strokeWidth="0.5">

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

        <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-[#F48FB1]/70 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-white">

          Event Details & FAQ

        </div>

        <h2

          className={`${greatVibes.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#D95C8A] drop-shadow-[0_18px_40px_rgba(248,181,204,0.75)] mt-3 sm:mt-4`}

        >

          Frequently Asked Questions 

        </h2>

        <p className={`${inter.className} text-[11px] sm:text-xs md:text-sm lg:text-base text-[#D95C8A]/90 max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed px-2`}>

          Everything you need to know for Piel Allen&apos;s soft pink beach-inspired celebration

        </p>

      </div>



      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">

        <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] md:rounded-[32px] border-2 border-white/60 bg-white/95 backdrop-blur-md shadow-[0_20px_55px_rgba(212,116,151,0.35)] sm:shadow-[0_26px_70px_rgba(212,116,151,0.45)]">

          <div className="relative px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">

            <div className="space-y-2.5 sm:space-y-3 md:space-y-4">

              {faqItems.map((item, index) => {

                const isOpen = openIndex === index

                const contentId = `faq-item-${index}`

                return (

                  <div

                    key={index}

                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#D95C8A]/20 bg-white transition-all duration-300 hover:border-[#D95C8A]/40 hover:shadow-[0_12px_30px_rgba(1,54,98,0.25)]"

                  >

                    <button

                      onClick={() => toggleItem(index)}

                      className="w-full px-4 py-3.5 sm:px-5 sm:py-4 md:px-6 md:py-5 flex items-start sm:items-center justify-between gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#013662]/30 transition-colors min-h-[3.5rem] sm:min-h-[4rem]"

                      aria-expanded={isOpen}

                      aria-controls={contentId}

                    >

                      <span

                        className={`${playfair.className} font-semibold text-[#D95C8A] flex-1 text-[13px] sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed group-hover:text-[#D95C8A]/80 transition-colors duration-200`}

                      >

                        {item.question}

                      </span>

                      <ChevronDown

                        size={18}

                        className={`text-[#D95C8A]/70 flex-shrink-0 transition-all duration-300 ${isOpen ? "rotate-180 text-[#D95C8A]/80" : ""} w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-0 group-hover:text-[#D95C8A]/80`}

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

                        <div className="px-4 py-3.5 sm:px-5 sm:py-4 md:px-6 md:py-5 bg-[#013662]/5 border-t border-[#013662]/20">

                          {item.answer.includes("[RSVP_LINK]") ? (

                            <p className={`${inter.className} text-[#D95C8A]/80 leading-relaxed text-[12px] sm:text-sm md:text-base lg:text-lg whitespace-pre-line`}>

                              {item.answer.split("[RSVP_LINK]")[0]}

                              <a

                                href="#guest-list"

                                className="text-[#D95C8A] underline font-semibold hover:text-[#D95C8A]/70 transition-colors break-words"

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

                            <p className={`${inter.className} text-[#D95C8A]/80 leading-relaxed text-[12px] sm:text-sm md:text-base lg:text-lg whitespace-pre-line`}>

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
