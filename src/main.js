// import Alert from "./components/Alert"
import Drawer from "./components/Drawer/index"
import Dropdown from "./components/Dropdown/index"
import Fetch from "./components/Fetch/index"
// import Hidden from "./components/Hidden";
import Intersection from "./components/Intersection/index"
import Loading from "./components/Loading/index"
import Modal from "./components/Modal/index"

// The whole shebang
export default {
  install(Vue, options) {
    // Components
    // Vue.component(Alert.name, Alert)
    Vue.component(Drawer.name, Drawer)
    Vue.component(Dropdown.name, Dropdown)
    Vue.component(Fetch.name, Fetch)
    // Vue.component(Hidden.name, Hidden);
    Vue.component(Intersection.name, Intersection)
    Vue.component(Loading.name, Loading)
    Vue.component(Modal.name, Modal)
  }
}
