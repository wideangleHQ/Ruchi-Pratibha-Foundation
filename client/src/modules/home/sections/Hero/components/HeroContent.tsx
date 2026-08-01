'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useHeroAnimation } from '../hooks/useHeroAnimation';
import { HERO_CONTENT } from '../constants';

export const HeroContent: React.FC = () => {
  const { containerVariants, itemVariants } = useHeroAnimation();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 max-w-[85%] sm:max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center my-auto pt-10 sm:pt-28 pb-6 sm:pb-20"
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
        className="font-cormorant text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6 sm:mb-8"
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
        className="font-manrope text-sm sm:text-lg md:text-xl text-gray-300 max-w-[90%] sm:max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal"
      >
        {HERO_CONTENT.description}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
      >
        <a
          href="#legacy"
          className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-lg text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent focus-visible:ring-offset-2 whitespace-nowrap"
        >
          {HERO_CONTENT.primaryCta}
        </a>
        <a
          href="#volunteer"
          className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-xs uppercase tracking-widest font-space font-semibold text-white border border-white/20 hover:border-institutional-accent hover:text-institutional-accent transition-colors duration-200 rounded-sm text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent focus-visible:ring-offset-2 whitespace-nowrap"
        >
          {HERO_CONTENT.secondaryCta}
        </a>
      </motion.div>
    </motion.div>
  );
};
