import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Smartphone,
  Tablet,
  Monitor,
  Zap,
  Clock,
  Target,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Wifi,
  Battery,
  Signal
} from 'lucide-react'

interface MobileMetric {
  name: string
  current: number
  target: number
  unit: string
  status: 'excellent' | 'good' | 'needs-work' | 'poor'
  impact: 'critical' | 'high' | 'medium' | 'low'
  recommendation: string
}

interface DeviceBreakpoint {
  name: string
  width: number
  usage: string
  priority: 'critical' | 'high' | 'medium'
  icon: React.ReactNode
}

interface CoreWebVital {
  metric: string
  current: string
  target: string
  status: 'good' | 'needs-improvement' | 'poor'
  description: string
  improvement: string
}

export default function MobileSEOOptimizer() {
  const [activeDevice, setActiveDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [overallMobileScore, setOverallMobileScore] = useState(0)

  const deviceBreakpoints: DeviceBreakpoint[] = [
    {
      name: 'Mobile Portrait',
      width: 375,
      usage: '68% of Australian traffic',
      priority: 'critical',
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      name: 'Mobile Landscape',
      width: 667,
      usage: '12% of Australian traffic',
      priority: 'high',
      icon: <Smartphone className="w-5 h-5 rotate-90" />
    },
    {
      name: 'Tablet Portrait',
      width: 768,
      usage: '8% of Australian traffic',
      priority: 'high',
      icon: <Tablet className="w-5 h-5" />
    },
    {
      name: 'Small Desktop',
      width: 1024,
      usage: '12% of Australian traffic',
      priority: 'medium',
      icon: <Monitor className="w-5 h-5" />
    }
  ]

  const mobileMetrics: MobileMetric[] = [
    {
      name: 'Mobile Page Speed',
      current: 65,
      target: 90,
      unit: '/100',
      status: 'needs-work',
      impact: 'critical',
      recommendation: 'Optimize images and reduce JavaScript bundle size'
    },
    {
      name: 'Touch Target Size',
      current: 38,
      target: 44,
      unit: 'px',
      status: 'needs-work',
      impact: 'high',
      recommendation: 'Increase button and link sizes to minimum 44px'
    },
    {
      name: 'Viewport Width',
      current: 100,
      target: 100,
      unit: '%',
      status: 'excellent',
      impact: 'medium',
      recommendation: 'Viewport configuration is optimal'
    },
    {
      name: 'Text Readability',
      current: 85,
      target: 95,
      unit: '%',
      status: 'good',
      impact: 'medium',
      recommendation: 'Improve font contrast and size on small screens'
    },
    {
      name: 'Mobile Usability',
      current: 78,
      target: 95,
      unit: '/100',
      status: 'needs-work',
      impact: 'high',
      recommendation: 'Fix navigation and form usability issues'
    },
    {
      name: 'Network Performance',
      current: 3.2,
      target: 2.0,
      unit: 's',
      status: 'poor',
      impact: 'critical',
      recommendation: 'Implement aggressive caching and compression'
    }
  ]

  const coreWebVitals: CoreWebVital[] = [
    {
      metric: 'Largest Contentful Paint (LCP)',
      current: '4.2s',
      target: '≤ 2.5s',
      status: 'poor',
      description: 'Time until the largest content element is rendered',
      improvement: 'Optimize hero image loading and critical CSS'
    },
    {
      metric: 'First Input Delay (FID)',
      current: '180ms',
      target: '≤ 100ms',
      status: 'needs-improvement',
      description: 'Time from first user interaction to browser response',
      improvement: 'Reduce JavaScript execution time and main thread blocking'
    },
    {
      metric: 'Cumulative Layout Shift (CLS)',
      current: '0.15',
      target: '≤ 0.1',
      status: 'needs-improvement',
      description: 'Measure of visual stability during page load',
      improvement: 'Add explicit dimensions to images and reserve space for dynamic content'
    },
    {
      metric: 'First Contentful Paint (FCP)',
      current: '2.8s',
      target: '≤ 1.8s',
      status: 'needs-improvement',
      description: 'Time until first text or image is rendered',
      improvement: 'Optimize critical resource loading and server response time'
    },
    {
      metric: 'Time to Interactive (TTI)',
      current: '6.1s',
      target: '≤ 3.8s',
      status: 'poor',
      description: 'Time until page is fully interactive',
      improvement: 'Implement code splitting and reduce third-party script impact'
    },
    {
      metric: 'Speed Index',
      current: '4.8s',
      target: '≤ 3.4s',
      status: 'needs-improvement',
      description: 'How quickly content is visually displayed',
      improvement: 'Prioritize above-the-fold content and implement progressive loading'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'needs-work':
      case 'needs-improvement': return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'poor': return <AlertTriangle className="w-5 h-5 text-red-600" />
      default: return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good': return 'text-green-600 bg-green-50 border-green-200'
      case 'needs-work':
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'poor': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-700 bg-red-100'
      case 'high': return 'text-orange-700 bg-orange-100'
      case 'medium': return 'text-yellow-700 bg-yellow-100'
      case 'low': return 'text-green-700 bg-green-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const runMobileAnalysis = () => {
    setIsAnalyzing(true)

    setTimeout(() => {
      const avgScore = mobileMetrics.reduce((sum, metric) => {
        const scoreMap = { excellent: 95, good: 80, 'needs-work': 65, poor: 40 }
        return sum + scoreMap[metric.status]
      }, 0) / mobileMetrics.length

      setOverallMobileScore(Math.round(avgScore))
      setIsAnalyzing(false)
    }, 2000)
  }

  useEffect(() => {
    runMobileAnalysis()
  }, [])

  const criticalIssues = mobileMetrics.filter(m => m.impact === 'critical' && m.status !== 'excellent')
  const poorVitals = coreWebVitals.filter(v => v.status === 'poor')

  return (
    <div className="space-y-8">
      {/* Mobile SEO Overview */}
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
                  className={overallMobileScore >= 80 ? 'text-green-500' : overallMobileScore >= 60 ? 'text-yellow-500' : 'text-red-500'}
                  style={{
                    strokeDasharray: `${2 * Math.PI * 40}`,
                    strokeDashoffset: `${2 * Math.PI * 40 * (1 - overallMobileScore / 100)}`
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-ocean">{overallMobileScore}</div>
                  <div className="text-sm text-charcoal/60">Mobile Score</div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-montserrat font-light text-ocean mb-4">
            Mobile SEO & Core Web Vitals
          </h2>
          <p className="text-charcoal/70 mb-6">
            Optimizing for 68% of Australian traffic coming from mobile devices
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <Smartphone className="w-8 h-8 text-ocean mx-auto mb-2" />
              <div className="font-medium text-charcoal">Mobile-First</div>
              <div className="text-sm text-green-600">Design Priority</div>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="font-medium text-charcoal">Core Web Vitals</div>
              <div className="text-sm text-yellow-600">Needs Improvement</div>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 text-sky mx-auto mb-2" />
              <div className="font-medium text-charcoal">Touch Targets</div>
              <div className="text-sm text-yellow-600">Below 44px Minimum</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="font-medium text-charcoal">Ranking Impact</div>
              <div className="text-sm text-green-600">High SEO Priority</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Device Breakpoint Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <h3 className="text-xl font-montserrat font-light text-ocean mb-6">
          Australian Device Usage Analysis
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {deviceBreakpoints.map((device, index) => (
            <motion.div
              key={device.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                device.priority === 'critical'
                  ? 'border-red-200 bg-red-50'
                  : device.priority === 'high'
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-green-200 bg-green-50'
              }`}
            >
              <div className="flex items-center mb-2">
                {device.icon}
                <h4 className="font-medium ml-2 text-sm">{device.name}</h4>
              </div>
              <div className="text-xs text-charcoal/70 mb-1">{device.width}px width</div>
              <div className="text-xs font-medium text-charcoal">{device.usage}</div>
              <div className={`text-xs px-2 py-1 rounded mt-2 ${getImpactColor(device.priority)}`}>
                {device.priority} priority
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-ocean/10 to-sky/10 rounded-xl p-6">
          <h4 className="font-medium text-ocean mb-4">Critical Mobile Optimization</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-charcoal mb-2">Immediate Actions</h5>
              <ul className="space-y-1 text-charcoal/70">
                <li>• Increase touch targets to 44px minimum</li>
                <li>• Optimize images for mobile bandwidth</li>
                <li>• Improve mobile navigation usability</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-charcoal mb-2">Performance Fixes</h5>
              <ul className="space-y-1 text-charcoal/70">
                <li>• Implement lazy loading for images</li>
                <li>• Reduce JavaScript bundle size</li>
                <li>• Enable aggressive compression</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-charcoal mb-2">SEO Benefits</h5>
              <ul className="space-y-1 text-green-600">
                <li>• Improved Google mobile rankings</li>
                <li>• Better Core Web Vitals scores</li>
                <li>• Increased mobile conversion rates</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Core Web Vitals Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <h3 className="text-xl font-montserrat font-light text-ocean mb-6">
          Core Web Vitals - Google Ranking Factors
        </h3>

        <div className="space-y-4">
          {coreWebVitals.map((vital, index) => (
            <motion.div
              key={vital.metric}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`border rounded-xl p-6 ${getStatusColor(vital.status)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {getStatusIcon(vital.status)}
                  <h4 className="font-medium ml-2">{vital.metric}</h4>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg">{vital.current}</div>
                  <div className="text-sm opacity-70">Target: {vital.target}</div>
                </div>
              </div>

              <p className="text-sm mb-3 opacity-80">{vital.description}</p>

              <div className="bg-white/50 rounded-lg p-3 text-sm">
                <strong>Optimization:</strong> {vital.improvement}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
          <h4 className="font-medium text-red-700 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Critical Performance Issues
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-charcoal mb-2">Poor Core Web Vitals</h5>
              <ul className="text-sm text-charcoal/70 space-y-1">
                {poorVitals.map(vital => (
                  <li key={vital.metric}>• {vital.metric}: {vital.current} (needs {vital.target})</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-charcoal mb-2">SEO Impact</h5>
              <ul className="text-sm text-red-600 space-y-1">
                <li>• Lower Google search rankings</li>
                <li>• Reduced mobile visibility</li>
                <li>• Higher bounce rates</li>
                <li>• Poor user experience signals</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Metrics Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <h3 className="text-xl font-montserrat font-light text-ocean mb-6">
          Mobile Usability & Performance Metrics
        </h3>

        <div className="space-y-4">
          {mobileMetrics.map((metric, index) => (
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
                  <span className={`ml-3 px-2 py-1 rounded text-xs ${getImpactColor(metric.impact)}`}>
                    {metric.impact}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg">
                    {metric.current}{metric.unit}
                  </div>
                  <div className="text-sm opacity-70">
                    Target: {metric.target}{metric.unit}
                  </div>
                </div>
              </div>

              <div className="bg-white/50 rounded-lg p-3 text-sm">
                <strong>Recommendation:</strong> {metric.recommendation}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
          <h4 className="font-medium text-green-700 mb-4">Mobile SEO Action Plan</h4>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h5 className="font-medium text-charcoal mb-2">Week 1 (Critical)</h5>
              <ul className="space-y-1 text-charcoal/70">
                <li>• Fix touch target sizes (44px minimum)</li>
                <li>• Optimize hero image loading</li>
                <li>• Implement viewport meta tag fixes</li>
                <li>• Add explicit image dimensions</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-charcoal mb-2">Week 2 (High Priority)</h5>
              <ul className="space-y-1 text-charcoal/70">
                <li>• Implement lazy loading</li>
                <li>• Optimize JavaScript bundles</li>
                <li>• Improve mobile navigation</li>
                <li>• Enable resource compression</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-charcoal mb-2">Expected Results</h5>
              <ul className="space-y-1 text-green-600">
                <li>• Mobile score: 65 → 90+</li>
                <li>• LCP: 4.2s → 2.5s</li>
                <li>• CLS: 0.15 → 0.1</li>
                <li>• Improved Google rankings</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}