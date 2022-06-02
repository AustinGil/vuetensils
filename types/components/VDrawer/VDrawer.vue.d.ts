/**
 * A convenient sidebar that can be toggled on or off. When opened, it traps the user's focus so that keyboard navigation will remain within the sidebar until it is closed. It also supports being closed by pressing the ESC key.
 */
declare const _default: {
    name: string;
    model: {
        prop: string;
        event: string;
    };
    props: {
        /**
         * @model
         */
        showing: BooleanConstructor;
        tag: {
            type: StringConstructor;
            default: string;
        };
        /**
         * Flag to place the drawer on the right side.
         */
        right: BooleanConstructor;
        /**
         * CSS width value.
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
         * CSS max-width value.
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
         * Disable page scrolling when drawer is open.
         */
        noScroll: BooleanConstructor;
        /**
         * Vue transition name.
         */
        transition: {
            type: StringConstructor;
            default: string;
        };
        /**
         * Vue transition name for the background.
         *
         * @deprecated
         */
        bgTransition: {
            type: StringConstructor;
            default: string;
        };
        classes: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    data(): {
        localShow: any;
        activeElement: any;
    };
    computed: {
        slots(): any;
    };
    watch: {
        showing(next: any): void;
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
