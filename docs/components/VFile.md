# VFile

File selector that behaves like a native file input. However, it can be extended to behave like a drag and drop file selector.

## Installation

Globally:

```js
// main.js
import Vue from "vue"
import { VFile } from "vuetensils"

Vue.component("VFile", VFile)
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VFile } from "vuetensils"

export default {
  components: {
    VFile,
  },
  // ...
}
</script>
```

## Styled Example

```vue live
<template>
  <div class="styled">
    <VFile v-model="files" label="Files" />
    <p v-if="files.length">
      You've selected the file "{{ files[0].name }}" ({{ files[0].type }}). It was last modified
      {{ files[0].lastModifiedDate }}
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

## Unstyled Examples

```vue live
<template>
  <VFile label="Files" />
</template>
```

Output HTML:

```html
<label class="vts-file">
  <input type="file" class="vts-file__input" />
  <span class="vts-file__text">Files</span>
  <div class="vts-file__dropzone">
    <span aria-hidden="true">
      Choose files or drop here
    </span>
  </div>
</label>
```

## Using v-model

With `v-model`, you have access to the array of [File Objects](https://developer.mozilla.org/en-US/docs/Web/API/File) which we get from a file selection event, or a file drop event.

Note: the browser will not actually display a File Object if you try to render it in a template, but it's there.

```vue live
<template>
  <div>
    <VFile v-model="files" label="Select a file" />
    <pre>{{ files.map(file => file.name) }}</pre>
  </div>
</template>

<script>
export default {
  data: () => ({
    files: [],
  }),
}
</script>
```

## Multiple File selection

Just like the default [file input](), this component accepts a `multiple` prop. Setting it to a truthy value will allow a user to select multiple value.

```vue live
<template>
  <div>
    <VFile v-model="files" label="Select a file" />
    <pre>{{ files.map(file => file.name) }}</pre>
  </div>
</template>

<script>
export default {
  data: () => ({
    files: [],
  }),
}
</script>
```

## Custom dropzone content

This component has 1 slot for the dropzone content. This slot provides you with an object containing the following:

- `files`: The FileList or an empty array.
- `droppable`: A boolean capturing the status on whether or not the user has a file selected and is hovering over the dropzone.

Note that the default dropzone content has an `aria-hidden="true"` attribute to prevent screen readers from reading it. If you customize this content, you might want to do the same.

```vue live
<template>
  <VFile label="Select a file">
    <template #default="{ files, droppable}">
      <p v-if="droppable" aria-hidden="true">Go ahead, let go.</p>
      <p v-else-if="files.length" aria-hidden="true">You selected {{ files[0].name }}.</p>
      <p v-else aria-hidden="true">Drop some sweet files here.</p>
    </template>
  </VFile>
</template>
```

## Event-based classes

There are a couple extra classes that are added to root of the component based on events:

- 'vts-file--droppable': When the user is dragging a file over the dropzone.
- 'vts-file--selected': When at least 1 file has been selected.

You can use these events to style any element within the root.

## Custom Classes

This component can accept a `classes` prop to cusomize the output HTML classes:

```
:classes="{ root: 'root-class', input: 'input-class', text: 'text-class', dropzone: 'dropzone-class' }"
```
