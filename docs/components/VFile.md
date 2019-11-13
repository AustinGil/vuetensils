# VFile

```vue live
<template>
  <VFile v-model="files" label="Files" @change="onChange" />
</template>

<script>
export default {
  data: () => ({
    files: [],
  }),

  methods: {
    onChange(event) {
      console.log(event)
    },
  },
}
</script>

<style>
.vts-file--droppable .vts-file__dropzone {
  background: red;
}
</style>
```
