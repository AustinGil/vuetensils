<script>
import { compile } from 'vue-inbrowser-compiler'
// import CodeMirror from 'codemirror'
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/monokai.css'

import Prism from 'prismjs'
// import "prismjs/themes/prism-okaidia.css";


export default {
  props: {
    code: {
      type: String,
      default: ''
    },
  },
  computed: {
    editor() {
      return Prism.highlight(this.code, Prism.languages.html, 'html');
    },
    preview() {
      return new Function(compile(this.code).script)()
    }
  },
  // mounted() {
  //   CodeMirror.fromTextArea(this.$refs.editor, {
  //     // mode: 'htmlmixed',
  //     mode: 'javascript',
  //     // mode: 'text/x-vue',htmlmixed
  //     lineNumbers: true,
  //     theme: 'monokai',
  //     readOnly: true,
  //   })
  // }
}
</script>

<template>
  <div>
    <!-- <textarea ref="editor">{{ code }}</textarea> -->
    <component :is="preview" />
    <pre class="language-vue"><code v-html="editor"></code></pre>
  </div>
</template>