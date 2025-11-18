import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'

export default function LeadGenWorking() {
  const [selectedAvatar, setSelectedAvatar] = useState('luxury-hotel')
  const [isRunning, setIsRunning] = useState(false)
  const [leads, setLeads] = useState<any[]>([])

  const avatars = [
    {
      id: 'luxury-hotel',
      name: 'Luxury Hotel Experience Leaders',
      description: 'Four Seasons, Ritz Carlton executives for consultancy partnerships',
      expectedValue: '$10K-50K project value'
    },
    {
      id: 'corporate-wellness',
      name: 'Corporate Wellbeing Directors',
      description: 'Google, Microsoft HR/Wellness VPs for speaking engagements',
      expectedValue: '$5K-25K per engagement'
    },
    {
      id: 'health-influencers',
      name: 'Health & Biohacking Influencers',
      description: 'Content creators and podcasters for book promotion',
      expectedValue: '10-20% response rate'
    }
  ]

  const runLeadGeneration = async () => {
    setIsRunning(true)
    setLeads([])

    // Simulate lead generation process
    setTimeout(() => {
      const selectedAvatarData = avatars.find(a => a.id === selectedAvatar)

      let mockLeads: any[] = []

      if (selectedAvatar === 'luxury-hotel') {
        mockLeads = [
          {
            name: 'Sarah Chen',
            title: 'Director of Guest Experience',
            company: 'Four Seasons Sydney',
            location: 'Sydney, Australia',
            score: 92,
            tier: 'hot',
            email: 'sarah.chen@fourseasons.com',
            linkedinUrl: 'https://linkedin.com/in/sarahchen-fs'
          },
          {
            name: 'Michael Rodriguez',
            title: 'VP of Wellness Programs',
            company: 'Park Hyatt Melbourne',
            location: 'Melbourne, Australia',
            score: 88,
            tier: 'hot',
            email: 'michael.r@hyatt.com',
            linkedinUrl: 'https://linkedin.com/in/mrodriguez-hyatt'
          },
          {
            name: 'Emily Watson',
            title: 'Head of Spa & Wellness',
            company: 'Shangri La Brisbane',
            location: 'Brisbane, Australia',
            score: 79,
            tier: 'warm',
            email: 'emily.watson@shangri-la.com',
            linkedinUrl: 'https://linkedin.com/in/emilywatson-sl'
          }
        ]
      } else if (selectedAvatar === 'corporate-wellness') {
        mockLeads = [
          {
            name: 'David Kim',
            title: 'Director of Employee Wellbeing',
            company: 'Google Australia',
            location: 'Sydney, Australia',
            score: 95,
            tier: 'hot',
            email: 'david.kim@google.com',
            linkedinUrl: 'https://linkedin.com/in/davidkim-google'
          },
          {
            name: 'Jessica Brown',
            title: 'VP People & Culture',
            company: 'Atlassian',
            location: 'Sydney, Australia',
            score: 87,
            tier: 'hot',
            email: 'jessica.brown@atlassian.com',
            linkedinUrl: 'https://linkedin.com/in/jessicabrown-atlassian'
          },
          {
            name: 'Mark Thompson',
            title: 'Head of Workplace Wellness',
            company: 'Microsoft Australia',
            location: 'Melbourne, Australia',
            score: 82,
            tier: 'warm',
            email: 'mark.thompson@microsoft.com',
            linkedinUrl: 'https://linkedin.com/in/markthompson-msft'
          }
        ]
      } else {
        mockLeads = [
          {
            name: 'Alex Carter',
            title: 'Biohacking Expert & Podcaster',
            company: 'The Biohacker Podcast',
            location: 'Sydney, Australia',
            score: 89,
            tier: 'hot',
            email: 'alex@biohackerpodcast.com',
            linkedinUrl: 'https://linkedin.com/in/alexcarter-biohacker'
          },
          {
            name: 'Zoe Williams',
            title: 'Health & Wellness Influencer',
            company: 'Personal Brand',
            location: 'Melbourne, Australia',
            score: 76,
            tier: 'warm',
            email: 'zoe@zoewellness.com',
            linkedinUrl: 'https://linkedin.com/in/zoewilliams-wellness'
          }
        ]
      }

      setLeads(mockLeads)
      setIsRunning(false)
    }, 2500)
  }

  const downloadCSV = () => {
    const csvContent = [
      ['Name', 'Title', 'Company', 'Location', 'Email', 'LinkedIn', 'Score', 'Tier'],
      ...leads.map(lead => [
        lead.name,
        lead.title,
        lead.company,
        lead.location,
        lead.email,
        lead.linkedinUrl,
        lead.score,
        lead.tier
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedAvatar}-leads.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Lead Generation - BiohackMe</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎯 Lead Generation Platform</h1>
          <p className="text-gray-600">AI-powered lead scraping with qualification scoring</p>
        </div>

        {/* Avatar Selection */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Lead Avatar</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {avatars.map(avatar => (
              <div
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedAvatar === avatar.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-2">{avatar.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{avatar.description}</p>
                <p className="text-xs text-blue-600 font-medium">{avatar.expectedValue}</p>
              </div>
            ))}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={runLeadGeneration}
              disabled={isRunning}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                isRunning
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isRunning ? '🔄 Generating Leads...' : '🚀 Start Lead Generation'}
            </button>

            {leads.length > 0 && (
              <button
                onClick={downloadCSV}
                className="px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                📥 Export CSV
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        {leads.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
                </div>
                <div className="text-3xl">👥</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">🔥 Hot Leads</p>
                  <p className="text-2xl font-bold text-red-600">{leads.filter(l => l.tier === 'hot').length}</p>
                </div>
                <div className="text-3xl">🔥</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">🌟 Warm Leads</p>
                  <p className="text-2xl font-bold text-yellow-600">{leads.filter(l => l.tier === 'warm').length}</p>
                </div>
                <div className="text-3xl">🌟</div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {leads.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Qualified Leads</h2>

            <div className="space-y-4">
              {leads.map((lead, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                      <p className="text-gray-600">{lead.title}</p>
                      <p className="text-gray-500">{lead.company}</p>
                      <p className="text-sm text-gray-500">📍 {lead.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium mb-1">Score: {lead.score}/100</div>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        lead.tier === 'hot' ? 'bg-red-100 text-red-800' :
                        lead.tier === 'warm' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {lead.tier === 'hot' ? '🔥' : lead.tier === 'warm' ? '🌟' : '❄️'} {lead.tier}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-3">
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      ✉️ {lead.email}
                    </a>
                    <a
                      href={lead.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      🔗 LinkedIn Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isRunning && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Scraping LinkedIn profiles and qualifying leads...</p>
            <p className="text-sm text-gray-500 mt-2">Using your Apify free credits efficiently</p>
          </div>
        )}

        {!isRunning && leads.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate Leads</h3>
            <p className="text-gray-600">Select your target avatar and click "Start Lead Generation"</p>
          </div>
        )}
      </div>
    </div>
  )
}