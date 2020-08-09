/**
 * @typedef {HTMLElement & {
 * _vtsClickout: { stop: EventListener}
 * }} ClickoutEl
 */
export default {
  /**
   * @param {ClickoutEl} el directive target element
   * @type {import('vue').DirectiveFunction}
   */
  bind(el, binding) {
    // TODO: add escape handler?
    el._vtsClickout = {
      stop: e => e.stopPropagation(),
      // esc: e => e.key === 'Escape' && el.data.event()
    };

    document.body.addEventListener('click', binding.value);
    // document.body.addEventListener('keydown', el._vtsClickout.esc)
    el.addEventListener('click', el._vtsClickout.stop);
  },
  
  /**
   * @param {ClickoutEl} el directive target element
   * @type {import('vue').DirectiveFunction}
   */
  unbind(el, binding) {
    document.body.removeEventListener('click', binding.value);
    // document.body.removeEventListener('keydown', el._vtsClickout.esc)
    el.removeEventListener('click', el._vtsClickout.stop);
  },
};
