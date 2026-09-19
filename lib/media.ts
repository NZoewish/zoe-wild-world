export interface MediaItem {
  url: string;
  type: 'image' | 'video';
  thumbnailUrl?: string;
  author?: string;
}

// Curated high-quality wildlife clips (Pexels / Wikimedia / Pixabay royalty-free)
const CURATED_MEDIA_MAP: Record<string, MediaItem[]> = {
  'cats-dogs': [
    {
      url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    }
  ],
  'dinosaurs': [
    {
      url: 'https://images.unsplash.com/photo-1525877442103-5dd52ac99e30?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1569793666141-86082c5a287c?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    }
  ],
  'ocean': [
    {
      url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    }
  ],
  'mammals': [
    {
      url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1538099130811-745e64318258?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    }
  ],
  'reptiles': [
    {
      url: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80',
      type: 'image'
    }
  ]
};

export async function fetchSupplementaryMedia(query: string, category: string): Promise<MediaItem> {
  const pexelsKey = process.env.PEXELS_API_KEY;
  const pixabayKey = process.env.PIXABAY_API_KEY;

  // 1. Try Pexels if key exists
  if (pexelsKey) {
    try {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`, {
        headers: { Authorization: pexelsKey },
        next: { revalidate: 3600 }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
          return {
            url: data.photos[0].src.large2x || data.photos[0].src.large,
            type: 'image',
            author: data.photos[0].photographer
          };
        }
      }
    } catch {
      // Continue to next provider
    }
  }

  // 2. Try Pixabay if key exists
  if (pixabayKey) {
    try {
      const res = await fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=3&safesearch=true`, {
        next: { revalidate: 3600 }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.hits && data.hits.length > 0) {
          return {
            url: data.hits[0].largeImageURL || data.hits[0].webformatURL,
            type: 'image',
            author: data.hits[0].user
          };
        }
      }
    } catch {
      // Fallback
    }
  }

  // 3. Fallback to curated category media
  const pool = CURATED_MEDIA_MAP[category] || CURATED_MEDIA_MAP['cats-dogs'];
  const randomPick = pool[Math.floor(Math.random() * pool.length)];
  return randomPick;
}
