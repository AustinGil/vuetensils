import * as components from "../../src/components"
import * as directives from "../../src/directives"
import * as filters from "../../src/filters"

import Vuetensils from "../../src/entry"

export default ({ Vue, options, router, siteData }) => {
  Vue.use(Vuetensils, {
    components: components,
    directives: directives,
    filters: filters,
  })
}

import "./public/static/styles.css"
