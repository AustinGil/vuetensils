<script>
/**
 * Detects if a VDOM element is a <RouterLink>, <a>, or <button>
 *
 * @param {import('vue').PropOptions & { to?:string }} props props container
 * @param {import('vue').VNodeData} data data container
 * @return {'RouterLink' | 'a' | 'button'} 'RouterLink', 'a', or 'button'
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
    data.attrs = data.attrs || {};
    const tag = getTag(props, data);
    const options = {
      ...data,
      props,
      class: ['vts-action vts-btn', data.class],
      on: listeners,
    };

    if (tag === 'RouterLink') {
      options.nativeOn = listeners;
    }
    if (data.attrs.target === '_blank') {
      options.attrs.rel = 'noopener';
    }
    if (tag === 'button') {
      options.attrs.type = options.attrs.type || 'button';
    }

    return h(tag, options, children);
  },
};
</script>
