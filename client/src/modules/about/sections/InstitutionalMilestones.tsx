'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const InstitutionalMilestones: React.FC = () => {
  const milestones = [
    {
      heading: '1997',
      title: 'Foundation Established',
      subtitle: 'Beginning of a lifelong journey of public service and trust.',
      desc: 'Incorporated under public charitable trust charter with a vision to recognise excellence and foster social development across Odisha.',
    },
    {
      heading: 'Sanman',
      title: 'Ruchi Prativa Sanman',
      subtitle: 'Recognising excellence across multi-disciplinary fields.',
      desc: 'Instituted the state’s flagship annual recognition honouring lifelong contributions in literature, science, public service, and arts.',
    },
    {
      heading: 'Amaruchi',
      title: 'Amaruchi Journal',
      subtitle: 'Encouraging literature, scholarship, and creative thought.',
      desc: 'Launched the institutional flagship journal archiving essays, research papers, and literary creations for public distribution.',
    },
    {
      heading: 'Prativayana',
      title: 'Prativayana Archives',
      subtitle: 'Documenting the Foundation’s evolving historical journey.',
      desc: 'A permanent published record detailing institutional milestones, convocation speeches, and public disclosures over three decades.',
    },
    {
      heading: '3 Decades',
      title: 'Three Decades of Impact',
      subtitle: 'Continuing the legacy with unwavering purpose.',
      desc: 'Bridging historic heritage with digital archives, youth scholarship programs, and grassroots community initiatives.',
    },
  ];

  return (
    <section
      id="milestones"
      className="py-24 sm:py-32 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Chapters of Evolution
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Institutional Milestones
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Key chapters defining nearly 30 years of recognition, publications, and community stewardship.
          </p>
        </div>

        {/* 5 Editorial Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {milestones.map((m, idx) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-7 hover:border-institutional-accent/40 transition-all duration-300">
                <div>
                  <span className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-institutional-accent block mb-2">
                    {m.heading}
                  </span>
                  <h3 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2">
                    {m.title}
                  </h3>
                  <p className="font-manrope text-xs font-semibold text-institutional-dark dark:text-gray-200 mb-3">
                    {m.subtitle}
                  </p>
                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed">
                    {m.desc}
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
