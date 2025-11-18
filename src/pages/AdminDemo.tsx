import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Users, Mail, Phone, Calendar, Settings, Search, BarChart3, Target, Clock, FileText } from 'lucide-react'

interface Client {
  id: string
  name: string
  email: string
  phone?: string
  age?: string
  status: 'active' | 'inactive' | 'prospect'
  program: string
  joinDate: string
  lastContact: string
  notes: string
  sessions?: number
  healthGoals?: string[]
  challenges?: string[]
  healthConcerns?: string[]
  occupation?: string
  relationshipStatus?: string
  location?: string
  nextSession?: string
  goals?: ClientGoal[]
  actionPoints?: ActionPoint[]
  progressNotes?: ProgressNote[]
  overallProgressScore?: number
  coachingHours?: CoachingHours
  sessionHistory?: SessionRecord[]
}

interface CoachingHours {
  totalHoursPurchased: number
  totalHoursUsed: number
  hourlyRate: number
  packageDetails?: {
    packageName: string
    hoursIncluded: number
    purchaseDate: string
    expiryDate?: string
  }[]
  sessionsLog: CoachingSession[]
}

interface CoachingSession {
  id: string
  date: string
  startTime: string
  endTime: string
  duration: number // in hours (e.g., 1.5 for 1 hour 30 minutes)
  sessionType: 'initial-consultation' | 'follow-up' | 'package-session' | 'ad-hoc'
  notes: string
  status: 'completed' | 'scheduled' | 'cancelled' | 'no-show'
  rateCharged?: number
  linkedGoals?: string[] // IDs of goals this session addresses
  actionPoints?: ActionPoint[]
  progressNotes?: ProgressNote[]
}

interface SessionRecord {
  id: string
  date: string
  time: string
  duration: string
  notes: string
  type: 'consultation' | 'follow-up' | 'assessment'
  status: 'completed' | 'scheduled' | 'cancelled'
}

interface ClientGoal {
  id: string
  title: string
  description: string
  category: 'nutrition' | 'fitness' | 'sleep' | 'stress' | 'energy' | 'weight' | 'brain' | 'other'
  priority: 'high' | 'medium' | 'low'
  targetDate?: string
  status: 'not-started' | 'in-progress' | 'achieved' | 'paused' | 'discontinued'
  progressPercentage: number
  createdDate: string
  achievedDate?: string
  milestones?: Milestone[]
  relatedSessions?: string[]
}

interface Milestone {
  id: string
  title: string
  description?: string
  targetDate?: string
  achievedDate?: string
  status: 'pending' | 'achieved' | 'overdue'
  notes?: string
}

interface ActionPoint {
  id: string
  description: string
  assignedDate: string
  dueDate?: string
  completedDate?: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'high' | 'medium' | 'low'
  linkedGoalId?: string
  notes?: string
}

interface ProgressNote {
  id: string
  date: string
  content: string
  type: 'observation' | 'improvement' | 'challenge' | 'achievement' | 'feedback'
  linkedGoalId?: string
  attachments?: string[]
}

