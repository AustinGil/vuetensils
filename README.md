# Introduction

A "naked" component library for Vue.js focused on being:

- Accessible
- Semantic
- Light weight
- Extensible

Links:

- [Docs](https://vuetensils.stegosource.com/)
- [NPM](https://www.npmjs.com/package/vuetensils)
- [GitHub](https://github.com/AustinGil/vuetensils)
- [Updates](https://austingil.com/newsletter)

## Naked Components

Vuetensil's components are designed to be starting points for some of the most common UI features. They bring all the functionality you would expect from a UI library, but only the bare minimum styles to avoid adding any extra bloat. You can work on the branding, and you don't have to worry about the accessibility.

Import just the features you need (like a [WCAG-friendly dialog](https://vuetensils.austingil.com/components/Dialog.html) that traps focus and prevents scrolling), and apply your custom design. No overhead from unused styles and no wrestling with overly-specific styles.

## Getting Started

#### 1. Install the library

`npm install vuetensils`

#### 2. Register just the things you need

Globally with the plugin:

```js
// main.js
import Vuetensils from 'vuetensils';

// With your previously created app
app.use(Vuetensils, {
  components: ['VAlert'],
});
```

Locally in comopnents:

```vue
<script>
// SomeComponent.vue
import { VAlert } from 'vuetensils';

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

## Inspiration

I've built a lot of projects in the past and found myself copy/pasting several of the same components over and over, and stripping out styles that I didn't need. Eventually I realized that I could just create components with the base functionality and accessible markup, but no styles at all. That way, I wouldn't have to wrestle with existing styles, or worry about bloating my app with overwritten styles.

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
<!-- TODO: https://announcer.vue-a11y.com/ -->
<!-- TODO: https://github.com/marketplace/actions/changelog-ci -->
<!-- TODO: progamatic modals https://github.com/buefy/buefy/blob/007065e6c51985782725f0f53421f0f9fa193798/modal/index.js -->