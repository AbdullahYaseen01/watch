import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type CursorLabel = 'DRAG' | 'VIEW' | 'EXPLORE' | 'RESERVE' | null

interface CursorState {
  label: CursorLabel
  scale: number
}

let cursorState: CursorState = { label: null, scale: 1 }
const listeners = new Set<(s: CursorState) => void>()

export function setCursorState(partial: Partial<CursorState>) {
  cursorState = { ...cursorState, ...partial }
  listeners.forEach((fn) => fn(cursorState))
}

export function CustomCursor() {
  const reducedMotion = useReducedMotion()
  const [state, setState] = useState(cursorState)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 35 })
  const springY = useSpring(y, { stiffness: 500, damping: 35 })

  useEffect(() => {
    if (reducedMotion) return

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const onListener = (s: CursorState) => setState(s)
    listeners.add(onListener)

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      listeners.delete(onListener)
    }
  }, [reducedMotion, x, y])

  if (reducedMotion) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          animate={{ scale: state.scale }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-2.5 w-2.5 rounded-full bg-white" />
          {state.label && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="label-caps absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-white"
            >
              {state.label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
