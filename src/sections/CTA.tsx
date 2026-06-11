import { AnimatedText } from '../components/AnimatedText'
import { MagneticButton } from '../components/MagneticButton'
import { BRAND } from '../lib/constants'
import { IMAGES } from '../lib/images'
import { OptimizedImage } from '../components/OptimizedImage'

export function CTA() {
  return (
    <section className="section-wrap relative overflow-hidden py-32 md:py-44" aria-label="Call to action">
      <div className="pointer-events-none absolute inset-0">
        <OptimizedImage
          src={IMAGES.lifestyle}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-15"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/85 to-bg" />
      </div>

      <div className="section-inner relative text-center">
        <AnimatedText
          text="Reserve yours."
          className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light text-text"
        />
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-text-muted">
          Each piece is assembled to order. Delivery within 12–16 weeks.
        </p>
        <div className="mt-10 flex justify-center">
          <MagneticButton variant="primary">Reserve Yours</MagneticButton>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const links = ['Collection', 'Craft', 'Movement', 'Press', 'Contact']

  return (
    <footer className="border-t border-glass-border bg-bg pb-10 pt-14 md:pb-12 md:pt-16" aria-label="Site footer">
      <div className="section-inner">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="min-w-0">
            <span className="block font-serif text-[clamp(2.5rem,12vw,5.5rem)] leading-none font-light tracking-wider text-text/10">
              {BRAND}
            </span>
            <p className="label-caps mt-4 text-text-muted">Geneva · Est. 1874</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-4" aria-label="Footer">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="group label-caps text-text-muted transition-colors hover:text-accent"
              >
                {link}
                <span className="mt-1 block h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        <div className="hairline mt-12 md:mt-16" />
        <p className="mt-8 text-center text-xs leading-relaxed text-text-muted/60">
          © {new Date().getFullYear()} {BRAND}. Portfolio showcase. Imagery via Unsplash & Pexels.
        </p>
      </div>
    </footer>
  )
}
