<template>
  <component :is="tag" class="vts-resize">
    <slot v-bind="{ width, height, inlineSize: width, blockSize: height }" />
  </component>
</template>

<script>
export default {
  name: 'VResize',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },

  data: () => ({
    observer: undefined,
    width: undefined,
    height: undefined,
  }),

  mounted() {
    this.observer = new ResizeObserver(this.updateDimensions);
    this.observer.observe(this.$el);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
  /** @deprecated */
  beforeDestroy() {
    this.observer.disconnect();
  },

  methods: {
    updateDimensions() {
      const el = this.$el;
      this.width = el.offsetWidth;
      this.height = el.offsetHeight;
      this.$emit('resize', arguments);
    },
  },
};
</script>
