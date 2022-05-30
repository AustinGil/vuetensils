import { defineClientAppEnhance } from '@vuepress/client'
// import { VueLive } from 'vue-live'
import "vue-live/lib/vue-live.esm.css";
import { h as importedH } from 'vue';

// import layout from "vuepress-plugin-live/live-layout";
import { VueLive } from "vue-live";

const component = {
  functional: true,
  render(h, context) {
    h = typeof h === 'function' ? h : importedH;
    const props = { ...context.props };
    return h(VueLive, { props });
  }
};

export default defineClientAppEnhance(({ app, options, router, siteData }) => {
  // app.component('VueLive', {
  //   template: '<div class="vue-live-container"><slot></slot></div>',
  // })
  app.component('VueLive', component)
  // app.component('VueLive', VueLive)
})