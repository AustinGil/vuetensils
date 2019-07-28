<script>
import KEYCODES from "../../data/keycodes"
import FOCUSABLE from "../../data/focusable"

const NAME = "vts-drawer"

/**
 * A convenient sidebar that can be toggled on or off. When opened, it traps the user's focus so that keyboard navigation will remain within the sidebar until it is closed. It also supports being closed by pressing the ESC key.
 */
export default {
  props: {
    /**
     * @model
     */
    showing: Boolean,
    /**
     * Flag to place the drawer on the right side.
     */
    right: Boolean,
    /**
     * CSS width value.
     */
    width: String,
    /**
     * CSS max-width value.
     */
    maxWidth: String,
    /**
     * Disable page scrolling when drawer is open.
     */
    noScroll: Boolean,
    /**
     * Vue transition name.
     */
    transition: String,
    /**
     * Vue transition name for the background.
     */
    bgTransition: String
  },
  model: {
    prop: "showing",
    event: "update"
  },

  methods: {
    show() {
      /**
       * @event open
       * @type { undefined }
       */
      this.$emit("open")
      this.$emit("update", true)
    },
    hide() {
      /**
       * @event close
       * @type { undefined }
       */
      this.$emit("close")
      this.$emit("update", false)
    },
    toggle() {
      const event = this.showing ? "close" : "open"
      this.$emit(event, !this.showing)
      /**
       * @event update
       * @type { boolean }
       */
      this.$emit("update", !this.showing)
    },
    onKeydown(event) {
      if (event.keyCode === KEYCODES.ESC) {
        this.hide()
      }
      if (event.keyCode === KEYCODES.TAB) {
        const content = this.$refs.content
        const focusable = Array.from(content.querySelectorAll(FOCUSABLE))

        if (this.visible && content && !content.contains(document.activeElement) && focusable) {
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
    }
  },

  watch: {
    showing: {
      handler: function(next, prev) {
        if (next && next != prev) {
          this.noScroll && document.body.style.setProperty("overflow", "hidden")
          this.$nextTick(() => {
            this.$refs.content.focus()
          })
        } else {
          this.noScroll && document.body.style.removeProperty("overflow")
        }
      }
    }
  },

  render(create) {
    if (!this.showing) {
      return create(false)
    }

    let content = create(
      "aside",
      {
        ref: "content",
        class: {
          [`${NAME}__content`]: true,
          [`${NAME}__content--right`]: !!this.right
        },
        style: {
          width: this.width || null,
          maxWidth: this.maxWidth || null
        },
        attrs: {
          tabindex: "-1"
          // 'aria-label': "submenu"
        }
      },
      [this.$slots.default]
    )
    content = create(
      "transition",
      {
        props: { name: this.transition, appear: true }
      },
      [content]
    )

    let drawer = create(
      "div",
      {
        class: NAME,
        on: {
          click: event => {
            if (event.target.classList.contains(`${NAME}`)) {
              this.hide()
            }
          },
          keydown: this.onKeydown
        }
      },
      [content]
    )
    drawer = create(
      "transition",
      {
        props: { name: this.bgTransition }
      },
      [drawer]
    )

    return drawer
  }
}
</script>

<style>
.vts-drawer {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
}

.vts-drawer [tabindex="-1"]:focus {
  outline: 0;
}

.vts-drawer__content {
  overflow: auto;
  width: 100%;
  max-width: 300px;
  height: 100%;
  background: #fff;
}

.vts-drawer__content--right {
  margin-left: auto;
}
</style>
