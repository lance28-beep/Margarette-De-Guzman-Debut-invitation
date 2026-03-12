"use client"

import { useState, useEffect } from "react"
import { Heart, RefreshCw, TrendingUp, Mail, Users, MapPin, Calendar, Crown } from "lucide-react"
import { Great_Vibes, Inter } from "next/font/google"
import { siteConfig } from "@/content/site"

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
})

// Soft pink beach palette for Book of Guests
const guestsPalette = {
  baseWhite: "#F7F2EB",
  textDeep: "#081F5C",
  MoonBeige: "#F7F2EB",
  Porcelain: "#EDF1F6",
  Moonlight: "#BACEDB",
  RoyalBlue: "#334EAC",
  MidnightBlue: "#081F5C",
}

// Starfield layout — varied sizes, some with glow halos, for animated celestial sky
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

interface Guest {
  id: string | number
  name: string
  role: string
  email?: string
  contact?: string
  message?: string
  allowedGuests: number
  companions: { name: string; relationship: string }[]
  tableNumber: string
  isVip: boolean
  status: 'pending' | 'confirmed' | 'declined' | 'request'
  addedBy?: string
  createdAt?: string
  updatedAt?: string
}

export function BookOfGuests() {
  const [totalGuests, setTotalGuests] = useState(0)
  const [rsvpCount, setRsvpCount] = useState(0)
  const [confirmedGuests, setConfirmedGuests] = useState<Guest[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [previousTotal, setPreviousTotal] = useState(0)
  const [showIncrease, setShowIncrease] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Helper function to get initials from name
  const getInitials = (name: string): string => {
    const words = name.trim().split(' ')
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  // Helper function to format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Recently'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const fetchGuests = async (showLoading = false) => {
    if (showLoading) setIsRefreshing(true)
    
    try {
      // Fetch from local API route which connects to Google Sheets
      const response = await fetch("/api/guests", {
        cache: "no-store"
      })

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data: Guest[] = await response.json()

      // Filter only confirmed/attending guests
      const attendingGuests = data.filter((guest) => guest.status === "confirmed")
      
      // Sort guests: VIPs first, then by updatedAt (most recent first)
      const sortedGuests = attendingGuests.sort((a, b) => {
        // VIPs come first
        if (a.isVip && !b.isVip) return -1
        if (!a.isVip && b.isVip) return 1
        
        // Then sort by most recent update
        const dateA = new Date(a.updatedAt || 0).getTime()
        const dateB = new Date(b.updatedAt || 0).getTime()
        return dateB - dateA
      })
      
      // Calculate total guests by summing allowedGuests for each confirmed guest
      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        return sum + (guest.allowedGuests || 1)
      }, 0)
      
      // Show increase animation if count went up
      if (totalGuestCount > totalGuests && totalGuests > 0) {
        setPreviousTotal(totalGuests)
        setShowIncrease(true)
        setTimeout(() => setShowIncrease(false), 2000)
      }
      
      setTotalGuests(totalGuestCount)
      setRsvpCount(attendingGuests.length)
      setConfirmedGuests(sortedGuests)
      setLastUpdate(new Date())
    } catch (error: any) {
      console.error("Failed to load guests:", error)
    } finally {
      if (showLoading) {
        setTimeout(() => setIsRefreshing(false), 500)
      }
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up automatic polling every 30 seconds for real-time updates
    const pollInterval = setInterval(() => {
      fetchGuests()
    }, 30000) // 30 seconds

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests(true)
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      clearInterval(pollInterval)
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [totalGuests])

  // Auto-transition effect for displaying 5 cards at a time
  useEffect(() => {
    if (confirmedGuests.length <= 5) {
      setCurrentIndex(0)
      return
    }

    const transitionInterval = setInterval(() => {
      setIsTransitioning(true)
      
      // Wait for fade out animation (half of 500ms transition)
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 5
          // If we've reached the end, wrap around to the beginning
          return nextIndex >= confirmedGuests.length ? 0 : nextIndex
        })
        // Small delay before fade in to ensure smooth transition
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      }, 250) // Half of transition duration for fade out
    }, 5000) // Change every 5 seconds

    return () => clearInterval(transitionInterval)
  }, [confirmedGuests.length])

  // Get the current 5 cards to display
  const getCurrentCards = () => {
    if (confirmedGuests.length <= 5) {
      return confirmedGuests.map((guest) => ({ guest }))
    }
    
    const endIndex = Math.min(currentIndex + 5, confirmedGuests.length)
    let cards = confirmedGuests.slice(currentIndex, endIndex).map((guest) => ({ guest }))
    
    // If we need to wrap around (show cards from beginning to complete the 5)
    if (cards.length < 5 && currentIndex + 5 > confirmedGuests.length) {
      const remaining = 5 - cards.length
      const wrappedCards = confirmedGuests.slice(0, remaining).map((guest) => ({ guest }))
      cards = [...cards, ...wrappedCards]
    }
    
    return cards
  }

  const displayedCards = getCurrentCards()

  return (
    <div
      id="guests"
      className="relative z-10 py-14 sm:py-18 md:py-20 lg:py-24 overflow-hidden"
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

      {/* Section Header - More Compact */}
      <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
        {/* Small label */}
        <p
          className={`${inter.className} text-xs sm:text-sm tracking-[0.45em] uppercase mb-3`}
          style={{ color: guestsPalette.MoonBeige }}
        >
          Honored Attendees
        </p>

        <h2
          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl mb-4`}
          style={{ color: guestsPalette.MoonBeige, textShadow: "0 18px 48px ${guestsPalette.RoyalBlue}0.45" }}
        >
          Book of Guests
        </h2>

        <p
          className={`${inter.className} text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed`}
          style={{ color: guestsPalette.MoonBeige }}
        >
          Meet the cherished people joining {siteConfig.couple.debut}&apos;s 18th—your presence makes this Moonlight seaside celebration even more special.
        </p>
      </div>

      {/* Guests content */}
      <div className="relative">
        {/* Stats card - Simplified */}
        <div className="text-center mb-2.5 sm:mb-4 md:mb-6 px-2 sm:px-4 md:px-6">
          <div className="relative max-w-3xl mx-auto">
            <div
              className="relative backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-6 shadow-md border"
              style={{ backgroundColor: guestsPalette.MoonBeige, borderColor: `${guestsPalette.RoyalBlue}66` }}
            >
              
              {/* Refresh button */}
              <button
                onClick={() => fetchGuests(true)}
                disabled={isRefreshing}
                className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 sm:p-1.5 rounded-full bg-[${guestsPalette.MoonBeige}0.08] hover:bg-[${guestsPalette.RoyalBlue}0.15] transition-all duration-300 disabled:opacity-50 group z-10"
                title="Refresh counts"
              >
                <RefreshCw
                  className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform ${
                    isRefreshing ? "animate-spin" : "group-hover:rotate-180"
                  } duration-500`}
                  style={{ color: guestsPalette.MoonBeige }}
                />
              </button>

              {/* Main Count with inline text */}
              <div className="mb-1.5 sm:mb-2.5">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
                  <h3
                    className={`${inter.className} text-xl sm:text-3xl md:text-4xl font-bold transition-all duration-500 ${
                      showIncrease ? "scale-110 text-green-600" : ""
                    }`}
                    style={{ color: guestsPalette.textDeep }}
                  >
                    {totalGuests}
                  </h3>
                  {showIncrease && (
                    <TrendingUp className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-green-600 animate-bounce" />
                  )}
                  <p
                    className={`${inter.className} text-sm sm:text-lg md:text-xl font-medium leading-tight`}
                    style={{ color: guestsPalette.textDeep }}
                  >
                    {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Piel
                  </p>
                </div>
              </div>

              {/* RSVP Count */}
              <p
                className={`${inter.className} text-xs sm:text-base mb-2 sm:mb-3`}
                style={{ color: guestsPalette.MidnightBlue }}
              >
                {rsvpCount} {rsvpCount === 1 ? "RSVP entry" : "RSVP entries"}
              </p>
              
              {/* Message */}
              <p
                className={`${inter.className} text-[10px] sm:text-xs md:text-sm leading-tight`}
                style={{ color: guestsPalette.MidnightBlue }}
              >
                Thank you for confirming your RSVP! Your presence means the world to Piel.
              </p>
            </div>
          </div>
        </div>

        {/* Guest List Display */}
        {confirmedGuests.length > 0 && (
          <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-6">
            <div className="space-y-2 sm:space-y-3 md:space-y-4 relative min-h-[600px]">
              {displayedCards.map(({ guest }, displayIndex) => (
                <div
                  key={`${guest.id}-${currentIndex}-${displayIndex}`}
                  className={`relative group bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-2.5 sm:p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-200 hover:border-[${guestsPalette.RoyalBlue}] ${
                    isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                  }`}
                  style={{
                    transitionDelay: `${displayIndex * 50}ms`,
                  }}
                >
                  {/* Guest Header */}
                  <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-2.5 md:mb-3">
                    {/* Avatar - Mobile Optimized */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-md ring-2 ring-[#F7F2EB/70]"
                        style={{ backgroundColor: guestsPalette.RoyalBlue }}
                      >
                        <span className="text-[#F7F2EB] font-semibold text-xs sm:text-base md:text-lg">
                          {getInitials(guest.name)}
                        </span>
                      </div>
                      {/* VIP Badge - Mobile Optimized */}
                      {guest.isVip && (
                        <div className="absolute -top-0.5 -right-0.5">
                          <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-r from-[#334EAC] to-[#334EAC] rounded-full shadow-md">
                            <Crown className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3.5 md:w-3.5 text-[#F7F2EB] fill-current" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Guest Info - Mobile Optimized */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 sm:mb-1.5">
                        <h3 className="text-xs sm:text-base md:text-lg font-semibold sm:font-bold text-[#081F5C] leading-tight mb-0.5">
                          {guest.name}
                        </h3>
                        {guest.role && (
                          <p className="text-[9px] sm:text-[10px] md:text-xs text-[#081F5C] font-medium">
                            {guest.role}
                          </p>
                        )}
                      </div>

                      {/* Email - Mobile Optimized */}
                      {guest.email && (
                        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] md:text-xs text-[#081F5C] mb-1.5 sm:mb-2 md:mb-3">
                          <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#081F5C] flex-shrink-0" />
                          <span className="truncate">{guest.email}</span>
                        </div>
                      )}

                      {/* Info Badges - Mobile Optimized */}
                      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 md:gap-2 mb-1.5 sm:mb-2 md:mb-3">
                        {/* Guest count badge */}
                        <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 bg-gradient-to-r from-[#F7F2EB]0.25] to-[#334EAC]0.15] border border-[#334EAC]0.6] rounded sm:rounded-md md:rounded-lg">
                          <Users
                            className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"
                            style={{ color: '#334EAC' }}
                          />
                          <span
                            className="text-[9px] sm:text-[10px] md:text-xs font-semibold"
                            style={{ color: guestsPalette.textDeep }}
                          >
                            {guest.allowedGuests} {guest.allowedGuests === 1 ? 'Guest' : 'Guests'}
                          </span>
                        </div>

                        {/* Table badge */}
                        <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 bg-gradient-to-r from-[#334EAC]0.25] to-[#334EAC]0.15] border border-[#334EAC]0.6] sm:border-2 rounded sm:rounded-md md:rounded-lg">
                          <MapPin
                            className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"
                            style={{ color: guestsPalette.RoyalBlue }}
                          />
                          <span
                            className="text-[9px] sm:text-[10px] md:text-xs font-semibold sm:font-bold"
                            style={{ color: guestsPalette.textDeep }}
                          >
                            {guest.tableNumber && String(guest.tableNumber).trim() !== "" ? (
                              <>Table {guest.tableNumber}</>
                            ) : (
                              <span className="text-gray-500 font-medium">Not Assigned</span>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Message - Mobile Optimized */}
                      {guest.message && guest.message.trim() !== "" && (
                        <div
                          className="relative mb-1.5 sm:mb-2.5 md:mb-3 p-2 sm:p-3 md:p-5 bg-gradient-to-br from-[${guestsPalette.MoonBeige}] via-[${guestsPalette.MoonBeige}] to-[${guestsPalette.RoyalBlue}]/40 rounded sm:rounded-lg md:rounded-2xl border shadow-sm overflow-hidden"
                          style={{ borderColor: "${guestsPalette.RoyalBlue}0.5" }}
                        >
                          {/* Decorative corner elements - smaller on mobile */}
                          <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 opacity-[0.08]">
                            <svg viewBox="0 0 100 100" className="text-[${guestsPalette.RoyalBlue}]" fill="currentColor">
                              <path d="M0,0 L100,0 L0,100 Z" />
                            </svg>
                          </div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 opacity-[0.08]">
                            <svg viewBox="0 0 100 100" className="text-[${guestsPalette.RoyalBlue}]" fill="currentColor">
                              <path d="M100,100 L0,100 L100,0 Z" />
                            </svg>
                          </div>
                          
                          {/* Opening quote - smaller on mobile */}
                          <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 md:top-2 md:left-2 text-[${guestsPalette.RoyalBlue}]/25">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                            </svg>
                          </div>
                          
                          {/* Closing quote - smaller on mobile */}
                                <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 md:bottom-2 md:right-2 text-[${guestsPalette.RoyalBlue}]/25">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 7h-3l-2 4v6h6v-6h-3zm-8 0H7l-2 4v6h6v-6h-3z" />
                            </svg>
                          </div>

                          {/* Message content */}
                          <div className="relative px-0.5 sm:px-1">
                            <p
                              className="text-[10px] sm:text-xs md:text-base leading-tight sm:leading-relaxed italic font-medium"
                              style={{ color: guestsPalette.MidnightBlue }}
                            >
                              {guest.message}
                            </p>
                          </div>

                          {/* Elegant border accent - smaller on mobile */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 sm:w-0.5 md:w-1 h-8 sm:h-12 md:h-16 bg-gradient-to-b from-transparent via-[${guestsPalette.MoonBeige}] to-transparent rounded-r-full" />
                        </div>
                      )}

                      {/* Companions - Mobile Optimized */}
                      {guest.companions && guest.companions.length > 0 && (
                        <div className="pt-1.5 sm:pt-2 md:pt-2.5 border-t border-[${guestsPalette.RoyalBlue}0.3]">
                          <div className="flex items-center gap-1 mb-1 sm:mb-1.5">
                            <Users
                              className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"
                              style={{ color: guestsPalette.RoyalBlue }}
                            />
                            <span
                              className="text-[9px] sm:text-[10px] md:text-xs font-semibold"
                              style={{ color: guestsPalette.MidnightBlue }}
                            >
                              Companions
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 sm:gap-1.5">
                            {guest.companions.map((companion, idx) => (
                              <div
                                key={idx}
                                className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 bg-white border rounded sm:rounded-md md:rounded-lg transition-colors"
                                style={{ borderColor: "${guestsPalette.RoyalBlue}0.5" }}
                              >
                                <span
                                  className="text-[9px] sm:text-[10px] md:text-xs font-medium whitespace-nowrap"
                                  style={{ color: guestsPalette.MidnightBlue }}
                                >
                                  {companion.name}
                                </span>
                                {companion.relationship && companion.relationship.trim() !== "" && (
                                  <span
                                    className="text-[8px] sm:text-[9px] md:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium border whitespace-nowrap"
                                    style={{
                                    color: '#081F5C',
                                      backgroundColor: '#081F5C0.5',
                                      borderColor: '#081F5C0.5',
                                    }}
                                  >
                                    {companion.relationship}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Footer - Mobile Optimized */}
                      <div className="flex items-center gap-1 pt-1.5 sm:pt-2 md:pt-2.5 mt-1.5 sm:mt-2 md:mt-2.5 border-t border-[${guestsPalette.MidnightBlue}0.3]">
                        <Calendar
                          className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                          style={{ color: guestsPalette.MidnightBlue }}
                        />  
                        <span
                          className="text-[8px] sm:text-[9px] md:text-[10px]"
                          style={{ color: guestsPalette.MidnightBlue }}
                        >
                          Confirmed {formatDate(guest.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
