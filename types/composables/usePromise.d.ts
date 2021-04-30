/**
 * @param {Promise | (() => Promise)} [promise]
 * @param {{ default: any }} [options]
 * @return { [typeof state, typeof watch] }
 */
export default function usePromise(promise?: Promise | (() => Promise), options?: {
    default: any;
}): [any, (promise: Promise | (() => Promise)) => Promise<void>];
