// Biohacking Masterclass Data Structure
// Based on the Biohacking Framework

export interface Masterclass {
  id: string
  title: string
  subtitle: string
  description: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  price: number
  launchPrice?: number
  regularPrice?: number
  currency: string
  status: 'available' | 'coming-soon' | 'preview'
  thumbnail: string
  category: string
  modules: Module[]
  outcomes: string[]
  prerequisites?: string[]
  instructor: {
    name: string
    bio: string
    credentials: string[]
  }
}

export interface Module {
  id: string
  title: string
  description: string
  duration: string
  videoUrl?: string
  resources: Resource[]
  completed?: boolean
  learningNotes?: string[]
  keyTakeaways?: string[]
}

export interface Resource {
  id: string
  title: string
  type: 'pdf' | 'worksheet' | 'audio' | 'link'
  url: string
  description?: string
}

// The 8 Pillars of the Biohacking Framework
export const biohackingPillars = [
  'BIOHACK YOUR SLEEP',
  'BIOHACK YOUR MOOD', 
  'BIOHACK YOUR BODY',
  'BIOHACK YOUR ENVIRONMENT',
  'BIOHACK YOUR ENERGY',
  'BIOHACK YOUR RELATIONSHIPS',
  'BIOHACK YOUR HEALTH',
  'BIOHACK YOUR BRAIN'
]

// The 7 Pillars Foundation Framework (from the masterclass)
export const foundationPillars = [
  'Nutrition: The Ultimate Foundational Biohack',
  'Sleep: Your Secret Weapon for Longevity',
  'Gut Health: The Central Plumbing of Your Health',
  'Mindset: The Blueprint for Your Health',
  'Movement: The Support Beams of Your Health',
  'Recovery: The Bedroom of Your Health',
  'Hydration: The Plumbing of Your Health'
]

