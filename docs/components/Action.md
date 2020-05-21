# Action

WIP: Implementation is pretty set, but looking for help with naming. Alternative is `VBtn`

A functional component for logically rendering the appropriate actionable elements: `<RouterLink>`, `<a>`, or `<button>`. At first glance, this may not be a particularly helpful component, but it really simplifies list rendering.

Features:

- Renders a [`<RouterLink>`](https://router.vuejs.org/api/#router-link) when provided a `to` prop.

- Renders an `<a>` link when provided a `href` prop.
- Renders a `<button>` by default.

[Source](https://github.com/Stegosource/vuetensils/blob/master/src/components/VAction/VAction.vue)

## Installation

Globally:

```js
// main.js
import Vue from "vue"
import { VAction } from "vuetensils"

Vue.component("VAction", VAction)
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VAction } from "vuetensils"

export default {
  components: {
    VAction,
  },
  // ...
}
</script>
```

## Button Example (Default)

```vue live
<template>
  <VAction @click="log">
    Click me
  </VAction>
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
  <VAction :to="'/'">
    Home
  </VAction>
</template>
```

## Anchor Link Example

```vue live
<template>
  <VAction href="/components/Action.html">
    Vuetensils
  </VAction>
</template>
```

## List Example

```vue live
<template>
  <ul>
    <li v-for="item in items">
      <VAction v-bind="item.bind" v-on="item.on" >
        {{ item.text }}
      </VAction>
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
          href: '/components/Action.html'
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
