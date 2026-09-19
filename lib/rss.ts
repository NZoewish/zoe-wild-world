import Parser from 'rss-parser';
import { DiscoveryCardItem, AnimalCategory } from './types';
import { fetchSupplementaryMedia } from './media';

const parser = new Parser({
  headers: {
    'User-Agent': "Mozilla/5.0 (compatible; ZoeWildWorld/1.0; +https://zoe-wild-world.onrender.com)",
    'Accept': 'application/rss+xml, application/xml, text/xml; q=0.1'
  },
  timeout: 5000
});

interface RSSFeedConfig {
  url: string;
  sourceName: string;
  defaultCategory: AnimalCategory;
  categoryLabel: string;
}

const RSS_FEEDS: RSSFeedConfig[] = [
  {
    url: 'https://www.sciencedaily.com/rss/fossils_ruins/paleontology.xml',
    sourceName: 'ScienceDaily Paleontology',
    defaultCategory: 'dinosaurs',
    categoryLabel: 'Dinosaurs & Fossils 🦖'
  },
  {
    url: 'https://www.sciencedaily.com/rss/plants_animals/animals.xml',
    sourceName: 'ScienceDaily Animals',
    defaultCategory: 'mammals',
    categoryLabel: 'Wild Land & Mammals 🦁'
  },
  {
    url: 'https://www.smithsonianmag.com/rss/science-nature/',
    sourceName: 'Smithsonian Magazine',
    defaultCategory: 'ocean',
    categoryLabel: 'Ocean Abyss 🌊'
  }
];

function detectCategory(title: string, content: string, defaultCat: AnimalCategory): AnimalCategory {
  const text = `${title} ${content}`.toLowerCase();
  if (text.includes('dog') || text.includes('cat') || text.includes('puppy') || text.includes('kitten') || text.includes('canine') || text.includes('feline')) {
    return 'cats-dogs';
  }
  if (text.includes('dinosaur') || text.includes('fossil') || text.includes('cretaceous') || text.includes('jurassic') || text.includes('t-rex') || text.includes('megalodon')) {
    return 'dinosaurs';
  }
  if (text.includes('shark') || text.includes('whale') || text.includes('ocean') || text.includes('sea') || text.includes('octopus') || text.includes('coral') || text.includes('dolphin')) {
    return 'ocean';
  }
  if (text.includes('snake') || text.includes('lizard') || text.includes('insect') || text.includes('ant') || text.includes('chameleon') || text.includes('frog') || text.includes('bug')) {
    return 'reptiles';
  }
  return defaultCat;
}

function cleanSummary(rawText?: string): string {
  if (!rawText) return "New wildlife discovery just uncovered for Zoe!";
  // Strip HTML tags
  const stripped = rawText.replace(/<[^>]*>?/gm, '').trim();
  // Cut to 180 chars max
  if (stripped.length > 180) {
    return stripped.slice(0, 177) + '...';
  }
  return stripped;
}

export async function fetchLiveRssCards(): Promise<DiscoveryCardItem[]> {
  const cards: DiscoveryCardItem[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      const items = (parsed.items || []).slice(0, 3);

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item.title || !item.link) continue;

        const category = detectCategory(item.title, item.contentSnippet || '', feed.defaultCategory);
        const media = await fetchSupplementaryMedia(item.title, category);

        cards.push({
          id: `rss-${feed.sourceName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${i}`,
          title: item.title,
          fact: cleanSummary(item.contentSnippet || item.content),
          category: category,
          categoryLabel: feed.categoryLabel,
          mediaUrl: media.url,
          mediaType: media.type,
          sourceName: feed.sourceName,
          sourceUrl: item.link,
          date: item.pubDate ? new Date(item.pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          badge: '⚡ Fresh Live Discovery',
          tags: ['live-feed', category],
          isCuratedFact: false
        });
      }
    } catch {
      // Continue silently if a feed is unreachable; fallback will satisfy data requirements
    }
  }

  return cards;
}
