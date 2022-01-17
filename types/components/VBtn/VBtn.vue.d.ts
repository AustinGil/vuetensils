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
        /** @return {'RouterLink' | 'a' | 'button'} */
        tag(): "a" | "button" | "RouterLink";
        /** @return {string} */
        type(): any;
    };
    methods: {
        onSubmit({ target: form }: {
            target: any;
        }): Promise<void>;
    };
};
export default _default;
