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

    // 2) Workbox : précache + runtime caching
    workbox: {
      // on précache tous les assets générés par Vite (HTML/JS/CSS/images…)
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
      // si navigation (tap sur lien) échoue → on rend index.html
      navigateFallback: '/index.html',

      runtimeCaching: [
        {
          // Les pages HTML (tout ce qui est request.destination === 'document')
          urlPattern: ({ request }) => request.destination === 'document',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'html-pages',
            networkTimeoutSeconds: 5, // si le réseau ne répond pas sous 5s
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 24 * 60 * 60, // 1 jour
            },
          },
        },
        {
          // CSS/JS/images
          urlPattern: ({ request }) =>
            ['style', 'script', 'image'].includes(request.destination),
          handler: 'CacheFirst',
          options: {
            cacheName: 'assets',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 7 * 24 * 60 * 60, // une semaine
            },
          },
        },
        {
          // Vos appels API (ex : /api/…)
          urlPattern: /\/api\/.*$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-responses',
            networkTimeoutSeconds: 5,
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 5 * 60, // 5 minutes
            },
          },
        },
      ],
    },
  },
})
