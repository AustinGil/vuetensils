import "./modal.css";

const Modal = {
  install(Vue, options) {
    Vue.component("va11y-modal", {
      props: {},

      data: () => ({}),

      render: h => {
        return h("div", "The modal content");
      }
    });
  }
};

export default Modal;
