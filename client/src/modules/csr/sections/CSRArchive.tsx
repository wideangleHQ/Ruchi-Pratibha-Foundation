'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, ArrowRight, BookOpen, X, CheckCircle2, Calendar, FileText } from 'lucide-react';
import { FEATURED_CSR_ACTIVITIES } from '../data/csrData';
import { CSRActivity } from '../types';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

const CATEGORIES = [
  'All',
  'Education',
  'Healthcare',
  'Environment',
  'Community Welfare',
  'Culture',
  'Youth Engagement',
];

const YEARS = ['All Years', '2026', '2025', '2024', '2023', 'Earlier'];
const DISTRICTS = ['All Districts', 'Cuttack', 'Bhubaneswar', 'Khordha', 'Puri', 'Others'];

export const CSRArchive: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<CSRActivity | null>(null);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (selectedActivity) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedActivity]);

  const filteredActivities = useMemo(() => {
    return FEATURED_CSR_ACTIVITIES.filter((act) => {
      const matchCat = selectedCategory === 'All' || act.category === selectedCategory;
      const matchYear =
        selectedYear === 'All Years' ||
        (selectedYear === 'Earlier' ? act.year < 2023 : act.year.toString() === selectedYear);
      const matchDistrict =
        selectedDistrict === 'All Districts' || act.district === selectedDistrict;
      const matchSearch =
        searchQuery === '' ||
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchYear && matchDistrict && matchSearch;
    });
  }, [selectedCategory, selectedYear, selectedDistrict, searchQuery]);

  return (
    <section
      id="csr-archive"
      className="py-24 sm:py-32 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Community Archive
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Explore Our Activities
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Browse our growing archive of community initiatives carried out across different sectors and regions. Every activity represents a step towards creating meaningful and measurable social impact.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-10 space-y-4 bg-white dark:bg-institutional-surface/40 p-5 sm:p-6 rounded-sm border border-black/10 dark:border-white/10 shadow-none sm:shadow-sm">
          {/* Top Row: Search & Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search activities by keyword, title, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm text-xs font-manrope text-institutional-dark dark:text-white placeholder-gray-400 focus:outline-none focus:border-institutional-accent"
              />
            </div>

            {/* Year Select */}
            <div className="md:col-span-3">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm text-xs font-space uppercase text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent cursor-pointer"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y} className="bg-institutional-dark text-white">
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* District Select */}
            <div className="md:col-span-3">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-3 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm text-xs font-space uppercase text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent cursor-pointer"
              >
                {DISTRICTS.map((d) => (
                  <option key={d} value={d} className="bg-institutional-dark text-white">
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Filter Chips */}
          <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-[10px] font-space uppercase text-institutional-accent font-semibold shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>CATEGORY:</span>
            </span>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[11px] font-space uppercase tracking-wider px-3.5 py-2 min-h-[38px] rounded-sm transition-all duration-200 shrink-0 cursor-pointer ${
                    active
                      ? 'bg-institutional-accent text-institutional-dark font-bold shadow-xs'
                      : 'bg-black/5 dark:bg-white/5 text-institutional-dark dark:text-gray-300 hover:border-institutional-accent/40 border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. DESKTOP & TABLET GRID (hidden on mobile, grid on md+) */}
        {filteredActivities.length > 0 ? (
          <>
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredActivities.map((act) => (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 hover:border-institutional-accent/50 transition-all duration-300">
                    <div>
                      {/* Cover Placeholder */}
                      <div className="w-full aspect-[16/9] rounded-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 flex flex-col justify-between mb-5 relative overflow-hidden group">
                        <div className="flex items-center justify-between text-[10px] font-space text-institutional-accent uppercase tracking-widest">
                          <span className="px-2 py-0.5 rounded bg-institutional-accent/15 border border-institutional-accent/30 font-semibold">
                            {act.category}
                          </span>
                          <span>{act.year}</span>
                        </div>

                        <div className="my-auto text-center py-2">
                          <span className="text-[10px] font-space uppercase text-institutional-accent tracking-widest block mb-1">
                            [ Cover Image Placeholder ]
                          </span>
                          <p className="font-manrope text-[11px] text-gray-500 dark:text-gray-400">
                            {act.location}
                          </p>
                        </div>

                        <div className="text-[9px] font-space text-gray-400 flex justify-between border-t border-black/5 dark:border-white/10 pt-1.5">
                          <span>ITEM #{act.id}</span>
                          <span>PUBLIC RECORD</span>
                        </div>
                      </div>

                      <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-2">
                        {act.title}
                      </h3>
                      <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                        {act.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                      <span className="text-[11px] font-space text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-institutional-accent" />
                        <span>{act.district}</span>
                      </span>

                      <button
                        onClick={() => setSelectedActivity(act)}
                        className="inline-flex items-center gap-1 text-xs font-space uppercase tracking-wider text-institutional-accent hover:text-institutional-dark dark:hover:text-white font-semibold transition-colors duration-150 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </InteractiveCard>
                </motion.div>
              ))}
            </div>

            {/* 2. MOBILE 2-COLUMN GRID (320px-480px, visible on md:hidden) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 block md:hidden">
              {filteredActivities.map((act) => (
                <div
                  key={act.id}
                  onClick={() => setSelectedActivity(act)}
                  className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-3.5 shadow-none cursor-pointer group active:scale-[0.98] transition-transform duration-150"
                >
                  <div>
                    {/* Top Image Box */}
                    <div className="w-full aspect-[4/3] rounded-sm bg-gradient-to-b from-institutional-surface/90 via-institutional-dark to-institutional-darker border border-black/10 dark:border-white/10 p-2.5 flex flex-col justify-between mb-3 relative overflow-hidden text-white">
                      <div className="flex items-center justify-between text-[8px] font-space text-institutional-accent uppercase tracking-widest border-b border-white/15 pb-1">
                        <span className="truncate max-w-[70px]">{act.category}</span>
                        <span>{act.year}</span>
                      </div>

                      <div className="my-auto text-center py-1">
                        <span className="text-[9px] font-space uppercase text-institutional-accent tracking-widest block mb-0.5">
                          [ Image ]
                        </span>
                        <p className="font-manrope text-[9px] text-gray-300 truncate">
                          {act.district}
                        </p>
                      </div>

                      <div className="text-[7px] font-space text-gray-400 flex justify-between border-t border-white/15 pt-1">
                        <span>#{act.id}</span>
                        <span>RPF ARCHIVE</span>
                      </div>
                    </div>

                    {/* Middle Title */}
                    <h3 className="font-cormorant text-sm font-bold text-institutional-dark dark:text-white mb-1.5 leading-snug line-clamp-2">
                      {act.title}
                    </h3>
                  </div>

                  {/* Bottom Metadata */}
                  <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[9px] font-space text-institutional-accent font-semibold">
                    <span className="truncate max-w-[80px]">{act.district}</span>
                    <span className="flex items-center gap-0.5">
                      <span>Open</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-institutional-surface/40 rounded-sm border border-black/10 dark:border-white/10 p-8">
            <BookOpen className="w-8 h-8 text-institutional-accent mx-auto mb-3" />
            <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-2">
              No Activities Match Your Filters
            </h3>
            <p className="font-manrope text-xs text-gray-400 max-w-md mx-auto mb-4">
              Try adjusting your category, year, or district selections to explore more activities.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedYear('All Years');
                setSelectedDistrict('All Districts');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-space uppercase tracking-widest bg-institutional-accent text-institutional-dark rounded-sm font-semibold min-h-[40px]"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 3. PREMIUM EVENT DETAIL MODAL */}
        <AnimatePresence>
          {selectedActivity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedActivity(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-sm border border-institutional-accent/40 shadow-2xl p-6 sm:p-8 relative scrollbar-none"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-institutional-accent cursor-pointer p-1 rounded-sm border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Cover Image Placeholder Box */}
                <div className="w-full aspect-[16/9] rounded-sm bg-gradient-to-br from-institutional-surface/90 via-institutional-dark to-institutional-darker border border-white/15 p-5 flex flex-col justify-between text-white mb-6">
                  <div className="flex items-center justify-between text-xs font-space text-institutional-accent uppercase tracking-widest border-b border-white/15 pb-2">
                    <span className="px-2.5 py-0.5 rounded bg-institutional-accent/20 border border-institutional-accent/40 font-semibold">
                      {selectedActivity.category}
                    </span>
                    <span>{selectedActivity.year}</span>
                  </div>

                  <div className="my-auto text-center py-3">
                    <FileText className="w-8 h-8 text-institutional-accent mx-auto mb-2 opacity-80" />
                    <span className="text-xs font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-1">
                      [ Archival Activity Image ]
                    </span>
                    <p className="font-manrope text-xs text-gray-300">
                      {selectedActivity.location} • {selectedActivity.district} District
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/15 text-[10px] font-space text-gray-400 flex justify-between">
                    <span>RECORD #{selectedActivity.id}</span>
                    <span>RPF PUBLIC ARCHIVE</span>
                  </div>
                </div>

                {/* Category & Date Badge */}
                <div className="flex flex-wrap items-center gap-2.5 mb-3 text-xs font-space text-gray-400">
                  <span className="flex items-center gap-1 text-institutional-accent font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedActivity.dateStr}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-gray-300">
                    <MapPin className="w-3.5 h-3.5 text-institutional-accent" />
                    <span>{selectedActivity.location}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-cormorant text-2xl sm:text-4xl font-bold text-institutional-dark dark:text-white mb-4 leading-snug">
                  {selectedActivity.title}
                </h3>

                {/* Overview Paragraph */}
                <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                  {selectedActivity.summary}
                </p>

                {/* Objectives */}
                {selectedActivity.objectives && (
                  <div className="mb-6 p-4 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                    <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-3">
                      KEY INITIATIVES &amp; OBJECTIVES
                    </span>
                    <ul className="space-y-2 font-manrope text-xs text-institutional-dark dark:text-gray-200">
                      {selectedActivity.objectives.map((obj, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-institutional-accent shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Possible Activities Tags */}
                {selectedActivity.possibleActivities && (
                  <div className="mb-6">
                    <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-2">
                      ACTIVITY TAGS &amp; STAKEHOLDERS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedActivity.possibleActivities.map((act) => (
                        <span
                          key={act}
                          className="text-[10px] font-space px-2.5 py-1 rounded bg-institutional-accent/15 border border-institutional-accent/30 text-institutional-dark dark:text-gray-200"
                        >
                          • {act}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Footer CTAs */}
                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[10px] font-space text-gray-400">
                    VERIFIED PUBLIC RECORD • RPF ARCHIVE
                  </span>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedActivity(null)}
                      className="w-full sm:w-auto px-6 py-2.5 text-xs font-space uppercase tracking-widest bg-institutional-accent text-institutional-dark font-semibold rounded-sm hover:bg-institutional-accentHover transition-colors min-h-[44px]"
                    >
                      Close Activity
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
