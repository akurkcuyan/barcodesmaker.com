import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom'],
          // Animation libs
          'vendor-motion': ['framer-motion'],
          // Barcode engine (heaviest lib)
          'vendor-bwip': ['bwip-js'],
          // QR libs
          'vendor-qr': ['qrcode.react'],
          // Scanner
          'vendor-scanner': ['html5-qrcode'],
          // Icons
          'vendor-icons': ['lucide-react'],
          // i18n
          'vendor-i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        }
      }
    },
    // Increase warning limit slightly since bwip-js is inherently large
    chunkSizeWarningLimit: 600,
  }
})
