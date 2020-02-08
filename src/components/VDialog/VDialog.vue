<template>
  <transition :name="bgTransition">
    <div
      v-if="showing"
      :class="['vts-dialog', classes.root]"
      @click="onClick"
      @keydown="onKeydown"
    >
      <transition :name="transition" appear>
        <component
          :is="tag"
          ref="content"
          :style="{ width: width, maxWidth: maxWidth }"
          :class="['vts-dialog__content', classes.content]"
          tabindex="-1"
          role="dialog"
        >
          <!-- @slot Content that exists within the dialog. -->
          <slot />
        </component>
      </transition>
    </div>
  </transition>
</template>

<script>
import KEYCODES from "../../data/keycodes"
import FOCUSABLE from "../../data/focusable"

/**
 * A dialog component for showing users content which overlays the rest of the applications. When opened, it traps the user's focus so that keyboard navigation will remain within the dialog until it is closed. It supports being closed by clicking outside the dialog content or pressing the ESC key.
 */
export default {
  model: {
    prop: "showing",
    event: "change",
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

  watch: {
    showing: {
      handler(next, prev) {
        if (typeof window === "undefined") return

        if (next && next != prev) {
          this.noScroll && document.body.style.setProperty("overflow", "hidden")
          this.$nextTick(() => {
            this.$refs.content.focus()
          })
        } else {
          this.noScroll && document.body.style.removeProperty("overflow")
        }
      },
    },
  },

  methods: {
    show() {
      /**
       * Fired when the dialog opens.
       * @event show
       * @type { boolean }
       */
      this.$emit("show")
      this.$emit("change", true)
    },
    hide() {
      /**
       * Fired when the dialog closes.
       * @event hide
       * @type { boolean }
       */
      this.$emit("hide")
      this.$emit("change", false)
    },
    toggle() {
      const { showing } = this
      const event = showing ? "hide" : "show"
      this.$emit(event, !showing)
      /**
       * Fired whenever the dialog opens or closes.
       * @event change
       * @type { boolean }
       */
      this.$emit("change", !showing)
    },
    onClick(event) {
      if (event.target.classList.contains("vts-dialog") && this.dismissible) {
        this.hide()
      }
    },

    onKeydown(event) {
      if (event.keyCode === KEYCODES.ESC) {
        this.hide()
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
