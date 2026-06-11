# AURELIUS — Luxury Watch Portfolio

A cinematic, scroll-driven luxury watch experience with **real watch photography**, React Three Fiber 3D, GSAP, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy to Vercel

```bash
npm run build
# Push to GitHub, then: vercel --prod
```

Or connect the repo in the [Vercel dashboard](https://vercel.com) — zero config for Vite.

## Performance

- All images compressed to `-sm` variants (~20–85 KB each) in `public/images/`
- Sections below the hero are **lazy-loaded** (code-split per section)
- Three.js / postprocessing load only when the hero 3D canvas mounts
- Images use `loading="lazy"`, `decoding="async"`, and fade-in via `OptimizedImage`
- 3D: pixel ratio capped at 1.5, reduced particles, no multisampling on postprocessing

## Imagery

Real watch photos live in `public/images/` (sourced from Unsplash & Pexels). To swap:

| File | Used in |
|------|---------|
| `hero-watch.jpg` | Hero background, configurator default |
| `lifestyle-wrist.jpg` | Hero mobile, CTA, collection |
| `macro-dial.jpg` | Camera journey, macro gallery |
| `macro-crown.jpg` | Camera journey, macro gallery |
| `movement-detail.jpg` | Exploded view, macro gallery |
| `lume-night.jpg` | Before/after lume slider |
| `collection-*.jpg` | Bento grid, configurator variants |
| `craft-atelier.jpg` | Craftsmanship section |

Update paths in `src/lib/images.ts`.

## Watch 3D Model (GLB)

Drop a Draco-compressed model at `public/models/watch.glb` and wire it in `src/three/LuxuryWatch.tsx` via `useGLTF`.

## HDR Environment

Hero 3D uses `<Environment preset="studio" />`. Custom HDR:

```tsx
<Environment files="/hdr/your-environment.hdr" />
```

## Stack

- Vite + React + TypeScript + Tailwind CSS v4
- `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing`
- GSAP + ScrollTrigger · Framer Motion · Lenis

## Sections

1. Preloader — counter + curtain reveal
2. Hero — full-bleed watch photo + 3D overlay (desktop)
3. Camera Journey — pinned scroll with macro photo crossfades
4. Exploded View — movement photo + callout labels
5. Configurator — real photos swap per material/dial/strap
6. Macro Gallery — horizontal scroll + lume before/after slider
7. Craftsmanship — atelier photo + heritage timeline
8. Collection — bento grid with 3D tilt cards
9. Stats — animated counters
10. Press — drag carousel
11. CTA + Footer
