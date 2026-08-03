'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const OurValues: React.FC = () => {
  const values = [
    {
      title: 'Integrity',
      tag: 'ETHICAL GOVERNANCE',
      desc: 'Operating with 100% transparency, public trust, and strict compliance under public charitable trust legislation.',
    },
    {
      title: 'Service',
      tag: 'COMMUNITY WELFARE',
      desc: 'Dedicated to selfless community welfare, academic encouragement, and social progress across Odisha.',
    },
    {
      title: 'Recognition',
      tag: 'HONOURING MERIT',
      desc: 'Elevating extraordinary human achievement to inspire upcoming generations to reach for excellence.',
    },
    {
      title: 'Excellence',
      tag: 'RIGOROUS STANDARDS',
      desc: 'Upholding uncompromising standards of meritocracy in education and annual Sanman recognitions.',
    },
    {
      title: 'Compassion',
      tag: 'HUMAN DIGNITY',
      desc: 'Bridging grassroots social needs with sustainable institutional care and community respect.',
    },
    {
      title: 'Heritage',
      tag: 'CULTURAL STEWARDSHIP',
      desc: 'Safeguarding Odia literature, language, traditions, and intellectual archives for posterity.',
    },
  ];

  return (
    <section id="values" className="py-20 sm:py-28 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
              Institutional Creed
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Our Core Values
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Six foundational principles that govern our institutional ethics, selection processes, and public service.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-7 hover:border-institutional-accent/40 transition-all duration-300">
                <div>
                  <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold block mb-2">
                    {val.tag}
                  </span>
                  <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-2">
                    {val.title}
                  </h3>
                  <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
