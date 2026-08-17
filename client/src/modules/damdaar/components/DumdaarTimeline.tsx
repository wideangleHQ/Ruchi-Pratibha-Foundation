'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, MapPin, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import artCultureImg from '@/assets/Categories/Art and Culture.png';
import techImg from '@/assets/Categories/Tech .png';
import entrepreneurshipImg from '@/assets/Categories/Entrepeneurship.png';
import culinaryImg from '@/assets/Categories/Cooking.png';
import cultureHeritageThumb from '@/assets/our_work/thumbnails/Culture and Heritage.jpg';
import educationThumb from '@/assets/our_work/thumbnails/Education and Student Welfare.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TimelineEventItem {
  id: string;
  stepNumber: string;
  title: string;
  date: string;
  day: string;
  monthYear: string;
  description: string;
  status: 'past' | 'current' | 'future';
  category: string;
  location?: string;
  image: any;
  nodeDate: string;
  nodeTitle: string;
}

export const DUMDAAR_JOURNEY_EVENTS: TimelineEventItem[] = [
  {
    id: 't-1',
    stepNumber: '01',
    title: 'CAMPAIGN ANNOUNCEMENT & LAUNCH',
    date: 'August 15, 2026',
    day: '15',
    monthYear: 'AUGUST 2026',
    description: 'Official launch of the DUMDAAR ODIA movement across regional media, digital ecosystem, and state-wide registration portal activation.',
    status: 'current',
    category: 'MOVEMENT LAUNCH',
    location: 'Bhubaneswar, Odisha',
    image: artCultureImg,
    nodeDate: 'AUGUST 15, 2026',
    nodeTitle: 'CAMPAIGN ANNOUNCEMENT'
  },
  {
    id: 't-2',
    stepNumber: '02',
    title: 'ONLINE REGISTRATION PHASE',
    date: 'August 15 – September 30, 2026',
    day: '15',
    monthYear: 'AUG – SEP 2026',
    description: 'Talented Odias across four domains choose their category and submit project proposals, creative portfolios, code repositories, or culinary recipes.',
    status: 'future',
    category: 'REGISTRATION OPEN',
    location: 'State-wide Digital Portal',
    image: techImg,
    nodeDate: 'AUGUST 15',
    nodeTitle: 'ONLINE REGISTRATION'
  },
  {
    id: 't-3',
    stepNumber: '03',
    title: 'INITIAL SCREENING & SHORTLIST',
    date: 'October 1 – October 15, 2026',
    day: '01',
    monthYear: 'OCTOBER 2026',
    description: 'A distinguished jury panel of domain veterans evaluates all verified entries to select regional semifinalists and digital innovators.',
    status: 'future',
    category: 'JURY EVALUATION',
    location: 'State Review Panel',
    image: educationThumb,
    nodeDate: 'OCTOBER 1',
    nodeTitle: 'INITIAL SCREENING'
  },
  {
    id: 't-4',
    stepNumber: '04',
    title: 'REGIONAL LIVE ROUNDS',
    date: 'October 20 – November 10, 2026',
    day: '20',
    monthYear: 'OCT – NOV 2026',
    description: 'Semifinalists present their work live in front of audience panels in four major hubs: Bhubaneswar, Cuttack, Sambalpur, and Rourkela.',
    status: 'future',
    category: 'LIVE SHOWCASES',
    location: 'Regional Hubs (Odisha)',
    image: entrepreneurshipImg,
    nodeDate: 'OCTOBER 20',
    nodeTitle: 'REGIONAL LIVE ROUNDS'
  },
  {
    id: 't-5',
    stepNumber: '05',
    title: 'GRAND FINALE SHOWCASE',
    date: 'November 25, 2026',
    day: '25',
    monthYear: 'NOVEMBER 2026',
    description: 'Top finalists demonstrate live hacks, culinary cook-offs, entrepreneurial pitches, and grand cultural performances in a mega public showcase.',
    status: 'future',
    category: 'GRAND FINALE',
    location: 'Kalinga Stadium Complex',
    image: culinaryImg,
    nodeDate: 'NOVEMBER 25, 2026',
    nodeTitle: 'GRAND FINALE SHOW'
  },
  {
    id: 't-6',
    stepNumber: '06',
    title: 'DUMDAAR ODIA AWARDS CEREMONY',
    date: 'November 26, 2026',
    day: '26',
    monthYear: 'NOVEMBER 2026',
    description: 'Felicitating the state champions with prestigious Ruchi Prativa Foundation grants, incubation mentorships, and global exposure honors.',
    status: 'future',
    category: 'FELICITATION & GRANTS',
    location: 'Convention Center, BBSR',
    image: cultureHeritageThumb,
    nodeDate: 'NOVEMBER 26, 2026',
    nodeTitle: 'DUMDAAR ODIA AWARDS'
  }
];

