'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const REASONS = [
  {
    title: 'Community Impact',
    description: 'Work directly with grassroots initiatives and see the tangible difference you bring to communities in need.',
    image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Learning Experience',
    description: 'Gain invaluable insights into social development, event management, and philanthropic operations.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Leadership & Networking',
    description: 'Connect with industry leaders, social workers, and like-minded peers who share your vision for a better society.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Recognition & Certificates',
    description: 'Receive formal acknowledgment, institutional certificates, and opportunities to be featured in Foundation publications.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
  },
];

export const WhyVolunteer: React.FC = () => {
  return (
    <section id="why-volunteer" className="py-20 lg:py-32 bg-institutional-light dark:bg-[#0D121B] border-b border-gray-200 dark:border-white/10 scroll-mt-20">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 mb-16 lg:mb-24">
          <div className="lg:w-1/3 shrink-0">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold block mb-4">
              The Experience
            </span>
            <h2 className="font-cormorant text-4xl lg:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white leading-[1.1]">
              Why Volunteer<br />With Us
            </h2>
          </div>
          <div className="lg:w-2/3 flex items-end">
            <p className="font-manrope text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              Volunteering with the Ruchi Prativa Foundation is more than a commitment of time; it is an immersive journey of personal growth, cultural exchange, and direct social intervention. We design our volunteer programs to be deeply rewarding editorial experiences, not just administrative tasks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {REASONS.map((reason, idx) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative block w-full h-[400px] lg:h-[480px] overflow-hidden rounded-sm bg-institutional-dark"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${reason.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-institutional-dark/95 via-institutional-dark/50 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              
              <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-cormorant text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 group-hover:text-institutional-accent transition-colors duration-300">
                      {reason.title}
                    </h3>
                    <p className="font-manrope text-sm lg:text-base text-gray-300 leading-relaxed max-w-sm lg:max-w-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {reason.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 group-hover:border-institutional-accent transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 text-institutional-accent" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
