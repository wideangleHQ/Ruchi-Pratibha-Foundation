'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, Calendar, Users, Award, Shield, Sparkles, Star, Check } from 'lucide-react';
import { Navigation } from '@/modules/home/sections/Navigation';
import { Footer } from '@/modules/home/sections/Footer';
import { DAMDAAR_DOMAINS, DAMDAAR_TIMELINE } from './data/damdaarData';
import damdaarBg from '@/assets/Damdaar Odia Background.png';
import damdaarBgMobile from '@/assets/Backgroudn Mobile Screen.png';
import { AccordionGallery } from '@/components/ui/AccordionGallery/AccordionGallery';

export const DamdaarOdiaPage: React.FC = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#FDFBF7] text-institutional-dark font-poppins relative overflow-x-hidden selection:bg-damdaar-gold selection:text-white"
    >
      {/* 01. Global Navigation Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen min-h-screen lg:h-dvh lg:min-h-dvh flex items-center justify-center px-4 sm:px-6 lg:px-8 border-b border-black/5 bg-[#FDFBF7] overflow-hidden">
        {/* Full-width Responsive Cultural Background Image Asset */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          {/* Desktop/Tablet viewports */}
          <div className="hidden md:block absolute inset-0 w-full h-full">
            <Image
              src={damdaarBg}
              alt="Dumdaar Odia Cultural Background Illustrative Art"
              fill
              priority
              sizes="100vw"
              quality={95}
              className="object-cover object-center"
            />
          </div>
          {/* Mobile viewports */}
          <div className="block md:hidden absolute inset-0 w-full h-full">
            <Image
              src={damdaarBgMobile}
              alt="Dumdaar Odia Cultural Background Mobile Illustrative Art"
              fill
              priority
              sizes="100vw"
              quality={95}
              className="object-cover object-center"
            />
          </div>
          {/* Subtle blend overlay */}
          <div className="absolute inset-0 bg-[#FDFBF7]/5" />
        </div>

        {/* Central Clean Typography Container */}
        <div className="max-w-4xl w-full mx-auto flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 pt-16 relative z-10">
          {/* Top Pill Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-black/10 rounded-full text-[10px] sm:text-xs font-bold tracking-widest text-[#343D0F] uppercase bg-white/40 backdrop-blur-sm shadow-sm font-space"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#CF8A12]" />
            <span>THE NEXT CHAPTER OF ODISHA</span>
          </motion.div>

          {/* DUMDAAR ଓଡ଼ିଆ stacked title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center justify-center space-y-0 leading-none select-none"
          >
            <span className="font-playfair text-6xl sm:text-8xl lg:text-9xl font-bold uppercase tracking-tight text-[#343D0F]">
              DUMDAAR
            </span>
            <span className="font-hatalekha text-6xl sm:text-8xl lg:text-9xl xl:text-[9.5rem] text-[#CF8A12] leading-[0.85] relative -top-1 sm:-top-3 block">
              ଓଡ଼ିଆ
            </span>
          </motion.div>

          {/* Editorial Campaign Tagline with gold line separators */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex items-center justify-center gap-3 sm:gap-4 w-full select-none"
          >
            <span className="h-[1px] w-8 sm:w-16 bg-[#CF8A12]/30" />
            <span className="text-[#CF8A12] text-xs sm:text-sm">✦</span>
            <h2 className="font-playfair text-sm sm:text-base lg:text-lg font-bold tracking-widest text-[#343D0F] uppercase">
              THE NEXT CHAPTER OF ODISHA.
            </h2>
            <span className="text-[#CF8A12] text-xs sm:text-sm">✦</span>
            <span className="h-[1px] w-8 sm:w-16 bg-[#CF8A12]/30" />
          </motion.div>

          {/* Concise Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-poppins text-xs sm:text-sm lg:text-base text-gray-700 max-w-xl leading-relaxed"
          >
            A celebration of Odisha&apos;s limitless potential — discovering, nurturing and empowering extraordinary talent across diverse fields.
          </motion.p>

          {/* Centered Actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto justify-center items-center"
          >
            <motion.a
              href="#domains"
              whileHover={{ scale: 1.03, y: -2, boxShadow: '0 10px 25px -5px rgba(207,138,18,0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-3.5 text-xs font-semibold text-white uppercase tracking-widest bg-[#CF8A12] rounded-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CF8A12] min-h-[46px] w-full sm:w-auto relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#movement"
              whileHover={{ scale: 1.02, y: -1, backgroundColor: 'rgba(255, 255, 255, 0.7)', borderColor: '#343D0F' }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-3.5 text-xs font-semibold text-[#343D0F] uppercase tracking-widest border border-[#343D0F]/30 bg-white/30 backdrop-blur-sm rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343D0F] min-h-[46px] w-full sm:w-auto shadow-sm"
            >
              <span>Know More</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#343D0F]/70 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* The Movement Section */}
      <section id="movement" className="relative h-[50vh] min-h-[50vh] flex items-center justify-center bg-white border-b border-black/5 scroll-mt-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-3"
          >
            <span className="text-xs uppercase tracking-widest font-bold text-damdaar-gold block font-space">THE CONCEPT</span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-institutional-dark">
              A Movement for Odisha&apos;s Talent
            </h2>
            <div className="w-16 h-0.5 bg-damdaar-gold mx-auto mt-4" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="font-poppins text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            &ldquo;We stand at the threshold of potential and possibility. DUMDAAR ODIA is an incubator designed to foster talent that fuses cultural heritage with digital advancements.&rdquo;
          </motion.p>
        </div>
      </section>

      {/* The Four Domains Section */}
      <section id="domains" className="py-24 bg-[#FDFBF7] border-b border-black/5 scroll-mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-damdaar-gold block font-space">THE DOMAINS</span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold">
              Where Does Your Talent Belong?
            </h2>
            <p className="text-xs text-gray-400 font-space mt-1">SELECT A CATEGORY PANEL TO DEEP-DIVE AND REGISTER</p>
          </div>

          {/* Editorial Asymmetrical Domain Grid replaced with React Bits AccordionGallery */}
          <div className="w-full relative mt-8">
            <AccordionGallery
              items={[
                { image: '/Odia Bazar/DSC05968.JPG', label: 'Art & Culture (Heritage)', link: '/damdaar-odia/domains/art-culture' },
                { image: '/Sutahat/DSC05409.JPG', label: 'Technology (Digital)', link: '/damdaar-odia/domains/technology' },
                { image: '/Odia Bazar/DSC05990.JPG', label: 'Entrepreneurship (Enterprise)', link: '/damdaar-odia/domains/entrepreneurship' },
                { image: '/Sutahat/DSC05413.JPG', label: 'Culinary Excellence (Cuisine)', link: '/damdaar-odia/domains/culinary-excellence' }
              ]}
              defaultIndex={0}
              expandRatio={0.45}
              accentColor="#CF8A12"
              overlayColor="#0B0F17"
              gap={12}
              radius={8}
              height={440}
              trigger="hover"
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-damdaar-gold block font-space">THE PIPELINE</span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold">
              How the Campaign Works
            </h2>
            <div className="w-16 h-0.5 bg-damdaar-gold mx-auto mt-4" />
          </div>

          {/* Pipeline Path Graphic representation */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Step 1 */}
            <div className="space-y-3 relative text-center md:text-left">
              <span className="w-8 h-8 rounded-full bg-damdaar-gold/15 text-damdaar-gold flex items-center justify-center font-bold text-sm mx-auto md:mx-0">1</span>
              <h4 className="font-playfair text-lg font-bold">Choose</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Evaluate the four domains and choose the profile category that matches your skills.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 relative text-center md:text-left">
              <span className="w-8 h-8 rounded-full bg-damdaar-gold/15 text-damdaar-gold flex items-center justify-center font-bold text-sm mx-auto md:mx-0">2</span>
              <h4 className="font-playfair text-lg font-bold">Register</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Complete the customized digital application and verify credentials.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3 relative text-center md:text-left">
              <span className="w-8 h-8 rounded-full bg-damdaar-gold/15 text-damdaar-gold flex items-center justify-center font-bold text-sm mx-auto md:mx-0">3</span>
              <h4 className="font-playfair text-lg font-bold">Showcase</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Submit recipes, prototypes, pitch decks, or performance recordings to the portal.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-3 relative text-center md:text-left">
              <span className="w-8 h-8 rounded-full bg-damdaar-gold/15 text-damdaar-gold flex items-center justify-center font-bold text-sm mx-auto md:mx-0">4</span>
              <h4 className="font-playfair text-lg font-bold">Participate</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Engage in regional live showcases, hackathons, or cook-offs with subject matter experts.
              </p>
            </div>

            {/* Step 5 */}
            <div className="space-y-3 relative text-center md:text-left">
              <span className="w-8 h-8 rounded-full bg-damdaar-gold text-white flex items-center justify-center font-bold text-sm mx-auto md:mx-0 shadow-sm">5</span>
              <h4 className="font-playfair text-lg font-bold text-damdaar-gold">Rise</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Receive grant opportunities, direct recognition, and enter Odisha&apos;s talent ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates Timeline Section */}
      <section id="timeline" className="py-24 bg-[#FDFBF7] border-b border-black/5 scroll-mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-damdaar-gold block font-space">THE ROADMAP</span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold">
              Important Roadmap Dates
            </h2>
            <div className="w-16 h-0.5 bg-damdaar-gold mx-auto mt-4" />
          </div>

          {/* Interactive timeline list */}
          <div className="space-y-8 relative before:absolute before:left-4 md:before:left-1/2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {DAMDAAR_TIMELINE.map((event) => {
              return (
                <div key={event.id} className="relative flex flex-col md:flex-row items-start md:items-center justify-between md:even:flex-row-reverse gap-4">
                  {/* Timeline bullet dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-damdaar-gold z-10 flex items-center justify-center">
                    {event.status === 'current' && <span className="w-1.5 h-1.5 rounded-full bg-damdaar-gold animate-ping" />}
                  </div>

                  {/* Empty side space for desktop grid balancing */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Date Card Panel */}
                  <div className="w-full md:w-[45%] pl-10 md:pl-0">
                    <div className="bg-white border border-black/5 rounded-sm p-6 shadow-sm space-y-2 hover:border-damdaar-gold/30 transition-all duration-200">
                      <div className="flex items-center gap-2 text-xs font-semibold text-damdaar-gold font-space">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{event.date}</span>
                      </div>
                      <h4 className="font-playfair text-lg font-bold text-institutional-dark">{event.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-poppins">{event.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Participate Section */}
      <section className="py-24 bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-damdaar-gold block font-space">THE REWARDS</span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold">
              Why Participate in Damdaar Odisha?
            </h2>
            <div className="w-16 h-0.5 bg-damdaar-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1 */}
            <div className="space-y-3 text-center md:text-left bg-[#FDFBF7] p-6 border border-black/5 rounded-sm">
              <div className="w-10 h-10 rounded-full bg-damdaar-gold/10 text-damdaar-gold flex items-center justify-center mx-auto md:mx-0">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-playfair text-lg font-bold">Research Grants</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-poppins">
                Financial support and infrastructure stipends for promising projects and developmental innovations.
              </p>
            </div>

            {/* 2 */}
            <div className="space-y-3 text-center md:text-left bg-[#FDFBF7] p-6 border border-black/5 rounded-sm">
              <div className="w-10 h-10 rounded-full bg-damdaar-gold/10 text-damdaar-gold flex items-center justify-center mx-auto md:mx-0">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-playfair text-lg font-bold">Mentorship Access</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-poppins">
                Direct exposure to top startup mentors, institutional administrators, tech executives, and master chefs.
              </p>
            </div>

            {/* 3 */}
            <div className="space-y-3 text-center md:text-left bg-[#FDFBF7] p-6 border border-black/5 rounded-sm">
              <div className="w-10 h-10 rounded-full bg-damdaar-gold/10 text-damdaar-gold flex items-center justify-center mx-auto md:mx-0">
                <Star className="w-5 h-5" />
              </div>
              <h4 className="font-playfair text-lg font-bold">Global Exposure</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-poppins">
                Showcase opportunities in national conventions, corporate platforms, and cultural exchange summits.
              </p>
            </div>

            {/* 4 */}
            <div className="space-y-3 text-center md:text-left bg-[#FDFBF7] p-6 border border-black/5 rounded-sm">
              <div className="w-10 h-10 rounded-full bg-damdaar-gold/10 text-damdaar-gold flex items-center justify-center mx-auto md:mx-0">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-playfair text-lg font-bold">Trust Endorsement</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-poppins">
                Validation by the prestigious Ruchi Prativa Foundation, serving as a gateway to commercial and academic ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-28 bg-[#121824] text-white relative overflow-hidden">
        {/* Subtle Background radial overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,138,18,0.08),transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
          <span className="text-[10px] uppercase tracking-widest font-bold text-damdaar-gold block font-space">JOIN THE MOVEMENT</span>
          
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mx-auto">
            The next chapter of Odisha starts with you.
          </h2>

          <p className="font-poppins text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
            Choose your domain, complete the registration framework, and showcase your talent to the region.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center items-center">
            <a
              href="#domains"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold text-institutional-dark bg-damdaar-gold hover:bg-damdaar-gold/95 rounded-sm shadow-md transition-colors duration-200 flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-damdaar-gold whitespace-nowrap min-h-[44px]"
            >
              <span>Register Now</span>
              <Check className="w-4 h-4" />
            </a>
            <a
              href="#domains"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold text-white hover:text-damdaar-gold uppercase tracking-widest border border-white/20 hover:border-damdaar-gold/40 rounded-sm transition-colors duration-200 flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap min-h-[44px]"
            >
              <span>Explore Domains</span>
            </a>
          </div>

          {/* Simple Vector convergence symbol element centered */}
          <div className="pt-10 flex justify-center opacity-40">
            <svg viewBox="0 0 100 100" className="w-16 h-16">
              <path d="M 15 50 A 35 35 0 1 0 85 50" stroke="#CF8A12" strokeWidth="2.5" fill="none" />
              <circle cx="50" cy="50" r="6" fill="#CF8A12" />
            </svg>
          </div>
        </div>
      </section>

      {/* 03. Global Footer */}
      <Footer />
    </div>
  );
};

export default DamdaarOdiaPage;