const mockClients: Client[] = [
  {
    id: 'diana-taylor',
    name: 'Diana Taylor',
    email: 'diana.taylor@gmail.com',
    phone: '+61 400 123 456',
    age: '42',
    status: 'active',
    program: 'Optimise Your Life Coaching Program',
    joinDate: '2024-01-15',
    lastContact: '2024-02-10',
    notes: 'CEO seeking optimization for high-performance executive lifestyle. Focus on metabolic health and cognitive performance.',
    sessions: 8,
    occupation: 'CEO - Tech Startup',
    relationshipStatus: 'Married',
    location: 'Sydney, NSW',
    nextSession: '2024-02-18',
    healthGoals: ['Metabolic optimization', 'Cognitive enhancement', 'Stress management'],
    challenges: ['High-stress environment', 'Irregular schedule', 'Travel demands'],
    healthConcerns: ['Insulin sensitivity', 'Sleep quality', 'Decision fatigue'],
    overallProgressScore: 75,
    goals: [
      {
        id: 'diana-goal-1',
        title: 'Optimize Metabolic Health',
        description: 'Improve insulin sensitivity and metabolic markers through targeted nutrition and lifestyle interventions',
        category: 'nutrition',
        priority: 'high',
        targetDate: '2024-05-15',
        status: 'in-progress',
        progressPercentage: 65,
        createdDate: '2024-01-15',
        milestones: [
          {
            id: 'diana-milestone-1',
            title: 'Complete comprehensive metabolic panel',
            status: 'achieved'
          },
          {
            id: 'diana-milestone-2',
            title: 'Implement time-restricted eating',
            status: 'achieved'
          }
        ],
        relatedSessions: []
      },
      {
        id: 'diana-goal-2',
        title: 'Executive Performance Enhancement',
        description: 'Optimize cognitive function and decision-making capacity for high-pressure leadership role',
        category: 'brain',
        priority: 'high',
        targetDate: '2024-04-15',
        status: 'in-progress',
        progressPercentage: 85,
        createdDate: '2024-01-15',
        milestones: [
          {
            id: 'diana-milestone-3',
            title: 'Establish morning cognitive routine',
            status: 'achieved'
          },
          {
            id: 'diana-milestone-4',
            title: 'Implement nootropic protocol',
            status: 'achieved'
          }
        ],
        relatedSessions: []
      }
    ],
    actionPoints: [
      {
        id: 'diana-action-1',
        description: 'Schedule quarterly executive health assessment',
        assignedDate: '2024-02-10',
        status: 'completed',
        priority: 'high',
        linkedGoalId: 'diana-goal-1',
        completedDate: '2024-02-12'
      },
      {
        id: 'diana-action-2',
        description: 'Optimize travel nutrition protocol',
        assignedDate: '2024-02-10',
        status: 'in-progress',
        priority: 'medium',
        linkedGoalId: 'diana-goal-1'
      }
    ],
    progressNotes: [
      {
        id: 'diana-note-1',
        date: '2024-02-10',
        content: 'Significant improvement in morning energy and decision clarity. Client reports 40% reduction in afternoon energy crashes.',
        type: 'improvement',
        linkedGoalId: 'diana-goal-2'
      }
    ],
    coachingHours: {
      totalHoursPurchased: 3,
      totalHoursUsed: 2.5,
      hourlyRate: 200,
      packageDetails: [
        {
          packageName: 'Optimise Your Life Coaching Program',
          hoursIncluded: 3,
          purchaseDate: '2024-01-15',
          expiryDate: '2024-07-15'
        }
      ],
      sessionsLog: [
        {
          id: 'diana-session-1',
          date: '2024-01-20',
          startTime: '09:00',
          endTime: '10:30',
          duration: 1.5,
          sessionType: 'initial-consultation',
          notes: 'Initial assessment completed. Established baseline metabolic markers and stress levels. Client highly motivated.',
          status: 'completed',
          rateCharged: 200,
          linkedGoals: ['diana-goal-1', 'diana-goal-2']
        },
        {
          id: 'diana-session-2',
          date: '2024-02-10',
          startTime: '09:00',
          endTime: '10:00',
          duration: 1,
          sessionType: 'follow-up',
          notes: 'Reviewed progress on morning routine and nutrition protocol. Significant energy improvements noted.',
          status: 'completed',
          rateCharged: 200,
          linkedGoals: ['diana-goal-2']
        },
        {
          id: 'diana-session-3',
          date: '2024-02-18',
          startTime: '09:00',
          endTime: '09:30',
          duration: 0.5,
          sessionType: 'follow-up',
          notes: 'Scheduled final session to optimize travel nutrition and review goal achievements.',
          status: 'scheduled',
          rateCharged: 200,
          linkedGoals: ['diana-goal-1']
        }
      ]
    }
  },
  {
    id: 'victoria-sloan',
    name: 'Victoria Sloan',
    email: 'victoria.sloan@gmail.com',
    phone: '+61 400 789 012',
    age: '35',
    status: 'active',
    program: 'Optimise Your Life Coaching Program',
    joinDate: '2024-02-01',
    lastContact: '2024-02-15',
    notes: 'Marketing executive focused on hormone balance and sleep optimization. Very engaged with the program.',
    sessions: 4,
    occupation: 'Marketing Director',
    relationshipStatus: 'Single',
    location: 'Melbourne, VIC',
    nextSession: '2024-02-22',
    healthGoals: ['Hormone balance', 'Sleep optimization', 'Energy stability'],
    challenges: ['Irregular sleep', 'High caffeine intake', 'Stress eating'],
    healthConcerns: ['PCOS symptoms', 'Fatigue', 'Weight management'],
    overallProgressScore: 58,
    goals: [
      {
        id: 'victoria-goal-1',
        title: 'Hormone Balance Protocol',
        description: 'Address PCOS symptoms and optimize hormonal health through targeted nutrition and lifestyle modifications',
        category: 'nutrition',
        priority: 'high',
        targetDate: '2024-06-01',
        status: 'in-progress',
        progressPercentage: 45,
        createdDate: '2024-02-01',
        milestones: [
          {
            id: 'victoria-milestone-1',
            title: 'Complete comprehensive hormone panel',
            status: 'achieved'
          },
          {
            id: 'victoria-milestone-2',
            title: 'Implement anti-inflammatory protocol',
            status: 'pending'
          }
        ],
        relatedSessions: []
      }
    ],
    actionPoints: [
      {
        id: 'victoria-action-1',
        description: 'Begin seed cycling protocol',
        assignedDate: '2024-02-15',
        status: 'pending',
        priority: 'medium',
        linkedGoalId: 'victoria-goal-1'
      }
    ],
    progressNotes: [],
    coachingHours: {
      totalHoursPurchased: 3,
      totalHoursUsed: 1.5,
      hourlyRate: 200,
      packageDetails: [
        {
          packageName: 'Optimise Your Life Coaching Program',
          hoursIncluded: 3,
          purchaseDate: '2024-02-01',
          expiryDate: '2024-08-01'
        }
      ],
      sessionsLog: [
        {
          id: 'victoria-session-1',
          date: '2024-02-05',
          startTime: '14:00',
          endTime: '15:30',
          duration: 1.5,
          sessionType: 'initial-consultation',
          notes: 'Comprehensive hormone assessment completed. Identified PCOS symptoms and sleep disruption patterns.',
          status: 'completed',
          rateCharged: 200,
          linkedGoals: ['victoria-goal-1']
        },
        {
          id: 'victoria-session-2',
          date: '2024-02-22',
          startTime: '14:00',
          endTime: '15:30',
          duration: 1.5,
          sessionType: 'follow-up',
          notes: 'Scheduled to review hormone panel results and implement anti-inflammatory protocol.',
          status: 'scheduled',
          rateCharged: 200,
          linkedGoals: ['victoria-goal-1']
        }
      ]
    }
  },
  {
    id: 'amanda-kerr',
    name: 'Amanda Kerr',
    email: 'amanda.kerr@gmail.com',
    phone: '+61 400 345 678',
    age: '45',
    status: 'active',
    program: 'Optimise Your Life Coaching Program',
    joinDate: '2024-01-20',
    lastContact: '2024-02-08',
    notes: 'Corporate executive focused on performance optimization and stress management. High achiever seeking sustainable practices.',
    sessions: 3,
    occupation: 'Senior Executive - Finance',
    relationshipStatus: 'Married',
    location: 'Brisbane, QLD',
    nextSession: '2024-02-20',
    healthGoals: ['Stress management', 'Performance optimization', 'Work-life balance'],
    challenges: ['High-pressure role', 'Long hours', 'Travel schedule'],
    healthConcerns: ['Chronic stress', 'Sleep disruption', 'Burnout risk'],
    overallProgressScore: 42,
    goals: [
      {
        id: 'amanda-goal-1',
        title: 'Stress Resilience Building',
        description: 'Develop sustainable stress management strategies for high-pressure executive environment',
        category: 'stress',
        priority: 'high',
        targetDate: '2024-05-01',
        status: 'in-progress',
        progressPercentage: 30,
        createdDate: '2024-01-20',
        milestones: [
          {
            id: 'amanda-milestone-1',
            title: 'Establish daily stress-reduction practice',
            status: 'pending'
          }
        ],
        relatedSessions: []
      }
    ],
    actionPoints: [
      {
        id: 'amanda-action-1',
        description: 'Implement 5-minute morning mindfulness routine',
        assignedDate: '2024-02-08',
        status: 'pending',
        priority: 'high',
        linkedGoalId: 'amanda-goal-1'
      }
    ],
    progressNotes: [],
    coachingHours: {
      totalHoursPurchased: 3,
      totalHoursUsed: 1.5,
      hourlyRate: 200,
      packageDetails: [
        {
          packageName: 'Optimise Your Life Coaching Program',
          hoursIncluded: 3,
          purchaseDate: '2024-01-20',
          expiryDate: '2024-07-20'
        }
      ],
      sessionsLog: [
        {
          id: 'amanda-session-1',
          date: '2024-01-25',
          startTime: '10:00',
          endTime: '11:30',
          duration: 1.5,
          sessionType: 'initial-consultation',
          notes: 'Initial stress assessment completed. Established baseline stress levels and executive challenges. Client seeking sustainable stress management strategies.',
          status: 'completed',
          rateCharged: 200,
          linkedGoals: ['amanda-goal-1']
        },
        {
          id: 'amanda-session-2',
          date: '2024-02-20',
          startTime: '10:00',
          endTime: '11:30',
          duration: 1.5,
          sessionType: 'follow-up',
          notes: 'Scheduled to review stress management progress and implement advanced resilience techniques.',
          status: 'scheduled',
          rateCharged: 200,
          linkedGoals: ['amanda-goal-1']
        }
      ]
    }
  },
  {
    id: 'adina-jacobs',
    name: 'Adina Jacobs',
    email: 'adinak@mac.com',
    phone: '0414305440',
    age: '51',
    status: 'active',
    program: 'Optimise Your Life Coaching Program',
    joinDate: '2025-09-12',
    lastContact: '2025-09-12',
    notes: 'Business owner (51, Sydney, married). Goals: Improved energy, focus and vitality. Key challenges: Sleep disruption (vivid dreams, waking at night), low energy, over-extended lifestyle. Health background: On Lexapro 10mg, using Ozempic since Dec 23, has Mirena IUD for 17 years. Exercise: Pilates/weights/cardio 2x/week + weekly walks. Family history: Father died at 61 from heart attack (same as grandfather). Mother has bipolar disorder with periods of depression. Current focus: Better sleep quality, sustainable energy improvements, manageable wellness routine that fits busy travel schedule with 2 businesses.',
    sessions: 1,
    occupation: 'Business Owner (2 businesses)',
    relationshipStatus: 'Married',
    location: 'Sydney, NSW',
    nextSession: '2025-09-19',
    healthGoals: ['Sleep quality improvement', 'Energy optimization', 'Sustainable wellness routine'],
    challenges: ['Sleep disruption', 'Low energy', 'Over-extended lifestyle', 'Travel schedule'],
    healthConcerns: ['Sleep disorders', 'Medication interactions', 'Family cardiac history', 'Mental health'],
    overallProgressScore: 15,
    goals: [
      {
        id: 'adina-goal-1',
        title: 'Sleep Quality Optimization',
        description: 'Address sleep disruption patterns and improve sleep quality for better energy and recovery',
        category: 'sleep',
        priority: 'high',
        targetDate: '2025-12-12',
        status: 'not-started',
        progressPercentage: 0,
        createdDate: '2025-09-12',
        milestones: [
          {
            id: 'adina-milestone-1',
            title: 'Complete sleep study assessment',
            status: 'pending'
          },
          {
            id: 'adina-milestone-2',
            title: 'Establish consistent sleep routine',
            status: 'pending'
          }
        ],
        relatedSessions: []
      },
      {
        id: 'adina-goal-2',
        title: 'Energy & Vitality Enhancement',
        description: 'Sustainable energy improvements that work with busy travel schedule and dual business demands',
        category: 'energy',
        priority: 'high',
        targetDate: '2025-12-12',
        status: 'not-started',
        progressPercentage: 0,
        createdDate: '2025-09-12',
        milestones: [
          {
            id: 'adina-milestone-3',
            title: 'Optimize nutrition for travel',
            status: 'pending'
          },
          {
            id: 'adina-milestone-4',
            title: 'Create portable wellness routine',
            status: 'pending'
          }
        ],
        relatedSessions: []
      }
    ],
    actionPoints: [
      {
        id: 'adina-action-1',
        description: 'Begin sleep diary tracking for 2 weeks',
        assignedDate: '2025-09-12',
        status: 'pending',
        priority: 'high',
        linkedGoalId: 'adina-goal-1'
      },
      {
        id: 'adina-action-2',
        description: 'Review medication timing with GP regarding sleep impact',
        assignedDate: '2025-09-12',
        status: 'pending',
        priority: 'medium',
        linkedGoalId: 'adina-goal-1'
      }
    ],
    progressNotes: [],
    coachingHours: {
      totalHoursPurchased: 3,
      totalHoursUsed: 1,
      hourlyRate: 200,
      packageDetails: [
        {
          packageName: 'Optimise Your Life Coaching Program',
          hoursIncluded: 3,
          purchaseDate: '2025-09-12',
          expiryDate: '2026-06-12'
        }
      ],
      sessionsLog: [
        {
          id: 'adina-session-1',
          date: '2025-09-12',
          startTime: '14:00',
          endTime: '15:00',
          duration: 1,
          sessionType: 'initial-consultation',
          notes: 'Initial consultation covering sleep disruption patterns, energy optimization goals, and travel wellness routine planning. Discussed medication interactions and family health history.',
          status: 'completed',
          rateCharged: 200,
          linkedGoals: ['adina-goal-1', 'adina-goal-2']
        }
      ]
    }
  },
  {
    id: 'chae-parker',
    name: 'Chae Parker',
    email: 'chae_parker@hotmail.com',
    phone: '0408300187',
    age: '57',
    status: 'active',
    program: 'Optimise Your Life Coaching Program',
    joinDate: '2025-09-19',
    lastContact: '2025-09-19',
    notes: 'Virtual Personal Assistant from Brisbane. Has gut issues when eating poorly, lacks willpower with food (especially sugar). Wants to lose cellulite, gain energy, and feel strong. Exercises regularly (outrigger canoe 3x/week, dog walks, gym). Early menopause at 41. Family history of thyroid and heart issues.',
    sessions: 0,
    occupation: 'Virtual Personal Assistant',
    relationshipStatus: 'Single',
    location: 'Brisbane, QLD',
    nextSession: '2025-09-25',
    healthGoals: [
      'Lose cellulite and reach 63kg',
      'Increase energy levels',
      'Build self-discipline with food',
      'Feel strong and happy',
      'Improve gut health'
    ],
    challenges: [
      'No willpower with food (especially sugar)',
      'Gut issues and bloating when eating poorly',
      'Sugar cravings and addiction',
      'Inconsistent eating habits',
      'Early menopause effects'
    ],
    healthConcerns: [
      'Sometimes gut issues - bloating when not eating well',
      'Underactive thyroid (family history)',
      'Family history of heart and bowel issues',
      'Poor family health history overall',
      'Early menopause at 41'
    ],
    overallProgressScore: 25,
    goals: [
      {
        id: 'chae-goal-1',
        title: 'Weight Loss & Body Composition',
        description: 'Lose cellulite, reach target weight of 63kg (currently 64kg), and build lean muscle strength',
        category: 'fitness',
        priority: 'high',
        targetDate: '2026-03-19',
        status: 'not-started',
        progressPercentage: 0,
        createdDate: '2025-09-19',
        milestones: [
          {
            id: 'chae-milestone-1',
            title: 'Establish consistent meal planning routine',
            status: 'pending'
          },
          {
            id: 'chae-milestone-2',
            title: 'Reduce sugar intake by 50%',
            status: 'pending'
          },
          {
            id: 'chae-milestone-3',
            title: 'Lose 1kg and reduce cellulite visibility',
            status: 'pending'
          }
        ],
        relatedSessions: []
      },
      {
        id: 'chae-goal-2',
        title: 'Gut Health Optimization',
        description: 'Address bloating and digestive issues through better food choices and eating habits',
        category: 'nutrition',
        priority: 'high',
        targetDate: '2025-12-19',
        status: 'not-started',
        progressPercentage: 0,
        createdDate: '2025-09-19',
        milestones: [
          {
            id: 'chae-milestone-4',
            title: 'Identify trigger foods causing bloating',
            status: 'pending'
          },
          {
            id: 'chae-milestone-5',
            title: 'Implement anti-inflammatory meal plan',
            status: 'pending'
          }
        ],
        relatedSessions: []
      },
      {
        id: 'chae-goal-3',
        title: 'Food Willpower & Self-Discipline',
        description: 'Develop strategies to overcome sugar addiction and build sustainable eating habits',
        category: 'mindset',
        priority: 'high',
        targetDate: '2026-01-19',
        status: 'not-started',
        progressPercentage: 0,
        createdDate: '2025-09-19',
        milestones: [
          {
            id: 'chae-milestone-6',
            title: 'Implement sugar reduction strategies',
            status: 'pending'
          },
          {
            id: 'chae-milestone-7',
            title: 'Create healthy food prep routine',
            status: 'pending'
          }
        ],
        relatedSessions: []
      }
    ],
    actionPoints: [
      {
        id: 'chae-action-1',
        description: 'Start food diary to track triggers for gut issues and sugar cravings',
        assignedDate: '2025-09-19',
        dueDate: '2025-09-26',
        status: 'pending',
        priority: 'high',
        linkedGoalId: 'chae-goal-2'
      },
      {
        id: 'chae-action-2',
        description: 'Research anti-inflammatory foods and create shopping list',
        assignedDate: '2025-09-19',
        dueDate: '2025-09-24',
        status: 'pending',
        priority: 'medium',
        linkedGoalId: 'chae-goal-2'
      },
      {
        id: 'chae-action-3',
        description: 'Try NMN supplement for 1 month (powder or tablet in AM) - Links: https://geneticlabsaustralia.com/collections/nmn (CAMILLA20) or https://mybrainco.com/products/nmn?sca_ref=6896123.x9V6MRSWEs (CAMILLA-AF)',
        assignedDate: '2025-09-23',
        dueDate: '2025-10-23',
        status: 'pending',
        priority: 'high',
        linkedGoalId: 'chae-goal-1'
      },
      {
        id: 'chae-action-4',
        description: 'Start food diary in phone - track bloating triggers specifically',
        assignedDate: '2025-09-23',
        dueDate: '2025-09-30',
        status: 'pending',
        priority: 'high',
        linkedGoalId: 'chae-goal-2'
      },
      {
        id: 'chae-action-5',
        description: 'Book telehealth appointment for hormonal blood work',
        assignedDate: '2025-09-23',
        dueDate: '2025-10-07',
        status: 'pending',
        priority: 'high',
        linkedGoalId: 'chae-goal-2'
      },
      {
        id: 'chae-action-6',
        description: 'Reduce sugar intake: swap Darrell Lea for dark chocolate in week, try fruit smoothies or protein/dips to curb sweet cravings',
        assignedDate: '2025-09-23',
        dueDate: '2025-10-07',
        status: 'pending',
        priority: 'high',
        linkedGoalId: 'chae-goal-3'
      },
      {
        id: 'chae-action-7',
        description: 'Dry brushing for cellulite and try rebounding on mini trampoline',
        assignedDate: '2025-09-23',
        dueDate: '2025-10-07',
        status: 'pending',
        priority: 'medium',
        linkedGoalId: 'chae-goal-1'
      },
      {
        id: 'chae-action-8',
        description: 'Boost protein at breakfast for sustained energy',
        assignedDate: '2025-09-23',
        dueDate: '2025-09-30',
        status: 'pending',
        priority: 'medium',
        linkedGoalId: 'chae-goal-1'
      }
    ],
    progressNotes: [],
    coachingHours: {
      totalHoursPurchased: 3,
      totalHoursUsed: 0,
      hourlyRate: 200,
      packageDetails: [
        {
          packageName: 'Optimise Your Life - 3 Hour Package',
          hoursIncluded: 3,
          purchaseDate: '2025-09-19',
          expiryDate: '2026-03-19'
        }
      ],
      sessionsLog: []
    }
  }
]

