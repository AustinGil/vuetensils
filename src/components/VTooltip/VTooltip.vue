<script>
// TODO: checkout http://pauljadam.com/demos/tooltip.html
// @ts-check
import { randomString } from '../../utils';

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

    focus: {
      type: Boolean,
      default: false,
    },

    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    show: false,
  }),

  render(h) {
    const { tag, show, id, focus, classes } = this;

    const defaultSlot = this.$scopedSlots.default();
    const tooltip = this.$scopedSlots.tooltip();

    const content = h(
      'span',
      {
        class: [
          'vts-tooltip__content',
          {
            'vts-tooltip__content--visible': show,
          },
          classes.content,
        ],
        attrs: {
          id: `${id}__content`,
          role: 'tooltip',
          'aria-hidden': !show + '',
        },
      },
      tooltip
    );

    const on = {
      focus: () => (this.show = true),
      blur: () => (this.show = false), // TODO: this should not run if the next target is inside the tooltip
    };
    // add hover events unless focus only
    if (!focus) {
      on.mouseenter = () => (this.show = true);
      on.mouseleave = () => (this.show = false);
    }

    const parent = h(
      tag,
      {
        class: ['vts-tooltip', classes.toggle],
        on,
        attrs: {
          id,
          tabindex: 0,
          'aria-describedby': `${id}__content` 
        },
      },
      [defaultSlot, content]
    );

    return parent;
  },
};
</script>

<style>
.vts-tooltip {
  position: relative;
}
.vts-tooltip__content {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
}
.vts-tooltip__content[aria-hidden="true"] {
  display: none;
}
</style>
