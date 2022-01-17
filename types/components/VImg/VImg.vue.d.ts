declare const _default: {
    name: string;
    inheritAttrs: boolean;
    props: {
        /**
         * Same as the HTML attribute
         */
        src: {
            type: StringConstructor;
            required: boolean;
        };
        /**
         * Same as the HTML attribute
         */
        srcset: {
            type: StringConstructor;
            default: string;
        };
        /**
         * URL of the blurred placeholder image to use if you need one (ideally a very small image).
         */
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        /**
         * CSS background styles for the placeholder in case you just want colors.
         */
        background: {
            type: StringConstructor;
            default: string;
        };
        transitionDuration: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        classes: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    data: () => {
        dataUrl: string;
    };
    computed: {
        listeners(): any;
    };
    watch: {
        src: {
            handler: string;
        };
        srcset: {
            handler: string;
        };
    };
    mounted(): void;
    beforeUnmount(): void;
    /** @deprecated */
    beforeDestroy(): void;
    methods: {
        init(): void;
        handler([entry]: [any]): void;
        getDataUrl(): string;
        loadImg(): void;
        onLoad(): void;
    };
};
/**
 * Drop in replacement for the HTML `<img>` tag which supports lazy-loading. Improves load times by waiting for the image to scroll into view before actually downloading it.
 *
 Note: This component uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) which is not supported by Internet Explorer.
 */
export default _default;
