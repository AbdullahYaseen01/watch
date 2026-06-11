import { motion } from 'framer-motion'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'ghost'
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const reducedMotion = useReducedMotion()

  const handleMove = (e: MouseEvent) => {
    if (reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
  }

  const base =
    'relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 font-sans text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-500 focus-visible:outline-none'

  const variants = {
    primary:
      'border border-accent/40 bg-accent/10 text-accent hover:bg-accent/20 hover:border-accent/60',
    ghost: 'border border-glass-border bg-transparent text-text hover:border-accent/30',
  }

  const sharedProps = {
    className: `${base} ${variants[variant]} ${className}`,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    style: { transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)' },
  }

  const inner = (
    <>
      <motion.span
        className="pointer-events-none absolute inset-0 bg-accent/5"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ borderRadius: '9999px' }}
      />
      <span className="relative z-10">{children}</span>
    </>
  )

  if (href) {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} {...sharedProps}>
        {inner}
      </a>
    )
  }

  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} type="button" {...sharedProps}>
      {inner}
    </button>
  )
}
