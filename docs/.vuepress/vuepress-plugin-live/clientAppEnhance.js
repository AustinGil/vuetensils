import { defineClientConfig } from '@vuepress/client'
import { VueLive } from "vue-live";
import './vue-prism-editor.prismeditor.min.css';

export default defineClientConfig({
  enhance({ app }) {
    app.component('VueLive', VueLive);
  },
})