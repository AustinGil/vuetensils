import Alert from "./components/Alert";
import Drawer from "./components/Drawer";
import Dropdown from "./components/Dropdown";
import Fetch from "./components/Fetch";
import Hidden from "./components/Hidden";
import Intersection from "./components/Intersection";
import Loading from "./components/Loading";
import Modal from "./components/Modal";

// The whole shebang
export default {
  install (Vue, options) {
    // Components
    Vue.component(Alert.name, Alert);
    Vue.component(Drawer.name, Drawer);
    Vue.component(Dropdown.name, Dropdown);
    Vue.component(Fetch.name, Fetch);
    Vue.component(Hidden.name, Hidden);
    Vue.component(Intersection.name, Intersection);
    Vue.component(Loading.name, Loading);
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
