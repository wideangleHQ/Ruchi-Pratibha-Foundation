'use client';

import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const SanmanAndHallOfFame: React.FC = () => {
  const hallOfFame = [
    {
      name: 'Dr. Pratibha Ray',
      field: 'Odia Literature & Culture',
      year: '2004 Honoree',
      achievement: 'Jnanpith Awardee and pioneer of modern Odia feminist narrative prose.',
    },
    {
      name: 'Prof. Radhamohan',
      field: 'Environmental Conservation',
      year: '2015 Honoree',
      achievement: 'Padma Shri recipient for organic farming and sustainable soil restoration.',
    },
    {
      name: 'Smt. Tulasi Munda',
      field: 'Grassroots Education',
      year: '2009 Honoree',
      achievement: 'Padma Shri social activist who educated over 20,000 tribal children in Keonjhar.',
    },
  ];

  return (
    <section id="sanman" className="py-20 sm:py-28 bg-institutional-darker text-white overflow-hidden border-b border-white/10">
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Signature Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Signature Celebration
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            Ruchi Prativa Sanman
          </h2>
          <p className="font-manrope text-base text-gray-300 leading-relaxed">
            More than an award ceremony, Ruchi Prativa Sanman is Odisha’s solemn celebration of intellectual brilliance, artistic devotion, and selfless humanitarian leadership.
          </p>
        </div>

        {/* Featured Awardee Spotlight */}
        <div className="mb-20 bg-white/5 border border-white/15 rounded-sm p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Awardee Portrait Placeholder */}
            <div className="lg:col-span-5 flex justify-center">
              <InteractiveCard className="relative w-full max-w-sm aspect-[4/5] rounded-sm bg-white/5 border border-white/15 p-6 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[10px] font-space tracking-widest uppercase text-institutional-accent font-semibold">
                    Featured Awardee
                  </span>
                  <span className="text-[9px] font-space uppercase text-gray-400">LAUREATE SPOTLIGHT</span>
                </div>

                <div className="my-auto text-center py-6">
                  <span className="text-[11px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-2">
                    [ Archival Portrait Placeholder ]
                  </span>
                  <h4 className="font-cormorant text-2xl font-bold text-white group-hover:text-institutional-accent transition-colors duration-300">
                    Featured Laureate
                  </h4>
                  <span className="font-space text-xs text-gray-300 mt-1 block">
                    Ruchi Prativa Sanman Recipient
                  </span>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-space text-gray-400">
                  <span>Literature &amp; Arts</span>
                  <span>Annual Honors</span>
                </div>
              </InteractiveCard>
            </div>

            {/* Awardee Biography */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold mb-2 block">
                  Laureate Spotlight • Literature &amp; Human Welfare
                </span>
                <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-white mb-4">
                  Honoring Extraordinary Contributions to Odia Culture &amp; Society
                </h3>
                <p className="font-manrope text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                  For over two decades, the Ruchi Prativa Sanman has recognized over 250 luminaries whose lifelong dedication has shaped literature, science, environmental conservation, and social progress across the region.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="font-space text-xs text-gray-400">
                  Annual Honors Assembly
                </span>
                <a
                  href="#biography"
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-space font-semibold text-institutional-accent hover:text-white transition-colors duration-300"
                >
                  <span>Read Laureate Biography</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hall of Fame Preview (3 Cards) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-cormorant text-3xl font-bold text-white">
                Hall of Fame Preview
              </h3>
              <p className="font-manrope text-xs text-gray-400 mt-1">
                Celebrating distinguished visionaries who have inspired millions.
              </p>
            </div>
            <a
              href="/pratibha-sanman"
              className="inline-flex items-center gap-2 text-xs font-space uppercase tracking-widest text-institutional-accent hover:text-white transition-colors duration-300 whitespace-nowrap"
            >
              <span>Explore Full Hall of Fame</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {hallOfFame.map((person) => (
              <InteractiveCard
                key={person.name}
                className="flex flex-col justify-between bg-white/5 border border-white/10 rounded-sm p-6 sm:p-8 hover:border-institutional-accent transition-all duration-500"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-space text-institutional-accent uppercase font-semibold">
                      {person.field}
                    </span>
                    <span className="text-[10px] font-space text-gray-400">
                      {person.year}
                    </span>
                  </div>

                  <h4 className="font-cormorant text-2xl font-bold text-white mb-2 group-hover:text-institutional-accent transition-colors duration-300">
                    {person.name}
                  </h4>
                  <p className="font-manrope text-xs text-gray-300 leading-relaxed mb-6">
                    {person.achievement}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-space text-gray-400">
                  <span>Sanman Archive</span>
                  <span className="text-institutional-accent group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
