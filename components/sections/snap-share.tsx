"use client"

import { useEffect, useState } from "react"

import Image from "next/image"

import { motion } from "motion/react"

import { Instagram, Facebook, Twitter, Share2, Copy, Check, Download } from "lucide-react"

import { Section } from "@/components/section"

import { QRCodeCanvas } from "qrcode.react"

import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { siteConfig } from "@/content/site"



const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })



export function SnapShare() {

  const [copiedHashtag, setCopiedHashtag] = useState(false)

  const [isMobile, setIsMobile] = useState(false)



  const websiteUrl = typeof window !== "undefined" ? window.location.href : "https://example.com"

  const hashtags = ["#PielAllenTurns18", "#PielDebut2026", "#ElegantCelebration", "#DebutantePiel"]

  const shareText = `Celebrate Ena's elegant debut! Explore the details and share your special memories: ${websiteUrl} ${hashtags.join(" ")} ✨`



  useEffect(() => {

    const checkMobile = () => setIsMobile(window.innerWidth < 640)



    checkMobile()

    window.addEventListener("resize", checkMobile)



    return () => {

      window.removeEventListener("resize", checkMobile)

    }

  }, [])



  const copyToClipboard = async (text: string) => {

    try {

      await navigator.clipboard.writeText(text)

      setCopiedHashtag(true)

      setTimeout(() => setCopiedHashtag(false), 2000)

    } catch (err) {

      console.error("Failed to copy: ", err)

    }

  }



  const shareOnSocial = (platform: "instagram" | "facebook" | "twitter" | "tiktok") => {

    const encodedUrl = encodeURIComponent(websiteUrl)

    const encodedText = encodeURIComponent(shareText)



    const urls: Record<string, string> = {

      instagram: `https://www.instagram.com/`,

      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,

      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,

      tiktok: `https://www.tiktok.com/`,

    }



    const target = urls[platform]

    if (target) {

      window.open(target, "_blank", "width=600,height=400")

    }

  }



  const downloadQRCode = () => {

    const canvas = document.getElementById("snapshare-qr") as HTMLCanvasElement | null

    if (!canvas) return

    const link = document.createElement("a")

    link.download = "nena-debut-qr.png"

    link.href = canvas.toDataURL("image/png")

    link.click()

  }



  const fadeInUp = {

    initial: { opacity: 0, y: 60 },

    animate: { opacity: 1, y: 0 },

    transition: { duration: 0.8 },

  }



  const staggerChildren = {

    animate: {

      transition: {

        staggerChildren: 0.2,

      },

    },

  }



  return (

    <Section

      id="snap-share"

      className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 bg-transparent"

    >

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">

        <motion.div

          className="text-center mb-10 sm:mb-12"

          initial={{ opacity: 0, y: 60 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.8, ease: "easeOut" }}

        >

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#D95C8A]/40 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-white">

            Share Your Memories

          </div>

          <h2

            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[white] drop-shadow-[0_18px_40px_rgba(1,54,98,0.68)] mt-4`}

          >

            Capture & Share the Celebration

          </h2>

          <p className={`${inter.className} text-[11px] sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed px-2`}>

            Capture the elegance of {siteConfig.couple.debutNickname} debut celebration. Share your favorite moments and help create beautiful memories

            that will last a lifetime.

          </p>

          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent" />

        </motion.div>



        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10" variants={staggerChildren} initial="initial" animate="animate">

          <motion.div

            className="p-[1.5px] rounded-2xl bg-gradient-to-br from-[#013662]/30 via-white/20 to-[#013662]/30 h-full"

            variants={fadeInUp}

            whileHover={{ y: -2 }}

            transition={{ duration: 0.3 }}

          >

            <div className="bg-[#FECFDA]/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border-2 border-white/30 h-full flex flex-col">

              <div className="text-center mb-6">

                <h3 className={`${playfair.className} text-lg sm:text-xl md:text-2xl font-semibold text-[#D95C8A] mb-4`}>

                  Share Your Moments

                </h3>

                <p className={`${inter.className} text-[#D95C8A]/80 text-xs sm:text-sm mb-5 leading-relaxed`}>

                  Every photo you share helps create beautiful memories of {siteConfig.couple.debutNickname} debut celebration. Use these hashtags to join the conversation.

                </p>

                <div className="space-y-3 mb-5">

                  {hashtags.map((hashtag) => (

                    <div

                      key={hashtag}

                      className="inline-flex items-center justify-center gap-3 bg-white px-5 py-3.5 rounded-xl shadow-md border-2 border-[#D95C8A]/20 w-full sm:w-auto mx-auto hover:shadow-lg hover:border-[#D95C8A]/40 transition-all"

                    >

                      <span className={`${inter.className} text-sm sm:text-base md:text-lg font-semibold text-[#D95C8A] tracking-[0.12em] uppercase break-all sm:break-normal`}>

                        {hashtag}

                      </span>

                      <button

                        onClick={() => copyToClipboard(hashtag)}

                        className="p-1.5 rounded-full bg-[#D95C8A]/10 hover:bg-[#D95C8A]/20 transition-colors duration-200 shadow-sm flex-shrink-0 border-2 border-[#D95C8A]/20 hover:border-[#D95C8A]/40"

                        title="Copy hashtag"

                      >

                        {copiedHashtag ? <Check className="w-4 h-4 text-[#D95C8A]" /> : <Copy className="w-4 h-4 text-[#D95C8A]/70" />}

                      </button>

                    </div>

                  ))}

                </div>

                <p className={`${inter.className} text-[#D95C8A]/70 text-[11px] sm:text-xs italic`}>

                  Click to copy and paste into your posts, stories, and reels.

                </p>

              </div>



              <div className="mt-auto">

                <h4 className={`${playfair.className} text-base sm:text-lg md:text-xl font-semibold text-[#D95C8A] mb-4 text-center`}>

                  A Glimpse of Her Celebration

                </h4>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">

                  <motion.div

                    className="relative aspect-square rounded-xl overflow-hidden shadow-md border-2 border-[#013662]/20 hover:border-[#013662]/40 transition-all"

                    whileHover={{ scale: 1.03 }}

                    transition={{ duration: 0.25 }}

                  >

                    <Image src="/boxes/1.webp" alt="Debut moment 1" fill className="object-cover" />

                  </motion.div>

                  <motion.div

                    className="relative aspect-square rounded-xl overflow-hidden shadow-md border-2 border-[#013662]/20 hover:border-[#013662]/40 transition-all"

                    whileHover={{ scale: 1.03 }}

                    transition={{ duration: 0.25 }}

                  >

                    <Image src="/boxes/2.webp" alt="Debut moment 2" fill className="object-cover" />

                  </motion.div>

                  <motion.div

                    className="relative col-span-2 aspect-[3/2] rounded-xl overflow-hidden shadow-md border-2 border-[#013662]/20 hover:border-[#013662]/40 transition-all"

                    whileHover={{ scale: 1.02 }}

                    transition={{ duration: 0.25 }}

                  >

                    <Image src="/mobile-background/debut (9).webp" alt="Debut moment 3" fill className="object-cover" />

                  </motion.div>

                </div>

                <p className={`${inter.className} text-[#013662]/70 text-[11px] sm:text-xs text-center mt-4 px-2`}>

                  Tag your snapshots with our hashtags to be featured in {siteConfig.couple.debutNickname} keepsake gallery.

                </p>

              </div>

            </div>

          </motion.div>



          <motion.div className="space-y-4 lg:space-y-6 h-full flex flex-col" variants={fadeInUp}>

            <div className="p-[1.5px] rounded-2xl bg-gradient-to-br from-[#D95C8A]/30 via-white/20 to-[#D95C8A]/30 flex-1">

              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border-2 border-white/30 text-center h-full flex flex-col">

                <h4 className={`${playfair.className} text-lg sm:text-xl md:text-2xl font-semibold text-[#D95C8A] mb-3`}>

                  Share Her Debut Website

                </h4>

                <p className={`${inter.className} text-[#D95C8A]/80 text-xs sm:text-sm mb-6 leading-relaxed`}>

                  Spread the word about {siteConfig.couple.debutNickname} elegant debut celebration. Share this QR code with friends and family so they can join the celebration.

                </p>

                <div className="mx-auto inline-flex flex-col items-center bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-md border-2 border-[#013662]/20 mb-5 flex-1 justify-center">

                  <div className="mb-4 p-3 sm:p-4 rounded-xl bg-[#D95C8A]/5 border-2 border-[#D95C8A]/10">

                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border-2 border-[#D95C8A]/10">
                    {/* change the QR color to #D95C8A */}

                      <QRCodeCanvas 

                        id="snapshare-qr" 

                        value={websiteUrl} 

                        size={isMobile ? 160 : 220} 

                        includeMargin 

                        className="bg-white" 

                      />

                    </div>

                  </div>

                  <button

                    onClick={downloadQRCode}

                    className="flex items-center gap-2 mx-auto px-5 py-3 rounded-lg bg-[#D95C8A] text-white transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm sm:text-base border-2 border-[#D95C8A]"

                  >

                    <Download className="w-4 h-4" />

                    <span className={`${inter.className} tracking-[0.2em] uppercase font-medium`}>Download QR Code</span>

                  </button>

                </div>

                <p className={`${inter.className} text-[#D95C8A]/70 text-[11px] sm:text-xs mt-auto`}>

                  Scan with any camera app to access the full invitation and event details.

                </p>

              </div>

            </div>



            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border-2 border-white/30">

              <h5 className={`${playfair.className} text-lg sm:text-xl font-semibold text-[#D95C8A] mb-4 text-center`}>

                Share on Social Media

              </h5>

              <p className={`${inter.className} text-[#D95C8A]/80 text-[11px] sm:text-xs text-center mb-5`}>

                Help spread the word about {siteConfig.couple.debutNickname} debut celebration. Share the event across your favorite platforms.

              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                <button

                  onClick={() => shareOnSocial("instagram")}

                  className="group flex items-center justify-center gap-2.5 bg-[#D95C8A] text-white px-4 py-3.5 sm:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-[#D95C8A] hover:bg-[#00558F]"

                >

                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />

                  <span className={`${inter.className} font-medium text-xs sm:text-sm uppercase tracking-[0.2em]`}>Instagram</span>

                </button>

                <button

                  onClick={() => shareOnSocial("facebook")}

                  className="group flex items-center justify-center gap-2.5 bg-[#D95C8A] text-white px-4 py-3.5 sm:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-[#D95C8A] hover:bg-[#00558F]"

                >

                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />

                  <span className={`${inter.className} font-medium text-xs sm:text-sm uppercase tracking-[0.2em]`}>Facebook</span>

                </button>

                <button

                  onClick={() => shareOnSocial("tiktok")}

                  className="group flex items-center justify-center gap-2.5 bg-[#D95C8A] text-white px-4 py-3.5 sm:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-[#D95C8A] hover:bg-[#00558F]"

                >

                  <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />

                  <span className={`${inter.className} font-medium text-xs sm:text-sm uppercase tracking-[0.2em]`}>TikTok</span>

                </button>

                <button

                  onClick={() => shareOnSocial("twitter")}

                  className="group flex items-center justify-center gap-2.5 bg-[#D95C8A] text-white px-4 py-3.5 sm:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-[#D95C8A] hover:bg-[#00558F]"

                >

                  <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />

                  <span className={`${inter.className} font-medium text-xs sm:text-sm uppercase tracking-[0.2em]`}>Twitter</span>

                </button>

              </div>

            </div>

          </motion.div>

        </motion.div>



        <motion.div className="text-center mt-10 sm:mt-12" variants={fadeInUp}>

          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-white/30 max-w-3xl mx-auto">

            <p className={`${inter.className} text-[#D95C8A] text-sm sm:text-base md:text-lg leading-relaxed mb-4`}>

              Thank you for helping make {siteConfig.couple.debutNickname} debut celebration memorable. Your photos and messages create beautiful memories

              that will last a lifetime—keep sharing the joy throughout the evening.

            </p>

            <div className={`${inter.className} flex items-center justify-center gap-2 text-[#D95C8A] text-[11px] sm:text-xs tracking-[0.35em] uppercase`}>

              <span>See You at the Celebration</span>

            </div>

          </div>

        </motion.div>

      </div>

    </Section>

  )

}
