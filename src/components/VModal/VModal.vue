<template>
  <transition :name="bgTransition">
    <div
      v-if="showing"
      :class="['vts-modal', classes.root]"
      @click="onClick"
      @keydown="onKeydown"
    >
      <transition :name="transition" appear>
        <component
          :is="tag"
          ref="content"
          :style="{ width: width, maxWidth: maxWidth }"
          :class="['vts-modal__content', classes.content]"
          tabindex="-1"
          role="dialog"
        >
          <!-- @slot Content that exists within the modal. -->
          <slot />
        </component>
      </transition>
    </div>
  </transition>
</template>

<script>
import KEYCODES from '../../data/keycodes.js';
import FOCUSABLE from '../../data/focusable.js';

/**
 * A modal/dialogue component for showing users content which overlays the rest of the applications. When opened, it traps the user's focus so that keyboard navigation will remain within the modal until it is closed. It supports being closed by clicking outside the modal content or pressing the ESC key.
 */
export default {
  name: 'VModal',

  model: {
    prop: 'showing',
    event: 'change',
  },

  props: {
    /**
     * @model
     */
    showing: Boolean,
    /**
     * HTML component for the modal content.
     */
    tag: {
      type: String,
      default: 'div',
    },
    /**
     * Flag to enable/prevent the modal from being closed.
     */
    dismissible: {
      type: Boolean,
      default: true,
    },
    /**
     * CSS width to set the modal to.
     */
    width: {
      type: String,
      default: undefined,
    },
    /**
     * CSS max-width to set the modal to.
     */
    maxWidth: {
      type: String,
      default: undefined,
    },
    /**
     * Prevents the page from being scrolled while the modal is open.
     */
    noScroll: Boolean,
    /**
     * Transition name to apply to the modal.
     */
    transition: {
      type: String,
      default: undefined,
    },
    /**
     * Transition name to apply to the background.
     */
    bgTransition: {
      type: String,
      default: undefined,
    },

    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  watch: {
    showing: {
      handler(next, prev) {
        if (typeof window !== 'undefined') {
          if (next && next != prev) {
            this.noScroll &&
              document.body.style.setProperty('overflow', 'hidden');
            this.$nextTick(() => {
              this.$refs.content.focus();
            });
          } else {
            this.noScroll && document.body.style.removeProperty('overflow');
          }
        }
      },
    },
  },

  mounted() {
    console.warn(
      "Vuetensil's VModal is deprecated. Please use VDialog instead."
    );
  },

  methods: {
    show() {
      /**
       * Fired when the modal opens.
       *
       * @event show
       * @type { boolean }
       */
      this.$emit('show');
      this.$emit('change', true);
    },
    hide() {
      /**
       * Fired when the modal closes.
       *
       * @event hide
       * @type { boolean }
       */
      this.$emit('hide');
      this.$emit('change', false);
    },
    toggle() {
      const { showing } = this;
      const event = showing ? 'hide' : 'show';
      this.$emit(event, !showing);
      /**
       * Fired whenever the modal opens or closes.
       *
       * @event change
       * @type { boolean }
       */
      this.$emit('change', !showing);
    },
    onClick(event) {
      if (event.target.classList.contains('vts-modal') && this.dismissible) {
        this.hide();
      }
    },

    onKeydown(event) {
      if (event.keyCode === KEYCODES.ESC) {
        this.hide();
      }
      if (event.keyCode === KEYCODES.TAB) {
        const content = this.$refs.content;
        if (!content) return;

        const focusable = Array.from(content.querySelectorAll(FOCUSABLE));

        if (!focusable.length) {
          event.preventDefault();
          return;
        }

        if (!content.contains(document.activeElement)) {
          event.preventDefault();
          focusable[0].focus();
        } else {
          const focusedItemIndex = focusable.indexOf(document.activeElement);

          if (event.shiftKey && focusedItemIndex === 0) {
            focusable[focusable.length - 1].focus();
            event.preventDefault();
          }

          if (!event.shiftKey && focusedItemIndex === focusable.length - 1) {
            focusable[0].focus();
            event.preventDefault();
          }
        }
      }
    },
  },
};
</script>

<style>
.vts-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
}

.vts-modal__content {
  overflow: auto;
  max-width: 70vw;
  max-height: 80vh;
  background: #fff;
}

.vts-modal__content:focus {
  outline: 0;
}
</style>
