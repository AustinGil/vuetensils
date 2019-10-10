<template>
  <div class="vts-toggle"
:class="{ 'vts-toggle--open': isOpen }">
    <button
      :id="`${id}-label`"
      ref="label"
      :disabled="disabled"
      :aria-controls="`${id}-content`"
      :aria-expanded="isOpen"
      class="vts-toggle__button"
      @click="isOpen = !isOpen"
    >
      <!-- @slot The content that goes inside the button -->
      <slot name="label" />
    </button>

    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <div
        v-show="isOpen && !disabled"
        :id="`${id}-content`"
        :aria-labelledby="`${id}-label`"
        :aria-hidden="!isOpen"
        role="region"
        class="vts-toggle__content"
      >
        <!-- @slot The content that goes inside the toggleable region -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import smoothHeight from '../../mixins/smoothHeight';
/**
 * Toggle the visibility of content. Useful for something like an FAQ page, for example. Includes ARIA attributes for expandable content and is keyboard friendly.
 */
export default {
  mixins: [smoothHeight],
  props: {
    /**
     * The content inside the toggle button
     */
    label: {
      type: String,
      required: true
    },

    disabled: Boolean,
    startOpen: Boolean
  },

  data() {
    return {
      isOpen: !!this.isOpen
    }
  },

  computed: {
    id() {
      if (this.$attrs.id) return this.$attrs.id

      return (
        "vts-toggle-" +
        Array(6)
          .fill()
          .map(() => Math.floor(36 * Math.random()).toString(36))
          .join("")
      )
    }
  },
}
</script>

<style>
.expand-enter-active,
.expand-leave-active {
  overflow: hidden;
  transition: height 0.2s linear;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>
