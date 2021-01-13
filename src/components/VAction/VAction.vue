<script>
/**
 * Detects if a VDOM element is a <RouterLink>, <a>, or <button>
 *
 * @param  {object} props       props container
 *         {string} props.to    the :to prop for router-link
 * @param  {object} data        data container
 *         {object} data.attrs  attributes container
 * @return {string}             'RouterLink', 'a', or 'button'
 */
export function getTag(props, data) {
  if (props && props.to) {
    return 'RouterLink';
  }
  if (data && data.attrs && data.attrs.href) {
    return 'a';
  }
  return 'button';
}

export default {
  name: 'VAction',
  functional: true,
  render(h, { data, listeners, props, children }) {
    const tag = getTag(props, data);
    const options = {
      ...data,
      props,
      class: ['vts-action'],
      on: listeners,
    };
    if (tag === 'RouterLink') {
      options.nativeOn = listeners;
    }
    /**
     * Supress Vue warnings of .native modifiers
     * Reference comment and issue #9999 on Vuetify
     * https://github.com/vuetifyjs/vuetify/issues/9999#issuecomment-579434865
     */
    if (tag === 'button') {
      options.nativeOn = null;
    }

    return h(tag, options, children);
  },
};
</script>
