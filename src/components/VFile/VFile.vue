<template>
  <label
    :for="id"
    :class="[
      'vts-file',
      {
        'vts-file--droppable': droppable,
        'vts-file--selected': !!localFiles.length,
      },
      classes.label,
    ]"
  >
    <input
      :id="id"
      ref="input"
      v-bind="$attrs"
      type="file"
      :class="['vts-file__input', classes.input]"
      @change="onChange"
      v-on="$listeners"
    />

    <span :class="['vts-file__text', classes.text]">
      <slot name="label">{{ label }}</slot>
    </span>

    <div class="vts-file__dropzone" @dragenter.prevent="droppable = true">
      <slot v-bind="{ files: localFiles, droppable }">
        <span v-if="localFiles.length" aria-hidden="true">
          <template v-if="localFiles.length > 1">
            {{ localFiles.length }} files selected
          </template>
          <template v-else>
            {{ localFiles[0].name }}
          </template>
        </span>

        <span v-else aria-hidden="true">
          Choose files or drop here
        </span>
      </slot>

      <span
        v-if="droppable"
        class="vts-file__overlay"
        @drop.prevent="onDrop"
        @dragenter.stop="droppable = true"
        @dragleave.stop="droppable = false"
        @dragover.prevent
      >
        <slot name="overlay" />
      </span>
    </div>
  </label>
</template>

<script>
import { randomString } from "../../utils";

export default {
  name: "VFile",
  model: {
    prop: "files",
    event: "update",
  },

  props: {
    label: {
      type: String,
      required: true
    },

    files: {
      type: Array,
      default: () => []
    },

    classes: {
      type: Object,
      default: () => ({})
    },
  },

  data: () => ({
    localFiles: [],
    droppable: false,
  }),

  watch: {
    files(files) {
      this.localFiles = files;
    },
    localFiles() {
      this.droppable = false;
    },
  },

  created() {
    this.id = this.$attrs.id || "vts-" + randomString(4);
  },

  methods: {
    onChange(event) {
      const files = Array.from(event.target.files);
      this.localFiles = files;
      this.$emit("update", files);
    },

    onDrop(event) {
      const files = Array.from(event.dataTransfer.files);
      const isMulti = this.$attrs.multiple != null;
      if (!isMulti && files.length > 1) {
        files.length = 1;
      }
      this.localFiles = files;
      this.$emit("update", files);
    },

    // clear() {
    //   this.localFiles = []
    //   this.$refs.input.value = null
    //   this.$emit("update", [])
    // },
  },
};
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
  position: relative;
}

.vts-file__overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

input:focus ~ .vts-file__dropzone {
  outline-width: 1px;
  outline-style: auto;
  outline-color: Highlight;
  outline-color: -webkit-focus-ring-color;
}
</style>

