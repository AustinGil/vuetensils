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
      :class="['vts-visually-hidden', classes.input]"
      @change="onChange"
      v-on="listeners"
    />

    <span :class="['vts-file__text', classes.text]">
      <slot name="label">{{ label }}</slot>
    </span>

    <div
      :class="['vts-file__dropzone', classes.dropzone]"
      @dragenter.prevent="droppable = true"
    >
      <slot v-bind="{ files: localFiles, droppable }">
        <span v-if="localFiles.length" aria-hidden="true">
          <template v-if="localFiles.length > 1">
            {{ localFiles.length }} files selected
          </template>
          <template v-else>
            {{ localFiles[0].name }}
          </template>
        </span>

        <span v-else aria-hidden="true"> Choose files or drop here </span>
      </slot>

      <span
        v-if="droppable"
        :class="['vts-file__overlay', classes.overlay]"
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
import { isVue3 } from 'vue-demi';
import { randomString } from '../../utils.js';
import '../../shared.css';

export default {
  name: 'VFile',
  model: {
    prop: 'files',
    event: 'update',
  },

  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: () => 'vts-' + randomString(4),
    },

    modelValue: {
      type: Array,
      default: () => [],
    },
    files: {
      type: Array,
      default: () => [],
    },

    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    localFiles: [],
    droppable: false,
  }),

  computed: {
    listeners() {
      if (isVue3) {
        return this.$attrs;
      }
      return this.$listeners;
    },
  },

  watch: {
    files(files) {
      this.localFiles = files;
    },
    modelValue(files) {
      this.localFiles = files;
    },
    localFiles() {
      this.droppable = false;
    },
  },

  methods: {
    onChange(event) {
      const files = Array.from(event.target.files);
      this.localFiles = files;
      this.$emit('update', files);
      this.$emit('update:modelValue', files);
    },

    onDrop(event) {
      const files = Array.from(event.dataTransfer.files);
      const isMulti = this.$attrs.multiple != null;
      if (!isMulti && files.length > 1) {
        files.length = 1;
      }
      this.localFiles = files;
      this.$emit('update', files);
      this.$emit('update:modelValue', files);
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
.vts-file__dropzone {
  position: relative;
}

.vts-file__overlay {
  position: absolute;
  inset: 0;
}

input:focus ~ .vts-file__dropzone {
  outline-width: 1px;
  outline-style: auto;
  outline-color: Highlight;
  outline-color: -webkit-focus-ring-color;
}
</style>
