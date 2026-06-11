import { Counter } from '../components/Counter'
import { SectionHeader } from '../components/SectionHeader'
import { STATS } from '../lib/images'

export function Stats() {
  return (
    <section className="section-wrap section-py relative overflow-hidden" aria-label="Brand statistics">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(197,165,114,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="section-inner relative">
        <SectionHeader label="Prestige" title="Measured in generations" align="center" />

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-10 md:mt-20 md:grid-cols-4 md:gap-8">
          {STATS.map((stat) => (
            <Counter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
