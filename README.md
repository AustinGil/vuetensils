# Vuetensils

## 🍴 A tasty toolset for Vue.js 🛠

Vuetensils is a collection of Vue components desined to be light weight, accessible, and extensible. It is not a full blown UI library. Instead, it is designed to jump start a project with some of the most common UI solutions, but does not bring with it any opinionated styles. Bring your own styles, and let Vuetensils handle things like a modal popup that is accessible, traps user tab focus, and closes when the escape key is pressed. View on [GitHub](https://github.com/Stegosource/vuetensils) or [NPM](https://www.npmjs.com/package/vuetensils).

Benchmarks - How much does a UI library add to the final bundle size?

- No library: +0kb 🆕
- Vuetify: +697.7kb 😱
- Bootstrap-Vue: +365.7kb 😳
- Bootstrap: +163.7kb 😞
- Vuetensils: +16.7kb 👌

But size is not the whole story. The Libraries above provide a LOT more features, and if you are going to need all of them, they are excellent options. However, if you don't use all the features, there is a lot of unnecessary bloat. With Vuetensils, you get a tiny collection of functional components, to handle some of the more challenging things, and you add your own presentational components on top.

### Getting Started

#### Install:

`npm install vuetensils`

#### Import into your Vue project:

```js static
// main.js
import Vue from "vue"
import vuetensils from "vuetensils"
import "vuetensils/dist/vuetensils.min.css"

Vue.use(vuetensils)
```

#### Alternatively, import just the components you need:

```js static
// main.js
import Vue from "vue"
import { VtsModal } from "vuetensils"

Vue.use(VtsModal)
```

#### Use the components:

```html static
// Example.vue
<template>
  <div class="my-component">
    <vts-modal v-model="show"> My modal content</vts-modal>
  </div>
</template>
<script>
  export default {
    data: () => ({
      show: true
    })
  }
</script>
```

---

## Components

- `<vts-drawer>` - A sidebar that can be toggled on or off.
- `<vts-dropdown>` - Show/hide inline content.
- `<vts-fetch>` - Makes JSON API requests and provides responses, loading states, and errors.
- `<vts-intersection>` - Adds [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to content and provides event callbacks.
- `<vts-loading>` - SVG loading icons.
- `<vts-modal>` - A modal dialogue.
