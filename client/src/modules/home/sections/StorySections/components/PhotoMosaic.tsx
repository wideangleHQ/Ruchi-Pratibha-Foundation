'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Masonry, MasonryItem } from './Masonry';

const GALLERY_ITEMS: MasonryItem[] = [
  {
    id: '1',
    title: 'Award Ceremony & Honors Assembly',
    category: 'Culture',
    badge: 'Sanman Laureates 2024',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    height: 520,
    url: '#gallery-1',
  },
  {
    id: '2',
    title: 'Rural Healthcare & Mobile Vision Clinics',
    category: 'Health',
    badge: 'Ganjam Belt Outpost',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    height: 380,
    url: '#gallery-2',
  },
  {
    id: '3',
    title: 'Empowering Young Rural Scholars',
    category: 'Education',
    badge: 'Mayurbhanj District',
    img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    height: 580,
    url: '#gallery-3',
  },
  {
    id: '4',
    title: 'Volunteer Community Reforestation Drive',
    category: 'Environment',
    badge: 'Kendujhar Sacred Groves',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    height: 420,
    url: '#gallery-4',
  },
  {
    id: '5',
    title: 'Amaruchi Journal Flagship Launch',
    category: 'Knowledge',
    badge: 'Annual Publications',
    img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    height: 460,
    url: '#gallery-5',
  },
  {
    id: '6',
    title: 'Grassroots Tribal Dialogue & Heritage',
    category: 'Heritage',
    badge: 'Koraput Weavers Guild',
    img: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
    height: 540,
    url: '#gallery-6',
  },
  {
    id: '7',
    title: 'Youth Digital Skill & Tech Workshops',
    category: 'Technology',
    badge: 'Sundargarh Skill Hub',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    height: 390,
    url: '#gallery-7',
  },
  {
    id: '8',
    title: 'Women Artisan Fair-Trade Assembly',
    category: 'Empowerment',
    badge: 'Asha Handicrafts',
    img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
    height: 500,
    url: '#gallery-8',
  },
  {
    id: '9',
    title: 'Clean Water Micro-Pumping Stations',
    category: 'Infrastructure',
    badge: 'Bhadrak Coastal Belt',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    height: 340,
    url: '#gallery-9',
  },
  {
    id: '10',
    title: 'Youth Leadership & Civic Engagement',
    category: 'Governance',
    badge: 'Bhubaneswar Assembly',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    height: 480,
    url: '#gallery-10',
  },
  {
    id: '11',
    title: 'Organic Farming & Seed Preservation',
    category: 'Agriculture',
    badge: 'Kalahandi Collective',
    img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    height: 410,
    url: '#gallery-11',
  },
  {
    id: '12',
    title: 'Maternal Wellness & Nutritional Support',
    category: 'Health',
    badge: 'Rayagada Outpost',
    img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    height: 530,
    url: '#gallery-12',
  },
  {
    id: '13',
    title: 'Solar Lanterns for Remote Classrooms',
    category: 'Energy',
    badge: 'Malkangiri Frontier',
    img: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80',
    height: 360,
    url: '#gallery-13',
  },
  {
    id: '14',
    title: 'Community Folk Music & Cultural Revival',
    category: 'Culture',
    badge: 'Puri District Guild',
    img: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    height: 470,
    url: '#gallery-14',
  },
];

export const PhotoMosaic: React.FC = () => {
  return (
    <section
      id="gallery"
      className="pt-14 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-14 bg-institutional-cream dark:bg-institutional-surface/20 text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden relative"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
              Historical Gallery
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Moments That Define Our Journey
          </h2>
          <p className="font-manrope text-sm text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Discover memorable moments from award ceremonies, educational initiatives, literary gatherings, cultural celebrations, and Foundation activities spanning nearly three decades.
          </p>
        </div>

        {/* React Bits Pinterest-Style Dense Masonry Gallery */}
        <div className="relative">
          <Masonry
            items={GALLERY_ITEMS}
            ease="power3.out"
            duration={0.6}
            stagger={0.04}
            animateFrom="bottom"
            blurToFocus={true}
          />

          {/* Cinematic Bottom Gradient Fade-Out (Starts 200px Higher with Seamless Blend) */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-80 sm:h-[380px] lg:h-[450px] bg-gradient-to-t from-institutional-cream via-institutional-cream/85 dark:from-[#0B0F17] dark:via-[#0B0F17]/85 to-transparent z-20" />
        </div>

        {/* Integrated Bottom CTA Button: View More Moments */}
        <div className="-mt-16 sm:-mt-20 lg:-mt-24 text-center relative z-30">
          <a
            href="#full-gallery"
            className="group inline-flex items-center gap-2.5 px-6 py-3 sm:px-8 sm:py-4 bg-institutional-dark dark:bg-white text-white dark:text-institutional-dark hover:bg-institutional-accent hover:text-institutional-dark dark:hover:bg-institutional-accent dark:hover:text-institutional-dark font-space text-xs font-semibold tracking-widest uppercase rounded-sm shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <span>Explore Gallery</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-institutional-accent group-hover:text-institutional-dark group-hover:translate-x-1 transition-all duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PhotoMosaic;
