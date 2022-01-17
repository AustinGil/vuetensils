declare const _default: {
    name: string;
    model: {
        prop: string;
        event: string;
    };
    props: {
        open: BooleanConstructor;
        label: {
            type: StringConstructor;
            default: string;
        };
        disabled: BooleanConstructor;
        classes: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    data(): {
        isOpen: any;
    };
    computed: {
        listeners(): any;
    };
    watch: {
        open(next: any): void;
        isOpen(isOpen: any): void;
    };
    created(): void;
    methods: {
        /** @param {HTMLElement} el */
        collapse(el: any): void;
        /** @param {HTMLElement} el */
        expand(el: any): void;
        /** @param {HTMLElement} el */
        resetHeight(el: any): void;
    };
};
/**
 * Toggle the visibility of content. Useful for something like an FAQ page, for example. Includes ARIA attributes for expandable content and is keyboard friendly.
 */
export default _default;
