<template>
  <div class="vts-dropdown" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <button
      @click="isFocused = !isFocused"
      :aria-expanded="!!isHovered || !!isFocused"
      aria-haspopup
      class="vts-dropdown__trigger"
    >
      <!-- @slot The content within the trigger button -->
      <slot name="trigger">{{ text }}</slot>
    </button>

    <transition :name="transition">
      <div
        v-if="!!isHovered || !!isFocused"
        @focusout="onFocusout"
        class="vts-dropdown__content"
        :class="`vts-dropdown__content__content--${position}`"
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
  props: {
    /**
     * The toggle button text.
     */
    text: String,
    /**
     * Where the content should be placed in relation to the button.
     *
     * Options: 'bottom', 'top'
     */
    position: {
      type: String,
      default: "bottom",
      validator(value) {
        return ["top", "bottom"].includes(value)
      }
    },
    /**
     * The trnasition name.
     */
    transition: String
  },

  data: () => ({
    isHovered: false,
    isFocused: false
  }),

  methods: {
    onClickout(e) {
      if (!this.$el.contains(e.target)) {
        this.isFocused = false
      }
    },

    onFocusout(event) {
      if (!this.$el.contains(event.relatedTarget)) {
        this.isFocused = false
      }
    }
  },

  mounted() {
    document.addEventListener("click", this.onClickout)
    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("click", this.onClickout)
    })
  }
}
</script>

<style>
.vts-dropdown {
  display: inline-block;
  position: relative;
}

.vts-dropdown__content {
  position: absolute;
  z-index: 5;
  min-width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #fff;
}

.vts-dropdown__content--top {
  top: 0;
  transform: translateY(-100%);
}
</style>
