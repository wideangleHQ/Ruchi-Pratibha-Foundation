'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Trophy, ArrowLeft } from 'lucide-react';
import { Navigation } from '@/modules/home/sections/Navigation';
import dumdaarLogo from '@/assets/Dumdaar Odia Png.png';

export const ProjectNirmanPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-dvh max-h-dvh w-full bg-[#FDFBF7] text-[#343D0F] font-poppins relative overflow-hidden flex flex-col justify-between selection:bg-[#CF8A12] selection:text-white">
      {/* 01. NAVIGATION HEADER */}
      <Navigation />

      {/* 02. MAIN CONTENT CONTAINER (CENTERED & LOCKED TO VIEWPORT ON BEIGE BACKGROUND) */}
      <main className="relative flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 sm:pb-6 max-w-4xl mx-auto w-full z-10 my-auto">
        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 md:space-y-5 w-full my-auto"
        >
          {/* Category Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#343D0F] text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase font-space shadow-sm">
            <Image src={dumdaarLogo} alt="Dumdaar Odia Logo" width={16} height={16} className="w-3.5 sm:w-4 h-3.5 sm:h-4 object-contain shrink-0" />
            <span>DUMDAAR ODIA • TECHNOLOGY WING</span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-1 sm:space-y-1.5 select-none">
            <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#343D0F] leading-none uppercase">
              PROJECT NIRMAN
            </h1>
            <p className="font-playfair italic text-xs sm:text-base lg:text-lg font-bold text-[#CF8A12]">
              &ldquo;Engineering Solutions for Odisha&apos;s Tomorrow&rdquo;
            </p>
          </div>

          {/* High Impact Reward Card */}
          <div className="w-full max-w-2xl bg-[#343D0F] text-white rounded-xl p-4 sm:p-5 shadow-lg border border-[#CF8A12]/30 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2 text-[#CF8A12]">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <span className="font-space text-xs sm:text-sm font-extrabold uppercase tracking-widest">EXCELLENCE AWARD &amp; GRANT</span>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            </div>
            <p className="font-playfair text-lg sm:text-2xl font-bold tracking-tight text-white">
              WIN <span className="text-[#CF8A12]">₹30,000/-</span> CASH PRIZE + FUTURE DEVELOPMENT SUPPORT
            </p>
          </div>

          {/* Concise Key Details / Schedule Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-space font-semibold text-[#343D0F]">
            <span className="px-3 py-1 bg-white/80 border border-[#343D0F]/15 rounded-md shadow-2xs">
              <strong>TARGET:</strong> 150 APPLICATIONS
            </span>
            <span className="px-3 py-1 bg-white/80 border border-[#343D0F]/15 rounded-md shadow-2xs">
              <strong>CLOSING:</strong> 27 AUGUST 2026
            </span>
            <span className="px-3 py-1 bg-white/80 border border-[#343D0F]/15 rounded-md shadow-2xs">
              <strong>WINNER ANNOUNCED:</strong> 30 AUGUST 2026
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-row items-center justify-center gap-3 pt-2">
            <a
              href="https://forms.gle/k4XXUCBEpR4KtsEKA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 text-xs sm:text-sm font-bold text-white bg-[#CF8A12] hover:bg-[#B7780E] transition-all duration-300 font-space uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg min-h-[44px]"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/damdaar-odia#domains"
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 text-xs font-bold text-[#343D0F] hover:text-[#CF8A12] bg-white/70 hover:bg-white border border-[#343D0F]/20 transition-all duration-300 font-space uppercase tracking-wider rounded-lg shadow-2xs min-h-[44px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* 03. FOOTER BAR */}
      <footer className="w-full py-2.5 px-4 text-center text-[10px] font-space text-gray-500 border-t border-black/5 bg-white/50 backdrop-blur-xs relative z-10">
        <span>© {new Date().getFullYear()} DUMDAAR ODIA • RUCHI PRATIVA FOUNDATION</span>
      </footer>
    </div>
  );
};

export default ProjectNirmanPage;
