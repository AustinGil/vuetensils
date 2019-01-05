<template>
  <div :class="classes.wrapper">
    <label
      v-if="type === 'textarea'"
      :class="classes.label"
    >
      <textarea
        :value="value"
        @input="onInput"
        v-bind="$attrs"
        v-on="listeners"
        :class="classes.input"
        placeholder=" "
        rows="3"
      ></textarea>
      <span :class="classes.text">{{ label }}</span>
      <span class="border-highlight"></span>
    </label>

    <label
      v-else-if="type === 'checkbox'"
      :class="classes.label"
    >
      <input
        :checked="value"
        @change="onCheck"
        :type="type"
        v-bind="$attrs"
        v-on="listeners"
        class="visually-hidden"
        :class="classes.input"
      >
      <span :class="classes.text">{{ label }}</span>
    </label>

    <template v-else-if="type === 'radio'">
      <div
        v-for="(option, i) in computedOptions"
        :key="i"
        v-bind="$attrs"
        class="radio-wrapper"
        :class="stacked ? 'radio-wrapper--stacked' : ''"
      >
        <label :class="classes.label">
          <input
            v-bind="option"
            :checked="option.value == value"
            @change="onInput"
            :type="type"
            v-on="listeners"
            class="visually-hidden"
            :class="classes.input"
          >
          <span :class="classes.text">{{ option.label }}</span>
        </label>
      </div>
    </template>

    <label
      v-else-if="type === 'select'"
      :class="classes.label"
    >
      <span :class="classes.text">{{ label }}</span>
      <select
        @change="onInput"
        v-bind="$attrs"
        v-on="listeners"
        :class="classes.input"
      >
        <option
          v-for="(option, i) in computedOptions"
          :key="i"
          v-bind="option"
          :selected="option.value == value"
        >{{ option.label }}</option>
      </select>
    </label>

    <label
      v-else-if="type === 'search'"
      :class="classes.label"
      :aria-label="label"
    >
      <input
        :value="value"
        @input="onInput"
        :type="type"
        v-bind="$attrs"
        v-on="listeners"
        :class="classes.input"
        :placeholder="label"
      >
    </label>

    <template v-else-if="type === 'number'">
      <label :class="classes.label">
        <input
          :value="value"
          @input="onInput"
          :type="type"
          v-bind="$attrs"
          v-on="listeners"
          :class="classes.input"
          ref="input"
        >
        <span :class="classes.text">{{ label }}</span>
      </label>
      <button
        @mousedown="stepperKeydown('down')"
        @mouseup="clearTimer"
        :class="`${classes.base}__decrement`"
        type="button"
        :disabled="value <= $attrs.min"
        aria-label="Decrement"
      >-</button>
      <button
        @mousedown="stepperKeydown('up')"
        @mouseup="clearTimer"
        :class="`${classes.base}__increment`"
        type="button"
        :disabled="value >= $attrs.max"
        aria-label="Increment"
      >+</button>
    </template>

    <label
      v-else
      :class="classes.label"
    >
      <input
        :value="value"
        @input="onInput"
        :type="type"
        v-bind="$attrs"
        v-on="listeners"
        :class="classes.input"
        placeholder=" "
      >
      <span :class="classes.text">{{ label }}</span>
      <span class="border-highlight"></span>
    </label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // TODO: should we use this?

  props: {
    value: {
      type: [String, Number, Boolean],
      default: ""
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        const allowedTypes = [
          "text",
          "password",
          "email",
          "number",
          "textarea",
          "radio",
          "checkbox",
          "search",
          "select"
        ]
        return allowedTypes.includes(value)
      }
    },
    label: String,
    options: {
      type: Array,
      default: () => []
    },
    stacked: Boolean
  },

  data: () => ({
    timeoutId: null
  }),

  created() {
    if (this.type === "radio" && !this.$attrs.name) {
      // Radios don't work properly without a name. If on is not provided, randomly generate one.
      this.$attrs.name = [...Array(6)]
        .map(i => Math.floor(36 * Math.random()).toString(36))
        .join("")
    }
  },

  computed: {
    classes() {
      const base = "mtx-input"
      const type = this.type
      return {
        base,
        wrapper: `${base} ${base}--${type}`,
        input: `${base}__input ${base}__input--${type}`,
        label: `${base}__label ${base}__label--${type}`,
        text: `${base}__text ${base}__text--${type}`
      }
    },

    listeners() {
      const { input, ...listeners } = this.$listeners
      return listeners
    },

    computedOptions() {
      return this.options.map(item => {
        // Each item should be an object with at least value and label which we can bind to later
        item = typeof item === "object" ? item : { value: item }
        item.label = item.label || item.value
        item.name = this.$attrs.name
        return item
      })
    }
  },

  methods: {
    onInput(event) {
      const el = event.target

      if (this.type === "textarea") {
        // Resize textarea to fit content
        /* istanbul ignore next */
        el.style.height = "auto"
        /* istanbul ignore next */
        el.style.height = el.scrollHeight + "px"
      }

      if (this.type === "number") {
        if (typeof this.$attrs.max !== "undefined") {
          el.value = Math.min(+this.$attrs.max, +el.value)
        }

        if (typeof this.$attrs.min !== "undefined") {
          el.value = Math.max(+this.$attrs.min, +el.value)
        }
        // console.log(el.value, this.$attrs)

        el.value = el.value || 0
      }

      this.$emit("input", el.value)
    },

    onCheck(event) {
      this.$emit("input", event.target.checked)
    },

    onStep(dir) {
      let step = +this.$attrs.step || 1
      step *= dir === "up" ? 1 : -1
      const value = +this.value + step

      const pseudoEvent = {
        target: {
          value
        }
      }
      this.onInput(pseudoEvent)
    },

    rapidStep(dir) {
      this.onStep(dir)
      this.timeoutId = setTimeout(() => {
        this.rapidStep(dir)
      }, 30)
    },

    stepperKeydown(dir) {
      this.onStep(dir)
      this.timeoutId = setTimeout(() => {
        this.rapidStep(dir)
      }, 400)
    },

    clearTimer() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }
    }
  },

  beforeDestroy() {
    this.clearTimer()
  }
}
</script>

