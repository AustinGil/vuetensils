import Hidden from "./components/hidden/hidden";
import Alert from "./components/alert/alert";
import Modal from "./components/modal/modal";

// The whole shebang
export default {
  install(Vue, options) {
    // Components
    Vue.component(Hidden.name, Hidden);
    Vue.component(Alert.name, Alert);
    Vue.component(Modal.name, Modal);
  }
};

// Hidden
export const Va11yHidden = {
  install(Vue, options) {
    Vue.component(Hidden.name, Hidden);
  }
};

// Alert
export const Va11yAlert = {
  install(Vue, options) {
    Vue.component(Alert.name, Alert);
  }
};

// Modal
export const Va11yModal = {
  install(Vue, options) {
    Vue.component(Modal.name, Modal);
  }
};
