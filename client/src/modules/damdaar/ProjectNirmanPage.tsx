'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Cpu, CheckCircle2 } from 'lucide-react';
import { Navigation } from '@/modules/home/sections/Navigation';
import { Footer } from '@/modules/home/sections/Footer';
import techImg from '@/assets/Categories/Tech .png';
import damdaarBg from '@/assets/Damdaar Odia Background.png';
import { PROJECT_NIRMAN_REGISTRATION_URL } from './constants/projectNirmanConfig';

// ----------------------------------------------------------------------
// DATA DEFINITIONS (ULTRA-CONCISE 4-SECTION LAYOUT)
// ----------------------------------------------------------------------

const OPPORTUNITY_CARDS = [
  {
    num: '01',
    title: 'INNOVATION',
    desc: 'Meaningful ideas.',
    image: techImg.src,
  },
  {
    num: '02',
    title: 'TECHNOLOGY',
    desc: 'Build with technology.',
    image: techImg.src,
  },
  {
    num: '03',
    title: 'IMPACT',
    desc: 'Solve real problems.',
    image: techImg.src,
  },
  {
    num: '04',
    title: 'POTENTIAL',
    desc: 'Take the idea further.',
    image: techImg.src,
  },
];

const REWARD_CARDS = [
  {
    num: '01',
    stat: '₹30,000/-',
    title: 'WINNING AMOUNT',
    desc: 'Winner receives ₹30,000/- to support further development of the selected project.',
    highlight: true,
  },
  {
    num: '02',
    stat: 'OFFICIAL AWARD',
    title: 'PROJECT NIRMAN TROPHY',
    desc: 'Recognition through DUMDAAR ODIA.',
    highlight: false,
  },
  {
    num: '03',
    stat: '1-ON-1 GUIDE',
    title: 'PROJECT MANAGER / PROJECT GUIDE',
    desc: 'Dedicated guidance throughout development.',
    highlight: false,
  },
  {
    num: '04',
    stat: 'DEMO & GROWTH',
    title: 'PROJECT DEVELOPMENT & RECOGNITION',
    desc: 'Opportunity to develop and demonstrate the project.',
    highlight: false,
  },
];

const TIMELINE_STEPS = [
  { date: '17 AUG', label: 'APPLICATIONS OPEN' },
  { date: '17–27 AUG', label: 'APPLICATION WINDOW' },
  { date: '28–29 AUG', label: 'SCREENING' },
  { date: '30 AUG', label: 'WINNER ANNOUNCEMENT', highlight: true },
];

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

