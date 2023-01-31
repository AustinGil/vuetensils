declare const _default: {
    name: string;
    inheritAttrs: boolean;
    props: {
        action: {
            type: StringConstructor;
            default: string;
        };
        data: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    emits: string[];
    computed: {
        tag(): "a" | "button" | "RouterLink";
        type(): any;
        listeners(): any;
    };
};
export default _default;
