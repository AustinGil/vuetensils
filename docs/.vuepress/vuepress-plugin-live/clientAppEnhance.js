import { defineClientConfig } from '@vuepress/client'
import { VueLive } from "vue-live";
import "vue-live/lib/vue-live.esm.css";

export default defineClientConfig({
  enhance({ app }) {
    app.component('VueLive', VueLive);
  },
})