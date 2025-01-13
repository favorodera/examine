// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@nuxt/eslint', '@nuxtjs/supabase'],
  ssr: true,
  imports: {
    dirs: [
      'composables/**',
      'utils/**',
    ],
  },
  devtools: { enabled: false },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: '/images/hero-image.png',
        },
        {
          rel: 'stylesheet',
          as: 'font',
          href: 'https://fonts.googleapis.com/css2?family=Palanquin:wght@100;200;300;400;500;600;700&display=swap',
        },
        {
          rel: 'preconnect',
          href: 'href="https://fonts.googleapis.com',
          crossorigin: '',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },

      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    rootTag: 'main',
    rootAttrs: {
      id: 'app',
    },
  },
  css: ['~/index.css'],
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    serviceKey: process.env.NUXT_SUPABASE_SERVICE_KEY,
    redirect: true,
    redirectOptions: {
      login: '/auth',
      callback: '/confirm',
      include: ['/(.*)'],
      exclude: [],
      cookieRedirect: true,
    },
    clientOptions: {
      auth: {
        flowType: 'implicit',
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    },
    cookieName: 'examine',
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true,
    },
    types: '~/utils/types/supabase/genTypes.ts',

  },
  unocss: {
    nuxtLayers: true,
  },
})
