/**
 * @param {number} str
 * @param {string} currency
 * @param {string} [locale = navigator.language]
 * @return {string}
 */
export function currency(str: number, currency: string, locale?: string): string;
/**
 * @param {number} str
 * @param {string} [locale = navigator.language]
 * @return {string}
 */
export function number(str: number, locale?: string): string;
/**
 * @param {string} str
 * @param {string} plural
 * @param {number} qty
 * @return {string}
 */
export function plural(str: string, plural: string, qty: number): string;
/**
 * @param {string} str
 * @param {number} [length = 100]
 * @param {string} [append = '...']
 * @return {string}
 */
export function truncate(str: string, length?: number, append?: string): string;
export function capitalize(str: string): string;
export function placeholder(str: string, placeholder: string): string;
