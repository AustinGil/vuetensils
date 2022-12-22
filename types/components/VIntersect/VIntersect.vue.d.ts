/**
 * Uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to fire events when content enters or exits the screen.
 */
declare const _default: {
    name: string;
    props: {
        /**
         * The IntersectionObserver threshold value.
         */
        threshold: {
            type: (NumberConstructor | ArrayConstructor)[];
            default: () => any;
        };
        /**
         * The IntersectionObserver root value.
         */
        root: {
            type: StringConstructor;
            default: any;
        };
        /**
         * The IntersectionObserver rootMargin value.
         */
        rootMargin: {
            type: StringConstructor;
            default: any;
        };
        options: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    emits: string[];
    data: () => {
        entry: {};
    };
    mounted(): void;
    beforeUnmount(): void;
    /** @deprecated */
    beforeDestroy(): void;
    methods: {
        handler([entry]: [any]): void;
    };
    render(): any;
};
export default _default;
