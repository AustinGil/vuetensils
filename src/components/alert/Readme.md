```vue
<template>
  <div>
    <button @click="alert = !alert">Toggle Drawer</button>

    <vts-alert v-model="alert">
      My alert content goes here
    </vts-alert>
  </div>
</template>

<script>
export default {
  data: () => ({
    alert: false
  })
}
</script>

<style></style>
```
