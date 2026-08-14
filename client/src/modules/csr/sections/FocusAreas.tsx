'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  HeartPulse,
  Trees,
  HandHeart,
  Palette,
  Users,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { FOCUS_AREAS } from '../data/csrData';

const ICON_MAP: Record<string, React.ElementType> = {
  GraduationCap,
  HeartPulse,
  Trees,
  HandHeart,
  Palette,
  Users,
};

export const FocusAreas: React.FC = () => {
  const [activeOpenId, setActiveOpenId] = useState<string | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (id: string) => {
    setActiveOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(id);
    }
  };

  // Scroll listener for mobile carousel to update active pagination index
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / FOCUS_AREAS.length;
    const scrollPos = container.scrollLeft;
    const index = Math.round(scrollPos / cardWidth);
    if (index >= 0 && index < FOCUS_AREAS.length) {
      setActiveMobileIndex(index);
    }
  };

  const scrollToIndex = (idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / FOCUS_AREAS.length;
    container.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    setActiveMobileIndex(idx);
  };

  return (
    <section
      id="focus-areas"
      className="py-24 sm:py-32 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Pillars of Action • Archival Folios
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Our Areas of Social Responsibility
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Discover the Foundation&apos;s core work by exploring our archival folios. Hover or tap each folio to open the cover and reveal key objectives and community initiatives.
          </p>
        </div>

        {/* 1. DESKTOP, LAPTOP & TABLET GRID (hidden on mobile, grid on md+) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {FOCUS_AREAS.map((area, idx) => {
            const IconComp = ICON_MAP[area.iconName] || Users;
            const isOpen = activeOpenId === area.id;

            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="w-full flex justify-center"
              >
                {/* 3D Perspective Container */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-label={`${area.title} Archival Folio`}
                  onClick={() => handleCardClick(area.id)}
                  onKeyDown={(e) => handleKeyDown(e, area.id)}
                  className="group relative w-full min-h-[440px] sm:min-h-[470px] rounded-sm transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent [perspective:1400px]"
                >
                  {/* Inside Page (Revealed Content) */}
                  <div className="absolute inset-0 z-10 w-full h-full rounded-sm bg-[#FDFBF7] dark:bg-[#121824] border border-institutional-accent/30 p-6 sm:p-7 flex flex-col justify-between shadow-lg overflow-hidden">
                    {/* Background Watermark */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(197,160,89,0.06)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-50" />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-center justify-between border-b border-institutional-accent/20 pb-3 mb-4">
                        <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-institutional-accent" />
                          <span>ARCHIVAL RECORD</span>
                        </span>
                        <span className="font-space text-[9px] text-gray-400 uppercase tracking-wider">
                          FOLIO #{area.id.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-2 leading-tight">
                        {area.title}
                      </h3>

                      <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                        {area.intro}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2 mb-4">
                        <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block">
                          KEY INITIATIVES &amp; OBJECTIVES
                        </span>
                        <ul className="space-y-1.5 font-manrope text-xs text-institutional-dark dark:text-gray-200">
                          {area.objectives.slice(0, 2).map((obj, oIdx) => (
                            <li key={oIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-institutional-accent shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {area.possibleActivities.slice(0, 4).map((act) => (
                          <span
                            key={act}
                            className="text-[9px] font-space px-2 py-0.5 rounded bg-institutional-accent/10 border border-institutional-accent/20 text-institutional-dark dark:text-gray-200"
                          >
                            • {act}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="relative z-10 pt-4 border-t border-institutional-accent/20 flex items-center justify-between">
                      <a
                        href="/work"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-space uppercase tracking-wider text-institutional-accent hover:text-institutional-dark dark:hover:text-white font-semibold transition-colors duration-200"
                      >
                        <span>Explore Activities</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <span className="text-[9px] font-space text-gray-400">
                        [ RPF ARCHIVE ]
                      </span>
                    </div>
                  </div>

                  {/* Front Cover Layer (Realistic Hardcover Physics Ease) */}
                  <div
                    className={`absolute inset-0 z-20 w-full h-full rounded-sm bg-[#0F1420] text-white border border-white/15 p-5 flex flex-col justify-between shadow-2xl transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu origin-left group-hover:[transform:rotateY(-108deg)] ${
                      isOpen ? '[transform:rotateY(-108deg)]' : '[transform:rotateY(0deg)]'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Left Hinge Spine Overlay */}
                    <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-black/80 via-black/40 to-transparent border-r border-institutional-accent/40 z-30 pointer-events-none rounded-l-sm" />

                    {/* Cover Gold Frame */}
                    <div className="relative z-10 h-full border border-institutional-accent/30 rounded-xs p-5 flex flex-col justify-between bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,89,0.12),transparent_70%)]">
                      <div className="flex items-center justify-between border-b border-institutional-accent/25 pb-3">
                        <div className="w-10 h-10 rounded-full bg-institutional-accent/15 border border-institutional-accent/30 text-institutional-accent flex items-center justify-center">
                          <IconComp className="w-5 h-5 stroke-[1.5]" />
                        </div>
                        <span className="font-space text-[9px] uppercase tracking-[0.2em] text-institutional-accent font-semibold">
                          EST. 1997
                        </span>
                      </div>

                      <div className="my-auto py-4">
                        <span className="text-[10px] font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-2">
                          PILLAR OF SOCIAL ACTION
                        </span>
                        <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-2">
                          {area.title}
                        </h3>
                        <div className="w-12 h-[1px] bg-institutional-accent/50 mb-3" />
                        <p className="font-cormorant italic text-sm text-institutional-accent/90">
                          &ldquo;{area.tagline}&rdquo;
                        </p>
                      </div>

                      <div className="pt-3 border-t border-institutional-accent/25 flex items-center justify-between text-[10px] font-space text-gray-300">
                        <span className="flex items-center gap-1.5 text-institutional-accent font-semibold uppercase tracking-widest">
                          <Sparkles className="w-3 h-3 text-institutional-accent animate-pulse" />
                          <span>{isOpen ? 'Close Folio' : 'Hover / Tap to Open'}</span>
                        </span>
                        <span className="text-gray-400">RPF FOLIO</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 2. MOBILE FULL-BLEED CAROUSEL (320px-480px, visible on md:hidden) */}
        <div className="block md:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-[100vw] -ml-6 px-6 overflow-x-auto overflow-y-hidden scrollbar-none snap-x snap-mandatory flex gap-4 pt-4 pb-6 touch-pan-x"
          >
            {FOCUS_AREAS.map((area) => {
              const IconComp = ICON_MAP[area.iconName] || Users;
              const isOpen = activeOpenId === area.id;

              return (
                <div
                  key={area.id}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-label={`${area.title} Archival Folio`}
                  onClick={() => handleCardClick(area.id)}
                  onKeyDown={(e) => handleKeyDown(e, area.id)}
                  className="w-[76vw] shrink-0 snap-center relative h-[460px] rounded-sm transition-all duration-500 focus:outline-none [perspective:1400px]"
                >
                  {/* Inside Page */}
                  <div className="absolute inset-0 z-10 w-full h-full rounded-sm bg-[#FDFBF7] dark:bg-[#121824] border border-institutional-accent/30 p-6 flex flex-col justify-between shadow-none overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between border-b border-institutional-accent/20 pb-2.5 mb-3">
                        <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-institutional-accent" />
                          <span>ARCHIVAL RECORD</span>
                        </span>
                        <span className="font-space text-[9px] text-gray-400 uppercase tracking-wider">
                          FOLIO #{area.id.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2 leading-tight">
                        {area.title}
                      </h3>

                      <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-3">
                        {area.intro}
                      </p>

                      <div className="space-y-1.5 mb-3">
                        <span className="text-[9px] font-space uppercase tracking-widest text-institutional-accent font-semibold block">
                          KEY OBJECTIVES
                        </span>
                        <ul className="space-y-1 font-manrope text-[11px] text-institutional-dark dark:text-gray-200">
                          {area.objectives.slice(0, 2).map((obj, oIdx) => (
                            <li key={oIdx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-institutional-accent shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="relative z-10 pt-3 border-t border-institutional-accent/20 flex items-center justify-between">
                      <a
                        href="/work"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[11px] font-space uppercase tracking-wider text-institutional-accent font-semibold"
                      >
                        <span>Explore Activities</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                      <span className="text-[9px] font-space text-gray-400">RPF</span>
                    </div>
                  </div>

                  {/* Front Cover Layer (No Drop Shadow on Mobile, Blended with Background) */}
                  <div
                    className={`absolute inset-0 z-20 w-full h-full rounded-sm bg-[#0F1420] text-white border border-white/15 p-5 flex flex-col justify-between shadow-none transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu origin-left ${
                      isOpen ? '[transform:rotateY(-108deg)]' : '[transform:rotateY(0deg)]'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/80 to-transparent border-r border-institutional-accent/40 z-30 pointer-events-none rounded-l-sm" />

                    <div className="relative z-10 h-full border border-institutional-accent/30 rounded-xs p-4 flex flex-col justify-between bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,89,0.12),transparent_70%)]">
                      <div className="flex items-center justify-between border-b border-institutional-accent/25 pb-2.5">
                        <div className="w-9 h-9 rounded-full bg-institutional-accent/15 border border-institutional-accent/30 text-institutional-accent flex items-center justify-center">
                          <IconComp className="w-4 h-4 stroke-[1.5]" />
                        </div>
                        <span className="font-space text-[8px] uppercase tracking-[0.2em] text-institutional-accent font-semibold">
                          EST. 1997
                        </span>
                      </div>

                      <div className="my-auto py-3">
                        <span className="text-[9px] font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-1.5">
                          PILLAR OF ACTION
                        </span>
                        <h3 className="font-cormorant text-xl font-bold text-white tracking-tight leading-snug mb-1.5">
                          {area.title}
                        </h3>
                        <div className="w-10 h-[1px] bg-institutional-accent/50 mb-2" />
                        <p className="font-cormorant italic text-xs text-institutional-accent/90">
                          &ldquo;{area.tagline}&rdquo;
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-institutional-accent/25 flex items-center justify-between text-[9px] font-space text-gray-300">
                        <span className="flex items-center gap-1 text-institutional-accent font-semibold uppercase tracking-widest">
                          <Sparkles className="w-3 h-3 text-institutional-accent animate-pulse" />
                          <span>{isOpen ? 'Close Folio' : 'Tap to Open'}</span>
                        </span>
                        <span className="text-gray-400">RPF FOLIO</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {FOCUS_AREAS.map((area, idx) => {
              const active = activeMobileIndex === idx;
              return (
                <button
                  key={area.id}
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    active
                      ? 'w-6 h-2 bg-institutional-accent shadow-sm'
                      : 'w-2 h-2 bg-black/20 dark:bg-white/20 hover:bg-institutional-accent/50'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
