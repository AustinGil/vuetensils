```vue
<template>
  <div>
    <vts-drawer
      v-model="showDrawer"
      transition="slide-right"
      bg-transition="fade"
    >
      My drawer content
    </vts-drawer>

    <button @click="showDrawer = !showDrawer">Toggle Drawer</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDrawer: false
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

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
```
