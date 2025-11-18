import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Zap,
  Image as ImageIcon,
  Smartphone,
  Globe,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Target,
  Clock,
  Monitor
} from 'lucide-react'

interface PerformanceMetric {
  name: string
  current: number
  target: number
  status: 'excellent' | 'good' | 'needs-work' | 'poor'
  improvement: string
  impact: 'high' | 'medium' | 'low'
}

interface OptimizationAction {
  category: string
  action: string
  impact: 'high' | 'medium' | 'low'
  effort: 'easy' | 'medium' | 'hard'
  timeToImplement: string
  expectedImprovement: string
  priority: number
  implemented: boolean
}

export default function SEOPerformanceOptimizer() {
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([])
  const [optimizationActions, setOptimizationActions] = useState<OptimizationAction[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [overallScore, setOverallScore] = useState(0)

  const coreMetrics: PerformanceMetric[] = [
    {
      name: 'First Contentful Paint (FCP)',
      current: 2.8,
      target: 1.8,
      status: 'needs-work',
      improvement: 'Reduce by 1.0s with image optimization',
      impact: 'high'
    },
    {
      name: 'Largest Contentful Paint (LCP)',
      current: 4.2,
      target: 2.5,
      status: 'poor',
      improvement: 'Reduce by 1.7s with critical resource optimization',
      impact: 'high'
    },
    {
      name: 'First Input Delay (FID)',
      current: 180,
      target: 100,
      status: 'needs-work',
      improvement: 'Reduce by 80ms with JS optimization',
      impact: 'medium'
    },
    {
      name: 'Cumulative Layout Shift (CLS)',
      current: 0.15,
      target: 0.1,
      status: 'needs-work',
      improvement: 'Improve by 0.05 with image sizing',
      impact: 'medium'
    },
    {
      name: 'Speed Index',
      current: 3.5,
      target: 1.3,
      status: 'poor',
      improvement: 'Reduce by 2.2s with comprehensive optimization',
      impact: 'high'
    },
    {
      name: 'Total Blocking Time (TBT)',
      current: 450,
      target: 200,
      status: 'poor',
      improvement: 'Reduce by 250ms with code splitting',
      impact: 'high'
    }
  ]

  const coreOptimizations: OptimizationAction[] = [
    {
      category: 'Critical Performance',
      action: 'Implement next-gen image formats (WebP/AVIF) with fallbacks',
      impact: 'high',
      effort: 'medium',
      timeToImplement: '2-3 hours',
      expectedImprovement: '60-70% reduction in image load time',
      priority: 1,
      implemented: false
    },
    {
      category: 'Critical Performance',
      action: 'Add responsive image sizing with srcset attributes',
      impact: 'high',
      effort: 'medium',
      timeToImplement: '1-2 hours',
      expectedImprovement: '40-50% reduction in mobile image payload',
      priority: 2,
      implemented: false
    },
    {
      category: 'Critical Performance',
      action: 'Implement critical CSS inlining for above-the-fold content',
      impact: 'high',
      effort: 'hard',
      timeToImplement: '3-4 hours',
      expectedImprovement: '0.5-1s improvement in FCP',
      priority: 3,
      implemented: false
    },
    {
      category: 'JavaScript Optimization',
      action: 'Implement code splitting and lazy loading for non-critical components',
      impact: 'high',
      effort: 'medium',
      timeToImplement: '2-3 hours',
      expectedImprovement: '30-40% reduction in initial JS bundle',
      priority: 4,
      implemented: false
    },
    {
      category: 'Resource Loading',
      action: 'Add preconnect and dns-prefetch for external resources',
      impact: 'medium',
      effort: 'easy',
      timeToImplement: '30 minutes',
      expectedImprovement: '200-500ms faster third-party resource loading',
      priority: 5,
      implemented: false
    },
    {
      category: 'Caching Strategy',
      action: 'Implement aggressive browser caching with service worker',
      impact: 'high',
      effort: 'hard',
      timeToImplement: '4-6 hours',
      expectedImprovement: '80-90% improvement in repeat visit performance',
      priority: 6,
      implemented: false
    },
    {
      category: 'Core Web Vitals',
      action: 'Add explicit width/height to all images to prevent CLS',
      impact: 'medium',
      effort: 'easy',
      timeToImplement: '1 hour',
      expectedImprovement: '60-80% improvement in CLS score',
      priority: 7,
      implemented: false
    },
    {
      category: 'Mobile Optimization',
      action: 'Implement viewport-optimized font loading strategy',
      impact: 'medium',
      effort: 'medium',
      timeToImplement: '1-2 hours',
      expectedImprovement: '200-400ms faster text rendering',
      priority: 8,
      implemented: false
    },
    {
      category: 'Advanced Optimization',
      action: 'Implement resource hints (preload, prefetch) for critical assets',
      impact: 'medium',
      effort: 'medium',
      timeToImplement: '2 hours',
      expectedImprovement: '300-600ms improvement in perceived performance',
      priority: 9,
      implemented: false
    },
    {
      category: 'Advanced Optimization',
      action: 'Add performance monitoring with Real User Metrics (RUM)',
      impact: 'medium',
      effort: 'medium',
      timeToImplement: '2-3 hours',
      expectedImprovement: 'Continuous performance insights and optimization',
      priority: 10,
      implemented: false
    }
  ]

  const runPerformanceAnalysis = () => {
    setIsAnalyzing(true)

    setTimeout(() => {
      setPerformanceMetrics(coreMetrics)
      setOptimizationActions(coreOptimizations)

      const avgScore = coreMetrics.reduce((sum, metric) => {
        const scoreMap = { excellent: 95, good: 80, 'needs-work': 65, poor: 40 }
        return sum + scoreMap[metric.status]
      }, 0) / coreMetrics.length

      setOverallScore(Math.round(avgScore))
      setIsAnalyzing(false)
    }, 2000)
  }

  const toggleOptimization = (index: number) => {
    setOptimizationActions(prev =>
      prev.map((action, i) =>
        i === index ? { ...action, implemented: !action.implemented } : action
      )
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'good': return <CheckCircle className="w-5 h-5 text-blue-600" />
      case 'needs-work': return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'poor': return <AlertTriangle className="w-5 h-5 text-red-600" />
      default: return <Clock className="w-5 h-5 text-gray-400" />
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  useEffect(() => {
    runPerformanceAnalysis()
  }, [])

  const implementedCount = optimizationActions.filter(action => action.implemented).length
  const highPriorityActions = optimizationActions.filter(action => action.priority <= 5)

  return (
    <div className="space-y-8">
      {/* Performance Overview */}
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
                  <div className="text-sm text-charcoal/60">Performance</div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-montserrat font-light text-ocean mb-4">
            Performance Optimization Dashboard
          </h2>
          <p className="text-charcoal/70 mb-6">
            Current performance analysis shows significant opportunity for Google first-page ranking improvements
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <Zap className="w-8 h-8 text-ocean mx-auto mb-2" />
              <div className="font-medium text-charcoal">Core Web Vitals</div>
              <div className="text-sm text-red-600">Needs Optimization</div>
            </div>
            <div className="text-center">
              <ImageIcon className="w-8 h-8 text-sky mx-auto mb-2" />
              <div className="font-medium text-charcoal">Image Optimization</div>
              <div className="text-sm text-red-600">60-70% Improvement Potential</div>
            </div>
            <div className="text-center">
              <Smartphone className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="font-medium text-charcoal">Mobile Performance</div>
              <div className="text-sm text-yellow-600">Room for Improvement</div>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="font-medium text-charcoal">SEO Impact</div>
              <div className="text-sm text-green-600">High Ranking Potential</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Core Web Vitals Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <h3 className="text-xl font-montserrat font-light text-ocean mb-6">
          Core Web Vitals Analysis
        </h3>

        <div className="space-y-4">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`border rounded-xl p-4 ${getStatusColor(metric.status)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {getStatusIcon(metric.status)}
                  <h4 className="font-medium ml-2">{metric.name}</h4>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(metric.impact)}`}>
                  {metric.impact} impact
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Current:</span> {metric.current}{metric.name.includes('Paint') || metric.name.includes('Index') ? 's' : metric.name.includes('Delay') || metric.name.includes('TBT') ? 'ms' : ''}
                </div>
                <div>
                  <span className="font-medium">Target:</span> {metric.target}{metric.name.includes('Paint') || metric.name.includes('Index') ? 's' : metric.name.includes('Delay') || metric.name.includes('TBT') ? 'ms' : ''}
                </div>
                <div>
                  <span className="font-medium">Improvement:</span> {metric.improvement}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Optimization Action Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-montserrat font-light text-ocean">
            Critical Performance Optimizations
          </h3>
          <div className="text-sm text-charcoal/70">
            {implementedCount} of {optimizationActions.length} implemented
          </div>
        </div>

        <div className="space-y-4">
          {optimizationActions.slice(0, 5).map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`border rounded-xl p-6 transition-all duration-300 ${
                action.implemented
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-gray-200 hover:border-ocean/30'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                      action.implemented
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300'
                    }`}>
                      {action.implemented && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <h4 className="font-medium text-charcoal">{action.action}</h4>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 text-sm text-charcoal/70 mb-3">
                    <div>
                      <span className="font-medium">Impact:</span>
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${getImpactColor(action.impact)}`}>
                        {action.impact}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Effort:</span> {action.effort}
                    </div>
                    <div>
                      <span className="font-medium">Time:</span> {action.timeToImplement}
                    </div>
                    <div>
                      <span className="font-medium">Priority:</span> #{action.priority}
                    </div>
                  </div>

                  <p className="text-sm text-green-600 font-medium">
                    Expected: {action.expectedImprovement}
                  </p>
                </div>

                <button
                  onClick={() => toggleOptimization(index)}
                  className={`ml-4 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    action.implemented
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-ocean text-white hover:bg-ocean/90'
                  }`}
                >
                  {action.implemented ? 'Implemented' : 'Implement'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-ocean/10 to-sky/10 rounded-xl">
          <h4 className="font-medium text-ocean mb-4">High-Priority Implementation Plan</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-charcoal mb-2">Week 1-2 (Critical)</h5>
              <ul className="text-sm text-charcoal/70 space-y-1">
                <li>• Next-gen image formats implementation</li>
                <li>• Responsive image sizing</li>
                <li>• Critical CSS inlining</li>
                <li>• External resource preconnects</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-charcoal mb-2">Expected Results</h5>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• 60-70% faster image loading</li>
                <li>• Sub-2 second page load times</li>
                <li>• Improved Core Web Vitals scores</li>
                <li>• Better Google ranking potential</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}