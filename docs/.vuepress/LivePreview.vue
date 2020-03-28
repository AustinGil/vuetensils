<template functional>
  <div>
    <ClientOnly>
      <div class="live-preview">
        <slot name="preview" />
      </div>

      <slot name="editor" />
    </ClientOnly>
  </div>
</template>

<style>
.live-preview {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  font: initial;
  color: initial;
}
</style>
