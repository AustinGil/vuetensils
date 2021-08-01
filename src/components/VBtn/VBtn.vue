<template>
  <component :is="tag" class="vts-btn" :type="type">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'VBtn',
  computed: {
    /** @return {'RouterLink' | 'a' | 'button'} */
    tag() {
      const attrs = this.$attrs;
      if (attrs && attrs.to) {
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
