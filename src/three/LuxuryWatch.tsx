import { useRef, useMemo, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface LuxuryWatchProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  autoRotate?: boolean
  /** Hero: face-forward presentation, no long strap */
  mode?: 'hero' | 'full'
}

function ProceduralWatch({ mouse, autoRotate = true, mode = 'hero' }: LuxuryWatchProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const reducedMotion = useReducedMotion()
  const isHero = mode === 'hero'

  useFrame((_state, delta) => {
    if (!groupRef.current) return

    if (autoRotate && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.12
    }

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      (isHero ? -0.35 : 0) + mouse.current.y * 0.07,
      0.04,
    )
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      mouse.current.x * 0.05,
      0.04,
    )
  })

  const caseMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#C5A572',
        metalness: 1,
        roughness: 0.12,
        envMapIntensity: 2,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      }),
    [],
  )

  const bezelMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#A88858',
        metalness: 1,
        roughness: 0.18,
        envMapIntensity: 1.8,
        clearcoat: 0.6,
        clearcoatRoughness: 0.15,
      }),
    [],
  )

  const dialMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0A0908',
        metalness: 0.4,
        roughness: 0.55,
        envMapIntensity: 0.5,
      }),
    [],
  )

  const crystalMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        metalness: 0,
        roughness: 0,
        transmission: 0.92,
        thickness: 0.35,
        ior: 1.52,
        transparent: true,
        opacity: 0.25,
        envMapIntensity: 1.5,
      }),
    [],
  )

  const handMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F0E0C8',
        metalness: 0.95,
        roughness: 0.18,
        envMapIntensity: 1.5,
      }),
    [],
  )

  const strapMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1E1810',
        metalness: 0.02,
        roughness: 0.92,
      }),
    [],
  )

  const scale = isHero ? 1.85 : 1.1

  return (
    <group ref={groupRef} scale={scale} rotation={[0, 0.6, 0]}>
      {/* Case body */}
      <mesh material={caseMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[1.05, 1.05, 0.28, 64]} />
      </mesh>

      {/* Bezel */}
      <mesh material={bezelMaterial} position={[0, 0.12, 0]} castShadow>
        <torusGeometry args={[1.02, 0.06, 32, 64]} />
      </mesh>

      {/* Dial */}
      <mesh material={dialMaterial} position={[0, 0.15, 0]} receiveShadow>
        <cylinderGeometry args={[0.88, 0.88, 0.02, 64]} />
      </mesh>

      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const x = Math.sin(angle) * 0.72
        const z = Math.cos(angle) * 0.72
        const isMajor = i % 3 === 0
        return (
          <mesh key={i} position={[x, 0.17, z]} material={handMaterial}>
            <boxGeometry args={[isMajor ? 0.035 : 0.02, 0.012, isMajor ? 0.09 : 0.045]} />
          </mesh>
        )
      })}

      {/* Crystal dome */}
      <mesh material={crystalMaterial} position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.94, 0.94, 0.05, 64]} />
      </mesh>

      {/* Hands */}
      <mesh material={handMaterial} position={[0, 0.2, -0.15]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.042, 0.018, 0.4]} />
      </mesh>
      <mesh material={handMaterial} position={[0, 0.21, -0.2]} rotation={[0, 1.1, 0]}>
        <boxGeometry args={[0.028, 0.012, 0.52]} />
      </mesh>
      <mesh material={handMaterial} position={[0, 0.22, -0.26]}>
        <boxGeometry args={[0.012, 0.008, 0.58]} />
      </mesh>

      {/* Crown */}
      <mesh
        material={caseMaterial}
        position={[1.08, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry args={[0.08, 0.08, 0.14, 24]} />
      </mesh>
      <mesh material={bezelMaterial} position={[1.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 24]} />
      </mesh>

      {/* Strap — shortened in hero mode so it doesn't clip off-screen */}
      {isHero ? (
        <>
          <mesh material={strapMaterial} position={[0, -0.04, 0.95]} castShadow>
            <boxGeometry args={[0.5, 0.1, 0.55]} />
          </mesh>
          <mesh material={strapMaterial} position={[0, -0.04, -0.95]} castShadow>
            <boxGeometry args={[0.5, 0.1, 0.55]} />
          </mesh>
        </>
      ) : (
        <>
          <mesh material={strapMaterial} position={[0, -0.05, 1.35]} castShadow>
            <boxGeometry args={[0.55, 0.12, 1.6]} />
          </mesh>
          <mesh material={strapMaterial} position={[0, -0.05, -1.35]} castShadow>
            <boxGeometry args={[0.55, 0.12, 1.6]} />
          </mesh>
        </>
      )}

      {/* Lugs */}
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} material={caseMaterial} position={[x, -0.02, 0.62]} castShadow>
          <boxGeometry args={[0.18, 0.14, 0.3]} />
        </mesh>
      ))}
      {[-0.55, 0.55].map((x) => (
        <mesh key={`b-${x}`} material={caseMaterial} position={[x, -0.02, -0.62]} castShadow>
          <boxGeometry args={[0.18, 0.14, 0.3]} />
        </mesh>
      ))}
    </group>
  )
}

function WatchLoader() {
  return (
    <mesh>
      <torusGeometry args={[0.8, 0.02, 16, 64]} />
      <meshStandardMaterial color="#C5A572" metalness={1} roughness={0.3} wireframe />
    </mesh>
  )
}

export function LuxuryWatch({ mode = 'hero', ...props }: LuxuryWatchProps) {
  return (
    <Float speed={0.9} rotationIntensity={0.08} floatIntensity={0.18} floatingRange={[-0.06, 0.06]}>
      <Suspense fallback={<WatchLoader />}>
        <ProceduralWatch mode={mode} {...props} />
      </Suspense>
    </Float>
  )
}

export { ProceduralWatch }
