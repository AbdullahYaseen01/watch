import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useIsMobile } from '../hooks/useIsMobile'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface PostProcessingEffectsProps {
  /** Hero skips DOF — it caused rectangular clipping artifacts */
  variant?: 'hero' | 'default'
}

export function PostProcessingEffects({ variant = 'default' }: PostProcessingEffectsProps) {
  const mobile = useIsMobile()
  const reducedMotion = useReducedMotion()

  if (mobile || reducedMotion) return null

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={variant === 'hero' ? 0.28 : 0.35}
        luminanceThreshold={0.82}
        luminanceSmoothing={0.92}
        mipmapBlur
      />
      <Vignette
        offset={variant === 'hero' ? 0.35 : 0.25}
        darkness={variant === 'hero' ? 0.45 : 0.65}
        eskil={false}
      />
      <Noise opacity={0.018} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  )
}
