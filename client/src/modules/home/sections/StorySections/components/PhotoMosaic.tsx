'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Masonry, MasonryItem } from './Masonry';

const GALLERY_ITEMS: MasonryItem[] = [
  // Covid Precaution Shooting
  {
    id: 'covid-1',
    title: 'Covid Precaution Shooting',
    category: 'Healthcare',
    badge: 'Covid Precaution Shooting',
    img: '/CSR/Covid Precaution Shooting/DSC_1200.JPG',
    height: 520,
    url: '/work#csr-gallery',
  },
  {
    id: 'covid-2',
    title: 'Covid Precaution Shooting',
    category: 'Healthcare',
    badge: 'Covid Precaution Shooting',
    img: '/CSR/Covid Precaution Shooting/DSC_1154.JPG',
    height: 440,
    url: '/work#csr-gallery',
  },
  {
    id: 'covid-3',
    title: 'Covid Precaution Shooting',
    category: 'Healthcare',
    badge: 'Covid Precaution Shooting',
    img: '/CSR/Covid Precaution Shooting/DSC_1187.JPG',
    height: 480,
    url: '/work#csr-gallery',
  },

  // Jajpur salute to corona warrior
  {
    id: 'jajpur-1',
    title: 'Jajpur salute to corona warrior',
    category: 'Community Welfare',
    badge: 'Jajpur salute to corona warrior',
    img: '/CSR/Jajpur salute to corona warrior/DSC_0892.JPG',
    height: 380,
    url: '/work#csr-gallery',
  },
  {
    id: 'jajpur-2',
    title: 'Jajpur salute to corona warrior',
    category: 'Community Welfare',
    badge: 'Jajpur salute to corona warrior',
    img: '/CSR/Jajpur salute to corona warrior/DSC_0874.JPG',
    height: 460,
    url: '/work#csr-gallery',
  },
  {
    id: 'jajpur-3',
    title: 'Jajpur salute to corona warrior',
    category: 'Community Welfare',
    badge: 'Jajpur salute to corona warrior',
    img: '/CSR/Jajpur salute to corona warrior/DSC_0889.JPG',
    height: 400,
    url: '/work#csr-gallery',
  },

  // Salute to corona warrioir Dhenkanal
  {
    id: 'dhenkanal-1',
    title: 'Salute to corona warrioir Dhenkanal',
    category: 'Community Welfare',
    badge: 'Salute to corona warrioir Dhenkanal',
    img: '/CSR/Salute to corona warrioir Dhenkanal/DSC_3226.JPG',
    height: 580,
    url: '/work#csr-gallery',
  },
  {
    id: 'dhenkanal-2',
    title: 'Salute to corona warrioir Dhenkanal',
    category: 'Community Welfare',
    badge: 'Salute to corona warrioir Dhenkanal',
    img: '/CSR/Salute to corona warrioir Dhenkanal/DSC_3162.JPG',
    height: 420,
    url: '/work#csr-gallery',
  },
  {
    id: 'dhenkanal-3',
    title: 'Salute to corona warrioir Dhenkanal',
    category: 'Community Welfare',
    badge: 'Salute to corona warrioir Dhenkanal',
    img: '/CSR/Salute to corona warrioir Dhenkanal/DSC_3201.JPG',
    height: 490,
    url: '/work#csr-gallery',
  },

  // Odia Bazar
  {
    id: 'odia-bazar-1',
    title: 'Odia Bazar',
    category: 'Community Welfare',
    badge: 'Odia Bazar',
    img: '/CSR/Odia Bazar/DSC05968.JPG',
    height: 390,
    url: '/work#csr-gallery',
  },
  {
    id: 'odia-bazar-2',
    title: 'Odia Bazar',
    category: 'Community Welfare',
    badge: 'Odia Bazar',
    img: '/CSR/Odia Bazar/DSC05990.JPG',
    height: 500,
    url: '/work#csr-gallery',
  },
  {
    id: 'odia-bazar-3',
    title: 'Odia Bazar',
    category: 'Community Welfare',
    badge: 'Odia Bazar',
    img: '/CSR/Odia Bazar/DSC06000.JPG',
    height: 340,
    url: '/work#csr-gallery',
  },

  // Sutahat
  {
    id: 'sutahat-1',
    title: 'Sutahat',
    category: 'Healthcare',
    badge: 'Sutahat',
    img: '/CSR/Sutahat/DSC05409.JPG',
    height: 480,
    url: '/work#csr-gallery',
  },
  {
    id: 'sutahat-2',
    title: 'Sutahat',
    category: 'Healthcare',
    badge: 'Sutahat',
    img: '/CSR/Sutahat/DSC05413.JPG',
    height: 410,
    url: '/work#csr-gallery',
  },
  {
    id: 'sutahat-3',
    title: 'Sutahat',
    category: 'Healthcare',
    badge: 'Sutahat',
    img: '/CSR/Sutahat/DSC05416.JPG',
    height: 530,
    url: '/work#csr-gallery',
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
            A visual archive showcasing community participation, healthcare outreach, educational initiatives, environmental campaigns, cultural programmes, and volunteer activities.
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

          {/* Cinematic Bottom Gradient Fade-Out */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-80 sm:h-[380px] lg:h-[450px] bg-gradient-to-t from-institutional-cream via-institutional-cream/85 dark:from-[#0B0F17] dark:via-[#0B0F17]/85 to-transparent z-20" />
        </div>

        {/* Integrated Bottom CTA Button */}
        <div className="-mt-16 sm:-mt-20 lg:-mt-24 text-center relative z-30">
          <a
            href="/work#csr-gallery"
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
