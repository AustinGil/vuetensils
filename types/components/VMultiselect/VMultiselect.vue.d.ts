/** test
 * https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role
 * https://reacttraining.com/reach-ui/listbox/
 * https://w3c.github.io/aria-practices/examples/listbox/listbox-rearrangeable.html
 * https://www.digitala11y.com/listbox-role/
 * https://github.com/primefaces/primevue/blob/master/src/components/autocomplete/AutoComplete.vue
 */
declare const _default: {
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
         * The input value. Works for all inputs except type `radio`. See `options` prop.
         */
        value: {
            type: (StringConstructor | BooleanConstructor | NumberConstructor | ArrayConstructor)[];
            default: string;
        };
        /**
         * An array of options used for inputs of type `radio` or type `select`
         */
        options: {
            type: ArrayConstructor;
            default: () => any[];
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
        tag(): "input" | "select" | "textarea";
        computedOptions(): any;
        isMultiple(): boolean;
        error(): any;
    };
    watch: {
        value(next: any): void;
        localValue: {
            handler: string;
        };
    };
    created(): void;
    mounted(): void;
    methods: {
        onInput({ target }: {
            target: any;
        }): void;
        validate(): void;
    };
};
/**
 * Input component that automatically includes labels, validation, and aria descriptions for any errors.
 */
export default _default;
