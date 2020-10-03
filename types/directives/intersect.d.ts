declare namespace _default {
    export const inserted: import('vue').DirectiveFunction;
    export { unbind };
}
export default _default;
export type IntersectEl = HTMLElement & {
    _vtsIntersect?: IntersectionObserver;
};
/**
 * @typedef {HTMLElement & { _vtsIntersect?: IntersectionObserver}} IntersectEl
 *
 * @param {IntersectEl} el
 */
declare function unbind(el: IntersectEl): void;
