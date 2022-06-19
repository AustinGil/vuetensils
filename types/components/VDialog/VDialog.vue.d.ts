/**
 * A dialog component for showing users content which overlays the rest of the applications. When opened, it traps the user's focus so that keyboard navigation will remain within the dialog until it is closed. It supports being closed by clicking outside the dialog content or pressing the ESC key.
 */
declare const _default: {
    name: string;
    inheritAttrs: boolean;
    model: {
        prop: string;
        event: string;
    };
    props: {
        modelValue: BooleanConstructor;
        /**
         * @model
         */
        showing: BooleanConstructor;
        /**
         * HTML component for the dialog content.
         */
        tag: {
            type: StringConstructor;
            default: string;
        };
        /**
         * Flag to enable/prevent the dialog from being closed.
         */
        dismissible: {
            type: BooleanConstructor;
            default: boolean;
        };
        /**
         * CSS width to set the dialog to.
         */
        width: {
            type: StringConstructor;
            default: string;
        };
        /**
         * CSS width to set the dialog to.
         */
        inlineSize: {
            type: StringConstructor;
            default: string;
        };
        /**
         * CSS max-width to set the dialog to.
         */
        maxWidth: {
            type: StringConstructor;
            default: string;
        };
        /**
         * CSS max-width to set the dialog to.
         */
        maxInlineSize: {
            type: StringConstructor;
            default: string;
        };
        /**
         * Prevents the page from being scrolled while the dialog is open.
         */
        noScroll: BooleanConstructor;
        /**
         * Transition name to apply to the dialog.
         */
        transition: {
            type: StringConstructor;
            default: string;
        };
        /**
         * Transition name to apply to the background.
         *
         * @deprecated
         */
        bgTransition: {
            type: StringConstructor;
            default: string;
        };
        /**
         * Transition name to apply to the background.
         */
        contentTransition: {
            type: StringConstructor;
            default: string;
        };
        classes: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    emits: string[];
    data(): {
        localShow: any;
        activeElement: any;
    };
    computed: {
        slots(): any;
    };
    watch: {
        showing(next: any): void;
        modelValue(next: any): void;
        localShow: {
            handler(next: any, prev: any): void;
        };
    };
    destroyed(): void;
    methods: {
        onOpen(): void;
        onClose(): void;
        onClick(event: any): void;
        onKeydown(event: any): void;
    };
};
export default _default;
