---
title: 'Drawer'
category: 'Components'
---

A convenient sidebar that can be toggled on or off. When opened, it traps the user's focus so that keyboard navigation will remain within the sidebar until it is closed. It also supports being closed by pressing the ESC key.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VDrawer/VDrawer.vue)

Features:

- Manages `tabindex` attributes for drawer accessibility.
- Manages `aria-haspopup` and `aria-expanded` attributes for toggle button accessibility.
- Maintains focus states to remain within the drawer for keyboard users.
- Adds event listener to close drawer on the `esc` key.
- Supports preventing page scroll while open.

## Installation

Globally:

```js
// main.js
import Vue from 'vue';
import { VDrawer } from 'vuetensils';

// Vue 3
app.component(
// Vue 2
Vue.component('VDrawer', VDrawer);
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VDrawer } from 'vuetensils';

export default {
  components: {
    VDrawer,
  },
  // ...
};
</script>
```

## Styled Examples

```vue live
<template>
  <div class="styled">
    <VDrawer transition="slide-right" bg-transition="fade">
      <template #toggle="{ bind, on }">
        <button v-bind="bind" v-on="on">
          Toggle Drawer
        </button>
      </template>

      My drawer content
    </VDrawer>
  </div>
</template>
```

```css
.vts-drawer {
  background: rgba(0, 0, 255, 0.5);
}

.vts-drawer__content {
  padding: 20px;
  color: #FFF;
  background: #222;
  transition: 0.3s ease transform;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
```

## Styling

NOTE: drawer background colors have been removed.

To add background colors to the content, you chave 3 options:

1. Use the provided `.vts-drawer__content` class to add a background color:
   ```css
   .vts-drawer__content {
     background: #FFF;
   }
   ```
2. Use the `classes` prop object to provide a custom class:
   ```vue
   <VDrawer :classes="{ content: 'bg-white' }">
    ...
   </VDrawer>
   ```
3. Use the slot content to provide a custom class:
   ```
   <VDrawer>
     <div class="sidebar">...</div>
   </VDrawer>
   ```
   ```css
   .sidebar {
     height: 100%;
     background: #FFF;
   }
   ```

## Examples

The following styles have been added to **this site** to make the drawers easier to see:

```css
.bg-white {
  background-color: #FFF;
}

.bg-black-alpha {
  background: rgba(0, 0, 0, 0.2);
}
```

```vue live
<template>
  <VDrawer :classes="{ bg: 'bg-black-alpha', content: 'bg-white' }">
    <template #toggle="{ bind, on }">
      <button v-bind="bind" v-on="on">
        Toggle Drawer
      </button>
    </template>

    My drawer content
  </VDrawer>
</template>
```

## Using v-model

```vue live
<template>
  <div>
    <VDrawer
      v-model="drawer"
      :classes="{ bg: 'bg-black-alpha', content: 'bg-white' }"
    >
      My drawer content
    </VDrawer>

    <button @click="drawer = !drawer">
      Show the drawer
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
};
</script>
```

## Right aligned

```vue live
<template>
  <VDrawer right :classes="{ bg: 'bg-black-alpha', content: 'bg-white' }">
    <template #toggle="{ bind, on }">
      <button v-bind="bind" v-on="on">
        Toggle Drawer
      </button>
    </template>

    My drawer content
  </VDrawer>
</template>
```

## Prevent page scroll

```vue live
<template>
  <VDrawer no-scroll :classes="{ bg: 'bg-black-alpha', content: 'bg-white' }">
    <template #toggle="{ bind, on }">
      <button v-bind="bind" v-on="on">
        Toggle Drawer
      </button>
    </template>

    My drawer content
  </VDrawer>
</template>
```

## Add transitions

```vue live
<template>
  <VDrawer
    transition="slide-right"
    bg-transition="fade"
    :classes="{ bg: 'bg-black-alpha', content: 'bg-white' }"
  >
    <template #toggle="{ bind, on }">
      <button v-bind="bind" v-on="on">
        Toggle Drawer
      </button>
    </template>

    My drawer content
  </VDrawer>
</template>
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
```

## Custom Classes

This component can accept a `classes` prop to customize the output HTML classes:

```
:classes="{ bg: 'bg-class', content: 'content-class' }"
```
