import { resolve } from 'path';
import theme from '@nuxt/content-theme-docs';

export default theme({
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vuetensils-docs',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: [
  //   // ...
  //   'codemirror/lib/codemirror.css',
  //   'codemirror/theme/base16-dark.css',
  //   // more styles...
  // ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: resolve(__dirname, './plugins/vuep'),
      ssr: false
    },
    { src: resolve(__dirname, './plugins/vuetensils') },
    // {
    //   src: '~plugins/vue-codemirror',
    //   ssr: false
    // }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    [
      '@nuxtjs/google-analytics', {
        id: 'UA-32074770-16',
        dev: true
      }
    ]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  // modules: [
  //   // https://go.nuxtjs.dev/content
  //   '@nuxt/content',
  // ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config /* { isDev, isClient } */) {
      config.resolve.alias.vue$ = 'vue/dist/vue.common.js';
      // config.resolve.alias.vue$ = 'vue/dist/vue.esm.js';
    }
  }
});
