'use client';

import React, { useRef, useState } from 'react';
import { ArrowUpRight, Calendar, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const EVENTS = [
  {
    title: 'Annual Sanman Awards Ceremony',
    summary: 'A prestigious evening celebrating excellence across literature, art, and social service, honoring the luminaries of Odisha.',
    date: '24 December 2026',
    venue: 'Ravindra Mandap, Bhubaneswar',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Youth Leadership & Cultural Workshop',
    summary: 'A three-day intensive workshop aimed at developing leadership skills while preserving traditional Odia cultural heritage.',
    date: '10 January 2027',
    venue: 'Foundation Campus, Cuttack',
    image: '/Odia Bazar/DSC05968.JPG',
  },
  {
    title: 'Odia Literature & Heritage Conclave',
    summary: 'A conclave and exhibition highlighting the rich history of Odia literature, poetry, and classical arts.',
    date: '18 February 2027',
    venue: 'Exhibition Ground, Bhubaneswar',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Community Health & Wellness Drive',
    summary: 'Providing free health check-ups, awareness sessions, and wellness support for underserved rural areas of Odisha.',
    date: '05 March 2027',
    venue: 'Rural Development Center, Jagatsinghpur',
    image: '/Sutahat/DSC05413.JPG',
  },
];

export const UpcomingEventsPreview: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftVal, setScrollLeftVal] = useState(0);

  const checkActiveIndex = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const totalWidth = scrollWidth - clientWidth;
      if (totalWidth <= 0) return;
      
      const cardWidth = scrollRef.current.children[0]?.getBoundingClientRect().width || 1;
      const index = Math.round(scrollLeft / (cardWidth + 24));
      setActiveIndex(Math.min(index, EVENTS.length - 1));
    }
  };

  const handleScroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.getBoundingClientRect().width || 300;
      const gap = 24;
      const amount = dir === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Drag listeners
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftVal(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftVal - walk;
  };

  return (
    <section id="events" className="py-16 lg:py-24 bg-white dark:bg-[#121824] border-b border-gray-200 dark:border-white/10 scroll-mt-24 sm:scroll-mt-28 min-h-[90vh] flex flex-col justify-center">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header with Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold block mb-4">
              Gatherings & Programmes
            </span>
            <h2 className="font-cormorant text-4xl lg:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
              Upcoming Events
            </h2>
          </div>
          
          {/* Arrow controls (desktop only) */}
          <div className="hidden md:flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => handleScroll('left')}
              className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-institutional-dark dark:text-white hover:border-institutional-accent hover:text-institutional-accent transition-all duration-300"
              aria-label="Previous Events"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-institutional-dark dark:text-white hover:border-institutional-accent hover:text-institutional-accent transition-all duration-300"
              aria-label="Next Events"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={checkActiveIndex}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-8 touch-pan-x cursor-grab ${isDown ? 'cursor-grabbing select-none' : ''}`}
        >
          {EVENTS.map((event) => (
            <div
              key={event.title}
              className="flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_45%] lg:flex-[0_0_30%] snap-start bg-institutional-light dark:bg-[#151C2B] rounded-sm overflow-hidden border border-gray-200 dark:border-white/10 hover:border-institutional-accent/50 transition-colors duration-300 flex flex-col h-[520px] justify-between"
            >
              {/* Card Image */}
              <div className="relative w-full h-[220px] overflow-hidden shrink-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out hover:scale-105"
                  style={{ backgroundImage: `url('${event.image}')` }}
                />
              </div>

              {/* Card Content */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold tracking-tight text-institutional-dark dark:text-white mb-3 hover:text-institutional-accent transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="font-manrope text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 mb-6">
                    {event.summary}
                  </p>
                </div>
                
                <div>
                  <div className="flex flex-col gap-2.5 mb-6 pt-4 border-t border-gray-200/50 dark:border-white/5">
                    <div className="flex items-center gap-3 text-xs font-manrope text-gray-700 dark:text-gray-300">
                      <Calendar className="w-4 h-4 text-institutional-accent shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-manrope text-gray-700 dark:text-gray-300">
                      <MapPin className="w-4 h-4 text-institutional-accent shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>

                  <Link
                    href="/get-involved/volunteer"
                    className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-widest font-space font-semibold text-institutional-accent hover:text-institutional-accentHover transition-colors duration-200"
                  >
                    <span>Register Interest</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6 md:hidden">
          {EVENTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (scrollRef.current) {
                  const cardWidth = scrollRef.current.children[0]?.getBoundingClientRect().width || 300;
                  scrollRef.current.scrollTo({ left: idx * (cardWidth + 24), behavior: 'smooth' });
                }
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-institutional-accent w-6' : 'bg-gray-300 dark:bg-white/20'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
