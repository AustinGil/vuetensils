import keycodes from "../../data/keycodes";
import "../../styles/shared.css";
import "./styles.css";

const NAME = "vts-modal";
const FOCUSABLE = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])'
]

export default {
  name: NAME,

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dismissible: {
      type: Boolean,
      default: true
    }
  },
  model: {
    prop: "visible",
    event: "change"
  },

  methods: {
    show () {
      this.$emit("show");
      this.$emit("change", true);
    },
    hide () {
      this.$emit("hide");
      this.$emit("change", false);
    },
    toggle () {
      this.$emit("toggle", this.visible);
      this.$emit("change", this.visible);
    },
    trapFocus (event) {
      if (event.keyCode === 9) {
        const content = this.$refs.content;
        const focusable = Array.from(content.querySelectorAll(FOCUSABLE));

        if (this.visible && content && !content.contains(document.activeElement) && focusable) {
          event.preventDefault()
          focusable[0].focus();
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
    visible: {
      handler: function (next, prev) {
        if (next === true && next != prev) {
          this.$nextTick(() => {
            this.$refs.content.focus();
          });
        }
      }
    }
  },

  render: function (create) {
    if (!this.visible) return create(false);

    const $slots = this.$slots;
    let closeButton = create(false);

    if (this.dismissible) {
      let closeContent = this.$slots["close"];
      if (!closeContent) {
        closeContent = create(
          "span",
          {
            attrs: { "aria-label": "Close" }
          },
          "x"
        );
      }

      closeButton = create(
        "button",
        {
          class: `${NAME}__close vts-btn--plain`,
          on: {
            click: e => {
              this.hide(e);
            }
          }
        },
        [closeContent]
      );
    }

    let body = create(
      "div",
      {
        ref: "content",
        class: `${NAME}`,
        attrs: {
          tabindex: "-1"
        },
        on: {
          keydown: this.trapFocus
        }
      },
      [closeButton, $slots.default]
    );

    return create(
      "div",
      {
        attrs: {
          role: "dialog",
          "aria-hidden": this.visible ? null : "true"
        },
        class: `${NAME}__wrapper`,
        on: {
          click: e => {
            const el = e.target;
            if (el.classList.contains(`${NAME}__wrapper`) && this.dismissible) {
              this.hide();
            }
          },
          keydown: e => {
            if (e.keyCode === keycodes.ESC) {
              this.hide();
            }
          }
        }
      },
      [body]
    );
  }
};
