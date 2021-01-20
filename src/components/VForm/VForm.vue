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
    @[event]="onEvent"
    v-on="$listeners"
  >
    <input
      v-if="honeypot"
      :name="typeof honeypot === 'string' ? honeypot : 'vts-honeypot'"
      class="visually-hidden"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
    />

    <slot v-bind="{ valid, dirty, error, inputs, clear }" />
  </form>
</template>

<script>
import { randomString } from '../../utils';

export default {
  name: 'VForm',
  props: {
    lazy: Boolean,
    honeypot: {
      type: [Boolean, String],
      default: false,
    }
  },

  data: () => ({
    dirty: false,
    localInputs: {},
  }),

  computed: {
    event() {
      return this.lazy ? 'change' : 'input';
    },

    valid() {
      return !Object.values(this.localInputs).find(input => !input.valid);
    },

    error() {
      return !this.valid && this.dirty;
    },

    inputs() {
      const inputs = {};
      const { localInputs } = this;

      for (const key in localInputs) {
        const input = localInputs[key];
        inputs[key] = {
          ...input,
          error: input.dirty && !input.valid,
        };
      }
      return inputs;
    },
  },

  mounted() {
    const els = Array.from(this.$el.querySelectorAll('input, textarea, select'));

    const localInputs = {};

    els.forEach(input => {
      const name = input.name || randomString(6);
      const validity = input.validity;

      localInputs[name] = {
        value: input.value,
        valid: input.validity.valid,
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

      input.addEventListener('blur', this.onBlur, { once: true });
      this.$once('hook:beforeDestroy', () => {
        input.removeEventListener('blur', this.onBlur);
      });
    });
    this.localInputs = localInputs;
  },

  methods: {
    onEvent({ target }) {
      const { localInputs } = this;
      const validity = target.validity;

      localInputs[target.name] = {
        ...localInputs[target.name],
        value: target.value,
        valid: target.validity.valid,
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
      this.localInputs = localInputs;
    },
    onBlur({ target }) {
      this.dirty = true;
      this.localInputs[target.name].dirty = true;
    },

    clear() {
      const els = Array.from(
        this.$el.querySelectorAll('input, textarea, select')
      );
      els.forEach(input => {
        if(['radio', 'checkbox'].includes(input.type)) {
          input.checked = false;
        } else {
          input.value = '';
        }
      });
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
