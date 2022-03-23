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
      $attrs.class,
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
    </label>

    <div
      v-if="slots.description"
      :id="`${id}__description`"
      :class="['vts-input__description', classes.description]"
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
    <div
      v-if="dirty && errorMessages.length"
      :id="`${id}__errors`"
      :class="['vts-input__errors', classes.errors]"
    >
      <span
        v-for="error of errorMessages"
        :key="error"
        :class="['vts-input__error', classes.error]"
      >
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script>
import { isVue3 } from 'vue-demi';
import { randomString } from '../../utils.js';

/**
 * TODO:
 * Provide prop for error,invalid classes on input
 * Remove span from labels (breaking)
 * Use validationMessage @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage
 */

const valuePropDef = {
  type: [String, Number, Boolean, Array],
  default: undefined,
}
function updateLocalValue(value, previousValue) {
  if (value === previousValue) return;
  this.localValue = value;
  // TODO: Do we want to do this to trigger event listeners?
  // inputEl.dispatchEvent(new Event('input', { bubbles: true }));
}

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
    value: valuePropDef,
    modelValue: valuePropDef,

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
      localValue: this.modelValue || this.value, // Required for weird bug when nested in VForm
      valid: true,
      anyInvalid: false, // TODO: deprecate
      dirty: false,
      invalid: {},
    };
  },

  computed: {
    /** @returns {any} */
    bind() {
      const {
        id,
        name,
        valid,
        dirty,
        error,
        errorMessages,
        classes,
        $attrs,
      } = this;

      const describedby = [];
      if (error) describedby.push(`${id}__description`);
      if (errorMessages.length) describedby.push(`${id}__errors`);

      const attrs = {
        'aria-invalid': !valid,
        'aria-describedby':
          dirty && describedby.length ? describedby.join(' ') : false,
        ...$attrs,
        id: `${id}__input`,
        name: name,
        class: ['vts-input__input', classes.input],
      };

      return attrs;
    },
    /** @returns {Record<string, string> | Record<string, Function | Function[]>} */
    listeners() {
      if (isVue3) {
        return this.$attrs;
      }
      return this.$listeners;
    },
    slots() {
      if (!isVue3) {
        return this.$scopedSlots;
      }
      return this.$slots;
    },

    computedOptions() {
      const { $attrs, localValue } = this;
      return this.options.map((item) => {
        // Each item should be an object with at least value and label which we can bind to later
        item = typeof item === 'object' ? item : { value: item };
        return Object.assign(item, $attrs, {
          label: item.label || item.value,
          value: item.value,
          checked:
            localValue !== undefined ? item.value === localValue : item.checked,
        });
      });
    },
    /** @returns {boolean} */
    isMultiple() {
      const { multiple } = this.$attrs;
      return multiple != null && multiple != 'false';
    },
    /** @returns {boolean} */
    error() {
      return !this.valid && this.dirty;
    },

    errorMessages() {
      const { invalid, errors, $attrs } = this;
      const errorMessages = [];

      Object.keys(errors || {}).forEach((key) => {
        if (!invalid[key]) return;

        const errorHandlerOrMessage = errors[key];

        const errorMessage =
          typeof errorHandlerOrMessage === 'function'
            ? errorHandlerOrMessage($attrs[key])
            : errorHandlerOrMessage;

        errorMessages.push(errorMessage);
      });

      return errorMessages;
    },
  },

  watch: {
    modelValue: updateLocalValue,
    value: updateLocalValue,
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
        min: validity.rangeUnderflow,
        max: validity.rangeOverflow,
        pattern: validity.patternMismatch,
      };
    },
  },
};
</script>
