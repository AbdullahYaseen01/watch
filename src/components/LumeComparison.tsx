import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { OptimizedImage } from './OptimizedImage'
import { setCursorState } from './CustomCursor'
import { IMAGES } from '../lib/images'

/** Single-image day/lume comparison with CSS treatments — always renders both sides */
export function LumeComparison() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(52)
  const dragging = useRef(false)

  const src = IMAGES.collection[1]

  const update = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(98, Math.max(2, pct)))
  }

  return (
    <div className="relative">
      {/* Ambient color wash — gold (day) vs cyan (lume) */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-2xl opacity-60 blur-3xl"
        aria-hidden
        style={{
          background:
            'linear-gradient(105deg, rgba(197,165,114,0.2) 0%, transparent 45%, rgba(0,220,180,0.15) 100%)',
        }}
      />

      <div
        ref={containerRef}
        className="relative aspect-[16/10] cursor-ew-resize select-none overflow-hidden rounded-md border border-white/[0.08] shadow-2xl md:aspect-[16/9]"
        style={{ boxShadow: '0 0 80px -20px rgba(0,220,180,0.2), 0 0 60px -30px rgba(197,165,114,0.25)' }}
        onMouseDown={(e) => {
          dragging.current = true
          update(e.clientX)
        }}
        onMouseMove={(e) => dragging.current && update(e.clientX)}
        onMouseUp={() => {
          dragging.current = false
        }}
        onMouseLeave={() => {
          dragging.current = false
          setCursorState({ label: null, scale: 1 })
        }}
        onMouseEnter={() => setCursorState({ label: 'DRAG', scale: 1.6 })}
        onTouchMove={(e) => update(e.touches[0].clientX)}
      >
        {/* ── LUME side (base / right) ── */}
        <div className="absolute inset-0 bg-[#020810]">
          <OptimizedImage
            src={src}
            alt="Watch with Super-LumiNova glowing in darkness"
            className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.35] saturate-[0.7]"
            priority
          />
          {/* Night atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/90 via-[#050a12]/60 to-[#020810]/95" />
          {/* Simulated lume glow spots */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 42% 48%, rgba(0,255,200,0.55) 0%, transparent 18%), radial-gradient(circle at 38% 42%, rgba(120,255,220,0.35) 0%, transparent 12%), radial-gradient(circle at 50% 52%, rgba(0,200,255,0.2) 0%, transparent 25%), radial-gradient(circle at 35% 55%, rgba(0,255,180,0.4) 0%, transparent 8%)',
            }}
          />
          <div className="absolute inset-0 mix-blend-screen opacity-40">
            <div className="absolute top-[38%] left-[36%] h-3 w-3 rounded-full bg-[#00FFCC] blur-sm shadow-[0_0_20px_8px_rgba(0,255,200,0.6)]" />
            <div className="absolute top-[45%] left-[48%] h-2 w-2 rounded-full bg-[#7FFFD4] blur-sm shadow-[0_0_16px_6px_rgba(127,255,212,0.5)]" />
            <div className="absolute top-[42%] left-[42%] h-4 w-4 rounded-full bg-[#00E5C0] blur-md opacity-70" />
          </div>
          {/* Stars */}
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-px w-px rounded-full bg-white/40"
              style={{
                top: `${(i * 17) % 100}%`,
                left: `${(i * 23 + 10) % 100}%`,
              }}
            />
          ))}
        </div>

        {/* ── DAY side (clipped / left) ── */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <OptimizedImage
            src={src}
            alt="Watch in daylight"
            className="absolute inset-0 h-full w-full object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C5A572]/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/30 via-transparent to-transparent" />
        </div>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 z-10 w-[2px]"
          style={{
            left: `${position}%`,
            background: 'linear-gradient(180deg, transparent, #C5A572, #00FFCC, transparent)',
            boxShadow: '0 0 20px rgba(0,255,200,0.5), 0 0 12px rgba(197,165,114,0.4)',
          }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-bg/80 backdrop-blur-md"
            animate={{ boxShadow: ['0 0 0 0 rgba(0,255,200,0.3)', '0 0 0 8px rgba(0,255,200,0)', '0 0 0 0 rgba(0,255,200,0.3)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="text-sm text-accent">↔</span>
          </motion.div>
        </div>

        {/* Labels */}
        <span className="label-caps absolute top-4 left-4 z-10 rounded-full border border-accent/40 bg-bg/80 px-3 py-1.5 text-accent backdrop-blur-md">
          ☀ Day
        </span>
        <span
          className="label-caps absolute top-4 right-4 z-10 rounded-full px-3 py-1.5 backdrop-blur-md"
          style={{
            border: '1px solid rgba(0,255,200,0.35)',
            background: 'rgba(2,8,16,0.85)',
            color: '#00FFCC',
            boxShadow: '0 0 20px rgba(0,255,200,0.15)',
          }}
        >
          ✦ Lume
        </span>

        <p className="label-caps absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-bg/60 px-4 py-1.5 text-text-muted backdrop-blur-sm">
          Drag to compare
        </p>
      </div>
    </div>
  )
}
