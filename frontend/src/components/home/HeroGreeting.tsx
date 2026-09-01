import React from 'react';
import { Sparkles } from 'lucide-react';

export const HeroGreeting: React.FC = () => {
  const getGreetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-3 pt-6 pb-2 select-none">
      {/* Top Sparkle with Glow */}
      <div className="relative flex items-center justify-center mb-1">
        <div className="absolute w-8 h-8 rounded-full bg-purple-500/20 blur-md animate-pulse" />
        <Sparkles className="w-5 h-5 text-purple-400 fill-purple-400/40 relative z-10 animate-sparkle" />
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
        {getGreetingTime()},{' '}
        <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
          Akshita
        </span>{' '}
        <span className="inline-block animate-bounce origin-bottom">👋</span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-zinc-400 max-w-xl font-normal leading-relaxed">
        How can I help you automate, search, create or organize today?
      </p>
    </div>
  );
};
