'use client';

import React from 'react';
import { Sparkles, Compass, RefreshCw } from 'lucide-react';
import { GreetingData } from '@/lib/types';

interface GreetingBannerProps {
  greetingData: GreetingData | null;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export default function GreetingBanner({
  greetingData,
  onRefresh,
  isRefreshing
}: GreetingBannerProps) {
  if (!greetingData) {
    return (
      <div className="w-full h-32 rounded-3xl glass-panel animate-pulse flex items-center justify-center">
        <span className="text-slate-400 font-medium">Scouting the wild for Zoe...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-3xl p-6 md:p-8 glass-panel overflow-hidden border border-white/10 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-amber-500/20 via-rose-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-cyan-500/20 via-emerald-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1 space-y-2">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-300 border border-white/10">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>Zoe&apos;s Expedition Radar</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Main Greeting */}
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white flex items-center flex-wrap gap-2">
            <span>{greetingData.greeting}</span>
          </h1>

          {/* Subtext callout */}
          <p className="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
            {greetingData.subtext}
          </p>
        </div>

        {/* Action Button: New Discoveries */}
        <div className="flex items-center gap-3 self-stretch md:self-auto">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white font-bold text-sm shadow-lg hover:shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Discovering...' : '🔄 New Discoveries!'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
