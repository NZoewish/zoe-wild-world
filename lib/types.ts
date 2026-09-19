export type AnimalCategory =
  | 'cats-dogs'
  | 'dinosaurs'
  | 'ocean'
  | 'mammals'
  | 'reptiles';

export interface DiscoveryCardItem {
  id: string;
  title: string;
  fact: string;
  category: AnimalCategory;
  categoryLabel: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  thumbnailUrl?: string;
  sourceName: string;
  sourceUrl: string;
  date: string;
  badge?: string;
  tags?: string[];
  isCuratedFact?: boolean;
}

export interface GreetingData {
  greeting: string;
  subtext: string;
  highlightAnimal: string;
  emoji: string;
  category: AnimalCategory;
}

export interface GeminiSearchResponse {
  answer: string;
  funFact: string;
  habitatOrEra: string;
  coolRating: string;
  sourceTitle: string;
  sourceUrl: string;
}
