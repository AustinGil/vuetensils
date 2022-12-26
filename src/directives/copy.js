/** @typedef {import('vue').DirectiveHook} DirectiveHook */

/**
 * Copies a string of text to the user's clipboard
 *
 * @param {string} content The content within the downloaded file
 */
function copyToClipboard(content) {
  /** @type {Element & { focus?: function }} */
  const activeEl = document.activeElement;

  const textarea = document.createElement('textarea');
  textarea.value = content;

  textarea.setAttribute('readonly', ''); // Prevent keyboard from showing on mobile
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  textarea.style.fontSize = '12pt'; // Prevent zooming on iOS

  document.body.append(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();

  activeEl && activeEl.focus();
}

/** @type {DirectiveHook} */
function mounted(el, binding) {
  el._vtsCopy = () => copyToClipboard(binding.value);
  el.addEventListener('click', el._vtsCopy);
}
/** @type {DirectiveHook} */
function updated(el, binding) {
  el.removeEventListener('click', el._vtsCopy);
  el._vtsCopy = () => copyToClipboard(binding.value);
  el.addEventListener('click', el._vtsCopy);
}
/** @type {DirectiveHook} */
function unmounted(el) {
  el.removeEventListener('click', el._vtsCopy);
}

/**
 * @type {import('vue').Directive & {
 * bind: DirectiveHook,
 * update: DirectiveHook,
 * unbind: DirectiveHook,
 * }}
 */
export default {
  mounted,
  updated,
  unmounted,
  // TODO: Drop Vue 2
  bind: mounted,
  update: updated,
  unbind: unmounted,
};
