'use client';

import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    title: 'Discover',
    description: 'Explore our programmes and initiatives.',
  },
  {
    title: 'Choose',
    description: 'Find the journey that aligns with your goals.',
  },
  {
    title: 'Connect',
    description: 'Reach out to the Foundation team.',
  },
  {
    title: 'Participate',
    description: 'Engage actively in community events.',
  },
  {
    title: 'Create Impact',
    description: 'Leave a lasting mark on society.',
  },
];

export const HowParticipationWorks: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-[#121824] border-b border-gray-200 dark:border-white/10 overflow-hidden">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold block mb-4">
            The Process
          </span>
          <h2 className="font-cormorant text-4xl lg:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            How Participation Works
          </h2>
        </div>

        {/* Desktop Horizontal Journey / Mobile Vertical Journey */}
        <div className="relative mt-12 lg:mt-24">
          {/* Connecting Line */}
          <div className="absolute top-0 bottom-0 left-[23px] lg:left-0 lg:top-[23px] lg:bottom-auto w-[2px] lg:w-full lg:h-[2px] bg-gray-200 dark:bg-white/10" />

          <div className="flex flex-col lg:flex-row justify-between relative gap-12 lg:gap-6">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative flex lg:flex-col items-start lg:items-center gap-6 lg:gap-8 lg:flex-1 lg:text-center group"
              >
                {/* Node */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-white dark:bg-[#121824] border-2 border-gray-200 dark:border-white/20 flex items-center justify-center shrink-0 group-hover:border-institutional-accent transition-colors duration-300">
                  <div className="w-3 h-3 rounded-full bg-institutional-accent/40 group-hover:bg-institutional-accent transition-colors duration-300" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-cormorant text-2xl font-bold tracking-tight text-institutional-dark dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="font-manrope text-sm text-gray-600 dark:text-gray-400 max-w-[200px] lg:mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
