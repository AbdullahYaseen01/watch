import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import { CONFIG_OPTIONS, BASE_PRICE, IMAGES } from '../lib/images'
import { CASE_THEMES, DIAL_OVERLAY, type CaseId, type DialId } from '../lib/configThemes'
import { MagneticButton } from '../components/MagneticButton'
import { OptimizedImage } from '../components/OptimizedImage'
import { SectionHeader } from '../components/SectionHeader'

const PHOTO_MAP: Record<string, string> = {
  'steel-black-leather': IMAGES.collection[1],
  'steel-black-metal': IMAGES.collection[1],
  'steel-black-rubber': IMAGES.lifestyle,
  'steel-blue-leather': IMAGES.macroDial,
  'steel-blue-metal': IMAGES.macroDial,
  'steel-silver-leather': IMAGES.collection[0],
  'steel-silver-metal': IMAGES.collection[0],
  'gold-black-leather': IMAGES.collection[1],
  'gold-black-metal': IMAGES.collection[1],
  'gold-blue-leather': IMAGES.macroDial,
  'gold-silver-metal': IMAGES.collection[1],
  'rose-black-leather': IMAGES.collection[2],
  'rose-silver-metal': IMAGES.collection[2],
  'rose-blue-leather': IMAGES.collection[2],
}

function getPhoto(caseId: string, dialId: string, strapId: string) {
  const key = `${caseId}-${dialId}-${strapId}`
  if (PHOTO_MAP[key]) return PHOTO_MAP[key]
  if (caseId === 'gold') return IMAGES.collection[1]
  if (caseId === 'rose') return IMAGES.collection[2]
  if (dialId === 'blue') return IMAGES.macroDial
  if (strapId === 'rubber') return IMAGES.lifestyle
  return IMAGES.collection[1]
}

const STRAP_HINT: Record<string, string> = {
  leather: 'Alligator grain · hand-stitched',
  metal: 'Five-link bracelet · brushed & polished',
  rubber: 'FKM composite · sport deployant',
}

function AnimatedPrice({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 80, damping: 20 })
  const display = useTransform(spring, (v) =>
    `$${Math.round(v).toLocaleString()}`,
  )

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return (
    <motion.span className="font-serif text-3xl text-accent md:text-4xl">
      {display}
    </motion.span>
  )
}

