import React from 'react';
import { HeroBackground } from './components/HeroBackground';
import { HeroContent } from './components/HeroContent';
import { ScrollIndicator } from './components/ScrollIndicator';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-institutional-darker text-white overflow-hidden pt-16">
      <HeroBackground />
      <HeroContent />
      <ScrollIndicator />
    </section>
  );
};

export default Hero;
