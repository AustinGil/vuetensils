# Introduction

A "naked" component library for Vue.js focused on being:

- Accessible
- Semantic
- Lightweight
- Extensible

Links:

- [Docs](https://vuetensils.stegosource.com/)
- [GitHub](https://github.com/Stegosource/vuetensils)
- [NPM](https://www.npmjs.com/package/vuetensils)

## Naked Components

Vuetensil's components are designed to be starting points for some of the most common UI features. They bring all the functionality you would expect from a UI library, but only the bare minimum styles to avoid adding any extra bloat. You can work on the branding, and you don't have to worry about the accessibility.

Import just the features you need (like a WCAG-friendly modal that traps focus and prevents scrolling), and apply your custom design. No overhead from unused styles!

## Getting Started

#### 1. Install the library

`npm install vuetensils`

#### 2. Register just the components you need

Globally:

```js
// main.js
import Vue from "vue"
import { VAlert } from "vuetensils"

Vue.component("VAlert", VAlert)
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VAlert } from "vuetensils"

export default {
  components: {
    VAlert,
  },
  // ...
}
</script>
```

#### 3. Use the components in your template

```vue
<template>
  <div class="some-component">
    <VAlert>Hey, I'm an alert!</VAlert>
  </div>
</template>
```

#### 4. Bring your own styles

```css
/* Some CSS file */
.vts-alert {
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 0 10px;
  color: #900;
  background: #fdd;
}
```

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

<!-- TODO: Babel transpiler -->
<!-- TODO: Datatable -->
<!-- TODO: Toast/notification -->
<!-- TODO: Better range input -->
<!-- TODO: Breadcrumbs -->
<!-- TODO: Calendar -->
<!-- TODO: datetime input -->
<!-- TODO: rating -->
<!-- TODO: Tooltip -->
<!-- TODO: intersection observer directive -->
<!-- TODO: lazyload directive -->
<!-- TODO: container query directive -->
<!-- TODO: Toggles: https://codepen.io/heydon/pen/QqzRvQ/ -->
<!-- TODO: https://rollup-plugin-vue.vuejs.org/examples.html#minimal -->
<!-- TODO: SSR -->
<!-- TODO: functional -->
<!-- TODO: https://medium.com/faun/automate-your-npm-publish-with-github-actions-dfe8059645dd -->
