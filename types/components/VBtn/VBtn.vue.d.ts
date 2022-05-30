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
    computed: {
        /** @returns {'RouterLink' | 'a' | 'button'} */
        tag(): "a" | "button" | "RouterLink";
        /** @returns {string} */
        type(): any;
        /** @returns {Record<string, string> | Record<string, Function | Function[]>} */
        listeners(): any;
    };
    methods: {
        onSubmit({ target: form }: {
            target: any;
        }): Promise<void>;
    };
};
export default _default;
