import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Linkedin,
  Users,
  Target,
  TrendingUp,
  MessageSquare,
  Calendar,
  Award,
  Brain,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  Send,
  Eye,
  Heart,
  Share,
  UserPlus,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Briefcase,
  Filter,
  Search,
  Download,
  Copy,
  RefreshCw,
  Settings,
  Bell,
  Star
} from 'lucide-react'

interface LinkedInLead {
  id: string
  name: string
  title: string
  company: string
  industry: string
  connections: number
  engagement: 'high' | 'medium' | 'low'
  lastActive: string
  painPoints: string[]
  coachingFit: number
  contactMethod: 'direct' | 'warm_intro' | 'content_engagement'
  status: 'prospect' | 'contacted' | 'engaged' | 'qualified' | 'client'
}

interface ContentStrategy {
  id: string
  type: 'thought_leadership' | 'case_study' | 'poll' | 'carousel' | 'video'
  hook: string
  content: string[]
  targetAudience: string
  expectedEngagement: number
  coachingAngle: string
  cta: string
  hashtags: string[]
}

interface GrokIntegration {
  insights: string[]
  contentSuggestions: string[]
  leadScoring: Record<string, number>
  trendAnalysis: string[]
  competitorIntel: string[]
}

const LinkedInLeadAgent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'content' | 'grok' | 'automation' | 'analytics'>('dashboard')
  const [selectedLead, setSelectedLead] = useState<LinkedInLead | null>(null)
  const [contentFilter, setContentFilter] = useState<'all' | 'high_converting' | 'viral' | 'new'>('all')

  // Sample LinkedIn Leads Data
  const linkedinLeads: LinkedInLead[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'Chief Technology Officer',
      company: 'Atlassian',
      industry: 'Technology',
      connections: 2847,
      engagement: 'high',
      lastActive: '2 hours ago',
      painPoints: ['Burnout management', 'Sleep optimization', 'Stress resilience'],
      coachingFit: 92,
      contactMethod: 'content_engagement',
      status: 'qualified'
    },
    {
      id: '2',
      name: 'Marcus Wong',
      title: 'Managing Director',
      company: 'Macquarie Bank',
      industry: 'Financial Services',
      connections: 1934,
      engagement: 'medium',
      lastActive: '1 day ago',
      painPoints: ['Energy optimization', 'Performance enhancement', 'Recovery protocols'],
      coachingFit: 87,
      contactMethod: 'warm_intro',
      status: 'prospect'
    },
    {
      id: '3',
      name: 'Emma Thompson',
      title: 'Head of People & Culture',
      company: 'Canva',
      industry: 'Technology',
      connections: 3421,
      engagement: 'high',
      lastActive: '4 hours ago',
      painPoints: ['Team wellness', 'Executive coaching', 'Workplace optimization'],
      coachingFit: 95,
      contactMethod: 'direct',
      status: 'engaged'
    },
    {
      id: '4',
      name: 'David Kim',
      title: 'Strategy Director',
      company: 'Boston Consulting Group',
      industry: 'Consulting',
      connections: 2156,
      engagement: 'medium',
      lastActive: '6 hours ago',
      painPoints: ['Cognitive performance', 'Stress management', 'Longevity planning'],
      coachingFit: 89,
      contactMethod: 'content_engagement',
      status: 'contacted'
    }
  ]

  // LinkedIn Content Strategy Templates
  const contentStrategies: ContentStrategy[] = [
    {
      id: '1',
      type: 'thought_leadership',
      hook: 'After working with 200+ C-suite executives, I\'ve identified the #1 factor that separates peak performers from the rest...',
      content: [
        'It\'s not intelligence, experience, or even work ethic.',
        'It\'s their approach to energy management.',
        'Top performers treat their energy like their most valuable currency.',
        'They invest in:',
        '• Sleep optimization protocols (+40% cognitive performance)',
        '• Strategic recovery periods (+31% decision-making speed)', 
        '• Stress resilience training (+50% sustained focus)',
        'The result? They operate at 85% capacity consistently while others burn out at 110%.',
        'Energy management isn\'t just wellness—it\'s competitive advantage.'
      ],
      targetAudience: 'C-suite executives, Senior leaders',
      expectedEngagement: 850,
      coachingAngle: 'Peak performance through biohacking',
      cta: 'What\'s your biggest energy drain? Share in comments 👇',
      hashtags: ['#executivehealth', '#biohacking', '#leadership', '#performance']
    },
    {
      id: '2',
      type: 'case_study',
      hook: '6 months ago, this Canva executive was burning out. Today, she\'s performing at her highest level ever.',
      content: [
        'Carly came to me exhausted, overwhelmed, and questioning if she could sustain her leadership role.',
        'Her biggest challenges:',
        '❌ 4-5 hours of fragmented sleep',
        '❌ Afternoon energy crashes',
        '❌ Stress eating and decision fatigue',
        '❌ No recovery routine',
        'The transformation:',
        '✅ Optimized sleep architecture (7.5 hours, 90% sleep efficiency)',
        '✅ Eliminated energy crashes through nutritional timing',
        '✅ Built stress resilience with breathwork protocols',
        '✅ Implemented strategic recovery periods',
        'Results after 6 months:',
        '• 40% increase in sustained energy',
        '• 25% improvement in decision-making speed',
        '• Promoted to Head of Teams & Education',
        'The method works when it\'s personalized and sustainable.'
      ],
      targetAudience: 'Senior managers, Directors',
      expectedEngagement: 1200,
      coachingAngle: 'Proven transformation results',
      cta: 'Ready for your transformation? Book a strategy call.',
      hashtags: ['#transformation', '#executivecoaching', '#biohacking', '#canva']
    },
    {
      id: '3',
      type: 'poll',
      hook: 'Quick poll for Australian executives:',
      content: [
        'What\'s your biggest performance bottleneck right now?',
        '',
        '🛏️ Sleep quality/quantity',
        '⚡ Energy crashes during the day', 
        '🧠 Mental fatigue/brain fog',
        '💪 Physical recovery from stress',
        '',
        'Vote and I\'ll share the #1 biohack for your specific challenge in the comments.',
        '',
        'Based on 500+ executive assessments, I can predict which option will win... 👀'
      ],
      targetAudience: 'Australian executives, All levels',
      expectedEngagement: 650,
      coachingAngle: 'Personalized solutions for each challenge',
      cta: 'Vote + comment your industry for personalized advice',
      hashtags: ['#poll', '#executivehealth', '#australia', '#biohacking']
    }
  ]

  // Grok AI Integration Simulation
  const grokInsights: GrokIntegration = {
    insights: [
      'LinkedIn engagement peaks for executive wellness content on Tuesday-Thursday, 7-9 AM AEST',
      'Posts mentioning specific metrics (e.g., "40% increase") get 3.2x more engagement',
      'Australian executives respond 67% better to "optimization" vs "wellness" language',
      'Case studies from recognizable companies (Canva, Atlassian) increase trust by 45%',
      'Video content gets 2.8x more coaching inquiries than text-only posts'
    ],
    contentSuggestions: [
      'Create a "5-Minute Executive Energy Audit" as a lead magnet',
      'Share behind-the-scenes content from corporate wellness sessions',
      'Post about biohacking misconceptions (myth-busting performs well)',
      'Interview other executives about their optimization strategies',
      'Create urgency around limited coaching spots opening quarterly'
    ],
    leadScoring: {
      'C-suite titles': 95,
      'Wellness/health mentions in bio': 85,
      'Recent wellness content engagement': 90,
      'Australia-based': 88,
      'Technology/Finance industry': 82
    },
    trendAnalysis: [
      'Rising interest in "Executive longevity" (+340% searches)',
      'Decreased engagement with generic wellness content (-23%)',
      'Increased focus on measurable performance outcomes (+156%)',
      'Growing demand for science-backed approaches (+89%)',
      'Shift from work-life balance to work-life integration (+67%)'
    ],
    competitorIntel: [
      'Most coaches focus on mindset, not biohacking (opportunity gap)',
      'Limited Australian-specific executive wellness content',
      'Competitors lack corporate client social proof',
      'No one offering 30-minute masterclasses (unique positioning)',
      'Gap in assessment-driven personalization'
    ]
  }

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'high': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'client': return 'text-purple-600 bg-purple-100'
      case 'qualified': return 'text-green-600 bg-green-100'
      case 'engaged': return 'text-blue-600 bg-blue-100'
      case 'contacted': return 'text-yellow-600 bg-yellow-100'
      case 'prospect': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ocean mb-2">LinkedIn Lead Generation Agent</h1>
        <p className="text-charcoal/70">AI-powered coaching client acquisition with Grok integration</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'leads', label: 'Lead Pipeline', icon: Users },
          { id: 'content', label: 'Content Strategy', icon: MessageSquare },
          { id: 'grok', label: 'Grok AI Insights', icon: Brain },
          { id: 'automation', label: 'Automation', icon: Settings },
          { id: 'analytics', label: 'Performance', icon: TrendingUp }
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
          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-ice to-cloud p-6 rounded-xl border border-ocean/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-ocean">Active Leads</h3>
                <Users className="w-6 h-6 text-sky" />
              </div>
              <p className="text-3xl font-bold text-ocean">127</p>
              <p className="text-sm text-charcoal/60">+23% this month</p>
            </div>

            <div className="bg-gradient-to-r from-ice to-cloud p-6 rounded-xl border border-ocean/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-ocean">Qualified Prospects</h3>
                <Target className="w-6 h-6 text-sky" />
              </div>
              <p className="text-3xl font-bold text-ocean">34</p>
              <p className="text-sm text-charcoal/60">Ready for outreach</p>
            </div>

            <div className="bg-gradient-to-r from-ice to-cloud p-6 rounded-xl border border-ocean/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-ocean">Coaching Clients</h3>
                <Award className="w-6 h-6 text-sky" />
              </div>
              <p className="text-3xl font-bold text-ocean">8</p>
              <p className="text-sm text-charcoal/60">This quarter</p>
            </div>

            <div className="bg-gradient-to-r from-ice to-cloud p-6 rounded-xl border border-ocean/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-ocean">Revenue Generated</h3>
                <DollarSign className="w-6 h-6 text-sky" />
              </div>
              <p className="text-3xl font-bold text-ocean">$67,200</p>
              <p className="text-sm text-charcoal/60">Coaching revenue</p>
            </div>
          </div>

          {/* Pipeline Visualization */}
          <div className="bg-white rounded-xl border border-ocean/10 p-6">
            <h3 className="text-xl font-semibold text-ocean mb-6">Lead Pipeline</h3>
            <div className="space-y-4">
              {[
                { stage: 'LinkedIn Prospects', count: 127, color: 'bg-gray-400' },
                { stage: 'Content Engaged', count: 89, color: 'bg-blue-400' },
                { stage: 'Direct Contact Made', count: 45, color: 'bg-yellow-400' },
                { stage: 'Strategy Call Booked', count: 18, color: 'bg-orange-400' },
                { stage: 'Coaching Client', count: 8, color: 'bg-green-400' }
              ].map((stage, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${stage.color}`}></div>
                    <span className="font-medium text-charcoal">{stage.stage}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`h-2 rounded-full ${stage.color} w-${Math.min(stage.count, 32)}`}></div>
                    <span className="font-medium text-ocean w-8 text-right">{stage.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-ocean/10 p-6">
              <h3 className="text-lg font-semibold text-ocean mb-4">Today's Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-ocean text-white p-3 rounded-lg hover:bg-ocean/90 transition-colors flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Send 5 Connection Requests</span>
                </button>
                <button className="w-full bg-sky text-white p-3 rounded-lg hover:bg-sky/90 transition-colors flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Follow Up on Engaged Leads</span>
                </button>
                <button className="w-full bg-white border border-ocean text-ocean p-3 rounded-lg hover:bg-ice transition-colors flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Content Posts</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-ocean/10 p-6">
              <h3 className="text-lg font-semibold text-ocean mb-4">Top Performing Content</h3>
              <div className="space-y-3">
                {[
                  { title: 'Executive Energy Audit', engagement: '1.2k likes' },
                  { title: 'Canva Case Study', engagement: '890 likes' },
                  { title: 'Sleep Optimization Poll', engagement: '760 likes' }
                ].map((post, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-ice rounded">
                    <span className="text-sm text-charcoal">{post.title}</span>
                    <span className="text-xs text-ocean">{post.engagement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-ocean/10 p-6">
              <h3 className="text-lg font-semibold text-ocean mb-4">Grok AI Recommendations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <Brain className="w-4 h-4 text-sky mt-0.5" />
                  <span className="text-charcoal/80">Post about energy optimization at 8 AM for maximum reach</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Target className="w-4 h-4 text-sky mt-0.5" />
                  <span className="text-charcoal/80">Focus outreach on Atlassian and Canva employees this week</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-sky mt-0.5" />
                  <span className="text-charcoal/80">Create urgency: "Q1 coaching spots filling fast"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leads Tab */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>All Industries</option>
                <option>Technology</option>
                <option>Financial Services</option>
                <option>Consulting</option>
                <option>Healthcare</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>All Seniority</option>
                <option>C-Suite</option>
                <option>VP/Director</option>
                <option>Manager</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>All Engagement</option>
                <option>High Engagement</option>
                <option>Medium Engagement</option>
                <option>Low Engagement</option>
              </select>
            </div>
            <button className="bg-ocean text-white px-4 py-2 rounded-lg hover:bg-ocean/90 transition-colors flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Leads</span>
            </button>
          </div>

          {/* Leads List */}
          <div className="bg-white rounded-xl border border-ocean/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-ice">
                  <tr>
                    <th className="text-left p-4 font-semibold text-charcoal">Lead</th>
                    <th className="text-left p-4 font-semibold text-charcoal">Company</th>
                    <th className="text-left p-4 font-semibold text-charcoal">Coaching Fit</th>
                    <th className="text-left p-4 font-semibold text-charcoal">Engagement</th>
                    <th className="text-left p-4 font-semibold text-charcoal">Status</th>
                    <th className="text-left p-4 font-semibold text-charcoal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {linkedinLeads.map((lead, index) => (
                    <tr key={lead.id} className="border-b border-gray-100 hover:bg-ice/50">
                      <td className="p-4">
                        <div>
                          <h4 className="font-medium text-charcoal">{lead.name}</h4>
                          <p className="text-sm text-charcoal/60">{lead.title}</p>
                          <p className="text-xs text-charcoal/40">{lead.connections.toLocaleString()} connections</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-charcoal">{lead.company}</p>
                          <p className="text-sm text-charcoal/60">{lead.industry}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-ocean h-2 rounded-full"
                              style={{ width: `${lead.coachingFit}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-ocean">{lead.coachingFit}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(lead.engagement)}`}>
                          {lead.engagement.charAt(0).toUpperCase() + lead.engagement.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => setSelectedLead(lead)}
                            className="text-ocean hover:text-ocean/80"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-sky hover:text-sky/80">
                            <Send className="w-4 h-4" />
                          </button>
                          <button className="text-charcoal/60 hover:text-charcoal">
                            <Calendar className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lead Detail Modal */}
          {selectedLead && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-ocean">{selectedLead.name}</h2>
                  <button 
                    onClick={() => setSelectedLead(null)}
                    className="text-charcoal/60 hover:text-charcoal"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-charcoal mb-3">Profile</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Title:</span> {selectedLead.title}</p>
                      <p><span className="font-medium">Company:</span> {selectedLead.company}</p>
                      <p><span className="font-medium">Industry:</span> {selectedLead.industry}</p>
                      <p><span className="font-medium">Connections:</span> {selectedLead.connections.toLocaleString()}</p>
                      <p><span className="font-medium">Last Active:</span> {selectedLead.lastActive}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-charcoal mb-3">Pain Points</h3>
                    <div className="space-y-2">
                      {selectedLead.painPoints.map((pain, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-sky" />
                          <span className="text-sm text-charcoal/80">{pain}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-charcoal mb-3">Recommended Actions</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    <button className="bg-ocean text-white p-3 rounded-lg hover:bg-ocean/90 transition-colors text-sm">
                      Send Connection Request
                    </button>
                    <button className="bg-sky text-white p-3 rounded-lg hover:bg-sky/90 transition-colors text-sm">
                      Engage with Content
                    </button>
                    <button className="bg-white border border-ocean text-ocean p-3 rounded-lg hover:bg-ice transition-colors text-sm">
                      Schedule Follow-up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content Strategy Tab */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Content Filter */}
          <div className="flex items-center space-x-4">
            {['all', 'high_converting', 'viral', 'new'].map(filter => (
              <button
                key={filter}
                onClick={() => setContentFilter(filter as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  contentFilter === filter
                    ? 'bg-ocean text-white'
                    : 'text-charcoal/60 hover:text-ocean hover:bg-ice'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1).replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Content Templates */}
          <div className="grid md:grid-cols-2 gap-6">
            {contentStrategies.map((strategy, index) => (
              <motion.div
                key={strategy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-ocean/10 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      strategy.type === 'thought_leadership' ? 'bg-purple-100 text-purple-800' :
                      strategy.type === 'case_study' ? 'bg-green-100 text-green-800' :
                      strategy.type === 'poll' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {strategy.type.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-sm text-charcoal/60">Est. {strategy.expectedEngagement} engagements</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-charcoal/60 hover:text-charcoal">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="text-charcoal/60 hover:text-charcoal">
                      <Calendar className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-charcoal mb-2">Hook:</h4>
                    <p className="text-sm text-charcoal/80 italic bg-gray-50 p-3 rounded-lg">
                      "{strategy.hook}"
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-charcoal mb-2">Content:</h4>
                    <div className="bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto">
                      {strategy.content.map((line, idx) => (
                        <p key={idx} className="text-sm text-charcoal/80 mb-1">{line}</p>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-charcoal mb-2 text-sm">Target:</h4>
                      <p className="text-sm text-charcoal/60">{strategy.targetAudience}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-charcoal mb-2 text-sm">Coaching Angle:</h4>
                      <p className="text-sm text-charcoal/60">{strategy.coachingAngle}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-charcoal mb-2 text-sm">Call to Action:</h4>
                    <p className="text-sm text-ocean font-medium">{strategy.cta}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-charcoal mb-2 text-sm">Hashtags:</h4>
                    <p className="text-sm text-sky">{strategy.hashtags.join(' ')}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t flex justify-between items-center">
                  <button className="bg-linkedin text-white px-4 py-2 rounded-lg hover:bg-linkedin/90 transition-colors flex items-center space-x-2 text-sm">
                    <Linkedin className="w-4 h-4" />
                    <span>Post to LinkedIn</span>
                  </button>
                  <button className="text-ocean font-medium text-sm hover:underline">
                    Edit Template
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Grok AI Tab */}
      {activeTab === 'grok' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-ice to-cloud p-6 rounded-xl border border-ocean/10">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-8 h-8 text-sky" />
              <h2 className="text-2xl font-bold text-ocean">Grok AI Insights</h2>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">LIVE</span>
            </div>
            <p className="text-charcoal/70">Real-time AI analysis of LinkedIn trends, competitor activity, and optimization opportunities</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Insights */}
            <div className="bg-white rounded-xl border border-ocean/10 p-6">
              <h3 className="text-lg font-semibold text-ocean mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Key Insights</span>
              </h3>
              <div className="space-y-4">
                {grokInsights.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-ice rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-charcoal/80">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Suggestions */}
            <div className="bg-white rounded-xl border border-ocean/10 p-6">
              <h3 className="text-lg font-semibold text-ocean mb-4 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Content Suggestions</span>
              </h3>
              <div className="space-y-4">
                {grokInsights.contentSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-sky/10 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-charcoal/80">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend Analysis */}
            <div className="bg-white rounded-xl border border-ocean/10 p-6">
              <h3 className="text-lg font-semibold text-ocean mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Trend Analysis</span>
              </h3>
              <div className="space-y-4">
                {grokInsights.trendAnalysis.map((trend, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <Activity className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-charcoal/80">{trend}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Intel */}
            <div className="bg-white rounded-xl border border-ocean/10 p-6">
              <h3 className="text-lg font-semibold text-ocean mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Competitor Intelligence</span>
              </h3>
              <div className="space-y-4">
                {grokInsights.competitorIntel.map((intel, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <Award className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-charcoal/80">{intel}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lead Scoring Matrix */}
          <div className="bg-white rounded-xl border border-ocean/10 p-6">
            <h3 className="text-lg font-semibold text-ocean mb-4">AI Lead Scoring Matrix</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(grokInsights.leadScoring).map(([criteria, score]) => (
                <div key={criteria} className="flex items-center justify-between p-4 bg-ice rounded-lg">
                  <span className="text-sm text-charcoal font-medium">{criteria}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-ocean h-2 rounded-full"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-ocean w-8">{score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Automation Tab */}
      {activeTab === 'automation' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-ocean/10 p-6">
            <h2 className="text-2xl font-bold text-ocean mb-4">LinkedIn Automation Workflows</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Lead Discovery',
                  description: 'Automatically identify and score potential coaching clients',
                  status: 'Active',
                  triggers: 'Daily scan of target companies',
                  actions: ['Profile analysis', 'Pain point identification', 'Coaching fit scoring']
                },
                {
                  title: 'Content Engagement',
                  description: 'Engage with prospects\' content to build relationship',
                  status: 'Active',
                  triggers: 'When qualified lead posts content',
                  actions: ['Thoughtful likes', 'Strategic comments', 'Content shares']
                },
                {
                  title: 'Connection Outreach',
                  description: 'Send personalized connection requests to qualified leads',
                  status: 'Scheduled',
                  triggers: 'Daily at 9 AM AEST',
                  actions: ['Personalized messages', 'Value-first approach', 'Follow-up sequence']
                },
                {
                  title: 'Nurture Sequence',
                  description: 'Automated follow-up for new connections',
                  status: 'Active',
                  triggers: 'Connection acceptance',
                  actions: ['Welcome message', 'Value content sharing', 'Coaching offer']
                }
              ].map((workflow, index) => (
                <div key={index} className="border border-ocean/10 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-ocean">{workflow.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      workflow.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {workflow.status}
                    </span>
                  </div>
                  <p className="text-sm text-charcoal/70 mb-4">{workflow.description}</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-charcoal mb-1">Trigger:</h4>
                      <p className="text-sm text-charcoal/60">{workflow.triggers}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-charcoal mb-1">Actions:</h4>
                      <ul className="text-sm text-charcoal/60 space-y-1">
                        {workflow.actions.map((action, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <button className="text-ocean text-sm font-medium hover:underline">
                      Edit Workflow
                    </button>
                    <button className="bg-ocean text-white px-3 py-1 rounded text-sm hover:bg-ocean/90">
                      View Logs
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Profile Views', value: '2,847', change: '+23%', icon: Eye },
              { label: 'Connection Rate', value: '34.2%', change: '+5.1%', icon: UserPlus },
              { label: 'Content Engagement', value: '8.9%', change: '+12%', icon: Heart },
              { label: 'Coaching Inquiries', value: '18', change: '+67%', icon: MessageSquare }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-ocean/10">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-sky" />
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
                <p className="text-sm text-charcoal/60 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-ocean">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-ocean/10 p-6">
            <h3 className="text-xl font-semibold text-ocean mb-4">Content Performance</h3>
            <div className="space-y-4">
              {[
                { type: 'Thought Leadership', posts: 12, engagement: '1.2k avg', conversions: 8 },
                { type: 'Case Studies', posts: 6, engagement: '890 avg', conversions: 12 },
                { type: 'Polls', posts: 8, engagement: '650 avg', conversions: 4 },
                { type: 'Industry Insights', posts: 10, engagement: '420 avg', conversions: 6 }
              ].map((content, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-ice rounded-lg">
                  <div>
                    <h4 className="font-medium text-charcoal">{content.type}</h4>
                    <p className="text-sm text-charcoal/60">{content.posts} posts this month</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-ocean">{content.engagement}</p>
                    <p className="text-sm text-charcoal/60">{content.conversions} leads generated</p>
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

// LinkedIn brand color
const linkedInColor = '#0077B5'

// Add to your CSS or Tailwind config
const customStyles = `
.bg-linkedin {
  background-color: ${linkedInColor};
}
.text-linkedin {
  color: ${linkedInColor};
}
.hover\\:bg-linkedin\\/90:hover {
  background-color: ${linkedInColor}e6;
}
`

export default LinkedInLeadAgent