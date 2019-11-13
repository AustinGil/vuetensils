<template>
  <label
    :class="[
      'vts-file',
      {
        'vts-file--droppable': droppable,
        'vts-file--selected': !!files.length,
      },
      classes.root,
    ]"
  >
    <input
      ref="input"
      v-bind="$attrs"
      @change="onChange"
      v-on="$listeners"
      type="file"
      :class="['vts-file__input', classes.input]"
    />

    <span :class="['vts-file__text', classes.text]">
      <slot name="label">{{ label }}</slot>
    </span>

    <span
      :class="['vts-file__dropzone', classes.dropzone]"
      @drop.prevent="onDrop"
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
          Choose files or drop here
        </template>
      </slot>
    </span>
  </label>
</template>

<script>
export default {
  model: {
    prop: "files",
    event: "update",
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
    onDrop(event) {
      this.$emit("update", event.dataTransfer.files)
    },
    onChange(event) {
      this.$emit("update", event.target.files)
    },

    clear() {
      this.$emit("update", [])
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
  border: 1px solid;
  padding: 2px;
}

input:focus ~ .vts-file__dropzone {
  outline-width: 1px;
  outline-style: auto;
  outline-color: Highlight;
  outline-color: -webkit-focus-ring-color;
}
</style>

