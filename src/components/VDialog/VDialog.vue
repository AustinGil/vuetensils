<script>
import KEYCODES from "../../data/keycodes"
import FOCUSABLE from "../../data/focusable"

const NAME = "vts-dialog"
/**
 * A dialog component for showing users content which overlays the rest of the applications. When opened, it traps the user's focus so that keyboard navigation will remain within the dialog until it is closed. It supports being closed by clicking outside the dialog content or pressing the ESC key.
 */
export default {
  inheritAttrs: false,

  model: {
    prop: "showing",
    event: "update",
  },

  props: {
    /**
     * @model
     */
    showing: Boolean,
    /**
     * HTML component for the dialog content.
     */
    tag: {
      type: String,
      default: "div",
    },
    /**
     * Flag to enable/prevent the dialog from being closed.
     */
    dismissible: {
      type: Boolean,
      default: true,
    },
    /**
     * CSS width to set the dialog to.
     */
    width: {
      type: String,
      default: "",
    },
    /**
     * CSS max-width to set the dialog to.
     */
    maxWidth: {
      type: String,
      default: "",
    },
    /**
     * Prevents the page from being scrolled while the dialog is open.
     */
    noScroll: {
      type: Boolean,
      default: false,
    },
    /**
     * Transition name to apply to the dialog.
     */
    transition: {
      type: String,
      default: "",
    },
    /**
     * Transition name to apply to the background.
     */
    bgTransition: {
      type: String,
      default: "",
    },

    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      localShow: this.showing,
      activeElement: null,
    }
  },

  watch: {
    showing(next) {
      this.localShow = next
    },
    localShow: {
      handler(next, prev) {
        if (typeof window === "undefined") return

        if (next && next != prev) {
          this.activeElement = document.activeElement
          this.onOpen()
        } else {
          this.onClose()

          const { activeElement } = this
          if (activeElement && activeElement.focus) {
            this.$nextTick(() => {
              activeElement.focus()
            })
          }
        }

        this.$emit("update", next)
      },
    },
  },

  destroyed() {
    this.onClose()
  },

  methods: {
    onOpen() {
      const { onClick, onKeydown, noScroll } = this
      window.addEventListener("click", onClick)
      window.addEventListener("keydown", onKeydown)
      noScroll && document.body.style.setProperty("overflow", "hidden")
      this.$nextTick(() => this.$refs.content.focus())
    },
    onClose() {
      const { onClick, onKeydown, noScroll } = this
      window.removeEventListener("click", onClick)
      window.removeEventListener("keydown", onKeydown)
      noScroll && document.body.style.removeProperty("overflow")
    },
    onClick(event) {
      if (event.target.classList.contains("vts-dialog") && this.dismissible) {
        this.localShow = false
      }
    },
    onKeydown(event) {
      if (event.keyCode === KEYCODES.ESC) {
        this.localShow = false
      }
      if (event.keyCode === KEYCODES.TAB) {
        const content = this.$refs.content
        if (!content) return

        const focusable = Array.from(content.querySelectorAll(FOCUSABLE))

        if (!focusable.length) {
          event.preventDefault()
          return
        }

        if (!content.contains(document.activeElement)) {
          event.preventDefault()
          focusable[0].focus()
        } else {
          const focusedItemIndex = focusable.indexOf(document.activeElement)

          if (event.shiftKey && focusedItemIndex === 0) {
            focusable[focusable.length - 1].focus()
            event.preventDefault()
          }

          if (!event.shiftKey && focusedItemIndex === focusable.length - 1) {
            focusable[0].focus()
            event.preventDefault()
          }
        }
      }
    },
  },

  render(h) {
    const { localShow, $scopedSlots, classes } = this

    if (!localShow && !$scopedSlots.toggle) {
      return h(false)
    }

    const children = []

    if ($scopedSlots.toggle) {
      children.push(
        $scopedSlots.toggle({
          on: {
            click: () => (this.localShow = true),
          },
          bind: {
            type: "button",
            role: "button",
            "aria-haspopup": true,
            "aria-expanded": "" + localShow,
          },
          attrs: {
            // TODO: deprecated
            type: "button",
            role: "button",
            "aria-haspopup": true,
            "aria-expanded": "" + localShow,
          },
        })
      )
    }

    if (localShow) {
      let content = h(
        this.tag,
        {
          ref: "content",
          class: [`${NAME}__content`, classes.content],
          style: {
            width: this.width,
            maxWidth: this.maxWidth,
          },
          attrs: {
            tabindex: "-1",
            role: "dialog",
          },
        },
        [this.$slots.default]
      )
      content = h(
        "transition",
        {
          props: { name: this.transition },
        },
        [content]
      )

      const modal = h(
        "div",
        {
          class: [NAME, classes.root, classes.bg, this.$attrs.class],
        },
        [content]
      )

      children.push(
        h(
          "transition",
          {
            props: { name: this.bgTransition, appear: true },
          },
          [modal]
        )
      )
    }

    return h("span", children)
  },
}
</script>

<style>
.vts-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.vts-dialog__content:focus {
  outline: 0;
}
</style>
