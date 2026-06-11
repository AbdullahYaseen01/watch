import { useEffect, useRef } from 'react'
import { gsap } from '../providers/SmoothScrollProvider'
import { EXPLODED_PARTS, IMAGES } from '../lib/images'
import { OptimizedImage } from '../components/OptimizedImage'
import { SectionHeader } from '../components/SectionHeader'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function ExplodedView() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      id="movement"
      ref={sectionRef}
      className="section-wrap section-py"
      aria-label="Exploded movement view"
    >
      <div className="section-inner">
        <SectionHeader label="Anatomy" title="Engineered in layers" />

        <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          {/* Centered watch image */}
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-bg-elevated sm:aspect-square">
              <OptimizedImage
                src={IMAGES.macroDial}
                alt="Luxury watch dial — exploded view detail"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-bg/20" />
            </div>
          </div>

          {/* Callout cards — structured grid, no floating overlap */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5 lg:pt-8">
            {EXPLODED_PARTS.map((part, i) => (
              <div
                key={part.id}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="glass-panel rounded-sm p-5 md:p-6"
                style={{ opacity: reducedMotion ? 1 : undefined }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="label-caps text-accent/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 bg-accent/20" />
                </div>
                <p className="font-serif text-xl text-text">{part.label}</p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-text-muted">
                  {part.spec}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hairline mt-16 md:mt-24" />

        <div className="mt-12 grid grid-cols-2 gap-8 md:mt-16 md:grid-cols-4 md:gap-6">
          {[
            { n: 31, l: 'Jewels' },
            { n: 28800, l: 'Vibrations/hr' },
            { n: 72, l: 'Hour reserve' },
            { n: 100, l: 'Metres WR' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <span className="font-serif text-3xl text-accent md:text-4xl">
                {s.n.toLocaleString()}
              </span>
              <p className="label-caps mt-3 text-text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
