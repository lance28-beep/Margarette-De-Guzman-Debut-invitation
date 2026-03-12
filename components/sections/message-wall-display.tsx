"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { siteConfig } from "@/content/site"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      // Stagger the animation of messages
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-2 border-[#D95C8A]/60 shadow-lg rounded-xl sm:rounded-2xl">
            <CardContent className="p-2.5 sm:p-3 md:p-4 lg:p-5">
              <div className="flex justify-between items-start mb-2 sm:mb-3 md:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                  <Skeleton className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#334EAC]/35 via-[#334EAC]/30 to-[#334EAC]/30" />
                  <div className="space-y-1.5 sm:space-y-2">
                    <Skeleton className="h-3 w-20 sm:w-24 md:w-32 bg-white/30" />
                    <Skeleton className="h-2.5 w-16 sm:w-20 md:w-24 bg-white/20" />
                  </div>
                </div>
                <div className="flex gap-1.5 sm:gap-2">
                  <Skeleton className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-white/25" />
                  <Skeleton className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-white/15" />
                </div>
              </div>
              <Skeleton className="h-12 sm:h-14 md:h-16 w-full bg-gradient-to-r from-[#334EAC]/14 via-[#334EAC]/10 to-[#334EAC]/16 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-6 sm:py-10 md:py-14 lg:py-16 xl:py-20 px-2 sm:px-4">
        <div className="relative inline-block mb-4 sm:mb-5 md:mb-6 lg:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#334EAC]/45 to-[#334EAC]/30 rounded-full blur-xl scale-150 animate-pulse-slow" />
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-[#334EAC] rounded-full flex items-center justify-center mx-auto shadow-lg">
            <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-white" />
          </div>
          <div className="absolute -inset-2 sm:-inset-3 rounded-full border-2 border-white/25 animate-ping"></div>
          <div className="absolute -inset-1.5 sm:-inset-2 rounded-full border border-white/40"></div>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
          No Messages Yet
        </h3>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 max-w-md mx-auto leading-relaxed mb-4 sm:mb-5 md:mb-6">
          Be the first to share your heartfelt wishes for {`${siteConfig.couple.debut}`}!
        </p>
          <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 flex justify-center">
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-[#334EAC]/50">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white animate-pulse" />
              <span className="text-[10px] sm:text-xs md:text-sm font-lora text-white/90">Your message will appear here</span>
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
      </div>
    )
  }

  return (
    <div className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4">
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`relative border-2 border-[#334EAC]/60 shadow-lg hover:shadow-2xl hover:border-[#334EAC] transition-all duration-500 group overflow-hidden transform rounded-xl sm:rounded-2xl hover:scale-[1.01] ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? 'none' : 'fadeInUp 0.6s ease-out forwards',
            boxShadow: '0 4px 18px rgba(51,78,172,0.25), 0 2px 8px rgba(51,78,172,0.18)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 26px rgba(51,78,172,0.35), 0 4px 12px rgba(51,78,172,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(51,78,172,0.25), 0 2px 8px rgba(51,78,172,0.18)';
          }}
        >
          <CardContent className="relative p-2 sm:p-2.5 md:p-3 lg:p-3.5">
            <div className="flex justify-between items-start mb-1.5 sm:mb-2 md:mb-2.5">
              <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-2.5">
                <div className="relative">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 bg-[#334EAC] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ring-2 ring-white/70">
                    <span className="text-white font-lora text-xs sm:text-sm md:text-base font-semibold drop-shadow-sm">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -inset-1 rounded-full bg-[#334EAC]/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1 sm:gap-1.5">
                    <h4 className="font-lora text-[#334EAC] text-xs sm:text-sm md:text-base font-semibold truncate group-hover:text-[#334EAC] transition-colors duration-300">
                      {msg.name}
                    </h4>
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-[#334EAC]/70 font-lora truncate">
                      {new Date(msg.timestamp).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#334EAC]/80 fill-[#334EAC]/20 group-hover:fill-[#334EAC]/45 group-hover:text-[#334EAC] transition-all duration-300 group-hover:scale-110" />
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-[#334EAC]/85 group-hover:text-[#334EAC] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute -left-0.5 -top-0.5 sm:-left-1 sm:-top-1 md:-left-2 md:-top-2 text-xl sm:text-2xl md:text-4xl text-[#334EAC]/30 font-playfair group-hover:text-[#334EAC]/55 transition-all duration-300 group-hover:scale-110">
                "
              </span>
              <p className="text-[#334EAC] text-xs sm:text-sm md:text-base leading-snug sm:leading-relaxed pl-3 sm:pl-4 md:pl-6 font-lora group-hover:text-[#334EAC]/95 transition-colors duration-300">
                {msg.message}
              </p>
              <span className="absolute -right-0.5 -bottom-0.5 sm:-right-1 sm:-bottom-1 md:-right-2 md:-bottom-2 text-xl sm:text-2xl md:text-4xl text-[#334EAC]/40 font-playfair group-hover:text-[#334EAC]/70 transition-all duration-300 group-hover:scale-110">
                "
              </span>
            </div>
            
            <div className="mt-1.5 sm:mt-2 md:mt-3 flex items-center justify-between">
                <div className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] text-[#00558F]/65">
                  <div className="w-1 h-1 rounded-full bg-[#334EAC]/80" />
                  <div className="w-1 h-1 rounded-full bg-[#334EAC]/80" />
              </div>
                <div className="w-14 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-[#334EAC]/70 to-transparent group-hover:via-[#334EAC]/85 transition-all duration-300" />
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
