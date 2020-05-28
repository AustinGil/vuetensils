// @ts-check
/**
 * @param {string} str
 * @return {string}
 */
export const capitalize = str => str[0].toUpperCase() + str.slice(1);

/**
 * @param {number} str
 * @param {string} currency
 * @param {string} [locale = navigator.language]
 * @return {string}
 */
export function currency(str, currency, locale = navigator.language) {
  // Alternative: (73.57).toLocaleString('de-DE',{style:'currency',currency:'EUR'});
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(str);
}

/**
 * @param {number} str
 * @param {string} [locale = navigator.language]
 * @return {string}
 */
export function number(str, locale = navigator.language) {
  return new Intl.NumberFormat(locale).format(str);
}

/**
 * @param {string} str
 * @param {string} placeholder
 * @return {string}
 */
export const placeholder = (str, placeholder) => str || placeholder;

/**
 * @param {string} str
 * @param {string} plural
 * @param {number} qty
 * @return {string}
 */
export function plural(str, plural, qty) {
  return qty === 0 || qty > 1 ? plural : str;
}

/**
 * @param {string} str
 * @param {number} [length = 100]
 * @param {string} [append = '...']
 * @return {string}
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
