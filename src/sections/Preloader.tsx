import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { BRAND } from '../lib/constants'
import { IMAGES } from '../lib/images'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const counterRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      onComplete()
      setVisible(false)
      return
    }

    const obj = { value: 0 }
    const tween = gsap.to(obj, {
      value: 100,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(obj.value)
        setProgress(v)
        if (counterRef.current) counterRef.current.textContent = String(v).padStart(3, '0')
      },
      onComplete: () => {
        setTimeout(() => setVisible(false), 400)
        setTimeout(onComplete, 1400)
      },
    })

    return () => {
      tween.kill()
    }
  }, [onComplete, reducedMotion])

  if (!visible && reducedMotion) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Watch photo silhouette */}
          <motion.div
            className="relative mb-12 h-28 w-28 overflow-hidden rounded-full opacity-30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={IMAGES.macroDial}
              alt=""
              className="h-full w-full object-cover"
              aria-hidden
            />
            <div className="absolute inset-0 rounded-full ring-1 ring-accent/40 ring-inset" />
          </motion.div>

          <div className="flex items-baseline gap-1">
            <span
              ref={counterRef}
              className="font-serif text-5xl font-light tracking-wider text-accent tabular-nums"
            >
              000
            </span>
            <span className="label-caps text-accent/60">%</span>
          </div>

          <motion.p
            className="label-caps mt-6 text-text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {BRAND}
          </motion.p>

          {/* Progress bar */}
          <div className="absolute bottom-16 h-px w-48 overflow-hidden bg-glass-border">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Curtain wipe */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-bg"
            initial={{ clipPath: 'inset(0 0 0 0)' }}
            animate={
              progress >= 100
                ? { clipPath: 'inset(0 0 100% 0)' }
                : { clipPath: 'inset(0 0 0 0)' }
            }
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
