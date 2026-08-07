'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative z-10 py-24 lg:py-32 w-full bg-institutional-dark text-white border-b border-white/10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(197,160,89,0.1)_0%,transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.2) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="h-[1px] w-8 bg-institutional-accent/60" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Begin Your Journey
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cormorant text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-8"
          >
            Every Contribution Creates Lasting Impact
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-manrope text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed font-normal mb-12 max-w-2xl"
          >
            Whether you volunteer your time, collaborate as a partner, participate in events, or support our initiatives, your contribution becomes part of the Foundation&apos;s continuing journey of service and social responsibility.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              href="/get-involved/volunteer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent w-full sm:w-auto"
            >
              <span>Become a Volunteer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              href="/get-involved#partner"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs uppercase tracking-widest font-space font-semibold text-white bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 w-full sm:w-auto"
            >
              <span>Partner With Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
