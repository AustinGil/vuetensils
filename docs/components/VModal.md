# VModal

A modal/dialogue component for showing users content which overlays the rest of the applications. When opened, it traps the user's focus so that keyboard navigation will remain within the modal until it is closed. It supports being closed by clicking outside the modal content or pressing the ESC key.

## Styled Example

```vue live
<template>
  <div class="styled">
    <VModal v-model="modal" bg-transition="fade">
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
    modal: false,
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

.vts-modal {
  background: rgba(0, 0, 0, 0.7);
}

.vts-modal__content {
  position: relative;
  border-radius: 7px;
  padding: 20px;
  font-family: sans-serif;
  transition: transform 0.3s;
}

.fade-enter .vts-modal__content,
.fade-leave-active .vts-modal__content {
  transform: translateY(20px);
}

.vts-modal__content button {
  position: absolute;
  top: 5px;
  right: 5px;
  border: 0;
  padding: 5px;
  background: transparent;
}
```

## Basic modal

```vue live
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
    modal: false,
  }),
}
</script>
```

## Add a close button

```vue live
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
    modal: false,
  }),
}
</script>
```

## Prevent scrolling

```vue live
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
    modal: false,
  }),
}
</script>
```

## With transitions

```vue live
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
    modal: false,
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
