import { useRef, useState } from 'react'
import { setCursorState } from './CustomCursor'
import { OptimizedImage } from './OptimizedImage'

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Day',
  afterLabel = 'Night',
  className = '',
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const dragging = useRef(false)

  const update = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden rounded-sm ${className}`}
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
      <OptimizedImage
        src={afterSrc}
        alt={afterLabel}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <OptimizedImage
          src={beforeSrc}
          alt={beforeLabel}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div
        className="absolute top-0 bottom-0 z-10 w-px bg-accent/80"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/50 bg-bg/80 backdrop-blur-sm">
          <span className="text-accent">↔</span>
        </div>
      </div>
      <span className="label-caps absolute top-4 left-4 rounded-full border border-accent/30 bg-bg/70 px-3 py-1.5 text-accent backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="label-caps absolute top-4 right-4 rounded-full border border-[#5B9BD5]/40 bg-bg/70 px-3 py-1.5 text-[#5B9BD5] backdrop-blur-sm">
        {afterLabel}
      </span>
    </div>
  )
}
