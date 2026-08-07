'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STEPS = [
  { id: '01', title: 'Discover', desc: 'Find opportunities that match your skills.' },
  { id: '02', title: 'Register', desc: 'Complete the modern onboarding wizard.' },
  { id: '03', title: 'Review', desc: 'Our community team reviews your profile.' },
  { id: '04', title: 'Approval', desc: 'Receive your welcome package and instructions.' },
  { id: '05', title: 'Participate', desc: 'Join events and contribute to initiatives.' },
  { id: '06', title: 'Recognition', desc: 'Get featured in our community spotlights.' },
  { id: '07', title: 'Certificate', desc: 'Earn institutional certificates for your time.' },
  { id: '08', title: 'Stay Connected', desc: 'Become a lifelong part of the Foundation.' },
];

export const VolunteerJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-[#121824] border-b border-gray-200 dark:border-white/10 overflow-hidden">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16" ref={containerRef}>
        
        <div className="text-center mb-16 lg:mb-24">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold block mb-4">
            The Roadmap
          </span>
          <h2 className="font-cormorant text-4xl lg:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Your Journey With Us
          </h2>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block relative mt-20 mb-20">
          <div className="absolute top-4 left-0 w-full h-[1px] bg-gray-200 dark:bg-white/10" />
          <motion.div 
            className="absolute top-4 left-0 h-[1px] bg-institutional-accent" 
            style={{ width: progressWidth }} 
          />
          
          <div className="flex justify-between relative z-10">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center w-32 relative group">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-[#121824] border-2 border-gray-200 dark:border-white/20 flex items-center justify-center font-space text-[10px] font-bold text-gray-400 group-hover:border-institutional-accent group-hover:text-institutional-accent transition-colors duration-300 z-10">
                  {step.id}
                </div>
                <div className="mt-6 text-center">
                  <h4 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="font-manrope text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="block lg:hidden relative ml-4">
          <div className="absolute top-0 left-4 bottom-0 w-[1px] bg-gray-200 dark:bg-white/10" />
          <motion.div 
            className="absolute top-0 left-4 w-[1px] bg-institutional-accent" 
            style={{ height: progressHeight }} 
          />
          
          <div className="flex flex-col gap-10 relative z-10">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex items-start gap-6 group">
                <div className="w-8 h-8 shrink-0 rounded-full bg-white dark:bg-[#121824] border-2 border-gray-200 dark:border-white/20 flex items-center justify-center font-space text-[10px] font-bold text-gray-400 group-hover:border-institutional-accent group-hover:text-institutional-accent transition-colors duration-300">
                  {step.id}
                </div>
                <div className="pt-1">
                  <h4 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="font-manrope text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
