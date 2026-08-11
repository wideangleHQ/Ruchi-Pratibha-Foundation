'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useHeroAnimation } from '../hooks/useHeroAnimation';
import { HERO_CONTENT } from '../constants';

export const HeroContent: React.FC = () => {
  const { containerVariants, itemVariants } = useHeroAnimation();

  return (
    <div className="relative z-10 w-full h-full flex items-end px-6 sm:px-8 lg:px-12 xl:px-16 pb-12 sm:pb-16 lg:pb-20">
      <div className="max-w-[1500px] w-full mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
        {/* Left: Text Content Block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start max-w-[70%] sm:max-w-full lg:max-w-[65%]"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-6">
            <span className="h-[1px] w-8 bg-institutional-accent/60" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              {HERO_CONTENT.eyebrow}
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent/60" />
          </motion.div>

          {/* Editorial Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-cormorant text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6"
          >
            {HERO_CONTENT.heading.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < 2 && <br className="hidden sm:inline" />}
              </React.Fragment>
            ))}
          </motion.h1>

          {/* Supporting Paragraph */}
          <motion.p
            variants={itemVariants}
            className="font-manrope text-sm sm:text-base lg:text-lg text-gray-300 max-w-full sm:max-w-2xl leading-relaxed font-normal"
          >
            {HERO_CONTENT.description}
          </motion.p>
        </motion.div>

        {/* Right: CTA Buttons */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3.5 w-[70%] sm:w-full lg:w-auto lg:min-w-[280px]"
        >
          <a
            href="/coming-soon"
            className="w-full px-6 py-3 sm:px-8 sm:py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-lg text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent focus-visible:ring-offset-2 whitespace-nowrap"
          >
            {HERO_CONTENT.primaryCta}
          </a>
          <a
            href="/get-involved/volunteer"
            className="w-full px-6 py-3 sm:px-8 sm:py-4 text-xs uppercase tracking-widest font-space font-semibold text-white border border-white/20 hover:border-institutional-accent hover:text-institutional-accent transition-colors duration-200 rounded-sm text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent focus-visible:ring-offset-2 whitespace-nowrap"
          >
            {HERO_CONTENT.secondaryCta}
          </a>
        </motion.div>
      </div>
    </div>
  );
};
