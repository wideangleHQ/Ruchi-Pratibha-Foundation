'use client';

import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const STORIES = [
  {
    name: 'Ananya Dash',
    activity: 'Education Volunteer',
    quote: 'Serving my community through the Foundation has been one of the most rewarding experiences of my life.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Dr. Ramesh Mohanty',
    activity: 'Healthcare Partner',
    quote: 'The collaborative environment here allows us to reach remote villages and deliver care where it is needed most.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Priyanka Sahoo',
    activity: 'Cultural Ambassador',
    quote: 'Being part of the Sanman Awards team taught me the true value of honoring those who dedicate their lives to service.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Siddharth Patnaik',
    activity: 'Environmental Volunteer',
    quote: 'Restoring local green spaces and working with the rural communities has completely shifted my worldview.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
];

export const StoriesPreview: React.FC = () => {
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
      setActiveIndex(Math.min(index, STORIES.length - 1));
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
    <section className="py-16 lg:py-24 bg-white dark:bg-[#121824] border-b border-gray-200 dark:border-white/10 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header with Arrow controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold block mb-4">
              Voices of Impact
            </span>
            <h2 className="font-cormorant text-4xl lg:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
              Stories From Our Community
            </h2>
          </div>
          
          <div className="hidden md:flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => handleScroll('left')}
              className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-institutional-dark dark:text-white hover:border-institutional-accent hover:text-institutional-accent transition-all duration-300"
              aria-label="Previous Stories"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-institutional-dark dark:text-white hover:border-institutional-accent hover:text-institutional-accent transition-all duration-300"
              aria-label="Next Stories"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          onScroll={checkActiveIndex}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-8 touch-pan-x cursor-grab ${isDown ? 'cursor-grabbing select-none' : ''}`}
        >
          {STORIES.map((story) => (
            <div
              key={story.name}
              className="flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_45%] lg:flex-[0_0_30%] snap-start relative h-[480px] overflow-hidden rounded-sm bg-institutional-dark group"
            >
              {/* Immersive Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${story.image}')` }}
              />
              
              {/* Gradients Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-institutional-dark via-institutional-dark/60 to-transparent" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              
              {/* Immersive Editorial Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="w-10 h-10 rounded-full bg-institutional-accent/20 backdrop-blur-md flex items-center justify-center text-institutional-accent shrink-0 border border-institutional-accent/25">
                  <Quote className="w-4 h-4" />
                </div>
                
                <div>
                  <p className="font-manrope text-sm sm:text-base text-gray-150 leading-relaxed italic mb-6">
                    &quot;{story.quote}&quot;
                  </p>
                  
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="font-cormorant text-2xl font-bold tracking-tight text-white mb-0.5">
                      {story.name}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest font-space font-semibold text-institutional-accent">
                      {story.activity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-6 md:hidden">
          {STORIES.map((_, idx) => (
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
