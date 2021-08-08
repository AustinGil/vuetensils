import FOCUSABLE from './data/focusable.js';

/**
 * Generates a random string of defined length based on
 * a string of allowed characters.
 *
 * @param  {number} length  How many random characters will be in the returned string. Defaults to 10
 * @param  {string} allowed Which characters can be used when creating the random string. Defaults to A-Z,a-z,0-9
 * @return {string}         A string of random characters
 */
export function randomString(
  length = 10,
  allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += allowed.charAt(Math.floor(Math.random() * allowed.length));
  }
  return result;
}

/**
 * Tells you if a given value matches the type you pass.
 *
 * @param {any} v The value to get the type of
 * @param {string} type The type you are asserting against
 * @return {boolean} Whether the given input matches the type passed
 */
export function isType(v, type) {
  return (
    Object.prototype.toString
      .call(v)
      .slice(8, -1)
      .toLowerCase() === type.toLowerCase()
  );
}

/**
 * [applyFocusTrap description]
 *
 * @param  {HTMLElement} el    [description]
 * @param  {Event}       event [description]
 * @return {undefined}         [description]
 */
export function applyFocusTrap(el, event) {
  const focusable = Array.from(el.querySelectorAll(FOCUSABLE));

  if (!focusable.length) {
    event.preventDefault();
    return;
  }

  if (!el.contains(document.activeElement)) {
    event.preventDefault();
    focusable[0].focus();
  } else {
    const focusedItemIndex = focusable.indexOf(document.activeElement);

    if (event.shiftKey && focusedItemIndex === 0) {
      focusable[focusable.length - 1].focus();
      event.preventDefault();
    }

    if (!event.shiftKey && focusedItemIndex === focusable.length - 1) {
      focusable[0].focus();
      event.preventDefault();
    }
  }
}
