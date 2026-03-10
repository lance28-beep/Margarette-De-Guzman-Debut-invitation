"use client"

import { useState, useEffect } from "react"
import { Heart, RefreshCw, TrendingUp, Mail, Users, MapPin, Calendar, Crown } from "lucide-react"
import { Great_Vibes, Inter } from "next/font/google"

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
  primaryPink: "#F6C1CF",
  secondaryPink: "#F48FB1",
  accentPink: "#D95C8A",
  lavender: "#D8B4E2",
  baseWhite: "#FFF6F8",
  textDeep: "rgba(108, 23, 61, 0.95)",
}

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
      className="relative z-10 bg-[#FFF6F8] py-14 sm:py-18 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Soft pastel background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              radial-gradient(circle at 0% 0%, ${guestsPalette.primaryPink}26 0, transparent 55%),
              radial-gradient(circle at 100% 100%, ${guestsPalette.lavender}26 0, transparent 55%),
              radial-gradient(circle at 15% 80%, ${guestsPalette.accentPink}22 0, transparent 60%)
            `,
          }}
        />
      </div>

      {/* Section Header - More Compact */}
      <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
        {/* Small label */}
        <p
          className={`${inter.className} text-xs sm:text-sm tracking-[0.45em] uppercase mb-3`}
          style={{ color: guestsPalette.accentPink }}
        >
          Honored Attendees
        </p>

        <h2
          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl mb-4`}
          style={{ color: guestsPalette.accentPink, textShadow: "0 18px 48px rgba(217,92,138,0.45)" }}
        >
          Book of Guests
        </h2>

        <p
          className={`${inter.className} text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed`}
          style={{ color: guestsPalette.textDeep }}
        >
          Meet the cherished people joining Piel Allen&apos;s 18th—your presence makes this soft pink seaside celebration even more special.
        </p>
      </div>

      {/* Guests content */}
      <div className="relative">
        {/* Stats card - Simplified */}
        <div className="text-center mb-2.5 sm:mb-4 md:mb-6 px-2 sm:px-4 md:px-6">
          <div className="relative max-w-3xl mx-auto">
            <div
              className="relative backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-6 shadow-md border"
              style={{ backgroundColor: guestsPalette.baseWhite, borderColor: `${guestsPalette.secondaryPink}66` }}
            >
              
              {/* Refresh button */}
              <button
                onClick={() => fetchGuests(true)}
                disabled={isRefreshing}
                className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 sm:p-1.5 rounded-full bg-[rgba(217,92,138,0.08)] hover:bg-[rgba(217,92,138,0.15)] transition-all duration-300 disabled:opacity-50 group z-10"
                title="Refresh counts"
              >
                <RefreshCw
                  className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform ${
                    isRefreshing ? "animate-spin" : "group-hover:rotate-180"
                  } duration-500`}
                  style={{ color: guestsPalette.accentPink }}
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
                style={{ color: "rgba(108,23,61,0.85)" }}
              >
                {rsvpCount} {rsvpCount === 1 ? "RSVP entry" : "RSVP entries"}
              </p>
              
              {/* Message */}
              <p
                className={`${inter.className} text-[10px] sm:text-xs md:text-sm leading-tight`}
                style={{ color: "rgba(108,23,61,0.8)" }}
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
                  className={`relative group bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-2.5 sm:p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-200 hover:border-[#00558F] ${
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
                        className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-md ring-2 ring-white/70"
                        style={{ backgroundColor: guestsPalette.accentPink }}
                      >
                        <span className="text-white font-semibold text-xs sm:text-base md:text-lg">
                          {getInitials(guest.name)}
                        </span>
                      </div>
                      {/* VIP Badge - Mobile Optimized */}
                      {guest.isVip && (
                        <div className="absolute -top-0.5 -right-0.5">
                          <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-r from-[#F6C1CF] to-[#F48FB1] rounded-full shadow-md">
                            <Crown className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3.5 md:w-3.5 text-white fill-current" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Guest Info - Mobile Optimized */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 sm:mb-1.5">
                        <h3 className="text-xs sm:text-base md:text-lg font-semibold sm:font-bold text-gray-900 leading-tight mb-0.5">
                          {guest.name}
                        </h3>
                        {guest.role && (
                          <p className="text-[9px] sm:text-[10px] md:text-xs text-[#013662] font-medium">
                            {guest.role}
                          </p>
                        )}
                      </div>

                      {/* Email - Mobile Optimized */}
                      {guest.email && (
                        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] md:text-xs text-gray-500 mb-1.5 sm:mb-2 md:mb-3">
                          <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{guest.email}</span>
                        </div>
                      )}

                      {/* Info Badges - Mobile Optimized */}
                      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 md:gap-2 mb-1.5 sm:mb-2 md:mb-3">
                        {/* Guest count badge */}
                        <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 bg-gradient-to-r from-[rgba(246,193,207,0.25)] to-[rgba(248,143,177,0.15)] border border-[rgba(217,92,138,0.6)] rounded sm:rounded-md md:rounded-lg">
                          <Users
                            className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"
                            style={{ color: guestsPalette.accentPink }}
                          />
                          <span
                            className="text-[9px] sm:text-[10px] md:text-xs font-semibold"
                            style={{ color: guestsPalette.textDeep }}
                          >
                            {guest.allowedGuests} {guest.allowedGuests === 1 ? 'Guest' : 'Guests'}
                          </span>
                        </div>

                        {/* Table badge */}
                        <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 bg-gradient-to-r from-[rgba(216,180,226,0.25)] to-[rgba(246,193,207,0.15)] border border-[rgba(216,180,226,0.6)] sm:border-2 rounded sm:rounded-md md:rounded-lg">
                          <MapPin
                            className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"
                            style={{ color: guestsPalette.accentPink }}
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
                          className="relative mb-1.5 sm:mb-2.5 md:mb-3 p-2 sm:p-3 md:p-5 bg-gradient-to-br from-[#FFF6F8] via-white to-[#F6C1CF]/40 rounded sm:rounded-lg md:rounded-2xl border shadow-sm overflow-hidden"
                          style={{ borderColor: "rgba(244,143,177,0.5)" }}
                        >
                          {/* Decorative corner elements - smaller on mobile */}
                          <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 opacity-[0.08]">
                            <svg viewBox="0 0 100 100" className="text-[#D95C8A]" fill="currentColor">
                              <path d="M0,0 L100,0 L0,100 Z" />
                            </svg>
                          </div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 opacity-[0.08]">
                            <svg viewBox="0 0 100 100" className="text-[#F48FB1]" fill="currentColor">
                              <path d="M100,100 L0,100 L100,0 Z" />
                            </svg>
                          </div>
                          
                          {/* Opening quote - smaller on mobile */}
                          <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 md:top-2 md:left-2 text-[#D95C8A]/25">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                            </svg>
                          </div>
                          
                          {/* Closing quote - smaller on mobile */}
                          <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 md:bottom-2 md:right-2 text-[#D95C8A]/25">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 7h-3l-2 4v6h6v-6h-3zm-8 0H7l-2 4v6h6v-6h-3z" />
                            </svg>
                          </div>

                          {/* Message content */}
                          <div className="relative px-0.5 sm:px-1">
                            <p
                              className="text-[10px] sm:text-xs md:text-base leading-tight sm:leading-relaxed italic font-medium"
                              style={{ color: guestsPalette.textDeep }}
                            >
                              {guest.message}
                            </p>
                          </div>

                          {/* Elegant border accent - smaller on mobile */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 sm:w-0.5 md:w-1 h-8 sm:h-12 md:h-16 bg-gradient-to-b from-transparent via-[#D95C8A] to-transparent rounded-r-full" />
                        </div>
                      )}

                      {/* Companions - Mobile Optimized */}
                      {guest.companions && guest.companions.length > 0 && (
                        <div className="pt-1.5 sm:pt-2 md:pt-2.5 border-t border-[rgba(244,143,177,0.3)]">
                          <div className="flex items-center gap-1 mb-1 sm:mb-1.5">
                            <Users
                              className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"
                              style={{ color: guestsPalette.accentPink }}
                            />
                            <span
                              className="text-[9px] sm:text-[10px] md:text-xs font-semibold"
                              style={{ color: guestsPalette.textDeep }}
                            >
                              Companions
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 sm:gap-1.5">
                            {guest.companions.map((companion, idx) => (
                              <div
                                key={idx}
                                className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 bg-white border rounded sm:rounded-md md:rounded-lg transition-colors"
                                style={{ borderColor: "rgba(244,143,177,0.5)" }}
                              >
                                <span
                                  className="text-[9px] sm:text-[10px] md:text-xs font-medium whitespace-nowrap"
                                  style={{ color: guestsPalette.textDeep }}
                                >
                                  {companion.name}
                                </span>
                                {companion.relationship && companion.relationship.trim() !== "" && (
                                  <span
                                    className="text-[8px] sm:text-[9px] md:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium border whitespace-nowrap"
                                    style={{
                                      color: guestsPalette.accentPink,
                                      backgroundColor: "rgba(247,208,220,0.5)",
                                      borderColor: "rgba(244,143,177,0.5)",
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
                      <div className="flex items-center gap-1 pt-1.5 sm:pt-2 md:pt-2.5 mt-1.5 sm:mt-2 md:mt-2.5 border-t border-[rgba(244,143,177,0.3)]">
                        <Calendar
                          className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                          style={{ color: "rgba(108,23,61,0.6)" }}
                        />
                        <span
                          className="text-[8px] sm:text-[9px] md:text-[10px]"
                          style={{ color: "rgba(108,23,61,0.75)" }}
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
