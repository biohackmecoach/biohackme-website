export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonicalUrl?: string
  schemaMarkup?: any
}

export interface PageSEO {
  path: string
  title: string
  description: string
  keywords: string[]
  priority: number
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  lastModified?: string
}

export const siteConfig = {
  domain: 'biohackme.com.au',
  siteName: 'BiohackMe',
  author: 'Camilla Thompson',
  defaultTitle: 'BiohackMe - Biohacking Australia | Transform Your Health & Performance',
  defaultDescription: 'Transform your health and performance with evidence-based biohacking strategies. Expert coaching, masterclasses, and resources for optimal living by Camilla Thompson.',
  defaultKeywords: [
    'biohacking',
    'biohacking Australia',
    'health optimization',
    'longevity',
    'Camilla Thompson',
    'wellness coach',
    'performance optimization',
    'health transformation',
    'biohacking expert',
    'nutrition coaching'
  ],
  social: {
    instagram: 'https://www.instagram.com/biohackmecoach/',
    facebook: 'https://www.facebook.com/profile.php?id=61556971331791',
    youtube: 'https://www.youtube.com/channel/UCMpV7HCXEyIOxuUgK0U5blw',
    tiktok: 'https://www.tiktok.com/@biohackmecoach'
  }
}

export const pagesSEO: PageSEO[] = [
  {
    path: '/',
    title: 'BiohackMe - Biohacking Australia | Transform Your Health & Performance',
    description: 'Transform your health and performance with evidence-based biohacking strategies. Expert coaching, masterclasses, and resources for optimal living by Camilla Thompson.',
    keywords: ['biohacking Australia', 'health optimization', 'Camilla Thompson', 'wellness coach', 'longevity expert', 'performance coaching'],
    priority: 1.0,
    changeFreq: 'weekly'
  },
  {
    path: '/about',
    title: 'About Camilla Thompson | BiohackMe - Nutritionist & Biohacking Expert',
    description: 'Meet Camilla Thompson - Nutritionist, Health Coach, PCC Coach, Biohacker, and author of Australia\'s first biohacking book. Transform your health with personalised strategies.',
    keywords: ['Camilla Thompson', 'biohacking expert', 'nutritionist Australia', 'health coach', 'wellness expert', 'biohacking book'],
    priority: 0.9,
    changeFreq: 'monthly'
  },
  {
    path: '/my-book',
    title: 'Biohack Me Book | Australia\'s First Biohacking Guide by Camilla Thompson',
    description: 'Discover Australia\'s first comprehensive biohacking book. A science-backed guide to longevity, energy optimization, and health transformation for real life.',
    keywords: ['biohacking book', 'longevity guide', 'health book Australia', 'Camilla Thompson book', 'biohacking strategies', 'wellness book'],
    priority: 0.9,
    changeFreq: 'monthly'
  },
  {
    path: '/superchargeyourlife',
    title: 'Supercharge Your Life Coaching | Personalised Biohacking Program',
    description: 'Transform your health with Camilla\'s signature 1:1 coaching program. Personalised biohacking strategies, functional testing, and expert guidance for lasting results.',
    keywords: ['biohacking coaching', 'health coaching Australia', 'personalised wellness', 'functional testing', '1:1 coaching', 'health transformation'],
    priority: 0.9,
    changeFreq: 'weekly'
  },
  {
    path: '/masterclass',
    title: 'Biohacking Masterclasses | 8-Pillar Framework for Optimal Living',
    description: 'Master the 8-Pillar Biohacking Framework with comprehensive online courses. Transform your sleep, mood, body, environment, energy, relationships, health, and brain.',
    keywords: ['biohacking masterclass', 'online health courses', 'biohacking framework', 'wellness education', 'health optimization courses', 'biohacking training'],
    priority: 0.9,
    changeFreq: 'weekly'
  },
  {
    path: '/assessment',
    title: 'Free Biohacking Assessment | Discover Your Health Optimization Score',
    description: 'Take our comprehensive biohacking assessment to evaluate your current health across 8 key pillars. Get personalised recommendations for optimal living.',
    keywords: ['biohacking assessment', 'health assessment', 'wellness quiz', 'health optimization test', 'biohacking score', 'health evaluation'],
    priority: 0.8,
    changeFreq: 'monthly'
  },
  {
    path: '/brain-assessment',
    title: 'Brain Health Assessment | Cognitive Function & Memory Test',
    description: 'Evaluate your cognitive function with our comprehensive brain health assessment. Test memory, focus, mental energy, and get personalised optimization strategies.',
    keywords: ['brain health assessment', 'cognitive function test', 'memory test', 'brain optimization', 'mental performance', 'brain health evaluation'],
    priority: 0.8,
    changeFreq: 'monthly'
  },
  {
    path: '/talks',
    title: 'Biohacking Keynote Speaker | Corporate Wellness Talks Australia',
    description: 'Book Camilla Thompson for innovative biohacking talks and corporate wellness presentations. Transform your team\'s health and performance with cutting-edge strategies.',
    keywords: ['biohacking speaker', 'corporate wellness speaker', 'keynote speaker Australia', 'health speaker', 'wellness presentations', 'biohacking talks'],
    priority: 0.8,
    changeFreq: 'monthly'
  },
  {
    path: '/shop',
    title: 'Biohacking Shop | Red Light Therapy, Saunas, Supplements & Health Tech',
    description: 'Shop curated biohacking products from red light therapy to infrared saunas, longevity supplements, and biological age testing. Premium health optimization tools.',
    keywords: ['biohacking products', 'red light therapy', 'infrared sauna', 'longevity supplements', 'health tech', 'biohacking equipment'],
    priority: 0.7,
    changeFreq: 'weekly'
  },
  {
    path: '/retreats',
    title: 'Biohacking Retreats Bali | Live Well Longer Wellness Retreats',
    description: 'Join transformational biohacking retreats at Revivo Wellness Resort, Bali. Women\'s, co-ed, and mother-daughter retreats with functional testing and biohacking technologies.',
    keywords: ['biohacking retreat', 'wellness retreat Bali', 'health retreat', 'women\'s wellness retreat', 'biohacking vacation', 'Revivo Bali'],
    priority: 0.8,
    changeFreq: 'monthly'
  },
  {
    path: '/blog',
    title: 'Biohacking Blog | Health Optimization Tips & Wellness Strategies',
    description: 'Discover evidence-based biohacking tips, health optimization strategies, and wellness insights from expert Camilla Thompson. Transform your health naturally.',
    keywords: ['biohacking blog', 'health tips', 'wellness blog', 'biohacking strategies', 'health optimization', 'longevity tips'],
    priority: 0.7,
    changeFreq: 'daily'
  },
  {
    path: '/media',
    title: 'Media & Press | BiohackMe in Sydney Morning Herald, Women\'s Health',
    description: 'Camilla Thompson\'s media appearances and press coverage. Featured in Sydney Morning Herald, The Age, Women\'s Health, and Sunrise TV.',
    keywords: ['Camilla Thompson media', 'biohacking expert press', 'Sydney Morning Herald', 'Women\'s Health', 'Sunrise TV', 'health expert media'],
    priority: 0.6,
    changeFreq: 'monthly'
  },
  {
    path: '/freebie',
    title: 'Free Biohacking Guide | Download Your Complete Biohacking Starter Kit',
    description: 'Download your free comprehensive biohacking guide. Learn what biohacking is, the framework, budget-friendly tips, and top 10 biohacks to transform your health.',
    keywords: ['free biohacking guide', 'biohacking PDF', 'wellness guide download', 'health optimization guide', 'biohacking starter kit', 'free health resources'],
    priority: 0.8,
    changeFreq: 'monthly'
  },
  {
    path: '/contact',
    title: 'Contact Camilla Thompson | BiohackMe Australia - Get Expert Help',
    description: 'Contact biohacking expert Camilla Thompson for coaching, speaking engagements, or wellness consultations. Transform your health with personalised guidance.',
    keywords: ['contact Camilla Thompson', 'biohacking consultation', 'health coach contact', 'wellness expert contact', 'biohacking help Australia'],
    priority: 0.6,
    changeFreq: 'yearly'
  }
]