export const ProjectNirmanPage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-institutional-dark font-poppins relative overflow-x-hidden selection:bg-damdaar-gold selection:text-white">
      {/* GLOBAL HEADER */}
      <Navigation />

      <main>
        {/* ============================================================ */}
        {/* SECTION 01 — HERO (EXACTLY 100VH) */}
        {/* ============================================================ */}
        <section className="relative h-screen min-h-[580px] max-h-[1080px] pt-20 md:pt-24 pb-6 flex flex-col justify-center border-b border-institutional-borderLight overflow-hidden">
          {/* Background motif */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <Image
              src={damdaarBg}
              alt="DUMDAAR ODIA Pattern"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full h-full flex flex-col justify-center relative z-10 py-2">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-3 md:mb-4 shrink-0"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-damdaar-deepGreen text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase font-space">
                <Cpu className="w-3.5 h-3.5 text-damdaar-gold" />
                DUMDAAR ODIA • TECHNOLOGY
              </span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center flex-1 my-auto">
              {/* Left Column Text */}
              <div className="lg:col-span-7 space-y-3 sm:space-y-4 md:space-y-5">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-institutional-dark leading-[0.95]">
                    PROJECT <br />
                    <span className="text-damdaar-deepGreen">NIRMAN</span>
                  </h1>
                  <h2 className="mt-2 font-cormorant text-xl sm:text-2xl md:text-3xl lg:text-4xl italic text-damdaar-gold font-semibold">
                    Technology Innovation Competition
                  </h2>
                </motion.div>

                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="font-cormorant text-lg sm:text-2xl lg:text-3xl text-institutional-dark font-medium italic border-l-4 border-damdaar-gold pl-3 py-0.5"
                >
                  &ldquo;Discover the Idea. Build the Future.&rdquo;
                </motion.p>

                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-xs sm:text-sm md:text-base text-gray-700 font-poppins leading-relaxed max-w-xl"
                >
                  A technology innovation initiative under DUMDAAR ODIA that discovers promising student projects and helps selected innovators take their ideas further.
                </motion.p>

                {/* Primary CTA */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="pt-1 sm:pt-2 shrink-0"
                >
                  <a
                    href={PROJECT_NIRMAN_REGISTRATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-damdaar-deepGreen text-white hover:bg-damdaar-deepGreen/90 transition-all rounded-md font-semibold text-xs sm:text-sm tracking-wider uppercase font-space shadow-lg hover:shadow-xl group"
                  >
                    <span>START REGISTRATION</span>
                    <ArrowRight className="w-4 h-4 text-damdaar-gold group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>

              {/* Right Image */}
              <div className="lg:col-span-5 hidden sm:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-institutional-dark aspect-[16/10] lg:aspect-[4/5] max-h-[220px] sm:max-h-[300px] lg:max-h-[420px] w-full mx-auto"
                >
                  <Image
                    src={techImg.src}
                    alt="Project NIRMAN Technology Innovation"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-institutional-dark/90 via-institutional-dark/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white space-y-1">
                    <span className="text-[10px] sm:text-[11px] font-bold font-space text-damdaar-gold uppercase tracking-widest block">
                      STUDENT INNOVATION HUB
                    </span>
                    <h3 className="font-playfair text-lg sm:text-xl font-bold">
                      Odisha&apos;s Technology Wing
                    </h3>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 02 — THE OPPORTUNITY */}
        {/* ============================================================ */}
        <section className="py-14 md:py-20 bg-white border-b border-institutional-borderLight">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-damdaar-gold font-space block">
                02 — THE OPPORTUNITY
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-institutional-dark">
                BUILD SOMETHING THAT MATTERS.
              </h2>
            </div>

            {/* Visual 4-card layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {OPPORTUNITY_CARDS.map((card) => (
                <div
                  key={card.num}
                  className="group relative rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-[#FDFBF7] flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-institutional-dark">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <span className="absolute top-4 left-4 font-space font-bold text-xs bg-white text-institutional-dark px-2.5 py-1 rounded shadow">
                      {card.num}
                    </span>
                  </div>
                  <div className="p-6 space-y-1">
                    <h3 className="font-space font-bold text-base text-institutional-dark tracking-wide uppercase">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-poppins">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Compact Statement */}
            <div className="pt-4 text-center border-t border-gray-100">
              <p className="font-cormorant text-xl sm:text-2xl italic font-semibold text-damdaar-deepGreen">
                &ldquo;Open to students across colleges and educational institutions throughout Odisha.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 03 — REWARDS & SUPPORT */}
        {/* ============================================================ */}
        <section className="py-14 md:py-20 bg-[#FDFBF7] border-b border-institutional-borderLight">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-damdaar-gold font-space block">
                03 — REWARDS &amp; SUPPORT
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-institutional-dark">
                MORE THAN A PRIZE.
              </h2>
            </div>

            {/* 4 Premium Cards featuring ₹30,000 WINNING AMOUNT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {REWARD_CARDS.map((item) => (
                <div
                  key={item.num}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                    item.highlight
                      ? 'bg-institutional-dark text-white border-damdaar-gold shadow-xl relative overflow-hidden'
                      : 'bg-white text-institutional-dark border-gray-200 shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <span
                      className={`text-[10px] font-space font-bold uppercase tracking-widest px-2.5 py-1 rounded inline-block ${
                        item.highlight
                          ? 'bg-damdaar-gold text-institutional-dark'
                          : 'bg-damdaar-deepGreen/10 text-damdaar-deepGreen'
                      }`}
                    >
                      {item.stat}
                    </span>
                    <h3
                      className={`font-space font-bold ${
                        item.highlight ? 'text-2xl text-damdaar-gold' : 'text-lg text-institutional-dark'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-xs font-poppins leading-relaxed ${
                        item.highlight ? 'text-gray-200' : 'text-gray-600'
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-200/20 text-[10px] font-space text-damdaar-gold uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Selected Innovator Benefit</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtle Further Opportunities Note */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500 font-poppins">
                Potential further opportunities may include mentorship, industry exposure, incubation, partnerships and advanced funding.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 04 — REGISTER / KEY DATES */}
        {/* ============================================================ */}
        <section className="py-14 md:py-20 bg-institutional-dark text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-10 relative z-10">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-damdaar-gold font-space block">
                04 — TIMELINE &amp; REGISTRATION
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                HOW IT WORKS
              </h2>
            </div>

            {/* Simple Visual Timeline */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              {TIMELINE_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border space-y-1.5 ${
                    step.highlight
                      ? 'bg-damdaar-deepGreen border-damdaar-gold text-white'
                      : 'bg-white/5 border-white/10 text-white'
                  }`}
                >
                  <span className="text-xs font-space font-bold text-damdaar-gold block">
                    {step.date}
                  </span>
                  <h3 className="font-space text-xs font-bold tracking-wider uppercase">
                    {step.label}
                  </h3>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-300 font-poppins max-w-xl mx-auto">
              Selected innovators move forward with seed funding and guided project development.
            </p>

            {/* Large CTA */}
            <div>
              <a
                href={PROJECT_NIRMAN_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-damdaar-gold text-institutional-dark hover:bg-damdaar-gold/90 transition-all rounded-md font-bold text-base tracking-wider uppercase font-space shadow-xl hover:shadow-2xl group"
              >
                <span>START REGISTRATION</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* EXISTING FOUNDATION FOOTER */}
      <Footer />
    </div>
  );
};

export default ProjectNirmanPage;
