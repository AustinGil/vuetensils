import { reactive } from 'vue-demi';

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
export default function usePromise(promise, options = {}) {
  const state = reactive({
    pending: false,
    results: options.placeholder || null,
    error: null,
  });

  /**
   * @param {Promise | (() => Promise)} promise
   * @returns {Promise<void>}
   */
  const watch = async function watch(promise) {
    promise = typeof promise === 'function' ? promise() : promise;
    if (!promise || !promise.then) return;

    state.pending = true;
    options.onChange &&
      options.onChange({
        pending: state.pending,
        results: state.results,
        error: state.error,
      });
    options.onPending && options.onPending(state.pending);

    try {
      const resolved = await promise;

      if (resolved !== undefined) {
        state.results = resolved;
      } else if (options.default !== undefined) {
        state.results = options.default;
      } else {
        state.results = null;
      }

      options.onResolve && options.onResolve(state.results);
    } catch (error) {
      if (error instanceof Error) {
        state.error = {
          name: error.name,
          message: error.message,
        };
      } else {
        state.error = error;
      }
      console.error(error);
      options.onReject && options.onReject(state.error);
    } finally {
      state.pending = false;
      options.onChange &&
        options.onChange({
          pending: state.pending,
          results: state.results,
          error: state.error,
        });
      options.onPending && options.onPending(state.pending);
    }
  };

  if (promise) {
    watch(promise);
  }

  return Object.assign(state, { watch });
}
