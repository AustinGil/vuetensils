/**
 * Copies a string of text to the user's clipboard
 * @param {String} content The content within the downloaded file
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
  bind(el, binding) {
    binding.handler = () => copyToClipboard(binding.value);
    el.addEventListener('click', binding.handler);
  },
  unbind(el, binding) {
    el.removeEventListener('click', binding.handler);
  },
  update(el, binding) {
    el.removeEventListener('click', binding.handler);
    binding.handler = () => copyToClipboard(binding.value);
    el.addEventListener('click', binding.handler);
  },
};
