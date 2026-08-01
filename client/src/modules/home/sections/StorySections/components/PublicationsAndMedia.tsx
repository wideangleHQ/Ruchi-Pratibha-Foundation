'use client';

import React from 'react';
import { Play, ArrowUpRight } from 'lucide-react';

export const PublicationsAndMedia: React.FC = () => {
  return (
    <section id="publications" className="py-20 sm:py-28 bg-institutional-light dark:bg-institutional-dark text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section 1: Apple-Books Inspired Publications */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-[1px] w-8 bg-institutional-accent" />
              <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
                Literary Heritage
              </span>
              <span className="h-[1px] w-8 bg-institutional-accent" />
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
              Flagship Publications
            </h2>
            <p className="font-manrope text-sm text-institutional-mutedLight dark:text-gray-300 mt-3">
              Preserving Odia literature, essays, and regional intellectual research through premium journals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Amaruchi Magazine Cover Card */}
            <div className="group relative flex flex-col md:flex-row items-center bg-white dark:bg-institutional-surface/40 border border-institutional-dark/10 dark:border-white/10 rounded-sm p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 gap-6">
              {/* Apple Books Cover Placeholder */}
              <div className="w-full md:w-48 aspect-[3/4] bg-institutional-dark text-institutional-accent rounded-sm border border-institutional-accent/30 p-6 flex flex-col justify-between shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <span className="font-space text-[10px] tracking-widest uppercase text-institutional-accent">
                  Annual Journal
                </span>
                <div className="my-auto text-center">
                  <h3 className="font-cormorant text-3xl font-bold text-white tracking-tight">
                    Amaruchi
                  </h3>
                  <span className="font-space text-[10px] text-gray-400 block mt-1">
                    Vol. XXVIII
                  </span>
                </div>
                <span className="font-space text-[9px] text-institutional-accent">
                  Ruchi Prativa Foundation
                </span>
              </div>

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-space text-institutional-accent uppercase font-semibold">
                    Literary &amp; Cultural Anthology
                  </span>
                  <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-institutional-dark dark:text-white mt-1 mb-3">
                    Amaruchi Annual Journal
                  </h3>
                  <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                    A celebrated collection of essays, poems, and critical commentaries by Odisha’s leading scholars and young literary talents.
                  </p>
                </div>

                <a
                  href="#amaruchi"
                  className="inline-flex items-center gap-2 text-xs font-space font-semibold text-institutional-accent hover:text-institutional-dark dark:hover:text-white transition-colors"
                >
                  <span>Explore Publication Edition</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Prativayana Magazine Cover Card */}
            <div className="group relative flex flex-col md:flex-row items-center bg-white dark:bg-institutional-surface/40 border border-institutional-dark/10 dark:border-white/10 rounded-sm p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 gap-6">
              {/* Apple Books Cover Placeholder */}
              <div className="w-full md:w-48 aspect-[3/4] bg-institutional-dark text-institutional-accent rounded-sm border border-institutional-accent/30 p-6 flex flex-col justify-between shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <span className="font-space text-[10px] tracking-widest uppercase text-institutional-accent">
                  Research Compendium
                </span>
                <div className="my-auto text-center">
                  <h3 className="font-cormorant text-3xl font-bold text-white tracking-tight">
                    Prativayana
                  </h3>
                  <span className="font-space text-[10px] text-gray-400 block mt-1">
                    Special Edition
                  </span>
                </div>
                <span className="font-space text-[9px] text-institutional-accent">
                  Ruchi Prativa Foundation
                </span>
              </div>

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-space text-institutional-accent uppercase font-semibold">
                    Historical &amp; Social Gazette
                  </span>
                  <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-institutional-dark dark:text-white mt-1 mb-3">
                    Prativayana Historical Gazette
                  </h3>
                  <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                    Documenting three decades of social reform, rural transformation, and historical research compiled by veteran academicians.
                  </p>
                </div>

                <a
                  href="#prativayana"
                  className="inline-flex items-center gap-2 text-xs font-space font-semibold text-institutional-accent hover:text-institutional-dark dark:hover:text-white transition-colors"
                >
                  <span>Explore Publication Edition</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Video Documentary Section */}
        <div className="bg-institutional-darker text-white rounded-sm border border-white/10 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="font-space text-xs uppercase tracking-[0.2em] text-institutional-accent font-semibold mb-2 block">
                Short Documentary
              </span>
              <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-white mb-4">
                Our Journey Through Three Decades
              </h3>
              <p className="font-manrope text-sm text-gray-300 leading-relaxed mb-6">
                Watch the film chronicling the founding vision, grassroots community initiatives, and annual award galas of the Ruchi Prativa Foundation.
              </p>
              <div className="font-space text-xs text-gray-400">
                Duration: 14 Mins • Subtitled in English &amp; Odia
              </div>
            </div>

            {/* Video Player Placeholder */}
            <div className="lg:col-span-7">
              <div className="group relative w-full aspect-[16/9] rounded-sm bg-white/5 border border-white/15 p-6 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-institutional-accent transition-all duration-300 shadow-xl">
                <div className="w-16 h-16 rounded-full bg-institutional-accent text-institutional-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-7 h-7 fill-institutional-dark ml-1" />
                </div>
                <span className="font-cormorant text-xl font-bold text-white mt-4">
                  Watch Documentary Film
                </span>
                <span className="font-space text-[10px] text-institutional-accent mt-1">
                  Click to Play
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
