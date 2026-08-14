'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export const GatewayHero: React.FC = () => {
  return (
    <section
      id="gateway-hero"
      className="relative z-10 min-h-[90vh] sm:min-h-screen w-full bg-institutional-dark text-white border-b border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28 flex items-end"
    >
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-institutional-dark via-institutional-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-institutional-dark/90 via-institutional-dark/50 to-transparent" />
        
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(197, 160, 89, 0.25) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
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
                Community • Participation
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
              Become Part of the Journey
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-manrope text-sm sm:text-base lg:text-lg text-gray-300 max-w-full sm:max-w-2xl leading-relaxed font-normal"
            >
              Every meaningful change begins with people who choose to participate. Whether you wish to volunteer, collaborate, support initiatives, or attend Foundation events, there is a place for every individual and organization to contribute towards a stronger society.
            </motion.p>
          </div>

          {/* Right: CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto lg:min-w-[280px]"
          >
            <a
              href="/get-involved/volunteer"
              className="inline-flex items-center justify-center gap-2.5 w-full px-7 py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-lg text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent min-h-[44px]"
            >
              <span>Volunteer Now</span>
              <ArrowDown className="w-4 h-4 text-institutional-dark" />
            </a>
            <a
              href="/get-involved"
              className="inline-flex items-center justify-center gap-2.5 w-full px-7 py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-white bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-200 rounded-sm text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 min-h-[44px]"
            >
              <span>Donate Now</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
