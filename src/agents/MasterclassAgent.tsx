import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen,
  Users,
  TrendingUp,
  Target,
  Brain,
  Heart,
  Zap,
  Award,
  CheckCircle,
  ExternalLink,
  Share2,
  MessageSquare,
  Instagram,
  Facebook,
  Linkedin,
  Clock,
  Star,
  ArrowRight,
  PlayCircle,
  Download,
  PieChart,
  BarChart3,
  Calendar
} from 'lucide-react'

interface AssessmentQuestion {
  id: string
  question: string
  options: string[]
  category: 'sleep' | 'energy' | 'stress' | 'nutrition' | 'performance' | 'recovery'
  weight: number
}

interface MasterclassRecommendation {
  masterclassId: string
  title: string
  relevanceScore: number
  keyBenefits: string[]
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
}

interface SocialContent {
  platform: 'instagram' | 'facebook' | 'linkedin' | 'tiktok'
  type: 'story' | 'post' | 'reel' | 'carousel'
  hook: string
  content: string[]
  hashtags: string[]
  cta: string
}

const MasterclassAgent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'assessment' | 'content' | 'social' | 'analytics'>('dashboard')
  const [assessmentStep, setAssessmentStep] = useState(0)
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [selectedMasterclass, setSelectedMasterclass] = useState<string | null>(null)

  // Biohacking Assessment Questions
  const assessmentQuestions: AssessmentQuestion[] = [
    {
      id: 'sleep_quality',
      question: 'How would you rate your sleep quality over the past month?',
      options: ['Excellent (8+ hrs, feel refreshed)', 'Good (7-8 hrs, mostly rested)', 'Fair (6-7 hrs, sometimes tired)', 'Poor (under 6 hrs, always tired)'],
      category: 'sleep',
      weight: 1.5
    },
    {
      id: 'energy_levels',
      question: 'How consistent are your energy levels throughout the day?',
      options: ['Very consistent, high energy all day', 'Mostly stable with minor dips', 'Noticeable afternoon crashes', 'Constantly low or unpredictable'],
      category: 'energy',
      weight: 1.4
    },
    {
      id: 'stress_management',
      question: 'How well do you currently manage stress and pressure?',
      options: ['Excellent - I thrive under pressure', 'Good - I have effective strategies', 'Struggling - stress affects my performance', 'Overwhelmed - stress controls my life'],
      category: 'stress',
      weight: 1.3
    },
    {
      id: 'nutrition_habits',
      question: 'How would you describe your current nutrition habits?',
      options: ['Optimised with tracking and planning', 'Generally healthy with some structure', 'Inconsistent but trying to improve', 'Poor - grabbing whatever is convenient'],
      category: 'nutrition',
      weight: 1.2
    },
    {
      id: 'performance_goals',
      question: 'What best describes your current performance goals?',
      options: ['Peak optimization for competitive advantage', 'Steady improvement in work and life', 'Getting back to previous best performance', 'Just trying to function better daily'],
      category: 'performance',
      weight: 1.1
    },
    {
      id: 'recovery_focus',
      question: 'How much attention do you pay to recovery and regeneration?',
      options: ['I have a structured recovery protocol', 'I do some recovery activities regularly', 'Occasional recovery when I remember', 'Recovery? What recovery?'],
      category: 'recovery',
      weight: 1.0
    }
  ]

  // Masterclass to assessment mapping
  const masterclassRecommendations = (answers: Record<string, number>): MasterclassRecommendation[] => {
    const sleepScore = answers.sleep_quality || 0
    const energyScore = answers.energy_levels || 0
    const stressScore = answers.stress_management || 0
    const nutritionScore = answers.nutrition_habits || 0
    const performanceScore = answers.performance_goals || 0
    const recoveryScore = answers.recovery_focus || 0

    const recommendations: MasterclassRecommendation[] = []

    // Sleep masterclass recommendation
    if (sleepScore >= 2) {
      recommendations.push({
        masterclassId: 'biohack-sleep',
        title: 'Biohack Your Sleep',
        relevanceScore: (4 - sleepScore) * 25 + 25,
        keyBenefits: ['Optimize sleep architecture', 'Increase deep sleep by 40%', 'Wake up refreshed and energized'],
        urgencyLevel: sleepScore >= 3 ? 'critical' : 'high'
      })
    }

    // Energy/Performance masterclass
    if (energyScore >= 2 || performanceScore >= 2) {
      recommendations.push({
        masterclassId: 'biohack-energy',
        title: 'Biohack Your Energy',
        relevanceScore: Math.max(4 - energyScore, 4 - performanceScore) * 20 + 20,
        keyBenefits: ['Eliminate afternoon crashes', 'Sustained energy all day', 'Peak cognitive performance'],
        urgencyLevel: (energyScore + performanceScore) >= 6 ? 'critical' : 'high'
      })
    }

    // Stress/Mood masterclass
    if (stressScore >= 2) {
      recommendations.push({
        masterclassId: 'biohack-stress',
        title: 'Biohack Your Stress Response',
        relevanceScore: (4 - stressScore) * 30,
        keyBenefits: ['Build stress resilience', 'Improve emotional regulation', 'Perform better under pressure'],
        urgencyLevel: stressScore >= 3 ? 'critical' : 'high'
      })
    }

    // Behaviour change for anyone struggling
    if (Object.values(answers).some(score => score >= 2)) {
      recommendations.push({
        masterclassId: 'biohack-behaviour-change',
        title: 'Biohack Your Behaviour Change',
        relevanceScore: 85,
        keyBenefits: ['Master lasting transformation', 'Build unstoppable habits', 'Overcome self-sabotage'],
        urgencyLevel: 'medium'
      })
    }

    return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore)
  }

  // Social media content generator
  const generateSocialContent = (assessment: MasterclassRecommendation): SocialContent[] => {
    const urgencyMap = {
      critical: { emoji: '🚨', urgency: 'URGENT' },
      high: { emoji: '⚡', urgency: 'HIGH PRIORITY' },
      medium: { emoji: '💡', urgency: 'OPPORTUNITY' },
      low: { emoji: '✨', urgency: 'ENHANCEMENT' }
    }

    const { emoji, urgency } = urgencyMap[assessment.urgencyLevel]

    return [
      {
        platform: 'instagram',
        type: 'story',
        hook: `${emoji} Your biohacking assessment revealed something important...`,
        content: [
          `Your ${assessment.title.toLowerCase()} score suggests this is a ${urgency} area for optimization`,
          `Ready to transform this weakness into your superpower?`,
          `Swipe up to claim your spot in the masterclass`
        ],
        hashtags: ['#biohacking', '#optimization', '#performance', '#australia'],
        cta: 'Swipe up to join masterclass'
      },
      {
        platform: 'instagram',
        type: 'post',
        hook: `${emoji} Most high-performers are missing this ONE thing that's sabotaging their results...`,
        content: [
          `I just analysed 1000+ biohacking assessments and found the #1 pattern holding back Australian executives:`,
          `${assessment.keyBenefits[0]}`,
          `The good news? This is completely fixable with the right protocol.`,
          `That's why I'm running a FREE masterclass this week: "${assessment.title}"`,
          `Comment "BIOHACK" and I'll send you the link to join 👇`
        ],
        hashtags: ['#biohacking', '#executivehealth', '#performance', '#australia', '#optimization', '#masterclass'],
        cta: 'Comment BIOHACK for access'
      },
      {
        platform: 'linkedin',
        type: 'post',
        hook: `${emoji} Data from 500+ executive health assessments reveals the #1 performance bottleneck...`,
        content: [
          `After analyzing biohacking assessments from leaders across Australia's top companies, one pattern is clear:`,
          `${assessment.keyBenefits[0]} is the missing piece in most executive wellness strategies.`,
          `This single optimization can increase:`,
          `• Cognitive performance by 23%`,
          `• Decision-making speed by 31%`,
          `• Sustained energy by 40%`,
          `I'm hosting a focused masterclass this week: "${assessment.title}"`,
          `Perfect for leaders who want science-backed strategies, not wellness fluff.`,
          `Link in comments to secure your spot 👇`
        ],
        hashtags: ['#executivehealth', '#biohacking', '#leadership', '#performance', '#australia'],
        cta: 'Link in comments to join'
      },
      {
        platform: 'facebook',
        type: 'post',
        hook: `${emoji} Why 73% of high-performers are struggling with this (and how to fix it in 30 minutes)`,
        content: [
          `I've been helping Australian executives optimize their health for 8+ years.`,
          `The #1 request I get? "${assessment.keyBenefits[0]}"`,
          `This week I'm sharing my exact protocol in a FREE masterclass: "${assessment.title}"`,
          `What you'll learn:`,
          ...assessment.keyBenefits.map(benefit => `✅ ${benefit}`),
          `This is the same system I use with executives at Canva, KPMG, and Lendlease.`,
          `Spots are limited - grab yours below 👇`
        ],
        hashtags: ['#biohacking', '#health', '#australia', '#wellness'],
        cta: 'Register free below'
      }
    ]
  }

  const handleAssessmentAnswer = (questionIndex: number, answerIndex: number) => {
    const question = assessmentQuestions[questionIndex]
    setAssessmentAnswers(prev => ({
      ...prev,
      [question.id]: answerIndex
    }))

    if (questionIndex < assessmentQuestions.length - 1) {
      setAssessmentStep(questionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const resetAssessment = () => {
    setAssessmentStep(0)
    setAssessmentAnswers({})
    setShowResults(false)
  }

  const currentRecommendations = showResults ? masterclassRecommendations(assessmentAnswers) : []

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ocean mb-2">Masterclass Management Agent</h1>
        <p className="text-charcoal/70">Content creation, assessment-driven promotion, and conversion optimization</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'assessment', label: 'Free Assessment', icon: Brain },
          { id: 'content', label: 'Content Creator', icon: BookOpen },
          { id: 'social', label: 'Social Promotion', icon: Share2 },
          { id: 'analytics', label: 'Analytics', icon: PieChart }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-ocean text-white border-b-2 border-ocean'
                : 'text-charcoal/60 hover:text-ocean hover:bg-ice'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Key Metrics */}
            <div className="bg-gradient-to-r from-ice to-cloud p-6 rounded-xl border border-ocean/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-ocean">Assessment Completions</h3>
                <TrendingUp className="w-6 h-6 text-sky" />
              </div>
              <p className="text-3xl font-bold text-ocean">2,847</p>
              <p className="text-sm text-charcoal/60">+23% this month</p>
            </div>

            <div className="bg-gradient-to-r from-ice to-cloud p-6 rounded-xl border border-ocean/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-ocean">Masterclass Conversions</h3>
                <Target className="w-6 h-6 text-sky" />
              </div>
              <p className="text-3xl font-bold text-ocean">34.2%</p>
              <p className="text-sm text-charcoal/60">Industry avg: 12%</p>
            </div>

            <div className="bg-gradient-to-r from-ice to-cloud p-6 rounded-xl border border-ocean/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-ocean">Revenue Generated</h3>
                <Award className="w-6 h-6 text-sky" />
              </div>
              <p className="text-3xl font-bold text-ocean">$47,290</p>
              <p className="text-sm text-charcoal/60">This quarter</p>
            </div>
          </div>

          {/* Top Performing Masterclasses */}
          <div className="bg-white rounded-xl border border-ocean/10 p-6">
            <h3 className="text-xl font-semibold text-ocean mb-4">Top Performing Masterclasses</h3>
            <div className="space-y-4">
              {[
                { title: 'Biohack Your Sleep', conversions: '42%', revenue: '$18,450' },
                { title: 'Biohack Your Energy', conversions: '38%', revenue: '$15,820' },
                { title: 'Biohack Your Stress Response', conversions: '35%', revenue: '$12,340' }
              ].map((masterclass, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-ice rounded-lg">
                  <div>
                    <h4 className="font-medium text-ocean">{masterclass.title}</h4>
                    <p className="text-sm text-charcoal/60">Conversion: {masterclass.conversions}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-ocean">{masterclass.revenue}</p>
                    <p className="text-sm text-charcoal/60">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Assessment Tab */}
      {activeTab === 'assessment' && (
        <div className="max-w-4xl mx-auto">
          {!showResults ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-ocean/10 p-8"
            >
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-ocean">Free Biohacking Assessment</h2>
                  <span className="text-sm text-charcoal/60">
                    {assessmentStep + 1} of {assessmentQuestions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-ocean h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((assessmentStep + 1) / assessmentQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-medium text-charcoal">
                  {assessmentQuestions[assessmentStep].question}
                </h3>

                <div className="grid gap-3">
                  {assessmentQuestions[assessmentStep].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAssessmentAnswer(assessmentStep, index)}
                      className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-ocean hover:bg-ice transition-colors"
                    >
                      <span className="font-medium text-charcoal">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-ocean to-sky text-white p-8 rounded-xl text-center">
                <h2 className="text-3xl font-bold mb-4">Your Biohacking Assessment Results</h2>
                <p className="text-xl opacity-90">Based on your responses, here are your personalized recommendations</p>
              </div>

              {currentRecommendations.map((rec, index) => (
                <motion.div
                  key={rec.masterclassId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-ocean/10 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-ocean mb-2">{rec.title}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">
                          {rec.relevanceScore}% match for your profile
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rec.urgencyLevel === 'critical' ? 'bg-red-100 text-red-800' :
                          rec.urgencyLevel === 'high' ? 'bg-orange-100 text-orange-800' :
                          rec.urgencyLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {rec.urgencyLevel.toUpperCase()} PRIORITY
                        </span>
                      </div>
                    </div>
                    <Clock className="w-6 h-6 text-charcoal/40" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-charcoal mb-3">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {rec.keyBenefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-charcoal/80">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-col justify-between">
                      <div className="mb-4">
                        <p className="text-sm text-charcoal/60 mb-2">30 minutes • Expert level</p>
                        <p className="text-2xl font-bold text-ocean">$97 AUD</p>
                      </div>
                      <button className="bg-ocean text-white px-6 py-3 rounded-full font-semibold hover:bg-ocean/90 transition-colors flex items-center justify-center space-x-2">
                        <PlayCircle className="w-4 h-4" />
                        <span>Join This Masterclass</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="text-center">
                <button
                  onClick={resetAssessment}
                  className="text-ocean font-medium hover:underline"
                >
                  Take Assessment Again
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Social Promotion Tab */}
      {activeTab === 'social' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-ice to-cloud p-6 rounded-xl border border-ocean/10">
            <h2 className="text-2xl font-bold text-ocean mb-4">Social Media Promotion Strategy</h2>
            <p className="text-charcoal/70 mb-6">
              Generate personalized social content based on assessment results to drive masterclass enrollments
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-ocean/10">
                <Instagram className="w-8 h-8 text-pink-600 mb-2" />
                <h3 className="font-semibold text-charcoal mb-1">Instagram Strategy</h3>
                <p className="text-sm text-charcoal/60">Stories + Posts + Reels</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-ocean/10">
                <Linkedin className="w-8 h-8 text-blue-600 mb-2" />
                <h3 className="font-semibold text-charcoal mb-1">LinkedIn Strategy</h3>
                <p className="text-sm text-charcoal/60">Executive-focused content</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-ocean/10">
                <Facebook className="w-8 h-8 text-blue-500 mb-2" />
                <h3 className="font-semibold text-charcoal mb-1">Facebook Strategy</h3>
                <p className="text-sm text-charcoal/60">Community engagement</p>
              </div>
            </div>
          </div>

          {/* Sample Social Content */}
          {currentRecommendations.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {generateSocialContent(currentRecommendations[0]).map((content, index) => (
                <div key={index} className="bg-white rounded-xl border border-ocean/10 p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    {content.platform === 'instagram' && <Instagram className="w-5 h-5 text-pink-600" />}
                    {content.platform === 'linkedin' && <Linkedin className="w-5 h-5 text-blue-600" />}
                    {content.platform === 'facebook' && <Facebook className="w-5 h-5 text-blue-500" />}
                    <span className="font-semibold capitalize">{content.platform} {content.type}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-charcoal text-sm mb-2">Hook:</p>
                      <p className="text-charcoal/80">{content.hook}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-charcoal text-sm mb-2">Content:</p>
                      {content.content.map((line, idx) => (
                        <p key={idx} className="text-charcoal/80 mb-1">{line}</p>
                      ))}
                    </div>
                    
                    <div>
                      <p className="font-medium text-charcoal text-sm mb-2">Hashtags:</p>
                      <p className="text-sky text-sm">{content.hashtags.join(' ')}</p>
                    </div>
                    
                    <div className="border-t pt-3">
                      <p className="font-medium text-ocean text-sm">{content.cta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content Creator Tab */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-ocean/10 p-6">
            <h2 className="text-2xl font-bold text-ocean mb-4">Masterclass Content Management</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-charcoal">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full bg-ocean text-white p-3 rounded-lg hover:bg-ocean/90 transition-colors flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Create New Masterclass</span>
                  </button>
                  <button className="w-full bg-sky text-white p-3 rounded-lg hover:bg-sky/90 transition-colors flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Content</span>
                  </button>
                  <button className="w-full bg-white border border-ocean text-ocean p-3 rounded-lg hover:bg-ice transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export Resources</span>
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-charcoal">Content Templates</h3>
                <div className="space-y-2">
                  {[
                    'Assessment Question Bank',
                    'Social Media Templates', 
                    'Email Nurture Sequences',
                    'Landing Page Copy',
                    'Video Script Outlines'
                  ].map((template, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-ice rounded-lg">
                      <span className="text-charcoal">{template}</span>
                      <ExternalLink className="w-4 h-4 text-ocean cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Assessment Starts', value: '3,247', change: '+18%' },
              { label: 'Completion Rate', value: '87.6%', change: '+5.2%' },
              { label: 'Social Shares', value: '1,895', change: '+34%' },
              { label: 'Masterclass Sales', value: '$52,340', change: '+28%' }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-ocean/10">
                <p className="text-sm text-charcoal/60 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-ocean mb-1">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-ocean/10 p-6">
            <h3 className="text-xl font-semibold text-ocean mb-4">Assessment to Sale Funnel</h3>
            <div className="space-y-4">
              {[
                { stage: 'Assessment Started', count: 3247, percentage: 100 },
                { stage: 'Assessment Completed', count: 2845, percentage: 87.6 },
                { stage: 'Results Viewed', count: 2634, percentage: 81.1 },
                { stage: 'Masterclass Clicked', count: 1987, percentage: 61.2 },
                { stage: 'Purchase Completed', count: 541, percentage: 16.7 }
              ].map((stage, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-ocean rounded-full"></div>
                    <span className="font-medium text-charcoal">{stage.stage}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-charcoal/60">{stage.count.toLocaleString()}</span>
                    <span className="font-medium text-ocean w-12 text-right">{stage.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MasterclassAgent