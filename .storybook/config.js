import { configure } from "@storybook/vue"
import Vue from "vue"
import Vuetensils from "../src/entry"

Vue.use(Vuetensils)

function loadStories() {
  // You can require as many stories as you need.
  require("./stories")
}

configure(loadStories, module)
