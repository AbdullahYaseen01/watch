import { Suspense, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Environment,
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import * as THREE from 'three'
import { LuxuryWatch } from './LuxuryWatch'
import { DustParticles } from './DustParticles'
import { PostProcessingEffects } from './PostProcessingEffects'
import { useIsMobile } from '../hooks/useIsMobile'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { setCursorState } from '../components/CustomCursor'

interface HeroSceneProps {
  className?: string
  /** When true, watch is offset right to sit behind hero copy */
  fullscreen?: boolean
}

function AccentRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
      <torusGeometry args={[1.65, 0.004, 16, 128]} />
      <meshBasicMaterial color="#C5A572" transparent opacity={0.22} />
    </mesh>
  )
}

function RimLight() {
  return (
    <>
      <directionalLight
        position={[4, 6, 4]}
        intensity={2.4}
        color="#FFF5E6"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[-3, 2, -3]}
        angle={0.5}
        penumbra={1}
        intensity={14}
        color="#C5A572"
        distance={24}
      />
      <pointLight position={[3, -1, 3]} intensity={0.7} color="#EDE9E1" />
      <pointLight position={[0, -3, 1]} intensity={0.35} color="#C5A572" />
      <ambientLight intensity={0.06} color="#1a1814" />
    </>
  )
}

function SceneContent({
  mouse,
  fullscreen,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  fullscreen?: boolean
}) {
  const mobile = useIsMobile()
  const reducedMotion = useReducedMotion()

  // Offset watch to the right in fullscreen so it frames beside the copy
  const watchX = fullscreen ? 1.35 : 0
  const camZ = fullscreen ? 4.2 : 3.6
  const camX = fullscreen ? 0.4 : 0

  return (
    <>
      <PerspectiveCamera makeDefault position={[camX, 0.05, camZ]} fov={fullscreen ? 36 : 32} />
      <RimLight />
      <Environment preset="studio" environmentIntensity={1.3} />

      <group position={[watchX, 0, 0]}>
        <LuxuryWatch mouse={mouse} autoRotate={!reducedMotion} mode="hero" />
        <AccentRing />
      </group>

      <DustParticles />
      <ContactShadows
        position={[watchX, -1.6, 0]}
        opacity={0.5}
        scale={16}
        blur={3}
        far={6}
        color="#000000"
      />

      {!mobile && !reducedMotion && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          target={[watchX, 0, 0]}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.85}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
          rotateSpeed={0.35}
          dampingFactor={0.06}
          enableDamping
        />
      )}
      <PostProcessingEffects variant="hero" />
    </>
  )
}

function CanvasFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-pulse rounded-full border border-accent/30" />
    </div>
  )
}

export function HeroScene({ className = '', fullscreen = false }: HeroSceneProps) {
  const mouse = useRef({ x: 0, y: 0 })
  const mobile = useIsMobile()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return
      mouse.current.x = THREE.MathUtils.clamp(e.gamma / 45, -1, 1)
      mouse.current.y = THREE.MathUtils.clamp((e.beta - 45) / 45, -1, 1)
    }

    window.addEventListener('mousemove', onMove)
    if (!reducedMotion && mobile) {
      window.addEventListener('deviceorientation', onOrient)
    }

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('deviceorientation', onOrient)
    }
  }, [mobile, reducedMotion])

  return (
    <div
      className={`relative h-full w-full ${className}`}
      onMouseEnter={() => setCursorState({ label: 'DRAG', scale: 1.8 })}
      onMouseLeave={() => setCursorState({ label: null, scale: 1 })}
    >
      <Suspense fallback={<CanvasFallback />}>
        <Canvas
          shadows
          dpr={mobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.3,
          }}
          style={{ background: 'transparent' }}
        >
          <SceneContent mouse={mouse} fullscreen={fullscreen} />
        </Canvas>
      </Suspense>
    </div>
  )
}
