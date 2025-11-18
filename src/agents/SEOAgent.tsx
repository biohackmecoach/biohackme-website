import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, CheckCircle, AlertTriangle, XCircle, Download, Globe, Target, Zap, TrendingUp } from 'lucide-react'
import { pagesSEO, validateSEO, generateSitemap, generateRobotsTxt, generateStructuredData, siteConfig } from '../utils/seo'
import KeywordAudit from './KeywordAudit'

interface SEOAuditResult {
  page: string
  title: string
  issues: string[]
  score: number
  status: 'excellent' | 'good' | 'needs-work' | 'poor'
}

export default function SEOAgent() {
  const [auditResults, setAuditResults] = useState<SEOAuditResult[]>([])
  const [isAuditing, setIsAuditing] = useState(false)
  const [overallScore, setOverallScore] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords'>('overview')

  const runSEOAudit = () => {
    setIsAuditing(true)
    
    // Simulate audit process
    setTimeout(() => {
      const results: SEOAuditResult[] = pagesSEO.map(page => {
        const issues = validateSEO(page)
        const score = Math.max(0, 100 - (issues.length * 15))
        
        let status: 'excellent' | 'good' | 'needs-work' | 'poor'
        if (score >= 90) status = 'excellent'
        else if (score >= 75) status = 'good'
        else if (score >= 60) status = 'needs-work'
        else status = 'poor'
        
        return {
          page: page.path,
          title: page.title,
          issues,
          score,
          status
        }
      })
      
      const avgScore = results.reduce((sum, result) => sum + result.score, 0) / results.length
      
      setAuditResults(results)
      setOverallScore(Math.round(avgScore))
      setIsAuditing(false)
    }, 2000)
  }

  const downloadSitemap = () => {
    const sitemap = generateSitemap()
    const blob = new Blob([sitemap], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sitemap.xml'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadRobots = () => {
    const robots = generateRobotsTxt()
    const blob = new Blob([robots], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'robots.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'good': return <CheckCircle className="w-5 h-5 text-blue-600" />
      case 'needs-work': return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'poor': return <XCircle className="w-5 h-5 text-red-600" />
      default: return <Search className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50'
      case 'good': return 'text-blue-600 bg-blue-50'
      case 'needs-work': return 'text-yellow-600 bg-yellow-50'
      case 'poor': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  useEffect(() => {
    // Auto-run audit on mount
    runSEOAudit()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-ice to-cloud p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Search className="w-16 h-16 text-ocean mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-montserrat font-light text-ocean mb-4">
              SEO Agent Dashboard
            </h1>
            <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
              Comprehensive SEO audit and optimization for biohackme.com.au
            </p>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-full p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-ocean to-sky text-white shadow-lg'
                  : 'text-ocean hover:bg-ocean/10'
              }`}
            >
              <Search className="w-4 h-4 inline mr-2" />
              SEO Overview
            </button>
            <button
              onClick={() => setActiveTab('keywords')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'keywords'
                  ? 'bg-gradient-to-r from-ocean to-sky text-white shadow-lg'
                  : 'text-ocean hover:bg-ocean/10'
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Keyword Strategy
            </button>
          </div>
        </motion.div>

        {activeTab === 'keywords' ? (
          <KeywordAudit />
        ) : (
          <>
        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    className={overallScore >= 80 ? 'text-green-500' : overallScore >= 60 ? 'text-yellow-500' : 'text-red-500'}
                    style={{
                      strokeDasharray: `${2 * Math.PI * 40}`,
                      strokeDashoffset: `${2 * Math.PI * 40 * (1 - overallScore / 100)}`
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-ocean">{overallScore}</div>
                    <div className="text-sm text-charcoal/60">Score</div>
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-montserrat font-light text-ocean mb-4">
              Overall SEO Health Score
            </h2>
            <p className="text-charcoal/70 mb-6">
              {overallScore >= 90 ? 'Excellent! Your site is well-optimized for search engines.' :
               overallScore >= 75 ? 'Good SEO foundation with room for improvement.' :
               overallScore >= 60 ? 'Several areas need attention for better rankings.' :
               'Significant SEO improvements required.'}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Globe className="w-8 h-8 text-ocean mx-auto mb-2" />
                <div className="font-medium text-charcoal">{pagesSEO.length} Pages Audited</div>
              </div>
              <div className="text-center">
                <Target className="w-8 h-8 text-sky mx-auto mb-2" />
                <div className="font-medium text-charcoal">
                  {auditResults.filter(r => r.status === 'excellent').length} Excellent Pages
                </div>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-medium text-charcoal">Ready for Launch</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={runSEOAudit}
                disabled={isAuditing}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  isAuditing
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-ocean to-sky text-white hover:shadow-lg'
                }`}
              >
                {isAuditing ? 'Auditing...' : 'Re-run Audit'}
              </button>
              
              <button
                onClick={downloadSitemap}
                className="px-6 py-3 rounded-full border-2 border-ocean text-ocean hover:bg-ocean hover:text-white transition-all duration-300"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Download Sitemap
              </button>
              
              <button
                onClick={downloadRobots}
                className="px-6 py-3 rounded-full border-2 border-sky text-sky hover:bg-sky hover:text-white transition-all duration-300"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Download Robots.txt
              </button>
            </div>
          </div>
        </motion.div>

        {/* Page Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-montserrat font-light text-ocean mb-8">
            Page-by-Page SEO Analysis
          </h2>

          <div className="space-y-6">
            {auditResults.map((result, index) => (
              <motion.div
                key={result.page}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {getStatusIcon(result.status)}
                      <h3 className="font-medium text-charcoal ml-2">
                        {result.page === '/' ? 'Homepage' : result.page}
                      </h3>
                      <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.status)}`}>
                        {result.score}/100
                      </span>
                    </div>
                    <p className="text-sm text-charcoal/70 mb-3">{result.title}</p>
                    
                    {result.issues.length > 0 ? (
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-red-600">Issues to Fix:</h4>
                        <ul className="text-sm text-red-600 space-y-1">
                          {result.issues.map((issue, issueIndex) => (
                            <li key={issueIndex} className="flex items-center">
                              <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-sm text-green-600 font-medium">✓ No issues found</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Domain Setup Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-ocean to-sky text-white rounded-3xl p-8 mt-8"
        >
          <h2 className="text-2xl font-montserrat font-light mb-6">
            Domain Configuration for Crazy Domains
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">DNS Settings Required:</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <strong>Type:</strong> CNAME<br/>
                  <strong>Name:</strong> www<br/>
                  <strong>Value:</strong> your-firebase-domain.web.app
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <strong>Type:</strong> A<br/>
                  <strong>Name:</strong> @<br/>
                  <strong>Value:</strong> 151.101.1.195, 151.101.65.195
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <strong>Type:</strong> TXT<br/>
                  <strong>Name:</strong> @<br/>
                  <strong>Value:</strong> [Google verification code]
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Next Steps:</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ Upload sitemap.xml to Firebase hosting</li>
                <li>✓ Upload robots.txt to Firebase hosting</li>
                <li>✓ Configure Google Search Console</li>
                <li>✓ Set up Google Analytics 4</li>
                <li>✓ Configure domain in Firebase console</li>
                <li>✓ Update DNS settings at Crazy Domains</li>
                <li>✓ Verify SSL certificate</li>
                <li>✓ Test all redirects work properly</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* SEO Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-ice/50 rounded-3xl p-8 mt-8"
        >
          <h2 className="text-2xl font-montserrat font-light text-ocean mb-6">
            Priority SEO Actions for Launch
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-medium text-ocean mb-4">High Priority</h3>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li>• Submit sitemap to Google Search Console</li>
                <li>• Optimize meta descriptions length</li>
                <li>• Add structured data to all pages</li>
                <li>• Configure 301 redirects</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-medium text-sky mb-4">Medium Priority</h3>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li>• Add alt text to all images</li>
                <li>• Optimize page loading speed</li>
                <li>• Create blog content strategy</li>
                <li>• Set up internal linking</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-medium text-green-600 mb-4">Ongoing</h3>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li>• Monitor Core Web Vitals</li>
                <li>• Track keyword rankings</li>
                <li>• Regular content updates</li>
                <li>• Build quality backlinks</li>
              </ul>
            </div>
          </div>
        </motion.div>
        </>
        )}
      </div>
    </div>
  )
}