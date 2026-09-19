'use client';

import React, { useState, useEffect, useCallback } from 'react';
import GreetingBanner from '@/components/GreetingBanner';
import CategoryFilters, { FilterCategory } from '@/components/CategoryFilters';
import DiscoveryCard from '@/components/DiscoveryCard';
import SafariSearchBar from '@/components/SafariSearchBar';
import { DiscoveryCardItem, GreetingData } from '@/lib/types';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';

const FAVORITES_STORAGE_KEY = 'zoe_wild_world_favorites_v1';

export default function Home() {
  const [cards, setCards] = useState<DiscoveryCardItem[]>([]);
  const [greetingData, setGreetingData] = useState<GreetingData | null>(null);
  const [currentCategory, setCurrentCategory] = useState<FilterCategory>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<DiscoveryCardItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  // Save favorites to localStorage
  const handleToggleFavorite = (card: DiscoveryCardItem) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === card.id);
      let updated: DiscoveryCardItem[];
      if (exists) {
        updated = prev.filter((f) => f.id !== card.id);
      } else {
        updated = [card, ...prev];
      }
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Fallback
      }
      return updated;
    });
  };

  // Fetch feed cards
  const fetchFeed = useCallback(async (category: FilterCategory, forceRefresh = false) => {
    if (category === 'pocket-zoo') return;

    setIsRefreshing(true);
    try {
      const url = `/api/feed?category=${category}&refresh=${forceRefresh ? 'true' : 'false'}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setCards(data.cards || []);
        if (data.greeting) {
          setGreetingData(data.greeting);
        }
      }
    } catch (err) {
      console.error('Failed to load feed:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchFeed('all', false);
  }, [fetchFeed]);

  // Handle category change
  const handleSelectCategory = (cat: FilterCategory) => {
    setCurrentCategory(cat);
    if (cat !== 'pocket-zoo') {
      fetchFeed(cat, false);
    }
  };

  // Manual refresh trigger
  const handleManualRefresh = () => {
    if (currentCategory === 'pocket-zoo') {
      fetchFeed('all', true);
      setCurrentCategory('all');
    } else {
      fetchFeed(currentCategory, true);
    }
  };

  // Background auto-refresh every 60 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchFeed(currentCategory, true);
    }, 60 * 60 * 1000); // 60 mins

    return () => clearInterval(interval);
  }, [currentCategory, fetchFeed]);

  // Display cards: either Pocket Zoo favorites or regular feed
  const displayedCards = currentCategory === 'pocket-zoo' ? favorites : cards;

  return (
    <main className="min-h-screen flex flex-col items-center px-4 md:px-8 py-6 md:py-10 max-w-7xl mx-auto space-y-8 pb-20 pt-safe pb-safe">
      {/* Top Dynamic Zoe Greeting Banner */}
      <GreetingBanner
        greetingData={greetingData}
        onRefresh={handleManualRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Gemini AI Search Bar */}
      <section className="w-full">
        <SafariSearchBar />
      </section>

      {/* Category Filter Pills & Pocket Zoo Toggle */}
      <section className="w-full sticky top-4 z-40 bg-[#080d1a]/80 backdrop-blur-xl py-2 rounded-2xl border border-white/5">
        <CategoryFilters
          currentCategory={currentCategory}
          onSelectCategory={handleSelectCategory}
          favoritesCount={isClient ? favorites.length : 0}
        />
      </section>

      {/* Cards Grid Section */}
      <section className="w-full space-y-4">
        <div className="flex items-center justify-between text-xs md:text-sm text-slate-400 px-2">
          <span className="font-semibold flex items-center gap-1.5 text-white">
            <Sparkles className="w-4 h-4 text-amber-400" />
            {currentCategory === 'pocket-zoo'
              ? `Zoe's Pocket Zoo (${favorites.length} saved)`
              : `Curated Discoveries (${displayedCards.length} species on radar)`}
          </span>
          <span className="text-slate-400">
            Auto-refreshes every 60 mins ⏱️
          </span>
        </div>

        {displayedCards.length === 0 ? (
          <div className="w-full py-20 rounded-3xl glass-panel text-center space-y-4 p-8 border border-white/10">
            {currentCategory === 'pocket-zoo' ? (
              <>
                <Heart className="w-12 h-12 text-rose-500/50 mx-auto animate-bounce-subtle" />
                <h3 className="text-xl font-bold text-white">Zoe&apos;s Pocket Zoo is currently empty!</h3>
                <p className="text-slate-400 max-w-md mx-auto text-sm">
                  Tap the heart icon on any animal discovery card to collect it into your personal pocket zoo.
                </p>
                <button
                  onClick={() => handleSelectCategory('all')}
                  className="px-5 py-2.5 rounded-full bg-white text-slate-900 font-bold text-sm hover:scale-105 transition-all shadow-md cursor-pointer"
                >
                  Explore Animals Now
                </button>
              </>
            ) : (
              <>
                <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Loading fresh discoveries...</h3>
                <button
                  onClick={handleManualRefresh}
                  className="px-5 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-sm"
                >
                  Retry Refresh
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayedCards.map((card) => (
              <DiscoveryCard
                key={card.id}
                card={card}
                isFavorite={favorites.some((f) => f.id === card.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer / Privacy Note */}
      <footer className="w-full pt-12 pb-6 border-t border-white/10 text-center space-y-2 text-xs text-slate-400">
        <p className="font-semibold text-slate-300">
          🐾 Zoe&apos;s Wild World — Tailored with ❤️ for Zoe
        </p>
        <p>
          Private &amp; Kid-Safe: Zero logins, zero tracking cookies, zero ads. Verified sources only.
        </p>
      </footer>
    </main>
  );
}
