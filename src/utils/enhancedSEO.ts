// Enhanced SEO Utilities for Google First-Page Rankings
// Advanced schema markup, local SEO, and keyword optimization

export interface LocalBusinessSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  url: string
  logo: string
  image: string[]
  telephone?: string
  email: string
  address: {
    '@type': string
    streetAddress?: string
    addressLocality: string
    addressRegion: string
    postalCode?: string
    addressCountry: string
  }
  geo?: {
    '@type': string
    latitude: number
    longitude: number
  }
  openingHours?: string[]
  priceRange?: string
  areaServed: string | string[]
  serviceType: string[]
  founder: PersonSchema
  sameAs: string[]
  aggregateRating?: {
    '@type': string
    ratingValue: number
    reviewCount: number
    bestRating: number
    worstRating: number
  }
  review?: ReviewSchema[]
}

export interface PersonSchema {
  '@type': string
  name: string
  jobTitle: string
  description: string
  image: string
  url: string
  sameAs: string[]
  knowsAbout: string[]
  alumniOf?: string[]
  award?: string[]
  hasCredential?: string[]
  memberOf?: string[]
  workLocation?: {
    '@type': string
    name: string
    address: any
  }
}

export interface ServiceSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  provider: {
    '@type': string
    name: string
  }
  areaServed: string
  serviceType: string
  offers: {
    '@type': string
    price?: string
    priceCurrency?: string
    availability: string
    validFrom?: string
    validThrough?: string
  }
  aggregateRating?: {
    '@type': string
    ratingValue: number
    reviewCount: number
  }
}

export interface ReviewSchema {
  '@type': string
  author: {
    '@type': string
    name: string
  }
  reviewRating: {
    '@type': string
    ratingValue: number
    bestRating: number
  }
  reviewBody: string
  datePublished: string
}

export interface FAQSchema {
  '@context': string
  '@type': string
  mainEntity: {
    '@type': string
    name: string
    acceptedAnswer: {
      '@type': string
      text: string
    }
  }[]
}

export interface CourseSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  provider: {
    '@type': string
    name: string
    url: string
  }
  courseMode: string
  educationalLevel: string
  teaches: string[]
  timeRequired: string
  numberOfCredits?: number
  coursePrerequisites?: string
  aggregateRating?: {
    '@type': string
    ratingValue: number
    reviewCount: number
  }
}

// Enhanced site configuration for Australian market
export const enhancedSiteConfig = {
  domain: 'biohackme.com.au',
  siteName: 'BiohackMe',
  author: 'Camilla Thompson',
  businessName: 'BiohackMe Australia',

  // Local SEO for Australian market
  location: {
    country: 'Australia',
    region: 'NSW',
    city: 'Sydney',
    coordinates: {
      latitude: -33.8688,
      longitude: 151.2093
    }
  },

  // Enhanced contact information
  contact: {
    email: 'hello@biohackme.com.au',
    website: 'https://biohackme.com.au',
    social: {
      instagram: 'https://www.instagram.com/biohackmecoach/',
      facebook: 'https://www.facebook.com/profile.php?id=61556971331791',
      youtube: 'https://www.youtube.com/channel/UCMpV7HCXEyIOxuUgK0U5blw',
      tiktok: 'https://www.tiktok.com/@biohackmecoach',
      linkedin: 'https://www.linkedin.com/in/camillathompsonnutritionist/'
    }
  },

  // Business classifications for enhanced local SEO
  businessTypes: [
    'HealthAndBeautyBusiness',
    'LocalBusiness',
    'ProfessionalService',
    'EducationalOrganization'
  ],

  // Service categories for comprehensive coverage
  serviceTypes: [
    'Health Coaching',
    'Biohacking Consultation',
    'Nutritional Counseling',
    'Wellness Coaching',
    'Corporate Wellness',
    'Speaking Engagements',
    'Online Courses',
    'Health Retreats',
    'Functional Medicine',
    'Longevity Coaching'
  ],

  // Target keywords for Australian market
  primaryKeywords: [
    'biohacking Australia',
    'biohacking coach Sydney',
    'health optimization Australia',
    'longevity coach Australia',
    'nutritionist Sydney',
    'wellness coach Australia',
    'women\'s health coach Australia',
    'functional medicine Australia',
    'corporate wellness speaker Australia',
    'biohacking expert Australia'
  ]
}

/**
 * Generates comprehensive Local Business schema
 * Optimized for Australian market and Google My Business
 */
