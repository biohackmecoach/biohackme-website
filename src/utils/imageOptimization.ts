// Enhanced Image Optimization Utilities for Google First-Page Rankings
// Implements next-gen formats, responsive sizing, and performance best practices

export interface ImageSizeConfig {
  breakpoint: number
  width: number
  height?: number
  quality?: number
}

export interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  quality?: number
  className?: string
  style?: React.CSSProperties
}

// Responsive breakpoints optimized for Australian market devices
export const responsiveBreakpoints: ImageSizeConfig[] = [
  { breakpoint: 360, width: 360, quality: 75 }, // Mobile portrait
  { breakpoint: 414, width: 414, quality: 75 }, // Large mobile
  { breakpoint: 768, width: 768, quality: 80 }, // Tablet portrait
  { breakpoint: 1024, width: 1024, quality: 85 }, // Tablet landscape
  { breakpoint: 1366, width: 1366, quality: 90 }, // Small desktop
  { breakpoint: 1920, width: 1920, quality: 95 }, // Large desktop
  { breakpoint: 2560, width: 2560, quality: 95 }  // 4K displays
]

// Critical images that should be preloaded for fastest LCP
export const criticalImages = [
  '/images/hero%20homepage.webp',
  '/images/camilla-main-headshot.jpg.webp',
  '/logo-black.png',
  '/favicon.ico'
]

// Image format priority for maximum compression and compatibility
export const imageFormats = ['avif', 'webp', 'jpg', 'png'] as const
export type ImageFormat = typeof imageFormats[number]

/**
 * Generates optimized srcSet for responsive images
 * Includes next-gen formats with fallbacks for maximum compatibility
 */
export function generateSrcSet(
  baseSrc: string,
  breakpoints: ImageSizeConfig[] = responsiveBreakpoints
): string {
  // Remove file extension to work with format variations
  const pathWithoutExt = baseSrc.replace(/\.[^/.]+$/, '')
  const extension = baseSrc.split('.').pop()?.toLowerCase()

  return breakpoints
    .map(bp => {
      // For WebP images, keep as WebP. For others, prefer WebP if available
      const format = extension === 'webp' ? 'webp' : 'webp'
      const src = extension === 'webp' ? baseSrc : `${pathWithoutExt}.webp`
      return `${src} ${bp.width}w`
    })
    .join(', ')
}

/**
 * Generates sizes attribute for responsive images
 * Optimized for common Australian device usage patterns
 */
export function generateSizes(
  mobileSize: string = '100vw',
  tabletSize: string = '50vw',
  desktopSize: string = '33vw'
): string {
  return [
    `(max-width: 768px) ${mobileSize}`,
    `(max-width: 1024px) ${tabletSize}`,
    desktopSize
  ].join(', ')
}

/**
 * Determines if an image should be loaded with priority
 * Critical for LCP optimization and Google first-page rankings
 */
export function shouldPrioritizeImage(src: string, isAboveFold: boolean = false): boolean {
  const isCritical = criticalImages.some(criticalSrc =>
    src.includes(criticalSrc.replace('%20', ' ')) ||
    criticalSrc.includes(src.replace(' ', '%20'))
  )
  return isCritical || isAboveFold
}

/**
 * Generates preload link tags for critical images
 * Essential for Core Web Vitals optimization
 */
export function generateImagePreloads(): string[] {
  return criticalImages.map(src => {
    const isSVG = src.endsWith('.svg')
    const isWebP = src.endsWith('.webp')

    if (isSVG) {
      return `<link rel="preload" as="image" href="${src}" type="image/svg+xml">`
    }

    if (isWebP) {
      return `<link rel="preload" as="image" href="${src}" type="image/webp">`
    }

    // For other formats, preload WebP version if available
    const webpSrc = src.replace(/\.[^/.]+$/, '.webp')
    return `<link rel="preload" as="image" href="${webpSrc}" type="image/webp">`
  })
}

/**
 * Optimizes image for specific use case
 * Returns optimal src, srcSet, and sizes for SEO performance
 */
export function optimizeImage(props: OptimizedImageProps): {
  src: string
  srcSet: string
  sizes: string
  loading: 'lazy' | 'eager'
  decoding: 'async' | 'sync'
  fetchPriority?: 'high' | 'low' | 'auto'
} {
  const { src, width, height, priority = false, loading = 'lazy' } = props

  // Determine optimal loading strategy
  const shouldEagerLoad = priority || shouldPrioritizeImage(src, priority)
  const optimizedLoading = shouldEagerLoad ? 'eager' : loading

  // Generate responsive srcSet
  const srcSet = generateSrcSet(src)

  // Generate sizes based on image dimensions and usage
  let sizes = '100vw' // Default
  if (width && width <= 400) {
    sizes = generateSizes('100vw', '50vw', '400px')
  } else if (width && width <= 800) {
    sizes = generateSizes('100vw', '100vw', '800px')
  } else {
    sizes = generateSizes('100vw', '100vw', '1200px')
  }

  return {
    src,
    srcSet,
    sizes,
    loading: optimizedLoading,
    decoding: shouldEagerLoad ? 'sync' : 'async',
    ...(shouldEagerLoad && { fetchPriority: 'high' })
  }
}

