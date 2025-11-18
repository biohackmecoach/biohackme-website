export interface KeywordData {
  keyword: string
  searchVolume: 'High' | 'Medium' | 'Low'
  difficulty: 'Easy' | 'Medium' | 'Hard'
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  currentUsage: 'Missing' | 'Under-optimized' | 'Good' | 'Over-optimized'
  recommendedPages: string[]
  businessValue: 'High' | 'Medium' | 'Low'
}

export interface PageKeywordAudit {
  pagePath: string
  pageTitle: string
  primaryKeywords: string[]
  secondaryKeywords: string[]
  missingKeywords: KeywordData[]
  keywordDensity: { [keyword: string]: number }
  recommendations: string[]
  competitorGaps: string[]
}

// High-value biohacking keywords for Australia
export const targetKeywords: KeywordData[] = [
  // Primary biohacking terms
  {
    keyword: 'biohacking Australia',
    searchVolume: 'High',
    difficulty: 'Medium',
    priority: 'Critical',
    currentUsage: 'Good',
    recommendedPages: ['/', '/about', '/blog'],
    businessValue: 'High'
  },
  {
    keyword: 'biohacking expert Australia',
    searchVolume: 'Medium',
    difficulty: 'Easy',
    priority: 'Critical',
    currentUsage: 'Under-optimized',
    recommendedPages: ['/', '/about', '/talks'],
    businessValue: 'High'
  },
  {
    keyword: 'biohacking coach Sydney',
    searchVolume: 'Medium',
    difficulty: 'Easy',
    priority: 'High',
    currentUsage: 'Missing',
    recommendedPages: ['/', '/superchargeyourlife', '/about'],
    businessValue: 'High'
  },
  
  // Health optimization
  {
    keyword: 'health optimization Australia',
    searchVolume: 'High',
    difficulty: 'Medium',
    priority: 'Critical',
    currentUsage: 'Under-optimized',
    recommendedPages: ['/', '/superchargeyourlife', '/masterclass'],
    businessValue: 'High'
  },
  {
    keyword: 'longevity coach Australia',
    searchVolume: 'Medium',
    difficulty: 'Easy',
    priority: 'High',
    currentUsage: 'Missing',
    recommendedPages: ['/', '/about', '/superchargeyourlife'],
    businessValue: 'High'
  },
  {
    keyword: 'functional medicine Australia',
    searchVolume: 'High',
    difficulty: 'Hard',
    priority: 'Medium',
    currentUsage: 'Missing',
    recommendedPages: ['/superchargeyourlife', '/about'],
    businessValue: 'High'
  },

  // Nutrition & wellness
  {
    keyword: 'nutritionist Sydney',
    searchVolume: 'High',
    difficulty: 'Hard',
    priority: 'High',
    currentUsage: 'Under-optimized',
    recommendedPages: ['/about', '/superchargeyourlife'],
    businessValue: 'High'
  },
  {
    keyword: 'wellness coach Australia',
    searchVolume: 'High',
    difficulty: 'Medium',
    priority: 'High',
    currentUsage: 'Good',
    recommendedPages: ['/', '/about', '/superchargeyourlife'],
    businessValue: 'High'
  },
  {
    keyword: 'holistic nutritionist Australia',
    searchVolume: 'Medium',
    difficulty: 'Medium',
    priority: 'High',
    currentUsage: 'Missing',
    recommendedPages: ['/about', '/superchargeyourlife'],
    businessValue: 'High'
  },

  // Specific services
  {
    keyword: 'biohacking assessment',
    searchVolume: 'Low',
    difficulty: 'Easy',
    priority: 'High',
    currentUsage: 'Good',
    recommendedPages: ['/assessment', '/brain-assessment'],
    businessValue: 'High'
  },
  {
    keyword: 'cognitive function test',
    searchVolume: 'Medium',
    difficulty: 'Medium',
    priority: 'High',
    currentUsage: 'Good',
    recommendedPages: ['/brain-assessment', '/masterclass'],
    businessValue: 'Medium'
  },
  {
    keyword: 'brain health assessment',
    searchVolume: 'Medium',
    difficulty: 'Medium',
    priority: 'High',
    currentUsage: 'Good',
    recommendedPages: ['/brain-assessment'],
    businessValue: 'High'
  },

  // Corporate services
  {
    keyword: 'corporate wellness speaker Australia',
    searchVolume: 'Medium',
    difficulty: 'Medium',
    priority: 'High',
    currentUsage: 'Good',
    recommendedPages: ['/talks'],
    businessValue: 'High'
  },
  {
    keyword: 'workplace wellness programs',
    searchVolume: 'High',
    difficulty: 'Hard',
    priority: 'Medium',
    currentUsage: 'Missing',
    recommendedPages: ['/talks', '/superchargeyourlife'],
    businessValue: 'High'
  },

  // Location-based
  {
    keyword: 'health coach Sydney',
    searchVolume: 'High',
    difficulty: 'Hard',
    priority: 'High',
    currentUsage: 'Under-optimized',
    recommendedPages: ['/', '/about', '/superchargeyourlife'],
    businessValue: 'High'
  },
  {
    keyword: 'biohacking Melbourne',
    searchVolume: 'Medium',
    difficulty: 'Medium',
    priority: 'Medium',
    currentUsage: 'Missing',
    recommendedPages: ['/', '/blog'],
    businessValue: 'Medium'
  },
  {
    keyword: 'wellness retreat Bali',
    searchVolume: 'High',
    difficulty: 'Medium',
    priority: 'High',
    currentUsage: 'Good',
    recommendedPages: ['/retreats'],
    businessValue: 'High'
  },

  // Product-related
  {
    keyword: 'red light therapy Australia',
    searchVolume: 'High',
    difficulty: 'Medium',
    priority: 'Medium',
    currentUsage: 'Good',
    recommendedPages: ['/shop'],
    businessValue: 'Medium'
  },
  {
    keyword: 'infrared sauna Australia',
    searchVolume: 'High',
    difficulty: 'Hard',
    priority: 'Medium',
    currentUsage: 'Good',
    recommendedPages: ['/shop'],
    businessValue: 'Medium'
  },

  // Long-tail opportunities
  {
    keyword: 'how to optimize health naturally',
    searchVolume: 'Medium',
    difficulty: 'Easy',
    priority: 'High',
    currentUsage: 'Missing',
    recommendedPages: ['/blog', '/freebie', '/masterclass'],
    businessValue: 'Medium'
  },
  {
    keyword: 'evidence based wellness strategies',
    searchVolume: 'Low',
    difficulty: 'Easy',
    priority: 'Medium',
    currentUsage: 'Under-optimized',
    recommendedPages: ['/', '/about', '/masterclass'],
    businessValue: 'Medium'
  },
  {
    keyword: 'personalized health coaching Australia',
    searchVolume: 'Medium',
    difficulty: 'Medium',
    priority: 'High',
    currentUsage: 'Missing',
    recommendedPages: ['/superchargeyourlife', '/about'],
    businessValue: 'High'
  },

  // Trending biohacking terms
  {
    keyword: 'biohacking technologies',
    searchVolume: 'Medium',
    difficulty: 'Medium',
    priority: 'High',
    currentUsage: 'Good',
    recommendedPages: ['/shop', '/retreats', '/talks'],
    businessValue: 'Medium'
  },
  {
    keyword: 'sleep optimization',
    searchVolume: 'High',
    difficulty: 'Medium',
    priority: 'High',
    currentUsage: 'Under-optimized',
    recommendedPages: ['/masterclass', '/blog'],
    businessValue: 'High'
  },
  {
    keyword: 'stress management techniques',
    searchVolume: 'High',
    difficulty: 'Medium',
    priority: 'Medium',
    currentUsage: 'Under-optimized',
    recommendedPages: ['/masterclass', '/talks'],
    businessValue: 'Medium'
  },

  // Women-specific (untapped market)
  {
    keyword: 'women\'s health coach Australia',
    searchVolume: 'High',
    difficulty: 'Medium',
    priority: 'High',
    currentUsage: 'Missing',
    recommendedPages: ['/about', '/retreats', '/superchargeyourlife'],
    businessValue: 'High'
  },
  {
    keyword: 'hormone optimization women',
    searchVolume: 'High',
    difficulty: 'Medium',
    priority: 'High',
    currentUsage: 'Missing',
    recommendedPages: ['/masterclass', '/superchargeyourlife', '/retreats'],
    businessValue: 'High'
  },
  {
    keyword: 'women\'s wellness retreat',
    searchVolume: 'High',
    difficulty: 'Medium',
    priority: 'High',
    currentUsage: 'Good',
    recommendedPages: ['/retreats'],
    businessValue: 'High'
  }
]

