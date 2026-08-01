'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Landmark } from 'lucide-react';
import { useEditorialAnimation } from '../hooks/useEditorialAnimation';

export const EditorialImageContainer: React.FC = () => {
  const { imageVariants } = useEditorialAnimation();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={imageVariants}
      className="relative w-full max-w-md mx-auto lg:max-w-none flex justify-center items-center"
    >
      <div className="group relative w-full max-h-[480px] sm:max-h-[520px] lg:max-h-[540px] xl:max-h-[600px] aspect-[4/5] rounded-sm bg-white dark:bg-institutional-surface/40 border border-institutional-dark/15 dark:border-white/15 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:border-institutional-accent transition-all duration-500 ease-out">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-10 dark:opacity-15 pointer-events-none transition-opacity duration-500 group-hover:opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(197, 160, 89, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 160, 89, 0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Decorative corner accent frames */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-institutional-accent/60 group-hover:border-institutional-accent transition-colors duration-500" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-institutional-accent/60 group-hover:border-institutional-accent transition-colors duration-500" />

        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest font-space text-institutional-mutedLight dark:text-gray-400 font-semibold">
            Living Archive
          </span>
          <span className="text-[10px] uppercase tracking-widest font-space text-institutional-accent bg-institutional-accent/10 border border-institutional-accent/20 px-2.5 py-1 rounded-sm font-medium">
            1997 – Present
          </span>
        </div>

        {/* Center Emblem Section */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto py-6 sm:py-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-institutional-dark dark:bg-white/10 text-institutional-accent flex items-center justify-center mb-6 shadow-md transition-all duration-500 ease-out group-hover:scale-105 group-hover:bg-institutional-accent group-hover:text-institutional-dark">
            <Landmark className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />
          </div>
          <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-institutional-dark dark:text-white text-center tracking-tight group-hover:text-institutional-accent transition-colors duration-300">
            Odisha’s Cultural Heritage & Hope
          </h3>
          <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 text-center mt-2.5 max-w-xs leading-relaxed">
            Preserving history, honoring excellence, and empowering grassroots communities across the state.
          </p>
        </div>

        {/* Bottom Caption Bar */}
        <div className="relative z-10 pt-4 border-t border-institutional-dark/10 dark:border-white/10 flex items-center justify-between text-[10px] font-space tracking-wider">
          <span className="text-institutional-mutedLight dark:text-gray-400">
            Three Decades of Impact
          </span>
          <span className="text-institutional-accent font-semibold">
            Ruchi Prativa Foundation
          </span>
        </div>
      </div>
    </motion.div>
  );
};
