/** Ambient themes per case material — drives configurator glow & gradients */
export const CASE_THEMES = {
  steel: {
    glow: '#8BA4B8',
    accent: '#A8A9AD',
    gradient: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(139,164,184,0.35) 0%, transparent 70%)',
  },
  gold: {
    glow: '#C5A572',
    accent: '#E8D5B5',
    gradient: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(197,165,114,0.45) 0%, transparent 70%)',
  },
  rose: {
    glow: '#B76E79',
    accent: '#D4A5A5',
    gradient: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(183,110,121,0.4) 0%, transparent 70%)',
  },
} as const

export const DIAL_OVERLAY = {
  black: { color: '#0E0D0B', opacity: 0.15 },
  blue: { color: '#1A3A6E', opacity: 0.28 },
  silver: { color: '#C8C8C8', opacity: 0.12 },
} as const

export type CaseId = keyof typeof CASE_THEMES
export type DialId = keyof typeof DIAL_OVERLAY
