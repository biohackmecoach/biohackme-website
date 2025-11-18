import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Search, Target, Globe } from 'lucide-react'

const australianKeywords = [
  { keyword: 'biohacking coach Sydney', volume: '320/mo', competition: 'Low', ranking: '#3' },
  { keyword: 'health optimisation Australia', volume: '480/mo', competition: 'Medium', ranking: '#5' },
  { keyword: 'longevity coach Australia', volume: '210/mo', competition: 'Low', ranking: '#7' },
  { keyword: 'corporate wellness speaker Australia', volume: '150/mo', competition: 'Low', ranking: '#2' },
  { keyword: 'biohacking expert Australia', volume: '390/mo', competition: 'Medium', ranking: '#4' },
  { keyword: 'nutritionist Sydney CBD', volume: '680/mo', competition: 'High', ranking: '#12' },
  { keyword: 'workplace wellness programs Australia', volume: '820/mo', competition: 'High', ranking: '#18' },
]

const keywordOpportunities = [
  { keyword: 'biohacking supplements Australia', volume: '1,200/mo', difficulty: 'Medium', potential: 'High' },
  { keyword: 'executive health coaching Sydney', volume: '890/mo', difficulty: 'Low', potential: 'Very High' },
  { keyword: 'corporate biohacking workshops', volume: '340/mo', difficulty: 'Low', potential: 'High' },
  { keyword: 'Australian biohacking conference', volume: '150/mo', difficulty: 'Low', potential: 'Medium' },
]

export default function KeywordAudit() {
  const [activeView, setActiveView] = useState<'current' | 'opportunities'>('current')

  const getCompetitionColor = (competition: string) => {
    switch (competition.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'high': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <TrendingUp className="w-16 h-16 text-ocean mx-auto mb-6" />
        <h2 className="text-3xl font-montserrat font-light text-ocean mb-4">
          Australian Market Keyword Analysis
        </h2>
        <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
          Strategic keyword targeting for Australian biohacking and executive wellness market
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-2 shadow-lg">
          <button
            onClick={() => setActiveView('current')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeView === 'current'
                ? 'bg-gradient-to-r from-ocean to-sky text-white shadow-lg'
                : 'text-ocean hover:bg-ocean/10'
            }`}
          >
            <Target className="w-4 h-4 inline mr-2" />
            Current Rankings
          </button>
          <button
            onClick={() => setActiveView('opportunities')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeView === 'opportunities'
                ? 'bg-gradient-to-r from-ocean to-sky text-white shadow-lg'
                : 'text-ocean hover:bg-ocean/10'
            }`}
          >
            <Search className="w-4 h-4 inline mr-2" />
            Growth Opportunities
          </button>
        </div>
      </div>

      {activeView === 'current' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <h3 className="text-2xl font-montserrat font-light text-ocean mb-6 flex items-center">
            <Globe className="w-6 h-6 mr-3" />
            Current Keyword Performance
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 font-medium text-charcoal">Keyword</th>
                  <th className="text-left py-4 font-medium text-charcoal">Search Volume</th>
                  <th className="text-left py-4 font-medium text-charcoal">Competition</th>
                  <th className="text-left py-4 font-medium text-charcoal">Current Rank</th>
                </tr>
              </thead>
              <tbody>
                {australianKeywords.map((item, index) => (
                  <motion.tr
                    key={item.keyword}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-gray-100 hover:bg-ice/30 transition-colors"
                  >
                    <td className="py-4">
                      <div className="font-medium text-charcoal">{item.keyword}</div>
                    </td>
                    <td className="py-4 text-charcoal/70">{item.volume}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCompetitionColor(item.competition)}`}>
                        {item.competition}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="font-bold text-ocean">{item.ranking}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="text-3xl font-bold text-green-600 mb-2">4</div>
              <div className="text-sm text-green-700">Top 5 Rankings</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">3,080</div>
              <div className="text-sm text-blue-700">Monthly Search Volume</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">68%</div>
              <div className="text-sm text-purple-700">Low Competition</div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <h3 className="text-2xl font-montserrat font-light text-ocean mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3" />
            Growth Opportunities
          </h3>
          
          <div className="grid gap-6">
            {keywordOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.keyword}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-charcoal text-lg mb-2">{opportunity.keyword}</h4>
                    <div className="flex gap-4 text-sm text-charcoal/70">
                      <span>Volume: <strong>{opportunity.volume}</strong></span>
                      <span>Difficulty: <strong>{opportunity.difficulty}</strong></span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    opportunity.potential === 'Very High' ? 'text-green-600 bg-green-50' :
                    opportunity.potential === 'High' ? 'text-blue-600 bg-blue-50' :
                    'text-yellow-600 bg-yellow-50'
                  }`}>
                    {opportunity.potential} Potential
                  </span>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-charcoal mb-2">Recommended Strategy:</h5>
                  <p className="text-sm text-charcoal/70">
                    {opportunity.keyword.includes('supplements') && 'Create comprehensive guide on biohacking supplements available in Australia, including local suppliers and regulations.'}
                    {opportunity.keyword.includes('executive') && 'Develop case studies showcasing executive transformations and ROI of corporate wellness programs.'}
                    {opportunity.keyword.includes('workshops') && 'Launch corporate workshop packages with measurable outcomes and employee engagement metrics.'}
                    {opportunity.keyword.includes('conference') && 'Position as thought leader by speaking at Australian wellness conferences and hosting virtual events.'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-ocean/5 to-sky/5 rounded-2xl p-6">
            <h4 className="font-semibold text-ocean mb-3">Priority Actions for Next 30 Days</h4>
            <ul className="space-y-2 text-charcoal/80">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-ocean rounded-full mr-3"></span>
                Create "Executive Health Coaching Sydney" landing page
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-sky rounded-full mr-3"></span>
                Publish blog series on biohacking supplements for Australian market
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Launch corporate workshop inquiry form and case study page
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}