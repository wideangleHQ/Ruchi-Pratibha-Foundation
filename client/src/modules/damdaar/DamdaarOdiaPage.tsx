'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, Calendar, Users, Award, Shield, Sparkles, Star, Check } from 'lucide-react';
import { Navigation } from '@/modules/home/sections/Navigation';
import { Footer } from '@/modules/home/sections/Footer';
import { DAMDAAR_DOMAINS, DAMDAAR_TIMELINE } from './data/damdaarData';
import damdaarBg from '@/assets/Damdaar Odia Background.png';
import damdaarBgMobile from '@/assets/Backgroudn Mobile Screen.png';
import { AccordionGallery } from '@/components/ui/AccordionGallery/AccordionGallery';
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
  const router = useRouter();
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
      <section className="relative h-screen min-h-screen lg:h-dvh lg:min-h-dvh flex items-center justify-center px-4 sm:px-6 lg:px-8 border-b border-black/5 bg-[#FDFBF7] overflow-hidden">
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
              quality={95}
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
              quality={95}
              className="object-cover object-center"
            />
          </div>
          {/* Subtle blend overlay */}
          <div className="absolute inset-0 bg-[#FDFBF7]/5" />
        </div>

        {/* Central Clean Typography Container */}
        <div className="max-w-4xl w-full mx-auto flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 pt-16 relative z-10">
          {/* Top Pill Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-black/10 rounded-full text-[10px] sm:text-xs font-bold tracking-widest text-[#343D0F] uppercase bg-white/40 backdrop-blur-sm shadow-sm font-space"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#CF8A12]" />
            <span>THE NEXT CHAPTER OF ODISHA</span>
          </motion.div>

          {/* DUMDAAR ଓଡ଼ିଆ stacked title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center justify-center space-y-0 leading-none select-none"
          >
            <span className="font-playfair text-6xl sm:text-8xl lg:text-9xl font-bold uppercase tracking-tight text-[#343D0F]">
              DUMDAAR
            </span>
            <span className="font-hatalekha text-6xl sm:text-8xl lg:text-9xl xl:text-[9.5rem] text-[#CF8A12] leading-[0.85] relative -top-1 sm:-top-3 block">
              ଓଡ଼ିଆ
            </span>
          </motion.div>

          {/* Editorial Campaign Tagline with gold line separators */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex items-center justify-center gap-3 sm:gap-4 w-full select-none"
          >
            <span className="h-[1px] w-8 sm:w-16 bg-[#CF8A12]/30" />
            <span className="text-[#CF8A12] text-xs sm:text-sm">✦</span>
            <h2 className="font-playfair text-sm sm:text-base lg:text-lg font-bold tracking-widest text-[#343D0F] uppercase">
              THE NEXT CHAPTER OF ODISHA.
            </h2>
            <span className="text-[#CF8A12] text-xs sm:text-sm">✦</span>
            <span className="h-[1px] w-8 sm:w-16 bg-[#CF8A12]/30" />
          </motion.div>

          {/* Concise Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-poppins text-xs sm:text-sm lg:text-base text-gray-700 max-w-xl leading-relaxed"
          >
            A celebration of Odisha&apos;s limitless potential — discovering, nurturing and empowering extraordinary talent across diverse fields.
          </motion.p>

          {/* Centered Actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto justify-center items-center"
          >
            <motion.a
              href="#domains"
              whileHover={{ scale: 1.03, y: -2, boxShadow: '0 10px 25px -5px rgba(207,138,18,0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-3.5 text-xs font-semibold text-white uppercase tracking-widest bg-[#CF8A12] rounded-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CF8A12] min-h-[46px] w-full sm:w-auto relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#movement"
              whileHover={{ scale: 1.02, y: -1, backgroundColor: 'rgba(255, 255, 255, 0.7)', borderColor: '#343D0F' }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-3.5 text-xs font-semibold text-[#343D0F] uppercase tracking-widest border border-[#343D0F]/30 bg-white/30 backdrop-blur-sm rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343D0F] min-h-[46px] w-full sm:w-auto shadow-sm"
            >
              <span>Know More</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#343D0F]/70 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* The Movement Section - Immersive Pinned Scroll Storytelling */}
      <section 
        ref={scrollSectionRef} 
        id="movement" 
        className="relative w-full h-[115vh] bg-white border-b border-black/5 scroll-mt-20"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-white px-4 sm:px-6 overflow-hidden">
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
                className={`scroll-story-line font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight transition-colors duration-500 ${
                  shouldReduceMotion ? 'text-[#343D0F]' : 'text-gray-300'
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
                className={`scroll-story-line font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight transition-colors duration-500 ${
                  shouldReduceMotion ? 'text-[#343D0F]' : 'text-gray-300'
                }`}
              >
                DUMDAAR ODIA is an incubator designed to{' '}
                <span className={`highlight-text block sm:inline ${shouldReduceMotion ? 'text-[#4D6B1F]' : ''}`}>
                  foster talent
                </span>
              </p>
              
              <p 
                ref={line3Ref} 
                className={`scroll-story-line font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight transition-colors duration-500 ${
                  shouldReduceMotion ? 'text-[#343D0F]' : 'text-gray-300'
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
                { image: artCultureImg.src, label: 'Art & Culture (Heritage)', link: '/damdaar-odia/domains/art-culture' },
                { image: techImg.src, label: 'Technology (Digital)', link: '/damdaar-odia/domains/technology' },
                { image: entrepreneurshipImg.src, label: 'Entrepreneurship (Enterprise)', link: '/damdaar-odia/domains/entrepreneurship' },
                { image: culinaryImg.src, label: 'Culinary Excellence (Cuisine)', link: '/damdaar-odia/domains/culinary-excellence' }
              ]}
              defaultIndex={0}
              expandRatio={0.45}
              accentColor="#CF8A12"
              overlayColor="#0B0F17"
              gap={12}
              radius={8}
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
          <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">
            {[
              {
                step: '01',
                title: 'CHOOSE YOUR DOMAIN',
                description: 'Choose the domain where your talent belongs.',
                color: '#4D6B1F', // Fresh Green
                bg: artCultureImg.src,
                overlayDefault: 'linear-gradient(to bottom, rgba(77, 107, 31, 0.82), rgba(15, 23, 10, 0.95))',
                overlayHover: 'linear-gradient(to bottom, rgba(77, 107, 31, 0.72), rgba(15, 23, 10, 0.9))',
                gridClasses: 'col-span-12 md:col-span-6 lg:col-span-7 lg:h-[360px] md:h-[340px]',
              },
              {
                step: '02',
                title: 'REGISTER YOUR DETAILS',
                description: 'Complete the registration form.',
                color: '#343D0F', // Deep Green
                bg: techImg.src,
                overlayDefault: 'linear-gradient(to bottom, rgba(52, 61, 15, 0.85), rgba(10, 12, 3, 0.95))',
                overlayHover: 'linear-gradient(to bottom, rgba(52, 61, 15, 0.75), rgba(10, 12, 3, 0.9))',
                gridClasses: 'col-span-12 md:col-span-6 lg:col-span-5 lg:h-[360px] md:h-[340px]',
              },
              {
                step: '03',
                title: 'SHOWCASE YOUR TALENT',
                description: 'Submit your idea, project, performance, portfolio, recipe or relevant entry.',
                color: '#D55E33', // Warm Orange
                bg: entrepreneurshipImg.src,
                overlayDefault: 'linear-gradient(to bottom, rgba(213, 94, 51, 0.85), rgba(35, 12, 5, 0.95))',
                overlayHover: 'linear-gradient(to bottom, rgba(213, 94, 51, 0.75), rgba(35, 12, 5, 0.9))',
                gridClasses: 'col-span-12 md:col-span-6 lg:col-span-5 lg:h-[360px] md:h-[340px]',
              },
              {
                step: '04',
                title: 'PARTICIPATE & RISE',
                description: 'Enter the evaluation/competition journey and move forward.',
                color: '#CF8A12', // Gold
                bg: culinaryImg.src,
                overlayDefault: 'linear-gradient(to bottom, rgba(207, 138, 18, 0.85), rgba(30, 20, 3, 0.95))',
                overlayHover: 'linear-gradient(to bottom, rgba(207, 138, 18, 0.75), rgba(30, 20, 3, 0.9))',
                gridClasses: 'col-span-12 md:col-span-6 lg:col-span-7 lg:h-[360px] md:h-[340px]',
              }
            ].map((item, idx) => {
              const isHovered = hoveredCard === idx;
              return (
                <div
                  key={item.step}
                  className={`group relative overflow-hidden rounded-sm transition-all duration-500 ease-out flex flex-col justify-between p-8 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#CF8A12] ${item.gridClasses} h-auto min-h-[280px] md:min-h-0`}
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
                    className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out pointer-events-none z-0"
                    style={{
                      backgroundImage: `url(${item.bg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transform: isHovered ? 'scale(1.04) translateY(2px)' : 'scale(1) translateY(0)',
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 transition-all duration-500 ease-out pointer-events-none z-10"
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
                      className={`font-poppins text-xs text-gray-200 leading-relaxed transition-all duration-500 ease-out ${
                        isHovered ? 'max-h-32 opacity-100 translate-y-0 mt-3' : 'max-h-0 opacity-0 translate-y-4 overflow-hidden'
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

      {/* Important Dates Timeline Section */}
      <section id="timeline" className="py-24 bg-[#FDFBF7] border-b border-black/5 scroll-mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-damdaar-gold block font-space">THE ROADMAP</span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold">
              Important Roadmap Dates
            </h2>
            <div className="w-16 h-0.5 bg-damdaar-gold mx-auto mt-4" />
          </div>

          {/* Interactive timeline list */}
          <div className="space-y-8 relative before:absolute before:left-4 md:before:left-1/2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {DAMDAAR_TIMELINE.map((event) => {
              return (
                <div key={event.id} className="relative flex flex-col md:flex-row items-start md:items-center justify-between md:even:flex-row-reverse gap-4">
                  {/* Timeline bullet dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-damdaar-gold z-10 flex items-center justify-center">
                    {event.status === 'current' && <span className="w-1.5 h-1.5 rounded-full bg-damdaar-gold animate-ping" />}
                  </div>

                  {/* Empty side space for desktop grid balancing */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Date Card Panel */}
                  <div className="w-full md:w-[45%] pl-10 md:pl-0">
                    <div className="bg-white border border-black/5 rounded-sm p-6 shadow-sm space-y-2 hover:border-damdaar-gold/30 transition-all duration-200">
                      <div className="flex items-center gap-2 text-xs font-semibold text-damdaar-gold font-space">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{event.date}</span>
                      </div>
                      <h4 className="font-playfair text-lg font-bold text-institutional-dark">{event.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-poppins">{event.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Participate Section */}
      <section className="py-24 bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-damdaar-gold block font-space">THE REWARDS</span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold">
              Why Participate in Damdaar Odisha?
            </h2>
            <div className="w-16 h-0.5 bg-damdaar-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1 */}
            <div className="space-y-3 text-center md:text-left bg-[#FDFBF7] p-6 border border-black/5 rounded-sm">
              <div className="w-10 h-10 rounded-full bg-damdaar-gold/10 text-damdaar-gold flex items-center justify-center mx-auto md:mx-0">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-playfair text-lg font-bold">Research Grants</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-poppins">
                Financial support and infrastructure stipends for promising projects and developmental innovations.
              </p>
            </div>

            {/* 2 */}
            <div className="space-y-3 text-center md:text-left bg-[#FDFBF7] p-6 border border-black/5 rounded-sm">
              <div className="w-10 h-10 rounded-full bg-damdaar-gold/10 text-damdaar-gold flex items-center justify-center mx-auto md:mx-0">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-playfair text-lg font-bold">Mentorship Access</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-poppins">
                Direct exposure to top startup mentors, institutional administrators, tech executives, and master chefs.
              </p>
            </div>

            {/* 3 */}
            <div className="space-y-3 text-center md:text-left bg-[#FDFBF7] p-6 border border-black/5 rounded-sm">
              <div className="w-10 h-10 rounded-full bg-damdaar-gold/10 text-damdaar-gold flex items-center justify-center mx-auto md:mx-0">
                <Star className="w-5 h-5" />
              </div>
              <h4 className="font-playfair text-lg font-bold">Global Exposure</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-poppins">
                Showcase opportunities in national conventions, corporate platforms, and cultural exchange summits.
              </p>
            </div>

            {/* 4 */}
            <div className="space-y-3 text-center md:text-left bg-[#FDFBF7] p-6 border border-black/5 rounded-sm">
              <div className="w-10 h-10 rounded-full bg-damdaar-gold/10 text-damdaar-gold flex items-center justify-center mx-auto md:mx-0">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-playfair text-lg font-bold">Trust Endorsement</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-poppins">
                Validation by the prestigious Ruchi Prativa Foundation, serving as a gateway to commercial and academic ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-28 bg-[#121824] text-white relative overflow-hidden">
        {/* Subtle Background radial overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,138,18,0.08),transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
          <span className="text-[10px] uppercase tracking-widest font-bold text-damdaar-gold block font-space">JOIN THE MOVEMENT</span>
          
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mx-auto">
            The next chapter of Odisha starts with you.
          </h2>

          <p className="font-poppins text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
            Choose your domain, complete the registration framework, and showcase your talent to the region.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center items-center">
            <a
              href="#domains"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold text-institutional-dark bg-damdaar-gold hover:bg-damdaar-gold/95 rounded-sm shadow-md transition-colors duration-200 flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-damdaar-gold whitespace-nowrap min-h-[44px]"
            >
              <span>Register Now</span>
              <Check className="w-4 h-4" />
            </a>
            <a
              href="#domains"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold text-white hover:text-damdaar-gold uppercase tracking-widest border border-white/20 hover:border-damdaar-gold/40 rounded-sm transition-colors duration-200 flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap min-h-[44px]"
            >
              <span>Explore Domains</span>
            </a>
          </div>

          {/* Simple Vector convergence symbol element centered */}
          <div className="pt-10 flex justify-center opacity-40">
            <svg viewBox="0 0 100 100" className="w-16 h-16">
              <path d="M 15 50 A 35 35 0 1 0 85 50" stroke="#CF8A12" strokeWidth="2.5" fill="none" />
              <circle cx="50" cy="50" r="6" fill="#CF8A12" />
            </svg>
          </div>
        </div>
      </section>

      {/* 03. Global Footer */}
      <Footer />
    </div>
  );
};

export default DamdaarOdiaPage;
