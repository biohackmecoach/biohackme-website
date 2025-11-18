import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, TrendingUp, AlertTriangle, CheckCircle, Target, Zap, Award, ArrowRight } from 'lucide-react'
import { targetKeywords, getCriticalKeywords, getHighOpportunityKeywords, pageKeywordAudits, KeywordData } from '../utils/keywordAudit'

export default function KeywordAudit() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null)
  
  const criticalKeywords = getCriticalKeywords()
  const highOpportunityKeywords = getHighOpportunityKeywords()
  
  const getKeywordStatusColor = (usage: string) => {
    switch (usage) {
      case 'Missing': return 'text-red-600 bg-red-50'
      case 'Under-optimized': return 'text-yellow-600 bg-yellow-50'
      case 'Good': return 'text-green-600 bg-green-50'
      case 'Over-optimized': return 'text-orange-600 bg-orange-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-600 bg-red-100'
      case 'High': return 'text-orange-600 bg-orange-100'
      case 'Medium': return 'text-blue-600 bg-blue-100'
      case 'Low': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'Medium': return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'Hard': return <Target className="w-4 h-4 text-red-600" />
      default: return <Search className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <TrendingUp className="w-12 h-12 text-ocean mx-auto mb-4" />
        <h2 className="text-3xl font-montserrat font-light text-ocean mb-4">
          Keyword Strategy Audit
        </h2>
        <p className="text-charcoal/80 max-w-3xl mx-auto">
          Strategic keyword analysis for dominating Australian biohacking searches
        </p>
      </div>

      {/* Critical Keywords Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-xl"
      >
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-medium text-red-800 mb-2">
              Critical Keywords Missing ({criticalKeywords.length})
            </h3>
            <p className="text-red-700 mb-4">
              These high-priority keywords could significantly boost your rankings if added:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {criticalKeywords.slice(0, 6).map((keyword, index) => (
                <div key={index} className="flex items-center bg-white/50 rounded-lg p-3">
                  <TrendingUp className="w-4 h-4 text-red-600 mr-2" />
                  <span className="font-medium text-red-800">{keyword.keyword}</span>
                  <span className="ml-auto text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                    {keyword.searchVolume} Volume
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* High Opportunity Keywords */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-6 rounded-xl"
      >
        <div className="flex items-start">
          <Zap className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-medium text-green-800 mb-2">
              High Opportunity Keywords ({highOpportunityKeywords.length})
            </h3>
            <p className="text-green-700 mb-4">
              Easy-to-rank keywords with high business value - quick wins!
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {highOpportunityKeywords.slice(0, 4).map((keyword, index) => (
                <div key={index} className="flex items-center bg-white/50 rounded-lg p-3">
                  <Award className="w-4 h-4 text-green-600 mr-2" />
                  <span className="font-medium text-green-800">{keyword.keyword}</span>
                  <span className="ml-auto text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Easy
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* All Keywords Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-2xl font-montserrat font-light text-ocean mb-2">
            Complete Keyword Analysis
          </h3>
          <p className="text-charcoal/70">
            Strategic keyword opportunities across all pages ({targetKeywords.length} keywords analyzed)
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-ice/30">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-ocean">Keyword</th>
                <th className="text-left py-4 px-6 font-medium text-ocean">Volume</th>
                <th className="text-left py-4 px-6 font-medium text-ocean">Difficulty</th>
                <th className="text-left py-4 px-6 font-medium text-ocean">Priority</th>
                <th className="text-left py-4 px-6 font-medium text-ocean">Status</th>
                <th className="text-left py-4 px-6 font-medium text-ocean">Business Value</th>
                <th className="text-left py-4 px-6 font-medium text-ocean">Target Pages</th>
              </tr>
            </thead>
            <tbody>
              {targetKeywords
                .sort((a, b) => {
                  const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 }
                  return priorityOrder[b.priority] - priorityOrder[a.priority]
                })
                .map((keyword, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-ice/10 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-medium text-charcoal">{keyword.keyword}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      keyword.searchVolume === 'High' ? 'text-green-800 bg-green-100' :
                      keyword.searchVolume === 'Medium' ? 'text-yellow-800 bg-yellow-100' :
                      'text-gray-800 bg-gray-100'
                    }`}>
                      {keyword.searchVolume}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      {getDifficultyIcon(keyword.difficulty)}
                      <span className="ml-2 text-sm">{keyword.difficulty}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(keyword.priority)}`}>
                      {keyword.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getKeywordStatusColor(keyword.currentUsage)}`}>
                      {keyword.currentUsage}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      keyword.businessValue === 'High' ? 'text-purple-800 bg-purple-100' :
                      keyword.businessValue === 'Medium' ? 'text-blue-800 bg-blue-100' :
                      'text-gray-800 bg-gray-100'
                    }`}>
                      {keyword.businessValue}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {keyword.recommendedPages.slice(0, 3).map((page, pageIndex) => (
                        <span key={pageIndex} className="inline-flex items-center px-2 py-1 rounded text-xs bg-sky/10 text-sky font-medium">
                          {page === '/' ? 'Home' : page.replace('/', '')}
                        </span>
                      ))}
                      {keyword.recommendedPages.length > 3 && (
                        <span className="text-xs text-charcoal/60">+{keyword.recommendedPages.length - 3}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Page-Specific Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-gradient-to-br from-ice/50 to-cloud/50 rounded-3xl p-8"
      >
        <h3 className="text-2xl font-montserrat font-light text-ocean mb-6">
          Page-Specific Keyword Recommendations
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageKeywordAudits.map((audit, index) => (
            <motion.div
              key={audit.pagePath}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-ocean">{audit.pageTitle}</h4>
                <span className="text-xs text-charcoal/60 bg-gray-100 px-2 py-1 rounded-full">
                  {audit.missingKeywords.length} opportunities
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                {audit.recommendations.slice(0, 3).map((rec, recIndex) => (
                  <div key={recIndex} className="flex items-start text-sm">
                    <ArrowRight className="w-4 h-4 text-sky mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/80">{rec}</span>
                  </div>
                ))}
              </div>
              
              {audit.missingKeywords.length > 0 && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-charcoal/60 mb-2">Priority missing keywords:</p>
                  <div className="space-y-1">
                    {audit.missingKeywords.slice(0, 2).map((keyword, keywordIndex) => (
                      <div key={keywordIndex} className="text-xs">
                        <span className="font-medium text-charcoal">{keyword.keyword}</span>
                        <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${getPriorityColor(keyword.priority)}`}>
                          {keyword.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Plan */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-gradient-to-r from-ocean to-sky text-white rounded-3xl p-8"
      >
        <h3 className="text-2xl font-montserrat font-light mb-6">
          Immediate Action Plan
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                1
              </div>
              <h4 className="font-medium">Critical Keywords First</h4>
            </div>
            <ul className="space-y-2 text-sm text-white/90">
              <li>• Add "biohacking coach Sydney" to homepage hero</li>
              <li>• Include "health optimization Australia" in service descriptions</li>
              <li>• Mention "longevity coach Australia" in about section</li>
            </ul>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                2
              </div>
              <h4 className="font-medium">Quick Wins</h4>
            </div>
            <ul className="space-y-2 text-sm text-white/90">
              <li>• Target "women's health coach Australia"</li>
              <li>• Add "holistic nutritionist Australia"</li>
              <li>• Include "personalized health coaching"</li>
            </ul>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                3
              </div>
              <h4 className="font-medium">Content Strategy</h4>
            </div>
            <ul className="space-y-2 text-sm text-white/90">
              <li>• Create blog posts for long-tail keywords</li>
              <li>• Add location pages for Melbourne/Brisbane</li>
              <li>• Develop women's health content series</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}