// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/turnstile',,
    '@nuxtjs/supabase',
    'nuxt-countdown',
    'nuxt-security',
  ],
  security: {
    enabled: process.env.NODE_ENV === 'production'
  },
  css: ['~/assets/css/main.css'],
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: false,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en',
    },
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'de',
        name: 'Deutsch',
        file: 'de.json'
      }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
  },
  eslint: {
    config: {
      stylistic: true
    }
  },
  image: {
    dir: 'assets/img'
  },
  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
    addValidateEndpoint: true
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      turnstileSiteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
    },
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '',
    },
  },
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
    redirectOptions: {
      login: '/admin/login',
      callback: '/admin/confirm',
      include: ['/admin/**'],
      exclude: [],
      saveRedirectToCookie: true
    },
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
  },
  }
})
