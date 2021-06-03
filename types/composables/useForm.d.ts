export default useForm;
export type FormRef = import("@vue/composition-api").Ref<HTMLFormElement>;
export type ComputedRef = import("@vue/composition-api").ComputedRef<any>;
export type ErrorMessage = string | ((string: any) => string);
export type FormInputState = {
    value: string;
    valid: boolean;
    dirty: boolean;
    invalid: {
        type: boolean;
        required: boolean;
        minlength: boolean;
        maxlength: boolean;
        min: boolean;
        max: boolean;
        pattern: boolean;
    };
    errors: any[];
};
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
declare function useForm(formRef: FormRef, options?: {
    errors?: {
        type?: ErrorMessage;
        required?: ErrorMessage;
        minlength?: ErrorMessage;
        maxlength?: ErrorMessage;
        min?: ErrorMessage;
        max?: ErrorMessage;
        pattern?: ErrorMessage;
    };
}): {
    invalid: boolean;
    dirty: boolean;
    /** @type {boolean | ComputedRef} */
    error: boolean | ComputedRef;
    /** @type {Record<string, FormInputState>} */
    inputs: Record<string, FormInputState>;
} & Partial<{
    /**
     * Assigns all form input values to empty strings
     */
    clear: Function;
    validate: Function;
    /**
     * Resets form dirty state and calls validate()
     */
    reset: Function;
}>;
