<template>
  <div class="example">
    <client-only>
      <codemirror
        v-model="code"
        class="codemirror"
        :options="cmOption"
        @cursorActivity="onCmCursorActivity"
        @ready="onCmReady"
        @focus="onCmFocus"
        @blur="onCmBlur"
      />
    </client-only>
    <pre class="pre">{{ code }}</pre>
  </div>
</template>

<script>
export default {
  name: 'CodemirrorExampleNuxt',
  data() {
    return {
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/x-vue',
        theme: 'base16-dark'
      },
      /* eslint-disable no-useless-escape */
      code: `
          <template>
            <main>
              <h1>Hello World!</h1>
              <p>{{ message }}</p>
            </main>
          </template>
          <script>
            export default {
              data() {
                return {
                  message: 'Hi!'
                }
              }
            }
          <\/script>
          <style lang="scss">
            @import './sass/variables';
            main {
              position: relative;
            }
          </style>
        `
      /* eslint-enable no-useless-escape */
    };
  },
  methods: {
    onCmCursorActivity(codemirror) {
      console.debug('onCmCursorActivity', codemirror);
    },
    onCmReady(codemirror) {
      console.debug('onCmReady', codemirror);
    },
    onCmFocus(codemirror) {
      console.debug('onCmFocus', codemirror);
    },
    onCmBlur(codemirror) {
      console.debug('onCmBlur', codemirror);
    }
  }
};
</script>

<style>
.example {
  display: flex;
  height: 100%;
}
.example .codemirror,
.example .pre {
  width: 50%;
  height: 100%;
  margin: 0;
  overflow: auto;
}
.example .pre {
  display: block;
  padding: 1rem;
  line-height: 1.6;
  word-break: break-all;
  word-wrap: break-word;
}
</style>