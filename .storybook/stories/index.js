import Vue from "vue"

import { storiesOf } from "@storybook/vue"

storiesOf("Test", module)
  .add("story as a template", () => "<p>test template</p>")
  .add("story as a component", () => ({
    // components: { MyButton },
    template: "<p>test component</p>"
  }))
