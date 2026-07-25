import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Vercel serves the site at the domain root. GitHub Pages serves it from a
// repo sub-path, so deploy.sh sets GH_PAGES=1 to switch the base.
const GH_PAGES_BASE = '/ecommerce-shop/'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' && process.env.GH_PAGES ? GH_PAGES_BASE : '/',
  plugins: [
    react(),
    {
      // Static hosts have no server-side rewrites, so a hard refresh on a deep
      // link like /product/5 would 404. Serving the same SPA shell as 404.html
      // lets the client router take over. (Vercel uses vercel.json instead.)
      name: 'spa-404-fallback',
      closeBundle() {
        if (command !== 'build') return
        const dist = resolve(__dirname, 'dist')
        copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
      },
    },
  ],
}))
