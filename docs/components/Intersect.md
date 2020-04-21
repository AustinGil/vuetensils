# Intersect

Uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to fire events when content enters or exits the screen.

The components accepts four props: `root`, `rootMargin`, `threshold`, and `options`. The first three correspond to the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) options properties, or you can pass them all together to the `options` prop.

[Source](https://github.com/Stegosource/vuetensils/blob/master/src/components/VIntersect/VIntersect.vue)

## Installation

Globally:

```js
// main.js
import Vue from "vue"
import { VIntersect } from "vuetensils/src/components"

Vue.component("VIntersect", VIntersect)
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VIntersect } from "vuetensils/src/components"

export default {
  components: {
    VIntersect,
  },
  // ...
}
</script>
```

For IE 11 support, you may want to add the following polyfill:

`<script src='https://cdn.polyfill.io/v2/polyfill.js?features=IntersectionObserver'></script>`

## Examples

**Open your console and scroll around to watch events get fired.**

```vue live
<template>
  <div>
    <VIntersect
      @enter="log('@enter fired for block 1')"
      @exit="log('@exit fired for block 1')"
      @change="log('@change fired for block 1')"
    >
      <div class="intersection-content">Content block 1</div>
    </VIntersect>

    <VIntersect
      @enter="log('@enter fired for block 2')"
      @exit="log('@exit fired for block 2')"
      @change="log('@change fired for block 2')"
    >
      <div class="intersection-content">Content block 2</div>
    </VIntersect>
  </div>
</template>

<script>
export default {
  methods: {
    log: console.log,
  },
}
</script>
```

```css
.intersection-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  border: 1px solid;
}
```

## Using a scoped slot

By using scoped slots, you can access the current [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)

(Setting the threshold to 1 means the entire element must be visible before `isIntersecting` changes)

```vue live
<template>
  <VIntersect :threshold="1">
    <template #default="entry">
      <div
        class="intersection-content"
        :style="{
          background: entry.isIntersecting ? 'lightgreen' : 'lightcoral',
        }"
      >
        isIntersecting: {{ entry.isIntersecting }}
      </div>
    </template>
  </VIntersect>
</template>

<script>
export default {
  methods: {
    log: console.log,
  },
}
</script>
```
