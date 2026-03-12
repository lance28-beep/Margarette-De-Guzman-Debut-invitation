'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/content/site';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Countdown boxes with color photos - numbers show days, hours, minutes
const COUNTDOWN_BOXES = [
  { src: '/boxes/box (1).jpg' },
  { src: '/boxes/box (2).jpg' },
  { src: '/boxes/box (3).jpg' },
];

const MAIN_BW_IMAGE = '/boxes/debut (2).jpg';
const STAGGER_DELAY_MS = 4000; // Each image appears every 4 seconds
const INITIAL_DELAY_MS = 3000; // Delay before first image appears
const BOX_TRANSITION_MS = 1200; // Slow, smooth transition
const TOTAL_DURATION_MS = INITIAL_DELAY_MS + COUNTDOWN_BOXES.length * STAGGER_DELAY_MS + 3000;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);
  const [now, setNow] = useState(() => new Date());



  // Live countdown: days, hours, minutes until debut
  const countdown = useMemo(() => {
    const debutDate = new Date(siteConfig.wedding.date);
    const diff = debutDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  }, [now]);

  const countdownText = useMemo(() => {
    const { days } = countdown;
    if (days === 0) return 'TODAY IS THE DEBUT';
    if (days === 1) return 'ONE DAY TO GO';
    if (days >= 28 && days <= 31) return 'ONE MONTH TO GO';
    if (days >= 58 && days <= 62) return 'TWO MONTHS TO GO';
    if (days >= 88 && days <= 93) return 'THREE MONTHS TO GO';
    if (days >= 118 && days <= 123) return 'FOUR MONTHS TO GO';
    if (days >= 148 && days <= 153) return 'FIVE MONTHS TO GO';
    return `${days} DAYS TO GO`;
  }, [countdown.days]);

  // Debut date derived from siteConfig.wedding.date
  const debutDateObj = new Date(siteConfig.wedding.date);
  const debutMonthName = debutDateObj
    .toLocaleString('default', { month: 'short' })
    .toUpperCase(); // e.g. "MAY"
  const debutDay = String(debutDateObj.getDate()).padStart(2, '0'); // e.g. "09"
  const debutYear = String(debutDateObj.getFullYear()); // e.g. "2026"

  const countdownNumbers = [debutMonthName, debutDay, debutYear]; // e.g. May, 09, 2026
  const countdownLabels = ['Month', 'Day', 'Year']; // should return Month, Day, Year

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000); // update every minute
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    COUNTDOWN_BOXES.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => setVisibleBoxes((prev) => [...prev, i]),
          INITIAL_DELAY_MS + i * STAGGER_DELAY_MS
        )
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100);
      setProgress(pct);
    }, 50);

    const timer = setTimeout(() => {
      setProgress(100);
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, TOTAL_DURATION_MS);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  // Show debutant name and date
  const debutName = siteConfig.couple.debut;
  const debutDateDisplay = `${debutMonthName} · ${debutDay} · ${debutYear}`;
  const productionCredit = '';

  // Luxury celestial night palette
  const palette = {
    midnightBlue: '#081F5C',
    royalBlue: '#334EAC',
    skyBlue: '#BAD6EB',
    dawnBlue: '#D0E3FF',
    porcelain: '#EDF1F6',
    moonBeige: '#F7F2EB',
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background image with pastel overlay */}
      <div className="absolute inset-0">
        <Image
          src={MAIN_BW_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Celestial gradient overlay for readability and depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at top left, ${palette.skyBlue}33 0%, transparent 40%),
                         radial-gradient(circle at bottom right, ${palette.royalBlue}66 0%, transparent 50%),
                         linear-gradient(180deg, ${palette.midnightBlue}80 0%, ${palette.royalBlue}dd 100%)`,
          }}
        />

        {/* Moon + celestial line-art accents */}
        <div
          className="absolute right-6 sm:right-10 top-10 sm:top-12 w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-[0_0_45px_rgba(208,227,255,0.95)]"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, ${palette.dawnBlue}ff 0%, ${palette.moonBeige}ee 35%, transparent 70%)`,
            boxShadow:
              '0 0 45px rgba(186,214,235,0.95), 0 0 90px rgba(186,214,235,0.9), 0 0 140px rgba(8,31,92,0.9)',
          }}
        >
          {/* Shadow to carve out crescent */}
          <div className="absolute right-0.5 top-1.5 w-14 h-14 sm:w-[4.25rem] sm:h-[4.25rem] rounded-full bg-[rgba(8,31,92,0.98)] opacity-95" />
          {/* Soft rim highlight */}
          <div className="absolute inset-0 rounded-full border border-[rgba(237,241,246,0.8)]/80 opacity-70" />
          {/* Tiny star sparkle near the moon */}
          <div className="absolute -bottom-1 -left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[rgba(237,241,246,0.98)] blur-[1px] animate-pulse" />
        </div>
        <div className="absolute -top-10 -left-6 sm:-top-6 sm:left-4 w-40 h-40 rounded-full border border-white/40 opacity-60 blur-[1px]" />
        <div className="absolute bottom-10 -right-12 sm:-right-4 w-48 h-32 rounded-[999px] border border-white/40 opacity-50 rotate-6" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-6 top-24 w-16 h-16 rounded-3xl border border-white/40 opacity-60" />
          <div className="absolute right-10 bottom-32 w-12 h-12 rounded-full border border-white/60 opacity-60" />
        </div>

        {/* Soft starfield and glowing stars */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen opacity-60"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 25%, ${palette.dawnBlue}33 0, transparent 45%),
                              radial-gradient(circle at 80% 20%, ${palette.skyBlue}33 0, transparent 50%),
                              radial-gradient(circle at 25% 80%, ${palette.porcelain}33 0, transparent 55%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[rgba(208,227,255,0.95)] blur-[1px] opacity-90 top-10 left-1/5 animate-pulse" />
          <div className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[rgba(186,214,235,0.95)] blur-[1px] opacity-90 top-1/4 right-1/4 animate-pulse" />
          <div className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[rgba(237,241,246,0.95)] blur-[0.5px] opacity-80 bottom-1/3 left-1/3 animate-pulse" />
          <div className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[rgba(208,227,255,0.95)] blur-[1px] opacity-80 bottom-8 right-1/5 animate-pulse" />
        </div>
      </div>

      <div className="relative flex flex-col flex-1 min-h-0">
        {/* Top: Debut label + countdown - soft pastel styling, centered on mobile */}
        <div className="flex flex-col items-center justify-center w-full pt-10 sm:pt-14 md:pt-20 px-4 sm:px-6 flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 w-full max-w-lg mx-auto">
            <span className="hidden sm:block h-px w-12 flex-shrink-0 bg-white/50" />
            <p
              className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] font-sans uppercase text-center"
              style={{ color: palette.porcelain }}
            >
              Luxury celestial debut invitation
            </p>
            <span className="hidden sm:block h-px w-12 flex-shrink-0 bg-white/50" />
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center tracking-[0.08em] sm:tracking-[0.12em] uppercase max-w-md leading-tight px-2"
            style={{
              fontFamily: '"Playfair Display", var(--font-serif), serif',
              color: palette.porcelain,
              textShadow: `0 0 14px rgba(186,214,235,0.9), 0 18px 40px rgba(0,0,0,0.75)`,
            }}
          >
            {countdownText}
          </h2>
        </div>

        {/* Spacer - lets B&W image dominate (upper 2/3) */}
        <div className="flex-1 min-h-[12vh]" />

        {/* Middle: Three glassmorphism countdown cards - staggered reveal */}
        <div className="flex items-stretch justify-center gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 py-4 flex-shrink-0">
          {COUNTDOWN_BOXES.map((item, i) => {
            const isVisible = visibleBoxes.includes(i);
            return (
              <div
                key={i}
                className="relative flex-1 max-w-[28vw] sm:max-w-[140px] md:max-w-[160px] aspect-[3/4] overflow-hidden rounded-3xl border border-white/40 bg-white/10 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? 'translateY(0) scale(1)'
                    : 'translateY(28px) scale(0.94)',
                  transition: `opacity ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                <Image
                  src={item.src}
                  alt={debutName}
                  fill
                  className="object-cover scale-105"
                  sizes="(max-width: 640px) 28vw, 160px"
                />
                {/* Soft gradient overlay for readable number */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(145deg, ${palette.midnightBlue}66 0%, transparent 40%, ${palette.royalBlue}aa 100%)`,
                  }}
                />

                {/* Bold debut date number + label - centered at bottom */}
                <div className="absolute bottom-2 inset-x-0 sm:bottom-3 flex flex-col items-center">
                  <span
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black select-none leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    style={{
                      fontFamily: 'var(--font-granika), sans-serif',
                      color: palette.moonBeige,
                    }}
                  >
                    {countdownNumbers[i]}
                  </span>
                  <span className="text-[8px] sm:text-[9px] tracking-widest uppercase mt-0.5 text-[rgba(255,246,248,0.85)]">
                    {countdownLabels[i]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom: Name, date + progress bar */}
        <div className="flex flex-col items-center justify-center w-full py-6 sm:py-8 px-4 flex-shrink-0">
          <div
            className="text-center text-2xl sm:text-3xl md:text-4xl mb-1"
            style={{
              fontFamily: '"Cinzel Decorative", var(--font-serif), serif',
              color: palette.moonBeige,
              textShadow:
                '0 0 18px rgba(208,227,255,0.95), 0 0 32px rgba(8,31,92,0.95), 0 18px 40px rgba(0,0,0,0.8)',
            }}
          >
            {debutName}
          </div>
          <p
            className="text-[11px] sm:text-xs tracking-[0.35em] uppercase mb-3 font-sans"
            style={{ color: 'rgba(237,241,246,0.95)' }}
          >
            {debutDateDisplay}
          </p>
          {productionCredit && (
            <p
              className="text-[10px] sm:text-xs font-sans tracking-wider"
              style={{ color: palette.porcelain }}
            >
              {productionCredit}
            </p>
          )}
          {/* Preparing message + progress bar */}
          <p
            className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.35em] mt-6 mb-3 font-sans uppercase text-center"
            style={{ color: 'rgba(237,241,246,0.9)' }}
          >
            Your celestial debut invitation is being gently prepared
          </p>
          <div className="w-full max-w-xs mx-auto">
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{
                backgroundColor: 'rgba(237,241,246,0.28)',
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundColor: palette.skyBlue,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};