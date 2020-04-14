import * as components from "../../src/components"
import * as directives from "../../src/directives"
import * as filters from "../../src/filters"

export default ({ Vue, options, router, siteData }) => {
  Vue.prototype.$log = console.log

  for (const key in components) {
    Vue.component(key, components[key])
  }

  for (const key in directives) {
    Vue.directive(key, directives[key])
  }

  for (const key in filters) {
    Vue.filter(key, filters[key])
  }
}

import "./public/static/styles.css"
