/**
 * A modal/dialogue component for showing users content which overlays the rest of the applications. When opened, it traps the user's focus so that keyboard navigation will remain within the modal until it is closed. It supports being closed by clicking outside the modal content or pressing the ESC key.
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
        /**
         * HTML component for the modal content.
         */
        tag: {
            type: StringConstructor;
            default: string;
        };
        /**
         * Flag to enable/prevent the modal from being closed.
         */
        dismissible: {
            type: BooleanConstructor;
            default: boolean;
        };
        /**
         * CSS width to set the modal to.
         */
        width: {
            type: StringConstructor;
            default: any;
        };
        /**
         * CSS max-width to set the modal to.
         */
        maxWidth: {
            type: StringConstructor;
            default: any;
        };
        /**
         * Prevents the page from being scrolled while the modal is open.
         */
        noScroll: BooleanConstructor;
        /**
         * Transition name to apply to the modal.
         */
        transition: {
            type: StringConstructor;
            default: any;
        };
        /**
         * Transition name to apply to the background.
         */
        bgTransition: {
            type: StringConstructor;
            default: any;
        };
        classes: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    watch: {
        showing: {
            handler(next: any, prev: any): void;
        };
    };
    mounted(): void;
    methods: {
        show(): void;
        hide(): void;
        toggle(): void;
        onClick(event: any): void;
        onKeydown(event: any): void;
    };
};
export default _default;
