import { addDecorator, configure } from "@storybook/vue"
// import { withInfo } from "@storybook/addon-info"
import { withOptions } from "@storybook/addon-options"
// import { checkA11y } from "@storybook/addon-a11y"
import Vue from "vue"
import Vuetensils from "../src/entry"
import "./styles.css"

Vue.use(Vuetensils)

// addDecorator(withInfo)

addDecorator(checkA11y)

addDecorator(
  withOptions({
    name: "Vuetensils"
  })
)

function loadStories() {
  // You can require as many stories as you need.
  require("./stories")
}

configure(loadStories, module)
