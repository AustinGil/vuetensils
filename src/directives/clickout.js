export default {
  /**
   * @type {import('vue').DirectiveFunction}
   */
  bind(el, binding) {
    binding.stop = e => e.stopPropagation();

    document.body.addEventListener('click', binding.value);
    el.addEventListener('click', binding.stop);
  },
  /**
   * @type {import('vue').DirectiveFunction}
   */
  unbind(el, binding) {
    document.body.removeEventListener('click', binding.value);
    el.removeEventListener('click', binding.stop);
  },
};
