<template>
  <component :is="tag" class="vts-btn" :type="type">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'VBtn',
  props: {
    to: {
      type: [String, Object],
      default: '',
    },
  },
  computed: {
    /** @return {'RouterLink' | 'a' | 'button'} */
    tag() {
      const attrs = this.$attrs;
      if (attrs && this.to) {
        return 'RouterLink';
      }
      if (attrs && attrs.href) {
        return 'a';
      }
      return 'button';
    },
    /** @return {string} */
    type() {
      const $attrs = this.$attrs;
      if (this.tag !== 'button') return;
      return $attrs.type || 'button';
    },
  },
};
</script>
