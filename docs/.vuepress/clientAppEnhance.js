import { defineClientAppEnhance } from '@vuepress/client'
import * as components from "../../src/components"
import * as directives from "../../src/directives"

import Vuetensils from "../../src/index.js"

export default defineClientAppEnhance(({ app, options, router, siteData }) => {
  app.use(Vuetensils, {
    components: components,
    directives: directives,
  })
})

import "./public/static/styles.css"
