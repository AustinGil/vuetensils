<script>
import KEYCODES from "../../data/keycodes"
import FOCUSABLE from "../../data/focusable"

const NAME = "vts-modal"

/**
 * A modal/dialogue component for showing users content which overlays the rest of the applications. When opened, it traps the user's focus so that keyboard navigation will remain within the modal until it is closed. It also supports being closed by pressing the ESC key.
 */
export default {
  // name: NAME,

  props: {
    /**
     * @model
     */
    showing: {
      type: Boolean,
      default: false
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    width: {
      type: String
    },
    maxWidth: {
      type: String
    },
    preventScroll: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String
    },
    bgTransition: {
      type: String
    }
  },
  model: {
    prop: "showing",
    event: "change"
  },

  methods: {
    show() {
      /**
       * @event show
       * @type { boolean }
       */
      this.$emit("show")
      this.$emit("change", true)
    },
    hide() {
      /**
       * @event hide
       * @type { boolean }
       */
      this.$emit("hide")
      this.$emit("change", false)
    },
    toggle() {
      const event = this.showing ? "hide" : "show"
      this.$emit(event, !this.showing)
      /**
       * @event change
       * @type { boolean }
       */
      this.$emit("change", !this.showing)
    },
    onKeydown(event) {
      if (event.keyCode === KEYCODES.ESC) {
        this.hide()
      }
      if (event.keyCode === KEYCODES.TAB) {
        const content = this.$refs.content
        const focusable = Array.from(content.querySelectorAll(FOCUSABLE))

        if (this.showing && content && !content.contains(document.activeElement) && focusable) {
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
        if (typeof window !== "undefined") {
          if (next && next != prev) {
            this.preventScroll && document.body.style.setProperty("overflow", "hidden")
            this.$nextTick(() => {
              this.$refs.content.focus()
            })
          } else {
            this.preventScroll && document.body.style.removeProperty("overflow")
          }
        }
      }
    }
  },

  render(create) {
    if (!this.showing) {
      return create(false)
    }

    let content = create(
      "div",
      {
        ref: "content",
        class: `${NAME}__content`,
        style: {
          width: this.width || null,
          maxWidth: this.maxWidth || null
        },
        attrs: {
          tabindex: "-1",
          role: "dialog"
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

    let modal = create(
      "div",
      {
        class: `${NAME}`,
        on: {
          click: event => {
            if (event.target.classList.contains(`${NAME}`) && this.dismissible) {
              this.hide()
            }
          },
          keydown: this.onKeydown
        }
      },
      [content]
    )

    modal = create(
      "transition",
      {
        props: { name: this.bgTransition }
      },
      [modal]
    )

    return modal
  }
}
</script>

<style>
.vts-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
}

.vts-modal [tabindex="-1"]:focus {
  outline: 0;
}

.vts-modal__content {
  overflow: auto;
  max-width: 70vw;
  max-height: 80vh;
  background: #fff;
}
</style>
