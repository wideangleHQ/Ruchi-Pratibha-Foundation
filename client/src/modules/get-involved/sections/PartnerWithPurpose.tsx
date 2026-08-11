'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, GraduationCap, HeartPulse, Building2, Users } from 'lucide-react';
import Link from 'next/link';

const PARTNER_TYPES = [
  {
    title: 'Educational Institutions',
    icon: <GraduationCap className="w-5 h-5" />,
    description: 'Schools, colleges, and universities partnering for academic initiatives and cultural exchange.',
  },
  {
    title: 'Healthcare Organizations',
    icon: <HeartPulse className="w-5 h-5" />,
    description: 'Hospitals and medical professionals supporting our community health and wellness camps.',
  },
  {
    title: 'Corporate CSR',
    icon: <Building2 className="w-5 h-5" />,
    description: 'Organizations aligning their social responsibility goals with our grassroots programmes.',
  },
  {
    title: 'Community Organizations',
    icon: <Users className="w-5 h-5" />,
    description: 'Local NGOs and groups collaborating for broader outreach and sustained impact.',
  },
];

export const PartnerWithPurpose: React.FC = () => {
  return (
    <section id="partners" className="py-16 lg:py-20 bg-institutional-light dark:bg-[#0D121B] border-b border-gray-200 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28 min-h-[75vh] flex flex-col justify-center">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Editorial Layout: Title Left, Text Right */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-between mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-5/12 shrink-0"
          >
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold block mb-4">
              Institutional Collaboration
            </span>
            <h2 className="font-cormorant text-4xl lg:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white leading-[1.15]">
              Building Stronger Communities Together
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:w-6/12 pt-2"
          >
            <p className="font-manrope text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Meaningful transformation is rarely achieved alone. By joining hands with the Foundation, institutions bring their unique strengths to our shared vision of social empowerment. We welcome partnerships that transcend traditional boundaries, fostering a collaborative ecosystem focused on lasting community well-being.
            </p>
          </motion.div>
        </div>

        {/* Interactive Collaboration Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-12">
          {PARTNER_TYPES.map((type, idx) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm transition-all duration-300 hover:scale-[1.03] hover:border-institutional-accent/40 hover:shadow-[0_4px_20px_rgba(197,160,89,0.08)] flex flex-col justify-between group h-[220px]"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-institutional-light dark:bg-institutional-dark/50 border border-gray-100 dark:border-white/5 flex items-center justify-center text-institutional-accent mb-4 group-hover:bg-institutional-accent group-hover:text-institutional-dark transition-all duration-300">
                  {type.icon}
                </div>
                <h3 className="font-cormorant text-xl font-bold tracking-tight text-institutional-dark dark:text-white mb-2 group-hover:text-institutional-accent transition-colors duration-300">
                  {type.title}
                </h3>
                <p className="font-manrope text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                  {type.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/get-involved/volunteer"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-white dark:text-institutional-dark bg-institutional-dark dark:bg-institutional-accent hover:bg-institutional-dark/90 dark:hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-md"
          >
            <span>Partner With Us</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
