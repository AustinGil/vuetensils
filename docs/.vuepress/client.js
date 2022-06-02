import * as components from "../../src/components"
import * as directives from "../../src/directives"
import Vuetensils from "../../src/index.js"
import "./public/static/styles.css"

import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app }) {
    app.use(Vuetensils, {
      components: components,
      directives: directives,
    })
  },
})