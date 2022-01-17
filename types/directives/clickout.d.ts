declare namespace _default {
    function bind(el: HTMLElement, binding: import("vue/types/options").DirectiveBinding, vnode: import("vue").VNode, oldVnode: import("vue").VNode): void;
    const bind: import("vue").DirectiveFunction;
    function unbind(el: HTMLElement, binding: import("vue/types/options").DirectiveBinding, vnode: import("vue").VNode, oldVnode: import("vue").VNode): void;
    const unbind: import("vue").DirectiveFunction;
}
export default _default;
export type ClickoutEl = HTMLElement & {
    _vtsClickout: {
        stop: EventListener;
    };
};
