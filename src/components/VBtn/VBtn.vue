<script>
import { getTag } from '../utils.js';

/**
 * @type {import('vue').Component}
 */
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
