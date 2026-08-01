import React from 'react';
import { Play } from 'lucide-react';

export const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-institutional-darker">
      {/* 16:9 Aspect Ratio Container Placeholder */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Subtle geometric structural pattern overlay */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(197, 160, 89, 0.25) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Video Placeholder Container */}
        <div className="relative w-full max-w-6xl aspect-video mx-4 rounded-md border border-white/10 bg-institutional-surface/40 flex flex-col items-center justify-center p-8 text-center shadow-2xl backdrop-blur-sm">
          <div className="w-16 h-16 rounded-full bg-institutional-accent/20 border border-institutional-accent/40 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110 cursor-pointer">
            <Play className="w-6 h-6 text-institutional-accent fill-institutional-accent ml-1" />
          </div>
          <span className="text-xs uppercase tracking-widest font-space text-institutional-muted">
            Institutional Documentary Preview
          </span>
        </div>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-institutional-darker via-institutional-darker/70 to-institutional-darker/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-institutional-darker" />
      </div>
    </div>
  );
};
