'use client';

import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { AnimalCategory } from '@/lib/types';

export type FilterCategory = 'all' | AnimalCategory | 'pocket-zoo';

interface CategoryFiltersProps {
  currentCategory: FilterCategory;
  onSelectCategory: (cat: FilterCategory) => void;
  favoritesCount: number;
}

const CATEGORIES: { id: FilterCategory; label: string; icon: string; activeClass: string }[] = [
  {
    id: 'all',
    label: 'All Creatures',
    icon: '🌍',
    activeClass: 'bg-white text-slate-900 shadow-white/20'
  },
  {
    id: 'cats-dogs',
    label: 'Cats & Dogs',
    icon: '🐾',
    activeClass: 'bg-rose-500 text-white shadow-rose-500/30'
  },
  {
    id: 'dinosaurs',
    label: 'Dinosaurs & Fossils',
    icon: '🦖',
    activeClass: 'bg-amber-500 text-slate-950 shadow-amber-500/30 font-bold'
  },
  {
    id: 'ocean',
    label: 'Ocean Abyss',
    icon: '🌊',
    activeClass: 'bg-cyan-500 text-slate-950 shadow-cyan-500/30 font-bold'
  },
  {
    id: 'mammals',
    label: 'Wild Land',
    icon: '🦁',
    activeClass: 'bg-emerald-500 text-slate-950 shadow-emerald-500/30 font-bold'
  },
  {
    id: 'reptiles',
    label: 'Reptiles & Bugs',
    icon: '🦎',
    activeClass: 'bg-lime-500 text-slate-950 shadow-lime-500/30 font-bold'
  }
];

export default function CategoryFilters({
  currentCategory,
  onSelectCategory,
  favoritesCount
}: CategoryFiltersProps) {
  return (
    <div className="w-full flex items-center justify-between gap-3 overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 flex-nowrap">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all whitespace-nowrap shadow-md cursor-pointer ${
                isActive
                  ? `${cat.activeClass} scale-[1.03] ring-2 ring-white/20`
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-white/5'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Pocket Zoo Favorites Pill */}
      <div className="flex-shrink-0">
        <button
          onClick={() => onSelectCategory('pocket-zoo')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all shadow-md cursor-pointer ${
            currentCategory === 'pocket-zoo'
              ? 'bg-rose-500 text-white ring-2 ring-white/20 scale-[1.03]'
              : 'bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/20'
          }`}
        >
          <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-400 text-rose-400' : ''}`} />
          <span>Pocket Zoo</span>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 text-xs">
            {favoritesCount}
          </span>
        </button>
      </div>
    </div>
  );
}
