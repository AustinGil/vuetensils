# VDrawer

A convenient sidebar that can be toggled on or off. When opened, it traps the user's focus so that keyboard navigation will remain within the sidebar until it is closed. It also supports being closed by pressing the ESC key.

[Source](https://github.com/Stegosource/vuetensils/blob/master/src/components/VDrawer/VDrawer.vue)

## Installation

Globally:

```js
// main.js
import Vue from "vue"
import { VDrawer } from "vuetensils"

Vue.component("VDrawer", VDrawer)
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VDrawer } from "vuetensils"

export default {
  components: {
    VDrawer,
  },
  // ...
}
</script>
```

## Styled Examples

```vue live
<template>
  <div class="styled">
    <VDrawer v-model="showDrawer" transition="slide-right" bg-transition="fade">
      My drawer content
    </VDrawer>

    <button @click="showDrawer = !showDrawer">Toggle Drawer</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDrawer: false,
  }),
}
</script>
```

```css
.vts-drawer {
  background: rgba(0, 0, 255, 0.5);
}

.vts-drawer__content {
  padding: 20px;
  color: #fff;
  background: #222;
  transition: transform 0.3s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
```

## Unstyled Examples

```vue live
<template>
  <div>
    <VDrawer v-model="showDrawer">
      My drawer content
    </VDrawer>

    <button @click="showDrawer = !showDrawer">Toggle Drawer</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDrawer: false,
  }),
}
</script>
```

## Right aligned

```vue live
<template>
  <div>
    <VDrawer v-model="showDrawer" right>
      My drawer content
    </VDrawer>

    <button @click="showDrawer = !showDrawer">Toggle Drawer</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDrawer: false,
  }),
}
</script>
```

## Prevent page scroll

```vue live
<template>
  <div>
    <VDrawer v-model="showDrawer" noScroll>
      My drawer content
    </VDrawer>

    <button @click="showDrawer = !showDrawer">Toggle Drawer</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDrawer: false,
  }),
}
</script>
```

## Add transitions

```vue live
<template>
  <div>
    <VDrawer v-model="showDrawer" transition="slide-right" bg-transition="fade">
      My drawer content
    </VDrawer>

    <button @click="showDrawer = !showDrawer">Toggle Drawer</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDrawer: false,
  }),
}
</script>
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
```

## Custom Classes

This component can accept a `classes` prop to cusomize the output HTML classes:

```
:classes="{ root: 'root-class', content: 'content-class' }"
```
