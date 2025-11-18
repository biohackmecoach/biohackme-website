import { useEffect, useRef, useState } from 'react'

interface LogoConfig {
  src: string
  alt?: string
  height?: number
  scale?: number
}

interface LogoLoopProps {
  logos: (string | LogoConfig | React.ReactNode)[]
  speed?: number
  direction?: 'left' | 'right'
  logoHeight?: number
  gap?: number
  pauseOnHover?: boolean
  fadeOut?: boolean
  fadeOutColor?: string
  scaleOnHover?: boolean
  ariaLabel?: string
  className?: string
}

export default function LogoLoop({
  logos,
  speed = 50,
  direction = 'left',
  logoHeight = 32,
  gap = 48,
  pauseOnHover = true,
  fadeOut = true,
  fadeOutColor = 'white',
  scaleOnHover = false,
  ariaLabel = 'Partner logos',
  className = ''
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const totalLogos = logos.length
    const logoWidth = logoHeight * 2 // Approximate width based on height
    const totalWidth = (logoWidth + gap) * totalLogos

    // Create CSS animation
    const keyframes = `
      @keyframes logoLoop${direction} {
        0% {
          transform: translateX(${direction === 'left' ? '0px' : `-${totalWidth}px`});
        }
        100% {
          transform: translateX(${direction === 'left' ? `-${totalWidth}px` : '0px'});
        }
      }
    `

    // Add keyframes to document if not already present
    const styleId = `logo-loop-${direction}`
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = keyframes
      document.head.appendChild(style)
    }

    // Apply animation to container
    const animationDuration = totalWidth / speed
    container.style.animation = `logoLoop${direction} ${animationDuration}s linear infinite`

    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [logos, speed, direction, logoHeight, gap])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (isPaused) {
      container.style.animationPlayState = 'paused'
    } else {
      container.style.animationPlayState = 'running'
    }
  }, [isPaused])

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true)
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false)
    }
  }

  const renderLogo = (logo: string | LogoConfig | React.ReactNode, index: number) => {
    const isString = typeof logo === 'string'
    const isLogoConfig = typeof logo === 'object' && logo !== null && 'src' in logo
    
    return (
      <div
        key={index}
        className={`flex-shrink-0 flex items-center justify-center transition-transform duration-300 ${
          scaleOnHover ? 'hover:scale-110' : ''
        }`}
        style={{ marginRight: `${gap}px` }}
      >
        {isString ? (
          <img
            src={logo as string}
            alt={`Logo ${index + 1}`}
            className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            style={{ height: `${logoHeight}px`, width: 'auto' }}
            loading="lazy"
          />
        ) : isLogoConfig ? (
          <img
            src={(logo as LogoConfig).src}
            alt={(logo as LogoConfig).alt || `Logo ${index + 1}`}
            className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            style={{ 
              height: `${(logo as LogoConfig).height || logoHeight}px`, 
              width: 'auto',
              transform: (logo as LogoConfig).scale ? `scale(${(logo as LogoConfig).scale})` : 'none'
            }}
            loading="lazy"
          />
        ) : (
          logo
        )}
      </div>
    )
  }

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos]

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ width: '100%' }}
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fade out gradients */}
      {fadeOut && (
        <>
          <div 
            className="absolute left-0 top-0 z-10 h-full w-20 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`
            }}
          />
          <div 
            className="absolute right-0 top-0 z-10 h-full w-20 pointer-events-none"
            style={{
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`
            }}
          />
        </>
      )}
      
      {/* Logo container */}
      <div
        ref={containerRef}
        className="flex items-center whitespace-nowrap"
        style={{ 
          height: `${logoHeight + 20}px`,
          transform: 'translateX(0)',
        }}
      >
        {duplicatedLogos.map((logo, index) => renderLogo(logo, index))}
      </div>
    </div>
  )
}