declare const _default: {
    name: string;
    props: {
        tag: {
            type: StringConstructor;
            default: string;
        };
        id: {
            type: StringConstructor;
            default: () => string;
        };
        focus: BooleanConstructor;
        classes: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    data: () => {
        show: boolean;
    };
    methods: {
        onMouseenter(): void;
        onMouseleave(): void;
    };
};
export default _default;
