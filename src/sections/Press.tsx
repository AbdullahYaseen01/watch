import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from '../components/SectionHeader'
import { PRESS } from '../lib/images'

export function Press() {
  const [index, setIndex] = useState(0)
  const dragStart = useRef(0)

  const next = () => setIndex((i) => (i + 1) % PRESS.length)
  const prev = () => setIndex((i) => (i - 1 + PRESS.length) % PRESS.length)

  return (
    <section className="section-wrap section-py" aria-label="Press and testimonials">
      <div className="section-inner">
        <SectionHeader label="Press" title="As featured in" align="center" />

        <div
          className="glass-panel mx-auto mt-14 max-w-3xl overflow-hidden rounded-sm p-8 md:mt-20 md:p-14"
          onPointerDown={(e) => {
            dragStart.current = e.clientX
          }}
          onPointerUp={(e) => {
            const diff = e.clientX - dragStart.current
            if (diff > 60) prev()
            else if (diff < -60) next()
          }}
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p className="font-serif text-[clamp(1.35rem,3vw,2rem)] leading-snug font-light italic text-text">
                &ldquo;{PRESS[index].quote}&rdquo;
              </p>
              <footer className="label-caps mt-8 text-accent">{PRESS[index].source}</footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={prev}
              className="label-caps text-text-muted transition-colors hover:text-accent"
              aria-label="Previous quote"
            >
              Prev
            </button>
            <div className="flex gap-2">
              {PRESS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-accent' : 'w-1.5 bg-glass-border'
                  }`}
                  aria-label={`Go to quote ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="label-caps text-text-muted transition-colors hover:text-accent"
              aria-label="Next quote"
            >
              Next
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-50 md:mt-16">
          {['HODINKEE', 'Monochrome', 'Revolution', 'WatchTime'].map((name) => (
            <span key={name} className="label-caps text-text-muted">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
