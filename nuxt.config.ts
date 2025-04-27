// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  modules: [
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'vuetify-nuxt-module',
    '@nuxt/test-utils/module',
  ],
  pwa: {
    strategies: 'generateSW',
    devOptions: {
      enabled: true,
    },
    manifest: {
      name: 'counters-as-demand',
      short_name: 'counters-as-demand',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        // {
        //   src: '/pwa-512x512.png',
        //   sizes: '512x512',
        //   type: 'image/png',
        // },
      ],
    },
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
})
