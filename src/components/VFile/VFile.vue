<template>
  <label
    :class="[
      'vts-file',
      {
        'vts-file--droppable': droppable,
        'vts-file--filled': !!files.length,
      },
      classes.root,
    ]"
  >
    <input
      ref="input"
      v-bind="$attrs"
      @change.prevent="$emit('change', $event.target.files)"
      v-on="$listeners"
      type="file"
      :class="['vts-file__input', classes.input]"
    />

    <span :class="['vts-file__text', classes.text]">
      <slot name="label">{{ label }}</slot>
    </span>

    <div
      :class="['vts-file__dropzone', classes.dropzone]"
      @drop.prevent="$emit('change', $event.dataTransfer.files)"
      @dragenter.prevent="droppable = true"
      @dragleave.prevent="droppable = false"
      @dragover.prevent
    >
      <slot v-bind="{ files, droppable, clear }">
        <template v-if="files.length">
          {{
            files.length > 1 ? `${files.length} files selected` : files[0].name
          }}
        </template>

        <template v-else>
          No file chosen
        </template>
      </slot>
    </div>
  </label>
</template>

<script>
export default {
  model: {
    prop: "files",
    event: "change",
  },

  props: {
    label: {
      type: String,
      required: true,
    },

    files: {
      type: [Array, FileList],
      default: () => [],
    },

    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    droppable: false,
  }),

  watch: {
    files() {
      this.droppable = false
    },
  },

  methods: {
    clear() {
      this.$emit("change", [])
      this.$refs.input.value = null
    },
  },
}
</script>

<style>
.vts-file__input {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
}

.vts-file__dropzone {
  appearance: searchfield;
}

input:focus ~ .vts-file__dropzone {
  outline-width: 1px;
  outline-style: auto;
  outline-color: Highlight;
  outline-color: -webkit-focus-ring-color;
}
</style>

