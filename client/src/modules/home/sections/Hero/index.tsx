import React from 'react';
import { HeroBackground } from './components/HeroBackground';
import { HeroContent } from './components/HeroContent';
import { ScrollIndicator } from './components/ScrollIndicator';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[90vh] min-h-[90vh] sm:min-h-screen w-full bg-institutional-darker text-white overflow-hidden">
      <HeroBackground />
      <HeroContent />
      <ScrollIndicator />
    </section>
  );
};

export default Hero;
