interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  const alignClass =
    align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <header className={`max-w-3xl ${alignClass}`}>
      <p className="label-caps mb-4 text-accent">{label}</p>
      <h2 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-tight font-light text-text">
        {title}
      </h2>
      {description && (
        <p className="mt-4 font-sans text-base leading-relaxed text-text-muted">{description}</p>
      )}
    </header>
  )
}
