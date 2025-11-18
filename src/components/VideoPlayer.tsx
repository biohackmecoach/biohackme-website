import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, Download, BookOpen } from 'lucide-react'

interface VideoPlayerProps {
  videoUrl?: string
  title: string
  duration: string
  onProgress?: (progress: number) => void
  onComplete?: () => void
  resources?: Array<{
    id: string
    title: string
    type: string
    url: string
  }>
}

export default function VideoPlayer({ 
  videoUrl, 
  title, 
  duration, 
  onProgress, 
  onComplete,
  resources = []
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [showControls, setShowControls] = useState(true)

  // Simulate video progress for demo
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.5
          if (newProgress >= 100) {
            setIsPlaying(false)
            onComplete?.()
            return 100
          }
          
          onProgress?.(newProgress)
          
          // Update current time display
          const totalSeconds = (newProgress / 100) * parseDuration(duration)
          setCurrentTime(formatTime(totalSeconds))
          
          return newProgress
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isPlaying, duration, onProgress, onComplete])

  const parseDuration = (duration: string): number => {
    // Convert duration like "45 minutes" to seconds
    const minutes = parseInt(duration.split(' ')[0]) || 0
    return minutes * 60
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newProgress = (clickX / rect.width) * 100
    setProgress(newProgress)
    
    const totalSeconds = (newProgress / 100) * parseDuration(duration)
    setCurrentTime(formatTime(totalSeconds))
    
    onProgress?.(newProgress)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Video Container */}
      <div 
        className="relative aspect-video bg-gradient-to-br from-ocean to-sky flex items-center justify-center cursor-pointer group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onClick={togglePlay}
      >
        {/* Video Placeholder (in real implementation, this would be an actual video element) */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean/90 to-sky/90" />
        
        {/* Play/Pause Button */}
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: showControls || !isPlaying ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            togglePlay()
          }}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white" />
          ) : (
            <Play className="w-8 h-8 text-white ml-1" />
          )}
        </motion.button>

        {/* Progress Indicator */}
        {isPlaying && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-sm font-medium">
                {Math.round(progress)}% complete
              </span>
            </div>
          </div>
        )}

        {/* Video Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6"
        >
          {/* Progress Bar */}
          <div 
            className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  togglePlay()
                }}
                className="text-white hover:text-white/80 transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleMute()
                }}
                className="text-white hover:text-white/80 transition-colors"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>

              <span className="text-white text-sm">
                {currentTime} / {duration}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button className="text-white hover:text-white/80 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="text-white hover:text-white/80 transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Info */}
      <div className="p-6">
        <h3 className="text-2xl font-montserrat font-light text-ocean mb-2">
          {title}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-charcoal/60">{duration}</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-sky rounded-full"></div>
            <span className="text-sm text-charcoal/60">
              {progress > 0 ? `${Math.round(progress)}% completed` : 'Not started'}
            </span>
          </div>
        </div>

        {/* Resources */}
        {resources.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-montserrat font-light text-ocean mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Course Resources
            </h4>
            <div className="space-y-2">
              {resources.map((resource) => (
                <div key={resource.id} className="flex items-center justify-between p-3 bg-ice rounded-lg hover:bg-ice/80 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-sky/20 rounded-lg flex items-center justify-center mr-3">
                      <Download className="w-4 h-4 text-sky" />
                    </div>
                    <div>
                      <h5 className="font-medium text-ocean">{resource.title}</h5>
                      <span className="text-sm text-charcoal/60 capitalize">{resource.type}</span>
                    </div>
                  </div>
                  <button className="text-sky hover:text-ocean transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}