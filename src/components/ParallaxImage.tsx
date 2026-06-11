import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  intensity?: number
  overlay?: boolean
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  intensity = 20,
  overlay = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(useTransform(mx, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 80,
    damping: 20,
  })
  const sy = useSpring(useTransform(my, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 80,
    damping: 20,
  })

  const handleMove = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.img
        src={src}
        alt={alt}
        className="h-[115%] w-[115%] max-w-none object-cover object-center"
        style={reducedMotion ? undefined : { x: sx, y: sy }}
        loading="eager"
        draggable={false}
      />
      {overlay && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(8,8,7,0.92) 0%, rgba(8,8,7,0.45) 45%, rgba(8,8,7,0.15) 100%)',
          }}
        />
      )}
    </div>
  )
}
