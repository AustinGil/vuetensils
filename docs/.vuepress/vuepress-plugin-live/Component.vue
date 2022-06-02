<script>
// import {Repl, ReplStore} from '@vue/repl'
// import '@vue/repl/style.css'
import { compile } from 'vue-inbrowser-compiler'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

import Prism from 'prismjs'
// import "prismjs/themes/prism-okaidia.css";


export default {
  // components: {
  //   Repl
  // },
  props: {
    code: {
      type: String,
      default: ''
    },
  },
  computed: {
    // editor() {
    //   return Prism.highlight(this.code, Prism.languages.html, 'html');
    // },
    preview() {
      return new Function(compile(this.code).script)()
    },
    // store() {
    //   const store = new ReplStore()

    //   store.setFiles({
    //     'App.vue': `<div id="app">`
    //   })
    //   return store
    // },
  },
  mounted() {
    CodeMirror.fromTextArea(this.$refs.editor, {
      // mode: 'htmlmixed',
      mode: 'html',
      // mode: 'javascript',
      // mode: 'text/x-vue',htmlmixed
      lineNumbers: true,
      theme: 'monokai',
      readOnly: true,
    })
  }
}
</script>

<template>
  <div>
    <!-- <Repl :store="store" /> -->
    <component :is="preview" />
    <!-- <pre class="language-vue"><code v-html="editor"></code></pre> -->
    <textarea ref="editor">{{ code }}</textarea>
  </div>
</template>