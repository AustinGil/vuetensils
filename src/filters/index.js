export const capitalize = str => str[0].toUpperCase() + str.slice(1)

export const number = str =>
  new Intl.NumberFormat(navigator.language).format(str)

export const plural = (str, plural, qty) => {
  return qty === 0 || qty > 1 ? plural : str
}

/**
 * TODO:
 * (https://www.npmjs.com/package/vue2-filters)
 * placeholder
 * truncate
 * scientific notation
 * currency
 * filterBy
 * find
 * sortBy
 * mask?
 */