export function Configurator() {
  const [caseMat, setCaseMat] = useState<CaseId>('gold')
  const [dial, setDial] = useState<DialId>('black')
  const [strap, setStrap] = useState('leather')

  const caseOpt = CONFIG_OPTIONS.case.find((c) => c.id === caseMat)!
  const dialOpt = CONFIG_OPTIONS.dial.find((d) => d.id === dial)!
  const strapOpt = CONFIG_OPTIONS.strap.find((s) => s.id === strap)!
  const theme = CASE_THEMES[caseMat]
  const dialOverlay = DIAL_OVERLAY[dial]
  const price = BASE_PRICE + caseOpt.price
  const photo = getPhoto(caseMat, dial, strap)

  const configName = useMemo(
    () => `${caseOpt.label} · ${dialOpt.label} · ${strapOpt.label}`,
    [caseOpt, dialOpt, strapOpt],
  )

  const refCode = useMemo(
    () => `AUR-${caseMat.slice(0, 2).toUpperCase()}${dial.slice(0, 1).toUpperCase()}${strap.slice(0, 1).toUpperCase()}`,
    [caseMat, dial, strap],
  )

  return (
    <section
      id="configurator"
      className="section-wrap section-py relative overflow-hidden"
      aria-label="Product configurator"
    >
      {/* Section ambient wash */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60"
        animate={{ background: theme.gradient }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />

      <div className="section-inner relative">
        <SectionHeader
          label="Configure"
          title="Make it yours"
          description="Select materials. Watch the atelier render your configuration in real time."
        />

        <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* ── Premium showcase stage ── */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <motion.div
              className="relative aspect-square overflow-hidden rounded-md border border-white/[0.06] shadow-2xl"
              style={{ boxShadow: `0 0 80px -20px ${theme.glow}40` }}
              animate={{ borderColor: `${theme.glow}30` }}
              transition={{ duration: 1 }}
            >
              {/* Colored ambient orbs */}
              <motion.div
                className="absolute -top-1/4 left-1/4 h-2/3 w-2/3 rounded-full blur-[80px]"
                animate={{ backgroundColor: theme.glow }}
                transition={{ duration: 1 }}
                style={{ opacity: 0.35 }}
              />
              <motion.div
                className="absolute -bottom-1/4 right-0 h-1/2 w-1/2 rounded-full blur-[60px]"
                animate={{ backgroundColor: dialOpt.color }}
                transition={{ duration: 1 }}
                style={{ opacity: 0.25 }}
              />

              <div className="absolute inset-0 bg-gradient-to-br from-[#0c0b0a] via-[#111110] to-[#080807]" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={photo}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                  <OptimizedImage
                    src={photo}
                    alt={`Aurelius configured: ${configName}`}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Material color grade */}
              <motion.div
                className="pointer-events-none absolute inset-0 mix-blend-color"
                animate={{
                  backgroundColor: dialOverlay.color,
                  opacity: dialOverlay.opacity,
                }}
                transition={{ duration: 0.8 }}
              />
              <motion.div
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                animate={{ backgroundColor: theme.glow }}
                transition={{ duration: 0.8 }}
                style={{ opacity: 0.08 }}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.08]" />

              {/* Inner gold frame */}
              <div className="pointer-events-none absolute inset-5 rounded-sm border border-accent/15 md:inset-6" />

              {/* Reference badge */}
              <div className="absolute top-5 left-5 md:top-6 md:left-6">
                <span className="label-caps rounded-full border border-accent/30 bg-bg/60 px-3 py-1.5 text-accent backdrop-blur-md">
                  {refCode}
                </span>
              </div>

              {/* Config + price */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="font-serif text-xl text-text md:text-2xl">{configName}</p>
                <p className="label-caps mt-1 text-text-muted">{STRAP_HINT[strap]}</p>
                <div className="mt-3">
                  <AnimatedPrice value={price} />
                </div>
              </div>
            </motion.div>

            {/* Color dots legend */}
            <div className="mt-5 flex items-center justify-center gap-3">
              {[caseOpt.color, dialOpt.color, theme.glow].map((c, i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full ring-2 ring-white/10"
                  style={{ backgroundColor: c }}
                  layout
                />
              ))}
              <span className="label-caps ml-2 text-text-muted">Your palette</span>
            </div>
          </div>

          {/* ── Options panel ── */}
          <div className="glass-panel rounded-md p-6 md:p-8 lg:sticky lg:top-24">
            <OptionGroup
              label="Case Material"
              options={CONFIG_OPTIONS.case.map((c) => ({
                id: c.id,
                label: c.label,
                swatch: c.color,
                sublabel: c.id === 'gold' ? '+ $4,200' : c.id === 'rose' ? '+ $4,800' : 'Standard',
              }))}
              selected={caseMat}
              onSelect={(id) => setCaseMat(id as CaseId)}
              accentColor={theme.glow}
            />
            <div className="my-8 h-px bg-glass-border" />
            <OptionGroup
              label="Dial"
              options={CONFIG_OPTIONS.dial.map((d) => ({
                id: d.id,
                label: d.label,
                swatch: d.color,
              }))}
              selected={dial}
              onSelect={(id) => setDial(id as DialId)}
              accentColor={dialOpt.color}
            />
            <div className="my-8 h-px bg-glass-border" />
            <OptionGroup
              label="Strap"
              options={CONFIG_OPTIONS.strap.map((s) => ({
                id: s.id,
                label: s.label,
                swatch:
                  s.id === 'leather'
                    ? '#3D2B1F'
                    : s.id === 'metal'
                      ? '#B8B8B8'
                      : '#1A1A1A',
              }))}
              selected={strap}
              onSelect={setStrap}
              accentColor={theme.glow}
            />
            <div className="mt-10">
              <MagneticButton>Reserve Configuration</MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function OptionGroup({
  label,
  options,
  selected,
  onSelect,
  accentColor,
}: {
  label: string
  options: { id: string; label: string; swatch?: string; sublabel?: string }[]
  selected: string
  onSelect: (id: string) => void
  accentColor?: string
}) {
  return (
    <div>
      <p className="label-caps mb-4 text-accent">{label}</p>
      <div className="flex flex-col gap-2.5">
        {options.map((opt) => {
          const isActive = selected === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`group flex w-full items-center gap-4 rounded-sm border px-4 py-3.5 text-left transition-all duration-400 ${
                isActive
                  ? 'border-accent/50 bg-accent/[0.08]'
                  : 'border-glass-border bg-transparent hover:border-white/15 hover:bg-white/[0.02]'
              }`}
              style={
                isActive && accentColor
                  ? { boxShadow: `0 0 24px -8px ${accentColor}60`, borderColor: `${accentColor}50` }
                  : undefined
              }
            >
              {opt.swatch && (
                <span
                  className={`relative h-9 w-9 shrink-0 rounded-full border-2 transition-transform duration-300 group-hover:scale-105 ${
                    isActive ? 'border-white/30 scale-105' : 'border-white/10'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${opt.swatch} 0%, ${opt.swatch}99 100%)`,
                    boxShadow: isActive ? `0 0 16px ${opt.swatch}80` : undefined,
                  }}
                />
              )}
              <span className="flex-1">
                <span
                  className={`block text-sm font-medium tracking-wide uppercase ${
                    isActive ? 'text-text' : 'text-text-muted'
                  }`}
                >
                  {opt.label}
                </span>
                {opt.sublabel && (
                  <span className="mt-0.5 block text-xs text-text-muted">{opt.sublabel}</span>
                )}
              </span>
              {isActive && (
                <motion.span
                  layoutId={`check-${label}`}
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
