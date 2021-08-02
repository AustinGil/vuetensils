<template>
  <form
    :method="$attrs.method || 'POST'"
    :class="[
      'vts-form',
      {
        'vts-form--invalid': !valid,
        'vts-form--dirty': dirty,
        'vts-form--error': error,
      },
    ]"
    @[event]="validate"
    @submit="onSubmit"
    @blur.capture.once="dirty = true"
    v-on="listeners"
  >
    <input
      v-if="honeypot"
      :name="typeof honeypot === 'string' ? honeypot : 'vts-honeypot'"
      class="visually-hidden"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
    />

    <slot v-bind="{ valid, dirty, error, inputs, clear, validate }" />
  </form>
</template>

<script>
import { version } from 'vue';

const isVue3 = version && version.startsWith('3');

export default {
  name: 'VForm',
  props: {
    lazy: Boolean,
    errors: {
      type: Object,
      default: () => ({}),
    },
    honeypot: {
      type: [Boolean, String],
      default: false,
    },
  },

  data: () => ({
    dirty: false,
    localInputs: {},
  }),

  computed: {
    listeners() {
      if (isVue3) {
        return this.$attrs;
      }
      return this.$listeners;
    },
    /** @return {string} */
    event() {
      return this.lazy ? 'change' : 'input';
    },
    /** @return {boolean} */
    valid() {
      return !Object.values(this.localInputs).find(input => !input.valid);
    },
    /** @return {boolean} */
    error() {
      return !this.valid && this.dirty;
    },
    /** @return {object} */
    inputs() {
      const inputs = {};
      const { localInputs, errors } = this;

      for (const key in localInputs) {
        const input = {
          ...localInputs[key],
          error: localInputs[key].dirty && !localInputs[key].valid,
          errors: [],
        };

        const errorsMap = new Map(Object.entries(errors || {}));

        errorsMap.forEach((value, key) => {
          if (!input.invalid[key]) return;

          const errorHandler = errorsMap.get(key);
          // console.log(errorHandler);
          const attrName = key.replace('length', 'Length'); // for minLength and maxLength

          const errorMessage =
            typeof errorHandler === 'string'
              ? errorHandler
              : errorHandler(input._inputEl[attrName]);

          input.errors.push(errorMessage);
        });

        inputs[key] = input;
      }

      return inputs;
    },
  },

  mounted() {
    this.validate();
    const observer = new MutationObserver(this.validate);
    observer.observe(this.$el, {
      childList: true,
      subtree: true,
    });
    this.observer = observer;
  },
  /** @deprecated */
  beforeDestroy() {
    this.observer.disconnect();
  },
  beforeUnmount() {
    this.observer.disconnect();
  },

  methods: {
    validate() {
      /** @type {NodeListOf<HTMLInputElement>} */
      const els = this.$el.querySelectorAll('input, textarea, select');

      const localInputs = {};

      els.forEach(input => {
        const { name, id, validity } = input;
        if (!name && !id) return;

        localInputs[name || id] = {
          _inputEl: input,
          value: input.value,
          valid: validity.valid,
          dirty: false,
          invalid: {
            type: validity.typeMismatch,
            required: validity.valueMissing,
            minlength: validity.tooShort,
            maxlength: validity.tooLong,
            min: validity.rangeOverflow,
            max: validity.rangeUnderflow,
            pattern: validity.patternMismatch,
          },
        };
      });
      this.localInputs = localInputs;
    },
    onBlur({ target }) {
      this.dirty = true;
      this.localInputs[target.name].dirty = true;
    },

    clear() {
      /** @type {HTMLInputElement[]} */
      const els = Array.from(
        this.$el.querySelectorAll('input, textarea, select')
      );
      els.forEach(input => {
        if (['radio', 'checkbox'].includes(input.type)) {
          input.checked = false;
        } else {
          input.value = '';
        }
      });
    },

    onSubmit(event) {
      if (!event.target.checkValidity()) {
        this.$emit('invalid', event);
        return;
      }
      this.$emit('valid', event);
    },
  },
};
</script>

<style>
.vts-visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
}
</style>
