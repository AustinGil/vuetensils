/**
 * A renderless component for awaiting promises to resolve;
 * great for making HTTP requests. Supports showing pending,
 * resolved, or rejected promises.
 */
declare const _default: {
    name: string;
    props: {
        /**
         * A promise or function that returns a promise.
         */
        await: {
            type: (FunctionConstructor | PromiseConstructor)[];
            default: () => Promise<void>;
        };
        /**
         * The default value to provide for the `results`.
         * Useful if the promise resolve value is undefined.
         */
        default: {
            type: any;
            default: any;
        };
    };
    data(): {
        pending: boolean;
        results: any;
        error: any;
        done: boolean;
    };
    watch: {
        await: {
            handler: string;
            immediate: boolean;
        };
        pending: {
            handler(pending: any): void;
            immediate: boolean;
        };
    };
    methods: {
        awaitOn(promise: any): any;
    };
    render(): any;
};
export default _default;
