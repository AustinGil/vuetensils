import {
  VAlert,
  VAsync,
  VDrawer,
  VDropdown,
  VFile,
  VImg,
  VInput,
  VIntersect,
  VDialog,
  VResize,
  VTabs,
  VToggle,
  autofocus,
  clickout,
  copy,
  intersect,
} from "../../src/entry"

export default ({ Vue, options, router, siteData }) => {
  Vue.prototype.$log = console.log

  Vue.component("VAlert", VAlert)
  Vue.component("VAsync", VAsync)
  Vue.component("VDrawer", VDrawer)
  Vue.component("VDropdown", VDropdown)
  Vue.component("VFile", VFile)
  Vue.component("VImg", VImg)
  Vue.component("VInput", VInput)
  Vue.component("VIntersect", VIntersect)
  Vue.component("VDialog", VDialog)
  Vue.component("VResize", VResize)
  Vue.component("VTabs", VTabs)
  Vue.component("VToggle", VToggle)

  Vue.directive("autofocus", autofocus)
  Vue.directive("clickout", clickout)
  Vue.directive("copy", copy)
  Vue.directive("intersect", intersect)
}

import "./public/static/styles.css"
