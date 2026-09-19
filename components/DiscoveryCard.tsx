'use client';

import React, { useState } from 'react';
import { ExternalLink, Heart, Sparkles, Share2, Check } from 'lucide-react';
import { DiscoveryCardItem } from '@/lib/types';

interface DiscoveryCardProps {
  card: DiscoveryCardItem;
  isFavorite: boolean;
  onToggleFavorite: (card: DiscoveryCardItem) => void;
}

const CATEGORY_STYLES: Record<string, { border: string; badgeBg: string; text: string; glow: string }> = {
  'cats-dogs': {
    border: 'hover:border-rose-500/50',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    text: 'text-rose-400',
    glow: 'group-hover:shadow-rose-500/10'
  },
  'dinosaurs': {
    border: 'hover:border-amber-500/50',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    text: 'text-amber-400',
    glow: 'group-hover:shadow-amber-500/10'
  },
  'ocean': {
    border: 'hover:border-cyan-500/50',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    text: 'text-cyan-400',
    glow: 'group-hover:shadow-cyan-500/10'
  },
  'mammals': {
    border: 'hover:border-emerald-500/50',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    text: 'text-emerald-400',
    glow: 'group-hover:shadow-emerald-500/10'
  },
  'reptiles': {
    border: 'hover:border-lime-500/50',
    badgeBg: 'bg-lime-500/20 text-lime-300 border-lime-500/30',
    text: 'text-lime-400',
    glow: 'group-hover:shadow-lime-500/10'
  }
};

export default function DiscoveryCard({
  card,
  isFavorite,
  onToggleFavorite
}: DiscoveryCardProps) {
  const [copied, setCopied] = useState(false);
  const style = CATEGORY_STYLES[card.category] || CATEGORY_STYLES['cats-dogs'];

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${card.title} - ${card.fact} (Discovered on Zoe's Wild World: ${card.sourceUrl})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`group relative flex flex-col rounded-3xl overflow-hidden glass-card transition-all duration-300 ${style.border} ${style.glow} hover:-translate-y-1.5 shadow-xl`}>
      {/* Media Header */}
      <div className="relative w-full h-56 md:h-64 overflow-hidden bg-slate-900">
        {card.mediaType === 'video' ? (
          <video
            src={card.mediaUrl}
            playsInline
            muted
            autoPlay
            loop
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.mediaUrl}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Ambient Dark Gradient on Image Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111b35] via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
          <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${style.badgeBg} shadow-md flex items-center gap-1.5`}>
            <Sparkles className="w-3 h-3" />
            {card.categoryLabel}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all cursor-pointer shadow-md"
              title="Share discovery"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Favorite Button */}
            <button
              onClick={() => onToggleFavorite(card)}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all cursor-pointer shadow-md group/btn"
              title="Save to Zoe's Pocket Zoo"
            >
              <Heart
                className={`w-4 h-4 transition-transform group-active/btn:scale-125 ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white hover:text-rose-400'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Custom badge at bottom of media */}
        {card.badge && (
          <div className="absolute bottom-3 left-4 z-10">
            <span className="px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-semibold text-amber-300 border border-amber-500/20">
              {card.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <h2 className="text-lg md:text-xl font-bold text-white leading-snug group-hover:text-amber-200 transition-colors">
            {card.title}
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            {card.fact}
          </p>
        </div>

        {/* Card Footer: Source & Link */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 text-slate-400 truncate">
            <span className="font-medium text-slate-400">Source:</span>
            <span className="truncate text-slate-200 font-semibold">{card.sourceName}</span>
          </div>

          <a
            href={card.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all hover:scale-105 active:scale-95 text-xs whitespace-nowrap cursor-pointer shadow-sm"
          >
            <span>Read More</span>
            <ExternalLink className="w-3 h-3 text-amber-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
