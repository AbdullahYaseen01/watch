import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../providers/SmoothScrollProvider'
import { OptimizedImage } from '../components/OptimizedImage'
import { SectionHeader } from '../components/SectionHeader'
import { TIMELINE, IMAGES } from '../lib/images'
import { useReducedMotion } from '../hooks/useReducedMotion'

const HERITAGE_STATS = [
  { value: '1874', label: 'Founded' },
  { value: '11', label: 'Pairs of hands' },
  { value: '47', label: 'Master watchmakers' },
] as const

const TIMELINE_COLORS = ['#C5A572', '#5B9BD5', '#B76E79', '#00CCAA'] as const

export function Craftsmanship() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0.6 },
          {
            clipPath: 'inset(0 0 0 0)',
            opacity: 1,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          },
        )
      }

      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.querySelectorAll('[data-marker]'),
          { scale: 0, opacity: 0, y: 24 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          },
        )
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="section-wrap section-py relative overflow-hidden"
      aria-label="Craftsmanship heritage"
    >
      {/* Section ambient */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-[120px] opacity-30"
        style={{ background: 'radial-gradient(circle, #C5A572 0%, transparent 70%)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full blur-[100px] opacity-20"
        style={{ background: 'radial-gradient(circle, #5B9BD5 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="section-inner relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              label="Heritage"
              title="A century and a half of quiet obsession"
              description="In our Geneva atelier, time is measured not in quarters but in generations. Each watch passes through eleven pairs of hands before it earns the Aurelius name."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {HERITAGE_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-md border border-white/[0.08] bg-white/[0.03] px-4 py-3 backdrop-blur-sm"
                >
                  <span className="block font-serif text-2xl text-accent">{stat.value}</span>
                  <span className="label-caps mt-1 block text-text-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium watch frame */}
          <div
            ref={imageRef}
            className="relative aspect-[4/5] overflow-hidden rounded-md border border-white/[0.08] shadow-2xl lg:aspect-[5/6]"
            style={{ boxShadow: '0 0 80px -20px rgba(197,165,114,0.35)' }}
          >
            <div className="absolute inset-0 bg-[#0a0908]" />
            <div
              className="absolute -top-1/4 left-1/4 h-2/3 w-2/3 rounded-full blur-[80px] opacity-50"
              style={{ backgroundColor: '#C5A572' }}
            />
            <div
              className="absolute -bottom-1/4 right-0 h-1/2 w-1/2 rounded-full blur-[60px] opacity-35"
              style={{ backgroundColor: '#5B9BD5' }}
            />
            <OptimizedImage
              src={IMAGES.heritage}
              alt="Aurelius luxury chronograph"
              className="absolute inset-0 h-full w-full object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-[#C5A572]/10" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#5B9BD5]/15" />

            <motion.span
              className="label-caps absolute top-4 left-4 rounded-full border border-accent/30 bg-bg/70 px-3 py-1.5 text-accent backdrop-blur-md"
              animate={{ boxShadow: ['0 0 0 0 rgba(197,165,114,0.2)', '0 0 0 6px rgba(197,165,114,0)', '0 0 0 0 rgba(197,165,114,0.2)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Geneva · Since 1874
            </motion.span>

            <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between">
              <p className="max-w-[12rem] font-serif text-lg leading-snug text-text/90">
                Every surface finished by hand
              </p>
              <span
                className="label-caps rounded-full px-3 py-1.5"
                style={{
                  background: 'rgba(0,204,170,0.12)',
                  border: '1px solid rgba(0,204,170,0.25)',
                  color: '#00CCAA',
                }}
              >
                Hand-finished
              </span>
            </div>
          </div>
        </div>

        <div className="hairline mt-16 md:mt-24" />

        {/* Colorful timeline */}
        <div ref={timelineRef} className="mt-12 overflow-x-auto pb-2 md:mt-16">
          <div className="relative flex min-w-max gap-0 pt-2">
            <div className="absolute top-8 right-0 left-0 h-px origin-left bg-glass-border" />
            <div
              ref={lineRef}
              className="absolute top-8 right-0 left-0 h-px origin-left scale-x-0"
              style={{
                background: 'linear-gradient(90deg, #C5A572, #5B9BD5, #B76E79, #00CCAA)',
              }}
            />
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className="relative w-56 shrink-0 px-4 first:pl-0 last:pr-0 md:w-64 md:px-6"
                data-marker
              >
                <div
                  className="mb-6 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-bg"
                  style={{ borderColor: TIMELINE_COLORS[i] }}
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: TIMELINE_COLORS[i],
                      boxShadow: `0 0 12px ${TIMELINE_COLORS[i]}80`,
                    }}
                  />
                </div>
                <span
                  className="font-serif text-2xl md:text-3xl"
                  style={{ color: TIMELINE_COLORS[i] }}
                >
                  {item.year}
                </span>
                <h3 className="mt-2 font-serif text-lg text-text">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
