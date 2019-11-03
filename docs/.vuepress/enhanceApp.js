import {
  VAlert,
  VAsync,
  VDrawer,
  VDropdown,
  VImg,
  VInput,
  VIntersect,
  VModal,
  VTabs,
  VToggle,
  autofocus,
  clickout,
} from "../../dist/vuetensils.umd"

export default ({ Vue, options, router, siteData }) => {
  Vue.component("VAlert", VAlert)
  Vue.component("VAsync", VAsync)
  Vue.component("VDrawer", VDrawer)
  Vue.component("VDropdown", VDropdown)
  Vue.component("VImg", VImg)
  Vue.component("VInput", VInput)
  Vue.component("VIntersect", VIntersect)
  Vue.component("VModal", VModal)
  Vue.component("VTabs", VTabs)
  Vue.component("VToggle", VToggle)

  Vue.directive("autofocus", autofocus)
  Vue.directive("clickout", clickout)
}
