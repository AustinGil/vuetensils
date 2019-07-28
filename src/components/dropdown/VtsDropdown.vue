<template>
  <div class="vts-dropdown">
    <button
      @click="isFocused = !isFocused"
      :aria-expanded="!!isHovered || !!isFocused"
      aria-haspopup
    >
      {{ text }}
    </button>

    <transition :name="transition">
      <div
        v-if="!!isHovered || !!isFocused"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
        @focusout="onFocusout"
        class="vts-dropdown__content"
        :class="`vts-dropdown__content__content--${position}`"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>


<script>
/**
 * Show/hide inline content
 */
export default {
  props: {
    text: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: "bottom",
      validator(value) {
        return ["top", "bottom"].includes(value)
      }
    },
    transition: {
      type: String
    }
  },

  data: () => ({
    isHovered: false,
    isFocused: false
  }),

  methods: {
    onClickout(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false
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
