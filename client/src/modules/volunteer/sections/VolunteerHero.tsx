'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CSRHeroSlideshow } from '@/components/ui/CSRHeroSlideshow';

interface VolunteerHeroProps {
  onOpenWizard: () => void;
}

export const VolunteerHero: React.FC<VolunteerHeroProps> = ({ onOpenWizard }) => {
  return (
    <section className="relative z-10 min-h-[90vh] sm:min-h-screen w-full bg-institutional-dark text-white border-b border-white/10 overflow-hidden flex items-end">
      {/* Background Image Slideshow & Overlays */}
      <CSRHeroSlideshow opacity={0.4} />


      {/* Hero Content */}
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 xl:px-16 pb-12 sm:pb-16 lg:pb-24 pt-32">
        <div className="max-w-[1500px] w-full mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-16">
          
          <div className="flex flex-col items-start max-w-[85%] sm:max-w-full lg:max-w-[65%]">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="h-[1px] w-8 bg-institutional-accent/60" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
                Volunteer Network
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-cormorant text-4xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold tracking-tight text-white leading-[1.1] mb-8"
            >
              Become the Change.<br />
              Volunteer with Purpose.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-manrope text-base sm:text-lg lg:text-xl text-gray-300 max-w-full sm:max-w-2xl leading-relaxed font-normal"
            >
              Join a growing community of individuals committed to education, culture, community development, environmental stewardship, and social responsibility. Every contribution, big or small, helps strengthen the Foundation&apos;s mission and creates lasting impact.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4 w-full sm:w-auto lg:min-w-[320px]"
          >
            <button
              onClick={onOpenWizard}
              className="inline-flex items-center justify-center gap-2.5 w-full px-8 py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent"
            >
              <span>Begin Registration</span>
              <ArrowRight className="w-4 h-4 text-institutional-dark" />
            </button>
            <a
              href="#why-volunteer"
              className="inline-flex items-center justify-center gap-2.5 w-full px-8 py-4 text-xs uppercase tracking-widest font-space font-semibold text-white bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <span>Learn More</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
