<template>
  <div :class="['vts-toggle', { 'vts-toggle--open': isOpen }, classes.root]">
    <button
      :id="`${id}-label`"
      ref="label"
      type="button"
      :disabled="disabled"
      :aria-controls="`${id}-content`"
      :aria-expanded="String(isOpen)"
      :class="['vts-toggle__label', classes.label]"
      @click="isOpen = !isOpen"
      v-on="listeners"
    >
      <!-- @slot The content that goes inside the button -->
      {{ label }}

      <slot name="label" v-bind="{ isOpen }" />
    </button>

    <transition
      @before-enter="collapse"
      @enter="expand"
      @after-enter="resetHeight"
      @before-leave="expand"
      @leave="collapse"
    >
      <div
        v-show="isOpen && !disabled"
        :id="`${id}-content`"
        :aria-labelledby="`${id}-label`"
        :aria-hidden="!isOpen"
        role="region"
        :class="['vts-toggle__content', classes.content]"
      >
        <!-- @slot The content that goes inside the toggleable region -->
        <slot v-bind="{ isOpen }" />
      </div>
    </transition>
  </div>
</template>

<script>
import { version } from 'vue';
import { randomString } from '../../utils.js';
const isVue3 = version && version.startsWith('3');

/**
 * Toggle the visibility of content. Useful for something like an FAQ page, for example. Includes ARIA attributes for expandable content and is keyboard friendly.
 */
export default {
  name: 'VToggle',
  model: {
    prop: 'open',
    event: 'update',
  },

  props: {
    open: Boolean,

    label: {
      type: String,
      default: '',
    },

    disabled: Boolean,

    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      isOpen: this.open,
    };
  },

  computed: {
    listeners() {
      if (isVue3) {
        return this.$attrs;
      }
      return this.$listeners;
    },
  },

  watch: {
    open(next) {
      this.isOpen = next;
    },
    isOpen(isOpen) {
      if (typeof window === 'undefined') return;
      this.$emit('update', isOpen);
      this.$emit(isOpen ? 'open' : 'close');
    },
  },

  created() {
    const { id } = this.$attrs;
    this.id = id ? id : `vts-${randomString(4)}`;
  },

  methods: {
    collapse(el) {
      el.style.height = 0;
    },

    expand(el) {
      el.style.overflow = 'hidden';
      el.style.height = `${el.scrollHeight}px`;
      // Force repaint to make sure the animation is triggered correctly.
      el.scrollHeight;
    },

    resetHeight(el) {
      el.style.overflow = 'visible';
      el.style.height = '';
    },
  },
};
</script>

<style>
.vts-toggle__content {
  transition: 300ms ease height;
}
</style>
