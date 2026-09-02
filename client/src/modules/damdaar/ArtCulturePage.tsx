'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { ArrowRight, ArrowLeft, Trophy, Sparkles, Palette, Heart, Share2, CheckCircle2 } from 'lucide-react';
import { Navigation } from '@/modules/home/sections/Navigation';
import dumdaarLogo from '@/assets/Dumdaar Odia Png.png';
import artCultureImg from '@/assets/Categories/Art and Culture.png';

const REGISTRATION_URL = 'https://forms.gle/PtUkn5CSBdu5bD1T6';

export const ArtCulturePage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInVariant: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="w-full bg-[#FDFBF7] text-[#343D0F] font-poppins relative selection:bg-[#CF8A12] selection:text-white overflow-x-hidden">
      {/* GLOBAL NAVIGATION HEADER */}
      <Navigation />

      {/* ================================================== */}
      {/* SECTION 01 — HERO (100VH DESKTOP & MOBILE)        */}
      {/* ================================================== */}
      <section className="relative w-full h-dvh max-h-dvh flex flex-col justify-between items-center pt-16 sm:pt-20 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] z-10 overflow-hidden border-b border-black/5">
        {/* Subtle Cultural Background Accents */}
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#CF8A12]/10 blur-3xl" />
          <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-[#B1320A]/10 blur-3xl" />
        </div>

        {/* Hero Content Center Locked */}
        <div className="relative z-10 max-w-5xl mx-auto w-full my-auto flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 md:space-y-5">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#343D0F] text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase font-space shadow-xs"
          >
            <Image
              src={dumdaarLogo}
              alt="Dumdaar Odia Logo"
              width={16}
              height={16}
              className="w-3.5 sm:w-4 h-3.5 sm:h-4 object-contain shrink-0"
            />
            <span>DUMDAAR ODIA • ART &amp; CULTURE</span>
          </motion.div>

          {/* Main Title & Supporting Line */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-1 sm:space-y-2 select-none"
          >
            <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#343D0F] leading-tight uppercase">
              ART &amp; <br className="hidden sm:inline" />
              CULTURE
            </h1>
            <p className="font-playfair italic text-xs sm:text-base lg:text-lg font-bold text-[#CF8A12] uppercase tracking-wider">
              CELEBRATE YOUR TALENT. REPRESENT YOUR CULTURE.
            </p>
          </motion.div>

          {/* Short Description */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-poppins text-xs sm:text-sm text-gray-700 max-w-lg leading-relaxed px-2"
          >
            &ldquo;An opportunity to showcase the creativity, traditions and artistic spirit of Odisha.&rdquo;
          </motion.p>

          {/* Hero Feature Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md h-32 sm:h-40 rounded-xl overflow-hidden shadow-md border border-[#CF8A12]/30 group shrink-0 my-1"
          >
            <Image
              src={artCultureImg}
              alt="Art and Culture of Odisha"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              priority
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-white">
              <span className="font-playfair text-xs sm:text-sm font-bold tracking-wide">
                Heritage &amp; Performing Arts
              </span>
              <Palette className="w-4 h-4 text-[#CF8A12]" />
            </div>
          </motion.div>

          {/* Primary CTA & Back Link */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-row items-center justify-center gap-3 pt-1"
          >
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 text-xs sm:text-sm font-bold text-white bg-[#CF8A12] hover:bg-[#B7780E] transition-all duration-300 font-space uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg min-h-[44px]"
            >
              <span>START REGISTRATION</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/damdaar-odia#domains"
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 text-xs font-bold text-[#343D0F] hover:text-[#CF8A12] bg-white/80 hover:bg-white border border-[#343D0F]/20 transition-all duration-300 font-space uppercase tracking-wider rounded-lg shadow-2xs min-h-[44px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="z-10 pb-1 text-center select-none opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-space font-bold uppercase tracking-widest text-[#343D0F]">
            Scroll to explore
          </span>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 02 — SHOW YOUR TALENT                      */}
      {/* ================================================== */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-black/5 relative">
        <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
          {/* Section Header */}
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="text-center space-y-2"
          >
            <span className="text-xs uppercase tracking-widest font-bold text-[#CF8A12] block font-space">
              SHOW YOUR TALENT
            </span>
            <h2 className="font-playfair text-2xl sm:text-4xl font-extrabold text-[#343D0F] uppercase tracking-tight">
              YOUR TALENT. YOUR CULTURE.
            </h2>
            <div className="w-16 h-0.5 bg-[#CF8A12] mx-auto mt-3" />
          </motion.div>

          {/* 3 Core Pillars Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* 01. CREATE */}
            <motion.div
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.1 }}
              className="bg-[#FDFBF7] rounded-xl p-6 border border-[#343D0F]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#343D0F] text-[#CF8A12] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <Palette className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold font-space text-[#CF8A12] tracking-widest uppercase block">
                  01 • EXPRESSION
                </span>
                <h3 className="font-playfair text-xl font-bold text-[#343D0F] uppercase">
                  CREATE
                </h3>
                <p className="font-poppins text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Perform, create or showcase your artistic talent.
                </p>
              </div>
              <div className="pt-2 border-t border-black/5 text-[10px] font-space text-gray-400 font-semibold uppercase">
                Traditional &amp; Performing Arts
              </div>
            </motion.div>

            {/* 02. CELEBRATE */}
            <motion.div
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.2 }}
              className="bg-[#FDFBF7] rounded-xl p-6 border border-[#D55E33]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#B1320A] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold font-space text-[#D55E33] tracking-widest uppercase block">
                  02 • HERITAGE
                </span>
                <h3 className="font-playfair text-xl font-bold text-[#343D0F] uppercase">
                  CELEBRATE
                </h3>
                <p className="font-poppins text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Bring Odisha&apos;s culture and traditions to the forefront.
                </p>
              </div>
              <div className="pt-2 border-t border-black/5 text-[10px] font-space text-gray-400 font-semibold uppercase">
                Cultural Legacy &amp; Pride
              </div>
            </motion.div>

            {/* 03. SHARE */}
            <motion.div
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.3 }}
              className="bg-[#FDFBF7] rounded-xl p-6 border border-[#4D6B1F]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#4D6B1F] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold font-space text-[#4D6B1F] tracking-widest uppercase block">
                  03 • REACH
                </span>
                <h3 className="font-playfair text-xl font-bold text-[#343D0F] uppercase">
                  SHARE
                </h3>
                <p className="font-poppins text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Present your creativity to a wider audience.
                </p>
              </div>
              <div className="pt-2 border-t border-black/5 text-[10px] font-space text-gray-400 font-semibold uppercase">
                State &amp; National Recognition
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 03 — WINNING REWARDS                      */}
      {/* ================================================== */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] border-b border-black/5 relative">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-2"
          >
            <span className="text-xs uppercase tracking-widest font-bold text-[#CF8A12] block font-space">
              HONOURS &amp; RECOGNITION
            </span>
            <h2 className="font-playfair text-2xl sm:text-4xl font-extrabold text-[#343D0F] uppercase tracking-tight max-w-2xl mx-auto">
              WINNER TAKES HOME MORE THAN RECOGNITION.
            </h2>
          </motion.div>

          {/* Premium Highlighted Reward Card Container */}
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.15 }}
            className="w-full bg-[#343D0F] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#CF8A12]/40 flex flex-col items-center justify-center space-y-6 relative overflow-hidden"
          >
            {/* Subtle Gold Glow Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#CF8A12]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 text-[#CF8A12]">
              <Trophy className="w-6 h-6 shrink-0" />
              <span className="font-space text-xs sm:text-sm font-extrabold uppercase tracking-widest">
                GRAND RECOGNITION
              </span>
              <Sparkles className="w-5 h-5 shrink-0" />
            </div>

            {/* Main Statement */}
            <div className="space-y-2 max-w-xl">
              <h3 className="font-playfair text-xl sm:text-3xl font-bold tracking-tight text-white uppercase leading-snug">
                WINNER WILL GET A <span className="text-[#CF8A12]">DUMDAAR ODIA TROPHY</span> AND EXCITING PRIZES
              </h3>
            </div>

            {/* Clean Reward Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg pt-2">
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/15 flex flex-col items-center justify-center space-y-1">
                <Trophy className="w-6 h-6 text-[#CF8A12] mb-1" />
                <span className="text-[10px] font-space text-gray-300 uppercase tracking-widest font-bold">
                  OFFICIAL FELICITATION
                </span>
                <span className="text-sm font-bold text-white uppercase font-space">
                  DUMDAAR ODIA TROPHY
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/15 flex flex-col items-center justify-center space-y-1">
                <Sparkles className="w-6 h-6 text-[#CF8A12] mb-1" />
                <span className="text-[10px] font-space text-gray-300 uppercase tracking-widest font-bold">
                  SPECIAL HONOURS
                </span>
                <span className="text-sm font-bold text-white uppercase font-space">
                  EXCITING PRIZES
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 04 — HOW TO PARTICIPATE + CTA               */}
      {/* ================================================== */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-4xl mx-auto space-y-10 text-center">
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-2"
          >
            <span className="text-xs uppercase tracking-widest font-bold text-[#CF8A12] block font-space">
              PARTICIPATION STEPS
            </span>
            <h2 className="font-playfair text-2xl sm:text-4xl font-extrabold text-[#343D0F] uppercase tracking-tight">
              READY TO SHOW YOUR TALENT?
            </h2>
            <div className="w-16 h-0.5 bg-[#CF8A12] mx-auto mt-3" />
          </motion.div>

          {/* 3-Step Visual Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Step 1 */}
            <motion.div
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.1 }}
              className="p-5 rounded-xl bg-[#FDFBF7] border border-black/5 relative space-y-2 shadow-2xs"
            >
              <span className="font-space font-extrabold text-2xl sm:text-3xl text-[#CF8A12]">
                01
              </span>
              <h3 className="font-playfair text-base font-bold text-[#343D0F] uppercase">
                REGISTER
              </h3>
              <p className="font-poppins text-xs text-gray-600 leading-relaxed">
                Fill in your details through the official Google Form.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-xl bg-[#FDFBF7] border border-black/5 relative space-y-2 shadow-2xs"
            >
              <span className="font-space font-extrabold text-2xl sm:text-3xl text-[#D55E33]">
                02
              </span>
              <h3 className="font-playfair text-base font-bold text-[#343D0F] uppercase">
                SHARE YOUR TALENT
              </h3>
              <p className="font-poppins text-xs text-gray-600 leading-relaxed">
                Provide the required information/material through the registration form.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.3 }}
              className="p-5 rounded-xl bg-[#FDFBF7] border border-black/5 relative space-y-2 shadow-2xs"
            >
              <span className="font-space font-extrabold text-2xl sm:text-3xl text-[#4D6B1F]">
                03
              </span>
              <h3 className="font-playfair text-base font-bold text-[#343D0F] uppercase">
                GET RECOGNISED
              </h3>
              <p className="font-poppins text-xs text-gray-600 leading-relaxed">
                Your submission enters the Art &amp; Culture participation process.
              </p>
            </motion.div>
          </div>

          {/* Strong Final Registration CTA */}
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.35 }}
            className="pt-4 flex flex-col items-center justify-center space-y-3"
          >
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#CF8A12] hover:bg-[#B7780E] transition-all duration-300 font-space uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg min-h-[46px]"
            >
              <span>START REGISTRATION</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <p className="font-poppins text-xs text-gray-500 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4D6B1F]" />
              <span>Register through the official DUMDAAR ODIA Art &amp; Culture form.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER BAR */}
      <footer className="w-full py-3 px-4 text-center text-[10px] font-space text-gray-500 border-t border-black/5 bg-[#FDFBF7] relative z-10">
        <span>© {new Date().getFullYear()} DUMDAAR ODIA • RUCHI PRATIVA FOUNDATION</span>
      </footer>
    </div>
  );
};

export default ArtCulturePage;
