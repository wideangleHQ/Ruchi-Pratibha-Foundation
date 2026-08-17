import React from 'react';
import { HeroBackground } from './components/HeroBackground';
import { HeroContent } from './components/HeroContent';
import { ScrollIndicator } from './components/ScrollIndicator';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[100dvh] sm:min-h-screen w-full bg-institutional-darker text-white overflow-hidden flex flex-col justify-end pt-16 pb-10 sm:pb-16 lg:pb-20">
      <HeroBackground />
      <HeroContent />
      <ScrollIndicator />
    </section>
  );
};

export default Hero;