export function generateLocalBusinessSchema(): LocalBusinessSchema {
  const reviews: ReviewSchema[] = [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Carmen Bekker'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      },
      reviewBody: 'Camilla is an absolutely fantastic wellness coach—highly recommended to anyone wanting to supercharge personal performance. She brings deep biohacking expertise into every coaching session.',
      datePublished: '2024-12-01'
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Kevin Figueiredo'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      },
      reviewBody: 'Camilla\'s expertise in biohacking was the highlight of our Wellbeing Day. She delivered a captivating session blending the latest research with practical strategies.',
      datePublished: '2024-11-15'
    }
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: enhancedSiteConfig.businessName,
    description: 'Australia\'s leading biohacking expert specializing in health optimization, longevity coaching, and evidence-based wellness strategies. Personalized coaching programs, corporate wellness talks, and educational resources.',
    url: `https://${enhancedSiteConfig.domain}`,
    logo: `https://${enhancedSiteConfig.domain}/logo-black.png`,
    image: [
      `https://${enhancedSiteConfig.domain}/images/camilla-main-headshot.jpg.webp`,
      `https://${enhancedSiteConfig.domain}/images/hero%20homepage.webp`,
      `https://${enhancedSiteConfig.domain}/images/How%20we%20work%20together/Biohackme%20website%20images18.webp`
    ],
    email: enhancedSiteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: enhancedSiteConfig.location.city,
      addressRegion: enhancedSiteConfig.location.region,
      addressCountry: enhancedSiteConfig.location.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: enhancedSiteConfig.location.coordinates.latitude,
      longitude: enhancedSiteConfig.location.coordinates.longitude
    },
    priceRange: '$$',
    areaServed: [
      'Australia',
      'New South Wales',
      'Sydney',
      'Melbourne',
      'Brisbane',
      'Perth',
      'Adelaide'
    ],
    serviceType: enhancedSiteConfig.serviceTypes,
    founder: {
      '@type': 'Person',
      name: enhancedSiteConfig.author,
      jobTitle: 'Biohacking Expert, Nutritionist & Wellbeing Coach',
      description: 'Expert biohacking coach, nutritionist, and wellbeing coach specialising in personalised health optimisation strategies. Author of Australia\'s first biohacking book.',
      image: `https://${enhancedSiteConfig.domain}/images/camilla-main-headshot.jpg.webp`,
      url: `https://${enhancedSiteConfig.domain}/about`,
      sameAs: Object.values(enhancedSiteConfig.contact.social),
      knowsAbout: [
        'Biohacking',
        'Functional Medicine',
        'Nutritional Science',
        'Longevity Research',
        'Corporate Wellness',
        'Women\'s Health',
        'Stress Management',
        'Sleep Optimization',
        'Hormone Optimization',
        'Cognitive Enhancement'
      ],
      hasCredential: [
        'Bachelor of Health Science (Nutritional Medicine)',
        'Graduate Certificate in Human Nutrition',
        'Certified Health Coach',
        'Professional Certified Coach (PCC)'
      ]
    },
    sameAs: Object.values(enhancedSiteConfig.contact.social),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 5.0,
      reviewCount: 24,
      bestRating: 5,
      worstRating: 5
    },
    review: reviews
  }
}

/**
 * Generates service-specific schema markup
 * For individual service pages and offerings
 */
export function generateServiceSchema(serviceName: string, description: string, price?: string): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'LocalBusiness',
      name: enhancedSiteConfig.businessName
    },
    areaServed: 'Australia',
    serviceType: 'Health and Wellness Coaching',
    offers: {
      '@type': 'Offer',
      ...(price && {
        price: price,
        priceCurrency: 'AUD'
      }),
      availability: 'InStock',
      validFrom: '2024-01-01',
      validThrough: '2025-12-31'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 5.0,
      reviewCount: 24
    }
  }
}

/**
 * Generates FAQ schema for common biohacking questions
 * Targets featured snippets and voice search
 */
export function generateBiohackingFAQSchema(): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is biohacking and how can it improve my health?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Biohacking is the practice of using science, technology, and lifestyle modifications to optimize your body\'s performance and health. It involves tracking biomarkers, implementing evidence-based strategies for sleep, nutrition, exercise, and stress management to enhance energy, longevity, and overall wellbeing.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is biohacking safe for beginners in Australia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, biohacking can be very safe when approached with proper guidance. At BiohackMe, we focus on evidence-based, gradual interventions starting with foundational elements like sleep optimization, nutrition, and stress management. Our programs are designed specifically for the Australian lifestyle and health guidelines.'
        }
      },
      {
        '@type': 'Question',
        name: 'How much does biohacking coaching cost in Australia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Biohacking coaching costs vary depending on the program depth and duration. Our Supercharge Your Life program starts from $2,500 AUD for comprehensive 3-month coaching including functional testing, personalized protocols, and ongoing support. We also offer masterclasses and group programs for more budget-friendly options.'
        }
      },
      {
        '@type': 'Question',
        name: 'What makes Camilla Thompson Australia\'s leading biohacking expert?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Camilla Thompson is a qualified nutritionist, health coach, and PCC certified coach with specialized training in functional medicine and biohacking. She\'s the author of Australia\'s first biohacking book, featured in major media outlets like Sydney Morning Herald and Women\'s Health, and has helped hundreds of Australians optimize their health using evidence-based biohacking strategies.'
        }
      }
    ]
  }
}

/**
 * Generates course schema for masterclass content
 * Enhances visibility in educational search results
 */