export const masterclasses: Masterclass[] = [
  {
    id: 'biohacking-foundation',
    title: 'Biohacking Basics: Future-Proof Your Health Masterclass',
    subtitle: 'The 7 Pillars Framework for Optimal Living',
    description: 'Cut through the health noise and learn what your unique body actually needs. Discover how to biohack by stacking small changes that make a big impact on your energy, focus, and longevity.',
    duration: '30 minutes',
    level: 'Beginner',
    price: 27,
    launchPrice: 27,
    regularPrice: 97,
    currency: 'AUD',
    status: 'available',
    thumbnail: '/images/masterclass-foundation.webp',
    category: 'Foundation',
    instructor: {
      name: 'Camilla Thompson',
      bio: 'Leading Biohacking Expert, Nutritionist & Wellbeing Coach',
      credentials: [
        'Nutritionist & Wellbeing Coach',
        'Biohacking Specialist',
        'Almost a Decade of Experience in Health',
        'Keynote Speaker & Performance Expert',
        'Featured in Major Australian Media'
      ]
    },
    outcomes: [
      'Get your personalised health snapshot with the Biohacking Wheel',
      'Master the 7 pillars foundation framework for optimal health',
      'Discover biohacking stacking strategies for lasting transformation',
      'Understand your DNA and epigenetics - how lifestyle affects your genes',
      'Create habits that stick with the proven Anchor & Amplify method',
      'Learn science-backed techniques to boost energy and vitality naturally',
      'Develop a personalised 30-day action plan for immediate results',
      'Access practical tools and worksheets for ongoing health optimisation'
    ],
    modules: [
      {
        id: 'welcome',
        title: 'Welcome & My Health Story',
        description: 'Welcome to the masterclass and understanding the health paradox - why we have more health information than ever but are sicker than ever',
        duration: '5 minutes',
        learningNotes: [
          'Discover why traditional health advice isn\'t working',
          'Understand the information overload problem',
          'Learn about the health paradox of modern life',
          'Get introduced to the biohacking approach'
        ],
        keyTakeaways: [
          'Complete your personal Biohacking Wheel assessment',
          'Identify your current health baseline across 8 key areas'
        ],
        resources: [
          {
            id: 'biohacking-wheel',
            title: 'Biohacking Wheel Life Audit',
            type: 'worksheet',
            url: '/resources/biohacking-wheel.pdf',
            description: 'Rate yourself in 8 areas to get your personalised health snapshot'
          }
        ]
      },
      {
        id: 'wtf-biohacking',
        title: 'WTF is Biohacking?',
        description: 'Plain-English definition of biohacking and powerful energy-boosting techniques',
        duration: '5 minutes',
        learningNotes: [
          'Get the simple, no-nonsense definition of biohacking',
          'Learn how biohacking differs from traditional wellness',
          'Discover why small changes create massive results',
          'Understand the science behind biological optimisation'
        ],
        keyTakeaways: [
          'Master natural energy-boosting techniques',
          'Start implementing simple daily biohacks'
        ],
        resources: [
          {
            id: 'cold-light-challenge',
            title: '7-Day Energy Boost Challenge',
            type: 'worksheet',
            url: '/resources/energy-boost-challenge.pdf'
          }
        ]
      },
      {
        id: 'seven-pillars',
        title: 'The 7 Pillars Framework',
        description: 'Master the foundational framework: Nutrition, Sleep, Gut Health, Mindset, Movement, Recovery, and Hydration',
        duration: '10 minutes',
        learningNotes: [
          'Deep dive into each of the 7 foundational pillars',
          'Learn how nutrition becomes your ultimate biohack',
          'Discover why sleep is your secret weapon for longevity',
          'Understand gut health as your central health system',
          'Master mindset as the blueprint for transformation',
          'Use movement as the support beam of your health',
          'Implement recovery strategies for optimal performance',
          'Optimize hydration as your internal plumbing system'
        ],
        keyTakeaways: [
          'Assess your current level in each pillar',
          'Create a personalised improvement plan',
          'Learn the interconnection between all pillars'
        ],
        resources: [
          {
            id: 'seven-pillars-guide',
            title: '7 Pillars Foundation Guide',
            type: 'pdf',
            url: '/resources/seven-pillars-guide.pdf'
          }
        ]
      },
      {
        id: 'dna-epigenetics',
        title: 'DNA, Epigenetics & Longevity',
        description: 'Your genes load the gun, but your lifestyle pulls the trigger. Learn how to work with your personal health code',
        duration: '5 minutes',
        learningNotes: [
          'Understand the difference between genetics and epigenetics',
          'Learn how lifestyle choices influence gene expression',
          'Discover the power of environmental factors on health',
          'Master strategies to optimise your genetic potential'
        ],
        keyTakeaways: [
          'Realize you have more control over your health than you think',
          'Learn which DNA tests are worth investing in',
          'Create lifestyle changes based on genetic insights'
        ],
        resources: [
          {
            id: 'dna-testing-guide',
            title: 'DNA Testing Guide',
            type: 'pdf',
            url: '/resources/dna-testing-guide.pdf'
          }
        ]
      },
      {
        id: 'habit-formation',
        title: 'Who Do You Want to Be?',
        description: 'The Anchor & Amplify method for building habits that stick naturally in your life',
        duration: '3 minutes',
        learningNotes: [
          'Master the psychology behind lasting habit formation',
          'Learn the Anchor & Amplify method step-by-step',
          'Discover how to stack new habits onto existing routines',
          'Understand why identity-based change is most effective'
        ],
        keyTakeaways: [
          'Create a personal habit stacking system',
          'Design your future self identity',
          'Build automatic healthy behaviours'
        ],
        resources: [
          {
            id: 'anchor-amplify-workbook',
            title: 'Anchor & Amplify Habit Workbook',
            type: 'worksheet',
            url: '/resources/anchor-amplify-workbook.pdf'
          }
        ]
      },
      {
        id: 'future-you',
        title: 'Future You & Next Steps',
        description: 'Your challenge and call to action - choose one biohack for the next 30 days',
        duration: '2 minutes',
        learningNotes: [
          'Create your personalised 30-day action plan',
          'Learn how to choose the right biohack to start with',
          'Understand the compound effect of consistent small changes',
          'Get strategies for maintaining motivation and momentum'
        ],
        keyTakeaways: [
          'Commit to one specific biohack for 30 days',
          'Set up tracking and accountability systems',
          'Plan your continued biohacking journey'
        ],
        resources: [
          {
            id: '30-day-tracker',
            title: '30-Day Biohack Tracker',
            type: 'worksheet',
            url: '/resources/30-day-tracker.pdf'
          }
        ]
      }
    ]
  },
  {
    id: 'biohack-brain',
    title: 'Biohacking Your Brain Masterclass',
    subtitle: 'Protect Your Most Precious Asset',
    description: 'Overcome FOGO (Fear of Growing Old) and unlock your brain\'s full potential. Learn to boost focus, memory, creativity and resilience with science-backed brain hacks.',
    duration: '30 minutes',
    level: 'Intermediate',
    price: 97,
    currency: 'AUD',
    status: 'coming-soon',
    thumbnail: '/images/masterclass-brain.webp',
    category: 'Brain',
    instructor: {
      name: 'Camilla Thompson',
      bio: 'Leading Biohacking Expert, Nutritionist & Wellbeing Coach',
      credentials: [
        'Brain Health Specialist',
        'Neuroplasticity Expert',
        'Cognitive Performance Coach'
      ]
    },
    outcomes: [
      'Overcome FOGO - Fear of Growing Old in your brain',
      'Master the 7 Brain Networks for optimal performance',
      'Learn the 2-minute Sensory Reset technique',
      'Discover brain fuel and hydration hacks',
      'Understand epigenetics and brain rewiring',
      'Get personalised nootropics recommendations'
    ],
    modules: [
      {
        id: 'welcome-brain',
        title: 'Welcome - Protect Your Most Precious Asset',
        description: 'Introduction to biohacking your brain and overcoming the fear of cognitive decline',
        duration: '1 minute',
        learningNotes: [
          'Understand why brain health is your most important investment',
          'Learn about the modern brain challenges we all face',
          'Discover the neuroplasticity advantage you already possess',
          'Get introduced to evidence-based brain optimisation'
        ],
        keyTakeaways: [
          'Complete your personal brain health baseline assessment',
          'Identify your current cognitive strengths and challenges'
        ],
        resources: [
          {
            id: 'brain-audit',
            title: '1-Minute Brain Audit',
            type: 'worksheet',
            url: '/resources/brain-audit.pdf',
            description: 'Rate your focus, memory, and stress levels 1-10'
          }
        ]
      },
      {
        id: 'fogo-paradox',
        title: 'The Brain Paradox + FOGO',
        description: 'Understanding Fear of Growing Old and why your brain is more adaptable than you think',
        duration: '5 minutes',
        learningNotes: [
          'Understand FOGO (Fear of Growing Old) and its impact on brain health',
          'Learn why common beliefs about brain aging are wrong',
          'Discover the latest neuroscience research on brain adaptability',
          'Understand how fear itself damages cognitive function'
        ],
        keyTakeaways: [
          'Overcome limiting beliefs about aging and cognition',
          'Develop a growth mindset about your brain potential',
          'Learn practical strategies to combat age-related anxiety'
        ],
        resources: [
          {
            id: 'fogo-assessment',
            title: 'FOGO Self-Assessment',
            type: 'worksheet',
            url: '/resources/fogo-assessment.pdf'
          }
        ]
      },
      {
        id: 'epigenetics-brain',
        title: 'Epigenetics & Your Brain',
        description: 'How lifestyle choices reprogram your brain through genetic switches',
        duration: '5 minutes',
        learningNotes: [
          'Learn how environmental factors influence brain gene expression',
          'Understand the difference between genetic destiny and genetic potential',
          'Discover which lifestyle factors most impact brain epigenetics',
          'Learn about neurogenesis and how to stimulate new brain cell growth'
        ],
        keyTakeaways: [
          'Identify daily habits that optimise brain gene expression',
          'Create an environment that supports healthy brain aging',
          'Understand which supplements and foods support brain epigenetics'
        ],
        resources: [
          {
            id: 'epigenetics-guide',
            title: 'Brain Epigenetics Guide',
            type: 'pdf',
            url: '/resources/brain-epigenetics.pdf'
          }
        ]
      },
      {
        id: 'seven-networks',
        title: 'The 7 Brain Networks',
        description: 'Understanding Thinking, Doing, and Feeling Brain states and how to shift between them',
        duration: '7 minutes',
        learningNotes: [
          'Master the 7 distinct brain networks and their functions',
          'Learn to identify which network you\'re operating from',
          'Understand Thinking, Doing, and Feeling brain states',
          'Discover how to consciously shift between networks for optimal performance'
        ],
        keyTakeaways: [
          'Recognize when you\'re stuck in thinking brain mode',
          'Learn practical techniques to access your feeling brain',
          'Create daily practices that balance all 7 networks'
        ],
        resources: [
          {
            id: 'brain-networks-chart',
            title: '7 Brain Networks Reference Chart',
            type: 'pdf',
            url: '/resources/brain-networks.pdf'
          }
        ]
      },
      {
        id: 'sensory-reset',
        title: 'Sensory Reset Technique',
        description: 'The fastest way to shift from thinking brain to feeling brain in 2 minutes',
        duration: '5 minutes',
        learningNotes: [
          'Master the 2-minute sensory reset technique step-by-step',
          'Learn when and why to use sensory reset for brain state shifting',
          'Understand the science behind sensory-based brain regulation',
          'Practice multiple variations for different situations'
        ],
        keyTakeaways: [
          'Implement quick stress relief in any environment',
          'Shift from overwhelm to calm in under 2 minutes',
          'Build your toolkit of instant brain state changers'
        ],
        resources: [
          {
            id: 'sensory-reset-card',
            title: 'Sensory Reset Quick Reference Card',
            type: 'pdf',
            url: '/resources/sensory-reset.pdf'
          }
        ]
      },
      {
        id: 'brain-fuel',
        title: 'Brain Fuel & Hydration',
        description: 'Optimal nutrition for your 60% fat, 75% water brain',
        duration: '5 minutes',
        learningNotes: [
          'Understand your brain\'s unique nutritional needs as a 60% fat, 75% water organ',
          'Learn which fats and oils optimise cognitive function',
          'Discover the brain-hydration connection most people miss',
          'Master nutrient timing for peak mental performance'
        ],
        keyTakeaways: [
          'Create a brain-optimised shopping list',
          'Implement proper hydration strategies for mental clarity',
          'Choose brain-healthy fats and avoid brain-damaging ones'
        ],
        resources: [
          {
            id: 'brain-fuel-guide',
            title: 'Brain Fuel Shopping List',
            type: 'pdf',
            url: '/resources/brain-fuel-shopping.pdf'
          }
        ]
      },
      {
        id: 'recovery-neuroplasticity',
        title: 'Recovery & Neuroplasticity',
        description: 'How rest and recovery actually rewire your brain for better performance',
        duration: '5 minutes',
        learningNotes: [
          'Discover how sleep literally rewires your brain for better performance',
          'Learn about glymphatic system - your brain\'s night-time cleaning crew',
          'Understand neuroplasticity and how to enhance it through recovery',
          'Master recovery techniques that accelerate brain adaptation'
        ],
        keyTakeaways: [
          'Optimize sleep for maximum brain plasticity',
          'Create recovery routines that enhance learning and memory',
          'Use rest strategically to consolidate new neural pathways'
        ],
        resources: [
          {
            id: 'brain-bedtime-tracker',
            title: 'Brain Bedtime Challenge Tracker',
            type: 'worksheet',
            url: '/resources/brain-bedtime-tracker.pdf'
          }
        ]
      },
      {
        id: 'nootropics-hacks',
        title: 'Nootropics & Next Level Hacks',
        description: 'Natural brain boosters and advanced optimisation techniques',
        duration: '2 minutes',
        learningNotes: [
          'Learn about natural nootropics and their cognitive benefits',
          'Understand safe vs risky brain enhancement supplements',
          'Discover advanced biohacking techniques for cognitive performance',
          'Master personalised approaches to brain optimisation'
        ],
        keyTakeaways: [
          'Choose safe, effective nootropics for your goals',
          'Implement advanced brain hacks safely and effectively',
          'Create a personalised cognitive enhancement protocol'
        ],
        resources: [
          {
            id: 'nootropics-guide',
            title: 'Safe Nootropics Guide',
            type: 'pdf',
            url: '/resources/nootropics-guide.pdf'
          }
        ]
      },
      {
        id: 'future-brain',
        title: 'Your Future Brain + Call to Action',
        description: 'Commit to your brain health journey and next steps',
        duration: '2 minutes',
        learningNotes: [
          'Visualize your optimal brain health future state',
          'Learn how to maintain momentum after the masterclass',
          'Understand the compound effect of consistent brain training',
          'Get strategies for tracking cognitive improvements over time'
        ],
        keyTakeaways: [
          'Commit to one brain-optimizing habit for 30 days',
          'Create accountability systems for brain health goals',
          'Plan your ongoing brain optimisation journey'
        ],
        resources: [
          {
            id: 'brain-commitment-card',
            title: '30-Day Brain Challenge Commitment',
            type: 'worksheet',
            url: '/resources/brain-commitment.pdf'
          }
        ]
      }
    ]
  },
  // Coming Soon Masterclasses
  {
    id: 'biohack-sleep',
    title: 'Biohack Your Sleep Masterclass',
    subtitle: 'Advanced Sleep Optimization Strategies',
    description: 'Deep dive into sleep science, circadian rhythm optimisation, and advanced techniques for perfect sleep.',
    duration: '30 minutes',
    level: 'Intermediate',
    price: 97,
    currency: 'AUD',
    status: 'coming-soon',
    thumbnail: '/images/masterclass-sleep.webp',
    category: 'Sleep',
    instructor: {
      name: 'Camilla Thompson',
      bio: 'Leading Biohacking Expert, Nutritionist & Wellbeing Coach',
      credentials: [
        'Certified Sleep Specialist',
        'Circadian Rhythm Expert'
      ]
    },
    outcomes: [
      'Master advanced sleep tracking',
      'Optimize circadian rhythms',
      'Improve sleep quality by 90%',
      'Reduce sleep onset time'
    ],
    modules: []
  },
  {
    id: 'biohack-environment',
    title: 'Biohack Your Environment Masterclass',
    subtitle: 'Optimize Your Physical & Digital Spaces',
    description: 'Create environments that automatically enhance your health, productivity, and wellbeing.',
    duration: '30 minutes',
    level: 'Beginner',
    price: 97,
    currency: 'AUD',
    status: 'coming-soon',
    thumbnail: '/images/masterclass-environment.webp',
    category: 'Environment',
    instructor: {
      name: 'Camilla Thompson',
      bio: 'Leading Biohacking Expert, Nutritionist & Wellbeing Coach',
      credentials: [
        'Environmental Health Specialist',
        'Biophilic Design Expert'
      ]
    },
    outcomes: [
      'Optimize lighting for circadian health',
      'Reduce environmental toxins',
      'Create productive workspaces',
      'Improve air and water quality'
    ],
    modules: []
  },
  {
    id: 'biohack-relationships',
    title: 'Biohack Your Relationships Masterclass',
    subtitle: 'Social Optimization for Health & Happiness',
    description: 'Leverage social connections for improved health, longevity, and life satisfaction.',
    duration: '30 minutes',
    level: 'Intermediate',
    price: 97,
    currency: 'AUD',
    status: 'coming-soon',
    thumbnail: '/images/masterclass-relationships.webp',
    category: 'Relationships',
    instructor: {
      name: 'Camilla Thompson',
      bio: 'Leading Biohacking Expert, Nutritionist & Wellbeing Coach',
      credentials: [
        'Relationship Coach',
        'Social Health Expert'
      ]
    },
    outcomes: [
      'Build deeper connections',
      'Improve communication skills',
      'Create supportive communities',
      'Enhance emotional intelligence'
    ],
    modules: []
  },
  {
    id: 'biohack-body',
    title: 'Biohack Your Body Masterclass',
    subtitle: 'Physical Optimization & Performance',
    description: 'Advanced strategies for body composition, strength, flexibility, and physical performance.',
    duration: '30 minutes',
    level: 'Intermediate',
    price: 97,
    currency: 'AUD',
    status: 'coming-soon',
    thumbnail: '/images/masterclass-body.webp',
    category: 'Body',
    instructor: {
      name: 'Camilla Thompson',
      bio: 'Leading Biohacking Expert, Nutritionist & Wellbeing Coach',
      credentials: [
        'Movement Specialist',
        'Body Optimization Expert'
      ]
    },
    outcomes: [
      'Optimize body composition',
      'Improve strength and flexibility',
      'Enhance recovery protocols',
      'Master nutrition timing'
    ],
    modules: []
  },
  {
    id: 'biohack-health',
    title: 'Biohack Your Health Masterclass',
    subtitle: 'Biomarker Optimization & Longevity',
    description: 'Advanced health monitoring, biomarker optimisation, and longevity protocols.',
    duration: '30 minutes',
    level: 'Advanced',
    price: 97,
    currency: 'AUD',
    status: 'coming-soon',
    thumbnail: '/images/masterclass-health.webp',
    category: 'Health',
    instructor: {
      name: 'Camilla Thompson',
      bio: 'Leading Biohacking Expert, Nutritionist & Wellbeing Coach',
      credentials: [
        'Functional Medicine Practitioner',
        'Longevity Specialist'
      ]
    },
    outcomes: [
      'Optimize key biomarkers',
      'Develop longevity protocols',
      'Master health tracking',
      'Prevent chronic disease'
    ],
    modules: []
  },
  {
    id: 'biohack-energy',
    title: 'Biohack Your Energy Masterclass',
    subtitle: 'Mitochondrial Optimization & Vitality',
    description: 'Advanced energy management strategies for sustained vitality and performance.',
    duration: '30 minutes',
    level: 'Intermediate',
    price: 97,
    currency: 'AUD',
    status: 'coming-soon',
    thumbnail: '/images/masterclass-energy.webp',
    category: 'Energy',
    instructor: {
      name: 'Camilla Thompson',
      bio: 'Leading Biohacking Expert, Nutritionist & Wellbeing Coach',
      credentials: [
        'Mitochondrial Health Expert',
        'Energy Optimization Specialist'
      ]
    },
    outcomes: [
      'Optimize mitochondrial function',
      'Eliminate energy crashes',
      'Improve cellular energy production',
      'Master energy management'
    ],
    modules: []
  },
  {
    id: 'biohack-mood',
    title: 'Biohack Your Mood Masterclass',
    subtitle: 'Emotional Regulation & Mental Wellness',
    description: 'Science-based strategies for mood optimisation, stress management, and emotional resilience.',
    duration: '30 minutes',
    level: 'Beginner',
    price: 97,
    currency: 'AUD',
    status: 'coming-soon',
    thumbnail: '/images/masterclass-mood.webp',
    category: 'Mood',
    instructor: {
      name: 'Camilla Thompson',
      bio: 'Leading Biohacking Expert, Nutritionist & Wellbeing Coach',
      credentials: [
        'Mood Optimization Specialist',
        'Stress Management Expert'
      ]
    },
    outcomes: [
      'Master emotional regulation',
      'Reduce stress and anxiety',
      'Improve mental resilience',
      'Optimize neurotransmitters'
    ],
    modules: []
  },
  {
    id: 'biohack-behaviour-change',
    title: 'Biohack Your Behaviour Change Masterclass',
    subtitle: 'Master the Science of Lasting Transformation',
    description: 'Unlock the psychology behind sustainable behaviour change. Learn evidence-based strategies to build lasting habits, break limiting patterns, and transform your life one behaviour at a time.',
    duration: '30 minutes',
    level: 'Intermediate',
    price: 97,
    currency: 'AUD',
    status: 'coming-soon',
    thumbnail: '/images/masterclass-behaviour-change.webp',
    category: 'Behaviour',
    instructor: {
      name: 'Camilla Thompson',
      bio: 'Leading Biohacking Expert, Nutritionist & Wellbeing Coach',
      credentials: [
        'Certified Behaviour Change Specialist',
        'Psychology-Based Coaching Expert',
        'Habit Formation Specialist'
      ]
    },
    outcomes: [
      'Master the science of behaviour change psychology',
      'Break limiting beliefs and patterns that hold you back',
      'Design personalised habit stacks that stick naturally',
      'Overcome procrastination and self-sabotage',
      'Build intrinsic motivation for lasting transformation',
      'Create accountability systems that actually work'
    ],
    modules: []
  }
]

export default masterclasses