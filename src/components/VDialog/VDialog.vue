<template>
  <span v-if="localShow || slots.toggle">
    <slot
      v-if="slots.toggle"
      name="toggle"
      v-bind="{
        on: {
          click: () => (localShow = !localShow),
        },
        bind: {
          type: 'button',
          role: 'button',
          'aria-haspopup': true,
          'aria-expanded': '' + localShow,
        },
      }"
    />
    <transition :name="bgTransition || transition" :appear="true">
      <template v-if="localShow">
        <div :class="['vts-dialog', classes.root, classes.bg, $attrs.class]">
          <transition :name="contentTransition">
            <component
              :is="tag"
              ref="content"
              :class="['vts-dialog__content', classes.content]"
              :style="{
                width: width,
                'inline-size': inlineSize,
                'max-width': maxWidth,
                'max-inline-size': maxInlineSize,
              }"
              tabindex="-1"
              role="dialog"
              aria-modal="true"
            >
              <slot v-bind="{ close: () => (localShow = !localShow) }" />
            </component>
          </transition>
        </div>
      </template>
    </transition>
  </span>
</template>
<script>
import { isVue3 } from 'vue-demi';
import KEYCODES from '../../data/keycodes.js';
import FOCUSABLE from '../../data/focusable.js';

/**
 * A dialog component for showing users content which overlays the rest of the applications. When opened, it traps the user's focus so that keyboard navigation will remain within the dialog until it is closed. It supports being closed by clicking outside the dialog content or pressing the ESC key.
 */
export default {
  name: 'VDialog',
  inheritAttrs: false,

  model: {
    prop: 'showing',
    event: 'update:modelValue',
  },

  props: {
    modelValue: Boolean,
    /**
     * @model
     */
    showing: Boolean,
    /**
     * HTML component for the dialog content.
     */
    tag: {
      type: String,
      default: 'div',
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
      default: '',
    },
    /**
     * CSS width to set the dialog to.
     */
    inlineSize: {
      type: String,
      default: '',
    },
    /**
     * CSS max-width to set the dialog to.
     */
    maxWidth: {
      type: String,
      default: '',
    },
    /**
     * CSS max-width to set the dialog to.
     */
    maxInlineSize: {
      type: String,
      default: '',
    },
    /**
     * Prevents the page from being scrolled while the dialog is open.
     */
    noScroll: Boolean,
    /**
     * Transition name to apply to the dialog.
     */
    transition: {
      type: String,
      default: '',
    },
    /**
     * Transition name to apply to the background.
     *
     * @deprecated
     */
    bgTransition: {
      type: String,
      default: '',
    },

    /**
     * Transition name to apply to the background.
     */
    contentTransition: {
      type: String,
      default: '',
    },

    classes: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update', 'update:modelValue', 'open', 'close'],

  data() {
    return {
      localShow: this.modelValue || this.showing,
      activeElement: null,
    };
  },

  computed: {
    slots() {
      if (!isVue3) {
        return this.$scopedSlots;
      }
      return this.$slots;
    },
  },

  watch: {
    showing(next) {
      this.localShow = next;
    },
    modelValue(next) {
      this.localShow = next;
    },
    localShow: {
      handler(next, prev) {
        if (typeof window === 'undefined') return;

        if (next && next != prev) {
          this.activeElement = document.activeElement;
          this.onOpen();
        } else {
          this.onClose();

          const { activeElement } = this;
          if (activeElement && activeElement.focus) {
            this.$nextTick(() => {
              activeElement.focus();
            });
          }
        }

        this.$emit('update', next);
        this.$emit('update:modelValue', next);
      },
    },
  },

  destroyed() {
    this.onClose();
  },

  methods: {
    onOpen() {
      const { onClick, onKeydown, noScroll } = this;
      window.addEventListener('click', onClick);
      window.addEventListener('keydown', onKeydown);
      noScroll && document.body.style.setProperty('overflow', 'hidden');
      this.$nextTick(() => this.$refs.content.focus());
      this.$emit('open');
    },
    onClose() {
      const { onClick, onKeydown, noScroll } = this;
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeydown);
      noScroll && document.body.style.removeProperty('overflow');
      this.$emit('close');
    },
    onClick(event) {
      if (event.target.classList.contains('vts-dialog') && this.dismissible) {
        this.localShow = false;
      }
    },
    onKeydown(event) {
      if (event.keyCode === KEYCODES.ESC && this.dismissible) {
        this.localShow = false;
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
:where(.vts-dialog) {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  inset: 0;
}

:where(.vts-dialog__content:focus) {
  outline: 0;
}
</style>
