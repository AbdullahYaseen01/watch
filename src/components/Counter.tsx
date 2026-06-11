import { useEffect, useRef } from 'react'
import { gsap } from '../providers/SmoothScrollProvider'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface CounterProps {
  value: number
  suffix?: string
  label: string
  className?: string
}

export function Counter({ value, suffix = '', label, className = '' }: CounterProps) {
  const numRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !numRef.current) {
      if (numRef.current) numRef.current.textContent = `${value}${suffix}`
      return
    }

    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: numRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.textContent = `${Math.round(obj.val)}${suffix}`
        }
      },
    })
  }, [value, suffix, reducedMotion])

  return (
    <div className={`text-center ${className}`}>
      <span
        ref={numRef}
        className="font-serif text-[clamp(3rem,8vw,6rem)] leading-none font-light text-accent tabular-nums"
      >
        0{suffix}
      </span>
      <p className="label-caps mt-4 text-text-muted">{label}</p>
    </div>
  )
}