<style lang="scss">
.mtx-input {
  option {
    background-color: var(--brand_darker);
  }

  &--text,
  &--password,
  &--email,
  &--textarea,
  &--number {
    position: relative;
    padding-top: 1.5em;
  }

  &--number {
    display: flex;
  }

  &__label {
    flex-grow: 1;
  }

  &__input {
    transition: background 0.3s ease;

    &:hover,
    &:focus {
      background-color: rgba(0, 0, 0, 0.2);
    }

    &--text,
    &--password,
    &--email,
    &--number,
    &--textarea {
      display: block; // for animated border to line up properly
      padding-left: 0;
      padding-right: 0;
    }

    &--select {
      background-color: var(--brand_darker);
    }

    &--search {
      border: 1px solid $blue;
      border-radius: rem(5px);
      padding-right: rem(24px);
      padding-left: rem(8px);
      // use color variable, then string-replace '#' with '%23' for browser support
      background-image: url(str-replace(
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#{$blue}" d="M12.9 14.32c-1.34 1.049-3.050 1.682-4.908 1.682-4.418 0-8-3.582-8-8s3.582-8 8-8c4.418 0 8 3.582 8 8 0 1.858-0.633 3.567-1.695 4.925l0.013-0.018 5.35 5.33-1.42 1.42-5.33-5.34zM8 14c3.314 0 6-2.686 6-6s-2.686-6-6-6v0c-3.314 0-6 2.686-6 6s2.686 6 6 6v0z"></path></svg>',
        "#",
        "%23"
      ));
      background-size: 1em;
      background-repeat: no-repeat;
      background-position: right 0.5em center;
    }

    &--select:focus,
    &--search:focus {
      outline: 2px solid var(--highlight);
    }

    &--textarea {
      overflow: hidden;
      resize: none;
    }

    &--number {
      border: 1px solid;
      text-align: center;
    }
  }

  &__text {
    &--text,
    &--password,
    &--email,
    &--textarea,
    &--number {
      position: absolute;
      top: 0.5em;
      left: 0;
      transform-origin: 0 0;
      transform: translateY(0) scale(0.75);
      transition: all 0.2s ease;
    }

    &--text,
    &--password,
    &--email,
    &--textarea {
      input:placeholder-shown + &,
      textarea:placeholder-shown + & {
        transform: translateY(1.25em) scale(1);
      }

      input:not(:placeholder-shown) + &,
      textarea:not(:placeholder-shown) + & {
        transform: translateY(0) scale(0.75);
      }
    }

    &--checkbox,
    &--radio {
      display: inline-flex;
      align-items: center;

      &:before {
        content: "";
        width: 0.75em;
        height: 0.75em;
        margin-right: 0.5em;
        border: 1px solid;
      }

      input:checked + &:before {
        background-color: $blue;
        box-shadow: inset 0 0 1px 1px var(--brand_dark);
      }

      input:focus + &:before {
        @include focus;
      }
    }

    &--radio:before {
      border-radius: 50%;
    }
  }

  .border-highlight {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: 0 0;
    width: 100%;
    border: 1px solid $blue;
    transition: all 0.3s ease;
  }

  &__input--text:focus,
  &__input--password:focus,
  &__input--email:focus,
  &__input--textarea:focus {
    outline: none;

    + .mtx-input__text {
      transform: translateY(0) scale(0.75);
      color: $blue;
    }

    ~ .border-highlight {
      transform: scaleX(1);
    }
  }

  .radio-wrapper {
    display: inline;
    margin-right: 1rem;

    &--stacked {
      display: block;
      margin-right: 0;
    }
  }

  &__increment,
  &__decrement {
    width: rem(30px);
    min-width: 0;
    border: 1px solid;
    padding: 0;

    &:focus {
      outline: none;
      color: var(--highlight);
    }

    &:hover {
      color: #fff;
    }
  }

  &__decrement {
    order: -1;
    border-radius: rem(6px 0 0 6px);
  }

  &__increment {
    border-left: 1px solid;
    border-radius: rem(0 6px 6px 0);
  }

  input:disabled,
  button:disabled,
  select:disabled,
  input:disabled + span {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
