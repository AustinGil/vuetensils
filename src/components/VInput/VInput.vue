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
          v-on="listeners"
        />
        <span :class="['vts-input__text', classes.text]">
          {{ option.label }}
        </span>

        <slot name="label" />
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
        @blur.once="dirty = true"
        v-on="listeners"
      />
      <span :class="['vts-input__text', classes.text]">
        {{ label }}
      </span>

      <slot name="label" />
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
        :value="localValue"
        v-bind="bind"
        @input="localValue = $event.target.value"
        @change="localValue = $event.target.value"
        @blur.once="dirty = true"
        v-on="listeners"
      >
        <slot name="options">
          <option
            v-for="(option, i) in computedOptions"
            :key="i"
            v-bind="option"
          >
            {{ option.label }}
          </option>
        </slot>
      </select>

      <textarea
        v-else-if="'textarea' === $attrs.type"
        ref="input"
        v-model="localValue"
        v-bind="bind"
        @blur.once="dirty = true"
        v-on="listeners"
      />

      <input
        v-else
        ref="input"
        v-model="localValue"
        v-bind="bind"
        @blur.once="dirty = true"
        v-on="listeners"
      />

      <slot name="label" />
    </label>

    <div
      v-if="slots.description"
      :id="`${id}__description`"
      :class="['vts-input__description', classes.description]"
      role="alert"
    >
      <!-- TODO: Test aria live region updates -->
      <!-- @slot Scoped slot for the input description. Provides the validation state. -->
      <slot
        name="description"
        v-bind="{
          valid,
          dirty,
          error,
          invalid,
          anyInvalid,
          errors: errorMessages,
        }"
      />
    </div>
  </div>
</template>

<script>
import { version } from 'vue';
import { randomString } from '../../utils.js';

const isVue3 = version && version.startsWith('3');

/**
 * TODO:
 * Provide prop for error,invalid classes on input
 * Remove span from labels (breaking)
 * Use validationMessage @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage
 */

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
     * Every input should have a label with the exception of `radio` which supports labels for the `options` prop.
     */
    name: {
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

    errors: {
      type: Object,
      default: () => ({}),
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
      const { id, name, valid, error, classes, $attrs } = this;
      const attrs = {
        'aria-invalid': !valid,
        'aria-describedby': error && `${id}__description`,
        ...$attrs,
        id: `${id}__input`,
        name: name,
        class: ['vts-input__input', classes.input],
      };

      return attrs;
    },
    listeners() {
      if (isVue3) {
        return this.$attrs;
      }
      return this.$listeners;
    },
    slots() {
      let slots = this.$slots;
      if (!isVue3) {
        slots = this.$scopedSlots;
      }
      return slots;
    },

    computedOptions() {
      const { id, $attrs, localValue } = this;
      return this.options.map(item => {
        // Each item should be an object with at least value and label which we can bind to later
        item = typeof item === 'object' ? item : { value: item };
        return Object.assign(item, $attrs, {
          label: item.label || item.value,
          name: $attrs.name || id,
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

    errorMessages() {
      const { invalid, errors, $attrs } = this;
      const errorMessages = [];

      const errorsMap = new Map(Object.entries(errors || {}));

      errorsMap.forEach((value, key) => {
        if (!invalid[key]) return;

        const errorHandler = errors.get(key);
        const attrName = key.replace('length', 'Length'); // for minLength and maxLength

        const errorMessage =
          typeof errorHandler === 'string'
            ? errorHandler
            : errorHandler($attrs[attrName]);

        errorMessages.push(errorMessage);
      });

      return errorMessages;
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
    this.id = this.$attrs.id || 'vts-' + randomString(4);
  },

  mounted() {
    this.validate();
  },

  methods: {
    validate() {
      let input = this.$refs.input;

      if (Array.isArray(input)) {
        if (!input.length) return;
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
