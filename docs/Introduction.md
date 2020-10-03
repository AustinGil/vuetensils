# Introduction

A "naked" component library for Vue.js focused on being:

- Accessible
- Semantic
- Light weight
- Extensible

Links:

- [Docs](https://vuetensils.stegosource.com/)
- [NPM](https://www.npmjs.com/package/vuetensils)
- [GitHub](https://github.com/Stegosource/vuetensils)
- [Updates](https://3bb5fb5a.sibforms.com/serve/MUIEAAOwgrWtf43Lfv80ES_hibAhazPDEy4w9IxRIda1b8g1GNnmHYkDfvIKG-Ox35EtWkJfMyCMBTQ3nG2msGhc3WnHa7XKfkgBzYdL3ASbIEckbn47QtJDIvpOskWQuRIXYI-7dVuM5F25yKdcJch7VN8aAbrpEn8_PMXWpqENTJ6r9bOZgHj6vnAQwHDsdwXDOZIonAP3x3vx)

## Naked Components

Vuetensil's components are designed to be starting points for some of the most common UI features. They bring all the functionality you would expect from a UI library, but only the bare minimum styles to avoid adding any extra bloat. You can work on the branding, and you don't have to worry about the accessibility.

Import just the features you need (like a WCAG-friendly dialog that traps focus and prevents scrolling), and apply your custom design. No overhead from unused styles!

## Getting Started

#### 1. Install the library

`npm install vuetensils`

#### 2. Register just the components you need

Globally:

```js
// main.js
import Vue from 'vue';
import { VAlert } from 'vuetensils/src/components';

Vue.component('VAlert', VAlert);
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VAlert } from 'vuetensils/src/components';

export default {
  components: {
    VAlert,
  },
  // ...
};
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
  background: #FDD;
}
```

## Projects Using Vuetensils
* [https://www.round.com.au/](https://www.round.com.au/)
* [https://perxapp.com/](https://perxapp.com/)
* [https://revealbio.com/](https://revealbio.com/)
* [https://app.matryx.ai/tournaments](https://app.matryx.ai/tournaments)
* [https://www.lindsaykwardell.com/](https://www.lindsaykwardell.com/)

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

### Roadmap

- Better a11y range input
- lazyload directive
- Tooltip
- Schema/semantic ratings
- a11y datetime picker
- schema/semantic Breadcrumbs
- finish Datatable
- Better SSR support
- `functional` components
- Add type export for intellisense
- Add VLink component
  <!-- https://github.com/chrisvfritz/vue-enterprise-boilerplate/blob/master/src/components/_base-link.vue -->
- Add active class option to VTabs
- VToggle support a toggle slot with v-bind and v-on
- VToggle support for accordion
- VInput default scoped slot with bindings and listeners for label, input, and description.
- VTry component for error boundaries

<!-- TODO: change exports to raw source -->
<!-- Calculator? https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output -->
<!-- VirtualList? https://codepen.io/Stegosource/pen/NWGGKZp?editors=1010 -->
<!-- v-focusabe? https://blog.vuestorefront.io/how-storefront-ui-solves-website-accessibility-issues/ -->
<!-- https://github.com/conventional-changelog/standard-version -->
<!-- TODO: Toast/notification -->
<!-- TODO: Toggles: https://codepen.io/heydon/pen/QqzRvQ/ -->
<!-- TODO: https://medium.com/faun/automate-your-npm-publish-with-github-actions-dfe8059645dd -->
<!-- TODO: Docgen: https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/examples/docgen/ -->
<!-- TODO: https://vue-styleguidist.github.io/docs/docgen-cli.html -->
<!-- TODO: https://xaksis.github.io/vue-good-table/guide/#installation -->
<!-- TODO: https://dequeuniversity.com/library/ -->
<!-- TODO: https://github.com/bdryanovski/logchanges -->
<!-- TODO: https://codepen.io/Stegosource/pen/mdVRKEq OR https://codepen.io/smhigley/pen/JjoKgxb OR https://codepen.io/smhigley/pen/GRgjRVN -->
