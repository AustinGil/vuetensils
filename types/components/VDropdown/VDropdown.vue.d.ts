declare const _default: {
    name: string;
    props: {
        /**
         * The toggle button text.
         */
        text: {
            type: StringConstructor;
            default: string;
        };
        /**
         * Where the content should be placed in relation to the button.
         *
         * Options: 'bottom', 'top'
         */
        position: {
            type: StringConstructor;
            default: string;
            validator(value: any): boolean;
        };
        /**
         * The transition name.
         */
        transition: {
            type: StringConstructor;
            default: string;
        };
        classes: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    data: () => {
        isHovered: boolean;
        isFocused: boolean;
    };
    mounted(): void;
    /** @deprecated in Vue 3 */
    beforeDestroy(): void;
    beforeUnmount(): void;
    methods: {
        onClickout(e: any): void;
        onFocusout(event: any): void;
    };
};
/**
 * Adds a button that can show/hide dropdown content when it is hovered over, or clicked. When it is clicked, the content will persist until the user clicks out or focuses out. Includes relevant ARIA attributes for the hidden content.
 */
export default _default;
