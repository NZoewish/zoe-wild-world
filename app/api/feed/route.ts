import { NextRequest, NextResponse } from 'next/server';
import factsData from '@/data/facts.json';
import { fetchLiveRssCards } from '@/lib/rss';
import { getDynamicGreeting } from '@/lib/greetings';
import { DiscoveryCardItem } from '@/lib/types';

// In-memory cache for Stale-While-Revalidate (60-minute window)
let cachedCards: DiscoveryCardItem[] = [];
let lastFetchTimestamp = 0;
const CACHE_DURATION_MS = 60 * 60 * 1000; // 60 minutes

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category') || 'all';
  const forceRefresh = searchParams.get('refresh') === 'true';

  const now = Date.now();
  const isCacheExpired = (now - lastFetchTimestamp) > CACHE_DURATION_MS;

  // Refresh if cache is empty, expired, or user explicitly hit "New Discoveries" button
  if (forceRefresh || cachedCards.length === 0 || isCacheExpired) {
    try {
      // 1. Fetch live RSS cards
      const liveCards = await fetchLiveRssCards();

      // 2. Sample 25 curated cards from facts.json
      const shuffledCurated = shuffleArray(factsData as DiscoveryCardItem[]).slice(0, 30);

      // 3. Merge: live cards first, then rich curated fact bank
      const merged = [...liveCards, ...shuffledCurated];
      cachedCards = merged;
      lastFetchTimestamp = now;
    } catch (err) {
      console.error("Feed aggregation error:", err);
      if (cachedCards.length === 0) {
        cachedCards = shuffleArray(factsData as DiscoveryCardItem[]).slice(0, 30);
      }
    }
  }

  // Filter by category if requested
  let filtered = cachedCards;
  if (category !== 'all') {
    filtered = cachedCards.filter(card => card.category === category);
  }

  // Generate dynamic greeting
  const greeting = getDynamicGreeting();

  return NextResponse.json({
    cards: filtered,
    greeting,
    totalCount: filtered.length,
    cachedAt: new Date(lastFetchTimestamp).toISOString(),
    isFromCache: !forceRefresh && !isCacheExpired
  });
}
