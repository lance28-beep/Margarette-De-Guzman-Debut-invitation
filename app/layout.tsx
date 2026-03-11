import type React from "react"
import type { Metadata, Viewport } from "next"
import { Great_Vibes, Inter, Imperial_Script, Cinzel } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { siteConfig } from "@/content/site"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://piel-allen-debut-invitation.weddinginvitationrsvp.com/"
const canonicalUrl = siteUrl.replace(/\/$/, "")
const desktopHero = "/Details/linkPreview.jpg"
const mobileHero = "/Details/linkPreview.jpg"
const eventImageUrl = `${canonicalUrl}${desktopHero}`

const debutanteName = siteConfig.couple.debutNickname
const eventTitle = `${debutanteName} - Debut Invitation`
const eventDescription = `Celebrate ${siteConfig.couple.debutNickname}'s debut on ${siteConfig.wedding.date} at ${siteConfig.ceremony.venue}. RSVP, explore the story, and find everything you need to join the celebration.`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${debutanteName}'s Debut`,
  startDate: siteConfig.wedding.date,
  endDate: siteConfig.wedding.date,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: [
    {
      "@type": "Place",
      name: siteConfig.ceremony.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.ceremony.venue,
        addressLocality: siteConfig.ceremony.location,
        addressRegion: siteConfig.ceremony.location,
        addressCountry: "PH",
      },
    },
    {
      "@type": "Place",
      name: siteConfig.reception.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.reception.location,
        addressLocality: siteConfig.reception.location,
        addressRegion: siteConfig.reception.location,
        addressCountry: "PH",
      },
    },
  ],
  image: [eventImageUrl],
  description:
    `You're invited to celebrate ${siteConfig.couple.debutNickname}'s debut. Discover celebration details, RSVP, and explore the story.`,
  organizer: {
    "@type": "Person",
    name: debutanteName,
  },
  eventHashtag: `#${siteConfig.couple.debutNickname}Debut`,
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })
const imperialScript = Imperial_Script({ subsets: ["latin"], weight: "400", variable: "--font-imperial-script" })
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-cinzel" })

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl),
  title: {
    default: eventTitle,
    template: `%s | ${debutanteName}`,
  },
  description: eventDescription,
  keywords:
    `${siteConfig.couple.debutNickname} debut, ${siteConfig.ceremony.venue} debut, ${siteConfig.reception.venue} debut, debut invitation, RSVP, debut gallery, message wall, #EnasDebut`,
  applicationName: `${debutanteName} Debut Invitation`,
  authors: [
    { name: debutanteName },
  ],
  creator: debutanteName,
  publisher: debutanteName,
  category: "Event",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  alternates: {
    canonical: canonicalUrl,
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/favicon_io/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/favicon_io/android-chrome-512x512.png" },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: `${debutanteName} | ${siteConfig.wedding.date}`,
    description:
      `Celebrate Ena's debut on ${siteConfig.wedding.date}. Discover the story, RSVP, and find important details for the celebration.`,
    url: canonicalUrl,
    siteName: `${debutanteName}'s Debut`,
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: eventImageUrl,
        secureUrl: eventImageUrl,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: `${debutanteName} Debut Invitation - ${siteConfig.wedding.date}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${debutanteName} Debut Invitation`,
    description:
      `You're invited to ${siteConfig.couple.debutNickname}'s debut on ${siteConfig.wedding.date}. RSVP, explore the story, and get all the details for the big day! #EnasDebut`,
    images: [eventImageUrl],
    creator: `@EnasDebut`,
    site: `@EnasDebut`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    title: debutanteName,
    statusBarStyle: "default",
    capable: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#D2A4A4",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#D2A4A4" />
        <meta name="format-detection" content="telephone=yes,email=no,address=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lavishly+Yours&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Style+Script&display=swap" rel="stylesheet" />
        <link rel="preload" as="image" href={mobileHero} media="(max-width: 767px)" />
        <link rel="preload" as="image" href={desktopHero} media="(min-width: 768px)" />
        <link rel="preload" as="image" href="/Details/St. Augustine Parish Church.jpg" />
        <link rel="preload" as="image" href="/Details/La Mariposa Tagaytay Events Place.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body
        className={`${inter.variable} ${greatVibes.variable} ${imperialScript.variable} ${cinzel.variable} font-inter antialiased text-foreground`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
