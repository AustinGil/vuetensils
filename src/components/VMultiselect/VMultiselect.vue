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
    <label
      :for="`${id}__input`"
      :class="['vts-input__label', classes.label]"
    >
      <span :class="['vts-input__text', classes.text]">
        {{ label }}
      </span>

      <select
        :id="`${id}__input`"
        ref="input"
        :name="name"
        :aria-invalid="!valid"
        :aria-describedby="error && `${id}__description`"
        :class="['vts-input__input', classes.input]"
        v-bind="$attrs"
        @blur="onInput"
        @blur.once="dirty = true"
        v-on="$listeners"
      >
        <option
          v-for="(option, i) in computedOptions"
          :key="i"
          v-bind="option"
          :selected="localValue.includes(option.value)"
        >
          {{ option.label }}
        </option>
      </select>
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
/** test
 * https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role
 * https://reacttraining.com/reach-ui/listbox/
 * https://w3c.github.io/aria-practices/examples/listbox/listbox-rearrangeable.html
 * https://www.digitala11y.com/listbox-role/
 * https://github.com/primefaces/primevue/blob/master/src/components/autocomplete/AutoComplete.vue
 */

import { randomString } from '../../utils';

/**
 * Input component that automatically includes labels, validation, and aria descriptions for any errors.
 */
export default {
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
      default: '',
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
    tag() {
      const { type } = this.$attrs;
      if (type === 'textarea') {
        return 'textarea';
      }
      if (type === 'select') {
        return 'select';
      }
      return 'input';
    },

    computedOptions() {
      return this.options.map(item => {
        // Each item should be an object with at least value and label which we can bind to later
        item = typeof item === 'object' ? item : { value: item };
        Object.assign(item, this.$attrs);
        item.label = item.label || item.value;
        item.name = item.name || this.id;
        item.required = true;
        return item;
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
    value(next) {
      this.localValue = next;
    },
    localValue: {
      handler: 'validate',
    },
  },

  created() {
    const { id, name } = this.$attrs;
    this.id = id ? id : `vts-${randomString(4)}`;
    this.name = name ? name : this.id;
  },

  mounted() {
    this.validate();
  },

  methods: {
    onInput({ target }) {
      const { type } = this.$attrs;
      const isMultiple = this.isMultiple;

      let value;

      if (type === 'checkbox') {
        value = target.checked;
      } else if (type === 'select' && isMultiple) {
        value = [];
        target.options.forEach(option => {
          // for of not supported
          if (option.selected) {
            value.push(option.value);
          }
        });
      } else {
        value = target.value;
      }

      /**
       * @event update
       * @type { any }
       */
      this.$emit('update', value);
      this.validate();
    },

    validate() {
      const input = this.$refs.input;
      if (Array.isArray(input)) return;

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
