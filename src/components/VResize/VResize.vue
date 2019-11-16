<template>
  <component :is="tag" class="vts-resize">
    <slot v-bind="{ width, height }" />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },

  data: () => ({
    width: undefined,
    height: undefined,
  }),

  mounted() {
    const fn = this.updateDimensions
    fn()
    window.addEventListener("resize", fn)
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("resize", fn)
    })
  },

  methods: {
    updateDimensions() {
      const el = this.$el
      this.width = el.offsetWidth
      this.height = el.offsetHeight
    },
  },
}
</script>
