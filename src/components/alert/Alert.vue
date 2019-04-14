<template>
  <transition :name="transition">
    <div v-if="!dismissed && !!visible" role="alert" class="vts-alert">
      <slot></slot>

      <button
        v-if="dismissible"
        @click="dismiss"
        :aria-label="dismissLabel"
        class="vts-alert__dismiss"
      >
        <slot name="button">&times;</slot>
      </button>
    </div>
  </transition>
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
      type: [Boolean, Number],
      default: true
    },
    /**
     * Allows a user to dismiss this alert
     */
    dismissible: {
      type: Boolean,
      default: false
    },
    /**
     * Aria-label that screen readers will read for the dismiss button
     */
    dismissLabel: {
      type: [String, Boolean],
      default: "Dismiss this alert"
    },
    /**
     * The transition name if you want to add one
     */
    transition: {
      type: String
    }
  },

  data: () => ({
    dismissed: false,
    timerId: null
  }),

  watch: {
    visible: {
      handler(next) {
        if (!!next) {
          this.dismissed = false
        }
        if (typeof this.visible === "number") {
          this.clearTimer() // Clear timers in case this.visible watcher adds multiples
          this.countdown()
        }
      },
      immediate: true
    }
  },

  methods: {
    dismiss() {
      /**
       * Fired when a user manually dismissed an alert
       * @event dismiss
       * @type { undefined }
       */
      this.$emit("dismiss")
      this.dismissed = true
      if (typeof this.visible === "number") {
        this.$emit("change", 0)
        this.clearTimer()
      } else {
        this.$emit("change", false)
      }
    },

    countdown() {
      if (this.visible <= 0) return

      this.timerId = setTimeout(() => {
        /**
         * Fired whenever the visibility changes. Either through user interaction, or a countdown timer
         * @event change
         * @type { boolean/number }
         */
        this.$emit("change", this.visible - 1)
      }, 1000)
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
