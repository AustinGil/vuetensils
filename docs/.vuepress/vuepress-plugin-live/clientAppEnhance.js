import { defineClientConfig } from '@vuepress/client'
import { h as importedH } from 'vue';
// import { VueLive } from "vue-live";
import "vue-live/lib/vue-live.esm.css";
import Component from './Component.vue'

// // import layout from "vuepress-plugin-live/live-layout";

// const component = {
//   functional: true,
//   render(h, context) {
//     h = typeof h === 'function' ? h : importedH;
//     const props = { ...context.props };
//     return h(VueLive, { props });
//   }
// };

const comp = {
  template: '<ClientOnly><slot /></ClientOnly>',
}


export default defineClientConfig({
  enhance({ app }) {
    app.component('VueLive', Component);
    // app.component('VueLive', {
    //   render(h2, context) {
    //     const h = typeof h2 === 'function' ? h2 : importedH;
    //     const props = { ...context.props };
    //     console.log(h2)
    //     return h('div', props.code)
    //     // return h(VueLive, { props })
    //   }
    // })
  },
})