export const DumdaarTimeline: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const stInstanceRef = useRef<ScrollTrigger | null>(null);

  const totalItems = DUMDAAR_JOURNEY_EVENTS.length;
  const activeEvent = DUMDAAR_JOURNEY_EVENTS[activeIndex];

  // Set up GSAP Pinned ScrollTrigger
  useEffect(() => {
    if (shouldReduceMotion) return;

    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;

    if (!section || !pinWrapper) return;

    const ctx = gsap.context(() => {
      const scrollDistance = window.innerHeight * 2.2;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: pinWrapper,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const prog = self.progress;

            // Compute active index based on progress segments
            const step = 1 / totalItems;
            const computedIndex = Math.min(
              totalItems - 1,
              Math.max(0, Math.floor(prog / step))
            );

            setActiveIndex((prev) => (prev !== computedIndex ? computedIndex : prev));

            // Highlight progress line on track
            if (activeLineRef.current) {
              const fillPercent = Math.min(100, Math.max(0, (computedIndex / (totalItems - 1)) * 100));
              gsap.set(activeLineRef.current, { width: `${fillPercent}%` });
            }
          }
        }
      });

      if (tl.scrollTrigger) {
        stInstanceRef.current = tl.scrollTrigger;
      }
    }, section);

    return () => ctx.revert();
  }, [shouldReduceMotion, totalItems]);

  // Click handler to jump directly to a milestone index
  const handleNodeClick = (index: number) => {
    setActiveIndex(index);
    if (stInstanceRef.current) {
      const st = stInstanceRef.current;
      const targetProgress = (index + 0.1) / totalItems;
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="timeline"
      aria-label="The Dumdaar Journey Timeline"
      className="relative w-full bg-[#FDFBF7] text-institutional-dark border-b border-black/5 selection:bg-[#CF8A12] selection:text-white"
    >
      {/* Pinned Viewport Container - Header Clearance + Single Frame Layout */}
      <div
        ref={pinWrapperRef}
        className="w-full h-screen max-h-screen lg:h-dvh lg:max-h-dvh flex flex-col justify-between pt-20 sm:pt-24 lg:pt-24 pb-4 sm:pb-6 px-4 sm:px-8 lg:px-16 relative overflow-hidden bg-[#FDFBF7]"
      >
        {/* 1. TOP HEADER IDENTITY & COUNTER PILL */}
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4 z-10 select-none shrink-0">
          <div className="space-y-1">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#343D0F] uppercase leading-none">
              THE DUMDAAR JOURNEY
            </h2>
            <p className="font-poppins text-xs sm:text-sm text-gray-500 font-normal mt-1 sm:mt-1.5">
              Every milestone brings Odisha&apos;s talent one step closer.
            </p>
          </div>

          {/* Numerical Counter Pill */}
          <div className="px-3.5 py-1 bg-white border border-black/10 rounded-full shadow-2xs flex items-center justify-center shrink-0">
            <span className="font-space text-xs font-bold text-gray-700">
              {String(activeIndex + 1).padStart(2, '0')}{' '}
              <span className="text-gray-400 font-normal">/ {String(totalItems).padStart(2, '0')}</span>
            </span>
          </div>
        </div>

        {/* 2. EDITORIAL DISPLAY STAGE (ENLARGED IMAGE & PROPORTIONED CONTENT) */}
        <div className="max-w-6xl w-full mx-auto my-auto py-1 sm:py-2 lg:py-3 z-10 flex-1 flex flex-col justify-center overflow-hidden">
          
          {/* MOBILE VIEW (STACKED: ENLARGED IMAGE FIRST) */}
          <div className="block lg:hidden space-y-2 sm:space-y-3 my-auto">
            {/* Mobile Image */}
            <div className="relative w-full h-[140px] sm:h-[180px] max-h-[22vh] rounded-2xl overflow-hidden shadow-lg border border-black/5 bg-gray-100 shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeEvent.image}
                    alt={activeEvent.title}
                    fill
                    sizes="100vw"
                    quality={95}
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Image Bottom Overlay Labels */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between text-white select-none">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest font-space text-white/80 block">
                        STAGE {activeEvent.stepNumber}
                      </span>
                      <span className="font-playfair text-sm sm:text-base font-bold text-white leading-tight block">
                        {activeEvent.category}
                      </span>
                    </div>
                    {/* Checkmark Badge */}
                    <div className="w-7 h-7 rounded-lg bg-[#855B08] text-white flex items-center justify-center shadow-md">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Event Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                {/* Metadata Pills */}
                <div className="flex items-center flex-wrap gap-2 text-[10px] font-semibold">
                  <span className="px-3 py-0.5 bg-[#855B08] text-white rounded-full font-bold tracking-wider uppercase">
                    {activeEvent.category}
                  </span>
                  <span className="px-3 py-0.5 bg-[#EFECE6] text-[#343D0F] rounded-full font-bold tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#855B08]" />
                    ACTIVE STAGE
                  </span>
                  {activeEvent.location && (
                    <span className="flex items-center gap-1 text-[#343D0F] text-[10px] font-medium">
                      <MapPin className="w-3 h-3 text-[#855B08]" />
                      {activeEvent.location}
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="font-playfair text-xl sm:text-2xl font-bold text-[#855B08] leading-none">
                  {activeEvent.day} {activeEvent.monthYear}
                </div>

                {/* Title */}
                <h3 className="font-playfair text-base sm:text-xl font-bold text-[#343D0F] leading-tight uppercase line-clamp-1">
                  {activeEvent.title}
                </h3>

                {/* Description */}
                <p className="font-poppins text-xs text-gray-600 leading-relaxed line-clamp-2">
                  {activeEvent.description}
                </p>

                {/* Adjusted CTA Button */}
                <div className="pt-1">
                  <a
                    href="#domains"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2A3410] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#855B08] transition-all duration-300 shadow-md font-space group"
                  >
                    <span>PREPARE YOUR ENTRY</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* DESKTOP VIEW (ENLARGED RIGHT IMAGE & VERTICALLY CENTERED CONTENT) */}
          <div className="hidden lg:grid grid-cols-12 gap-8 xl:gap-12 items-center my-auto">
            
            {/* Left Column: Event Details (Vertically Centered & Richer Size) */}
            <div className="col-span-6 space-y-4 xl:space-y-5 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-3.5 xl:space-y-4"
                >
                  {/* Metadata Row */}
                  <div className="flex items-center flex-wrap gap-2 text-xs font-semibold">
                    <span className="px-3.5 py-1 bg-[#855B08] text-white rounded-full text-[10px] font-bold tracking-wider uppercase shadow-2xs">
                      {activeEvent.category}
                    </span>
                    <span className="px-3.5 py-1 bg-[#EFECE6] text-[#343D0F] rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 border border-black/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#855B08]" />
                      ACTIVE STAGE
                    </span>
                    {activeEvent.location && (
                      <span className="flex items-center gap-1 text-[#343D0F] text-xs font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-[#855B08]" />
                        {activeEvent.location}
                      </span>
                    )}
                  </div>

                  {/* Large Prominent Date Display */}
                  <div className="font-playfair text-3xl lg:text-4xl xl:text-5xl font-bold text-[#855B08] leading-none tracking-tight select-none">
                    {activeEvent.day} {activeEvent.monthYear}
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair text-2xl lg:text-3xl xl:text-4xl font-bold text-[#343D0F] leading-tight tracking-tight uppercase max-w-lg line-clamp-2">
                    {activeEvent.title}
                  </h3>

                  {/* Description */}
                  <p className="font-poppins text-xs lg:text-sm text-gray-600 max-w-lg leading-relaxed line-clamp-3">
                    {activeEvent.description}
                  </p>

                  {/* Prominent Adjusted CTA Button */}
                  <div className="pt-2">
                    <a
                      href="#domains"
                      className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#2A3410] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#855B08] transition-all duration-300 shadow-md hover:shadow-lg group font-space"
                    >
                      <span>PREPARE YOUR ENTRY</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Prominent Enlarged Event Image Card */}
            <div className="col-span-6 flex justify-end items-center">
              <div className="relative w-full max-w-[480px] xl:max-w-[520px] h-[260px] lg:h-[300px] xl:h-[340px] max-h-[40vh] rounded-2xl overflow-hidden shadow-xl border border-black/10 bg-gray-100 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEvent.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={activeEvent.image}
                      alt={activeEvent.title}
                      fill
                      sizes="50vw"
                      quality={95}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Image Bottom Overlay Labels */}
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white select-none">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest font-space text-white/80 block">
                          STAGE {activeEvent.stepNumber}
                        </span>
                        <span className="font-playfair text-lg xl:text-xl font-bold text-white leading-tight block drop-shadow-sm">
                          {activeEvent.category}
                        </span>
                      </div>
                      {/* Checkmark Badge */}
                      <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-lg bg-[#855B08] text-white flex items-center justify-center shadow-md">
                        <Check className="w-4 h-4 xl:w-5 xl:h-5 stroke-[3]" />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* 3. TIMELINE TRACK NAVIGATOR — 80% CENTERED INTEGRATED CONTROL */}
        <div className="w-full relative pt-1 pb-1 z-20 select-none shrink-0">
          {/* Centered 80% Width Container */}
          <div className="w-full lg:w-[80%] mx-auto relative px-2">
            
            {/* Background Connecting Line */}
            <div className="absolute top-[15px] sm:top-[18px] left-[8%] right-[8%] h-[2px] bg-gray-200 z-0" />

            {/* Active Highlighted Progress Line */}
            <div
              ref={activeLineRef}
              className="absolute top-[15px] sm:top-[18px] left-[8%] h-[2px] bg-[#855B08] z-0 transition-all duration-300 ease-out"
              style={{
                width: `${(activeIndex / (totalItems - 1)) * 84}%`
              }}
            />

            {/* 6 Equal Grid Columns */}
            <div className="grid grid-cols-6 items-start relative z-10 w-full">
              {DUMDAAR_JOURNEY_EVENTS.map((item, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNodeClick(idx)}
                    className="flex flex-col items-center group focus:outline-none cursor-pointer w-full"
                    aria-label={`Go to milestone ${item.stepNumber}: ${item.title}`}
                  >
                    {/* Node Card Button */}
                    <div
                      className={`px-3 py-1 sm:px-4 sm:py-1 rounded-md font-space font-bold text-[10px] sm:text-xs transition-all duration-300 shadow-2xs ${
                        isActive
                          ? 'bg-[#855B08] text-white scale-105 shadow-md ring-2 ring-[#855B08]/30'
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-[#855B08] hover:text-[#855B08]'
                      }`}
                    >
                      {item.stepNumber}
                    </div>

                    {/* Label Below Node */}
                    <div className="mt-1 text-center w-full px-0.5">
                      <span
                        className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider block truncate transition-colors duration-300 ${
                          isActive ? 'text-[#855B08]' : 'text-gray-500'
                        }`}
                      >
                        {item.nodeDate}
                      </span>
                      <span
                        className={`text-[7px] sm:text-[9px] font-semibold block uppercase leading-tight transition-colors duration-300 mt-0.5 hidden sm:block ${
                          isActive ? 'text-[#343D0F]' : 'text-gray-400'
                        }`}
                      >
                        {item.nodeTitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DumdaarTimeline;
