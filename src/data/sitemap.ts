// Dynamic sitemap for internal linking
export interface SiteLink {
  text: string[];  // Multiple text variations to match
  url: string;
  title: string;
  type: 'blog' | 'page' | 'program';
}

export const sitemap: SiteLink[] = [
  // Main Pages
  {
    text: ['coaching', 'coaching program', 'Supercharge Your Life', 'signature program', '1-on-1 coaching'],
    url: '/superchargeyourlife',
    title: 'Supercharge Your Life Coaching Program',
    type: 'program'
  },
  {
    text: ['free guide', 'freebie', 'biohacking guide', 'download', 'free resource'],
    url: '/freebie',
    title: 'Free Biohacking Guide',
    type: 'page'
  },
  {
    text: ['my book', 'book', 'author', 'published'],
    url: '/my-book',
    title: 'My Book',
    type: 'page'
  },
  {
    text: ['media', 'press', 'featured', 'interviews'],
    url: '/media',
    title: 'Media & Press',
    type: 'page'
  },
  {
    text: ['speaking', 'talks', 'presentations', 'keynote'],
    url: '/talks',
    title: 'Speaking Engagements',
    type: 'page'
  },
  {
    text: ['about', 'about me', 'Camilla', 'story', 'journey'],
    url: '/about',
    title: 'About Camilla',
    type: 'page'
  },
  {
    text: ['contact', 'get in touch', 'reach out', 'connect'],
    url: '/contact',
    title: 'Contact',
    type: 'page'
  },
  
  // Blog Posts
  {
    text: ['personalised health', 'personalized health', 'bio-individuality', 'unique health', 'custom health'],
    url: '/blog/health-personalisation',
    title: 'Your Health Isn\'t a Mystery',
    type: 'blog'
  },
  {
    text: ['supplements', 'fewer supplements', 'supplement routine', 'vitamin', 'minerals'],
    url: '/blog/fewer-supplements',
    title: 'Why I Take Fewer Supplements',
    type: 'blog'
  },
  {
    text: ['toxic', 'toxins', 'environmental health', 'toxic exposure', 'chemicals'],
    url: '/blog/toxic-exposure',
    title: 'The Toxic Sh*t Storm',
    type: 'blog'
  },
  {
    text: ['wellness information', 'information overload', 'wellness overload', 'too much information'],
    url: '/blog/wellness-overload',
    title: 'Wellness Information Overload',
    type: 'blog'
  },
  {
    text: ['BrainTap', 'brain optimization', 'neurotechnology', 'brain health'],
    url: '/blog/braintap-australia',
    title: 'BrainTap in Australia',
    type: 'blog'
  },
  {
    text: ['red light therapy', 'light therapy', 'photobiomodulation', 'infrared'],
    url: '/blog/red-light-therapy-2025',
    title: 'Red Light Therapy',
    type: 'blog'
  },
  {
    text: ['DNA', 'genetic testing', 'genetics', 'DNA test', 'genomics'],
    url: '/blog/dna-testing',
    title: 'DNA Testing for Health',
    type: 'blog'
  },
  {
    text: ['gut health', 'microbiome', 'digestive health', 'probiotics', 'gut bacteria'],
    url: '/blog/gut-health',
    title: 'Optimize Your Gut Health',
    type: 'blog'
  },
  {
    text: ['sleep', 'sleep optimization', 'better sleep', 'insomnia', 'rest'],
    url: '/blog/sleep-optimization',
    title: 'Sleep Optimization Guide',
    type: 'blog'
  },
  {
    text: ['biohacking', 'optimization', 'performance', 'upgrade'],
    url: '/blog',
    title: 'All Blog Posts',
    type: 'page'
  }
];

// Function to find relevant internal links for a blog post
export function getInternalLinks(currentSlug: string, contentText: string): SiteLink[] {
  // Filter out the current page
  const availableLinks = sitemap.filter(link => !link.url.includes(currentSlug));
  
  // Score each link based on relevance to content
  const scoredLinks = availableLinks.map(link => {
    let score = 0;
    
    // Check if any of the link's text variations appear in the content
    link.text.forEach(text => {
      const regex = new RegExp(text, 'gi');
      const matches = contentText.match(regex);
      if (matches) {
        score += matches.length;
      }
    });
    
    return { link, score };
  });
  
  // Sort by score and return top links
  const sortedLinks = scoredLinks
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.link);
  
  // If we have fewer than 4 relevant links, add some defaults
  const defaultLinks = [
    sitemap.find(l => l.url === '/superchargeyourlife'),
    sitemap.find(l => l.url === '/freebie'),
    sitemap.find(l => l.url === '/blog')
  ].filter(Boolean) as SiteLink[];
  
  // Combine relevant and default links
  const finalLinks = [...sortedLinks];
  defaultLinks.forEach(link => {
    if (!finalLinks.includes(link) && finalLinks.length < 6) {
      finalLinks.push(link);
    }
  });
  
  return finalLinks.slice(0, 6); // Return up to 6 links
}

// Function to insert links into content
export function insertInternalLinks(content: string, links: SiteLink[], currentSlug: string): string {
  let linkedContent = content;
  const usedLinks = new Set<string>();
  
  // Try to insert each link
  links.forEach(link => {
    // Skip if we've already used this link or if it's the current page
    if (usedLinks.has(link.url) || link.url.includes(currentSlug)) return;
    
    // Try each text variation
    for (const text of link.text) {
      // Create a regex to find the text (case-insensitive, word boundaries)
      const regex = new RegExp(`\\b(${text})\\b(?![^<]*>)(?![^<]*<\\/a>)`, 'gi');
      
      // Check if this text appears in the content
      if (regex.test(linkedContent)) {
        // Reset regex
        regex.lastIndex = 0;
        
        // Replace only the first occurrence
        linkedContent = linkedContent.replace(regex, (match) => {
          usedLinks.add(link.url);
          return `<a href="${link.url}" class="text-blue-600 underline hover:text-blue-700 transition-colors">${match}</a>`;
        });
        
        break; // Move to next link after successful insertion
      }
    }
  });
  
  return linkedContent;
}