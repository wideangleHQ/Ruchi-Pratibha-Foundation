'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { InteractiveImage } from '@/components/ui/InteractiveImage';
import { useEditorialAnimation } from '../hooks/useEditorialAnimation';

export const EditorialImageContainer: React.FC = () => {
  const { imageVariants } = useEditorialAnimation();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={imageVariants}
      className="relative w-full max-w-[290px] sm:max-w-md mx-auto lg:max-w-none flex justify-center items-center"
    >
      <div className="relative w-full max-h-[380px] sm:max-h-[520px] lg:max-h-[540px] xl:max-h-[600px] aspect-[4/5] rounded-sm bg-white dark:bg-institutional-surface/40 border border-institutional-dark/15 dark:border-white/15 p-2 sm:p-2.5 shadow-xl hover:shadow-2xl hover:border-institutional-accent transition-all duration-500 ease-out">
        <InteractiveImage className="w-full h-full rounded-sm">
          <Image
            src="/CSR Activites/Odia Bazar/DSC05968.webp"
            alt="Ruchi Prativa Foundation CSR Event - Odia Bazar"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
            className="object-cover object-center rounded-sm"
            priority
          />

          {/* Decorative Corner Accent Frames */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-institutional-accent/80 z-20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-institutional-accent/80 z-20 pointer-events-none" />

          {/* Top Header Badge */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <span className="text-[10px] uppercase tracking-widest font-space text-white/90 font-semibold bg-black/50 backdrop-blur-md px-3 py-1 rounded-sm border border-white/20 shadow-sm">
              Living Archive
            </span>
            <span className="text-[10px] uppercase tracking-widest font-space text-institutional-accent bg-black/70 backdrop-blur-md border border-institutional-accent/40 px-3 py-1 rounded-sm font-semibold shadow-sm">
              1997 – Present
            </span>
          </div>

          {/* Bottom Editorial Caption Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-1 pointer-events-none">
            <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-white tracking-tight">
              Odisha’s Cultural Heritage &amp; Hope
            </h3>
            <div className="flex items-center justify-between text-[10px] font-space tracking-wider text-gray-300 pt-1.5 border-t border-white/20">
              <span>Three Decades of Impact</span>
              <span className="text-institutional-accent font-semibold">
                Ruchi Prativa Foundation
              </span>
            </div>
          </div>
        </InteractiveImage>
      </div>
    </motion.div>
  );
};
