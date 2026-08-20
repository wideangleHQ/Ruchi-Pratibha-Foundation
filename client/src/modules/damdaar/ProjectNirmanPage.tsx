'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Cpu, FileText, CheckCircle2, ArrowDown, Upload, ShieldCheck, Award } from 'lucide-react';
import { Navigation } from '@/modules/home/sections/Navigation';
import { Footer } from '@/modules/home/sections/Footer';
import techImg from '@/assets/Categories/Tech .png';
import damdaarBg from '@/assets/Damdaar Odia Background.png';
import { PROJECT_NIRMAN_REGISTRATION_URL } from './constants/projectNirmanConfig';

// ----------------------------------------------------------------------
// DATA DEFINITIONS (SIMPLIFIED 4-SECTION FLOW)
// ----------------------------------------------------------------------

const SUBMISSION_CARDS = [
  {
    num: '01',
    title: 'PROJECT DETAILS',
    desc: 'Your project name, concept and key details.',
    image: techImg.src,
  },
  {
    num: '02',
    title: 'ABOUT YOUR PROJECT',
    desc: 'Explain the problem, solution and what makes your project meaningful.',
    image: techImg.src,
  },
  {
    num: '03',
    title: 'PROJECT IMAGES / PRESENTATION',
    desc: 'Upload your project presentation as PPT or PDF (Maximum file size: 100 MB).',
    image: techImg.src,
  },
];

const REVIEW_FLOW_STEPS = [
  { step: '01', label: 'SUBMIT', desc: 'Submit your project details' },
  { step: '02', label: 'PROFESSIONAL REVIEW', desc: 'Evaluated by professionals' },
  { step: '03', label: 'SELECTED PROJECTS', desc: 'Identified for backing' },
  { step: '04', label: 'FUNDING + SUPPORT', desc: 'Receive funding & development' },
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
      {/* GLOBAL NAVIGATION */}
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
                </motion.div>

                {/* Primary Value Proposition Banner */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-4 sm:p-5 rounded-xl bg-damdaar-deepGreen text-white border-2 border-damdaar-gold/50 shadow-lg space-y-1"
                >
                  <h2 className="font-playfair text-xl sm:text-3xl md:text-4xl font-bold text-damdaar-gold leading-tight">
                    WIN ₹30,000/- CASH PRIZE
                  </h2>
                  <p className="font-space text-xs sm:text-base font-semibold uppercase tracking-wider text-gray-200">
                    AND GET FUTURE SUPPORT FOR DEVELOPMENT
                  </p>
                </motion.div>

                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-xs sm:text-sm md:text-base text-gray-700 font-poppins leading-relaxed max-w-xl"
                >
                  Have a technology project worth building? Submit it to Project NIRMAN and let professionals evaluate its potential.
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

              {/* Right Column Image */}
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
        {/* SECTION 02 — WHAT YOU NEED TO SUBMIT */}
        {/* ============================================================ */}
        <section className="py-14 md:py-20 bg-white border-b border-institutional-borderLight">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-damdaar-gold font-space block">
                02 — SUBMISSION REQUIREMENTS
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-institutional-dark">
                JUST SUBMIT YOUR PROJECT.
              </h2>
              <p className="text-gray-600 text-sm sm:text-base font-poppins">
                Tell us about your idea, your project and what you have built.
              </p>
            </div>

            {/* 3 Visual Imagery Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {SUBMISSION_CARDS.map((card) => (
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
                  <div className="p-6 space-y-2">
                    <h3 className="font-space font-bold text-base text-institutional-dark tracking-wide uppercase">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-poppins leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Note & CTA */}
            <div className="p-6 bg-[#FDFBF7] rounded-xl border border-damdaar-gold/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-damdaar-gold shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-gray-700 font-poppins">
                  <strong>Submission Note: </strong>
                  Upload your project details, about and images in PPT or PDF format (maximum 100 MB).
                </p>
              </div>

              <a
                href={PROJECT_NIRMAN_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-damdaar-deepGreen text-white rounded-md text-xs font-space font-bold uppercase tracking-wider hover:bg-damdaar-deepGreen/90 transition-all shadow"
              >
                <Upload className="w-4 h-4 text-damdaar-gold" />
                <span>UPLOAD YOUR PROJECT →</span>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 03 — PROFESSIONAL REVIEW + REWARD */}
        {/* ============================================================ */}
        <section className="py-14 md:py-20 bg-[#FDFBF7] border-b border-institutional-borderLight">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-damdaar-gold font-space block">
                03 — EVALUATION &amp; BACKING
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-institutional-dark">
                YOUR PROJECT. REVIEWED BY PROFESSIONALS.
              </h2>
            </div>

            {/* Prominent Highlighted Statement */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-damdaar-deepGreen text-center shadow-md space-y-2">
              <span className="text-xs font-space font-bold uppercase tracking-widest text-damdaar-gold block">
                SELECTION GUARANTEE
              </span>
              <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-damdaar-deepGreen">
                PROFESSIONALS WILL REVIEW YOUR PROJECT AND FUND THE SELECTED ONES.
              </h3>
            </div>

            {/* Simple Visual Flow */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {REVIEW_FLOW_STEPS.map((item) => (
                <div key={item.step} className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm space-y-2">
                  <span className="w-8 h-8 rounded-full bg-damdaar-deepGreen text-white font-space font-bold text-xs flex items-center justify-center mx-auto">
                    {item.step}
                  </span>
                  <h4 className="font-space font-bold text-xs text-institutional-dark uppercase tracking-wider">
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-poppins">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-xs sm:text-sm text-gray-600 font-poppins italic">
              &ldquo;Selected projects will receive the opportunity to move forward with financial and development support.&rdquo;
            </p>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 04 — FINAL REWARD + CTA */}
        {/* ============================================================ */}
        <section className="py-14 md:py-20 bg-institutional-dark text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-10 relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-damdaar-gold/20 text-damdaar-gold border border-damdaar-gold/40 text-xs font-space font-bold uppercase tracking-widest">
              OFFICIAL REWARD &amp; SUPPORT
            </span>

            {/* Large Typography Reward Display */}
            <div className="space-y-2">
              <p className="font-playfair text-6xl sm:text-7xl lg:text-8xl font-bold text-damdaar-gold tracking-tight">
                ₹30,000/-
              </p>
              <h2 className="font-space text-2xl sm:text-3xl font-bold text-white uppercase tracking-widest">
                CASH PRIZE
              </h2>
              <p className="font-space text-base sm:text-lg font-semibold text-gray-300 uppercase tracking-wider pt-2">
                FUTURE SUPPORT FOR DEVELOPMENT
              </p>
            </div>

            <p className="text-sm text-gray-300 font-poppins max-w-xl mx-auto">
              Selected projects can receive support to take their ideas further.
            </p>

            {/* Primary CTA */}
            <div className="space-y-3">
              <div>
                <a
                  href={PROJECT_NIRMAN_REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-damdaar-gold text-institutional-dark hover:bg-damdaar-gold/90 transition-all rounded-md font-bold text-base tracking-wider uppercase font-space shadow-xl hover:shadow-2xl group"
                >
                  <span>START YOUR REGISTRATION</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <p className="text-xs text-gray-400 font-poppins">
                Submit your project details through the Google Form.
              </p>
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
