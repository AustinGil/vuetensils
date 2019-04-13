<template>
  <div v-if="visible" role="alert">
    <slot></slot>
  </div>
</template>

<script>
const NAME = "vts-alert"

export default {
  name: NAME,

  model: {
    prop: "visible",
    event: "change"
  },

  props: {
    /**
     * @model
     */
    visible: {
      type: Boolean,
      default: false
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String
    }
  },

  data: () => ({
    timerId: null
  }),

  methods: {
    show() {
      this.$emit("show")
      this.$emit("change", true)
    },
    hide() {
      this.$emit("hide")
      if (typeof this.visible === "number") {
        this.$emit("timer-update", 0)
        this.$emit("change", 0)
      } else {
        this.$emit("change", false)
      }
      this.clearTimer()
    },
    toggle() {
      this.$emit("toggle", this.visible)
      this.$emit("change", this.visible)
    },
    clearTimer() {
      if (this.timerId) {
        clearInterval(this.timerId)
        this.timerId = null
      }
    }
  },

  beforeDestroy() {
    this.clearTimer()
  }
}
</script>

<style>
</style>
