import { useEffect, useRef } from 'react'
import { gsap } from '../providers/SmoothScrollProvider'
import { OptimizedImage } from './OptimizedImage'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface RevealImageProps {
  src: string
  alt: string
  className?: string
  direction?: 'left' | 'up'
}

export function RevealImage({
  src,
  alt,
  className = '',
  direction = 'up',
}: RevealImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !wrapRef.current || !imgRef.current) return

    const clipFrom = direction === 'left' ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)'

    gsap.fromTo(
      wrapRef.current,
      { clipPath: clipFrom },
      {
        clipPath: 'inset(0 0 0 0)',
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    )

    gsap.fromTo(
      imgRef.current,
      { scale: 1.12 },
      {
        scale: 1,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    )
  }, [direction, reducedMotion])

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <OptimizedImage
        ref={imgRef}
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  )
}
