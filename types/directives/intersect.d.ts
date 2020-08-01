declare namespace _default {
    export const inserted: import('vue').DirectiveFunction;
    export { unbind };
}
export default _default;
/**
 * @param {HTMLElement & { _vtsIntersect?: IntersectionObserver}} el
 */
declare function unbind(el: HTMLElement & {
    _vtsIntersect?: IntersectionObserver;
}): void;
