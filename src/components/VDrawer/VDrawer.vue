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
    <transition :name="bgTransition || transition" appear>
      <template v-if="localShow">
        <div :class="['vts-drawer', classes.root, classes.bg, $attrs.class]">
          <transition :name="transition" appear>
            <component
              :is="tag"
              v-if="localShow"
              ref="content"
              :class="[
                'vts-drawer__content',
                { 'vts-drawer__content--right': !!right },
                classes.content,
              ]"
              :style="{
                width: width,
                'inline-size': inlineSize,
                'max-width': maxWidth,
                'max-inline-size': maxInlineSize,
              }"
              tabindex="-1"
            >
              <!-- role="dialog" TODO ?? -->
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

const NAME = 'vts-drawer';

/**
 * A convenient sidebar that can be toggled on or off. When opened, it traps the user's focus so that keyboard navigation will remain within the sidebar until it is closed. It also supports being closed by pressing the ESC key.
 */
export default {
  name: 'VDrawer',
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
    tag: {
      type: String,
      default: 'aside',
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
     * CSS max-width value.
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
     * Disable page scrolling when drawer is open.
     */
    noScroll: Boolean,
    /**
     * Vue transition name.
     */
    transition: {
      type: String,
      default: '',
    },
    /**
     * Vue transition name for the background.
     *
     * @deprecated
     */
    bgTransition: {
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
      if (event.target.classList.contains(NAME)) {
        this.localShow = false;
      }
    },
    onKeydown(event) {
      if (event.keyCode === KEYCODES.ESC) {
        this.localShow = false;
      }
      if (event.keyCode === KEYCODES.TAB) {
        /** @type {HTMLDivElement} */
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
.vts-drawer {
  position: fixed;
  z-index: 100;
  inset: 0;
}

.vts-drawer__content {
  overflow: auto;
  max-inline-size: 20rem;
  block-size: 100%;
}

.vts-drawer__content:focus {
  outline: 0;
}

.vts-drawer__content--right {
  margin-inline-start: auto;
}
</style>
