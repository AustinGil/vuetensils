/** @typedef {import('vue').DirectiveHook} DirectiveHook */
/** @type {DirectiveHook} */
function mounted(el, binding) {
  el._vtsFocusout = () => {
    requestAnimationFrame(() => {
      if (el.contains(document.activeElement)) return;
      binding.value();
    });
  };
  el.addEventListener('focusout', el._vtsFocusout);
}
/** @type {DirectiveHook} */
function unmounted(el) {
  if (!el._vtsFocusout) return;
  el.removeEventListener('focusout', el._vtsFocusout);
}

/**
 * @type {import('vue').Directive & { bind: DirectiveHook, unbind: DirectiveHook }}
 */
export default {
  mounted,
  unmounted,
  // TODO: Drop Vue 2
  bind: mounted,
  unbind: unmounted,
};
