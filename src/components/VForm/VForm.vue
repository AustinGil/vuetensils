<template>
  <form
    v-bind="$attrs"
    :method="$attrs.method || 'POST'"
    :class="[
      'vts-form',
      {
        'vts-form--invalid': !valid,
        'vts-form--dirty': dirty,
        'vts-form--error': error,
      },
    ]"
    @[event]="onEvent"
    v-on="$listeners"
  >
    <slot v-bind="{ valid, dirty, error, clear }" />
  </form>
</template>

<script>
import { randomString } from "../../utils"

export default {
  props: {
    lazy: Boolean,
  },

  data: () => ({
    dirty: false,
    inputs: {},
  }),

  computed: {
    event() {
      return this.lazy ? "change" : "input"
    },

    valid() {
      return !Object.values(this.inputs).find(input => input.invalid)
    },

    error() {
      return !this.valid && this.dirty
    },
  },

  mounted() {
    const els = this.$el.querySelectorAll("input, textarea, select")

    const inputs = {}

    for (const input of els) {
      const name = input.name || randomString(6)
      inputs[name] = {
        invalid: !input.validity.valid,
      }

      input.addEventListener("blur", this.onBlur)
      this.$once("hook:beforeDestroy", () => {
        input.removeEventListener("blur", this.onBlur)
      })
    }
    this.inputs = inputs
  },

  methods: {
    onEvent({ target }) {
      this.inputs[target.name].invalid = !target.validity.valid
    },
    onBlur({ target }) {
      this.dirty = true
      target.removeEventListener("blur", this.onBlur)
    },

    clear() {
      for (const input of this.$el.querySelectorAll("input, textarea")) {
        input.value = ""
      }
    },
  },
}
</script>
