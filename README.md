# Vuetensils

## 🍴 A tasty toolset for Vue.js 🛠

- [Docs](https://vuetensils.stegosource.com/)
- [GitHub](https://github.com/Stegosource/vuetensils)
- [NPM](https://www.npmjs.com/package/vuetensils)

Vuetensils is a collection of **unstyled** Vue components that focus on:

- Accessible components
- Semantic markup
- Light weight
- Custom styling

## Bring your own styles

Vuetensil's components are designed to be starting points for some of the most common UI features while encouraging you to customize the design without adding extra bloat. Because they are unstyled, you can add your own brand without worrying about ticky overwrites, `!important` rules, or excess bloat.

Import just the features you need (like a WCAG-friendly modal that traps focus and prevents scrolling), and apply your custom design. No overhead from unused styles!

## Inspiration

If I want my projects to follow best practices for semantic markup and accessibility, what are my options:

#### I could write my own library 😱

- ✅ My styles would be exactly how I want them.
- ✅ My bundle size will be very small because I'll only use what I need.
- ❌ It's going to take a lot of time.
- ❌ I'll have to create every component from scratch.
- ❌ I probably won't follow all the best practices right.

#### I could rely on a third party library 😵

- ✅ It will save me a LOT of time.
- ✅ I will have many component options to choose from.
- ❌ I'll still have to confirm they follow best practices.
- ❌ I will either have to use their styles, or end up overwriting them.
- ❌ There may be a lot of unused code that could bloat the bundle size.

#### I could use Vuetensils 😍

- ✅ The only styles added are the ones I write.
- ✅ I only include the components I'm actually going to use.
- ✅ My components will be accessible and semantic.
- ✅ The bundle size will stay as small as possible.

## How it works:

#### 1. Install the library

`npm install vuetensils`

#### 2. Use just the components you need

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
