'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, BookOpen, HeartHandshake } from 'lucide-react';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const OurPurpose: React.FC = () => {
  const pillars = [
    {
      id: 'recognition',
      num: '01',
      title: 'Recognition',
      intro: 'Honouring Life Accomplishments',
      description:
        'Instituting the flagship Ruchi Prativa Sanman to celebrate distinguished visionaries across literature, science, medicine, social service, and the arts.',
      icon: Award,
    },
    {
      id: 'education',
      num: '02',
      title: 'Education',
      intro: 'Encouraging Young Achievers',
      description:
        'Recognising meritorious students to foster academic discipline, intellectual curiosity, and future leadership for society.',
      icon: GraduationCap,
    },
    {
      id: 'literature',
      num: '03',
      title: 'Culture & Literature',
      intro: 'Preserving Odia Heritage',
      description:
        'Publishing landmark publications Amaruchi and Prativayana to document essays, creative literature, research, and institutional history.',
      icon: BookOpen,
    },
    {
      id: 'social',
      num: '04',
      title: 'Social Responsibility',
      intro: 'Community Welfare & Trust',
      description:
        'Executing transparent social initiatives grounded in public welfare, community awareness, and grassroots engagement.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="purpose" className="py-20 sm:py-28 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
              Guiding Philosophy
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Our Four Directives of Purpose
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Four interconnected institutional commitments that guide every project, publication, award ceremony, and social initiative undertaken by the Foundation.
          </p>
        </div>

        {/* 4 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-8 hover:border-institutional-accent/40 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-space text-xl font-bold text-institutional-accent/60">
                        {pillar.num}
                      </span>
                      <div className="w-10 h-10 rounded-sm bg-institutional-accent/10 dark:bg-institutional-accent/15 border border-institutional-accent/30 flex items-center justify-center text-institutional-accent">
                        <IconComponent className="w-5 h-5 stroke-[1.5]" />
                      </div>
                    </div>

                    <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-1">
                      {pillar.title}
                    </h3>
                    <span className="block font-space text-[10px] uppercase tracking-wider text-institutional-accent font-semibold mb-3">
                      {pillar.intro}
                    </span>
                    <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-space text-institutional-mutedLight dark:text-gray-400">
                    <span>DIRECTIVE {pillar.num}</span>
                    <span className="text-institutional-accent font-semibold">RPF CHARTER</span>
                  </div>
                </InteractiveCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
