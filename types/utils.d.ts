/**
 * Generates a random string of defined length based on
 * a string of allowed characters.
 *
 * @param  {number} length  How many random characters will be in the returned string. Defaults to 10
 * @param  {string} allowed Which characters can be used when creating the random string. Defaults to A-Z,a-z,0-9
 * @returns {string}         A string of random characters
 */
export function randomString(length?: number, allowed?: string): string;
/**
 * Tells you if a given value matches the type you pass.
 *
 * @param {any} v The value to get the type of
 * @param {string} type The type you are asserting against
 * @returns {boolean} Whether the given input matches the type passed
 */
export function isType(v: any, type: string): boolean;
/**
 * [applyFocusTrap description]
 *
 * @param  {HTMLElement} el    [description]
 * @param  {Event}       event [description]
 * @returns {undefined}         [description]
 */
export function applyFocusTrap(el: HTMLElement, event: Event): undefined;
