/** @typedef {import('vue').DirectiveHook} DirectiveHook */
/** @type {DirectiveHook} */
function mounted(el, binding) {
  // TODO: add escape handler?
  el._vtsClickout = {
    stop: (e) => e.stopPropagation(),
    // esc: e => e.key === 'Escape' && el.data.event()
  };

  document.body.addEventListener('click', binding.value);
  // document.body.addEventListener('keydown', el._vtsClickout.esc)
  el.addEventListener('click', el._vtsClickout.stop);
}

/** @type {DirectiveHook} */
function unmounted(el, binding) {
  document.body.removeEventListener('click', binding.value);
  // document.body.removeEventListener('keydown', el._vtsClickout.esc)
  el.removeEventListener('click', el._vtsClickout.stop);
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
