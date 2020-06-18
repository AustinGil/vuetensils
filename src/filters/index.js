// @ts-check

/**
 * Uppercase the first character of a string.
 *
 * @param  {string} str String to uppercase the first letter of
 * @return {string}     Original string with the first letter in uppercase
 */
export const capitalize = str => str[0].toUpperCase() + str.slice(1);

/**
 * Formats a number as currency using the user's locale. 1234.56 => '$1,234.56'
 *
 * @param  {number} num      The number to be formatted
 * @param  {string} currency The type of currency, such as 'USD' or 'JPY'
 * @param  {string} locale   The locale for formatting the number, such as 'en-US'. Defaults to navigator.language
 * @return {string}          The number as a string formatted in the locale of the user
 */
export function currency(num, currency, locale = navigator.language) {
  // Alternative: (73.57).toLocaleString('de-DE',{style:'currency',currency:'EUR'});
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(num);
}

/**
 * Formats a number to a culture code locale. 1234 => '1,234'
 *
 * @param  {number} num    The number to be formatted
 * @param  {string} locale Culture-code for formatting the number, such as 'en-US'. Defaults to navigator.language
 * @return {string}        A formmated number based on a culture code
 */
export function number(num, locale = navigator.language) {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Takes in a value and a fallback. Return fallback if value is falsy.
 *
 * @param  {string} str         Desired text to display
 * @param  {string} placeholder Fallback text
 * @return {string}             Shows desired text unless falsy, then shows fallback
 */
export const placeholder = (str, placeholder) => str || placeholder;

/**
 * Returns the plural or singular form of a word based on a amount
 *
 * @param  {string} singular The singular form of a noun, like "entity"
 * @param  {string} plural   The plural form of a noun, like "entities"
 * @param  {number} amount   The amount of the item the noun represents
 * @return {string}          The correct plurality
 */
export function plural(singular, plural, amount) {
  return amount !== 1 ? plural : singular;
}

/**
 * Replaces all characters of a string that surpass a length with a new string.
 *
 * @param  {string} str    String of text to be truncated
 * @param  {number} length Amount of characters to allow before truncating. Defaults to 100
 * @param  {string} append Text to append to the end of a truncated string. Defaults to '...'
 * @return {string}        The original string, or a truncated version if it exceed the allowed limit.
 */
export function truncate(str, length = 100, append = '...') {
  // TODO: dont split last word
  if (str.length > length) {
    return str.substring(0, length - append.length) + append;
  } else {
    return str;
  }
}

/**
 * TODO:
 * (https://www.npmjs.com/package/vue2-filters)
 * truncate
 * scientific notation
 * filterBy
 * find
 * sortBy
 * mask?
 */
