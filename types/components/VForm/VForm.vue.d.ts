declare const _default: {
    name: string;
    props: {
        lazy: {
            type: BooleanConstructor;
            default: boolean;
        };
        /** @type {import('vue').PropOptions<Object>} */
        errors: {
            type: ObjectConstructor;
            default: () => {};
        };
        preventNavigation: {
            type: BooleanConstructor;
            default: boolean;
        };
        honeypot: {
            type: (StringConstructor | BooleanConstructor)[];
            default: boolean;
        };
    };
    data: () => {
        dirty: boolean;
        /** This may need more robust checking. @see https://www.sitepoint.com/detect-html-form-changes/ */
        modified: boolean;
        localInputs: {};
    };
    computed: {
        /** @returns {object} */
        listeners(): any;
        /** @returns {string} */
        event(): "input" | "change";
        /** @returns {boolean} */
        valid(): boolean;
        /** @returns {boolean} */
        error(): any;
        /** @returns {object} */
        inputs(): {};
    };
    mounted(): void;
    beforeRouteLeave(to: any, from: any, next: any): void;
    /** @deprecated */
    beforeDestroy(): void;
    beforeUnmount(): void;
    methods: {
        checkModified({ target }: {
            target: any;
        }): void;
        validate(): void;
        onEvent(): void;
        onBlur({ target }: {
            target: any;
        }): void;
        clear(): void;
        reset(): void;
        onSubmit(event: any): void;
        preventNav(event: any): void;
    };
};
export default _default;
