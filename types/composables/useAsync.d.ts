/**
 * @param {Promise | (() => Promise)} [promise]
 * @param {object} [options = {}]
 * @param {any} [options.placeholder] The initial results value
 * @param {any} [options.default] The default value if the resolved value is `undefined`
 * @param {Function} [options.onChange]
 * @param {Function} [options.onPending]
 * @param {Function} [options.onResolve]
 * @param {Function} [options.onReject]
 * @returns { typeof state & { watch: typeof watch} }
 */
export default function usePromise(promise?: Promise | (() => Promise), options?: {
    placeholder: any;
    default: any;
    onChange: Function;
    onPending: Function;
    onResolve: Function;
    onReject: Function;
}): {
    watch: (promise: Promise | (() => Promise)) => Promise<void>;
};
