import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Search,
  Target,
  Users,
  TrendingUp,
  Filter,
  Download,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Star,
  MapPin,
  Briefcase,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react'
import { processAndQualifyLeads, LeadData } from '../utils/apifyClient'
import { leadAvatars, getAvatarOptions, getAvatarById } from '../utils/leadAvatars'

export default function LeadGenerationPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [leads, setLeads] = useState<LeadData[]>([])
  const [selectedAvatar, setSelectedAvatar] = useState(leadAvatars[0]?.id || '')
  const [searchCriteria, setSearchCriteria] = useState({
    keywords: leadAvatars[0]?.keywords || [],
    locations: leadAvatars[0]?.locations || [],
    jobTitles: leadAvatars[0]?.jobTitles || [],
    industries: leadAvatars[0]?.industries || [],
    companyNames: leadAvatars[0]?.companies || [],
    maxResults: 50
  })
  const [stats, setStats] = useState({
    total: 0,
    hot: 0,
    warm: 0,
    cold: 0,
    processed: 0
  })

  // Handle avatar selection
  const handleAvatarChange = (avatarId: string) => {
    setSelectedAvatar(avatarId)
    const avatar = getAvatarById(avatarId)
    if (avatar) {
      setSearchCriteria({
        keywords: avatar.keywords,
        locations: avatar.locations,
        jobTitles: avatar.jobTitles,
        industries: avatar.industries,
        companyNames: avatar.companies,
        maxResults: 50
      })
    }
  }

  const runLeadGeneration = async () => {
    setIsRunning(true)
    setLeads([])
    setStats({ total: 0, hot: 0, warm: 0, cold: 0, processed: 0 })

    try {
      console.log('🚀 Starting lead generation with criteria:', searchCriteria)

      const results = await processAndQualifyLeads(searchCriteria)

      setLeads(results)

      const newStats = {
        total: results.length,
        hot: results.filter(l => l.qualificationTier === 'hot').length,
        warm: results.filter(l => l.qualificationTier === 'warm').length,
        cold: results.filter(l => l.qualificationTier === 'cold').length,
        processed: results.length
      }

      setStats(newStats)

      console.log('✅ Lead generation completed:', newStats)
    } catch (error) {
      console.error('❌ Lead generation failed:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'hot': return 'bg-red-100 text-red-800'
      case 'warm': return 'bg-yellow-100 text-yellow-800'
      case 'cold': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'hot': return '🔥'
      case 'warm': return '🌟'
      case 'cold': return '❄️'
      default: return '📊'
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Select Lead Avatar
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Choose Target Audience</label>
              <select
                value={selectedAvatar}
                onChange={(e) => handleAvatarChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {getAvatarOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">
                {getAvatarById(selectedAvatar)?.name}
              </h3>
              <p className="text-sm text-blue-700 mb-2">
                {getAvatarById(selectedAvatar)?.description}
              </p>
              <p className="text-xs text-blue-600">
                <strong>Goal:</strong> {getAvatarById(selectedAvatar)?.businessGoal}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                <strong>Expected:</strong> {getAvatarById(selectedAvatar)?.expectedConversion}
              </p>
            </div>
          </div>
        </div>

        {/* Search Criteria */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Search Criteria (Auto-filled from Avatar)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
              <textarea
                value={searchCriteria.keywords.join(', ')}
                onChange={(e) => setSearchCriteria({
                  ...searchCriteria,
                  keywords: e.target.value.split(', ').filter(k => k.trim())
                })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="biohacking, wellness, health optimization..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Titles</label>
              <textarea
                value={searchCriteria.jobTitles.join(', ')}
                onChange={(e) => setSearchCriteria({
                  ...searchCriteria,
                  jobTitles: e.target.value.split(', ').filter(t => t.trim())
                })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="CEO, Founder, Director, Manager..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Locations</label>
              <input
                type="text"
                value={searchCriteria.locations.join(', ')}
                onChange={(e) => setSearchCriteria({
                  ...searchCriteria,
                  locations: e.target.value.split(', ').filter(l => l.trim())
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Australia, Sydney, Melbourne..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Results</label>
              <input
                type="number"
                value={searchCriteria.maxResults}
                onChange={(e) => setSearchCriteria({
                  ...searchCriteria,
                  maxResults: parseInt(e.target.value) || 50
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="10"
                max="200"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-4">
            <button
              onClick={runLeadGeneration}
              disabled={isRunning}
              className={`flex items-center px-6 py-3 rounded-md font-medium transition-colors ${
                isRunning
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Generating Leads...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Lead Generation
                </>
              )}
            </button>

            {leads.length > 0 && (
              <button
                onClick={() => {
                  const csv = convertToCSV(leads)
                  downloadCSV(csv, 'qualified_leads.csv')
                }}
                className="flex items-center px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <Download className="w-5 h-5 mr-2" />
                Export CSV
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        {stats.total > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">🔥 Hot Leads</p>
                  <p className="text-2xl font-bold text-red-600">{stats.hot}</p>
                </div>
                <Target className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">🌟 Warm Leads</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.warm}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">❄️ Cold Leads</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.cold}</p>
                </div>
                <Search className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        )}

        {/* Leads Table */}
        {leads.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Qualified Leads</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lead
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-500">{lead.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{lead.company}</div>
                        <div className="text-sm text-gray-500">{lead.industry}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          {lead.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{lead.qualificationScore}/100</div>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${lead.qualificationScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierColor(lead.qualificationTier || '')}`}>
                          {getTierIcon(lead.qualificationTier || '')} {lead.qualificationTier}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {lead.linkedinUrl && (
                            <a
                              href={lead.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <button className="text-green-600 hover:text-green-900">
                            <Mail className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isRunning && leads.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate Leads</h3>
            <p className="text-gray-600">Configure your search criteria and click "Start Lead Generation" to begin</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Utility functions
const convertToCSV = (leads: LeadData[]) => {
  const headers = ['Name', 'Title', 'Company', 'Location', 'Email', 'Phone', 'LinkedIn', 'Score', 'Tier']
  const rows = leads.map(lead => [
    lead.name,
    lead.title,
    lead.company,
    lead.location,
    lead.email || '',
    lead.phone || '',
    lead.linkedinUrl,
    lead.qualificationScore,
    lead.qualificationTier
  ])

  return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
}

const downloadCSV = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}