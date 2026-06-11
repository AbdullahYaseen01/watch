import { useEffect, useRef } from 'react'
import { gsap } from '../providers/SmoothScrollProvider'
import { COLLECTION } from '../lib/images'
import { OptimizedImage } from '../components/OptimizedImage'
import { SectionHeader } from '../components/SectionHeader'
import { setCursorState } from '../components/CustomCursor'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Collection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !gridRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current!.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, gridRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="collection" className="section-wrap section-py" aria-label="Watch collection">
      <div className="section-inner">
        <SectionHeader label="Collection" title="Curated references" />

        <div
          ref={gridRef}
          className="mt-14 grid auto-rows-[minmax(180px,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20 md:auto-rows-[220px] md:grid-cols-4 md:gap-5"
        >
          {COLLECTION.map((watch) => (
            <article
              key={watch.name}
              className={`group relative min-h-[200px] overflow-hidden rounded-sm bg-bg-elevated ${watch.span}`}
              onMouseMove={(e) => {
                const el = e.currentTarget
                const rect = el.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width - 0.5
                const y = (e.clientY - rect.top) / rect.height - 0.5
                el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = ''
                setCursorState({ label: null, scale: 1 })
              }}
              onMouseEnter={() => setCursorState({ label: 'VIEW', scale: 1.6 })}
              style={{ transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
              <OptimizedImage
                src={watch.image}
                alt={watch.name}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-5 transition-transform duration-500 group-hover:translate-y-0 md:p-6">
                <h3 className="font-serif text-lg text-text">{watch.name}</h3>
                <p className="mt-1 font-serif text-accent">${watch.price.toLocaleString()}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
