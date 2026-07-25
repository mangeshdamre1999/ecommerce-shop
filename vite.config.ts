import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Repo name — this becomes the GitHub Pages sub-path.
const REPO = 'ecommerce-shop'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // Dev serves from "/", production is served from "/<repo>/" on GitHub Pages.
  base: command === 'build' ? `/${REPO}/` : '/',
  plugins: [
    react(),
    {
      // GitHub Pages has no server-side rewrites, so a hard refresh on a deep
      // link like /product/5 would 404. Serving the same SPA shell as 404.html
      // lets the client router take over.
      name: 'spa-404-fallback',
      closeBundle() {
        if (command !== 'build') return
        const dist = resolve(__dirname, 'dist')
        copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
      },
    },
  ],
}))
