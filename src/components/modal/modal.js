import "./modal.css";

const NAME = "va11y-modal";

const Modal = {
  install(Vue, options) {
    Vue.component(NAME, {
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

      data: () => ({
        // localVisible: null
      }),

      methods: {
        show() {
          this.$emit("change", true);
        },
        hide() {
          this.$emit("change", false);
        },
        toggle() {
          this.$emit("change", this.visible);
        },
        onFocusout(e) {
          const content = this.$refs.content;
          if (this.visible && content && !content.contains(e.relatedTarget)) {
            content.focus();
          }
        },
        onClickOut(evt) {
          // backdrop clicked, hide modal
          if (this.visible) {
            this.hide("backdrop");
          }
        }
      },

      render: function(create) {
        if (!this.visible) return create(false);

        const $slots = this.$slots;
        let closeButton = create(false);

        if (this.dismissible) {
          $slots["close-content"] = $slots["close-content"] || "Close";

          closeButton = create(
            "button",
            {
              class: `${NAME}__close`,
              props: {
                // disabled: this.is_transitioning,
                // ariaLabel: this.headerCloseLabel,
                // textVariant: this.headerTextVariant
              },
              on: {
                click: e => {
                  this.hide(e);
                }
              }
            },
            [$slots["close-content"]]
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
                if (el.classList.contains(`${NAME}__wrapper`)) {
                  this.hide();
                }
              }
            }
          },
          [body]
        );
      }
    });
  }
};

export default Modal;
