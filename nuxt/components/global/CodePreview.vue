<template>
  <VueLive :code="code" :layout="layout" />
</template>

<script>
import { VueLive } from 'vue-live';
import 'vue-live/lib/vue-live.esm.css';

export default {
  name: 'CodePreview',
  components: { VueLive },
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    layout: {
      template: `<div class="code-preview">
  <div class="border rounded-t-md p-2">
    <slot name="preview" />
  </div>
      
  <div class="rounded-b-md bg-gray-900">
    <slot name="editor" />
  </div>
</div>`
    }
  })
};
</script>

<style>
.code-preview input,
.code-preview button {
  border: 1px solid;
}

.code-preview button {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.code-preview .prism-editor__editor {
  padding: 0.5rem;
}
</style>