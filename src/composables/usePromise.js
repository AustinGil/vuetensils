import { reactive } from 'vue';

/**
 * @param {Promise | (() => Promise)} [promise]
 * @param {{ default: any }} [options]
 * @return { [typeof state, typeof watch] }
 */
export default function usePromise(promise, options) {
  const state = reactive({
    pending: false,
    results: null,
    error: null,
  });

  /**
   * @param {Promise | (() => Promise)} promise
   * @return {Promise<void>}
   */
  async function watch(promise) {
    promise = typeof promise === 'function' ? promise() : promise;
    if (!promise?.then) {
      return;
    }
    state.pending = true;
    try {
      const resolved = await promise;
      state.results = resolved === undefined ? options.default : resolved;
    } catch (error) {
      if (error instanceof Error) {
        state.error = {
          name: error.name,
          message: error.message,
        };
      } else {
        state.error = error;
      }
    } finally {
      state.pending = false;
    }
  }
  if (promise) {
    watch(promise);
  }

  return [state, watch];
}
