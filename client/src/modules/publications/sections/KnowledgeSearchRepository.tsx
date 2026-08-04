'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, ArrowRight } from 'lucide-react';
import { FEATURED_PUBLICATIONS } from '../data/publicationsData';

const SEARCH_CATEGORIES = ['All Categories', 'Amaruchi', 'Prativayana', 'Annual Reports', 'Souvenirs', 'Commemorative Monograph'];
const SEARCH_YEARS = ['All Years', '2025 Edition', '2024 Edition', '2023 Edition', '2022 Edition'];
const SEARCH_LANGUAGES = ['All Languages', 'Odia & English', 'Odia', 'English'];

export const KnowledgeSearchRepository: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [category, setCategory] = useState<string>('All Categories');
  const [year, setYear] = useState<string>('All Years');
  const [language, setLanguage] = useState<string>('All Languages');

  const filteredResults = useMemo(() => {
    return FEATURED_PUBLICATIONS.filter((pub) => {
      const matchCat = category === 'All Categories' || pub.category === category;
      const matchYear = year === 'All Years' || pub.year === year;
      const matchLang = language === 'All Languages' || pub.language.includes(language);
      const matchKeyword =
        keyword === '' ||
        pub.title.toLowerCase().includes(keyword.toLowerCase()) ||
        pub.description.toLowerCase().includes(keyword.toLowerCase()) ||
        pub.tags.some((t) => t.toLowerCase().includes(keyword.toLowerCase()));

      return matchCat && matchYear && matchLang && matchKeyword;
    });
  }, [keyword, category, year, language]);

  return (
    <section
      id="knowledge-search"
      className="py-24 sm:py-32 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Institutional Library Search
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Search the Knowledge Repository
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Search three decades of Foundation publications by keyword, volume, author, year, or thematic tags.
          </p>
        </div>

        {/* Search & Multi-Field Filter Interface */}
        <div className="bg-white dark:bg-institutional-surface/40 p-6 sm:p-8 rounded-sm border border-black/10 dark:border-white/10 shadow-sm mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Keyword Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by publication title, topic, or keyword (e.g. Amaruchi, Odia Heritage, CSR)..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm text-xs font-manrope text-institutional-dark dark:text-white placeholder-gray-400 focus:outline-none focus:border-institutional-accent"
              />
            </div>

            {/* Category Select */}
            <div className="md:col-span-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm text-xs font-space uppercase text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent cursor-pointer"
              >
                {SEARCH_CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-institutional-dark text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Select */}
            <div className="md:col-span-2">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm text-xs font-space uppercase text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent cursor-pointer"
              >
                {SEARCH_YEARS.map((y) => (
                  <option key={y} value={y} className="bg-institutional-dark text-white">
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Select */}
            <div className="md:col-span-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm text-xs font-space uppercase text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent cursor-pointer"
              >
                {SEARCH_LANGUAGES.map((l) => (
                  <option key={l} value={l} className="bg-institutional-dark text-white">
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Results Display */}
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((pub) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 hover:border-institutional-accent/50 transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-space text-institutional-accent uppercase tracking-widest border-b border-black/5 dark:border-white/5 pb-2 mb-3">
                    <span className="font-semibold">{pub.category}</span>
                    <span className="text-gray-400">{pub.year}</span>
                  </div>

                  <h3 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2">
                    {pub.title}
                  </h3>

                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                    {pub.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-space text-institutional-accent font-semibold">
                  <a href="#digital-reader" className="inline-flex items-center gap-1 hover:underline">
                    <span>Inspect Record</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[9px] font-space text-gray-400">{pub.pages} PAGES</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-institutional-surface/40 rounded-sm border border-black/10 dark:border-white/10 p-8">
            <BookOpen className="w-8 h-8 text-institutional-accent mx-auto mb-3" />
            <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-2">
              No Repository Publications Found
            </h3>
            <p className="font-manrope text-xs text-gray-400 max-w-md mx-auto mb-4">
              Try resetting your keyword, category, or language search criteria.
            </p>
            <button
              onClick={() => {
                setKeyword('');
                setCategory('All Categories');
                setYear('All Years');
                setLanguage('All Languages');
              }}
              className="px-4 py-2 text-xs font-space uppercase tracking-widest bg-institutional-accent text-institutional-dark rounded-sm font-semibold min-h-[40px]"
            >
              Reset Search Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
