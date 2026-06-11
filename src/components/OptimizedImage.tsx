import { forwardRef, useState, type ImgHTMLAttributes } from 'react'

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  priority?: boolean
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  function OptimizedImage(
    { src, alt, priority = false, className = '', ...rest },
    ref,
  ) {
    const [loaded, setLoaded] = useState(false)

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        draggable={false}
        {...rest}
      />
    )
  },
)
