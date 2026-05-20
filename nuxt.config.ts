// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'uk' },
      title: 'ТурбоХім — Преміальна автохімія №1 в Україні',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'ТурбоХім — інтернет-магазин преміальної автохімії: шампуні, поліролі, керамічні покриття, очищувачі салону, засоби для дисків, аксесуари. Доставка по Україні.'
        },
        {
          name: 'keywords',
          content: 'автохімія, автошампунь, поліроль, керамічне покриття, очищувач салону, догляд за авто, ТурбоХім'
        },
        { property: 'og:title', content: 'ТурбоХім — Преміальна автохімія' },
        { property: 'og:description', content: 'Магазин професійної автохімії та аксесуарів для догляду за авто.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'uk_UA' },
        { name: 'theme-color', content: '#0a0a0b' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  nitro: {
    compressPublicAssets: true
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://turbochem.ua',
      supportPhone: '+38 (067) 123-45-67',
      supportEmail: 'hello@turbochem.ua'
    }
  }
})
