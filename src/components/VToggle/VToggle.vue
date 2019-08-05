<template>
  <div
    class="vts-toggle"
    :class="{ 'vts-toggle--open': isOpen }"
  >
    <button
      :id="`${id}-label`"
      ref="label"
      :disabled="disabled"
      :aria-controls="`${id}-content`"
      :aria-expanded="isOpen"
      @click="setOpen(!isOpen)"
      class="vts-toggle__button"
    >
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
        class="vts-toggle__content"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },

    disabled: Boolean,
    startOpen: Boolean
  },

  data: () => ({
    isOpen: false
  }),

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

  mounted() {
    this.isOpen = this.startOpen
  },

  methods: {
    collapse(el) {
      el.style.height = "0"
    },

    expand(el) {
      el.style.height = el.scrollHeight + "px"

      // only works with this prop accessed again
      el.scrollHeight
      // (╯°□°）╯︵ ┻━┻
    },

    resetHeight(el) {
      el.style.height = ""
    },

    setOpen(isOpen) {
      this.isOpen = isOpen
    }
  }
}
</script>

<style>
.vts-toggle {
  overflow: hidden;
}

.vts-toggle__label:focus {
  outline: 0;
}

.vts-toggle__content {
  overflow: hidden;
  transition: height 300ms ease;
}
</style>
