import { useState, useCallback, useEffect, lazy, Suspense } from 'react'
import { ThemeProvider } from './providers/ThemeProvider'
import { SmoothScrollProvider, ScrollTrigger } from './providers/SmoothScrollProvider'
import { CustomCursor } from './components/CustomCursor'
import { FilmGrain } from './components/FilmGrain'
import { Preloader } from './sections/Preloader'
import { Hero } from './sections/Hero'

const CameraJourney = lazy(() =>
  import('./sections/CameraJourney').then((m) => ({ default: m.CameraJourney })),
)
const ExplodedView = lazy(() =>
  import('./sections/ExplodedView').then((m) => ({ default: m.ExplodedView })),
)
const Configurator = lazy(() =>
  import('./sections/Configurator').then((m) => ({ default: m.Configurator })),
)
const MacroGallery = lazy(() =>
  import('./sections/MacroGallery').then((m) => ({ default: m.MacroGallery })),
)
const Craftsmanship = lazy(() =>
  import('./sections/Craftsmanship').then((m) => ({ default: m.Craftsmanship })),
)
const Collection = lazy(() =>
  import('./sections/Collection').then((m) => ({ default: m.Collection })),
)
const Stats = lazy(() => import('./sections/Stats').then((m) => ({ default: m.Stats })))
const Press = lazy(() => import('./sections/Press').then((m) => ({ default: m.Press })))
const CTA = lazy(() => import('./sections/CTA').then((m) => ({ default: m.CTA })))
const Footer = lazy(() => import('./sections/CTA').then((m) => ({ default: m.Footer })))

function App() {
  const [loaded, setLoaded] = useState(false)

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) {
      ScrollTrigger.refresh()
    }
  }, [loaded])

  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <CustomCursor />
        <FilmGrain />
        <Preloader onComplete={handlePreloaderComplete} />
        <main
          className={loaded ? 'opacity-100' : 'opacity-0'}
          style={{ transition: 'opacity 0.8s ease' }}
        >
          <Hero />
          <Suspense fallback={null}>
            <CameraJourney />
            <ExplodedView />
            <Configurator />
            <MacroGallery />
            <Craftsmanship />
            <Collection />
            <Stats />
            <Press />
            <CTA />
            <Footer />
          </Suspense>
        </main>
      </SmoothScrollProvider>
    </ThemeProvider>
  )
}

export default App
