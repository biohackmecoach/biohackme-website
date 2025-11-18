export interface LeadAvatar {
  id: string
  name: string
  description: string
  businessGoal: string
  keywords: string[]
  jobTitles: string[]
  companies: string[]
  industries: string[]
  locations: string[]
  socialKeywords: string[]
  qualificationCriteria: {
    mustHave: string[]
    niceToHave: string[]
    disqualifiers: string[]
  }
  outreachStrategy: string
  expectedConversion: string
}

export const leadAvatars: LeadAvatar[] = [
  {
    id: 'luxury-hotel-experience',
    name: 'Luxury Hotel Guest Experience Leaders',
    description: 'Senior executives responsible for enhancing guest wellness experiences at luxury hotels and resorts',
    businessGoal: 'Book wellness consultancy and retreat partnerships',
    keywords: [
      'guest experience',
      'luxury hospitality',
      'wellness programs',
      'spa services',
      'wellness retreats',
      'biohacking wellness',
      'luxury wellness',
      'guest wellness'
    ],
    jobTitles: [
      'Director of Guest Experience',
      'VP Guest Services',
      'Director of Wellness',
      'Head of Spa & Wellness',
      'Guest Experience Manager',
      'Wellness Program Director',
      'Director of Resort Operations',
      'Chief Experience Officer'
    ],
    companies: [
      'Four Seasons',
      'Ritz Carlton',
      'Shangri La',
      'Park Hyatt',
      'InterContinental',
      'Rosewood',
      'Mandarin Oriental',
      'W Hotels',
      'Edition Hotels',
      'Aman Resorts',
      'Six Senses',
      'COMO Hotels'
    ],
    industries: [
      'Luxury Hotels',
      'Resort Management',
      'Hospitality',
      'Spa & Wellness',
      'Travel & Tourism',
      'Luxury Services'
    ],
    locations: [
      'Australia',
      'Singapore',
      'Hong Kong',
      'Thailand',
      'Indonesia',
      'Malaysia',
      'New Zealand',
      'Japan'
    ],
    socialKeywords: [
      'luxury hospitality',
      'guest experience',
      'wellness tourism',
      'spa wellness',
      'luxury travel'
    ],
    qualificationCriteria: {
      mustHave: [
        'Works at luxury hotel/resort brand',
        'Senior level position (Director+)',
        'Responsible for guest experience or wellness',
        'Based in Asia-Pacific region'
      ],
      niceToHave: [
        'Posts about wellness trends',
        'Mentions biohacking or health optimization',
        'Speaks at hospitality conferences',
        'Has wellness certifications'
      ],
      disqualifiers: [
        'Budget hotel chains',
        'Entry-level positions',
        'Outside target geographic regions',
        'No wellness focus in role'
      ]
    },
    outreachStrategy: 'Consultancy pitch for guest wellness programs and biohacking retreats',
    expectedConversion: '2-5% to consultation calls, $10K-50K project value'
  },

  {
    id: 'corporate-wellbeing-directors',
    name: 'Corporate Wellbeing Directors',
    description: 'Senior executives managing employee wellness programs who book keynote speakers',
    businessGoal: 'Book speaking engagements and corporate wellness programs',
    keywords: [
      'employee wellbeing',
      'corporate wellness',
      'workplace health',
      'employee engagement',
      'wellness speakers',
      'keynote speakers',
      'biohacking workplace',
      'performance optimization',
      'executive health'
    ],
    jobTitles: [
      'Director of Wellbeing',
      'Head of Employee Wellness',
      'VP People & Culture',
      'Chief Wellbeing Officer',
      'Director of People Experience',
      'Head of Workplace Wellness',
      'Employee Experience Director',
      'Wellness Program Manager',
      'Director of Human Resources',
      'Chief People Officer'
    ],
    companies: [
      'Google',
      'Microsoft',
      'Atlassian',
      'Canva',
      'Xero',
      'REA Group',
      'Seek',
      'Telstra',
      'Commonwealth Bank',
      'Westpac',
      'BHP',
      'Rio Tinto',
      'Woolworths',
      'Coles',
      'Qantas'
    ],
    industries: [
      'Technology',
      'Financial Services',
      'Mining',
      'Telecommunications',
      'Retail',
      'Consulting',
      'Professional Services',
      'Healthcare',
      'Government'
    ],
    locations: [
      'Sydney',
      'Melbourne',
      'Brisbane',
      'Perth',
      'Adelaide',
      'Canberra',
      'Australia'
    ],
    socialKeywords: [
      'employee wellness',
      'workplace wellbeing',
      'corporate health',
      'keynote speaker',
      'wellness programs'
    ],
    qualificationCriteria: {
      mustHave: [
        'Senior role in people/wellness/HR',
        'Company size 100+ employees',
        'Based in Australia',
        'Responsible for wellness programs or events'
      ],
      niceToHave: [
        'Posts about workplace wellness',
        'Mentions booking speakers/events',
        'Active in HR/wellness communities',
        'Has wellness budget authority'
      ],
      disqualifiers: [
        'Small companies (<50 employees)',
        'Junior positions',
        'No wellness focus',
        'Government roles (different procurement)'
      ]
    },
    outreachStrategy: 'Speaking engagement pitch for employee wellness and biohacking workshops',
    expectedConversion: '3-8% to speaking bookings, $5K-25K per engagement'
  },

  {
    id: 'health-fitness-influencers',
    name: 'Health & Biohacking Influencers',
    description: 'Content creators and thought leaders in health, fitness, and biohacking who can promote your book',
    businessGoal: 'Get book reviews, interviews, and social media promotion',
    keywords: [
      'biohacking',
      'health optimization',
      'fitness influencer',
      'wellness coach',
      'longevity',
      'performance optimization',
      'health content creator',
      'fitness entrepreneur',
      'wellness influencer',
      'health podcaster'
    ],
    jobTitles: [
      'Health Coach',
      'Fitness Influencer',
      'Wellness Entrepreneur',
      'Biohacking Expert',
      'Health Content Creator',
      'Fitness Coach',
      'Longevity Researcher',
      'Wellness Podcaster',
      'Health Blogger',
      'Nutrition Coach'
    ],
    companies: [
      'Self-employed',
      'Personal Brand',
      'Coaching Business',
      'Podcast Network',
      'Content Creator',
      'Wellness Brand'
    ],
    industries: [
      'Health & Wellness',
      'Fitness',
      'Nutrition',
      'Content Creation',
      'Personal Development',
      'Coaching'
    ],
    locations: [
      'Australia',
      'United States',
      'United Kingdom',
      'Canada',
      'New Zealand',
      'Global'
    ],
    socialKeywords: [
      'biohacking',
      'health optimization',
      'wellness tips',
      'fitness motivation',
      'book review',
      'health podcast'
    ],
    qualificationCriteria: {
      mustHave: [
        'Active health/fitness content creator',
        '5K+ followers on main platform',
        'Regularly posts wellness content',
        'Engages with biohacking topics'
      ],
      niceToHave: [
        'Has reviewed health books before',
        'Runs a podcast or YouTube channel',
        'Mentions Australian health experts',
        'Active email list or newsletter'
      ],
      disqualifiers: [
        'Inactive accounts',
        'Less than 1K followers',
        'No wellness focus',
        'Promotional accounts only'
      ]
    },
    outreachStrategy: 'Book review and collaboration pitch for content creation',
    expectedConversion: '10-20% response rate, 2-5% book features'
  },

  {
    id: 'executive-health-coaches',
    name: 'Executive Health & Performance Coaches',
    description: 'High-end coaches serving executives who could refer clients or collaborate',
    businessGoal: 'Build referral partnerships and cross-promotion opportunities',
    keywords: [
      'executive coaching',
      'performance coaching',
      'executive health',
      'leadership wellness',
      'high performance',
      'executive optimization',
      'CEO coaching',
      'leadership coach'
    ],
    jobTitles: [
      'Executive Coach',
      'Performance Coach',
      'Leadership Coach',
      'Executive Health Coach',
      'High Performance Coach',
      'CEO Coach',
      'Business Coach',
      'Wellness Coach'
    ],
    companies: [
      'Self-employed',
      'Coaching Practice',
      'Consulting Firm',
      'Leadership Development'
    ],
    industries: [
      'Executive Coaching',
      'Leadership Development',
      'Business Consulting',
      'Performance Coaching'
    ],
    locations: [
      'Sydney',
      'Melbourne',
      'Brisbane',
      'Perth',
      'Singapore',
      'Hong Kong',
      'Australia'
    ],
    socialKeywords: [
      'executive coaching',
      'leadership development',
      'executive wellness',
      'performance optimization'
    ],
    qualificationCriteria: {
      mustHave: [
        'Established coaching practice',
        'Works with executives/leaders',
        'Premium pricing (high-end clients)',
        'Based in target regions'
      ],
      niceToHave: [
        'Mentions biohacking or wellness',
        'Has corporate clients',
        'Active referral network',
        'Complementary services'
      ],
      disqualifiers: [
        'Life coaches (too broad)',
        'Budget coaching services',
        'No executive focus',
        'Competing services'
      ]
    },
    outreachStrategy: 'Referral partnership and collaboration opportunities',
    expectedConversion: '5-10% to partnership discussions'
  },

  {
    id: 'wellness-retreat-centers',
    name: 'Wellness Retreat Center Owners',
    description: 'Owners and managers of wellness retreats who could host your programs',
    businessGoal: 'Partnership opportunities for retreat programs and workshops',
    keywords: [
      'wellness retreat',
      'retreat center',
      'wellness destination',
      'health retreat',
      'biohacking retreat',
      'wellness programs',
      'retreat facilitator'
    ],
    jobTitles: [
      'Retreat Center Owner',
      'Wellness Retreat Director',
      'Retreat Program Manager',
      'Wellness Center Manager',
      'Retreat Facilitator',
      'Wellness Program Director'
    ],
    companies: [
      'Retreat Centers',
      'Wellness Destinations',
      'Health Resorts',
      'Spa Retreats'
    ],
    industries: [
      'Wellness Tourism',
      'Health Retreats',
      'Spa & Wellness',
      'Alternative Health'
    ],
    locations: [
      'Australia',
      'Bali',
      'Thailand',
      'New Zealand',
      'Byron Bay',
      'Gold Coast',
      'Blue Mountains'
    ],
    socialKeywords: [
      'wellness retreat',
      'health transformation',
      'retreat programs',
      'wellness destination'
    ],
    qualificationCriteria: {
      mustHave: [
        'Operates wellness retreat center',
        'Hosts external facilitators',
        'Target audience alignment',
        'Quality retreat programs'
      ],
      niceToHave: [
        'Mentions biohacking or optimization',
        'Serves executives/professionals',
        'Premium retreat offerings',
        'Strong online presence'
      ],
      disqualifiers: [
        'Budget retreats only',
        'No external facilitators',
        'Misaligned audience',
        'Poor reviews/reputation'
      ]
    },
    outreachStrategy: 'Partnership pitch for biohacking retreat programs',
    expectedConversion: '3-7% to partnership discussions'
  }
]

// Helper function to get avatar by ID
export const getAvatarById = (id: string): LeadAvatar | undefined => {
  return leadAvatars.find(avatar => avatar.id === id)
}

// Helper function to get all avatar names for dropdown
export const getAvatarOptions = () => {
  return leadAvatars.map(avatar => ({
    value: avatar.id,
    label: avatar.name,
    description: avatar.description
  }))
}