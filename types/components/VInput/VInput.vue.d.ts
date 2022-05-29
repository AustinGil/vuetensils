declare function updateLocalValue(value: any, previousValue: any): void;
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
        onFieldsetInput(event: any): void;
        validate(): void;
    };
};
/**
 * Input component that automatically includes labels, validation, and aria descriptions for any errors.
 */
export default _default;
