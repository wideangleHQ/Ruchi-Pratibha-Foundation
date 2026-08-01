'use client';

import React from 'react';
import { HeartHandshake, ArrowRight, Quote } from 'lucide-react';

export const FeaturedImpactStory: React.FC = () => {
  return (
    <section id="impact-story" className="py-20 sm:py-28 bg-institutional-light dark:bg-institutional-dark text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
              Lives Transformed
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Featured Impact Story
          </h2>
          <p className="font-manrope text-sm text-institutional-mutedLight dark:text-gray-300 mt-3">
            Behind every metric lies a human journey of resilience, opportunity, and hope.
          </p>
        </div>

        {/* Featured Story Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-white dark:bg-institutional-surface/40 border border-institutional-dark/10 dark:border-white/10 rounded-sm p-8 sm:p-12 shadow-sm hover:shadow-xl transition-all duration-300">
          {/* Story Visual Placeholder */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] rounded-sm bg-institutional-surface/5 dark:bg-white/5 border border-institutional-dark/10 dark:border-white/10 p-6 flex flex-col justify-between overflow-hidden group">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(197, 160, 89, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 160, 89, 0.15) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <span className="relative z-10 text-[10px] font-space tracking-widest text-institutional-accent uppercase font-semibold">
                Mayurbhanj District • Education Drive
              </span>

              <div className="relative z-10 my-auto flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 rounded-full bg-institutional-dark dark:bg-white/10 text-institutional-accent flex items-center justify-center mb-3 shadow transition-transform duration-300 group-hover:scale-105">
                  <HeartHandshake className="w-7 h-7 stroke-[1.5]" />
                </div>
                <span className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white">
                  Priya&apos;s Journey to Higher Studies
                </span>
                <span className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 mt-1 max-w-xs">
                  First-generation scholar from a tribal Hamlet empowered through Ruchi Prativa Scholar Grant.
                </span>
              </div>

              <span className="relative z-10 text-[10px] font-space text-institutional-mutedLight dark:text-gray-400">
                Impact Narrative #104
              </span>
            </div>
          </div>

          {/* Story Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <Quote className="w-8 h-8 text-institutional-accent/40 mb-3" />
              <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-institutional-dark dark:text-white mb-4 leading-tight">
                &ldquo;The scholarship didn&apos;t just pay for my college degree—it gave my entire village the belief that girls can lead.&rdquo;
              </h3>
              <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                Priya, a brilliant student from Mayurbhanj, dreamed of becoming a teacher. When financial hardship threatened her studies, the Ruchi Prativa Scholar Grant stepped in. Today, she heads a local rural learning center, teaching over 120 young children every day.
              </p>
            </div>

            <div className="pt-6 border-t border-institutional-dark/10 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="font-cormorant text-lg font-bold text-institutional-dark dark:text-white block">
                  Priya Marndi
                </span>
                <span className="font-space text-xs text-institutional-accent">
                  Scholar &amp; Community Educator
                </span>
              </div>

              <a
                href="#story-detail"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark dark:text-white hover:text-institutional-accent transition-colors"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 text-institutional-accent group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
