import Modal from "./components/modal/modal";
import Hidden from "./components/hidden/hidden";

// The whole shebang
export default {
  install(Vue, options) {
    // Components
    Vue.component(Modal.name, Modal);
    Vue.component(Hidden.name, Hidden);
  }
};

// Modal
export const VallyModal = {
  install(Vue, options) {
    Vue.component(Hidden.name, Hidden);
    Vue.component(Modal.name, Modal);
  }
};

// Hidden
export const VallyHidden = {
  install(Vue, options) {
    Vue.component(Hidden.name, Hidden);
  }
};
