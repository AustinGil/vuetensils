declare function updateLocalValue(value: any, previousValue: any): void;
/**
 * Input component that automatically includes labels, validation, and aria descriptions for any errors.
 */
declare const _default: {
    name: string;
    inheritAttrs: boolean;
    model: {
        event: string;
    };
    props: {
        /**
         * Every input should have a label with the exception of `radio` which supports labels for the `options` prop.
         */
        label: {
            type: StringConstructor;
            required: boolean;
        };
        /**
         * Every input should have a label with the exception of `radio` which supports labels for the `options` prop.
         */
        name: {
            type: StringConstructor;
            required: boolean;
        };
        /**
         * The input value. Works for all inputs except type `radio`. See `options` prop.
         */
        value: {
            type: (StringConstructor | BooleanConstructor | NumberConstructor | ArrayConstructor)[];
            default: any;
        };
        modelValue: {
            type: (StringConstructor | BooleanConstructor | NumberConstructor | ArrayConstructor)[];
            default: any;
        };
        type: {
            type: StringConstructor;
            default: string;
        };
        /**
         * An array of options used for inputs of type `radio` or type `select`
         */
        options: {
            type: (ObjectConstructor | ArrayConstructor)[];
            default: () => any[];
        };
        errors: {
            type: ObjectConstructor;
            default: () => {};
        };
        /**
         * @type {import('vue').Prop<{
         * root: string,
         * fieldset: string,
         * fieldsetItems: string,
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
            type: ObjectConstructor;
            default: () => {};
        };
    };
    data(): {
        localValue: any;
        valid: boolean;
        anyInvalid: boolean;
        dirty: boolean;
        invalid: {};
    };
    computed: {
        /** @returns {any} */
        bind(): any;
        listeners(): any;
        slots(): any;
        computedOptions(): any;
        /** @returns {boolean} */
        isMultiple(): boolean;
        /** @returns {boolean} */
        error(): any;
        errorMessages(): any[];
    };
    watch: {
        modelValue: typeof updateLocalValue;
        value: typeof updateLocalValue;
        localValue(value: any): void;
    };
    created(): void;
    mounted(): void;
    methods: {
        onSelect(event: any): void;
        onFieldsetInput(event: any): void;
        validate(): void;
    };
};
export default _default;
export declare const notEmpty = ".*\\S.*";
export declare const email = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/";
