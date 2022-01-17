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
        /**
         * An array of options used for inputs of type `radio` or type `select`
         */
        options: {
            type: ArrayConstructor;
            default: () => any[];
        };
        errors: {
            type: ObjectConstructor;
            default: () => {};
        };
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
        /** @returns {Record<string, string> | Record<string, Function | Function[]>} */
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
        value(value: any, previousValue: any): void;
        localValue(value: any): void;
    };
    created(): void;
    mounted(): void;
    methods: {
        validate(): void;
    };
};
/**
 * TODO:
 * Provide prop for error,invalid classes on input
 * Remove span from labels (breaking)
 * Use validationMessage @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage
 */
/**
 * Input component that automatically includes labels, validation, and aria descriptions for any errors.
 */
export default _default;
