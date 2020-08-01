/**
 * Copies a string of text to the user's clipboard
 *
 * @param {string} content The content within the downloaded file
 */
function copyToClipboard(content) {
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

export default {
  /**
   * @type {import('vue').DirectiveFunction}
   */
  bind(el, binding) {
    (el._vtsClickout = () => copyToClipboard(binding.value)),
      el.addEventListener('click', el._vtsClickout);
  },
  /**
   * @type {import('vue').DirectiveFunction}
   */
  update(el, binding) {
    el.removeEventListener('click', el._vtsClickout);
    el._vtsClickout = () => copyToClipboard(binding.value);
    el.addEventListener('click', el._vtsClickout);
  },
  /**
   * @type {import('vue').DirectiveFunction}
   */
  unbind(el) {
    el.removeEventListener('click', el._vtsClickout);
  },
};
