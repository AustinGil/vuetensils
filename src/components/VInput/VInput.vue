<template>
  <div class="vts-input" :class="{ 'vts-input--invalid': invalid.anyInvalid }">
    <template v-if="$attrs.type === 'radio'">
      <label v-for="option in computedOptions" :key="option.value">
        <input
          ref="input"
          :checked="option.value"
          :type="$attrs.type"
          :name="option.name"
          @input="$emit('update', option.value)"
          v-on="$listeners"
          :aria-describedby="invalid.anyInvalid && `${id}__description`"
        />
        <span class="vts-input__text">{{ option.label }}</span>
      </label>
    </template>

    <label v-else>
      <span v-if="$attrs.type !== 'checkbox'" class="vts-input__text">{{ label }}</span>
      <component
        ref="input"
        :is="tag"
        :value.prop="value"
        :id="`${id}__input`"
        v-bind="$attrs"
        @input="onInput"
        v-on="$listeners"
        :aria-describedby="invalid.anyInvalid && `${id}__description`"
      >
        <template v-if="tag === 'textarea'">
          {{ value }}
        </template>
        <option
          v-for="(option, i) in computedOptions"
          :key="i"
          v-bind="option"
          :selected="option.value == value"
        >
          {{ option.label }}
        </option>
      </component>
      <span v-if="$attrs.type === 'checkbox'" class="vts-input__text">{{ label }}</span>
    </label>

    <div
      v-if="$scopedSlots.description"
      :id="`${id}__description`"
      class="vts-input__description"
      role="alert"
    >
      <slot name="description" v-bind="invalid" />
    </div>
  </div>
</template>

<script>
import { randomString } from "../../utils"

function invalidState({ validity }) {
  return {
    anyInvalid: !validity.valid,
    required: validity.valueMissing,
    minLength: validity.tooShort,
    maxLength: validity.tooLong,
    min: validity.rangeOverflow,
    max: validity.rangeUnderflow,
    type: validity.typeMismatch,
    pattern: validity.patternMismatch
  }
}

export default {
  inheritAttrs: false,

  model: {
    event: "update"
  },

  props: {
    label: {
      type: String,
      required: true
    },

    value: {
      type: [String, Number, Boolean],
      default: ""
    },

    options: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    invalid: {
      anyInvalid: false
    }
  }),

  computed: {
    tag() {
      const type = this.$attrs.type || "text"
      if (type === "textarea") {
        return "textarea"
      }
      if (type === "select") {
        return "select"
      }
      return "input"
    },

    id() {
      return this.$attrs.id || "vts-" + randomString(6)
    },

    computedOptions() {
      return this.options.map(item => {
        // Each item should be an object with at least value and label which we can bind to later
        item = typeof item === "object" ? item : { value: item }
        Object.assign(item, this.$attrs)
        item.label = item.label || item.value
        item.name = item.name || this.id
        item.required = true
        return item
      })
    }
  },

  watch: {
    value: {
      handler: "validate"
    }
  },

  mounted() {
    this.validate()
  },

  methods: {
    onInput({ target }) {
      const value = this.$attrs.type === "checkbox" ? target.checked : target.value
      this.$emit("update", value)
    },

    validate() {
      const input = this.$refs.input
      if (Array.isArray(input)) return

      this.invalid = invalidState(input)
    }
  }
}
</script>
