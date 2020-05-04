<script>
// TODO: checkout http://pauljadam.com/demos/tooltip.html
// @ts-check
import { randomString } from "../../utils"

export default {
  props: {
    tag: {
      type: String,
      default: "div",
    },

    position: {
      type: String,
      default: "top",
    },

    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    show: false,
  }),

  created() {
    const { id } = this.$attrs
    this.id = id ? id : `vts-${randomString(4)}`
  },

  render(h) {
    const { show, id, classes } = this

    const defaultSlot = this.$scopedSlots.default()
    const tooltip = this.$scopedSlots.tooltip()

    const content = h(
      "span",
      {
        class: [
          "vts-tooltip__content",
          {
            "vts-tooltip__content--visible": show,
          },
          classes.content,
        ],
        attrs: {
          id: `${id}__content`,
          role: "tooltip",
          "aria-hidden": !show + "",
        },
      },
      tooltip
    )

    const parent = h(
      this.tag,
      {
        class: ["vts-tooltip", classes.toggle],
        on: {
          mouseenter: () => (this.show = true),
          mouseleave: () => (this.show = false),
          focus: () => (this.show = true),
          blur: () => (this.show = false),
        },
        attrs: { tabindex: 0, "aria-describedby": `${id}__content` },
      },
      [defaultSlot, content]
    )

    return parent
  },
}
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
