<script>
import KEYCODES from '../../data/keycodes';
import FOCUSABLE from '../../data/focusable';

const NAME = 'vts-drawer';

/**
 * A convenient sidebar that can be toggled on or off. When opened, it traps the user's focus so that keyboard navigation will remain within the sidebar until it is closed. It also supports being closed by pressing the ESC key.
 */
export default {
  name: 'VDrawer',
  model: {
    prop: 'showing',
    event: 'update',
  },

  props: {
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
     * CSS max-width value.
     */
    maxWidth: {
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

  data() {
    return {
      localShow: this.showing,
      activeElement: null,
    };
  },

  watch: {
    showing(next) {
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

  render(h) {
    const { localShow, $scopedSlots, classes } = this;

    if (!localShow && !$scopedSlots.toggle) {
      return h(false);
    }

    const children = [];

    if ($scopedSlots.toggle) {
      children.push(
        $scopedSlots.toggle({
          on: {
            click: () => (this.localShow = true),
          },
          bind: {
            type: 'button',
            role: 'button',
            'aria-haspopup': true,
            'aria-expanded': '' + localShow,
          },
          attrs: {
            // TODO: deprecated
            type: 'button',
            role: 'button',
            'aria-haspopup': true,
            'aria-expanded': '' + localShow,
          },
        })
      );
    }

    if (localShow) {
      let content = h(
        this.tag,
        {
          ref: 'content',
          class: [
            `${NAME}__content`,
            { 'vts-drawer__content--right': !!this.right },
            classes.content,
          ],
          style: {
            width: this.width,
            maxWidth: this.maxWidth,
          },
          attrs: {
            tabindex: '-1',
            // role: "dialog", // TODO: ?
          },
        },
        [this.$slots.default]
      );
      content = h(
        'transition',
        {
          props: {
            name: this.transition,
            appear: true 
          },
        },
        [content]
      );

      const component = h(
        'div',
        {
          class: [NAME, classes.root, classes.bg, this.$attrs.class],
        },
        [content]
      );

      children.push(
        h(
          'transition',
          {
            props: {
              name: this.bgTransition,
              appear: true 
            },
          },
          [component]
        )
      );
    }

    return h('span', children);
  },
};
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
