/**
 * Formats a number as currency using the user's locale. 1234.56 => '$1,234.56'
 *
 * @param  {number} num      The number to be formatted
 * @param  {string} currency The type of currency, such as 'USD' or 'JPY'
 * @param  {string} locale   The locale for formatting the number, such as 'en-US'. Defaults to navigator.language
 * @return {string}          The number as a string formatted in the locale of the user
 */
export function currency(num: number, currency: string, locale?: string): string;
/**
 * Formats a number to a culture code locale. 1234 => '1,234'
 *
 * @param  {number} num    The number to be formatted
 * @param  {string} locale Culture-code for formatting the number, such as 'en-US'. Defaults to navigator.language
 * @return {string}        A formmated number based on a culture code
 */
export function number(num: number, locale?: string): string;
/**
 * Returns the plural or singular form of a word based on a amount
 *
 * @param  {string} singular The singular form of a noun, like "entity"
 * @param  {string} plural   The plural form of a noun, like "entities"
 * @param  {number} amount   The amount of the item the noun represents
 * @return {string}          The correct plurality
 */
export function plural(singular: string, plural: string, amount: number): string;
/**
 * Replaces all characters of a string that surpass a length with a new string.
 *
 * @param  {string} str    String of text to be truncated
 * @param  {number} length Amount of characters to allow before truncating. Defaults to 100
 * @param  {string} append Text to append to the end of a truncated string. Defaults to '...'
 * @return {string}        The original string, or a truncated version if it exceed the allowed limit.
 */
export function truncate(str: string, length?: number, append?: string): string;
export function capitalize(str: string): string;
export function placeholder(str: string, placeholder: string): string;
