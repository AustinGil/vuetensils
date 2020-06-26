<script>
/**
 * Detects if a VDOM element is a <RouterLink>, <a>, or <button>
 *
 * @param  {object} props           props container
 * @param  {string} props.to        the :to prop for router-link
 * @param  {object} data            data container
 * @param  {object} data.attrs      attributes container
 * @return {string}                 'RouterLink', 'a', or 'button'
 */
export function getTag({ to }, { attrs }) {
  if (to) {
    return 'RouterLink';
  }
  if (attrs && attrs.href) {
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

    return h(tag, options, children);
  },
};
</script>
