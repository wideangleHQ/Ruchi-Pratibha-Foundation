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
  ctaText?: string;
  ctaLink?: string;
}

export const DUMDAAR_JOURNEY_EVENTS: TimelineEventItem[] = [
  {
    id: 't-1',
    stepNumber: '01',
    title: 'DUMDAAR ODIA CAMPAIGN LAUNCH',
    date: '17 August 2026',
    day: '17',
    monthYear: 'AUGUST 2026',
    description: 'Official launch of the Dumdaar Odia campaign and the beginning of the Project NIRMAN and Kitchen Queen journey.',
    status: 'current',
    category: 'MOVEMENT LAUNCH',
    image: artCultureImg,
    nodeDate: '17 AUGUST 2026',
    nodeTitle: 'CAMPAIGN LAUNCH'
  },
  {
    id: 't-2',
    stepNumber: '02',
    title: 'APPLICATION & REGISTRATION PERIOD',
    date: '17–27 August 2026',
    day: '17–27',
    monthYear: 'AUGUST 2026',
    description: 'Project NIRMAN applications circulate across colleges and digital channels while participants begin their submissions.',
    status: 'future',
    category: 'APPLICATIONS OPEN',
    image: techImg,
    nodeDate: '17–27 AUGUST',
    nodeTitle: 'APPLICATION & REGISTRATION',
    ctaText: 'START YOUR REGISTRATION →',
    ctaLink: '/damdaar-odia/project-nirman'
  },
  {
    id: 't-3',
    stepNumber: '03',
    title: 'PROJECT NIRMAN APPLICATION CLOSING',
    date: '27 August 2026',
    day: '27',
    monthYear: 'AUGUST 2026',
    description: 'Project NIRMAN applications close with the campaign targeting up to 150 applications.',
    status: 'future',
    category: 'APPLICATION DEADLINE',
    image: techImg,
    nodeDate: '27 AUGUST',
    nodeTitle: 'PROJECT NIRMAN CLOSING'
  },
  {
    id: 't-4',
    stepNumber: '04',
    title: 'SCREENING & EVALUATION',
    date: '28–29 August 2026',
    day: '28–29',
    monthYear: 'AUGUST 2026',
    description: 'Submitted Project NIRMAN applications undergo internal screening and evaluation.',
    status: 'future',
    category: 'SELECTION STAGE',
    image: educationThumb,
    nodeDate: '28–29 AUGUST',
    nodeTitle: 'SCREENING & EVALUATION'
  },
  {
    id: 't-5',
    stepNumber: '05',
    title: 'PROJECT NIRMAN WINNER & KITCHEN QUEEN DEADLINE',
    date: '30 August 2026',
    day: '30',
    monthYear: 'AUGUST 2026',
    description: 'The Project NIRMAN winner is announced, while Global Odia Kitchen Queen entries close at 11:59 PM.',
    status: 'future',
    category: 'MILESTONE DAY',
    image: culinaryImg,
    nodeDate: '30 AUGUST',
    nodeTitle: 'WINNER + KITCHEN QUEEN DEADLINE',
    ctaText: 'PARTICIPATE IN KITCHEN QUEEN →',
    ctaLink: '/damdaar-odia/kitchen-queen'
  },
  {
    id: 't-6',
    stepNumber: '06',
    title: 'RUCHI PRATIVA SAMMAN SAMAROH',
    date: '12 September 2026',
    day: '12',
    monthYear: 'SEPTEMBER 2026',
    description: 'Winners and recognised talent are felicitated at the Ruchi Prativa Samman Samaroh at Saheed Bhawan, Cuttack.',
    status: 'future',
    category: 'RECOGNITION',
    location: 'Saheed Bhawan, Cuttack',
    image: cultureHeritageThumb,
    nodeDate: '12 SEPTEMBER 2026',
    nodeTitle: 'SAMMAN SAMAROH'
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

  // Sync index from scroll position
  useEffect(() => {
    if (shouldReduceMotion) return;

    const pinWrapper = pinWrapperRef.current;
    const section = sectionRef.current;

    if (!pinWrapper || !section) return;

    const ctx = gsap.context(() => {
      stInstanceRef.current = ScrollTrigger.create({
        trigger: section,
        pin: pinWrapper,
        start: 'top top',
        end: '+=2500',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIdx = Math.min(
            Math.floor(progress * totalItems),
            totalItems - 1
          );
          setActiveIndex(newIdx);
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [shouldReduceMotion, totalItems]);

  const handleNodeClick = (index: number) => {
    setActiveIndex(index);
    if (stInstanceRef.current) {
      const targetProgress = index / (totalItems - 1);
      const start = stInstanceRef.current.start;
      const end = stInstanceRef.current.end;
      const scrollPos = start + targetProgress * (end - start);
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[3500px] bg-[#FDFBF7] border-b border-black/5"
      aria-label="The Dumdaar Journey Timeline"
    >
      <div
        ref={pinWrapperRef}
        className="w-full h-screen sticky top-0 flex flex-col justify-between pt-16 sm:pt-20 pb-4 overflow-hidden bg-[#FDFBF7]"
      >
        {/* 1. TOP HEADER ROW */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-20 shrink-0">
          <div>
            <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#343D0F] tracking-wide uppercase">
              THE DUMDAAR JOURNEY
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#855B08] font-space font-semibold mt-1">
              Every milestone brings Odisha’s talent one step closer.
            </p>
          </div>

          {/* Sync Counter Badge */}
          <div className="flex items-center gap-2 bg-[#EFECE6] px-3.5 py-1.5 rounded-full border border-black/5 self-start sm:self-auto">
            <span className="text-xs font-bold font-space text-[#855B08]">
              {activeEvent.stepNumber}
            </span>
            <span className="text-xs text-gray-400 font-space">/</span>
            <span className="text-xs font-bold font-space text-gray-500">
              0{totalItems}
            </span>
          </div>
        </div>

        {/* 2. MIDDLE CONTENT SECTION */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-center my-auto z-10 py-1">

          {/* MOBILE VIEW */}
          <div className="block lg:hidden space-y-3">
            {/* Mobile Image Card */}
            <div className="relative w-full aspect-[16/9] max-h-[220px] rounded-xl overflow-hidden shadow-lg border border-black/10 bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
                <h3 className="font-playfair text-base sm:text-xl font-bold text-[#343D0F] leading-tight uppercase line-clamp-2">
                  {activeEvent.title}
                </h3>

                {/* Description */}
                <p className="font-poppins text-xs text-gray-600 leading-relaxed line-clamp-2">
                  {activeEvent.description}
                </p>

                {/* CTA Button */}
                {activeEvent.ctaLink && (
                  <div className="pt-1">
                    <a
                      href={activeEvent.ctaLink}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2A3410] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#855B08] transition-all duration-300 shadow-md font-space group"
                    >
                      <span>{activeEvent.ctaText || 'EXPLORE NOW →'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* DESKTOP VIEW */}
          <div className="hidden lg:grid grid-cols-12 gap-8 xl:gap-12 items-center my-auto">

            {/* Left Column: Event Details */}
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

                  {/* Date Display */}
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

                  {/* CTA Button */}
                  {activeEvent.ctaLink && (
                    <div className="pt-2">
                      <a
                        href={activeEvent.ctaLink}
                        className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#2A3410] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#855B08] transition-all duration-300 shadow-md hover:shadow-lg group font-space"
                      >
                        <span>{activeEvent.ctaText || 'EXPLORE NOW →'}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Event Image Card */}
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

        {/* 3. TIMELINE TRACK NAVIGATOR */}
        <div className="w-full relative pt-1 pb-1 z-20 select-none shrink-0">
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
                      className={`px-3 py-1 sm:px-4 sm:py-1 rounded-md font-space font-bold text-[10px] sm:text-xs transition-all duration-300 shadow-2xs ${isActive
                          ? 'bg-[#855B08] text-white scale-105 shadow-md ring-2 ring-[#855B08]/30'
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-[#855B08] hover:text-[#855B08]'
                        }`}
                    >
                      {item.stepNumber}
                    </div>

                    {/* Label Below Node */}
                    <div className="mt-1 text-center w-full px-0.5">
                      <span
                        className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider block truncate transition-colors duration-300 ${isActive ? 'text-[#855B08]' : 'text-gray-500'
                          }`}
                      >
                        {item.nodeDate}
                      </span>
                      <span
                        className={`text-[7px] sm:text-[9px] font-semibold block uppercase leading-tight transition-colors duration-300 mt-0.5 hidden sm:block ${isActive ? 'text-[#343D0F]' : 'text-gray-400'
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
