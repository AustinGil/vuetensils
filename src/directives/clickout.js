export default {
  bind(el, binding) {
    binding.stop = e => e.stopPropagation();

    document.body.addEventListener("click", binding.value);
    el.addEventListener("click", binding.stop);
  },
  unbind(el, binding) {
    document.body.removeEventListener("click", binding.value);
    el.removeEventListener("click", binding.stop);
  },
};
