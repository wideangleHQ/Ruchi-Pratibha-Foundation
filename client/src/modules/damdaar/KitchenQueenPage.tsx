'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Utensils,
  Crown,
  Trophy,
  Hotel,
  Globe,
  Upload,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Navigation } from '@/modules/home/sections/Navigation';
import { Footer } from '@/modules/home/sections/Footer';
import culinaryImg from '@/assets/Categories/Cooking.png';
import damdaarBg from '@/assets/Damdaar Odia Background.png';
import { KITCHEN_QUEEN_REGISTRATION_URL } from './constants/kitchenQueenConfig';

// ----------------------------------------------------------------------
// DATA DEFINITIONS (UPDATED 4-SECTION FLOW)
// ----------------------------------------------------------------------

const REWARD_CARDS = [
  {
    num: '01',
    category: 'CROWN',
    title: '1 GRAM GOLD-PLATED CROWN',
    subtitle: 'KITCHEN QUEEN CROWN',
    desc: 'Exclusive 1 Gram Gold-Plated Crown honoring the Kitchen Queen winner.',
    icon: Crown,
    highlight: true,
  },
  {
    num: '02',
    category: 'TROPHY',
    title: 'DUMDAAR ODIA TROPHY',
    subtitle: 'OFFICIAL AWARD',
    desc: 'Prestigious institutional trophy celebrating Odia culinary excellence.',
    icon: Trophy,
    highlight: false,
  },
  {
    num: '03',
    category: 'ODISHA',
    title: '2 DAYS STAY IN ODISHA',
    subtitle: 'EXPERIENCE & HOSPITALITY',
    desc: '2 days fully hosted stay in Odisha including travel & hospitality.',
    icon: Hotel,
    highlight: false,
  },
];

const PARTICIPATION_STEPS = [
  {
    step: '01',
    title: 'VISIT THE SITE',
    desc: 'Visit ruchiprativafoundation.org',
  },
  {
    step: '02',
    title: 'VISIT DUMDAAR ODIA',
    desc: 'Open DUMDAAR ODIA and click the Participate button under Kitchen Queen.',
  },
  {
    step: '03',
    title: 'FILL YOUR DETAILS',
    desc: 'Fill your name and required details in the Google Form.',
  },
  {
    step: '04',
    title: 'UPLOAD YOUR RECIPE VIDEO',
    desc: 'Upload/submit your recipe video with your name as instructed in the form.',
  },
];

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

