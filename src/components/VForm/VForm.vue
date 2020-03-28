<template>
  <form
    v-bind="$attrs"
    :method="$attrs.method || 'POST'"
    :class="[
      'vts-form',
      {
        'vts-form--invalid': status.invalid,
        'vts-form--dirty': status.dirty,
        'vts-form--error': status.error,
      },
    ]"
    @[event]="onEvent"
    v-on="$listeners"
  >
    <slot v-bind="{ ...status, clear }" />

    <pre>{{ inputs }}</pre>
  </form>
</template>

<script>
import { randomString } from "../../utils"
// function pluck(obj, keys) {
//   return keys.reduce((next, key) => {
//     next[key] = obj[key]
//     return next
//   }, {})
// }

// function validityStatus(input) {
//   const { validity } = input
//   return {
//     anyInvalid: !validity.valid,
//     invalid: {
//       type: validity.typeMismatch,
//       required: validity.valueMissing,
//       minLength: validity.tooShort,
//       maxLength: validity.tooLong,
//       min: validity.rangeOverflow,
//       max: validity.rangeUnderflow,
//       pattern: validity.patternMismatch,
//     },
//   }
// }

export default {
  props: {
    lazy: Boolean,
  },

  data: () => ({
    inputs: {},
  }),

  computed: {
    event() {
      return this.lazy ? "change" : "input"
    },

    status() {
      const { inputs } = this
      const dirty = !!Object.values(inputs).find(input => input.dirty)
      // const anyInvalid = !!Object.values(inputs).find(input => input.anyInvalid)
      const invalid = !!Object.values(inputs).find(input => input.invalid)
      const error = dirty && invalid

      // const returnedInputs = Object.keys(inputs).reduce((final, key) => {
      //   const input = inputs[key]
      //   final[key] = {
      //     ...input,
      //     error: input.dirty && input.anyInvalid,
      //   }
      //   return final
      // }, {})

      return {
        invalid,
        dirty,
        error,
        // ...returnedInputs,
      }
    },
  },

  mounted() {
    const els = this.$el.querySelectorAll("input, textarea, select")

    const { inputs } = this
    const newInputs = {}

    for (const input of els) {
      const name = input.name || randomString(6)
      // newInputs[name] = validityStatus(input)
      newInputs[name] = {
        invalid: !input.validity.valid,
      }
      newInputs[name].dirty = inputs[name]?.dirty ?? false
      // newInputs[name].params = {
      //   ...pluck(input, [
      //     "type",
      //     "required",
      //     "min",
      //     "max",
      //     "minLength",
      //     "maxLength",
      //     "pattern",
      //     // "multiple",
      //     // "value",
      //     // "checked",
      //   ]),
      // }

      input.addEventListener("blur", this.onBlur)
      this.$once("hook:beforeDestroy", () => {
        input.removeEventListener("blur", this.onBlur)
      })
    }
    this.inputs = newInputs
  },

  methods: {
    onEvent({ target }) {
      this.validateInput(target)
    },
    onBlur({ target }) {
      this.inputs[target.name].dirty = true
      target.removeEventListener("blur", this.onBlur)
    },

    validateInput(input) {
      const { inputs } = this
      const { name } = input
      // inputs[name] = {
      //   ...inputs[name],
      //   ...validityStatus(input),
      // }
      // Object.assign(inputs[name], validityStatus(input))
      inputs[name].invalid = !input.validity.valid
    },

    clear() {
      const els = Array.from(this.$el.querySelectorAll("input, textarea"))
      for (const input of els) {
        input.value = ""
      }
    },
  },
}
</script>