export function generateCourseSchema(courseName: string, description: string): CourseSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: enhancedSiteConfig.businessName,
      url: `https://${enhancedSiteConfig.domain}`
    },
    courseMode: 'Online',
    educationalLevel: 'Beginner to Advanced',
    teaches: [
      'Biohacking fundamentals',
      'Health optimization strategies',
      'Evidence-based wellness protocols',
      'Personalized health tracking',
      'Longevity practices'
    ],
    timeRequired: 'P8W',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 156
    }
  }
}

/**
 * Generates enhanced meta tags for specific pages
 * Optimized for Australian market and target keywords
 */
export function generateEnhancedMetaTags(page: {
  title: string
  description: string
  keywords: string[]
  path: string
}): { [key: string]: string } {
  const baseUrl = `https://${enhancedSiteConfig.domain}`
  const fullUrl = `${baseUrl}${page.path}`

  return {
    'title': page.title,
    'description': page.description,
    'keywords': page.keywords.join(', '),
    'author': enhancedSiteConfig.author,
    'robots': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    'canonical': fullUrl,
    'language': 'en-AU',
    'geo.region': 'AU',
    'geo.country': 'Australia',
    'geo.placename': 'Sydney, NSW',
    'ICBM': `${enhancedSiteConfig.location.coordinates.latitude}, ${enhancedSiteConfig.location.coordinates.longitude}`,

    // Open Graph
    'og:type': 'website',
    'og:site_name': enhancedSiteConfig.siteName,
    'og:title': page.title,
    'og:description': page.description,
    'og:url': fullUrl,
    'og:image': `${baseUrl}/images/camilla-main-headshot.jpg.webp`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Camilla Thompson - Australia\'s Leading Biohacking Expert',
    'og:locale': 'en_AU',

    // Twitter
    'twitter:card': 'summary_large_image',
    'twitter:site': '@biohackmecoach',
    'twitter:creator': '@biohackmecoach',
    'twitter:title': page.title,
    'twitter:description': page.description,
    'twitter:image': `${baseUrl}/images/camilla-main-headshot.jpg.webp`,
    'twitter:image:alt': 'Camilla Thompson - Australia\'s Leading Biohacking Expert',

    // Additional SEO
    'rating': 'general',
    'distribution': 'global',
    'revisit-after': '7 days',
    'expires': 'never',
    'pragma': 'no-cache',
    'cache-control': 'no-cache'
  }
}

/**
 * Generates structured data for blog posts
 * Optimizes for featured snippets and rich results
 */
export function generateBlogPostSchema(post: {
  title: string
  description: string
  content: string
  datePublished: string
  dateModified?: string
  image?: string
  category?: string
}): any {
  const baseUrl = `https://${enhancedSiteConfig.domain}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image ? `${baseUrl}${post.image}` : `${baseUrl}/images/camilla-main-headshot.jpg.webp`,
    author: {
      '@type': 'Person',
      name: enhancedSiteConfig.author,
      url: `${baseUrl}/about`,
      image: `${baseUrl}/images/camilla-main-headshot.jpg.webp`,
      sameAs: Object.values(enhancedSiteConfig.contact.social)
    },
    publisher: {
      '@type': 'Organization',
      name: enhancedSiteConfig.businessName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo-black.png`,
        width: 250,
        height: 60
      }
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': baseUrl
    },
    articleSection: post.category || 'Biohacking',
    keywords: enhancedSiteConfig.primaryKeywords.join(', '),
    about: [
      {
        '@type': 'Thing',
        name: 'Biohacking'
      },
      {
        '@type': 'Thing',
        name: 'Health Optimization'
      },
      {
        '@type': 'Thing',
        name: 'Wellness'
      }
    ]
  }
}

/**
 * Validates schema markup for SEO compliance
 * Ensures proper implementation for Google rich results
 */
export function validateSchemaMarkup(schemaData: any): {
  isValid: boolean
  errors: string[]
  warnings: string[]
  score: number
} {
  const errors: string[] = []
  const warnings: string[] = []
  let score = 100

  // Check required fields
  if (!schemaData['@context']) {
    errors.push('Missing @context property')
    score -= 25
  }

  if (!schemaData['@type']) {
    errors.push('Missing @type property')
    score -= 25
  }

  if (!schemaData.name && !schemaData.headline) {
    errors.push('Missing name or headline property')
    score -= 20
  }

  if (!schemaData.description) {
    warnings.push('Missing description property')
    score -= 10
  }

  // Check for recommended properties
  if (schemaData['@type'] === 'LocalBusiness') {
    if (!schemaData.address) {
      warnings.push('Missing address for LocalBusiness')
      score -= 15
    }

    if (!schemaData.aggregateRating) {
      warnings.push('Missing aggregateRating for LocalBusiness')
      score -= 10
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    score: Math.max(0, score)
  }
}

export default {
  enhancedSiteConfig,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateBiohackingFAQSchema,
  generateCourseSchema,
  generateEnhancedMetaTags,
  generateBlogPostSchema,
  validateSchemaMarkup
}