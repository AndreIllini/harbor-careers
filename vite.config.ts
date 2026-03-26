/**
 * vite.config.ts — Vite build configuration
 *
 * Plugins:
 *   - tailwindcss(): Tailwind v4 via the official Vite plugin (no PostCSS config needed)
 *   - react(): Enables React Fast Refresh in dev and JSX transform for production
 *
 * Build options:
 *   - sourcemap: false — don't ship source maps to production (smaller bundle, harder to reverse)
 *   - manualChunks: splits React/Router into a separate "vendor" chunk so that app
 *     code changes don't bust the cached vendor bundle on the CDN
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        // vendor chunk: React libs rarely change → browser caches them across deploys
        manualChunks: (id: string) =>
          id.includes('node_modules') &&
          ['react', 'react-dom', 'react-router-dom'].some(lib => id.includes(lib))
            ? 'vendor'
            : undefined,
      },
    },
  },
})