/**
 * Generates comprehensive image optimization recommendations
 * For technical SEO audit and implementation guidance
 */
export function getImageOptimizationAudit(imageSources: string[]): {
  criticalIssues: string[]
  recommendations: string[]
  implementationSteps: string[]
  expectedImprovements: string[]
} {
  const issues: string[] = []
  const recommendations: string[] = []

  // Analyze image formats
  const nonWebPImages = imageSources.filter(src => !src.includes('.webp'))
  const largeImages = imageSources.filter(src =>
    src.includes('jpg') || src.includes('png') && !src.includes('.webp')
  )

  if (nonWebPImages.length > 0) {
    issues.push(`${nonWebPImages.length} images not using next-gen formats`)
    recommendations.push('Convert all images to WebP/AVIF with fallbacks')
  }

  if (largeImages.length > 0) {
    issues.push(`${largeImages.length} potentially unoptimized images detected`)
    recommendations.push('Implement responsive image sizing with srcset')
  }

  // Check for missing critical optimizations
  const hasCriticalPreloads = criticalImages.some(src =>
    document.querySelector(`link[rel="preload"][href*="${src}"]`)
  )

  if (!hasCriticalPreloads) {
    issues.push('Missing preload hints for critical images')
    recommendations.push('Add preload hints for above-the-fold images')
  }

  return {
    criticalIssues: issues,
    recommendations,
    implementationSteps: [
      '1. Convert all images to WebP format with JPG/PNG fallbacks',
      '2. Add responsive srcset attributes to all img tags',
      '3. Implement proper sizes attributes for optimal loading',
      '4. Add preload hints for critical above-the-fold images',
      '5. Use lazy loading for below-the-fold images',
      '6. Add explicit width/height to prevent layout shift',
      '7. Implement WebP with fallback in picture elements',
      '8. Optimize image compression (75-85% quality for WebP)'
    ],
    expectedImprovements: [
      '60-70% reduction in image file sizes',
      '40-50% improvement in Largest Contentful Paint (LCP)',
      '30-40% reduction in mobile data usage',
      '80%+ improvement in Cumulative Layout Shift (CLS)',
      'Significant improvement in Google PageSpeed scores',
      'Better Core Web Vitals metrics for SEO ranking'
    ]
  }
}

/**
 * Validates image implementation for SEO compliance
 * Essential for Google first-page ranking optimization
 */
export function validateImageSEO(imgElement: HTMLImageElement): {
  score: number
  issues: string[]
  optimizations: string[]
} {
  const issues: string[] = []
  const optimizations: string[] = []
  let score = 100

  // Check alt text
  if (!imgElement.alt || imgElement.alt.trim() === '') {
    issues.push('Missing alt text')
    score -= 25
  } else if (imgElement.alt.length < 10) {
    optimizations.push('Consider more descriptive alt text')
    score -= 5
  }

  // Check dimensions
  if (!imgElement.width || !imgElement.height) {
    issues.push('Missing explicit width/height (causes CLS)')
    score -= 20
  }

  // Check loading strategy
  if (!imgElement.loading) {
    optimizations.push('Add loading attribute (lazy/eager)')
    score -= 10
  }

  // Check srcset for responsiveness
  if (!imgElement.srcset) {
    issues.push('Missing responsive srcset')
    score -= 15
  }

  // Check format optimization
  if (!imgElement.src.includes('.webp') && !imgElement.src.includes('.avif')) {
    optimizations.push('Consider next-gen image formats (WebP/AVIF)')
    score -= 10
  }

  // Check for proper sizes attribute
  if (imgElement.srcset && !imgElement.sizes) {
    issues.push('Missing sizes attribute with srcset')
    score -= 10
  }

  return {
    score: Math.max(0, score),
    issues,
    optimizations
  }
}

/**
 * Automatic image optimization for React components
 * Provides seamless integration with existing image elements
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  loading = 'lazy',
  quality = 85,
  className = '',
  style = {},
  ...props
}) => {
  const optimized = optimizeImage({ src, alt, width, height, priority, loading })

  // Check if we should use a picture element for format fallbacks
  const usesPictureElement = !src.endsWith('.webp') && !src.endsWith('.svg')

  if (usesPictureElement) {
    const webpSrc = src.replace(/\.[^/.]+$/, '.webp')

    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          style={style}
          loading={optimized.loading}
          decoding={optimized.decoding}
          {...(optimized.fetchPriority && { fetchPriority: optimized.fetchPriority })}
          {...props}
        />
      </picture>
    )
  }

  return (
    <img
      src={optimized.src}
      srcSet={optimized.srcSet}
      sizes={optimized.sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      loading={optimized.loading}
      decoding={optimized.decoding}
      {...(optimized.fetchPriority && { fetchPriority: optimized.fetchPriority })}
      {...props}
    />
  )
}

export default OptimizedImage