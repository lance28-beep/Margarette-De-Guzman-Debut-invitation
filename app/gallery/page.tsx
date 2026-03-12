import fs from "fs/promises"
import path from "path"
import MasonryGallery from "@/components/masonry-gallery"
import { Great_Vibes, Inter } from "next/font/google"
import { siteConfig } from "@/content/site"

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFrom(dir: string) {
  const abs = path.join(process.cwd(), "public", dir)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile())
      .map((e) => `/${dir}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
      .sort((a, b) => {
        // Extract numeric part from filename for proper numerical sorting
        const numA = parseInt(a.match(/\((\d+)\)/)?.[1] || "0", 10)
        const numB = parseInt(b.match(/\((\d+)\)/)?.[1] || "0", 10)
        return numA - numB
      })
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const mobileImages = await getImagesFrom("mobile-background")
  const desktopImages = await getImagesFrom("desktop-background")
  
  const images = [
    ...mobileImages.map((src) => ({ src, category: "mobile" as const })),
    ...desktopImages.map((src) => ({ src, category: "desktop" as const })),
  ]

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #081F5C, #334EAC)" }}>
      {/* Ornate pattern background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Base pattern - diagonal lines forming diamonds */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 70px, #081F5C/0.06 70px, #081F5C/0.06 71px),
              repeating-linear-gradient(-45deg, transparent, transparent 70px, #081F5C/0.06 70px, #081F5C/0.06 71px)
            `,
            backgroundSize: '70px 70px, 70px 70px',
          }}
        />
        
        {/* Decorative scroll motifs - using SVG pattern */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <defs>
            <pattern id="scrollPatternGallery" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
              {/* Scroll motifs at intersections */}
              <g fill="none" stroke="#081F5C" strokeWidth="0.5">
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
          <rect width="100%" height="100%" fill="url(#scrollPatternGallery)" />
        </svg>

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#01123D]/40 via-transparent to-[#15156B]/40" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          <div className="mx-auto max-w-3xl">
            <p className={`${inter.className} text-xs sm:text-sm tracking-[0.45em] uppercase text-[#F7F2EB]/75 mb-3`}>
              Timeless Memories
            </p>
            <h1
              className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl text-[#F7F2EB] mb-4 drop-shadow-[0_18px_40px_rgba(1,54,98,0.68)]`}
            >
              `{siteConfig.couple.debutNickname} Debut Gallery
            </h1>
            <p className={`${inter.className} text-sm sm:text-base md:text-lg text-[#F7F2EB]/90 mt-4 leading-relaxed`}>
              Moments captured in sapphire blue and champagne elegance—`{siteConfig.couple.debutNickname}&apos;s eighteenth celebration, preserved for you to treasure forever.
            </p>
          </div>
        </div>

        {images.length === 0 ? (
          <div className={`${inter.className} text-center text-[#F7F2EB]/90`}>
            <p className="font-light">
              No images found. Add files to{" "}
              <code className="px-2 py-1 bg-[#013662]/80 rounded border border-[#F7F2EB]/30 text-[#F7F2EB]">
                public/mobile-background
              </code>
              {" "}or{" "}
              <code className="px-2 py-1 bg-[#013662]/80 rounded border border-[#F7F2EB]/30 text-[#F7F2EB]">
                public/desktop-background
              </code>
              .
            </p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}
      </section>
    </main>
  )
}