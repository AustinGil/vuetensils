/** @typedef {import('vue').DirectiveHook} DirectiveHook */
/** @type {DirectiveHook} */
const mounted = (el) => el.focus();
/**
 * @type {import('vue').Directive & { inserted: import('vue').DirectiveHook}}
 */
export default {
  mounted,
  // TODO: Drop Vue 2
  inserted: mounted,
};
