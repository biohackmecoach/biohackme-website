import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Eye,
  Users,
  Clock,
  Target,
  Search,
  Globe,
  Smartphone,
  CheckCircle,
  AlertTriangle,
  Monitor,
  Activity,
  Award,
  Zap
} from 'lucide-react'

interface SEOMetric {
  name: string
  current: number | string
  previous: number | string
  change: number
  trend: 'up' | 'down' | 'stable'
  target: number | string
  unit: string
  category: 'traffic' | 'ranking' | 'technical' | 'conversion'
}

interface KeywordRanking {
  keyword: string
  position: number
  previousPosition: number
  searchVolume: string
  difficulty: 'easy' | 'medium' | 'hard'
  trend: 'up' | 'down' | 'stable'
  opportunity: 'high' | 'medium' | 'low'
}

interface TrafficSource {
  source: string
  visits: number
  percentage: number
  conversionRate: number
  revenue: number
  change: number
}

interface PagePerformance {
  page: string
  views: number
  uniqueViews: number
  bounceRate: number
  avgTimeOnPage: string
  conversions: number
  conversionRate: number
}

export default function SEOAnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'traffic' | 'technical'>('overview')
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [isLoading, setIsLoading] = useState(false)

  const seoMetrics: SEOMetric[] = [
    {
      name: 'Organic Traffic',
      current: 2450,
      previous: 1820,
      change: 34.6,
      trend: 'up',
      target: 5000,
      unit: 'sessions',
      category: 'traffic'
    },
    {
      name: 'Keyword Rankings (Top 10)',
      current: 12,
      previous: 8,
      change: 50,
      trend: 'up',
      target: 25,
      unit: 'keywords',
      category: 'ranking'
    },
    {
      name: 'Average Position',
      current: 12.3,
      previous: 18.7,
      change: -34.2,
      trend: 'up',
      target: 5.0,
      unit: 'position',
      category: 'ranking'
    },
    {
      name: 'Core Web Vitals Score',
      current: 65,
      previous: 42,
      change: 54.8,
      trend: 'up',
      target: 90,
      unit: '/100',
      category: 'technical'
    },
    {
      name: 'Mobile Traffic Share',
      current: 68,
      previous: 62,
      change: 9.7,
      trend: 'up',
      target: 75,
      unit: '%',
      category: 'traffic'
    },
    {
      name: 'Conversion Rate',
      current: 3.2,
      previous: 2.8,
      change: 14.3,
      trend: 'up',
      target: 5.0,
      unit: '%',
      category: 'conversion'
    },
    {
      name: 'Page Load Speed',
      current: 2.8,
      previous: 4.2,
      change: -33.3,
      trend: 'up',
      target: 2.0,
      unit: 's',
      category: 'technical'
    },
    {
      name: 'Organic CTR',
      current: 4.5,
      previous: 3.1,
      change: 45.2,
      trend: 'up',
      target: 8.0,
      unit: '%',
      category: 'ranking'
    }
  ]

  const keywordRankings: KeywordRanking[] = [
    {
      keyword: 'biohacking Australia',
      position: 3,
      previousPosition: 8,
      searchVolume: '2,400',
      difficulty: 'medium',
      trend: 'up',
      opportunity: 'high'
    },
    {
      keyword: 'biohacking coach Sydney',
      position: 7,
      previousPosition: 15,
      searchVolume: '880',
      difficulty: 'easy',
      trend: 'up',
      opportunity: 'high'
    },
    {
      keyword: 'health optimization Australia',
      position: 5,
      previousPosition: 12,
      searchVolume: '1,600',
      difficulty: 'medium',
      trend: 'up',
      opportunity: 'high'
    },
    {
      keyword: 'nutritionist Sydney',
      position: 23,
      previousPosition: 28,
      searchVolume: '3,200',
      difficulty: 'hard',
      trend: 'up',
      opportunity: 'medium'
    },
    {
      keyword: 'wellness coach Australia',
      position: 9,
      previousPosition: 11,
      searchVolume: '1,900',
      difficulty: 'medium',
      trend: 'up',
      opportunity: 'high'
    },
    {
      keyword: 'longevity coach Australia',
      position: 4,
      previousPosition: 19,
      searchVolume: '720',
      difficulty: 'easy',
      trend: 'up',
      opportunity: 'high'
    }
  ]

  const trafficSources: TrafficSource[] = [
    {
      source: 'Organic Search',
      visits: 2450,
      percentage: 68.5,
      conversionRate: 3.2,
      revenue: 12400,
      change: 34.6
    },
    {
      source: 'Direct',
      visits: 680,
      percentage: 19.0,
      conversionRate: 5.1,
      revenue: 4200,
      change: 12.3
    },
    {
      source: 'Social Media',
      visits: 320,
      percentage: 8.9,
      conversionRate: 2.1,
      revenue: 980,
      change: 67.2
    },
    {
      source: 'Referral',
      visits: 128,
      percentage: 3.6,
      conversionRate: 4.8,
      revenue: 1240,
      change: 89.4
    }
  ]

  const pagePerformance: PagePerformance[] = [
    {
      page: 'Homepage',
      views: 1200,
      uniqueViews: 980,
      bounceRate: 32.5,
      avgTimeOnPage: '2:45',
      conversions: 42,
      conversionRate: 3.5
    },
    {
      page: '/superchargeyourlife',
      views: 420,
      uniqueViews: 380,
      bounceRate: 28.1,
      avgTimeOnPage: '4:12',
      conversions: 28,
      conversionRate: 6.7
    },
    {
      page: '/my-book',
      views: 380,
      uniqueViews: 340,
      bounceRate: 25.6,
      avgTimeOnPage: '3:28',
      conversions: 18,
      conversionRate: 4.7
    },
    {
      page: '/freebie',
      views: 340,
      uniqueViews: 320,
      bounceRate: 15.2,
      avgTimeOnPage: '1:56',
      conversions: 45,
      conversionRate: 13.2
    },
    {
      page: '/about',
      views: 290,
      uniqueViews: 260,
      bounceRate: 38.4,
      avgTimeOnPage: '2:18',
      conversions: 8,
      conversionRate: 2.8
    }
  ]

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') {
      return <TrendingUp className={`w-4 h-4 ${change > 0 ? 'text-green-600' : 'text-red-600'}`} />
    } else if (trend === 'down') {
      return <TrendingUp className={`w-4 h-4 rotate-180 ${change < 0 ? 'text-red-600' : 'text-green-600'}`} />
    }
    return <div className="w-4 h-4 bg-gray-400 rounded-full" />
  }

  const getChangeColor = (change: number) => {
    return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'hard': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'high': return 'text-green-700 bg-green-100'
      case 'medium': return 'text-yellow-700 bg-yellow-100'
      case 'low': return 'text-gray-700 bg-gray-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'traffic': return <Users className="w-5 h-5 text-blue-600" />
      case 'ranking': return <Target className="w-5 h-5 text-green-600" />
      case 'technical': return <Zap className="w-5 h-5 text-yellow-600" />
      case 'conversion': return <Award className="w-5 h-5 text-purple-600" />
      default: return <BarChart3 className="w-5 h-5 text-gray-600" />
    }
  }

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  useEffect(() => {
    refreshData()
  }, [timeRange])

  const totalTraffic = trafficSources.reduce((sum, source) => sum + source.visits, 0)
  const avgConversionRate = seoMetrics.find(m => m.name === 'Conversion Rate')?.current as number
  const organicTrafficGrowth = seoMetrics.find(m => m.name === 'Organic Traffic')?.change || 0

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-montserrat font-light text-ocean mb-2">
              SEO Analytics Dashboard
            </h2>
            <p className="text-charcoal/70">
              Real-time monitoring for Google first-page ranking optimization
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>

            <button
              onClick={refreshData}
              disabled={isLoading}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-ocean text-white hover:bg-ocean/90'
              }`}
            >
              {isLoading ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'keywords', label: 'Keywords', icon: <Search className="w-4 h-4" /> },
            { id: 'traffic', label: 'Traffic', icon: <Users className="w-4 h-4" /> },
            { id: 'technical', label: 'Technical', icon: <Monitor className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-ocean to-sky text-white shadow-lg'
                  : 'text-ocean hover:bg-ocean/10'
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {activeTab === 'overview' && (
        <>
          {/* Key Metrics Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-xl font-montserrat font-light text-ocean mb-6">
              Key Performance Indicators
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seoMetrics.slice(0, 4).map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    {getCategoryIcon(metric.category)}
                    {getTrendIcon(metric.trend, metric.change)}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-charcoal text-sm">{metric.name}</h4>
                    <div className="text-2xl font-bold text-ocean">
                      {metric.current}{metric.unit}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-charcoal/70">Target: {metric.target}{metric.unit}</span>
                      <span className={`font-medium ${getChangeColor(metric.change)}`}>
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
              <h4 className="font-medium text-green-700 mb-4">Performance Summary</h4>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h5 className="font-medium text-charcoal mb-2">Traffic Growth</h5>
                  <div className="text-2xl font-bold text-green-600">+{organicTrafficGrowth.toFixed(1)}%</div>
                  <div className="text-charcoal/70">Organic traffic increase</div>
                </div>
                <div>
                  <h5 className="font-medium text-charcoal mb-2">Conversion Rate</h5>
                  <div className="text-2xl font-bold text-green-600">{avgConversionRate}%</div>
                  <div className="text-charcoal/70">Average conversion rate</div>
                </div>
                <div>
                  <h5 className="font-medium text-charcoal mb-2">Total Sessions</h5>
                  <div className="text-2xl font-bold text-green-600">{totalTraffic.toLocaleString()}</div>
                  <div className="text-charcoal/70">Total website sessions</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Page Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-xl font-montserrat font-light text-ocean mb-6">
              Top Performing Pages
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-charcoal/70">Page</th>
                    <th className="text-right py-3 text-sm font-medium text-charcoal/70">Views</th>
                    <th className="text-right py-3 text-sm font-medium text-charcoal/70">Bounce Rate</th>
                    <th className="text-right py-3 text-sm font-medium text-charcoal/70">Time on Page</th>
                    <th className="text-right py-3 text-sm font-medium text-charcoal/70">Conversions</th>
                    <th className="text-right py-3 text-sm font-medium text-charcoal/70">CVR</th>
                  </tr>
                </thead>
                <tbody>
                  {pagePerformance.map((page, index) => (
                    <motion.tr
                      key={page.page}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 font-medium text-charcoal">{page.page}</td>
                      <td className="py-4 text-right text-charcoal">{page.views.toLocaleString()}</td>
                      <td className="py-4 text-right">
                        <span className={`${page.bounceRate < 30 ? 'text-green-600' : page.bounceRate > 50 ? 'text-red-600' : 'text-yellow-600'}`}>
                          {page.bounceRate}%
                        </span>
                      </td>
                      <td className="py-4 text-right text-charcoal">{page.avgTimeOnPage}</td>
                      <td className="py-4 text-right text-charcoal">{page.conversions}</td>
                      <td className="py-4 text-right">
                        <span className={`font-medium ${page.conversionRate > 5 ? 'text-green-600' : page.conversionRate > 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {page.conversionRate}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}

      {activeTab === 'keywords' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <h3 className="text-xl font-montserrat font-light text-ocean mb-6">
            Keyword Rankings Performance
          </h3>

          <div className="space-y-4">
            {keywordRankings.map((keyword, index) => (
              <motion.div
                key={keyword.keyword}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-charcoal mb-2">{keyword.keyword}</h4>
                    <div className="flex items-center gap-4 text-sm text-charcoal/70">
                      <span>Volume: {keyword.searchVolume}/month</span>
                      <span className={`px-2 py-1 rounded ${getDifficultyColor(keyword.difficulty)}`}>
                        {keyword.difficulty}
                      </span>
                      <span className={`px-2 py-1 rounded ${getOpportunityColor(keyword.opportunity)}`}>
                        {keyword.opportunity} opportunity
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <div className="text-center">
                      <div className="text-sm text-charcoal/70">Previous</div>
                      <div className="text-lg font-medium text-charcoal">#{keyword.previousPosition}</div>
                    </div>
                    <div className="flex items-center">
                      {getTrendIcon(keyword.trend, keyword.position - keyword.previousPosition)}
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-charcoal/70">Current</div>
                      <div className="text-2xl font-bold text-ocean">#{keyword.position}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Progress to first page:</span>
                    <span className="font-medium">
                      {keyword.position <= 10 ? 'On first page!' : `${keyword.position - 10} positions to go`}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'traffic' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <h3 className="text-xl font-montserrat font-light text-ocean mb-6">
            Traffic Sources Analysis
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-charcoal mb-4">Traffic Distribution</h4>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <motion.div
                    key={source.source}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-charcoal">{source.source}</div>
                      <div className="text-sm text-charcoal/70">{source.visits.toLocaleString()} visits</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-ocean">{source.percentage}%</div>
                      <div className={`text-sm ${getChangeColor(source.change)}`}>
                        {source.change > 0 ? '+' : ''}{source.change}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-charcoal mb-4">Conversion Performance</h4>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <motion.div
                    key={source.source}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-charcoal">{source.source}</span>
                      <span className="text-green-600 font-medium">${source.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-charcoal/70">
                      <span>Conversion Rate:</span>
                      <span className={`font-medium ${source.conversionRate > 4 ? 'text-green-600' : source.conversionRate > 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {source.conversionRate}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'technical' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <h3 className="text-xl font-montserrat font-light text-ocean mb-6">
            Technical SEO Monitoring
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seoMetrics.filter(m => m.category === 'technical').map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`border rounded-xl p-6 ${
                  metric.current === metric.target ? 'border-green-200 bg-green-50' :
                  typeof metric.current === 'number' && typeof metric.target === 'number' && metric.current >= metric.target * 0.8 ? 'border-yellow-200 bg-yellow-50' :
                  'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Zap className="w-6 h-6 text-yellow-600" />
                  {getTrendIcon(metric.trend, metric.change)}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-charcoal text-sm">{metric.name}</h4>
                  <div className="text-2xl font-bold text-ocean">
                    {metric.current}{metric.unit}
                  </div>
                  <div className="text-sm text-charcoal/70">
                    Target: {metric.target}{metric.unit}
                  </div>
                  <div className={`text-sm font-medium ${getChangeColor(metric.change)}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}% change
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <h4 className="font-medium text-yellow-700 mb-4">Technical SEO Action Items</h4>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h5 className="font-medium text-charcoal mb-2">High Priority</h5>
                <ul className="space-y-1 text-charcoal/70">
                  <li>• Improve Core Web Vitals scores to 90+</li>
                  <li>• Reduce page load speed to under 2 seconds</li>
                  <li>• Fix mobile usability issues</li>
                  <li>• Optimize image loading and compression</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-charcoal mb-2">Monitoring</h5>
                <ul className="space-y-1 text-charcoal/70">
                  <li>• Daily Core Web Vitals monitoring</li>
                  <li>• Weekly technical SEO audits</li>
                  <li>• Mobile-first indexing compliance</li>
                  <li>• Schema markup validation</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}