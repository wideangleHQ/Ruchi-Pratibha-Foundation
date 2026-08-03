'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const AboutHero: React.FC = () => {
  return (
    <section id="about-hero" className="relative z-10 pt-28 sm:pt-36 pb-16 sm:pb-24 bg-institutional-dark text-white border-b border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="h-[1px] w-8 bg-institutional-accent/60" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Since 1997
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent/60" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.12] mb-4 sm:mb-6"
          >
            About Ruchi Prativa Foundation
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-cormorant text-xl sm:text-3xl font-semibold text-institutional-accent mb-6 sm:mb-8 tracking-tight"
          >
            Three Decades of Service, Recognition &amp; Cultural Legacy
          </motion.h2>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-manrope text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed mb-8 sm:mb-10 font-normal"
          >
            Founded in <strong>1997</strong>, Ruchi Prativa Foundation has grown into one of Odisha&apos;s respected philanthropic and cultural institutions, honouring excellence while nurturing education, literature, heritage, and community welfare.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 sm:mb-16"
          >
            <a
              href="#about-foundation"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-lg text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent"
            >
              <span>Explore Our Journey</span>
              <ArrowDown className="w-4 h-4 text-institutional-dark" />
            </a>
          </motion.div>
        </div>

        {/* Large Editorial Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-5xl mx-auto relative rounded-sm overflow-hidden border border-white/15 bg-white/5 shadow-2xl"
        >
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full flex flex-col items-center justify-center p-8 text-center relative bg-gradient-to-br from-institutional-surface/80 via-institutional-dark to-institutional-darker">
            {/* Subtle background grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(197,160,89,0.1)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

            <div className="relative z-10 flex flex-col items-center max-w-lg">
              <span className="text-xs font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold mb-2">
                [ Image Placeholder ]
              </span>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white mb-2">
                Historical Foundation Inauguration &amp; Trustees Assembly (1997)
              </h3>
              <p className="font-manrope text-xs text-gray-400 leading-relaxed">
                Archival documentation from the founding ceremony in Odisha • TODO: Replace with high-resolution archival photograph from Amaruchi publication repository.
              </p>
            </div>

            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[10px] font-space text-gray-400 border-t border-white/10 pt-3">
              <span>ARCHIVAL ITEM #1997-01</span>
              <span>RUCHI PRATIVA FOUNDATION DIGITAL ARCHIVE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
