<template>
  <div :class="['vts-toggle', { 'vts-toggle--open': isOpen }, classes.root]">
    <button
      :id="`${id}-label`"
      ref="label"
      :disabled="disabled"
      :aria-controls="`${id}-content`"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
      :class="['vts-toggle__label', classes.label]"
    >
      <!-- @slot The content that goes inside the button -->
      <slot name="label" />
    </button>

    <transition
      @before-enter="collapse"
      @enter="expand"
      @after-enter="resetHeight"
      @before-leave="expand"
      @leave="collapse"
    >
      <div
        :id="`${id}-content`"
        :aria-labelledby="`${id}-label`"
        :aria-hidden="!isOpen"
        v-show="isOpen && !disabled"
        role="region"
        :class="['vts-toggle__content', classes.content]"
      >
        <!-- @slot The content that goes inside the toggleable region -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
/**
 * Toggle the visibility of content. Useful for something like an FAQ page, for example. Includes ARIA attributes for expandable content and is keyboard friendly.
 */
export default {
  props: {
    /**
     * The content inside the toggle button
     */
    label: {
      type: String,
      required: true,
    },

    disabled: Boolean,

    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      isOpen: !!this.isOpen,
    }
  },

  computed: {
    id() {
      const { id } = this.$attrs
      if (id) return id

      return (
        "vts-toggle-" +
        Array(6)
          .fill()
          .map(() => Math.floor(36 * Math.random()).toString(36))
          .join("")
      )
    },
  },

  methods: {
    collapse(el) {
      el.style.height = 0
    },

    expand(el) {
      el.style.overflow = "hidden"
      el.style.height = `${el.scrollHeight}px`
      // Force repaint to make sure the animation is triggered correctly.
      el.scrollHeight
    },

    resetHeight(el) {
      el.style.overflow = "visible"
      el.style.height = ""
    },
  },
}
</script>

<style>
.vts-toggle__content {
  transition: height 300ms ease;
}
</style>
