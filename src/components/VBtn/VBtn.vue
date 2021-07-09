<template>
  <component :is="tag" v-bind="attrs" class="vts-action vts-btn'">
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
    tag() {
      const { to, $attrs } = this;
      if (to) {
        return 'RouterLink';
      }
      if ($attrs && $attrs.href) {
        return 'a';
      }
      return 'button';
    },
    attrs() {
      const attrs = { ...this.$attrs };
      if (this.tag === 'button') {
        attrs.type = attrs.type || 'button';
      }
      return attrs;
    },
  },
};
</script>
