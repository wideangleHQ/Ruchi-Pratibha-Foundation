'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const JOURNEYS = [
  {
    title: 'Volunteer',
    description: 'Join community initiatives, contribute your time, develop new experiences, and help create meaningful impact through Foundation activities.',
    image: 'https://images.unsplash.com/photo-1593113580332-ceb47bf28cb4?auto=format&fit=crop&w=800&q=80',
    href: '/get-involved/volunteer',
  },
  {
    title: 'Events & Workshops',
    description: 'Discover award ceremonies, cultural programmes, educational initiatives, workshops, and upcoming Foundation events.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    href: '/get-involved#events',
  },
  {
    title: 'Institutional Partners',
    description: 'Collaborate with the Foundation through educational institutions, community organizations, healthcare partners, and corporate initiatives.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    href: '/get-involved#partner',
  },
  {
    title: 'Support & Giving',
    description: 'Support Foundation initiatives through donations, sponsorships, or meaningful contributions that strengthen community programmes.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    href: '/get-involved#support',
  }
];

export const JourneyCards: React.FC = () => {
  return (
    <section id="journeys" className="py-12 lg:py-16 bg-institutional-light dark:bg-institutional-dark border-b border-gray-200 dark:border-white/10 scroll-mt-20">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-8 lg:mb-12">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold block mb-3">
            Participation Gateway
          </span>
          <h2 className="font-cormorant text-4xl lg:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Choose Your Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {JOURNEYS.map((journey, idx) => (
            <motion.div
              key={journey.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Link href={journey.href} className="group block relative w-full h-[300px] lg:h-[360px] overflow-hidden rounded-sm bg-institutional-dark">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${journey.image}')` }}
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-institutional-dark/95 via-institutional-dark/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-cormorant text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 group-hover:text-institutional-accent transition-colors duration-300">
                        {journey.title}
                      </h3>
                      <p className="font-manrope text-sm lg:text-base text-gray-300 leading-relaxed max-w-md">
                        {journey.description}
                      </p>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:border-institutional-accent group-hover:bg-institutional-accent transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-white group-hover:text-institutional-dark transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
