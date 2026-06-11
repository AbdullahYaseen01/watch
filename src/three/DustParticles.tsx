import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 60

export function DustParticles() {
  const ref = useRef<THREE.Points>(null!)

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const spd = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5
      spd[i] = 0.002 + Math.random() * 0.004
    }
    return [pos, spd]
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i]
      if (arr[i * 3 + 1] > 3) arr[i * 3 + 1] = -3
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y += 0.0003
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#C5A572"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
