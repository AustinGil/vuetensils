---
title: 'Resize'
category: 'Components'
---

Component which provides the calculated width and height to its default scoped slot. This would allow you do update child components based on the actual size of the element, rather than the size of the screen.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VResize/VResize.vue)

## Installation

Globally:

```js
// main.js
import Vue from 'vue';
import { VResize } from 'vuetensils/src/components';

Vue.component('VResize', VResize);
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VResize } from 'vuetensils/src/components';

export default {
  components: {
    VResize,
  },
  // ...
};
</script>
```

## Styled Example

Try resizing your browser to see it in action.

```vue live
<template>
  <VResize>
    <template #default="{ width } ">
      <div
        class="resize-example"
        :class="{
          lg: width > 500,
          md: width > 300 && width < 500,
          sm: width < 300,
        }"
      >
        <img src="https://www.fillmurray.com/200/200" alt="description" />
        <p>This content is {{ width }}px wide.</p>
      </div>
    </template>
  </VResize>
</template>

<style>
.resize-example {
  display: grid;
  padding: 10px;
  text-align: center;
}
.resize-example img {
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
}
.resize-example.sm {
  justify-content: center;
}
.resize-example.md {
  font-size: 1.5rem;
  justify-content: center;
}
.resize-example.lg {
  grid-template-columns: 150px 1fr;
  grid-gap: 20px;
  align-items: center;
  font-size: 2rem;
}
</style>
```