export const KitchenQueenPage: React.FC = () => {
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
            {/* Eyebrow */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-3 md:mb-4 shrink-0"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-damdaar-burntOrange text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase font-space shadow-sm">
                <Utensils className="w-3.5 h-3.5 text-damdaar-gold" />
                RUCHI MASALA • DUMDAAR ODIA
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
                    KITCHEN <br />
                    <span className="text-damdaar-burntOrange">QUEEN</span>
                  </h1>
                  <h2 className="mt-2 font-space text-sm sm:text-base md:text-lg font-bold text-damdaar-gold uppercase tracking-widest">
                    COOK. INSPIRE. BE THE QUEEN.
                  </h2>
                </motion.div>

                {/* Updated Prize Highlight Banner */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-4 sm:p-5 rounded-xl bg-damdaar-deepGreen text-white border-2 border-damdaar-gold/50 shadow-lg space-y-1.5"
                >
                  <span className="text-[10px] font-space font-bold uppercase tracking-widest text-damdaar-gold block">
                    WINNER REWARDS
                  </span>
                  <h3 className="font-playfair text-lg sm:text-2xl md:text-3xl font-bold text-white leading-snug">
                    WIN A <span className="text-damdaar-gold">1 GRAM GOLD-PLATED CROWN</span>
                  </h3>
                  <p className="font-space text-xs sm:text-sm font-semibold text-gray-200 uppercase tracking-wider">
                    + DUMDAAR ODIA TROPHY + 2 DAYS STAY IN ODISHA
                  </p>
                </motion.div>

                {/* Primary CTA */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="pt-1 sm:pt-2 shrink-0"
                >
                  <a
                    href={KITCHEN_QUEEN_REGISTRATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-damdaar-burntOrange text-white hover:bg-damdaar-burntOrange/90 transition-all rounded-md font-semibold text-xs sm:text-sm tracking-wider uppercase font-space shadow-lg hover:shadow-xl group"
                  >
                    <span>START PARTICIPATING</span>
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
                    src={culinaryImg.src}
                    alt="Kitchen Queen Contest"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-institutional-dark/90 via-institutional-dark/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white space-y-1">
                    <span className="text-[10px] sm:text-[11px] font-bold font-space text-damdaar-gold uppercase tracking-widest block">
                      RUCHI MASALA INITIATIVE
                    </span>
                    <h3 className="font-playfair text-lg sm:text-xl font-bold">
                      Global Odia Kitchen Queen
                    </h3>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 02 — WINNING REWARDS */}
        {/* ============================================================ */}
        <section className="py-14 md:py-20 bg-white border-b border-institutional-borderLight">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-damdaar-gold font-space block">
                02 — PRIZES &amp; RECOGNITION
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-institutional-dark">
                WINNER WILL GET
              </h2>
            </div>

            {/* 3 Premium Reward Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {REWARD_CARDS.map((card) => {
                const IconComp = card.icon;
                return (
                  <div
                    key={card.num}
                    className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                      card.highlight
                        ? 'bg-institutional-dark text-white border-damdaar-gold shadow-xl relative overflow-hidden'
                        : 'bg-[#FDFBF7] text-institutional-dark border-gray-200 shadow-sm'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-space font-bold uppercase tracking-widest px-3 py-1 rounded ${
                            card.highlight
                              ? 'bg-damdaar-gold text-institutional-dark'
                              : 'bg-damdaar-burntOrange/10 text-damdaar-burntOrange'
                          }`}
                        >
                          CARD {card.num} • {card.category}
                        </span>
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            card.highlight
                              ? 'bg-damdaar-gold/20 text-damdaar-gold'
                              : 'bg-damdaar-burntOrange/10 text-damdaar-burntOrange'
                          }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                      </div>

                      <div>
                        <h3
                          className={`font-playfair font-bold text-2xl ${
                            card.highlight ? 'text-damdaar-gold' : 'text-institutional-dark'
                          }`}
                        >
                          {card.title}
                        </h3>
                        <p
                          className={`text-xs font-space uppercase tracking-wider font-semibold mt-1 ${
                            card.highlight ? 'text-gray-300' : 'text-damdaar-burntOrange'
                          }`}
                        >
                          {card.subtitle}
                        </p>
                      </div>

                      <p
                        className={`text-xs font-poppins leading-relaxed ${
                          card.highlight ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-200/20 text-[10px] font-space text-damdaar-gold uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Official Winner Reward</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 03 — HOW TO PARTICIPATE */}
        {/* ============================================================ */}
        <section className="py-14 md:py-20 bg-[#FDFBF7] border-b border-institutional-borderLight">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-damdaar-gold font-space block">
                03 — PARTICIPATION STEPS
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-institutional-dark">
                HOW TO PARTICIPATE
              </h2>
            </div>

            {/* 4-step visual flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PARTICIPATION_STEPS.map((item, idx) => (
                <div
                  key={item.step}
                  className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-3 relative group"
                >
                  <div className="w-10 h-10 rounded-full bg-damdaar-burntOrange text-white font-space font-bold text-xs flex items-center justify-center shadow-sm">
                    {item.step}
                  </div>
                  <h3 className="font-space text-sm sm:text-base font-bold text-institutional-dark uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-poppins leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Video Submission Note */}
            <div className="p-6 bg-white rounded-xl border border-damdaar-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-damdaar-burntOrange shrink-0" />
                <p className="text-xs sm:text-sm text-gray-700 font-poppins">
                  <strong>JUST UPLOAD YOUR RECIPE VIDEO: </strong>
                  Submit your recipe video with your name through the official Google Form.
                </p>
              </div>

              <a
                href={KITCHEN_QUEEN_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-damdaar-burntOrange text-white rounded-md text-xs font-space font-bold uppercase tracking-wider hover:bg-damdaar-burntOrange/90 transition-all shadow"
              >
                <span>PARTICIPATE NOW →</span>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 04 — FINAL CTA */}
        {/* ============================================================ */}
        <section className="py-14 md:py-20 bg-institutional-dark text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-8 relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-damdaar-gold/20 text-damdaar-gold border border-damdaar-gold/40 text-xs font-space font-bold uppercase tracking-widest">
              OFFICIAL CALL FOR ENTRY
            </span>

            <div className="space-y-2">
              <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                COOK. INSPIRE. BE THE QUEEN.
              </h2>
              <p className="text-gray-300 text-base sm:text-lg font-poppins">
                Ready to showcase your recipe?
              </p>
            </div>

            <div>
              <a
                href={KITCHEN_QUEEN_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-damdaar-gold text-institutional-dark hover:bg-damdaar-gold/90 transition-all rounded-md font-bold text-base tracking-wider uppercase font-space shadow-xl hover:shadow-2xl group"
              >
                <span>PARTICIPATE NOW</span>
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

export default KitchenQueenPage;
