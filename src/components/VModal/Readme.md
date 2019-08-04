### Styled Example

```vue
<template>
  <div class="styled">
    <VModal v-model="modal" transition="slide-up" bg-transition="fade">
      This is the modal content.
      <br />
      It traps the user focus.
      <br />
      <button @click="modal = false" aria-label="close">&times;</button>
    </VModal>
    <button @click="modal = !modal">Show the modal</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    modal: false
  })
}
</script>

<style>
.vts-modal {
  background: rgba(0, 0, 0, 0.7);
}

.vts-modal__content {
  position: relative;
  border-radius: 7px;
  padding: 20px;
  font-family: sans-serif;
}

.vts-modal__content button {
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

### Basic modal

```vue
<template>
  <div>
    <VModal v-model="modal">
      This is the modal content.
    </VModal>
    <button @click="modal = !modal">Show the modal</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    modal: false
  })
}
</script>
```

### Add a close button

```vue
<template>
  <div>
    <VModal v-model="modal">
      This is the modal content.
      <br />
      <button @click="modal = false">Close</button>
    </VModal>
    <button @click="modal = !modal">Show the modal</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    modal: false
  })
}
</script>
```

### Prevent scrolling

```vue
<template>
  <div>
    <VModal v-model="modal" noScroll>
      This is the modal content.
      <br />
      <button @click="modal = false">Close</button>
    </VModal>
    <button @click="modal = !modal">Show the modal</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    modal: false
  })
}
</script>
```

### With transitions

```vue
<template>
  <div>
    <VModal v-model="modal" transition="slide-up" bg-transition="fade">
      This is the modal content.
      <br />
      It traps the user focus.
      <br />
      <button @click="modal = false">Close</button>
    </VModal>
    <button @click="modal = !modal">Show the modal</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    modal: false
  })
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
