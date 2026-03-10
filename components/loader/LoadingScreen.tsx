'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/content/site';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Countdown boxes with color photos - numbers show days, hours, minutes
const COUNTDOWN_BOXES = [
  { src: '/boxes/1.jpg' },
  { src: '/boxes/2.jpg' },
  { src: '/boxes/3.jpg' },
];

const MAIN_BW_IMAGE = '/desktop-background/debut (3).webp';
const STAGGER_DELAY_MS = 4000; // Each image appears every 4 seconds
const BOX_TRANSITION_MS = 1200; // Slow, smooth transition
const TOTAL_DURATION_MS = COUNTDOWN_BOXES.length * STAGGER_DELAY_MS + 3000;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);
  const [now, setNow] = useState(() => new Date());

  // Live countdown: days, hours, minutes until debut
  const countdown = useMemo(() => {
    const debutDate = new Date('2026-04-04T18:00:00');
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

  // Debut date: 04.04.26 (month, day, year)
  const countdownNumbers = ['04', '04', '26'];
  const countdownLabels = ['MONTH', 'DAY', 'YEAR'];

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000); // update every minute
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    COUNTDOWN_BOXES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleBoxes((prev) => [...prev, i]), i * STAGGER_DELAY_MS)
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
  const debutName = 'Piel Allen G. Marasigan';
  const debutDateDisplay = '04 · 04 · 26';
  const productionCredit = '';

  // Soft pink beach aesthetic palette
  const palette = {
    primaryPink: '#F6C1CF',
    secondaryPink: '#F48FB1',
    accentPink: '#D95C8A',
    lavender: '#D8B4E2',
    coral: '#E57399',
    baseWhite: '#FFF6F8',
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
        {/* Soft pastel gradient overlay for readability and warmth */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at top left, ${palette.primaryPink}55 0%, transparent 40%),
                         radial-gradient(circle at bottom right, ${palette.lavender}55 0%, transparent 45%),
                         linear-gradient(180deg, ${palette.baseWhite}10 0%, ${palette.secondaryPink}30 100%)`,
          }}
        />

        {/* Minimal white line-art style accents */}
        <div className="absolute -top-10 -left-6 sm:-top-6 sm:left-4 w-40 h-40 rounded-full border border-white/40 opacity-50 blur-[1px]" />
        <div className="absolute bottom-10 -right-12 sm:-right-4 w-48 h-32 rounded-[999px] border border-white/40 opacity-40 rotate-6" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-6 top-24 w-16 h-16 rounded-3xl border border-white/40 opacity-50" />
          <div className="absolute right-10 bottom-32 w-12 h-12 rounded-full border border-white/40 opacity-40" />
        </div>
      </div>

      <div className="relative flex flex-col flex-1 min-h-0">
        {/* Top: Debut label + countdown - soft pastel styling, centered on mobile */}
        <div className="flex flex-col items-center justify-center w-full pt-10 sm:pt-14 md:pt-20 px-4 sm:px-6 flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 w-full max-w-lg mx-auto">
            <span
              className="hidden sm:block h-px w-12 flex-shrink-0"
              style={{ backgroundColor: `${palette.coral}80` }}
            />
            <p
              className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] font-sans uppercase text-center"
              style={{ color: palette.baseWhite }}
            >
              Save the date for the debut
            </p>
            <span
              className="hidden sm:block h-px w-12 flex-shrink-0"
              style={{ backgroundColor: `${palette.coral}80` }}
            />
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center tracking-[0.08em] sm:tracking-[0.12em] uppercase max-w-md leading-tight px-2"
            style={{
              fontFamily: '"Cinzel", serif',
              color: palette.baseWhite,
              textShadow: `0 10px 35px rgba(0,0,0,0.45)`,
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
                    background: `linear-gradient(145deg, ${palette.primaryPink}10 0%, transparent 45%, ${palette.secondaryPink}35 100%)`,
                  }}
                />

                {/* Bold debut date number + label - right corner */}
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex flex-col items-end">
                  <span
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black select-none leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    style={{
                      fontFamily: 'var(--font-granika), sans-serif',
                      color: palette.baseWhite,
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
              fontFamily: 'var(--font-serif), cursive',
              color: palette.baseWhite,
              textShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}
          >
            {debutName}
          </div>
          <p
            className="text-[11px] sm:text-xs tracking-[0.35em] uppercase mb-3 font-sans"
            style={{ color: 'rgba(255,246,248,0.9)' }}
          >
            {debutDateDisplay}
          </p>
          {productionCredit && (
            <p
              className="text-[10px] sm:text-xs font-sans tracking-wider"
              style={{ color: palette.light }}
            >
              {productionCredit}
            </p>
          )}
          {/* Preparing message + progress bar */}
          <p
            className="text-xs sm:text-sm tracking-widest mt-6 mb-3 font-sans uppercase"
            style={{ color: 'rgba(255,246,248,0.9)' }}
          >
            Preparing your debut invitation
          </p>
          <div className="w-full max-w-xs mx-auto">
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundColor: 'rgba(255,255,255,0.95)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};