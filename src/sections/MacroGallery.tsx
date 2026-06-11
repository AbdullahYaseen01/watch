import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../providers/SmoothScrollProvider'
import { LumeComparison } from '../components/LumeComparison'
import { OptimizedImage } from '../components/OptimizedImage'
import { SectionHeader } from '../components/SectionHeader'
import { IMAGES } from '../lib/images'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { setCursorState } from '../components/CustomCursor'

const MACRO_ITEMS = [
  {
    src: IMAGES.macroDial,
    title: 'Guilloché dial',
    desc: 'Hand-turned rose engine · 120 lines per millimetre',
    accent: '#2E5A8E',
    glow: '#5B9BD5',
    tag: 'Dial',
  },
  {
    src: IMAGES.collection[1],
    title: 'Polished case',
    desc: '316L steel · Zaratsu mirror finishing',
    accent: '#C5A572',
    glow: '#E8D5B5',
    tag: 'Case',
  },
  {
    src: IMAGES.movement,
    title: 'Calibre A-1874',
    desc: 'Perlage · Côtes de Genève · 31 jewels',
    accent: '#6B4F1D',
    glow: '#D4AF37',
    tag: 'Movement',
  },
  {
    src: IMAGES.collection[2],
    title: 'On the wrist',
    desc: '40mm balanced proportions · 100m water resistance',
    accent: '#7A4A52',
    glow: '#B76E79',
    tag: 'Lifestyle',
  },
] as const

function MacroCard({
  item,
  index,
}: {
  item: (typeof MACRO_ITEMS)[number]
  index: number
}) {
  return (
    <motion.article
      className="group relative w-[82vw] shrink-0 sm:w-[340px] md:w-[380px]"
      onMouseEnter={() => setCursorState({ label: 'VIEW', scale: 1.5 })}
      onMouseLeave={() => setCursorState({ label: null, scale: 1 })}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-md border border-white/[0.06] shadow-xl transition-shadow duration-500 group-hover:shadow-2xl"
        style={{ boxShadow: `0 24px 48px -24px ${item.glow}30` }}
      >
        {/* Dark base + colored ambient */}
        <div className="absolute inset-0 bg-[#0a0908]" />
        <div
          className="absolute -top-1/3 left-1/4 h-2/3 w-2/3 rounded-full blur-[70px] opacity-50 transition-opacity duration-500 group-hover:opacity-70"
          style={{ backgroundColor: item.glow }}
        />
        <div
          className="absolute -bottom-1/4 right-0 h-1/2 w-1/2 rounded-full blur-[50px] opacity-30"
          style={{ backgroundColor: item.accent }}
        />

        <OptimizedImage
          src={item.src}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Unify mismatched photos under cinematic grade */}
        <div className="pointer-events-none absolute inset-0 bg-[#080807]/40 mix-blend-multiply" />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-color opacity-25 transition-opacity duration-500 group-hover:opacity-35"
          style={{ backgroundColor: item.accent }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.08]" />

        {/* Index + tag */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="label-caps rounded-full border border-white/10 bg-bg/50 px-2.5 py-1 text-accent backdrop-blur-md">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="label-caps rounded-full px-2.5 py-1 backdrop-blur-md"
            style={{
              backgroundColor: `${item.glow}18`,
              color: item.glow,
              border: `1px solid ${item.glow}35`,
            }}
          >
            {item.tag}
          </span>
        </div>

        {/* Caption on image */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <div
            className="mb-3 h-px w-10 transition-all duration-500 group-hover:w-16"
            style={{ backgroundColor: item.glow }}
          />
          <h3 className="font-serif text-2xl text-text">{item.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.desc}</p>
        </div>
      </div>
    </motion.article>
  )
}

export function MacroGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !trackRef.current || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth + 48),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      className="section-wrap relative overflow-hidden py-24 md:py-36"
      aria-label="Macro detail gallery"
    >
      {/* Colorful section atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(91,155,213,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(197,165,114,0.14) 0%, transparent 55%), radial-gradient(ellipse 40% 40% at 50% 50%, rgba(183,110,121,0.08) 0%, transparent 50%)',
        }}
      />

      <div className="section-inner relative mb-12 md:mb-16">
        <SectionHeader
          label="Macro"
          title="Every surface tells a story"
          description="Extreme close-ups reveal the hand-finished details invisible to the naked eye."
        />

        {/* Scroll progress bar */}
        <div className="mt-10 hidden h-px w-full overflow-hidden rounded-full bg-glass-border md:block">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-accent via-[#5B9BD5] to-[#B76E79]"
            style={{ scaleX: scrollProgress, width: '100%' }}
          />
        </div>
      </div>

      <div
        ref={trackRef}
        className="relative flex w-max snap-x snap-mandatory gap-5 pl-6 md:gap-7 md:pl-[max(1.5rem,calc((100vw-80rem)/2+3rem))]"
      >
        {MACRO_ITEMS.map((item, i) => (
          <MacroCard key={item.title} item={item} index={i} />
        ))}
        {/* End spacer */}
        <div className="w-6 shrink-0 md:w-12" aria-hidden />
      </div>

      {/* Lume comparison */}
      <div className="section-inner relative mt-20 md:mt-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            label="Lume"
            title="Day to night"
            description="Super-LumiNova · charges in light, glows for hours in darkness."
            align="center"
          />
          <div className="mt-10 md:mt-14">
            <LumeComparison />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { color: '#C5A572', label: 'Daylight dial' },
              { color: '#00FFCC', label: 'Lume emission' },
              { color: '#5B9BD5', label: '8hr glow' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full ring-2 ring-white/10"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}60` }}
                />
                <span className="label-caps text-text-muted">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
