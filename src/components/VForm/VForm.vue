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
    @keydown="checkModified"
    @change="checkModified"
    @submit="onSubmit"
    @blur.capture="onBlur"
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

    <slot v-bind="{ valid, dirty, modified, error, inputs, clear, validate }" />
  </form>
</template>

<script>
// TODO: Sync with localStorage
import { version } from 'vue';

const isVue3 = version && version.startsWith('3');
const controlTypes = new Set(['INPUT', 'SELECT', 'TEXTAREA']);

export default {
  name: 'VForm',
  props: {
    lazy: Boolean,
    errors: {
      type: Object,
      default: () => ({}),
    },
    preventNavigation: Boolean,
    // storageKey: {
    //   type: String,
    //   default: '',
    // },
    honeypot: {
      type: [Boolean, String],
      default: false,
    },
  },

  data: () => ({
    dirty: false,
    /** This may need more robust checking. @see https://www.sitepoint.com/detect-html-form-changes/ */
    modified: false,
    localInputs: {},
  }),

  computed: {
    /** @return {object} */
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

    if (this.preventNavigation) {
      window.addEventListener('beforeunload', this.preventNav);
    }

    // if (this.storageKey) {
    //   this.syncFromLocalStorage();
    // }
  },
  // @ts-ignore
  // eslint-disable-next-line
  beforeRouteLeave(to, from, next) {
    if (!this.modified) next();
    if (window.confirm('Leave without saving?')) next();
  },
  /** @deprecated */
  beforeDestroy() {
    this.observer.disconnect();
    window.removeEventListener('beforeunload', this.preventNav);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },

  methods: {
    checkModified({ target }) {
      if (!controlTypes.has(target.tagName)) return;
      this.modified = true;
    },
    validate() {
      /** @type {NodeListOf<HTMLInputElement>} */
      const els = this.$el.querySelectorAll('input, textarea, select');

      const localInputs = {};

      els.forEach(input => {
        const { name, id, validity } = input;
        const key = name || id;
        if (!key) return;

        localInputs[key] = {
          _inputEl: input,
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

        switch (input.type) {
          case 'checkbox':
            localInputs[key].value = input.checked;
            break;
          case 'radio':
            if (input.checked) {
              localInputs[key].value = input.value;
            }
            break;
          default:
            localInputs[key].value = input.value;
        }
      });
      this.localInputs = localInputs;
    },
    onEvent() {
      this.validate();
      // if (this.storageKey) {
      //   this.syncToLocalStorage();
      // }
    },
    onBlur({ target }) {
      if (!controlTypes.has(target.tagName)) return;

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

    reset() {
      this.modified = false;
      this.dirty = false;
      this.validate();
    },

    onSubmit(event) {
      if (!event.target.checkValidity()) {
        this.$emit('invalid', event);
        return;
      }
      this.reset();
      this.$emit('valid', event);
    },

    preventNav(event) {
      if (!this.modified) return;
      event.preventDefault();
      event.returnValue = '';
    },

    // syncToLocalStorage() {
    //   localStorage.setItem(this.storageKey, JSON.stringify(this.localInputs));
    // },

    // syncFromLocalStorage() {
    //   try {
    //     const parsed = JSON.parse(localStorage.getItem(this.storageKey));
    //     if (!parsed) return;

    //     const els = Array.from(
    //       this.$el.querySelectorAll('input, textarea, select')
    //     );
    //     els.forEach(input => {
    //       const key = input.name || input.id;
    //       if (!parsed[key]) return;

    //       // TODO:
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
};
</script>

<style>
.vts-visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  inline-size: 1px;
  block-size: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
}
</style>
