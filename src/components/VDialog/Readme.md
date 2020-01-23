### Styled Example

```vue
<template>
  <div class="styled">
    <VDialog v-model="dialog" transition="slide-up" bg-transition="fade">
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

<style>
.vts-dialog {
  background: rgba(0, 0, 0, 0.7);
}

.vts-dialog__content {
  position: relative;
  border-radius: 7px;
  padding: 20px;
  font-family: sans-serif;
}

.vts-dialog__content button {
  position: absolute;
  top: 5px;
  right: 5px;
  border: 0;
  padding: 5px;
  background: transparent;
}

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
</style>
```

### Basic dialog

```vue
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

### Add a close button

```vue
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

### Prevent scrolling

```vue
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

### With transitions

```vue
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

<style>
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
</style>
```

### Custom Classes

This component can accept a `classes` prop to cusomize the output HTML classes:

```
:classes="{ root: 'root-class', content: 'content-class' }"
```
