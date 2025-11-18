import React, { useState } from 'react'
import { Play, CheckCircle } from 'lucide-react'

interface CustomVideoPlayerProps {
  thumbnailUrl?: string
  videoEmbedUrl: string
  title: string
  duration?: string
  status?: 'available' | 'coming-soon'
}

export default function CustomVideoPlayer({
  thumbnailUrl,
  videoEmbedUrl,
  title,
  duration = '30 minutes',
  status = 'available'
}: CustomVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    if (status === 'available') {
      setIsPlaying(true)
    }
  }

  if (isPlaying && status === 'available') {
    return (
      <div className="relative overflow-hidden rounded-lg shadow-xl">
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src={videoEmbedUrl}
            frameBorder="0"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title={title}
            allow="autoplay"
          />
        </div>
        <button
          onClick={() => setIsPlaying(false)}
          className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm hover:bg-black/70 transition-colors"
        >
          ← Back to Preview
        </button>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-lg shadow-xl group cursor-pointer">
      {/* Video Thumbnail */}
      <div
        className="relative bg-gradient-to-br from-ocean to-sky aspect-video flex items-center justify-center"
        onClick={handlePlay}
      >
        {/* Thumbnail Image - if provided */}
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          {status === 'available' ? (
            <span className="inline-flex items-center px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
              <CheckCircle className="w-3 h-3 mr-1" />
              Available Now
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 bg-ocean/80 text-white text-xs font-semibold rounded-full">
              Coming Soon
            </span>
          )}
        </div>

        {/* Duration Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 bg-black/50 text-white text-xs rounded">
            {duration}
          </span>
        </div>

        {/* Play Button */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg">
            <Play className="w-8 h-8 text-ocean ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Video Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm text-white/80">
            {status === 'available' ? 'Click to watch now' : 'Notify me when available'}
          </p>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ocean/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}