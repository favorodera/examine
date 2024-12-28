// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@primevue/nuxt-module',
  ],
  ssr: true,
  devtools: { enabled: false },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    rootTag: 'main',
    rootAttrs: {
      id: 'app',
    },
  },
  css: ['~/assets/styles/index.css'],
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  primevue: {
    autoImport: true,
    options: {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          cssLayer: true,
        },
      },
    },
  },
  unocss: {
    nuxtLayers: true,
  },
})
