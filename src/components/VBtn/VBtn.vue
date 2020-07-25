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
  name: 'VBtn',
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
