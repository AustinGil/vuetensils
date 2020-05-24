<template>
  <div :class="['vts-toggle', { 'vts-toggle--open': isOpen }, classes.root]">
    <!-- eslint-disable vue-a11y/click-events-have-key-events -->
    <button
      :id="`${id}-label`"
      ref="label"
      :disabled="disabled"
      :aria-controls="`${id}-content`"
      :aria-expanded="String(isOpen)"
      :class="['vts-toggle__label', classes.label]"
      @click="isOpen = !isOpen"
      v-on="$listeners"
    >
      <!-- eslint-enable vue-a11y/click-events-have-key-events -->
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
import { randomString } from "../../utils"
/**
 * Toggle the visibility of content. Useful for something like an FAQ page, for example. Includes ARIA attributes for expandable content and is keyboard friendly.
 */
export default {
  name: "VToggle",
  model: {
    prop: "open",
    event: "update",
  },

  props: {
    open: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: "",
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
    }
  },

  watch: {
    open(next) {
      this.isOpen = next
    },
    isOpen(isOpen) {
      if (typeof window === "undefined") return
      this.$emit("update", isOpen)
      this.$emit(isOpen ? "open" : "close")
    },
  },

  created() {
    const { id } = this.$attrs
    this.id = id ? id : `vts-${randomString(4)}`
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
