<template>
  <div
    :class="['vts-dropdown', classes.root]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @focus="isFocused = true"
    @blur="isFocused = false"
    @focusout="onFocusout"
  >
    <button
      :aria-expanded="!!isHovered || !!isFocused"
      aria-haspopup="true"
      :class="['vts-dropdown__trigger', classes.trigger]"
      type="button"
      @click="isFocused = !isFocused"
    >
      <!-- @slot The content within the trigger button -->
      <slot name="trigger">
        {{ text }}
      </slot>
    </button>

    <transition :name="transition">
      <div
        v-if="!!isHovered || !!isFocused"
        class="vts-dropdown__content"
        :class="[`vts-dropdown__content--${position}`, classes.content]"
      >
        <!-- @slot The dropdown content -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
/**
 * Adds a button that can show/hide dropdown content when it is hovered over, or clicked. When it is clicked, the content will persist until the user clicks out or focuses out. Includes relevant ARIA attributes for the hidden content.
 */
export default {
  name: 'VDrawer',
  props: {
    /**
     * The toggle button text.
     */
    text: {
      type: String,
      default: '',
    },
    /**
     * Where the content should be placed in relation to the button.
     *
     * Options: 'bottom', 'top'
     */
    position: {
      type: String,
      default: 'bottom',
      validator(value) {
        return ['top', 'bottom'].includes(value);
      },
    },
    /**
     * The transition name.
     */
    transition: {
      type: String,
      default: '',
    },

    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    isHovered: false,
    isFocused: false,
  }),

  mounted() {
    document.addEventListener('click', this.onClickout);
  },

  /** @deprecated in Vue 3 */
  beforeDestroy() {
    document.removeEventListener('click', this.onClickout);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onClickout);
  },

  methods: {
    onClickout(e) {
      if (!this.$el.contains(e.target)) {
        this.isFocused = false;
      }
    },

    onFocusout(event) {
      if (!this.$el.contains(event.relatedTarget)) {
        this.isFocused = false;
      }
    },
  },
};
</script>

<style>
:where(.vts-dropdown) {
  display: inline-block;
  position: relative;
}

:where(.vts-dropdown__content) {
  position: absolute;
  z-index: 5;
  min-inline-size: 100%;
}

:where(.vts-dropdown__content--top) {
  inset-block-start: 0;
  transform: translateY(-100%);
}
</style>
