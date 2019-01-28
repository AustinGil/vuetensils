```vue
<template>
  <div>
    <vts-modal
      v-model="modal"
      transition="slide-up"
      bg-transition="fade"
    >
      This is the modal content.
      <br />
      It traps the user focus.
      <br />
      <button @click="modal = false">Close</button>
    </vts-modal>
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
