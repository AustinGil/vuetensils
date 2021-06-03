import { reactive, watch, computed, nextTick } from '@vue/composition-api';

/**
 * @typedef {import('@vue/composition-api').Ref<HTMLFormElement>} FormRef
 * @typedef {import('@vue/composition-api').ComputedRef} ComputedRef
 * @typedef {string | ((string) => string)} ErrorMessage
 * @typedef {{
 * value: string
 * valid: boolean
 * dirty: boolean
 * invalid: {
 *    type: boolean
 *    required: boolean
 *    minlength: boolean
 *    maxlength: boolean
 *    min: boolean
 *    max: boolean
 *    pattern: boolean
 * }
 * errors: any[]
 * }} FormInputState
 */

/**
 * @param {FormRef} formRef
 * @param {{
 * errors?:  {
 *   type?: ErrorMessage
 *   required?: ErrorMessage
 *   minlength?: ErrorMessage
 *   maxlength?: ErrorMessage
 *   min?: ErrorMessage
 *   max?: ErrorMessage
 *   pattern?: ErrorMessage
 * }
 * }} options
 */
const useForm = (formRef, options = {}) => {
  const baseState = {
    invalid: false,
    dirty: false,
    /** @type {boolean | ComputedRef} */
    error: false,
    /** @type {Record<string, FormInputState>} */
    inputs: {},
  };

  /**
   * @typedef {object} FormMethods
   * @property {Function} clear Assigns all form input values to empty strings
   * @property {Function} validate
   * @property {Function} reset Resets form dirty state and calls validate()
   */

  /**
   * @type {typeof baseState & Partial<FormMethods>}
   */
  const state = reactive(baseState);

  const errors = new Map(Object.entries(options.errors || {}));

  const validate = async form => {
    if (!form) return;

    await nextTick();

    state.invalid = !form.checkValidity();

    /** @type {HTMLInputElement[]} */
    const els = form.querySelectorAll('input, textarea, select');
    /** @type {typeof baseState.inputs} */
    const inputs = {};

    els.forEach(input => {
      const { name, id, validity } = input;
      const inputId = name || id;

      if (!inputId) return;

      const inputStatus = {
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
        errors: [],
      };

      errors.forEach((value, key) => {
        if (!inputStatus.invalid[key]) return;

        const errorHandler = errors.get(key);
        const attrName = key.replace('length', 'Length'); // for minLength and maxLength

        const errorMessage =
          typeof errorHandler === 'string'
            ? errorHandler
            : errorHandler(input[attrName]);

        inputStatus.errors.push(errorMessage);
      });

      // Weird reactivity issue means we have to handle dirty state this way
      inputStatus.dirty = state.inputs[inputId]
        ? state.inputs[inputId].dirty
        : false;

      inputs[inputId] = inputStatus;
    });
    state.inputs = inputs;
  };

  const onInput = () => validate(formRef.value);
  const onBlur = event => {
    validate(formRef.value);
    const input = event.target;
    const inputId = input.name || input.id;

    state.dirty = true;

    if (!inputId) return;
    if (!state.inputs[inputId]) return;

    state.inputs[inputId].dirty = true;
  };
  const observer = new MutationObserver(onInput);

  watch(formRef, async (form, prev, onInvalidate) => {
    if (!form) return;
    await nextTick();

    validate(form);

    form.addEventListener('input', onInput);
    form.addEventListener('blur', onBlur, {
      capture: true,
    });

    observer.observe(form, {
      childList: true,
      subtree: true,
      // attributes: true, // TODO: hy does this cause infinite loop?
    });

    onInvalidate(() => {
      form.removeEventListener('input', onInput);
      form.removeEventListener('blur', onBlur);
      observer.disconnect();
    });
  });

  state.error = computed(() => state.invalid && state.dirty);
  state.validate = () => validate(formRef.value);
  state.reset = () => {
    state.dirty = false;
    validate(formRef.value);
  };
  state.clear = () => {
    const form = formRef.value;
    /** @type {NodeListOf<HTMLInputElement>} */
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.value = '';
    });
  };

  return state;
};

export default useForm;
