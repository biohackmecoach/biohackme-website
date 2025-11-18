import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Circle, Clock, Download, Users } from 'lucide-react'
import VideoPlayer from '../components/VideoPlayer'
import { masterclasses } from '../data/masterclasses'

export default function CourseViewPage() {
  // In a real app, this would come from URL params
  const [courseId] = useState('biohacking-foundation')
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [moduleProgress, setModuleProgress] = useState<Record<string, number>>({})
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set())

  const course = masterclasses.find(m => m.id === courseId)
  const currentModule = course?.modules[currentModuleIndex]

  useEffect(() => {
    // Load progress from localStorage or API
    const savedProgress = localStorage.getItem(`course-${courseId}-progress`)
    if (savedProgress) {
      const { modules, completed } = JSON.parse(savedProgress)
      setModuleProgress(modules || {})
      setCompletedModules(new Set(completed || []))
    }
  }, [courseId])

  const handleModuleProgress = (moduleId: string, progress: number) => {
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: progress
    }))

    // Save to localStorage
    const progressData = {
      modules: { ...moduleProgress, [moduleId]: progress },
      completed: Array.from(completedModules)
    }
    localStorage.setItem(`course-${courseId}-progress`, JSON.stringify(progressData))
  }

  const handleModuleComplete = (moduleId: string) => {
    const newCompleted = new Set(completedModules)
    newCompleted.add(moduleId)
    setCompletedModules(newCompleted)

    // Auto-advance to next module
    if (currentModuleIndex < (course?.modules.length || 0) - 1) {
      setTimeout(() => {
        setCurrentModuleIndex(prev => prev + 1)
      }, 2000)
    }

    // Save progress
    const progressData = {
      modules: moduleProgress,
      completed: Array.from(newCompleted)
    }
    localStorage.setItem(`course-${courseId}-progress`, JSON.stringify(progressData))
  }

  const getOverallProgress = () => {
    if (!course) return 0
    const totalModules = course.modules.length
    const completedCount = completedModules.size
    return Math.round((completedCount / totalModules) * 100)
  }

  if (!course || !currentModule) {
    return (
      <div className="min-h-screen bg-cloud flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-montserrat font-light text-ocean mb-4">Course not found</h1>
          <button className="text-sky hover:text-ocean transition-colors">
            Return to Masterclasses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cloud">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-ice">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-ocean hover:text-sky transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-montserrat font-light text-ocean">
                  {course.title}
                </h1>
                <p className="text-sm text-charcoal/60">
                  Module {currentModuleIndex + 1} of {course.modules.length}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* Overall Progress */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-charcoal/60">Progress:</span>
                <div className="w-24 h-2 bg-ice rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-ocean to-sky rounded-full transition-all duration-500"
                    style={{ width: `${getOverallProgress()}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-ocean">
                  {getOverallProgress()}%
                </span>
              </div>

              {/* User Info */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-ocean to-sky rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">C</span>
                </div>
                <span className="text-sm text-charcoal/80">Camilla</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <VideoPlayer
              title={currentModule.title}
              duration={currentModule.duration}
              resources={currentModule.resources}
              onProgress={(progress) => handleModuleProgress(currentModule.id, progress)}
              onComplete={() => handleModuleComplete(currentModule.id)}
            />

            {/* Module Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-white rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-montserrat font-light text-ocean mb-4">
                About This Module
              </h2>
              <p className="text-charcoal/80 leading-relaxed mb-6">
                {currentModule.description}
              </p>

              {/* Module Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-ice rounded-xl">
                  <Clock className="w-6 h-6 text-sky mx-auto mb-2" />
                  <div className="text-lg font-bold text-ocean">{currentModule.duration}</div>
                  <div className="text-sm text-charcoal/60">Duration</div>
                </div>
                <div className="text-center p-4 bg-ice rounded-xl">
                  <Download className="w-6 h-6 text-sky mx-auto mb-2" />
                  <div className="text-lg font-bold text-ocean">{currentModule.resources.length}</div>
                  <div className="text-sm text-charcoal/60">Resources</div>
                </div>
                <div className="text-center p-4 bg-ice rounded-xl">
                  <Users className="w-6 h-6 text-sky mx-auto mb-2" />
                  <div className="text-lg font-bold text-ocean">1,247</div>
                  <div className="text-sm text-charcoal/60">Students</div>
                </div>
                <div className="text-center p-4 bg-ice rounded-xl">
                  <CheckCircle className="w-6 h-6 text-sky mx-auto mb-2" />
                  <div className="text-lg font-bold text-ocean">
                    {completedModules.has(currentModule.id) ? '100%' : `${Math.round(moduleProgress[currentModule.id] || 0)}%`}
                  </div>
                  <div className="text-sm text-charcoal/60">Complete</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Course Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
              <div className="p-6 bg-gradient-to-r from-ocean to-sky text-white">
                <h3 className="font-montserrat font-light text-lg mb-2">Course Modules</h3>
                <div className="text-sm opacity-90">
                  {completedModules.size} of {course.modules.length} completed
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {course.modules.map((module, index) => {
                  const isCompleted = completedModules.has(module.id)
                  const isCurrent = index === currentModuleIndex
                  const isLocked = index > 0 && !completedModules.has(course.modules[index - 1].id)

                  return (
                    <motion.button
                      key={module.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => !isLocked && setCurrentModuleIndex(index)}
                      disabled={isLocked}
                      className={`w-full p-4 text-left border-b border-ice hover:bg-ice/50 transition-colors ${
                        isCurrent ? 'bg-ice' : ''
                      } ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-sky" />
                          ) : isCurrent ? (
                            <div className="w-5 h-5 border-2 border-sky rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-sky rounded-full" />
                            </div>
                          ) : (
                            <Circle className={`w-5 h-5 ${isLocked ? 'text-charcoal/30' : 'text-charcoal/40'}`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium mb-1 ${
                            isCurrent ? 'text-ocean' : isLocked ? 'text-charcoal/40' : 'text-charcoal/80'
                          }`}>
                            {module.title}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-charcoal/60">
                            <Clock className="w-3 h-3" />
                            <span>{module.duration}</span>
                          </div>
                          {moduleProgress[module.id] > 0 && !isCompleted && (
                            <div className="mt-2">
                              <div className="w-full h-1 bg-ice rounded-full">
                                <div 
                                  className="h-full bg-sky rounded-full transition-all duration-300"
                                  style={{ width: `${moduleProgress[module.id]}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Course Completion */}
              {getOverallProgress() === 100 && (
                <div className="p-6 bg-gradient-to-r from-sky to-ocean text-white text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                  <h4 className="font-montserrat font-light text-lg mb-2">
                    Congratulations!
                  </h4>
                  <p className="text-sm opacity-90 mb-4">
                    You've completed the masterclass
                  </p>
                  <button className="bg-white text-ocean px-6 py-2 rounded-full font-medium hover:bg-white/90 transition-colors">
                    Get Certificate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}