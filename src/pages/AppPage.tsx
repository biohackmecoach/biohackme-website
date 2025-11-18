import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { 
  Home,
  Activity,
  BarChart3,
  BookOpen,
  User,
  Plus,
  Moon,
  Zap,
  Heart,
  Brain,
  Smile,
  Dumbbell,
  TreePine,
  Users,
  ShoppingBag,
  Play,
  CheckCircle,
  Target,
  Award,
  Clock,
  TrendingUp,
  Settings
} from 'lucide-react'
import { biohackingPillars, masterclasses } from '../data/masterclasses'

// 8 Pillars Data Structure
interface PillarEntry {
  id: string
  date: string
  pillar: string
  score: number
  notes?: string
  protocols?: string[]
}

interface BiohackingWheelAssessment {
  sleep: number
  mood: number
  body: number
  environment: number
  energy: number
  relationships: number
  health: number
  brain: number
  date: string
  totalScore: number
}

interface MasterclassProgress {
  masterclassId: string
  completedModules: string[]
  currentModule: string
  progress: number
  startDate: string
  lastAccessed: string
}

interface FeelingsEntry {
  id: string
  date: string
  mood: number
  energy: number
  stress: number
  gratitude: string
  notes?: string
}

const pillarIcons = {
  'BIOHACK YOUR SLEEP': Moon,
  'BIOHACK YOUR MOOD': Smile,
  'BIOHACK YOUR BODY': Dumbbell,
  'BIOHACK YOUR ENVIRONMENT': TreePine,
  'BIOHACK YOUR ENERGY': Zap,
  'BIOHACK YOUR RELATIONSHIPS': Users,
  'BIOHACK YOUR HEALTH': Heart,
  'BIOHACK YOUR BRAIN': Brain
}

const pillarColors = {
  'BIOHACK YOUR SLEEP': 'text-indigo-600',
  'BIOHACK YOUR MOOD': 'text-yellow-600',
  'BIOHACK YOUR BODY': 'text-green-600',
  'BIOHACK YOUR ENVIRONMENT': 'text-emerald-600',
  'BIOHACK YOUR ENERGY': 'text-orange-600',
  'BIOHACK YOUR RELATIONSHIPS': 'text-pink-600',
  'BIOHACK YOUR HEALTH': 'text-red-600',
  'BIOHACK YOUR BRAIN': 'text-purple-600'
}

