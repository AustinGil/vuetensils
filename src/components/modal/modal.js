import keycodes from "../../utils/keycodes";
import "./modal.css";

const NAME = "va11y-modal";

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
    show() {
      this.$emit("show");
      this.$emit("change", true);
    },
    hide() {
      this.$emit("hide");
      this.$emit("change", false);
    },
    toggle() {
      this.$emit("toggle", this.visible);
      this.$emit("change", this.visible);
    },
    onFocusout(e) {
      const content = this.$refs.content;
      const focusable = content.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (this.visible && content && !content.contains(e.relatedTarget) && focusable) {
        focusable.focus();
      }
    }
  },

  watch: {
    visible: {
      handler: function(next, prev) {
        if (next === true && next != prev) {
          this.$nextTick(() => {
            this.$refs.content.focus();
          });
        }
      }
    }
  },

  render: function(create) {
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
          class: `${NAME}__close`,
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
          focusout: this.onFocusout
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
