import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { processAndQualifyLeads } from '../utils/apifyClient'

export default function LeadGenSimple() {
  const [selectedAvatar, setSelectedAvatar] = useState('luxury-hotel')
  const [isRunning, setIsRunning] = useState(false)
  const [leads, setLeads] = useState<any[]>([])

  const avatars = [
    {
      id: 'luxury-hotel',
      name: 'Luxury Hotel Experience Leaders',
      description: 'Four Seasons, Ritz Carlton executives for consultancy partnerships',
      searchCriteria: {
        keywords: ['guest experience', 'luxury hospitality', 'wellness programs', 'spa services'],
        jobTitles: ['Director of Guest Experience', 'VP Guest Services', 'Director of Wellness', 'Head of Spa'],
        companies: ['Four Seasons', 'Ritz Carlton', 'Shangri La', 'Park Hyatt', 'InterContinental'],
        locations: ['Australia', 'Singapore', 'Hong Kong', 'Thailand'],
        industries: ['Luxury Hotels', 'Resort Management', 'Hospitality', 'Spa & Wellness']
      }
    },
    {
      id: 'corporate-wellness',
      name: 'Corporate Wellbeing Directors',
      description: 'Google, Microsoft HR/Wellness VPs for speaking engagements',
      searchCriteria: {
        keywords: ['employee wellbeing', 'corporate wellness', 'workplace health', 'wellness speakers'],
        jobTitles: ['Director of Wellbeing', 'Head of Employee Wellness', 'VP People & Culture', 'Chief Wellbeing Officer'],
        companies: ['Google', 'Microsoft', 'Atlassian', 'Canva', 'Xero', 'REA Group', 'Seek', 'Telstra'],
        locations: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Australia'],
        industries: ['Technology', 'Financial Services', 'Telecommunications', 'Professional Services']
      }
    },
    {
      id: 'health-influencers',
      name: 'Health & Biohacking Influencers',
      description: 'Content creators and podcasters for book promotion',
      searchCriteria: {
        keywords: ['biohacking', 'health optimization', 'fitness influencer', 'wellness coach', 'health content creator'],
        jobTitles: ['Health Coach', 'Fitness Influencer', 'Wellness Entrepreneur', 'Biohacking Expert', 'Health Podcaster'],
        companies: ['Self-employed', 'Personal Brand', 'Coaching Business', 'Podcast Network'],
        locations: ['Australia', 'United States', 'United Kingdom', 'Global'],
        industries: ['Health & Wellness', 'Fitness', 'Content Creation', 'Personal Development']
      }
    }
  ]

  const runLeadGeneration = async () => {
    setIsRunning(true)
    setLeads([])

    try {
      // Get selected avatar's search criteria
      const selectedAvatarData = avatars.find(a => a.id === selectedAvatar)

      if (!selectedAvatarData) {
        throw new Error('Avatar not found')
      }

      console.log('🎯 Starting real lead generation for:', selectedAvatarData.name)
      console.log('📊 Search criteria:', selectedAvatarData.searchCriteria)

      // Call real Apify scraping
      const results = await processAndQualifyLeads({
        keywords: selectedAvatarData.searchCriteria.keywords,
        locations: selectedAvatarData.searchCriteria.locations,
        jobTitles: selectedAvatarData.searchCriteria.jobTitles,
        industries: selectedAvatarData.searchCriteria.industries,
        companyNames: selectedAvatarData.searchCriteria.companies,
        maxResults: 20 // Start with smaller batch
      })

      console.log('✅ Lead generation completed:', results.length, 'leads found')

      // Convert to display format
      const formattedLeads = results.map(lead => ({
        name: lead.name,
        title: lead.title,
        company: lead.company,
        location: lead.location,
        score: lead.qualificationScore || 0,
        tier: lead.qualificationTier || 'cold',
        linkedinUrl: lead.linkedinUrl,
        email: lead.email,
        industry: lead.industry
      }))

      setLeads(formattedLeads)

    } catch (error) {
      console.error('❌ Lead generation failed:', error)

      // Fallback to mock data if real scraping fails
      const mockLeads = [
        {
          name: 'Sarah Wilson (Demo)',
          title: 'Director of Guest Experience',
          company: 'Four Seasons Sydney',
          location: 'Sydney, Australia',
          score: 85,
          tier: 'hot',
          linkedinUrl: 'https://linkedin.com/in/demo',
          email: 'demo@example.com'
        },
        {
          name: 'Michael Chen (Demo)',
          title: 'VP of Wellness',
          company: 'Google Australia',
          location: 'Sydney, Australia',
          score: 75,
          tier: 'warm',
          linkedinUrl: 'https://linkedin.com/in/demo2',
          email: 'demo2@example.com'
        }
      ]

      setLeads(mockLeads)
      console.log('🎭 Using demo data due to error')
    } finally {
      setIsRunning(false)
    }
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
                <p className="text-sm text-gray-600">{avatar.description}</p>
              </div>
            ))}
          </div>

          <button
            onClick={runLeadGeneration}
            disabled={isRunning}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              isRunning
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isRunning ? 'Generating Leads...' : 'Start Lead Generation'}
          </button>
        </div>

        {/* Results */}
        {leads.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated Leads</h2>

            <div className="space-y-4">
              {leads.map((lead, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                      <p className="text-gray-600">{lead.title}</p>
                      <p className="text-gray-500">{lead.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Score: {lead.score}/100</div>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        lead.tier === 'hot' ? 'bg-red-100 text-red-800' :
                        lead.tier === 'warm' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {lead.tier === 'hot' ? '🔥' : lead.tier === 'warm' ? '🌟' : '❄️'} {lead.tier}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">📍 {lead.location}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {isRunning && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Scraping LinkedIn profiles and qualifying leads...</p>
          </div>
        )}
      </div>
    </div>
  )
}