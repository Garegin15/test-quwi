export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'test-task',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 'assets/main.scss',
     '@/assets/css/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  router: {
    middleware: ['auth']
  },
  auth: {
    redirect: {
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: 'auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: 'auth/init', method: 'get' }
        }
      }
    }
  },
  build: {
    transpile: [
      'defu'
    ]
  },

  axios: {

    baseURL: 'https://api.quwi.com/v2/',
    // proxy: true
  },
}
