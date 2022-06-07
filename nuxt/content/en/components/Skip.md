---
title: 'Skip'
category: 'Components'
---

A functional component to help keyboard users skip to the main content

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VSkip/VSkip.vue)

Features:
- Visually hidden by default but visible on focus.
- Sets `tabindex` on target when clicked (for focus ring).

## Installation

Globally:

```js
// main.js
import Vue from 'vue';
import { VSkip } from 'vuetensils';

// Vue 3
app.component(
// Vue 2
Vue.component('VSkip', VSkip);
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VSkip } from 'vuetensils';

export default {
  components: {
    VSkip,
  },
  // ...
};
</script>
```

## Skip Example Nav

Start by clicking on <button>this button</button> to set the focus there. Then use the keyboard to navigate to the VSkip component. You will then be able to click the link to skip past the long list of links, to the main content.

Your implementation will vary, but it basically just relies on receiving the hash link to the ID of the main content element.

(Note: this site has a floating header that blocks the main content)

```vue live
<template>
  <div>
    <VSkip to="#main">
      Skip To Main Content
    </VSkip>

    <!-- perhaps a nav here -->
    <nav>
      <ul class="fake-nav">
        <li><a href="#">Example 1</a></li>
        <li><a href="#">Example 2</a></li>
        <li><a href="#">Example 3</a></li>
        <li><a href="#">Example 4</a></li>
        <li><a href="#">Example 5</a></li>
        <li><a href="#">Example 6</a></li>
      </ul>
    </nav>

    <main id="main">
      <p>This is the main content section</p>
      <p>It could even be a router-link.</p>
      <p>We're adding some extra paragraphs here.</p>
      <p>Because otherwise the header blocks this content :)</p>
    </main>
  </div>
</template>

<style>
.fake-nav {
  display: flex;
  margin-bottom: 1rem;
  padding-left: 0;
  list-style-type: none;
}
.fake-nav li {
  margin-right: .75rem;
}
</style>
```
