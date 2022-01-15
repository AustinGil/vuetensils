<template>
  <div>
    <ClientOnly>
      <div class="live-preview">
        <slot name="preview" />
      </div>

      <div class="language-vue">
        <slot name="editor" />
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import "prismjs/themes/prism-okaidia.css";
import "vue-prism-editor/dist/prismeditor.min.css";
// Required for build to work
export default {}
</script>

<style>
.live-preview,
.language-vue .prism-editor__editor {
  padding: 1rem;
}
.live-preview {
  border: 1px solid #CCC;
  border-radius: 5px;
  font: initial;
  color: initial;
}
.language-vue .prism-editor__editor {
  color: #fff;
}
</style>