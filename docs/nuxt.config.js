const pkg = require('../package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: `${pkg.name} - ${pkg.description}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, // TODO
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600|Roboto Mono' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/vuetensils'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/markdownit'
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) { }
  }
}
