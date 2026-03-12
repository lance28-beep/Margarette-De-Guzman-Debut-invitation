"use client"

import Link from "next/link"
import { useEffect } from "react"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hide the global navbar while on /gallery
    const navbar = document.querySelector("nav") as HTMLElement | null
    if (navbar) navbar.style.display = "none"
    return () => {
      if (navbar) navbar.style.display = ""
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Simple top bar with only Back link */}
      <div className={`${inter.className} sticky top-0 z-50 backdrop-blur-md bg-[#081F5C]/95 border-b border-white/20 shadow-sm`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[#334EAC] font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-white/30 bg-white/90 backdrop-blur-md hover:bg-white hover:border-white transition-all duration-200 text-sm sm:text-base"
          >
            <span className="text-base sm:text-lg">←</span>
            <span className="hidden xs:inline">Back to main page</span>
            <span className="xs:hidden">Back</span>
          </Link>
          <div className="text-xs sm:text-sm text-white/70 font-medium">Gallery</div>
        </div>
      </div>
      {children}
    </div>
  )
}