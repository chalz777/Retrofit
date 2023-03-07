import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'

import { VitePWA } from 'vite-plugin-pwa'
//import { VitePWA } from './dist/index.mjs'
import replace from '@rollup/plugin-replace'

const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'development',
  base: '/',
  includeAssets: ['vite.svg', 'favicon.svg'],
  manifest: {
    name: 'PWA Router',
    short_name: 'PWA Router',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'vite.svg', // <== don't add slash, for testing
        sizes: '32x32',
        type: 'image/svg+xml',
      },
      {
        src: '/vite.svg', // <== don't add slash, for testing
        sizes: '32x32',
        type: 'image/svg+xml',
      },
      {
        src: 'vite.svg', // <== don't add slash, for testing
        sizes: '32x32',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
}

const replaceOptions = { __DATE__: new Date().toISOString() }
const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'
const selfDestroying = process.env.SW_DESTROY === 'true'

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src'
  pwaOptions.filename = 'claims-sw.ts'
  // pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
  pwaOptions.strategies = 'injectManifest'
  ;(pwaOptions.manifest as Partial<ManifestOptions>).name = 'PWA Inject Manifest'
  ;(pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'
}

if (claims)
  pwaOptions.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error overrides
  replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying)
  pwaOptions.selfDestroying = selfDestroying


  const outputPluginStats = () => ({
    name: 'output-plugin-stats',
    configResolved(config) {
      const plugins = config.plugins.map((plugin) => plugin.name)
      console.log(`Your project has ${plugins.length} Vite plugins.`)
      console.table(plugins)
    }
  })
  
  const requestAnalytics = () => ({
    name: 'request-analytics',
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          console.log(`${req.method.toUpperCase()} ${req.url}`)
          next()
        })
      }
    }
  })
  const hotUpdateReport = () => ({
    name: 'hot-update-report',
    handleHotUpdate({file, timestamp, modules}) {
      console.log(`${timestamp}: ${modules.length} module(s) updated`)
    }
  })
  
  const vitePluginWrapper  = () => ({
    name: 'vite-plugin-wrapper',
    configResolved(config) {   
        VitePWA(pwaOptions)       
    }
  })
console.log(pwaOptions);
// console.log("NODE_ENV = "+ process.env.NODE_ENV);
// console.log("CLAIMS = "+ process.env.CLAIMS);
// console.log("RELOAD_SW = "+ process.env.RELOAD_SW);
// https://vitejs.dev/config/
export default defineConfig({
  build: {         
    minify: false,        
  },
  plugins: [
    vue(),
    VitePWA(pwaOptions),   
    replace(replaceOptions), 
    ],
    server: {
        port: 3399,
        https: true,
        strictPort: true,
        //proxy: {
        //    '/api': {
        //        target: 'https://localhost:7153',
        //        changeOrigin: true,
        //        secure: false,
        //        rewrite: (path) => path.replace(/^\/api/, '/api')
        //    }
        //}
    },
    build: {
        outDir: "../wwwroot/client",
        emptyOutDir: true
    },
})
