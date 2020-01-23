# VDialog

A dialog component for showing users content which overlays the rest of the applications. When opened, it traps the user's focus so that keyboard navigation will remain within the dialog until it is closed. It supports being closed by clicking outside the dialog content or pressing the ESC key.

[Source](https://github.com/Stegosource/vuetensils/blob/master/src/components/VDialog/VDialog.vue)

## Installation

Globally:

```js
// main.js
import Vue from "vue"
import { VDialog } from "vuetensils"

Vue.component("VDialog", VDialog)
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VDialog } from "vuetensils"

export default {
  components: {
    VDialog,
  },
  // ...
}
</script>
```

## Styled Example

```vue live
<template>
  <div class="styled">
    <VDialog v-model="dialog" bg-transition="fade">
      This is the dialog content.
      <br />
      It traps the user focus.
      <br />
      <button @click="dialog = false" aria-label="close">&times;</button>
    </VDialog>
    <button @click="dialog = !dialog">Show the dialog</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
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

.slide-up-enter-active,
.slide-up-leave-active {
  transform: translateY(0);
  transition: opacity 0.5s, transform 0.5s;
}

.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.vts-dialog {
  background: rgba(0, 0, 0, 0.7);
}

.vts-dialog__content {
  position: relative;
  border-radius: 7px;
  padding: 20px;
  font-family: sans-serif;
  transition: transform 0.3s;
}

.fade-enter .vts-dialog__content,
.fade-leave-active .vts-dialog__content {
  transform: translateY(20px);
}

.vts-dialog__content button {
  position: absolute;
  top: 5px;
  right: 5px;
  border: 0;
  padding: 5px;
  background: transparent;
}
```

## Basic dialog

```vue live
<template>
  <div>
    <VDialog v-model="dialog">
      This is the dialog content.
    </VDialog>
    <button @click="dialog = !dialog">Show the dialog</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
}
</script>
```

## Add a close button

```vue live
<template>
  <div>
    <VDialog v-model="dialog">
      This is the dialog content.
      <br />
      <button @click="dialog = false">Close</button>
    </VDialog>
    <button @click="dialog = !dialog">Show the dialog</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
}
</script>
```

## Prevent scrolling

```vue live
<template>
  <div>
    <VDialog v-model="dialog" noScroll>
      This is the dialog content.
      <br />
      <button @click="dialog = false">Close</button>
    </VDialog>
    <button @click="dialog = !dialog">Show the dialog</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
}
</script>
```

## With transitions

```vue live
<template>
  <div>
    <VDialog v-model="dialog" transition="slide-up" bg-transition="fade">
      This is the dialog content.
      <br />
      It traps the user focus.
      <br />
      <button @click="dialog = false">Close</button>
    </VDialog>
    <button @click="dialog = !dialog">Show the dialog</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
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

.slide-up-enter-active,
.slide-up-leave-active {
  transform: translateY(0);
  transition: opacity 0.5s, transform 0.5s;
}

.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
```

## Custom Classes

This component can accept a `classes` prop to cusomize the output HTML classes:

```
:classes="{ root: 'root-class', content: 'content-class' }"
```
