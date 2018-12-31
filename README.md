# Vuetensils

## 🍴 A tasty toolset for Vue.js 🛠

Vuetensils is a collection of Vue components desined to be light weight, accessible, and extensible. It is not a full blown UI library. Instead, it is designed to jump start a project with some of the most common UI solutions, but does not bring with it any opinionated styles. Bring your own styles, and let Vuetensils handle things like a modal popup that is accessible, traps user tab focus, and closes when the escape key is pressed.

### Getting Started

#### Install:

`npm install vuetensils`

#### Import into your Vue project:

```
// main.js
import Vue from 'vue'
import vuetensils from 'vuetensils'

Vue.use(vuetensils)
```

#### Alternatively, import just the components you need:

```
// main.js
import Vue from 'vue'
import { VtsModal } from 'vuetensils'

Vue.use(VtsModal)
```

#### Use the components:

```
// Example.vue
<template>
  <div>
    <vts-modal v-model="show">
      My modal content
    </vts-modal>
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
