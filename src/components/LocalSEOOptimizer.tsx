import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Star,
  Users,
  Search,
  Globe,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Building,
  Phone,
  Mail,
  Calendar,
  Award,
  Target
} from 'lucide-react'

interface LocalSEOMetric {
  name: string
  current: number | string
  target: number | string
  status: 'excellent' | 'good' | 'needs-work' | 'poor'
  impact: 'critical' | 'high' | 'medium' | 'low'
  recommendation: string
}

interface LocationTarget {
  city: string
  state: string
  population: string
  marketSize: string
  competition: 'low' | 'medium' | 'high'
  opportunity: number
  keywords: string[]
}

interface ReviewPlatform {
  platform: string
  rating: number
  reviewCount: number
  importance: 'critical' | 'high' | 'medium'
  status: 'verified' | 'claimed' | 'unclaimed'
  url?: string
}

export default function LocalSEOOptimizer() {
  const [selectedLocation, setSelectedLocation] = useState<string>('Sydney')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [overallLocalScore, setOverallLocalScore] = useState(0)

  // Australian market targeting
  const locationTargets: LocationTarget[] = [
    {
      city: 'Sydney',
      state: 'NSW',
      population: '5.3M',
      marketSize: 'Very High',
      competition: 'high',
      opportunity: 85,
      keywords: [
        'biohacking coach Sydney',
        'health optimization Sydney',
        'nutritionist Sydney',
        'wellness coach Sydney',
        'biohacking expert Sydney'
      ]
    },
    {
      city: 'Melbourne',
      state: 'VIC',
      population: '5.1M',
      marketSize: 'Very High',
      competition: 'high',
      opportunity: 80,
      keywords: [
        'biohacking Melbourne',
        'health coach Melbourne',
        'nutritionist Melbourne',
        'wellness expert Melbourne'
      ]
    },
    {
      city: 'Brisbane',
      state: 'QLD',
      population: '2.6M',
      marketSize: 'High',
      competition: 'medium',
      opportunity: 90,
      keywords: [
        'biohacking Brisbane',
        'health optimization Brisbane',
        'wellness coach Queensland'
      ]
    },
    {
      city: 'Perth',
      state: 'WA',
      population: '2.1M',
      marketSize: 'Medium',
      competition: 'low',
      opportunity: 95,
      keywords: [
        'biohacking Perth',
        'health coach Perth',
        'nutritionist Western Australia'
      ]
    },
    {
      city: 'Adelaide',
      state: 'SA',
      population: '1.4M',
      marketSize: 'Medium',
      competition: 'low',
      opportunity: 92,
      keywords: [
        'biohacking Adelaide',
        'health optimization South Australia',
        'wellness coach Adelaide'
      ]
    }
  ]

  const localSEOMetrics: LocalSEOMetric[] = [
    {
      name: 'Google My Business Optimization',
      current: 'Unclaimed',
      target: 'Fully Optimized',
      status: 'poor',
      impact: 'critical',
      recommendation: 'Claim and fully optimize Google My Business profile with photos, hours, and services'
    },
    {
      name: 'Local Citation Consistency',
      current: '45%',
      target: '95%',
      status: 'poor',
      impact: 'critical',
      recommendation: 'Ensure NAP (Name, Address, Phone) consistency across all directories'
    },
    {
      name: 'Local Review Rating',
      current: '4.8',
      target: '4.9',
      status: 'excellent',
      impact: 'high',
      recommendation: 'Continue excellent service and encourage more reviews'
    },
    {
      name: 'Local Review Count',
      current: 24,
      target: 50,
      status: 'needs-work',
      impact: 'high',
      recommendation: 'Implement systematic review generation strategy'
    },
    {
      name: 'Local Keyword Rankings',
      current: '12th',
      target: '3rd',
      status: 'needs-work',
      impact: 'critical',
      recommendation: 'Optimize for "biohacking coach Sydney" and location-specific terms'
    },
    {
      name: 'Local Schema Markup',
      current: 'Basic',
      target: 'Comprehensive',
      status: 'needs-work',
      impact: 'high',
      recommendation: 'Implement full LocalBusiness schema with reviews and services'
    },
    {
      name: 'Local Directory Presence',
      current: 8,
      target: 25,
      status: 'poor',
      impact: 'high',
      recommendation: 'Submit to all major Australian health and business directories'
    },
    {
      name: 'Mobile Local Search Performance',
      current: '65%',
      target: '90%',
      status: 'needs-work',
      impact: 'critical',
      recommendation: 'Optimize for "near me" searches and mobile local intent'
    }
  ]

  const reviewPlatforms: ReviewPlatform[] = [
    {
      platform: 'Google My Business',
      rating: 5.0,
      reviewCount: 24,
      importance: 'critical',
      status: 'unclaimed',
      url: 'https://business.google.com/'
    },
    {
      platform: 'Facebook',
      rating: 4.9,
      reviewCount: 18,
      importance: 'high',
      status: 'verified',
      url: 'https://www.facebook.com/profile.php?id=61556971331791'
    },
    {
      platform: 'True Local',
      rating: 0,
      reviewCount: 0,
      importance: 'high',
      status: 'unclaimed',
      url: 'https://www.truelocal.com.au/'
    },
    {
      platform: 'Yellow Pages',
      rating: 0,
      reviewCount: 0,
      importance: 'medium',
      status: 'unclaimed',
      url: 'https://www.yellowpages.com.au/'
    },
    {
      platform: 'HotFrog',
      rating: 0,
      reviewCount: 0,
      importance: 'medium',
      status: 'unclaimed',
      url: 'https://www.hotfrog.com.au/'
    },
    {
      platform: 'Yelp Australia',
      rating: 0,
      reviewCount: 0,
      importance: 'medium',
      status: 'unclaimed',
      url: 'https://www.yelp.com.au/'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'good': return <CheckCircle className="w-5 h-5 text-blue-600" />
      case 'needs-work': return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'poor': return <AlertTriangle className="w-5 h-5 text-red-600" />
      default: return <Search className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200'
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'needs-work': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'poor': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'low': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'high': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-700 bg-red-100'
      case 'high': return 'text-orange-700 bg-orange-100'
      case 'medium': return 'text-yellow-700 bg-yellow-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const runLocalAnalysis = () => {
    setIsAnalyzing(true)

    setTimeout(() => {
      const avgScore = localSEOMetrics.reduce((sum, metric) => {
        const scoreMap = { excellent: 95, good: 80, 'needs-work': 65, poor: 40 }
        return sum + scoreMap[metric.status]
      }, 0) / localSEOMetrics.length

      setOverallLocalScore(Math.round(avgScore))
      setIsAnalyzing(false)
    }, 2000)
  }

  useEffect(() => {
    runLocalAnalysis()
  }, [])

  const criticalIssues = localSEOMetrics.filter(m => m.impact === 'critical' && m.status === 'poor')
  const unclaimedPlatforms = reviewPlatforms.filter(p => p.status === 'unclaimed')
  const selectedLocationData = locationTargets.find(l => l.city === selectedLocation)

  return (
    <div className="space-y-8">
      {/* Local SEO Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
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
                  className={overallLocalScore >= 80 ? 'text-green-500' : overallLocalScore >= 60 ? 'text-yellow-500' : 'text-red-500'}
                  style={{
                    strokeDasharray: `${2 * Math.PI * 40}`,
                    strokeDashoffset: `${2 * Math.PI * 40 * (1 - overallLocalScore / 100)}`
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-ocean">{overallLocalScore}</div>
                  <div className="text-sm text-charcoal/60">Local SEO</div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-montserrat font-light text-ocean mb-4">
            Local SEO for Australian Market
          </h2>
          <p className="text-charcoal/70 mb-6">
            Dominating "near me" searches and local biohacking market across Australia
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-ocean mx-auto mb-2" />
              <div className="font-medium text-charcoal">Target Cities</div>
              <div className="text-sm text-green-600">5 Major Markets</div>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="font-medium text-charcoal">Review Rating</div>
              <div className="text-sm text-green-600">4.8/5 Stars</div>
            </div>
            <div className="text-center">
              <Building className="w-8 h-8 text-sky mx-auto mb-2" />
              <div className="font-medium text-charcoal">GMB Status</div>
              <div className="text-sm text-red-600">Unclaimed Profile</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="font-medium text-charcoal">Local Opportunity</div>
              <div className="text-sm text-green-600">High Growth Potential</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Australian Market Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-montserrat font-light text-ocean">
            Australian Market Opportunities
          </h3>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
          >
            {locationTargets.map(location => (
              <option key={location.city} value={location.city}>
                {location.city}, {location.state}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {locationTargets.map((location, index) => (
            <motion.div
              key={location.city}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                selectedLocation === location.city
                  ? 'border-ocean bg-ocean/5'
                  : 'border-gray-200 hover:border-ocean/50'
              }`}
              onClick={() => setSelectedLocation(location.city)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{location.city}</h4>
                <span className={`text-xs px-2 py-1 rounded ${getCompetitionColor(location.competition)}`}>
                  {location.competition}
                </span>
              </div>
              <div className="text-xs text-charcoal/70 mb-1">{location.population} people</div>
              <div className="text-xs font-medium text-charcoal mb-2">{location.marketSize} market</div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">{location.opportunity}%</div>
                <div className="text-xs text-charcoal/70">opportunity</div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedLocationData && (
          <div className="bg-gradient-to-r from-ocean/10 to-sky/10 rounded-xl p-6">
            <h4 className="font-medium text-ocean mb-4">
              {selectedLocationData.city} Market Analysis
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-charcoal mb-2">Target Keywords</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedLocationData.keywords.map(keyword => (
                    <span
                      key={keyword}
                      className="px-3 py-1 bg-white rounded-full text-sm text-charcoal border"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-charcoal mb-2">Market Insights</h5>
                <ul className="text-sm text-charcoal/70 space-y-1">
                  <li>• Population: {selectedLocationData.population}</li>
                  <li>• Market Size: {selectedLocationData.marketSize}</li>
                  <li>• Competition: {selectedLocationData.competition}</li>
                  <li>• Opportunity Score: {selectedLocationData.opportunity}%</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Local SEO Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <h3 className="text-xl font-montserrat font-light text-ocean mb-6">
          Local SEO Performance Analysis
        </h3>

        <div className="space-y-4">
          {localSEOMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`border rounded-xl p-6 ${getStatusColor(metric.status)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {getStatusIcon(metric.status)}
                  <h4 className="font-medium ml-2">{metric.name}</h4>
                  <span className={`ml-3 px-2 py-1 rounded text-xs ${getImportanceColor(metric.impact)}`}>
                    {metric.impact}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg">{metric.current}</div>
                  <div className="text-sm opacity-70">Target: {metric.target}</div>
                </div>
              </div>

              <div className="bg-white/50 rounded-lg p-3 text-sm">
                <strong>Action:</strong> {metric.recommendation}
              </div>
            </motion.div>
          ))}
        </div>

        {criticalIssues.length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
            <h4 className="font-medium text-red-700 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Critical Local SEO Issues
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-charcoal mb-2">Immediate Actions Required</h5>
                <ul className="text-sm text-charcoal/70 space-y-1">
                  {criticalIssues.map(issue => (
                    <li key={issue.name}>• {issue.name}: {issue.recommendation}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-charcoal mb-2">Business Impact</h5>
                <ul className="text-sm text-red-600 space-y-1">
                  <li>• Missing 70% of local search traffic</li>
                  <li>• Competitors dominating "near me" searches</li>
                  <li>• Lost opportunities in high-value markets</li>
                  <li>• Poor local ranking visibility</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Review Platform Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <h3 className="text-xl font-montserrat font-light text-ocean mb-6">
          Review Platform Optimization
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {reviewPlatforms.map((platform, index) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`border rounded-xl p-4 ${
                platform.status === 'unclaimed'
                  ? 'border-red-200 bg-red-50'
                  : platform.status === 'claimed'
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-green-200 bg-green-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-sm">{platform.platform}</h4>
                <span className={`text-xs px-2 py-1 rounded ${getImportanceColor(platform.importance)}`}>
                  {platform.importance}
                </span>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-charcoal/70">Rating:</span>
                  <div className="flex items-center">
                    {platform.rating > 0 ? (
                      <>
                        <Star className="w-3 h-3 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{platform.rating}/5</span>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400">Not rated</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-charcoal/70">Reviews:</span>
                  <span className="text-sm font-medium">{platform.reviewCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-charcoal/70">Status:</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    platform.status === 'verified' ? 'bg-green-100 text-green-700' :
                    platform.status === 'claimed' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {platform.status}
                  </span>
                </div>
              </div>

              {platform.status === 'unclaimed' && (
                <button
                  className="w-full px-3 py-2 bg-ocean text-white text-xs rounded-lg hover:bg-ocean/90 transition-colors"
                  onClick={() => window.open(platform.url, '_blank')}
                >
                  Claim Profile
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
          <h4 className="font-medium text-yellow-700 mb-4">Review Strategy Implementation</h4>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h5 className="font-medium text-charcoal mb-2">Immediate Actions</h5>
              <ul className="space-y-1 text-charcoal/70">
                <li>• Claim Google My Business profile</li>
                <li>• Set up True Local business listing</li>
                <li>• Register on Yellow Pages Australia</li>
                <li>• Create HotFrog business profile</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-charcoal mb-2">Review Generation</h5>
              <ul className="space-y-1 text-charcoal/70">
                <li>• Email follow-up automation</li>
                <li>• Post-session review requests</li>
                <li>• Social media review campaigns</li>
                <li>• Incentivized review programs</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-charcoal mb-2">Expected Results</h5>
              <ul className="space-y-1 text-green-600">
                <li>• 50+ reviews within 3 months</li>
                <li>• Improved local search rankings</li>
                <li>• Higher trust and credibility</li>
                <li>• Increased conversion rates</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Implementation Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <h3 className="text-xl font-montserrat font-light text-ocean mb-6">
          Local SEO Implementation Roadmap
        </h3>

        <div className="space-y-6">
          <div className="border-l-4 border-red-500 pl-6">
            <h4 className="font-medium text-red-700 mb-2">Week 1 - Critical Foundation</h4>
            <ul className="text-sm text-charcoal/70 space-y-1">
              <li>• Claim and optimize Google My Business profile</li>
              <li>• Implement comprehensive LocalBusiness schema markup</li>
              <li>• Create consistent NAP across all platforms</li>
              <li>• Set up location-specific landing pages</li>
            </ul>
          </div>

          <div className="border-l-4 border-yellow-500 pl-6">
            <h4 className="font-medium text-yellow-700 mb-2">Week 2-3 - Directory Expansion</h4>
            <ul className="text-sm text-charcoal/70 space-y-1">
              <li>• Submit to all major Australian directories</li>
              <li>• Create location-specific content for each target city</li>
              <li>• Optimize for "near me" search terms</li>
              <li>• Implement review generation system</li>
            </ul>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h4 className="font-medium text-green-700 mb-2">Month 2-3 - Content & Authority</h4>
            <ul className="text-sm text-charcoal/70 space-y-1">
              <li>• Create location-specific blog content</li>
              <li>• Build local citations and partnerships</li>
              <li>• Optimize for mobile local search</li>
              <li>• Monitor and improve local rankings</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
          <h4 className="font-medium text-green-700 mb-4">Expected Local SEO Results</h4>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">Top 3</div>
              <div className="text-sm text-charcoal/70">Local Rankings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">300%</div>
              <div className="text-sm text-charcoal/70">Local Traffic Increase</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">50+</div>
              <div className="text-sm text-charcoal/70">Positive Reviews</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">90%</div>
              <div className="text-sm text-charcoal/70">Local SEO Score</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}