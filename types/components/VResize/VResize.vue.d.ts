declare const _default: {
    name: string;
    props: {
        tag: {
            type: StringConstructor;
            default: string;
        };
    };
    data: () => {
        observer: any;
        width: any;
        height: any;
    };
    mounted(): void;
    beforeUnmount(): void;
    /** @deprecated */
    beforeDestroy(): void;
    methods: {
        updateDimensions(): void;
    };
};
export default _default;
