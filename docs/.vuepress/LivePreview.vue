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
.language-vue {
  padding: 1rem;
  color: #fff;
  caret-color: currentColor;
  outline: 0;
}
.live-preview {
  border: 1px solid #CCC;
  border-radius: 5px;
  font: initial;
  color: initial;
}
.prism-editor__textarea {
  outline: 0;
}
</style>