# intersect

## Installation

```js
// main.js
import Vue from "vue"
import { intersect } from "vuetensils"

Vue.directive("intersect", intersect)
```

For IE 11 support, you may want to add the following polyfill:

`<script src='https://cdn.polyfill.io/v2/polyfill.js?features=IntersectionObserver'></script>`

## Example

```vue live
<template>
  <div>
    <div style="border: 1px solid; width: 100%; height: 70vh;"></div>
    <div
      v-intersect.once="$log"
      style="border: 1px solid; width: 100%; height: 70vh;"
    ></div>
    <div
      v-intersect.once="e => $log(e)"
      style="border: 1px solid; width: 100%; height: 70vh;"
    ></div>
  </div>
</template>
```

---

## More specific example

### You could also specify a threshold after which you want to invoke the callback function

### You do this by passing an object

```vue
<template>
  <div
    class="some-div-down-below"
    v-intersect="{ threshold: 0.3, onEnter: seen, onLeave: hidden }"
  >
    <img src="someUrl" :class="img_class" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      img_class: "hidden",
    }
  },
  methods: {
    seen() {
      this.img_class = "shown"
    },
    hidden() {
      this.img_class = "hidden"
    },
  },
}
</script>
```

## Using modifiers

```vue
<template>
  <div class="some-div-down-below" v-show="seen" v-intersect.change="toggle">
    <img src="someUrl" class="img_class" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      seen: false,
    }
  },
  methods: {
    toggle() {
      this.seen = !this.seen
    },
  },
}
</script>
```

### Available properties

- onEnter: The callback to be invoked if element is intersecting with viewport.
- onLeave: The callback to be invoked if element is not intersecting with viewport.
- onChange: The callback to be invoked if intersection state changes.

- threshold: A number between 0 and 1. for example if it is 0.5 the function will be invoked when half of the element is visible in the root element.

- root: The scrollable element query selector like "#some-id". must be an ancestor of the element with which you use this directive

- rootMargin: the margen given to the root element. same as css margin.

### Available modifiers

- enter: will take the passed function and assign it to onEnter (Default).
- leave: will take the passed function and assign it to onLeave.
- change: will take the passed function and assign it to onChange.
