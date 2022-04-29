import { defineClientAppEnhance } from '@vuepress/client'
import { VueLive } from 'vue-live'
import "vue-live/lib/vue-live.esm.css";

export default defineClientAppEnhance(({ app, options, router, siteData }) => {
  app.component('VueLive', VueLive)
})