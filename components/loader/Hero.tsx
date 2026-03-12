import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpen: () => void;
  visible: boolean;
}

const desktopImages: string[] = [
'/desktop-background/debut (1).jpg',
'/desktop-background/debut (2).jpg',
'/desktop-background/debut (3).jpg',
'/desktop-background/debut (4).jpg',
'/desktop-background/debut (5).jpg',
];

const mobileImages: string[] = [
'/mobile-background/debut (1).jpg',
'/mobile-background/debut (2).jpg',
'/mobile-background/debut (3).jpg',
'/mobile-background/debut (4).jpg',
'/mobile-background/debut (5).jpg',
'/mobile-background/debut (6).jpg',
];

export const Hero: React.FC<HeroProps> = ({ onOpen, visible }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(max-width: 768px)');
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const images = useMemo(() => (isMobile ? mobileImages : desktopImages), [isMobile]);

  useEffect(() => {
    if (!mounted || images.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [mounted, images.length]);

  return (
    <div className={`fixed inset-0 z-30 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt="Debut background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        
        {/* Overlay - luxury celestial night gradient */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at top left, rgba(186, 214, 235, 0.35), transparent 45%),
              radial-gradient(circle at bottom right, rgba(51, 78, 172, 0.75), transparent 55%),
              linear-gradient(to bottom, rgba(8, 31, 92, 0.85), rgba(8, 31, 92, 0.25))
            `
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-md mx-auto h-full">
        
        {/* Top Logo/Monogram */}
        <div className="mb-auto mt-8">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
            {/* Monogram Image */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44">
              <Image
                src="/monogram/mongoram.png"
                alt="Debut Monogram"
                fill
                className="object-contain drop-shadow-[0_22px_55px_rgba(0,0,0,0.7)]"
                priority
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col items-center justify-end w-full gap-4 pb-14 sm:pb-16 md:pb-20">
          <h2
            className="text-6xl md:text-8xl transform -rotate-6"
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontWeight: 400,
              color: '#F7F2EB',
              textShadow:
                '0 0 18px rgba(186,214,235,0.9), 0 0 38px rgba(8,31,92,0.95), 0 22px 55px rgba(0,0,0,0.9)',
            }}
          >
            You are
          </h2>
          
          <h1
            className="text-5xl md:text-7xl font-bold tracking-wider uppercase"
            style={{
              fontFamily: '"Cinzel Decorative", "Cinzel", serif',
              fontWeight: 700,
              color: '#EDF1F6',
              textShadow:
                '0 0 20px rgba(208,227,255,0.9), 0 0 42px rgba(8,31,92,0.95), 0 24px 60px rgba(0,0,0,0.9)',
            }}
          >
            Invited!
          </h1>

          <button 
            onClick={() => {
              onOpen();
            }}
            className="px-10 py-4 font-serif text-sm tracking-[0.2em] uppercase rounded-full border transition-all duration-300 shadow-[0_18px_45px_rgba(0,0,0,0.55)] backdrop-blur-sm bg-white/5"
            style={{
              borderColor: 'rgba(186, 214, 235, 0.85)',
              color: '#EDF1F6',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(186, 214, 235, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            <span
              style={{
                fontFamily: '"Playfair Display", var(--font-serif), serif',
                fontWeight: 500,
                color: '#EDF1F6',
              }}
            >
              Open Invitation
            </span>
          </button>
        </div>

        {/* Bottom Spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
};