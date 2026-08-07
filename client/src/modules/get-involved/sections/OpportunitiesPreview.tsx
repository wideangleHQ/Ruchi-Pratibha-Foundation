'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar, Users } from 'lucide-react';
import Link from 'next/link';

const OPPORTUNITIES = [
  {
    title: 'Tree Plantation Drive',
    location: 'Khordha',
    category: 'Environment',
    date: '18 August 2026',
    seats: 45,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Rural Education Support',
    location: 'Cuttack District',
    category: 'Education',
    date: '02 September 2026',
    seats: 12,
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Community Health Camp',
    location: 'Bhubaneswar',
    category: 'Healthcare',
    date: '15 September 2026',
    seats: 20,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
  },
];

export const OpportunitiesPreview: React.FC = () => {
  return (
    <section id="volunteer" className="py-20 lg:py-32 bg-institutional-light dark:bg-institutional-dark border-b border-gray-200 dark:border-white/10 scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold block mb-4">
              Current Openings
            </span>
            <h2 className="font-cormorant text-4xl lg:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
              Featured Opportunities
            </h2>
          </div>
          
          <Link
            href="/get-involved#all-opportunities"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark dark:text-white hover:text-institutional-accent transition-colors duration-200 group"
          >
            <span>View All Opportunities</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {OPPORTUNITIES.map((opp, idx) => (
            <motion.div
              key={opp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col bg-white dark:bg-[#151C2B] rounded-sm overflow-hidden border border-gray-200 dark:border-white/10 hover:border-institutional-accent/50 transition-colors duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${opp.image}')` }}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-space font-semibold bg-white/90 dark:bg-institutional-dark/90 text-institutional-dark dark:text-white backdrop-blur-sm rounded-sm">
                    {opp.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-grow p-6 lg:p-8">
                <h3 className="font-cormorant text-2xl lg:text-3xl font-bold tracking-tight text-institutional-dark dark:text-white mb-4 group-hover:text-institutional-accent transition-colors duration-300">
                  {opp.title}
                </h3>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm font-manrope text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-institutional-accent" />
                    <span>{opp.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-manrope text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 text-institutional-accent" />
                    <span>{opp.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-manrope text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 text-institutional-accent" />
                    <span>{opp.seats} Seats Remaining</span>
                  </div>
                </div>
                
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10">
                  <Link
                    href="/get-involved#apply"
                    className="inline-flex items-center justify-between w-full text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark dark:text-white group-hover:text-institutional-accent transition-colors duration-200"
                  >
                    <span>Apply Now</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
