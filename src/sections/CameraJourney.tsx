import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '../providers/SmoothScrollProvider'
import { CAMERA_BEATS } from '../lib/images'
import { OptimizedImage } from '../components/OptimizedImage'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function CameraJourney() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const copyRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeBeat, setActiveBeat] = useState(0)
  const reducedMotion = useReducedMotion()

  const beat = CAMERA_BEATS[activeBeat]

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !pinRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${CAMERA_BEATS.length * 100}%`,
          pin: pinRef.current,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              CAMERA_BEATS.length - 1,
              Math.floor(self.progress * CAMERA_BEATS.length),
            )
            setActiveBeat(idx)
          },
        },
      })

      imageRefs.current.forEach((el, i) => {
        if (!el) return
        const img = el.querySelector('img')
        if (i === 0) {
          gsap.set(el, { opacity: 1 })
          if (img) gsap.set(img, { scale: 1 })
        } else {
          gsap.set(el, { opacity: 0 })
          if (img) gsap.set(img, { scale: 1.08 })
          tl.to(imageRefs.current[i - 1], { opacity: 0, duration: 1 }, i)
          tl.to(el, { opacity: 1, duration: 1 }, i)
          if (img && imageRefs.current[i - 1]?.querySelector('img')) {
            tl.to(imageRefs.current[i - 1]!.querySelector('img'), { scale: 1.06, duration: 1 }, i)
            tl.to(img, { scale: 1, duration: 1.2 }, i)
          }
        }
      })

      copyRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 24 })
        if (i > 0) {
          tl.to(copyRefs.current[i - 1], { opacity: 0, y: -20, duration: 0.5 }, i)
          tl.to(el, { opacity: 1, y: 0, duration: 0.7 }, i + 0.08)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  if (reducedMotion) {
    return (
      <section id="camera-journey" className="section-wrap section-py" aria-label="Camera journey">
        <div className="section-inner space-y-12">
          {CAMERA_BEATS.map((b) => (
            <div key={b.label} className="grid items-center gap-8 md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                <OptimizedImage src={b.image} alt={b.label} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="label-caps mb-2" style={{ color: b.accent }}>
                  The Details
                </p>
                <h2 className="font-serif text-3xl text-text">{b.label}</h2>
                <p className="mt-3 text-text-muted">{b.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      id="camera-journey"
      ref={sectionRef}
      className="section-wrap relative"
      aria-label="Camera journey"
    >
      <div ref={pinRef} className="relative flex h-screen items-end overflow-hidden">
        {/* Image stack with per-beat color grading */}
        <div className="absolute inset-0">
          {CAMERA_BEATS.map((b, i) => (
            <div
              key={b.label}
              ref={(el) => {
                imageRefs.current[i] = el
              }}
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <OptimizedImage
                  src={b.image}
                  alt={b.label}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  priority={i === 0}
                />
              </div>
              {/* Color wash per beat */}
              <div
                className="absolute inset-0 mix-blend-soft-light opacity-40"
                style={{
                  background: `radial-gradient(ellipse 80% 70% at 60% 40%, ${b.glow} 0%, transparent 65%)`,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, rgba(8,8,7,0.5) 0%, rgba(8,8,7,0.15) 35%, rgba(8,8,7,0.88) 100%), linear-gradient(135deg, ${b.accent}18 0%, transparent 50%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Dynamic ambient orb */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBeat}
            className="pointer-events-none absolute top-1/4 right-1/4 h-[40vw] w-[40vw] max-h-96 max-w-96 rounded-full blur-[100px]"
            style={{ backgroundColor: beat.glow }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            aria-hidden
          />
        </AnimatePresence>

        <div className="relative z-10 w-full section-inner pb-16 pt-24 md:pb-20">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <motion.p
                key={`label-${activeBeat}`}
                className="label-caps mb-4"
                style={{ color: beat.accent }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                The Details · {String(activeBeat + 1).padStart(2, '0')} / {String(CAMERA_BEATS.length).padStart(2, '0')}
              </motion.p>
              <div className="relative min-h-[140px] md:min-h-[160px]">
                {CAMERA_BEATS.map((b, i) => (
                  <div
                    key={b.label}
                    ref={(el) => {
                      copyRefs.current[i] = el
                    }}
                    className="absolute inset-0 flex flex-col justify-end"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <h2 className="font-serif text-[clamp(2rem,5vw,3.25rem)] leading-tight font-light text-text">
                      {b.label}
                    </h2>
                    <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-text-muted">
                      {b.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step nav — highlights active beat */}
            <div className="hidden shrink-0 md:block">
              <div className="flex flex-col gap-5">
                {CAMERA_BEATS.map((b, i) => {
                  const isActive = i === activeBeat
                  return (
                    <motion.div
                      key={b.label}
                      className="flex items-center gap-3"
                      animate={{ opacity: isActive ? 1 : 0.35 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span
                        className="label-caps w-6 font-medium transition-colors duration-300"
                        style={{ color: isActive ? b.accent : undefined }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <motion.div
                        className="h-px origin-left"
                        animate={{
                          width: isActive ? 48 : 24,
                          backgroundColor: isActive ? b.accent : 'rgba(255,255,255,0.12)',
                        }}
                        transition={{ duration: 0.4 }}
                      />
                      {isActive && (
                        <motion.span
                          className="label-caps text-[10px]"
                          style={{ color: b.glow }}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          {b.label.split(' ')[0]}
                        </motion.span>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-10 md:mt-14">
            <div className="flex gap-2">
              {CAMERA_BEATS.map((b, i) => (
                <div
                  key={b.label}
                  className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.08]"
                >
                  <motion.div
                    className="h-full rounded-full origin-left"
                    style={{ backgroundColor: b.accent }}
                    initial={{ width: '0%' }}
                    animate={{
                      width: i < activeBeat ? '100%' : i === activeBeat ? '55%' : '0%',
                    }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2 md:hidden">
              {CAMERA_BEATS.map((b, i) => (
                <span
                  key={b.label}
                  className="h-2 w-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === activeBeat ? b.accent : 'rgba(255,255,255,0.15)',
                    boxShadow: i === activeBeat ? `0 0 8px ${b.accent}80` : undefined,
                    transform: i === activeBeat ? 'scale(1.3)' : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
