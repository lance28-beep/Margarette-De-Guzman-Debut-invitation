'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/content/site';
interface LoadingScreenProps {
  onComplete: () => void;
}

// Countdown boxes with color photos - numbers show days, hours, minutes
const COUNTDOWN_BOXES = [
  { src: '/box/box1.webp' },
  { src: '/box/box2.webp' },
  { src: '/box/box3.webp' },
];

const MOBILE_BG = '/mobile-backgroundnew/debut (51).webp';
const DESKTOP_BG = '/box/desktop.webp';

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
      {/* ── Background layer ── */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Keyframe styles injected once */}
        <style>{`
          @keyframes kbZoom {
            from { transform: scale(1);      }
            to   { transform: scale(1.09);   }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(0.7); }
            50%       { opacity: 1;   transform: scale(1.3); }
          }
          @keyframes aurora {
            0%   { transform: translateX(-8%) skewX(-6deg) scaleY(1);   opacity: 0.22; }
            50%  { transform: translateX(8%)  skewX(6deg)  scaleY(1.1); opacity: 0.38; }
            100% { transform: translateX(-8%) skewX(-6deg) scaleY(1);   opacity: 0.22; }
          }
          @keyframes floatUp {
            0%   { transform: translateY(0)   scale(1);   opacity: 0; }
            20%  { opacity: 0.7; }
            80%  { opacity: 0.5; }
            100% { transform: translateY(-60px) scale(1.4); opacity: 0; }
          }
        `}</style>

        {/* 1 — Photo with slow Ken Burns zoom — CSS picks mobile vs desktop, no JS flash */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={MOBILE_BG}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            style={{ animation: 'kbZoom 18s ease-in-out infinite alternate' }}
          />
        </div>
        <div className="absolute inset-0 hidden md:block">
          <Image
            src={DESKTOP_BG}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            style={{ animation: 'kbZoom 18s ease-in-out infinite alternate' }}
          />
        </div>

        {/* 2 — Deep vignette: edges darken to frame the subject */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 80% at 50% 45%,
                           transparent 35%,
                           rgba(4,10,40,0.55) 70%,
                           rgba(4,10,40,0.88) 100%)`,
          }}
        />

        {/* 3 — Celestial color wash (depth + readability) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(175deg,
                           ${palette.midnightBlue}70 0%,
                           transparent 45%,
                           ${palette.royalBlue}99 100%)`,
          }}
        />

        {/* 4 — Aurora shimmer band */}
        <div
          className="absolute inset-x-0 pointer-events-none"
          style={{
            top: '18%',
            height: '28%',
            background: `linear-gradient(90deg,
                           transparent 0%,
                           ${palette.skyBlue}28 20%,
                           ${palette.dawnBlue}40 50%,
                           ${palette.skyBlue}28 80%,
                           transparent 100%)`,
            filter: 'blur(28px)',
            animation: 'aurora 9s ease-in-out infinite',
          }}
        />

        {/* 5 — Crescent moon */}
        <div
          className="absolute right-6 sm:right-12 top-10 sm:top-12 w-16 h-16 sm:w-20 sm:h-20 rounded-full"
          style={{
            background: `radial-gradient(circle at 32% 32%, ${palette.dawnBlue} 0%, ${palette.moonBeige}dd 40%, transparent 72%)`,
            boxShadow: `0 0 32px rgba(186,214,235,0.9), 0 0 70px rgba(186,214,235,0.55), 0 0 120px rgba(8,31,92,0.7)`,
          }}
        >
          <div className="absolute right-0.5 top-1.5 w-14 h-14 sm:w-[4.2rem] sm:h-[4.2rem] rounded-full bg-[#060e2a] opacity-95" />
          <div className="absolute inset-0 rounded-full border border-white/30" />
          {/* Sparkle beside moon */}
          <div
            className="absolute -bottom-1.5 -left-3 w-1.5 h-1.5 rounded-full bg-white/90"
            style={{ animation: 'twinkle 2.4s ease-in-out infinite' }}
          />
        </div>

        {/* 6 — Decorative orbital rings */}
        <div className="pointer-events-none absolute -top-12 -left-8 w-44 h-44 rounded-full border border-white/25 blur-[1px]" />
        <div className="pointer-events-none absolute bottom-8 -right-14 w-52 h-36 rounded-[999px] border border-white/20 rotate-12" />

        {/* 7 — Stars (12 stars, varied size + twinkle speed) */}
        <div className="pointer-events-none absolute inset-0">
          {[
            { t:'7%',  l:'12%', s:1.5, d:'0s',    dur:'2.1s' },
            { t:'14%', l:'68%', s:1,   d:'0.4s',  dur:'3.0s' },
            { t:'22%', l:'38%', s:2,   d:'0.9s',  dur:'2.5s' },
            { t:'32%', l:'82%', s:1,   d:'1.2s',  dur:'1.8s' },
            { t:'45%', l:'5%',  s:1.5, d:'0.2s',  dur:'2.8s' },
            { t:'55%', l:'55%', s:1,   d:'1.5s',  dur:'3.3s' },
            { t:'63%', l:'25%', s:2,   d:'0.7s',  dur:'2.2s' },
            { t:'72%', l:'74%', s:1,   d:'0.3s',  dur:'1.9s' },
            { t:'80%', l:'42%', s:1.5, d:'1.1s',  dur:'2.6s' },
            { t:'88%', l:'88%', s:1,   d:'0.6s',  dur:'3.1s' },
            { t:'10%', l:'48%', s:1,   d:'1.8s',  dur:'2.4s' },
            { t:'50%', l:'90%', s:2,   d:'0.5s',  dur:'1.7s' },
          ].map((star, idx) => (
            <div
              key={idx}
              className="absolute rounded-full bg-white"
              style={{
                top: star.t,
                left: star.l,
                width: `${star.s * 4}px`,
                height: `${star.s * 4}px`,
                filter: `blur(${star.s * 0.5}px)`,
                animation: `twinkle ${star.dur} ${star.d} ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        {/* 8 — Floating bokeh particles */}
        <div className="pointer-events-none absolute inset-0">
          {[
            { l:'15%', t:'75%', s:10, d:'0s',   dur:'6s'  },
            { l:'35%', t:'80%', s:8,  d:'1.5s', dur:'7s'  },
            { l:'60%', t:'85%', s:14, d:'0.8s', dur:'5.5s'},
            { l:'80%', t:'78%', s:7,  d:'2.2s', dur:'8s'  },
            { l:'50%', t:'90%', s:10, d:'3.0s', dur:'6.5s'},
          ].map((b, idx) => (
            <div
              key={idx}
              className="absolute rounded-full"
              style={{
                left: b.l,
                top: b.t,
                width: `${b.s}px`,
                height: `${b.s}px`,
                background: `radial-gradient(circle, rgba(186,214,235,0.7) 0%, transparent 70%)`,
                filter: 'blur(3px)',
                animation: `floatUp ${b.dur} ${b.d} ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        {/* 9 — Top fade so header text is always readable */}
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, rgba(4,10,40,0.72) 0%, transparent 100%)`,
          }}
        />

        {/* 10 — Bottom fade so cards / progress bar sit on clean dark base */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background: `linear-gradient(0deg, rgba(4,10,40,0.82) 0%, transparent 100%)`,
          }}
        />
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