export default function AdminDemo() {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [selectedClient, setSelectedClient] = useState<Client | null>(mockClients[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [showSessionForm, setShowSessionForm] = useState(false)
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'Optimise Your Life Coaching Program',
    notes: ''
  })
  const [newSession, setNewSession] = useState({
    date: '',
    startTime: '',
    endTime: '',
    duration: 1,
    sessionType: 'package-session',
    notes: '',
    status: 'completed'
  })
  const [uploadedFiles, setUploadedFiles] = useState<{[clientId: string]: {[category: string]: File[]}}>({})
  const [uploadStatus, setUploadStatus] = useState('')
  const [testsOrdered, setTestsOrdered] = useState<{[clientId: string]: {dnaTest: boolean, microbiomeTest: boolean, dutchTest: boolean, toniReferral: boolean}}>({})
  const [saveStatus, setSaveStatus] = useState('')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    if (!selectedClient) return

    const files = Array.from(event.target.files || [])
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setUploadStatus(`File ${file.name} is too large. Maximum size is 10MB.`)
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      setUploadedFiles(prev => ({
        ...prev,
        [selectedClient.id]: {
          ...prev[selectedClient.id],
          [category]: [...(prev[selectedClient.id]?.[category] || []), ...validFiles]
        }
      }))
      setUploadStatus(`Successfully uploaded ${validFiles.length} file(s) to ${category.replace('-', ' ')} for ${selectedClient.name}`)
    }
  }

  const saveFiles = () => {
    if (!selectedClient) return

    // In a real app, this would upload to a server
    console.log('Saving uploaded files for', selectedClient.name, ':', uploadedFiles[selectedClient.id])
    setUploadStatus(`Files saved successfully for ${selectedClient.name}!`)
    setTimeout(() => setUploadStatus(''), 3000)
  }

  const handleTestCheckboxChange = (testType: 'dnaTest' | 'microbiomeTest' | 'dutchTest' | 'toniReferral', checked: boolean) => {
    if (!selectedClient) return

    setTestsOrdered(prev => ({
      ...prev,
      [selectedClient.id]: {
        ...prev[selectedClient.id],
        [testType]: checked
      }
    }))
  }

  const saveTestsOrdered = () => {
    if (!selectedClient) return

    setSaveStatus('Saving...')

    // Simulate save operation
    setTimeout(() => {
      setSaveStatus('Tests saved successfully!')
      setTimeout(() => setSaveStatus(''), 3000)
    }, 500)
  }

  const addNewClient = () => {
    if (newClient.name && newClient.email) {
      const client: Client = {
        id: newClient.name.toLowerCase().replace(/\s+/g, '-'),
        name: newClient.name,
        email: newClient.email,
        phone: newClient.phone,
        status: 'active',
        program: newClient.program,
        joinDate: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0],
        notes: newClient.notes
      }

      setClients([...clients, client])
      setNewClient({ name: '', email: '', phone: '', program: 'Optimise Your Life Coaching Program', notes: '' })
      setShowAddForm(false)
      setSelectedClient(client)
    }
  }

  const addNewSession = () => {
    if (!selectedClient || !newSession.date || !newSession.startTime || !newSession.endTime) {
      return
    }

    const sessionId = `session-${Date.now()}`
    const session: CoachingSession = {
      id: sessionId,
      date: newSession.date,
      startTime: newSession.startTime,
      endTime: newSession.endTime,
      duration: newSession.duration,
      sessionType: newSession.sessionType as any,
      notes: newSession.notes,
      status: newSession.status as any,
      rateCharged: selectedClient.coachingHours?.hourlyRate || 200
    }

    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        const updatedCoachingHours = {
          ...client.coachingHours!,
          totalHoursUsed: client.coachingHours!.totalHoursUsed + newSession.duration,
          sessionsLog: [...client.coachingHours!.sessionsLog, session]
        }
        return {
          ...client,
          coachingHours: updatedCoachingHours,
          lastContact: newSession.date
        }
      }
      return client
    })

    setClients(updatedClients)
    setSelectedClient(updatedClients.find(c => c.id === selectedClient.id)!)
    setNewSession({
      date: '',
      startTime: '',
      endTime: '',
      duration: 1,
      sessionType: 'package-session',
      notes: '',
      status: 'completed'
    })
    setShowSessionForm(false)
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Admin CRM - BiohackMe</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row h-screen">
        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-white shadow-lg border-r border-gray-200 lg:h-screen overflow-y-auto">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">BiohackMe CRM</h1>
            <p className="text-sm lg:text-base text-gray-600">Client Management</p>
          </div>

          {/* Search & Add Client */}
          <div className="p-3 lg:p-4 border-b border-gray-200">
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm lg:text-base"
            >
              <span className="mr-2">+</span> Add New Client
            </button>
          </div>

          {/* Client List */}
          <div className="max-h-96 lg:max-h-none overflow-y-auto">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className={`p-3 lg:p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedClient?.id === client.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm lg:text-base">{client.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    client.status === 'active' ? 'bg-green-100 text-green-800' :
                    client.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {client.status}
                  </span>
                </div>
                <p className="text-xs lg:text-sm text-gray-600 mb-1 truncate">{client.program}</p>
                <p className="text-xs text-gray-500">Last contact: {client.lastContact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedClient ? (
            <div className="p-4 lg:p-8">
              <div className="mb-6 lg:mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{selectedClient.name}</h1>
                <p className="text-sm lg:text-base text-gray-600">{selectedClient.program}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                {/* Contact Information */}
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                    Contact Information
                  </h2>

                  <div className="space-y-3 lg:space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-sm lg:text-base text-gray-900 break-all">{selectedClient.email}</span>
                    </div>

                    {selectedClient.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                        <span className="text-sm lg:text-base text-gray-900">{selectedClient.phone}</span>
                      </div>
                    )}

                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-sm lg:text-base text-gray-900">Joined: {selectedClient.joinDate}</span>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-sm lg:text-base text-gray-900">Last Contact: {selectedClient.lastContact}</span>
                    </div>
                  </div>
                </div>

                {/* Program Status */}
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Settings className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                    Program Status
                  </h2>

                  <div className="space-y-3 lg:space-y-4">
                    <div>
                      <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Program</label>
                      <p className="text-sm lg:text-base text-gray-900">{selectedClient.program}</p>
                    </div>

                    <div>
                      <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Status</label>
                      <span className={`inline-flex px-2 lg:px-3 py-1 text-xs lg:text-sm rounded-full ${
                        selectedClient.status === 'active' ? 'bg-green-100 text-green-800' :
                        selectedClient.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedClient.status}
                      </span>
                    </div>

                    {selectedClient.sessions && (
                      <div>
                        <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Sessions Completed</label>
                        <p className="text-sm lg:text-base text-gray-900">{selectedClient.sessions}</p>
                      </div>
                    )}

                    {selectedClient.nextSession && (
                      <div>
                        <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Next Session</label>
                        <p className="text-sm lg:text-base text-gray-900">{selectedClient.nextSession}</p>
                      </div>
                    )}

                    {selectedClient.overallProgressScore !== undefined && (
                      <div>
                        <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Overall Progress</label>
                        <div className="flex items-center space-x-2 lg:space-x-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${selectedClient.overallProgressScore}%` }}
                            ></div>
                          </div>
                          <span className="text-xs lg:text-sm font-medium text-gray-900">{selectedClient.overallProgressScore}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Client Demographics */}
                {(selectedClient.age || selectedClient.occupation || selectedClient.location) && (
                  <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                      Demographics
                    </h2>

                    <div className="space-y-3">
                      {selectedClient.age && (
                        <div>
                          <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Age</label>
                          <p className="text-sm lg:text-base text-gray-900">{selectedClient.age}</p>
                        </div>
                      )}
                      {selectedClient.occupation && (
                        <div>
                          <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Occupation</label>
                          <p className="text-sm lg:text-base text-gray-900">{selectedClient.occupation}</p>
                        </div>
                      )}
                      {selectedClient.relationshipStatus && (
                        <div>
                          <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Relationship Status</label>
                          <p className="text-sm lg:text-base text-gray-900">{selectedClient.relationshipStatus}</p>
                        </div>
                      )}
                      {selectedClient.location && (
                        <div>
                          <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Location</label>
                          <p className="text-sm lg:text-base text-gray-900">{selectedClient.location}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Health Overview */}
              {(selectedClient.healthGoals || selectedClient.challenges || selectedClient.healthConcerns) && (
                <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  {selectedClient.healthGoals && selectedClient.healthGoals.length > 0 && (
                    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2 text-green-600" />
                        Health Goals
                      </h3>
                      <ul className="space-y-2">
                        {selectedClient.healthGoals.map((goal, index) => (
                          <li key={index} className="text-xs lg:text-sm text-gray-700 flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 lg:mt-2 mr-3 flex-shrink-0"></span>
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedClient.challenges && selectedClient.challenges.length > 0 && (
                    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2 text-yellow-600" />
                        Challenges
                      </h3>
                      <ul className="space-y-2">
                        {selectedClient.challenges.map((challenge, index) => (
                          <li key={index} className="text-xs lg:text-sm text-gray-700 flex items-start">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 lg:mt-2 mr-3 flex-shrink-0"></span>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedClient.healthConcerns && selectedClient.healthConcerns.length > 0 && (
                    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-red-600" />
                        Health Concerns
                      </h3>
                      <ul className="space-y-2">
                        {selectedClient.healthConcerns.map((concern, index) => (
                          <li key={index} className="text-xs lg:text-sm text-gray-700 flex items-start">
                            <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 lg:mt-2 mr-3 flex-shrink-0"></span>
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Goals & Progress */}
              {selectedClient.goals && selectedClient.goals.length > 0 && (
                <div className="mt-6 lg:mt-8 bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6 flex items-center">
                    <Target className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                    Active Goals
                  </h2>

                  <div className="space-y-4 lg:space-y-6">
                    {selectedClient.goals.map((goal) => (
                      <div key={goal.id} className="border border-gray-200 rounded-lg p-3 lg:p-4">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3 gap-2">
                          <div className="flex-1">
                            <h3 className="text-sm lg:text-base font-semibold text-gray-900">{goal.title}</h3>
                            <p className="text-xs lg:text-sm text-gray-600 mt-1">{goal.description}</p>
                          </div>
                          <div className="flex gap-2 lg:ml-4 lg:text-right lg:flex-col">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              goal.priority === 'high' ? 'bg-red-100 text-red-800' :
                              goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {goal.priority} priority
                            </span>
                            <div className="mt-2">
                              <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                goal.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                goal.status === 'achieved' ? 'bg-green-100 text-green-800' :
                                goal.status === 'not-started' ? 'bg-gray-100 text-gray-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {goal.status.replace('-', ' ')}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-gray-900">{goal.progressPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${goal.progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>

                        {goal.targetDate && (
                          <div className="text-xs text-gray-500">
                            Target: {goal.targetDate}
                          </div>
                        )}

                        {goal.milestones && goal.milestones.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Milestones</h4>
                            <div className="space-y-1">
                              {goal.milestones.map((milestone) => (
                                <div key={milestone.id} className="flex items-center text-sm">
                                  <span className={`w-2 h-2 rounded-full mr-2 ${
                                    milestone.status === 'achieved' ? 'bg-green-500' :
                                    milestone.status === 'overdue' ? 'bg-red-500' :
                                    'bg-gray-300'
                                  }`}></span>
                                  <span className={`${
                                    milestone.status === 'achieved' ? 'text-green-700 line-through' : 'text-gray-700'
                                  }`}>
                                    {milestone.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Points */}
              {selectedClient.actionPoints && selectedClient.actionPoints.length > 0 && (
                <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Action Points
                  </h2>

                  <div className="space-y-3">
                    {selectedClient.actionPoints.map((action) => (
                      <div key={action.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                        <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                          action.status === 'completed' ? 'bg-green-500' :
                          action.status === 'in-progress' ? 'bg-blue-500' :
                          action.status === 'cancelled' ? 'bg-red-500' :
                          'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <p className={`text-sm ${
                            action.status === 'completed' ? 'text-green-700 line-through' : 'text-gray-900'
                          }`}>
                            {action.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-gray-500">Assigned: {action.assignedDate}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              action.priority === 'high' ? 'bg-red-100 text-red-700' :
                              action.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {action.priority}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              action.status === 'completed' ? 'bg-green-100 text-green-700' :
                              action.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                              action.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {action.status.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Notes */}
              {selectedClient.progressNotes && selectedClient.progressNotes.length > 0 && (
                <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Progress Notes
                  </h2>

                  <div className="space-y-4">
                    {selectedClient.progressNotes.map((note) => (
                      <div key={note.id} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            note.type === 'improvement' ? 'bg-green-100 text-green-800' :
                            note.type === 'achievement' ? 'bg-blue-100 text-blue-800' :
                            note.type === 'challenge' ? 'bg-red-100 text-red-800' :
                            note.type === 'feedback' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {note.type}
                          </span>
                          <span className="text-xs text-gray-500">{note.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Coaching Hours & Sessions */}
              {selectedClient.coachingHours && (
                <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Coaching Hours & Sessions
                  </h2>

                  {/* Hours Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-blue-600">Total Hours</div>
                      <div className="text-2xl font-bold text-blue-900">{selectedClient.coachingHours.totalHoursPurchased}h</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-green-600">Hours Used</div>
                      <div className="text-2xl font-bold text-green-900">{selectedClient.coachingHours.totalHoursUsed}h</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-orange-600">Hours Remaining</div>
                      <div className="text-2xl font-bold text-orange-900">
                        {(selectedClient.coachingHours.totalHoursPurchased - selectedClient.coachingHours.totalHoursUsed).toFixed(1)}h
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-600">Hourly Rate</div>
                      <div className="text-2xl font-bold text-gray-900">${selectedClient.coachingHours.hourlyRate}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Package Progress</span>
                      <span className="font-medium text-gray-900">
                        {Math.round((selectedClient.coachingHours.totalHoursUsed / selectedClient.coachingHours.totalHoursPurchased) * 100)}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((selectedClient.coachingHours.totalHoursUsed / selectedClient.coachingHours.totalHoursPurchased) * 100, 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Package Details */}
                  {selectedClient.coachingHours.packageDetails && selectedClient.coachingHours.packageDetails.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Package Details</h3>
                      {selectedClient.coachingHours.packageDetails.map((pkg, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">{pkg.packageName}</h4>
                              <p className="text-sm text-gray-600">
                                {pkg.hoursIncluded} hours included • Purchased: {pkg.purchaseDate}
                              </p>
                              {pkg.expiryDate && (
                                <p className="text-xs text-gray-500">Expires: {pkg.expiryDate}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Session Log */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Session History</h3>
                      <button
                        onClick={() => setShowSessionForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        + Add Session
                      </button>
                    </div>
                    <div className="space-y-4">
                      {selectedClient.coachingHours.sessionsLog.map((session) => (
                        <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center space-x-4">
                                <h4 className="font-medium text-gray-900">{session.date}</h4>
                                <span className="text-sm text-gray-600">
                                  {session.startTime} - {session.endTime} ({session.duration}h)
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  session.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                  session.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {session.status}
                                </span>
                              </div>
                              <div className="mt-1">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  session.sessionType === 'initial-consultation' ? 'bg-purple-100 text-purple-800' :
                                  session.sessionType === 'follow-up' ? 'bg-blue-100 text-blue-800' :
                                  session.sessionType === 'package-session' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {session.sessionType.replace('-', ' ')}
                                </span>
                                {session.rateCharged && (
                                  <span className="ml-2 text-sm text-gray-600">
                                    Rate: ${session.rateCharged}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 mb-3">{session.notes}</p>

                          {session.linkedGoals && session.linkedGoals.length > 0 && (
                            <div className="text-xs text-gray-500">
                              Linked to goals: {session.linkedGoals.join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="mt-6 lg:mt-8 bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Notes</h2>
                <p className="text-sm lg:text-base text-gray-700 leading-relaxed">{selectedClient.notes}</p>
              </div>

              {/* Client Documents & Files */}
              <div className="mt-6 lg:mt-8 bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6 flex items-center">
                  <FileText className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                  Client Documents & Files
                </h2>

                <div className="space-y-4 lg:space-y-6">
                  {/* Upload Categories */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                    <label htmlFor="test-results-upload" className="border-2 border-dashed border-gray-300 rounded-lg p-3 lg:p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                      <div className="text-center">
                        <span className="text-xl lg:text-2xl mb-1 lg:mb-2 block">🧪</span>
                        <h3 className="text-sm lg:text-base font-medium text-gray-900">Test Results</h3>
                        <p className="text-xs lg:text-sm text-gray-500">{uploadedFiles[selectedClient?.id || '']?.['test-results']?.length || 0} files</p>
                        <p className="text-xs text-blue-600 mt-1 hidden lg:block">Click to upload</p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                        className="hidden"
                        id="test-results-upload"
                        onChange={(e) => handleFileUpload(e, 'test-results')}
                      />
                    </label>

                    <label htmlFor="session-notes-upload" className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                      <div className="text-center">
                        <span className="text-2xl mb-2 block">📝</span>
                        <h3 className="font-medium text-gray-900">Session Notes</h3>
                        <p className="text-sm text-gray-500">{uploadedFiles[selectedClient?.id || '']?.['session-notes']?.length || 0} files</p>
                        <p className="text-xs text-blue-600 mt-1">Click to upload</p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                        className="hidden"
                        id="session-notes-upload"
                        onChange={(e) => handleFileUpload(e, 'session-notes')}
                      />
                    </label>

                    <label htmlFor="contracts-upload" className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                      <div className="text-center">
                        <span className="text-2xl mb-2 block">📋</span>
                        <h3 className="font-medium text-gray-900">Contracts</h3>
                        <p className="text-sm text-gray-500">{uploadedFiles[selectedClient?.id || '']?.['contracts']?.length || 0} files</p>
                        <p className="text-xs text-blue-600 mt-1">Click to upload</p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                        className="hidden"
                        id="contracts-upload"
                        onChange={(e) => handleFileUpload(e, 'contracts')}
                      />
                    </label>

                    <label htmlFor="other-docs-upload" className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                      <div className="text-center">
                        <span className="text-2xl mb-2 block">📁</span>
                        <h3 className="font-medium text-gray-900">Other Docs</h3>
                        <p className="text-sm text-gray-500">{uploadedFiles[selectedClient?.id || '']?.['other-docs']?.length || 0} files</p>
                        <p className="text-xs text-blue-600 mt-1">Click to upload</p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                        className="hidden"
                        id="other-docs-upload"
                        onChange={(e) => handleFileUpload(e, 'other-docs')}
                      />
                    </label>
                  </div>

                  {/* Storage Usage */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      📊 Storage Usage
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Total: 0 files</div>
                        <div className="text-gray-600">Combined: 0.00MB</div>
                        <div className="text-gray-600">💾 Local: 0.00MB</div>
                        <div className="text-gray-600">📚 Large: 0.00MB</div>
                      </div>
                      <div>
                        <div className="text-gray-600">LocalStorage Usage</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '0%'}}></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">0%</div>
                      </div>
                    </div>
                  </div>

                  {/* Bulk Upload */}
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="text-center">
                      <span className="text-3xl mb-2 block">⬆️</span>
                      <h3 className="font-medium text-gray-900 mb-2">Upload Multiple Files at Once</h3>
                      <div className="text-sm text-gray-600">
                        <p>Click here to select multiple files</p>
                        <p className="mt-1">Supports: PDF, Images, Documents, and more</p>
                      </div>
                    </div>
                  </div>

                  {/* Upload Status and Save Button */}
                  {uploadStatus && (
                    <div className={`p-3 rounded-md ${uploadStatus.includes('too large') || uploadStatus.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {uploadStatus}
                    </div>
                  )}

                  {selectedClient && uploadedFiles[selectedClient.id] && Object.keys(uploadedFiles[selectedClient.id]).length > 0 && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">Files Ready to Upload for {selectedClient.name}:</h4>
                        {Object.entries(uploadedFiles[selectedClient.id]).map(([category, files]) => (
                          <div key={category} className="text-sm text-blue-800">
                            <strong>{category.replace('-', ' ').toUpperCase()}:</strong> {files.map(f => f.name).join(', ')}
                            <span className="text-blue-600"> ({(files.reduce((total, file) => total + file.size, 0) / (1024 * 1024)).toFixed(2)}MB)</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={saveFiles}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
                      >
                        💾 Save All Files for {selectedClient.name} (Max 10MB per file)
                      </button>
                    </div>
                  )}

                  {(!selectedClient || !uploadedFiles[selectedClient.id] || Object.keys(uploadedFiles[selectedClient.id]).length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="font-medium">No files uploaded yet</p>
                      <p className="text-sm mt-2">
                        Use the upload sections above to add multiple files<br />
                        for test results, session notes, contracts, and more<br />
                        <span className="text-blue-600">Maximum file size: 10MB</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Nutripath Test Orders */}
              <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Nutripath Test Orders</h2>

                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">No Nutripath tests ordered yet</p>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Order Tests (Tick to order)</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={testsOrdered[selectedClient.id]?.dnaTest || false}
                          onChange={(e) => handleTestCheckboxChange('dnaTest', e.target.checked)}
                        />
                        <span className="ml-3 text-gray-700">DNA Test</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={testsOrdered[selectedClient.id]?.microbiomeTest || false}
                          onChange={(e) => handleTestCheckboxChange('microbiomeTest', e.target.checked)}
                        />
                        <span className="ml-3 text-gray-700">Microbiome Test</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={testsOrdered[selectedClient.id]?.dutchTest || false}
                          onChange={(e) => handleTestCheckboxChange('dutchTest', e.target.checked)}
                        />
                        <span className="ml-3 text-gray-700">DUTCH Test</span>
                      </label>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      💡 Tip: After clicking Save Changes, you can tick these boxes again to order more tests
                    </p>
                  </div>
                </div>
              </div>

              {/* Toni Naturopath Referral */}
              <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Toni Naturopath Referral</h2>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={testsOrdered[selectedClient.id]?.toniReferral || false}
                    onChange={(e) => handleTestCheckboxChange('toniReferral', e.target.checked)}
                  />
                  <span className="ml-3 text-gray-700">Referred to Toni</span>
                </label>
              </div>

              {/* Save Button for Tests */}
              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={saveTestsOrdered}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Test Orders
                </button>
                {saveStatus && (
                  <span className={`text-sm ${saveStatus.includes('success') ? 'text-green-600' : 'text-blue-600'}`}>
                    {saveStatus}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Select a Client</h2>
                <p className="text-gray-600">Choose a client from the sidebar to view their details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Client Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Client</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Client name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="client@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                <select
                  value={newClient.program}
                  onChange={(e) => setNewClient({...newClient, program: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Optimise Your Life Coaching Program">Optimise Your Life Coaching Program</option>
                  <option value="Masterclass">Masterclass</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Book Reader">Book Reader</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newClient.notes}
                  onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Client notes and goals..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={addNewClient}
                disabled={!newClient.name || !newClient.email}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add Client
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setNewClient({ name: '', email: '', phone: '', program: 'Optimise Your Life Coaching Program', notes: '' })
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Session Modal */}
      {showSessionForm && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Session</h2>
            <p className="text-sm text-gray-600 mb-4">Adding session for {selectedClient.name}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  value={newSession.date}
                  onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                  <input
                    type="time"
                    value={newSession.startTime}
                    onChange={(e) => setNewSession({...newSession, startTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                  <input
                    type="time"
                    value={newSession.endTime}
                    onChange={(e) => setNewSession({...newSession, endTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                <input
                  type="number"
                  step="0.25"
                  min="0.25"
                  max="4"
                  value={newSession.duration}
                  onChange={(e) => setNewSession({...newSession, duration: parseFloat(e.target.value) || 1})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                <select
                  value={newSession.sessionType}
                  onChange={(e) => setNewSession({...newSession, sessionType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="package-session">Package Session</option>
                  <option value="initial-consultation">Initial Consultation</option>
                  <option value="follow-up">Follow-up Session</option>
                  <option value="check-in">Check-in</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newSession.status}
                  onChange={(e) => setNewSession({...newSession, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="completed">Completed</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="no-show">No Show</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Notes</label>
                <textarea
                  value={newSession.notes}
                  onChange={(e) => setNewSession({...newSession, notes: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Key discussion points, action items, client progress, next steps..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={addNewSession}
                disabled={!newSession.date || !newSession.startTime || !newSession.endTime}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add Session
              </button>
              <button
                onClick={() => {
                  setShowSessionForm(false)
                  setNewSession({
                    date: '',
                    startTime: '',
                    endTime: '',
                    duration: 1,
                    sessionType: 'package-session',
                    notes: '',
                    status: 'completed'
                  })
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}