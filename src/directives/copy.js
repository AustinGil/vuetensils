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

/**
 * @typedef {HTMLElement & { _vtsCopy?: EventListenerOrEventListenerObject }} CopyEl
 */

export default {
  /**
   * @type {import('vue').DirectiveFunction}
   */
  bind(/** @type {CopyEl} */ el, binding) {
    el._vtsCopy = () => copyToClipboard(binding.value);
    el.addEventListener('click', el._vtsCopy);
  },
  /**
   * @type {import('vue').DirectiveFunction}
   */
  update(/** @type {CopyEl} */ el, binding) {
    el.removeEventListener('click', el._vtsCopy);
    el._vtsCopy = () => copyToClipboard(binding.value);
    el.addEventListener('click', el._vtsCopy);
  },
  /**
   * @type {import('vue').DirectiveFunction}
   */
  unbind(/** @type {CopyEl} */ el) {
    el.removeEventListener('click', el._vtsCopy);
  },
};
