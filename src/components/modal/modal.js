import "./modal.css";

const NAME = "va11y-modal";

const Modal = {
  install(Vue, options) {
    Vue.component(NAME, {
      props: {
        dismissible: {
          type: Boolean,
          default: true
        }
      },

      data: () => ({}),

      render: function(h) {
        const $slots = this.$slots;
        let closeButton = h(false);

        if (this.dismissible) {
          $slots["close-content"] = $slots["close-content"] || "Close";

          closeButton = h(
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
                  console.log("close!");
                  // this.hide("header-close");
                }
              }
            },
            [$slots["close-content"]]
          );
        }

        let body = h(
          "div",
          {
            class: `${NAME}__body`
          },
          [closeButton, $slots.default]
        );

        return h(
          "div",
          {
            class: `${NAME}`
          },
          [body]
        );
      }
    });
  }
};

export default Modal;