export function generateSitemap(): string {
  const baseUrl = `https://${siteConfig.domain}`
  const currentDate = new Date().toISOString()
  
  const urlEntries = pagesSEO.map(page => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${page.lastModified || currentDate}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

export function generateRobotsTxt(): string {
  const baseUrl = `https://${siteConfig.domain}`
  
  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`
}

export function generateStructuredData(page: PageSEO): any {
  const baseUrl = `https://${siteConfig.domain}`
  
  // Base Organization Schema
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.siteName,
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "founder": {
      "@type": "Person",
      "name": siteConfig.author,
      "jobTitle": "Biohacking Expert & Nutritionist",
      "image": `${baseUrl}/images/camilla-main-headshot.jpg.webp`
    },
    "sameAs": Object.values(siteConfig.social),
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+61",
      "contactType": "Customer Support",
      "email": "hello@biohackme.com.au"
    },
    "areaServed": "Australia",
    "description": siteConfig.defaultDescription
  }

  // Page-specific schemas
  switch (page.path) {
    case '/':
      return [
        organization,
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": siteConfig.siteName,
          "url": baseUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/blog?search={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }
      ]
    
    case '/about':
      return [
        organization,
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": siteConfig.author,
          "jobTitle": "Biohacking Expert & Nutritionist",
          "image": `${baseUrl}/images/camilla-main-headshot.jpg.webp`,
          "url": `${baseUrl}/about`,
          "sameAs": Object.values(siteConfig.social),
          "worksFor": organization,
          "description": "Nutritionist, Health Coach, PCC Coach, Biohacker, Wellbeing Expert, Keynote Speaker and Behaviour Change Expert"
        }
      ]
    
    case '/my-book':
      return [
        organization,
        {
          "@context": "https://schema.org",
          "@type": "Book",
          "name": "Biohack Me: A Practical Guide to Everyday Longevity",
          "author": {
            "@type": "Person",
            "name": siteConfig.author
          },
          "publisher": organization,
          "description": "Australia's first comprehensive biohacking book with practical strategies for longevity and health optimization",
          "genre": "Health & Wellness",
          "inLanguage": "en-AU"
        }
      ]
    
    default:
      return [organization]
  }
}

export function validateSEO(page: PageSEO): string[] {
  const issues: string[] = []
  
  // Title validation
  if (!page.title) issues.push('Missing title')
  else if (page.title.length > 60) issues.push('Title too long (>60 chars)')
  else if (page.title.length < 30) issues.push('Title too short (<30 chars)')
  
  // Description validation
  if (!page.description) issues.push('Missing meta description')
  else if (page.description.length > 160) issues.push('Meta description too long (>160 chars)')
  else if (page.description.length < 120) issues.push('Meta description too short (<120 chars)')
  
  // Keywords validation
  if (!page.keywords || page.keywords.length === 0) issues.push('Missing keywords')
  else if (page.keywords.length < 3) issues.push('Not enough keywords (<3)')
  else if (page.keywords.length > 10) issues.push('Too many keywords (>10)')
  
  return issues
}