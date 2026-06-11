/** Optimized watch photography — compressed variants in /public/images */
export const IMAGES = {
  hero: '/images/hero-watch-sm.jpg',
  heroAlt: '/images/lifestyle-sm.jpg',
  macroDial: '/images/macro-dial-sm.jpg',
  macroCrown: '/images/macro-crown-sm.jpg',
  lumeDay: '/images/macro-dial-sm.jpg',
  lumeNight: '/images/lume-night-sm.jpg',
  lifestyle: '/images/lifestyle-sm.jpg',
  movement: '/images/movement-detail.jpg',
  heritage: '/images/heritage-watch.jpg',
  craft: '/images/heritage-watch.jpg',
  collection: [
    '/images/collection-1-sm.jpg',
    '/images/collection-2-sm.jpg',
    '/images/collection-3-sm.jpg',
    '/images/lifestyle-sm.jpg',
  ],
} as const

export const CAMERA_BEATS = [
  {
    image: '/images/beat-case.jpg',
    label: 'Hand-finished case',
    detail: '316L steel · 40mm · Zaratsu polishing',
    accent: '#C5A572',
    glow: '#E8D5B5',
  },
  {
    image: '/images/beat-crystal.jpg',
    label: 'Sapphire crystal',
    detail: 'Double AR coating · 9H hardness',
    accent: '#5B9BD5',
    glow: '#A8D4FF',
  },
  {
    image: '/images/beat-crown.jpg',
    label: 'Signed crown',
    detail: 'Screw-down · 100m water resistance',
    accent: '#B76E79',
    glow: '#E8B4BC',
  },
  {
    image: '/images/beat-movement.jpg',
    label: '72-hour reserve',
    detail: 'Calibre A-1874 · 28,800 vph',
    accent: '#D4AF37',
    glow: '#F5E6A3',
  },
] as const

export const EXPLODED_PARTS = [
  { id: 'bezel', label: 'Ceramic bezel', spec: '120-click unidirectional', offset: 80 },
  { id: 'dial', label: 'Sunburst dial', spec: 'Applied indices · Super-LumiNova', offset: 50 },
  { id: 'movement', label: 'In-house calibre', spec: '28,800 vph · 31 jewels', offset: -40 },
  { id: 'caseback', label: 'Exhibition back', spec: 'Sapphire · Côtes de Genève', offset: -90 },
] as const

export const COLLECTION = [
  { name: 'Chronograph 01', price: 12400, image: IMAGES.collection[0], span: 'col-span-2 row-span-2' },
  { name: 'Dress Classic', price: 8900, image: IMAGES.collection[1], span: 'col-span-1 row-span-1' },
  { name: 'Diver Pro', price: 11200, image: IMAGES.collection[2], span: 'col-span-1 row-span-2' },
  { name: 'GMT Traveller', price: 9800, image: IMAGES.collection[3], span: 'col-span-2 row-span-1' },
] as const

export const TIMELINE = [
  { year: '1874', title: 'Founded in Geneva', desc: 'A single atelier on Rue du Rhône.' },
  { year: '1923', title: 'First in-house calibre', desc: 'Vertical integration begins.' },
  { year: '1968', title: 'Chronograph patent', desc: 'Column-wheel mechanism refined.' },
  { year: 'Today', title: '47 master watchmakers', desc: 'Every piece finished by hand.' },
] as const

export const STATS = [
  { value: 150, suffix: '+', label: 'Years of craft' },
  { value: 500, suffix: '', label: 'Limited pieces / year' },
  { value: 42, suffix: '', label: 'Countries served' },
  { value: 47, suffix: '', label: 'Master watchmakers' },
] as const

export const PRESS = [
  { quote: 'A masterclass in restraint and precision.', source: 'HODINKEE' },
  { quote: 'The sort of watchmaking that silences a room.', source: 'Monochrome' },
  { quote: 'Quietly, devastatingly beautiful.', source: 'Revolution' },
  { quote: 'Portfolio-grade execution.', source: 'WatchTime' },
] as const

export const CONFIG_OPTIONS = {
  case: [
    { id: 'steel', label: 'Steel', color: '#A8A9AD', price: 0 },
    { id: 'gold', label: 'Yellow Gold', color: '#C5A572', price: 4200 },
    { id: 'rose', label: 'Rose Gold', color: '#B76E79', price: 4800 },
  ],
  dial: [
    { id: 'black', label: 'Midnight', color: '#0E0D0B' },
    { id: 'blue', label: 'Ocean', color: '#1A2744' },
    { id: 'silver', label: 'Silver', color: '#C8C8C8' },
  ],
  strap: [
    { id: 'leather', label: 'Leather' },
    { id: 'metal', label: 'Bracelet' },
    { id: 'rubber', label: 'Rubber' },
  ],
} as const

export const BASE_PRICE = 12400
