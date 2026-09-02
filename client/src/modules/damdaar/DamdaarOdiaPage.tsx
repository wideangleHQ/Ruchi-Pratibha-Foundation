'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, Users, Award, Shield, Sparkles, Star } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Navigation } from '@/modules/home/sections/Navigation';
import { Footer } from '@/modules/home/sections/Footer';
import damdaarBg from '@/assets/Damdaar Odia Background.png';
import damdaarBgMobile from '@/assets/Backgroudn Mobile Screen.png';
import dumdaarLogo from '@/assets/Dumdaar Odia Png.png';
import { AccordionGallery } from '@/components/ui/AccordionGallery/AccordionGallery';

const DumdaarTimeline = dynamic(() => import('./components/DumdaarTimeline').then((m) => m.DumdaarTimeline), {
  loading: () => <div className="py-24 bg-[#121824] min-h-[450px]" />,
});
import artCultureImg from '@/assets/Categories/Art and Culture.png';
import techImg from '@/assets/Categories/Tech .png';
import entrepreneurshipImg from '@/assets/Categories/Entrepeneurship.png';
import culinaryImg from '@/assets/Categories/Cooking.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const DamdaarOdiaPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;
    const section = scrollSectionRef.current;

    if (!line1 || !line2 || !line3 || !section) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([line1, line2, line3], { color: '#D1D5DB', y: 15 }); // text-gray-300 equivalent

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      // Line 1: transition color to Deep Green and highlight spans to Gold
      tl.to(line1, { color: '#343D0F', y: 0, duration: 1.8 }, 0)
        .to(line1.querySelectorAll('.highlight-text'), { color: '#CF8A12', duration: 0.9 }, 0.9);

      // Line 1 dims slightly, Line 2 reveals
      tl.to(line1, { color: '#9CA3AF', duration: 1.35 }, 2.7)
        .to(line2, { color: '#343D0F', y: 0, duration: 1.8 }, 3.15)
        .to(line2.querySelectorAll('.highlight-text'), { color: '#4D6B1F', duration: 0.9 }, 4.05); // Fresh Green

      // Line 2 dims slightly, Line 3 reveals
      tl.to(line2, { color: '#9CA3AF', duration: 1.35 }, 5.85)
        .to(line3, { color: '#343D0F', y: 0, duration: 1.8 }, 6.3)
        .to(line3.querySelectorAll('.highlight-text'), {
          color: (index) => index === 0 ? '#D55E33' : '#CF8A12', // Warm Orange for heritage, Gold for digital
          duration: 0.9
        }, 7.2);

      // Keep them all fully revealed and highlighted at the end of the scroll (from 8.1 to 10)
      tl.to([line1, line2, line3], { color: '#343D0F', duration: 0.9 }, 8.1)
        .to(line1.querySelectorAll('.highlight-text'), { color: '#CF8A12', duration: 0.9 }, 8.1)
        .to(line2.querySelectorAll('.highlight-text'), { color: '#4D6B1F', duration: 0.9 }, 8.1)
        .to(line3.querySelectorAll('.highlight-text'), {
          color: (index) => index === 0 ? '#D55E33' : '#CF8A12',
          duration: 0.9
        }, 8.1);
    });

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FDFBF7] text-institutional-dark font-poppins relative overflow-x-hidden selection:bg-damdaar-gold selection:text-white"
    >
      {/* 01. Global Navigation Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-dvh max-h-dvh flex items-center justify-center px-4 sm:px-6 lg:px-8 border-b border-black/5 bg-[#FDFBF7] overflow-hidden">
        {/* Full-width Responsive Cultural Background Image Asset */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          {/* Desktop/Tablet viewports */}
          <div className="hidden md:block absolute inset-0 w-full h-full">
            <Image
              src={damdaarBg}
              alt="Dumdaar Odia Cultural Background Illustrative Art"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          {/* Mobile viewports */}
          <div className="block md:hidden absolute inset-0 w-full h-full">
            <Image
              src={damdaarBgMobile}
              alt="Dumdaar Odia Cultural Background Mobile Illustrative Art"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          {/* Subtle blend overlay */}
          <div className="absolute inset-0 bg-[#FDFBF7]/5" />
        </div>

        {/* Central Clean Typography Container */}
        <div className="max-w-4xl w-full mx-auto flex flex-col items-center justify-center text-center space-y-3.5 sm:space-y-4 md:space-y-5 pt-12 sm:pt-14 pb-4 sm:pb-6 relative z-10 my-auto h-full justify-center">
          {/* Top Pill Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 border border-black/10 rounded-full text-[9px] sm:text-xs font-bold tracking-widest text-[#343D0F] uppercase bg-[#FAF7F2]/80 backdrop-blur-xs shadow-xs font-space shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#CF8A12]" />
            <span>THE NEXT CHAPTER OF ODISHA</span>
          </motion.div>

          {/* Title Block: DUMDAAR on top, Calligraphic ଓଡ଼ିଆ directly below in Hatalekha font */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center justify-center text-center select-none shrink-0 py-1 sm:py-2 leading-none"
          >
            <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-wider text-[#343D0F] uppercase leading-none">
              DUMDAAR
            </h1>
            <span className="font-hatalekha text-[#CF8A12] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-snug pt-1 sm:pt-2 drop-shadow-xs">
              ଓଡ଼ିଆ
            </span>
          </motion.div>

          {/* Editorial Campaign Tagline with gold line separators */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex items-center justify-center gap-2.5 sm:gap-4 w-full select-none shrink-0"
          >
            <span className="h-[1px] w-6 sm:w-16 bg-[#CF8A12]/40" />
            <span className="text-[#CF8A12] text-[10px] sm:text-xs">✦</span>
            <h2 className="font-playfair text-[11px] sm:text-base lg:text-lg font-bold tracking-[0.18em] text-[#343D0F] uppercase">
              THE NEXT CHAPTER OF ODISHA.
            </h2>
            <span className="text-[#CF8A12] text-[10px] sm:text-xs">✦</span>
            <span className="h-[1px] w-6 sm:w-16 bg-[#CF8A12]/40" />
          </motion.div>

          {/* Concise Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-poppins text-[11px] sm:text-sm lg:text-base text-gray-700 max-w-md sm:max-w-xl leading-snug sm:leading-relaxed shrink-0 px-3"
          >
            A celebration of Odisha&apos;s limitless potential — discovering, nurturing and empowering extraordinary talent across diverse fields.
          </motion.p>

          {/* Centered Actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-row gap-3 sm:gap-4 pt-2 sm:pt-3 w-auto justify-center items-center shrink-0 font-space"
          >
            <a
              href="#domains"
              className="group px-6 sm:px-8 py-3 sm:py-3.5 text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest bg-[#D58C0B] hover:bg-[#B87708] rounded-xs shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer min-h-[42px] sm:min-h-[46px]"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#movement"
              className="group px-6 sm:px-8 py-3 sm:py-3.5 text-[10px] sm:text-xs font-bold text-[#343D0F] uppercase tracking-widest border border-[#343D0F]/25 bg-[#FAF7F2]/60 hover:bg-white rounded-xs shadow-2xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer min-h-[42px] sm:min-h-[46px]"
            >
              <span>KNOW MORE</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#343D0F]/70 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* The Movement Section - Immersive Pinned Scroll Storytelling */}
      <section
        ref={scrollSectionRef}
        id="movement"
        className="relative w-full h-[115dvh] bg-white border-b border-black/5 scroll-mt-20"
      >
        <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center bg-white px-4 sm:px-6 overflow-hidden">
          <div className="max-w-5xl w-full mx-auto text-center space-y-10 sm:space-y-14">
            {/* Top Concept badge */}
            <div className="space-y-3 select-none">
              <span className="text-xs uppercase tracking-widest font-bold text-damdaar-gold block font-space">THE CONCEPT</span>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold tracking-widest text-[#343D0F] uppercase">
                A Movement for Odisha&apos;s Talent
              </h2>
              <div className="w-16 h-0.5 bg-damdaar-gold mx-auto mt-2" />
            </div>

            {/* Cinematic editorial statements */}
            <div className="flex flex-col items-center justify-center space-y-8 sm:space-y-12">
              <p
                ref={line1Ref}
                className={`scroll-story-line font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight transition-colors duration-500 ${shouldReduceMotion ? 'text-[#343D0F]' : 'text-gray-300'
                  }`}
              >
                We stand at the threshold of{' '}
                <span className={`highlight-text block sm:inline ${shouldReduceMotion ? 'text-[#CF8A12]' : ''}`}>
                  potential
                </span>{' '}
                and{' '}
                <span className={`highlight-text block sm:inline ${shouldReduceMotion ? 'text-[#CF8A12]' : ''}`}>
                  possibility
                </span>
                .
              </p>

              <p
                ref={line2Ref}
                className={`scroll-story-line font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight transition-colors duration-500 ${shouldReduceMotion ? 'text-[#343D0F]' : 'text-gray-300'
                  }`}
              >
                DUMDAAR ODIA is an incubator designed to{' '}
                <span className={`highlight-text block sm:inline ${shouldReduceMotion ? 'text-[#4D6B1F]' : ''}`}>
                  foster talent
                </span>
              </p>

              <p
                ref={line3Ref}
                className={`scroll-story-line font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight transition-colors duration-500 ${shouldReduceMotion ? 'text-[#343D0F]' : 'text-gray-300'
                  }`}
              >
                fusing{' '}
                <span className={`highlight-text block sm:inline ${shouldReduceMotion ? 'text-[#D55E33]' : ''}`}>
                  cultural heritage
                </span>{' '}
                with{' '}
                <span className={`highlight-text block sm:inline ${shouldReduceMotion ? 'text-[#CF8A12]' : ''}`}>
                  digital advancements
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Four Domains Section */}
      <section id="domains" className="py-24 bg-[#FDFBF7] border-b border-black/5 scroll-mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-damdaar-gold block font-space">THE DOMAINS</span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold">
              Where Does Your Talent Belong?
            </h2>
            <p className="text-xs text-gray-400 font-space mt-1">SELECT A CATEGORY PANEL TO DEEP-DIVE AND REGISTER</p>
          </div>

          {/* Editorial Asymmetrical Domain Grid replaced with React Bits AccordionGallery */}
          <div className="w-full relative mt-8">
            <AccordionGallery
              items={[
                { image: artCultureImg.src, label: 'ART & CULTURE', link: '/damdaar-odia/art-culture', ctaText: 'REGISTER NOW →' },
                { image: techImg.src, label: 'PROJECT NIRMAN', link: '/damdaar-odia/project-nirman', ctaText: 'REGISTER NOW →' },
                { image: entrepreneurshipImg.src, label: 'ENTREPRENEURSHIP', link: '/damdaar-odia/entrepreneurship', ctaText: 'REGISTER NOW →' },
                { image: culinaryImg.src, label: 'KITCHEN QUEEN', link: '/damdaar-odia/kitchen-queen', ctaText: 'REGISTER NOW →' }
              ]}
              defaultIndex={0}
              expandRatio={0.45}
              accentColor="#CF8A12"
              overlayColor="#0B0F17"
              gap={12}
              radius={12}
              height={440}
              trigger="hover"
            />
          </div>
        </div>
      </section>

      {/* How to Register Section */}
      <section className="py-24 bg-white border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-damdaar-gold block font-space">THE REGISTRATION PROCESS</span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold">
              How to Register
            </h2>
            <div className="w-16 h-0.5 bg-damdaar-gold mx-auto mt-4" />
          </div>

          {/* Interactive Aligned Asymmetric Card Grid */}
          <div className="grid grid-cols-12 gap-3 items-start">
            {[
              {
                step: '01',
                title: 'CHOOSE YOUR DOMAIN',
                description: 'Choose the domain where your talent belongs.',
                color: '#4D6B1F', // Fresh Green
                bg: artCultureImg,
                overlayDefault: 'linear-gradient(to bottom, rgba(77, 107, 31, 0.65), rgba(15, 23, 10, 0.85))',
                overlayHover: 'linear-gradient(to bottom, rgba(77, 107, 31, 0.55), rgba(15, 23, 10, 0.75))',
                gridClasses: 'col-span-12 md:col-span-6 lg:col-span-7 lg:h-[360px] md:h-[340px]',
              },
              {
                step: '02',
                title: 'REGISTER YOUR DETAILS',
                description: 'Complete the registration form.',
                color: '#343D0F', // Deep Green
                bg: techImg,
                overlayDefault: 'linear-gradient(to bottom, rgba(52, 61, 15, 0.65), rgba(10, 12, 3, 0.85))',
                overlayHover: 'linear-gradient(to bottom, rgba(52, 61, 15, 0.55), rgba(10, 12, 3, 0.75))',
                gridClasses: 'col-span-12 md:col-span-6 lg:col-span-5 lg:h-[360px] md:h-[340px]',
              },
              {
                step: '03',
                title: 'SHOWCASE YOUR TALENT',
                description: 'Submit your idea, project, performance, portfolio, recipe or relevant entry.',
                color: '#D55E33', // Warm Orange
                bg: entrepreneurshipImg,
                overlayDefault: 'linear-gradient(to bottom, rgba(213, 94, 51, 0.65), rgba(35, 12, 5, 0.85))',
                overlayHover: 'linear-gradient(to bottom, rgba(213, 94, 51, 0.55), rgba(35, 12, 5, 0.75))',
                gridClasses: 'col-span-12 md:col-span-6 lg:col-span-5 lg:h-[360px] md:h-[340px]',
              },
              {
                step: '04',
                title: 'PARTICIPATE & RISE',
                description: 'Enter the evaluation/competition journey and move forward.',
                color: '#CF8A12', // Gold
                bg: culinaryImg,
                overlayDefault: 'linear-gradient(to bottom, rgba(207, 138, 18, 0.65), rgba(30, 20, 3, 0.85))',
                overlayHover: 'linear-gradient(to bottom, rgba(207, 138, 18, 0.55), rgba(30, 20, 3, 0.75))',
                gridClasses: 'col-span-12 md:col-span-6 lg:col-span-7 lg:h-[360px] md:h-[340px]',
              }
            ].map((item, idx) => {
              const isHovered = hoveredCard === idx;
              return (
                <div
                  key={item.step}
                  className={`group relative overflow-hidden rounded-lg transition-all duration-500 ease-out flex flex-col justify-between p-8 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#CF8A12] ${item.gridClasses} h-auto min-h-[280px] md:min-h-0`}
                  tabIndex={0}
                  onMouseEnter={() => !shouldReduceMotion && setHoveredCard(idx)}
                  onMouseLeave={() => !shouldReduceMotion && setHoveredCard(null)}
                  onFocus={() => setHoveredCard(idx)}
                  onBlur={() => setHoveredCard(null)}
                  onClick={() => {
                    if (shouldReduceMotion) return;
                    setHoveredCard(hoveredCard === idx ? null : idx);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setHoveredCard(hoveredCard === idx ? null : idx);
                    }
                  }}
                  style={{
                    borderTop: `4px solid ${item.color}`,
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: isHovered ? '0 12px 24px -10px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.02)',
                    borderColor: isHovered ? `${item.color}40` : 'rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Background Image with Hover Scale */}
                  <div
                    className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out pointer-events-none z-0 overflow-hidden rounded-lg"
                  >
                    <Image
                      src={item.bg}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 rounded-lg"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 transition-all duration-500 ease-out pointer-events-none z-10 rounded-lg"
                    style={{
                      background: isHovered ? item.overlayHover : item.overlayDefault,
                    }}
                  />

                  {/* Subtle traditional decorative icon overlay */}
                  <div
                    className="absolute right-4 bottom-4 w-16 h-16 pointer-events-none z-20 transition-all duration-500"
                    style={{
                      transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                      opacity: isHovered ? 0.12 : 0.05,
                    }}
                  >
                    <svg viewBox="0 0 100 100" fill="none" stroke={item.color} strokeWidth="2.5">
                      <circle cx="50" cy="50" r="40" />
                      <circle cx="50" cy="50" r="25" />
                      <line x1="10" y1="50" x2="90" y2="50" />
                      <line x1="50" y1="10" x2="50" y2="90" />
                    </svg>
                  </div>

                  {/* Card Content wrapper */}
                  <div className="space-y-4 relative z-20">
                    {/* Step Number */}
                    <span
                      className="font-playfair text-5xl font-black block transition-all duration-500 origin-left"
                      style={{
                        color: '#ffffff',
                        opacity: isHovered ? 0.55 : 0.3,
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                      }}
                    >
                      {item.step}
                    </span>

                    {/* Title */}
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold tracking-wide text-white leading-snug">
                      {item.title}
                    </h3>

                    {/* Hidden/Revealed Description */}
                    <div
                      className={`font-poppins text-xs text-gray-200 leading-relaxed transition-all duration-500 ease-out ${isHovered ? 'max-h-32 opacity-100 translate-y-0 mt-3' : 'max-h-0 opacity-0 translate-y-4 overflow-hidden'
                        }`}
                    >
                      {item.description}
                    </div>
                  </div>

                  {/* Card footer arrow button */}
                  <div className="pt-6 flex justify-end relative z-20">
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500"
                      style={{
                        borderColor: isHovered ? item.color : 'rgba(255,255,255,0.25)',
                        backgroundColor: isHovered ? item.color : 'transparent',
                        color: '#ffffff',
                      }}
                    >
                      <ChevronRight className={`w-4 h-4 transition-transform duration-500 ${isHovered ? 'translate-x-0.5' : ''}`} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Horizontal Dumdaar Timeline Section */}
      <DumdaarTimeline />

      {/* Why Participate Section — Interactive Editorial Cards */}
      <section className="py-24 bg-[#FDFBF7] border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#CF8A12] block font-space">THE REWARDS</span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#343D0F]">
              Why Participate in Damdaar Odisha?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-poppins max-w-lg mx-auto leading-relaxed">
              Empowering participants through institutional backing, direct mentorship, financial grants, and statewide recognition.
            </p>
            <div className="w-16 h-0.5 bg-[#CF8A12] mx-auto mt-3" />
          </div>

          {/* Interactive Editorial Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {[
              {
                num: '01',
                title: 'Get Upto 30,000/- of Winning Prize',
                description: 'Substantial cash reward pool to celebrate and empower top performing innovators, artists, and creators.',
                image: techImg,
                accent: '#CF8A12',
                icon: Award,
                span: 'lg:col-span-7',
              },
              {
                num: '02',
                title: 'Global Recognition',
                description: 'Statewide and national platform visibility across prominent media outlets, institutional forums, and summits.',
                image: artCultureImg,
                accent: '#4D6B1F',
                icon: Star,
                span: 'lg:col-span-5',
              },
              {
                num: '03',
                title: 'Grants',
                description: 'Financial support and infrastructure stipends to scale developmental innovations and enterprise ideas.',
                image: entrepreneurshipImg,
                accent: '#D55E33',
                icon: Users,
                span: 'lg:col-span-5',
              },
              {
                num: '04',
                title: 'Prizes',
                description: 'Exclusive trophies, commendation certificates, and institutional honors backed by Ruchi Prativa Foundation.',
                image: culinaryImg,
                accent: '#B1320A',
                icon: Shield,
                span: 'lg:col-span-7',
              },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.num}
                  tabIndex={0}
                  className={`${item.span} group relative rounded-2xl overflow-hidden border border-black/10 bg-[#0B0F17] shadow-lg transition-all duration-500 hover:shadow-2xl cursor-pointer min-h-[220px] sm:min-h-[260px] flex flex-col justify-between p-6 sm:p-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CF8A12]`}
                >
                  {/* Background Image with Zoom & Dark Overlay */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center opacity-40 transition-transform duration-700 ease-out group-hover:scale-110 group-focus:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/70 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                  </div>

                  {/* Top Bar: Number Badge & Icon */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-space text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white backdrop-blur-xs border border-white/15">
                      {item.num}
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: item.accent }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Bottom Content: Title, Revealed Description & Arrow */}
                  <div className="relative z-10 space-y-2 mt-auto pt-6">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-white/80 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[#CF8A12] shrink-0" />
                    </div>

                    <p className="font-poppins text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl transition-all duration-300 opacity-95 group-hover:opacity-100">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Light, Cultural & Premium Pre-Footer Closing CTA Section */}
      <section className="relative py-20 lg:py-28 bg-[#FAF7F2] text-[#343D0F] border-t border-black/5 overflow-hidden flex flex-col justify-center items-center">
        {/* Approved Desktop DUMDAAR ODIA Background Image */}
        <div className="hidden sm:block absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src={damdaarBg}
            alt="Dumdaar Odia Cultural Motif Background"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/80 to-[#FAF7F2]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,247,242,0.6)_0%,rgba(250,247,242,0.95)_100%)]" />
        </div>

        {/* Approved Mobile 9:16 DUMDAAR ODIA Background Image */}
        <div className="block sm:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src={damdaarBgMobile}
            alt="Dumdaar Odia Mobile Background Motif"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/85 to-[#FAF7F2]" />
        </div>

        {/* Editorial Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 sm:w-12 bg-[#CF8A12]/60" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-space text-[#CF8A12] font-bold">
              THE FINAL CHAPTER
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-[#CF8A12]/60" />
          </div>

          <div className="space-y-3">
            <h2 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#343D0F] uppercase leading-none max-w-3xl mx-auto">
              YOUR TALENT HAS A PLACE.
            </h2>
            <p className="font-playfair text-lg sm:text-2xl italic font-semibold text-[#855B08]">
              Be part of the next chapter of Odisha.
            </p>
          </div>

          <p className="font-poppins text-xs sm:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            Choose your domain, complete the registration framework, and showcase your talent to the region.
          </p>

          {/* Primary CTA Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#domains"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#CF8A12] hover:bg-[#B7780E] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-lg shadow-md hover:shadow-xl transition-all duration-300 font-space cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CF8A12] min-h-[48px] w-full sm:w-auto"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Subtle Traditional Divider Line */}
          <div className="pt-6 flex justify-center items-center gap-3 opacity-60">
            <span className="h-[1px] w-12 bg-[#CF8A12]/40" />
            <span className="w-2 h-2 rounded-full bg-[#CF8A12]" />
            <span className="h-[1px] w-12 bg-[#CF8A12]/40" />
          </div>
        </div>
      </section>

      {/* 03. Global Footer */}
      <Footer />
    </div>
  );
};

export default DamdaarOdiaPage;
