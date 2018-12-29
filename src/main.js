import Hidden from "./components/Hidden";
import Alert from "./components/Alert";
import Modal from "./components/Modal";

// The whole shebang
export default {
  install (Vue, options) {
    // Components
    Vue.component(Hidden.name, Hidden);
    Vue.component(Alert.name, Alert);
    Vue.component(Modal.name, Modal);
  }
};

// Hidden
export const VtsHidden = {
  install (Vue, options) {
    Vue.component(Hidden.name, Hidden);
  }
};

// Alert
export const VtsAlert = {
  install (Vue, options) {
    Vue.component(Alert.name, Alert);
  }
};

// Modal
export const VtsModal = {
  install (Vue, options) {
    Vue.component(Modal.name, Modal);
  }
};