export const getKeywordRecommendations = (pagePath: string): KeywordData[] => {
  return targetKeywords.filter(keyword => 
    keyword.recommendedPages.includes(pagePath) && 
    (keyword.currentUsage === 'Missing' || keyword.currentUsage === 'Under-optimized')
  ).sort((a, b) => {
    const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })
}

export const getCriticalKeywords = (): KeywordData[] => {
  return targetKeywords.filter(keyword => 
    keyword.priority === 'Critical' && 
    (keyword.currentUsage === 'Missing' || keyword.currentUsage === 'Under-optimized')
  )
}

export const getHighOpportunityKeywords = (): KeywordData[] => {
  return targetKeywords.filter(keyword => 
    keyword.difficulty === 'Easy' && 
    keyword.businessValue === 'High' &&
    (keyword.currentUsage === 'Missing' || keyword.currentUsage === 'Under-optimized')
  )
}

export const pageKeywordAudits: PageKeywordAudit[] = [
  {
    pagePath: '/',
    pageTitle: 'Homepage',
    primaryKeywords: ['biohacking Australia', 'health optimization', 'wellness coach'],
    secondaryKeywords: ['evidence-based', 'performance optimization', 'Camilla Thompson'],
    missingKeywords: getKeywordRecommendations('/'),
    keywordDensity: {},
    recommendations: [
      'Add "biohacking coach Sydney" to hero section',
      'Include "longevity coach Australia" in services description',
      'Mention "health coach Sydney" in about section',
      'Add "personalized health coaching Australia" to value proposition'
    ],
    competitorGaps: [
      'Functional medicine integration',
      'Women-specific health optimization',
      'Corporate wellness programs mention'
    ]
  },
  {
    pagePath: '/about',
    pageTitle: 'About Camilla',
    primaryKeywords: ['Camilla Thompson', 'biohacking expert', 'nutritionist'],
    secondaryKeywords: ['health coach', 'wellness expert', 'Australia'],
    missingKeywords: getKeywordRecommendations('/about'),
    keywordDensity: {},
    recommendations: [
      'Add "biohacking expert Australia" to credentials section',
      'Include "nutritionist Sydney" in professional description',
      'Mention "holistic nutritionist Australia" in approach section',
      'Add "women\'s health coach Australia" to specialties'
    ],
    competitorGaps: [
      'Functional medicine training',
      'Corporate wellness expertise',
      'International speaking credentials'
    ]
  },
  {
    pagePath: '/superchargeyourlife',
    pageTitle: 'Coaching Program',
    primaryKeywords: ['1:1 coaching', 'health transformation', 'biohacking coaching'],
    secondaryKeywords: ['personalized', 'functional testing', 'wellness'],
    missingKeywords: getKeywordRecommendations('/superchargeyourlife'),
    keywordDensity: {},
    recommendations: [
      'Add "personalized health coaching Australia" to program description',
      'Include "longevity coach Australia" in benefits section',
      'Mention "functional medicine Australia" in approach',
      'Add "hormone optimization women" for female-specific benefits'
    ],
    competitorGaps: [
      'Gut health specialization',
      'Hormone testing specifics',
      'Chronic fatigue expertise'
    ]
  },
  {
    pagePath: '/masterclass',
    pageTitle: 'Masterclasses',
    primaryKeywords: ['biohacking masterclass', 'online health courses', 'wellness education'],
    secondaryKeywords: ['8-pillar framework', 'biohacking training'],
    missingKeywords: getKeywordRecommendations('/masterclass'),
    keywordDensity: {},
    recommendations: [
      'Add "sleep optimization" to course descriptions',
      'Include "stress management techniques" in curriculum',
      'Mention "hormone optimization women" in relevant courses',
      'Add "how to optimize health naturally" to course benefits'
    ],
    competitorGaps: [
      'Menopause-specific content',
      'Male hormone optimization',
      'Workplace wellness applications'
    ]
  },
  {
    pagePath: '/talks',
    pageTitle: 'Speaking',
    primaryKeywords: ['biohacking speaker', 'corporate wellness speaker', 'keynote speaker'],
    secondaryKeywords: ['wellness presentations', 'health speaker'],
    missingKeywords: getKeywordRecommendations('/talks'),
    keywordDensity: {},
    recommendations: [
      'Add "workplace wellness programs" to service offerings',
      'Include "corporate wellness speaker Australia" in credentials',
      'Mention "stress management techniques" in talk topics',
      'Add "biohacking technologies" to presentation content'
    ],
    competitorGaps: [
      'Remote team wellness',
      'Executive health programs',
      'Industry-specific content'
    ]
  },
  {
    pagePath: '/shop',
    pageTitle: 'Biohacking Shop',
    primaryKeywords: ['biohacking products', 'red light therapy', 'infrared sauna'],
    secondaryKeywords: ['health tech', 'wellness equipment', 'biohacking tools'],
    missingKeywords: getKeywordRecommendations('/shop'),
    keywordDensity: {},
    recommendations: [
      'Already well-optimized for product keywords',
      'Consider adding "biohacking technologies" to category descriptions',
      'Include regional shipping information for Australia'
    ],
    competitorGaps: [
      'Sleep optimization devices',
      'Hormone testing kits',
      'Meditation/mindfulness tools'
    ]
  }
]