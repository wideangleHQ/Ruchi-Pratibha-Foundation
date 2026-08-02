'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

interface ImpactStory {
  id: string;
  tag: string;
  badge: string;
  title: string;
  summary: string;
  author: string;
  role: string;
  image: string;
  narrativeNumber: string;
}

const STORIES: ImpactStory[] = [
  {
    id: 'story-1',
    tag: 'EDUCATION DRIVE',
    badge: 'Mayurbhanj District',
    title: 'Priya’s Journey to Higher Studies',
    summary: 'From financial struggle to self-reliance — Priya now leads a rural learning center empowering 120 young students.',
    author: 'Priya Marndi',
    role: 'Scholar & Community Educator',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    narrativeNumber: 'Impact Narrative #104',
  },
  {
    id: 'story-2',
    tag: 'ECOLOGICAL CSR',
    badge: 'Kendujhar Region',
    title: 'Kalinga Green Reforestation Drive',
    summary: 'Community-led grove restoration planting 50,000+ native saplings and reviving natural water streams.',
    author: 'Ramesh Naik',
    role: 'Forest Guardian Committee Lead',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
    narrativeNumber: 'Impact Narrative #108',
  },
  {
    id: 'story-3',
    tag: 'ARTISAN EMPOWERMENT',
    badge: 'Koraput District',
    title: 'Asha Traditional Handicraft Guild',
    summary: 'Empowering 85 women weavers through organic dyes and direct fair-trade artisan commerce.',
    author: 'Sunita Majhi',
    role: 'Master Weaver & Guild Director',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
    narrativeNumber: 'Impact Narrative #112',
  },
  {
    id: 'story-4',
    tag: 'DIGITAL LITERACY',
    badge: 'Sundargarh District',
    title: 'Prativa Youth Digital Skill Hub',
    summary: 'Equipping rural youth with computer logic, web application skills, and online financial literacy.',
    author: 'Deepak Kisan',
    role: 'Junior Developer & Student',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
    narrativeNumber: 'Impact Narrative #116',
  },
  {
    id: 'story-5',
    tag: 'HEALTHCARE REACH',
    badge: 'Ganjam Tribal Belt',
    title: 'Gramin Mobile Healthcare Outposts',
    summary: 'Solar-equipped medical vans bringing primary diagnostics and tele-consultations to 15,000+ villagers.',
    author: 'Dr. Archana Das',
    role: 'Chief Medical Officer',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=80',
    narrativeNumber: 'Impact Narrative #120',
  },
];

export const FeaturedImpactStory: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % STORIES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + STORIES.length) % STORIES.length);
  };

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (sliderRef.current) {
      const activeEl = sliderRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeIndex]);

  return (
    <section
      id="impact-story"
      className="py-14 sm:py-16 lg:py-20 lg:min-h-[85vh] lg:max-h-[920px] flex flex-col justify-center bg-institutional-light dark:bg-institutional-dark text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden relative"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between text-center sm:text-left gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-3 mb-2 justify-center sm:justify-start">
              <span className="h-[1px] w-8 bg-institutional-accent" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
                Featured Impact Story
              </span>
              <span className="h-[1px] w-8 bg-institutional-accent sm:hidden" />
            </div>
            <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
              Real People. Real Change.
            </h2>
            <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 mt-1.5 max-w-xl">
              Every story reflects hope, dedication, and the power of collective grassroots action.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-space text-gray-400 mr-2">
              0{activeIndex + 1} / 0{STORIES.length}
            </span>
            <button
              onClick={handlePrev}
              aria-label="Previous Impact Story"
              className="p-2 sm:p-2.5 rounded-full border border-institutional-dark/15 dark:border-white/15 hover:border-institutional-accent text-institutional-dark dark:text-white hover:text-institutional-accent transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Impact Story"
              className="p-2 sm:p-2.5 rounded-full border border-institutional-dark/15 dark:border-white/15 hover:border-institutional-accent text-institutional-dark dark:text-white hover:text-institutional-accent transition-all duration-200 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Full-Bleed 100vw Carousel Container on Mobile View */}
        <div className="relative w-[100vw] -ml-6 sm:w-full sm:ml-0 overflow-hidden">
          {/* Left Gradient Edge Fade (Soft Ambient Blend) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-32 lg:w-44 bg-gradient-to-r from-institutional-light via-institutional-light/70 dark:from-institutional-dark dark:via-institutional-dark/70 to-transparent z-20" />

          {/* Right Gradient Edge Fade (Soft Ambient Blend) */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-32 lg:w-44 bg-gradient-to-l from-institutional-light via-institutional-light/70 dark:from-institutional-dark dark:via-institutional-dark/70 to-transparent z-20" />

          {/* Horizontal Snap Slider (Peek 20-25% Previous & Next Cards on Mobile) */}
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-7 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-6 sm:px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {STORIES.map((story) => (
              <div
                key={story.id}
                className="snap-center shrink-0 w-[72vw] sm:w-[320px] md:w-[360px] lg:w-[400px] transition-opacity duration-300"
              >
                <InteractiveCard className="group relative h-[420px] sm:h-[520px] rounded-sm overflow-hidden shadow-lg border border-white/15 dark:border-white/10 p-0">
                  {/* Full-Card Edge-to-Edge Background Image with Smooth Hover Brightening & Scale */}
                  <div className="absolute inset-0 z-0 overflow-hidden rounded-sm">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      unoptimized
                      className="object-cover object-center transform group-hover:scale-105 group-hover:brightness-110 transition-all duration-500 ease-out"
                    />
                    {/* Soft Light Overlay in Light Mode & Rich Dark Gradient in Dark Mode */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/25 dark:from-black/95 dark:via-black/70 dark:to-black/35 group-hover:from-black/90 transition-colors duration-300" />
                  </div>

                  {/* Inner Overlay Content Container with Generous Padding */}
                  <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-8 lg:p-9">
                    {/* Top Area: Category Label & Location Metadata */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-space tracking-widest uppercase font-semibold text-institutional-accent bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/15">
                        {story.tag}
                      </span>
                      <span className="text-[10px] font-space tracking-wider text-gray-300 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-sm">
                        {story.badge}
                      </span>
                    </div>

                    {/* Center & Bottom Area: Person's Name, Story Title, Summary, CTA */}
                    <div className="mt-auto pt-6">
                      {/* Person's Name as Primary Focal Point */}
                      <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-white group-hover:text-institutional-accent transition-colors duration-300 leading-tight mb-2">
                        {story.author}
                      </h3>

                      {/* Story Title */}
                      <p className="font-cormorant text-base sm:text-lg text-institutional-accent font-medium leading-snug italic mb-3 line-clamp-1">
                        {story.title}
                      </p>

                      {/* Summary Paragraph */}
                      <p className="font-manrope text-xs sm:text-sm text-gray-300 line-clamp-2 leading-relaxed mb-5">
                        {story.summary}
                      </p>

                      {/* Bottom CTA Row */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/20">
                        <span className="font-space text-[10px] text-gray-400 uppercase tracking-wider">
                          {story.narrativeNumber}
                        </span>
                        <a
                          href="#story-detail"
                          className="inline-flex items-center gap-1.5 text-xs font-space font-semibold uppercase tracking-wider text-white group-hover:text-institutional-accent transition-colors cursor-pointer"
                        >
                          <span>Read Story</span>
                          <ArrowRight className="w-3.5 h-3.5 text-institutional-accent group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </InteractiveCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedImpactStory;
