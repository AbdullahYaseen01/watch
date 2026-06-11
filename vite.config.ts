import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'three'
          }
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('postprocessing')) return 'postprocessing'
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
