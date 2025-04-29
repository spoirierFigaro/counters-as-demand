import fs from 'node:fs'
import { resolve } from 'node:path'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{
        href: '/manifest.webmanifest', // nom de fichier par défaut de Vite-PWA
        rel: 'manifest',
      }],
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  modules: ['@vite-pwa/nuxt', '@nuxt/eslint', '@vueuse/nuxt', 'vuetify-nuxt-module', '@nuxt/test-utils/module'],
  pwa: {
    // injection automatique du script
    devOptions: {
      enabled: true,
      // utile pour test en dev → localhost
      type: 'module',
    },
    includeAssets: ['favicon.ico', 'robots.txt', 'offline.html'],
    // auto update du SW
    injectRegister: 'auto',
    manifest: {
      background_color: '#ffffff',
      display: 'standalone',
      icons: [{
        sizes: '192x192',
        src: '/pwa-192x192.png',
        type: 'image/png',
      }],
      name: 'counters-as-demand',
      short_name: 'counters-as-demand',
      start_url: '/',
      theme_color: '#ffffff',
    },
    registerType: 'autoUpdate',
    // on génère un service worker
    strategies: 'generateSW',
    workbox: {
      // Montez assez haut pour choper tous les assets générés
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
      // Si la navigation échoue (ex: plus de réseau),
      // on renvoie offline.html (ou index.html si vous l’y préférez)
      navigateFallback: '/offline.html', // Exemples de caching runtime pour vos APIs ou images
      // runtimeCaching: [
      //   {
      //     urlPattern: /^https:\/\/mon-backend\.exemple\/api\/.*$/,
      //     handler: 'NetworkFirst',
      //     options: {
      //       cacheName: 'api-cache',
      //       networkTimeoutSeconds: 10,
      //       expiration: {
      //         maxEntries: 50,
      //         maxAgeSeconds: 5 * 60, // 5 minutes
      //       },
      //     },
      //   },
      //   {
      //     urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      //     handler: 'CacheFirst',
      //     options: {
      //       cacheName: 'image-cache',
      //       expiration: { maxEntries: 60, maxAgeSeconds: 24 * 3600 },
      //     },
      //   },
      // ],

    },
  },
})
