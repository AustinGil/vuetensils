# Vuetensils

## 🍴 A tasty toolset for Vue.js 🛠

Vuetensils is a collection of Vue components desined to be light weight, accessible, semantic, and extensible.

## Bring your own styles

Vuetensils is designed to jump start a project with some of the most common functional requirements, but no styles that need to be overwritten. Import just the features you need (like a WCAG friendly modal that traps focus and prevents scrolling), and apply your own brand. No overhead from unused styles!

Other libraries have a ton of great features, but if you don't use them all, there is a lot of unnecessary bloat from unused components and style. With Vuetensils, you only import what you need, and add your own presentational styles on top.

View on [GitHub](https://github.com/Stegosource/vuetensils) or [NPM](https://www.npmjs.com/package/vuetensils).

### How it works:

#### Install the library

`npm install vuetensils`

#### 2. Import & extend just the components you want

```html
<script>
  // CustomAlert.vue
  import { VAlert } from "vuetensils"
  export default VAlert
</script>

<style>
  /* Bring your own styles */
  .vts-alert {
    border: 1px solid currentColor;
    border-radius: 4px;
    padding: 0 10px;
    color: #900;
    background: #fdd;
  }
</style>
```

#### 3. Register your styled commponents

Globally:

```js static
// main.js
import Vue from "vue"
import CustomAlert from "./path/to/CustomAlert.vue"

Vue.component("WhateverName", CustomAlert)
```

Locally:

```html static
<script>
  // SomeComponent.vue
  import CustomAlert from "./path/to/CustomAlert.vue"

  export default {
    components: {
      WhateverName: CustomAlert
    }
    // ...
  }
</script>
```

<!-- TODO: Toggles: https://codepen.io/heydon/pen/QqzRvQ/ -->
<!-- TODO: Allow components to accept `tag` prop -->
<!-- TODO: https://rollup-plugin-vue.vuejs.org/examples.html#minimal -->
<!-- TODO: SSR -->
<!-- TODO: functional -->
