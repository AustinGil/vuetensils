<template>
  <component
    :is="tag"
    :id="id"
    tabindex="0"
    :aria-describedby="`${id}__content`"
    :class="['vts-tooltip', classes.toggle]"
    @focus="show = true"
    @blur="show = false"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <slot />

    <span
      :id="`${id}__content`"
      role="tooltip"
      :aria-hidden="!show"
      :class="[
        'vts-tooltip__content',
        {
          'vts-tooltip__content--visible': show,
        },
        classes.content,
      ]"
    >
      <slot name="tooltip" />
    </span>
  </component>
</template>

<script>
import { randomString } from '../../utils.js';

export default {
  name: 'VTooltip',
  props: {
    tag: {
      type: String,
      default: 'span',
    },
    id: {
      type: String,
      default: () => `vts-${randomString(4)}`,
    },
    focus: Boolean,
    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    show: false,
  }),

  methods: {
    onMouseenter() {
      if (this.focus) return;
      this.show = true;
    },
    onMouseleave() {
      if (this.focus) return;
      this.show = false;
    },
  },
};
</script>

<style>
.vts-tooltip {
  position: relative;
}

.vts-tooltip__content {
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 50%;
  transform: translate(-50%, -100%);
}

.vts-tooltip__content[aria-hidden='true'] {
  display: none;
}
</style>
