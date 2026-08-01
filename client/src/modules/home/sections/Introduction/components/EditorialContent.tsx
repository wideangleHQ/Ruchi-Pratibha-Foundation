'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEditorialAnimation } from '../hooks/useEditorialAnimation';
import { EDITORIAL_CONTENT } from '../constants';

export const EditorialContent: React.FC = () => {
  const { fadeInVariants } = useEditorialAnimation();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeInVariants}
      className="flex flex-col items-center lg:items-start text-center lg:text-left justify-center max-w-xl xl:max-w-2xl mx-auto lg:mx-0 py-4 lg:py-0"
    >
      {/* Eyebrow badge */}
      <div className="inline-flex items-center gap-3 mb-5 justify-center lg:justify-start">
        <span className="h-[1px] w-8 bg-institutional-accent" />
        <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
          {EDITORIAL_CONTENT.eyebrow}
        </span>
        <span className="h-[1px] w-8 bg-institutional-accent lg:hidden" />
      </div>

      {/* Main Title */}
      <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-institutional-dark dark:text-white mb-6 lg:mb-8 leading-[1.12]">
        {EDITORIAL_CONTENT.heading}
      </h2>

      {/* Narrative Paragraphs */}
      <div className="space-y-4 lg:space-y-5 font-manrope text-sm sm:text-base lg:text-lg text-institutional-mutedLight dark:text-gray-300 leading-relaxed lg:leading-relaxed mb-8 lg:mb-10">
        {EDITORIAL_CONTENT.paragraphs.map((paragraph, index) => (
          <p key={index} className="tracking-normal">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Action Button */}
      <div>
        <a
          href="#story"
          className="group inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark dark:text-white border border-institutional-dark dark:border-white/30 hover:bg-institutional-dark hover:text-white dark:hover:bg-white dark:hover:text-institutional-dark transition-all duration-300 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent focus-visible:ring-offset-2 whitespace-nowrap shadow-sm hover:shadow-md"
        >
          <span>{EDITORIAL_CONTENT.ctaLabel}</span>
          <ArrowRight className="w-4 h-4 text-institutional-accent group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />
        </a>
      </div>
    </motion.div>
  );
};
