<template>
  <component :is="tag" class="vts-btn" :type="type" v-bind="$attrs">
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
      if (this.tag !== 'button') return;
      return this.$attrs.type || 'button';
    },
  },
};
</script>
