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
      @click="toggleIsFocused"
      @keyup.enter="toggleIsFocused"
      @keyup.space="toggleIsFocused"
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
  props: {
    /**
     * The toggle button text.
     */
    text: {
      type: String,
      default: ""
    },
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
      },
    },
    /**
     * The transition name.
     */
    transition: {
      type: String,
      default: ""
    },

    classes: {
      type: Object,
      default: () => ({})
    },
  },

  data: () => ({
    isHovered: false,
    isFocused: false,
  }),

  mounted() {
    const { onClickout } = this
    document.addEventListener("click", onClickout)
    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("click", onClickout)
    })
  },

  methods: {
    toggleIsFocused() {
      this.isFocused = !this.isFocused;
    },

    onClickout(e) {
      if (!this.$el.contains(e.target)) {
        this.isFocused = false
      }
    },

    onFocusout(event) {
      if (!this.$el.contains(event.relatedTarget)) {
        this.isFocused = false
      }
    },
  },
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
}

.vts-dropdown__content--top {
  top: 0;
  transform: translateY(-100%);
}
</style>
