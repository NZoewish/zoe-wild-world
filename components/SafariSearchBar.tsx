'use client';

import React, { useState } from 'react';
import { Search, Sparkles, X, ExternalLink, Bot, HelpCircle } from 'lucide-react';
import { GeminiSearchResponse } from '@/lib/types';

const SUGGESTED_PROMPTS = [
  "Why do cats purr? 🐱",
  "Could Spinosaurus defeat a T-Rex? 🦖",
  "Why do dogs tilt their heads? 🐶",
  "Loudest creature in the ocean? 🐋",
  "How do chameleons change color? 🦎"
];

export default function SafariSearchBar() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GeminiSearchResponse | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery: string) => {
    const q = searchQuery.trim();
    if (!q) return;

    setIsLoading(true);
    setError(null);
    setIsOpen(true);
    setQuery(q);

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });

      if (!res.ok) {
        throw new Error('Search failed');
      }

      const data: GeminiSearchResponse = await res.json();
      setResult(data);
    } catch {
      setError("Couldn't reach the Safari Guide right now. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="w-full space-y-3">
      {/* Search Input Bar */}
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-amber-400 pointer-events-none">
            <span className="text-xl">🐾</span>
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Zoe's AI Safari Guide (e.g., Why do cats purr? Could Spinosaurus beat T-Rex?)"
            className="w-full pl-12 pr-28 py-3.5 rounded-2xl glass-panel text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 border border-white/10 text-sm md:text-base shadow-lg transition-all"
          />

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs md:text-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer shadow-md flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isLoading ? 'Exploring...' : 'Ask AI'}</span>
          </button>
        </div>
      </form>

      {/* Suggestion Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-xs text-amber-300 font-semibold flex items-center gap-1 whitespace-nowrap pl-1">
          <Sparkles className="w-3 h-3" /> Quick Inquiries:
        </span>
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSearch(prompt)}
            className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-xs text-slate-300 border border-white/5 whitespace-nowrap transition-all hover:scale-105 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Result Modal / Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl glass-panel p-6 md:p-8 border border-white/15 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                    <span>Zoe&apos;s Safari Guide</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Gemini AI
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Query: &quot;{query}&quot;</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin" />
                <p className="text-slate-300 font-medium text-sm animate-pulse">
                  Consulting the wildlife archives for Zoe... 🐾
                </p>
              </div>
            ) : error ? (
              <div className="py-8 text-center space-y-3">
                <p className="text-rose-400 font-medium">{error}</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            ) : result ? (
              <div className="space-y-5">
                {/* Answer */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Discovery Answer
                  </h4>
                  <p className="text-sm md:text-base text-slate-100 leading-relaxed font-medium">
                    {result.answer}
                  </p>
                </div>

                {/* Fun Fact Callout */}
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                  <span className="text-xs font-bold text-rose-300">⚡ Bonus Flash Fact</span>
                  <p className="text-sm text-slate-200">{result.funFact}</p>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-slate-400 block mb-0.5">Habitat / Era</span>
                    <span className="text-white font-semibold">{result.habitatOrEra}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-slate-400 block mb-0.5">Wild Rating</span>
                    <span className="text-emerald-400 font-bold">{result.coolRating}</span>
                  </div>
                </div>

                {/* Verified Source Citation */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Source: <strong className="text-slate-200">{result.sourceTitle}</strong>
                  </span>
                  <a
                    href={result.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold underline"
                  >
                    <span>Visit Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
