"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import StaggeredMenu from "./StaggeredMenu"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

// Soft pink beach aesthetic palette for easy tweaking
const navPalette = {
  primaryPink: "#F6C1CF",
  secondaryPink: "#F48FB1",
  accentPink: "#D95C8A",
  lavender: "#D8B4E2",
  coral: "#E57399",
  baseWhite: "#FFF6F8",
}

// Central navbar color tokens
const NAV_COLORS = {
  // Glassmorphism over hero photos, aligned with LoadingScreen and loader Hero
  background: "rgba(246, 193, 207, 0.22)", // primary pink glass
  backgroundScrolled: "rgba(216, 180, 226, 0.3)", // lavender glass a bit stronger
  border: "rgba(255, 246, 248, 0.55)",
  text: navPalette.baseWhite,
  textMuted: "rgba(255, 246, 248, 0.9)",
  accent: navPalette.accentPink,
  glow: navPalette.secondaryPink,
  monogramFilter: "brightness(0) invert(1)",
}


const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#countdown", label: "Countdown" },
  { href: "#gallery", label: "Gallery" },
  { href: "#messages", label: "Messages" },
  { href: "#details", label: "Details" },
  { href: "#entourage", label: "Entourage" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#guest-list", label: "RSVP" },
  { href: "#registry", label: "Registry" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")

  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current != null) return
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null
        setIsScrolled(window.scrollY > 50)
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
      window.removeEventListener("scroll", onScroll as EventListener)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const sectionIds = navLinks.map(l => l.href.substring(1))
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))
        if (visible.length > 0) {
          const topMost = visible[0]
          if (topMost.target && topMost.target.id) {
            const newActive = `#${topMost.target.id}`
            setActiveSection(prev => (prev === newActive ? prev : newActive))
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const menuItems = useMemo(() => navLinks.map((l) => ({ label: l.label, ariaLabel: `Go to ${l.label}`, link: l.href })), [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out border-b`}
      style={{
        backgroundColor: isScrolled ? NAV_COLORS.backgroundScrolled : NAV_COLORS.background,
        borderColor: NAV_COLORS.border,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: isScrolled
          ? "0 14px 40px rgba(0,0,0,0.35)"
          : "0 8px 26px rgba(0,0,0,0.28)",
      }}
    >
      {/* Elegant glow effect when scrolled */}
      {isScrolled && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${navPalette.primaryPink}40, transparent, ${navPalette.lavender}40)`,
          }}
        />
      )}
      {/* Subtle texture overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${NAV_COLORS.glow}22, transparent, rgba(0,0,0,0.25))`,
        }}
      />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          <Link href="#home" className="flex-shrink-0 group relative z-10">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20">
              <Image
                src="/monogram/newmonogram.png"
                alt="Debut Monogram"
                fill
                className="object-contain group-hover:scale-110 group-active:scale-105 transition-all duration-500 drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] group-hover:drop-shadow-[0_6px_22px_rgba(0,0,0,0.45)]"
                style={{
                  filter: NAV_COLORS.monogramFilter,
                }}
              />
            </div>
            
            {/* Subtle background glow on hover */}
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
              style={{
                background: `linear-gradient(90deg, transparent, ${navPalette.coral}55, transparent)`,
              }}
            />
          </Link>

          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 lg:px-4 py-2 text-xs lg:text-sm ${cormorant.className} font-medium rounded-full transition-all duration-500 relative group border ${
                    isActive
                      ? "backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
                      : "bg-transparent hover:shadow-[0_6px_18px_rgba(0,0,0,0.35)] hover:scale-105 active:scale-95"
                  }`}
                  style={{
                    color: isActive ? "#0B0B10" : NAV_COLORS.textMuted,
                    backgroundColor: isActive ? `${NAV_COLORS.text}F2` : "transparent",
                    borderColor: isActive ? `${NAV_COLORS.text}E0` : "transparent",
                  }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 rounded-full"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${navPalette.primaryPink}, ${navPalette.secondaryPink}, ${navPalette.lavender})`,
                      width: isActive ? "100%" : "0%",
                      boxShadow: isActive
                        ? "0 0 10px rgba(244,143,177,0.7)"
                        : "0 0 0 rgba(0,0,0,0)",
                    }}
                  />
                  {/* Active indicator dot */}
                  {isActive && (
                    <div
                      className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{
                        backgroundColor: navPalette.secondaryPink,
                        boxShadow: "0 0 6px rgba(244,143,177,0.9)",
                      }}
                    />
                  )}
                  {/* Subtle accent on hover */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                      background: `radial-gradient(circle at top left, ${navPalette.primaryPink}35, transparent 55%)`,
                    }}
                  />
                </Link>
              )
            })}
          </div>

          <div className="md:hidden flex items-center h-full">
            {/* Decorative halo to improve tap target and visual affordance */}
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-full blur-md pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${navPalette.primaryPink}26, ${navPalette.lavender}18, transparent)`,
                }}
              />
              <StaggeredMenu
                position="left"
                items={menuItems}
                socialItems={[]}
                displaySocials={false}
                displayItemNumbering={true}
                menuButtonColor={NAV_COLORS.text}
                openMenuButtonColor={NAV_COLORS.accent}
                changeMenuColorOnOpen={true}
                colors={[NAV_COLORS.background, NAV_COLORS.backgroundScrolled, NAV_COLORS.text, NAV_COLORS.accent, NAV_COLORS.glow]}
                accentColor={NAV_COLORS.accent}
                isFixed={true}
                onMenuOpen={() => {}}
                onMenuClose={() => {}}
              />
            </div>
          </div>
        </div>

      </div>
    </nav>
  )
}
