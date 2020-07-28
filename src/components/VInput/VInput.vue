<template>
  <div
    :class="[
      'vts-input',
      `vts-input--${$attrs.type || 'text'}`,
      {
        'vts-input--required': $attrs.hasOwnProperty('required'),
        'vts-input--invalid': !valid,
        'vts-input--dirty': dirty,
        'vts-input--error': error,
      },
      classes.root,
    ]"
  >
    <fieldset
      v-if="'radio' === $attrs.type"
      :class="['vts-input__fieldset', classes.fieldset]"
    >
      <legend v-if="label" :class="['vts-input__legend', classes.text]">
        {{ label }}
      </legend>
      <label
        v-for="(option, index) in computedOptions"
        :key="option.value"
        :for="`${id}__input-${index}`"
        :class="['vts-input__label', classes.label]"
      >
        <input
          :id="`${id}__input-${index}`"
          ref="input"
          v-bind="{ ...bind, ...option }"
          @input="localValue = option.value"
          @blur.once="dirty = true"
          v-on="$listeners"
        />
        <span :class="['vts-input__text', classes.text]">
          {{ option.label }}
        </span>
      </label>
    </fieldset>

    <label
      v-else-if="'checkbox' === $attrs.type"
      :for="`${id}__input`"
      :class="['vts-input__label', classes.label]"
    >
      <input
        ref="input"
        :checked="localValue === undefined ? $attrs.checked : localValue"
        v-bind="bind"
        @change="localValue = $event.target.checked"
        @blur.once.once="dirty = true"
        v-on="$listeners"
      />
      <span :class="['vts-input__text', classes.text]">
        {{ label }}
      </span>
    </label>

    <label
      v-else
      :for="`${id}__input`"
      :class="['vts-input__label', classes.label]"
    >
      <span :class="['vts-input__text', classes.text]">
        {{ label }}
      </span>

      <select
        v-if="'select' === $attrs.type"
        ref="input"
        v-model="localValue"
        v-bind="bind"
        @blur.once="dirty = true"
        v-on="$listeners"
      >
        <option v-for="(option, i) in computedOptions" :key="i" v-bind="option">
          {{ option.label }}
        </option>
      </select>

      <textarea
        v-else-if="'textarea' === $attrs.type"
        ref="input"
        v-model="localValue"
        v-bind="bind"
        @blur.once="dirty = true"
        v-on="$listeners"
      />

      <input
        v-else
        ref="input"
        v-model="localValue"
        v-bind="bind"
        @blur.once="dirty = true"
        v-on="$listeners"
      />
    </label>

    <div
      v-if="$scopedSlots.description"
      :id="`${id}__description`"
      :class="['vts-input__description', classes.description]"
      role="alert"
    >
      <!-- TODO: Test aria live region updates -->
      <!-- @slot Scoped slot for the input description. Provides the validation state. -->
      <slot
        name="description"
        v-bind="{ valid, dirty, error, invalid, anyInvalid }"
      />
    </div>
  </div>
</template>

<script>
import { randomString } from '../../utils';

/**
 * Input component that automatically includes labels, validation, and aria descriptions for any errors.
 */
export default {
  name: 'VInput',
  inheritAttrs: false,

  model: {
    event: 'update',
  },

  props: {
    /**
     * Every input should have a label with the exception of `radio` which supports labels for the `options` prop.
     */
    label: {
      type: String,
      required: true,
    },

    /**
     * The input value. Works for all inputs except type `radio`. See `options` prop.
     */
    value: {
      type: [String, Number, Boolean, Array],
      default: undefined,
    },

    /**
     * An array of options used for inputs of type `radio` or type `select`
     */
    options: {
      type: Array,
      default: () => [],
    },

    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      localValue: this.value, // Required for weird bug when nested in VForm
      valid: true,
      anyInvalid: false, // TODO: deprecate
      dirty: false,
      invalid: {},
    };
  },

  computed: {
    bind() {
      const { id, valid, error, classes, $attrs } = this;
      const attrs = {
        'aria-invalid': !valid,
        'aria-describedby': error && `${id}__description`,
        ...$attrs,
        id: `${id}__input`,
        class: ['vts-input__input', classes.input],
      };

      return attrs;
    },

    computedOptions() {
      const { id, $attrs, localValue } = this;
      return this.options.map((item) => {
        // Each item should be an object with at least value and label which we can bind to later
        item = typeof item === 'object' ? item : { value: item };
        return Object.assign(item, $attrs, {
          label: item.label || item.value,
          name: item.name || id,
          value: item.value,
          checked:
            localValue !== undefined ? item.value === localValue : item.checked,
        });
      });
    },

    isMultiple() {
      const { multiple } = this.$attrs;
      return multiple != null && multiple != 'false';
    },

    error() {
      return !this.valid && this.dirty;
    },
  },

  watch: {
    value(value, previousValue) {
      if (value === previousValue) return;
      this.localValue = value;
    },
    localValue(value) {
      /**
       * @event update
       * @type { any }
       */
      this.$emit('update', value);
      this.validate();
    },
  },

  created() {
    // Might cause an issue with SSR
    const { id, name } = this.$attrs;
    this.id = id || 'vts-' + randomString(4);
    this.name = name || this.id;
  },

  mounted() {
    this.validate();
  },

  methods: {
    validate() {
      let input = this.$refs.input;

      if (Array.isArray(input)) {
        input = input[0];
      }

      const { validity } = input;

      // https://logaretm.com/blog/2019-05-03-html-aided-vuejs-form-validation/

      this.anyInvalid = !validity.valid; // TODO: deprecate
      this.valid = validity.valid;
      this.invalid = {
        type: validity.typeMismatch,
        required: validity.valueMissing,
        minlength: validity.tooShort,
        maxlength: validity.tooLong,
        min: validity.rangeOverflow,
        max: validity.rangeUnderflow,
        pattern: validity.patternMismatch,
      };
    },
  },
};
</script>
