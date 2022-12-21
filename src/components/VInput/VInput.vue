<template>
  <div
    :class="[
      'vts-input',
      `vts-input--${type}`,
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
      v-if="'radio' === type || ('checkbox' === type && computedOptions.length)"
      :class="['vts-input__fieldset', classes.fieldset]"
    >
      <legend v-if="label" :class="['vts-input__legend', classes.legend]">
        {{ label }}
      </legend>

      <div :class="['vts-input__fieldset-items', classes.fieldsetItems]">
        <div
          v-for="(option, index) in computedOptions"
          :key="option.value"
          :class="['vts-input__fieldset-item', classes.fieldsetItem]"
        >
          <input
            v-bind="{ ...bind, ...option }"
            :id="`${id}__input-${index}`"
            ref="input"
            :type="type"
            @input="onFieldsetInput"
            @blur.once="dirty = true"
            v-on="listeners"
          />
          <label
            :for="`${id}__input-${index}`"
            :class="['vts-input__label', classes.label]"
          >
            {{ option.label }}
          </label>
        </div>
      </div>
    </fieldset>

    <template v-else-if="'checkbox' === type">
      <input
        ref="input"
        :checked="localValue === undefined ? $attrs.checked : localValue"
        type="checkbox"
        v-bind="bind"
        @change="localValue = $event.target.checked"
        @blur.once="dirty = true"
        v-on="listeners"
      />
      <label :for="`${id}__input`" :class="['vts-input__label', classes.label]">
        {{ label }}
      </label>
    </template>

    <template v-else>
      <label :for="`${id}__input`" :class="['vts-input__label', classes.label]">
        {{ label }}
      </label>

      <select
        v-if="'select' === type"
        ref="input"
        v-model="localValue"
        v-bind="bind"
        @input="onSelect"
        @change="onSelect"
        @blur.once="dirty = true"
        v-on="listeners"
      >
        <slot name="options">
          <option
            v-for="option in computedOptions"
            :key="option.value"
            v-bind="option"
            :label="null"
          >
            {{ option.label }}
          </option>
        </slot>
      </select>

      <textarea
        v-else-if="'textarea' === type"
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
        :type="type"
        v-bind="bind"
        @blur.once="dirty = true"
        v-on="listeners"
      />
    </template>

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
import { randomString, isType } from '../../utils.js';

/**
 * TODO:
 * Provide prop for error,invalid classes on input
 * Remove span from labels (breaking)
 * Use validationMessage @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage
 */

const valuePropDef = {
  type: [String, Number, Boolean, Array],
  default: undefined,
};
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
    event: 'update:modelValue',
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

    type: {
      type: String,
      default: 'text',
    },

    /**
     * An array of options used for inputs of type `radio` or type `select`
     */
    options: {
      type: [Array, Object],
      default: () => [],
    },

    errors: {
      type: Object,
      default: () => ({}),
    },

    /**
     * @type {import('vue').PropOptions<{
     * root: string,
     * fieldset: string,
     * fieldsetItem: string,
     * legend: string,
     * label: string,
     * input: string,
     * description: string,
     * errors: string,
     * error: string
     * }>}
     */
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
      const { id, name, valid, dirty, error, errorMessages, classes, $attrs } =
        this;
      // eslint-disable-next-line no-unused-vars
      const { class: _, ...attrs } = $attrs;

      const describedby = [];
      if (error) describedby.push(`${id}__description`);
      if (errorMessages.length) describedby.push(`${id}__errors`);

      const bindings = {
        'aria-invalid': !valid,
        'aria-describedby':
          dirty && describedby.length ? describedby.join(' ') : null,
        ...attrs,
        id: `${id}__input`,
        name: name,
        class: ['vts-input__input', classes.input],
      };

      return bindings;
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
      const { $attrs, localValue, type } = this;
      let options = this.options;
      if (isType(options, 'object')) {
        options = Object.entries(options).map(([key, value]) => ({
          value: key,
          label: value,
        }));
      }
      return options.map((item) => {
        // Each item should be an object with at least value and label which we can bind to later
        item = isType(item, 'object') ? item : { value: item };
        Object.assign(item, $attrs, {
          label: item.label || item.value,
          value: item.value,
        });

        if (localValue !== undefined) {
          if ('checkbox' === type) {
            item.checked = localValue.includes(item.value) || item.checked;
          } else {
            item.checked = item.value === localValue || item.checked;
          }
        }

        return item;
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

        const errorMessage = isType(errorHandlerOrMessage, 'function')
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
      this.$emit('update:modelValue', value);
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
    onSelect(event) {
      const select = event.target;
      if (this.isMultiple) {
        const values = [];
        for (const option of select.selectedOptions) {
          values.push(option.value);
        }
        this.localValue = [...(values || [])];
      } else {
        this.localValue = select.value;
      }
    },
    onFieldsetInput(event) {
      const input = event.target;
      const value = input.value;
      if (input.type === 'radio') {
        this.localValue = value;
        return;
      }

      const newValue = [...(this.localValue || [])];
      const index = newValue.indexOf(value);

      if (index === -1) {
        newValue.push(value);
      } else {
        newValue.splice(index, 1);
      }

      this.localValue = newValue;
    },
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

export const notEmpty = `.*\\S.*`;
export const email = `/^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/`;
// export const email = `/^[a-zA-Z0-9.!#$%&'*+\\/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/`;
</script>
