// Unsplash image service for blog posts
// Using Unsplash Source API (no API key needed for basic usage)

interface UnsplashImage {
  url: string;
  alt: string;
  caption?: string;
}

// Get a random image from Unsplash by keyword
export function getUnsplashImage(keywords: string, width = 1200, height = 800): string {
  // Using Unsplash Source API - no key needed
  const query = encodeURIComponent(keywords);
  return `https://source.unsplash.com/${width}x${height}/?${query}`;
}

// Predefined high-quality images for biohacking topics
export const biohackingImages: Record<string, UnsplashImage> = {
  supplements: {
    url: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=1200&h=800&fit=crop',
    alt: 'Various supplements and vitamins on a table'
  },
  supplementBottles: {
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&h=800&fit=crop',
    alt: 'Collection of supplement bottles'
  },
  healthyFood: {
    url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=800&fit=crop',
    alt: 'Nutritious whole foods and vegetables'
  },
  morningRoutine: {
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop',
    alt: 'Morning wellness routine'
  },
  meditation: {
    url: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=1200&h=800&fit=crop',
    alt: 'Person meditating for mental clarity'
  },
  fitness: {
    url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop',
    alt: 'Athletic training and fitness'
  },
  science: {
    url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=800&fit=crop',
    alt: 'Scientific research and testing'
  },
  nature: {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
    alt: 'Natural environment and wellness'
  },
  brain: {
    url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop',
    alt: 'Brain health and cognitive function'
  },
  dna: {
    url: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=1200&h=800&fit=crop',
    alt: 'DNA and genetic testing'
  }
};