import { motion } from 'framer-motion'

export function FilmGrain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.035] mix-blend-overlay"
      aria-hidden
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />
  )
}

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 1.2 }}
    >
      <span className="label-caps text-text-muted">Scroll</span>
      <motion.div
        className="h-10 w-px bg-gradient-to-b from-accent/60 to-transparent"
        animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