export default function AppPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [pillarEntries, setPillarEntries] = useState<PillarEntry[]>([])
  const [wheelAssessments, setWheelAssessments] = useState<BiohackingWheelAssessment[]>([])
  const [masterclassProgress, setMasterclassProgress] = useState<MasterclassProgress[]>([])
  const [feelingsEntries, setFeelingsEntries] = useState<FeelingsEntry[]>([])
  const [isInstallable, setIsInstallable] = useState(false)

  // PWA installation
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setIsInstallable(true)
      window.deferredPrompt = e
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }

    // Load data from localStorage
    const savedEntries = localStorage.getItem('biohackme-pillar-entries')
    if (savedEntries) {
      setPillarEntries(JSON.parse(savedEntries))
    }

    const savedAssessments = localStorage.getItem('biohackme-wheel-assessments')
    if (savedAssessments) {
      setWheelAssessments(JSON.parse(savedAssessments))
    }

    const savedProgress = localStorage.getItem('biohackme-masterclass-progress')
    if (savedProgress) {
      setMasterclassProgress(JSON.parse(savedProgress))
    }

    const savedFeelings = localStorage.getItem('biohackme-feelings-entries')
    if (savedFeelings) {
      setFeelingsEntries(JSON.parse(savedFeelings))
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const installApp = async () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt()
      const { outcome } = await window.deferredPrompt.userChoice
      console.log(`User response to the install prompt: ${outcome}`)
      window.deferredPrompt = null
      setIsInstallable(false)
    }
  }

  const addPillarEntry = (entry: Omit<PillarEntry, 'id'>) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString()
    }
    const updatedEntries = [newEntry, ...pillarEntries]
    setPillarEntries(updatedEntries)
    localStorage.setItem('biohackme-pillar-entries', JSON.stringify(updatedEntries))
  }

  const getTodaysPillarScores = () => {
    const today = new Date().toLocaleDateString()
    const todaysEntries = pillarEntries.filter(entry => entry.date === today)
    
    const scores: { [key: string]: number } = {}
    biohackingPillars.forEach(pillar => {
      const pillarEntry = todaysEntries.find(entry => entry.pillar === pillar)
      scores[pillar] = pillarEntry ? pillarEntry.score : 0
    })
    
    return scores
  }

  const getPillarAverage = (pillar: string, days: number = 7) => {
    const recentEntries = pillarEntries
      .filter(entry => entry.pillar === pillar)
      .slice(0, days)
    
    if (recentEntries.length === 0) return 0
    return recentEntries.reduce((acc, entry) => acc + entry.score, 0) / recentEntries.length
  }

  const getOverallHealthScore = () => {
    const todaysScores = getTodaysPillarScores()
    const scores = Object.values(todaysScores).filter(score => score > 0)
    if (scores.length === 0) return 0
    return Math.round(scores.reduce((acc, score) => acc + score, 0) / scores.length)
  }

  const renderDashboard = () => {
    const todaysScores = getTodaysPillarScores()
    const overallScore = getOverallHealthScore()
    const latestAssessment = wheelAssessments[0]
    const activeMasterclasses = masterclassProgress.filter(p => p.progress < 100)

    return (
      <div className="p-4 space-y-6">
        {/* Welcome & Install */}
        <div className="text-center py-6 bg-gradient-to-r from-ocean/10 to-sky/10 rounded-2xl">
          <h1 className="text-2xl font-bold text-ocean mb-2">BiohackMe Framework</h1>
          <p className="text-gray-600 mb-4">Your 8-Pillar Health Optimization Journey</p>
          
          {isInstallable && (
            <button
              onClick={installApp}
              className="bg-ocean text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-ocean/90 transition-colors"
            >
              Install App
            </button>
          )}
        </div>

        {/* Overall Health Score */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-ocean/10">
          <div className="text-center">
            <div className="text-4xl font-bold text-ocean mb-2">{overallScore}/10</div>
            <p className="text-gray-600 mb-4">Today's Health Score</p>
            <div className="flex items-center justify-center mb-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-ocean to-sky h-3 rounded-full transition-all duration-500"
                  style={{ width: `${overallScore * 10}%` }}
                ></div>
              </div>
            </div>
            {overallScore > 0 && (
              <p className="text-sm text-gray-500">
                {overallScore >= 8 ? 'Excellent biohacking today!' : 
                 overallScore >= 6 ? 'Good progress on your pillars!' :
                 overallScore >= 4 ? 'Room for improvement today' :
                 'Focus on one pillar at a time'}
              </p>
            )}
          </div>
        </div>

        {/* 8 Pillars Quick View */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-ocean/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-ocean">Today's 8 Pillars</h3>
            <button
              onClick={() => setActiveTab('track')}
              className="text-ocean hover:text-sky transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {biohackingPillars.slice(0, 8).map((pillar) => {
              const Icon = pillarIcons[pillar as keyof typeof pillarIcons]
              const colorClass = pillarColors[pillar as keyof typeof pillarColors]
              const score = todaysScores[pillar] || 0
              const shortName = pillar.replace('BIOHACK YOUR ', '')
              
              return (
                <div key={pillar} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                  <Icon className={`w-4 h-4 ${colorClass}`} />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-700">{shortName}</div>
                    <div className="text-sm font-bold text-ocean">{score}/10</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setActiveTab('assess')}
            className="bg-sky text-white p-4 rounded-2xl text-left shadow-lg hover:shadow-xl transition-all"
          >
            <Target className="w-6 h-6 mb-2" />
            <div className="text-sm font-medium">Take Assessment</div>
            <div className="text-xs opacity-90">Biohacking Wheel</div>
          </button>
          
          <button
            onClick={() => setActiveTab('learn')}
            className="bg-ocean text-white p-4 rounded-2xl text-left shadow-lg hover:shadow-xl transition-all"
          >
            <BookOpen className="w-6 h-6 mb-2" />
            <div className="text-sm font-medium">Learn</div>
            <div className="text-xs opacity-90">Masterclasses</div>
          </button>
        </div>

        {/* Free Guide & CTAs */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold">Free Biohacking Guide</h3>
                <p className="text-sm opacity-90">7 Pillars Foundation Framework</p>
              </div>
              <Zap className="w-8 h-8 opacity-75" />
            </div>
            <p className="text-sm opacity-90 mb-4">
              Get my complete guide to optimising your health naturally
            </p>
            <a
              href="/freebie"
              className="inline-block bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colours"
            >
              Download Free Guide
            </a>
          </div>

          <div className="bg-gradient-to-r from-ocean to-sky rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold">Get the Complete Guide</h3>
                <p className="text-sm opacity-90">The BiohackMe Book</p>
              </div>
              <BookOpen className="w-8 h-8 opacity-75" />
            </div>
            <p className="text-sm opacity-90 mb-4">
              Deep dive into all 8 pillars with 200+ pages of actionable protocols
            </p>
            <a
              href="/my-book"
              className="inline-block bg-white text-ocean px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colours"
            >
              Buy My Book
            </a>
          </div>

          <div className="bg-gradient-to-r from-sky to-ocean rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold">1:1 Personalised Guidance</h3>
                <p className="text-sm opacity-90">Supercharge Your Life Coaching</p>
              </div>
              <Users className="w-8 h-8 opacity-75" />
            </div>
            <p className="text-sm opacity-90 mb-4">
              Work directly with Camilla to optimise your unique biohacking journey
            </p>
            <a
              href="/superchargeyourlife"
              className="inline-block bg-white text-sky px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colours"
            >
              Start Coaching
            </a>
          </div>
        </div>

        {/* Active Masterclasses */}
        {activeMasterclasses.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-ocean/10">
            <h3 className="text-lg font-semibold text-ocean mb-4">Continue Learning</h3>
            {activeMasterclasses.slice(0, 2).map((progress) => {
              const masterclass = masterclasses.find(m => m.id === progress.masterclassId)
              if (!masterclass) return null
              
              return (
                <div key={progress.masterclassId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{masterclass.title}</p>
                    <div className="flex items-center mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-ocean h-2 rounded-full"
                          style={{ width: `${progress.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{Math.round(progress.progress)}%</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('learn')}
                    className="ml-3 bg-ocean text-white px-3 py-1 rounded-full text-xs hover:bg-ocean/90 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* Latest Assessment */}
        {latestAssessment && (
          <div className="bg-gradient-to-r from-ocean/5 to-sky/5 rounded-2xl p-4 border border-ocean/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-ocean">Latest Assessment</h3>
              <div className="text-2xl font-bold text-sky">{latestAssessment.totalScore}/80</div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{latestAssessment.date}</p>
            <button
              onClick={() => setActiveTab('assess')}
              className="w-full bg-white text-ocean py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              View Full Assessment
            </button>
          </div>
        )}
      </div>
    )
  }

  const renderTracker = () => {
    const [selectedPillar, setSelectedPillar] = useState('')
    const [score, setScore] = useState(5)
    const [notes, setNotes] = useState('')
    const [selectedProtocols, setSelectedProtocols] = useState<string[]>([])

    const protocolsByPillar = {
      'BIOHACK YOUR SLEEP': ['Early bedtime', 'Blue light blocking', 'Cool bedroom', 'No screens 1hr before bed', 'Morning sunlight'],
      'BIOHACK YOUR MOOD': ['Meditation', 'Gratitude practice', 'Deep breathing', 'Nature walk', 'Social connection'],
      'BIOHACK YOUR BODY': ['Strength training', 'Cardio', 'Stretching', 'Cold exposure', 'Proper posture'],
      'BIOHACK YOUR ENVIRONMENT': ['Air purifier', 'Plants', 'Natural light', 'Clean water', 'Toxin reduction'],
      'BIOHACK YOUR ENERGY': ['Intermittent fasting', 'Mitochondrial nutrients', 'Red light therapy', 'Proper nutrition', 'Energy management'],
      'BIOHACK YOUR RELATIONSHIPS': ['Quality time', 'Active listening', 'Boundaries', 'Community building', 'Conflict resolution'],
      'BIOHACK YOUR HEALTH': ['Biomarker testing', 'Supplement optimization', 'Health monitoring', 'Preventive care', 'Recovery tracking'],
      'BIOHACK YOUR BRAIN': ['Cognitive training', 'Learning new skills', 'Nootropics', 'Brain nutrition', 'Mental challenges']
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (!selectedPillar) return

      addPillarEntry({
        date: new Date().toLocaleDateString(),
        pillar: selectedPillar,
        score,
        notes,
        protocols: selectedProtocols
      })
      
      // Reset form
      setSelectedPillar('')
      setScore(5)
      setNotes('')
      setSelectedProtocols([])
      
      setActiveTab('dashboard')
    }

    return (
      <div className="p-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-ocean/10">
          <h2 className="text-xl font-bold text-ocean mb-6">Track Your 8 Pillars</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pillar Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Pillar to Track
              </label>
              <div className="grid grid-cols-2 gap-2">
                {biohackingPillars.map((pillar) => {
                  const Icon = pillarIcons[pillar as keyof typeof pillarIcons]
                  const colorClass = pillarColors[pillar as keyof typeof pillarColors]
                  const shortName = pillar.replace('BIOHACK YOUR ', '')
                  
                  return (
                    <button
                      key={pillar}
                      type="button"
                      onClick={() => setSelectedPillar(pillar)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedPillar === pillar
                          ? 'border-ocean bg-ocean/5'
                          : 'border-gray-200 hover:border-ocean/50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-4 h-4 ${colorClass}`} />
                        <span className="text-sm font-medium">{shortName}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {selectedPillar && (
              <>
                {/* Score */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How did you do today? (1-10)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={score}
                      onChange={(e) => setScore(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-lg font-bold text-ocean w-8 text-center">{score}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {score >= 8 ? 'Excellent!' : score >= 6 ? 'Good progress' : score >= 4 ? 'Room for improvement' : 'Focus needed'}
                  </div>
                </div>

                {/* Protocols */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Which protocols did you use? (Optional)
                  </label>
                  <div className="space-y-2">
                    {protocolsByPillar[selectedPillar as keyof typeof protocolsByPillar]?.map((protocol) => (
                      <label key={protocol} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedProtocols.includes(protocol)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProtocols([...selectedProtocols, protocol])
                            } else {
                              setSelectedProtocols(selectedProtocols.filter(p => p !== protocol))
                            }
                          }}
                          className="rounded border-gray-300 text-ocean focus:ring-ocean"
                        />
                        <span className="text-sm text-gray-700">{protocol}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="How did you feel? What worked well? Any observations?"
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-ocean"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-ocean text-white py-3 rounded-full font-medium hover:bg-ocean/90 transition-colors"
                >
                  Save {selectedPillar.replace('BIOHACK YOUR ', '')} Entry
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    )
  }

  const renderLearn = () => {
    const availableMasterclasses = masterclasses.filter(m => m.status === 'available')
    const comingSoonMasterclasses = masterclasses.filter(m => m.status === 'coming-soon')

    return (
      <div className="p-4 space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-ocean mb-2">Learn Biohacking</h2>
          <p className="text-gray-600">Master the 8 pillars with exclusive content</p>
        </div>

        {/* Available Masterclasses */}
        <div>
          <h3 className="text-lg font-semibold text-ocean mb-4">Available Now</h3>
          <div className="space-y-4">
            {availableMasterclasses.map((masterclass) => {
              const progress = masterclassProgress.find(p => p.masterclassId === masterclass.id)
              const progressPercentage = progress ? progress.progress : 0
              
              return (
                <div key={masterclass.id} className="bg-white rounded-2xl p-4 shadow-lg border border-ocean/10">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-ocean to-sky rounded-lg flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{masterclass.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{masterclass.subtitle}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{masterclass.duration}</span>
                        <span className="flex items-center"><Award className="w-3 h-3 mr-1" />{masterclass.level}</span>
                        <span className="text-ocean font-medium">${masterclass.price} {masterclass.currency}</span>
                      </div>
                      
                      {progressPercentage > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">Progress</span>
                            <span className="text-xs text-ocean font-medium">{Math.round(progressPercentage)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-ocean h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <a
                          href={`/masterclass/${masterclass.id}`}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            progressPercentage > 0
                              ? 'bg-ocean text-white hover:bg-ocean/90'
                              : 'bg-sky text-white hover:bg-sky/90'
                          }`}
                        >
                          {progressPercentage > 0 ? 'Continue' : 'Start Learning'}
                        </a>
                        {progressPercentage === 0 && (
                          <button className="px-4 py-2 border border-ocean text-ocean rounded-full text-sm font-medium hover:bg-ocean/5 transition-colors">
                            Preview
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Book Content */}
        <div className="bg-gradient-to-r from-ocean/5 to-sky/5 rounded-2xl p-6 border border-ocean/10">
          <div className="text-center mb-4">
            <BookOpen className="w-12 h-12 text-ocean mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-ocean">BiohackMe Book</h3>
            <p className="text-sm text-gray-600">Complete 8-pillar optimization guide</p>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-ocean">8</div>
              <div className="text-xs text-gray-600">Pillars</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-sky">200+</div>
              <div className="text-xs text-gray-600">Pages</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-ocean">50+</div>
              <div className="text-xs text-gray-600">Protocols</div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <h4 className="text-sm font-semibold text-ocean">Featured Protocols:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>• Cold exposure & heat therapy</div>
              <div>• Sleep optimization blueprint</div>
              <div>• Nutrition timing strategies</div>
              <div>• Stress management techniques</div>
              <div>• Brain training protocols</div>
            </div>
          </div>
          
          <a
            href="/my-book"
            className="w-full bg-ocean text-white py-3 rounded-full font-medium hover:bg-ocean/90 transition-colors text-center block"
          >
            Get the Complete Book
          </a>
        </div>

        {/* Coming Soon */}
        {comingSoonMasterclasses.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-ocean mb-4">Coming Soon</h3>
            <div className="grid gap-3">
              {comingSoonMasterclasses.slice(0, 4).map((masterclass) => (
                <div key={masterclass.id} className="bg-gray-50 rounded-lg p-4 opacity-75">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{masterclass.title}</h4>
                      <p className="text-sm text-gray-600">{masterclass.subtitle}</p>
                    </div>
                    <div className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      Coming Soon
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderAssess = () => {
    const [isAssessing, setIsAssessing] = useState(false)
    const [currentPillar, setCurrentPillar] = useState(0)
    const [assessmentScores, setAssessmentScores] = useState<{ [key: string]: number }>({})

    const startAssessment = () => {
      setIsAssessing(true)
      setCurrentPillar(0)
      setAssessmentScores({})
    }

    const completeAssessment = () => {
      const totalScore = Object.values(assessmentScores).reduce((acc, score) => acc + score, 0)
      const assessment: BiohackingWheelAssessment = {
        sleep: assessmentScores['BIOHACK YOUR SLEEP'] || 0,
        mood: assessmentScores['BIOHACK YOUR MOOD'] || 0,
        body: assessmentScores['BIOHACK YOUR BODY'] || 0,
        environment: assessmentScores['BIOHACK YOUR ENVIRONMENT'] || 0,
        energy: assessmentScores['BIOHACK YOUR ENERGY'] || 0,
        relationships: assessmentScores['BIOHACK YOUR RELATIONSHIPS'] || 0,
        health: assessmentScores['BIOHACK YOUR HEALTH'] || 0,
        brain: assessmentScores['BIOHACK YOUR BRAIN'] || 0,
        date: new Date().toLocaleDateString(),
        totalScore
      }

      const updatedAssessments = [assessment, ...wheelAssessments]
      setWheelAssessments(updatedAssessments)
      localStorage.setItem('biohackme-wheel-assessments', JSON.stringify(updatedAssessments))
      
      setIsAssessing(false)
    }

    const pillarDescriptions = {
      'BIOHACK YOUR SLEEP': 'Quality sleep, consistent bedtime, feeling rested',
      'BIOHACK YOUR MOOD': 'Emotional balance, stress management, mental wellness',
      'BIOHACK YOUR BODY': 'Physical fitness, strength, flexibility, movement',
      'BIOHACK YOUR ENVIRONMENT': 'Clean air, good lighting, toxin-free spaces',
      'BIOHACK YOUR ENERGY': 'Sustained vitality, no energy crashes, alertness',
      'BIOHACK YOUR RELATIONSHIPS': 'Strong connections, social support, communication',
      'BIOHACK YOUR HEALTH': 'Optimal biomarkers, preventive care, vitality',
      'BIOHACK YOUR BRAIN': 'Mental clarity, focus, memory, cognitive performance'
    }

    if (isAssessing) {
      const pillar = biohackingPillars[currentPillar]
      const Icon = pillarIcons[pillar as keyof typeof pillarIcons]
      const colorClass = pillarColors[pillar as keyof typeof pillarColors]

      return (
        <div className="p-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-ocean/10">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-ocean">Biohacking Wheel Assessment</h2>
                <div className="text-sm text-gray-500">
                  {currentPillar + 1} of {biohackingPillars.length}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-ocean h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentPillar + 1) / biohackingPillars.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center mb-8">
              <Icon className={`w-16 h-16 ${colorClass} mx-auto mb-4`} />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {pillar.replace('BIOHACK YOUR ', '')}
              </h3>
              <p className="text-gray-600 mb-6">
                {pillarDescriptions[pillar as keyof typeof pillarDescriptions]}
              </p>
              
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-4">
                  Rate yourself from 1-10
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                    <button
                      key={score}
                      onClick={() => {
                        setAssessmentScores(prev => ({ ...prev, [pillar]: score }))
                        
                        setTimeout(() => {
                          if (currentPillar < biohackingPillars.length - 1) {
                            setCurrentPillar(currentPillar + 1)
                          } else {
                            completeAssessment()
                          }
                        }, 500)
                      }}
                      className={`p-4 rounded-lg border-2 font-bold text-lg transition-all ${
                        assessmentScores[pillar] === score
                          ? 'border-ocean bg-ocean text-white'
                          : 'border-gray-200 hover:border-ocean/50 text-gray-700'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="p-4 space-y-6">
        <div className="text-center mb-6">
          <Target className="w-16 h-16 text-ocean mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-ocean mb-2">Biohacking Assessment</h2>
          <p className="text-gray-600">Get your personalized health snapshot</p>
        </div>

        {wheelAssessments.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-ocean/10 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Take Your First Assessment</h3>
            <p className="text-gray-600 mb-6">
              Rate yourself across the 8 pillars to get your personal biohacking baseline
            </p>
            <button
              onClick={startAssessment}
              className="bg-ocean text-white px-6 py-3 rounded-full font-medium hover:bg-ocean/90 transition-colors"
            >
              Start Assessment
            </button>
          </div>
        ) : (
          <>
            {/* Latest Results */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-ocean/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-ocean">Latest Assessment</h3>
                <div className="text-2xl font-bold text-ocean">{wheelAssessments[0].totalScore}/80</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                {biohackingPillars.map((pillar) => {
                  const Icon = pillarIcons[pillar as keyof typeof pillarIcons]
                  const colorClass = pillarColors[pillar as keyof typeof pillarColors]
                  const shortName = pillar.replace('BIOHACK YOUR ', '')
                  const score = wheelAssessments[0][shortName.toLowerCase() as keyof BiohackingWheelAssessment] as number
                  
                  return (
                    <div key={pillar} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <Icon className={`w-4 h-4 ${colorClass}`} />
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-700">{shortName}</div>
                        <div className="text-sm font-bold text-ocean">{score}/10</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="text-center">
                <button
                  onClick={startAssessment}
                  className="bg-sky text-white px-6 py-2 rounded-full font-medium hover:bg-sky/90 transition-colors"
                >
                  Retake Assessment
                </button>
              </div>
            </div>

            {/* Progress Over Time */}
            {wheelAssessments.length > 1 && (
              <div className="bg-gradient-to-r from-ocean/5 to-sky/5 rounded-2xl p-6 border border-ocean/10">
                <h3 className="text-lg font-semibold text-ocean mb-4">Progress Over Time</h3>
                <div className="space-y-2">
                  {wheelAssessments.slice(0, 5).map((assessment, index) => (
                    <div key={assessment.date} className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <span className="text-sm text-gray-600">{assessment.date}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-ocean">{assessment.totalScore}/80</span>
                        {index > 0 && (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  const renderShop = () => {
    const recommendedProducts = [
      {
        id: 1,
        name: 'BON CHARGE Red Light Therapy',
        category: 'Light Therapy & Recovery',
        description: 'Science-backed red light therapy for cellular rejuvenation',
        discount: 'BIOHACKME',
        pillar: 'BIOHACK YOUR ENERGY',
        image: '/shop-images/BON CHARGE Red Light Therapy.webp',
        link: 'https://boncharge.com/?rfsn=8415029.b45a04'
      },
      {
        id: 2,
        name: 'BrainTap Brain Fitness Headset',
        category: 'Neurotechnology & Brain Training',
        description: 'Advanced light and sound therapy for enhanced focus',
        discount: '',
        pillar: 'BIOHACK YOUR BRAIN',
        image: '/shop-images/BrainTap Brain Fitness Headset.webp',
        link: 'https://braintap.com/membership-and-headset/?afmc=7rl'
      },
      {
        id: 3,
        name: 'Pulsetto Vagus Nerve Stimulator',
        category: 'Stress Management',
        description: 'Reduces stress in just 4 minutes through vagus nerve stimulation',
        discount: '',
        pillar: 'BIOHACK YOUR MOOD',
        image: '/shop-images/Pulsetto Vagus Nerve Stimulator.webp',
        link: 'https://pulsetto.sjv.io/YR3Nmr'
      },
      {
        id: 4,
        name: 'GlycanAge Biological Age Test',
        category: 'Biological Age Testing',
        description: 'Accurately measures your unique response to life changes',
        discount: '1111',
        pillar: 'BIOHACK YOUR HEALTH',
        image: '/shop-images/GlycanAge Biological Age Test.webp',
        link: 'https://glycanage.com/price-and-plans?discount=1111'
      },
      {
        id: 5,
        name: 'HEALR Hydrogen Water',
        category: 'Cellular Hydration',
        description: 'Sugar-free hydrogen water tablets with 12 PPM concentration',
        discount: 'BIOHACKME',
        pillar: 'BIOHACK YOUR BODY',
        image: '/shop-images/HEALR Hydrogen Water.webp',
        link: 'https://drinkhealr.com/?bg_ref=Y8H5HZhUmw'
      },
      {
        id: 6,
        name: 'Genetic Labs NMN Collection',
        category: 'Longevity Supplements',
        description: 'Australian-made longevity supplements for healthy ageing',
        discount: 'CAMILLA20',
        pillar: 'BIOHACK YOUR HEALTH',
        image: '/shop-images/Genetic Labs Australia NMN Collection.webp',
        link: 'https://geneticlabsaustralia.com/biohackme'
      }
    ]

    return (
      <div className="p-4 space-y-6">
        <div className="text-center mb-6">
          <ShoppingBag className="w-16 h-16 text-ocean mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-ocean mb-2">Biohacking Shop</h2>
          <p className="text-gray-600">Curated tools for your 8-pillar journey</p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {['All', 'Sleep', 'Energy', 'Brain', 'Body'].map((category) => (
            <button
              key={category}
              className="p-2 text-xs font-medium text-ocean border border-ocean/20 rounded-lg hover:bg-ocean/5 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="space-y-4">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-4 shadow-lg border border-ocean/10">
              <div className="flex space-x-4">
                <div className="w-20 h-20 bg-white rounded-lg border border-gray-100 flex items-center justify-center p-2">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyOEMyNC40MTgzIDI4IDI4IDI0LjQxODMgMjggMjBDMjggMTUuNTgxNyAyNC40MTgzIDEyIDIwIDEyQzE1LjU4MTcgMTIgMTIgMTUuNTgxNyAxMiAyMEMxMiAyNC40MTgzIDE1LjU4MTcgMjggMjAgMjhaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K'
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                  <p className="text-xs text-ocean mb-1">{product.category}</p>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  
                  {product.discount && (
                    <div className="mb-2">
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                        Code: {product.discount}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-ocean text-white text-xs rounded-full hover:bg-ocean/90 transition-colours"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Full Shop */}
        <div className="text-center bg-gradient-to-r from-ocean/5 to-sky/5 rounded-2xl p-6 border border-ocean/10">
          <h3 className="text-lg font-semibold text-ocean mb-2">More Products</h3>
          <p className="text-sm text-gray-600 mb-4">Explore our full range of biohacking tools</p>
          <a
            href="/shop"
            className="inline-block bg-ocean text-white px-6 py-3 rounded-full font-medium hover:bg-ocean/90 transition-colors"
          >
            Visit Full Shop
          </a>
        </div>
      </div>
    )
  }

  const renderFeelings = () => {
    const [mood, setMood] = useState(5)
    const [energy, setEnergy] = useState(5)
    const [stress, setStress] = useState(5)
    const [gratitude, setGratitude] = useState('')
    const [notes, setNotes] = useState('')

    const addFeelingsEntry = () => {
      const entry: FeelingsEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        mood,
        energy,
        stress,
        gratitude,
        notes
      }

      const updatedEntries = [entry, ...feelingsEntries]
      setFeelingsEntries(updatedEntries)
      localStorage.setItem('biohackme-feelings-entries', JSON.stringify(updatedEntries))
      
      // Reset form
      setMood(5)
      setEnergy(5)
      setStress(5)
      setGratitude('')
      setNotes('')
    }

    const todayEntry = feelingsEntries.find(entry => entry.date === new Date().toLocaleDateString())

    return (
      <div className="p-4 space-y-6">
        <div className="text-center mb-6">
          <Smile className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-ocean mb-2">How Are You Feeling?</h2>
          <p className="text-gray-600">Track your mood and energy throughout your journey</p>
        </div>

        {!todayEntry ? (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-ocean/10">
            <h3 className="text-lg font-semibold text-ocean mb-6">Today's Check-In</h3>
            
            <div className="space-y-6">
              {/* Mood Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mood (1 = Low, 10 = Excellent)
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={mood}
                    onChange={(e) => setMood(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex items-center space-x-1">
                    <Smile className="w-5 h-5 text-yellow-500" />
                    <span className="text-lg font-bold text-ocean w-8 text-center">{mood}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {mood >= 8 ? 'Feeling fantastic!' : mood >= 6 ? 'Good mood' : mood >= 4 ? 'Neutral' : 'Could be better'}
                </div>
              </div>

              {/* Energy Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Energy Level (1 = Exhausted, 10 = Energised)
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energy}
                    onChange={(e) => setEnergy(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex items-center space-x-1">
                    <Zap className="w-5 h-5 text-orange-500" />
                    <span className="text-lg font-bold text-ocean w-8 text-center">{energy}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {energy >= 8 ? 'High energy!' : energy >= 6 ? 'Good energy' : energy >= 4 ? 'Moderate' : 'Low energy'}
                </div>
              </div>

              {/* Stress Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stress Level (1 = Relaxed, 10 = Very Stressed)
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stress}
                    onChange={(e) => setStress(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex items-center space-x-1">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-lg font-bold text-ocean w-8 text-center">{stress}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {stress <= 3 ? 'Very relaxed' : stress <= 5 ? 'Manageable' : stress <= 7 ? 'Moderate stress' : 'High stress'}
                </div>
              </div>

              {/* Gratitude */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are you grateful for today?
                </label>
                <input
                  type="text"
                  value={gratitude}
                  onChange={(e) => setGratitude(e.target.value)}
                  placeholder="I'm grateful for..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-ocean"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How are you feeling? Any observations about your day?"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-ocean"
                />
              </div>

              <button
                onClick={addFeelingsEntry}
                className="w-full bg-yellow-500 text-white py-3 rounded-full font-medium hover:bg-yellow-600 transition-colours"
              >
                Save Today's Feelings
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-ocean/10">
            <h3 className="text-lg font-semibold text-ocean mb-4">Today's Entry Complete</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <Smile className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                <div className="text-lg font-bold text-ocean">{todayEntry.mood}/10</div>
                <div className="text-xs text-gray-600">Mood</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <Zap className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                <div className="text-lg font-bold text-ocean">{todayEntry.energy}/10</div>
                <div className="text-xs text-gray-600">Energy</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <Heart className="w-6 h-6 text-red-500 mx-auto mb-1" />
                <div className="text-lg font-bold text-ocean">{todayEntry.stress}/10</div>
                <div className="text-xs text-gray-600">Stress</div>
              </div>
            </div>
            {todayEntry.gratitude && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">Grateful for:</p>
                <p className="text-green-700">{todayEntry.gratitude}</p>
              </div>
            )}
            {todayEntry.notes && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Notes:</p>
                <p className="text-blue-700">{todayEntry.notes}</p>
              </div>
            )}
          </div>
        )}

        {/* Feelings History */}
        {feelingsEntries.length > 1 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-ocean/10">
            <h3 className="text-lg font-semibold text-ocean mb-4">Recent Entries</h3>
            <div className="space-y-3">
              {feelingsEntries.slice(1, 6).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">{entry.date}</span>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Smile className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{entry.mood}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium">{entry.energy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium">{entry.stress}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'track', label: 'Track', icon: Plus },
    { id: 'feelings', label: 'Mood', icon: Smile },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'assess', label: 'Assess', icon: Target },
    { id: 'shop', label: 'Shop', icon: ShoppingBag }
  ]

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <Helmet>
        <title>BiohackMe App - 8 Pillars Health Optimization</title>
        <meta name="description" content="Master the 8 pillars of biohacking with personalized tracking, masterclasses, assessments, and curated products. Your complete health optimization journey." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#022D4E" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BiohackMe" />
      </Helmet>

      {/* Header */}
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/images/biohackme-logo.png" 
              alt="BiohackMe Logo"
              className="w-8 h-8 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-ocean">BiohackMe</h1>
              <p className="text-xs text-gray-500">8-Pillar Framework</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-4">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'track' && renderTracker()}
        {activeTab === 'feelings' && renderFeelings()}
        {activeTab === 'learn' && renderLearn()}
        {activeTab === 'assess' && renderAssess()}
        {activeTab === 'shop' && renderShop()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-ocean bg-ocean/10'
                    : 'text-gray-500 hover:text-ocean'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}