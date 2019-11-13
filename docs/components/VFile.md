# VFile

File selector that behaves like a native file input. However, it can be extended to behave like a drag and drop file selector.

```vue live
<template>
  <div class="styled">
    <VFile v-model="files" label="Files" />
    <p v-if="files.length">
      You've selected the file "{{ files[0].name }}" ({{ files[0].type }}). It
      was last modified {{ files[0].lastModifiedDate }}
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({
    files: [],
  }),
}
</script>

<style>
.vts-file__dropzone {
  display: flex;
  justify-content: center;
  border: 3px dashed skyblue;
  border-radius: 5px;
  padding: 30px;
  background: lightblue;
  transition: background-color 0.2s ease;
}

.vts-file--droppable .vts-file__dropzone {
  background: skyblue;
}

.vts-file--selected .vts-file__dropzone {
  background: greenyellow;
}
</style>
```
