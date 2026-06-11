import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface AnimatedTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  delay?: number
}

export function AnimatedText({
  text,
  className = '',
  as: Tag = 'h1',
  delay = 0,
}: AnimatedTextProps) {
  const reducedMotion = useReducedMotion()
  const words = text.split(' ')

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={`overflow-hidden ${className}`} aria-label={text}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.1,
              delay: delay + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-hidden
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
