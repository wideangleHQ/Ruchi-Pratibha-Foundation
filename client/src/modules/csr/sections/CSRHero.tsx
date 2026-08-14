'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const CSRHero: React.FC = () => {
  return (
    <section
      id="csr-hero"
      className="relative z-10 min-h-[90vh] sm:min-h-screen w-full bg-institutional-dark text-white border-b border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28 flex items-end"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(197, 160, 89, 0.25) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-institutional-dark via-transparent to-institutional-dark/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 xl:px-16 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-[1500px] w-full mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
          {/* Left: Text Content Block */}
          <div className="flex flex-col items-start max-w-[70%] sm:max-w-full lg:max-w-[65%]">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="h-[1px] w-8 bg-institutional-accent/60" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
                Our Work • Community Impact
              </span>
              <span className="h-[1px] w-8 bg-institutional-accent/60" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-cormorant text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.12] mb-6"
            >
              Creating Lasting Impact Through Community Action
            </motion.h1>

            {/* Description Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 font-manrope text-sm sm:text-base lg:text-lg text-gray-300 max-w-full sm:max-w-2xl leading-relaxed font-normal"
            >
              <p>
                At <strong>Ruchi Prativa Foundation</strong>, Corporate Social Responsibility is more than a commitment—it is a continuous journey of serving society with compassion, integrity, and purpose. Through initiatives in education, healthcare, environmental conservation, cultural preservation, community welfare, and humanitarian support, we work alongside communities to create opportunities, strengthen lives, and build a more inclusive future.
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                Every activity reflects our belief that meaningful change begins with collective action, responsible leadership, and a shared commitment to social progress.
              </p>
            </motion.div>
          </div>

          {/* Right: Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3.5 w-[70%] sm:w-full lg:w-auto lg:min-w-[280px]"
          >
            <a
              href="/work"
              className="inline-flex items-center justify-center gap-2.5 w-full px-7 py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-md text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent min-h-[44px]"
            >
              <span>Explore Activities</span>
              <ArrowDown className="w-4 h-4 text-institutional-dark" />
            </a>

            <a
              href="/get-involved/volunteer"
              className="inline-flex items-center justify-center gap-2.5 w-full px-7 py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-white border border-white/30 hover:bg-white hover:text-institutional-dark transition-all duration-300 rounded-sm text-center min-h-[44px]"
            >
              <span>Become a Volunteer</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
