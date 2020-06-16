# Btn

A functional component for logically rendering the appropriate actionable elements: `<RouterLink>`, `<a>`, or `<button>`. At first glance, this may not be a particularly helpful component, but it really simplifies list rendering.

Features:

- Renders a `<button>` by default.
- Renders a [`<RouterLink>`](https://router.vuejs.org/api/#router-link) when provided a `to` prop.
- Renders an `<a>` link when provided a `href` prop.

[Source](https://github.com/Stegosource/vuetensils/blob/master/src/components/VBtn/VBtn.vue)

## Installation

Globally:

```js
// main.js
import Vue from "vue"
import { VBtn } from "vuetensils/src/components"

Vue.component("VBtn", VBtn)
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VBtn } from "vuetensils/src/components"

export default {
  components: {
    VBtn,
  },
  // ...
}
</script>
```

## Button Example (Default)

```vue live
<template>
  <VBtn @click="log">
    Log event to console
  </VBtn>
</template>

<script>
export default {
  methods: {
    log: console.log,
  },
}
</script>
```

## RouterLink Example

```vue live
<template>
  <VBtn :to="'/'">
    Home
  </VBtn>
</template>
```

## Anchor Link Example

```vue live
<template>
  <VBtn href="/components/Btn.html">
    Vuetensils
  </VBtn>
</template>
```

## List Example

```vue live
<template>
  <ul>
    <li v-for="item in items">
      <VBtn v-bind="item.bind" v-on="item.on" >
        {{ item.text }}
      </VBtn>
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        text: 'Home (router-link)',
        bind: {
          to: '/'
        }
      },
      {
        text: 'Second (anchor link)',
        bind: {
          href: '/components/Btn.html'
        }
      },
      {
        text: 'Third (button)',
        on: {
          click: () => console.log('click')
        }
      }
    ]
  })
}
</script>
```
