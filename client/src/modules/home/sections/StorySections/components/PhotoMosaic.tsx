'use client';

import React from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

export const PhotoMosaic: React.FC = () => {
  const galleryItems = [
    { title: 'Award Ceremony & Honors Assembly', category: 'Culture' },
    { title: 'Rural Healthcare & Vision Clinics', category: 'Health' },
    { title: 'Empowering Young Scholars', category: 'Education' },
    { title: 'Volunteer Community Drives', category: 'Community' },
    { title: 'Environmental & Afforestation Initiatives', category: 'Environment' },
    { title: 'Amaruchi Journal Launch', category: 'Knowledge' },
    { title: 'Grassroots Tribal Dialogue', category: 'Heritage' },
  ];

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-institutional-cream dark:bg-institutional-surface/20 text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
              Visual Narrative
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Moments in Time
          </h2>
          <p className="font-manrope text-sm text-institutional-mutedLight dark:text-gray-300 mt-3">
            A photographic tapestry of three decades of service, celebration, and community connection across Odisha.
          </p>
        </div>

        {/* Photo Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
          {galleryItems.map((item, index) => {
            // Asymmetrical grid column spans for an editorial magazine layout
            const colSpanClass =
              index === 0
                ? 'lg:col-span-8 aspect-[16/9]'
                : index === 1
                ? 'lg:col-span-4 aspect-[4/3]'
                : index === 2
                ? 'lg:col-span-4 aspect-[4/3]'
                : index === 3
                ? 'lg:col-span-4 aspect-[4/3]'
                : index === 4
                ? 'lg:col-span-4 aspect-[4/3]'
                : index === 5
                ? 'lg:col-span-6 aspect-[16/9]'
                : 'lg:col-span-6 aspect-[16/9]';

            return (
              <div
                key={item.title}
                className={`group relative rounded-sm bg-white dark:bg-institutional-surface/40 border border-institutional-dark/10 dark:border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:border-institutional-accent transition-all duration-300 ${colSpanClass}`}
              >
                {/* Background Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(197, 160, 89, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 160, 89, 0.15) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-space tracking-widest text-institutional-accent uppercase font-semibold">
                    {item.category} Archive
                  </span>
                  <Camera className="w-4 h-4 text-institutional-accent/70" />
                </div>

                <div className="relative z-10 my-auto text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-institutional-dark dark:bg-white/10 text-institutional-accent flex items-center justify-center mx-auto mb-3 shadow transition-transform duration-300 group-hover:scale-110">
                    <ImageIcon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h4 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white group-hover:text-institutional-accent transition-colors">
                    {item.title}
                  </h4>
                </div>

                <div className="relative z-10 pt-2 border-t border-institutional-dark/5 dark:border-white/5 flex items-center justify-between text-[9px] font-space text-institutional-mutedLight dark:text-gray-400">
                  <span>Photo Archive</span>
                  <span className="text-institutional-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    View Image →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
