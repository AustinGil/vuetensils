<template>
  <transition :name="bgTransition" appear>
    <component
      :is="tag"
      v-if="showing"
      :class="['vts-drawer', classes.root]"
      @click="onBgClick"
      @keydown="onKeydown"
    >
      <transition :name="transition" appear>
        <div
          ref="content"
          :class="[
            'vts-drawer__content',
            { 'vts-drawer__content--right': !!right },
            classes.content,
          ]"
          :style="{ width: width, maxWidth: maxWidth }"
          tabindex="-1"
        >
          <slot />
        </div>
      </transition>
    </component>
  </transition>
</template>

<script>
import KEYCODES from "../../data/keycodes"
import FOCUSABLE from "../../data/focusable"

const NAME = "vts-drawer"

/**
 * A convenient sidebar that can be toggled on or off. When opened, it traps the user's focus so that keyboard navigation will remain within the sidebar until it is closed. It also supports being closed by pressing the ESC key.
 */
export default {
  model: {
    prop: "showing",
    event: "update",
  },

  props: {
    /**
     * @model
     */
    showing: Boolean,
    tag: {
      type: String,
      default: "aside",
    },
    /**
     * Flag to place the drawer on the right side.
     */
    right: Boolean,
    /**
     * CSS width value.
     */
    width: {
      type: String,
      default: "",
    },
    /**
     * CSS max-width value.
     */
    maxWidth: {
      type: String,
      default: "",
    },
    /**
     * Disable page scrolling when drawer is open.
     */
    noScroll: Boolean,
    /**
     * Vue transition name.
     */
    transition: {
      type: String,
      default: "",
    },
    /**
     * Vue transition name for the background.
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
    onBgClick(e) {
      if (event.target.classList.contains(`${NAME}`)) {
        this.hide()
      }
    },

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
      const { showing } = this
      const event = showing ? "close" : "open"
      this.$emit(event, !showing)
      /**
       * @event update
       * @type { boolean }
       */
      this.$emit("update", !showing)
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
.vts-drawer {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.vts-drawer__content {
  overflow: auto;
  max-width: 300px;
  height: 100%;
}

.vts-drawer__content:focus {
  outline: 0;
}

.vts-drawer__content--right {
  margin-left: auto;
}
</style>
