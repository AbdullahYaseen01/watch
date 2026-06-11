import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from '../components/AnimatedText'
import { MagneticButton } from '../components/MagneticButton'
import { ScrollIndicator } from '../components/FilmGrain'
import { OptimizedImage } from '../components/OptimizedImage'
import { TAGLINE, BRAND } from '../lib/constants'
import { IMAGES } from '../lib/images'
import { setCursorState } from '../components/CustomCursor'
import { useIsMobile } from '../hooks/useIsMobile'

const HeroScene = lazy(() =>
  import('../three/HeroScene').then((m) => ({ default: m.HeroScene })),
)

export function Hero() {
  const mobile = useIsMobile()

  const scrollToMovement = () => {
    document.getElementById('camera-journey')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-bg"
      aria-label="Hero"
    >
      {/* ── Full-bleed 3D canvas (entire hero) ── */}
      {!mobile && (
        <motion.div
          className="absolute inset-0 z-[1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center bg-bg">
                <div className="h-16 w-16 animate-pulse rounded-full border border-accent/20" />
              </div>
            }
          >
            <HeroScene fullscreen className="h-full w-full" />
          </Suspense>
        </motion.div>
      )}

      {/* Mobile fallback — full-bleed macro photo */}
      {mobile && (
        <div className="absolute inset-0 z-[1]">
          <OptimizedImage
            src={IMAGES.macroDial}
            alt=""
            className="h-full w-full object-cover opacity-40"
            priority
          />
        </div>
      )}

      {/* ── Readability overlays (sit above 3D) ── */}
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
        {/* Left text zone — heavy fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(8,8,7,0.97) 0%, rgba(8,8,7,0.88) 32%, rgba(8,8,7,0.45) 55%, rgba(8,8,7,0.08) 78%, rgba(8,8,7,0.25) 100%)',
          }}
        />
        {/* Bottom fade for scroll indicator */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background: 'linear-gradient(to top, rgba(8,8,7,0.9) 0%, transparent 100%)',
          }}
        />
        {/* Top nav legibility */}
        <div
          className="absolute inset-x-0 top-0 h-28"
          style={{
            background: 'linear-gradient(to bottom, rgba(8,8,7,0.7) 0%, transparent 100%)',
          }}
        />
        {/* Gold glow behind watch zone (right) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 68% 52%, rgba(197,165,114,0.12) 0%, transparent 70%)',
          }}
        />
        {/* Decorative rings framing the watch */}
        {!mobile && (
          <>
            <div className="absolute left-[58%] top-1/2 h-[min(52vw,480px)] w-[min(52vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10" />
            <div className="absolute left-[58%] top-1/2 h-[min(62vw,580px)] w-[min(62vw,580px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/[0.04]" />
          </>
        )}
        <div className="hairline absolute bottom-0 left-0 right-0" />
      </div>

      {/* ── Nav ── */}
      <header className="relative z-20 flex items-center justify-between px-6 py-8 md:px-12">
        <motion.span
          className="pointer-events-auto font-serif text-xl tracking-[0.35em] text-text"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          {BRAND}
        </motion.span>
        <motion.nav
          className="pointer-events-auto relative hidden items-center gap-10 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          aria-label="Primary"
        >
          {['Collection', 'Craft', 'Movement'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="label-caps text-text-muted transition-colors duration-300 hover:text-accent"
              onMouseEnter={() => setCursorState({ label: 'EXPLORE', scale: 1.5 })}
              onMouseLeave={() => setCursorState({ label: null, scale: 1 })}
            >
              {item}
            </a>
          ))}
        </motion.nav>
      </header>

      {/* ── Copy overlaid on full-screen 3D ── */}
      <div className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center px-6 pb-16 md:px-12">
        <div className="pointer-events-none max-w-xl">
          <motion.p
            className="label-caps mb-6 text-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.1 }}
          >
            Swiss Manufacture · Since 1874
          </motion.p>

          <AnimatedText
            text={TAGLINE}
            className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] font-light tracking-tight text-text"
            delay={2.2}
          />

          <motion.p
            className="mt-6 max-w-md font-sans text-base leading-relaxed font-light text-text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Hand-finished in our Geneva atelier. Every component measured to a
            fraction of a millimetre — because perfection leaves no room for
            approximation.
          </motion.p>

          <motion.div
            className="pointer-events-auto mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 2.9 }}
          >
            <MagneticButton onClick={scrollToMovement}>
              Discover the Movement
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <div className="relative z-20">
        <ScrollIndicator />
      </div>
    </section>
  )
}
