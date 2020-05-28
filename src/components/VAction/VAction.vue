<script>
/**
 * @param {{ to: string }} props
 * @param {{ attrs: { href: string } }} data
 * @return { string }
 */
function getTag({ to }, { attrs }) {
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
